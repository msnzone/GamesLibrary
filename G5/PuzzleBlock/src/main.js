//window.addEventListener("load", function() { window. scrollTo(0, 0); });
var game

window.onload = function () {
    var config = {
        type: Phaser.CANVAS,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        scene: [LoadingBar, Main]
    };

    game = new Phaser.Game(config);
    window.focus()
}

var loadingProgress = 0
var loadingBarInt

var tiles = []
var tilesYs = []
var selectedTile = null
var dragNotAllowed = false
var fallingTilesCount = 0

var tileSize
var tileSize2
var tileSize3
var that

var ScoreAmountForSize_1 = 10
var ScoreAmountForSize_2 = ScoreAmountForSize_1 * 2 + 5
var ScoreAmountForSize_3 = ScoreAmountForSize_1 * 3 + 10
var ScoreAmountForSize_4 = ScoreAmountForSize_1 * 4 + 15

var highScore = 0
var aboutToRunScore = false
var scorePool = []
var score = 0

var aTileAlreadySelected = false
var tilesSpeed = 7

var firstTime = true
var pause = false
var columnsPos = []

var soundEffectOn = true
var rowsDestroyed = 0
var comboTextAngle = 0

var loseMenuIsActive = false
var destroyingTilesSpeed = 80

var tbScaleW
var tbScaleH
var tpScaleWH

var guidRunning = false
var guidStep = 1

var guidLevel1 = []
var guidLevel2 = []
var guidLevel3 = []

var pre_roll = true

class LoadingBar extends Phaser.Scene {
    constructor (){
        super('LoadingBar');
    }

    preload () { 
        this.load.image('loading_thing', 'assets/loading_thing.png');
        this.load.image('loading_leafs', 'assets/loading_leafs.png');
        this.load.image('loading_bar', 'assets/loading_bar.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create () {
        this.loadingBar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'loading_bar').setDepth(3)
        this.loadingBar.setScale(0.8)

        this.loadingBarLeafs = this.add.image(
            this.loadingBar.x - this.loadingBar.displayWidth /2 + 5, 
            this.loadingBar.y - this.loadingBar.displayHeight /2 , 
        'loading_leafs').setScale(0.7).setDepth(1)
       
        this.loadingBarThing = this.add.image(
            this.loadingBar.x - this.loadingBar.displayWidth /2, 
            this.loadingBar.y, 
        'loading_thing').setScale(0.7).setDepth(1).setOrigin(0, 0.5)
        this.loadingBarThing.x += this.loadingBarThing.width /2
        this.loadingBarThing.fullWidth = this.loadingBar.displayWidth - this.loadingBar.displayWidth / 17

        this.logo = this.add.image(
            this.loadingBar.x , 
            0,  
        'logo').setScale(0.5)
        this.logo.y = this.loadingBar.y - this.logo.height /3

        loadingBarInt = setInterval(() => {
            this.loadingBarThing.displayWidth = this.loadingBarThing.fullWidth * loadingProgress
            if (this.loadingBarThing.displayWidth == this.loadingBarThing.fullWidth) {
                if (!this.loadingBarThing.nvm) {
                    this.loadingBarThing.nvm = true
                    setTimeout(() => {
                        this.logo.destroy(true)
                        this.loadingBar.destroy(true)
                        this.loadingBarLeafs.destroy(true) 
                        this.loadingBarThing.destroy(true)
                    }, 500);
                }
            }
        }, 20) 
    }
}


class Main extends Phaser.Scene {
    constructor (){
        super({ key: 'Main', active: true });
    }

    preload ()
    {
        this.load.on('progress', function (value) {
            loadingProgress = value
        });

        this.load.image('tile_1x1_1_b1', 'assets/tile_1x1_1_b1.png');
        this.load.image('tile_1x1_2_b1', 'assets/tile_1x1_2_b1.png');
        this.load.image('tile_1x1_3_b1', 'assets/tile_1x1_3_b1.png');
        this.load.image('tile_1x1_4_b1', 'assets/tile_1x1_4_b1.png');
        this.load.image('tile_1x1_5_b1', 'assets/tile_1x1_5_b1.png');
    
        // this.load.image('tile_1x2_1_b2', 'assets/tile_1x2_1_b2.png');
        // this.load.image('tile_1x2_2_b2', 'assets/tile_1x2_2_b2.png');
        // this.load.image('tile_1x2_3_b2', 'assets/tile_1x2_3_b2.png');
        // this.load.image('tile_1x2_4_b2', 'assets/tile_1x2_4_b2.png');
        // this.load.image('tile_1x2_5_b2', 'assets/tile_1x2_5_b2.png');
    
        this.load.image('tile_1x1_1', 'assets/tile_1x1_1.png');
        this.load.image('tile_1x1_2', 'assets/tile_1x1_2.png');
        this.load.image('tile_1x1_3', 'assets/tile_1x1_3.png');
        this.load.image('tile_1x1_4', 'assets/tile_1x1_4.png');
        this.load.image('tile_1x1_5', 'assets/tile_1x1_5.png');
    
        this.load.image('tile_1x2_1', 'assets/tile_1x2_1.png');
        this.load.image('tile_1x2_2', 'assets/tile_1x2_2.png');
        this.load.image('tile_1x2_3', 'assets/tile_1x2_3.png');
        this.load.image('tile_1x2_4', 'assets/tile_1x2_4.png');
        this.load.image('tile_1x2_5', 'assets/tile_1x2_5.png');
    
        this.load.image('tile_1x3_1', 'assets/tile_1x3_1.png');
        this.load.image('tile_1x3_2', 'assets/tile_1x3_2.png');
        this.load.image('tile_1x3_3', 'assets/tile_1x3_3.png');
        this.load.image('tile_1x3_4', 'assets/tile_1x3_4.png');
        this.load.image('tile_1x3_5', 'assets/tile_1x3_5.png');
    
        this.load.image('tile_1x4_1', 'assets/tile_1x4_1.png');
        this.load.image('tile_1x4_2', 'assets/tile_1x4_2.png');
        this.load.image('tile_1x4_3', 'assets/tile_1x4_3.png');
        this.load.image('tile_1x4_4', 'assets/tile_1x4_4.png');
        this.load.image('tile_1x4_5', 'assets/tile_1x4_5.png');
    
        this.load.image('column', 'assets/column.png');
        this.load.image('cover', 'assets/cover.png');
    
        this.load.image('leaf1', 'assets/leaf_1.png');
    
        this.load.bitmapFont('font_white', 'assets/font_white.png', 'assets/font_white.xml');
        this.load.bitmapFont('font_orange', 'assets/font_orange.png', 'assets/font_orange.xml');

        this.load.image('bg_tiled', 'assets/bg_tiled.png');
        this.load.image('border', 'assets/border.png');
        this.load.image('topper', 'assets/topper.png'); //9
        this.load.image('boter', 'assets/boter.png');
        this.load.image('shadow', 'assets/shadow.png');
        this.load.image('bar', 'assets/bar.png');
        this.load.image('pause_menu', 'assets/pause_menu.png');
    
        this.load.image('btn_pause', 'assets/btn_pause.png');
        this.load.image('btn_pause_clicked', 'assets/btn_pause_clicked.png');
        this.load.image('btn_resume', 'assets/btn_resume.png');
        this.load.image('btn_resume_clicked', 'assets/btn_resume_clicked.png');
        this.load.image('btn_replay', 'assets/btn_replay.png');
        this.load.image('btn_replay_clicked', 'assets/btn_replay_clicked.png');
    
        this.load.image('btn_soundeffect_on', 'assets/btn_soundeffect_on.png');
        this.load.image('btn_soundeffect_off', 'assets/btn_soundeffect_off.png');
        this.load.image('btn_music_on', 'assets/btn_music_on.png');
        this.load.image('btn_music_off', 'assets/btn_music_off.png');
    
        this.load.atlas('pieces_5', 'assets/pieces_5.png', 'assets/pieces_4.json');
        this.load.atlas('pieces_4', 'assets/pieces_4.png', 'assets/pieces_4.json');
        this.load.atlas('pieces_3', 'assets/pieces_3.png', 'assets/pieces_4.json');
        this.load.atlas('pieces_2', 'assets/pieces_2.png', 'assets/pieces_4.json');
        this.load.atlas('pieces_1', 'assets/pieces_1.png', 'assets/pieces_4.json');
    
        this.load.audio('music', 'assets/audio/music.mp3');
        this.load.audio('click', 'assets/audio/click.mp3');
        this.load.audio('row', 'assets/audio/row.wav');
        this.load.audio('destroy', 'assets/audio/destroy.wav');

    
        this.load.image('emitter', 'assets/emitter2.png');
        this.load.image('inputBg', 'assets/inputBg.png');

        this.load.image('tohere1', 'assets/tohere_tile_1.png')
        this.load.image('tohere2', 'assets/tohere_tile_2.png')
        this.load.image('tohere3', 'assets/tohere_tile_3.png')
        this.load.image('hand', 'assets/hand.png')

        this.load.on('complete', function () {
            clearInterval(loadingBarInt)
        });
    }
  
