(function () {
    'use strict';

    class System {
        constructor() {
            this.LANGUAGE_ENGLISH = "en";
            this.LANGUAGE_CHINESE = "zh";
            this.isCocosCreatorGame = false;
            this.isLayaGame = false;
            this.isBrowser = false;
            this.isMobile = false;
            this.isApp = false;
            this.isBrowser = typeof window === 'object' && typeof document === 'object';
            if (this.isBrowser) {
                if (window["isConchApp"]) {
                    this.isMobile = true;
                    this.isApp = true;
                }
                else {
                    this.isMobile = window.navigator.userAgent.indexOf("Mobile") > -1;
                }
                if (typeof Laya === 'object') {
                    this.isLayaGame = true;
                }
                if (typeof cc === 'object' && cc["Director"]) {
                    this.isCocosCreatorGame = true;
                }
            }
        }
    }

    class Sound {
    }
    class LayaWebAudioEngine {
        constructor() {
            this._audioInstances = new Map();
            this._audioContext = null;
            this._audioWebEnabled = false;
            this._muted = false;
            this._paused = false;
            this.initialize();
        }
        initialize() {
            try {
                window.AudioContext = window.AudioContext || window["webkitAudioContext"];
                this._audioContext = new AudioContext;
                let t = this;
                window.document.addEventListener("mousedown", tryToResumeAudioContext, true);
                window.document.addEventListener("touchstart", tryToResumeAudioContext, true);
                function tryToResumeAudioContext() {
                    if (t._muted)
                        return;
                    if (t._audioContext.state === "suspended") {
                        t._audioContext.resume();
                    }
                    else {
                        window.document.removeEventListener("mousedown", tryToResumeAudioContext, true);
                        window.document.removeEventListener("touchstart", tryToResumeAudioContext, true);
                        clearInterval(resumeInterval);
                    }
                }
                let resumeInterval = setInterval(tryToResumeAudioContext, 0.2e3);
                this._audioWebEnabled = true;
            }
            catch (e) {
                alert("Web Audio API is not supported in this browser");
            }
        }
        set muted(b) {
            this._muted = b;
            if (this._muted) {
                this._audioContext.suspend();
            }
            else {
                if (this._paused) {
                }
                else {
                    this._resume();
                }
            }
        }
        ;
        get muted() {
            return this._muted;
        }
        set pause(b) {
            this._paused = b;
            if (this._paused) {
                this._audioContext.suspend();
            }
            else {
                if (this._muted)
                    return;
                this._resume();
            }
        }
        _resume() {
            if (!this._muted) {
                this._audioContext.resume();
            }
        }
        stopAll() {
            const values = this._audioInstances.values();
            for (const sound of values) {
                const channel = sound.channel;
                if (channel.source.buffer) {
                    try {
                        channel.source.stop(this._audioContext.currentTime);
                    }
                    catch (e) {
                        channel.source.disconnect();
                    }
                    channel.source.onended = (function () { });
                    channel.setup();
                }
            }
        }
        stop(url) {
            if (this._audioInstances.has(url)) {
                const sound = this._audioInstances.get(url);
                this._stopSound(sound);
            }
        }
        _stopSound(sound) {
            const channel = sound.channel;
            if (channel.source.buffer) {
                try {
                    channel.source.stop(this._audioContext.currentTime);
                }
                catch (e) {
                    channel.source.disconnect();
                }
                channel.source.onended = (function () { });
                channel.setup();
            }
        }
        playMusic(url) {
            if (this._music) {
                this._stopSound(this._music);
            }
            if (this._audioInstances.has(url)) {
                this._music = this._audioInstances.get(url);
                this.play(url, true);
            }else{
                this.downloadArrayBuffer(url, () => {
                    this.playMusic(url);
                });
            }
        }
        stopMusic() {
            if (this._music) {
                this._stopSound(this._music);
            }
        }
        play(url, loop = false) {
            if (!this._audioWebEnabled)
                return;
            if (this._audioInstances.has(url)) {
                this.stop(url);
                const sound = this._audioInstances.get(url);
                const channel = sound.channel;
                if (sound.buffer) {
                    try {
                        channel.playBuffer(this._audioContext.currentTime, sound.buffer);
                        channel.source.loop = loop;
                    }
                    catch (e) {
                        console.error("playBuffer error. Exception: " + e);
                    }
                }
            }
            else {
                this.downloadArrayBuffer(url, () => {
                    this.play(url, loop);
                });
            }
        }
        load(urls, onComplete) {
            let t = urls.length;
            let d = 0;
            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                this.downloadArrayBuffer(url, () => {
                    d++;
                    if (d >= t) {
                        onComplete && onComplete();
                    }
                });
            }
        }
        setThreeD(url) {
            if (this._audioInstances.has(url)) {
                const sound = this._audioInstances.get(url);
                sound.channel.threeD = true;
            }
        }
        createChannel() {
            let audioContext = this._audioContext;
            let channel = {
                gain: audioContext.createGain(),
                panner: audioContext.createPanner(),
                threeD: false,
                playBuffer: (function (delay, buffer, offset) {
                    this.source.buffer = buffer;
                    var chan = this;
                    this.source.onended = (function () {
                        chan.setup();
                    });
                    this.source.start(delay, offset);
                }),
                setup: (function () {
                    this.source = audioContext.createBufferSource();
                    this.setupPanning();
                }),
                setupPanning: (function () {
                    if (this.threeD) {
                        this.source.disconnect();
                        this.source.connect(this.panner);
                        this.panner.connect(this.gain);
                    }
                    else {
                        this.panner.disconnect();
                        this.source.connect(this.gain);
                    }
                })
            };
            channel.panner.rolloffFactor = 0;
            channel.gain.connect(this._audioContext.destination);
            channel.setup();
            return channel;
        }
        downloadArrayBuffer(url, onComplete) {
            if (this._audioInstances.has(url)) {
                onComplete && onComplete();
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
                if (xhr.status === 200 || xhr.status === 0) {
                    const sound = new Sound();
                    sound.url = url;
                    sound.channel = this.createChannel();
                    this._audioInstances.set(url, sound);
                    this._audioContext.decodeAudioData(xhr.response, (function (buffer) {
                        sound.buffer = buffer;
                        onComplete && onComplete();
                    }), (function () {
                        sound.error = true;
                        onComplete && onComplete();
                        console.log("Decode error.");
                    }));
                }
                else {
                    throw "no response";
                }
            };
            xhr.onerror = function () {
                onComplete && onComplete();
                throw "no response";
            };
            xhr.ontimeout = function () {
                onComplete && onComplete();
            };
            xhr.onabort = function () {
                onComplete && onComplete();
            };
            xhr.send(null);
        }
    }

    class YYGGames {
        constructor() {
            this.system = new System();
            if (this.system.isBrowser) {
                this.audio = new LayaWebAudioEngine();
            }
        }
    }
    window["YYGGames"] = new YYGGames();

}());
