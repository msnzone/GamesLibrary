function CHelpPanel(){
    var _oText1;
    var _oText2;
    var _oText3;
    var _oShadow;
    var _oFade;
    var _oBg;
    var _oGroup;

    this._init = function () {
        var iTextY1 = CANVAS_HEIGHT_HALF - 100;
        var iTextY2 = CANVAS_HEIGHT_HALF - 10;
        var iTextY3 = CANVAS_HEIGHT_HALF + 80;
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oShadow = new createjs.Shape();
        _oShadow.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oShadow.alpha = 0.7;
        _oShadow.on("mousedown", function(){ });
        s_oStage.addChild(_oShadow);
        
        _oGroup = new createjs.Container();        
        _oGroup.addChild(_oBg);
        _oGroup.y = CANVAS_HEIGHT;
        s_oStage.addChild(_oGroup);

        _oText1 = new createjs.Text(TEXT_HELP1, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oText1.x = CANVAS_WIDTH_HALF;
        _oText1.y = iTextY1;
        _oText1.textAlign = "center";
        _oText1.textBaseline = "alphabetic";
        _oText1.lineHeight = 30;
        _oText1.lineWidth = 500;

        _oText2 = new createjs.Text(TEXT_HELP2, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oText2.x = CANVAS_WIDTH_HALF;
        _oText2.y = iTextY2;
        _oText2.textAlign = "center";
        _oText2.textBaseline = "alphabetic";
        _oText2.lineHeight = 30;
        _oText2.lineWidth = 500;

        _oText3 = new createjs.Text(TEXT_HELP3, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oText3.x = CANVAS_WIDTH_HALF;
        _oText3.y = iTextY3;
        _oText3.textAlign = "center";
        _oText3.textBaseline = "alphabetic";
        _oText3.lineHeight = 30;
        _oText3.lineWidth = 500;

        _oGroup.addChild(_oText1, _oText2, _oText3);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);

        new createjs.Tween.get(_oGroup).to({y:0},1000, createjs.Ease.backOut);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
        });
        
        var oParent = this;
        _oGroup.on("pressup",function(){oParent._onExitHelp()});
        s_oGame.setDisableEvents(true);
        
        if (!s_bMobile) {
            _oGroup.cursor = "pointer";
        };
    };
    
    this.unload = function () {
        createjs.Tween.get(_oShadow).to({alpha:0},500).call(function(){
            s_oStage.removeChild(_oShadow);
        });
        
        createjs.Tween.get(_oGroup)
            .to({y:CANVAS_HEIGHT},400, createjs.Ease.backIn)
            .call(function(){
            s_oStage.removeChild(_oGroup);

            var oParent = this;
            _oGroup.off("pressup", function () {
                oParent._onExitHelp();
            });            
        });
    };

    this._onExitHelp = function () {
        this.unload();
        setTimeout(s_oGame._onExitHelp, 500);
    };

    this._init();
}