    create() {
        that = this
    
        this.backgroundMusic = this.sound.add('music');
        this.backgroundMusic.play({
            loop: true,
            //volume: 0
            volume: 0.1
        });

        window["GD_OPTIONS"] = {
            "gameId": "30a47e3d81164f1b8ab2218494d09311",
            "onEvent": function(event) {
                switch (event.name) {
                    case "SDK_GAME_START":
                        // advertisement done, resume game logic and unmute audio
                        that.sound.mute = false
                        dragNotAllowed = false
                        guidRunning = false
                        break;
                    case "SDK_GAME_PAUSE":
                        // pause game logic / mute audio
                        that.sound.mute = true
                        dragNotAllowed = true
                        guidRunning = true
                        break;
                    case "SDK_GDPR_TRACKING":
                        // this event is triggered when your user doesn't want to be tracked
                        break;
                    case "SDK_GDPR_TARGETING":
                        // this event is triggered when your user doesn't want personalised targeting of ads and such
                        break;
                }
            },
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = '';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'gamedistribution-jssdk'));

        // --------------------------------------PAUSE MENU--------------------------------------- //
        this.pauseMenuGroup = this.add.group()
        this.pause_menu = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pause_menu').setOrigin(0.5, 0).setDepth(13).setVisible(false)
    
        this.btn_pause = this.add.image(0, 0, 'btn_pause').setOrigin(0, 0).setDepth(10).setInteractive()
        this.btn_pause.on('pointerdown', function () {
            that.btn_pause.setTexture('btn_pause_clicked')
            setTimeout(() => {
                that.btn_pause.setTexture('btn_pause')
            }, 700)
            clickSound ()
        })
        this.btn_pause.on('pointerup', function () {
            if (!guidRunning) {
                if (!loseMenuIsActive) {
                    pause = !pause
                    togglePauseMenu(pause)
                }
                that.btn_pause.setTexture('btn_pause')
            }
        })
    
        this.btn_resume = this.add.image(0, 0, 'btn_resume').setOrigin(0.5, 0.5).setDepth(15).setVisible(false).setInteractive()
        this.btn_resume.on('pointerdown', function () {
            that.btn_resume.setTexture('btn_resume_clicked')
            setTimeout(() => {
                that.btn_resume.setTexture('btn_resume')
            }, 700)
            clickSound ()
        })
        this.btn_resume.on('pointerup', function () {
            that.btn_resume.setTexture('btn_resume')
            pause = false
            togglePauseMenu(false)
        })
    
        this.btn_replay = this.add.image(0, 0, 'btn_replay').setOrigin(0.5, 0.5).setDepth(15).setVisible(false).setInteractive()
        this.btn_replay.on('pointerdown', function () {
            that.btn_replay.setTexture('btn_replay_clicked')
            setTimeout(() => {
                that.btn_replay.setTexture('btn_replay')
            }, 700)
            clickSound ()
        })

        this.btn_replay.on('pointerup', function () {

           

            that.btn_replay.setTexture('btn_replay')
            pause = true
            wreckingBall()
            togglePauseMenu(false)
        })
    
        this.btn_soundeffect = this.add.image(0, 0, 'btn_soundeffect_on').setOrigin(0.5, 0.5).setDepth(15).setVisible(false).setInteractive()
        this.btn_soundeffect.on('pointerdown', function () {
            clickSound ()
            if (soundEffectOn) {
                soundEffectOn = false
                that.btn_soundeffect.setTexture('btn_soundeffect_off')
            } else {
                soundEffectOn = true
                that.btn_soundeffect.setTexture('btn_soundeffect_on')
            }     
        })
    
        this.btn_music = this.add.image(0, 0, 'btn_music_on').setOrigin(0.5, 0.5).setDepth(15).setVisible(false).setInteractive()
        this.btn_music.on('pointerdown', function () {
            clickSound ()
            if (!that.backgroundMusic.mute) {
                that.backgroundMusic.mute = true
                that.btn_music.setTexture('btn_music_off')
            } else {
                that.backgroundMusic.mute = false
                that.btn_music.setTexture('btn_music_on')
            }     
        })
    
        function togglePauseMenu(makeVisible) {
            that.pauseMenuGroup.children.entries.forEach(function (child) {
                child.visible = makeVisible
            })
        }
    
        this.pauseMenuGroup.add(this.pause_menu)
        this.pauseMenuGroup.add(this.btn_resume)
        this.pauseMenuGroup.add(this.btn_replay)
        this.pauseMenuGroup.add(this.btn_soundeffect)
        this.pauseMenuGroup.add(this.btn_music)
        // --------------------------------------PAUSE MENU--------------------------------------- //
        // /////////////////////////////////////////////////////////////////////////////////////// //
        // --------------------------------------LOSE MENU---------------------------------------- //
        this.loseMenuGroup = this.add.group()
        this.loseScoreText = this.add.bitmapText(0, 0, 'font_white', 'Score').setDepth(20)
        this.loseScore = this.add.bitmapText(0, 0, 'font_white', '').setDepth(21)
        this.inputBg = this.add.image(0, 0, 'inputBg').setDepth(20)

        this.loseReplay = this.add.image(0, 0, 'btn_replay').setDepth(20).setInteractive()
        this.loseReplay.on('pointerdown', function () {
            that.loseReplay.setTexture('btn_replay_clicked')

        })
        this.loseReplay.on('pointerup', function () {

            
            setTimeout(() => {
                that.loseReplay.setTexture('btn_replay')
            }, 700)

            rePlay()
            loseMenuIsActive = false
            that.pause_menu.visible = false
            pause = false  
            that.loseMenuGroup.children.entries.forEach(child => {
                child.visible = false
            })
        })
        
        this.loseMenuGroup.add(this.loseScoreText)
        this.loseMenuGroup.add(this.loseScore)
        this.loseMenuGroup.add(this.inputBg)
        this.loseMenuGroup.add(this.loseReplay)

        this.loseMenuGroup.children.entries.forEach(child => {
            child.visible = false
        })

        this.input.keyboard.on('keydown_A', () => {
            doLose()
        })
        // --------------------------------------LOSE MENU---------------------------------------- //
        // /////////////////////////////////////////////////////////////////////////////////////// //
        // -----------------------------------------LEAFS----------------------------------------- //
        this.leaf1 = this.add.image(0, 0, 'leaf1').setOrigin(0, 0).setAngle(42)
        this.leaf2 = this.add.image(0, 0, 'leaf1').setOrigin(0, 0).setAngle(25)
        this.leaf5 = this.add.image(0, 0, 'leaf1').setOrigin(0, 0).setAngle(-60)
        this.leaf3 = this.add.image(0, 0, 'leaf1').setOrigin(0, 0).setAngle(-40)
        this.leaf4 = this.add.image(0, 0, 'leaf1').setOrigin(0, 0).setAngle(-28)
    
        this.leafs = []
        this.leafs.push(this.leaf1, this.leaf2, this.leaf3, this.leaf4, this.leaf5)
        moveLeafs()
        // -----------------------------------------LEAFS----------------------------------------- //
    
        this.topper = this.add.image(0, 0, 'topper').setOrigin(0.5, 0)
        this.boter = this.add.image(this.cameras.main.centerX, 0, 'boter').setOrigin(0.5, 0).setDepth(2)
        tpScaleWH = this.topper.width / this.topper.height
    
    
        //blur / dark the background when pause meniu is active
    
        this.shadow = this.add.image(0, 0, 'shadow').setOrigin(0, 0).setDepth(0)
    
        this.highScore = this.add.bitmapText(0, 0, 'font_orange', '0').setDepth(4)
        this.score = this.add.bitmapText(0, 0, 'font_orange', '0').setDepth(4)
        this.highScore.text = highScore
    
        callTextAlignmentor(that, true, null, null)
    
        this.cover = this.add.image(0, 0, 'cover').setOrigin(0.5, 0.5).setDepth(0)
    
        this.tiledBackground = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg_tiled').setOrigin(0.5, 0.5).setDepth(0)
    
        tbScaleH = this.tiledBackground.displayHeight / 200
        tbScaleW = this.tiledBackground.displayWidth / 200
    
