function CEndPanel(iScore){
    var _oContainer;
    var _oEndPanelContainer;
    var _oFade;
    var _oBg;
    var _oButExit;
    var _oButRestart;
    var _oMsgTextGameOver;
    var _oMsgTextFinalScore;
    var _oMsgTextFinalLines;
    
    var _iScore;
    
    var _pStartPosYContainer;
        
    this._init = function(){
        _iScore = iScore;
        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oSpriteMsgBox = s_oSpriteLibrary.getSprite('msg_box_big');
        _oBg = createBitmap(oSpriteMsgBox);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteMsgBox.width * 0.5;
        _oBg.regY = oSpriteMsgBox.height * 0.5;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown", function () {
        });
        s_oStage.addChild(_oFade);
        
        _oEndPanelContainer = new createjs.Container();        
        _oEndPanelContainer.addChild(_oBg);
        _oEndPanelContainer.y = CANVAS_HEIGHT;
        _oEndPanelContainer.on
        s_oStage.addChild(_oEndPanelContainer);
        
        _pStartPosYContainer = CANVAS_HEIGHT + oSpriteMsgBox.height/2; 
        
        _oMsgTextGameOver = new createjs.Text(TEXT_GAMEOVER, "42px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oMsgTextGameOver.textAlign = "center";
        _oMsgTextGameOver.textBaseline = "alphabetic";
	_oMsgTextGameOver.x = CANVAS_WIDTH_HALF;
        _oMsgTextGameOver.y = CANVAS_HEIGHT_HALF - 140;
        _oMsgTextGameOver.lineWidth = 450;
	_oEndPanelContainer.addChild(_oMsgTextGameOver);
        
        _oMsgTextFinalScore = new createjs.Text(TEXT_SCORE + ": " + _iScore, "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oMsgTextFinalScore.textAlign = "center";
        _oMsgTextFinalScore.textBaseline = "alphabetic";
	_oMsgTextFinalScore.x = CANVAS_WIDTH_HALF;
        _oMsgTextFinalScore.y = CANVAS_HEIGHT_HALF - 60;
        _oMsgTextFinalScore.lineWidth = 450;
	_oEndPanelContainer.addChild(_oMsgTextFinalScore);
        
        _oMsgTextFinalLines = new createjs.Text(TEXT_BEST_SCORE + ": " + s_iBestScore, "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oMsgTextFinalLines.textAlign = "center";
        _oMsgTextFinalLines.textBaseline = "alphabetic";
	_oMsgTextFinalLines.x = CANVAS_WIDTH_HALF;
        _oMsgTextFinalLines.y = CANVAS_HEIGHT_HALF;
        _oMsgTextFinalLines.lineWidth = 450;
	_oEndPanelContainer.addChild(_oMsgTextFinalLines);
        
        _oButExit = new CGfxButton(CANVAS_WIDTH_HALF - 200, 840, s_oSpriteLibrary.getSprite('but_home'), _oEndPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);        
        
        _oButRestart = new CGfxButton(CANVAS_WIDTH_HALF + 200, 840, s_oSpriteLibrary.getSprite('but_restart'), _oEndPanelContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        createjs.Tween.get(_oFade)
            .to({alpha: 0.7}, 1000, createjs.Ease.quadOut);
        createjs.Tween.get(_oEndPanelContainer)
            .to({y:0},1000, createjs.Ease.backOut)
            .call(function(){$(s_oMain).trigger("show_interlevel_ad");});            
    };
    
    this.unload = function(){
        _oButExit.unload(); 
        _oButRestart.unload();
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oContainer);
        s_oStage.removeChild(_oEndPanelContainer);
        s_oEndPanel = null;
    };
    
    this._onExit = function(){
        this.unload();
        s_oGame.onExit();
    };
    
    this._onRestart = function(){
        this.unload();
        s_oGame.restart();
    };
    
    s_oEndPanel = this;
    
    this._init();
}

var s_oEndPanel = null;