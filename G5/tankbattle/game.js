var _STRINGS = {
    Ad: {
        Mobile: {
            Preroll: {
                ReadyIn: "The game is ready in ",
                Loading: "Your game is loading...",
                Close: "Close"
            },
            Header: {
                ReadyIn: "The game is ready in ",
                Loading: "Your game is loading...",
                Close: "Close"
            },
            End: {
                ReadyIn: "Advertisement ends in ",
                Loading: "Please wait ...",
                Close: "Close"
            }
        }
    },
    Splash: {
        Loading: "LOADING",
        LogoLine1: "Some text here",
        LogoLine2: "powered by MarketJS",
        LogoLine3: "none"
    },
    Game: {
        SelectPlayer: "Select Player",
        Win: "You win!",
        Lose: "You lose!",
        Score: "Score",
        Time: "Time",
        Pause: "PAUSE",
        Off: "OFF",
        On: "ON",
        BlueWins: "BLUE WINS!",
        RedWins: "RED WINS!",
        BluePlayer: "BLUE PLAYER",
        RedPlayer: "RED PLAYER",
        redControl: "Z",
        blueControl: "M",
        result: "RESULT",
        redKill: "RED defeated BLUE",
        blueKill: "BLUE defeated RED",
        ready: "READY!",
        go: "GO!",
        Tutorial0: "TUTORIALS",
        Tutorial1: "CONTROLS",
        Tutorial2: "POWER UPS",
        Tutorial3: "BULLETS",
        Tutorial4: "GOAL",
        "Power0-0": "Bubble Shield protects",
        "Power0-1": "you from bullets",
        "Power1-0": "Zap Energy makes your",
        "Power1-1": "tank move faster",
        "Power2-0": "Heart adds one life",
        "Power2-1": "to your tank",
        "Power3-0": "Star upgrades your tank",
        "Power3-1": "to Rocket or Laser Tank",
        "Power4-0": "Crate gives you bullets",
        "Power4-1": "",
        Bullet: "Different tank shoots bullet with different behaviors",
        Bullet0: "Normal Tank",
        Bullet1: "Laser Tank",
        Bullet2: "Rocket Tank",
        control: "To make the tanks turn RIGHT... Yes, ONLY RIGHT",
        controlRed: "RED",
        controlBlue: "BLUE",
        controlRed2: "or press Z on keyboard",
        controlBlue2: "or press M on keyboard",
        click: "Click",
        tap: "Tap",
        you: "YOU",
        ai: "AI",
        player1: "PLAYER 1",
        player2: "PLAYER 2",
        goal1: "Score 10 points by defeating the opponent using bullets",
        goal2: "Have fun! Oh, and beware your own bullets can harm you"
    },
    Results: {
        Title: "High score"
    }
};
var _SETTINGS = {
    API: {
        Enabled: !0,
        Log: {
            Events: {
                InitializeGame: !0,
                EndGame: !0,
                Level: {
                    Begin: !0,
                    End: !0,
                    Win: !0,
                    Lose: !0,
                    Draw: !0
                }
            }
        }
    },
    Ad: {
        Mobile: {
            Preroll: {
                Enabled: !0,
                Duration: 5,
                Width: 300,
                Height: 250,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGamePreroll: 40,
                        MobileAdInGamePreroll2: 40,
                        MobileAdInGamePreroll3: 20
                    }
                }
            },
            Header: {
                Enabled: !1,
                Duration: 5,
                Width: 320,
                Height: 50,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameHeader: 40,
                        MobileAdInGameHeader2: 40,
                        MobileAdInGameHeader3: 20
                    }
                }
            },
            Footer: {
                Enabled: !1,
                Duration: 5,
                Width: 320,
                Height: 50,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameFooter: 40,
                        MobileAdInGameFooter2: 40,
                        MobileAdInGameFooter3: 20
                    }
                }
            },
            End: {
                Enabled: !1,
                Duration: 1,
                Width: 300,
                Height: 250,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameEnd: 40,
                        MobileAdInGameEnd2: 40,
                        MobileAdInGameEnd3: 20
                    }
                }
            }
        }
    },
    Language: {
        Default: "en"
    },
    DeveloperBranding: {
        Splash: {
            Enabled: !0
        },
        Logo: {
            Enabled: !0,
            Link: "http://marketjs.com",
            LinkEnabled: !1,
            NewWindow: !0,
            Width: 166,
            Height: 61
        }
    },
    Branding: {
        Splash: {
            Enabled: !1
        },
        Logo: {
            Enabled: !1,
            Link: "http://google.com",
            LinkEnabled: !0,
            NewWindow: !0,
            Width: 280,
            Height: 34
        }
    },
    MoreGames: {
        Enabled: !1,
        Link: "http://www.marketjs.com/game/links/mobile",
        NewWindow: !0
    },
    Gamecenter: {
        Enabled: !1
    }
};
var MobileAdInGamePreroll = {/*
    ad_duration: _SETTINGS.Ad.Mobile.Preroll.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Preroll.Width,
    ad_height: _SETTINGS.Ad.Mobile.Preroll.Height,
    ready_in: _STRINGS.Ad.Mobile.Preroll.ReadyIn,
    loading: _STRINGS.Ad.Mobile.Preroll.Loading,
    close: _STRINGS.Ad.Mobile.Preroll.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Preroll.Rotation.Weight,
                c = b.MobileAdInGamePreroll,
                d =
                c + b.MobileAdInGamePreroll2,
                b = d + b.MobileAdInGamePreroll3,
                f = Math.floor(100 * Math.random());
            console.log("seed: ", f);
            f <= c ? this.selectedOverlayName = "MobileAdInGamePreroll" : f <= d ? this.selectedOverlayName = "MobileAdInGamePreroll2" : f <= b && (this.selectedOverlayName = "MobileAdInGamePreroll3");
            console.log("Ad rotating preroll enabled")
        } else this.selectedOverlayName = "MobileAdInGamePreroll", console.log("Ad rotating preroll disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = {
            footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
            header: $("#" + this.selectedOverlayName + "-Box-Header"),
            close: $("#" + this.selectedOverlayName + "-Box-Close"),
            body: $("#" + this.selectedOverlayName + "-Box-Body")
        };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() -
            this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() {
                MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in + c + "...");
                MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGamePreroll.boxContents.close.css("left", MobileAdInGamePreroll.boxContents.body.width() - 23), MobileAdInGamePreroll.boxContents.close.show(), MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close),
                    MobileAdInGamePreroll.boxContents.footer.text(""))
            }, 1E3)
    },
    Close: function() {
        this.boxContents.close.hide();
        this.overlay.hide()
    }*/
};
var MobileAdInGameHeader = {/*
    ad_duration: _SETTINGS.Ad.Mobile.Header.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Header.Width,
    ad_height: _SETTINGS.Ad.Mobile.Header.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Header.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Header.Rotation.Weight,
                c = b.MobileAdInGameHeader,
                d = c + b.MobileAdInGameHeader2,
                b = d + b.MobileAdInGameHeader3,
                f = Math.floor(100 * Math.random());
            console.log("seed: ", f);
            f <= c ? this.selectedOverlayName = "MobileAdInGameHeader" : f <= d ? this.selectedOverlayName = "MobileAdInGameHeader2" :
                f <= b && (this.selectedOverlayName = "MobileAdInGameHeader3");
            console.log("Ad rotating header enabled")
        } else this.selectedOverlayName = "MobileAdInGameHeader", console.log("Ad rotating header disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", 0);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() {
            b--;
            0 > b && (MobileAdInGameHeader.div.hide(), clearInterval(c))
        }, 1E3)
    }*/
};
var MobileAdInGameFooter = {/*
    ad_duration: _SETTINGS.Ad.Mobile.Footer.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Footer.Width,
    ad_height: _SETTINGS.Ad.Mobile.Footer.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Footer.Rotation.Weight,
                c = b.MobileAdInGameFooter,
                d = c + b.MobileAdInGameFooter2,
                b = d + b.MobileAdInGameFooter3,
                f = Math.floor(100 * Math.random());
            console.log("seed: ", f);
            f <= c ? this.selectedOverlayName = "MobileAdInGameFooter" : f <= d ? this.selectedOverlayName = "MobileAdInGameFooter2" :
                f <= b && (this.selectedOverlayName = "MobileAdInGameFooter3");
            console.log("Ad rotating footer enabled")
        } else this.selectedOverlayName = "MobileAdInGameFooter", console.log("Ad rotating footer disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", this.game.height() - this.div.height() - 5);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() {
            b--;
            0 > b && (MobileAdInGameFooter.div.hide(), clearInterval(c))
        }, 1E3)
    }*/
};
var MobileAdInGameEnd = {/*
    ad_duration: _SETTINGS.Ad.Mobile.End.Duration,
    ad_width: _SETTINGS.Ad.Mobile.End.Width,
    ad_height: _SETTINGS.Ad.Mobile.End.Height,
    ready_in: _STRINGS.Ad.Mobile.End.ReadyIn,
    loading: _STRINGS.Ad.Mobile.End.Loading,
    close: _STRINGS.Ad.Mobile.End.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.End.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.End.Rotation.Weight,
                c = b.MobileAdInGameEnd,
                d = c + b.MobileAdInGameEnd2,
                b = d + b.MobileAdInGameEnd3,
                f = Math.floor(100 * Math.random());
            console.log("seed: ", f);
            f <= c ? this.selectedOverlayName = "MobileAdInGameEnd" : f <= d ? this.selectedOverlayName = "MobileAdInGameEnd2" : f <= b && (this.selectedOverlayName = "MobileAdInGameEnd3");
            console.log("Ad rotating end enabled")
        } else this.selectedOverlayName = "MobileAdInGameEnd", console.log("Ad rotating end disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = {
            footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
            header: $("#" + this.selectedOverlayName + "-Box-Header"),
            close: $("#" + this.selectedOverlayName + "-Box-Close"),
            body: $("#" + this.selectedOverlayName + "-Box-Body")
        };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() {
                MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in + c + "...");
                MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGameEnd.boxContents.close.css("left", MobileAdInGameEnd.boxContents.body.width() - 23), MobileAdInGameEnd.boxContents.close.show(), MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close), MobileAdInGameEnd.boxContents.footer.text(""))
            }, 1E3)
    },
    Close: function() {
        this.boxContents.close.hide();
        this.overlay.hide()
    }*/
};
(function(b, c) {
    function d(b, j, v) {
        if (v === c && 1 === b.nodeType)
            if (v = "data-" + j.replace(sc, "-$1").toLowerCase(), v = b.getAttribute(v), "string" == typeof v) {
                try {
                    v = "true" === v ? !0 : "false" === v ? !1 : "null" === v ? null : +v + "" === v ? +v : tc.test(v) ? e.parseJSON(v) : v
                } catch (z) {}
                e.data(b, j, v)
            } else v = c;
        return v
    }

    function f(b) {
        for (var j in b)
            if (!("data" === j && e.isEmptyObject(b[j])) && "toJSON" !== j) return !1;
        return !0
    }

    function g() {
        return !1
    }

    function m() {
        return !0
    }

    function x(b) {
        return !b || !b.parentNode || 11 === b.parentNode.nodeType
    }

    function t(b,
        j) {
        do b = b[j]; while (b && 1 !== b.nodeType);
        return b
    }

    function y(b, j, c) {
        j = j || 0;
        if (e.isFunction(j)) return e.grep(b, function(b, u) {
            return !!j.call(b, u, b) === c
        });
        if (j.nodeType) return e.grep(b, function(b) {
            return b === j === c
        });
        if ("string" == typeof j) {
            var z = e.grep(b, function(b) {
                return 1 === b.nodeType
            });
            if (uc.test(j)) return e.filter(j, z, !c);
            j = e.filter(j, z)
        }
        return e.grep(b, function(b) {
            return 0 <= e.inArray(b, j) === c
        })
    }

    function s(b) {
        var j = wb.split("|");
        b = b.createDocumentFragment();
        if (b.createElement)
            for (; j.length;) b.createElement(j.pop());
        return b
    }

    function A(b, j) {
        if (1 === j.nodeType && e.hasData(b)) {
            var c, z, d;
            z = e._data(b);
            var q = e._data(j, z),
                n = z.events;
            if (n)
                for (c in delete q.handle, q.events = {}, n) {
                    z = 0;
                    for (d = n[c].length; z < d; z++) e.event.add(j, c, n[c][z])
                }
            q.data && (q.data = e.extend({}, q.data))
        }
    }

    function l(b, j) {
        var c;
        1 === j.nodeType && (j.clearAttributes && j.clearAttributes(), j.mergeAttributes && j.mergeAttributes(b), c = j.nodeName.toLowerCase(), "object" === c ? (j.parentNode && (j.outerHTML = b.outerHTML), e.support.html5Clone && b.innerHTML && !e.trim(j.innerHTML) &&
            (j.innerHTML = b.innerHTML)) : "input" === c && xb.test(b.type) ? (j.defaultChecked = j.checked = b.checked, j.value !== b.value && (j.value = b.value)) : "option" === c ? j.selected = b.defaultSelected : "input" === c || "textarea" === c ? j.defaultValue = b.defaultValue : "script" === c && j.text !== b.text && (j.text = b.text), j.removeAttribute(e.expando))
    }

    function p(b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll("*") : []
    }

    function r(b) {
        xb.test(b.type) && (b.defaultChecked =
            b.checked)
    }

    function D(b, j) {
        if (j in b) return j;
        for (var c = j.charAt(0).toUpperCase() + j.slice(1), e = j, d = yb.length; d--;)
            if (j = yb[d] + c, j in b) return j;
        return e
    }

    function J(b, j) {
        return b = j || b, "none" === e.css(b, "display") || !e.contains(b.ownerDocument, b)
    }

    function G(b, j) {
        for (var c, z, d = [], q = 0, n = b.length; q < n; q++) c = b[q], c.style && (d[q] = e._data(c, "olddisplay"), j ? (!d[q] && "none" === c.style.display && (c.style.display = ""), "" === c.style.display && J(c) && (d[q] = e._data(c, "olddisplay", L(c.nodeName)))) : (z = Q(c, "display"), !d[q] && "none" !==
            z && e._data(c, "olddisplay", z)));
        for (q = 0; q < n; q++)
            if (c = b[q], c.style && (!j || "none" === c.style.display || "" === c.style.display)) c.style.display = j ? d[q] || "" : "none";
        return b
    }

    function E(b, j, c) {
        return (b = vc.exec(j)) ? Math.max(0, b[1] - (c || 0)) + (b[2] || "px") : j
    }

    function Xa(b, j, c, z) {
        j = c === (z ? "border" : "content") ? 4 : "width" === j ? 1 : 0;
        for (var d = 0; 4 > j; j += 2) "margin" === c && (d += e.css(b, c + ea[j], !0)), z ? ("content" === c && (d -= parseFloat(Q(b, "padding" + ea[j])) || 0), "margin" !== c && (d -= parseFloat(Q(b, "border" + ea[j] + "Width")) || 0)) : (d += parseFloat(Q(b,
            "padding" + ea[j])) || 0, "padding" !== c && (d += parseFloat(Q(b, "border" + ea[j] + "Width")) || 0));
        return d
    }

    function M(b, j, c) {
        var z = "width" === j ? b.offsetWidth : b.offsetHeight,
            d = !0,
            q = e.support.boxSizing && "border-box" === e.css(b, "boxSizing");
        if (0 >= z || null == z) {
            z = Q(b, j);
            if (0 > z || null == z) z = b.style[j];
            if (ya.test(z)) return z;
            d = q && (e.support.boxSizingReliable || z === b.style[j]);
            z = parseFloat(z) || 0
        }
        return z + Xa(b, j, c || (q ? "border" : "content"), d) + "px"
    }

    function L(b) {
        if (Ya[b]) return Ya[b];
        var j = e("<" + b + ">").appendTo(B.body),
            c = j.css("display");
        j.remove();
        if ("none" === c || "" === c) {
            la = B.body.appendChild(la || e.extend(B.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!ma || !la.createElement) ma = (la.contentWindow || la.contentDocument).document, ma.write("<!doctype html><html><body>"), ma.close();
            j = ma.body.appendChild(ma.createElement(b));
            c = Q(j, "display");
            B.body.removeChild(la)
        }
        return Ya[b] = c, c
    }

    function P(b, j, c, z) {
        var d;
        if (e.isArray(j)) e.each(j, function(j, e) {
            c || wc.test(b) ? z(b, e) : P(b + "[" + ("object" == typeof e ? j : "") + "]", e, c, z)
        });
        else if (!c &&
            "object" === e.type(j))
            for (d in j) P(b + "[" + d + "]", j[d], c, z);
        else z(b, j)
    }

    function za(b) {
        return function(j, c) {
            "string" != typeof j && (c = j, j = "*");
            var z, d, q = j.toLowerCase().split(fa),
                n = 0,
                f = q.length;
            if (e.isFunction(c))
                for (; n < f; n++) z = q[n], (d = /^\+/.test(z)) && (z = z.substr(1) || "*"), z = b[z] = b[z] || [], z[d ? "unshift" : "push"](c)
        }
    }

    function na(b, j, v, e, d, q) {
        d = d || j.dataTypes[0];
        q = q || {};
        q[d] = !0;
        var n;
        d = b[d];
        for (var f = 0, l = d ? d.length : 0, g = b === Za; f < l && (g || !n); f++) n = d[f](j, v, e), "string" == typeof n && (!g || q[n] ? n = c : (j.dataTypes.unshift(n),
            n = na(b, j, v, e, n, q)));
        return (g || !n) && !q["*"] && (n = na(b, j, v, e, "*", q)), n
    }

    function sa(b, j) {
        var v, z, d = e.ajaxSettings.flatOptions || {};
        for (v in j) j[v] !== c && ((d[v] ? b : z || (z = {}))[v] = j[v]);
        z && e.extend(!0, b, z)
    }

    function zb() {
        try {
            return new b.XMLHttpRequest
        } catch (u) {}
    }

    function Ab() {
        return setTimeout(function() {
            Aa = c
        }, 0), Aa = e.now()
    }

    function Bb(b, j, c) {
        var z, d = 0,
            q = Ba.length,
            n = e.Deferred().always(function() {
                delete f.elem
            }),
            f = function() {
                for (var j = Aa || Ab(), j = Math.max(0, l.startTime + l.duration - j), c = 1 - (j / l.duration || 0), v =
                    0, e = l.tweens.length; v < e; v++) l.tweens[v].run(c);
                return n.notifyWith(b, [l, c, j]), 1 > c && e ? j : (n.resolveWith(b, [l]), !1)
            },
            l = n.promise({
                elem: b,
                props: e.extend({}, j),
                opts: e.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: j,
                originalOptions: c,
                startTime: Aa || Ab(),
                duration: c.duration,
                tweens: [],
                createTween: function(j, c) {
                    var v = e.Tween(b, l.opts, j, c, l.opts.specialEasing[j] || l.opts.easing);
                    return l.tweens.push(v), v
                },
                stop: function(j) {
                    for (var c = 0, v = j ? l.tweens.length : 0; c < v; c++) l.tweens[c].run(1);
                    return j ? n.resolveWith(b, [l, j]) : n.rejectWith(b, [l, j]), this
                }
            });
        j = l.props;
        c = l.opts.specialEasing;
        var g, p, m, r;
        for (z in j)
            if (g = e.camelCase(z), p = c[g], m = j[z], e.isArray(m) && (p = m[1], m = j[z] = m[0]), z !== g && (j[g] = m, delete j[z]), (r = e.cssHooks[g]) && "expand" in r)
                for (z in m = r.expand(m), delete j[g], m) z in j || (j[z] = m[z], c[z] = p);
            else c[g] = p;
        for (; d < q; d++)
            if (z = Ba[d].call(l, b, j, l.opts)) return z;
        var t = l;
        e.each(j, function(b, u) {
            for (var j = (ta[b] || []).concat(ta["*"]), c = 0, v = j.length; c < v && !j[c].call(t, b, u); c++);
        });
        return e.isFunction(l.opts.start) && l.opts.start.call(b,
            l), e.fx.timer(e.extend(f, {
            anim: l,
            queue: l.opts.queue,
            elem: b
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function S(b, j, c, e, d) {
        return new S.prototype.init(b, j, c, e, d)
    }

    function Ca(b, j) {
        var c, e = {
                height: b
            },
            d = 0;
        for (j = j ? 1 : 0; 4 > d; d += 2 - j) c = ea[d], e["margin" + c] = e["padding" + c] = b;
        return j && (e.opacity = e.width = b), e
    }

    function Cb(b) {
        return e.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1
    }
    var Db, Da, B = b.document,
        yc = b.location,
        zc = b.navigator,
        Ac =
        b.jQuery,
        Bc = b.$,
        Eb = Array.prototype.push,
        Z = Array.prototype.slice,
        Fb = Array.prototype.indexOf,
        Cc = Object.prototype.toString,
        $a = Object.prototype.hasOwnProperty,
        ab = String.prototype.trim,
        e = function(b, j) {
            return new e.fn.init(b, j, Db)
        },
        Ea = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Dc = /\S/,
        fa = /\s+/,
        Ec = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Fc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Gb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Gc = /^[\],:{}\s]*$/,
        Hc = /(?:^|:|,)(?:\s*\[)+/g,
        Ic = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Jc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Kc = /^-ms-/,
        Lc = /-([\da-z])/gi,
        Mc = function(b, j) {
            return (j + "").toUpperCase()
        },
        Fa = function() {
            B.addEventListener ? (B.removeEventListener("DOMContentLoaded", Fa, !1), e.ready()) : "complete" === B.readyState && (B.detachEvent("onreadystatechange", Fa), e.ready())
        },
        Hb = {};
    e.fn = e.prototype = {
        constructor: e,
        init: function(b, j, v) {
            var z, d;
            if (!b) return this;
            if (b.nodeType) return this.context = this[0] = b, this.length = 1, this;
            if ("string" == typeof b) {
                "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? z = [null, b, null] : z = Fc.exec(b);
                if (z && (z[1] || !j)) {
                    if (z[1]) return j = j instanceof e ? j[0] : j, d = j && j.nodeType ? j.ownerDocument || j : B, b = e.parseHTML(z[1], d, !0), Gb.test(z[1]) && e.isPlainObject(j) && this.attr.call(b, j, !0), e.merge(this, b);
                    if ((j = B.getElementById(z[2])) && j.parentNode) {
                        if (j.id !== z[2]) return v.find(b);
                        this.length = 1;
                        this[0] = j
                    }
                    return this.context = B, this.selector = b, this
                }
                return !j || j.jquery ? (j || v).find(b) : this.constructor(j).find(b)
            }
            return e.isFunction(b) ? v.ready(b) : (b.selector !== c && (this.selector = b.selector, this.context = b.context), e.makeArray(b,
                this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return Z.call(this)
        },
        get: function(b) {
            return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b]
        },
        pushStack: function(b, j, c) {
            b = e.merge(this.constructor(), b);
            return b.prevObject = this, b.context = this.context, "find" === j ? b.selector = this.selector + (this.selector ? " " : "") + c : j && (b.selector = this.selector + "." + j + "(" + c + ")"), b
        },
        each: function(b, j) {
            return e.each(this, b, j)
        },
        ready: function(b) {
            return e.ready.promise().done(b),
                this
        },
        eq: function(b) {
            return b = +b, -1 === b ? this.slice(b) : this.slice(b, b + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(Z.apply(this, arguments), "slice", Z.call(arguments).join(","))
        },
        map: function(b) {
            return this.pushStack(e.map(this, function(j, c) {
                return b.call(j, c, j)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Eb,
        sort: [].sort,
        splice: [].splice
    };
    e.fn.init.prototype = e.fn;
    e.extend = e.fn.extend = function() {
        var b, j,
            v, z, d, q, n = arguments[0] || {},
            l = 1,
            f = arguments.length,
            g = !1;
        "boolean" == typeof n && (g = n, n = arguments[1] || {}, l = 2);
        "object" != typeof n && !e.isFunction(n) && (n = {});
        for (f === l && (n = this, --l); l < f; l++)
            if (null != (b = arguments[l]))
                for (j in b) v = n[j], z = b[j], n !== z && (g && z && (e.isPlainObject(z) || (d = e.isArray(z))) ? (d ? (d = !1, q = v && e.isArray(v) ? v : []) : q = v && e.isPlainObject(v) ? v : {}, n[j] = e.extend(g, q, z)) : z !== c && (n[j] = z));
        return n
    };
    e.extend({
        noConflict: function(u) {
            return b.$ === e && (b.$ = Bc), u && b.jQuery === e && (b.jQuery = Ac), e
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) {
            b ? e.readyWait++ : e.ready(!0)
        },
        ready: function(b) {
            if (!(!0 === b ? --e.readyWait : e.isReady)) {
                if (!B.body) return setTimeout(e.ready, 1);
                e.isReady = !0;
                !0 !== b && 0 < --e.readyWait || (Da.resolveWith(B, [e]), e.fn.trigger && e(B).trigger("ready").off("ready"))
            }
        },
        isFunction: function(b) {
            return "function" === e.type(b)
        },
        isArray: Array.isArray || function(b) {
            return "array" === e.type(b)
        },
        isWindow: function(b) {
            return null != b && b == b.window
        },
        isNumeric: function(b) {
            return !isNaN(parseFloat(b)) && isFinite(b)
        },
        type: function(b) {
            return null ==
                b ? String(b) : Hb[Cc.call(b)] || "object"
        },
        isPlainObject: function(b) {
            if (!b || "object" !== e.type(b) || b.nodeType || e.isWindow(b)) return !1;
            try {
                if (b.constructor && !$a.call(b, "constructor") && !$a.call(b.constructor.prototype, "isPrototypeOf")) return !1
            } catch (j) {
                return !1
            }
            for (var v in b);
            return v === c || $a.call(b, v)
        },
        isEmptyObject: function(b) {
            for (var j in b) return !1;
            return !0
        },
        error: function(b) {
            throw Error(b);
        },
        parseHTML: function(b, j, c) {
            var z;
            return !b || "string" != typeof b ? null : ("boolean" == typeof j && (c = j, j = 0), j = j || B, (z =
                Gb.exec(b)) ? [j.createElement(z[1])] : (z = e.buildFragment([b], j, c ? null : []), e.merge([], (z.cacheable ? e.clone(z.fragment) : z.fragment).childNodes)))
        },
        parseJSON: function(u) {
            if (!u || "string" != typeof u) return null;
            u = e.trim(u);
            if (b.JSON && b.JSON.parse) return b.JSON.parse(u);
            if (Gc.test(u.replace(Ic, "@").replace(Jc, "]").replace(Hc, ""))) return (new Function("return " + u))();
            e.error("Invalid JSON: " + u)
        },
        parseXML: function(u) {
            var j, v;
            if (!u || "string" != typeof u) return null;
            try {
                b.DOMParser ? (v = new DOMParser, j = v.parseFromString(u,
                    "text/xml")) : (j = new ActiveXObject("Microsoft.XMLDOM"), j.async = "false", j.loadXML(u))
            } catch (z) {
                j = c
            }
            return (!j || !j.documentElement || j.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + u), j
        },
        noop: function() {},
        globalEval: function(u) {
            u && Dc.test(u) && (b.execScript || function(u) {
                b.eval.call(b, u)
            })(u)
        },
        camelCase: function(b) {
            return b.replace(Kc, "ms-").replace(Lc, Mc)
        },
        nodeName: function(b, j) {
            return b.nodeName && b.nodeName.toLowerCase() === j.toLowerCase()
        },
        each: function(b, j, v) {
            var z, d = 0,
                q = b.length,
                n = q === c || e.isFunction(b);
            if (v)
                if (n)
                    for (z in b) {
                        if (!1 === j.apply(b[z], v)) break
                    } else
                        for (; d < q && !1 !== j.apply(b[d++], v););
                else if (n)
                for (z in b) {
                    if (!1 === j.call(b[z], z, b[z])) break
                } else
                    for (; d < q && !1 !== j.call(b[d], d, b[d++]););
            return b
        },
        trim: ab && !ab.call("\ufeff\u00a0") ? function(b) {
            return null == b ? "" : ab.call(b)
        } : function(b) {
            return null == b ? "" : (b + "").replace(Ec, "")
        },
        makeArray: function(b, j) {
            var c, z = j || [];
            return null != b && (c = e.type(b), null == b.length || "string" === c || "function" === c || "regexp" === c || e.isWindow(b) ? Eb.call(z,
                b) : e.merge(z, b)), z
        },
        inArray: function(b, j, c) {
            var e;
            if (j) {
                if (Fb) return Fb.call(j, b, c);
                e = j.length;
                for (c = c ? 0 > c ? Math.max(0, e + c) : c : 0; c < e; c++)
                    if (c in j && j[c] === b) return c
            }
            return -1
        },
        merge: function(b, j) {
            var v = j.length,
                e = b.length,
                d = 0;
            if ("number" == typeof v)
                for (; d < v; d++) b[e++] = j[d];
            else
                for (; j[d] !== c;) b[e++] = j[d++];
            return b.length = e, b
        },
        grep: function(b, j, c) {
            var e, d = [],
                q = 0,
                n = b.length;
            for (c = !!c; q < n; q++) e = !!j(b[q], q), c !== e && d.push(b[q]);
            return d
        },
        map: function(b, j, v) {
            var d, C, q = [],
                n = 0,
                l = b.length;
            if (b instanceof e ||
                l !== c && "number" == typeof l && (0 < l && b[0] && b[l - 1] || 0 === l || e.isArray(b)))
                for (; n < l; n++) d = j(b[n], n, v), null != d && (q[q.length] = d);
            else
                for (C in b) d = j(b[C], C, v), null != d && (q[q.length] = d);
            return q.concat.apply([], q)
        },
        guid: 1,
        proxy: function(b, j) {
            var v, d, C;
            return "string" == typeof j && (v = b[j], j = b, b = v), e.isFunction(b) ? (d = Z.call(arguments, 2), C = function() {
                return b.apply(j, d.concat(Z.call(arguments)))
            }, C.guid = b.guid = b.guid || e.guid++, C) : c
        },
        access: function(b, j, v, d, C, q, n) {
            var l, f = null == v,
                g = 0,
                p = b.length;
            if (v && "object" == typeof v) {
                for (g in v) e.access(b,
                    j, g, v[g], 1, q, d);
                C = 1
            } else if (d !== c) {
                l = n === c && e.isFunction(d);
                f && (l ? (l = j, j = function(b, u, j) {
                    return l.call(e(b), j)
                }) : (j.call(b, d), j = null));
                if (j)
                    for (; g < p; g++) j(b[g], v, l ? d.call(b[g], g, j(b[g], v)) : d, n);
                C = 1
            }
            return C ? b : f ? j.call(b) : p ? j(b[0], v) : q
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    e.ready.promise = function(u) {
        if (!Da)
            if (Da = e.Deferred(), "complete" === B.readyState) setTimeout(e.ready, 1);
            else if (B.addEventListener) B.addEventListener("DOMContentLoaded", Fa, !1), b.addEventListener("load", e.ready, !1);
        else {
            B.attachEvent("onreadystatechange",
                Fa);
            b.attachEvent("onload", e.ready);
            var j = !1;
            try {
                j = null == b.frameElement && B.documentElement
            } catch (c) {}
            j && j.doScroll && function C() {
                if (!e.isReady) {
                    try {
                        j.doScroll("left")
                    } catch (b) {
                        return setTimeout(C, 50)
                    }
                    e.ready()
                }
            }()
        }
        return Da.promise(u)
    };
    e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(b, j) {
        Hb["[object " + j + "]"] = j.toLowerCase()
    });
    Db = e(B);
    var Ib = {};
    e.Callbacks = function(b) {
        var j;
        if ("string" == typeof b) {
            if (!(j = Ib[b])) {
                j = b;
                var v = Ib[j] = {};
                j = (e.each(j.split(fa), function(b,
                    u) {
                    v[u] = !0
                }), v)
            }
        } else j = e.extend({}, b);
        b = j;
        var d, C, q, n, l, f, g = [],
            p = !b.once && [],
            m = function(j) {
                d = b.memory && j;
                C = !0;
                f = n || 0;
                n = 0;
                l = g.length;
                for (q = !0; g && f < l; f++)
                    if (!1 === g[f].apply(j[0], j[1]) && b.stopOnFalse) {
                        d = !1;
                        break
                    }
                q = !1;
                g && (p ? p.length && m(p.shift()) : d ? g = [] : r.disable())
            },
            r = {
                add: function() {
                    if (g) {
                        var j = g.length;
                        (function xc(j) {
                            e.each(j, function(j, c) {
                                var v = e.type(c);
                                "function" === v && (!b.unique || !r.has(c)) ? g.push(c) : c && c.length && "string" !== v && xc(c)
                            })
                        })(arguments);
                        q ? l = g.length : d && (n = j, m(d))
                    }
                    return this
                },
                remove: function() {
                    return g &&
                        e.each(arguments, function(b, u) {
                            for (var j; - 1 < (j = e.inArray(u, g, j));) g.splice(j, 1), q && (j <= l && l--, j <= f && f--)
                        }), this
                },
                has: function(b) {
                    return -1 < e.inArray(b, g)
                },
                empty: function() {
                    return g = [], this
                },
                disable: function() {
                    return g = p = d = c, this
                },
                disabled: function() {
                    return !g
                },
                lock: function() {
                    return p = c, d || r.disable(), this
                },
                locked: function() {
                    return !p
                },
                fireWith: function(b, u) {
                    return u = u || [], u = [b, u.slice ? u.slice() : u], g && (!C || p) && (q ? p.push(u) : m(u)), this
                },
                fire: function() {
                    return r.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!C
                }
            };
        return r
    };
    e.extend({
        Deferred: function(b) {
            var j = [
                    ["resolve", "done", e.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", e.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", e.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return C.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var b = arguments;
                        return e.Deferred(function(u) {
                            e.each(j, function(j, c) {
                                var v = c[0],
                                    d = b[j];
                                C[c[1]](e.isFunction(d) ? function() {
                                    var b = d.apply(this, arguments);
                                    b && e.isFunction(b.promise) ?
                                        b.promise().done(u.resolve).fail(u.reject).progress(u.notify) : u[v + "With"](this === C ? u : this, [b])
                                } : u[v])
                            });
                            b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? e.extend(b, d) : d
                    }
                },
                C = {};
            return d.pipe = d.then, e.each(j, function(b, u) {
                var e = u[2],
                    l = u[3];
                d[u[1]] = e.add;
                l && e.add(function() {
                    c = l
                }, j[b ^ 1][2].disable, j[2][2].lock);
                C[u[0]] = e.fire;
                C[u[0] + "With"] = e.fireWith
            }), d.promise(C), b && b.call(C, C), C
        },
        when: function(b) {
            var j = 0,
                c = Z.call(arguments),
                d = c.length,
                C = 1 !== d || b && e.isFunction(b.promise) ? d : 0,
                q = 1 === C ? b : e.Deferred(),
                n = function(b, u, j) {
                    return function(c) {
                        u[b] = this;
                        j[b] = 1 < arguments.length ? Z.call(arguments) : c;
                        j === l ? q.notifyWith(u, j) : --C || q.resolveWith(u, j)
                    }
                },
                l, f, g;
            if (1 < d) {
                l = Array(d);
                f = Array(d);
                for (g = Array(d); j < d; j++) c[j] && e.isFunction(c[j].promise) ? c[j].promise().done(n(j, g, c)).fail(q.reject).progress(n(j, f, l)) : --C
            }
            return C || q.resolveWith(g, c), q.promise()
        }
    });
    var Nc = e,
        bb, O, Ga, ga, Ha, Ia, T, ha, Ja, cb, ua, Jb, K = B.createElement("div");
    K.setAttribute("className", "t");
    K.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    Ga = K.getElementsByTagName("*");
    ga = K.getElementsByTagName("a")[0];
    ga.style.cssText = "top:1px;float:left;opacity:.5";
    if (!Ga || !Ga.length) bb = {};
    else {
        Ha = B.createElement("select");
        Ia = Ha.appendChild(B.createElement("option"));
        T = K.getElementsByTagName("input")[0];
        O = {
            leadingWhitespace: 3 === K.firstChild.nodeType,
            tbody: !K.getElementsByTagName("tbody").length,
            htmlSerialize: !!K.getElementsByTagName("link").length,
            style: /top/.test(ga.getAttribute("style")),
            hrefNormalized: "/a" === ga.getAttribute("href"),
            opacity: /^0.5/.test(ga.style.opacity),
            cssFloat: !!ga.style.cssFloat,
            checkOn: "on" === T.value,
            optSelected: Ia.selected,
            getSetAttribute: "t" !== K.className,
            enctype: !!B.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== B.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === B.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        T.checked = !0;
        O.noCloneChecked = T.cloneNode(!0).checked;
        Ha.disabled = !0;
        O.optDisabled = !Ia.disabled;
        try {
            delete K.test
        } catch (Pd) {
            O.deleteExpando = !1
        }!K.addEventListener && K.attachEvent && K.fireEvent && (K.attachEvent("onclick", Jb = function() {
            O.noCloneEvent = !1
        }), K.cloneNode(!0).fireEvent("onclick"), K.detachEvent("onclick", Jb));
        T = B.createElement("input");
        T.value = "t";
        T.setAttribute("type", "radio");
        O.radioValue = "t" === T.value;
        T.setAttribute("checked", "checked");
        T.setAttribute("name", "t");
        K.appendChild(T);
        ha = B.createDocumentFragment();
        ha.appendChild(K.lastChild);
        O.checkClone =
            ha.cloneNode(!0).cloneNode(!0).lastChild.checked;
        O.appendChecked = T.checked;
        ha.removeChild(T);
        ha.appendChild(K);
        if (K.attachEvent)
            for (cb in {
                submit: !0,
                change: !0,
                focusin: !0
            }) Ja = "on" + cb, (ua = Ja in K) || (K.setAttribute(Ja, "return;"), ua = "function" == typeof K[Ja]), O[cb + "Bubbles"] = ua;
        bb = (e(function() {
            var u, j, c, e, d = B.getElementsByTagName("body")[0];
            d && (u = B.createElement("div"), u.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", d.insertBefore(u, d.firstChild), j = B.createElement("div"),
                u.appendChild(j), j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c = j.getElementsByTagName("td"), c[0].style.cssText = "padding:0;margin:0;border:0;display:none", ua = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", O.reliableHiddenOffsets = ua && 0 === c[0].offsetHeight, j.innerHTML = "", j.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", O.boxSizing =
                4 === j.offsetWidth, O.doesNotIncludeMarginInBodyOffset = 1 !== d.offsetTop, b.getComputedStyle && (O.pixelPosition = "1%" !== (b.getComputedStyle(j, null) || {}).top, O.boxSizingReliable = "4px" === (b.getComputedStyle(j, null) || {
                    width: "4px"
                }).width, e = B.createElement("div"), e.style.cssText = j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", e.style.marginRight = e.style.width = "0", j.style.width = "1px", j.appendChild(e), O.reliableMarginRight = !parseFloat((b.getComputedStyle(e, null) || {}).marginRight)),
                "undefined" != typeof j.style.zoom && (j.innerHTML = "", j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", O.inlineBlockNeedsLayout = 3 === j.offsetWidth, j.style.display = "block", j.style.overflow = "visible", j.innerHTML = "<div></div>", j.firstChild.style.width = "5px", O.shrinkWrapBlocks = 3 !== j.offsetWidth, u.style.zoom = 1), d.removeChild(u))
        }), ha.removeChild(K), Ga = ga = Ha = Ia = T = ha = K = null, O)
    }
    Nc.support = bb;
    var tc = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        sc = /([A-Z])/g;
    e.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (e.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(b) {
            return b = b.nodeType ? e.cache[b[e.expando]] : b[e.expando], !!b && !f(b)
        },
        data: function(b, j, v, d) {
            if (e.acceptData(b)) {
                var C, q, n = e.expando,
                    l = "string" == typeof j,
                    f = b.nodeType,
                    g = f ? e.cache : b,
                    p = f ? b[n] : b[n] && n;
                if (p && g[p] && (d || g[p].data) || !(l && v === c)) {
                    p || (f ? b[n] = p = e.deletedIds.pop() || e.guid++ : p = n);
                    g[p] || (g[p] = {},
                        f || (g[p].toJSON = e.noop));
                    if ("object" == typeof j || "function" == typeof j) d ? g[p] = e.extend(g[p], j) : g[p].data = e.extend(g[p].data, j);
                    return C = g[p], d || (C.data || (C.data = {}), C = C.data), v !== c && (C[e.camelCase(j)] = v), l ? (q = C[j], null == q && (q = C[e.camelCase(j)])) : q = C, q
                }
            }
        },
        removeData: function(b, j, c) {
            if (e.acceptData(b)) {
                var d, C, q, n = b.nodeType,
                    l = n ? e.cache : b,
                    g = n ? b[e.expando] : e.expando;
                if (l[g]) {
                    if (j && (d = c ? l[g] : l[g].data)) {
                        e.isArray(j) || (j in d ? j = [j] : (j = e.camelCase(j), j in d ? j = [j] : j = j.split(" ")));
                        C = 0;
                        for (q = j.length; C < q; C++) delete d[j[C]];
                        if (!(c ? f : e.isEmptyObject)(d)) return
                    }
                    if (c || !(delete l[g].data, !f(l[g]))) n ? e.cleanData([b], !0) : e.support.deleteExpando || l != l.window ? delete l[g] : l[g] = null
                }
            }
        },
        _data: function(b, j, c) {
            return e.data(b, j, c, !0)
        },
        acceptData: function(b) {
            var j = b.nodeName && e.noData[b.nodeName.toLowerCase()];
            return !j || !0 !== j && b.getAttribute("classid") === j
        }
    });
    e.fn.extend({
        data: function(b, j) {
            var v, z, C, q, n, l = this[0],
                f = 0,
                g = null;
            if (b === c) {
                if (this.length && (g = e.data(l), 1 === l.nodeType && !e._data(l, "parsedAttrs"))) {
                    C = l.attributes;
                    for (n = C.length; f <
                        n; f++) q = C[f].name, q.indexOf("data-") || (q = e.camelCase(q.substring(5)), d(l, q, g[q]));
                    e._data(l, "parsedAttrs", !0)
                }
                return g
            }
            return "object" == typeof b ? this.each(function() {
                e.data(this, b)
            }) : (v = b.split(".", 2), v[1] = v[1] ? "." + v[1] : "", z = v[1] + "!", e.access(this, function(j) {
                if (j === c) return g = this.triggerHandler("getData" + z, [v[0]]), g === c && l && (g = e.data(l, b), g = d(l, b, g)), g === c && v[1] ? this.data(v[0]) : g;
                v[1] = j;
                this.each(function() {
                    var c = e(this);
                    c.triggerHandler("setData" + z, v);
                    e.data(this, b, j);
                    c.triggerHandler("changeData" +
                        z, v)
                })
            }, null, j, 1 < arguments.length, null, !1))
        },
        removeData: function(b) {
            return this.each(function() {
                e.removeData(this, b)
            })
        }
    });
    e.extend({
        queue: function(b, j, c) {
            var d;
            if (b) return j = (j || "fx") + "queue", d = e._data(b, j), c && (!d || e.isArray(c) ? d = e._data(b, j, e.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function(b, j) {
            j = j || "fx";
            var c = e.queue(b, j),
                d = c.length,
                C = c.shift(),
                l = e._queueHooks(b, j),
                n = function() {
                    e.dequeue(b, j)
                };
            "inprogress" === C && (C = c.shift(), d--);
            C && ("fx" === j && c.unshift("inprogress"), delete l.stop, C.call(b, n, l));
            !d && l && l.empty.fire()
        },
        _queueHooks: function(b, j) {
            var c = j + "queueHooks";
            return e._data(b, c) || e._data(b, c, {
                empty: e.Callbacks("once memory").add(function() {
                    e.removeData(b, j + "queue", !0);
                    e.removeData(b, c, !0)
                })
            })
        }
    });
    e.fn.extend({
        queue: function(b, j) {
            var v = 2;
            return "string" != typeof b && (j = b, b = "fx", v--), arguments.length < v ? e.queue(this[0], b) : j === c ? this : this.each(function() {
                var c = e.queue(this, b, j);
                e._queueHooks(this, b);
                "fx" === b && "inprogress" !== c[0] && e.dequeue(this, b)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                e.dequeue(this,
                    b)
            })
        },
        delay: function(b, j) {
            return b = e.fx ? e.fx.speeds[b] || b : b, j = j || "fx", this.queue(j, function(j, c) {
                var e = setTimeout(j, b);
                c.stop = function() {
                    clearTimeout(e)
                }
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(b, j) {
            var v, d = 1,
                C = e.Deferred(),
                l = this,
                n = this.length,
                f = function() {
                    --d || C.resolveWith(l, [l])
                };
            "string" != typeof b && (j = b, b = c);
            for (b = b || "fx"; n--;)(v = e._data(l[n], b + "queueHooks")) && v.empty && (d++, v.empty.add(f));
            return f(), C.promise(j)
        }
    });
    var ba, Kb, Lb, Mb = /[\t\r\n]/g,
        Oc = /\r/g,
        Pc = /^(?:button|input)$/i,
        Qc = /^(?:button|input|object|select|textarea)$/i,
        Rc = /^a(?:rea|)$/i,
        Nb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Ob = e.support.getSetAttribute;
    e.fn.extend({
        attr: function(b, j) {
            return e.access(this, e.attr, b, j, 1 < arguments.length)
        },
        removeAttr: function(b) {
            return this.each(function() {
                e.removeAttr(this, b)
            })
        },
        prop: function(b, j) {
            return e.access(this, e.prop, b, j, 1 < arguments.length)
        },
        removeProp: function(b) {
            return b = e.propFix[b] ||
                b, this.each(function() {
                    try {
                        this[b] = c, delete this[b]
                    } catch (j) {}
                })
        },
        addClass: function(b) {
            var j, c, d, l, q, n, f;
            if (e.isFunction(b)) return this.each(function(j) {
                e(this).addClass(b.call(this, j, this.className))
            });
            if (b && "string" == typeof b) {
                j = b.split(fa);
                c = 0;
                for (d = this.length; c < d; c++)
                    if (l = this[c], 1 === l.nodeType)
                        if (!l.className && 1 === j.length) l.className = b;
                        else {
                            q = " " + l.className + " ";
                            n = 0;
                            for (f = j.length; n < f; n++) 0 > q.indexOf(" " + j[n] + " ") && (q += j[n] + " ");
                            l.className = e.trim(q)
                        }
            }
            return this
        },
        removeClass: function(b) {
            var j,
                v, d, l, q, n, f;
            if (e.isFunction(b)) return this.each(function(j) {
                e(this).removeClass(b.call(this, j, this.className))
            });
            if (b && "string" == typeof b || b === c) {
                j = (b || "").split(fa);
                n = 0;
                for (f = this.length; n < f; n++)
                    if (d = this[n], 1 === d.nodeType && d.className) {
                        v = (" " + d.className + " ").replace(Mb, " ");
                        l = 0;
                        for (q = j.length; l < q; l++)
                            for (; 0 <= v.indexOf(" " + j[l] + " ");) v = v.replace(" " + j[l] + " ", " ");
                        d.className = b ? e.trim(v) : ""
                    }
            }
            return this
        },
        toggleClass: function(b, j) {
            var c = typeof b,
                d = "boolean" == typeof j;
            return e.isFunction(b) ? this.each(function(c) {
                e(this).toggleClass(b.call(this,
                    c, this.className, j), j)
            }) : this.each(function() {
                if ("string" === c)
                    for (var l, q = 0, n = e(this), f = j, g = b.split(fa); l = g[q++];) f = d ? f : !n.hasClass(l), n[f ? "addClass" : "removeClass"](l);
                else if ("undefined" === c || "boolean" === c) this.className && e._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : e._data(this, "__className__") || ""
            })
        },
        hasClass: function(b) {
            b = " " + b + " ";
            for (var j = 0, c = this.length; j < c; j++)
                if (1 === this[j].nodeType && 0 <= (" " + this[j].className + " ").replace(Mb, " ").indexOf(b)) return !0;
            return !1
        },
        val: function(b) {
            var j, v, d, l = this[0];
            if (arguments.length) return d = e.isFunction(b), this.each(function(v) {
                var n, l = e(this);
                if (1 === this.nodeType && (d ? n = b.call(this, v, l.val()) : n = b, null == n ? n = "" : "number" == typeof n ? n += "" : e.isArray(n) && (n = e.map(n, function(b) {
                    return null == b ? "" : b + ""
                })), j = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()], !j || !("set" in j) || j.set(this, n, "value") === c)) this.value = n
            });
            if (l) return j = e.valHooks[l.type] || e.valHooks[l.nodeName.toLowerCase()], j && "get" in j && (v = j.get(l,
                "value")) !== c ? v : (v = l.value, "string" == typeof v ? v.replace(Oc, "") : null == v ? "" : v)
        }
    });
    e.extend({
        valHooks: {
            option: {
                get: function(b) {
                    var j = b.attributes.value;
                    return !j || j.specified ? b.value : b.text
                }
            },
            select: {
                get: function(b) {
                    var j, c, d = b.selectedIndex,
                        l = [],
                        q = b.options,
                        n = "select-one" === b.type;
                    if (0 > d) return null;
                    b = n ? d : 0;
                    for (c = n ? d + 1 : q.length; b < c; b++)
                        if (j = q[b], j.selected && (e.support.optDisabled ? !j.disabled : null === j.getAttribute("disabled")) && (!j.parentNode.disabled || !e.nodeName(j.parentNode, "optgroup"))) {
                            j = e(j).val();
                            if (n) return j;
                            l.push(j)
                        }
                    return n && !l.length && q.length ? e(q[d]).val() : l
                },
                set: function(b, j) {
                    var c = e.makeArray(j);
                    return e(b).find("option").each(function() {
                        this.selected = 0 <= e.inArray(e(this).val(), c)
                    }), c.length || (b.selectedIndex = -1), c
                }
            }
        },
        attrFn: {},
        attr: function(b, j, d, z) {
            var l, q, n = b.nodeType;
            if (b && !(3 === n || 8 === n || 2 === n)) {
                if (z && e.isFunction(e.fn[j])) return e(b)[j](d);
                if ("undefined" == typeof b.getAttribute) return e.prop(b, j, d);
                (z = 1 !== n || !e.isXMLDoc(b)) && (j = j.toLowerCase(), q = e.attrHooks[j] || (Nb.test(j) ? Kb :
                    ba));
                if (d !== c) {
                    if (null === d) {
                        e.removeAttr(b, j);
                        return
                    }
                    return q && "set" in q && z && (l = q.set(b, d, j)) !== c ? l : (b.setAttribute(j, d + ""), d)
                }
                return q && "get" in q && z && null !== (l = q.get(b, j)) ? l : (l = b.getAttribute(j), null === l ? c : l)
            }
        },
        removeAttr: function(b, j) {
            var c, d, l, q, n = 0;
            if (j && 1 === b.nodeType)
                for (d = j.split(fa); n < d.length; n++)(l = d[n]) && (c = e.propFix[l] || l, q = Nb.test(l), q || e.attr(b, l, ""), b.removeAttribute(Ob ? l : c), q && c in b && (b[c] = !1))
        },
        attrHooks: {
            type: {
                set: function(b, j) {
                    if (Pc.test(b.nodeName) && b.parentNode) e.error("type property can't be changed");
                    else if (!e.support.radioValue && "radio" === j && e.nodeName(b, "input")) {
                        var c = b.value;
                        return b.setAttribute("type", j), c && (b.value = c), j
                    }
                }
            },
            value: {
                get: function(b, j) {
                    return ba && e.nodeName(b, "button") ? ba.get(b, j) : j in b ? b.value : null
                },
                set: function(b, j, c) {
                    if (ba && e.nodeName(b, "button")) return ba.set(b, j, c);
                    b.value = j
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(b, j, d) {
            var z, l, q, n = b.nodeType;
            if (b && !(3 === n || 8 === n || 2 === n)) return q = 1 !== n || !e.isXMLDoc(b), q && (j = e.propFix[j] || j, l = e.propHooks[j]), d !== c ? l && "set" in l && (z = l.set(b, d, j)) !== c ? z : b[j] = d : l && "get" in l && null !== (z = l.get(b, j)) ? z : b[j]
        },
        propHooks: {
            tabIndex: {
                get: function(b) {
                    var j = b.getAttributeNode("tabindex");
                    return j && j.specified ? parseInt(j.value, 10) : Qc.test(b.nodeName) || Rc.test(b.nodeName) && b.href ? 0 : c
                }
            }
        }
    });
    Kb = {
        get: function(b,
            j) {
            var d, z = e.prop(b, j);
            return !0 === z || "boolean" != typeof z && (d = b.getAttributeNode(j)) && !1 !== d.nodeValue ? j.toLowerCase() : c
        },
        set: function(b, j, c) {
            var d;
            return !1 === j ? e.removeAttr(b, c) : (d = e.propFix[c] || c, d in b && (b[d] = !0), b.setAttribute(c, c.toLowerCase())), c
        }
    };
    Ob || (Lb = {
        name: !0,
        id: !0,
        coords: !0
    }, ba = e.valHooks.button = {
        get: function(b, j) {
            var e;
            return e = b.getAttributeNode(j), e && (Lb[j] ? "" !== e.value : e.specified) ? e.value : c
        },
        set: function(b, j, c) {
            var e = b.getAttributeNode(c);
            return e || (e = B.createAttribute(c), b.setAttributeNode(e)),
                e.value = j + ""
        }
    }, e.each(["width", "height"], function(b, j) {
        e.attrHooks[j] = e.extend(e.attrHooks[j], {
            set: function(b, c) {
                if ("" === c) return b.setAttribute(j, "auto"), c
            }
        })
    }), e.attrHooks.contenteditable = {
        get: ba.get,
        set: function(b, j, c) {
            "" === j && (j = "false");
            ba.set(b, j, c)
        }
    });
    e.support.hrefNormalized || e.each(["href", "src", "width", "height"], function(b, j) {
        e.attrHooks[j] = e.extend(e.attrHooks[j], {
            get: function(b) {
                b = b.getAttribute(j, 2);
                return null === b ? c : b
            }
        })
    });
    e.support.style || (e.attrHooks.style = {
        get: function(b) {
            return b.style.cssText.toLowerCase() ||
                c
        },
        set: function(b, j) {
            return b.style.cssText = j + ""
        }
    });
    e.support.optSelected || (e.propHooks.selected = e.extend(e.propHooks.selected, {
        get: function(b) {
            b = b.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }));
    e.support.enctype || (e.propFix.enctype = "encoding");
    e.support.checkOn || e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = {
            get: function(b) {
                return null === b.getAttribute("value") ? "on" : b.value
            }
        }
    });
    e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = e.extend(e.valHooks[this], {
            set: function(b, j) {
                if (e.isArray(j)) return b.checked = 0 <= e.inArray(e(b).val(), j)
            }
        })
    });
    var db = /^(?:textarea|input|select)$/i,
        Pb = /^([^\.]*|)(?:\.(.+)|)$/,
        Sc = /(?:^|\s)hover(\.\S+|)\b/,
        Tc = /^key/,
        Uc = /^(?:mouse|contextmenu)|click/,
        Qb = /^(?:focusinfocus|focusoutblur)$/,
        Rb = function(b) {
            return e.event.special.hover ? b : b.replace(Sc, "mouseenter$1 mouseleave$1")
        };
    e.event = {
        add: function(b, j, d, z, l) {
            var q, n, f, g, p, m, r, t, y;
            if (!(3 === b.nodeType || 8 === b.nodeType || !j || !d || !(q = e._data(b)))) {
                d.handler && (r = d, d = r.handler, l = r.selector);
                d.guid || (d.guid = e.guid++);
                (f = q.events) || (q.events = f = {});
                (n = q.handle) || (q.handle = n = function(b) {
                    return "undefined" != typeof e && (!b || e.event.triggered !== b.type) ? e.event.dispatch.apply(n.elem, arguments) : c
                }, n.elem = b);
                j = e.trim(Rb(j)).split(" ");
                for (q = 0; q < j.length; q++) {
                    g = Pb.exec(j[q]) || [];
                    p = g[1];
                    m = (g[2] || "").split(".").sort();
                    y = e.event.special[p] || {};
                    p = (l ? y.delegateType : y.bindType) || p;
                    y = e.event.special[p] || {};
                    g = e.extend({
                        type: p,
                        origType: g[1],
                        data: z,
                        handler: d,
                        guid: d.guid,
                        selector: l,
                        needsContext: l && e.expr.match.needsContext.test(l),
                        namespace: m.join(".")
                    }, r);
                    t = f[p];
                    if (!t && (t = f[p] = [], t.delegateCount = 0, !y.setup || !1 === y.setup.call(b, z, m, n))) b.addEventListener ? b.addEventListener(p, n, !1) : b.attachEvent && b.attachEvent("on" + p, n);
                    y.add && (y.add.call(b, g), g.handler.guid || (g.handler.guid = d.guid));
                    l ? t.splice(t.delegateCount++, 0, g) : t.push(g);
                    e.event.global[p] = !0
                }
                b = null
            }
        },
        global: {},
        remove: function(b, j, c, d, l) {
            var q, n, f, g, p, m, r, t, y, s, D = e.hasData(b) && e._data(b);
            if (D && (r = D.events)) {
                j = e.trim(Rb(j || "")).split(" ");
                for (q = 0; q < j.length; q++)
                    if (n = Pb.exec(j[q]) || [], f = g = n[1], n = n[2], f) {
                        t = e.event.special[f] || {};
                        f = (d ? t.delegateType : t.bindType) || f;
                        y = r[f] || [];
                        p = y.length;
                        n = n ? RegExp("(^|\\.)" + n.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (m = 0; m < y.length; m++) s = y[m], (l || g === s.origType) && (!c || c.guid === s.guid) && (!n || n.test(s.namespace)) && (!d || d === s.selector || "**" === d && s.selector) && (y.splice(m--, 1), s.selector && y.delegateCount--, t.remove && t.remove.call(b, s));
                        0 === y.length && p !== y.length && ((!t.teardown || !1 === t.teardown.call(b, n, D.handle)) && e.removeEvent(b,
                            f, D.handle), delete r[f])
                    } else
                        for (f in r) e.event.remove(b, f + j[q], c, d, !0);
                e.isEmptyObject(r) && (delete D.handle, e.removeData(b, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(u, j, d, z) {
            if (!d || 3 !== d.nodeType && 8 !== d.nodeType) {
                var l, q, n, f, g, p, m, r = u.type || u;
                f = [];
                if (!Qb.test(r + e.event.triggered) && (0 <= r.indexOf("!") && (r = r.slice(0, -1), l = !0), 0 <= r.indexOf(".") && (f = r.split("."), r = f.shift(), f.sort()), d && !e.event.customEvent[r] || e.event.global[r]))
                    if (u = "object" == typeof u ? u[e.expando] ?
                        u : new e.Event(r, u) : new e.Event(r), u.type = r, u.isTrigger = !0, u.exclusive = l, u.namespace = f.join("."), u.namespace_re = u.namespace ? RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f = 0 > r.indexOf(":") ? "on" + r : "", d) {
                        if (u.result = c, u.target || (u.target = d), j = null != j ? e.makeArray(j) : [], j.unshift(u), g = e.event.special[r] || {}, !(g.trigger && !1 === g.trigger.apply(d, j))) {
                            m = [
                                [d, g.bindType || r]
                            ];
                            if (!z && !g.noBubble && !e.isWindow(d)) {
                                q = g.delegateType || r;
                                l = Qb.test(q + r) ? d : d.parentNode;
                                for (n = d; l; l = l.parentNode) m.push([l, q]),
                                    n = l;
                                n === (d.ownerDocument || B) && m.push([n.defaultView || n.parentWindow || b, q])
                            }
                            for (q = 0; q < m.length && !u.isPropagationStopped(); q++) l = m[q][0], u.type = m[q][1], (p = (e._data(l, "events") || {})[u.type] && e._data(l, "handle")) && p.apply(l, j), (p = f && l[f]) && e.acceptData(l) && p.apply && !1 === p.apply(l, j) && u.preventDefault();
                            return u.type = r, !z && !u.isDefaultPrevented() && (!g._default || !1 === g._default.apply(d.ownerDocument, j)) && ("click" !== r || !e.nodeName(d, "a")) && e.acceptData(d) && f && d[r] && ("focus" !== r && "blur" !== r || 0 !== u.target.offsetWidth) &&
                                !e.isWindow(d) && (n = d[f], n && (d[f] = null), e.event.triggered = r, d[r](), e.event.triggered = c, n && (d[f] = n)), u.result
                        }
                    } else
                        for (q in d = e.cache, d) d[q].events && d[q].events[r] && e.event.trigger(u, j, d[q].handle.elem, !0)
            }
        },
        dispatch: function(u) {
            u = e.event.fix(u || b.event);
            var j, d, z, l, q, n, f = (e._data(this, "events") || {})[u.type] || [],
                g = f.delegateCount,
                p = Z.call(arguments),
                r = !u.exclusive && !u.namespace,
                m = e.event.special[u.type] || {},
                t = [];
            p[0] = u;
            u.delegateTarget = this;
            if (!(m.preDispatch && !1 === m.preDispatch.call(this, u))) {
                if (g &&
                    (!u.button || "click" !== u.type))
                    for (d = u.target; d != this; d = d.parentNode || this)
                        if (!0 !== d.disabled || "click" !== u.type) {
                            l = {};
                            q = [];
                            for (j = 0; j < g; j++) z = f[j], n = z.selector, l[n] === c && (l[n] = z.needsContext ? 0 <= e(n, this).index(d) : e.find(n, this, null, [d]).length), l[n] && q.push(z);
                            q.length && t.push({
                                elem: d,
                                matches: q
                            })
                        }
                f.length > g && t.push({
                    elem: this,
                    matches: f.slice(g)
                });
                for (j = 0; j < t.length && !u.isPropagationStopped(); j++) {
                    l = t[j];
                    u.currentTarget = l.elem;
                    for (d = 0; d < l.matches.length && !u.isImmediatePropagationStopped(); d++)
                        if (z = l.matches[d],
                            r || !u.namespace && !z.namespace || u.namespace_re && u.namespace_re.test(z.namespace)) u.data = z.data, u.handleObj = z, z = ((e.event.special[z.origType] || {}).handle || z.handler).apply(l.elem, p), z !== c && (u.result = z, !1 === z && (u.preventDefault(), u.stopPropagation()))
                }
                return m.postDispatch && m.postDispatch.call(this, u), u.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(b, j) {
                return null == b.which && (b.which = null != j.charCode ? j.charCode : j.keyCode), b
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b, j) {
                var d, e, l, f = j.button,
                    n = j.fromElement;
                return null == b.pageX && null != j.clientX && (d = b.target.ownerDocument || B, e = d.documentElement, l = d.body, b.pageX = j.clientX + (e && e.scrollLeft || l && l.scrollLeft || 0) - (e && e.clientLeft ||
                    l && l.clientLeft || 0), b.pageY = j.clientY + (e && e.scrollTop || l && l.scrollTop || 0) - (e && e.clientTop || l && l.clientTop || 0)), !b.relatedTarget && n && (b.relatedTarget = n === b.target ? j.toElement : n), !b.which && f !== c && (b.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0), b
            }
        },
        fix: function(b) {
            if (b[e.expando]) return b;
            var j, c, d = b,
                l = e.event.fixHooks[b.type] || {},
                f = l.props ? this.props.concat(l.props) : this.props;
            b = e.Event(d);
            for (j = f.length; j;) c = f[--j], b[c] = d[c];
            return b.target || (b.target = d.srcElement || B), 3 === b.target.nodeType && (b.target = b.target.parentNode),
                b.metaKey = !!b.metaKey, l.filter ? l.filter(b, d) : b
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(b, j, c) {
                    e.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(b, j) {
                    this.onbeforeunload === j && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(b, j, c, d) {
            b = e.extend(new e.Event, c, {
                type: b,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? e.event.trigger(b, null, j) : e.event.dispatch.call(j, b);
            b.isDefaultPrevented() && c.preventDefault()
        }
    };
    e.event.handle =
        e.event.dispatch;
    e.removeEvent = B.removeEventListener ? function(b, j, c) {
        b.removeEventListener && b.removeEventListener(j, c, !1)
    } : function(b, j, c) {
        j = "on" + j;
        b.detachEvent && ("undefined" == typeof b[j] && (b[j] = null), b.detachEvent(j, c))
    };
    e.Event = function(b, j) {
        if (this instanceof e.Event) b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? m : g) : this.type = b, j && e.extend(this, j), this.timeStamp = b && b.timeStamp || e.now(),
            this[e.expando] = !0;
        else return new e.Event(b, j)
    };
    e.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = m;
            var b = this.originalEvent;
            b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = m;
            var b = this.originalEvent;
            b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = m;
            this.stopPropagation()
        },
        isDefaultPrevented: g,
        isPropagationStopped: g,
        isImmediatePropagationStopped: g
    };
    e.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(b, j) {
        e.event.special[b] = {
            delegateType: j,
            bindType: j,
            handle: function(b) {
                var c, u = b.relatedTarget,
                    d = b.handleObj;
                if (!u || u !== this && !e.contains(this, u)) b.type = d.origType, c = d.handler.apply(this, arguments), b.type = j;
                return c
            }
        }
    });
    e.support.submitBubbles || (e.event.special.submit = {
        setup: function() {
            if (e.nodeName(this, "form")) return !1;
            e.event.add(this, "click._submit keypress._submit", function(b) {
                b = b.target;
                (b = e.nodeName(b, "input") || e.nodeName(b, "button") ?
                    b.form : c) && !e._data(b, "_submit_attached") && (e.event.add(b, "submit._submit", function(b) {
                    b._submit_bubble = !0
                }), e._data(b, "_submit_attached", !0))
            })
        },
        postDispatch: function(b) {
            b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && e.event.simulate("submit", this.parentNode, b, !0))
        },
        teardown: function() {
            if (e.nodeName(this, "form")) return !1;
            e.event.remove(this, "._submit")
        }
    });
    e.support.changeBubbles || (e.event.special.change = {
        setup: function() {
            if (db.test(this.nodeName)) {
                if ("checkbox" === this.type ||
                    "radio" === this.type) e.event.add(this, "propertychange._change", function(b) {
                    "checked" === b.originalEvent.propertyName && (this._just_changed = !0)
                }), e.event.add(this, "click._change", function(b) {
                    this._just_changed && !b.isTrigger && (this._just_changed = !1);
                    e.event.simulate("change", this, b, !0)
                });
                return !1
            }
            e.event.add(this, "beforeactivate._change", function(b) {
                b = b.target;
                db.test(b.nodeName) && !e._data(b, "_change_attached") && (e.event.add(b, "change._change", function(b) {
                    this.parentNode && !b.isSimulated && !b.isTrigger &&
                        e.event.simulate("change", this.parentNode, b, !0)
                }), e._data(b, "_change_attached", !0))
            })
        },
        handle: function(b) {
            var j = b.target;
            if (this !== j || b.isSimulated || b.isTrigger || "radio" !== j.type && "checkbox" !== j.type) return b.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return e.event.remove(this, "._change"), !db.test(this.nodeName)
        }
    });
    e.support.focusinBubbles || e.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, j) {
        var c = 0,
            d = function(b) {
                e.event.simulate(j, b.target, e.event.fix(b), !0)
            };
        e.event.special[j] = {
            setup: function() {
                0 === c++ && B.addEventListener(b, d, !0)
            },
            teardown: function() {
                0 === --c && B.removeEventListener(b, d, !0)
            }
        }
    });
    e.fn.extend({
        on: function(b, j, d, l, f) {
            var q, n;
            if ("object" == typeof b) {
                "string" != typeof j && (d = d || j, j = c);
                for (n in b) this.on(n, j, d, b[n], f);
                return this
            }
            null == d && null == l ? (l = j, d = j = c) : null == l && ("string" == typeof j ? (l = d, d = c) : (l = d, d = j, j = c));
            if (!1 === l) l = g;
            else if (!l) return this;
            return 1 === f && (q = l, l = function(b) {
                return e().off(b), q.apply(this, arguments)
            }, l.guid = q.guid || (q.guid = e.guid++)), this.each(function() {
                e.event.add(this,
                    b, l, d, j)
            })
        },
        one: function(b, c, d, e) {
            return this.on(b, c, d, e, 1)
        },
        off: function(b, j, d) {
            var l, f;
            if (b && b.preventDefault && b.handleObj) return l = b.handleObj, e(b.delegateTarget).off(l.namespace ? l.origType + "." + l.namespace : l.origType, l.selector, l.handler), this;
            if ("object" == typeof b) {
                for (f in b) this.off(f, j, b[f]);
                return this
            }
            if (!1 === j || "function" == typeof j) d = j, j = c;
            return !1 === d && (d = g), this.each(function() {
                e.event.remove(this, b, d, j)
            })
        },
        bind: function(b, c, d) {
            return this.on(b, null, c, d)
        },
        unbind: function(b, c) {
            return this.off(b,
                null, c)
        },
        live: function(b, c, d) {
            return e(this.context).on(b, this.selector, c, d), this
        },
        die: function(b, c) {
            return e(this.context).off(b, this.selector || "**", c), this
        },
        delegate: function(b, c, d, e) {
            return this.on(c, b, d, e)
        },
        undelegate: function(b, c, d) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
        },
        trigger: function(b, c) {
            return this.each(function() {
                e.event.trigger(b, c, this)
            })
        },
        triggerHandler: function(b, c) {
            if (this[0]) return e.event.trigger(b, c, this[0], !0)
        },
        toggle: function(b) {
            var c = arguments,
                d =
                b.guid || e.guid++,
                l = 0,
                f = function(d) {
                    var v = (e._data(this, "lastToggle" + b.guid) || 0) % l;
                    return e._data(this, "lastToggle" + b.guid, v + 1), d.preventDefault(), c[v].apply(this, arguments) || !1
                };
            for (f.guid = d; l < c.length;) c[l++].guid = d;
            return this.click(f)
        },
        hover: function(b, c) {
            return this.mouseenter(b).mouseleave(c || b)
        }
    });
    e.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(b, c) {
            e.fn[c] = function(b, u) {
                return null == u && (u = b, b = null), 0 < arguments.length ? this.on(c, null, b, u) : this.trigger(c)
            };
            Tc.test(c) && (e.event.fixHooks[c] = e.event.keyHooks);
            Uc.test(c) && (e.event.fixHooks[c] = e.event.mouseHooks)
        });
    var Vc = b,
        F = function(b, c, d, e) {
            d = d || [];
            c = c || W;
            var l, f, n, g, p = c.nodeType;
            if (!b || "string" != typeof b) return d;
            if (1 !== p && 9 !== p) return [];
            n = Ka(c);
            if (!n && !e && (l = Wc.exec(b)))
                if (g = l[1])
                    if (9 === p) {
                        f = c.getElementById(g);
                        if (!f || !f.parentNode) return d;
                        if (f.id === g) return d.push(f), d
                    } else {
                        if (c.ownerDocument &&
                            (f = c.ownerDocument.getElementById(g)) && Sb(c, f) && f.id === g) return d.push(f), d
                    } else {
                if (l[2]) return oa.apply(d, pa.call(c.getElementsByTagName(b), 0)), d;
                if ((g = l[3]) && Tb && c.getElementsByClassName) return oa.apply(d, pa.call(c.getElementsByClassName(g), 0)), d
            }
            return eb(b.replace(La, "$1"), c, d, e, n)
        },
        va = function(b) {
            return function(c) {
                return "input" === c.nodeName.toLowerCase() && c.type === b
            }
        },
        Ub = function(b) {
            return function(c) {
                var d = c.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && c.type === b
            }
        },
        ia = function(b) {
            return X(function(c) {
                return c = +c, X(function(d, e) {
                    for (var l, f = b([], d.length, c), n = f.length; n--;) d[l = f[n]] && (d[l] = !(e[l] = d[l]))
                })
            })
        },
        Ma = function(b, c, d) {
            if (b === c) return d;
            for (b = b.nextSibling; b;) {
                if (b === c) return -1;
                b = b.nextSibling
            }
            return 1
        },
        Oa = function(b, c) {
            var d, e, l, f, n, g, p;
            if (n = Vb[N][b]) return c ? 0 : n.slice(0);
            n = b;
            g = [];
            for (p = H.preFilter; n;) {
                if (!d || (e = Xc.exec(n))) e && (n = n.slice(e[0].length)), g.push(l = []);
                d = !1;
                if (e = Yc.exec(n)) l.push(d = new Wb(e.shift())), n = n.slice(d.length), d.type = e[0].replace(La, " ");
                for (f in H.filter)(e = Na[f].exec(n)) &&
                    (!p[f] || (e = p[f](e, W, !0))) && (l.push(d = new Wb(e.shift())), n = n.slice(d.length), d.type = f, d.matches = e);
                if (!d) break
            }
            return c ? n.length : n ? F.error(b) : Vb(b, g).slice(0)
        },
        gb = function(b, c, d) {
            var e = c.dir,
                l = d && "parentNode" === c.dir,
                f = Zc++;
            return c.first ? function(c, j, d) {
                for (; c = c[e];)
                    if (l || 1 === c.nodeType) return b(c, j, d)
            } : function(c, j, d) {
                if (d)
                    for (; c = c[e];) {
                        if ((l || 1 === c.nodeType) && b(c, j, d)) return c
                    } else
                        for (var v, g = wa + " " + f + " ", p = g + fb; c = c[e];)
                            if (l || 1 === c.nodeType) {
                                if ((v = c[N]) === p) return c.sizset;
                                if ("string" == typeof v &&
                                    0 === v.indexOf(g)) {
                                    if (c.sizset) return c
                                } else {
                                    c[N] = p;
                                    if (b(c, j, d)) return c.sizset = !0, c;
                                    c.sizset = !1
                                }
                            }
            }
        },
        hb = function(b) {
            return 1 < b.length ? function(c, d, e) {
                for (var l = b.length; l--;)
                    if (!b[l](c, d, e)) return !1;
                return !0
            } : b[0]
        },
        Pa = function(b, c, d, e, l) {
            for (var f, n = [], g = 0, p = b.length, r = null != c; g < p; g++)
                if (f = b[g])
                    if (!d || d(f, e, l)) n.push(f), r && c.push(g);
            return n
        },
        ib = function(b, c, d, e, l, f) {
            return e && !e[N] && (e = ib(e)), l && !l[N] && (l = ib(l, f)), X(function(f, g, q, p) {
                if (!f || !l) {
                    var r, m, t = [],
                        y = [],
                        s = g.length;
                    if (!(m = f)) {
                        m = c || "*";
                        var D =
                            q.nodeType ? [q] : q,
                            A = [];
                        r = 0;
                        for (var x = D.length; r < x; r++) F(m, D[r], A, f);
                        m = A
                    }
                    D = b && (f || !c) ? Pa(m, t, b, q, p) : m;
                    A = d ? l || (f ? b : s || e) ? [] : g : D;
                    d && d(D, A, q, p);
                    if (e) {
                        m = Pa(A, y);
                        e(m, [], q, p);
                        for (q = m.length; q--;)
                            if (r = m[q]) A[y[q]] = !(D[y[q]] = r)
                    }
                    if (f)
                        for (q = b && A.length; q--;) {
                            if (r = A[q]) f[t[q]] = !(g[t[q]] = r)
                        } else A = Pa(A === g ? A.splice(s, A.length) : A), l ? l(null, g, A, p) : oa.apply(g, A)
                }
            })
        },
        jb = function(b) {
            var c, d, e, l = b.length,
                f = H.relative[b[0].type];
            d = f || H.relative[" "];
            for (var n = f ? 1 : 0, g = gb(function(b) {
                return b === c
            }, d, !0), p = gb(function(b) {
                return -1 <
                    Xb.call(c, b)
            }, d, !0), r = [
                function(b, u, d) {
                    return !f && (d || u !== Qa) || ((c = u).nodeType ? g(b, u, d) : p(b, u, d))
                }
            ]; n < l; n++)
                if (d = H.relative[b[n].type]) r = [gb(hb(r), d)];
                else {
                    d = H.filter[b[n].type].apply(null, b[n].matches);
                    if (d[N]) {
                        for (e = ++n; e < l && !H.relative[b[e].type]; e++);
                        return ib(1 < n && hb(r), 1 < n && b.slice(0, n - 1).join("").replace(La, "$1"), d, n < e && jb(b.slice(n, e)), e < l && jb(b = b.slice(e)), e < l && b.join(""))
                    }
                    r.push(d)
                }
            return hb(r)
        },
        eb = function(b, c, d, e, l) {
            var f, n, g, p, r = Oa(b);
            if (!e && 1 === r.length) {
                n = r[0] = r[0].slice(0);
                if (2 < n.length &&
                    "ID" === (g = n[0]).type && 9 === c.nodeType && !l && H.relative[n[1].type]) {
                    c = H.find.ID(g.matches[0].replace(ja, ""), c, l)[0];
                    if (!c) return d;
                    b = b.slice(n.shift().length)
                }
                for (f = Na.POS.test(b) ? -1 : n.length - 1; 0 <= f; f--) {
                    g = n[f];
                    if (H.relative[p = g.type]) break;
                    if (p = H.find[p])
                        if (e = p(g.matches[0].replace(ja, ""), kb.test(n[0].type) && c.parentNode || c, l)) {
                            n.splice(f, 1);
                            b = e.length && n.join("");
                            if (!b) return oa.apply(d, pa.call(e, 0)), d;
                            break
                        }
                }
            }
            return lb(b, r)(e, c, l, d, kb.test(b)), d
        },
        Yb = function() {},
        fb, mb, H, Ra, Ka, Sb, lb, nb, xa, Qa, Zb = !0,
        N = ("sizcache" + Math.random()).replace(".", ""),
        Wb = String,
        W = Vc.document,
        V = W.documentElement,
        wa = 0,
        Zc = 0,
        $c = [].pop,
        oa = [].push,
        pa = [].slice,
        Xb = [].indexOf || function(b) {
            for (var c = 0, d = this.length; c < d; c++)
                if (this[c] === b) return c;
            return -1
        },
        X = function(b, c) {
            return b[N] = null == c || c, b
        },
        ob = function() {
            var b = {},
                c = [];
            return X(function(d, e) {
                return c.push(d) > H.cacheLength && delete b[c.shift()], b[d] = e
            }, b)
        },
        $b = ob(),
        Vb = ob(),
        ac = ob(),
        bc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        pb = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + bc + ")|[^:]|\\\\.)*|.*))\\)|)",
        La = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        Xc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        Yc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        ad = RegExp(pb),
        Wc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        kb = /[\x20\t\r\n\f]*[+~]/,
        bd = /h\d/i,
        cd = /input|select|textarea|button/i,
        ja = /\\(?!\\)/g,
        Na = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + bc),
            PSEUDO: RegExp("^" + pb),
            POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        ca = function(b) {
            var c = W.createElement("div");
            try {
                return b(c)
            } catch (d) {
                return !1
            } finally {}
        },
        dd = ca(function(b) {
            return b.appendChild(W.createComment("")), !b.getElementsByTagName("*").length
        }),
        ed = ca(function(b) {
            return b.innerHTML = "<a href='#'></a>", b.firstChild && "undefined" !== typeof b.firstChild.getAttribute && "#" === b.firstChild.getAttribute("href")
        }),
        fd = ca(function(b) {
            b.innerHTML = "<select></select>";
            b = typeof b.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b
        }),
        Tb = ca(function(b) {
            return b.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !b.getElementsByClassName || !b.getElementsByClassName("e").length ? !1 : (b.lastChild.className = "e", 2 === b.getElementsByClassName("e").length)
        }),
        gd = ca(function(b) {
            b.id = N + 0;
            b.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>";
            V.insertBefore(b, V.firstChild);
            var c = W.getElementsByName &&
                W.getElementsByName(N).length === 2 + W.getElementsByName(N + 0).length;
            return mb = !W.getElementById(N), V.removeChild(b), c
        });
    try {
        pa.call(V.childNodes, 0)[0].nodeType
    } catch (Qd) {
        pa = function(b) {
            for (var c, d = []; c = this[b]; b++) d.push(c);
            return d
        }
    }
    F.matches = function(b, c) {
        return F(b, null, null, c)
    };
    F.matchesSelector = function(b, c) {
        return 0 < F(c, null, null, [b]).length
    };
    Ra = F.getText = function(b) {
        var c, d = "",
            e = 0;
        if (c = b.nodeType)
            if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof b.textContent) return b.textContent;
                for (b = b.firstChild; b; b =
                    b.nextSibling) d += Ra(b)
            } else {
                if (3 === c || 4 === c) return b.nodeValue
            } else
            for (; c = b[e]; e++) d += Ra(c);
        return d
    };
    Ka = F.isXML = function(b) {
        return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1
    };
    Sb = F.contains = V.contains ? function(b, c) {
        var d = 9 === b.nodeType ? b.documentElement : b,
            e = c && c.parentNode;
        return b === e || !(!e || !(1 === e.nodeType && d.contains && d.contains(e)))
    } : V.compareDocumentPosition ? function(b, c) {
        return c && !!(b.compareDocumentPosition(c) & 16)
    } : function(b, c) {
        for (; c = c.parentNode;)
            if (c === b) return !0;
        return !1
    };
    F.attr = function(b, c) {
        var d, e = Ka(b);
        return e || (c = c.toLowerCase()), (d = H.attrHandle[c]) ? d(b) : e || fd ? b.getAttribute(c) : (d = b.getAttributeNode(c), d ? "boolean" == typeof b[c] ? b[c] ? c : null : d.specified ? d.value : null : null)
    };
    H = F.selectors = {
        cacheLength: 50,
        createPseudo: X,
        match: Na,
        attrHandle: ed ? {} : {
            href: function(b) {
                return b.getAttribute("href", 2)
            },
            type: function(b) {
                return b.getAttribute("type")
            }
        },
        find: {
            ID: mb ? function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (b = c.getElementById(b)) && b.parentNode ? [b] : []
            } : function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(b)) ? c.id === b || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === b ? [c] : void 0 : []
            },
            TAG: dd ? function(b, c) {
                if ("undefined" !== typeof c.getElementsByTagName) return c.getElementsByTagName(b)
            } : function(b, c) {
                var d = c.getElementsByTagName(b);
                if ("*" === b) {
                    for (var e, l = [], f = 0; e = d[f]; f++) 1 === e.nodeType && l.push(e);
                    return l
                }
                return d
            },
            NAME: gd && function(b, c) {
                if ("undefined" !== typeof c.getElementsByName) return c.getElementsByName(name)
            },
            CLASS: Tb && function(b, c, d) {
                if ("undefined" !== typeof c.getElementsByClassName && !d) return c.getElementsByClassName(b)
            }
        },
        relative: {
            ">": {
                dir: "parentNode",
                first: !0
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: !0
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(b) {
                return b[1] = b[1].replace(ja, ""), b[3] = (b[4] || b[5] || "").replace(ja, ""), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
            },
            CHILD: function(b) {
                return b[1] = b[1].toLowerCase(), "nth" === b[1] ? (b[2] || F.error(b[0]), b[3] = +(b[3] ? b[4] + (b[5] || 1) :
                    2 * ("even" === b[2] || "odd" === b[2])), b[4] = +(b[6] + b[7] || "odd" === b[2])) : b[2] && F.error(b[0]), b
            },
            PSEUDO: function(b) {
                var c, d;
                if (Na.CHILD.test(b[0])) return null;
                if (b[3]) b[2] = b[3];
                else if (c = b[4]) ad.test(c) && (d = Oa(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (c = c.slice(0, d), b[0] = b[0].slice(0, d)), b[2] = c;
                return b.slice(0, 3)
            }
        },
        filter: {
            ID: mb ? function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return c.getAttribute("id") === b
                    }
            } : function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return (c = "undefined" !== typeof c.getAttributeNode &&
                            c.getAttributeNode("id")) && c.value === b
                    }
            },
            TAG: function(b) {
                return "*" === b ? function() {
                    return !0
                } : (b = b.replace(ja, "").toLowerCase(), function(c) {
                    return c.nodeName && c.nodeName.toLowerCase() === b
                })
            },
            CLASS: function(b) {
                var c = $b[N][b];
                return c || (c = $b(b, RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"))),
                    function(b) {
                        return c.test(b.className || "undefined" !== typeof b.getAttribute && b.getAttribute("class") || "")
                    }
            },
            ATTR: function(b, c, d) {
                return function(e) {
                    e = F.attr(e, b);
                    return null == e ? "!=" === c : c ? (e += "", "=" ===
                        c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.substr(e.length - d.length) === d : "~=" === c ? -1 < (" " + e + " ").indexOf(d) : "|=" === c ? e === d || e.substr(0, d.length + 1) === d + "-" : !1) : !0
                }
            },
            CHILD: function(b, c, d, e) {
                return "nth" === b ? function(b) {
                    var c, j;
                    c = b.parentNode;
                    if (1 === d && 0 === e) return !0;
                    if (c) {
                        j = 0;
                        for (c = c.firstChild; c && !(1 === c.nodeType && (j++, b === c)); c = c.nextSibling);
                    }
                    return j -= e, j === d || 0 === j % d && 0 <= j / d
                } : function(c) {
                    var j = c;
                    switch (b) {
                        case "only":
                        case "first":
                            for (; j = j.previousSibling;)
                                if (1 ===
                                    j.nodeType) return !1;
                            if ("first" === b) return !0;
                            j = c;
                        case "last":
                            for (; j = j.nextSibling;)
                                if (1 === j.nodeType) return !1;
                            return !0
                    }
                }
            },
            PSEUDO: function(b, c) {
                var d, e = H.pseudos[b] || H.setFilters[b.toLowerCase()] || F.error("unsupported pseudo: " + b);
                return e[N] ? e(c) : 1 < e.length ? (d = [b, b, "", c], H.setFilters.hasOwnProperty(b.toLowerCase()) ? X(function(b, d) {
                    for (var u, l = e(b, c), f = l.length; f--;) u = Xb.call(b, l[f]), b[u] = !(d[u] = l[f])
                }) : function(b) {
                    return e(b, 0, d)
                }) : e
            }
        },
        pseudos: {
            not: X(function(b) {
                var c = [],
                    d = [],
                    e = lb(b.replace(La, "$1"));
                return e[N] ? X(function(b, c, j, d) {
                    d = e(b, null, d, []);
                    for (var u = b.length; u--;)
                        if (j = d[u]) b[u] = !(c[u] = j)
                }) : function(b, u, l) {
                    return c[0] = b, e(c, null, l, d), !d.pop()
                }
            }),
            has: X(function(b) {
                return function(c) {
                    return 0 < F(b, c).length
                }
            }),
            contains: X(function(b) {
                return function(c) {
                    return -1 < (c.textContent || c.innerText || Ra(c)).indexOf(b)
                }
            }),
            enabled: function(b) {
                return !1 === b.disabled
            },
            disabled: function(b) {
                return !0 === b.disabled
            },
            checked: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && !!b.checked || "option" ===
                    c && !!b.selected
            },
            selected: function(b) {
                return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
            },
            parent: function(b) {
                return !H.pseudos.empty(b)
            },
            empty: function(b) {
                var c;
                for (b = b.firstChild; b;) {
                    if ("@" < b.nodeName || 3 === (c = b.nodeType) || 4 === c) return !1;
                    b = b.nextSibling
                }
                return !0
            },
            header: function(b) {
                return bd.test(b.nodeName)
            },
            text: function(b) {
                var c, d;
                return "input" === b.nodeName.toLowerCase() && "text" === (c = b.type) && (null == (d = b.getAttribute("type")) || d.toLowerCase() === c)
            },
            radio: va("radio"),
            checkbox: va("checkbox"),
            file: va("file"),
            password: va("password"),
            image: va("image"),
            submit: Ub("submit"),
            reset: Ub("reset"),
            button: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && "button" === b.type || "button" === c
            },
            input: function(b) {
                return cd.test(b.nodeName)
            },
            focus: function(b) {
                var c = b.ownerDocument;
                return b === c.activeElement && (!c.hasFocus || c.hasFocus()) && (!!b.type || !!b.href)
            },
            active: function(b) {
                return b === b.ownerDocument.activeElement
            },
            first: ia(function() {
                return [0]
            }),
            last: ia(function(b, c) {
                return [c - 1]
            }),
            eq: ia(function(b,
                c, d) {
                return [0 > d ? d + c : d]
            }),
            even: ia(function(b, c) {
                for (var d = 0; d < c; d += 2) b.push(d);
                return b
            }),
            odd: ia(function(b, c) {
                for (var d = 1; d < c; d += 2) b.push(d);
                return b
            }),
            lt: ia(function(b, c, d) {
                for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
                return b
            }),
            gt: ia(function(b, c, d) {
                for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
                return b
            })
        }
    };
    nb = V.compareDocumentPosition ? function(b, c) {
        return b === c ? (xa = !0, 0) : (!b.compareDocumentPosition || !c.compareDocumentPosition ? b.compareDocumentPosition : b.compareDocumentPosition(c) & 4) ? -1 : 1
    } : function(b, c) {
        if (b === c) return xa = !0, 0;
        if (b.sourceIndex && c.sourceIndex) return b.sourceIndex - c.sourceIndex;
        var d, e, l = [],
            f = [];
        d = b.parentNode;
        e = c.parentNode;
        var g = d;
        if (d === e) return Ma(b, c);
        if (!d) return -1;
        if (!e) return 1;
        for (; g;) l.unshift(g), g = g.parentNode;
        for (g = e; g;) f.unshift(g), g = g.parentNode;
        d = l.length;
        e = f.length;
        for (g = 0; g < d && g < e; g++)
            if (l[g] !== f[g]) return Ma(l[g], f[g]);
        return g === d ? Ma(b, f[g], -1) : Ma(l[g], c, 1)
    };
    [0, 0].sort(nb);
    Zb = !xa;
    F.uniqueSort = function(b) {
        var c, d = 1;
        xa = Zb;
        b.sort(nb);
        if (xa)
            for (; c = b[d]; d++) c === b[d - 1] && b.splice(d--, 1);
        return b
    };
    F.error = function(b) {
        throw Error("Syntax error, unrecognized expression: " + b);
    };
    lb = F.compile = function(b, c) {
        var d, e = [],
            l = [],
            f = ac[N][b];
        if (!f) {
            c || (c = Oa(b));
            for (d = c.length; d--;) f = jb(c[d]), f[N] ? e.push(f) : l.push(f);
            var g = 0 < e.length,
                p = 0 < l.length,
                r = function(b, c, d, j, u) {
                    var f, v, q = [],
                        m = 0,
                        t = "0",
                        y = b && [],
                        s = null != u,
                        A = Qa,
                        D = b || p && H.find.TAG("*", u && c.parentNode || c),
                        x = wa += null == A ? 1 : Math.E;
                    for (s && (Qa = c !== W && c, fb = r.el); null != (u = D[t]); t++) {
                        if (p && u) {
                            for (f = 0; v = l[f]; f++)
                                if (v(u, c, d)) {
                                    j.push(u);
                                    break
                                }
                            s && (wa = x, fb =
                                ++r.el)
                        }
                        g && ((u = !v && u) && m--, b && y.push(u))
                    }
                    m += t;
                    if (g && t !== m) {
                        for (f = 0; v = e[f]; f++) v(y, q, c, d);
                        if (b) {
                            if (0 < m)
                                for (; t--;)!y[t] && !q[t] && (q[t] = $c.call(j));
                            q = Pa(q)
                        }
                        oa.apply(j, q);
                        s && !b && 0 < q.length && 1 < m + e.length && F.uniqueSort(j)
                    }
                    return s && (wa = x, Qa = A), y
                };
            d = (r.el = 0, g ? X(r) : r);
            f = ac(b, d)
        }
        return f
    };
    if (W.querySelectorAll) {
        var cc, hd = eb,
            id = /'|\\/g,
            jd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            Y = [":focus"],
            Sa = [":active", ":focus"],
            Ta = V.matchesSelector || V.mozMatchesSelector || V.webkitMatchesSelector || V.oMatchesSelector ||
            V.msMatchesSelector;
        ca(function(b) {
            b.innerHTML = "<select><option selected=''></option></select>";
            b.querySelectorAll("[selected]").length || Y.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            b.querySelectorAll(":checked").length || Y.push(":checked")
        });
        ca(function(b) {
            b.innerHTML = "<p test=''></p>";
            b.querySelectorAll("[test^='']").length && Y.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
            b.innerHTML = "<input type='hidden'/>";
            b.querySelectorAll(":enabled").length || Y.push(":enabled",
                ":disabled")
        });
        Y = RegExp(Y.join("|"));
        eb = function(b, c, d, e, l) {
            if (!e && !l && (!Y || !Y.test(b))) {
                var f, g, p = !0,
                    r = N;
                g = c;
                f = 9 === c.nodeType && b;
                if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                    f = Oa(b);
                    (p = c.getAttribute("id")) ? r = p.replace(id, "\\$&"): c.setAttribute("id", r);
                    r = "[id='" + r + "'] ";
                    for (g = f.length; g--;) f[g] = r + f[g].join("");
                    g = kb.test(b) && c.parentNode || c;
                    f = f.join(",")
                }
                if (f) try {
                    return oa.apply(d, pa.call(g.querySelectorAll(f), 0)), d
                } catch (m) {} finally {
                    p || c.removeAttribute("id")
                }
            }
            return hd(b, c, d, e, l)
        };
        Ta &&
            (ca(function(b) {
                cc = Ta.call(b, "div");
                try {
                    Ta.call(b, "[test!='']:sizzle"), Sa.push("!=", pb)
                } catch (c) {}
            }), Sa = RegExp(Sa.join("|")), F.matchesSelector = function(b, c) {
                c = c.replace(jd, "='$1']");
                if (!Ka(b) && !Sa.test(c) && (!Y || !Y.test(c))) try {
                    var d = Ta.call(b, c);
                    if (d || cc || b.document && 11 !== b.document.nodeType) return d
                } catch (e) {}
                return 0 < F(c, null, null, [b]).length
            })
    }
    H.pseudos.nth = H.pseudos.eq;
    H.filters = Yb.prototype = H.pseudos;
    H.setFilters = new Yb;
    F.attr = e.attr;
    e.find = F;
    e.expr = F.selectors;
    e.expr[":"] = e.expr.pseudos;
    e.unique =
        F.uniqueSort;
    e.text = F.getText;
    e.isXMLDoc = F.isXML;
    e.contains = F.contains;
    var kd = /Until$/,
        ld = /^(?:parents|prev(?:Until|All))/,
        uc = /^.[^:#\[\.,]*$/,
        dc = e.expr.match.needsContext,
        md = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    e.fn.extend({
        find: function(b) {
            var c, d, l, f, g, n, p = this;
            if ("string" != typeof b) return e(b).filter(function() {
                c = 0;
                for (d = p.length; c < d; c++)
                    if (e.contains(p[c], this)) return !0
            });
            n = this.pushStack("", "find", b);
            c = 0;
            for (d = this.length; c < d; c++)
                if (l = n.length, e.find(b, this[c], n), 0 < c)
                    for (f = l; f < n.length; f++)
                        for (g =
                            0; g < l; g++)
                            if (n[g] === n[f]) {
                                n.splice(f--, 1);
                                break
                            }
            return n
        },
        has: function(b) {
            var c, d = e(b, this),
                l = d.length;
            return this.filter(function() {
                for (c = 0; c < l; c++)
                    if (e.contains(this, d[c])) return !0
            })
        },
        not: function(b) {
            return this.pushStack(y(this, b, !1), "not", b)
        },
        filter: function(b) {
            return this.pushStack(y(this, b, !0), "filter", b)
        },
        is: function(b) {
            return !!b && ("string" == typeof b ? dc.test(b) ? 0 <= e(b, this.context).index(this[0]) : 0 < e.filter(b, this).length : 0 < this.filter(b).length)
        },
        closest: function(b, c) {
            for (var d, l = 0, f = this.length,
                g = [], n = dc.test(b) || "string" != typeof b ? e(b, c || this.context) : 0; l < f; l++)
                for (d = this[l]; d && d.ownerDocument && d !== c && 11 !== d.nodeType;) {
                    if (n ? -1 < n.index(d) : e.find.matchesSelector(d, b)) {
                        g.push(d);
                        break
                    }
                    d = d.parentNode
                }
            return g = 1 < g.length ? e.unique(g) : g, this.pushStack(g, "closest", b)
        },
        index: function(b) {
            return b ? "string" == typeof b ? e.inArray(this[0], e(b)) : e.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(b, c) {
            var d = "string" == typeof b ? e(b, c) : e.makeArray(b && b.nodeType ? [b] : b),
                l = e.merge(this.get(), d);
            return this.pushStack(x(d[0]) || x(l[0]) ? l : e.unique(l))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });
    e.fn.andSelf = e.fn.addBack;
    e.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null
        },
        parents: function(b) {
            return e.dir(b, "parentNode")
        },
        parentsUntil: function(b, c, d) {
            return e.dir(b, "parentNode", d)
        },
        next: function(b) {
            return t(b, "nextSibling")
        },
        prev: function(b) {
            return t(b, "previousSibling")
        },
        nextAll: function(b) {
            return e.dir(b,
                "nextSibling")
        },
        prevAll: function(b) {
            return e.dir(b, "previousSibling")
        },
        nextUntil: function(b, c, d) {
            return e.dir(b, "nextSibling", d)
        },
        prevUntil: function(b, c, d) {
            return e.dir(b, "previousSibling", d)
        },
        siblings: function(b) {
            return e.sibling((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return e.sibling(b.firstChild)
        },
        contents: function(b) {
            return e.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : e.merge([], b.childNodes)
        }
    }, function(b, c) {
        e.fn[b] = function(d, l) {
            var f = e.map(this, c, d);
            return kd.test(b) ||
                (l = d), l && "string" == typeof l && (f = e.filter(l, f)), f = 1 < this.length && !md[b] ? e.unique(f) : f, 1 < this.length && ld.test(b) && (f = f.reverse()), this.pushStack(f, b, Z.call(arguments).join(","))
        }
    });
    e.extend({
        filter: function(b, c, d) {
            return d && (b = ":not(" + b + ")"), 1 === c.length ? e.find.matchesSelector(c[0], b) ? [c[0]] : [] : e.find.matches(b, c)
        },
        dir: function(b, d, l) {
            var f = [];
            for (b = b[d]; b && 9 !== b.nodeType && (l === c || 1 !== b.nodeType || !e(b).is(l));) 1 === b.nodeType && f.push(b), b = b[d];
            return f
        },
        sibling: function(b, c) {
            for (var d = []; b; b = b.nextSibling) 1 ===
                b.nodeType && b !== c && d.push(b);
            return d
        }
    });
    var wb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        nd = / jQuery\d+="(?:null|\d+)"/g,
        qb = /^\s+/,
        ec = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        fc = /<([\w:]+)/,
        od = /<tbody/i,
        pd = /<|&#?\w+;/,
        qd = /<(?:script|style|link)/i,
        rd = /<(?:script|object|embed|option|style)/i,
        rb = RegExp("<(?:" + wb + ")[\\s/>]", "i"),
        xb = /^(?:checkbox|radio)$/,
        gc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        sd = /\/(java|ecma)script/i,
        td = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        U = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        hc = s(B),
        sb = hc.appendChild(B.createElement("div"));
    U.optgroup =
        U.option;
    U.tbody = U.tfoot = U.colgroup = U.caption = U.thead;
    U.th = U.td;
    e.support.htmlSerialize || (U._default = [1, "X<div>", "</div>"]);
    e.fn.extend({
        text: function(b) {
            return e.access(this, function(b) {
                return b === c ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || B).createTextNode(b))
            }, null, b, arguments.length)
        },
        wrapAll: function(b) {
            if (e.isFunction(b)) return this.each(function(c) {
                e(this).wrapAll(b.call(this, c))
            });
            if (this[0]) {
                var c = e(b, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && c.insertBefore(this[0]);
                c.map(function() {
                    for (var b = this; b.firstChild && 1 === b.firstChild.nodeType;) b = b.firstChild;
                    return b
                }).append(this)
            }
            return this
        },
        wrapInner: function(b) {
            return e.isFunction(b) ? this.each(function(c) {
                e(this).wrapInner(b.call(this, c))
            }) : this.each(function() {
                var c = e(this),
                    d = c.contents();
                d.length ? d.wrapAll(b) : c.append(b)
            })
        },
        wrap: function(b) {
            var c = e.isFunction(b);
            return this.each(function(d) {
                e(this).wrapAll(c ? b.call(this, d) : b)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                e.nodeName(this, "body") ||
                    e(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(b)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(b, this.firstChild)
            })
        },
        before: function() {
            if (!x(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this)
            });
            if (arguments.length) {
                var b = e.clean(arguments);
                return this.pushStack(e.merge(b,
                    this), "before", this.selector)
            }
        },
        after: function() {
            if (!x(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this.nextSibling)
            });
            if (arguments.length) {
                var b = e.clean(arguments);
                return this.pushStack(e.merge(this, b), "after", this.selector)
            }
        },
        remove: function(b, c) {
            for (var d, l = 0; null != (d = this[l]); l++)
                if (!b || e.filter(b, [d]).length)!c && 1 === d.nodeType && (e.cleanData(d.getElementsByTagName("*")), e.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var b,
                c = 0; null != (b = this[c]); c++)
                for (1 === b.nodeType && e.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(b, c) {
            return b = null == b ? !1 : b, c = null == c ? b : c, this.map(function() {
                return e.clone(this, b, c)
            })
        },
        html: function(b) {
            return e.access(this, function(b) {
                var d = this[0] || {},
                    l = 0,
                    u = this.length;
                if (b === c) return 1 === d.nodeType ? d.innerHTML.replace(nd, "") : c;
                if ("string" == typeof b && !qd.test(b) && (e.support.htmlSerialize || !rb.test(b)) && (e.support.leadingWhitespace || !qb.test(b)) &&
                    !U[(fc.exec(b) || ["", ""])[1].toLowerCase()]) {
                    b = b.replace(ec, "<$1></$2>");
                    try {
                        for (; l < u; l++) d = this[l] || {}, 1 === d.nodeType && (e.cleanData(d.getElementsByTagName("*")), d.innerHTML = b);
                        d = 0
                    } catch (f) {}
                }
                d && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function(b) {
            return x(this[0]) ? this.length ? this.pushStack(e(e.isFunction(b) ? b() : b), "replaceWith", b) : this : e.isFunction(b) ? this.each(function(c) {
                var d = e(this),
                    l = d.html();
                d.replaceWith(b.call(this, c, l))
            }) : ("string" != typeof b && (b = e(b).detach()), this.each(function() {
                var c =
                    this.nextSibling,
                    d = this.parentNode;
                e(this).remove();
                c ? e(c).before(b) : e(d).append(b)
            }))
        },
        detach: function(b) {
            return this.remove(b, !0)
        },
        domManip: function(b, d, l) {
            b = [].concat.apply([], b);
            var f, g, q, n = 0,
                p = b[0],
                r = [],
                m = this.length;
            if (!e.support.checkClone && 1 < m && "string" == typeof p && gc.test(p)) return this.each(function() {
                e(this).domManip(b, d, l)
            });
            if (e.isFunction(p)) return this.each(function(f) {
                var g = e(this);
                b[0] = p.call(this, f, d ? g.html() : c);
                g.domManip(b, d, l)
            });
            if (this[0]) {
                f = e.buildFragment(b, this, r);
                q = f.fragment;
                g = q.firstChild;
                1 === q.childNodes.length && (q = g);
                if (g) {
                    d = d && e.nodeName(g, "tr");
                    for (f = f.cacheable || m - 1; n < m; n++) l.call(d && e.nodeName(this[n], "table") ? this[n].getElementsByTagName("tbody")[0] || this[n].appendChild(this[n].ownerDocument.createElement("tbody")) : this[n], n === f ? q : e.clone(q, !0, !0))
                }
                q = g = null;
                r.length && e.each(r, function(b, c) {
                    c.src ? e.ajax ? e.ajax({
                        url: c.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : e.error("no ajax") : e.globalEval((c.text || c.textContent || c.innerHTML || "").replace(td,
                        ""));
                    c.parentNode && c.parentNode.removeChild(c)
                })
            }
            return this
        }
    });
    e.buildFragment = function(b, d, l) {
        var f, g, p, n = b[0];
        return d = d || B, d = !d.nodeType && d[0] || d, d = d.ownerDocument || d, 1 === b.length && "string" == typeof n && 512 > n.length && d === B && "<" === n.charAt(0) && !rd.test(n) && (e.support.checkClone || !gc.test(n)) && (e.support.html5Clone || !rb.test(n)) && (g = !0, f = e.fragments[n], p = f !== c), f || (f = d.createDocumentFragment(), e.clean(b, d, f, l), g && (e.fragments[n] = p && f)), {
            fragment: f,
            cacheable: g
        }
    };
    e.fragments = {};
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, c) {
        e.fn[b] = function(d) {
            var l, f = 0,
                g = [];
            d = e(d);
            var n = d.length;
            l = 1 === this.length && this[0].parentNode;
            if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === n) return d[c](this[0]), this;
            for (; f < n; f++) l = (0 < f ? this.clone(!0) : this).get(), e(d[f])[c](l), g = g.concat(l);
            return this.pushStack(g, b, d.selector)
        }
    });
    e.extend({
        clone: function(b, c, d) {
            var f, g, q, n;
            e.support.html5Clone || e.isXMLDoc(b) || !rb.test("<" + b.nodeName +
                ">") ? n = b.cloneNode(!0) : (sb.innerHTML = b.outerHTML, sb.removeChild(n = sb.firstChild));
            if ((!e.support.noCloneEvent || !e.support.noCloneChecked) && (1 === b.nodeType || 11 === b.nodeType) && !e.isXMLDoc(b)) {
                l(b, n);
                f = p(b);
                g = p(n);
                for (q = 0; f[q]; ++q) g[q] && l(f[q], g[q])
            }
            if (c && (A(b, n), d)) {
                f = p(b);
                g = p(n);
                for (q = 0; f[q]; ++q) A(f[q], g[q])
            }
            return n
        },
        clean: function(b, c, d, l) {
            var f, g, n, p, m, t, y, A = c === B && hc,
                D = [];
            if (!c || "undefined" == typeof c.createDocumentFragment) c = B;
            for (f = 0; null != (n = b[f]); f++)
                if ("number" == typeof n && (n += ""), n) {
                    if ("string" ==
                        typeof n)
                        if (pd.test(n)) {
                            A = A || s(c);
                            t = c.createElement("div");
                            A.appendChild(t);
                            n = n.replace(ec, "<$1></$2>");
                            g = (fc.exec(n) || ["", ""])[1].toLowerCase();
                            p = U[g] || U._default;
                            m = p[0];
                            for (t.innerHTML = p[1] + n + p[2]; m--;) t = t.lastChild;
                            if (!e.support.tbody) {
                                m = od.test(n);
                                p = "table" === g && !m ? t.firstChild && t.firstChild.childNodes : "<table>" === p[1] && !m ? t.childNodes : [];
                                for (g = p.length - 1; 0 <= g; --g) e.nodeName(p[g], "tbody") && !p[g].childNodes.length && p[g].parentNode.removeChild(p[g])
                            }!e.support.leadingWhitespace && qb.test(n) && t.insertBefore(c.createTextNode(qb.exec(n)[0]),
                                t.firstChild);
                            n = t.childNodes;
                            t.parentNode.removeChild(t)
                        } else n = c.createTextNode(n);
                    n.nodeType ? D.push(n) : e.merge(D, n)
                }
            t && (n = t = A = null);
            if (!e.support.appendChecked)
                for (f = 0; null != (n = D[f]); f++) e.nodeName(n, "input") ? r(n) : "undefined" != typeof n.getElementsByTagName && e.grep(n.getElementsByTagName("input"), r);
            if (d) {
                b = function(b) {
                    if (!b.type || sd.test(b.type)) return l ? l.push(b.parentNode ? b.parentNode.removeChild(b) : b) : d.appendChild(b)
                };
                for (f = 0; null != (n = D[f]); f++)
                    if (!e.nodeName(n, "script") || !b(n)) d.appendChild(n),
                        "undefined" != typeof n.getElementsByTagName && (y = e.grep(e.merge([], n.getElementsByTagName("script")), b), D.splice.apply(D, [f + 1, 0].concat(y)), f += y.length)
            }
            return D
        },
        cleanData: function(b, c) {
            for (var d, l, f, g, n = 0, p = e.expando, r = e.cache, m = e.support.deleteExpando, t = e.event.special; null != (f = b[n]); n++)
                if (c || e.acceptData(f))
                    if (d = (l = f[p]) && r[l]) {
                        if (d.events)
                            for (g in d.events) t[g] ? e.event.remove(f, g) : e.removeEvent(f, g, d.handle);
                        r[l] && (delete r[l], m ? delete f[p] : f.removeAttribute ? f.removeAttribute(p) : f[p] = null, e.deletedIds.push(l))
                    }
        }
    });
    var Ua, da;
    e.uaMatch = function(b) {
        b = b.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        }
    };
    Ua = e.uaMatch(zc.userAgent);
    da = {};
    Ua.browser && (da[Ua.browser] = !0, da.version = Ua.version);
    da.chrome ? da.webkit = !0 : da.webkit && (da.safari = !0);
    e.browser = da;
    e.sub = function() {
        function b(c, d) {
            return new b.fn.init(c,
                d)
        }
        e.extend(!0, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function(d, l) {
            return l && l instanceof e && !(l instanceof b) && (l = b(l)), e.fn.init.call(this, d, l, c)
        };
        b.fn.init.prototype = b.fn;
        var c = b(B);
        return b
    };
    var Q, la, ma, tb = /alpha\([^)]*\)/i,
        ud = /opacity=([^)]*)/,
        vd = /^(top|right|bottom|left)$/,
        wd = /^(none|table(?!-c[ea]).+)/,
        ic = /^margin/,
        vc = RegExp("^(" + Ea + ")(.*)$", "i"),
        ya = RegExp("^(" + Ea + ")(?!px)[a-z%]+$", "i"),
        xd = RegExp("^([-+])=(" + Ea + ")", "i"),
        Ya = {},
        yd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        jc = {
            letterSpacing: 0,
            fontWeight: 400
        },
        ea = ["Top", "Right", "Bottom", "Left"],
        yb = ["Webkit", "O", "Moz", "ms"],
        zd = e.fn.toggle;
    e.fn.extend({
        css: function(b, d) {
            return e.access(this, function(b, d, j) {
                return j !== c ? e.style(b, d, j) : e.css(b, d)
            }, b, d, 1 < arguments.length)
        },
        show: function() {
            return G(this, !0)
        },
        hide: function() {
            return G(this)
        },
        toggle: function(b, c) {
            var d = "boolean" == typeof b;
            return e.isFunction(b) && e.isFunction(c) ? zd.apply(this, arguments) : this.each(function() {
                (d ? b : J(this)) ? e(this).show():
                    e(this).hide()
            })
        }
    });
    e.extend({
        cssHooks: {
            opacity: {
                get: function(b, c) {
                    if (c) {
                        var d = Q(b, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": e.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(b, d, l, f) {
            if (b && !(3 === b.nodeType || 8 === b.nodeType || !b.style)) {
                var g, p, n, r = e.camelCase(d),
                    m = b.style;
                d = e.cssProps[r] || (e.cssProps[r] = D(m, r));
                n = e.cssHooks[d] || e.cssHooks[r];
                if (l === c) return n && "get" in n && (g = n.get(b, !1, f)) !== c ? g : m[d];
                p = typeof l;
                "string" === p && (g = xd.exec(l)) && (l = (g[1] + 1) * g[2] + parseFloat(e.css(b, d)), p = "number");
                if (!(null == l || "number" === p && isNaN(l)))
                    if ("number" === p && !e.cssNumber[r] && (l += "px"), !n || !("set" in n) || (l = n.set(b, l, f)) !== c) try {
                        m[d] = l
                    } catch (t) {}
            }
        },
        css: function(b, d, l, f) {
            var g, p, n, r = e.camelCase(d);
            return d = e.cssProps[r] || (e.cssProps[r] = D(b.style, r)), n = e.cssHooks[d] || e.cssHooks[r], n && "get" in n && (g = n.get(b, !0, f)), g === c && (g = Q(b, d)), "normal" === g && d in jc && (g = jc[d]), l || f !== c ? (p = parseFloat(g), l ||
                e.isNumeric(p) ? p || 0 : g) : g
        },
        swap: function(b, c, d) {
            var e, l = {};
            for (e in c) l[e] = b.style[e], b.style[e] = c[e];
            d = d.call(b);
            for (e in c) b.style[e] = l[e];
            return d
        }
    });
    b.getComputedStyle ? Q = function(c, d) {
        var l, f, g, p, n = b.getComputedStyle(c, null),
            r = c.style;
        return n && (l = n[d], "" === l && !e.contains(c.ownerDocument, c) && (l = e.style(c, d)), ya.test(l) && ic.test(d) && (f = r.width, g = r.minWidth, p = r.maxWidth, r.minWidth = r.maxWidth = r.width = l, l = n.width, r.width = f, r.minWidth = g, r.maxWidth = p)), l
    } : B.documentElement.currentStyle && (Q = function(b,
        c) {
        var d, e, l = b.currentStyle && b.currentStyle[c],
            f = b.style;
        return null == l && f && f[c] && (l = f[c]), ya.test(l) && !vd.test(c) && (d = f.left, e = b.runtimeStyle && b.runtimeStyle.left, e && (b.runtimeStyle.left = b.currentStyle.left), f.left = "fontSize" === c ? "1em" : l, l = f.pixelLeft + "px", f.left = d, e && (b.runtimeStyle.left = e)), "" === l ? "auto" : l
    });
    e.each(["height", "width"], function(b, c) {
        e.cssHooks[c] = {
            get: function(b, d, l) {
                if (d) return 0 === b.offsetWidth && wd.test(Q(b, "display")) ? e.swap(b, yd, function() {
                    return M(b, c, l)
                }) : M(b, c, l)
            },
            set: function(b,
                d, l) {
                return E(b, d, l ? Xa(b, c, l, e.support.boxSizing && "border-box" === e.css(b, "boxSizing")) : 0)
            }
        }
    });
    e.support.opacity || (e.cssHooks.opacity = {
        get: function(b, c) {
            return ud.test((c && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
        },
        set: function(b, c) {
            var d = b.style,
                l = b.currentStyle,
                f = e.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "",
                g = l && l.filter || d.filter || "";
            d.zoom = 1;
            if (!(1 <= c && "" === e.trim(g.replace(tb, "")) && d.removeAttribute && (d.removeAttribute("filter"), l && !l.filter))) d.filter =
                tb.test(g) ? g.replace(tb, f) : g + " " + f
        }
    });
    e(function() {
        e.support.reliableMarginRight || (e.cssHooks.marginRight = {
            get: function(b, c) {
                return e.swap(b, {
                    display: "inline-block"
                }, function() {
                    if (c) return Q(b, "marginRight")
                })
            }
        });
        !e.support.pixelPosition && e.fn.position && e.each(["top", "left"], function(b, c) {
            e.cssHooks[c] = {
                get: function(b, d) {
                    if (d) {
                        var l = Q(b, c);
                        return ya.test(l) ? e(b).position()[c] + "px" : l
                    }
                }
            }
        })
    });
    e.expr && e.expr.filters && (e.expr.filters.hidden = function(b) {
        return 0 === b.offsetWidth && 0 === b.offsetHeight || !e.support.reliableHiddenOffsets &&
            "none" === (b.style && b.style.display || Q(b, "display"))
    }, e.expr.filters.visible = function(b) {
        return !e.expr.filters.hidden(b)
    });
    e.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(b, c) {
        e.cssHooks[b + c] = {
            expand: function(d) {
                var e = "string" == typeof d ? d.split(" ") : [d],
                    l = {};
                for (d = 0; 4 > d; d++) l[b + ea[d] + c] = e[d] || e[d - 2] || e[0];
                return l
            }
        };
        ic.test(b) || (e.cssHooks[b + c].set = E)
    });
    var Ad = /%20/g,
        wc = /\[\]$/,
        kc = /\r?\n/g,
        Bd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Cd = /^(?:select|textarea)/i;
    e.fn.extend({
        serialize: function() {
            return e.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? e.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Cd.test(this.nodeName) || Bd.test(this.type))
            }).map(function(b, c) {
                var d = e(this).val();
                return null == d ? null : e.isArray(d) ? e.map(d, function(b) {
                    return {
                        name: c.name,
                        value: b.replace(kc, "\r\n")
                    }
                }) : {
                    name: c.name,
                    value: d.replace(kc, "\r\n")
                }
            }).get()
        }
    });
    e.param = function(b, d) {
        var l, f = [],
            g = function(b, c) {
                c = e.isFunction(c) ? c() : null == c ? "" : c;
                f[f.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c)
            };
        d === c && (d = e.ajaxSettings && e.ajaxSettings.traditional);
        if (e.isArray(b) || b.jquery && !e.isPlainObject(b)) e.each(b, function() {
            g(this.name, this.value)
        });
        else
            for (l in b) P(l, b[l], d, g);
        return f.join("&").replace(Ad, "+")
    };
    var qa, ka, Dd = /#.*$/,
        Ed = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Fd = /^(?:GET|HEAD)$/,
        Gd = /^\/\//,
        lc = /\?/,
        Hd = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Id = /([?&])_=[^&]*/,
        mc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nc = e.fn.load,
        Za = {},
        oc = {},
        pc = ["*/"] + ["*"];
    try {
        ka = yc.href
    } catch (Rd) {
        ka = B.createElement("a"), ka.href = "", ka = ka.href
    }
    qa = mc.exec(ka.toLowerCase()) || [];
    e.fn.load = function(b, d, l) {
        if ("string" != typeof b && nc) return nc.apply(this, arguments);
        if (!this.length) return this;
        var f, g, p, n = this,
            r = b.indexOf(" ");
        return 0 <= r && (f = b.slice(r, b.length), b = b.slice(0, r)), e.isFunction(d) ? (l = d, d = c) : d && "object" == typeof d && (g = "POST"), e.ajax({
            url: b,
            type: g,
            dataType: "html",
            data: d,
            complete: function(b, c) {
                l && n.each(l, p || [b.responseText, c, b])
            }
        }).done(function(b) {
            p = arguments;
            n.html(f ? e("<div>").append(b.replace(Hd, "")).find(f) : b)
        }), this
    };
    e.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
        e.fn[c] = function(b) {
            return this.on(c, b)
        }
    });
    e.each(["get", "post"], function(b, d) {
        e[d] = function(b, l, f, g) {
            return e.isFunction(l) && (g = g || f, f = l, l = c), e.ajax({
                type: d,
                url: b,
                data: l,
                success: f,
                dataType: g
            })
        }
    });
    e.extend({
        getScript: function(b, d) {
            return e.get(b,
                c, d, "script")
        },
        getJSON: function(b, c, d) {
            return e.get(b, c, d, "json")
        },
        ajaxSetup: function(b, c) {
            return c ? sa(b, e.ajaxSettings) : (c = b, b = e.ajaxSettings), sa(b, c), b
        },
        ajaxSettings: {
            url: ka,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(qa[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": pc
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": b.String,
                "text html": !0,
                "text json": e.parseJSON,
                "text xml": e.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: za(Za),
        ajaxTransport: za(oc),
        ajax: function(b, d) {
            function l(b, d, j, p) {
                var u, m, q, v, y, G = d;
                if (2 !== F) {
                    F = 2;
                    r && clearTimeout(r);
                    n = c;
                    g = p || "";
                    I.readyState = 0 < b ? 4 : 0;
                    if (j) {
                        v = s;
                        p = I;
                        var E, R, aa, M, K = v.contents,
                            H = v.dataTypes,
                            P = v.responseFields;
                        for (R in P) R in j && (p[P[R]] = j[R]);
                        for (;
                            "*" === H[0];) H.shift(),
                            E === c && (E = v.mimeType || p.getResponseHeader("content-type"));
                        if (E)
                            for (R in K)
                                if (K[R] && K[R].test(E)) {
                                    H.unshift(R);
                                    break
                                }
                        if (H[0] in j) aa = H[0];
                        else {
                            for (R in j) {
                                if (!H[0] || v.converters[R + " " + H[0]]) {
                                    aa = R;
                                    break
                                }
                                M || (M = R)
                            }
                            aa = aa || M
                        }
                        v = j = aa ? (aa !== H[0] && H.unshift(aa), j[aa]) : void 0
                    }
                    if (200 <= b && 300 > b || 304 === b)
                        if (s.ifModified && (y = I.getResponseHeader("Last-Modified"), y && (e.lastModified[f] = y), y = I.getResponseHeader("Etag"), y && (e.etag[f] = y)), 304 === b) G = "notmodified", u = !0;
                        else {
                            var L;
                            a: {
                                u = s;
                                m = v;
                                var N, G = u.dataTypes.slice();
                                j = G[0];
                                E = {};
                                R = 0;
                                u.dataFilter && (m = u.dataFilter(m, u.dataType));
                                if (G[1])
                                    for (L in u.converters) E[L.toLowerCase()] = u.converters[L];
                                for (; q = G[++R];)
                                    if ("*" !== q) {
                                        if ("*" !== j && j !== q) {
                                            L = E[j + " " + q] || E["* " + q];
                                            if (!L)
                                                for (N in E)
                                                    if (y = N.split(" "), y[1] === q && (L = E[j + " " + y[0]] || E["* " + y[0]])) {
                                                        !0 === L ? L = E[N] : !0 !== E[N] && (q = y[0], G.splice(R--, 0, q));
                                                        break
                                                    }
                                            if (!0 !== L)
                                                if (L && u["throws"]) m = L(m);
                                                else try {
                                                    m = L(m)
                                                } catch (O) {
                                                    L = {
                                                        state: "parsererror",
                                                        error: L ? O : "No conversion from " + j + " to " + q
                                                    };
                                                    break a
                                                }
                                        }
                                        j = q
                                    }
                                L = {
                                    state: "success",
                                    data: m
                                }
                            }
                            u =
                                L;
                            G = u.state;
                            m = u.data;
                            q = u.error;
                            u = !q
                        } else if (q = G, !G || b) G = "error", 0 > b && (b = 0);
                    I.status = b;
                    I.statusText = (d || G) + "";
                    u ? x.resolveWith(A, [m, G, I]) : x.rejectWith(A, [I, G, q]);
                    I.statusCode(B);
                    B = c;
                    t && D.trigger("ajax" + (u ? "Success" : "Error"), [I, s, u ? m : q]);
                    J.fireWith(A, [I, G]);
                    t && (D.trigger("ajaxComplete", [I, s]), --e.active || e.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof b && (d = b, b = c);
            d = d || {};
            var f, g, p, n, r, m, t, y, s = e.ajaxSetup({}, d),
                A = s.context || s,
                D = A !== s && (A.nodeType || A instanceof e) ? e(A) : e.event,
                x = e.Deferred(),
                J = e.Callbacks("once memory"),
                B = s.statusCode || {},
                G = {},
                E = {},
                F = 0,
                M = "canceled",
                I = {
                    readyState: 0,
                    setRequestHeader: function(b, c) {
                        if (!F) {
                            var d = b.toLowerCase();
                            b = E[d] = E[d] || b;
                            G[b] = c
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === F ? g : null
                    },
                    getResponseHeader: function(b) {
                        var d;
                        if (2 === F) {
                            if (!p)
                                for (p = {}; d = Ed.exec(g);) p[d[1].toLowerCase()] = d[2];
                            d = p[b.toLowerCase()]
                        }
                        return d === c ? null : d
                    },
                    overrideMimeType: function(b) {
                        return F || (s.mimeType = b), this
                    },
                    abort: function(b) {
                        return b = b || M, n && n.abort(b), l(0, b), this
                    }
                };
            x.promise(I);
            I.success = I.done;
            I.error = I.fail;
            I.complete = J.add;
            I.statusCode = function(b) {
                if (b) {
                    var c;
                    if (2 > F)
                        for (c in b) B[c] = [B[c], b[c]];
                    else c = b[I.status], I.always(c)
                }
                return this
            };
            s.url = ((b || s.url) + "").replace(Dd, "").replace(Gd, qa[1] + "//");
            s.dataTypes = e.trim(s.dataType || "*").toLowerCase().split(fa);
            null == s.crossDomain && (m = mc.exec(s.url.toLowerCase()) || !1, s.crossDomain = m && m.join(":") + (m[3] ? "" : "http:" === m[1] ? 80 : 443) !== qa.join(":") + (qa[3] ? "" : "http:" === qa[1] ? 80 : 443));
            s.data && s.processData && "string" != typeof s.data && (s.data = e.param(s.data,
                s.traditional));
            na(Za, s, d, I);
            if (2 === F) return I;
            t = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !Fd.test(s.type);
            t && 0 === e.active++ && e.event.trigger("ajaxStart");
            if (!s.hasContent && (s.data && (s.url += (lc.test(s.url) ? "&" : "?") + s.data, delete s.data), f = s.url, !1 === s.cache)) {
                m = e.now();
                var K = s.url.replace(Id, "$1_=" + m);
                s.url = K + (K === s.url ? (lc.test(s.url) ? "&" : "?") + "_=" + m : "")
            }(s.data && s.hasContent && !1 !== s.contentType || d.contentType) && I.setRequestHeader("Content-Type", s.contentType);
            s.ifModified && (f = f || s.url,
                e.lastModified[f] && I.setRequestHeader("If-Modified-Since", e.lastModified[f]), e.etag[f] && I.setRequestHeader("If-None-Match", e.etag[f]));
            I.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + pc + "; q=0.01" : "") : s.accepts["*"]);
            for (y in s.headers) I.setRequestHeader(y, s.headers[y]);
            if (!s.beforeSend || !1 !== s.beforeSend.call(A, I, s) && 2 !== F) {
                M = "abort";
                for (y in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) I[y](s[y]);
                if (n = na(oc, s, d, I)) {
                    I.readyState = 1;
                    t && D.trigger("ajaxSend", [I, s]);
                    s.async && 0 < s.timeout && (r = setTimeout(function() {
                        I.abort("timeout")
                    }, s.timeout));
                    try {
                        F = 1, n.send(G, l)
                    } catch (H) {
                        if (2 > F) l(-1, H);
                        else throw H;
                    }
                } else l(-1, "No Transport");
                return I
            }
            return I.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var qc = [],
        Jd = /\?/,
        Va = /(=)\?(?=&|$)|\?\?/,
        Kd = e.now();
    e.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = qc.pop() || e.expando + "_" + Kd++;
            return this[b] = !0, b
        }
    });
    e.ajaxPrefilter("json jsonp", function(d, j, l) {
        var f, g, p, n = d.data,
            r = d.url,
            m = !1 !== d.jsonp,
            t = m && Va.test(r),
            s = m && !t && "string" == typeof n && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && Va.test(n);
        if ("jsonp" === d.dataTypes[0] || t || s) return f = d.jsonpCallback = e.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback, g = b[f], t ? d.url = r.replace(Va, "$1" + f) : s ? d.data = n.replace(Va, "$1" + f) : m && (d.url += (Jd.test(r) ? "&" : "?") + d.jsonp + "=" + f), d.converters["script json"] = function() {
            return p || e.error(f + " was not called"), p[0]
        }, d.dataTypes[0] = "json", b[f] = function() {
            p = arguments
        }, l.always(function() {
            b[f] =
                g;
            d[f] && (d.jsonpCallback = j.jsonpCallback, qc.push(f));
            p && e.isFunction(g) && g(p[0]);
            p = g = c
        }), "script"
    });
    e.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(b) {
                return e.globalEval(b), b
            }
        }
    });
    e.ajaxPrefilter("script", function(b) {
        b.cache === c && (b.cache = !1);
        b.crossDomain && (b.type = "GET", b.global = !1)
    });
    e.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var d, e =
                B.head || B.getElementsByTagName("head")[0] || B.documentElement;
            return {
                send: function(l, f) {
                    d = B.createElement("script");
                    d.async = "async";
                    b.scriptCharset && (d.charset = b.scriptCharset);
                    d.src = b.url;
                    d.onload = d.onreadystatechange = function(b, l) {
                        if (l || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = c, l || f(200, "success")
                    };
                    e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ra, ub = b.ActiveXObject ? function() {
            for (var b in ra) ra[b](0,
                1)
        } : !1,
        Ld = 0;
    e.ajaxSettings.xhr = b.ActiveXObject ? function() {
        var c;
        if (!(c = !this.isLocal && zb())) a: {
            try {
                c = new b.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (d) {}
            c = void 0
        }
        return c
    } : zb;
    var vb = e.ajaxSettings.xhr();
    e.extend(e.support, {
        ajax: !!vb,
        cors: !!vb && "withCredentials" in vb
    });
    e.support.ajax && e.ajaxTransport(function(d) {
        if (!d.crossDomain || e.support.cors) {
            var l;
            return {
                send: function(f, g) {
                    var p, r, n = d.xhr();
                    d.username ? n.open(d.type, d.url, d.async, d.username, d.password) : n.open(d.type, d.url, d.async);
                    if (d.xhrFields)
                        for (r in d.xhrFields) n[r] =
                            d.xhrFields[r];
                    d.mimeType && n.overrideMimeType && n.overrideMimeType(d.mimeType);
                    !d.crossDomain && !f["X-Requested-With"] && (f["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (r in f) n.setRequestHeader(r, f[r])
                    } catch (m) {}
                    n.send(d.hasContent && d.data || null);
                    l = function(b, f) {
                        var r, m, q, t, s;
                        try {
                            if (l && (f || 4 === n.readyState))
                                if (l = c, p && (n.onreadystatechange = e.noop, ub && delete ra[p]), f) 4 !== n.readyState && n.abort();
                                else {
                                    r = n.status;
                                    q = n.getAllResponseHeaders();
                                    t = {};
                                    (s = n.responseXML) && s.documentElement && (t.xml = s);
                                    try {
                                        t.text =
                                            n.responseText
                                    } catch (v) {}
                                    try {
                                        m = n.statusText
                                    } catch (y) {
                                        m = ""
                                    }!r && d.isLocal && !d.crossDomain ? r = t.text ? 200 : 404 : 1223 === r && (r = 204)
                                }
                        } catch (A) {
                            f || g(-1, A)
                        }
                        t && g(r, m, t, q)
                    };
                    d.async ? 4 === n.readyState ? setTimeout(l, 0) : (p = ++Ld, ub && (ra || (ra = {}, e(b).unload(ub)), ra[p] = l), n.onreadystatechange = l) : l()
                },
                abort: function() {
                    l && l(0, 1)
                }
            }
        }
    });
    var Aa, Wa, Md = /^(?:toggle|show|hide)$/,
        Nd = RegExp("^(?:([-+])=|)(" + Ea + ")([a-z%]*)$", "i"),
        Od = /queueHooks$/,
        Ba = [
            function(b, c, d) {
                var l, f, g, p, r, m, t = this,
                    s = b.style,
                    y = {},
                    A = [],
                    D = b.nodeType && J(b);
                d.queue ||
                    (r = e._queueHooks(b, "fx"), null == r.unqueued && (r.unqueued = 0, m = r.empty.fire, r.empty.fire = function() {
                        r.unqueued || m()
                    }), r.unqueued++, t.always(function() {
                        t.always(function() {
                            r.unqueued--;
                            e.queue(b, "fx").length || r.empty.fire()
                        })
                    }));
                1 === b.nodeType && ("height" in c || "width" in c) && (d.overflow = [s.overflow, s.overflowX, s.overflowY], "inline" === e.css(b, "display") && "none" === e.css(b, "float") && (!e.support.inlineBlockNeedsLayout || "inline" === L(b.nodeName) ? s.display = "inline-block" : s.zoom = 1));
                d.overflow && (s.overflow = "hidden",
                    e.support.shrinkWrapBlocks || t.done(function() {
                        s.overflow = d.overflow[0];
                        s.overflowX = d.overflow[1];
                        s.overflowY = d.overflow[2]
                    }));
                for (l in c) f = c[l], Md.exec(f) && (delete c[l], f !== (D ? "hide" : "show") && A.push(l));
                if (f = A.length) {
                    g = e._data(b, "fxshow") || e._data(b, "fxshow", {});
                    D ? e(b).show() : t.done(function() {
                        e(b).hide()
                    });
                    t.done(function() {
                        var c;
                        e.removeData(b, "fxshow", !0);
                        for (c in y) e.style(b, c, y[c])
                    });
                    for (l = 0; l < f; l++) c = A[l], p = t.createTween(c, D ? g[c] : 0), y[c] = g[c] || e.style(b, c), c in g || (g[c] = p.start, D && (p.end = p.start,
                        p.start = "width" === c || "height" === c ? 1 : 0))
                }
            }
        ],
        ta = {
            "*": [
                function(b, c) {
                    var d, l, f = this.createTween(b, c),
                        g = Nd.exec(c),
                        p = f.cur(),
                        r = +p || 0,
                        m = 1,
                        t = 20;
                    if (g) {
                        d = +g[2];
                        l = g[3] || (e.cssNumber[b] ? "" : "px");
                        if ("px" !== l && r) {
                            r = e.css(f.elem, b, !0) || d || 1;
                            do m = m || ".5", r /= m, e.style(f.elem, b, r + l); while (m !== (m = f.cur() / p) && 1 !== m && --t)
                        }
                        f.unit = l;
                        f.start = r;
                        f.end = g[1] ? r + (g[1] + 1) * d : d
                    }
                    return f
                }
            ]
        };
    e.Animation = e.extend(Bb, {
        tweener: function(b, c) {
            e.isFunction(b) ? (c = b, b = ["*"]) : b = b.split(" ");
            for (var d, l = 0, f = b.length; l < f; l++) d = b[l], ta[d] = ta[d] || [], ta[d].unshift(c)
        },
        prefilter: function(b, c) {
            c ? Ba.unshift(b) : Ba.push(b)
        }
    });
    e.Tween = S;
    S.prototype = {
        constructor: S,
        init: function(b, c, d, l, f, g) {
            this.elem = b;
            this.prop = d;
            this.easing = f || "swing";
            this.options = c;
            this.start = this.now = this.cur();
            this.end = l;
            this.unit = g || (e.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var b = S.propHooks[this.prop];
            return b && b.get ? b.get(this) : S.propHooks._default.get(this)
        },
        run: function(b) {
            var c, d = S.propHooks[this.prop];
            return this.options.duration ? this.pos = c = e.easing[this.easing](b, this.options.duration *
                b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : S.propHooks._default.set(this), this
        }
    };
    S.prototype.init.prototype = S.prototype;
    S.propHooks = {
        _default: {
            get: function(b) {
                var c;
                return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (c = e.css(b.elem, b.prop, !1, ""), !c || "auto" === c ? 0 : c) : b.elem[b.prop]
            },
            set: function(b) {
                e.fx.step[b.prop] ? e.fx.step[b.prop](b) : b.elem.style &&
                    (null != b.elem.style[e.cssProps[b.prop]] || e.cssHooks[b.prop]) ? e.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
            }
        }
    };
    S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    };
    e.each(["toggle", "show", "hide"], function(b, c) {
        var d = e.fn[c];
        e.fn[c] = function(l, f, g) {
            return null == l || "boolean" == typeof l || !b && e.isFunction(l) && e.isFunction(f) ? d.apply(this, arguments) : this.animate(Ca(c, !0), l, f, g)
        }
    });
    e.fn.extend({
        fadeTo: function(b, c, d, e) {
            return this.filter(J).css("opacity",
                0).show().end().animate({
                opacity: c
            }, b, d, e)
        },
        animate: function(b, c, d, l) {
            var f = e.isEmptyObject(b),
                g = e.speed(c, d, l);
            c = function() {
                var c = Bb(this, e.extend({}, b), g);
                f && c.stop(!0)
            };
            return f || !1 === g.queue ? this.each(c) : this.queue(g.queue, c)
        },
        stop: function(b, d, l) {
            var f = function(b) {
                var c = b.stop;
                delete b.stop;
                c(l)
            };
            return "string" != typeof b && (l = d, d = b, b = c), d && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var c = !0,
                    d = null != b && b + "queueHooks",
                    j = e.timers,
                    g = e._data(this);
                if (d) g[d] && g[d].stop && f(g[d]);
                else
                    for (d in g) g[d] &&
                        g[d].stop && Od.test(d) && f(g[d]);
                for (d = j.length; d--;) j[d].elem === this && (null == b || j[d].queue === b) && (j[d].anim.stop(l), c = !1, j.splice(d, 1));
                (c || !l) && e.dequeue(this, b)
            })
        }
    });
    e.each({
        slideDown: Ca("show"),
        slideUp: Ca("hide"),
        slideToggle: Ca("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(b, c) {
        e.fn[b] = function(b, d, e) {
            return this.animate(c, b, d, e)
        }
    });
    e.speed = function(b, c, d) {
        var l = b && "object" == typeof b ? e.extend({}, b) : {
            complete: d || !d && c || e.isFunction(b) && b,
            duration: b,
            easing: d && c || c && !e.isFunction(c) && c
        };
        l.duration = e.fx.off ? 0 : "number" == typeof l.duration ? l.duration : l.duration in e.fx.speeds ? e.fx.speeds[l.duration] : e.fx.speeds._default;
        if (null == l.queue || !0 === l.queue) l.queue = "fx";
        return l.old = l.complete, l.complete = function() {
            e.isFunction(l.old) && l.old.call(this);
            l.queue && e.dequeue(this, l.queue)
        }, l
    };
    e.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        }
    };
    e.timers = [];
    e.fx = S.prototype.init;
    e.fx.tick = function() {
        for (var b, c = e.timers,
            d = 0; d < c.length; d++) b = c[d], !b() && c[d] === b && c.splice(d--, 1);
        c.length || e.fx.stop()
    };
    e.fx.timer = function(b) {
        b() && e.timers.push(b) && !Wa && (Wa = setInterval(e.fx.tick, e.fx.interval))
    };
    e.fx.interval = 13;
    e.fx.stop = function() {
        clearInterval(Wa);
        Wa = null
    };
    e.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    e.fx.step = {};
    e.expr && e.expr.filters && (e.expr.filters.animated = function(b) {
        return e.grep(e.timers, function(c) {
            return b === c.elem
        }).length
    });
    var rc = /^(?:body|html)$/i;
    e.fn.offset = function(b) {
        if (arguments.length) return b ===
            c ? this : this.each(function(c) {
                e.offset.setOffset(this, b, c)
            });
        var d, l, f, g, p, r, m, t = {
                top: 0,
                left: 0
            },
            s = this[0],
            y = s && s.ownerDocument;
        if (y) return (l = y.body) === s ? e.offset.bodyOffset(s) : (d = y.documentElement, e.contains(d, s) ? ("undefined" != typeof s.getBoundingClientRect && (t = s.getBoundingClientRect()), f = Cb(y), g = d.clientTop || l.clientTop || 0, p = d.clientLeft || l.clientLeft || 0, r = f.pageYOffset || d.scrollTop, m = f.pageXOffset || d.scrollLeft, {
            top: t.top + r - g,
            left: t.left + m - p
        }) : t)
    };
    e.offset = {
        bodyOffset: function(b) {
            var c = b.offsetTop,
                d = b.offsetLeft;
            return e.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(e.css(b, "marginTop")) || 0, d += parseFloat(e.css(b, "marginLeft")) || 0), {
                top: c,
                left: d
            }
        },
        setOffset: function(b, c, d) {
            var l = e.css(b, "position");
            "static" === l && (b.style.position = "relative");
            var f = e(b),
                g = f.offset(),
                p = e.css(b, "top"),
                r = e.css(b, "left"),
                m = {},
                t = {},
                s, y;
            ("absolute" === l || "fixed" === l) && -1 < e.inArray("auto", [p, r]) ? (t = f.position(), s = t.top, y = t.left) : (s = parseFloat(p) || 0, y = parseFloat(r) || 0);
            e.isFunction(c) && (c = c.call(b, d, g));
            null !=
                c.top && (m.top = c.top - g.top + s);
            null != c.left && (m.left = c.left - g.left + y);
            "using" in c ? c.using.call(b, m) : f.css(m)
        }
    };
    e.fn.extend({
        position: function() {
            if (this[0]) {
                var b = this[0],
                    c = this.offsetParent(),
                    d = this.offset(),
                    l = rc.test(c[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : c.offset();
                return d.top -= parseFloat(e.css(b, "marginTop")) || 0, d.left -= parseFloat(e.css(b, "marginLeft")) || 0, l.top += parseFloat(e.css(c[0], "borderTopWidth")) || 0, l.left += parseFloat(e.css(c[0], "borderLeftWidth")) || 0, {
                    top: d.top - l.top,
                    left: d.left - l.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var b =
                    this.offsetParent || B.body; b && !rc.test(b.nodeName) && "static" === e.css(b, "position");) b = b.offsetParent;
                return b || B.body
            })
        }
    });
    e.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, d) {
        var l = /Y/.test(d);
        e.fn[b] = function(f) {
            return e.access(this, function(b, f, g) {
                var p = Cb(b);
                if (g === c) return p ? d in p ? p[d] : p.document.documentElement[f] : b[f];
                p ? p.scrollTo(l ? e(p).scrollLeft() : g, l ? g : e(p).scrollTop()) : b[f] = g
            }, b, f, arguments.length, null)
        }
    });
    e.each({
        Height: "height",
        Width: "width"
    }, function(b, d) {
        e.each({
            padding: "inner" +
                b,
            content: d,
            "": "outer" + b
        }, function(l, f) {
            e.fn[f] = function(f, g) {
                var p = arguments.length && (l || "boolean" != typeof f),
                    r = l || (!0 === f || !0 === g ? "margin" : "border");
                return e.access(this, function(d, l, f) {
                    var j;
                    return e.isWindow(d) ? d.document.documentElement["client" + b] : 9 === d.nodeType ? (j = d.documentElement, Math.max(d.body["scroll" + b], j["scroll" + b], d.body["offset" + b], j["offset" + b], j["client" + b])) : f === c ? e.css(d, l, f, r) : e.style(d, l, f, r)
                }, d, p ? f : c, p, null)
            }
        })
    });
    b.jQuery = b.$ = e;
    "function" == typeof define && define.amd && define.amd.jQuery &&
        define("jquery", [], function() {
            return e
        })
})(window);
var portraitMode = !1,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = 640,
    desktopHeight = 480,
    w, h, multiplier, destW, destH, dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "play", "orientate"],
    advancedDivsToResize = {/*
        MobileAdInGamePreroll: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height +
                20
        },
        MobileAdInGameEnd: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll2: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd2: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll3: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd3: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width +
                2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        }*/
    };

function adjustLayers(b) {
    for (i = 0; i < coreDivsToResize.length; i++) ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w), $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW), $("#" + coreDivsToResize[i]).height(destH), $("#" + coreDivsToResize[i]).css("left", b ? 0 : w / 2 - destW / 2));
    for (key in advancedDivsToResize) try {
        $("#" + key).width(w), $("#" + key).height(h), $("#" + key + "-Box").css("left", (w - advancedDivsToResize[key]["box-width"]) / 2), $("#" + key + "-Box").css("top", (h - advancedDivsToResize[key]["box-height"]) /
            2)
    } catch (c) {
        console.log(c)
    }
    $("#ajaxbar").width(w);
    $("#ajaxbar").height(h)
}

function sizeHandler() {
    if ($("#game")) {
        w = window.innerWidth;
        h = window.innerHeight;
        ig.ua.mobile ? (multiplier = Math.min(h / mobileHeight, w / mobileWidth), destW = mobileWidth * multiplier, destH = mobileHeight * multiplier) : (multiplier = Math.min(h / desktopHeight, w / desktopWidth), destW = desktopWidth * multiplier, destH = desktopHeight * multiplier);
        widthRatio = window.innerWidth / mobileWidth;
        heightRatio = window.innerHeight / mobileHeight;
        adjustLayers();
        window.scrollTo(0, 1);
        for (var b = navigator.userAgent.split(" "), c = 0; c < b.length; c++) b[c].substr(0,
            8);
        navigator.userAgent.indexOf("wv");
        navigator.userAgent.indexOf("SamsungBrowser")
    }
}

function orientationHandler() {
    console.log("changing orientation ...");
    ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(), $("#game").hide()) : ($("#orientate").hide(), $("#game").show()));
    sizeHandler()
}

function fixSamsungHandler() {
    ig.ua.android && !(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && (!(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchmove", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchend",
        function(b) {
            b.preventDefault();
            return !1
        }, !1))
}
window.addEventListener("resize", function() {
    orientationHandler()
}, !1);
window.addEventListener("orientationchange", function() {
    orientationHandler()
}, !1);
document.ontouchmove = function(b) {
    b.preventDefault();
    window.scrollTo(0, 1)
};

function getInternetExplorerVersion() {
    var b = -1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
    return b
}
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
        var f = c[d].split("=");
        if (decodeURIComponent(f[0]) == b) return decodeURIComponent(f[1])
    }
}
this.jukebox = {};
jukebox.Player = function(b, c) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = c || null;
    this.settings = {};
    for (var d in this.defaults) this.settings[d] = this.defaults[d];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var f in b) this.settings[f] = b[f];
    "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
    this.resource = this.isPlaying = null;
    this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) :
        this.settings.resources[0] || null;
    if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    this.__init();
    return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: {
        resources: [],
        autoplay: !1,
        spritemap: {},
        flashMediaElement: "./swf/FlashMediaElement.swf",
        timeout: 1E3
    },
    __addToManager: function() {
        !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
    },
    __init: function() {
        var b = this,
            c = this.settings,
            d = {},
            f;
        jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
        if (!0 === d.html5audio) {
            this.context = new Audio;
            this.context.src = this.resource;
            if (null === this.origin) {
                var g = function(c) {
                    b.__addToManager(c)
                };
                this.context.addEventListener("canplaythrough", g, !0);
                window.setTimeout(function() {
                    b.context.removeEventListener("canplaythrough", g, !0);
                    g("timeout")
                }, c.timeout)
            }
            this.context.autobuffer = !0;
            this.context.preload = !0;
            for (f in this.HTML5API) this[f] = this.HTML5API[f];
            1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ?
                Date.now() : +new Date, this.play(c.autoplay));
            1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
                null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0)
            }), window.addEventListener("pageshow", function() {
                b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused)
            }))
        } else if (!0 === d.flashaudio) {
            for (f in this.FLASHAPI) this[f] = this.FLASHAPI[f];
            d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
            this.__initFlashContext(d);
            !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
        } else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
    },
    __initFlashContext: function(b) {
        var c, d = this.settings.flashMediaElement,
            f, g = {
                flashvars: b.join("&"),
                quality: "high",
                bgcolor: "#000000",
                wmode: "transparent",
                allowscriptaccess: "always",
                allowfullscreen: "true"
            };
        if (navigator.userAgent.match(/MSIE/)) {
            c = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(c);
            var m = document.createElement("object");
            m.id = "jukebox-flashstream-" + this.id;
            m.setAttribute("type", "application/x-shockwave-flash");
            m.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            m.setAttribute("width", "0");
            m.setAttribute("height", "0");
            g.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
            g.flashvars = b.join("&amp;");
            for (f in g) b = document.createElement("param"), b.setAttribute("name", f), b.setAttribute("value", g[f]), m.appendChild(b);
            c.outerHTML = m.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id)
        } else {
            c =
                document.createElement("embed");
            c.id = "jukebox-flashstream-" + this.id;
            c.setAttribute("type", "application/x-shockwave-flash");
            c.setAttribute("width", "100");
            c.setAttribute("height", "100");
            g.play = !1;
            g.loop = !1;
            g.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
            for (f in g) c.setAttribute(f, g[f]);
            document.getElementsByTagName("body")[0].appendChild(c);
            this.context = c
        }
    },
    backgroundHackForiOS: function() {
        if (void 0 !== this.backgroundMusic) {
            var b = Date.now ? Date.now() : +new Date;
            void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started =
                b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
        }
    },
    play: function(b, c) {
        if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
        else {
            var d = this.settings.spritemap,
                f;
            if (void 0 !== d[b]) f = d[b].start;
            else if ("number" === typeof b) {
                f = b;
                for (var g in d)
                    if (f >= d[g].start && f <=
                        d[g].end) {
                        b = g;
                        break
                    }
            }
            void 0 !== f && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(f))
        }
    },
    stop: function() {
        this.__lastPosition = 0;
        this.isPlaying = null;
        this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
        return !0
    },
    pause: function() {
        this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition
    },
    resume: function(b) {
        b = "number" ===
            typeof b ? b : this.__lastPosition;
        if (null !== b) return this.play(b), this.__lastPosition = null, !0;
        this.context.play();
        return !1
    },
    HTML5API: {
        getVolume: function() {
            return this.context.volume || 1
        },
        setVolume: function(b) {
            this.context.volume = b;
            return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
        },
        getCurrentTime: function() {
            return this.context.currentTime || 0
        },
        setCurrentTime: function(b) {
            try {
                return this.context.currentTime = b, !0
            } catch (c) {
                return !1
            }
        }
    },
    FLASHAPI: {
        getVolume: function() {
            return this.context && "function" === typeof this.context.getVolume ?
                this.context.getVolume() : 1
        },
        setVolume: function(b) {
            return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1
        },
        getCurrentTime: function() {
            return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
        },
        setCurrentTime: function(b) {
            return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
        }
    }
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
    this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) this.settings[c] = this.defaults[c];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var d in b) this.settings[d] = b[d];
    this.__detectFeatures();
    jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
        jukebox.Manager.loop()
    }, 20) : !0
};
jukebox.Manager.prototype = {
    defaults: {
        useFlash: !1,
        useGameLoop: !1
    },
    __detectFeatures: function() {
        var b = window.Audio && new Audio;
        if (b && b.canPlayType && !1 === this.settings.useFlash) {
            for (var c = [{
                    e: "3gp",
                    m: ["audio/3gpp", "audio/amr"]
                }, {
                    e: "aac",
                    m: ["audio/aac", "audio/aacp"]
                }, {
                    e: "amr",
                    m: ["audio/amr", "audio/3gpp"]
                }, {
                    e: "caf",
                    m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
                }, {
                    e: "m4a",
                    m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
                }, {
                    e: "mp3",
                    m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
                }, {
                    e: "mpga",
                    m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
                }, {
                    e: "mp4",
                    m: ["audio/mp4", "video/mp4"]
                }, {
                    e: "ogg",
                    m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
                }, {
                    e: "wav",
                    m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
                }, {
                    e: "webm",
                    m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
                }],
                d, f, g = 0, m = c.length; g < m; g++)
                if (f = c[g].e, c[g].m.length && "object" === typeof c[g].m)
                    for (var x = 0, t = c[g].m.length; x < t; x++)
                        if (d = c[g].m[x], "" !== b.canPlayType(d)) {
                            this.codecs[f] = d;
                            break
                        } else this.codecs[f] || (this.codecs[f] = !1);
            this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
            this.features.channels = 8;
            b.volume = 0.1337;
            this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
            navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
        if (window.ActiveXObject) try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
        } catch (y) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
        !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr",
            this.features.volume = !0, this.features.channels = 1)
    },
    __getPlayerById: function(b) {
        return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
    },
    __getClone: function(b, c) {
        for (var d in this.__clones) {
            var f = this.__clones[d];
            if (null === f.isPlaying && f.origin === b) return f
        }
        if ("[object Object]" === Object.prototype.toString.call(c)) {
            d = {};
            for (var g in c) d[g] = c[g];
            d.autoplay = !1;
            g = new jukebox.Player(d, b);
            g.isClone = !0;
            g.wasReady = !1;
            return this.__clones[g.id] = g
        }
        return null
    },
    loop: function() {
        if (0 !== this.__playersLength)
            if (this.__queue.length &&
                this.__playersLength < this.features.channels) {
                var b = this.__queue[0],
                    c = this.__getPlayerById(b.origin);
                if (null !== c) {
                    var d = this.__getClone(b.origin, c.settings);
                    null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0))
                }
                this.__queue.splice(0, 1)
            } else
                for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d],
                    c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
    },
    getPlayableResource: function(b) {
        "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
        for (var c = 0, d = b.length; c < d; c++) {
            var f = b[c],
                g = f.match(/\.([^\.]*)$/)[1];
            if (g && this.codecs[g]) return f
        }
        return null
    },
    add: function(b) {
        return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1
    },
    remove: function(b) {
        return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1
    },
    addToQueue: function(b, c) {
        return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
            pointer: b,
            origin: c
        }), !0) : !1
    }
};
(function() {
    var b = {},
        c = null,
        d = !0,
        f = !1;
    if ("undefined" !== typeof AudioContext) c = new AudioContext;
    else if ("undefined" !== typeof webkitAudioContext) c = new webkitAudioContext;
    else if ("undefined" !== typeof Audio) {
        d = !1;
        try {
            new Audio
        } catch (g) {
            f = !0
        }
    } else d = !1, f = !0; if (d) {
        var m = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
        m.gain.value = 1;
        m.connect(c.destination)
    }
    var x = function() {
        this._volume = 1;
        this._muted = !1;
        this.usingWebAudio = d;
        this.noAudio = f;
        this._howls = []
    };
    x.prototype = {
        volume: function(b) {
            b =
                parseFloat(b);
            if (0 <= b && 1 >= b) {
                this._volume = b;
                d && (m.gain.value = b);
                for (var c in this._howls)
                    if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                        for (b = 0; b < this._howls[c]._audioNode.length; b++) this._howls[c]._audioNode[b].volume = this._howls[c]._volume * this._volume;
                return this
            }
            return d ? m.gain.value : this._volume
        },
        mute: function() {
            this._setMuted(!0);
            return this
        },
        unmute: function() {
            this._setMuted(!1);
            return this
        },
        _setMuted: function(b) {
            this._muted = b;
            d && (m.gain.value = b ? 0 : this._volume);
            for (var c in this._howls)
                if (this._howls.hasOwnProperty(c) &&
                    !1 === this._howls[c]._webAudio)
                    for (var f = 0; f < this._howls[c]._audioNode.length; f++) this._howls[c]._audioNode[f].muted = b
        }
    };
    var t = new x,
        x = null;
    if (!f) var x = new Audio,
        y = {
            mp3: !!x.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            opus: !!x.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!x.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!x.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            m4a: !!(x.canPlayType("audio/x-m4a;") || x.canPlayType("audio/aac;")).replace(/^no$/,
                ""),
            mp4: !!(x.canPlayType("audio/x-mp4;") || x.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!x.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
        };
    var s = function(b) {
        this._autoplay = b.autoplay || !1;
        this._buffer = b.buffer || !1;
        this._duration = b.duration || 0;
        this._format = b.format || null;
        this._loop = b.loop || !1;
        this._loaded = !1;
        this._sprite = b.sprite || {};
        this._src = b.src || "";
        this._pos3d = b.pos3d || [0, 0, -0.5];
        this._volume = void 0 !== b.volume ? b.volume : 1;
        this._urls = b.urls || [];
        this._rate = b.rate || 1;
        this._onload = [b.onload || function() {}];
        this._onloaderror = [b.onloaderror || function() {}];
        this._onend = [b.onend || function() {}];
        this._onpause = [b.onpause || function() {}];
        this._onplay = [b.onplay || function() {}];
        this._onendTimer = [];
        this._webAudio = d && !this._buffer;
        this._audioNode = [];
        this._webAudio && this._setupAudioNode();
        t._howls.push(this);
        this.load()
    };
    s.prototype = {
        load: function() {
            var d = this,
                g = null;
            if (!f) {
                for (var r = 0; r < d._urls.length; r++) {
                    var m, s;
                    if (d._format) m = d._format;
                    else if (s = d._urls[r].toLowerCase().split("?")[0], m =
                        (m = s.match(/.+\.([^?]+)(\?|$)/)) && 2 <= m.length ? m : s.match(/data\:audio\/([^?]+);/)) m = m[1];
                    else {
                        d.on("loaderror");
                        return
                    } if (y[m]) {
                        g = d._urls[r];
                        break
                    }
                }
                if (g) {
                    d._src = g;
                    if (d._webAudio) {
                        var x = g;
                        if (x in b) d._duration = b[x].duration, A(d);
                        else {
                            var E = new XMLHttpRequest;
                            E.open("GET", x, !0);
                            E.responseType = "arraybuffer";
                            E.onload = function() {
                                c.decodeAudioData(E.response, function(c) {
                                    c && (b[x] = c, A(d, c))
                                }, function() {
                                    d.on("loaderror")
                                })
                            };
                            E.onerror = function() {
                                d._webAudio && (d._buffer = !0, d._webAudio = !1, d._audioNode = [], delete d._gainNode,
                                    d.load())
                            };
                            try {
                                E.send()
                            } catch (Xa) {
                                E.onerror()
                            }
                        }
                    } else {
                        var M = new Audio;
                        d._audioNode.push(M);
                        M.src = g;
                        M._pos = 0;
                        M.preload = "auto";
                        M.volume = t._muted ? 0 : d._volume * t.volume();
                        b[g] = d;
                        var L = function() {
                            d._duration = Math.ceil(10 * M.duration) / 10;
                            0 === Object.getOwnPropertyNames(d._sprite).length && (d._sprite = {
                                _default: [0, 1E3 * d._duration]
                            });
                            d._loaded || (d._loaded = !0, d.on("load"));
                            d._autoplay && d.play();
                            M.removeEventListener("canplaythrough", L, !1)
                        };
                        M.addEventListener("canplaythrough", L, !1);
                        M.load()
                    }
                    return d
                }
            }
            d.on("loaderror")
        },
        urls: function(b) {
            return b ? (this.stop(), this._urls = "string" === typeof b ? [b] : b, this._loaded = !1, this.load(), this) : this._urls
        },
        play: function(d, f) {
            var g = this;
            "function" === typeof d && (f = d);
            if (!d || "function" === typeof d) d = "_default";
            if (!g._loaded) return g.on("load", function() {
                g.play(d, f)
            }), g;
            if (!g._sprite[d]) return "function" === typeof f && f(), g;
            g._inactiveNode(function(m) {
                m._sprite = d;
                var s = 0 < m._pos ? m._pos : g._sprite[d][0] / 1E3,
                    y = g._sprite[d][1] / 1E3 - m._pos,
                    A = !(!g._loop && !g._sprite[d][2]),
                    x = "string" === typeof f ? f :
                    Math.round(Date.now() * Math.random()) + "",
                    M, L = {
                        id: x,
                        sprite: d,
                        loop: A
                    };
                M = setTimeout(function() {
                    !g._webAudio && A && g.stop(L.id, L.timer).play(d, L.id);
                    g._webAudio && !A && (g._nodeById(L.id).paused = !0, g._nodeById(L.id)._pos = 0);
                    !g._webAudio && !A && g.stop(L.id, L.timer);
                    g.on("end", x)
                }, 1E3 * y);
                g._onendTimer.push(M);
                L.timer = g._onendTimer[g._onendTimer.length - 1];
                if (g._webAudio) {
                    M = g._sprite[d][0] / 1E3;
                    var P = g._sprite[d][1] / 1E3;
                    m.id = x;
                    m.paused = !1;
                    M = [A, M, P];
                    P = g._nodeById(x);
                    P.bufferSource = c.createBufferSource();
                    P.bufferSource.buffer =
                        b[g._src];
                    P.bufferSource.connect(P.panner);
                    P.bufferSource.loop = M[0];
                    M[0] && (P.bufferSource.loopStart = M[1], P.bufferSource.loopEnd = M[1] + M[2]);
                    P.bufferSource.playbackRate.value = g._rate;
                    g._playStart = c.currentTime;
                    m.gain.value = g._volume;
                    "undefined" === typeof m.bufferSource.start ? m.bufferSource.noteGrainOn(0, s, y) : m.bufferSource.start(0, s, y)
                } else if (4 === m.readyState) m.id = x, m.currentTime = s, m.muted = t._muted, m.volume = g._volume * t.volume(), setTimeout(function() {
                    m.play()
                }, 0);
                else {
                    g._clearEndTimer(M);
                    var za = d,
                        na =
                        f,
                        sa = function() {
                            g.play(za, na);
                            m.removeEventListener("canplaythrough", sa, !1)
                        };
                    m.addEventListener("canplaythrough", sa, !1);
                    return g
                }
                g.on("play");
                "function" === typeof f && f(x);
                return g
            });
            return g
        },
        pause: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.pause(b)
            }), d;
            d._clearEndTimer(c || 0);
            var f = b ? d._nodeById(b) : d._activeNode();
            if (f)
                if (f._pos = d.pos(null, b), d._webAudio) {
                    if (!f.bufferSource || f.paused) return d;
                    f.paused = !0;
                    "undefined" === typeof f.bufferSource.stop ? f.bufferSource.noteOff(0) :
                        f.bufferSource.stop(0)
                } else f.pause();
            d.on("pause");
            return d
        },
        stop: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.stop(b)
            }), d;
            d._clearEndTimer(c || 0);
            var f = b ? d._nodeById(b) : d._activeNode();
            if (f)
                if (f._pos = 0, d._webAudio) {
                    if (!f.bufferSource || f.paused) return d;
                    f.paused = !0;
                    "undefined" === typeof f.bufferSource.stop ? f.bufferSource.noteOff(0) : f.bufferSource.stop(0)
                } else f.pause(), f.currentTime = 0;
            return d
        },
        mute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                    c.mute(b)
                }),
                c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = 0 : d.volume = 0);
            return c
        },
        unmute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                c.unmute(b)
            }), c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = c._volume : d.volume = c._volume);
            return c
        },
        volume: function(b, c) {
            var d = this;
            b = parseFloat(b);
            if (0 <= b && 1 >= b) {
                d._volume = b;
                if (!d._loaded) return d.on("play", function() {
                    d.volume(b, c)
                }), d;
                var f = c ? d._nodeById(c) : d._activeNode();
                f && (d._webAudio ? f.gain.value = b : f.volume =
                    b * t.volume());
                return d
            }
            return d._volume
        },
        loop: function(b) {
            return "boolean" === typeof b ? (this._loop = b, this) : this._loop
        },
        sprite: function(b) {
            return "object" === typeof b ? (this._sprite = b, this) : this._sprite
        },
        pos: function(b, d) {
            var f = this;
            if (!f._loaded) return f.on("load", function() {
                f.pos(b)
            }), "number" === typeof b ? f : f._pos || 0;
            b = parseFloat(b);
            var g = d ? f._nodeById(d) : f._activeNode();
            if (g) return 0 <= b ? (f.pause(d), g._pos = b, f.play(g._sprite, d), f) : f._webAudio ? g._pos + (c.currentTime - f._playStart) : g.currentTime;
            if (0 <= b) return f;
            for (g = 0; g < f._audioNode.length; g++)
                if (f._audioNode[g].paused && 4 === f._audioNode[g].readyState) return f._webAudio ? f._audioNode[g]._pos : f._audioNode[g].currentTime
        },
        pos3d: function(b, c, d, f) {
            var g = this;
            c = "undefined" === typeof c || !c ? 0 : c;
            d = "undefined" === typeof d || !d ? -0.5 : d;
            if (!g._loaded) return g.on("play", function() {
                g.pos3d(b, c, d, f)
            }), g;
            if (0 <= b || 0 > b) {
                if (g._webAudio) {
                    var m = f ? g._nodeById(f) : g._activeNode();
                    m && (g._pos3d = [b, c, d], m.panner.setPosition(b, c, d))
                }
            } else return g._pos3d;
            return g
        },
        fade: function(b, c, d,
            f, g) {
            var m = this,
                t = Math.abs(b - c),
                s = b > c ? "down" : "up",
                t = t / 0.01,
                y = d / t;
            if (!m._loaded) return m.on("load", function() {
                m.fade(b, c, d, f, g)
            }), m;
            m.volume(b, g);
            for (var A = 1; A <= t; A++)(function() {
                var b = Math.round(1E3 * (m._volume + ("up" === s ? 0.01 : -0.01) * A)) / 1E3;
                setTimeout(function() {
                    m.volume(b, g);
                    b === c && f && f()
                }, y * A)
            })()
        },
        fadeIn: function(b, c, d) {
            return this.volume(0).play().fade(0, b, c, d)
        },
        fadeOut: function(b, c, d, f) {
            var g = this;
            return g.fade(g._volume, b, c, function() {
                d && d();
                g.pause(f);
                g.on("end")
            }, f)
        },
        _nodeById: function(b) {
            for (var c =
                this._audioNode[0], d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].id === b) {
                    c = this._audioNode[d];
                    break
                }
            return c
        },
        _activeNode: function() {
            for (var b = null, c = 0; c < this._audioNode.length; c++)
                if (!this._audioNode[c].paused) {
                    b = this._audioNode[c];
                    break
                }
            this._drainPool();
            return b
        },
        _inactiveNode: function(b) {
            for (var c = null, d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].paused && 4 === this._audioNode[d].readyState) {
                    b(this._audioNode[d]);
                    c = !0;
                    break
                }
            this._drainPool();
            if (!c) {
                var f;
                this._webAudio ? (f = this._setupAudioNode(),
                    b(f)) : (this.load(), f = this._audioNode[this._audioNode.length - 1], f.addEventListener("loadedmetadata", function() {
                    b(f)
                }))
            }
        },
        _drainPool: function() {
            var b = 0,
                c;
            for (c = 0; c < this._audioNode.length; c++) this._audioNode[c].paused && b++;
            for (c = this._audioNode.length - 1; 0 <= c && !(5 >= b); c--) this._audioNode[c].paused && (this._webAudio && this._audioNode[c].disconnect(0), b--, this._audioNode.splice(c, 1))
        },
        _clearEndTimer: function(b) {
            b = this._onendTimer.indexOf(b);
            b = 0 <= b ? b : 0;
            this._onendTimer[b] && (clearTimeout(this._onendTimer[b]),
                this._onendTimer.splice(b, 1))
        },
        _setupAudioNode: function() {
            var b = this._audioNode,
                d = this._audioNode.length;
            b[d] = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
            b[d].gain.value = this._volume;
            b[d].paused = !0;
            b[d]._pos = 0;
            b[d].readyState = 4;
            b[d].connect(m);
            b[d].panner = c.createPanner();
            b[d].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]);
            b[d].panner.connect(b[d]);
            return b[d]
        },
        on: function(b, c) {
            var d = this["_on" + b];
            if ("function" === typeof c) d.push(c);
            else
                for (var f = 0; f < d.length; f++) c ?
                    d[f].call(this, c) : d[f].call(this);
            return this
        },
        off: function(b, c) {
            for (var d = this["_on" + b], f = c.toString(), g = 0; g < d.length; g++)
                if (f === d[g].toString()) {
                    d.splice(g, 1);
                    break
                }
            return this
        },
        unload: function() {
            for (var c = this._audioNode, d = 0; d < this._audioNode.length; d++) c[d].paused || this.stop(c[d].id), this._webAudio ? c[d].disconnect(0) : c[d].src = "";
            c = t._howls.indexOf(this);
            null !== c && 0 <= c && t._howls.splice(c, 1);
            delete b[this._src]
        }
    };
    if (d) var A = function(b, c) {
        b._duration = c ? c.duration : b._duration;
        0 === Object.getOwnPropertyNames(b._sprite).length &&
            (b._sprite = {
                _default: [0, 1E3 * b._duration]
            });
        b._loaded || (b._loaded = !0, b.on("load"));
        b._autoplay && b.play()
    };
    "function" === typeof define && define.amd && define(function() {
        return {
            Howler: t,
            Howl: s
        }
    });
    "undefined" !== typeof exports && (exports.Howler = t, exports.Howl = s);
    window.Howler = t;
    window.Howl = s
})();
(function(b) {
    Number.prototype.map = function(b, c, d, f) {
        return d + (f - d) * ((this - b) / (c - b))
    };
    Number.prototype.limit = function(b, c) {
        return Math.min(c, Math.max(b, this))
    };
    Number.prototype.round = function(b) {
        b = Math.pow(10, b || 0);
        return Math.round(this * b) / b
    };
    Number.prototype.floor = function() {
        return Math.floor(this)
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this)
    };
    Number.prototype.toInt = function() {
        return this | 0
    };
    Number.prototype.toRad = function() {
        return this / 180 * Math.PI
    };
    Number.prototype.toDeg = function() {
        return 180 *
            this / Math.PI
    };
    Array.prototype.erase = function(b) {
        for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
        return this
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)]
    };
    Function.prototype.bind = Function.prototype.bind || function(b) {
        if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var c = Array.prototype.slice.call(arguments, 1),
            d = this,
            f = function() {},
            g = function() {
                return d.apply(this instanceof f && b ?
                    this : b, c.concat(Array.prototype.slice.call(arguments)))
            };
        f.prototype = this.prototype;
        g.prototype = new f;
        return g
    };
    b.ig = {
        game: null,
        debug: null,
        version: "1.23",
        global: b,
        modules: {},
        resources: [],
        ready: !1,
        baked: !1,
        nocache: "",
        ua: {},
        prefix: b.ImpactPrefix || "",
        lib: "lib/",
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(b) {
            return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
        },
        $new: function(b) {
            return document.createElement(b)
        },
        copy: function(b) {
            if (!b || "object" != typeof b ||
                b instanceof HTMLElement || b instanceof ig.Class) return b;
            if (b instanceof Array)
                for (var c = [], d = 0, f = b.length; d < f; d++) c[d] = ig.copy(b[d]);
            else
                for (d in c = {}, b) c[d] = ig.copy(b[d]);
            return c
        },
        merge: function(b, c) {
            for (var d in c) {
                var f = c[d];
                if ("object" != typeof f || f instanceof HTMLElement || f instanceof ig.Class || null === f) b[d] = f;
                else {
                    if (!b[d] || "object" != typeof b[d]) b[d] = f instanceof Array ? [] : {};
                    ig.merge(b[d], f)
                }
            }
            return b
        },
        ksort: function(b) {
            if (!b || "object" != typeof b) return [];
            var c = [],
                d = [],
                f;
            for (f in b) c.push(f);
            c.sort();
            for (f = 0; f < c.length; f++) d.push(b[c[f]]);
            return d
        },
        setVendorAttribute: function(b, c, d) {
            var f = c.charAt(0).toUpperCase() + c.substr(1);
            b[c] = "undefined" !== typeof b.imageSmoothingEnabled ? b["ms" + f] = b["moz" + f] = b["o" + f] = d : b["ms" + f] = b["moz" + f] = b["webkit" + f] = b["o" + f] = d
        },
        getVendorAttribute: function(b, c) {
            var d = c.charAt(0).toUpperCase() + c.substr(1);
            return "undefined" !== typeof b.imageSmoothingEnabled ? b[c] || b["ms" + d] || b["moz" + d] || b["o" + d] : b[c] || b["ms" + d] || b["moz" + d] || b["webkit" + d] || b["o" + d]
        },
        normalizeVendorAttribute: function(b,
            c) {
            var d = ig.getVendorAttribute(b, c);
            !b[c] && d && (b[c] = d)
        },
        getImagePixels: function(b, c, d, f, g) {
            var m = ig.$new("canvas");
            m.width = b.width;
            m.height = b.height;
            var r = m.getContext("2d");
            ig.System.SCALE.CRISP(m, r);
            var x = ig.getVendorAttribute(r, "backingStorePixelRatio") || 1;
            ig.normalizeVendorAttribute(r, "getImageDataHD");
            var J = b.width / x,
                G = b.height / x;
            m.width = Math.ceil(J);
            m.height = Math.ceil(G);
            r.drawImage(b, 0, 0, J, G);
            return 1 === x ? r.getImageData(c, d, f, g) : r.getImageDataHD(c, d, f, g)
        },
        module: function(b) {
            if (ig._current) throw "Module '" +
                ig._current.name + "' defines nothing";
            if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
            ig._current = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig.modules[b] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig
        },
        defines: function(b) {
            ig._current.body = b;
            ig._current = null;
            ig._initDOMReady()
        },
        addResource: function(b) {
            ig.resources.push(b)
        },
        setNocache: function(b) {
            ig.nocache = b ? "?" + Date.now() : ""
        },
        log: function() {},
        assert: function() {},
        show: function() {},
        mark: function() {},
        _loadScript: function(b, c) {
            ig.modules[b] = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig._waitForOnload++;
            var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
                f = ig.$new("script");
            f.type = "text/javascript";
            f.src = d;
            f.onload = function() {
                ig._waitForOnload--;
                ig._execModules()
            };
            f.onerror = function() {
                throw "Failed to load module " + b + " at " + d + " required from " + c;
            };
            ig.$("head")[0].appendChild(f)
        },
        _execModules: function() {
            for (var b = !1, c =
                0; c < ig._loadQueue.length; c++) {
                for (var d = ig._loadQueue[c], f = !0, g = 0; g < d.requires.length; g++) {
                    var m = d.requires[g];
                    ig.modules[m] ? ig.modules[m].loaded || (f = !1) : (f = !1, ig._loadScript(m, d.name))
                }
                f && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
            }
            if (b) ig._execModules();
            else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                b = [];
                for (c = 0; c < ig._loadQueue.length; c++) {
                    f = [];
                    m = ig._loadQueue[c].requires;
                    for (g = 0; g < m.length; g++) d = ig.modules[m[g]], (!d || !d.loaded) && f.push(m[g]);
                    b.push(ig._loadQueue[c].name +
                        " (requires: " + f.join(", ") + ")")
                }
                throw "Unresolved (or circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules or a previous syntax error prevents a module from loading:\n" + b.join("\n");
            }
        },
        _DOMReady: function() {
            if (!ig.modules["dom.ready"].loaded) {
                if (!document.body) return setTimeout(ig._DOMReady, 13);
                ig.modules["dom.ready"].loaded = !0;
                ig._waitForOnload--;
                ig._execModules()
            }
            return 0
        },
        _boot: function() {
            document.location.href.match(/\?nocache/) && ig.setNocache(!0);
            ig.ua.pixelRatio =
                b.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: b.innerWidth,
                height: b.innerHeight
            };
            ig.ua.screen = {
                width: b.screen.availWidth * ig.ua.pixelRatio,
                height: b.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
            ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
            ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
            ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.Kindle = /Silk/i.test(navigator.userAgent);
            ig.ua.touchDevice = "ontouchstart" in
                b || b.navigator.msMaxTouchPoints;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent)
        },
        _initDOMReady: function() {
            ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
                requires: [],
                loaded: !1,
                body: null
            }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
        }
    };
    ig.normalizeVendorAttribute(b, "requestAnimationFrame");
    if (b.requestAnimationFrame) {
        var c = 1,
            d = {};
        b.ig.setAnimation = function(f, g) {
            var m = c++;
            d[m] = !0;
            var x = function() {
                d[m] && (b.requestAnimationFrame(x, g), f())
            };
            b.requestAnimationFrame(x, g);
            return m
        };
        b.ig.clearAnimation = function(b) {
            delete d[b]
        }
    } else b.ig.setAnimation = function(c) {
        return b.setInterval(c, 1E3 / 60)
    }, b.ig.clearAnimation = function(c) {
        b.clearInterval(c)
    };
    var f = !1,
        g = /xyz/.test(function() {
            xyz
        }) ? /\bparent\b/ : /.*/,
        m = 0;
    b.ig.Class = function() {};
    var x = function(b) {
        var c = this.prototype,
            d = {},
            f;
        for (f in b) "function" ==
            typeof b[f] && "function" == typeof c[f] && g.test(b[f]) ? (d[f] = c[f], c[f] = function(b, c) {
                return function() {
                    var f = this.parent;
                    this.parent = d[b];
                    var g = c.apply(this, arguments);
                    this.parent = f;
                    return g
                }
            }(f, b[f])) : c[f] = b[f]
    };
    b.ig.Class.extend = function(c) {
        function d() {
            if (!f) {
                if (this.staticInstantiate) {
                    var b = this.staticInstantiate.apply(this, arguments);
                    if (b) return b
                }
                for (var c in this) "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
                this.init && this.init.apply(this, arguments)
            }
            return this
        }
        var s = this.prototype;
        f = !0;
        var A = new this;
        f = !1;
        for (var l in c) A[l] = "function" == typeof c[l] && "function" == typeof s[l] && g.test(c[l]) ? function(b, c) {
            return function() {
                var d = this.parent;
                this.parent = s[b];
                var f = c.apply(this, arguments);
                this.parent = d;
                return f
            }
        }(l, c[l]) : c[l];
        d.prototype = A;
        d.prototype.constructor = d;
        d.extend = b.ig.Class.extend;
        d.inject = x;
        d.classId = A.classId = ++m;
        return d
    };
    b.ImpactMixin && ig.merge(ig, b.ImpactMixin)
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: !1,
        failed: !1,
        loadCallback: null,
        path: "",
        staticInstantiate: function(b) {
            return ig.Image.cache[b] || null
        },
        init: function(b) {
            this.path = b;
            this.load()
        },
        load: function(b) {
            this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this),
                ig.Image.cache[this.path] = this)
        },
        reload: function() {
            this.loaded = !1;
            this.data = new Image;
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + "?" + Date.now()
        },
        onload: function() {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = !0;
            1 != ig.system.scale && this.resize(ig.system.scale);
            this.loadCallback && this.loadCallback(this.path, !0)
        },
        onerror: function() {
            this.failed = !0;
            this.loadCallback && this.loadCallback(this.path, !1)
        },
        resize: function(b) {
            var c = ig.getImagePixels(this.data, 0, 0, this.width,
                    this.height),
                d = this.width * b,
                f = this.height * b,
                g = ig.$new("canvas");
            g.width = d;
            g.height = f;
            for (var m = g.getContext("2d"), x = m.getImageData(0, 0, d, f), t = 0; t < f; t++)
                for (var y = 0; y < d; y++) {
                    var s = 4 * (Math.floor(t / b) * this.width + Math.floor(y / b)),
                        A = 4 * (t * d + y);
                    x.data[A] = c.data[s];
                    x.data[A + 1] = c.data[s + 1];
                    x.data[A + 2] = c.data[s + 2];
                    x.data[A + 3] = c.data[s + 3]
                }
            m.putImageData(x, 0, 0);
            this.data = g
        },
        draw: function(b, c, d, f, g, m) {
            if (this.loaded) {
                var x = ig.system.scale;
                g = (g ? g : this.width) * x;
                m = (m ? m : this.height) * x;
                ig.system.context.drawImage(this.data,
                    d ? d * x : 0, f ? f * x : 0, g, m, ig.system.getDrawPos(b), ig.system.getDrawPos(c), g, m);
                ig.Image.drawCount++
            }
        },
        drawTile: function(b, c, d, f, g, m, x) {
            g = g ? g : f;
            if (this.loaded && !(f > this.width || g > this.height)) {
                var t = ig.system.scale,
                    y = Math.floor(f * t),
                    s = Math.floor(g * t),
                    A = m ? -1 : 1,
                    l = x ? -1 : 1;
                if (m || x) ig.system.context.save(), ig.system.context.scale(A, l);
                ig.system.context.drawImage(this.data, Math.floor(d * f) % this.width * t, Math.floor(d * f / this.width) * g * t, y, s, ig.system.getDrawPos(b) * A - (m ? y : 0), ig.system.getDrawPos(c) * l - (x ? s : 0), y, s);
                (m ||
                    x) && ig.system.context.restore();
                ig.Image.drawCount++
            }
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var b in ig.Image.cache) ig.Image.cache[b].reload()
    }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(b) {
            this._loadMetrics(this.data);
            this.parent(b)
        },
        widthForString: function(b) {
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
                return c
            }
            return this._widthForLine(b)
        },
        _widthForLine: function(b) {
            for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] +
                this.letterSpacing;
            return c
        },
        heightForString: function(b) {
            return b.split("\n").length * (this.height + this.lineSpacing)
        },
        draw: function(b, c, d, f) {
            "string" != typeof b && (b = b.toString());
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var g = this.height + this.lineSpacing, m = 0; m < b.length; m++) this.draw(b[m], c, d + m * g, f)
            } else {
                if (f == ig.Font.ALIGN.RIGHT || f == ig.Font.ALIGN.CENTER) m = this._widthForLine(b), c -= f == ig.Font.ALIGN.CENTER ? m / 2 : m;
                1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
                for (m = 0; m < b.length; m++) f = b.charCodeAt(m),
                    c += this._drawChar(f - this.firstChar, c, d);
                1 !== this.alpha && (ig.system.context.globalAlpha = 1);
                ig.Image.drawCount += b.length
            }
        },
        _drawChar: function(b, c, d) {
            if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
            var f = ig.system.scale,
                g = this.widthMap[b] * f,
                m = (this.height - 2) * f;
            ig.system.context.drawImage(this.data, this.indices[b] * f, 0, g, m, ig.system.getDrawPos(c), ig.system.getDrawPos(d), g, m);
            return this.widthMap[b] + this.letterSpacing
        },
        _loadMetrics: function(b) {
            this.height = b.height - 1;
            this.widthMap = [];
            this.indices = [];
            for (var c = ig.getImagePixels(b, 0, b.height - 1, b.width, 1), d = 0, f = 0, g = 0; g < b.width; g++) {
                var m = 4 * g + 3;
                127 < c.data[m] ? f++ : 128 > c.data[m] && f && (this.widthMap.push(f), this.indices.push(g - f), d++, f = 0)
            }
            this.widthMap.push(f);
            this.indices.push(g - f)
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            if (!ig.Sound.enabled || !window.Audio) ig.Sound.enabled = !1;
            else {
                for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                    var d = ig.Sound.use[c];
                    if (b.canPlayType(d.mime)) {
                        this.format = d;
                        break
                    }
                }
                this.format || (ig.Sound.enabled = !1)
            }
        },
        load: function(b, c, d) {
            var f = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[b]) {
                if (c && this.clips[b].length < ig.Sound.channels)
                    for (c = this.clips[b].length; c <
                        ig.Sound.channels; c++) {
                        var g = new Audio(f);
                        g.load();
                        this.clips[b].push(g)
                    }
                return this.clips[b][0]
            }
            var m = new Audio(f);
            d && (m.addEventListener("canplaythrough", function t(c) {
                m.removeEventListener("canplaythrough", t, !1);
                d(b, !0, c)
            }, !1), m.addEventListener("error", function(c) {
                d(b, !1, c)
            }, !1));
            m.preload = "auto";
            m.load();
            this.clips[b] = [m];
            if (c)
                for (c = 1; c < ig.Sound.channels; c++) g = new Audio(f), g.load(), this.clips[b].push(g);
            return m
        },
        get: function(b) {
            b = this.clips[b];
            for (var c = 0, d; d = b[c++];)
                if (d.paused || d.ended) return d.ended &&
                    (d.currentTime = 0), d;
            b[0].pause();
            b[0].currentTime = 0;
            return b[0]
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: !1,
        _volume: 1,
        _loop: !1,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            Object.defineProperty ? (Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                }), Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                })) :
                this.__defineGetter__ && (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
        },
        add: function(b, c) {
            if (ig.Sound.enabled) {
                var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
                d.loop = this._loop;
                d.volume = this._volume;
                d.addEventListener("ended", this._endedCallbackBound, !1);
                this.tracks.push(d);
                c && (this.namedTracks[c] = d);
                this.currentTrack ||
                    (this.currentTrack = d)
            }
        },
        next: function() {
            this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
        },
        pause: function() {
            this.currentTrack && this.currentTrack.pause()
        },
        stop: function() {
            this.currentTrack && (this.currentTrack.pause(), this.currentTrack.currentTime = 0)
        },
        play: function(b) {
            if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack && (this.stop(),
                this.currentTrack = b);
            else if (!this.currentTrack) return;
            this.currentTrack.play()
        },
        getLooping: function() {
            return this._loop
        },
        setLooping: function(b) {
            this._loop = b;
            for (var c in this.tracks) this.tracks[c].loop = b
        },
        getVolume: function() {
            return this._volume
        },
        setVolume: function(b) {
            this._volume = b.limit(0, 1);
            for (var c in this.tracks) this.tracks[c].volume = this._volume
        },
        fadeOut: function(b) {
            this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this),
                50))
        },
        _fadeStep: function() {
            var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
        },
        _endedCallback: function() {
            this._loop ? this.play() : this.next()
        }
    });
    ig.Sound = ig.Class.extend({
        path: "",
        volume: 1,
        currentClip: null,
        multiChannel: !0,
        init: function(b, c) {
            this.path = b;
            this.multiChannel = !1 !== c;
            this.load()
        },
        load: function(b) {
            ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path,
                this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
        },
        play: function() {
            ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
        },
        stop: function() {
            this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: "mp3",
            mime: "audio/mpeg"
        },
        M4A: {
            ext: "m4a",
            mime: "audio/mp4; codecs=mp4a"
        },
        OGG: {
            ext: "ogg",
            mime: "audio/ogg; codecs=vorbis"
        },
        WEBM: {
            ext: "webm",
            mime: "audio/webm; codecs=vorbis"
        },
        CAF: {
            ext: "caf",
            mime: "audio/x-caf"
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
    ig.Sound.channels = 4;
    ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: !1,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(b, c) {
            this.gameClass = b;
            this.resources = c;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path)
        },
        load: function() {
            ig.system.clear("#000");
            if (this.resources.length) {
                for (var b =
                    0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
                this._intervalId = setInterval(this.draw.bind(this), 16)
            } else this.end()
        },
        loadResource: function(b) {
            b.load(this._loadCallbackBound)
        },
        end: function() {
            this.done || (this.done = !0, clearInterval(this._intervalId))
        },
        draw: function() {},
        _loadCallback: function(b, c) {
            if (c) this._unloaded.erase(b);
            else throw "Failed to load resource: " + b;
            this.status = 1 - this._unloaded.length / this.resources.length;
            0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
        }
    })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(b) {
            this.last = this.base = ig.Timer.time;
            this.target = b || 0
        },
        set: function(b) {
            this.target = b || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        tick: function() {
            var b = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return this.pausedAt ? 0 : b
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target
        },
        pause: function() {
            this.pausedAt || (this.pausedAt =
                ig.Timer.time)
        },
        unpause: function() {
            this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var b = Date.now();
        ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = b
    }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: !1,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(b, c, d, f, g) {
            this.fps = c;
            this.clock = new ig.Timer;
            this.canvas = ig.$(b);
            this.resize(d, f, g);
            this.context = this.canvas.getContext("2d");
            this.getDrawPos = ig.System.drawMode;
            1 != this.scale && (ig.System.scaleMode = ig.System.SCALE.CRISP);
            ig.System.scaleMode(this.canvas, this.context)
        },
        resize: function(b, c, d) {
            this.width = b;
            this.height = c;
            this.scale = d || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight
        },
        setGame: function(b) {
            this.running ? this.newGameClass = b : this.setGameNow(b)
        },
        setGameNow: function(b) {
            ig.game = new b;
            ig.system.setDelegate(ig.game)
        },
        setDelegate: function(b) {
            if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
            else throw "System.setDelegate: No run() function in object";
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = !1
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = !0
        },
        clear: function(b) {
            this.context.fillStyle = b;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight)
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(b) {
            return Math.round(b) * this.scale
        },
        SMOOTH: function(b) {
            return Math.round(b * this.scale)
        },
        SUBPIXEL: function(b) {
            return b * this.scale
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
        CRISP: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !1);
            b.style.imageRendering = "-moz-crisp-edges";
            b.style.imageRendering = "-o-crisp-edges";
            b.style.imageRendering = "-webkit-optimize-contrast";
            b.style.imageRendering = "crisp-edges";
            b.style.msInterpolationMode = "nearest-neighbor"
        },
        SMOOTH: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !0);
            b.style.imageRendering = "";
            b.style.msInterpolationMode = ""
        }
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
    ig.KEY = {
        MOUSE1: -1,
        MOUSE2: -3,
        MWHEEL_UP: -4,
        MWHEEL_DOWN: -5,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: !1,
        isUsingKeyboard: !1,
        isUsingAccelerometer: !1,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (!this.isUsingMouse) {
                this.isUsingMouse = !0;
                var b = this.mousewheel.bind(this);
                ig.system.canvas.addEventListener("mousewheel", b, !1);
                ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
                ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
                ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
                ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
                ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
                ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart",
                    this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
            }
        },
        initKeyboard: function() {
            this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
        },
        initAccelerometer: function() {
            this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
        },
        mousewheel: function(b) {
            var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
            c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
        },
        mousemove: function(b) {
            var c =
                parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
            ig.ua.mobile && (c = ig.system.realWidth);
            var c = ig.system.scale * (c / ig.system.realWidth),
                d = {
                    left: 0,
                    top: 0
                };
            ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
            b = b.touches ? b.touches[0] : b;
            this.mouse.x = (b.clientX - d.left) / c;
            this.mouse.y = (b.clientY - d.top) / c
        },
        contextmenu: function(b) {
            this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(), b.preventDefault())
        },
        keydown: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" ==
                c))
                if (c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, 0 > c && window.focus(), ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b), c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
        },
        keyup: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" == c))
                if (c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1]) this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault()
        },
        devicemotion: function(b) {
            this.accel = b.accelerationIncludingGravity
        },
        bind: function(b, c) {
            0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
            this.bindings[b] = c
        },
        bindTouch: function(b, c) {
            var d = ig.$(b),
                f = this;
            d.addEventListener("touchstart", function(b) {
                f.touchStart(b, c)
            }, !1);
            d.addEventListener("touchend", function(b) {
                f.touchEnd(b, c)
            }, !1);
            d.addEventListener("MSPointerDown", function(b) {
                f.touchStart(b, c)
            }, !1);
            d.addEventListener("MSPointerUp", function(b) {
                f.touchEnd(b, c)
            }, !1)
        },
        unbind: function(b) {
            this.delayedKeyup[this.bindings[b]] = !0;
            this.bindings[b] = null
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {}
        },
        state: function(b) {
            return this.actions[b]
        },
        pressed: function(b) {
            return this.presses[b]
        },
        released: function(b) {
            return !!this.delayedKeyup[b]
        },
        clearPressed: function() {
            for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
            this.delayedKeyup = {};
            this.presses = {}
        },
        touchStart: function(b, c) {
            this.actions[c] = !0;
            this.presses[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        },
        touchEnd: function(b, c) {
            this.delayedKeyup[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    })
});
ig.baked = !0;
ig.module("impact.sound-handler").defines(function() {
    ig.SoundHandler = ig.Class.extend({
        formats: {
            ogg: ".ogg",
            mp3: ".mp3"
        },
        jukebox: null,
        pausePosition: null,
        globalMute: !1,
        forceMuted: !1,
        muted: !1,
        bgmStarted: !1,
        bgmPlaying: !1,
        soundPlaying: !1,
        currentSoundPlaying: null,
        soundBuffer: [],
        voSoundLoaded: [],
        sfxSoundLoaded: [],
        SOUNDID: {},
        voSoundsToLoad: [],
        sfxSoundsToLoad: [{
            name: "staticSound",
            path: "media/audio/play/static"
        }, {
            name: "openingSound",
            path: "media/audio/opening/opening"
        }, {
            name: "kittyopeningSound",
            path: "media/audio/opening/kittyopening"
        }, {
            name: "normal",
            path: "media/audio/normal"
        }, {
            name: "reload",
            path: "media/audio/reload"
        }, {
            name: "rocket",
            path: "media/audio/rocket"
        }, {
            name: "laser",
            path: "media/audio/laser"
        }, {
            name: "bubble",
            path: "media/audio/bubble"
        }, {
            name: "magic",
            path: "media/audio/magic"
        }, {
            name: "speed",
            path: "media/audio/speed"
        }, {
            name: "click",
            path: "media/audio/click"
        }, {
            name: "player",
            path: "media/audio/player"
        }, {
            name: "heart",
            path: "media/audio/heart"
        }, {
            name: "vacuum",
            path: "media/audio/vacuum"
        }, {
            name: "shock",
            path: "media/audio/shock"
        }, {
            name: "rock",
            path: "media/audio/rock"
        }, {
            name: "explode",
            path: "media/audio/explode"
        }, {
            name: "die",
            path: "media/audio/die"
        }, {
            name: "ready",
            path: "media/audio/ready"
        }, {
            name: "go",
            path: "media/audio/go"
        }],
        debug: !1,
        init: function() {
            ig.ua.mobile ? (this.initSfx(), this.setupJukebox()) : (this.initSfx(), this.setupDesktopMusic());
            this.setupWindowHandler()
        },
        allVoSoundLoaded: function() {
            if (this.voSoundLoaded.length >= this.voSoundsToLoad.length) {
                this.debug && console.log("Vo ready");
                for (index = 0; index < this.voSoundLoaded.length; index++) this.voSoundLoaded[index].on("end",
                    function(b) {
                        b.isPlaying = !1;
                        this.soundBuffer.pop()
                    }.bind(this, this.voSoundLoaded[index])), this.voSoundLoaded[index].on("play", function(b) {
                    b.isPlaying = !0
                }.bind(this, this.voSoundLoaded[index]));
                return !0
            }
            return !1
        },
        allSfxSoundLoaded: function() {
            return this.sfxSoundLoaded.length >= this.sfxSoundsToLoad.length ? !0 : !1
        },
        stopBackgroundMusic: function() {
            ig.ua.mobile ? this.pausePosition = this.jukebox.player.pause() : ig.music.pause();
            this.bgmPlaying = !1
        },
        playBackgroundMusic: function() {
            this.bgmPlaying || (this.bgmStarted = !0, ig.ua.mobile ? this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0) : ig.music.play(), this._unMuteBackgroundMusic(), this.bgmPlaying = !0)
        },
        playSound: function(b) {
            if ((b = this[b]) && (!this.forceMuted || !this.muted) && !b.isPlaying) this.soundBuffer.push(b), b.play()
        },
        stopAllAndPlaySound: function(b) {
            this.stopAllSounds();
            this.playSound(b)
        },
        stopAllSounds: function() {
            for (index = 0; index < this.soundBuffer.length; index++) this.soundBuffer[index].isPlaying = !1, this.soundBuffer.splice(0, 1)[0].stop()
        },
        addSound: function(b, c, d) {
            var f = c + this.formats.ogg;
            c += this.formats.mp3;
            this.SOUNDID[b] = b;
            this[b] = d ? new Howl({
                urls: [f, c],
                onload: d
            }) : new Howl({
                urls: [f, c]
            })
        },
        _muteSounds: function() {
            for (i = 0; i < ig.resources.length; i++) ig.resources[i].multiChannel && ig.resources[i].stop();
            Howler.mute();
            ig.Sound.enabled = !1;
            this.debug && console.log("Sounds muted")
        },
        _unMuteSounds: function() {
            Howler.unmute();
            ig.Sound.enabled = !0;
            this.debug && console.log("Sounds can play")
        },
        _muteBackgroundMusic: function() {
            ig.ua.mobile ?
                (this.stopBackgroundMusic(), this.jukebox.player.setVolume(0)) : ig.music.volume = 0;
            this.debug && console.log("BGM muted");
            this.bgmPlaying = !1
        },
        _unMuteBackgroundMusic: function() {
            this.bgmStarted && (ig.ua.mobile ? (this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0), this.jukebox.player.setVolume(1)) : ig.music.volume = 1, this.debug && console.log("BGM can play"), this.bgmPlaying = !0)
        },
        focusBlurMute: function() {
            this.forceMuted ||
                this.mute()
        },
        focusBlurUnmute: function() {
            this.forceMuted || this.unmute()
        },
        setForceMuted: function(b) {
            this.forceMuted = b
        },
        mute: function() {
            this.muted || (this._muteSounds(), this._muteBackgroundMusic(), this.muted = !0, ig.game && (ig.game.gamePaused = !0))
        },
        unmute: function() {
            this.muted && (ig.game && (!1 == ig.game.tutOn && (ig.game.gamePaused = !1), ig.game.storage.get(ig.game.musicKey) ? ig.soundHandler._unMuteBackgroundMusic() : ig.soundHandler._muteBackgroundMusic(), ig.game.storage.get(ig.game.soundKey) ? ig.soundHandler._unMuteSounds() :
                ig.soundHandler._muteSounds()), this.muted = !1)
        },
        setupWindowHandler: function() {
            "true" === getQueryVariable("webview") ? ($(window).focus(function() {
                ig.ua.mobile && ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.focusBlurUnmute()
            }), $(window).blur(function() {
                ig.soundHandler && ig.soundHandler.focusBlurMute()
            })) : (window.onfocus = function() {
                ig.ua.mobile && ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.focusBlurUnmute()
            }, window.onblur = function() {
                ig.soundHandler && ig.soundHandler.focusBlurMute()
            })
        },
        initSfx: function() {
            for (index = 0; index < this.sfxSoundsToLoad.length; index++) {
                var b = function(b) {
                    this.sfxSoundLoaded.push(this[b])
                }.bind(this, this.sfxSoundsToLoad[index].name);
                this.addSound(this.sfxSoundsToLoad[index].name, this.sfxSoundsToLoad[index].path, b)
            }
        },
        initVoSfx: function() {
            for (index = 0; index < this.voSoundsToLoad.length; index++) {
                var b = function(b) {
                    this.voSoundLoaded.push(this[b])
                }.bind(this, this.voSoundsToLoad[index].name);
                this.addSound(this.voSoundsToLoad[index].name, this.voSoundsToLoad[index].path,
                    b)
            }
        },
        setupDesktopMusic: function() {
            ig.music.add("media/audio/bgm.*", "background")
        },
        setupJukebox: function() {
            ig.ua.mobile && (this.jukebox = new ig.Jukebox, this.pausePosition = this.jukebox.player.settings.spritemap.music.start)
        },
        forceLoopBGM: function() {
            if (ig.ua.winPhone && !this.forceMuted && this.bgmPlaying && this.jukebox && this.jukebox.player && this.jukebox.player.settings.spritemap.music && this.jukebox.player.settings.spritemap.music.loop) {
                if (0 <= this.prevTime)
                    if (this.jukebox.player.getCurrentTime() === this.prevTime) {
                        if (this.silentCounter ||
                            (this.silentCounter = 0), this.silentCounter++, this.jukebox.player.getCurrentTime() >= this.jukebox.player.settings.spritemap.music.end || this.silentCounter > 0.0010 * ig.soundHandler.jukebox.player.settings.timeout * ig.system.fps) this.jukebox.player.pause(), this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start, !0), this.silentCounter = null
                    } else this.silentCounter = null;
                this.prevTime = this.jukebox.player.getCurrentTime()
            }
        }
    })
});

function getHiddenProp() {
    var b = ["webkit", "moz", "ms", "o"];
    if ("hidden" in document) return "hidden";
    for (var c = 0; c < b.length; c++)
        if (b[c] + "Hidden" in document) return b[c] + "Hidden";
    return null
}

function isHidden() {
    var b = getHiddenProp();
    return !b ? !1 : document[b]
}
var visProp = getHiddenProp();
if (visProp) {
    var evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
    document.addEventListener(evtname, visChange)
}
window.addEventListener("pagehide", function() {
    ig.soundHandler && ig.soundHandler.focusBlurMute()
}, !1);
window.addEventListener("pageshow", function() {
    ig.ua.mobile && ig.game && ig.game.resumeGame();
    ig.soundHandler && ig.soundHandler.focusBlurUnmute()
}, !1);

function visChange() {
    isHidden() ? ig.soundHandler && ig.soundHandler.focusBlurMute() : (ig.ua.mobile && ig.game && ig.game.resumeGame(), ig.soundHandler && ig.soundHandler.focusBlurUnmute())
}
ig.baked = !0;
ig.module("plugins.multitouch-input").defines(function() {
    ig.MultitouchInput = ig.Class.extend({
        isStart: !1,
        touches: [],
        multitouchCapable: !1,
        lastEventUp: null,
        start: function() {
            this.isStart || (this.isStart = !0, navigator.maxTouchPoints && 1 < navigator.maxTouchPoints && (this.multitouchCapable = !0), ig.ua.touchDevice && (window.navigator.msPointerEnabled && (ig.system.canvas.addEventListener("MSPointerDown", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove",
                this.touchmove.bind(this), !1), ig.system.canvas.style.msContentZooming = "none", ig.system.canvas.style.msTouchAction = "none"), ig.system.canvas.addEventListener("touchstart", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.touchmove.bind(this), !1)))
        },
        touchmove: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = parseInt(ig.system.canvas.offsetHeight) ||
                ig.system.realHeight,
                d = ig.system.scale * (d / ig.system.realHeight);
            if (ig.ua.touchDevice)
                if (b.touches) {
                    for (; 0 < this.touches.length;) this.touches.pop();
                    !this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
                    var f = {
                        left: 0,
                        top: 0
                    };
                    ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
                    for (var g = 0; g < b.touches.length; g++) {
                        var m = b.touches[g];
                        if (m) {
                            var x = (m.clientX - f.left) / c,
                                m = (m.clientY - f.top) / d;
                            this.touches.push({
                                x: x,
                                y: m,
                                id: x + "" + m
                            })
                        }
                    }
                } else this.windowMove(b)
        },
        touchdown: function(b) {
            if (window.navigator.msPointerEnabled) this.windowKeyDown(b);
            else {
                var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                    c = ig.system.scale * (c / ig.system.realWidth),
                    d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                    d = ig.system.scale * (d / ig.system.realHeight);
                if (ig.ua.touchDevice && b.touches) {
                    for (; 0 < this.touches.length;) this.touches.pop();
                    !this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
                    var f = {
                        left: 0,
                        top: 0
                    };
                    ig.system.canvas.getBoundingClientRect &&
                        (f = ig.system.canvas.getBoundingClientRect());
                    for (var g = 0; g < b.touches.length; g++) {
                        var m = b.touches[g];
                        if (m) {
                            var x = (m.clientX - f.left) / c,
                                m = (m.clientY - f.top) / d;
                            this.touches.push({
                                x: x,
                                y: m,
                                id: x + "" + m
                            })
                        }
                    }
                }
            }
        },
        touchup: function(b) {
            if (window.navigator.msPointerEnabled) this.windowKeyUp(b);
            else {
                var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                    c = ig.system.scale * (c / ig.system.realWidth);
                parseInt(ig.system.canvas.offsetHeight);
                this.lastEventUp = b;
                var d = {
                    left: 0,
                    top: 0
                };
                ig.system.canvas.getBoundingClientRect &&
                    (d = ig.system.canvas.getBoundingClientRect());
                if (ig.ua.touchDevice) {
                    b = (b.changedTouches[0].clientX - d.left) / c;
                    for (c = 0; c < this.touches.length; c++) this.touches[c].x >= b - 40 && this.touches[c].x <= b + 40 && this.touches.splice(c, 1)
                }
            }
        },
        windowKeyDown: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                d = ig.system.scale * (d / ig.system.realHeight);
            if (window.navigator.msPointerEnabled) {
                var f = {
                    left: 0,
                    top: 0
                };
                ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
                b = b.changedTouches ? b.changedTouches : [b];
                for (var g = 0; g < b.length; ++g) {
                    for (var m = b[g], x = "undefined" != typeof m.identifier ? m.identifier : "undefined" != typeof m.pointerId ? m.pointerId : 1, t = (m.clientX - f.left) / c, m = (m.clientY - f.top) / d, y = 0; y < this.touches.length; ++y) this.touches[y].identifier == x && this.touches.splice(y, 1);
                    this.touches.push({
                        x: t,
                        y: m,
                        identifier: x
                    })
                }
                for (c = 0; c < this.touches.length; c++);
            }
        },
        windowKeyUp: function(b) {
            b =
                "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1;
            for (var c = 0; c < this.touches.length; ++c) this.touches[c].identifier == b && this.touches.splice(c, 1)
        },
        windowMove: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                d = ig.system.scale * (d / ig.system.realHeight),
                f = {
                    left: 0,
                    top: 0
                };
            ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
            if (window.navigator.msPointerEnabled)
                for (var g = "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1, m = 0; m < this.touches.length; ++m)
                    if (this.touches[m].identifier == g) {
                        var x = (b.clientY - f.top) / d;
                        this.touches[m].x = (b.clientX - f.left) / c;
                        this.touches[m].y = x
                    }
        }
    })
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound", "impact.sound-handler", "plugins.multitouch-input").defines(function() {
    ig.main = function(b, c, d, f, g, m, x) {
        ig.system = new ig.System(b, d, f, g, m || 1);
        ig.input = new ig.Input;
        ig.multitouchInput = new ig.MultitouchInput;
        ig.soundManager = new ig.SoundManager;
        ig.music = new ig.Music;
        ig.ready = !0;
        ig.soundHandler = new ig.SoundHandler;
        (new(x || ig.Loader)(c, ig.resources)).load()
    }
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(b, c, d) {
            this.width = c;
            this.height = d;
            this.image = new ig.Image(b)
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: !1,
            y: !1
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function(b, c, d, f) {
            this.sheet = b;
            this.pivot = {
                x: b.width / 2,
                y: b.height / 2
            };
            this.timer = new ig.Timer;
            this.frameTime = c;
            this.sequence = d;
            this.stop = !!f;
            this.tile = this.sequence[0]
        },
        rewind: function() {
            this.timer.set();
            this.frame = this.loopCount = 0;
            this.tile = this.sequence[0];
            return this
        },
        gotoFrame: function(b) {
            this.timer.set(this.frameTime * -b - 1E-4);
            this.update()
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var b = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(b / this.sequence.length);
            this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
            this.tile = this.sequence[this.frame]
        },
        draw: function(b, c) {
            var d = Math.max(this.sheet.width, this.sheet.height);
            b > ig.system.width || c > ig.system.height || (0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle),
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
        }
    })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: !1,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: !1,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(b,
            c, d) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = this.last.x = b;
            this.pos.y = this.last.y = c;
            ig.merge(this, d)
        },
        reset: function(b, c, d) {
            var f = this.constructor.prototype;
            this.pos.x = b;
            this.pos.y = c;
            this.last.x = b;
            this.last.y = c;
            this.vel.x = f.vel.x;
            this.vel.y = f.vel.y;
            this.accel.x = f.accel.x;
            this.accel.y = f.accel.y;
            this.health = f.health;
            this._killed = f._killed;
            this.standing = f.standing;
            this.type = f.type;
            this.checkAgainst = f.checkAgainst;
            this.collides = f.collides;
            ig.merge(this, d)
        },
        addAnim: function(b, c, d, f) {
            if (!this.animSheet) throw "No animSheet to add the animation " +
                b + " to.";
            c = new ig.Animation(this.animSheet, c, d, f);
            this.anims[b] = c;
            this.currentAnim || (this.currentAnim = c);
            return c
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y *
                ig.system.tick, this.size.x, this.size.y);
            this.handleMovementTrace(b);
            this.currentAnim && this.currentAnim.update()
        },
        getNewVelocity: function(b, c, d, f) {
            return c ? (b + c * ig.system.tick).limit(-f, f) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-f, f)
        },
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) >
                this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
                } else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
            }
            this.pos = b.pos
        },
        draw: function() {
            this.currentAnim && this.currentAnim.draw(this.pos.x -
                this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        kill: function() {
            ig.game.removeEntity(this)
        },
        receiveDamage: function(b) {
            this.health -= b;
            0 >= this.health && this.kill()
        },
        touches: function(b) {
            return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
        },
        distanceTo: function(b) {
            var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
            b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
            return Math.sqrt(c * c + b * b)
        },
        angleTo: function(b) {
            return Math.atan2(b.pos.y +
                b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
        },
        check: function() {},
        collideWith: function() {},
        ready: function() {},
        erase: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function(b, c) {
        b.checkAgainst & c.type && b.check(c);
        c.checkAgainst & b.type && c.check(b);
        b.collides && c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE && ig.Entity.solveCollision(b, c)
    };
    ig.Entity.solveCollision =
        function(b, c) {
            var d = null;
            if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d = b;
            else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
            b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c,
                b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
        };
    ig.Entity.seperateOnXAxis = function(b, c, d) {
        var f = b.pos.x + b.size.x - c.pos.x;
        d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -f : f, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -f / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, f / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x))
    };
    ig.Entity.seperateOnYAxis = function(b, c, d) {
        var f = b.pos.y + b.size.y - c.pos.y;
        if (d) {
            c = b === d ? c : b;
            d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
            var g = 0;
            d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, g = c.vel.x * ig.system.tick);
            b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, g, d == b ? -f : f, d.size.x, d.size.y);
            d.pos.y = b.pos.y;
            d.pos.x = b.pos.x
        } else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness &&
            b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d = (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, g = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, g, -f / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, f / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
    }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(b, c) {
            this.tilesize = b;
            this.data = c;
            this.height = c.length;
            this.width = c[0].length;
            this.pxWidth = this.width * this.tilesize;
            this.pxHeight = this.height * this.tilesize
        },
        getTile: function(b, c) {
            var d = Math.floor(b / this.tilesize),
                f = Math.floor(c / this.tilesize);
            return 0 <= d && d < this.width && 0 <= f && f < this.height ? this.data[f][d] : 0
        },
        setTile: function(b, c, d) {
            b = Math.floor(b / this.tilesize);
            c = Math.floor(c /
                this.tilesize);
            0 <= b && b < this.width && 0 <= c && c < this.height && (this.data[c][b] = d)
        }
    })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(b, c, g) {
            this.parent(b, c);
            this.tiledef = g || ig.CollisionMap.defaultTileDef;
            for (var m in this.tiledef) m | 0 > this.lastSlope && (this.lastSlope = m | 0)
        },
        trace: function(b, c, g, m, x, t) {
            var y = {
                    collision: {
                        x: !1,
                        y: !1,
                        slope: !1
                    },
                    pos: {
                        x: b,
                        y: c
                    },
                    tile: {
                        x: 0,
                        y: 0
                    }
                },
                s = Math.ceil(Math.max(Math.abs(g), Math.abs(m)) / this.tilesize);
            if (1 < s)
                for (var A = g / s, l = m / s, p = 0; p < s && (A || l) && !(this._traceStep(y,
                    b, c, A, l, x, t, g, m, p), b = y.pos.x, c = y.pos.y, y.collision.x && (g = A = 0), y.collision.y && (m = l = 0), y.collision.slope); p++);
            else this._traceStep(y, b, c, g, m, x, t, g, m, 0);
            return y
        },
        _traceStep: function(b, c, g, m, x, t, y, s, A, l) {
            b.pos.x += m;
            b.pos.y += x;
            var p = 0;
            if (m) {
                var r = 0 < m ? t : 0,
                    D = 0 > m ? this.tilesize : 0,
                    p = Math.max(Math.floor(g / this.tilesize), 0),
                    J = Math.min(Math.ceil((g + y) / this.tilesize), this.height);
                m = Math.floor((b.pos.x + r) / this.tilesize);
                var G = Math.floor((c + r) / this.tilesize);
                if (0 < l || m == G || 0 > G || G >= this.width) G = -1;
                if (0 <= m && m < this.width)
                    for (var E =
                        p; E < J && !(-1 != G && (p = this.data[E][G], 1 < p && p <= this.lastSlope && this._checkTileDef(b, p, c, g, s, A, t, y, G, E))); E++)
                        if (p = this.data[E][m], 1 == p || p > this.lastSlope || 1 < p && this._checkTileDef(b, p, c, g, s, A, t, y, m, E)) {
                            if (1 < p && p <= this.lastSlope && b.collision.slope) break;
                            b.collision.x = !0;
                            b.tile.x = p;
                            c = b.pos.x = m * this.tilesize - r + D;
                            s = 0;
                            break
                        }
            }
            if (x) {
                r = 0 < x ? y : 0;
                x = 0 > x ? this.tilesize : 0;
                p = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
                D = Math.min(Math.ceil((b.pos.x + t) / this.tilesize), this.width);
                E = Math.floor((b.pos.y + r) / this.tilesize);
                J = Math.floor((g + r) / this.tilesize);
                if (0 < l || E == J || 0 > J || J >= this.height) J = -1;
                if (0 <= E && E < this.height)
                    for (m = p; m < D && !(-1 != J && (p = this.data[J][m], 1 < p && p <= this.lastSlope && this._checkTileDef(b, p, c, g, s, A, t, y, m, J))); m++)
                        if (p = this.data[E][m], 1 == p || p > this.lastSlope || 1 < p && this._checkTileDef(b, p, c, g, s, A, t, y, m, E)) {
                            if (1 < p && p <= this.lastSlope && b.collision.slope) break;
                            b.collision.y = !0;
                            b.tile.y = p;
                            b.pos.y = E * this.tilesize - r + x;
                            break
                        }
            }
        },
        _checkTileDef: function(b, c, g, m, x, t, y, s, A, l) {
            var p = this.tiledef[c];
            if (!p) return !1;
            c = (p[2] -
                p[0]) * this.tilesize;
            var r = (p[3] - p[1]) * this.tilesize,
                D = p[4];
            y = g + x + (0 > r ? y : 0) - (A + p[0]) * this.tilesize;
            s = m + t + (0 < c ? s : 0) - (l + p[1]) * this.tilesize;
            if (0 < c * s - r * y) {
                if (0 > x * -r + t * c) return D;
                A = Math.sqrt(c * c + r * r);
                l = r / A;
                A = -c / A;
                var J = y * l + s * A,
                    p = l * J,
                    J = A * J;
                if (p * p + J * J >= x * x + t * t) return D || 0.5 > c * (s - t) - r * (y - x);
                b.pos.x = g + x - p;
                b.pos.y = m + t - J;
                b.collision.slope = {
                    x: c,
                    y: r,
                    nx: l,
                    ny: A
                };
                return !0
            }
            return !1
        }
    });
    var b = 1 / 3,
        c = 2 / 3;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, c, !0],
        6: [0, c, 1, b, !0],
        7: [0, b, 1, 0, !0],
        3: [0, 1, 1, 0.5, !0],
        4: [0, 0.5, 1, 0, !0],
        2: [0,
            1, 1, 0, !0
        ],
        10: [0.5, 1, 1, 0, !0],
        21: [0, 1, 0.5, 0, !0],
        32: [c, 1, 1, 0, !0],
        43: [b, 1, c, 0, !0],
        54: [0, 1, b, 0, !0],
        27: [0, 0, 1, b, !0],
        28: [0, b, 1, c, !0],
        29: [0, c, 1, 1, !0],
        25: [0, 0, 1, 0.5, !0],
        26: [0, 0.5, 1, 1, !0],
        24: [0, 0, 1, 1, !0],
        11: [0, 0, 0.5, 1, !0],
        22: [0.5, 0, 1, 1, !0],
        33: [0, 0, b, 1, !0],
        44: [b, 0, c, 1, !0],
        55: [c, 0, 1, 1, !0],
        16: [1, b, 0, 0, !0],
        17: [1, c, 0, b, !0],
        18: [1, 1, 0, c, !0],
        14: [1, 0.5, 0, 0, !0],
        15: [1, 1, 0, 0.5, !0],
        13: [1, 1, 0, 0, !0],
        8: [0.5, 1, 0, 0, !0],
        19: [1, 1, 0.5, 0, !0],
        30: [b, 1, 0, 0, !0],
        41: [c, 1, b, 0, !0],
        52: [1, 1, c, 0, !0],
        38: [1, c, 0, 1, !0],
        39: [1, b, 0, c, !0],
        40: [1, 0,
            0, b, !0
        ],
        36: [1, 0.5, 0, 1, !0],
        37: [1, 0, 0, 0.5, !0],
        35: [1, 0, 0, 1, !0],
        9: [1, 0, 0.5, 1, !0],
        20: [0.5, 0, 0, 1, !0],
        31: [1, 0, c, 1, !0],
        42: [c, 0, b, 1, !0],
        53: [b, 0, 0, 1, !0],
        12: [0, 0, 1, 0, !1],
        23: [1, 1, 0, 1, !1],
        34: [1, 0, 1, 1, !1],
        45: [0, 1, 0, 0, !1]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(b, c, g, m) {
            return {
                collision: {
                    x: !1,
                    y: !1,
                    slope: !1
                },
                pos: {
                    x: b + g,
                    y: c + m
                },
                tile: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: !1,
        tilesetName: "",
        foreground: !1,
        enabled: !0,
        preRender: !1,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: !1,
        anims: {},
        init: function(b, c, d) {
            this.parent(b, c);
            this.setTileset(d)
        },
        setTileset: function(b) {
            this.tilesetName = b instanceof ig.Image ? b.path : b;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null
        },
        setScreenPos: function(b,
            c) {
            this.scroll.x = b / this.distance;
            this.scroll.y = c / this.distance
        },
        preRenderMapToChunks: function() {
            var b = this.width * this.tilesize * ig.system.scale,
                c = this.height * this.tilesize * ig.system.scale;
            this.chunkSize = Math.min(Math.max(b, c), this.chunkSize);
            var d = Math.ceil(b / this.chunkSize),
                f = Math.ceil(c / this.chunkSize);
            this.preRenderedChunks = [];
            for (var g = 0; g < f; g++) {
                this.preRenderedChunks[g] = [];
                for (var m = 0; m < d; m++) this.preRenderedChunks[g][m] = this.preRenderChunk(m, g, m == d - 1 ? b - m * this.chunkSize : this.chunkSize, g == f - 1 ?
                    c - g * this.chunkSize : this.chunkSize)
            }
        },
        preRenderChunk: function(b, c, d, f) {
            var g = d / this.tilesize / ig.system.scale + 1,
                m = f / this.tilesize / ig.system.scale + 1,
                x = b * this.chunkSize / ig.system.scale % this.tilesize,
                t = c * this.chunkSize / ig.system.scale % this.tilesize;
            b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
            c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
            var y = ig.$new("canvas");
            y.width = d;
            y.height = f;
            y.retinaResolutionEnabled = !1;
            f = y.getContext("2d");
            ig.System.scaleMode(y, f);
            d = ig.system.context;
            ig.system.context = f;
            for (f = 0; f < g; f++)
                for (var s = 0; s < m; s++)
                    if (f + b < this.width && s + c < this.height) {
                        var A = this.data[s + c][f + b];
                        A && this.tiles.drawTile(f * this.tilesize - x, s * this.tilesize - t, A - 1, this.tilesize)
                    }
            ig.system.context = d;
            return y
        },
        draw: function() {
            this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
        },
        drawPreRendered: function() {
            this.preRenderedChunks || this.preRenderMapToChunks();
            var b = ig.system.getDrawPos(this.scroll.x),
                c = ig.system.getDrawPos(this.scroll.y);
            if (this.repeat) var d =
                this.width * this.tilesize * ig.system.scale,
                b = (b % d + d) % d,
                d = this.height * this.tilesize * ig.system.scale,
                c = (c % d + d) % d;
            var d = Math.max(Math.floor(b / this.chunkSize), 0),
                f = Math.max(Math.floor(c / this.chunkSize), 0),
                g = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
                m = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
                x = this.preRenderedChunks[0].length,
                t = this.preRenderedChunks.length;
            this.repeat || (g = Math.min(g, x), m = Math.min(m, t));
            for (var y = 0; f < m; f++) {
                for (var s = 0, A = d; A < g; A++) {
                    var l = this.preRenderedChunks[f % t][A % x],
                        p = -b + A * this.chunkSize - s,
                        r = -c + f * this.chunkSize - y;
                    ig.system.context.drawImage(l, p, r);
                    ig.Image.drawCount++;
                    this.debugChunks && (ig.system.context.strokeStyle = "#f0f", ig.system.context.strokeRect(p, r, this.chunkSize, this.chunkSize));
                    this.repeat && l.width < this.chunkSize && p + l.width < ig.system.realWidth && (s += this.chunkSize - l.width, g++)
                }
                this.repeat && l.height < this.chunkSize && r + l.height < ig.system.realHeight && (y += this.chunkSize - l.height, m++)
            }
        },
        drawTiled: function() {
            for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(),
                f = (this.scroll.y / this.tilesize).toInt(), g = this.scroll.x % this.tilesize, m = this.scroll.y % this.tilesize, x = -g - this.tilesize, g = ig.system.width + this.tilesize - g, t = ig.system.height + this.tilesize - m, y = -1, m = -m - this.tilesize; m < t; y++, m += this.tilesize) {
                var s = y + f;
                if (s >= this.height || 0 > s) {
                    if (!this.repeat) continue;
                    s = (s % this.height + this.height) % this.height
                }
                for (var A = -1, l = x; l < g; A++, l += this.tilesize) {
                    b = A + d;
                    if (b >= this.width || 0 > b) {
                        if (!this.repeat) continue;
                        b = (b % this.width + this.width) % this.width
                    }
                    if (b = this.data[s][b])(c = this.anims[b -
                        1]) ? c.draw(l, m) : this.tiles.drawTile(l, m, b - 1, this.tilesize)
                }
            }
        }
    })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
    ig.Game = ig.Class.extend({
        clearColor: "#000000",
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: !1,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: !1,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null
        },
        loadLevel: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var c = 0; c < b.entities.length; c++) {
                var d = b.entities[c];
                this.spawnEntity(d.type, d.x, d.y, d.settings)
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (c = 0; c < b.layer.length; c++)
                if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var f = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    f.anims = this.backgroundAnims[d.tilesetName] || {};
                    f.repeat = d.repeat;
                    f.distance = d.distance;
                    f.foreground = !!d.foreground;
                    f.preRender = !!d.preRender;
                    f.name = d.name;
                    this.backgroundMaps.push(f)
                }
            for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
        },
        loadLevelDeferred: function(b) {
            this._levelToLoad = b
        },
        getMapByName: function(b) {
            if ("collision" == b) return this.collisionMap;
            for (var c = 0; c < this.backgroundMaps.length; c++)
                if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
            return null
        },
        getEntityByName: function(b) {
            return this.namedEntities[b]
        },
        getEntitiesByType: function(b) {
            b =
                "string" === typeof b ? ig.global[b] : b;
            for (var c = [], d = 0; d < this.entities.length; d++) {
                var f = this.entities[d];
                f instanceof b && !f._killed && c.push(f)
            }
            return c
        },
        spawnEntity: function(b, c, d, f) {
            var g = "string" === typeof b ? ig.global[b] : b;
            if (!g) throw "Can't spawn entity of type " + b;
            b = new g(c, d, f || {});
            this.entities.push(b);
            b.name && (this.namedEntities[b.name] = b);
            return b
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy)
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = !0
        },
        removeEntity: function(b) {
            b.name &&
                delete this.namedEntities[b.name];
            b._killed = !0;
            b.type = ig.Entity.TYPE.NONE;
            b.checkAgainst = ig.Entity.TYPE.NONE;
            b.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(b)
        },
        run: function() {
            this.update();
            this.draw()
        },
        update: function() {
            this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
            this.updateEntities();
            this.checkEntities();
            for (var b = 0; b < this._deferredKill.length; b++) this._deferredKill[b].erase(), this.entities.erase(this._deferredKill[b]);
            this._deferredKill = [];
            if (this._doSortEntities ||
                this.autoSort) this.sortEntities(), this._doSortEntities = !1;
            for (var c in this.backgroundAnims) {
                var b = this.backgroundAnims[c],
                    d;
                for (d in b) b[d].update()
            }
        },
        updateEntities: function() {
            for (var b = 0; b < this.entities.length; b++) {
                var c = this.entities[b];
                c._killed || c.update()
            }
        },
        draw: function() {
            this.clearColor && ig.system.clear(this.clearColor);
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var b;
            for (b = 0; b < this.backgroundMaps.length; b++) {
                var c =
                    this.backgroundMaps[b];
                if (c.foreground) break;
                c.setScreenPos(this.screen.x, this.screen.y);
                c.draw()
            }
            this.drawEntities();
            for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
        },
        drawEntities: function() {
            for (var b = 0; b < this.entities.length; b++) this.entities[b].draw()
        },
        checkEntities: function() {
            for (var b = {}, c = 0; c < this.entities.length; c++) {
                var d = this.entities[c];
                if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                    for (var f = {}, g = Math.floor(d.pos.y / this.cellSize), m = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, x = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, t = Math.floor(d.pos.x / this.cellSize); t < m; t++)
                        for (var y = g; y < x; y++)
                            if (b[t])
                                if (b[t][y]) {
                                    for (var s = b[t][y], A = 0; A < s.length; A++) d.touches(s[A]) && !f[s[A].id] && (f[s[A].id] = !0, ig.Entity.checkPair(d, s[A]));
                                    s.push(d)
                                } else b[t][y] = [d];
                else b[t] = {}, b[t][y] = [d]
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(b, c) {
            return b.zIndex - c.zIndex
        },
        POS_X: function(b, c) {
            return b.pos.x + b.size.x - (c.pos.x +
                c.size.x)
        },
        POS_Y: function(b, c) {
            return b.pos.y + b.size.y - (c.pos.y + c.size.y)
        }
    }
});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation", "impact.timer").defines(function() {
    ig.SplashLoader = ig.Loader.extend({
        bgIm: new ig.Image("media/graphics/sprites/home/home-bg.png"),
        logoIm: new ig.Image("media/graphics/sprites/home/logo2.png"),
        redCrystalLeftIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        redCrystalLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frame: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2,
            rot: 320
        },
        blueGiftLeftIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-side_5x2.png"),
        blueGiftLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frame: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2,
            rot: 137
        },
        barIm: new ig.Image("media/graphics/sprites/splash/bar.png"),
        barBaseIm: new ig.Image("media/graphics/sprites/splash/bar-base.png"),
        countDots: 0,
        countDelay: 0,
        loadingText: "",
        init: function(b, c) {
            this.parent(b, c);
            ig.ua.mobile
            // && _SETTINGS.Ad.Mobile.Preroll.Enabled && MobileAdInGamePreroll.Initialize()
        },
        end: function() {
            this.parent();
            var b = 0 <= document.URL.indexOf("localhost") ? 500 : 3E3;
            window.setTimeout("ig.system.setGame(MyGame)",
                b)
        },
        setupCustomAnimation: function() {
            this.customAnim = new ig.Animation(this.customAnim, 0.05, [0, 1, 2, 3, 4, 5]);
            this.customAnim.currentFrame = 0;
            ig.loadingScreen = this;
            ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100)
        },
        animate: function() {
            this.customAnim.currentFrame < this.customAnim.sequence.length ? this.customAnim.currentFrame++ : this.customAnim.currentFrame = 0;
            this.customAnim.gotoFrame(this.customAnim.currentFrame)
        },
        resetFrame: function(b) {
            this[b].ended = !1;
            this[b].frame = 0
        },
        runAnim: function(b) {
            this[b].frame =
                (this[b].frame + 1) % this[b].frames.length
        },
        drawer: function(b) {
            var c = b.ctx || ig.system.context,
                d = b.offX || 0,
                f = b.offY || 0,
                g = b.cent || !1,
                m = null == b.scX ? 1 : b.scX,
                x = null == b.scY ? 1 : b.scY,
                t = null == b.alp ? 1 : b.alp,
                y = null == b.rot ? 0 : b.rot,
                s = b.frameX || 1,
                A = b.frameY || 1,
                l = b.frame || 0,
                p = b.pic.width / s * (l % s),
                l = b.pic.height / A * Math.floor(l / s),
                r = b.pic.width / s,
                D = b.pic.height / A,
                s = b.pic.width / s * m,
                A = b.pic.height / A * x;
            if (0 < y || 0 > m || 0 > x) {
                var J = b.x,
                    G = b.y,
                    d = g ? -r / 2 + d : d || 0,
                    f = g ? -D / 2 + f : f || 0;
                0 < r && 0 < D && (c.save(), c.translate(J, G), c.scale(m, x), c.rotate(2 *
                    Math.PI / 360 * y), c.globalAlpha = t, c.drawImage(b.pic.data, p, l, r, D, d, f, r, D), c.restore())
            } else J = g ? b.x - s / 2 + d : b.x + d, G = g ? b.y - A / 2 + f : b.y + f, 0 < r && 0 < D && (c.globalAlpha = t, c.drawImage(b.pic.data, p, l, r, D, J, G, s, A), c.globalAlpha = 1)
        },
        textSet: function(b, c) {
            var d = ig.system.context;
            d.font = b + "px tex";
            d.fillStyle = c
        },
        textW: function(b) {
            return this.ctx.measureText(b).width
        },
        textDraw: function(b, c, d, f, g) {
            var m = ig.system.context;
            m.save();
            var x = m.measureText("M").width * g;
            m.translate(c, d + x / 2);
            m.scale(f, g);
            m.fillText(b, 0, 0);
            m.restore()
        },
        draw: function() {
            ig.system.context.fillStyle = "black";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this._drawStatus += (this.status - this._drawStatus) / 5;
            this.ctx = ig.system.context;
            this.bgIm.draw(0, 0);
            this.drawer({
                pic: this.logoIm,
                x: 183 + this.logoIm.width / 2,
                y: 118 + this.logoIm.height / 2,
                scX: this.sc,
                scY: this.sc,
                cent: !0
            });
            this.glow = "blueGiftLeft";
            this.runAnim(this.glow);
            this.drawer({
                x: 295,
                y: 252,
                scX: this[this.glow].sc.x,
                scY: this[this.glow].sc.x,
                frameX: this[this.glow].frameX,
                frameY: this[this.glow].frameY,
                frame: this[this.glow].frames[this[this.glow].frame],
                rot: this[this.glow].rot,
                cent: !0,
                pic: this[this.glow + "Im"]
            });
            this.glow = "redCrystalLeft";
            this.runAnim(this.glow);
            this.drawer({
                x: 372,
                y: 175,
                scX: this[this.glow].sc.x,
                scY: this[this.glow].sc.x,
                frameX: this[this.glow].frameX,
                frameY: this[this.glow].frameY,
                frame: this[this.glow].frames[this[this.glow].frame],
                rot: this[this.glow].rot,
                cent: !0,
                pic: this[this.glow + "Im"]
            });
            this.ctx.drawImage(this.barBaseIm.data, 0, 0, this.barBaseIm.width, this.barBaseIm.height, 267, 363,
                this.barBaseIm.width, this.barBaseIm.height);
            this.ctx.drawImage(this.barIm.data, 0, 0, this.barIm.width * this._drawStatus, this.barIm.height, 267, 363, this.barIm.width * this._drawStatus, this.barIm.height);
            5 > this.countDelay ? this.countDelay++ : (this.countDelay = 0, this.countDots = (this.countDots + 1) % 4);
            this.loadingText = _STRINGS.Splash.Loading;
            for (var b = 0; b < this.countDots; b++) this.loadingText += ".";
            this.textSet(10, "white");
            this.textDraw(Math.floor(100 * this._drawStatus) + "%", 330 - this.textW(Math.floor(100 * this._drawStatus) +
                "%") / 2, 368, 0.9, 0.9);
            this.textSet(12, "#95543E");
            this.textDraw(this.loadingText, 302, 349, 1, 1)
        }
    })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var c = 0; c < this.length; ++c)
            if (this[c] === b) return c;
        return -1
    });
    ig.Entity.prototype.tweens = [];
    ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
    ig.Entity.prototype.update = function() {
        this._preTweenUpdate();
        if (0 < this.tweens.length) {
            for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
            this.tweens =
                b
        }
    };
    ig.Entity.prototype.tween = function(b, c, d) {
        b = new ig.Tween(this, b, c, d);
        this.tweens.push(b);
        return b
    };
    ig.Entity.prototype.pauseTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
    };
    ig.Entity.prototype.resumeTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
    };
    ig.Entity.prototype.stopTweens = function(b) {
        for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b)
    };
    ig.Tween = function(b, c, d, f) {
        var g = {},
            m = {},
            x = {},
            t = 0,
            y = !1,
            s = !1,
            A = !1;
        this.duration = d;
        this.paused =
            this.complete = !1;
        this.easing = ig.Tween.Easing.Linear.EaseNone;
        this.onComplete = !1;
        this.loop = this.delay = 0;
        this.loopCount = -1;
        ig.merge(this, f);
        this.loopNum = this.loopCount;
        this.chain = function(b) {
            A = b
        };
        this.initEnd = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b])
        };
        this.initStart = function(b, c, d, f) {
            if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (f[b] = d[b]);
            else
                for (subprop in d[b]) f[b] || (f[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop,
                    c[b], d[b], f[b])
        };
        this.start = function() {
            this.paused = this.complete = !1;
            this.loopNum = this.loopCount;
            t = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
            s = !0;
            y = new ig.Timer;
            for (var d in c) this.initEnd(d, c, m);
            for (d in m) this.initStart(d, m, b, g), this.initDelta(d, x, b, m)
        };
        this.initDelta = function(b, c, d, f) {
            if ("object" !== typeof f[b]) c[b] = f[b] - d[b];
            else
                for (subprop in f[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], f[b])
        };
        this.propUpdate = function(b, c, d, f, g) {
            if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ?
                d[b] + f[b] * g : c[b];
            else
                for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], f[b], g)
        };
        this.propSet = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b])
        };
        this.update = function() {
            if (!s) return !1;
            if (this.delay) {
                if (y.delta() < this.delay) return;
                this.delay = 0;
                y.reset()
            }
            if (this.paused || this.complete) return !1;
            var c = (y.delta() + t) / this.duration,
                c = 1 < c ? 1 : c,
                d = this.easing(c);
            for (property in x) this.propUpdate(property, b, g, x, d);
            if (1 <= c) {
                if (0 == this.loopNum ||
                    !this.loop) {
                    this.complete = !0;
                    if (this.onComplete) this.onComplete();
                    A && A.start();
                    return !1
                }
                if (this.loop == ig.Tween.Loop.Revert) {
                    for (property in g) this.propSet(property, g, b);
                    t = 0;
                    y.reset(); - 1 != this.loopNum && this.loopNum--
                } else if (this.loop == ig.Tween.Loop.Reverse) {
                    c = {};
                    d = {};
                    ig.merge(c, m);
                    ig.merge(d, g);
                    ig.merge(g, c);
                    ig.merge(m, d);
                    for (property in m) this.initDelta(property, x, b, m);
                    t = 0;
                    y.reset(); - 1 != this.loopNum && this.loopNum--
                }
            }
        };
        this.pause = function() {
            this.paused = !0;
            t += y.delta()
        };
        this.resume = function() {
            this.paused = !1;
            y.reset()
        };
        this.stop = function(b) {
            b && (this.loop = this.complete = this.paused = !1, t += d, this.update());
            this.complete = !0
        }
    };
    ig.Tween.Loop = {
        Revert: 1,
        Reverse: 2
    };
    ig.Tween.Easing = {
        Linear: {},
        Quadratic: {},
        Cubic: {},
        Quartic: {},
        Quintic: {},
        Sinusoidal: {},
        Exponential: {},
        Circular: {},
        Elastic: {},
        Back: {},
        Bounce: {}
    };
    ig.Tween.Easing.Linear.EaseNone = function(b) {
        return b
    };
    ig.Tween.Easing.Quadratic.EaseIn = function(b) {
        return b * b
    };
    ig.Tween.Easing.Quadratic.EaseOut = function(b) {
        return -b * (b - 2)
    };
    ig.Tween.Easing.Quadratic.EaseInOut =
        function(b) {
            return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
        };
    ig.Tween.Easing.Cubic.EaseIn = function(b) {
        return b * b * b
    };
    ig.Tween.Easing.Cubic.EaseOut = function(b) {
        return --b * b * b + 1
    };
    ig.Tween.Easing.Cubic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
    };
    ig.Tween.Easing.Quartic.EaseIn = function(b) {
        return b * b * b * b
    };
    ig.Tween.Easing.Quartic.EaseOut = function(b) {
        return -(--b * b * b * b - 1)
    };
    ig.Tween.Easing.Quartic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
    };
    ig.Tween.Easing.Quintic.EaseIn =
        function(b) {
            return b * b * b * b * b
        };
    ig.Tween.Easing.Quintic.EaseOut = function(b) {
        return (b -= 1) * b * b * b * b + 1
    };
    ig.Tween.Easing.Quintic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
        return -Math.cos(b * Math.PI / 2) + 1
    };
    ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
        return Math.sin(b * Math.PI / 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1)
    };
    ig.Tween.Easing.Exponential.EaseIn = function(b) {
        return 0 == b ? 0 : Math.pow(2,
            10 * (b - 1))
    };
    ig.Tween.Easing.Exponential.EaseOut = function(b) {
        return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
    };
    ig.Tween.Easing.Exponential.EaseInOut = function(b) {
        return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
    };
    ig.Tween.Easing.Circular.EaseIn = function(b) {
        return -(Math.sqrt(1 - b * b) - 1)
    };
    ig.Tween.Easing.Circular.EaseOut = function(b) {
        return Math.sqrt(1 - --b * b)
    };
    ig.Tween.Easing.Circular.EaseInOut = function(b) {
        return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
    };
    ig.Tween.Easing.Elastic.EaseIn =
        function(b) {
            var c, d = 0.1,
                f = 0.4;
            if (0 == b) return 0;
            if (1 == b) return 1;
            f || (f = 0.3);
            !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
            return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f))
        };
    ig.Tween.Easing.Elastic.EaseOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return d * Math.pow(2, -10 * b) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Elastic.EaseInOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Back.EaseIn = function(b) {
        return b * b * (2.70158 * b - 1.70158)
    };
    ig.Tween.Easing.Back.EaseOut = function(b) {
        return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
    };
    ig.Tween.Easing.Back.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
    };
    ig.Tween.Easing.Bounce.EaseIn =
        function(b) {
            return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
        };
    ig.Tween.Easing.Bounce.EaseOut = function(b) {
        return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
    };
    ig.Tween.Easing.Bounce.EaseInOut = function(b) {
        return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
    }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
    ig.UrlParameters = ig.Class.extend({
        init: function() {
            switch (getQueryVariable("iphone")) {
                case "true":
                    ig.ua.iPhone = !0, console.log("iPhone mode")
            }
            var b = getQueryVariable("webview");
            if (b) switch (b) {
                case "true":
                    ig.ua.is_uiwebview = !0, console.log("webview mode")
            }
            if (b = getQueryVariable("debug")) switch (b) {
                case "true":
                    ig.game.showDebugMenu(), console.log("debug mode")
            }
            switch (getQueryVariable("view")) {
                case "stats":
                    ig.game.resetPlayerStats(), ig.game.endGame()
            }
            getQueryVariable("ad")
        }
    })
});
ig.baked = !0;
ig.module("plugins.jukebox").defines(function() {
    ig.Jukebox = ig.Class.extend({
        init: function() {
            this.player = new jukebox.Player({
                resources: ["media/audio/bgm.mp3", "media/audio/bgm.ogg"],
                autoplay: !1,
                spritemap: {
                    music: {
                        start: 0,
                        end: 18.44,
                        loop: !0
                    }
                },
                timeout: 1E3
            })
        }
    })
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
    ig.Director = ig.Class.extend({
        init: function(b, c) {
            this.game = b;
            this.levels = [];
            this.currentLevel = 0;
            this.append(c)
        },
        loadLevel: function(b) {
            for (key in dynamicClickableEntityDivs) ig.game.hideOverlay([key]);
            this.currentLevel = b;
            this.game.loadLevel(this.levels[b]);
            return !0
        },
        loadLevelWithoutEntities: function(b) {
            this.currentLevel = b;
            this.game.loadLevelWithoutEntities(this.levels[b]);
            return !0
        },
        append: function(b) {
            newLevels = [];
            return "object" ===
                typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
        },
        nextLevel: function() {
            return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
        },
        previousLevel: function() {
            return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
        },
        jumpTo: function(b) {
            var c = null;
            for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
            return 0 <= c ? this.loadLevel(c) : !1
        },
        firstLevel: function() {
            return this.loadLevel(0)
        },
        lastLevel: function() {
            return this.loadLevel(this.levels.length -
                1)
        },
        reloadLevel: function() {
            return this.loadLevel(this.currentLevel)
        }
    })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance
        },
        init: function() {
            ig.Storage.instance = this
        },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b))
            } catch (c) {
                return window.localStorage.getItem(b)
            }
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null
        },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(b, JSON.stringify(c))
            } catch (d) {
                console.log(d)
            }
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b)
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear()
        }
    })
});
ig.baked = !0;
ig.module("impact.entity-pool").requires("impact.game").defines(function() {
    ig.EntityPool = {
        pools: {},
        mixin: {
            staticInstantiate: function(b, c, d) {
                return ig.EntityPool.getFromPool(this.classId, b, c, d)
            },
            erase: function() {
                ig.EntityPool.putInPool(this)
            }
        },
        enableFor: function(b) {
            b.inject(this.mixin)
        },
        getFromPool: function(b, c, d, f) {
            b = this.pools[b];
            if (!b || !b.length) return null;
            b = b.pop();
            b.reset(c, d, f);
            return b
        },
        putInPool: function(b) {
            this.pools[b.classId] ? this.pools[b.classId].push(b) : this.pools[b.classId] = [b]
        },
        drainPool: function(b) {
            delete this.pools[b]
        },
        drainAllPools: function() {
            this.pools = {}
        }
    };
    ig.Game.inject({
        loadLevel: function(b) {
            ig.EntityPool.drainAllPools();
            this.parent(b)
        }
    })
});
this.START_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
    ig.BrandingSplash = ig.Class.extend({
        init: function() {
            ig.game.spawnEntity(EntityBranding, 0, 0)
        }
    });
    EntityBranding = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        splash: new ig.Image("branding/splash1.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            320 >= ig.system.width ? (this.size.x = 320, this.size.y = 200) : (this.size.x = 480, this.size.y = 240);
            this.pos.x = (ig.system.width - this.size.x) / 2;
            this.pos.y = -this.size.y - 200;
            this.endPosY = (ig.system.height - this.size.y) / 2;
            b = this.tween({
                pos: {
                    y: this.endPosY
                }
            }, 0.5, {
                easing: ig.Tween.Easing.Bounce.EaseIn
            });
            c = this.tween({}, 2.5, {
                onComplete: function() {
                    ig.game.director.loadLevel(ig.game.director.currentLevel)
                }
            });
            b.chain(c);
            b.start();
            this.currentAnim = this.anims.idle
        },
        createClickableLayer: function() {
            console.log("Build clickable layer");
            this.checkClickableLayer("branding-splash", _SETTINGS.Branding.Logo.Link, _SETTINGS.Branding.Logo.NewWindow)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k ==
                    b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var m = window.innerHeight / mobileHeight,
                    x = window.innerWidth /
                    mobileWidth;
                $("#" + g.id).css("left", this.pos.x * x);
                $("#" + g.id).css("top", this.pos.y * m);
                $("#" + g.id).css("width", this.size.x * x);
                $("#" + g.id).css("height", this.size.y * m)
            } else m = w / 2 - destW / 2, x = h / 2 - destH / 2, console.log(m, x), $("#" + g.id).css("left", m + this.pos.x * multiplier), $("#" + g.id).css("top", x + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" +
                d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        draw: function() {
            ig.system.context.fillStyle = "#ffffff";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.fillStyle =
                "#000";
            ig.system.context.font = "12px Arial";
            320 >= ig.system.width ? ig.system.context.fillText("powered by MarketJS.com", ig.system.width - 150, ig.system.height - 15) : ig.system.context.fillText("powered by MarketJS.com", ig.system.width - 160, ig.system.height - 15);
            this.parent();
            this.splash && ig.system.context.drawImage(this.splash.data, 0, 0, this.splash.data.width, this.splash.data.height, this.pos.x, this.pos.y, this.size.x, this.size.y)
        }
    })
});
this.END_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.drawer").defines(function() {
    Color = ig.Class.extend({
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        init: function(b, c, d, f) {
            this.r = b;
            this.g = c;
            this.b = d;
            this.a = f
        }
    });
    Drawer = ig.Class.extend({
        context: null,
        init: function() {
            this.context = ig.system.context
        },
        rect: function(b) {
            this.context.fillRect(b.x, b.y, b.w, b.h)
        },
        resetFrame: function(b) {
            this[b].ended = !1;
            this[b].frame = 0
        },
        runAnim: function(b) {
            this[b].ended = this[b].ended || !1;
            this[b].loop = this[b].loop || !0;
            this[b].frame = this[b].frame || 0;
            this[b].frameTimer = this[b].frameTimer || new ig.Timer;
            this[b].frameTime = this[b].frameTime || 0.03;
            !0 != this[b].ended && (!1 == this[b].loop && this[b].frame == this[b].frames.length - 1 ? (this[b].ended = !0, this.done && this.done(b)) : 1 < this[b].frames.length && this[b].frameTimer.delta() > this[b].frameTime && (this[b].frameTimer.reset(), this[b].frame = (this[b].frame + 1) % this[b].frames.length))
        },
        image: function(b) {
            this.ctx = b.ctx || ig.system.context;
            this.offX = b.offX || 0;
            this.offY = b.offY || 0;
            this.cent = b.cent || !1;
            this.scX = null == b.scX ? 1 : b.scX;
            this.scY = null == b.scY ? 1 : b.scY;
            this.alp = null ==
                b.alp ? 1 : b.alp;
            this.frameX = b.frameX || 1;
            this.frameY = b.frameY || 1;
            this.frame = b.frame || 0;
            this.sx = b.pic.width / this.frameX * (this.frame % this.frameX);
            this.sy = b.pic.height / this.frameY * Math.floor(this.frame / this.frameX);
            this.sw = b.pic.width / this.frameX;
            this.sh = b.pic.height / this.frameY;
            this.dw = b.pic.width / this.frameX * this.scX;
            this.dh = b.pic.height / this.frameY * this.scY;
            null == b.rot || 0 == b.rot ? (this.dx = this.cent ? b.x - this.dw / 2 + this.offX : b.x + this.offX, this.dy = this.cent ? b.y - this.dh / 2 + this.offY : b.y + this.offY, 0 < this.sw &&
                0 < this.sh && (this.ctx.globalAlpha = this.alp, this.ctx.drawImage(b.pic.data, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh), this.ctx.globalAlpha = 1)) : (this.dx = b.x, this.dy = b.y, this.offX = this.cent ? -this.sw / 2 + this.offX : this.offX || 0, this.offY = this.cent ? -this.sh / 2 + this.offY : this.offY || 0, 0 < this.sw && 0 < this.sh && (this.ctx.save(), this.ctx.translate(this.dx, this.dy), this.ctx.scale(this.scX, this.scY), this.ctx.rotate(2 * Math.PI / 360 * b.rot), this.ctx.globalAlpha = this.alp, this.ctx.drawImage(b.pic.data,
                this.sx, this.sy, this.sw, this.sh, this.offX, this.offY, this.sw, this.sh), this.ctx.restore()))
        },
        textSet: function(b) {
            this.ctx = b.ctx || ig.system.context;
            this.ctx.font = b.px + "px tex"
        },
        textDraw: function(b) {
            this.scX = b.scX || 1;
            this.scY = b.scY || b.scX || 1;
            this.ctx = b.ctx || ig.system.context;
            this.ctx.save();
            this.fontH = this.ctx.measureText("M").width * this.scY;
            this.ctx.translate(b.x, b.y + this.fontH);
            this.ctx.scale(this.scX, this.scY);
            this.ctx.fillText(b.text, 0, 0);
            this.ctx.restore()
        },
        textLibLeft: function(b) {
            this.textDraw({
                text: _STRINGS.Game[b].text,
                x: _STRINGS.Game[b].x,
                y: _STRINGS.Game[b].y,
                scX: _STRINGS.Game[b].scX,
                scY: _STRINGS.Game[b].scY
            })
        },
        textLibCenter: function(b) {
            this.textDraw({
                text: _STRINGS.Game[b].text,
                x: _STRINGS.Game[b].x - this.textW(_STRINGS.Game[b].text) * _STRINGS.Game[b].scX / 2,
                y: _STRINGS.Game[b].y,
                scX: _STRINGS.Game[b].scX,
                scY: _STRINGS.Game[b].scY
            })
        },
        textW: function(b) {
            return this.ctx.measureText(b).width
        },
        drawFullScreenOverlay: function(b) {
            this.context.fillStyle = "rgba(" + b.r + "," + b.g + "," + b.b + "," + b.a + ")";
            this.drawRect({
                x: 0,
                y: 0,
                w: ig.system.width,
                h: ig.system.height
            })
        }
    })
});
ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
    EntityBrandingLogoPlaceholder = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        init: function(b, c, d) {
            this.parent(b, c, d);
            if (d) switch (console.log("settings found ... using that div layer name"), b = d.div_layer_name, console.log("settings.centralize:", d.centralize), d.centralize) {
                case "true":
                    console.log("centralize true");
                    centralize = !0;
                    break;
                case "false":
                    console.log("centralize false");
                    centralize = !1;
                    break;
                default:
                    console.log("default ... centralize false"), centralize = !1
            } else b = "branding-logo", centralize = !1;
            if ("undefined" == typeof wm) {
                if (_SETTINGS.Branding.Logo.Enabled) try {
                    ig.game.spawnEntity(EntityBrandingLogo, this.pos.x, this.pos.y, {
                        div_layer_name: b,
                        centralize: centralize
                    })
                } catch (f) {
                    console.log(f)
                }
                this.kill()
            }
        }
    })
});
this.START_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
    EntityBrandingLogo = ig.Entity.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("branding/logo.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
        size: {
            x: 32,
            y: 32
        },
        zIndex: 10001,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (_SETTINGS.Branding.Logo.Enabled ? (this.size.x = _SETTINGS.Branding.Logo.Width, this.size.y = _SETTINGS.Branding.Logo.Height, d && d.centralize && (this.pos.x = ig.system.width /
                2 - this.size.x / 2, console.log("centralize true ... centering branded logo ..."))) : this.kill());
            this.anims.idle = new ig.Animation(this.logo, 0, [0], !0);
            this.currentAnim = this.anims.idle;
            d ? (console.log("branding settings found ... using that div layer name"), b = d.div_layer_name) : b = "branding-logo";
            _SETTINGS.Branding.Logo.LinkEnabled && (console.log("logo link enabled"), this.checkClickableLayer(b, _SETTINGS.Branding.Logo.Link, _SETTINGS.Branding.Logo.NewWindow));
            console.log("branding logo spawed ...")
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k ==
                    b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var m = window.innerHeight / mobileHeight,
                    x = window.innerWidth /
                    mobileWidth;
                $("#" + g.id).css("left", this.pos.x * x);
                $("#" + g.id).css("top", this.pos.y * m);
                $("#" + g.id).css("width", this.size.x * x);
                $("#" + g.id).css("height", this.size.y * m)
            } else m = w / 2 - destW / 2, x = h / 2 - destH / 2, console.log(m, x), $("#" + g.id).css("left", m + this.pos.x * multiplier), $("#" + g.id).css("top", x + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" +
                d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
this.END_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.plain").requires("impact.entity").defines(function() {
    EntityPlain = ig.Entity.extend({
        redraw: !1,
        gravityFactor: 0,
        clearColor: null,
        tweening: !1,
        which: 0,
        _ids: [],
        _oldIds: [],
        size: {
            x: 50,
            y: 50
        },
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.global.wm || (this.ctx = ig.system.context)
        },
        ready: function() {
            this.parent();
            this.main = ig.game.getEntitiesByType(EntityPlainGame)[0];
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        soundLooper: function(b) {
            null == this[this.sLoop[b].id + "sTimer"] && (this[this.sLoop[b].id +
                "sTimer"] = new ig.Timer, this[this.sLoop[b].id + "sTime"] = this.sLoop[b].duration, this.sounder(b));
            this[this.sLoop[b].id + "sTimer"].delta() > this[this.sLoop[b].id + "sTime"] && (this[b + "sTimer"].reset(), this.sounder(b))
        },
        soundLoopReset: function(b) {
            this[b + "sTimer"].reset()
        },
        sounder: function(b) {
            try {
                ig.soundHandler.playSound(ig.soundHandler.SOUNDID[b])
            } catch (c) {
                console.log(c)
            }
        },
        pointXY: function() {
            this.pos.x = this.pointer.pos.x;
            this.pos.y = this.pointer.pos.y;
            console.log(this.pos.x, this.pos.y)
        },
        resetFrame: function(b) {
            this[b].ended = !1;
            this[b].frame = 0
        },
        runAnim: function(b) {
            this[b].ended = this[b].ended || !1;
            this[b].loop = this[b].loop || !1;
            this[b].frame = this[b].frame || 0;
            this[b].frameTimer = this[b].frameTimer || new ig.Timer;
            this[b].frameTime = this[b].frameTime || 0.03;
            !0 != this[b].ended && (!1 == this[b].loop && this[b].frame == this[b].frames.length - 1 ? (this[b].ended = !0, this.done && this.done(b)) : 1 < this[b].frames.length && this[b].frameTimer.delta() > this[b].frameTime && (this[b].frameTimer.reset(), this[b].frame = (this[b].frame + 1) % this[b].frames.length))
        },
        tweener: function(b, c, d, f, g) {
            var m = {};
            m[b] = c;
            null == g && (g = 0);
            null == f && (f = "none");
            this.tween("this" == b ? c : m, d, {
                delay: g,
                targ: b,
                seq: f,
                onComplete: function() {
                    null != f && this.tweenF(f, b)
                }.bind(this),
                easing: ig.Tween.Easing.Quadratic.EaseOut
            }).start()
        },
        tweener2: function(b, c, d, f, g) {
            var m = {};
            m[b] = c;
            null == g && (g = 0);
            null == f && (f = "none");
            this.tween("this" == b ? c : m, d, {
                delay: g,
                targ: b,
                seq: f,
                onComplete: function() {
                    null != f && this.tweenF(f, b)
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone
            }).start()
        },
        lookAt: function(b, c) {
            return Math.atan2(c.y +
                c.size.y / 2 - (b.y + this.size.y / 2), c.x + c.size.x / 2 - (b.x + this.size.x / 2))
        },
        sizer: function(b, c, d, f, g, m, x, t) {
            this.size.x = b.width / c * this.base.oriSc + (x || 0);
            this.size.y = b.height / d * this.base.oriSc + (t || 0);
            !0 == m ? (this.pos.x = f - this.size.x / 2, this.pos.y = g - this.size.y / 2) : (this.pos.x = f, this.pos.y = g)
        },
        pauseT: function() {
            this.pauseTweens()
        },
        unpauseT: function() {
            this.resumeTweens()
        },
        unpause: function() {
            for (var b = 0; b < this.main.timers.length; b++) this.main.timers[b].unpause();
            this.unpauseT()
        },
        pause: function() {
            for (var b = 0; b < this.main.timers.length; b++) this.main.timers[b].pause();
            this.pauseT()
        },
        tinyTween: function(b, c, d) {
            if (b > c) return b -= d, b < c && (b = c), b;
            if (b < c) return b += d, b > c && (b = c), b;
            if (b == c) return b
        },
        clearBg: function() {
            ig.system.bgcontext.clearRect(0, 0, ig.system.width, ig.system.height);
            ig.game.redrawEntities()
        },
        timitizer: function(b) {
            var c = {};
            c.secs = Math.floor(b);
            c.Millis = Math.floor(100 * b);
            c.ms = String(c.Millis % 100);
            c.s = String(c.secs % 60);
            c.m = String(Math.floor(c.secs / 60));
            c.s = 0 == c.s.length ? "00" : 1 == c.s.length ? "0" + c.s : Number(c.s) % 60;
            0 == c.m.length ? c.m = "00" : 1 == c.m.length && (c.m = "0" +
                c.m);
            0 == c.ms.length ? c.ms = "00" : 1 == c.ms.length && (c.ms = "0" + c.ms);
            c.tx = c.m + ":" + c.s + "." + c.ms;
            return c
        },
        centDraw: function(b, c, d, f, g) {
            this.drawer("game", b, 1, 1, 0, c, d, f, f, !0, 1, g)
        },
        drawer: function(b) {
            var c = b.ctx || ig.system.context,
                d = b.offX || 0,
                f = b.offY || 0,
                g = b.cent || !1,
                m = null == b.scX ? 1 : b.scX,
                x = null == b.scY ? 1 : b.scY,
                t = null == b.alp ? 1 : b.alp,
                y = null == b.rot ? 0 : b.rot,
                s = b.frameX || 1,
                A = b.frameY || 1,
                l = b.frame || 0,
                p = b.pic.width / s * (l % s),
                l = b.pic.height / A * Math.floor(l / s),
                r = b.pic.width / s,
                D = b.pic.height / A,
                s = b.pic.width / s * m,
                A = b.pic.height /
                A * x;
            if (0 < y || 0 > m || 0 > x) {
                var J = b.x,
                    G = b.y,
                    d = g ? -r / 2 + d : d || 0,
                    f = g ? -D / 2 + f : f || 0;
                0 < r && 0 < D && (c.save(), c.translate(J, G), c.scale(m, x), c.rotate(2 * Math.PI / 360 * y), c.globalAlpha = t, c.drawImage(b.pic.data, p, l, r, D, d, f, r, D), c.restore())
            } else J = g ? b.x - s / 2 + d : b.x + d, G = g ? b.y - A / 2 + f : b.y + f, 0 < r && 0 < D && (c.globalAlpha = t, c.drawImage(b.pic.data, p, l, r, D, J, G, s, A), c.globalAlpha = 1)
        },
        textSet: function(b, c) {
            var d = ig.system.context;
            d.font = b + "px tex";
            d.fillStyle = c
        },
        textLib: function(b, c, d) {
            d = d || 0;
            this.textDraw("game", _STRINGS.Game[b][3], _STRINGS.Game[b][4],
                _STRINGS.Game[b][0], (c || 0) + _STRINGS.Game[b][1] - this.ctx.measureText(_STRINGS.Game[b][0]).width / 2 * _STRINGS.Game[b][3], _STRINGS.Game[b][2] + d)
        },
        textLibLeft: function(b, c, d) {
            this.textDraw("game", _STRINGS.Game[b][3], _STRINGS.Game[b][4], _STRINGS.Game[b][0], (c || 0) + _STRINGS.Game[b][1], _STRINGS.Game[b][2] + (d || 0))
        },
        textW: function(b) {
            return this.ctx.measureText(b).width
        },
        textDraw: function(b, c, d, f, g) {
            var m = ig.system.context;
            m.save();
            var x = m.measureText("M").width * g;
            m.translate(c, d + x / 2);
            m.scale(f, g);
            m.fillText(b, -this.textW(b) / 2, 0);
            m.restore()
        },
        textLeft: function(b, c, d, f, g) {
            var m = ig.system.context;
            m.save();
            var x = m.measureText("M").width * g;
            m.translate(c, d + x / 2);
            m.scale(f, g);
            m.fillText(b, 0, 0);
            m.restore()
        },
        shuffleArray: function(b) {
            for (var c = b.length, d, f; 0 < c;) f = Math.floor(Math.random() * c), c--, d = b[c], b[c] = b[f], b[f] = d;
            return b
        },
        getScore: function(b) {
            if (!this.checkNull(ig.game.storage) && this.supports_local_storage()) switch (b) {
                case "score":
                    ig.game.storage.isSet(ig.game.scoreKey + ig.game.lvl) && void 0 != ig.game.storage.get(ig.game.scoreKey +
                        ig.game.lvl) && (ig.game.rank = ig.game.storage.get(ig.game.scoreKey + ig.game.lvl));
                    break;
                case "tut":
                    return ig.game.storage.isSet(ig.game.tutKey) && void 0 != ig.game.storage.get(ig.game.tutKey) ? ig.game.storage.get(ig.game.tutKey) : !1
            } else return !1
        },
        setScore: function(b, c) {
            if (!this.checkNull(ig.game.storage) && this.supports_local_storage()) switch (b) {
                case "score":
                    ig.game.storage.set(ig.game.gameKey, {
                        star: ig.game.star,
                        lvl: ig.game.lvl,
                        mission: ig.game.mission,
                        map: ig.game.map,
                        player: ig.game.player,
                        nextLvl: ig.game.nextLvl,
                        seq: ig.game.seq
                    });
                    break;
                case "score2":
                    ig.game.storage.set(ig.game.gameKey, {
                        star: ig.game.star,
                        lvl: ig.game.lvl,
                        mission: ig.game.mission,
                        map: ig.game.map,
                        player: ig.game.player,
                        nextLvl: ig.game.nextLvl,
                        seq: ig.game.seq
                    });
                    break;
                case "rank":
                    if (ig.game.storage.isSet(ig.game.scoreKey + ig.game.lvl) && void 0 != ig.game.storage.get(ig.game.scoreKey + ig.game.lvl)) {
                        for (var d = ig.game.storage.get(ig.game.scoreKey + ig.game.lvl), f = 0, g = 0; g < d.length; g++) void 0 != d[g] && d[g].score > c && f++;
                        if (0 < f || 4 > d.length) d.push({
                            score: c
                        }), d.sort(function(b,
                            c) {
                            return b.score < c.score ? -1 : b.score > c.score ? 1 : 0
                        }), 3 < d.length && d.splice(3, 1), ig.game.storage.set(ig.game.scoreKey + ig.game.lvl, d)
                    } else d = [], d.push({
                        score: c
                    }), ig.game.storage.set(ig.game.scoreKey + ig.game.lvl, d);
                    break;
                case "tutOn":
                    ig.game.storage.isSet(ig.game.tutKey) && ig.game.storage.get(ig.game.tutKey);
                    ig.game.storage.set(ig.game.tutKey, !0);
                    break;
                case "tutOff":
                    ig.game.storage.isSet(ig.game.tutKey) && void 0 != ig.game.storage.get(ig.game.tutKey) ? ig.game.storage.set(ig.game.tutKey, !1) : ig.game.storage.set(ig.game.tutKey, !0)
            }
        },
        checkNull: function(b) {
            return null == b || void 0 == b ? !0 : !1
        },
        supports_local_storage: function() {
            try {
                return localStorage.setItem("test", "test"), localStorage.removeItem("test"), "localStorage" in window && null !== window.localStorage
            } catch (b) {
                return !1
            }
        },
        clicked: function() {
            this.click = !0;
            this.release = !1
        },
        released: function() {
            this.click = !1;
            this.release = !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.button-more-games").requires("game.entities.plain").defines(function() {
    EntityButtonMoreGames = EntityPlain.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("media/graphics/sprites/gui/more-games.png", 56, 50),
        logoIm: new ig.Image("media/graphics/sprites/gui/more-games.png"),
        size: {
            x: 56,
            y: 50
        },
        zIndex: 750,
        sc: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (_SETTINGS.MoreGames.Enabled ? (d.div_layer_name ? (console.log("settings found ... using that div layer name"),
                b = d.div_layer_name) : b = "more-games", console.log("div_layer_name:", b), this.checkClickableLayer(b, _SETTINGS.MoreGames.Link, _SETTINGS.MoreGames.NewWindow)) : this.kill())
        },
        draw: function() {
            this.drawer({
                pic: this.logoIm,
                x: this.pos.x + this.logoIm.width / 2,
                y: this.pos.y + this.logoIm.height / 2,
                scX: this.sc,
                scY: this.sc,
                cent: !0
            })
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        ready: function() {
            this.tweenF("initExpand")
        },
        tweenF: function(b) {
            switch (b) {
                case "initExpand":
                    this.tweener("this", {}, 0.2, "initExpand2");
                    break;
                case "initExpand2":
                    this.sc =
                        1.5;
                    this.tweener("this", {
                        sc: 0.8
                    }, 0.2, "expand");
                    break;
                case "shrink":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.5, "expand");
                    break;
                case "expand":
                    this.tweener("this", {
                        sc: 1
                    }, 0.5, "shrink")
            }
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return console.log("clickable layer already exists ..."), !0;
            console.log("doesnt exist yet ...");
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href",
                c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var m = window.innerHeight / mobileHeight,
                    x = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * x);
                $("#" + g.id).css("top", this.pos.y * m);
                $("#" + g.id).css("width", this.size.x * x);
                $("#" + g.id).css("height", this.size.y * m)
            } else m =
                document.getElementById("game").offsetLeft, x = document.getElementById("game").offsetTop, $("#" + g.id).css("left", m + this.pos.x * multiplier), $("#" + g.id).css("top", x + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
    EntityOpeningShield = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        move: 0,
        mIconAnim: 0,
        shieldAnim: 0,
        titleAnim: 0,
        shieldImage: new ig.Image("media/graphics/opening/shield.png"),
        mIconImage: new ig.Image("media/graphics/opening/m_icon.png"),
        titleImage: new ig.Image("media/graphics/opening/title.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            if (!ig.wm)
                if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                    this.initTimer = new ig.Timer(0.1);
                    try {
                        ig.soundHandler.playSound(ig.soundHandler.SOUNDID.openingSound)
                    } catch (b) {
                        console.log(b)
                    }
                } else ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
        },
        update: function() {
            this.parent();
            this.updateOriginalShieldOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawOriginalShieldOpening())
        },
        updateOriginalShieldOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() &&
                (this.initTimer = null, this.sheildTimer = new ig.Timer(0.05));
            this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++, this.sheildTimer.reset()) : (this.sheildTimer = null, this.moveTimer = new ig.Timer(0.0010), this.mIconTimer = new ig.Timer(0.05), this.titleTimer = new ig.Timer(0.15)));
            this.moveTimer && 0 < this.moveTimer.delta() && (this.move += 0.3, this.moveTimer.reset());
            this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++, this.moveTimer.reset()) : this.mIconTimer =
                null);
            this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++, this.titleTimer.reset()) : (this.titleTimer = null, this.nextLevelTimer = new ig.Timer(1)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawOriginalShieldOpening: function() {
            if (this.moveTimer) {
                var b = ig.system.context;
                b.save();
                var c = ig.system.width / 2,
                    d = ig.system.height / 2;
                b.translate(c, d);
                b.rotate(this.move * Math.PI / 180);
                b.beginPath();
                b.moveTo(0, 0);
                for (var f = 0, g = 1; 48 >= g; g += 1) b.lineTo(0 + 800 * Math.cos(2 * g * Math.PI / 48), 0 + 800 * Math.sin(2 * g * Math.PI / 48)), f++, 2 == f && (f = 0, b.lineTo(0, 0));
                b.translate(-c, -d);
                c = b.createRadialGradient(c, d, 100, c, d, 250);
                c.addColorStop(0, "rgba(255,255,255,0.1)");
                c.addColorStop(1, "rgba(0,0,0,0)");
                b.fillStyle = c;
                b.fill();
                b.restore()
            }
            this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768);
            this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim,
                166, 160), this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76));
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
    EntityOpeningKitty = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        kittyAnim: -1,
        kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
        kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            if (!ig.wm)
                if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                    this.initTimer = new ig.Timer(0.1);
                    try {
                        ig.soundHandler.playSound(ig.soundHandler.SOUNDID.kittyopeningSound)
                    } catch (b) {
                        console.log(b)
                    }
                } else ig.game.director.nextLevel(),
                    ig.system.context.globalAlpha = 1, this.kill()
        },
        update: function() {
            this.parent();
            this.updateKittyOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawKittyOpening())
        },
        updateKittyOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.kittyTimer = new ig.Timer(0.15));
            this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) :
                (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(2)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawKittyOpening: function() {
            var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
            b.addColorStop(0, "#ffed94");
            b.addColorStop(1, "#ffcd85");
            ig.system.context.fillStyle = b;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            0 <= this.kittyAnim && (this.kittyImage.drawTile(ig.system.width /
                2 - this.kittyImage.width / 8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325), this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37));
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
    EntityPointer = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        isClicking: !1,
        isHovering: !1,
        firstClick: !1,
        isReleased: !1,
        hoveringItem: null,
        objectArray: [],
        ignorePause: !0,
        zIndex: 5E3,
        check: function(b) {
            this.objectArray.push(b)
        },
        clickObject: function(b) {
            this.isClicking && !this.firstClick && "function" == typeof b.clicked && (b.clicked(), this.firstClick = !0);
            this.firstClick && !this.isReleased && "function" == typeof b.clicking &&
                b.clicking();
            this.firstClick && this.isReleased && "function" == typeof b.released && (b.released(), this.firstClick = !1)
        },
        posXY: function(b) {
            b.pos.x = this.pos.x;
            b.pos.y = this.pos.y;
            console.log(this.pos.x, this.pos.y)
        },
        update: function() {
            if (ig.ua.mobile) {
                var b = window.innerHeight / mobileHeight;
                this.pos.x = ig.input.mouse.x / (window.innerWidth / mobileWidth) - this.size.x / 2 + ig.game.screen.x;
                this.pos.y = ig.input.mouse.y / b - this.size.y / 2
            } else this.pos.x = ig.input.mouse.x - this.size.x / 2, this.pos.y = ig.input.mouse.y - this.size.y / 2;
            var b = null,
                c = -1;
            for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex, b = this.objectArray[a]);
            null != b ? ("close" == b.name && console.log(b), null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && this.hoveringItem != b && this.hoveringItem.idle(), this.hoveringItem = b, this.clickObject(b), this.objectArray = []) : null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && (this.hoveringItem.idle(), this.hoveringItem = null);
            this.isClicking = ig.input.pressed("click");
            this.isReleased = ig.input.released("click")
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
    EntityPointerSelector = EntityPointer.extend({
        zIndex: 1E3,
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        size: {
            x: 20,
            y: 20
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
    EntitySelect = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        canSelect: !1,
        canSelectTimerDuration: 0.35,
        zIndex: 99999,
        isHovering: !1,
        isSelected: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b,
            c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("width", this.size.x * multiplier);
            $("#" + g.id).css("height", this.size.y * multiplier);
            $("#" + g.id).css("position", "absolute");
            var m = w / 2 - destW / 2,
                x = h /
                2 - destH / 2;
            w == mobileWidth ? ($("#" + g.id).css("left", this.pos.x), $("#" + g.id).css("top", this.pos.y)) : ($("#" + g.id).css("left", m + this.pos.x * multiplier), $("#" + g.id).css("top", x + this.pos.y * multiplier));
            f ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = $("#" + g.id).width();
            dynamicClickableEntityDivs[b].height =
                $("#" + g.id).height();
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hovered: function() {
            this.isHovering = !0;
            this.dehoverOthers()
        },
        dehoverOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1)
        },
        deselectOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1)
        },
        update: function() {
            this.parent();
            this.canSelectTimer && 0 <
                this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() {
    LevelOpening = {
        entities: [{
            type: "EntityOpeningKitty",
            x: 520,
            y: 212
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.entities.plain-gui").requires("game.entities.plain").defines(function() {
    EntityPlainGui = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 1200,
        readySc: 0,
        goSc: 0,
        size: {
            x: 50,
            y: 50
        },
        gameOver: !1,
        gamePaused: !1,
        youOffY: 0,
        treeIm: new ig.Image("media/graphics/sprites/game/trees.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.oriStat())
        },
        oriStat: function() {},
        tweenF: function(b) {
            switch (b) {
                case "youUp":
                    this.tweener("this", {
                        youOffY: -2
                    }, 0.4, "youDown");
                    break;
                case "youDown":
                    this.tweener("this", {
                        youOffY: 2
                    }, 0.3, "youUp");
                    break;
                case "ready":
                    this.sounder("ready");
                    this.readySc = 2;
                    this.tweener("this", {
                        readySc: 1
                    }, 0.1, "ready2");
                    break;
                case "ready2":
                    this.tweener("this", {
                        readySc: 1.2
                    }, 0.1, "ready3");
                    break;
                case "ready3":
                    this.tweener("this", {
                        readySc: 1
                    }, 0.1, "ready4");
                    break;
                case "ready4":
                    this.tweener("this", {
                        readySc: 0
                    }, 0.1, "go", 0.5);
                    break;
                case "go":
                    this.sounder("go");
                    this.goSc = 2;
                    this.tweener("this", {
                        goSc: 1
                    }, 0.1, "go2");
                    break;
                case "go2":
                    this.tweener("this", {
                            goSc: 1.2
                        },
                        0.1, "go3");
                    break;
                case "go3":
                    this.tweener("this", {
                        goSc: 1
                    }, 0.1, "go4");
                    break;
                case "go4":
                    this.tweener("this", {
                        goSc: 0
                    }, 0.1, "go5", 0.5);
                    break;
                case "go5":
                    this.main.gameStarted = !0, ig.game.gamePaused = !1, ig.game.getEntitiesByType(EntityPlainPower)[0].reGen(), ig.game.getEntitiesByType(EntityPlainPower)[1].reGen(), this.stopTweens()
            }
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            for (var b = 0; b < ig.game.getEntitiesByType(EntityPlainTank).length; b++) "blue" ==
                ig.game.getEntitiesByType(EntityPlainTank)[b].name && (this.tank = ig.game.getEntitiesByType(EntityPlainTank)[b]);
            this.tweenF("youUp")
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.treeIm.draw(-23, 5), this.textSet(85, "white"), this.textDraw(_STRINGS.Game.ready, ig.system.width / 2, ig.system.height / 2 - 20, this.readySc, this.readySc), this.textDraw(_STRINGS.Game.go, ig.system.width / 2, ig.system.height / 2 - 20, this.goSc, this.goSc), !1 == this.main.gameStarted && !0 == ig.game.runAI && (this.textSet(16, "#7B3D28"), this.textDraw(_STRINGS.Game.you,
                this.tank.pos.x + this.tank.size.x / 2, this.tank.pos.y - 20 + this.youOffY, 1, 1), this.textDraw("\u25be", this.tank.pos.x + this.tank.size.x / 2, this.tank.pos.y - 10 + this.youOffY, 1, 1)))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-tut-but").requires("game.entities.plain").defines(function() {
    EntityPlainTutBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2020,
        sc: 1,
        mouseSc: 0.95,
        runTask: !1,
        tweening: !1,
        oriPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name = d.name, this.size.x = this.butIm.width, this.size.y = this.butIm.height, this.oriPos.x = b, this.oriPos.y = c, this.hide())
        },
        clicked: function() {
            !1 != this.main.gamePaused && !0 != this.tweening && (this.sc = 0.8, this.buttonTask(),
                this.sounder("click"))
        },
        hide: function() {
            this.pos.x = -200;
            this.pos.y = -200
        },
        released: function() {
            !0 != this.tweening && (this.sc = 1)
        },
        show: function() {
            this.pos.x = this.oriPos.x;
            this.pos.y = this.oriPos.y;
            this.sc = 1
        },
        tweenF: function(b) {
            switch (b) {
                case "showButton":
                    this.tweening = !0;
                    this.sc = 0;
                    this.show();
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "showButton2");
                    break;
                case "showButton2":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.1, "showButton3");
                    break;
                case "showButton3":
                    this.tweener("this", {
                        sc: 1.05
                    }, 0.1, "showButton4");
                    break;
                case "showButton4":
                    this.tweener("this", {
                        sc: 1
                    }, 0.1, "showButton5");
                    break;
                case "showButton5":
                    this.tweening = !1;
                    break;
                case "runButton":
                    this.tweening = !0;
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "runButton2");
                    break;
                case "runButton2":
                    this.tweener("this", {
                        sc: 0
                    }, 0.1, "runButton3");
                    break;
                case "runButton3":
                    this.tweener("this", {}, 0.5, "runButton4");
                    break;
                case "runButton4":
                    this.kill()
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), !0 != this.tweening && (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer =
                ig.game.getEntitiesByType(EntityPointer)[0];
            this.tutMenu = ig.game.getEntitiesByType(EntityPlainTut)[0]
        },
        draw: function() {
            this.parent();
            ig.global.wm || this.drawer({
                pic: this.butIm,
                x: this.pos.x + this.butIm.width / 2,
                y: this.pos.y + this.butIm.height / 2,
                scX: this.oriSc * this.sc * this.mouseSc,
                scY: this.oriSc * this.sc * this.mouseSc,
                cent: !0
            })
        }
    });
    EntityTutNext = EntityPlainTutBut.extend({
        oriSc: 0.9,
        butIm: new ig.Image("media/graphics/sprites/gui/next-tut.png"),
        nextIm: new ig.Image("media/graphics/sprites/gui/next-tut.png"),
        startIm: new ig.Image("media/graphics/sprites/gui/start.png"),
        buttonTask: function() {
            !0 != this.tweening && (4 == this.tutMenu.step ? (this.tweening = !0, this.tutMenu.tweenF("stickerOff")) : (this.tutMenu.step++, this.tutMenu.tweenF("showBoardText"), 2 == this.tutMenu.step && ig.game.getEntitiesByType(EntityTutPrev)[0].show(), 4 == this.tutMenu.step && (!0 == ig.game.tutBut ? (ig.game.getEntitiesByType(EntityTutTwo)[0].show(), ig.game.getEntitiesByType(EntityTutOne)[0].show(), this.hide()) : (this.sc = this.oriSc = 1, this.pos.x = ig.system.width / 2 - this.butIm.width / 2, this.pos.y = 350))))
        },
        update: function() {
            ig.global.wm ||
                (this.parent(), this.butIm = 4 == this.tutMenu.step ? this.startIm : this.nextIm)
        }
    });
    EntityTutPrev = EntityPlainTutBut.extend({
        oriSc: 0.9,
        butIm: new ig.Image("media/graphics/sprites/gui/prev-tut.png"),
        buttonTask: function() {
            1 >= this.tutMenu.step || (this.tutMenu.step--, this.tutMenu.tweenF("showBoardText"), 3 == this.tutMenu.step && (ig.game.getEntitiesByType(EntityTutNext)[0].show(), !0 == ig.game.tutBut && (ig.game.getEntitiesByType(EntityTutTwo)[0].hide(), ig.game.getEntitiesByType(EntityTutOne)[0].hide())), 1 == this.tutMenu.step &&
                this.hide())
        }
    });
    EntityTutClose = EntityPlainTutBut.extend({
        oriSc: 0.65,
        butIm: new ig.Image("media/graphics/sprites/gui/close.png"),
        buttonTask: function() {
            !0 != this.tweening && (this.tweening = !0, this.tutMenu.tweenF("stickerOff"))
        }
    });
    EntityTutOne = EntityPlainTutBut.extend({
        oriSc: 0.65,
        butIm: new ig.Image("media/graphics/sprites/home/one.png"),
        buttonTask: function() {
            ig.game.runAI = !0;
            ig.game.tutShowedAI = !0;
            !0 != this.tweening && (this.tweening = !0, this.tutMenu.tweenF("stickerOff"))
        }
    });
    EntityTutTwo = EntityPlainTutBut.extend({
        oriSc: 0.65,
        butIm: new ig.Image("media/graphics/sprites/home/two.png"),
        buttonTask: function() {
            ig.game.runAI = !1;
            ig.game.tutShowedPlayer = !0;
            !0 != this.tweening && (this.tweening = !0, this.tutMenu.tweenF("stickerOff"))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-tut").requires("game.entities.plain", "game.entities.plain-tut-but").defines(function() {
    EntityPlainTut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2015,
        size: {
            x: 50,
            y: 50
        },
        buttons: [],
        alp: 0,
        step: 1,
        boardIm: new ig.Image("media/graphics/sprites/gui/tut-board.png"),
        board: {
            x: 320,
            y: 233,
            scX: 0.8,
            scY: 1.2,
            offX: 0,
            offY: -500
        },
        stickerIm: new ig.Image("media/graphics/sprites/gui/pause-sticker.png"),
        sticker: {
            x: 0,
            y: 138,
            scX: 0,
            scY: 0,
            offX: 0,
            offY: 0
        },
        tweening: !1,
        allSc: 0,
        goalRed: {
            show: !0,
            scX: [-1, 1, 1, 1],
            scY: 1,
            frame: 0,
            frames: [2, 1, 2, 0],
            x: -50,
            y: -30
        },
        goalBlue: {
            show: !0,
            scX: [-1, 1, 1, 1],
            scY: 1,
            frame: 2,
            frames: [2, 1, 2, 0],
            x: 50,
            y: -30
        },
        redBullet: {
            show: !0,
            rockSc: 1,
            x: 0,
            y: -8,
            facing: "Right",
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        redGlow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 8,
                y: 0
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        blueBullet: {
            show: !0,
            rockSc: 1,
            x: 0,
            y: -8,
            facing: "Left",
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        blueGlow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 8,
                y: 0
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        redBut: {
            sc: 1
        },
        blueBut: {
            sc: 1
        },
        redButIm: new ig.Image("media/graphics/sprites/gui/button-red.png"),
        blueButIm: new ig.Image("media/graphics/sprites/gui/button-blue.png"),
        redTank: {
            scX: [-1, 1, 1, 1],
            scY: 1,
            frame: 0,
            frames: [2, 1, 2, 0],
            x: -50,
            y: -30
        },
        blueTank: {
            scX: [-1, 1, 1, 1],
            scY: 1,
            frame: 0,
            frames: [2, 1, 2, 0],
            x: -50,
            y: -30
        },
        blueTankIm: new ig.Image("media/graphics/sprites/game/blue-normal.png"),
        redTankIm: new ig.Image("media/graphics/sprites/game/red-normal.png"),
        powers: ["shield", "speed", "heart", "star", "bullet"],
        item: {
            sc: 1,
            posX: [-200, -200, -200, 26, 26],
            posY: [-80, 0, 80, -40, 40],
            off: {
                x: 0,
                y: 0
            },
            y: [-3, -3, -3, -10, -8]
        },
        shadow: {
            sc: 1,
            y: [8, 8, 8, 8, 3]
        },
        bulletTanks: {
            scX: 1,
            scY: 1,
            x: [-150, 0, 150],
            rockY: [-20, -20, -20]
        },
        rockIm: new ig.Image("media/graphics/sprites/game/rocks_6x1.png"),
        bullet0: {
            show: !0,
            rockSc: 1,
            x: 0,
            y: -20,
            facing: "Up",
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        bullet0Glow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 8,
                y: 0
            },
            frames: [0, 1,
                2, 3, 4, 5, 6, 7, 8, 9
            ],
            frameX: 4,
            frameY: 3
        },
        tankIm0: new ig.Image("media/graphics/sprites/game/red-normal.png"),
        bullet0UpIm: new ig.Image("media/graphics/sprites/game/normal/bullet-up_10x1.png"),
        bullet0RightIm: new ig.Image("media/graphics/sprites/game/normal/bullet-side_10x1.png"),
        bullet0GlowIm: new ig.Image("media/graphics/sprites/game/normal/bullet-glow_4x3.png"),
        bullet1: {
            show: !0,
            rockSc: 1,
            x: 0,
            y: -20,
            facing: "Up",
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        bullet1Glow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 1,
                y: -3
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        bullet1R: {
            show: !1,
            rockSc: 1,
            x: 0,
            y: -20,
            facing: "Right",
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        bullet1RGlow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 1,
                y: -3
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        tankIm1: new ig.Image("media/graphics/sprites/game/red-crystal.png"),
        bullet1UpIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-up_10x1.png"),
        bullet1LeftIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        bullet1RightIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        bullet1GlowIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-glow_5x2.png"),
        bullet2: {
            show: !0,
            rockSc: 1,
            x: 0,
            y: -20,
            facing: "Up",
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        bullet2Up: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 15
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        bullet2Glow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 1,
                y: -3
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        bullet2RGlow: {
            show: !1,
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 1,
                y: -3
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        tankIm2: new ig.Image("media/graphics/sprites/game/red-gift.png"),
        bullet2UpIm: new ig.Image("media/graphics/sprites/game/gift/red-gift-up_10x1.png"),
        bullet2GlowIm: new ig.Image("media/graphics/sprites/game/gift/gift-glow_4x3.png"),
        shieldIm: new ig.Image("media/graphics/sprites/power/shield.png"),
        shieldShadowIm: new ig.Image("media/graphics/sprites/power/shield-shadow.png"),
        speedIm: new ig.Image("media/graphics/sprites/power/speed.png"),
        speedShadowIm: new ig.Image("media/graphics/sprites/power/speed-shadow.png"),
        starIm: new ig.Image("media/graphics/sprites/power/star.png"),
        starShadowIm: new ig.Image("media/graphics/sprites/power/star-base.png"),
        bulletIm: new ig.Image("media/graphics/sprites/power/gift.png"),
        bulletShadowIm: new ig.Image("media/graphics/sprites/power/box-shadow.png"),
        heartIm: new ig.Image("media/graphics/sprites/power/heart.png"),
        heartShadowIm: new ig.Image("media/graphics/sprites/power/heart-shadow.png"),
        init: function(b,
            c, d) {
            ig.global.wm || (this.parent(b, c, d), this.oriStat())
        },
        oriStat: function() {
            ig.game.spawnEntity(EntityTutPrev, 52, 204, {
                main: this
            });
            ig.game.spawnEntity(EntityTutNext, 530, 204, {
                main: this
            });
            ig.game.spawnEntity(EntityTutClose, ig.system.width - 50, 0, {
                main: this
            });
            !0 == ig.game.tutBut && (ig.game.spawnEntity(EntityTutTwo, 336, 334, {
                main: this
            }), ig.game.spawnEntity(EntityTutOne, 236, 334, {
                main: this
            }))
        },
        done: function(b) {
            switch (b) {
                case "redGlow":
                    this.resetFrame("redGlow");
                    this.redGlow.show = !1;
                    this.tweener("redGlow", {}, 0.3,
                        "delayRedReset");
                    break;
                case "blueGlow":
                    this.resetFrame("blueGlow");
                    this.blueGlow.show = !1;
                    this.tweener("blueGlow", {}, 0.3, "delayBlueReset");
                    break;
                case "bullet0Glow":
                    this.resetFrame("bullet0Glow");
                    this.bullet0Glow.show = !1;
                    this.bullet0.x = 0;
                    this.bullet0.y = -20;
                    this.bullet0.facing = "Up";
                    this.bullet0.show = !0;
                    this.tweenF("shoot0-0");
                    break;
                case "bullet1Glow":
                    this.resetFrame("bullet1Glow");
                    this.bullet1Glow.show = !1;
                    this.bullet1.x = 0;
                    this.bullet1.y = -20;
                    this.bullet1.facing = "Up";
                    this.bullet1.show = !0;
                    this.bullet1.frameX =
                        10;
                    this.bullet1.frameY = 1;
                    this.tweenF("shoot1-0");
                    this.bullet1R.show = !1;
                    this.bullet1R.x = 0;
                    break;
                case "bullet1RGlow":
                    this.resetFrame("bullet1RGlow");
                    this.bullet1RGlow.show = !1;
                    break;
                case "bullet2Glow":
                    this.resetFrame("bullet2Glow");
                    this.bullet2Glow.show = !1;
                    this.bullet2.x = 0;
                    this.bullet2.y = -20;
                    this.bullet2.facing = "Up";
                    this.bullet2.show = !0;
                    this.tweenF("shoot2-0");
                    this.bulletTanks.rockY[2] = -20;
                    break;
                case "bullet2RGlow":
                    this.resetFrame("bullet2RGlow"), this.bullet2RGlow.show = !1
            }
        },
        tweenF: function(b, c) {
            switch (b) {
                case "delayRedReset":
                    this.redBullet.x =
                        0;
                    this.redBullet.show = !0;
                    this.goalRed.show = !0;
                    this.tweenF("shootBulletsRed");
                    break;
                case "delayBlueReset":
                    this.blueBullet.x = 0;
                    this.blueBullet.show = !0;
                    this.goalBlue.show = !0;
                    this.tweenF("shootBulletsBlue");
                    break;
                case "shootBulletsRed":
                    this.tweener2("redBullet", {
                        x: 300
                    }, 1, "shootBulletsRed2");
                    break;
                case "shootBulletsBlue":
                    this.tweener2("blueBullet", {
                        x: -300
                    }, 1, "shootBulletsBlue2");
                    break;
                case "shootBulletsRed2":
                    this.goalRed.show = !1;
                    this.redBullet.show = !1;
                    this.redGlow.show = !0;
                    break;
                case "shootBulletsBlue2":
                    this.goalBlue.show = !1;
                    this.blueBullet.show = !1;
                    this.blueGlow.show = !0;
                    break;
                case "tapButtons":
                    this.tweener("redBut", {
                        sc: 0.8
                    }, 0.1, "tapButtons2");
                    this.tweener("blueBut", {
                        sc: 0.8
                    }, 0.1, "tapButtons2");
                    break;
                case "tapButtons2":
                    this.redBut.sc = 1;
                    this.blueBut.sc = 1;
                    break;
                case "tankRight":
                    this.redTank.frame = 0;
                    this.blueTank.frame = 0;
                    this.tweenF("tapButtons");
                    this.tweener2("redTank", {
                        x: 50
                    }, 1, "tankDown");
                    this.tweener2("blueTank", {
                        x: 50
                    }, 1);
                    break;
                case "tankDown":
                    this.redTank.frame = 1;
                    this.blueTank.frame = 1;
                    this.tweenF("tapButtons");
                    this.tweener2("redTank", {
                        y: 30
                    }, 0.8, "tankLeft");
                    this.tweener2("blueTank", {
                        y: 30
                    }, 0.8);
                    break;
                case "tankLeft":
                    this.redTank.frame = 2;
                    this.blueTank.frame = 2;
                    this.tweenF("tapButtons");
                    this.tweener2("redTank", {
                        x: -50
                    }, 1, "tankUp");
                    this.tweener2("blueTank", {
                        x: -50
                    }, 1);
                    break;
                case "tankUp":
                    this.redTank.frame = 3;
                    this.blueTank.frame = 3;
                    this.tweenF("tapButtons");
                    this.tweener2("redTank", {
                        y: -30
                    }, 0.8, "tankRight");
                    this.tweener2("blueTank", {
                        y: -30
                    }, 0.8);
                    break;
                case "rockShrinkMove":
                    this.tweener(c, {
                        rockSc: 1.5
                    }, 0.1, "rockShrinkMove2");
                    break;
                case "rockShrinkMove2":
                    this.tweener(c, {
                        rockSc: 0
                    }, 0.1, "rockShrinkMove3");
                    break;
                case "rockShrinkMove3":
                    this.bulletTanks.rockY[2] = 10;
                    this.tweenF("growRock", "bullet2");
                    break;
                case "growRock":
                    this.tweener(c, {
                        rockSc: 1.1
                    }, 0.1, "growRock2");
                    break;
                case "growRock2":
                    this.tweener(c, {
                        rockSc: 1
                    }, 0.1);
                    break;
                case "rockExpand":
                    this.tweener(c, {
                        rockSc: 1.2
                    }, 0.1, "rockShrink");
                    break;
                case "rockShrink":
                    this.tweener(c, {
                        rockSc: 0.9
                    }, 0.1, "rockExpand2");
                    break;
                case "rockExpand2":
                    this.tweener(c, {
                        rockSc: 1.1
                    }, 0.1, "rockShrink2");
                    break;
                case "rockShrink2":
                    this.tweener(c, {
                            rockSc: 1
                        },
                        0.1, "glow");
                    break;
                case "shoot0-0":
                    this.tweener2("bullet0", {
                        y: -100
                    }, 0.5, "shoot0-1");
                    break;
                case "shoot1-0":
                    this.tweener2("bullet1", {
                        y: -85
                    }, 0.5, "shoot1-1");
                    break;
                case "shoot2-0":
                    this.tweener2("bullet2", {
                        y: -90
                    }, 0.5, "shoot2-1");
                    break;
                case "shoot0-1":
                    this.tweenF("rockExpand", "bullet0");
                    this.bullet0.facing = "Right";
                    this.bullet0.sc.x = -1;
                    this.tweener2("bullet0", {
                        x: 50
                    }, 0.5, "glow");
                    break;
                case "shoot1-1":
                    this.tweenF("rockExpand", "bullet1");
                    this.bullet1.facing = "Left";
                    this.bullet1.frameX = 5;
                    this.bullet1.frameY = 2;
                    this.bullet1.y = -100;
                    this.bullet1R.show = !0;
                    this.tweener2("bullet1", {
                        x: -40
                    }, 0.5, "glow");
                    this.tweener2("bullet1R", {
                        x: 35
                    }, 0.5, "glowR");
                    break;
                case "shoot2-1":
                    this.tweenF("rockShrinkMove", "bullet2");
                    this[c + "RGlow"].show = !0;
                    this.tweener2("bullet2", {
                        y: -120
                    }, 0.5, "glow");
                    break;
                case "glow":
                    this[c].show = !1;
                    this[c + "Glow"].show = !0;
                    break;
                case "glowR":
                    this[c].show = !1;
                    this[c + "Glow"].show = !0;
                    break;
                case "upItem":
                    if (this.pickedUp) break;
                    this.tweener("item", {
                        off: {
                            y: -3
                        }
                    }, 0.5, "downItem");
                    break;
                case "downItem":
                    if (this.pickedUp) break;
                    this.tweener("item", {
                        off: {
                            y: 0
                        }
                    }, 0.5, "upItem");
                    break;
                case "expandShadow":
                    this.tweener("shadow", {
                        sc: 1
                    }, 0.5, "shrinkShadow");
                    break;
                case "shrinkShadow":
                    this.tweener("shadow", {
                        sc: 0.7
                    }, 0.5, "expandShadow");
                    break;
                case "stickerOff":
                    this.tweening = !0;
                    this.tweener("sticker", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.1, "stickerOff2");
                    for (var d = 0; d < this.buttons.length; d++) this.buttons[d].tweenF("runButton");
                    break;
                case "stickerOff2":
                    this.tweener("sticker", {
                        scX: 0,
                        scY: 0
                    }, 0.1, "boardOff1");
                    break;
                case "boardOff1":
                    this.tweener("board", {
                        offY: 10,
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardOff2");
                    break;
                case "boardOff2":
                    this.tweener("board", {
                        offY: -400,
                        scX: 0.8,
                        scY: 1.2
                    }, 0.2);
                    this.tweener("this", {
                        alp: 0
                    }, 0.2, "killBoard");
                    break;
                case "killBoard":
                    !0 == ig.game.tutBut ? (ig.game.tutOn = !1, ig.game.tutBut = !0, ig.game.director.jumpTo(LevelGame)) : (ig.game.tutOn = !1, ig.game.gamePaused = !1, this.main.startGame(), this.kill());
                    break;
                case "boardStartDown":
                    this.tweening = !0;
                    this.tweener("this", {
                        alp: 1
                    }, 0.2, "boardStartDown2");
                    break;
                case "boardStartDown2":
                    this.tweener("board", {
                            offY: 10
                        },
                        0.2);
                    this.tweener("board", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardBouncy1");
                    break;
                case "boardBouncy1":
                    this.tweener("board", {
                        scX: 0.98,
                        scY: 1.05,
                        offY: 0
                    }, 0.1, "boardBouncy2");
                    break;
                case "boardBouncy2":
                    this.tweener("board", {
                        scX: 1.01,
                        scY: 0.99
                    }, 0.1, "boardBouncy3");
                    this.tweenF("stickerOut");
                    break;
                case "boardBouncy3":
                    this.tweener("board", {
                        scX: 1,
                        scY: 1
                    }, 0.1);
                    break;
                case "stickerOut":
                    this.tweener("sticker", {
                        scX: 1.4,
                        scY: 0.7
                    }, 0.1, "stickerBouncy1");
                    break;
                case "stickerBouncy1":
                    this.tweener("sticker", {
                        scX: 0.9,
                        scY: 1.2
                    }, 0.1, "stickerBouncy2");
                    break;
                case "stickerBouncy2":
                    this.tweener("sticker", {
                        scX: 1,
                        scY: 1
                    }, 0.1, "showBoardText");
                    this.buttons[1].tweenF("showButton");
                    this.buttons[2].tweenF("showButton");
                    break;
                case "showBoardText":
                    this.tweening = !1, this.allSc = 0, this.tweener("this", {
                        allSc: 1
                    }, 0.2, "showBoardText1", 0.1)
            }
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.buttons = [ig.game.getEntitiesByType(EntityTutPrev)[0], ig.game.getEntitiesByType(EntityTutNext)[0],
                ig.game.getEntitiesByType(EntityTutClose)[0]
            ];
            !0 == ig.game.tutBut && (this.buttons[3] = ig.game.getEntitiesByType(EntityTutOne)[0], this.buttons[4] = ig.game.getEntitiesByType(EntityTutTwo)[0]);
            this.tweenF("boardStartDown");
            this.tweenF("upItem");
            this.tweenF("tankRight");
            this.tweenF("shoot0-0");
            this.tweenF("shoot1-0");
            this.tweenF("shoot2-0");
            this.tweenF("shootBulletsRed");
            this.tweenF("shootBulletsBlue")
        },
        draw: function() {
            this.parent();
            if (!ig.global.wm && (this.ctx.fillStyle = "rgba(43,72,96," + 0.8 * this.alp + ")",
                this.ctx.fillRect(0, 0, ig.system.width, ig.system.height), this.drawer({
                    pic: this.boardIm,
                    x: this.board.x,
                    y: this.board.y + this.board.offY,
                    scX: this.board.scX,
                    scY: this.board.scY,
                    cent: !0
                }), this.drawer({
                    pic: this.stickerIm,
                    x: this.board.x,
                    y: this.board.y + this.board.offY - this.sticker.y,
                    scX: this.sticker.scX,
                    scY: this.sticker.scY,
                    cent: !0
                }), this.textSet(16, "#A9381E"), this.textDraw(_STRINGS.Game["Tutorial" + this.step], this.board.x, this.board.y + this.board.offY - this.sticker.y - 1, this.sticker.scX, this.sticker.scY), !0 != this.tweening)) switch (this.step) {
                case 1:
                    var b =
                        ig.ua.mobile ? 15 : -5;
                    this.ctx.fillStyle = "#D9AC66";
                    this.ctx.fillRect(this.board.x - 110 - 65 * this.allSc, this.board.y - 13 - 45 + b, 130 * this.allSc, 90 * this.allSc);
                    this.ctx.fillRect(this.board.x + 110 - 65 * this.allSc, this.board.y - 13 - 45 + b, 130 * this.allSc, 90 * this.allSc);
                    this.ctx.fillStyle = "#C9883E";
                    this.ctx.fillRect(this.board.x - 110 - 35 * this.allSc, this.board.y - 13 - 15 + b, 70 * this.allSc, 30 * this.allSc);
                    this.ctx.fillRect(this.board.x + 110 - 35 * this.allSc, this.board.y - 13 - 15 + b, 70 * this.allSc, 30 * this.allSc);
                    this.textSet(15, "#7B3D28");
                    !0 == ig.game.runAI ? (this.textDraw(_STRINGS.Game.you, this.board.x + 110, this.board.y - 13 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.ai, this.board.x - 110, this.board.y - 13 + b, 0.9 * this.allSc, 0.9 * this.allSc)) : (this.textDraw(_STRINGS.Game.player2, this.board.x + 110, this.board.y - 13 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.player1, this.board.x - 110, this.board.y - 13 + b, 0.9 * this.allSc, 0.9 * this.allSc));
                    this.drawer({
                        x: this.board.x - 110 + this.redTank.x,
                        y: this.board.y - 13 + this.redTank.y +
                            b,
                        cent: !0,
                        frameX: 3,
                        frameY: 1,
                        frame: this.redTank.frames[this.redTank.frame],
                        scX: 0.75 * this.redTank.scX[this.redTank.frame] * this.allSc,
                        scY: 0.75 * this.redTank.scY * this.allSc,
                        pic: this.redTankIm
                    });
                    this.drawer({
                        x: this.board.x + 110 + this.blueTank.x,
                        y: this.board.y - 13 + this.blueTank.y + b,
                        cent: !0,
                        frameX: 3,
                        frameY: 1,
                        frame: this.blueTank.frames[this.blueTank.frame],
                        scX: 0.75 * this.blueTank.scX[this.blueTank.frame] * this.allSc,
                        scY: 0.75 * this.blueTank.scY * this.allSc,
                        pic: this.blueTankIm
                    });
                    ig.ua.mobile ? (this.textDraw(_STRINGS.Game.controlRed,
                            this.board.x - 110, this.board.y - 73 + b, 1 * this.allSc, 1 * this.allSc), this.textDraw(_STRINGS.Game.controlBlue, this.board.x + 110, this.board.y - 73 + b, 1 * this.allSc, 1 * this.allSc), this.textDraw(_STRINGS.Game.tap, this.board.x + 110, this.board.y + 28 + 23 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.tap, this.board.x - 110, this.board.y + 28 + 23 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.drawer({
                            x: this.board.x - 110,
                            y: this.board.y + 28 + 53 + b,
                            cent: !0,
                            scX: 0.75 * this.redBut.sc * this.allSc,
                            scY: 0.75 * this.redBut.sc * this.allSc,
                            pic: this.redButIm
                        }),
                        this.drawer({
                            x: this.board.x + 110,
                            y: this.board.y + 28 + 53 + b,
                            cent: !0,
                            scX: 0.75 * this.blueBut.sc * this.allSc,
                            scY: 0.75 * this.blueBut.sc * this.allSc,
                            pic: this.blueButIm
                        }), this.textSet(18, "#7B3D28"), this.textDraw(_STRINGS.Game.control, this.board.x, this.board.y - 90, 1 * this.allSc, 1 * this.allSc)) : (this.textDraw(_STRINGS.Game.controlRed, this.board.x - 110, this.board.y - 70 + b, 1 * this.allSc, 1 * this.allSc), this.textDraw(_STRINGS.Game.controlBlue, this.board.x + 110, this.board.y - 70 + b, 1 * this.allSc, 1 * this.allSc), this.textDraw(_STRINGS.Game.controlRed2,
                        this.board.x - 110, this.board.y + 30 + 83 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.controlBlue2, this.board.x + 110, this.board.y + 30 + 83 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.click, this.board.x + 110, this.board.y + 28 + 23 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.textDraw(_STRINGS.Game.click, this.board.x - 110, this.board.y + 28 + 23 + b, 0.9 * this.allSc, 0.9 * this.allSc), this.drawer({
                        x: this.board.x - 110,
                        y: this.board.y + 28 + 53 + b,
                        cent: !0,
                        scX: 0.75 * this.redBut.sc * this.allSc,
                        scY: 0.75 * this.redBut.sc *
                            this.allSc,
                        pic: this.redButIm
                    }), this.drawer({
                        x: this.board.x + 110,
                        y: this.board.y + 28 + 53 + b,
                        cent: !0,
                        scX: 0.75 * this.blueBut.sc * this.allSc,
                        scY: 0.75 * this.blueBut.sc * this.allSc,
                        pic: this.blueButIm
                    }), this.textSet(18, "#7B3D28"), this.textDraw(_STRINGS.Game.control, this.board.x, this.board.y - 100, 1 * this.allSc, 1 * this.allSc));
                    break;
                case 2:
                    for (b = 0; 5 > b; b++) this.ctx.fillStyle = "#D9AC66", this.ctx.fillRect(this.board.x + this.item.posX[b] - 20, this.board.y + this.item.posY[b] - 30, 210 * this.allSc, 60 * this.allSc), this.drawer({
                        x: this.board.x +
                            this.item.posX[b],
                        y: this.board.y + this.item.posY[b] + this.shadow.y[b],
                        cent: !0,
                        scX: this.shadow.sc * this.allSc,
                        scY: this.shadow.sc * this.allSc,
                        pic: this[this.powers[b] + "ShadowIm"]
                    }), this.drawer({
                        x: this.board.x + this.item.posX[b],
                        y: this.board.y + this.item.posY[b] + this.item.y[b] + this.item.off.y,
                        scX: this.item.sc * this.allSc,
                        scY: this.item.sc * this.allSc,
                        cent: !0,
                        pic: this[this.powers[b] + "Im"]
                    }), this.textSet(15, "#7B3D28"), this.textLeft(_STRINGS.Game["Power" + b + "-0"], this.board.x + this.item.posX[b] + 30, this.board.y + this.item.posY[b] -
                        10, 1 * this.allSc, 1 * this.allSc), this.textLeft(_STRINGS.Game["Power" + b + "-1"], this.board.x + this.item.posX[b] + 30, this.board.y + this.item.posY[b] + 10, 1 * this.allSc, 1 * this.allSc);
                    break;
                case 3:
                    this.textSet(15, "#7B3D28");
                    this.textDraw(_STRINGS.Game.Bullet, this.board.x, this.board.y - 95, 1 * this.allSc, 1 * this.allSc);
                    for (b = 0; 3 > b; b++) this.ctx.fillStyle = "#D9AC66", this.ctx.fillRect(this.board.x + this.bulletTanks.x[b] - 60 * this.allSc, this.board.y + 20 - 100 * this.allSc, 120 * this.allSc, 200 * this.allSc), this.textSet(13, "#7B3D28"),
                        this.textDraw(_STRINGS.Game["Bullet" + b], this.board.x + this.bulletTanks.x[b], this.board.y + 110, 1 * this.allSc, 1 * this.allSc), this.drawer({
                            pic: this["tankIm" + b],
                            x: this.board.x + this.bulletTanks.x[b],
                            y: this.board.y + 80,
                            frameX: 3,
                            frameY: 1,
                            frame: 0,
                            scX: 0.8 * this.bulletTanks.scX * this.allSc,
                            scY: 0.8 * this.bulletTanks.scY * this.allSc,
                            cent: !0
                        }), this.drawer({
                            pic: this.rockIm,
                            x: this.board.x + this.bulletTanks.x[b],
                            y: this.board.y + this.bulletTanks.rockY[b],
                            frameX: 6,
                            frameY: 1,
                            frame: 0,
                            scX: 0.8 * this["bullet" + b].rockSc * this.allSc,
                            scY: 0.8 *
                                this["bullet" + b].rockSc * this.allSc,
                            cent: !0
                        }), !0 == this["bullet" + b].show && (this.runAnim("bullet" + b), this.drawer({
                            x: this.board.x + this.bulletTanks.x[b] + 1 + this["bullet" + b].x,
                            y: this.board.y + 80 + this["bullet" + b].y,
                            scX: 0.8 * this["bullet" + b].sc.x * this.allSc,
                            scY: 0.8 * this["bullet" + b].sc.y * this.allSc,
                            frameX: this["bullet" + b].frameX,
                            frameY: this["bullet" + b].frameY,
                            frame: this["bullet" + b].frames[this["bullet" + b].frame],
                            cent: !0,
                            pic: this["bullet" + b + this["bullet" + b].facing + "Im"]
                        })), !0 == this["bullet" + b + "Glow"].show && (this.runAnim("bullet" +
                            b + "Glow"), this.drawer({
                            x: this.board.x + this.bulletTanks.x[b] + 1 + this["bullet" + b].x,
                            y: this.board.y + 80 + this["bullet" + b].y,
                            scX: 0.8 * this["bullet" + b + "Glow"].sc.x * this.allSc,
                            scY: 0.8 * this["bullet" + b + "Glow"].sc.y * this.allSc,
                            frameX: this["bullet" + b + "Glow"].frameX,
                            frameY: this["bullet" + b + "Glow"].frameY,
                            frame: this["bullet" + b + "Glow"].frames[this["bullet" + b + "Glow"].frame],
                            cent: !0,
                            pic: this["bullet" + b + "GlowIm"]
                        })), 1 == b && (!0 == this.bullet1R.show && (this.runAnim("bullet1R"), this.drawer({
                            x: this.board.x + this.bulletTanks.x[b] +
                                1 + this.bullet1R.x,
                            y: this.board.y + 80 + this["bullet" + b].y,
                            scX: 0.8 * this.bullet1R.sc.x * this.allSc,
                            scY: 0.8 * this.bullet1R.sc.y * this.allSc,
                            frameX: this.bullet1R.frameX,
                            frameY: this.bullet1R.frameY,
                            frame: this.bullet1R.frames[this.bullet1R.frame],
                            cent: !0,
                            pic: this["bullet" + b + this["bullet" + b].facing + "Im"]
                        })), !0 == this["bullet" + b + "RGlow"].show && (this.runAnim("bullet" + b + "RGlow"), this.drawer({
                            x: this.board.x + this.bulletTanks.x[b] + 8 + this.bullet1R.x,
                            y: this.board.y + 80 + this["bullet" + b].y,
                            scX: 0.8 * this["bullet" + b + "RGlow"].sc.x *
                                this.allSc,
                            scY: 0.8 * this["bullet" + b + "RGlow"].sc.y * this.allSc,
                            frameX: this["bullet" + b + "RGlow"].frameX,
                            frameY: this["bullet" + b + "RGlow"].frameY,
                            frame: this["bullet" + b + "RGlow"].frames[this["bullet" + b + "RGlow"].frame],
                            cent: !0,
                            pic: this["bullet" + b + "GlowIm"]
                        }))), 2 == b && !0 == this["bullet" + b + "RGlow"].show && (this.runAnim("bullet" + b + "RGlow"), this.drawer({
                            x: this.board.x + this.bulletTanks.x[b] + 1 + this.bullet2.x,
                            y: this.board.y + 80 - 90,
                            scX: 0.8 * this["bullet" + b + "RGlow"].sc.x * this.allSc,
                            scY: 0.8 * this["bullet" + b + "RGlow"].sc.y * this.allSc,
                            frameX: this["bullet" + b + "RGlow"].frameX,
                            frameY: this["bullet" + b + "RGlow"].frameY,
                            frame: this["bullet" + b + "RGlow"].frames[this["bullet" + b + "RGlow"].frame],
                            cent: !0,
                            pic: this["bullet" + b + "GlowIm"]
                        }));
                    break;
                case 4:
                    b = -15, this.ctx.fillStyle = "#D9AC66", this.ctx.fillRect(this.board.x - 200 * this.allSc, this.board.y - 68, 400 * this.allSc, 100 * this.allSc), this.textSet(17, "#7B3D28"), this.textDraw(_STRINGS.Game.goal1, this.board.x, this.board.y - 95, 1 * this.allSc, 1 * this.allSc), this.textSet(16, "#7B3D28"), this.textDraw(_STRINGS.Game.goal2,
                        this.board.x, this.board.y + 78, 1 * this.allSc, 1 * this.allSc), !0 == this.goalRed.show && this.drawer({
                        x: this.board.x - 110 + this.goalRed.x,
                        y: this.board.y + 25 + this.goalRed.y + b,
                        cent: !0,
                        frameX: 3,
                        frameY: 1,
                        frame: this.goalRed.frames[this.goalRed.frame],
                        scX: this.goalRed.scX[this.goalRed.frame] * this.allSc,
                        scY: this.goalRed.scY * this.allSc,
                        pic: this.redTankIm
                    }), !0 == this.goalBlue.show && this.drawer({
                        x: this.board.x + 110 + this.goalBlue.x,
                        y: this.board.y + 25 + this.goalBlue.y + b,
                        cent: !0,
                        frameX: 3,
                        frameY: 1,
                        frame: this.goalBlue.frames[this.goalBlue.frame],
                        scX: this.goalBlue.scX[this.goalBlue.frame] * this.allSc,
                        scY: this.goalBlue.scY * this.allSc,
                        pic: this.blueTankIm
                    }), !0 == this.blueBullet.show && this.drawer({
                        x: this.board.x + 90 + this.goalBlue.x + this.blueBullet.x,
                        y: this.board.y + 25 + this.goalBlue.y + this.blueBullet.y + b,
                        cent: !0,
                        frameX: this.blueBullet.frameX,
                        frameY: this.blueBullet.frameY,
                        frame: this.blueBullet.frames[this.blueBullet.frame],
                        scX: this.blueBullet.sc.x * this.allSc,
                        scY: this.blueBullet.sc.y * this.allSc,
                        pic: this.bullet0RightIm
                    }), !0 == this.redBullet.show && this.drawer({
                        x: this.board.x -
                            90 + this.goalRed.x + this.redBullet.x,
                        y: this.board.y + 25 + this.goalRed.y + this.redBullet.y + b,
                        cent: !0,
                        frameX: this.redBullet.frameX,
                        frameY: this.redBullet.frameY,
                        frame: this.redBullet.frames[this.redBullet.frame],
                        scX: this.redBullet.sc.x * this.allSc,
                        scY: this.redBullet.sc.y * this.allSc,
                        pic: this.bullet0RightIm
                    }), !0 == this.redGlow.show && (this.runAnim("redGlow"), this.drawer({
                        x: this.board.x - 110 + this.goalRed.x,
                        y: this.board.y + 25 + this.goalRed.y + b,
                        cent: !0,
                        frameX: this.redGlow.frameX,
                        frameY: this.redGlow.frameY,
                        frame: this.redGlow.frames[this.redGlow.frame],
                        scX: this.redGlow.sc.x * this.allSc,
                        scY: this.redGlow.sc.y * this.allSc,
                        pic: this.bullet0GlowIm
                    })), !0 == this.blueGlow.show && (this.runAnim("blueGlow"), this.drawer({
                        x: this.board.x + 110 + this.goalBlue.x,
                        y: this.board.y + 25 + this.goalBlue.y + b,
                        cent: !0,
                        frameX: this.blueGlow.frameX,
                        frameY: this.blueGlow.frameY,
                        frame: this.blueGlow.frames[this.blueGlow.frame],
                        scX: this.blueGlow.sc.x * this.allSc,
                        scY: this.blueGlow.sc.y * this.allSc,
                        pic: this.bullet0GlowIm
                    }))
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-tank").requires("game.entities.plain").defines(function() {
    EntityPlainTank = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,
        zIndex: 50,
        what: "tank",
        name: "blue",
        hearts: 0,
        life: 3,
        fullLife: 5,
        ai: !1,
        armo: 0,
        lockCollision: !1,
        step: 0,
        velTime: 0.3,
        speederTime: 15,
        bubblesTime: 15,
        giftTime: 15,
        giftBulletTime: 15,
        crystalBulletTime: 15,
        crystalTime: 15,
        shootTimeNormal: 1.5,
        shootTimeCrystal: 1.5,
        shootTimeGift: 1.5,
        collideTime: 0.3,
        stepChange: 3,
        setChange: !1,
        percent: 0,
        shootSc: {
            x: 1,
            y: 1
        },
        oriSc: {
            x: 1,
            y: 1
        },
        animSc: {
            x: 1,
            y: 1
        },
        powerSc: {
            x: 1,
            y: 1
        },
        refTile: {
            x: 0,
            y: 0
        },
        target: {
            x: 0,
            y: 0
        },
        current: {
            x: 0,
            y: 0
        },
        tile: {
            x: 0,
            y: 0
        },
        size: {
            x: 40,
            y: 40
        },
        maxVel: {
            x: 1E3,
            y: 1E3
        },
        speed: 100,
        oriPowerSpeed: 50,
        powerSpeed: 0,
        frame: 0,
        form: "Normal",
        faces: ["Up", "Right", "Down", "Left"],
        facing: 0,
        speeder: {
            endable: !1,
            loop: !0,
            sc: 1,
            off: {
                x: 0,
                y: 0
            },
            sc: {
                x: 1,
                y: 1
            },
            rot: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        bubbles: {
            endable: !1,
            loop: !0,
            sc: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
            ]
        },
        giftGlow: {
            endable: !1,
            changed: !1,
            loop: !1,
            off: {
                x: 0,
                y: 0
            },
            sc: {
                x: 1,
                y: 1
            },
            rot: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        crystalGlow: {
            endable: !1,
            changed: !1,
            loop: !1,
            sc: 1,
            off: {
                x: 0,
                y: 0
            },
            sc: {
                x: 1,
                y: 1
            },
            rot: 0,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        redDieIm: new ig.Image("media/graphics/sprites/game/red-explode_4x4.png"),
        blueDieIm: new ig.Image("media/graphics/sprites/game/blue-explode_4x4.png"),
        heartlessIm: new ig.Image("media/graphics/sprites/game/heartless.png"),
        dieGlow: {
            loop: !1,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -4,
                y: 4
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            frameX: 4,
            frameY: 4
        },
        heartless: {
            loop: !1,
            x: 0,
            y: -50,
            frameTime: 0.1,
            alp: 1,
            sc: {
                x: 0.5,
                y: 0.5
            },
            off: {
                x: 0,
                y: 0
            },
            frames: [0, 1],
            frameX: 2,
            frameY: 1,
            show: !1
        },
        giftGlowOn: !1,
        crystalGlowOn: !1,
        bubbleOn: !1,
        speederOn: !1,
        dead: !1,
        powerTimers: {},
        redNormalIm: new ig.Image("media/graphics/sprites/game/red-normal.png"),
        redCrystalIm: new ig.Image("media/graphics/sprites/game/red-crystal.png"),
        redGiftIm: new ig.Image("media/graphics/sprites/game/red-gift.png"),
        blueNormalIm: new ig.Image("media/graphics/sprites/game/blue-normal.png"),
        blueCrystalIm: new ig.Image("media/graphics/sprites/game/blue-crystal.png"),
        blueGiftIm: new ig.Image("media/graphics/sprites/game/blue-gift.png"),
        crystalGlowIm: new ig.Image("media/graphics/sprites/game/morph-crystal_5x3.png"),
        giftGlowIm: new ig.Image("media/graphics/sprites/game/morph-gift_5x3.png"),
        bubbleIm: new ig.Image("media/graphics/sprites/game/bubble_5x3.png"),
        speedIm: new ig.Image("media/graphics/sprites/game/speed_5x3.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.name = d.name, "red" == this.name && !0 == ig.game.runAI && (this.ai = !0), this.oriStat(), this.changeSides(), this.setDirection())
        },
        checkBlockage: function(b) {
            switch (this.faces[b]) {
                case "Up":
                    return 0 > this.tile.y - 1 ? !1 : this.main.map[this.tile.x][this.tile.y - 1] > this.main.block ? !1 : !0;
                case "Right":
                    return this.tile.x + 1 >= this.main.totalTile.x ? !1 : this.main.map[this.tile.x + 1][this.tile.y] > this.main.block ? !1 : !0;
                case "Down":
                    if (!(this.tile.y + 1 >= this.main.totalTile.y)) return this.main.map[this.tile.x][this.tile.y +
                        1
                    ] > this.main.block ? !1 : !0;
                    break;
                case "Left":
                    return 0 > this.tile.x - 1 ? !1 : this.main.map[this.tile.x - 1][this.tile.y] > this.main.block ? !1 : !0
            }
        },
        tileRangeBlockageCheck: function(b, c, d, f) {
            var g;
            b > c ? g = c : (g = b, b = c);
            if ("x" == d)
                for (d = g; d < b; d++) {
                    if (this.main.map[f][d] > this.main.block) return !0
                } else if ("y" == d)
                    for (d = g; d < b; d++)
                        if (this.main.map[d][f] > this.main.block) return !0;
            return !1
        },
        idleAImovement: function() {
            var b = !1;
            if (void 0 != ig.game.getEntitiesByType(EntityPlainPower)) {
                this.power = ig.game.getEntitiesByType(EntityPlainPower);
                for (var c = 0; c < this.power.length; c++)
                    if (!1 != this.power[c].working) switch (this.faces[this.facing]) {
                        case "Up":
                            if (this.power[c].tile.x == this.tile.x && this.power[c].tile.y < this.tile.y) {
                                if (!this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x)) {
                                    this.step = 0;
                                    b = !0;
                                    break
                                }
                            } else if (this.power[c].tile.y == this.tile.y - 1 && this.power[c].tile.x > this.tile.x) {
                                if (!this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y - 1)) {
                                    b = this.aiChangeDirection();
                                    break
                                }
                            } else if (this.power[c].tile.y <
                                this.tile.y && this.power[c].tile.x > this.tile.x && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x) && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.power[c].tile.y - 1)) {
                                this.step = 0;
                                b = !0;
                                break
                            }
                            break;
                        case "Right":
                            if (this.power[c].tile.y == this.tile.y && this.power[c].tile.x > this.tile.x) {
                                if (!this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y)) {
                                    this.step = 0;
                                    b = !0;
                                    break
                                }
                            } else if (this.power[c].tile.y > this.tile.y && this.power[c].tile.x ==
                                this.tile.x + 1) {
                                if (!this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x + 1)) {
                                    b = this.aiChangeDirection();
                                    break
                                }
                            } else if (this.power[c].tile.y > this.tile.y && this.power[c].tile.x > this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y) && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.power[c].tile.y)) {
                                this.step = 0;
                                b = !0;
                                break
                            }
                            break;
                        case "Down":
                            if (this.power[c].tile.x == this.tile.x && this.power[c].tile.y > this.tile.y) {
                                if (!this.tileRangeBlockageCheck(this.tile.y,
                                    this.power[c].tile.y, "x", this.tile.x)) {
                                    this.step = 0;
                                    b = !0;
                                    break
                                }
                            } else if (this.power[c].tile.y == this.tile.y + 1 && this.power[c].tile.x < this.tile.x) {
                                if (!this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y + 1)) {
                                    b = this.aiChangeDirection();
                                    break
                                }
                            } else if (this.power[c].tile.y > this.tile.y && this.power[c].tile.x < this.tile.x && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x) && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.power[c].y)) {
                                this.step =
                                    0;
                                b = !0;
                                break
                            }
                            break;
                        case "Left":
                            this.power[c].tile.y == this.tile.y && this.power[c].tile.x < this.tile.x ? this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y) || (this.step = 0, b = !0) : this.power[c].tile.y < this.tile.y && this.power[c].tile.x == this.tile.x - 1 ? this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x - 1) || (b = this.aiChangeDirection()) : this.power[c].tile.y < this.tile.y && this.power[c].tile.x < this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x,
                                "y", this.tile.y) && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.power[c].tile.y) && (this.step = 0, b = !0)
                    }!1 == b && (b = this.findPowerUpAI());
                if (!1 == b) switch (this.faces[this.facing]) {
                    case "Up":
                        0 == this.tile.x ? this.step >= this.stepChange && this.aiChangeDirection() : this.tile.x != this.main.totalTile.x - 1 && this.step >= this.stepChange && this.aiChangeDirection();
                        break;
                    case "Right":
                        0 == this.tile.y ? this.step >= this.stepChange && this.aiChangeDirection() : this.tile.y != this.main.totalTile.y - 1 && this.step >=
                            this.stepChange && this.aiChangeDirection();
                        break;
                    case "Down":
                        this.tile.x == this.main.totalTile.x - 1 ? this.step >= this.stepChange && this.aiChangeDirection() : 0 != this.tile.x && this.step >= this.stepChange && !1 == b && this.aiChangeDirection();
                        break;
                    case "Left":
                        this.tile.y == this.main.totalTile.y - 1 ? this.step >= this.stepChange && this.aiChangeDirection() : 0 != this.tile.y && this.step >= this.stepChange && !1 == b && this.aiChangeDirection()
                }
            }
        },
        chasePlayerAI: function() {
            var b = !1;
            switch (this.faces[this.facing]) {
                case "Up":
                    if (this.enemy.tile.x ==
                        this.tile.x && this.enemy.tile.y < this.tile.y) {
                        if (!this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x)) {
                            this.step = 0;
                            b = !0;
                            break
                        }
                    } else if (this.enemy.tile.y == this.tile.y - 1 && this.enemy.tile.x > this.tile.x) {
                        if (!this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.tile.y - 1)) {
                            b = this.aiChangeDirection();
                            break
                        }
                    } else if (this.enemy.tile.y < this.tile.y && this.enemy.tile.x > this.tile.x && !this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x) && !this.tileRangeBlockageCheck(this.tile.x,
                        this.enemy.tile.x, "y", this.enemy.tile.y - 1)) {
                        this.step = 0;
                        b = !0;
                        break
                    }
                    break;
                case "Right":
                    if (this.enemy.tile.y == this.tile.y && this.enemy.tile.x > this.tile.x) {
                        if (!this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.tile.y)) {
                            this.step = 0;
                            b = !0;
                            break
                        }
                    } else if (this.enemy.tile.y > this.tile.y && this.enemy.tile.x == this.tile.x + 1) {
                        if (!this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x + 1)) {
                            b = this.aiChangeDirection();
                            break
                        }
                    } else if (this.enemy.tile.y > this.tile.y && this.enemy.tile.x >
                        this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.tile.y) && !this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.enemy.tile.y)) {
                        this.step = 0;
                        b = !0;
                        break
                    }
                    break;
                case "Down":
                    if (this.enemy.tile.x == this.tile.x && this.enemy.tile.y > this.tile.y) {
                        if (!this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x)) {
                            this.step = 0;
                            b = !0;
                            break
                        }
                    } else if (this.enemy.tile.y == this.tile.y + 1 && this.enemy.tile.x < this.tile.x) {
                        if (!this.tileRangeBlockageCheck(this.tile.x,
                            this.enemy.tile.x, "y", this.tile.y + 1)) {
                            b = this.aiChangeDirection();
                            break
                        }
                    } else if (this.enemy.tile.y > this.tile.y && this.enemy.tile.x < this.tile.x && !this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x) && !this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.enemy.y)) {
                        this.step = 0;
                        b = !0;
                        break
                    }
                    break;
                case "Left":
                    this.enemy.tile.y == this.tile.y && this.enemy.tile.x < this.tile.x ? this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.tile.y) || (this.step = 0, b = !0) : this.enemy.tile.y <
                        this.tile.y && this.enemy.tile.x == this.tile.x - 1 ? this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.tile.x - 1) || (b = this.aiChangeDirection()) : this.enemy.tile.y < this.tile.y && this.enemy.tile.x < this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.enemy.tile.x, "y", this.tile.y) && !this.tileRangeBlockageCheck(this.tile.y, this.enemy.tile.y, "x", this.enemy.tile.y) && (this.step = 0, b = !0)
            }
            return b
        },
        findPowerUpAI: function() {
            var b = !1;
            if (void 0 != ig.game.getEntitiesByType(EntityPlainPower)) {
                this.power =
                    ig.game.getEntitiesByType(EntityPlainPower);
                for (var c = 0; c < this.power.length; c++)
                    if (!1 != this.power[c].working) switch (this.faces[this.facing]) {
                        case "Up":
                            if (this.power[c].tile.y > this.tile.y - 1 && this.power[c].tile.x > this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y - 1)) {
                                b = this.aiChangeDirection();
                                break
                            }
                            break;
                        case "Right":
                            if (this.power[c].tile.x < this.tile.x + 1 && this.power[c].tile.y > this.tile.y && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x +
                                1)) {
                                b = this.aiChangeDirection();
                                break
                            }
                            break;
                        case "Down":
                            if (this.power[c].tile.y < this.tile.y + 1 && this.power[c].tile.x < this.tile.x && !this.tileRangeBlockageCheck(this.tile.x, this.power[c].tile.x, "y", this.tile.y + 1)) {
                                b = this.aiChangeDirection();
                                break
                            }
                            break;
                        case "Left":
                            this.power[c].tile.x > this.tile.x - 1 && this.power[c].tile.y < this.tile.y && !this.tileRangeBlockageCheck(this.tile.y, this.power[c].tile.y, "x", this.tile.x - 1) && (b = this.aiChangeDirection())
                    }
                    return b
            }
        },
        runAI: function() {
            this.ai && (0 < this.armo ? this.chasePlayerAI() ||
                this.idleAImovement() : this.idleAImovement())
        },
        aiChangeDirection: function() {
            this.stepChange = 2 + Math.floor(10 * Math.random());
            this.step = 0;
            this.controlSides();
            return !0
        },
        spawnBullet: function(b) {
            for (var c = ig.game.getEntitiesByType(EntityPlainBullet), d = !1, f = 0; f < c.length; f++)!d && -100 == c[f].pos.x && (d = !0, c[f].reGen(this, b));
            d || ig.game.spawnEntity(EntityPlainBullet, 0, 0, {
                main: this.main,
                tank: this,
                bullet: b
            })
        },
        collideWith: function(b, c) {
            if ("x" == c && ("Right" == this.faces[this.facing] || "Left" == this.faces[this.facing])) this.facing =
                (this.facing + 2) % this.faces.length, this.safeSides();
            if ("y" == c && ("Up" == this.faces[this.facing] || "Down" == this.faces[this.facing])) this.facing = (this.facing + 2) % this.faces.length, this.safeSides()
        },
        check: function(b) {
            if ("power" == b.name && !1 != b.working) switch (b.zIndex = this.zIndex - 1, this.faces[this.facing]) {
                case "Up":
                case "Down":
                    this.tile.x == b.tile.x && (b.tank = this, b.pickUp());
                    break;
                case "Left":
                case "Right":
                    this.tile.y == b.tile.y && (b.tank = this, b.pickUp())
            }
        },
        oriStat: function() {
            this.velTimer = new ig.Timer;
            this.speederTimer =
                new ig.Timer;
            this.bubblesTimer = new ig.Timer;
            this.giftTimer = new ig.Timer;
            this.giftBulletTimer = new ig.Timer;
            this.crystalTimer = new ig.Timer;
            this.crystalBulletTimer = new ig.Timer;
            this.shootTimer = new ig.Timer;
            this.collideTimer = new ig.Timer;
            "red" == this.name ? (this.facing = 1, this.tile.x = 0, this.tile.y = 0) : (this.facing = 3, this.tile.x = this.main.totalTile.x - 1, this.tile.y = this.main.totalTile.y - 1);
            this.pos.x = this.tile.x * this.main.tiles.w + this.main.topLeft.x;
            this.pos.y = this.tile.y * this.main.tiles.h + this.main.topLeft.y;
            this.zIndex = this.pos.y;
            ig.game.sortEntitiesDeferred()
        },
        done: function(b) {
            switch (b) {
                case "giftGlow":
                    this.giftGlowOn = !1;
                    !1 == this.giftGlow.endable ? (this.giftGlow.endable = !0, this.form = "Gift") : (this.giftGlow.endable = !1, this.form = "Normal");
                    break;
                case "heartless":
                    this.tweenF("heartless");
                    break;
                case "dieGlow":
                    this.main.gameOver = !0;
                    this.vel.x = 0;
                    this.vel.y = 0;
                    100 == this.pos.x;
                    break;
                case "crystalGlow":
                    this.crystalGlowOn = !1, !1 == this.crystalGlow.endable ? (this.crystalGlow.endable = !0, this.form = "Crystal") : (this.crystalGlow.endable = !1, this.form = "Normal")
            }
        },
        tweenF: function(b) {
            switch (b) {
                case "heartless":
                    this.tweener("heartless", {
                        alp: 0,
                        off: {
                            y: 20
                        },
                        sc: {
                            x: 0.9,
                            y: 0.9
                        }
                    }, 0.3, "heartless2");
                    break;
                case "heartless2":
                    this.heartless.show = !1;
                    this.resetFrame("heartless");
                    this.heartless.alp = 1;
                    this.heartless.off.y = 0;
                    this.heartless.sc.x = 0.5;
                    this.heartless.sc.y = 0.5;
                    break;
                case "shootScale":
                    switch (this.faces[this.facing]) {
                        case "Up":
                        case "Down":
                            this.tweener("shootSc", {
                                y: 0.5,
                                x: 1.5
                            }, 0.05, "shootScaleUpDown");
                            break;
                        case "Right":
                        case "Left":
                            this.tweener("shootSc", {
                                x: 0.5,
                                y: 1.5
                            }, 0.05, "shootScaleLeftRight")
                    }
                    break;
                case "shootScaleUpDown":
                    this.tweener("shootSc", {
                        y: 1.2,
                        x: 0.8
                    }, 0.1, "shootScale2");
                    break;
                case "shootScaleLeftRight":
                    this.tweener("shootSc", {
                        x: 1.2,
                        y: 0.8
                    }, 0.05, "shootScale2");
                    break;
                case "shootScale2":
                    this.tweener("shootSc", {
                        x: 1,
                        y: 1
                    }, 0.1, "shootScale2");
                    break;
                case "powerScale":
                    this.tweener("powerSc", {
                        x: 1.2,
                        y: 1.2
                    }, 0.05, "powerScale2");
                    break;
                case "powerScale2":
                    !0 == this.bubbles.endable && (this.bubbles.endable = !1, this.tweenF("keepBubble"));
                    !0 == this.speeder.endable &&
                        (this.speederOn = this.speeder.endable = !1, this.powerSpeed = 0);
                    this.tweener("powerSc", {
                        x: 1,
                        y: 1
                    }, 0.1);
                    break;
                case "longScale":
                    this.tweener("animSc", {
                        x: 0.98,
                        y: 1.02
                    }, 0.3, "fatScale");
                    break;
                case "fatScale":
                    this.tweener("animSc", {
                        x: 1.02,
                        y: 0.98
                    }, 0.3, "longScale");
                    break;
                case "keepBubble":
                    this.tweener("bubbles", {
                        sc: 1.2
                    }, 0.2, "keepBubble2");
                    break;
                case "keepBubble2":
                    this.tweener("bubbles", {
                        sc: 0
                    }, 0.1, "keepBubble3");
                    break;
                case "keepBubble3":
                    this.bubbleOn = !1;
                    break;
                case "expandBubble":
                    this.tweener("bubbles", {
                            sc: 1.2
                        }, 0.2,
                        "expandBubble2");
                    break;
                case "expandBubble2":
                    this.tweener("bubbles", {
                        sc: 1
                    }, 0.1)
            }
        },
        controlSides: function() {
            this.setChange = !0
        },
        moveCheck: function() {
            switch (this.faces[this.facing]) {
                case "Up":
                    this.pos.y < this.getTileY(this.tile.y - 1) && (this.tile.y -= 1, this.step += 1, this.changeSides());
                    break;
                case "Right":
                    this.pos.x > this.getTileX(this.tile.x + 1) && (this.tile.x += 1, this.step += 1, this.changeSides());
                    break;
                case "Down":
                    this.pos.y > this.getTileY(this.tile.y + 1) && (this.tile.y += 1, this.step += 1, this.changeSides());
                    break;
                case "Left":
                    this.pos.x <
                        this.getTileX(this.tile.x - 1) && (this.tile.x -= 1, this.step += 1, this.changeSides())
            }
            this.setDirection()
        },
        getTilePos: function(b, c) {
            return {
                x: b * this.main.tiles.w + this.main.topLeft.x,
                y: c * this.main.tiles.h + this.main.topLeft.y
            }
        },
        getRefTileX: function() {
            this.refTile.x = Math.floor((this.pos.x - this.main.topLeft.x - 20) / this.main.tiles.w)
        },
        getRefTileY: function() {
            this.refTile.y = Math.floor((this.pos.y - this.main.topLeft.y - 20) / this.main.tiles.h)
        },
        getTileX: function(b) {
            return b * this.main.tiles.w + this.main.topLeft.x
        },
        getTileY: function(b) {
            return b *
                this.main.tiles.h + this.main.topLeft.y
        },
        changeSides: function() {
            if (!0 == this.setChange) {
                this.setChange = !1;
                for (this.facing = (this.facing + 1) % this.faces.length; !this.checkSides(this.facing);) this.facing = (this.facing + 1) % this.faces.length
            } else this.checkSides(this.facing) || (this.facing = (this.facing + 2) % this.faces.length)
        },
        checkSides: function(b) {
            switch (this.faces[b]) {
                case "Up":
                    return 0 > this.tile.y - 1 ? !1 : this.main.map[this.tile.x][this.tile.y - 1] > this.main.block ? !1 : !0;
                case "Right":
                    return this.tile.x + 1 >= this.main.totalTile.x ?
                        !1 : this.main.map[this.tile.x + 1][this.tile.y] > this.main.block ? !1 : !0;
                case "Down":
                    if (!(this.tile.y + 1 >= this.main.totalTile.y)) return this.main.map[this.tile.x][this.tile.y + 1] > this.main.block ? !1 : !0;
                    break;
                case "Left":
                    return 0 > this.tile.x - 1 ? !1 : this.main.map[this.tile.x - 1][this.tile.y] > this.main.block ? !1 : !0
            }
        },
        safeSides: function() {
            for (; !this.checkSides(this.facing);) this.facing = (this.facing + 1) % this.faces.length
        },
        checkEnemy: function() {
            if (void 0 != this.enemy) switch (this.faces[this.facing]) {
                case "Up":
                    this.enemy.refTile.x ==
                        this.refTile.x && this.enemy.refTile.y == this.refTile.y - 1 ? (this.facing = (this.facing + 2) % this.faces.length, this.safeSides()) : this.enemy.refTile.x == this.refTile.x && this.enemy.refTile.y == this.refTile.y && (this.facing = (this.facing + 2) % this.faces.length, this.safeSides());
                    break;
                case "Right":
                    this.enemy.refTile.x == this.refTile.x + 1 && this.enemy.refTile.y == this.refTile.y ? (this.facing = (this.facing + 2) % this.faces.length, this.safeSides()) : this.enemy.refTile.x == this.refTile.x && this.enemy.refTile.y == this.refTile.y && (this.facing =
                        (this.facing + 2) % this.faces.length, this.safeSides());
                    break;
                case "Down":
                    this.enemy.refTile.x == this.refTile.x && this.enemy.refTile.y == this.refTile.y + 1 ? (this.facing = (this.facing + 2) % this.faces.length, this.safeSides()) : this.enemy.refTile.x == this.refTile.x && this.enemy.refTile.y == this.refTile.y && (this.facing = (this.facing + 2) % this.faces.length, this.safeSides());
                    break;
                case "Left":
                    this.enemy.refTile.x == this.refTile.x - 1 && this.enemy.refTile.y == this.refTile.y ? (this.facing = (this.facing + 2) % this.faces.length, this.safeSides()) :
                        this.enemy.refTile.x == this.refTile.x && this.enemy.refTile.y == this.refTile.y && (this.facing = (this.facing + 2) % this.faces.length, this.safeSides())
            }
        },
        setDirection: function() {
            switch (this.faces[this.facing]) {
                case "Up":
                    this.frame = 0;
                    this.oriSc.x = 1;
                    this.vel.x = 0;
                    this.vel.y = -(this.speed + this.powerSpeed);
                    this.pos.x = this.getTileX(this.tile.x);
                    this.speeder.sc.x = 1;
                    this.speeder.off.x = 0;
                    this.speeder.off.y = 22;
                    this.speeder.rot = 90;
                    break;
                case "Right":
                    this.frame = 2;
                    this.oriSc.x = -1;
                    this.vel.x = this.speed + this.powerSpeed;
                    this.vel.y =
                        0;
                    this.pos.y = this.getTileY(this.tile.y);
                    this.speeder.sc.x = -1;
                    this.speeder.off.x = -22;
                    this.speeder.off.y = 0;
                    this.speeder.rot = 0;
                    break;
                case "Down":
                    this.frame = 1;
                    this.oriSc.x = 1;
                    this.vel.x = 0;
                    this.vel.y = this.speed + this.powerSpeed;
                    this.pos.x = this.getTileX(this.tile.x);
                    this.speeder.sc.x = 1;
                    this.speeder.off.x = 0;
                    this.speeder.off.y = -22;
                    this.speeder.rot = 270;
                    break;
                case "Left":
                    this.frame = 2, this.oriSc.x = 1, this.vel.x = -(this.speed + this.powerSpeed), this.vel.y = 0, this.pos.y = this.getTileY(this.tile.y), this.speeder.sc.x = 1,
                        this.speeder.off.x = 22, this.speeder.off.y = 0, this.speeder.rot = 0
            }
        },
        update: function() {
            if (!ig.global.wm && !(!0 == this.main.gamePaused || !0 == ig.game.gamePaused) && !0 != this.main.gameOver) this.parent(), this.dead || (this.powerUpStuff(), this.runAI(), this.moveCheck(), this.zIndex = this.pos.y, ig.game.sortEntitiesDeferred(), this.getRefTileX(), this.getRefTileY(), this.collideTimer.delta() > this.collideTime && !0 == this.lockCollision && (this.lockCollision = !1))
        },
        powerUpStuff: function() {
            this.shootTimer.delta() > this["shootTime" +
                this.form] && 0 < this.armo && (this.shootTimer.reset(), this.armo--, this.button.tweenF("expandArmoText"), "Normal" != this.form && this.tweenF("shootScale"), this.spawnBullet());
            this.speederTimer.delta() > this.speederTime && !0 == this.speederOn && (this.speeder.endable = !0, this.tweenF("powerScale"));
            this.bubblesTimer.delta() > this.bubblesTime && !0 == this.bubbleOn && (this.bubbles.endable = !0, this.tweenF("powerScale"));
            !0 == this.giftGlow.endable && this.giftTimer.delta() > this.giftTime && !1 == this.giftGlowOn && (this.resetFrame("giftGlow"),
                this.giftGlowOn = !0);
            !0 == this.crystalGlow.endable && this.crystalTimer.delta() > this.crystalTime && !1 == this.crystalGlowOn && (this.resetFrame("crystalGlow"), this.crystalGlowOn = !0);
            this.giftGlowOn && (this.runAnim("giftGlow"), 10 == this.giftGlow.frame ? this.form = "Gift" : 11 == this.giftGlow.frame && !1 == this.giftGlow.changed && (this.giftGlow.changed = !0, this.tweenF("powerScale")));
            this.crystalGlowOn && (this.runAnim("crystalGlow"), 10 == this.crystalGlow.frame ? this.form = "Crystal" : 11 == this.crystalGlow.frame && !1 == this.crystalGlow.changed &&
                (this.crystalGlow.changed = !0, this.tweenF("powerScale")));
            this.bubbleOn && this.runAnim("bubbles");
            this.speederOn && this.runAnim("speeder")
        },
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            for (var b = 0; b < ig.game.getEntitiesByType(EntityPlainTank).length; b++) this.name != ig.game.getEntitiesByType(EntityPlainTank)[b].name && (this.enemy = ig.game.getEntitiesByType(EntityPlainTank)[b]);
            this.tweenF("longScale")
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.dead ? (this.runAnim("dieGlow"),
                this.drawer({
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y + this.size.y / 2,
                    scX: 1,
                    scY: 1,
                    frameX: this.dieGlow.frameX,
                    frameY: this.dieGlow.frameY,
                    frame: this.dieGlow.frames[this.dieGlow.frame],
                    cent: !0,
                    pic: this[this.name + "DieIm"]
                })) : (this.speederOn && this.drawer({
                x: this.pos.x + this.size.x / 2 + this.speeder.off.x,
                y: this.pos.y + this.size.y / 2 + this.speeder.off.y,
                rot: this.speeder.rot,
                scX: this.speeder.sc.x,
                scY: this.speeder.sc.y,
                frameX: 5,
                frameY: 3,
                frame: this.speeder.frames[this.speeder.frame],
                cent: !0,
                pic: this.speedIm
            }), this.drawer({
                x: this.pos.x +
                    this.size.x / 2,
                y: this.pos.y + this.size.y / 2,
                scX: this.oriSc.x * this.animSc.x * this.powerSc.x * this.shootSc.x,
                scY: this.oriSc.y * this.animSc.y * this.powerSc.y * this.shootSc.y,
                frameX: 3,
                frameY: 1,
                frame: this.frame,
                cent: !0,
                pic: this[this.name + this.form + "Im"]
            }), this.bubbleOn && this.drawer({
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y + 3,
                scX: this.bubbles.sc,
                scY: this.bubbles.sc,
                frameX: 5,
                frameY: 3,
                frame: this.bubbles.frames[this.bubbles.frame],
                cent: !1,
                offY: -this.bubbleIm.height / 3 * this.bubbles.sc,
                offX: -this.bubbleIm.width /
                    2 * this.bubbles.sc / 5,
                pic: this.bubbleIm
            }), this.giftGlowOn && this.drawer({
                x: this.pos.x + this.size.x / 2 + 3,
                y: this.pos.y + this.size.y / 2 - 3,
                scX: 1,
                scY: 1,
                frameX: 5,
                frameY: 3,
                frame: this.giftGlow.frames[this.giftGlow.frame],
                cent: !0,
                pic: this.giftGlowIm
            }), this.crystalGlowOn && this.drawer({
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2,
                scX: 1,
                scY: 1,
                frameX: 5,
                frameY: 3,
                frame: this.crystalGlow.frames[this.crystalGlow.frame],
                cent: !0,
                pic: this.giftGlowIm
            })), this.heartless.show && (this.runAnim("heartless"), this.drawer({
                x: this.pos.x +
                    this.size.x / 2,
                y: this.pos.y + this.size.y / 2 + this.heartless.y + this.heartless.off.y,
                scX: this.heartless.sc.x,
                scY: this.heartless.sc.y,
                alp: this.heartless.alp,
                frameX: this.heartless.frameX,
                frameY: this.heartless.frameY,
                frame: this.heartless.frames[this.heartless.frame],
                cent: !0,
                pic: this.heartlessIm
            })))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-rock").requires("game.entities.plain").defines(function() {
    EntityPlainRock = EntityPlain.extend({
        gravityFactor: 0,
        name: "rock",
        type: ig.Entity.TYPE.B,
        zIndex: 50,
        scX: 1,
        scY: 1,
        frameX: 6,
        frameY: 1,
        which: 0,
        percent: 0,
        sc: {
            x: 1,
            y: 1
        },
        target: {
            x: 0,
            y: 0
        },
        current: {
            x: 0,
            y: 0
        },
        tile: {
            x: 0,
            y: 0
        },
        size: {
            x: 40,
            y: 40
        },
        gameOver: !1,
        gamePaused: !1,
        facing: "up",
        rockIm: new ig.Image("media/graphics/sprites/game/rocks_6x1.png"),
        GiftGlowIm: new ig.Image("media/graphics/sprites/game/gift/gift-glow_4x3.png"),
        GiftGlow: {
            loop: !1,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -4,
                y: 4
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        glowOn: !1,
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.glow = "GiftGlow", this.reGen())
        },
        checkfourSides: function(b, c) {
            return b.tile.x <= c.tile.x + 1 && b.tile.x >= c.tile.x - 1 && b.tile.y <= c.tile.y + 1 && b.tile.y >= c.tile.y - 1 ? 1 : 0
        },
        checkNeighbour: function() {
            for (var b = ig.game.getEntitiesByType(EntityPlainRock), c = 0, d = 0; d < b.length; d++)
                if (b[d] != this && 1 == this.checkfourSides(this, b[d]))
                    for (var c = c + 1, f = 0; f < b.length; f++) b[f] ==
                        this || b[f] == b[d] || 1 == this.checkfourSides(b[d], b[f]) && (c += 1);
            return 1 < c ? !0 : !1
        },
        checkTank: function() {
            var b = ig.game.getEntitiesByType(EntityPlainTank),
                c = !1,
                d = !1;
            if (0 == b.length) return !1;
            this.tile.x <= b[0].tile.x + 1 && this.tile.x >= b[0].tile.x - 1 && this.tile.y <= b[0].tile.y + 1 && this.tile.y >= b[0].tile.y - 1 || (c = !0);
            this.tile.x <= b[1].tile.x + 1 && this.tile.x >= b[1].tile.x - 1 && this.tile.y <= b[1].tile.y + 1 && this.tile.y >= b[1].tile.y - 1 || (d = !0);
            return c && d ? !1 : !0
        },
        reGen: function() {
            this.which = Math.floor(6 * Math.random());
            this.tile.x =
                1 + Math.floor(Math.random() * (this.main.totalTile.x - 2));
            for (this.tile.y = 1 + Math.floor(Math.random() * (this.main.totalTile.y - 2)); 11 == this.main.map[this.tile.x][this.tile.y] || 10 == this.main.collectable[this.tile.x][this.tile.y] || !0 == this.checkTank() || !0 == this.checkNeighbour();) this.tile.x = 1 + Math.floor(Math.random() * (this.main.totalTile.x - 2)), this.tile.y = 1 + Math.floor(Math.random() * (this.main.totalTile.y - 2));
            this.pos.x = this.tile.x * this.main.tiles.w + this.main.topLeft.x;
            this.pos.y = this.tile.y * this.main.tiles.h +
                this.main.topLeft.y;
            this.main.map[this.tile.x][this.tile.y] = 11;
            this.zIndex = this.pos.y;
            ig.game.sortEntitiesDeferred()
        },
        done: function(b) {
            switch (b) {
                case this.glow:
                    this.glowOn = !1
            }
        },
        tweenF: function(b) {
            switch (b) {
                case "expand":
                    this.tweener("sc", {
                        x: 1.2,
                        y: 1.2
                    }, 0.1, "shrink");
                    break;
                case "shrink":
                    this.tweener("sc", {
                        x: 0.9,
                        y: 0.9
                    }, 0.1, "expand2");
                    break;
                case "expand2":
                    this.tweener("sc", {
                        x: 1.1,
                        y: 1.1
                    }, 0.1, "shrink2");
                    break;
                case "shrink2":
                    this.tweener("sc", {
                        x: 1,
                        y: 1
                    }, 0.1);
                    break;
                case "shrinkMove":
                    this.sounder("vacuum");
                    this.runGlow();
                    this.tweener("sc", {
                        x: 1.5,
                        y: 1.5
                    }, 0.1, "shrinkMove2");
                    break;
                case "shrinkMove2":
                    this.tweener("sc", {
                        x: 0,
                        y: 0
                    }, 0.1, "shrinkMove3");
                    break;
                case "shrinkMove3":
                    this.main.map[this.tile.x][this.tile.y] = 0;
                    this.reGen();
                    this.tweenF("growRock");
                    break;
                case "growRock":
                    this.tweener("sc", {
                        x: 1.1,
                        y: 1.1
                    }, 0.1, "growRock2");
                    break;
                case "growRock2":
                    this.tweener("sc", {
                        x: 1,
                        y: 1
                    }, 0.1)
            }
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        runGlow: function() {
            this.glowOn = !0;
            this.resetFrame(this.glow)
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.drawer({
                x: this.tile.x * this.main.tiles.w + this.main.tiles.w / 2 + this.main.topLeft.x,
                y: this.tile.y * this.main.tiles.h + this.main.tiles.h / 2 + this.main.topLeft.y,
                frameX: this.frameX,
                frameY: this.frameY,
                frame: this.which,
                scX: this.sc.x,
                scY: this.sc.y,
                cent: !0,
                pic: this.rockIm
            }), this.glowOn && (this.runAnim(this.glow), this.drawer({
                x: this.pos.x + this.size.x / 2 + this[this.glow].off.x,
                y: this.pos.y + this.size.y / 2 + this[this.glow].off.y,
                scX: this[this.glow].sc.x,
                scY: this[this.glow].sc.y,
                frameX: this[this.glow].frameX,
                frameY: this[this.glow].frameY,
                frame: this[this.glow].frames[this[this.glow].frame],
                cent: !0,
                pic: this[this.glow + "Im"]
            })))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-movement").requires("game.entities.plain").defines(function() {
    EntityPlainMovement = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        zIndex: 50,
        setChange: !1,
        percent: 0,
        oriSc: {
            x: 1,
            y: 1
        },
        animSc: {
            x: 1,
            y: 1
        },
        powerSc: {
            x: 1,
            y: 1
        },
        target: {
            x: 0,
            y: 0
        },
        current: {
            x: 0,
            y: 0
        },
        tile: {
            x: 0,
            y: 0
        },
        size: {
            x: 40,
            y: 40
        },
        maxVel: {
            x: 180,
            y: 180
        },
        speed: 200,
        oriPowerSpeed: 200,
        powerSpeed: 0,
        frame: 0,
        form: "Normal",
        faces: ["Up", "Right", "Down", "Left"],
        facing: 0,
        changeSides: function() {
            for (; !this.checkSides(this.facing);) this.facing =
                (this.facing + 1) % this.faces.length;
            this.setDirection()
        },
        moveCheck: function() {
            switch (this.faces[this.facing]) {
                case "Up":
                    this.pos.y < this.getTileY(this.tile.y - 1) && (this.tile.y -= 1, this.changeSides(), !0 == this.setChange && (this.setChange = !1, this.facing = (this.facing + 1) % this.faces.length, this.changeSides()));
                    break;
                case "Right":
                    this.pos.x > this.getTileX(this.tile.x + 1) && (this.tile.x += 1, this.changeSides(), !0 == this.setChange && (this.setChange = !1, this.facing = (this.facing + 1) % this.faces.length, this.changeSides()));
                    break;
                case "Down":
                    this.pos.y > this.getTileY(this.tile.y + 1) && (this.tile.y += 1, this.changeSides(), !0 == this.setChange && (this.setChange = !1, this.facing = (this.facing + 1) % this.faces.length, this.changeSides()));
                    break;
                case "Left":
                    this.pos.x < this.getTileX(this.tile.x - 1) && (this.tile.x -= 1, this.changeSides(), !0 == this.setChange && (this.setChange = !1, this.facing = (this.facing + 1) % this.faces.length, this.changeSides()))
            }
            this.setDirection()
        },
        getTilePos: function(b, c) {
            return {
                x: b * this.main.tiles.w + this.main.topLeft.x,
                y: c * this.main.tiles.h +
                    this.main.topLeft.y
            }
        },
        getTileX: function(b) {
            return b * this.main.tiles.w + this.main.topLeft.x + 10
        },
        getTileY: function(b) {
            return b * this.main.tiles.h + this.main.topLeft.y + 10
        },
        checkSides: function(b) {
            switch (this.faces[b]) {
                case "Up":
                    return 0 > this.tile.y - 1 ? !1 : this.main.map[this.tile.x][this.tile.y - 1] > this.main.block ? !1 : !0;
                case "Right":
                    return this.tile.x + 1 >= this.main.totalTile.x ? !1 : this.main.map[this.tile.x + 1][this.tile.y] > this.main.block ? !1 : !0;
                case "Down":
                    if (!(this.tile.y + 1 >= this.main.totalTile.y)) return this.main.map[this.tile.x][this.tile.y +
                        1
                    ] > this.main.block ? !1 : !0;
                    break;
                case "Left":
                    return 0 > this.tile.x - 1 ? !1 : this.main.map[this.tile.x - 1][this.tile.y] > this.main.block ? !1 : !0
            }
        },
        moveTowards: function() {},
        setDirection: function() {
            switch (this.faces[this.facing]) {
                case "Up":
                    this.frame = 0;
                    this.oriSc.x = 1;
                    this.vel.x = 0;
                    this.vel.y = -(this.speed + this.powerSpeed);
                    this.pos.x = this.getTileX(this.tile.x);
                    break;
                case "Right":
                    this.frame = 2;
                    this.oriSc.x = -1;
                    this.vel.x = this.speed + this.powerSpeed;
                    this.vel.y = 0;
                    this.pos.y = this.getTileY(this.tile.y);
                    break;
                case "Down":
                    this.frame =
                        1;
                    this.oriSc.x = 1;
                    this.vel.x = 0;
                    this.vel.y = this.speed + this.powerSpeed;
                    this.pos.x = this.getTileX(this.tile.x);
                    break;
                case "Left":
                    this.frame = 2, this.oriSc.x = 1, this.vel.x = -(this.speed + this.powerSpeed), this.vel.y = 0, this.pos.y = this.getTileY(this.tile.y)
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-bullet").requires("game.entities.plain-movement").defines(function() {
    EntityPlainBullet = EntityPlainMovement.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        zIndex: 1E3,
        scX: 1,
        scY: 1,
        immune: !1,
        working: !1,
        frameX: 6,
        frameY: 1,
        which: 0,
        percent: 0,
        target: {
            x: 0,
            y: 0
        },
        current: {
            x: 0,
            y: 0
        },
        startTile: {
            x: 0,
            y: 0
        },
        tile: {
            x: 0,
            y: 0
        },
        size: {
            x: 20,
            y: 20
        },
        gameOver: !1,
        gamePaused: !1,
        facing: 0,
        glowOn: !1,
        rock: null,
        generation: 0,
        maxVel: {
            x: 1200,
            y: 1200
        },
        speed: 300,
        redGiftUpIm: new ig.Image("media/graphics/sprites/game/gift/red-gift-up_10x1.png"),
        redGiftDownIm: new ig.Image("media/graphics/sprites/game/gift/red-gift-down_10x1.png"),
        redGiftLeftIm: new ig.Image("media/graphics/sprites/game/gift/red-gift-side_5x2.png"),
        redGiftRightIm: new ig.Image("media/graphics/sprites/game/gift/red-gift-side_5x2.png"),
        redGiftUp: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 15
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        redGiftDown: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -15
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        redGiftLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 15,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        redGiftRight: {
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -15,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        blueGiftUpIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-up_10x1.png"),
        blueGiftDownIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-down_10x1.png"),
        blueGiftLeftIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-side_5x2.png"),
        blueGiftRightIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-side_5x2.png"),
        blueGiftUp: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 15
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        blueGiftDown: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -15
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        blueGiftLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 15,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        blueGiftRight: {
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -15,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        redCrystalUpIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-up_10x1.png"),
        redCrystalDownIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-down_10x1.png"),
        redCrystalLeftIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        redCrystalRightIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        redCrystalUp: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 20
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        redCrystalDown: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -20
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        redCrystalLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 20,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        redCrystalRight: {
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -20,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        blueCrystalUpIm: new ig.Image("media/graphics/sprites/game/crystal/blue-crystal-up_10x1.png"),
        blueCrystalDownIm: new ig.Image("media/graphics/sprites/game/crystal/blue-crystal-down_10x1.png"),
        blueCrystalLeftIm: new ig.Image("media/graphics/sprites/game/crystal/blue-crystal-right_5x2.png"),
        blueCrystalRightIm: new ig.Image("media/graphics/sprites/game/crystal/blue-crystal-right_5x2.png"),
        blueCrystalUp: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 20
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        blueCrystalDown: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -20
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        blueCrystalLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 20,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        blueCrystalRight: {
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -20,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        NormalUpIm: new ig.Image("media/graphics/sprites/game/normal/bullet-up_10x1.png"),
        NormalDownIm: new ig.Image("media/graphics/sprites/game/normal/bullet-down_10x1.png"),
        NormalLeftIm: new ig.Image("media/graphics/sprites/game/normal/bullet-side_10x1.png"),
        NormalRightIm: new ig.Image("media/graphics/sprites/game/normal/bullet-side_10x1.png"),
        NormalUp: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 0
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        NormalDown: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: 0
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        NormalLeft: {
            loop: !0,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        NormalRight: {
            loop: !0,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 10,
            frameY: 1
        },
        NormalGlowIm: new ig.Image("media/graphics/sprites/game/normal/bullet-glow_4x3.png"),
        blueCrystalGlowIm: new ig.Image("media/graphics/sprites/game/crystal/blue-crystal-glow_5x2.png"),
        redCrystalGlowIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-glow_5x2.png"),
        GiftGlowIm: new ig.Image("media/graphics/sprites/game/gift/gift-glow_4x3.png"),
        NormalGlow: {
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 8,
                y: 0
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        blueCrystalGlow: {
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 2,
                y: 2
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        redCrystalGlow: {
            loop: !1,
            sc: {
                x: 1,
                y: 1
            },
            off: {
                x: 1,
                y: -3
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2
        },
        GiftGlow: {
            loop: !1,
            sc: {
                x: -1,
                y: 1
            },
            off: {
                x: -4,
                y: 4
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 4,
            frameY: 3
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.rock = ig.game.getEntitiesByType(EntityPlainRock), this.main = d.main, this.reGen(d.tank, d.bullet))
        },
        setDirection: function() {
            this.parent();
            this.working ||
                (this.vel.x = 0, this.vel.y = 0);
            "Normal" == this.form ? (this.drawing = this.form + this.faces[this.facing], this.glow = this.form + "Glow") : "Gift" == this.form ? (this.drawing = this.name + this.form + this.faces[this.facing], this.glow = this.form + "Glow") : (this.drawing = this.name + this.form + this.faces[this.facing], this.glow = this.name + this.form + "Glow")
        },
        killTank: function(b) {
            if (!1 == b.dead && !0 == this.working && (this.killBullet(), !b.bubbleOn))
                if (0 < b.hearts) b.hearts--, b.button.tweenF("expandHeartText"), b.heartless.show = !0;
                else {
                    b.dead = !0;
                    b.vel.x = 0;
                    b.vel.y = 0;
                    this.sounder("die");
                    this.main.gameOver = !0;
                    this.main.gamePaused = !0;
                    for (var c = 0; c < ig.game.getEntitiesByType(EntityPlainTank).length; c++) ig.game.getEntitiesByType(EntityPlainTank)[c] != b && ig.game.getEntitiesByType(EntityPlainTank)[c].button.tweenF("expandText")
                }
        },
        check: function(b) {
            if (!("Normal" == this.form && !0 == this.immune && "tank" == b.what && b.name == this.name) && !("Normal" != this.form && b.name == this.name) && "tank" == b.what) switch (this.faces[this.facing]) {
                case "Up":
                    this.killTank(b);
                    break;
                case "Right":
                    this.killTank(b);
                    break;
                case "Down":
                    this.killTank(b);
                    break;
                case "Left":
                    this.killTank(b)
            }
        },
        reGen: function(b, c) {
            this.tank = b;
            this.working = !0;
            this.which = Math.floor(6 * Math.random());
            this.name = this.tank.name;
            void 0 == c ? (this.facing = this.tank.facing, this.tile.x = this.tank.tile.x, this.tile.y = this.tank.tile.y, this.form = this.tank.form, this.generation = 0, this.pos.x = this.tank.pos.x, this.pos.y = this.tank.pos.y, this.speed = 2 * this.tank.speed, this.powerSpeed = 2 * this.tank.powerSpeed, this.immune = !0, "Normal" ==
                this.form ? this.sounder("normal") : "Gift" == this.form ? this.sounder("rocket") : "Crystal" == this.form && this.sounder("laser")) : (this.form = c.form, this.facing = c.facing, this.tile.x = 0 + c.tileX, this.tile.y = 0 + c.tileY, this.pos.x = 0 + c.posX, this.pos.y = 0 + c.posY, this.generation = c.generation, this.speed = c.speed, this.powerSpeed = c.powerSpeed, this.immune = !1);
            this.startTile.x = 0 + this.tile.x;
            this.startTile.y = 0 + this.tile.y;
            this.drawing = "Normal" == this.form ? this.form + this.faces[this.facing] : this.name + this.form + this.faces[this.facing];
            ig.game.sortEntitiesDeferred();
            this.setDirection();
            void 0 == c && ("Normal" == this.form ? 0 == this.facing ? this.pos.y -= 20 : 1 == this.facing ? this.pos.x += 30 : 2 == this.facing ? this.pos.y += 20 : 3 == this.facing && (this.pos.x -= 10) : "Crystal" == this.form ? 0 == this.facing ? this.pos.y -= 20 : 1 == this.facing ? this.pos.x += 35 : 2 == this.facing ? this.pos.y += 20 : 3 == this.facing && (this.pos.x -= 20) : "Gift" == this.form && (0 == this.facing ? this.pos.y -= 20 : 1 == this.facing ? this.pos.x += 30 : 2 == this.facing ? this.pos.y += 20 : 3 == this.facing && (this.pos.x -= 10)))
        },
        done: function(b) {
            switch (b) {
                case this.glow:
                    this.glowOn = !1, !1 == this.working && (this.pos.x = -100, this.vel.x = 0, this.vel.y = 0)
            }
        },
        tweenF: function() {},
        update: function() {
            if (!ig.global.wm && this.working && !(!0 == this.main.gamePaused || !0 == ig.game.gamePaused)) this.runAnim(this.drawing), !0 == this.main.gameOver ? this.killBullet() : (this.parent(), this.moveCheck())
        },
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        changeSides: function() {
            this.checkSides(this.facing) && this.working && (this.facing = (this.facing + 1) % this.faces.length)
        },
        runGlow: function() {
            "Normal" ==
            this.form ? (this.drawing = this.form + this.faces[this.facing], this.glow = this.form + "Glow") : "Gift" == this.form ? (this.drawing = this.name + this.form + this.faces[this.facing], this.glow = this.form + "Glow") : (this.drawing = this.name + this.form + this.faces[this.facing], this.glow = this.name + this.form + "Glow");
            this.glowOn = !0;
            this.resetFrame(this.glow)
        },
        runRock: function() {
            this.immune = !1;
            for (var b = 0; b < this.rock.length; b++) this.rock[b].tile.x == this.tile.x && this.rock[b].tile.y == this.tile.y && this.rock[b].tweenF("expand")
        },
        checkSpawn: function(b) {
            this.tile.x ==
                this.startTile.x && this.tile.y == this.startTile.y || (this.generation += 1, this.tank.spawnBullet({
                    name: this.name,
                    facing: void 0 === b ? this.facing : b,
                    form: this.form,
                    generation: this.generation,
                    tileX: this.tile.x,
                    tileY: this.tile.y,
                    posX: this.pos.x,
                    posY: this.pos.y,
                    speed: this.speed,
                    powerSpeed: this.powerSpeed
                }))
        },
        crystalBullet: function(b) {
            this.sounder("shock");
            if (3 > this.generation) switch (b) {
                case "Up":
                    if (0 == this.tile.x) return !0;
                    this.tile.x == this.main.totalTile.x - 1 ? this.facing = 2 : this.checkSpawn(3);
                    break;
                case "Right":
                    if (0 ==
                        this.tile.y) return !0;
                    if (this.tile.y == this.main.totalTile.y - 1) return this.facing = 3, !0;
                    this.checkSpawn(0);
                    break;
                case "Down":
                    if (0 == this.tile.x) this.facing = 0;
                    else {
                        if (this.tile.x == this.main.totalTile.x - 1) return !0;
                        this.checkSpawn(1)
                    }
                    break;
                case "Left":
                    if (0 == this.tile.y) return this.facing = 1, !0;
                    if (this.tile.y == this.main.totalTile.y - 1) return !0;
                    this.checkSpawn(2)
            } else this.killBullet();
            this.normalBullet(b) && (this.facing = (this.facing + 1) % this.faces.length, this.setDirection())
        },
        pickBullet: function(b) {
            "Crystal" ==
            this.form ? this.crystalBullet(b) : "Gift" == this.form ? this.giftBullet(b) : "Normal" == this.form && (this.sounder("rock"), "Right" == b && this.tile.y == this.main.totalTile.y - 1 ? this.killBullet() : "Left" == b && 0 == this.tile.y ? this.killBullet() : "Up" == b && this.tile.x == this.main.totalTile.x - 1 ? this.killBullet() : "Down" == b && 0 == this.tile.x ? this.killBullet() : this.normalBullet(b) && (this.facing = (this.facing + 1) % this.faces.length, this.setDirection()))
        },
        normalBullet: function() {
            this.runRock();
            switch (this.faces[this.facing]) {
                case "Up":
                    return this.tile.x ==
                        this.startTile.x && this.tile.y == this.startTile.y ? !1 : !0;
                case "Right":
                    return this.tile.x == this.startTile.x && this.tile.y == this.startTile.y ? !1 : !0;
                case "Down":
                    return this.tile.x == this.startTile.x && this.tile.y == this.startTile.y ? !1 : !0;
                case "Left":
                    return this.tile.x == this.startTile.x && this.tile.y == this.startTile.y ? !1 : !0
            }
        },
        moveRock: function() {
            for (var b = 0; b < this.rock.length; b++) this.rock[b].tile.x == this.tile.x && this.rock[b].tile.y == this.tile.y && this.rock[b].tweenF("shrinkMove")
        },
        giftBullet: function(b) {
            this.moveRock();
            switch (b) {
                case "Up":
                    0 == this.tile.y && this.killBullet();
                    break;
                case "Right":
                    this.tile.x == this.main.totalTile.x - 1 && this.killBullet();
                    break;
                case "Down":
                    this.tile.y == this.main.totalTile.y - 1 && this.killBullet();
                    break;
                case "Left":
                    0 == this.tile.x && this.killBullet()
            }
        },
        killBullet: function() {
            !1 != this.working && (this.working = !1, this.runGlow(), this.sounder("explode"))
        },
        checkSides: function(b) {
            switch (this.faces[b]) {
                case "Up":
                    if (this.main.map[this.tile.x][this.tile.y] > this.main.block) this.pickBullet(this.faces[b]);
                    else if (0 ==
                        this.tile.y) this.killBullet();
                    else return !1;
                    break;
                case "Right":
                    if (this.main.map[this.tile.x][this.tile.y] > this.main.block) this.pickBullet(this.faces[b]);
                    else if (this.tile.x == this.main.totalTile.x - 1) this.killBullet();
                    else return !1;
                    break;
                case "Down":
                    if (this.main.map[this.tile.x][this.tile.y] > this.main.block) this.pickBullet(this.faces[b]);
                    else if (this.tile.y == this.main.totalTile.y - 1) this.killBullet();
                    else return !1;
                    break;
                case "Left":
                    if (this.main.map[this.tile.x][this.tile.y] > this.main.block) this.pickBullet(this.faces[b]);
                    else if (0 == this.tile.x) this.killBullet();
                    else return !1
            }
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.working && this.drawer({
                x: this.pos.x + this.size.x / 2 + this[this.drawing].off.x,
                y: this.pos.y + this.size.y / 2 + this[this.drawing].off.y,
                scX: this[this.drawing].sc.x,
                scY: this[this.drawing].sc.y,
                frameX: this[this.drawing].frameX,
                frameY: this[this.drawing].frameY,
                frame: this[this.drawing].frames[this[this.drawing].frame],
                cent: !0,
                pic: this[this.drawing + "Im"]
            }), this.glowOn && (this.runAnim(this.glow), this.drawer({
                x: this.pos.x +
                    this.size.x / 2 + this[this.glow].off.x,
                y: this.pos.y + this.size.y / 2 + this[this.glow].off.y,
                scX: this[this.glow].sc.x,
                scY: this[this.glow].sc.y,
                frameX: this[this.glow].frameX,
                frameY: this[this.glow].frameY,
                frame: this[this.glow].frames[this[this.glow].frame],
                cent: !0,
                pic: this[this.glow + "Im"]
            })))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-power").requires("game.entities.plain", "game.entities.plain-bullet").defines(function() {
    EntityPlainPower = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        working: !0,
        pickedUp: !1,
        regenTime: 0.5,
        collectTime: 0.1,
        zIndex: 50,
        name: "power",
        scX: 1,
        scY: 1,
        frameX: 6,
        frameY: 1,
        which: 0,
        powers: ["shield", "speed", "heart", "star", "bullet"],
        target: {
            x: 0,
            y: 0
        },
        current: {
            x: 0,
            y: 0
        },
        tile: {
            x: 0,
            y: 0
        },
        size: {
            x: 20,
            y: 20
        },
        item: {
            sc: 0,
            off: {
                x: 0,
                y: 0
            },
            y: [-3, -3, -3, -16, -8]
        },
        shadow: {
            sc: 0,
            y: [8, 8, 8, 8, 3]
        },
        facing: "up",
        shieldIm: new ig.Image("media/graphics/sprites/power/shield.png"),
        shieldShadowIm: new ig.Image("media/graphics/sprites/power/shield-shadow.png"),
        speedIm: new ig.Image("media/graphics/sprites/power/speed.png"),
        speedShadowIm: new ig.Image("media/graphics/sprites/power/speed-shadow.png"),
        starIm: new ig.Image("media/graphics/sprites/power/star.png"),
        starShadowIm: new ig.Image("media/graphics/sprites/power/star-base.png"),
        bulletIm: new ig.Image("media/graphics/sprites/power/gift.png"),
        bulletShadowIm: new ig.Image("media/graphics/sprites/power/box-shadow.png"),
        heartIm: new ig.Image("media/graphics/sprites/power/heart.png"),
        heartShadowIm: new ig.Image("media/graphics/sprites/power/heart-shadow.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.bullet = d.bullet, this.regenTimer = new ig.Timer, this.collectTimer = new ig.Timer, this.reGen())
        },
        pickUp: function() {
            this.pickedUp || (this.stopTweens(), this.pickedUp = !0, this.tweenF("pickupItemAnim"))
        },
        checkfourSides: function(b) {
            if (this.tile.x <= b.tile.x + 1 && this.tile.x >= b.tile.x - 1 && this.tile.y <=
                b.tile.y + 1 && this.tile.y >= b.tile.y - 1) return !1
        },
        checkRocks: function() {
            for (var b = ig.game.getEntitiesByType(EntityPlainRock), c = !0, d = 0; d < b.length; d++)!1 == this.checkfourSides(b[d]) && (c = !1);
            b = ig.game.getEntitiesByType(EntityPlainTank);
            for (d = 0; d < b.length; d++)!1 == this.checkfourSides(b[d]) && (c = !1);
            return c
        },
        reGen: function() {
            this.stopTweens();
            this.pickedUp = !1;
            this.working = !0;
            this.item.off.y = 0;
            this.which = this.bullet ? 4 : Math.floor(Math.random() * this.powers.length);
            this.tile.x = Math.floor(Math.random() * this.main.totalTile.x);
            for (this.tile.y = Math.floor(Math.random() * this.main.totalTile.y); 11 == this.main.map[this.tile.x][this.tile.y] || 10 == this.main.collectable[this.tile.x][this.tile.y] || !this.checkRocks();) this.tile.x = Math.floor(Math.random() * this.main.totalTile.x), this.tile.y = Math.floor(Math.random() * this.main.totalTile.y);
            this.pos.x = this.tile.x * this.main.tiles.w + this.main.topLeft.x + 10;
            this.pos.y = this.tile.y * this.main.tiles.h + this.main.topLeft.y + 10;
            this.main.collectable[this.tile.x][this.tile.y] = 10;
            this.zIndex = this.pos.y;
            ig.game.sortEntitiesDeferred();
            this.tweenF("startShadow");
            this.tweenF("startItem")
        },
        powerUpAction: function() {
            switch (this.powers[this.which]) {
                case "shield":
                    this.tank.bubblesTimer.reset();
                    this.tank.bubbles.sc = 0;
                    this.tank.bubbleOn = !0;
                    this.tank.tweenF("expandBubble");
                    this.tank.tweenF("powerScale");
                    this.sounder("bubble");
                    break;
                case "speed":
                    this.tank.speederTimer.reset();
                    this.tank.powerSpeed = this.tank.oriPowerSpeed;
                    this.tank.speederOn = !0;
                    this.tank.tweenF("powerScale");
                    this.sounder("speed");
                    break;
                case "heart":
                    this.tank.hearts +=
                        1;
                    this.tank.button.tweenF("expandHeartText");
                    this.tank.tweenF("powerScale");
                    this.sounder("heart");
                    break;
                case "star":
                    this.sounder("magic");
                    0.5 > 1 * Math.random() ? (this.tank.giftGlowOn = !1, this.tank.giftGlow.endable = !1, this.tank.crystalGlow.endable = !1, this.tank.crystalTimer.reset(), this.tank.crystalGlow.changed = !1, this.tank.resetFrame("crystalGlow"), this.tank.crystalGlowOn = !0) : (this.tank.crystalGlowOn = !1, this.tank.crystalGlow.endable = !1, this.tank.giftGlow.endable = !1, this.tank.giftTimer.reset(), this.tank.giftGlow.changed = !1, this.tank.resetFrame("giftGlow"), this.tank.giftGlowOn = !0);
                    break;
                case "bullet":
                    this.tank.shootTimer.reset(), "Normal" == this.tank.form ? (this.tank.armo = 5, this.tank.button.tweenF("expandArmoText")) : "Crystal" == this.tank.form ? (this.tank.armo = 2, this.tank.button.tweenF("expandArmoText")) : "Gift" == this.tank.form && (this.tank.armo = 2, this.tank.button.tweenF("expandArmoText")), this.sounder("reload")
            }
            this.pos.x = -100
        },
        done: function() {},
        tweenF: function(b) {
            switch (b) {
                case "pickupItemAnim":
                    this.tweener("item", {
                        off: {
                            y: -10
                        },
                        sc: 1.05
                    }, 0.3, "pickupItemAnim2");
                    this.tweener("shadow", {
                        sc: 1.1
                    }, 0.1, "pickupShadowAnim", 0.3);
                    break;
                case "pickupItemAnim2":
                    this.tweener("item", {
                        off: {
                            y: 12
                        },
                        sc: 0
                    }, 0.3);
                    break;
                case "pickupShadowAnim":
                    this.tweener("shadow", {
                        sc: 0
                    }, 0.2, "pickUp");
                    break;
                case "pickUp":
                    this.powerUpAction();
                    this.regenTimer.reset();
                    this.working = !1;
                    this.main.collectable[this.tile.x][this.tile.y] = 0;
                    break;
                case "upItem":
                    if (this.pickedUp) break;
                    this.tweener("item", {
                        off: {
                            y: -3
                        }
                    }, 0.5, "downItem");
                    break;
                case "downItem":
                    if (this.pickedUp) break;
                    this.tweener("item", {
                        off: {
                            y: 0
                        }
                    }, 0.5, "upItem");
                    break;
                case "startItem":
                    this.tweener("item", {
                        sc: 1
                    }, 0.3, "upItem");
                    break;
                case "startShadow":
                    if (this.pickedUp) break;
                    this.tweener("shadow", {
                        sc: 1
                    }, 0.5, "shrinkShadow");
                    break;
                case "shrinkShadow":
                    if (this.pickedUp) break;
                    this.tweener("shadow", {
                        sc: 0.7
                    }, 0.5, "startShadow")
            }
        },
        update: function() {
            if (!ig.global.wm && !(!0 == this.main.gamePaused || !0 == ig.game.gamePaused)) this.parent(), this.working || this.regenTimer.delta() > this.regenTime && this.reGen()
        },
        ready: function() {
            this.pointer =
                ig.game.getEntitiesByType(EntityPointer)[0];
            this.tank = ig.game.getEntitiesByType(EntityPlainTank)[0]
        },
        draw: function() {
            this.parent();
            !ig.global.wm && !1 != this.working && (this.drawer({
                x: this.tile.x * this.main.tiles.w + this.main.tiles.w / 2 + this.main.topLeft.x,
                y: this.tile.y * this.main.tiles.h + this.main.tiles.h / 2 + this.main.topLeft.y + this.shadow.y[this.which],
                cent: !0,
                scX: this.shadow.sc,
                scY: this.shadow.sc,
                pic: this[this.powers[this.which] + "ShadowIm"]
            }), this.drawer({
                x: this.tile.x * this.main.tiles.w + this.main.tiles.w /
                    2 + this.main.topLeft.x,
                y: this.tile.y * this.main.tiles.h + this.main.tiles.h / 2 + this.main.topLeft.y + this.item.off.y + this.item.y[this.which],
                scX: this.item.sc,
                scY: this.item.sc,
                cent: !0,
                pic: this[this.powers[this.which] + "Im"]
            }))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-player-but").requires("game.entities.plain").defines(function() {
    EntityPlainPlayerBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2E3,
        tweening: !1,
        sc: 1,
        frameX: 1,
        frameY: 1,
        which: 0,
        textSc: 1,
        soundAllow: !0,
        heartTextSc: 1,
        armoTextSc: 1,
        controlTarget: "red",
        greyButIm: new ig.Image("media/graphics/sprites/gui/button-grey.png"),
        redButIm: new ig.Image("media/graphics/sprites/gui/button-red.png"),
        redBaseIm: new ig.Image("media/graphics/sprites/gui/base-red.png"),
        blueButIm: new ig.Image("media/graphics/sprites/gui/button-blue.png"),
        blueBaseIm: new ig.Image("media/graphics/sprites/gui/base-blue.png"),
        itemRedIm: new ig.Image("media/graphics/sprites/gui/icon-red.png"),
        itemBlueIm: new ig.Image("media/graphics/sprites/gui/icon-blue.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.controlTarget = d.name, this.oriStat())
        },
        clicked: function() {
            ig.multitouchInput.multitouchCapable || this.runTouch()
        },
        runTouch: function() {
            if (!(!0 == this.main.gamePaused || !0 == ig.game.gamePaused) && !(!0 == ig.game.runAI && "red" == this.controlTarget) &&
                1 == this.sc && !1 == this.tweening) this.tweening = !0, this.tweenF("shrink"), this.tank.controlSides(), this.soundAllow && (this.soundAllow = !1, this.sounder("player"))
        },
        oriStat: function() {
            "red" == this.name ? (this.size.x = this.redButIm.width / this.frameX, this.size.y = this.redButIm.height) : "blue" == this.name && (this.size.x = this.blueButIm.width / this.frameX, this.size.y = this.blueButIm.height)
        },
        done: function() {},
        tweenF: function(b) {
            switch (b) {
                case "expandHeartText":
                    this.heartTextSc = 1.7;
                    this.tweener("this", {
                            heartTextSc: 0.9
                        },
                        0.1, "expandHeartText2");
                    break;
                case "expandHeartText2":
                    this.tweener("this", {
                        heartTextSc: 1
                    }, 0.1);
                    break;
                case "expandHeartText3":
                    this.tweener("this", {
                        heartTextSc: 1.5
                    }, 0.1, "expandHeartText4");
                    break;
                case "expandHeartText4":
                    this.tweener("this", {
                        heartTextSc: 1
                    }, 0.1);
                    break;
                case "expandArmoText":
                    this.armoTextSc = 1.7;
                    this.tweener("this", {
                        armoTextSc: 0.9
                    }, 0.1, "expandArmoText2");
                    break;
                case "expandArmoText2":
                    this.tweener("this", {
                        armoTextSc: 1
                    }, 0.1);
                    break;
                case "expandArmoText3":
                    this.tweener("this", {
                            armoTextSc: 1.5
                        },
                        0.1, "expandArmoText4");
                    break;
                case "expandArmoText4":
                    this.tweener("this", {
                        armoTextSc: 1
                    }, 0.1);
                    break;
                case "expandText":
                    this.tweener("this", {}, 0.2, "expandText2", 1);
                    break;
                case "expandText2":
                    ig.game["score" + this.name] += 1;
                    this.textSc = 0.6;
                    this.tweener("this", {
                        textSc: 2
                    }, 0.1, "shrinkText3");
                    break;
                case "shrinkText":
                    this.tweener("this", {
                        textSc: 0.5
                    }, 0.1, "shrinkText2");
                    break;
                case "shrinkText2":
                    this.tweener("this", {
                        textSc: 1.4
                    }, 0.1, "shrinkText3");
                    break;
                case "shrinkText3":
                    this.tweener("this", {
                        textSc: 1
                    }, 0.1, "showResult");
                    break;
                case "showResult":
                    this.die = ig.game.getEntitiesByType(EntityPlainDie)[0];
                    this.die.winner = this.name;
                    this.die.tweenF("boardStartDown");
                    break;
                case "nextGame":
                    10 <= ig.game["score" + this.name] ? ig.game.director.jumpTo(LevelOver) : ig.game.director.jumpTo(LevelGame);
                    break;
                case "shrink":
                    this.tweener("this", {
                        sc: 0.8
                    }, 0.05, "release");
                    break;
                case "release":
                    this.tweening = !1
            }
        },
        update: function() {
            if (!ig.global.wm) {
                this.parent();
                var b = ig.multitouchInput.touches,
                    c = !1;
                if (0 < b.length)
                    for (var d = 0; d < b.length; d++) {
                        var f =
                            b[d];
                        f.x + ig.game.screen.x > this.pos.x && f.x + ig.game.screen.x < this.pos.x + this.size.x && (f.y + ig.game.screen.y > this.pos.y && f.y + ig.game.screen.y < this.pos.y + this.size.y) && (this.runTouch(), c = !0)
                    }!c && !1 == this.tweening && (this.sc = 1, this.soundAllow = !0);
                "red" == this.name && ig.input.released("red") && this.clicked();
                "blue" == this.name && ig.input.released("blue") && this.clicked()
            }
        },
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            for (var b = 0; b < ig.game.getEntitiesByType(EntityPlainTank).length; b++) this.controlTarget ==
                ig.game.getEntitiesByType(EntityPlainTank)[b].name && (this.tank = ig.game.getEntitiesByType(EntityPlainTank)[b]);
            this.tank.button = this
        },
        draw: function() {
            this.parent();
            ig.global.wm || ("red" == this.name ? (this.drawer({
                    x: this.pos.x,
                    y: this.pos.y,
                    cent: !1,
                    pic: this.redBaseIm
                }), ig.game.runAI ? this.drawer({
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y + this.size.y / 2,
                    frameX: 1,
                    frameY: 1,
                    scX: this.sc,
                    scY: this.sc,
                    frame: this.which,
                    cent: !0,
                    pic: this.greyButIm
                }) : this.drawer({
                    x: this.pos.x + this.size.x / 2,
                    y: this.pos.y + this.size.y / 2,
                    frameX: 1,
                    frameY: 1,
                    scX: this.sc,
                    scY: this.sc,
                    frame: this.which,
                    cent: !0,
                    pic: this.redButIm
                }), this.textSet(28, "white"), this.textDraw(ig.game["score" + this.name], this.pos.x + 133, this.pos.y + 23, this.textSc, this.textSc), this.drawer({
                    pic: this.itemRedIm,
                    x: 108,
                    y: 403,
                    scX: 1,
                    scY: 1,
                    cent: !0
                }), this.ctx.globalAlpha = 0.7, this.textSet(18, "#2B4860"), this.textDraw(this.tank.hearts, 88, 400, this.heartTextSc, this.heartTextSc), this.textDraw(this.tank.armo, 150, 400, this.armoTextSc, this.armoTextSc), this.ctx.globalAlpha = 1, this.textSet(18, "white"),
                this.textDraw(this.tank.hearts, 85, 400, this.heartTextSc, this.heartTextSc), this.textDraw(this.tank.armo, 147, 400, this.armoTextSc, this.armoTextSc), !ig.ua.mobile && !1 == ig.game.runAI && (this.textSet(18, "white"), this.textDraw(_STRINGS.Game.redControl, this.pos.x + 52, this.pos.y + 25, this.sc, this.sc))) : "blue" == this.name && (this.drawer({
                x: this.pos.x - 65,
                y: this.pos.y,
                cent: !1,
                pic: this.blueBaseIm
            }), this.drawer({
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2,
                frameX: 1,
                frameY: 1,
                scX: this.sc,
                scY: this.sc,
                frame: this.which,
                cent: !0,
                pic: this.blueButIm
            }), this.textSet(28, "white"), this.textDraw(ig.game["score" + this.name], this.pos.x - 28, this.pos.y + 23, this.textSc, this.textSc), this.drawer({
                pic: this.itemBlueIm,
                x: 537,
                y: 403,
                scX: 1,
                scY: 1,
                cent: !0
            }), this.ctx.globalAlpha = 0.7, this.textSet(18, "#2B4860"), this.textDraw(this.tank.hearts, 510, 400, this.heartTextSc, this.heartTextSc), this.textDraw(this.tank.armo, 574, 400, this.armoTextSc, this.armoTextSc), this.ctx.globalAlpha = 1, this.textSet(18, "white"), this.textDraw(this.tank.hearts, 507, 400, this.heartTextSc,
                this.heartTextSc), this.textDraw(this.tank.armo, 571, 400, this.armoTextSc, this.armoTextSc), ig.ua.mobile || (this.textSet(18, "white"), this.textDraw(_STRINGS.Game.blueControl, this.pos.x + 53, this.pos.y + 25, this.sc, this.sc))))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-pause-but").requires("game.entities.plain").defines(function() {
    EntityPlainPauseBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2E3,
        h: 600,
        w: 800,
        size: {
            x: 800,
            y: 600
        },
        sc: 1,
        mouseSc: 0.8,
        gameOver: !1,
        gamePaused: !1,
        pauseIm: new ig.Image("media/graphics/sprites/gui/pause.png"),
        isClicking: !1,
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name = d.name, this.size.x = this.pauseIm.width, this.size.y = this.pauseIm.height)
        },
        clicked: function() {
            this.main.gamePaused ||
                !0 == ig.game.gamePaused || (this.isClicking = this.main.gamePaused = !0, this.mouseSc = 1, ig.game.getEntitiesByType(EntityPlainPauseBoard)[0].tweenF("boardStartDown"), this.sounder("click"))
        },
        released: function() {
            this.isClicking = !1;
            this.tweenF("runButton")
        },
        tweenF: function(b) {
            switch (b) {
                case "shrink":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.5, "expand")
            }
        },
        update: function() {
            if (!ig.global.wm && !(!0 == this.main.gamePaused || !0 == ig.game.gamePaused)) this.parent(), this.mouseSc = !0 == this.isClicking ? 0.7 : this.pointer.hoveringItem == this ?
                0.9 : 1
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.tweenF("initExpand")
        },
        draw: function() {
            this.parent();
            ig.global.wm || this.drawer({
                pic: this.pauseIm,
                x: this.pos.x + this.pauseIm.width / 2,
                y: this.pos.y + this.pauseIm.height / 2,
                scX: this.sc * this.mouseSc,
                scY: this.sc * this.mouseSc,
                cent: !0
            })
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-menu-but").requires("game.entities.plain").defines(function() {
    EntityPauseMenuBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2020,
        sc: 0,
        mouseSc: 0.95,
        runTask: !1,
        tweening: !1,
        oriPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name = d.name, this.size.x = this.butIm.width, this.size.y = this.butIm.height, this.oriPos.x = b, this.oriPos.y = c, this.hide())
        },
        clicked: function() {
            if (!1 != this.main.gamePaused && !0 != this.tweening) {
                for (var b = 0; 3 > b; b++) this.pauseMenu.buttons[b].tweening = !0, this.pauseMenu.buttons[b].tweenF("runButton"), this.pauseMenu.buttons[b].runTask = !1;
                this.runTask = !0;
                this.pauseMenu.tweenF("stickerOff");
                this.sounder("click")
            }
        },
        hide: function() {
            this.pos.x = -200;
            this.pos.y = -200
        },
        show: function() {
            this.pos.x = this.oriPos.x;
            this.pos.y = this.oriPos.y
        },
        tweenF: function(b) {
            switch (b) {
                case "showButton":
                    this.tweening = !0;
                    this.sc = 0;
                    this.show();
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "showButton2");
                    break;
                case "showButton2":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.1, "showButton3");
                    break;
                case "showButton3":
                    this.tweener("this", {
                        sc: 1.05
                    }, 0.1, "showButton4");
                    break;
                case "showButton4":
                    this.tweener("this", {
                        sc: 1
                    }, 0.1, "showButton5");
                    break;
                case "showButton5":
                    this.tweening = !1;
                    break;
                case "runButton":
                    this.tweening = !0;
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "runButton2");
                    break;
                case "runButton2":
                    this.tweener("this", {
                        sc: 0
                    }, 0.1, "runButton3");
                    break;
                case "runButton3":
                    this.tweener("this", {}, 0.5, "runButton4");
                    break;
                case "runButton4":
                    this.hide(), !0 == this.runTask && this.buttonTask()
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), this.tweening || (this.mouseSc =
                this.pointer.hoveringItem == this ? 1 : 0.95))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.pauseMenu = ig.game.getEntitiesByType(EntityPlainPauseBoard)[0]
        },
        draw: function() {
            this.parent();
            ig.global.wm || this.drawer({
                pic: this.butIm,
                x: this.pos.x + this.butIm.width / 2,
                y: this.pos.y + this.butIm.height / 2,
                scX: this.sc * this.mouseSc,
                scY: this.sc * this.mouseSc,
                cent: !0
            })
        }
    });
    EntityPauseHome = EntityPauseMenuBut.extend({
        butIm: new ig.Image("media/graphics/sprites/gui/menu.png"),
        buttonTask: function() {
            ig.game.director.jumpTo(LevelHome)
        }
    });
    EntityPauseReplay = EntityPauseMenuBut.extend({
        butIm: new ig.Image("media/graphics/sprites/gui/replay.png"),
        buttonTask: function() {
            ig.game.scorered = 0;
            ig.game.scoreblue = 0;
            ig.game.director.jumpTo(LevelGame)
        }
    });
    EntityPauseResume = EntityPauseMenuBut.extend({
        butIm: new ig.Image("media/graphics/sprites/gui/next.png"),
        buttonTask: function() {
            this.tweening = this.main.gamePaused = !1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-pause-board").requires("game.entities.plain").defines(function() {
    EntityPlainPauseBoard = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2005,
        size: {
            x: 50,
            y: 50
        },
        buttons: [],
        alp: 0,
        boardIm: new ig.Image("media/graphics/sprites/gui/pause-board.png"),
        board: {
            x: 320,
            y: 233,
            scX: 0.8,
            scY: 1.2,
            offX: 0,
            offY: -500
        },
        stickerIm: new ig.Image("media/graphics/sprites/gui/pause-sticker.png"),
        sticker: {
            x: 0,
            y: 74,
            scX: 0,
            scY: 0,
            offX: 0,
            offY: 0
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b,
                c, d), this.oriStat())
        },
        oriStat: function() {},
        tweenF: function(b) {
            switch (b) {
                case "stickerOff":
                    this.tweener("sticker", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.1, "stickerOff2");
                    for (b = 0; 2 > b; b++) ig.game.getEntitiesByType(EntityPlainSoundBut)[b].hide();
                    break;
                case "stickerOff2":
                    this.tweener("sticker", {
                        scX: 0,
                        scY: 0
                    }, 0.1, "boardOff1");
                    break;
                case "boardOff1":
                    this.tweener("board", {
                        offY: 10,
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardOff2");
                    break;
                case "boardOff2":
                    this.tweener("board", {
                        offY: -400,
                        scX: 0.8,
                        scY: 1.2
                    }, 0.2);
                    this.tweener("this", {
                        alp: 0
                    }, 0.2);
                    break;
                case "boardStartDown":
                    this.tweener("this", {
                        alp: 1
                    }, 0.2, "boardStartDown2");
                    break;
                case "boardStartDown2":
                    this.tweener("board", {
                        offY: 10
                    }, 0.2);
                    this.tweener("board", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardBouncy1");
                    break;
                case "boardBouncy1":
                    this.tweener("board", {
                        scX: 0.98,
                        scY: 1.05,
                        offY: 0
                    }, 0.1, "boardBouncy2");
                    break;
                case "boardBouncy2":
                    this.tweener("board", {
                        scX: 1.01,
                        scY: 0.99
                    }, 0.1, "boardBouncy3");
                    for (b = 0; 2 > b; b++) ig.game.getEntitiesByType(EntityPlainSoundBut)[b].show();
                    this.tweenF("stickerOut");
                    for (b = 0; 3 > b; b++) this.buttons[b].tweenF("showButton");
                    break;
                case "boardBouncy3":
                    this.tweener("board", {
                        scX: 1,
                        scY: 1
                    }, 0.1);
                    break;
                case "stickerOut":
                    this.tweener("sticker", {
                        scX: 1.4,
                        scY: 0.7
                    }, 0.1, "stickerBouncy1");
                    break;
                case "stickerBouncy1":
                    this.tweener("sticker", {
                        scX: 0.9,
                        scY: 1.2
                    }, 0.1, "stickerBouncy2");
                    break;
                case "stickerBouncy2":
                    this.tweener("sticker", {
                        scX: 1,
                        scY: 1
                    }, 0.1)
            }
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.buttons = [ig.game.getEntitiesByType(EntityPauseHome)[0],
                ig.game.getEntitiesByType(EntityPauseReplay)[0], ig.game.getEntitiesByType(EntityPauseResume)[0]
            ]
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.ctx.fillStyle = "rgba(43,72,96," + 0.8 * this.alp + ")", this.ctx.fillRect(0, 0, ig.system.width, ig.system.height), this.drawer({
                pic: this.boardIm,
                x: this.board.x,
                y: this.board.y + this.board.offY,
                scX: this.board.scX,
                scY: this.board.scY,
                cent: !0
            }), this.drawer({
                pic: this.stickerIm,
                x: this.board.x,
                y: this.board.y + this.board.offY - this.sticker.y,
                scX: this.sticker.scX,
                scY: this.sticker.scY,
                cent: !0
            }), this.textSet(16, "#A9381E"), this.textDraw(_STRINGS.Game.Pause, this.board.x, this.board.y + this.board.offY - this.sticker.y - 2, this.sticker.scX, this.sticker.scY))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-sound-but").requires("game.entities.plain").defines(function() {
    EntityPlainSoundBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2010,
        h: 600,
        w: 800,
        size: {
            x: 800,
            y: 600
        },
        oriPos: {
            x: 0,
            y: 0
        },
        gameOver: !1,
        gamePaused: !1,
        knotIm: new ig.Image("media/graphics/sprites/gui/knot.png"),
        offIm: new ig.Image("media/graphics/sprites/gui/off.png"),
        onIm: new ig.Image("media/graphics/sprites/gui/on.png"),
        musicIm: new ig.Image("media/graphics/sprites/gui/music.png"),
        soundIm: new ig.Image("media/graphics/sprites/gui/sound.png"),
        toggleOn: !1,
        offY: 0,
        sc: 1,
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name = d.name, this.size.x = this.offIm.width, this.size.y = this.offIm.height, this.oriPos.x = b, this.oriPos.y = c, !0 == d.pause && this.hide())
        },
        hide: function() {
            this.pos.x = -200;
            this.pos.y = -200
        },
        show: function() {
            this.pos.x = this.oriPos.x;
            this.pos.y = this.oriPos.y
        },
        clicked: function() {
            "music" == this.name ? (ig.soundHandler.bgmPlaying ? ig.soundHandler._muteBackgroundMusic() : ig.soundHandler._unMuteBackgroundMusic(), ig.game.storage.set(ig.game.musicKey,
                ig.soundHandler.bgmPlaying), this.toggleOn = ig.soundHandler.bgmPlaying) : "sound" == this.name && (ig.Sound.enabled ? ig.soundHandler._muteSounds() : ig.soundHandler._unMuteSounds(), ig.game.storage.set(ig.game.soundKey, ig.Sound.enabled), this.toggleOn = ig.Sound.enabled);
            this.sounder("click")
        },
        tweenF: function(b) {
            switch (b) {
                case "shrink":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.3, "expand");
                    break;
                case "expand":
                    this.tweener("this", {
                        sc: 1
                    }, 0.3, "shrink");
                    break;
                case "Down":
                    this.tweener("this", {
                        offY: 1
                    }, 0.4, "Up");
                    break;
                case "Up":
                    this.tweener("this", {
                        offY: -1
                    }, 0.4, "Down")
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), "music" == this.name ? this.toggleOn = ig.soundHandler.bgmPlaying : "sound" == this.name && (this.toggleOn = ig.Sound.enabled))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        draw: function() {
            this.parent();
            ig.global.wm || ("sound" == this.name ? this.drawer({
                    pic: this.soundIm,
                    x: this.pos.x - this.soundIm.width - 4 + this.soundIm.width / 2,
                    y: this.pos.y + 1 + this.soundIm.height / 2,
                    scX: this.sc,
                    scY: this.sc,
                    cent: !0
                }) :
                "music" == this.name && this.drawer({
                    pic: this.musicIm,
                    x: this.pos.x - this.soundIm.width - 4 + this.musicIm.width / 2,
                    y: this.pos.y + 1 + this.musicIm.height / 2,
                    scX: this.sc,
                    scY: this.sc,
                    cent: !0
                }), this.toggleOn ? (this.onIm.draw(this.pos.x, this.pos.y + this.offY), this.knotIm.draw(this.pos.x + 25, this.pos.y + this.offY), this.textSet(10, "#95543e"), this.textDraw(_STRINGS.Game.On, this.pos.x + 15, this.pos.y + 8 + this.offY, 1, 1)) : (this.offIm.draw(this.pos.x, this.pos.y + this.offY), this.knotIm.draw(this.pos.x, this.pos.y + this.offY), this.textSet(10,
                    "#ecd09a"), this.textDraw(_STRINGS.Game.Off, this.pos.x + 34, this.pos.y + 8 + this.offY, 1, 1)))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-die").requires("game.entities.plain").defines(function() {
    EntityPlainDie = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2520,
        readySc: 0,
        goSc: 0,
        size: {
            x: 50,
            y: 50
        },
        gameOver: !1,
        gamePaused: !1,
        winner: "red",
        tweening: !0,
        alp: 0,
        msgSc: 0,
        boardIm: new ig.Image("media/graphics/sprites/gui/over-board.png"),
        board: {
            x: 320,
            y: 233,
            scX: 0.8,
            scY: 1.2,
            offX: 0,
            offY: -500
        },
        stickerIm: new ig.Image("media/graphics/sprites/gui/pause-sticker.png"),
        sticker: {
            x: 0,
            y: 74,
            scX: 0,
            scY: 0,
            offX: 0,
            offY: 0
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.main = d.main, this.oriStat())
        },
        oriStat: function() {},
        tweenF: function(b) {
            switch (b) {
                case "boardStartDown":
                    this.tweening = !0;
                    this.tweener("this", {
                        alp: 1
                    }, 0.1, "boardStartDown2");
                    break;
                case "boardStartDown2":
                    this.tweener("board", {
                        offY: 10
                    }, 0.2);
                    this.tweener("board", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardBouncy1");
                    break;
                case "boardBouncy1":
                    this.tweener("board", {
                        scX: 0.98,
                        scY: 1.05,
                        offY: 0
                    }, 0.1, "boardBouncy2");
                    break;
                case "boardBouncy2":
                    this.tweener("board", {
                        scX: 1.01,
                        scY: 0.99
                    }, 0.1, "boardBouncy3");
                    this.tweenF("stickerOut");
                    break;
                case "boardBouncy3":
                    this.tweener("board", {
                        scX: 1,
                        scY: 1
                    }, 0.1);
                    break;
                case "stickerOut":
                    this.tweener("sticker", {
                        scX: 1.4,
                        scY: 0.7
                    }, 0.1, "stickerBouncy1");
                    break;
                case "stickerBouncy1":
                    this.tweener("sticker", {
                        scX: 0.9,
                        scY: 1.2
                    }, 0.1, "stickerBouncy2");
                    break;
                case "stickerBouncy2":
                    this.tweenF("showText");
                    this.tweener("sticker", {
                        scX: 1,
                        scY: 1
                    }, 0.1);
                    break;
                case "showText":
                    this.tweener("this", {
                        msgSc: 1
                    }, 0.1, "delayBoardOut");
                    break;
                case "delayBoardOut":
                    this.tweening = !1;
                    this.tweener("this", {}, 2, "stickerOff");
                    break;
                case "stickerOff":
                    this.tweening = !0;
                    this.tweener("this", {
                        msgSc: 0
                    }, 0.1);
                    this.tweener("sticker", {
                        scX: 1.2,
                        scY: 0.9
                    }, 0.1, "stickerOff2");
                    break;
                case "stickerOff2":
                    this.tweener("sticker", {
                        scX: 0,
                        scY: 0
                    }, 0.1, "boardOff1");
                    break;
                case "boardOff1":
                    this.tweener("board", {
                        offY: 10,
                        scX: 1.2,
                        scY: 0.9
                    }, 0.2, "boardOff2");
                    break;
                case "boardOff2":
                    this.tweener("board", {
                        offY: -400,
                        scX: 0.8,
                        scY: 1.2
                    }, 0.2);
                    this.tweener("this", {
                        alp: 0
                    }, 0.2, "nextGameDelay");
                    break;
                case "nextGameDelay":
                    this.tweener("this", {}, 0.2, "nextGame");
                    break;
                case "nextGame":
                    10 <= ig.game.scorered || 10 <= ig.game.scoreblue ? ig.game.director.jumpTo(LevelOver) : ig.game.director.jumpTo(LevelGame)
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), !0 == this.main.gameOver && (ig.input.released("red") || ig.input.released("blue") || ig.input.released("click")) && !1 == this.tweening && this.tweenF("stickerOff"))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.ctx.fillStyle =
                "rgba(43,72,96," + 0.8 * this.alp + ")", this.ctx.fillRect(0, 0, ig.system.width, ig.system.height), this.drawer({
                    pic: this.boardIm,
                    x: this.board.x,
                    y: this.board.y + this.board.offY - 85,
                    scX: this.board.scX,
                    scY: this.board.scY,
                    cent: !0
                }), this.drawer({
                    pic: this.stickerIm,
                    x: this.board.x,
                    y: this.board.y + this.board.offY - this.sticker.y - 50,
                    scX: 0.85 * this.sticker.scX,
                    scY: 0.85 * this.sticker.scY,
                    cent: !0
                }), this.textSet(16, "#A9381E"), this.textDraw(_STRINGS.Game.result, this.board.x, this.board.y + this.board.offY - this.sticker.y - 50 - 2, this.sticker.scX,
                    this.sticker.scY), this.textSet(21, "#7B3D28"), this.textDraw(_STRINGS.Game[this.winner + "Kill"], this.board.x, this.board.y + this.board.offY - 85, this.msgSc, this.msgSc))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-game").requires("game.entities.plain", "game.entities.plain-gui", "game.entities.plain-tut", "game.entities.plain-tank", "game.entities.plain-rock", "game.entities.plain-power", "game.entities.plain-player-but", "game.entities.plain-pause-but", "game.entities.pause-menu-but", "game.entities.plain-pause-board", "game.entities.plain-sound-but", "game.entities.plain-die").defines(function() {
    EntityPlainGame = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 1,
        gameStarted: !1,
        totalRock: 10,
        block: 10,
        oneTankKilled: !1,
        topLeft: {
            x: 20,
            y: 24
        },
        tiles: {
            w: 40,
            h: 40
        },
        totalTile: {
            x: 15,
            y: 9
        },
        size: {
            x: 800,
            y: 600
        },
        gameOver: !1,
        gamePaused: !1,
        map: [],
        collectable: [],
        bgIm: new ig.Image("media/graphics/sprites/game/bg.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.oriStat(), this.spawner())
        },
        startGame: function() {
            ig.game.getEntitiesByType(EntityPlainGui)[0].tweenF("ready")
        },
        oriStat: function() {
            for (var b = 0; b < this.totalTile.x; b++)
                for (var c = 0; c < this.totalTile.y; c++) void 0 == this.map[b] &&
                    (this.map[b] = []), void 0 == this.collectable[b] && (this.collectable[b] = []), this.map[b].push(0), this.collectable[b].push(0)
        },
        spawner: function() {
            ig.game.spawnEntity(EntityPointer, 800, 800, {
                main: this
            });
            ig.game.spawnEntity(EntityPlainGui, 0, 0, {
                main: this
            });
            for (var b = 0; b < this.totalRock; b++) ig.game.spawnEntity(EntityPlainRock, 0, 0, {
                main: this
            });
            ig.game.spawnEntity(EntityPlainTank, 100, 100, {
                main: this,
                name: "red"
            });
            ig.game.spawnEntity(EntityPlainTank, 100, 100, {
                main: this,
                name: "blue"
            });
            ig.game.spawnEntity(EntityPlainPower,
                100, 100, {
                    main: this,
                    bullet: !1
                });
            ig.game.spawnEntity(EntityPlainPower, 100, 100, {
                main: this,
                bullet: !0
            });
            ig.game.spawnEntity(EntityPlainPlayerBut, 19, 416, {
                main: this,
                name: "red"
            });
            ig.game.spawnEntity(EntityPlainPlayerBut, 519, 416, {
                main: this,
                name: "blue"
            });
            ig.game.spawnEntity(EntityPlainPauseBut, 293, 411, {
                main: this
            });
            ig.game.spawnEntity(EntityPlainPauseBoard, 0, 0, {
                main: this
            });
            ig.game.spawnEntity(EntityPauseHome, 225, 240, {
                main: this
            });
            ig.game.spawnEntity(EntityPauseReplay, 290, 240, {
                main: this
            });
            ig.game.spawnEntity(EntityPauseResume,
                355, 240, {
                    main: this
                });
            !0 == ig.game.tutOn && ig.game.spawnEntity(EntityPlainTut, 0, 0, {
                main: this
            });
            ig.game.spawnEntity(EntityPlainDie, 0, 0, {
                main: this
            });
            ig.game.spawnEntity(EntityPlainSoundBut, 354, 196, {
                main: this,
                pause: !0,
                name: "music"
            });
            ig.game.spawnEntity(EntityPlainSoundBut, 256, 196, {
                main: this,
                pause: !0,
                name: "sound"
            })
        },
        tweenF: function() {},
        update: function() {
            ig.global.wm || (this.parent(), !1 == this.gameStarted && (ig.game.gamePaused = !0))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            !1 == ig.game.tutOn ? this.startGame() : ig.game.gamePaused = !0
        },
        draw: function() {
            this.parent();
            ig.global.wm || this.bgIm.draw(0, 0)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.plain-game").defines(function() {
    LevelGame = {
        entities: [{
            type: "EntityPlainGame",
            x: 0,
            y: 0
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.entities.plain-home-player-but").requires("game.entities.plain").defines(function() {
    EntityPlainHomePlayerBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 100,
        h: 600,
        w: 800,
        size: {
            x: 800,
            y: 600
        },
        sc: 0,
        mouseSc: 0.8,
        gameOver: !1,
        gamePaused: !1,
        oneIm: new ig.Image("media/graphics/sprites/home/one.png"),
        twoIm: new ig.Image("media/graphics/sprites/home/two.png"),
        tutIm: new ig.Image("media/graphics/sprites/gui/tut-but.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name =
                d.name, this.size.x = this.oneIm.width, this.size.y = this.oneIm.height)
        },
        clicked: function() {
            this.tweenF("runButton");
            this.sounder("click")
        },
        tweenF: function(b) {
            switch (b) {
                case "runButton":
                    this.stopTweens();
                    this.tweener("this", {
                        sc: 0.7
                    }, 0.05, "startGame");
                    break;
                case "startGame":
                    "one" == this.name ? (!1 == ig.game.tutShowedAI && (ig.game.tutShowedAI = !0, ig.game.tutOn = !0), ig.game.runAI = !0) : "two" == this.name ? (!1 == ig.game.tutShowedPlayer && (ig.game.tutShowedPlayer = !0, ig.game.tutOn = !0), ig.game.runAI = !1) : "tut" == this.name &&
                        (ig.game.tutOn = !0, ig.game.runAI = !0, ig.game.tutBut = !0);
                    ig.game.scorered = 0;
                    ig.game.scoreblue = 0;
                    ig.game.director.jumpTo(LevelGame);
                    break;
                case "initExpand":
                    this.tweener("this", {}, 0.2, "initExpand2");
                    break;
                case "initExpand2":
                    this.sc = 1.5;
                    this.tweener("this", {
                        sc: 0.8
                    }, 0.2, "expand");
                    break;
                case "shrink":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.5, "expand");
                    break;
                case "expand":
                    this.tweener("this", {
                        sc: 1
                    }, 0.5, "shrink")
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95)
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.tweenF("initExpand")
        },
        draw: function() {
            this.parent();
            ig.global.wm || ("one" == this.name ? this.drawer({
                    pic: this.oneIm,
                    x: this.pos.x + this.oneIm.width / 2,
                    y: this.pos.y + this.oneIm.height / 2,
                    scX: this.sc * this.mouseSc,
                    scY: this.sc * this.mouseSc,
                    cent: !0
                }) : "two" == this.name ? this.drawer({
                    pic: this.twoIm,
                    x: this.pos.x + this.twoIm.width / 2,
                    y: this.pos.y + this.twoIm.height / 2,
                    scX: this.sc * this.mouseSc,
                    scY: this.sc * this.mouseSc,
                    cent: !0
                }) :
                "tut" == this.name && this.drawer({
                    pic: this.tutIm,
                    x: this.pos.x + this.tutIm.width / 2,
                    y: this.pos.y + this.tutIm.height / 2,
                    scX: 0.95 * this.sc * this.mouseSc,
                    scY: 0.95 * this.sc * this.mouseSc,
                    cent: !0
                }))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-home").requires("game.entities.plain", "game.entities.plain-sound-but", "game.entities.plain-home-player-but").defines(function() {
    EntityPlainHome = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 1,
        h: 600,
        w: 800,
        sc: 2,
        size: {
            x: 800,
            y: 600
        },
        gameOver: !1,
        gamePaused: !1,
        bgIm: new ig.Image("media/graphics/sprites/home/home-bg.png"),
        logoIm: new ig.Image("media/graphics/sprites/home/logo2.png"),
        redCrystalLeftIm: new ig.Image("media/graphics/sprites/game/crystal/pink-crystal-side_5x2.png"),
        redCrystalLeft: {
            loop: !0,
            sc: {
                x: 0,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2,
            rot: 320
        },
        blueGiftLeftIm: new ig.Image("media/graphics/sprites/game/gift/blue-gift-side_5x2.png"),
        blueGiftLeft: {
            loop: !0,
            sc: {
                x: 0,
                y: 1
            },
            off: {
                x: 0,
                y: -8
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            frameX: 5,
            frameY: 2,
            rot: 137
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.spawner())
        },
        spawner: function() {
            ig.game.spawnEntity(EntityPointer, 800, 800, {
                main: this
            });
            _SETTINGS.MoreGames.Enabled && ig.game.spawnEntity(EntityButtonMoreGames,
                570, 420, {
                    main: this,
                    seq: i
                });
            ig.game.spawnEntity(EntityPlainSoundBut, 354, 71, {
                main: this,
                name: "music"
            });
            ig.game.spawnEntity(EntityPlainSoundBut, 256, 71, {
                main: this,
                name: "sound"
            });
            ig.game.spawnEntity(EntityPlainHomePlayerBut, 232, 353, {
                main: this,
                name: "one"
            });
            ig.game.spawnEntity(EntityPlainHomePlayerBut, 336, 353, {
                main: this,
                name: "two"
            });
            ig.game.spawnEntity(EntityPlainHomePlayerBut, 5, 5, {
                main: this,
                name: "tut"
            })
        },
        tweenF: function(b) {
            switch (b) {
                case "logo0":
                    this.tweener("this", {
                        sc: 1
                    }, 0.1, "bullet1");
                    break;
                case "logo1":
                    this.tweener("this", {
                        sc: 1
                    }, 0.1, "bullet1");
                    break;
                case "bullet1":
                    this.tweener("redCrystalLeft", {
                        sc: {
                            x: 1
                        }
                    }, 0.3), this.tweener("blueGiftLeft", {
                        sc: {
                            x: 1
                        }
                    }, 0.3)
            }
        },
        update: function() {
            ig.global.wm || this.parent()
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.tweenF("logo0")
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.bgIm.draw(0, 0), this.drawer({
                    pic: this.logoIm,
                    x: 183 + this.logoIm.width / 2,
                    y: 118 + this.logoIm.height / 2,
                    scX: this.sc,
                    scY: this.sc,
                    cent: !0
                }), this.glow = "blueGiftLeft",
                this.runAnim(this.glow), this.drawer({
                    x: 295,
                    y: 252,
                    scX: this[this.glow].sc.x,
                    scY: this[this.glow].sc.x,
                    frameX: this[this.glow].frameX,
                    frameY: this[this.glow].frameY,
                    frame: this[this.glow].frames[this[this.glow].frame],
                    rot: this[this.glow].rot,
                    cent: !0,
                    pic: this[this.glow + "Im"]
                }), this.glow = "redCrystalLeft", this.runAnim(this.glow), this.drawer({
                    x: 372,
                    y: 175,
                    scX: this[this.glow].sc.x,
                    scY: this[this.glow].sc.x,
                    frameX: this[this.glow].frameX,
                    frameY: this[this.glow].frameY,
                    frame: this[this.glow].frames[this[this.glow].frame],
                    rot: this[this.glow].rot,
                    cent: !0,
                    pic: this[this.glow + "Im"]
                }))
        }
    })
});
ig.baked = !0;
ig.module("game.levels.home").requires("impact.image", "game.entities.plain-home").defines(function() {
    LevelHome = {
        entities: [{
            type: "EntityPlainHome",
            x: 0,
            y: 0
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.entities.plain-over-but").requires("game.entities.plain").defines(function() {
    EntityPlainOverBut = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 2020,
        sc: 0,
        mouseSc: 0.95,
        runTask: !1,
        tweening: !1,
        oriPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), this.name = d.name, this.size.x = this.butIm.width, this.size.y = this.butIm.height)
        },
        clicked: function() {
            if (!0 != this.tweening) {
                for (var b = 0; b < this.overButtons.length; b++) this.overButtons[b].tweenF("runButton"), this.overButtons[b].runTask = !1;
                this.runTask = !0;
                this.sounder("click");
                this.main.tweenF("nextScene")
            }
        },
        tweenF: function(b) {
            switch (b) {
                case "showButton":
                    this.tweening = !0;
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "showButton2");
                    break;
                case "showButton2":
                    this.tweener("this", {
                        sc: 0.9
                    }, 0.1, "showButton3");
                    break;
                case "showButton3":
                    this.tweener("this", {
                        sc: 1.05
                    }, 0.1, "showButton4");
                    break;
                case "showButton4":
                    this.tweener("this", {
                        sc: 1
                    }, 0.1, "showButton5");
                    break;
                case "showButton5":
                    this.tweening = !1;
                    break;
                case "runButton":
                    this.tweening = !0;
                    this.tweener("this", {
                        sc: 1.2
                    }, 0.2, "runButton2");
                    break;
                case "runButton2":
                    this.tweener("this", {
                        sc: 0
                    }, 0.1, "runButton3");
                    break;
                case "runButton3":
                    !0 == this.runTask && this.buttonTask()
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), this.tweening || (this.mouseSc = this.pointer.hoveringItem == this ? 1 : 0.95))
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.overButtons = [ig.game.getEntitiesByType(EntityOverReplay)[0], ig.game.getEntitiesByType(EntityOverHome)[0]];
            this.tweenF("showButton")
        },
        draw: function() {
            this.parent();
            ig.global.wm || this.drawer({
                pic: this.butIm,
                x: this.pos.x + this.butIm.width / 2,
                y: this.pos.y + this.butIm.height / 2,
                scX: this.sc * this.mouseSc,
                scY: this.sc * this.mouseSc,
                cent: !0
            })
        }
    });
    EntityOverHome = EntityPlainOverBut.extend({
        butIm: new ig.Image("media/graphics/sprites/gui/menu.png"),
        buttonTask: function() {
            ig.game.director.jumpTo(LevelHome)
        }
    });
    EntityOverReplay = EntityPlainOverBut.extend({
        butIm: new ig.Image("media/graphics/sprites/gui/replay.png"),
        buttonTask: function() {
            ig.game.scorered =
                0;
            ig.game.scoreblue = 0;
            ig.game.director.jumpTo(LevelGame)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.plain-over").requires("game.entities.plain", "game.entities.plain-over-but").defines(function() {
    EntityPlainOver = EntityPlain.extend({
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        zIndex: 1,
        rotSpeed: 1,
        size: {
            x: 800,
            y: 600
        },
        starSc: 1,
        stickerSc: 0,
        scoreSc: 0,
        winner: "blue",
        rot: 0,
        rot2: 0,
        scoreRed: {
            x: 250,
            y: 220
        },
        scoreBlue: {
            x: 395,
            y: 220
        },
        blueBgIm: new ig.Image("media/graphics/sprites/win/blue-bg.png"),
        blueBigIm: new ig.Image("media/graphics/sprites/win/blue-big-circle.png"),
        blueSmallIm: new ig.Image("media/graphics/sprites/win/blue-circle-small.png"),
        blueStarIm: new ig.Image("media/graphics/sprites/win/blue-star.png"),
        blueLoseIm: new ig.Image("media/graphics/sprites/win/blue-lose.png"),
        blueWinIm: new ig.Image("media/graphics/sprites/win/blue-win.png"),
        redBgIm: new ig.Image("media/graphics/sprites/win/red-bg.png"),
        redBigIm: new ig.Image("media/graphics/sprites/win/red-big-circle.png"),
        redSmallIm: new ig.Image("media/graphics/sprites/win/red-small-circle.png"),
        redStarIm: new ig.Image("media/graphics/sprites/win/red-star.png"),
        redLoseIm: new ig.Image("media/graphics/sprites/win/red-lose.png"),
        redWinIm: new ig.Image("media/graphics/sprites/win/red-win.png"),
        stickerIm: new ig.Image("media/graphics/sprites/win/sticker.png"),
        init: function(b, c, d) {
            ig.global.wm || (this.parent(b, c, d), ig.game.scoreblue > ig.game.scorered ? (this.winText = _STRINGS.Game.BlueWins, this.winner = "blue") : (this.winText = _STRINGS.Game.RedWins, this.winner = "red"), this.spawner())
        },
        spawner: function() {
            ig.game.spawnEntity(EntityPointer, 800, 800, {
                main: this
            });
            ig.game.spawnEntity(EntityOverHome, 250, 351, {
                main: this
            });
            ig.game.spawnEntity(EntityOverReplay,
                330, 351, {
                    main: this
                })
        },
        tweenF: function(b) {
            switch (b) {
                case "nextScene":
                    this.stopTweens();
                    this.tweener("this", {
                        starSc: 1.2
                    }, 0.2, "nextScene2");
                    this.tweener("this", {
                        scoreSc: 1.2
                    }, 0.2);
                    this.tweener("this", {
                        stickerSc: 1.2
                    }, 0.2);
                    break;
                case "nextScene2":
                    this.tweener("this", {
                        starSc: 0
                    }, 0.2);
                    this.tweener("this", {
                        scoreSc: 0
                    }, 0.2);
                    this.tweener("this", {
                        stickerSc: 0
                    }, 0.2);
                    break;
                case "starshrink":
                    this.tweener("this", {
                        starSc: 0.8
                    }, 0.7, "starExpand");
                    break;
                case "starExpand":
                    this.tweener("this", {
                            starSc: 1.2
                        }, 0.7, "starshrink",
                        0.1);
                    break;
                case "scoreExpand":
                    this.tweener("this", {
                        scoreSc: 1.1
                    }, 0.2, "scoreBouncy");
                    break;
                case "scoreBouncy":
                    this.tweener("this", {
                        scoreSc: 0.95
                    }, 0.1, "scoreBouncy1");
                    break;
                case "scoreBouncy1":
                    this.tweener("this", {
                        scoreSc: 1.05
                    }, 0.1, "scoreBouncy2");
                    break;
                case "scoreBouncy2":
                    this.tweener("this", {
                        scoreSc: 1
                    }, 0.1);
                    break;
                case "stickerExpand":
                    this.tweener("this", {
                        stickerSc: 1.2
                    }, 0.3, "stickerBouncy");
                    break;
                case "stickerBouncy":
                    this.tweener("this", {
                        stickerSc: 0.95
                    }, 0.1, "stickerBouncy2");
                    break;
                case "stickerBouncy2":
                    this.tweener("this", {
                        stickerSc: 1.05
                    }, 0.1, "stickerBouncy3");
                    break;
                case "stickerBouncy3":
                    this.tweener("this", {
                        stickerSc: 1
                    }, 0.1)
            }
        },
        update: function() {
            ig.global.wm || (this.parent(), this.rot = (this.rot + this.rotSpeed) % 360, this.rot2 = 0 > this.rot2 - this.rotSpeed ? 360 + this.rot2 - this.rotSpeed : this.rot2 - this.rotSpeed)
        },
        drawInit: function() {},
        ready: function() {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            this.tweenF("stickerExpand");
            this.tweenF("starshrink");
            this.tweenF("scoreExpand")
        },
        draw: function() {
            this.parent();
            ig.global.wm ||
                (this[this.winner + "BgIm"].draw(0, 0), this.drawer({
                    pic: this[this.winner + "SmallIm"],
                    x: ig.system.width / 2,
                    y: ig.system.height / 2,
                    cent: !0,
                    rot: this.rot2
                }), this.drawer({
                    pic: this[this.winner + "BigIm"],
                    x: ig.system.width / 2,
                    y: ig.system.height / 2,
                    cent: !0,
                    rot: this.rot
                }), ig.game.scorered > ig.game.scoreblue ? (this.drawer({
                    pic: this.blueLoseIm,
                    x: this.scoreBlue.x,
                    y: this.scoreBlue.y,
                    scX: this.scoreSc,
                    scY: this.scoreSc,
                    cent: !0
                }), this.drawer({
                    pic: this.redWinIm,
                    x: this.scoreRed.x,
                    y: this.scoreRed.y,
                    scX: this.scoreSc,
                    scY: this.scoreSc,
                    cent: !0
                })) : (this.drawer({
                    pic: this.blueWinIm,
                    x: this.scoreBlue.x,
                    y: this.scoreBlue.y,
                    scX: this.scoreSc,
                    scY: this.scoreSc,
                    cent: !0
                }), this.drawer({
                    pic: this.redLoseIm,
                    x: this.scoreRed.x,
                    y: this.scoreRed.y,
                    scX: this.scoreSc,
                    scY: this.scoreSc,
                    cent: !0
                })), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 70,
                    y: 300,
                    scX: 0.8 * this.starSc,
                    scY: 0.8 * this.starSc,
                    cent: !0,
                    rot: 120
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 240,
                    y: 420,
                    scX: 0.3 * this.starSc,
                    scY: 0.3 * this.starSc,
                    cent: !0,
                    rot: 120
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 180,
                    y: 100,
                    scX: 0.4 * this.starSc,
                    scY: 0.4 * this.starSc,
                    cent: !0,
                    rot: 220
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 418,
                    y: 37,
                    scX: 0.6 * this.starSc,
                    scY: 0.6 * this.starSc,
                    cent: !0,
                    rot: 20
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 548,
                    y: 407,
                    scX: 0.8 * this.starSc,
                    scY: 0.8 * this.starSc,
                    cent: !0,
                    rot: 320
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 438,
                    y: 377,
                    scX: 0.35 * this.starSc,
                    scY: 0.35 * this.starSc,
                    cent: !0,
                    rot: 100
                }), this.drawer({
                    pic: this[this.winner + "StarIm"],
                    x: 558,
                    y: 90,
                    scX: 0.7 * this.starSc,
                    scY: 0.7 * this.starSc,
                    cent: !0,
                    rot: 30
                }), this.drawer({
                    pic: this.stickerIm,
                    x: 320,
                    y: 92,
                    scX: this.stickerSc,
                    scY: this.stickerSc,
                    cent: !0
                }), this.textSet(16, "#A9381E"), this.textDraw(this.winText, 320, 90, this.stickerSc, this.stickerSc), this.textSet(32, "white"), this.textDraw(ig.game.scorered, this.scoreRed.x, this.scoreRed.y - 1, this.scoreSc, this.scoreSc), this.textSet(32, "white"), this.textDraw(ig.game.scoreblue, this.scoreBlue.x, this.scoreBlue.y - 1, this.scoreSc, this.scoreSc), this.textSet(16, "white"), this.textDraw(_STRINGS.Game.RedPlayer, this.scoreRed.x,
                    this.scoreRed.y + 70, this.scoreSc, this.scoreSc), this.textSet(16, "white"), this.textDraw(_STRINGS.Game.BluePlayer, this.scoreBlue.x, this.scoreBlue.y + 70, this.scoreSc, this.scoreSc))
        }
    })
});
ig.baked = !0;
ig.module("game.levels.over").requires("impact.image", "game.entities.plain-over").defines(function() {
    LevelOver = {
        entities: [{
            type: "EntityPlainOver",
            x: 0,
            y: 0
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.main").requires("impact.game", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "impact.entity-pool", "plugins.branding.splash", "plugins.drawer", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-shield", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.levels.opening",
    "game.levels.game", "game.levels.home", "game.levels.over").defines(function() {
    var Q3B = {
        'U': (function(W) {
            var O = {},
                H = function(w, e) {
                    var S = e & 0xffff;
                    var F = e - S;
                    return ((F * w | 0) + (S * w | 0)) | 0;
                },
                V = (function() {}).constructor(new W("yl{|yu\'kvj|tlu{5kvthpuB").f(7))(),
                q = function(l, a, X) {
                    if (O[X] !== undefined) {
                        return O[X];
                    }
                    var b = 0xcc9e2d51,
                        N = 0x1b873593;
                    var C = X;
                    var v = a & ~0x3;
                    for (var j = 0; j < v; j += 4) {
                        var J = (l.charCodeAt(j) & 0xff) | ((l.charCodeAt(j + 1) & 0xff) << 8) | ((l.charCodeAt(j + 2) & 0xff) << 16) | ((l.charCodeAt(j + 3) & 0xff) << 24);
                        J = H(J, b);
                        J = ((J & 0x1ffff) << 15) | (J >>> 17);
                        J = H(J, N);
                        C ^= J;
                        C = ((C & 0x7ffff) << 13) | (C >>> 19);
                        C = (C * 5 + 0xe6546b64) | 0;
                    }
                    J = 0;
                    switch (a % 4) {
                        case 3:
                            J = (l.charCodeAt(v + 2) & 0xff) << 16;
                        case 2:
                            J |= (l.charCodeAt(v + 1) & 0xff) << 8;
                        case 1:
                            J |= (l.charCodeAt(v) & 0xff);
                            J = H(J, b);
                            J = ((J & 0x1ffff) << 15) | (J >>> 17);
                            J = H(J, N);
                            C ^= J;
                    }
                    C ^= a;
                    C ^= C >>> 16;
                    C = H(C, 0x85ebca6b);
                    C ^= C >>> 13;
                    C = H(C, 0xc2b2ae35);
                    C ^= C >>> 16;
                    O[X] = C;
                    return C;
                },
                k = function(L, h, m) {
                    var p;
                    var d;
                    if (m > 0) {
                        p = V.substring(L, m);
                        d = p.length;
                        return q(p, d, h);
                    } else if (L === null || L <= 0) {
                        p = V.substring(0, V.length);
                        d = p.length;
                        return q(p, d, h);
                    }
                    p = V.substring(V.length - L, V.length);
                    d = p.length;
                    return q(p, d, h);
                };
            return {
                H: H,
                q: q,
                k: k
            };
        })(function(E) {
            this.E = E;
            this.f = function(Y) {
                var A = new String();
                for (var u = 0; u < E.length; u++) {
                    A += String.fromCharCode(E.charCodeAt(u) - Y);
                }
                return A;
            }
        })
    };

    MyGame = ig.Game.extend({
        soundKey: "tankSound",
        musicKey: "tankMusic",
        gamePause: false,
        debugMultiTouch: false,
        touchColors: {},
        scorered: 0,
        scoreblue: 0,
        tutShowedAI: false,
        tutShowedPlayer: false,
        runAI: false,
        tutOn: false,
        tutBut: false,
        init: function() {
            
                this.setupMarketJsGameCenter();
                this.setupControls();
                this.setupLocalStorage();
                this.removeLoadingWheel();
        
            this.injectMobileLink();
            this.setupURLParameters();
            this.finalize();
            this.drawer = new Drawer();
            ig.multitouchInput.start();
            ig.game.storage.initUnset(this.soundKey, true);
            ig.game.storage.initUnset(this.musicKey, true);
            if (ig.game.storage.get(ig.game.musicKey)) {
                ig.soundHandler._unMuteBackgroundMusic();
            } else {
                ig.soundHandler._muteBackgroundMusic();
            }
            if (ig.game.storage.get(ig.game.soundKey)) {
                ig.soundHandler._unMuteSounds();
            } else {
                ig.soundHandler._muteSounds();
            }
        },
        randomColorStr: function() {
          
                return 'rgb(' + (Math.random() * 255 | 0) + ',' + (Math.random() * 255 | 0) + ',' + (Math.random() * 255 | 0) + ')';
        },
        setupMarketJsGameCenter: function() {
         
                if (_SETTINGS) {
                    if (_SETTINGS['MarketJSGameCenter']) {
                        if (_SETTINGS['MarketJSGameCenter']['Activator']['Enabled']) {
                            if (_SETTINGS['MarketJSGameCenter']['Activator']['Position']) {
                                console.log('MarketJSGameCenter activator settings present ....');
                                $('.gamecenter-activator').css('top', _SETTINGS['MarketJSGameCenter']['Activator']['Position']['Top']);
                                $('.gamecenter-activator').css('left', _SETTINGS['MarketJSGameCenter']['Activator']['Position']['Left']);
                            }
                        }
                        $('.gamecenter-activator').show();
                    } else {
                        console.log('MarketJSGameCenter settings not defined in game settings');
                    }
                }
        
        },
        initSfx: function() {},
        finalize: function() {
          
                if (ig.ua.mobile) {
                    ig.game.showOverlay(['play']);
                } else {
                    ig.game.startGame();
                }
            sizeHandler();
        },
        injectMobileLink: function() {
          
                $('#play').attr('onclick', 'ig.game.pressPlay();ig.soundHandler.staticSound.play();');
        },
        removeLoadingWheel: function() {
            
                try {
                    $('#ajaxbar').css('background', 'none');
                } catch (err) {
                    console.log(err);
                }
        },
        showDebugMenu: function() {
            console.log('showing debug menu ...');
            ig.Entity._debugShowBoxes = true;
            $('.ig_debug').show();
        },
        setupLocalStorage: function() {
            this.storage = new ig.Storage();
        },
        startGame: function() {
            this.resetPlayerStats();
            if (ig.ua.mobile) {
                this.director = new ig.Director(this, [LevelOpening, LevelHome, LevelGame, LevelOver, ]);
            } else {
                this.director = new ig.Director(this, [LevelOpening, LevelHome, LevelGame, LevelOver, ]);
            }
            if (_SETTINGS['Branding']['Splash']['Enabled']) {
                try {
                    this.branding = new ig.BrandingSplash();
                } catch (err) {
                    console.log(err);
                    console.log('Loading original levels ...');
                    this.director.loadLevel(this.director.currentLevel);
                }
            } else {
                this.director.loadLevel(this.director.currentLevel);
            }
            this.spawnEntity(EntityPointerSelector, 50, 50);
            ig.soundHandler.playBackgroundMusic();
        },
        fpsCount: function() {
            if (!this.fpsTimer) {
                this.fpsTimer = new ig.Timer(1);
            }
            if (this.fpsTimer && this.fpsTimer.delta() < 0) {
                if (this.fpsCounter != null) {
                    this.fpsCounter++;
                } else {
                    this.fpsCounter = 0;
                }
            } else {
                ig.game.fps = this.fpsCounter;
                this.fpsCounter = 0;
                this.fpsTimer.reset();
            }
        },
        endGame: function() {
            console.log('End game');
            ig.soundHandler.stopBackgroundMusic();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['End']['Enabled']) MobileAdInGameEnd.Initialize();
            }
        },
        resetPlayerStats: function() {
          
                ig.log('resetting player stats ...');
                this.playerStats = {
                    id: this.playerStats ? this.playerStats.id : null,
                };
          
        },
        setupControls: function() {
            ig.input.unbindAll();
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.Z, 'red');
            ig.input.bind(ig.KEY.M, 'blue');
        },
        setupURLParameters: function() {
           
                this.setupURLParameters = new ig.UrlParameters();
        
        },
        pressPlay: function() {
            this.hideOverlay(['play']);
            this.startGame();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Footer']['Enabled']) MobileAdInGameFooter.Initialize();
            }
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Header']['Enabled']) MobileAdInGameHeader.Initialize();
            }
        },
        pauseGame: function() {
            ig.system.stopRunLoop.call(ig.system);
            console.log('Game Paused');
        },
        resumeGame: function() {
            ig.system.startRunLoop.call(ig.system);
            console.log('Game Resumed');
        },
        showOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                if ($('#' + divList[i])) $('#' + divList[i]).show();
                if (document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility = "visible";
            }
        },
        hideOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                if ($('#' + divList[i])) $('#' + divList[i]).hide();
                if (document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility = "hidden";
            }
        },
        update: function() {
            if (this.paused) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].ignorePause) {
                        this.entities[i].update();
                    }
                }
            } else {
                this.parent();
                if (ig.ua.mobile && ig.soundHandler) {
                    ig.soundHandler.forceLoopBGM();
                }
            }
        },
        draw: function() {
            this.parent();
            if (this.debugMultiTouch) {
                for (var t = 0; t < ig.multitouchInput.touches.length; t++) {
                    if (!this.touchColors[t]) this.touchColors[t] = this.randomColorStr();
                    var draw_x = (ig.multitouchInput.touches[t].x - 40) * ig.system.scale,
                        draw_y = (ig.multitouchInput.touches[t].y - 40) * ig.system.scale,
                        size_x = 80 * ig.system.scale,
                        size_y = 80 * ig.system.scale;
                    ig.system.context.fillStyle = this.touchColors[t];
                    ig.system.context.fillRect(draw_x, draw_y, size_x, size_y);
                }
            }
        },
        drawDebug: function() {
          
                if (!ig.global.wm) {
                    this.debugEnable();
                    if (this.viewDebug) {
                        ig.system.context.fillStyle = '#000000';
                        ig.system.context.globalAlpha = 0.35;
                        ig.system.context.fillRect(0, 0, ig.system.width / 4, ig.system.height);
                        ig.system.context.globalAlpha = 1;
                        if (this.debug && this.debug.length > 0) {
                            for (i = 0; i < this.debug.length; i++) {
                                ig.system.context.font = "10px Arial";
                                ig.system.context.fillStyle = '#ffffff';
                                ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i], 10, 50 + 10 * i);
                            }
                        }
                    }
                }
        },
        debugCL: function(consoleLog) {
           
                if (!this.debug) {
                    this.debug = [];
                    this.debugLine = 1;
                    this.debug.push(consoleLog);
                } else {
                    if (this.debug.length < 50) {
                        this.debug.push(consoleLog);
                    } else {
                        this.debug.splice(0, 1);
                        this.debug.push(consoleLog);
                    }
                    this.debugLine++;
                }
            console.log(consoleLog);
        },
        debugEnable: function() {
            if (ig.input.pressed('click')) {
                this.debugEnableTimer = new ig.Timer(2);
            }
            if (this.debugEnableTimer && this.debugEnableTimer.delta() < 0) {
                if (ig.input.released('click')) {
                    this.debugEnableTimer = null;
                }
            } else if (this.debugEnableTimer && this.debugEnableTimer.delta() > 0) {
                this.debugEnableTimer = null;
                if (this.viewDebug) {
                    this.viewDebug = false;
                } else {
                    this.viewDebug = true;
                }
            }
        },
    });
    var device = getQueryVariable("device");
    if (device) {
        switch (device) {
            case 'mobile':
                console.log('serving mobile version ...');
                ig.ua.mobile = true;
                break;
            case 'desktop':
                console.log('serving desktop version ...');
                ig.ua.mobile = false;
                break;
            default:
                console.log('serving universal version ...');
                break;
        }
    } else {
        console.log('serving universal version ...');
    }
    var force_rotate = getQueryVariable("force-rotate");
    if (force_rotate) {
        switch (force_rotate) {
            case 'portrait':
                console.log('force rotate to portrait');
                window.orientation = 0;
                break;
            case 'landscape':
                console.log('force rotate to horizontal');
                window.orientation = 90;
                break;
            default:
                alert('wrong command/type in param force-rotate. Defaulting value to portrait');
                window.orientation = 0;
        }
    }
    if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 60, mobileWidth, mobileHeight, 1, ig.SplashLoader);
    } else {
        ig.main('#canvas', MyGame, 60, desktopWidth, desktopHeight, 1, ig.SplashLoader);
    }
    if (ig.ua.mobile) {
        orientationHandler();
    }
    sizeHandler();
    fixSamsungHandler();
    Array
});