        this.borderImg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'border').setOrigin(0.5, 0.5).setDepth(10).setScale(1 - 0.02, 1 - 0.02)
    
        this.column = this.add.image(0, this.tiledBackground.y, 'column').setOrigin(0.5, 0.5).setDepth(0).setAlpha(0.75)
        this.column.visible = false
    
        this.tileGroup = this.add.group()
        this.barsGroup = this.add.group()

        reSize()
        window.addEventListener("resize", spliter, that);
    
        function spliter() {
            beforeReSize()
            reSize()
        }
    
        // window.addEventListener("orientationchange", function() {
        //     // Announce the new orientation number
        //     console.log(screen)
        // }, false);
    
        calcTilePos()
    
        if (CheckCookie()) {
            runGuid(1)
        } else {
            generateNewRow()
            pullUp()
        }

    
        this.input.on('dragstart', function (pointer, gameObject) {
            if (dragNotAllowed || pause) return
            if (gameObject.row == -1) return

            if (guidRunning) {
                if (gameObject.dragId !== guidStep) return
            }
    
            gameObject.y = gameObject.y
            selectedTile = gameObject
            aTileAlreadySelected = true
    
            if (gameObject.row !== -1) {
                this.column.visible = true
                this.column.displayWidth = selectedTile.displayWidth
            }
    
            let tilesInThisRow = []
    
            // for (var i = this.tileGroup.children.entries - 1 ; i >= 0 ; i --) {
            //     var tile = this.tileGroup.children.entries
            //     tile.y = Math.round(tile.y)
            //     if(tile.y == gameObject.y){ 
            //         tilesInThisRow.push([tile.x + tile.displayWidth /2, tile.x - tile.displayWidth /2])
            //     }
            // }
            this.tileGroup.children.entries.forEach(tile => {
                tile.y = Math.round(tile.y)
                if (tile.y == gameObject.y) {
                    tilesInThisRow.push([tile.x + tile.displayWidth / 2, tile.x - tile.displayWidth / 2])
                }
            })
    
            let tilesInThisRow_LeftSide = []
            let tilesInThisRow_RightSide = []
            tilesInThisRow.forEach(tile => {
    
                if (selectedTile.x - tile[0] >= 0) {
                    tilesInThisRow_LeftSide.push(tile[0])
                } else {
                    tilesInThisRow_RightSide.push(tile[1])
                }
            })
    
            tilesInThisRow_RightSide.push(this.tiledBackground.x + this.tiledBackground.displayWidth / 2)
    
            tilesInThisRow_RightSide.sort(function (a, b) {
                return a - b
            })
            tilesInThisRow_LeftSide.sort(function (a, b) {
                return b - a
            })
    
            if (tilesInThisRow_RightSide[1]) {
                tilesInThisRow_RightSide[0] = tilesInThisRow_RightSide[1]
            }
    
            selectedTile.maxAllowedX = tilesInThisRow_RightSide[0]
            selectedTile.minAllowedX = tilesInThisRow_LeftSide[0]
    
            //selectedTile.maxAllowedX[0] -= 100
    
            if (!selectedTile.minAllowedX) {
                selectedTile.minAllowedX = this.tiledBackground.x - this.tiledBackground.displayWidth / 2
            }
        }, this);
    
        this.dragXGoingToRight = true
        this.previousdragX
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (dragNotAllowed || !selectedTile || pause) return
            if (gameObject.y == this.tiledBackground.y + this.tiledBackground.displayHeight / 2) return
    
            if (this.previousdragX > dragX) {
                this.dragXGoingToRight = false
            } else {
                this.dragXGoingToRight = true
            }
    
            this.previousdragX = dragX
    
            if (this.dragXGoingToRight && dragX - selectedTile.displayWidth / 2 > selectedTile.minAllowedX) {
                if (dragX + selectedTile.displayWidth / 2 < selectedTile.maxAllowedX) {
                    gameObject.x = dragX;
                } else {
                    gameObject.x = selectedTile.maxAllowedX - selectedTile.displayWidth / 2
                }
            } else if (!this.dragXGoingToRight && dragX + selectedTile.displayWidth / 2 < selectedTile.maxAllowedX) {
                if (dragX - selectedTile.displayWidth / 2 > selectedTile.minAllowedX) {
                    gameObject.x = dragX
                } else {
                    gameObject.x = selectedTile.minAllowedX + selectedTile.displayWidth / 2
                }
            }
        }, this);
    
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (dragNotAllowed || pause) return
            if (gameObject.y == this.tiledBackground.y + this.tiledBackground.displayHeight / 2) return
    
            if (!aTileAlreadySelected) return

            
    
            selectedTile = null
            that.column.visible = false
    
            if (!dropped) {
                gameObject.x = that.column.x
                aTileAlreadySelected = false
            }

            if (gameObject.x !== gameObject.input.dragStartX) {

                if (guidRunning) {
                    if (guidStep == 1) {
                        if (gameObject.x == (that.tiledBackground.x - that.tiledBackground.displayWidth /2) + tileSize * 7) {
                            pullDown(that, true)
                            guidStep = 2
                            handGuid(2)

                            guidLevel1[0].destroy()
                            guidLevel1[1].destroy()
                            clearInterval(guidLevel1[2])
                            clearInterval(guidLevel1[3])
                        }
                    } else if (guidStep == 2) {
                        if (gameObject.x == (that.tiledBackground.x - that.tiledBackground.displayWidth /2) + (tileSize * 5) + tileSize2) {
                            pullDown(that, true)
                            guidStep = 3
                            handGuid(3)

                            guidLevel2[0].destroy()
                            guidLevel2[1].destroy()
                            clearInterval(guidLevel2[2])
                            clearInterval(guidLevel2[3])
                        }
                    }else if (guidStep == 3) {
                        if (gameObject.x == (that.tiledBackground.x - that.tiledBackground.displayWidth /2) + (tileSize * 4) + tileSize2) {
                            pullDown(that, true)

                            guidLevel3[0].destroy()
                            guidLevel3[1].destroy()
                            clearInterval(guidLevel3[2])
                            clearInterval(guidLevel3[3])

                            setTimeout(() => {
                                finishGuid()
                            }, 500)
                        }
                    }
                } else {
                    pullDown(that)
                    comboTextAngle = Math.random() * 20 - 10
                }

                rowsDestroyed = 0
                if (soundEffectOn) {
                    that.sound.play('row')
                }
            }
        }, this);
    }
    
    update() {
        if (selectedTile) {
            if (selectedTile.x >= columnsPos[0] && selectedTile.x < columnsPos[1] + selectedTile.extra) {
                this.column.x = columnsPos[0] + selectedTile.displayWidth / 2
            } else if (selectedTile.x >= columnsPos[1] && selectedTile.x < columnsPos[2] + selectedTile.extra) {
                this.column.x = columnsPos[1] + selectedTile.displayWidth / 2
            } else if (selectedTile.x >= columnsPos[2] && selectedTile.x < columnsPos[3] + selectedTile.extra) {
                this.column.x = columnsPos[2] + selectedTile.displayWidth / 2
            } else if (selectedTile.x >= columnsPos[3] && selectedTile.x < columnsPos[4] + selectedTile.extra) {
                this.column.x = columnsPos[3] + selectedTile.displayWidth / 2
            } else if (selectedTile.x >= columnsPos[4] && selectedTile.x < columnsPos[5] + selectedTile.extra) {
                this.column.x = columnsPos[4] + selectedTile.displayWidth / 2
            } else if (selectedTile.x >= columnsPos[5] && selectedTile.x < columnsPos[6] + selectedTile.extra) {
                if (selectedTile.extra < tileSize3) {
                    this.column.x = columnsPos[5] + selectedTile.displayWidth / 2
                }
            } else if (selectedTile.x >= columnsPos[6] && selectedTile.x < columnsPos[7] + selectedTile.extra) {
                if (selectedTile.extra < tileSize) {
                    this.column.x = columnsPos[6] + selectedTile.displayWidth / 2
                }
            } else if (selectedTile.x >= columnsPos[7] && selectedTile.x < columnsPos[7] + this.tiledBackground.displayWidth - selectedTile.displayWidth / 2) {
                if (selectedTile.extra < tileSize2) {
                    this.column.x = columnsPos[7] + selectedTile.displayWidth / 2
                }
            }
        }
    }
}


function clickSound () {
    if (soundEffectOn) {
        that.sound.play('click')
    }
}

function rowDestroySound () {
    if (soundEffectOn) {
        that.sound.play('destroy', {
            volume: 0.1
        })
    }
}

function beforeReSize() {
    that.tileGroup.children.entries.forEach(tile => {
        var start = that.tiledBackground.x - that.tiledBackground.displayWidth / 2
        tile.paster = (tile.x - start) / that.tiledBackground.displayWidth
    })
}

function reSize(increase, decrease, scnd) {

    if (increase) {
        that.tiledBackground.displayHeight += tbScaleH
        that.tiledBackground.displayWidth += tbScaleW
        that.borderImg.displayHeight += tbScaleH
        that.borderImg.displayWidth += tbScaleW
    } else if (decrease) {
        that.tiledBackground.displayHeight -= tbScaleH
        that.tiledBackground.displayWidth -= tbScaleW
        that.borderImg.displayHeight -= tbScaleH
        that.borderImg.displayWidth -= tbScaleW
    }

    if (!scnd) {
        if (that.tiledBackground.displayWidth > window.innerWidth / 1.1) {
            reSize(false, true)
        } else if (that.tiledBackground.displayWidth < window.innerWidth / 1.15) {
            reSize(true, false)
        } else {
            reSize(null, null, true)
        }
    } else {
        if (that.tiledBackground.displayHeight > window.innerHeight / 1.5) {
            reSize(false, true, true)
        } else if (that.tiledBackground.displayHeight < window.innerHeight / 10) {
            reSize(true, false, true)
        } else {
            finished()
        }
    }

    function finished() {
        that.tiledBackground.displayHeight = Math.round(that.tiledBackground.displayHeight)
        that.tiledBackground.displayWidth = Math.round(that.tiledBackground.displayWidth)
        that.borderImg.displayHeight = Math.round(that.borderImg.displayHeight)
        that.borderImg.displayWidth = Math.round(that.borderImg.displayWidth)

        tileSize = Math.round(that.tiledBackground.displayHeight / 10)
        tileSize2 = tileSize / 2
        tileSize3 = tileSize + tileSize / 2

        that.tiledBackground.displayHeight = tileSize * 10
        that.tiledBackground.displayWidth = tileSize * 8

  
       // that.cameras.main.x = window.innerWidth /2

        //that.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight)
       // that.cameras.main.sceneMansager.game.config.width = window.innerWidth

       //game.canvas.width = window.innerWidth
       //game.canvas.height = window.innerHeight
   
    //    game.scale.resize(window.innerWidth, window.innerHeight);
    //    console.log(game)

        if (that.tileGroup) {
            that.tileGroup.children.entries.forEach(tile => {
                tile.displayWidth = tileSize * tile.size
                if (tile.row !== -1) {
                    tile.displayHeight = tileSize
                } else {
                    tile.displayHeight = tileSize2
                }
            })
        }

        if (!firstTime) {
            calcTilePos()
            that.tileGroup.children.entries.forEach(tile => {

                if (tile.row !== -1) {
                    tile.y = tilesYs[tile.row]
                } else {
                    tile.y = tilesYs[0] + tileSize
                }

                var start = that.tiledBackground.x - that.tiledBackground.displayWidth / 2
                tile.x = (tile.paster * that.tiledBackground.displayWidth) + (start)
                tile.extra = (tile.size - 1) * tileSize2
            })
        }
        firstTime = false

        that.borderImg.displayHeight = tileSize * 10 + tileSize / 2.9
        //that.borderImg.displayHeight = tileSize * 10 + tileSize / 3.27
        that.borderImg.displayWidth = tileSize * 8 + tileSize / 3.35
        that.borderImg.y = that.cameras.main.centerY - 1

        that.topper.displayWidth = that.tiledBackground.displayWidth
        that.topper.displayHeight = that.tiledBackground.displayWidth / tpScaleWH

        that.topper.x = that.cameras.main.centerX
        that.topper.y = (that.cameras.main.centerY - window.innerHeight / 2) - 2

        that.btn_pause.displayWidth = that.topper.displayWidth / 10
        that.btn_pause.displayHeight = that.btn_pause.displayWidth
        that.btn_pause.x = that.cameras.main.centerX + that.topper.displayWidth / 3.5
        that.btn_pause.y = that.topper.y + that.btn_pause.displayHeight / 7

        that.cover.displayHeight = that.borderImg.displayHeight - 10
        that.cover.displayWidth = that.borderImg.displayWidth - 5
        that.cover.x = that.borderImg.x + that.borderImg.displayWidth / 2.025
        that.cover.y = that.borderImg.y + that.borderImg.displayHeight / 2.02

        that.boter.displayWidth = that.borderImg.displayWidth
        that.boter.displayHeight = that.tiledBackground.displayHeight / 21

        that.boter.y = that.borderImg.y + that.borderImg.displayHeight / 2

        that.shadow.displayHeight = that.tiledBackground.displayHeight + that.tiledBackground.displayHeight / 3.55 + that.boter.displayHeight
        that.shadow.displayWidth = that.tiledBackground.displayWidth + that.tiledBackground.displayWidth / 3.44
        that.shadow.x = that.borderImg.x - that.shadow.displayWidth / 2 - 1
        that.shadow.y = that.borderImg.y - that.shadow.displayHeight / 2 + that.boter.displayHeight / 2

        that.leaf1.displayHeight = that.tiledBackground.displayWidth / 3.5
        that.leaf1.displayWidth = that.tiledBackground.displayWidth / 8
        that.leaf1.x = that.topper.x - that.tiledBackground.displayWidth / 2.6
        that.leaf1.y = that.topper.y - window.innerHeight / 18

        that.leaf2.displayHeight = that.tiledBackground.displayWidth / 3
        that.leaf2.displayWidth = that.tiledBackground.displayWidth / 7
        that.leaf2.x = that.topper.x - that.tiledBackground.displayWidth / 2.5
        that.leaf2.y = that.topper.y - window.innerHeight / 37

        that.leaf3.displayHeight = that.tiledBackground.displayWidth / 3.5
        that.leaf3.displayWidth = that.tiledBackground.displayWidth / 8
        that.leaf3.x = that.topper.x + that.tiledBackground.displayWidth / 3.4
        that.leaf3.y = that.topper.y + 5

        that.leaf4.displayHeight = that.tiledBackground.displayWidth / 2.5
        that.leaf4.displayWidth = that.tiledBackground.displayWidth / 6
        that.leaf4.x = that.topper.x + that.tiledBackground.displayWidth / 5.2
        that.leaf4.y = that.topper.y - 14

        that.leaf5.displayHeight = that.tiledBackground.displayWidth / 4.5
        that.leaf5.displayWidth = that.tiledBackground.displayWidth / 9
        that.leaf5.x = that.topper.x + that.tiledBackground.displayWidth / 3.2
        that.leaf5.y = that.topper.y + 5

        that.pause_menu.displayWidth = that.tiledBackground.displayWidth / 1.6
        that.pause_menu.displayHeight = that.tiledBackground.displayWidth / 1.2
        that.pause_menu.y = that.tiledBackground.y - that.tiledBackground.displayHeight / 1.75

        that.btn_resume.displayWidth = that.pause_menu.displayWidth / 1.7
        that.btn_resume.displayHeight = that.btn_resume.displayWidth / 2.5
        that.btn_resume.x = that.cameras.main.centerX
        that.btn_resume.y = that.pause_menu.y + that.pause_menu.displayHeight / 4

        that.btn_replay.displayWidth = that.pause_menu.displayWidth / 1.7
        that.btn_replay.displayHeight = that.btn_replay.displayWidth / 2.5
        that.btn_replay.x = that.cameras.main.centerX
        that.btn_replay.y = that.pause_menu.y + that.pause_menu.displayHeight / 2

        that.btn_soundeffect.displayWidth = that.btn_replay.displayHeight
        that.btn_soundeffect.displayHeight = that.btn_replay.displayHeight
        that.btn_soundeffect.x = that.cameras.main.centerX + that.pause_menu.displayWidth / 6
        that.btn_soundeffect.y = that.pause_menu.y + that.pause_menu.displayHeight / 1.34

        that.btn_music.displayWidth = that.btn_replay.displayHeight
        that.btn_music.displayHeight = that.btn_replay.displayHeight
        that.btn_music.x = that.cameras.main.centerX - that.pause_menu.displayWidth / 6
        that.btn_music.y = that.pause_menu.y + that.pause_menu.displayHeight / 1.34
    }

    callTextAlignmentor(that, null, null, true)
    that.barsGroup.clear(true)
    addBars()
    callTextAlignmentor(that, null, null, true)
}

function createNewTile(that, dragAllowed, position, widther, split) {
    var rndColor = Math.floor(Math.random() * 5 + 1)
    res = `tile_1x${widther}_${rndColor}`
    var extra = (widther - 1) * tileSize2

    var tile = that.add.image(that.cameras.main.centerX, 850, res).setOrigin(0.5, 0).setDepth(1).setInteractive()
    tile.displayWidth = tileSize * widther
    tile.displayHeight = tileSize2

    if (dragAllowed !== -1) {
        that.input.setDraggable(tile)
        tile.dragId = dragAllowed
    }

    tile.y = (that.tiledBackground.y + that.tiledBackground.displayHeight / 2)
    tile.x = (that.tiledBackground.x - that.tiledBackground.displayWidth / 2 - tile.displayWidth / 2) + position * tileSize
    tile.x += (widther - 2) * tileSize

    tile.size = widther
    tile.extra = extra
    tile.bounty = 0
    tile.color = rndColor
    tile.row = -1

    if (widther == 1) {
        var chance // the chance for bounty 1
        if (split) {
            chance = 0
        }else {
            chance = 0.1
        }
        if (Math.random() < chance) {
            tile.bounty = 1
            tile.setTexture(`tile_1x1_${rndColor}_b1`)
        }
    } 

    that.tileGroup.add(tile)
    addBars()
    updateTilePoints(that)
    updateTilePoints(that, true)
}

function addBars() {
    that.tileGroup.children.entries.forEach(tile => {
        if (tile.row == -1) {
            var bar = that.add.image(0, 0, 'bar').setOrigin(0.5, 0).setDepth(2)
            bar.displayWidth = tileSize * tile.size - 2
            bar.displayHeight = that.boter.displayHeight / 3
            bar.x = tile.x
            bar.y = that.boter.y + (that.boter.displayHeight / 2 - bar.displayHeight / 2)
            bar.size = tile.size - 2
            that.barsGroup.add(bar)
        }
    })
}

function pullUp(part) {
    dragNotAllowed = true
    var pulledSoFar = 0

    for (var i = 0; i < 30; i++) {
        setTimeout(() => {

            that.tileGroup.children.entries.forEach(tile => {
                tile.y -= (tileSize / 29.5)
                if (tile.row == -1 && pulledSoFar < 15) {
                    tile.displayHeight += (tileSize / 2) / 15
                }
            })
            pulledSoFar++
       
            if (pulledSoFar == 30) {

                var highestRow = 0
                if (!part) {
                    that.tileGroup.children.entries.forEach(tile => {
                        if (tile.row > highestRow) {
                            highestRow = tile.row
                        }
                    })
                } else {
                    highestRow = part + 1
                }

                that.tileGroup.children.entries.forEach(tile => {
                    tilesYs.forEach(ys => {
                        var aa = Math.abs(tile.y - ys)
                        if (aa < tileSize / 2) {
                            tile.y = ys
                        }
                    })
                    tile.row++
                })

                that.barsGroup.clear(true)
                if (part > 3 || !part) {
                    generateNewRow()
                } 
     
                updateTilePoints(that)
                updateTilePoints(that, true)

                if (highestRow < 2) {
                    pullUp()
                }else {
                    fallTiles(that)

                    var int2 = setInterval(() => {
                        var time1 = fallingTilesCount
                        setTimeout(() => {
                            var time2 = fallingTilesCount
                            if (time1 == 0 && time1 == time2) {
                                clearInterval(int2)
                                checkForFullRow(that, callback)
                            }
                        }, 10)
                    }, 100)
    
                    function callback() {
                        dragNotAllowed = false
                    }

                    if (part) {
                        runGuid(part + 1)
                    }

                    
                }   
            }
        }, i * tilesSpeed)
    }
}

function pullDown(that) {
    dragNotAllowed = true

    fallTiles(that, null, true)

    var int = setInterval(() => {
        var time1 = fallingTilesCount
        setTimeout(() => {
            var time2 = fallingTilesCount
            if (time1 == 0 && time1 == time2) {
                dragNotAllowed = false
                clearInterval(int)
                checkForFullRow(that, callback)
            }
        }, 10)
    }, 100)

    function callback() {
        if (loseCheck() === true) {
            wreckingBall(true)
        } else {
            if (!guidRunning) {
                pullUp()
            }
        }
    }
}

function updateTilePoints(that, updateTilesState) {
    if (!updateTilesState) {

        that.tileGroup.children.entries.forEach(tile => {
            if (tile.size == 1) {
                tile.points = [tile.x]
            } else if (tile.size == 2) {
                tile.points = [tile.x - tileSize2, tile.x + tileSize2]
            } else if (tile.size == 3) {
                tile.points = [tile.x - tileSize, tile.x, tile.x + tileSize]
            } else if (tile.size == 4) {
                tile.points = [tile.x - tileSize3, tile.x - tileSize2, tile.x + tileSize2, tile.x + tileSize3]
            }
        })
    } else {
        tiles.forEach(tiles => {
            tiles[2] = 0
        })

        that.tileGroup.children.entries.forEach(tile => {
            tile.points.forEach(point => {
                tiles.forEach(tiles => {
                    if (tiles[0] == Math.ceil(point) && tiles[1] == Math.ceil(tile.y)) {
                        tiles[2] = 1
                    }
                })
            })
        })
    }
}
//make row --
function fallTiles(that, onlyCheckThisTile) {

    updateTilePoints(that)
    updateTilePoints(that, true)
    //that.tileGroup.children.entries.sort((a, b) => a.y.toString().localeCompare(b.y));
    that.tileGroup.children.entries.sort((b, a) => a.row.toString().localeCompare(b.row));

    for (var i = that.tileGroup.children.entries.length -1 ; i >= 0 ; i--) {
        var tile = that.tileGroup.children.entries[i]

        var mustFall = true

        //tile.setTint(0xffffff)
        tiles.forEach(thisTiles => {
            tile.points.forEach(point => {
                if (thisTiles[1] == tile.y + (tileSize) && thisTiles[0] == Math.ceil(point) && thisTiles[2] == 1) {
                    mustFall = false
                    //tile.setTint(0xFF9800)
                }
               // console.log(thisTiles.row)
                // if (tile.row == 10) {
                //     mustFall = true
                // }
            })
        })

        if (mustFall &&
            Math.ceil(tile.y) !== Math.ceil(that.tiledBackground.y + that.tiledBackground.displayHeight / 2) &&
            Math.ceil(tile.y) !== Math.ceil((that.tiledBackground.y + that.tiledBackground.displayHeight / 2) - tileSize)) {

            if (onlyCheckThisTile) {
                if (tile.x == onlyCheckThisTile.x && tile.y == onlyCheckThisTile.y) {
                    makeThisTileFall(that, tile)
                }
            } else {
                makeThisTileFall(that, tile)
            }
        }
    }
}

function makeThisTileFall(that, tile) {
    tile.points.forEach(point => {
        tiles.forEach(tiles => {
            if (tiles[0] == Math.ceil(point) && tiles[1] == tile.y) {
                tiles[2] = 0
            }
        })
    })
    tile.row--
    fallingTilesCount++
    var pulledSoFar = 0

    for (var i = 0; i < 30; i++) {
        setTimeout(() => {
            tile.y += (tileSize / 29.5)

            pulledSoFar++

            if (pulledSoFar == 30) {

                that.tileGroup.children.entries.forEach(tile2 => {
                    tilesYs.forEach(ys => {
                        var aa = Math.abs(tile2.y - ys)
                        if (aa < tileSize / 2) {
                            tile2.y = ys
                        }
                    })
                })

                fallingTilesCount--

                tile.points.forEach(point => {
                    tiles.forEach(tiles => {
                        if (tiles[0] == Math.ceil(point) && tiles[1] == tile.y) {
                            tiles[2] = 1
                        }
                    })
                })

                if (tile.y <= Math.ceil(that.tiledBackground.y + that.tiledBackground.displayHeight / 2) - (tileSize * 2)) {
                    var emptyDown = true
                    tile.points.forEach(point => {
                        tiles.forEach(tiles => {
                            if (tiles[1] == tile.y + (tileSize) && tiles[0] == Math.ceil(point) && tiles[2] == 1) {
                                emptyDown = false
                            }
                        })
                    })

                    if (emptyDown) {
                        makeThisTileFall(that, tile)
                    }
                }
            }
        }, i * tilesSpeed)
    }
}

function checkForFullRow(that, callback) {

    var callbacks = 8
    var nvmTheCallback = false
    for (var i = 10 - 1; i >= 0; i--) {
        var counter = 0
        var row = null
        for (var l = 0; l < 8; l++) {
            row = tiles[l][1] - i * tileSize
            if (tiles[l + (i * 8)][2] == 1) {
                counter++
            }
        }

        if (counter !== 8) {
            callbacks--
        } else {
            nvmTheCallback = true
            var tilesToDestroy = []
            that.tileGroup.children.entries.forEach(tile => {
                if (tile.y == row) {
                    tilesToDestroy.push(tile)
                }
            })
            rowsDestroyed++
            rowsDestroyedChecker()
            checkForBounty(tilesToDestroy)
            noCallbackNeeded = false
            break
        }
    }

    if (!nvmTheCallback && callbacks < 8) {
        callback()
    }
}

function rowsDestroyedChecker () {
    if (rowsDestroyed > 1) {
        combo(rowsDestroyed)
    }
}

function checkForBounty(tilesToDestroy) {
    var foundAnyBounty = false
    tilesToDestroy.forEach(tile => {
        if (tile.bounty == 1) {
            foundAnyBounty = true
            
            for (var i = 0 ; i < Math.floor(Math.random() * 2 + 2) ; i++) {
                bounty1(tile, callback)
            }
        }
    })

    if (!foundAnyBounty) {
        callback()
    }

    function callback() {
        destroyTile(tilesToDestroy)
        noCallbackNeeded = true
    }
}

function destroyTile(tilesToDestroy) {
    tilesToDestroy.forEach(tile => {
        particles(that, tile)
        calcScore(tile)
        tile.destroy()
        scoreForShow (tile) 
    })
    rowDestroySound()
    updateTilePoints(that)
    updateTilePoints(that, true)

    setTimeout(() => {
        pullDown(that)
    }, 150)
}

function scoreForShow (tile, bounty) {
    var scoreAmount
    if (bounty) {
        scoreAmount = bounty
        tile.scoreBlock = true
    }else {
        if (tile.size == 1) {
            scoreAmount = ScoreAmountForSize_1
        } else if (tile.size == 2) {
            scoreAmount = ScoreAmountForSize_2
        } else if (tile.size == 3) {
            scoreAmount = ScoreAmountForSize_3
        } else if (tile.size == 4) {
            scoreAmount = ScoreAmountForSize_4
        }
    }

    if (!bounty && tile.scoreBlock) return

    var score = that.add.bitmapText(tile.x, tile.y, 'font_orange', scoreAmount).setOrigin(0, 0).setDepth(20)
    score.fontSize = tile.displayHeight / 2

    score.x += score.width
    score.scaleX += 0.01
    score.scaleY += 0.01

    for (var i = 0; i < 50; i++) {
        if (i < 10) {
            setTimeout(() => {
                score.scaleX += 0.05
                score.scaleY += 0.05

                score.x = tile.x - score.width / 2
                score.y = (tile.y + score.height / 2) - score.height / 2.3

            }, i * 15)

        } else {
            setTimeout(() => {
                score.alpha -= 0.05
                if (i == 49) {
                    score.destroy()
                }
            }, (i + 15) * 10)
        }
    }
}


function calcTilePos() {
    tiles = []
    tilesYs = []
    for (var i = 0; i < 10; i++) {
        for (var l = 0; l < 8; l++) {
            tiles.push([
                Math.ceil((that.tiledBackground.x - that.tiledBackground.displayWidth / 2) + tileSize2 + ((l) * tileSize)),
                Math.ceil((that.tiledBackground.y + that.tiledBackground.displayHeight / 2) - ((i + 1) * tileSize)),
                0
            ])
        }
        tilesYs.push(Math.ceil((that.tiledBackground.y + that.tiledBackground.displayHeight / 2) - ((i + 1) * tileSize)))
    }

    columnsPos = []
    for (var i = 0; i < 8; i++) {
        columnsPos.push((tileSize * i) + (that.tiledBackground.x - that.tiledBackground.displayWidth / 2))
    }

    that.column.displayHeight = that.tiledBackground.displayHeight
    that.column.y = that.tiledBackground.y + that.column.displayHeight / 2

    if (that.tileGroup) {
        updateTilePoints(that)
        updateTilePoints(that, true)
    }

}

function generateNewRow() {
    var rowLength
    var rowLengthSoFar = 0
    var rndNumb = [1, 2, 3, 4, 5, 6, 7, 8]
    // 0: open tile , 1: taken tile , -1: this is an open tile (always empty)
    var tilesState = [0, 0, 0, 0, 0, 0, 0, 0]

    var rnd = Math.random()
    if (rnd <= 0.05) {
        rowLength = 5
        choseAMustBeOpenTiles(3)
    } else if (rnd <= 0.3 && rnd > 0.2) {
        rowLength = 6
        choseAMustBeOpenTiles(2)
    } else {
        rowLength = 7
        choseAMustBeOpenTiles(1)
    }

    function choseAMustBeOpenTiles(repeat) {
        for (var i = 0; i < repeat; i++) {
            var rndChose = Math.floor(Math.random() * rndNumb.length)
            //mustBeOpenTiles.push(rndNumb[rndChose])
            tilesState[rndChose] = -1
            rndNumb.splice(rndChose, 1)
        }
    }

    var rndPool = [
        4, 4,
        3, 3, 3, 3, 3,
        2, 2, 2, 2, 2, 2, 2,
        1, 1, 1 
    ]

    proposalTile()

    function proposalTile() {
        var tileLength = rndPool[Math.floor(Math.random() * rndPool.length)]
        if (Math.random() > 0.5) {
            generateNewTile (tileLength)
        } else {
            generateNewTileTheOtherWay (tileLength)
        }
    }

    function generateNewTile(tileLength) {
        for (var i = 0; i < tilesState.length; i++) {
            if (tilesState[i] == 0) {
                var thisTileCanFitHere = true
                for (var l = 0; l < tileLength; l++) {
                    if (tilesState[i] == 0) {
                        if (tilesState[i + l] !== 0) {
                            thisTileCanFitHere = false
                        }
                    }
                }

                if (thisTileCanFitHere) {
                    if (tileLength == 1) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }

                    } else if (tileLength == 2) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }

                    } else if (tileLength == 3) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }
                        if (tilesState[i + 2] == 0) {
                            tilesState[i + 2] = 1
                        }

                    } else if (tileLength == 4) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }
                        if (tilesState[i + 2] == 0) {
                            tilesState[i + 2] = 1
                        }
                        if (tilesState[i + 3] == 0) {
                            tilesState[i + 3] = 1
                        }

                    }
                    createNewTile(that, 0, i + 2, tileLength)
                    rowLengthSoFar += tileLength
                    break
                }
            }
        }

        if (rowLengthSoFar < rowLength) {
            proposalTile()
        }
    }

    function generateNewTileTheOtherWay(tileLength) {
        for (var i = tilesState.length -1 ; i >= 0; i--) {
            if (tilesState[i] == 0) {
                var thisTileCanFitHere = true
                for (var l = 0; l < tileLength; l++) {
                    if (tilesState[i] == 0) {
                        if (tilesState[i + l] !== 0) {
                            thisTileCanFitHere = false
                        }
                    }
                }

                if (thisTileCanFitHere) {
                    if (tileLength == 1) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }

                    } else if (tileLength == 2) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }

                    } else if (tileLength == 3) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }
                        if (tilesState[i + 2] == 0) {
                            tilesState[i + 2] = 1
                        }

                    } else if (tileLength == 4) {

                        if (tilesState[i] == 0) {
                            tilesState[i] = 1
                        }
                        if (tilesState[i + 1] == 0) {
                            tilesState[i + 1] = 1
                        }
                        if (tilesState[i + 2] == 0) {
                            tilesState[i + 2] = 1
                        }
                        if (tilesState[i + 3] == 0) {
                            tilesState[i + 3] = 1
                        }

                    }
                    createNewTile(that, 0, i + 2, tileLength)
                    rowLengthSoFar += tileLength
                    break
                }
            }
        }

        if (rowLengthSoFar < rowLength) {
            proposalTile()
        }
    }
}



function calcScore(theTile, bounty1) {
    if (!bounty1) {
        scorePool.push([theTile.size, theTile.bounty])

        if (!aboutToRunScore) {
            aboutToRunScore = true
            setTimeout(() => {
                increaseScore()
            }, 100) // we need delay more than this before 2nd row destroys .... umm or do we?
        }
    } else {
        var scoreAmount = theTile.size * 25
        addScore(scoreAmount)
        scoreForShow(theTile, scoreAmount) 
    }
}

function increaseScore() {
    var ScoreAmountForABountyBlock = 50
    var scoreSoFar = 0

    scorePool.forEach(scores => {
        if (scores[1] == 0) {
            if (scores[0] == 1) {
                scoreSoFar += ScoreAmountForSize_1
            } else if (scores[0] == 2) {
                scoreSoFar += ScoreAmountForSize_2
            } else if (scores[0] == 3) {
                scoreSoFar += ScoreAmountForSize_3
            } else if (scores[0] == 4) {
                scoreSoFar += ScoreAmountForSize_4
            }
        }

        if (scores[1] == 1) {
            scoreSoFar += ScoreAmountForABountyBlock
        }
        
    })
    addScore(scoreSoFar)
    scorePool = []
    aboutToRunScore = false
}

function addScore(scoreAmount) {
    setTimeout(() => {
        score += scoreAmount
        that.score.setText(score)
        callTextAlignmentor(that, true, null, null)

        if (highScore < score) {
            highScore = score
            that.highScore.setText(highScore)
            callTextAlignmentor(that, null, true, null)
        }
    }, 300)
}

var moversCount = 0
var noCallbackNeeded = false

function bounty1(tile, callback) {

    var moreThanOneBlockTiles = []
    that.tileGroup.children.entries.forEach(tile => {
        if (tile.row !== -1 && !tile.bounty1Target) {
            moreThanOneBlockTiles.push(tile)
        }
    })

    var targetTile = moreThanOneBlockTiles[Math.floor(Math.random() * moreThanOneBlockTiles.length)]

    if (targetTile) {
        targetTile.bounty1Target = true
    }

    if (moreThanOneBlockTiles.length == 0) {
        if (!noCallbackNeeded) {
            callback()
        }
        return
    }
    var theAngle = calcAngleBetweenTwoPpoints(targetTile, tile)

    var explode_particle = that.add.particles('emitter').setDepth(20).createEmitter({
        lifespan: 700,
        speed: { min: 150, max: 200 },
        angle: { min: 0, max: 360 },
        gravityY: 0,
        scale: { start: 1, end: 0.5 },
        alpha: { start: 1, end: 0.5 },
        on: false,
        blendMode: 'ADD'
    });

    var move_particles = that.add.particles('emitter').setDepth(20);
    move_particles.createEmitter({
        x: 0,
        y: 0,
        lifespan: 600,
        speed: { min: 400, max: 500 },
        angle: { min: theAngle - 10, max: theAngle + 10 },
        gravityY: 0,
        scale: { start: 0.7, end: 0.3 },
        alpha: { start: 1, end: 0.4 },
        quantity: 1,
        blendMode: 'ADD'
    });

    move_particles.setPosition(tile.x, tile.y + tile.displayHeight /2);
    move_particles.rotation = theAngle + 180 * (Math.PI / 180)

    moversCount ++
    dragNotAllowed = true
    var tileX = targetTile.x
    var tileY = targetTile.y + targetTile.displayHeight /2

    var speed = that.tiledBackground.displayWidth /150
    var int = setInterval (() => {

        move_particles.x += speed * Math.cos(theAngle)
        move_particles.y += speed * Math.sin(theAngle)

        var howClose = 10
        if ((move_particles.x > tileX - howClose && move_particles.x < tileX + howClose) &&
        (move_particles.y > tileY - howClose && move_particles.y < tileY + howClose)) {

            explode_particle.emitParticleAt(move_particles.x, move_particles.y, 20);
            calcScore(targetTile, true)
            clearInterval(int)
            move_particles.destroy()
            splitter(targetTile)
            moversCount --
            
            if (moversCount == 0) {
                dragNotAllowed = false
                if (!noCallbackNeeded) {
                    callback()
                }
            }
        }

    }, 7)
}


function splitter (tile) {

    // if (tile.size == 2) 
    // {
    //     // if (Math.random() > 0.5) {
    //     //     createNewTile(that, -1, 1, true, tile.x - tileSize2, tile.y, tile.row, tile.color)
    //     // }else{
    //     //     createNewTile(that, -1, 1, true, tile.x + tileSize2, tile.y, tile.row, tile.color)
    //     // }
    // } 
    // else if (tile.size == 3) 
    // {
    //     //createNewTile(that, -1, 1, true, tile.x - tileSize, tile.y, tile.row, tile.color)
    //     //createNewTile(that, -1, 1, true, tile.x, tile.y, tile.row, tile.color)
    //     //createNewTile(that, -1, 1, true, tile.x + tileSize, tile.y, tile.row, tile.color)
    // }
    // else if (tile.size == 4) 
    // {
    //     //createNewTile(that, -1, 1, true, tile.x - tileSize3, tile.y, tile.row, tile.color)
    //     //createNewTile(that, -1, 1, true, tile.x - tileSize2, tile.y, tile.row, tile.color)
    //     //createNewTile(that, -1, 1, true, tile.x + tileSize2, tile.y, tile.row, tile.color)
    //     //createNewTile(that, -1, 1, true, tile.x + tileSize3, tile.y, tile.row, tile.color)
    // }

    particles(that, tile)
    tile.destroy()

    // updateTilePoints(that)
    // updateTilePoints(that, true)
}

function calcAngleBetweenTwoPpoints (point2, point1) {
    var p1 = {
        x: point1.x,
        y: point1.y
    };
    
    var p2 = {
        x: point2.x,
        y: point2.y
    };
    
    // angle in radians
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    
    // angle in degrees
    //return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

function combo(count) {

    var scoreAmount = count * 50
    addScore(50)
    var score = that.add.bitmapText(0, 0, 'font_orange', `Combo! ${count -1}x  +${scoreAmount}`).setOrigin(0.5, 0.5).setDepth(20)
    score.angle += comboTextAngle
    score.fontSize = tileSize / 2.5

    score.x = window.innerWidth /2 + score.width /2
    score.y = that.tiledBackground.y 

    for (var i = 0; i < 70; i++) {
        if (i < 10) {
            setTimeout(() => {
                score.scaleX += 0.045
                score.scaleY += 0.05

                score.x = window.innerWidth /2 + score.width /2
                score.y = that.tiledBackground.y 

            }, i * 15)

        } else {
            setTimeout(() => {
                score.alpha -= 0.05
                if (i == 69) {
                    score.destroy()
                }
            }, (i + 30) * 15)
        }
    }
}

function callTextAlignmentor(that, rightOne, leftOne, both) {
    if (rightOne) {
        textAlignmentor(true, that.score, that.topper, that.cameras.main.centerX)
    } else if (leftOne) {
        textAlignmentor(false, that.highScore, that.topper, that.cameras.main.centerX)
    } else if (both) {
        textAlignmentor(true, that.score, that.topper, that.cameras.main.centerX)
        textAlignmentor(false, that.highScore, that.topper, that.cameras.main.centerX)
    }
}

function textAlignmentor(rightOne, theText, topper, centerX) {
    theText.fontSize = topper.displayWidth / 13
    theText.y = (that.topper.y + that.topper.displayHeight / 2) - theText.height / 1.5;

    if (rightOne) {
        theText.x = (centerX + topper.displayWidth / 9.7) - theText.width / 2;
    } else {
        theText.x = (centerX - topper.displayWidth / 4.8) - theText.width / 2;
    }
}

function particles(that, tile) {

    var particles = that.add.particles(`pieces_${tile.color}`).setDepth(11).createEmitter({
        frame: ['1', '2', '3', '4', '5'],
        lifespan: 2000 * (tileSize / 59),
        quantity: 1,
        scale: 0.5 * (tileSize / 59),
        gravityY: 1110 * (tileSize / 59),
        speed: [50 * (tileSize / 59), 150 * (tileSize / 59)],
        // gravityY: 210 * (tileSize / 59),
        // speed: 20,
        alpha: {
            start: 1,
            end: 0.7
        },
        blendMode: 'NORMAL',
        on: false
    });

    for (var i = 0; i < tile.size * 5; i++) {
        var theX = Math.random() * tile.displayWidth + (tile.x - tile.displayWidth / 2)
        var theY = Math.random() * tile.displayHeight + tile.y

        particles.emitParticleAt(theX, theY, 1)
    }
}


function moveLeafs() {
    for (var i = 0; i < 5; i++) {
        // higher speed = slower movement
        var speed = speed_range(false, true)
        var range = speed_range(true, false)

        if (Math.random() > 0.5) {
            thisWay(that.leafs[i], speed, range)
        } else {
            thatWay(that.leafs[i], speed, range)
        }
    }
}

function speed_range(generateRange, generateSpeed) {
    if (generateRange) {
        return Math.floor(Math.random() * 40 + 30)
    } else if (generateSpeed) {
        return Math.floor(Math.random() * 60 + 70)
    }
}

function thisWay(theLeaf, speed, range) {
    var speed2 = speed
    var range2 = range

    var counter = 0
    for (var i = 0; i < range; i++) {
        setTimeout(() => {
            theLeaf.angle += 0.1
            counter++

            if (counter == range) {
                thatWay(theLeaf, speed2, range2)
            }
        }, i * speed)
    }
}

function thatWay(theLeaf, speed, range) 
{
    var speed2 = speed
    var range2 = range

    var counter = 0
    for (var i = 0; i < range; i++) {
        setTimeout(() => {
            theLeaf.angle -= 0.1
            counter++

            if (counter == range) {
                thisWay(theLeaf, speed2, range2)
            }
        }, i * speed)
    }
}

function loseCheck() {

    var shouldLose = false
    updateTilePoints(that)
    updateTilePoints(that, true)
    
    for (var i = 0 ; i < 8 ; i++) {
        if (tiles[(tiles.length -1) - i][2] == 1) {
            shouldLose = true
        }
    }

    return shouldLose 
}

function wreckingBall(losing) {

    dragNotAllowed = true
    that.tileGroup.children.entries.sort((b, a) => a.x.toString().localeCompare(b.x));
    that.tileGroup.children.entries.sort((b, a) => a.row.toString().localeCompare(b.row));
    var tilescount = that.tileGroup.children.entries.length -1

    for (var i = 0; i < that.tileGroup.children.entries.length ; i++) {
        var tile = that.tileGroup.children.entries[i]
        goOn(tile, tile.row, i)
    }

    function goOn(tile, row, i) {
        setTimeout(() => {
            if (row !== -1) {
                particles(that, tile)
            }
            tile.destroy()
            if (i == tilescount) {
                if (losing) {
                    doLose() 
                }else{
                    rePlay()
                }
            }
        }, i * destroyingTilesSpeed)
    } 
}

function doLose() {
    pause = true
    loseMenuIsActive = true

    that.loseMenuGroup.children.entries.forEach(child => {
        child.visible = true
    })

    that.pause_menu.setVisible(true)

    that.loseScoreText.fontSize = that.topper.displayWidth / 14
    that.loseScoreText.x = that.pause_menu.x - that.loseScoreText.width /2
    that.loseScoreText.y = that.pause_menu.y + that.pause_menu.displayHeight /5

    that.inputBg.displayWidth = that.pause_menu.displayWidth /1.8
    that.inputBg.displayHeight = that.pause_menu.displayHeight /10
    that.inputBg.x = that.pause_menu.x 
    that.inputBg.y = that.pause_menu.y + that.pause_menu.displayHeight /2.8

    that.loseScore.setText(score)
    that.loseScore.fontSize = that.topper.displayWidth / 14
    that.loseScore.x = that.pause_menu.x - that.loseScore.width /2
    that.loseScore.y = that.inputBg.y - that.loseScore.height /2.2

    that.loseReplay.displayWidth = that.btn_replay.displayWidth
    that.loseReplay.displayHeight = that.btn_replay.displayHeight
    that.loseReplay.x = that.inputBg.x 
    that.loseReplay.y = that.inputBg.y + that.inputBg.displayHeight * 3.2

    score = 0
    that.score.setText(score)
    callTextAlignmentor(that, true, null, null)
}

function rePlay() {
    dragNotAllowed = false
    guidRunning = false
    score = 0
    that.score.setText(score)
    callTextAlignmentor(that, true, null, null)
    
    pause = false

    that.tileGroup.children.entries.forEach(tile => {
        tile.row = 0
    })

    generateNewRow()
    pullUp()
}


function CheckCookie() {
    var firstTime = true
    var allcookies = document.cookie
    var cookiearray = allcookies.split(';').map(str => str.replace(/\s/g, ''))

    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0]

        if(name === "firstTime"){
            firstTime = false
        }
    }

    return firstTime
}


function runGuid(part) {
    
    if (part == 1) 
    {
        document.cookie = "firstTime=" + true;
        guidRunning = true
        guidDragableTileId = 1
        createNewTile(that, 3, 0 +2, 1, true)
        createNewTile(that, 2, 1 +2, 3, true)
        createNewTile(that, 1, 4 +2, 2, true)
        pullUp(part)
        handGuid(1)
    } 
    else if (part == 2) 
    {
        guidDragableTileId = 2
        createNewTile(that, 0, 0 +2, 1, true)
        createNewTile(that, 0, 1 +2, 1, true)
        createNewTile(that, 0, 2 +2, 4, true)
        pullUp(part)
    } 
    else if (part == 3) 
    {
        guidDragableTileId = 3
        createNewTile(that, 0, 0 +2, 2, true)
        createNewTile(that, 0, 2 +2, 2, true)
        createNewTile(that, 0, 7 +2, 1, true)
        pullUp(part)
    } 
    else if (part == 4) 
    {
        guidDragableTileId = 3
        createNewTile(that, 0, 0 +2, 4, true)
        createNewTile(that, 0, 5 +2, 3, true)
        pullUp(part)
    }
}

function handGuid(level) {
    setTimeout(() => {

        if (level == 1) {
            var toHere = that.add.image(0, 0, 'tohere2').setOrigin(0, 0)
            toHere.displayHeight = tileSize
            toHere.displayWidth = tileSize *2 
    
            var hand = that.add.image(0, 0, 'hand').setOrigin(0, 0).setDepth(10)
            hand.displayHeight = tileSize *1.4
            hand.displayWidth = tileSize *1.4
    
            that.tileGroup.children.entries.forEach(tile => {
                if (tile.dragId == 1) {
                    toHere.y = tile.y
                    toHere.x = tile.x + tileSize * 1
                    toHere.side = 1
    
                    hand.y = tile.y + tileSize /2
                    hand.x = tile.x - tile.displayWidth /2 + hand.displayWidth /4
                    hand.startX = hand.x
                    hand.finishX = hand.startX + tileSize *2
                    hand.side = 1
    
                    var handSpeed = 0.8
                    var int2 = setInterval(() => {
    
                        if (hand.side == 1) {
                            hand.x += handSpeed
                        } else {
                            hand.x -= handSpeed
                        }
    
                        if (hand.x >= hand.finishX) {
                            hand.x = hand.startX
                        } else if (hand.x <= hand.startX) {
                            hand.side = 1
                        }
    
                    }, 10)
    
                    var int1 = setInterval(() => {
    
                        if (toHere.side == 1) {
                            toHere.alpha -= 0.01
                        } else {
                            toHere.alpha += 0.01
                        }
    
                        if (toHere.alpha >= 1) {
                            toHere.side = 1
                        } else if (toHere.alpha <= 0.4) {
                            toHere.side = -1
                        }
    
                    }, 10)
    
                    guidLevel1.push(hand)
                    guidLevel1.push(toHere)
                    guidLevel1.push(int1)
                    guidLevel1.push(int2)
                }
            })
        } else if (level == 2) {
            var toHere = that.add.image(0, 0, 'tohere3').setOrigin(0, 0)
            toHere.displayHeight = tileSize
            toHere.displayWidth = tileSize *3 
    
            var hand = that.add.image(0, 0, 'hand').setOrigin(0, 0).setDepth(10)
            hand.displayHeight = tileSize *1.4
            hand.displayWidth = tileSize *1.4
    
            that.tileGroup.children.entries.forEach(tile => {
                if (tile.dragId == 2) {
                    toHere.y = tile.y
                    toHere.x = tile.x + tileSize * 2 - tileSize2
                    toHere.side = 1
    
                    hand.y = tile.y + tileSize /2
                    hand.x = tile.x - hand.displayWidth /2
                    hand.startX = hand.x
                    hand.finishX = hand.startX + tileSize *3
                    hand.side = 1
    
                    var handSpeed = 0.8
                    var int2 = setInterval(() => {
    
                        if (hand.side == 1) {
                            hand.x += handSpeed
                        } else {
                            hand.x -= handSpeed
                        }
    
                        if (hand.x >= hand.finishX) {
                            hand.x = hand.startX
                        } else if (hand.x <= hand.startX) {
                            hand.side = 1
                        }
    
                    }, 10)
    
                    var int1 = setInterval(() => {
    
                        if (toHere.side == 1) {
                            toHere.alpha -= 0.01
                        } else {
                            toHere.alpha += 0.01
                        }
    
                        if (toHere.alpha >= 1) {
                            toHere.side = 1
                        } else if (toHere.alpha <= 0.4) {
                            toHere.side = -1
                        }
    
                    }, 10)
    
                    guidLevel2.push(hand)
                    guidLevel2.push(toHere)
                    guidLevel2.push(int1)
                    guidLevel2.push(int2)
                }
            })
        } else if (level == 3) {
            var toHere = that.add.image(0, 0, 'tohere1').setOrigin(0, 0)
            toHere.displayHeight = tileSize
            toHere.displayWidth = tileSize *1
    
            var hand = that.add.image(0, 0, 'hand').setOrigin(0, 0).setDepth(10)
            hand.displayHeight = tileSize *1.4
            hand.displayWidth = tileSize *1.4
    
            that.tileGroup.children.entries.forEach(tile => {
                if (tile.dragId == 3) {
                    toHere.y = tile.y
                    toHere.x = tile.x - tileSize2 + tileSize *4
                    toHere.side = 1
    
                    hand.y = tile.y + tileSize /2
                    hand.x = tile.x - tileSize2
                    hand.startX = hand.x
                    hand.finishX = hand.startX + tileSize *4
                    hand.side = 1
    
                    var handSpeed = 0.8
                    var int2 = setInterval(() => {
    
                        if (hand.side == 1) {
                            hand.x += handSpeed
                        } else {
                            hand.x -= handSpeed
                        }
    
                        if (hand.x >= hand.finishX) {
                            hand.x = hand.startX
                        } else if (hand.x <= hand.startX) {
                            hand.side = 1
                        }
    
                    }, 10)
    
                    var int1 = setInterval(() => {
    
                        if (toHere.side == 1) {
                            toHere.alpha -= 0.01
                        } else {
                            toHere.alpha += 0.01
                        }
    
                        if (toHere.alpha >= 1) {
                            toHere.side = 1
                        } else if (toHere.alpha <= 0.4) {
                            toHere.side = -1
                        }
    
                    }, 10)
    
                    guidLevel3.push(hand)
                    guidLevel3.push(toHere)
                    guidLevel3.push(int1)
                    guidLevel3.push(int2)
                }
            })
        }

    }, 1000)
}

function finishGuid() {
    setTimeout(() => {
        guidRunning = false
    }, 1300)
    // generateNewRow()
    pullUp()
}


