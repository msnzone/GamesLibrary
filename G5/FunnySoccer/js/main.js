function CTeamChoose() {
    var b, k, h, d, g, c, p, a, m, A, v, t, x, u, E, z, e;
    this._init = function() {
        p = createBitmap(s_oSpriteLibrary.getSprite("bg_select_team"));
        s_oStage.addChild(p);
        E = [];
        z = [];
        u = new createjs.Container;
        for (var y = e = 0; y < TOT_TEAM; y++) this._createFlag(y, FLAG_POSITION[y].x, FLAG_POSITION[y].y, Math.floor(500 * Math.random()), 1500, u), this._createPlayer(y, u);
        y = s_oSpriteLibrary.getSprite("flag_selection");
        x = createBitmap(y);
        x.x = E[0].getX();
        x.y = E[0].getY();
        x.regX = .5 * y.width;
        x.regY = .5 * y.height;
        s_oStage.addChild(u);
        u.y = 12;
        m = new createjs.Container;
        y = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, TEXT_COLOR);
        y.textAlign = "center";
        y.x = 0;
        y.y = 0;
        var w;
        w = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, "#000000");
        w.textAlign = "center";
        w.x = 0;
        w.y = 0;
        w.outline = 5;
        m.x = 682;
        m.y = 176;
        m.addChild(w, y);
        s_oStage.addChild(m);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) y = s_oSpriteLibrary.getSprite("audio_icon"), g = CANVAS_WIDTH - y.width / 2 - 60, c = y.height / 2 + 20, v = new CToggle(g, c, y, s_bAudioActive, s_oStage), v.addEventListener(ON_MOUSE_UP,
            this._onAudioToggle, this);
        b = .5 * CANVAS_WIDTH + 600;
        k = .5 * CANVAS_HEIGHT + 340;
        y = s_oSpriteLibrary.getSprite("but_continue");
        a = new CGfxButton(b, k, y, s_oStage);
        a.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        a.pulseAnimation();
        y = s_oSpriteLibrary.getSprite("but_exit");
        h = CANVAS_WIDTH - y.width / 2 - 15;
        d = y.height / 2 + 20;
        t = new CGfxButton(h, d, y, s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onExit, this);
        A = new createjs.Shape;
        A.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(A);
        createjs.Tween.get(A).to({
            alpha: 0
        }, 1E3).call(function() {
            A.visible = !1;
            u.addChild(x)
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._createFlag = function(e, a, d, c, g, m) {
        var b = s_oSpriteLibrary.getSprite("flag_" + e);
        E[e] = new CGfxButton(a, d, b, m);
        E[e].addEventListenerWithParams(ON_MOUSE_UP, this._onButTeamChoose, this, e);
        e = E[e].getButton();
        e.scaleX = 0;
        e.scaleY = 0;
        createjs.Tween.get(e).wait(c).to({
            scaleY: 1,
            scaleX: 1
        }, g, createjs.Ease.elasticOut)
    };
    this._createPlayer = function(e, a) {
        var d = s_oSpriteLibrary.getSprite("team_" +
            e);
        z[e] = new CCharacter(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT + 30, d, 1, a);
        z[e].changeState("run");
        0 !== e && z[e].setVisible(!1)
    };
    this.refreshButtonPos = function(e, m) {
        t.setPosition(h - e, m + d);
        a.setPosition(b - e, k - m);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(g - e, m + c)
    };
    this._onButTeamChoose = function(a) {
        e !== a && (z[a].setVisible(!0), x.x = E[a].getX(), x.y = E[a].getY(), z[e].setVisible(!1), e = a)
    };
    this.unload = function() {
        for (var e = 0; e < E.length; e++) E[e].unload(), E[e] = null;
        t.unload();
        t = null;
        if (!1 === DISABLE_SOUND_MOBILE ||
            !1 === s_bMobile) v.unload(), v = null;
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oTeamChoose = null
    };
    this._onExit = function() {
        this.unload();
        s_oMain.gotoMenu()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButContinueRelease = function() {
        this.unload();
        s_oMain.gotoGame(e)
    };
    s_oTeamChoose = this;
    this._init()
}
var s_oTeamChoose = null;

function CSpriteAnimator() {
    var b, k, h, d, g = 0,
        c = 0,
        p = 0;
    this._init = function() {
        d = !1;
        h = 0;
        b = new createjs.Container;
        k = [];
        s_oStage.addChild(b)
    };
    this.loadSprites = function(a, d, c, g, h) {
        var x = k.length;
        k[x] = createBitmap(a);
        k[x].x = d;
        k[x].y = c;
        k[x].regX = g;
        k[x].regY = h;
        0 !== x && (k[x].visible = !1);
        b.addChild(k[x])
    };
    this.unload = function() {
        s_oStage.removeChild(b)
    };
    this.startAnimation = function(a) {
        h = 0;
        c = a;
        p = 0;
        d = !0
    };
    this.getStateAnimation = function() {
        return d
    };
    this.update = function() {
        d && (g += s_iTimeElaps, 30 <= g && (h++, h < k.length ? (k[h -
            1].visible = !1, k[h].visible = !0) : (p === c ? d = !1 : (p++, h = 1), k[k.length - 1].visible = !1, k[0].visible = !0)), g = 0)
    };
    this._init();
    return this
}

function CScoreBoard(b, k, h, d, g, c, p) {
    var a, m, A, v, t, x, u;
    this._init = function(d, c, e, g, b, h, k) {
        a = {
            x: c,
            y: e
        };
        m = new createjs.Container;
        m.x = a.x;
        m.y = a.y;
        A = createBitmap(d);
        A.x = 0;
        A.y = -3;
        A.regX = .5 * d.width;
        A.regY = 0;
        m.addChild(A);
        t = new createjs.Text(g + " 0 - 0 " + b, "28px " + FONT_GAME, "#000000");
        t.x = 0;
        t.y = .5 * d.height - 3;
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.outline = 5;
        m.addChild(t);
        v = new createjs.Text(g + " 0 - 0 " + b, "28px " + FONT_GAME, TEXT_COLOR);
        v.x = 0;
        v.y = t.y;
        v.textAlign = "center";
        v.textBaseline = "middle";
        m.addChild(v);
        d = s_oSpriteLibrary.getSprite("flag_" + h);
        x = createBitmap(d);
        x.x = -170;
        x.y = 5;
        x.regX = .5 * d.width;
        x.regY = 0;
        x.scaleX = .3;
        x.scaleY = .3;
        m.addChild(x);
        k = s_oSpriteLibrary.getSprite("flag_" + k);
        u = createBitmap(k);
        u.x = 170;
        u.y = 5;
        u.regX = .5 * d.width;
        u.regY = 0;
        u.scaleX = .3;
        u.scaleY = .3;
        m.addChild(u);
        s_oStage.addChild(m)
    };
    this.changeTeamsFlag = function(a, d) {
        x.image = s_oSpriteLibrary.getSprite("flag_" + a);
        u.image = s_oSpriteLibrary.getSprite("flag_" + d)
    };
    this.getStartPosition = function() {
        return a
    };
    this.setPosition = function(a, d) {
        m.x =
            a;
        m.y = d
    };
    this.unload = function() {
        s_oStage.removeChild(m)
    };
    this.refresh = function(a) {
        t.text = a;
        v.text = a
    };
    this.getResult = function() {
        return v.text
    };
    this._init(b, k, h, d, g, c, p);
    return this
}

function CPreloader() {
    var b, k, h, d, g, c, p;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        p = new createjs.Container;
        s_oStage.addChild(p)
    };
    this.unload = function() {
        p.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(c).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        p.addChild(a);
        a = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(a);
        d.x = CANVAS_WIDTH / 2 - a.width / 2;
        d.y = CANVAS_HEIGHT - 200;
        p.addChild(d);
        b = a.width;
        k = a.height;
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, 1, k);
        p.addChild(g);
        d.mask =
            g;
        h = new createjs.Text("", "30px " + FONT_GAME, "#fff");
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT - 200;
        h.shadow = new createjs.Shadow("#000", 2, 2, 2);
        h.textBaseline = "alphabetic";
        h.textAlign = "center";
        p.addChild(h);
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0;
        p.addChild(c)
    };
    this.refreshLoader = function(a) {
        h.text = a + "%";
        g.graphics.clear();
        a = Math.floor(a * b / 100);
        g.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, a, k)
    };
    this._init()
}

function CPhysicsObject() {
    var b = Box2D.Common.Math.b2Vec2,
        k = Box2D.Dynamics.b2BodyDef,
        h = Box2D.Dynamics.b2Body,
        d = Box2D.Dynamics.b2FixtureDef,
        g = Box2D.Collision.Shapes.b2PolygonShape,
        c = Box2D.Collision.Shapes.b2CircleShape,
        p = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        a = Box2D.Dynamics.Joints.b2WeldJointDef,
        m = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        A = Box2D.Collision.b2WorldManifold,
        v, t;
    this.init = function() {
        t = s_oPhysicsController.getInstance();
        v = t.getWorld()
    };
    this.addWall = function(a, c, m, b, e, y, w, p) {
        var D = new d;
        D.density = y;
        D.friction = w;
        D.restitution = p;
        y = new k;
        y.type = h.b2_staticBody;
        D.shape = new g;
        D.shape.SetAsBox(a / WORLD_SCALE, c / WORLD_SCALE);
        y.position.Set(m / WORLD_SCALE, b / WORLD_SCALE);
        y.angle = e * Math.PI / 180;
        v.CreateBody(y).CreateFixture(D)
    };
    this.addLine = function(a, c, m, z, e, y, w, p) {
        var D = new d;
        D.density = y;
        D.friction = w;
        D.restitution = p;
        D.filter.categoryBits = FIELD_CATEGORY_COLLISION;
        D.filter.maskBits = -1;
        D.filter.groupIndex = 1;
        y = new k;
        y.type = h.b2_staticBody;
        y.position.Set(a / WORLD_SCALE, c / WORLD_SCALE);
        y.angle = e * Math.PI /
            180;
        y.userData = {
            type: WALL
        };
        D.shape = new g;
        a = [];
        c = new b;
        c.Set(m.x / WORLD_SCALE, m.y / WORLD_SCALE);
        a.push(c);
        m = new b;
        m.Set(z.x / WORLD_SCALE, z.y / WORLD_SCALE);
        a.push(m);
        D.shape.SetAsBox(200, .3);
        D.shape.SetAsArray(a, a.length);
        return v.CreateBody(y).CreateFixture(D)
    };
    this.addPolygon = function(a) {
        var c = new d;
        c.density = a.density;
        c.friction = a.friction;
        c.restitution = a.restitution;
        c.isSensor = a.sensor;
        c.filter.categoryBits = 3;
        c.filter.maskBits = 1;
        c.filter.groupIndex = 1;
        var m = new k;
        m.type = h.b2_staticBody;
        m.position.Set(a.x /
            WORLD_SCALE, a.y / WORLD_SCALE);
        m.angle = a.angle * Math.PI / 180;
        m.userData = a.info;
        c.shape = new g;
        a = a.vertex;
        for (var z = [], e = 0; e < a.length; e++) {
            var y = new b;
            y.Set(a[e].x / WORLD_SCALE, a[e].y / WORLD_SCALE);
            z.push(y)
        }
        c.shape.SetAsArray(z, z.length);
        return v.CreateBody(m).CreateFixture(c)
    };
    this.addCollisionPolygon = function(a) {
        var c = new d;
        c.density = a.density;
        c.friction = a.friction;
        c.restitution = a.restitution;
        a.info.type === PLAYER ? (c.filter.categoryBits = FIELD_CATEGORY_COLLISION, c.filter.maskBits = BALL_CATEGORY_COLLISION,
            c.filter.groupIndex = 1) : a.info.type === OPPONENT && (c.filter.categoryBits = OPPONENT_CATEGORY_COLLISION, c.filter.maskBits = BALL_CATEGORY_COLLISION, c.filter.groupIndex = 1);
        var m = new k;
        m.type = h.b2_kinematicBody;
        m.position.Set(a.x / WORLD_SCALE, a.y / WORLD_SCALE);
        m.angle = a.angle * Math.PI / 180;
        m.userData = a.info;
        c.shape = new g;
        for (var z = a.vertex, e = [], y = 0; y < z.length; y++) {
            for (var w = [], p = 0; p < z[y].length; p++) {
                var D = new b;
                a.info.type === OPPONENT ? D.Set(z[y][p].x / WORLD_SCALE, (z[y][p].y + 11) / WORLD_SCALE) : D.Set(z[y][p].x / WORLD_SCALE,
                    z[y][p].y / WORLD_SCALE);
                w.push(D)
            }
            c.shape.SetAsArray(w, w.length);
            e[y] = v.CreateBody(m).CreateFixture(c)
        }
        return e
    };
    this.addCollisionShape = function(a) {
        var m = new d;
        m.density = a.density;
        m.friction = a.friction;
        m.restitution = a.restitution;
        m.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        m.filter.maskBits = BALL_CATEGORY_COLLISION;
        m.filter.groupIndex = 1;
        var b = new k;
        b.type = h.b2_dynamicBody;
        m.shape = new g;
        m.shape.SetAsBox(a.recWidth / WORLD_SCALE, a.recHeight / WORLD_SCALE);
        b.position.Set((a.x + a.rec_offset.x) / WORLD_SCALE, (a.y + a.rec_offset.y) / WORLD_SCALE);
        b.fixedRotation = !0;
        var z = v.CreateBody(b),
            e = z.CreateFixture(m),
            b = new k,
            y = new d;
        y.density = a.density;
        y.friction = a.friction;
        y.restitution = a.restitution;
        y.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        y.filter.maskBits = -1;
        y.filter.groupIndex = 1;
        b.type = h.b2_dynamicBody;
        y.shape = new c(a.radius / WORLD_SCALE);
        b.position.x = (a.x + a.sph_offset.x) / WORLD_SCALE;
        b.position.y = (a.y + a.sph_offset.y) / WORLD_SCALE;
        b.fixedRotation = !0;
        b.allowSleep = !1;
        b.bullet = !0;
        var w = v.CreateBody(b),
            y = w.CreateFixture(y),
            b = new k;
        b.type = h.b2_dynamicBody;
        m.shape = new g;
        m.shape.SetAsBox(a.rec_neck.width / WORLD_SCALE, a.rec_neck.height / WORLD_SCALE);
        b.position.Set((a.x + a.rec_neck.x) / WORLD_SCALE, (a.y + a.rec_neck.y) / WORLD_SCALE);
        b.angle = Math.PI / 180 * a.rec_neck.angle;
        b.fixedRotation = !0;
        a = v.CreateBody(b);
        m = a.CreateFixture(m);
        b = new p;
        b.Initialize(z, w, w.GetWorldCenter());
        w = v.CreateJoint(b);
        b = new p;
        b.Initialize(z, a, a.GetWorldCenter());
        z = v.CreateJoint(b);
        return {
            fixture1: e,
            fixture2: y,
            fixture3: m,
            jointA: w,
            jointB: z
        }
    };
    this.createAContactListener =
        function() {
            var a = new Box2D.Dynamics.b2ContactListener;
            a.BeginContact = function(a) {
                var c = a.GetFixtureA().GetBody().GetUserData(),
                    m = a.GetFixtureB().GetBody().GetUserData();
                if (null !== c && null !== m)
                    if (c.type === GOAL_AREA && m.type === BALL) s_oGame.playerGoal();
                    else if (c.type === GOAL_AREA_ENEMY && m.type === BALL) s_oGame.opponentGoal();
                else if (c.type === HEAD_SHOOT || c.type === HEEL || c.type === LEG && m.type === BALL) c = new A, a.GetWorldManifold(c), s_oGame.addHitEffect({
                        x: c.m_points[0].x * WORLD_SCALE,
                        y: c.m_points[0].y * WORLD_SCALE
                    }),
                    s_oGame.playKickSound()
            };
            v.SetContactListener(a)
        };
    this.addBall = function(a, m, g, b, e, y) {
        var w = new d;
        w.density = b;
        w.friction = e;
        w.restitution = y;
        w.filter.categoryBits = BALL_CATEGORY_COLLISION;
        w.filter.maskBits = -1;
        w.filter.groupIndex = 1;
        b = new k;
        b.type = h.b2_dynamicBody;
        w.shape = new c(a / WORLD_SCALE);
        b.allowSleep = !1;
        b.userData = {
            type: BALL
        };
        b.position.x = m / WORLD_SCALE;
        b.position.y = g / WORLD_SCALE;
        b.linearDamping = BALL_LINEAR_DAMPING;
        b.bullet = !0;
        return v.CreateBody(b).CreateFixture(w)
    };
    this.addCircle = function(a, m, g, b,
        e, y) {
        var w = new d;
        w.density = b;
        w.friction = e;
        w.restitution = y;
        b = new k;
        b.type = h.b2_staticBody;
        w.shape = new c(a / WORLD_SCALE);
        b.position.x = m / WORLD_SCALE;
        b.position.y = g / WORLD_SCALE;
        return v.CreateBody(b).CreateFixture(w)
    };
    this.addHead = function(a, g) {
        var b = new d;
        b.density = g.density;
        b.friction = g.friction;
        b.restitution = g.restitution;
        b.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        b.filter.maskBits = BALL_CATEGORY_COLLISION;
        b.filter.groupIndex = -1;
        var z = new k;
        z.type = h.b2_dynamicBody;
        b.shape = new c(g.radius / WORLD_SCALE);
        z.position.x = a.x / WORLD_SCALE;
        z.position.y = a.y / WORLD_SCALE;
        z.userData = {
            type: g.info.type
        };
        var z = v.CreateBody(z),
            b = z.CreateFixture(b),
            e = new d;
        e.density = 3;
        e.friction = 1;
        e.restitution = .1;
        e.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        e.filter.maskBits = BALL_CATEGORY_COLLISION;
        e.filter.groupIndex = -1;
        var y = new k;
        y.type = h.b2_staticBody;
        e.shape = new c(2 / WORLD_SCALE);
        y.position.Set(a.x / WORLD_SCALE, a.y / WORLD_SCALE);
        var y = v.CreateBody(y),
            e = y.CreateFixture(e),
            w = new m;
        w.Initialize(y, z, y.GetWorldCenter(), g.mov_allowed);
        w.lowerTranslation = 0;
        w.upperTranslation = g.distance;
        w.enableLimit = !0;
        w.maxMotorForce = g.power;
        w.motorSpeed = g.speed;
        w.enableMotor = !0;
        z = v.CreateJoint(w);
        return {
            fixture1: b,
            fixture2: e,
            joint: z
        }
    };
    this.addStaticCircle = function(a, m, g, b, e, y) {
        var w = new d;
        w.density = b;
        w.friction = e;
        w.restitution = y;
        b = new k;
        b.type = h.b2_staticBody;
        w.shape = new c(a / WORLD_SCALE);
        b.position.x = m / WORLD_SCALE;
        b.position.y = g / WORLD_SCALE;
        return v.CreateBody(b).CreateFixture(w)
    };
    this.addLeg = function(m, u) {
        var t = new d;
        t.density = u.density;
        t.friction =
            u.friction;
        t.restitution = u.restitution;
        t.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        t.filter.maskBits = BALL_CATEGORY_COLLISION;
        t.filter.groupIndex = -1;
        var z = new k;
        z.type = h.b2_dynamicBody;
        t.shape = new g;
        t.shape.SetAsBox(u.width / WORLD_SCALE, u.height / WORLD_SCALE);
        z.position.Set(m.x / WORLD_SCALE, m.y / WORLD_SCALE);
        var e = v.CreateBody(z),
            y = e.CreateFixture(t),
            w = new d;
        w.density = 3;
        w.friction = 1;
        w.restitution = .1;
        w.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        w.filter.maskBits = BALL_CATEGORY_COLLISION;
        w.filter.groupIndex = -1;
        var H = new k;
        H.type = h.b2_staticBody;
        w.shape = new c(2 / WORLD_SCALE);
        H.position.Set((m.x + u.pivotX) / WORLD_SCALE, (m.y + u.pivotY) / WORLD_SCALE);
        H = v.CreateBody(H);
        w = H.CreateFixture(w);
        t = new p;
        t.Initialize(e, H, H.GetWorldCenter());
        t.lowerAngle = Math.PI / 180 * u.lowerAngle;
        t.upperAngle = Math.PI / 180 * u.upperAngle;
        t.enableLimit = !0;
        t.maxMotorTorque = u.power;
        t.motorSpeed = u.speed;
        t.enableMotor = !0;
        H = v.CreateJoint(t);
        t = new d;
        t.density = u.density;
        t.friction = u.friction;
        t.restitution = u.restitution;
        t.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        t.filter.maskBits = BALL_CATEGORY_COLLISION;
        t.filter.groupIndex = -1;
        z = new k;
        z.type = h.b2_dynamicBody;
        t.shape = new c(10 / WORLD_SCALE);
        z.position.x = (m.x + 4 * u.width) / WORLD_SCALE;
        z.position.y = (m.y + u.height) / WORLD_SCALE;
        z.userData = u.info;
        var z = v.CreateBody(z),
            D = z.CreateFixture(t),
            t = new a;
        t.bodyA = e;
        t.bodyB = z;
        t.localAnchorA = new b(u.width / WORLD_SCALE, u.height / WORLD_SCALE);
        t.localAnchorB = new b(.1 / WORLD_SCALE, .1 / WORLD_SCALE);
        e = v.CreateJoint(t);
        return {
            fixture1: y,
            fixture2: w,
            jointLeg: H,
            fixture3: D,
            jointFoot: e
        }
    };
    this.addRectangle =
        function(a) {
            var c = new d;
            c.density = a.density;
            c.friction = a.friction;
            c.restitution = a.restitution;
            c.isSensor = a.sensor;
            c.filter.categoryBits = 3;
            c.filter.maskBits = 1;
            c.filter.groupIndex = 1;
            var m = new k;
            m.type = h.b2_staticBody;
            c.shape = new g;
            c.shape.SetAsBox(a.width / WORLD_SCALE, a.height / WORLD_SCALE);
            m.position.Set(a.x / WORLD_SCALE, a.y / WORLD_SCALE);
            m.angle = a.angle * Math.PI / 180;
            return v.CreateBody(m).CreateFixture(c)
        };
    this.setRotation = function(a) {
        this.rotation = a
    };
    this._update = function(a) {};
    this.init()
}

function CPhysicsController() {
    var b = Box2D.Common.Math.b2Vec2,
        k = Box2D.Dynamics.b2World,
        h = Box2D.Dynamics.b2DebugDraw,
        d, g, c = this,
        p = document.getElementById("canvas").getContext("2d");
    this.init = function() {
        d = new b(0, 9.81);
        g = new k(d, !0);
        g.Step(TIME_STEP_BOX2D, ITINERATION_BOX2D, POSITION_ITINERATION_BOX2D);
        var a = new h;
        a.SetSprite(p);
        a.SetDrawScale(30);
        a.SetFillAlpha(.5);
        a.SetLineThickness(1);
        a.SetFlags(h.e_shapeBit | h.e_jointBit);
        g.SetDebugDraw(a)
    };
    this.startComputing = function(a) {
        a.GetBody().SetActive(!0)
    };
    this.applyImpulse = function(a, c) {
        a.GetBody().ApplyImpulse(c, a.GetBody().GetWorldCenter())
    };
    this.applyForce = function(a, c) {
        a.GetBody().ApplyForce(c, a.GetBody().GetWorldCenter())
    };
    this.decreaseSpeedRotation = function(a) {
        var c = .99 * a.GetBody().GetAngularVelocity();
        a.GetBody().SetAngularVelocity(c)
    };
    this.destroyAllBody = function() {
        for (var a = g.GetBodyList(); a.GetNext();) {
            var c = a.GetNext();
            g.DestroyBody(c)
        }
    };
    this.destroyAllJoint = function() {
        for (var a = g.GetJointList(); a.GetNext();) {
            var c = a.GetNext();
            g.DestroyJoint(c)
        }
    };
    this.destroyWorld = function() {
        g = null
    };
    this.getSpeedRotation = function(a) {
        return a.GetBody().GetAngularVelocity()
    };
    this.moveObject = function(a, c, d) {
        c = {
            x: c / WORLD_SCALE,
            y: d / WORLD_SCALE
        };
        a.GetBody().SetPosition(c)
    };
    this.destroyBody = function(a) {
        g.DestroyBody(a.GetBody())
    };
    this.destroyJoint = function(a) {
        g.DestroyJoint(a)
    };
    this.getJointAngle = function(a) {
        return a.GetJointAngle() * (180 / Math.PI)
    };
    this.getInstance = function() {
        null === c && (c = new CPhysicsController);
        return c
    };
    this.getJointTranslation = function(a) {
        return a.GetJointTranslation()
    };
    this.update = function() {
        g.Step(.05, 3, 3);
        g.ClearForces()
    };
    this.upadteDrawDebug = function() {
        g.DrawDebugData()
    };
    this.getWorld = function() {
        return g
    };
    this.setElementLinearDamping = function(a, c) {
        a.GetBody().SetLinearDamping(c)
    };
    this.setElementAngularVelocity = function(a, c) {
        a.GetBody().SetAngularVelocity(c)
    };
    this.setElementPosition = function(a, c) {
        var d = {
            x: c.x / WORLD_SCALE,
            y: c.y / WORLD_SCALE
        };
        a.GetBody().SetPosition(d)
    };
    this.getElementPosition = function(a) {
        var c = a.GetBody().GetPosition();
        return {
            x: c.x * WORLD_SCALE,
            y: c.y * WORLD_SCALE,
            angle: 180 * a.GetBody().GetAngle() / Math.PI
        }
    };
    this.setElementAngle = function(a, c) {
        a.GetBody().SetAngle(c * Math.PI / 180)
    };
    this.getElementAngle = function(a) {
        return 180 * a.GetBody().GetAngle() / Math.PI
    };
    this.getElementVelocity = function(a) {
        return a.GetBody().GetLinearVelocity()
    };
    this.setElementLinearVelocity = function(a, c) {
        return a.GetBody().SetLinearVelocity(c)
    };
    this.init()
}

function CPause() {
    var b;
    this._init = function() {
        var k = new createjs.Container;
        k.alpha = 0;
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = .5;
        var h = new createjs.Shape;
        h.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.hitArea = h;
        b.on("click", function() {});
        k.addChild(b);
        h = new createjs.Text(TEXT_PAUSE, "50px " + FONT_GAME, "#000000");
        h.x = .5 * CANVAS_WIDTH;
        h.y = .5 * CANVAS_HEIGHT - 130;
        h.textAlign = "center";
        h.outline = 5;
        k.addChild(h);
        var d = new createjs.Text(TEXT_PAUSE,
            "50px " + FONT_GAME, TEXT_COLOR);
        d.x = h.x;
        d.y = h.y;
        d.textAlign = "center";
        k.addChild(d);
        h = s_oSpriteLibrary.getSprite("but_continue");
        (new CGfxButton(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT + 70, h, k)).addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, k);
        s_oStage.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 1
        }, 300, createjs.quartOut)
    };
    this.unload = function() {
        b.off("click", function() {});
        s_oStage.removeChild(void 0)
    };
    this._onLeavePause = function(b) {
        createjs.Tween.get(b).to({
            alpha: 0
        }, 300, createjs.quartIn).call(function() {
            s_oInterface.unloadPause();
            s_oGame.unpause(!0)
        })
    };
    this._init();
    return this
}

function COpponent(b, k, h, d, g, c, p) {
    var a, m, A, v, t, x, u = 0,
        E, z, e, y, w, H, D, N, F = !1,
        P = !1,
        K = !1,
        M = !1,
        J = !1,
        L = !1,
        n = !1,
        q, B, r, I, Q, G;
    this._init = function(f, l, n, O, e, S, q) {
        N = q;
        q = new createjs.SpriteSheet({
            images: [n],
            frames: {
                width: n.width / 8,
                height: n.height / 7,
                regX: n.width / 2 / 8,
                regY: n.height / 2 / 7
            },
            animations: {
                idle: [0, 11, "idle", .5],
                run: [12, 22],
                shot: [23, 28],
                head_shot_run: [29, 37],
                head_shot_idle: [38, 48],
                heel_shot: [49, 55],
                reverse: {
                    frames: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12]
                }
            }
        });
        a = createSprite(q, "idle", n.width / 2 / 8, n.height / 2 / 7, n.width /
            8, n.height / 7);
        a.x = f;
        a.y = l;
        a.scaleX = -1;
        v = n.width / 8;
        Q = B = I = r = 0;
        G = TIME_TRY_TO_SHOT_BALL_OPPONENT;
        D = S;
        f = v;
        m = CANVAS_WIDTH + -v;
        A = f;
        x = O;
        t = CHARACTER_SPEED * x;
        E = OPPONENT_DISTANCE_PROTECTION;
        H = e;
        N.addChild(a)
    };
    this.setChildIndex = function(f) {
        N.setChildIndex(a, f)
    };
    this.getChildIndex = function() {
        return N.getChildIndex(a)
    };
    this.getX = function() {
        return a.x
    };
    this.getY = function() {
        return a.y
    };
    this.removeAllComponent = function() {
        !0 === F ? (s_oGame.removeLeg(e), F = !1) : !0 === P ? (s_oGame.removeHead(y), P = !1) : !0 === K && (s_oGame.removeLeg(w),
            K = !1)
    };
    this.setPosition = function(f, l) {
        null !== f && (a.x = f);
        null !== l && (a.y = l)
    };
    this.rotate = function(f) {
        a.scaleX = f
    };
    this.changeState = function(f) {
        a.gotoAndPlay(f);
        "shot" !== f && "head_shot_run" !== f && "head_shot_idle" !== f && "heel_shot" !== f || this._onFinishAnimation()
    };
    this.stopAnimation = function() {
        a.stop()
    };
    this.playAnimation = function() {
        a.play()
    };
    this._onFinishAnimation = function() {
        a.on("animationend", function() {
            0 === u ? (a.gotoAndPlay("idle"), z = "idle") : -1 === u ? (a.gotoAndPlay("reverse"), z = "reverse") : (a.gotoAndPlay("run"),
                z = "run");
            a.removeAllEventListeners()
        })
    };
    this.unload = function() {
        N.removeChild(a)
    };
    this.createHead = function() {
        y = H.addHead({
            x: a.x + OFFSET_HEAD_POS_OPPONENT.x,
            y: a.y + OFFSET_HEAD_POS_OPPONENT.y
        }, OPPONENT_HEAD);
        P = !0
    };
    this.createHeel = function() {
        w = H.addLeg({
            x: a.x + OFFSET_HEEL_POS_OPPONENT.x,
            y: a.y + OFFSET_HEEL_POS_OPPONENT.y
        }, OPPONENT_HEEL);
        K = !0
    };
    this.createLeg = function() {
        e = H.addLeg({
            x: a.x + OFFSET_LEG_POS_OPPONENT.x,
            y: a.y + OFFSET_LEG_POS_OPPONENT.y
        }, OPPONENT_LEG);
        F = !0
    };
    this.getLegShoot = function() {
        return F
    };
    this.getHeadShoot =
        function() {
            return P
        };
    this.getHeelShoot = function() {
        return K
    };
    this.protectTheGoal = function(f, l, n, O, e) {
        10 < f || -10 > f ? a.x < l ? this.move(1, D) : a.x > l && this.move(-1, D) : this.move(0, D);
        this.shot(n, O, e)
    };
    this.saveTheBallFromGoal = function(f, l) {
        J = !0;
        10 < l || -10 > l ? this.move(1, D) : this.move(0, D);
        f < HEEL_SHOOT_DISTANCE_OPPONENT && (0 >= q ? !1 === K && (this.createHeel(), this.changeState("heel_shot"), q = randomRange(REACT_OPP_FOR_HEEL_SHOOT.min, REACT_OPP_FOR_HEEL_SHOOT.max)) : q -= 1 / createjs.Ticker.framerate)
    };
    this.move = function(f) {
        1 ===
            f ? ("reverse" !== z && this.changeState("reverse"), z = "reverse") : -1 === f ? ("run" !== z && this.changeState("run"), z = "run") : 0 === f && ("idle" !== z && this.changeState("idle"), z = "idle");
        u = f;
        var l = s_oPhysicsController.getElementPosition(D.fixture1),
            n = s_oPhysicsController.getElementPosition(D.fixture2),
            O = s_oPhysicsController.getElementPosition(D.fixture3);
        l.x += t * f;
        l.x >= m ? l.x = m : l.x <= A && (l.x = A);
        n.x = l.x + OPPONENT_COLLISION.sph_offset.x - OPPONENT_COLLISION.rec_offset.x;
        O.x = l.x + OPPONENT_COLLISION.rec_neck.x - OPPONENT_COLLISION.rec_offset.x;
        s_oPhysicsController.setElementPosition(D.fixture1, l);
        s_oPhysicsController.setElementPosition(D.fixture2, n);
        s_oPhysicsController.setElementPosition(D.fixture3, O);
        a.x = l.x + OPPONENT_COLLISION.rec_center_width;
        a.y = l.y - OPPONENT_COLLISION.rec_offset.y
    };
    this.goToBall = function(f, l, n, O, e, S) {
        n > MIN_DISTANCE_BETWEEN_PLAYER && 0 < G || l.x < e.x || 1 > S ? this.move(-1, D) : 0 < G || a.x > STOP_BACK_WALK_POSITION ? (this.move(0, D), G = 0 >= G ? TIME_TRY_TO_SHOT_BALL_OPPONENT : G - O) : n < GO_TO_DISTANCE && e.x < l.x ? this.move(1, D) : G = TIME_TRY_TO_SHOT_BALL_OPPONENT;
        this.shot(f, l, O)
    };
    this.shot = function(f, l, n) {
        f < DISTANCE_START_SHOOT_OPPONENT && (0 >= I ? (l.y < a.y ? !1 === P && (this.createHead(), 1 === u || -1 === u ? this.changeState("head_shot_run") : this.changeState("head_shot_idle")) : !1 === F && (this.createLeg(), this.changeState("shot")), I = randomRange(TIME_INTERVAL_SHOOT.min, TIME_INTERVAL_SHOOT.max)) : I -= n)
    };
    this.checkAFinishedShoot = function() {
        if (!0 === F) {
            var f = s_oPhysicsController.getJointAngle(e.jointLeg),
                l = {
                    x: a.x + OFFSET_LEG_POS_OPPONENT.x,
                    y: a.y + OFFSET_LEG_POS_OPPONENT.y
                };
            s_oPhysicsController.setElementPosition(e.fixture2,
                l);
            f <= DELETE_LEG_ANGLE_OPPONENT && (s_oGame.removeLeg(e), F = !1)
        } else !0 === P ? (f = s_oPhysicsController.getJointTranslation(y.joint), l = {
            x: a.x + OFFSET_HEAD_POS_OPPONENT.x,
            y: a.y + OFFSET_HEAD_POS_OPPONENT.y
        }, s_oPhysicsController.setElementPosition(y.fixture2, l), f >= PLAYER_HEAD.distance - .1 && (s_oGame.removeHead(y), P = !1)) : !0 === K && (f = s_oPhysicsController.getJointAngle(w.jointLeg), l = {
                x: a.x + OFFSET_HEEL_POS_OPPONENT.x,
                y: a.y + OFFSET_HEEL_POS_OPPONENT.y
            }, s_oPhysicsController.setElementPosition(w.fixture2, l), f >= DELETE_HEEL_ANGLE_OPPONENT &&
            (s_oGame.removeLeg(w), K = !1))
    };
    this.getAggressive = function() {
        return n
    };
    this.setAggressive = function(f, l) {
        E = (n = f) ? OPPONENT_DISTANCE_PROTECTION_AGG : OPPONENT_DISTANCE_PROTECTION[l]
    };
    this.setDistanceProtection = function(f) {
        E = f
    };
    this.restart = function() {
        L = J = M = !1;
        Q = B = I = r = 0;
        this.move(0, D)
    };
    this.activeProtectGoal = function() {
        !1 === M && (M = !0, L = !1, B = randomRange(TIME_REACTION_FROM_SAVE_TO_GO.min, TIME_REACTION_FROM_SAVE_TO_GO.max), I = randomRange(.5 * TIME_INTERVAL_SHOOT.min, .5 * TIME_INTERVAL_SHOOT.max), r = randomRange(TIME_IN_PROTECT_STATE.min,
            TIME_IN_PROTECT_STATE.max), G = TIME_TRY_TO_SHOT_BALL_OPPONENT)
    };
    this.activeGoToBall = function() {
        !1 === L && (I = randomRange(.5 * TIME_INTERVAL_SHOOT.min, .5 * TIME_INTERVAL_SHOOT.max), G = TIME_TRY_TO_SHOT_BALL_OPPONENT, M = !1, L = !0)
    };
    this.chooseAction = function(f, l, n) {
        J = !1;
        0 >= B ? f > E && l.x < BALL_VELOCITY_X_REACTION ? this.activeProtectGoal() : f < E || l.x > BALL_VELOCITY_X_REACTION_ATTACK ? this.activeGoToBall() : l.x < BALL_VELOCITY_X_REACTION_ATTACK ? this.activeProtectGoal() : this.activeGoToBall() : B -= n
    };
    this.decision = function(f, l, n, O,
        e) {
        a.x < f.x + l ? (!1 === J && (q = randomRange(REACT_OPP_FOR_HEEL_SHOOT.min, REACT_OPP_FOR_HEEL_SHOOT.max)), J = !0, L = M = !1) : this.chooseAction(n, O, e)
    };
    this.update = function(f, l, n, O) {
        var e = 1 / createjs.Ticker.framerate;
        this.checkAFinishedShoot();
        var S = s_oGame.getBallSpritePos(),
            q = OBJECT[1][0].x,
            c = q - a.x,
            d = distanceV2({
                x: a.x,
                y: a.y
            }, S),
            b = distanceV2({
                x: a.x,
                y: a.y
            }, n),
            m = OFFSET_OPPONENT_FORWOARD_BALL + .2 * (a.y - OPPONENT_COLLISION.recHeight - S.y);
        0 >= Q ? (this.decision(S, m, d, l, e), Q = TIME_REFRESH_AI[O]) : Q -= e;
        M ? 0 < r ? (this.protectTheGoal(c,
            q, d, S, e), r -= e) : (M = !1, L = !0, B = randomRange(TIME_AFTER_REACTION.min, TIME_AFTER_REACTION.max)) : L ? this.goToBall(d, S, b, e, n, l.x * l.x + l.y * l.y) : J ? this.saveTheBallFromGoal(d, c) : this.move(0);
        s_oPhysicsController.setElementAngle(f.fixture1, 0)
    };
    this._init(b, k, h, d, g, c, p)
}

function CMenu() {
    var b, k, h, d, g, c, p, a, m, A, v;
    this._init = function() {
        p = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(p);
        var t = s_oSpriteLibrary.getSprite("but_play");
        h = CANVAS_WIDTH / 2;
        d = CANVAS_HEIGHT - 90;
        a = new CGfxButton(h, d, t, s_oStage);
        a.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        a.pulseAnimation();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) t = s_oSpriteLibrary.getSprite("audio_icon"), g = CANVAS_WIDTH - t.height / 2 - 10, c = t.height / 2 + 10, v = new CToggle(g, c, t, s_bAudioActive,
            s_oStage), v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var x = s_oSpriteLibrary.getSprite("but_info");
        b = t.height / 2 + 10;
        k = t.height / 2 + 10;
        m = new CGfxButton(b, k, x, s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
        A = new createjs.Shape;
        A.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(A);
        createjs.Tween.get(A).to({
            alpha: 0
        }, 1E3).call(function() {
            A.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(p, x) {
        a.setPosition(h,
            d - x);
        m.setPosition(b + p, k + x);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(g - p, x + c)
    };
    this.unload = function() {
        a.unload();
        a = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), v = null;
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButInfoRelease = function() {
        new CCreditsPanel
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoTeamChoose()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CMain(b) {
    var k, h = 0,
        d = 0,
        g = STATE_LOADING,
        c, p, a;
    this.initContainer = function() {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = !1;
        a.opacity = .5;
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        p = new CPreloader;
        k = !0
    };
    this.soundLoaded = function() {
        h++;
        p.refreshLoader(Math.floor(h / d * 100));
        if (h === d) {
            p.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload",
            createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/click.ogg", "click"), createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack"), createjs.Sound.registerSound("./sounds/crowd.ogg", "crowd"), createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over"), createjs.Sound.registerSound("./sounds/goal.ogg", "goal"), createjs.Sound.registerSound("./sounds/kick.ogg", "kick"), createjs.Sound.registerSound("./sounds/kick_off.ogg", "kick_off")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/click.mp3", "click"), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound("./sounds/crowd.mp3", "crowd"), createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"), createjs.Sound.registerSound("./sounds/goal.mp3", "goal"), createjs.Sound.registerSound("./sounds/kick.mp3", "kick"), createjs.Sound.registerSound("./sounds/kick_off.mp3",
            "kick_off")), d += 7)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_head", "./sprites/but_head.png");
        s_oSpriteLibrary.addSprite("but_kick", "./sprites/but_kick.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_restart_small", "./sprites/but_restart_small.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_continue_big", "./sprites/but_continue_big.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team", "./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("msg_box",
            "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("goal_front", "./sprites/goal_front.png");
        s_oSpriteLibrary.addSprite("goal_back",
            "./sprites/goal_back.png");
        s_oSpriteLibrary.addSprite("keyboard", "./sprites/keyboard.png");
        s_oSpriteLibrary.addSprite("key_head", "./sprites/key_head.png");
        s_oSpriteLibrary.addSprite("key_kick", "./sprites/key_kick.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");
        s_oSpriteLibrary.addSprite("time_board", "./sprites/time_board.png");
        s_oSpriteLibrary.addSprite("contact_ball", "./sprites/contact_ball.png");
        s_oSpriteLibrary.addSprite("goal_text", "./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("crowd_off",
            "./sprites/crowd_off.png");
        s_oSpriteLibrary.addSprite("crowd_on", "./sprites/crowd_on.png");
        s_oSpriteLibrary.addSprite("bg_congratulations", "./sprites/bg_congratulations.jpg");
        s_oSpriteLibrary.addSprite("flag_selection", "./sprites/flag_selection.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        for (var a = 0; a < TOT_TEAM; a++) s_oSpriteLibrary.addSprite("team_" + a, "./sprites/team_" + a + ".png"), s_oSpriteLibrary.addSprite("flag_" + a, "./sprites/flag_" + a + ".png"), s_oSpriteLibrary.addSprite("character_pose_" +
            a, "./sprites/character_pose_" + a + ".png");
        for (a = 0; a < SUPPORTERS_FRAMES; a++) s_oSpriteLibrary.addSprite("supporters_" + a, "./sprites/supporters/supporters_" + a + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        h++;
        p.refreshLoader(Math.floor(h / d * 100));
        if (h === d) {
            p.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded =
        function() {
            this._loadImages()
        };
    this.preloaderReady = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) this._initSounds(), s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop: -1
        });
        this._loadImages();
        k = !0
    };
    this.gotoMenu = function() {
        new CMenu;
        g = STATE_MENU
    };
    this.gotoTeamChoose = function() {
        new CTeamChoose;
        g = STATE_MENU
    };
    this.gotoGame = function(d) {
        a = new CGame(c, d);
        g = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        g = STATE_HELP
    };
    this.gotoCongratulations = function(a, c) {
        new CCongratulations(a, c);
        g = STATE_MENU
    };
    this.stopUpdate = function() {
        k = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block")
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        k = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none")
    };
    this._update = function(c) {
        if (!1 !== k) {
            var d = (new Date).getTime();
            s_iTimeElaps = d - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = d;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            g === STATE_GAME && a.update();
            s_oStage.update(c)
        }
    };
    s_oMain = this;
    c =
        b;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oPhysicsController, s_oAdsLevel = 1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack;

function CLosePanel(b) {
    var k, h, d, g, c, p, a, m, A;
    this._init = function(b) {
        p = new createjs.Container;
        p.alpha = 1;
        p.visible = !1;
        p.y = CANVAS_HEIGHT;
        k = createBitmap(b);
        p.addChild(k);
        h = new createjs.Text("", "32px " + FONT_GAME, "#000000");
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 150;
        h.textAlign = "center";
        h.outline = 5;
        p.addChild(h);
        d = new createjs.Text("", "32px " + FONT_GAME, TEXT_COLOR);
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 150;
        d.textAlign = "center";
        p.addChild(d);
        g = new createjs.Text("", "50px " + FONT_GAME, "#000000");
        g.x = CANVAS_WIDTH /
            2;
        g.y = 174;
        g.textAlign = "center";
        g.outline = 5;
        p.addChild(g);
        c = new createjs.Text("", "50px " + FONT_GAME, TEXT_COLOR);
        c.x = CANVAS_WIDTH / 2;
        c.y = 174;
        c.textAlign = "center";
        p.addChild(c);
        m = new createjs.Container;
        p.addChild(m);
        s_oStage.addChild(p);
        b = s_oSpriteLibrary.getSprite("but_home");
        a = new CGfxButton(.5 * CANVAS_WIDTH - 200, .5 * CANVAS_HEIGHT + 175, b, p);
        a.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
        b = s_oSpriteLibrary.getSprite("but_restart");
        A = new CGfxButton(.5 * CANVAS_WIDTH + 200, .5 * CANVAS_HEIGHT + 175, b, p);
        A.addEventListener(ON_MOUSE_DOWN,
            this._onRestart, this);
        A.pulseAnimation()
    };
    this.unload = function() {
        createjs.Tween.get(p).to({
            alpha: 0
        }, 500, createjs.Ease.cubicOut).call(function() {
            s_oStage.removeChild(p);
            a.unload();
            a = null;
            A.unload();
            A = null
        })
    };
    this.show = function(a, b, k, u) {
        var A = eval("TEXT_TEAM_CODE_" + k),
            z = eval("TEXT_TEAM_CODE_" + u);
        d.text = A + " " + a + " - " + b + " " + z;
        h.text = A + " " + a + " - " + b + " " + z;
        g.text = TEXT_LOSE;
        c.text = TEXT_LOSE;
        a = s_oSpriteLibrary.getSprite("flag_" + k);
        b = createBitmap(a);
        b.x = d.x - 180;
        b.y = d.y + 15;
        b.regX = .5 * a.width;
        b.regY = .5 * a.height;
        b.scaleX = .4;
        b.scaleY = .4;
        m.addChild(b);
        a = s_oSpriteLibrary.getSprite("flag_" + u);
        b = createBitmap(a);
        b.x = d.x + 180;
        b.y = d.y + 15;
        b.regX = .5 * a.width;
        b.regY = .5 * a.height;
        b.scaleX = .4;
        b.scaleY = .4;
        m.addChild(b);
        a = s_oSpriteLibrary.getSprite("character_pose_" + k);
        b = {
            images: [a],
            frames: {
                width: a.width / 3,
                height: a.height,
                regX: a.width / 2 / 3,
                regY: a.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        b = new createjs.SpriteSheet(b);
        k = createSprite(b, "angry", a.width / 2 / 3, a.height / 2, a.width / 3, a.height);
        a = s_oSpriteLibrary.getSprite("character_pose_" +
            u);
        b = {
            images: [a],
            frames: {
                width: a.width / 3,
                height: a.height,
                regX: a.width / 2 / 3,
                regY: a.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        b = new createjs.SpriteSheet(b);
        u = createSprite(b, "win", a.width / 2 / 3, a.height / 2, a.width / 3, a.height);
        u.x = .5 * CANVAS_WIDTH + 440;
        u.y = .5 * CANVAS_HEIGHT + 91;
        u.scaleX = -1;
        p.addChild(u);
        k.x = .5 * CANVAS_WIDTH - 440;
        k.y = .5 * CANVAS_HEIGHT + 91;
        p.addChild(k);
        p.visible = !0;
        createjs.Tween.get(p).to({
            y: 0
        }, 1250, createjs.Ease.elasticOut).call(function() {
            s_oAdsLevel === NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"),
                s_oAdsLevel = 1) : s_oAdsLevel++
        })
    };
    this._onRestart = function() {
        this.unload();
        s_oGame.restartLevel()
    };
    this._onExit = function() {
        this.unload();
        s_oGame.onExit()
    };
    this._init(b);
    return this
}
TEXT_GAMEOVER = "GAME OVER";
TEXT_TEAM_0 = "ARGENTINA";
TEXT_TEAM_1 = "BRASIL";
TEXT_TEAM_2 = "ENGLAND";
TEXT_TEAM_3 = "FRANCE";
TEXT_TEAM_4 = "GERMANY";
TEXT_TEAM_5 = "ITALY";
TEXT_TEAM_6 = "NETHERLAND";
TEXT_TEAM_7 = "SPAIN";
TEXT_COMMANDS = "CONTROLS";
TEXT_COMPLETE = "COMPLETE";
TEXT_ALL_COMPLETE = "ALL LEVEL COMPLETE";
TEXT_SELECT_A_LEVEL = "SELECT A LEVEL";
TEXT_TIME = "TIME";
TEXT_TIME_EXT = "EXT TIME";
TEXT_VS = "VS";
TEXT_TEAM_CODE_0 = "ARG";
TEXT_TEAM_CODE_1 = "BRA";
TEXT_TEAM_CODE_2 = "ENG";
TEXT_TEAM_CODE_3 = "FRA";
TEXT_TEAM_CODE_4 = "GER";
TEXT_TEAM_CODE_5 = "ITA";
TEXT_TEAM_CODE_6 = "NED";
TEXT_TEAM_CODE_7 = "ESP";
TEXT_FINISH = "FINAL WHISTLE";
TEXT_SELECT_YOUR_TEAM = "SELECT YOUR TEAM";
TEXT_CREDITS_DEVELOPED = "Developed by";
TEXT_LINK1 = "www.codethislab.com";
TEXT_WIN = "YOU WON";
TEXT_LOSE = "YOU LOSE";
TEXT_SCORES = "SCORES";
TEXT_TIME_EXTENDED = "TIME EXTENDED";
TEXT_SCORE_GOAL_PLAYER = "SCORE PLAYER GOAL";
TEXT_SCORE_GOAL_OPPONENT = "SCORE OPPONENT GOAL";
TEXT_MACTH_SCORE = "SCORE MATCH";
TEXT_TOTAL_SCORE = "TOTAL SCORE";
TEXT_CONGRATULATIONS = "CONGRATULATIONS YOU WON ALL MATCH!";
TEXT_SCORE_PLAYER_GOAL = "Score player goal";
TEXT_SCORE_OPPONENT_GOAL = "Score opponent goal";
TEXT_SCORE_DRAW_MATCH = "Score match draw";
TEXT_SCOR_WON_MATCH = "Score match won";
TEXT_MATCH = "MATCH";
TEXT_KICK_OFF = "KICK OFF";
TEXT_PAUSE = "PAUSE";
TEXT_ARE_SURE = "ARE SURE?";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CInterface(b, k) {
    var h, d, g, c, p, a, m, A, v, t, x, u, E, z, e, y, w, H, D, N, F, P;
    this._init = function(b, k) {
        this.setTeams(b, k);
        var u = s_oSpriteLibrary.getSprite("score_board");
        z = new CScoreBoard(u, .5 * CANVAS_WIDTH, .5 * u.height, D, N, F, P);
        u = s_oSpriteLibrary.getSprite("time_board");
        e = new CTimeBoard(u, 10, .5 * u.height - 4);
        u = s_oSpriteLibrary.getSprite("crowd_off");
        y = new CCrowd(u, 0, CANVAS_HEIGHT - .5 * u.height);
        s_bMobile && (w = new CController, this.blockCommand(!0));
        u = s_oSpriteLibrary.getSprite("but_exit");
        g = CANVAS_WIDTH - u.height /
            2 - 10;
        c = u.height / 2 + 10;
        m = new CGfxButton(g, c, u, s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onExit, this);
        u = s_oSpriteLibrary.getSprite("but_pause");
        h = g - u.height - 10;
        d = c;
        A = new CGfxButton(h, d, u, s_oStage);
        A.addEventListener(ON_MOUSE_UP, this._onPause, this);
        this.blockAllButton(!0);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) u = s_oSpriteLibrary.getSprite("audio_icon"), p = h - u.height - 10, a = c, t = new CToggle(p, a, u, s_bAudioActive, s_oStage), t.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        v = new CHelpPanel(0,
            0, s_oSpriteLibrary.getSprite("bg_help"), F);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.setTeams = function(a, e) {
        D = eval("TEXT_TEAM_CODE_" + a);
        N = eval("TEXT_TEAM_CODE_" + e);
        F = a;
        P = e
    };
    this.setTeamsFlagScoreBoard = function(a, e) {
        z.changeTeamsFlag(a, e)
    };
    this.refreshButtonPos = function(b, w) {
        m.setPosition(g - b, w + c);
        A.setPosition(h - b, w + d);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || t.setPosition(p - b, w + a);
        var y = z.getStartPosition();
        z.setPosition(y.x, y.y + w);
        y = e.getStartPosition();
        e.setPosition(y.x + b, y.y + w);
        s_bMobile &&
            this.controllerPos(b, w)
    };
    this.controllerPos = function(a, e) {
        var c = w.getStartPositionRightSide(),
            b = w.getStartPositionLeftSide();
        w.setPositionLeftSide(b.x - a, b.y - e);
        w.setPositionRightSide(c.x + a, c.y - e)
    };
    this.unload = function() {
        m.unload();
        m = null;
        v && v.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) t.unload(), t = null;
        s_bMobile && w.unload();
        s_oInterface = null
    };
    this.refreshResult = function(a, e) {
        z.refresh(D + " " + a + " - " + e + " " + N)
    };
    this.refreshTime = function(a) {
        e.refresh(a)
    };
    this.onExitFromHelp = function() {
        this.createVsPanel(null,
            F, P, null, null, 0)
    };
    this.crowdEffectOn = function() {
        var a = y.getPosition(),
            e = s_oSpriteLibrary.getSprite("crowd_on");
        a.y += .3 * e.height;
        y.crowOn(s_oSpriteLibrary.getSprite("crowd_on"), a.x, a.y, 750)
    };
    this.createEndMatchText = function(a, e, c, b, n) {
        var q = new createjs.Container;
        q.x = .5 * CANVAS_WIDTH;
        q.y = -50;
        var d = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, "#000000");
        d.x = 0;
        d.y = 0;
        d.textAlign = "center";
        d.outline = 5;
        q.addChild(d);
        d = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, TEXT_COLOR);
        d.x = 0;
        d.y = 0;
        d.textAlign =
            "center";
        q.addChild(d);
        s_oStage.addChild(q);
        createjs.Tween.get(q).to({
            y: TWEEN_END_MACTH_Y
        }, 1250, createjs.Ease.elasticOut).call(function() {
            createjs.Tween.get(q).to({
                scaleX: 0,
                scaleY: 0
            }, 500, createjs.Ease.quartIn).call(function() {
                c ? s_oInterface.createWinPanel(a, e, b, n) : s_oInterface.createLosePanel(a, e, b);
                setVolume(s_oSoundTrack, 1);
                s_oStage.removeChild(q)
            })
        })
    };
    this.createExtendedTimeText = function() {
        var a = new createjs.Container;
        a.x = -100;
        a.y = .5 * CANVAS_HEIGHT;
        var e = new createjs.Text(TEXT_TIME_EXTENDED, "50px " +
            FONT_GAME, "#000000");
        e.x = 0;
        e.y = 0;
        e.textAlign = "center";
        e.outline = 5;
        a.addChild(e);
        e = new createjs.Text(TEXT_TIME_EXTENDED, "50px " + FONT_GAME, TEXT_COLOR);
        e.x = 0;
        e.y = 0;
        e.textAlign = "center";
        a.addChild(e);
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            x: .5 * CANVAS_WIDTH
        }, 750, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.get(a).to({
                x: CANVAS_WIDTH + 100
            }, 750, createjs.Ease.cubicIn).call(function() {
                s_oGame.extendTime();
                s_oStage.removeChild(a)
            })
        })
    };
    this.createLosePanel = function(a, e) {
        u = new CLosePanel(s_oSpriteLibrary.getSprite("bg_congratulations"));
        u.show(a, e, F, P)
    };
    this.createWinPanel = function(a, e, c, b) {
        E = new CWinPanel(s_oSpriteLibrary.getSprite("bg_congratulations"), b);
        E.show(a, e, F, P, c)
    };
    this.createVsPanel = function(a, e, c, b, n, q) {
        x = new CVsPanel(a, e, c, n, q);
        null !== b && x.setChildIndex(b)
    };
    this.blockAllButton = function(a) {
        m.block(a);
        A.block(a)
    };
    this.getScoreBoardResult = function() {
        return z.getResult()
    };
    this.unloadHelpPanel = function() {
        v && (v.unload(), v = null)
    };
    this.createGoalText = function(a, e) {
        var c = s_oSpriteLibrary.getSprite("goal_text"),
            b;
        b = createBitmap(c);
        b.regX = .5 * c.width;
        b.regY = .5 * c.height;
        b.x = a;
        b.y = e;
        b.scaleX = 0;
        b.scaleY = 0;
        s_oStage.addChild(b);
        createjs.Tween.get(b).to({
            scaleX: 1,
            scaleY: 1
        }, 500, createjs.Ease.quadOut).call(function() {
            createjs.Tween.get(b).wait(500).to({
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 500, createjs.Ease.quadOut).call(function() {
                s_oStage.removeChild(b)
            })
        })
    };
    this._onExitVsPanel = function() {
        x.unload();
        x = null
    };
    this.createStartMatchText = function() {
        var a = new createjs.Container;
        a.x = .5 * CANVAS_WIDTH;
        a.y = -50;
        var e = new createjs.Text(TEXT_KICK_OFF, "50px " +
            FONT_GAME, "#000000");
        e.x = 0;
        e.y = 0;
        e.textAlign = "center";
        e.outline = 5;
        a.addChild(e);
        e = new createjs.Text(TEXT_KICK_OFF, "50px " + FONT_GAME, TEXT_COLOR);
        e.x = 0;
        e.y = 0;
        e.textAlign = "center";
        a.addChild(e);
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            y: TWEEN_END_MACTH_Y
        }, 1250, createjs.Ease.elasticOut).call(function() {
            createjs.Tween.get(a).to({
                scaleX: 0,
                scaleY: 0
            }, 500, createjs.Ease.quartIn).call(function() {
                s_oGame.startMatch();
                s_oStage.removeChild(a)
            })
        })
    };
    this.createPauseInterface = function() {
        H = new CPause
    };
    this.unloadPause =
        function() {
            H.unload();
            H = null
        };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        (new CAreYouSurePanel(s_oStage)).show()
    };
    this.blockCommand = function(a) {
        s_bMobile && w.block(a)
    };
    this._onPause = function() {
        s_oGame.unpause(!1);
        this.createPauseInterface()
    };
    s_oInterface = this;
    this._init(b, k);
    return this
}
var s_oInterface = null;

function CHelpPanel(b, k, h, d) {
    var g, c, p, a = !1,
        m, A, v, t, x, u, E;
    this._init = function(a, e, c, b) {
        m = createBitmap(c);
        A = new createjs.Container;
        A.x = a;
        A.y = e;
        A.addChild(m);
        s_oStage.addChild(A);
        this.page1();
        A.on("pressup", function() {
            var a = {
                container: v,
                next_page: 3
            };
            !0 !== v.visible && !0 === t.visible && (a.container = t);
            x ? x.block(!0) : u && (u.block(!0), E.block(!0));
            s_oHelpPanel.onButPress(a)
        }, null, !0);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.page1 = function() {
        if (v) v.visible = !0, createjs.Tween.get(v).to({
                alpha: 1
            }, 750,
            createjs.Ease.cubicOut);
        else {
            v = new createjs.Container;
            v.alpha = 0;
            var a;
            a = new createjs.Text(TEXT_COMMANDS, "40px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            a.outline = 5;
            v.addChild(a);
            a = new createjs.Text(TEXT_COMMANDS, "40px " + FONT_GAME, TEXT_COLOR);
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            v.addChild(a);
            this._createPlayer(d, "run", .5 * CANVAS_WIDTH - 220, .5 * CANVAS_HEIGHT - 20, v);
            this._createPlayer(d, "shot_help",
                .5 * CANVAS_WIDTH + 220, .5 * CANVAS_HEIGHT - 20, v);
            this._createPlayer(d, "head_help", .5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT - 20, v);
            if (s_bMobile) {
                a = s_oSpriteLibrary.getSprite("arrow");
                var e;
                e = createBitmap(a);
                e.regX = .5 * a.width;
                e.regY = .5 * a.height;
                e.x = .5 * CANVAS_WIDTH - 270;
                e.y = .5 * CANVAS_HEIGHT + 110;
                e.scaleX = -.7;
                e.scaleY = .7;
                v.addChild(e);
                e = createBitmap(a);
                e.regX = .5 * a.width;
                e.regY = .5 * a.height;
                e.x = .5 * CANVAS_WIDTH - 170;
                e.y = .5 * CANVAS_HEIGHT + 110;
                e.scaleX = .7;
                e.scaleY = .7;
                v.addChild(e);
                a = s_oSpriteLibrary.getSprite("but_kick");
                e =
                    createBitmap(a);
                e.regX = .5 * a.width;
                e.regY = .5 * a.height;
                e.x = .5 * CANVAS_WIDTH + 220;
                e.y = .5 * CANVAS_HEIGHT + 110;
                e.scaleX = .6;
                e.scaleY = .6;
                v.addChild(e);
                a = s_oSpriteLibrary.getSprite("but_head");
                e = createBitmap(a);
                e.regX = .5 * a.width;
                e.regY = .5 * a.height;
                e.x = .5 * CANVAS_WIDTH;
                e.y = .5 * CANVAS_HEIGHT + 110;
                e.scaleX = .6;
                e.scaleY = .6
            } else a = s_oSpriteLibrary.getSprite("keyboard"), e = createBitmap(a), e.regX = .5 * a.width, e.regY = .5 * a.height, e.x = .5 * CANVAS_WIDTH - 220, e.y = .5 * CANVAS_HEIGHT + 130, v.addChild(e), a = s_oSpriteLibrary.getSprite("key_kick"),
                e = createBitmap(a), e.regX = .5 * a.width, e.regY = .5 * a.height, e.x = .5 * CANVAS_WIDTH + 220, e.y = .5 * CANVAS_HEIGHT + 130, v.addChild(e), a = s_oSpriteLibrary.getSprite("key_head"), e = createBitmap(a), e.regX = .5 * a.width, e.regY = .5 * a.height, e.x = .5 * CANVAS_WIDTH, e.y = .5 * CANVAS_HEIGHT + 130;
            v.addChild(e);
            createjs.Tween.get(v).to({
                alpha: 1
            }, 750, createjs.Ease.cubicOut);
            g = {
                x: .5 * CANVAS_WIDTH + 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            x = this.createButtonSwitchPage(g, v, this.onButPress, 1, {
                container: v,
                next_page: 2
            });
            x.pulseAnimation();
            s_oStage.addChild(v)
        }
    };
    this.page2 = function() {
        if (t) t.visible = !0, createjs.Tween.get(t).to({
            alpha: 1
        }, 750, createjs.Ease.cubicOut);
        else {
            t = new createjs.Container;
            t.alpha = 0;
            var a;
            a = new createjs.Text(TEXT_SCORES, "40px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            a.outline = 5;
            t.addChild(a);
            var e;
            e = new createjs.Text(TEXT_SCORES, "40px " + FONT_GAME, TEXT_COLOR);
            e.textAlign = "center";
            e.lineWidth = 600;
            e.x = a.x;
            e.y = a.y;
            t.addChild(e);
            a = new createjs.Text(TEXT_SCORE_PLAYER_GOAL + " +" + SCORE_PLAYER_GOAL,
                "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 60;
            a.outline = 5;
            t.addChild(a);
            e = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            e.textAlign = "center";
            e.lineWidth = 600;
            e.x = a.x;
            e.y = a.y;
            t.addChild(e);
            a = new createjs.Text(TEXT_SCORE_OPPONENT_GOAL + " " + SCORE_OPPONENT_GOAL, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT;
            a.outline = 5;
            t.addChild(a);
            e = new createjs.Text(a.text, "24px " + FONT_GAME,
                TEXT_COLOR);
            e.textAlign = "center";
            e.lineWidth = 600;
            e.x = a.x;
            e.y = a.y;
            t.addChild(e);
            a = new createjs.Text(TEXT_SCORE_DRAW_MATCH + " +" + SCORE_TIE, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT + 60;
            a.outline = 5;
            t.addChild(a);
            e = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            e.textAlign = "center";
            e.lineWidth = 600;
            e.x = a.x;
            e.y = a.y;
            t.addChild(e);
            a = new createjs.Text(TEXT_SCOR_WON_MATCH + " +" + SCORE_WIN, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT + 120;
            a.outline = 5;
            t.addChild(a);
            e = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            e.textAlign = "center";
            e.lineWidth = 600;
            e.x = a.x;
            e.y = a.y;
            t.addChild(e);
            createjs.Tween.get(t).to({
                alpha: 1
            }, 750, createjs.Ease.cubicOut);
            c = {
                x: .5 * CANVAS_WIDTH - 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            u = this.createButtonSwitchPage(c, t, this.onButPress, -1, {
                container: t,
                next_page: 1
            });
            p = {
                x: .5 * CANVAS_WIDTH + 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            E = this.createButtonSwitchPage(p, t, this.onButPress,
                1, {
                    container: t,
                    next_page: 3
                });
            E.pulseAnimation();
            s_oStage.addChild(t);
            this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
        }
    };
    this.onButPress = function(c) {
        1 === c.next_page ? (E.block(!0), u.block(!0), x.block(!1)) : 2 === c.next_page ? (x.block(!0), u && (E.block(!1), u.block(!1))) : 3 === c.next_page && (u && (E.block(!0), u.block(!0)), x.block(!0));
        createjs.Tween.get(c.container).to({
            alpha: 0
        }, 800).call(function() {
            c.container.visible = !1;
            1 === c.next_page ? s_oHelpPanel.page1() : 2 === c.next_page ? s_oHelpPanel.page2() : 3 !== c.next_page || a || s_oHelpPanel._onExitHelp()
        })
    };
    this._createPlayer = function(a, e, c, b, d) {
        a = s_oSpriteLibrary.getSprite("team_" + a);
        c = new CCharacter(c, b, a, 1, d);
        c.changeState(e);
        return c
    };
    this.createButtonSwitchPage = function(a, e, c, b, d) {
        var g = s_oSpriteLibrary.getSprite("but_continue");
        a = new CGfxButton(a.x, a.y, g, e);
        a.addEventListenerWithParams(ON_MOUSE_UP, c, this, d);
        a.setScaleX(b);
        return a
    };
    this.refreshButtonPos = function(a, e) {
        x.setPosition(g.x - a, g.y - e);
        u && u.setPosition(c.x + a, c.y - e);
        E && E.setPosition(p.x - a, p.y - e)
    };
    this.unload = function() {
        createjs.Tween.get(A).to({
                alpha: 0
            },
            700, createjs.Ease.cubicOut).call(function() {
            s_oStage.removeChild(A)
        })
    };
    this._onExitHelp = function() {
        a = !0;
        s_oStage.removeChild(v);
        s_oStage.removeChild(t);
        s_oGame._onExitHelp()
    };
    s_oHelpPanel = this;
    this._init(b, k, h, d)
}
var s_oHelpPanel = null;

function CGoal() {
    var b, k, h, d, g;
    this._init = function() {
        b = [];
        var c = OBJECT[0][0],
            d = OBJECT[1][0],
            a = s_oSpriteLibrary.getSprite("goal_back");
        k = createBitmap(a);
        k.x = c.x + c.offset_back.x;
        k.y = c.y + c.offset_back.y;
        k.regX = .5 * a.width;
        k.regy = .5 * a.heigth;
        s_oStage.addChild(k);
        b[0] = k;
        h = createBitmap(a);
        h.x = d.x + d.offset_back.x;
        h.y = d.y + d.offset_back.y;
        h.regX = .5 * a.width;
        h.regy = .5 * a.heigth;
        h.scaleX = -1;
        s_oStage.addChild(h);
        b[1] = h
    };
    this.createGoalFront = function() {
        var c = OBJECT[0][0],
            h = OBJECT[1][0],
            a = s_oSpriteLibrary.getSprite("goal_front");
        d = createBitmap(a);
        d.x = c.x + c.offset_front.x;
        d.y = c.y + c.offset_front.y;
        d.regX = .5 * a.width;
        d.regy = .5 * a.heigth;
        s_oStage.addChild(d);
        b[2] = d;
        g = createBitmap(a);
        g.x = h.x + h.offset_front.x;
        g.y = h.y + h.offset_front.y;
        g.regX = .5 * a.width;
        g.regy = .5 * a.heigth;
        g.scaleX = -1;
        s_oStage.addChild(g);
        b[3] = g
    };
    this.unload = function() {
        for (var c = 0; c < b.length; c++) s_oStage.removeChild(b[c])
    };
    this._init();
    return this
}

function CGfxButton(b, k, h, d) {
    var g, c, p, a, m, A, v, t = !1,
        x;
    this._init = function(a, b, d) {
        g = [];
        c = [];
        p = createBitmap(d);
        p.x = a;
        p.y = b;
        A = m = 1;
        p.regX = d.width / 2;
        p.regY = d.height / 2;
        s_bMobile || (p.cursor = "pointer");
        x.addChild(p);
        this._initListener()
    };
    this.unload = function() {
        p.off("mousedown", this.buttonDown);
        p.off("pressup", this.buttonRelease);
        x.removeChild(p)
    };
    this.setVisible = function(a) {
        p.visible = a
    };
    this.setCursorType = function(a) {
        p.cursor = a
    };
    this._initListener = function() {
        p.on("mousedown", this.buttonDown);
        p.on("pressup",
            this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        g[a] = b;
        c[a] = d
    };
    this.addEventListenerWithParams = function(b, d, m, e) {
        g[b] = d;
        c[b] = m;
        a = e
    };
    this.buttonRelease = function() {
        t || (p.scaleX = 0 < m ? 1 : -1, p.scaleY = 1, playSound("click", 1, 0), g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(c[ON_MOUSE_UP], a))
    };
    this.buttonDown = function() {
        t || (p.scaleX = 0 < m ? .9 : -.9, p.scaleY = .9, g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(c[ON_MOUSE_DOWN], a))
    };
    this.rotation = function(a) {
        p.rotation = a
    };
    this.getButton = function() {
        return p
    };
    this.setPosition =
        function(a, c) {
            p.x = a;
            p.y = c
        };
    this.setX = function(a) {
        p.x = a
    };
    this.setY = function(a) {
        p.y = a
    };
    this.getButtonImage = function() {
        return p
    };
    this.block = function(a) {
        t = a;
        p.scaleX = m;
        p.scaleY = A
    };
    this.setScaleX = function(a) {
        m = p.scaleX = a
    };
    this.getX = function() {
        return p.x
    };
    this.getY = function() {
        return p.y
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(p).to({
            scaleX: .9 * m,
            scaleY: .9 * A
        }, 850, createjs.Ease.quadOut).to({
            scaleX: m,
            scaleY: A
        }, 650, createjs.Ease.quadIn).call(function() {
            v.pulseAnimation()
        })
    };
    this.trebleAnimation = function() {
        createjs.Tween.get(p).to({
                rotation: 5
            },
            75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            v.trebleAnimation()
        })
    };
    this.removeAllTweens = function() {
        createjs.Tween.removeTweens(p)
    };
    x = d;
    this._init(b, k, h);
    v = this;
    return this
}

function CGame(b, k) {
    function h(f) {
        !0 === c && (88 === f.keyCode ? s_oGame.shot() : 90 !== f.keyCode || a || s_oGame.headShot(), p || (37 === f.keyCode ? s_oGame.moveLeft() : 39 === f.keyCode && s_oGame.moveRight()));
        f.preventDefault();
        return !1
    }

    function d(f) {
        if (!0 === c) {
            if (37 === f.keyCode) s_oGame.onCommandLeftUp();
            else if (39 === f.keyCode) s_oGame.onCommandRightUp();
            if (90 === f.keyCode || 88 === f.keyCode) s_oGame.onCommandActionUp()
        }
    }
    var g = !0,
        c = !1,
        p = !1,
        a = !1,
        m = !1,
        A = !1,
        v = !1,
        t = !0,
        x = !1,
        u, E, z, e, y, w, H, D, N, F, P, K, M, J, L, n, q, B, r, I, Q, G, f, l, C, O, R;
    this._init =
        function() {
            $(s_oMain).trigger("start_session");
            g = !1;
            E = u = 0;
            H = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
            s_oStage.addChild(H);
            s_oPhysicsController = new CPhysicsController;
            F = new CPhysicsObject;
            F.createAContactListener();
            G = [];
            f = [];
            l = [];
            this.createSupporters();
            var a = s_oSpriteLibrary.getSprite("team_" + k);
            r = new CGoal;
            var n = s_oSpriteLibrary.getSprite("ball");
            this._createBall(n, BALL_POSITION.x, BALL_POSITION.y, BALL_DENSITY, BALL_FRICTION, BALL_RESTITUTION);
            this._createPlayer(a, USER_PLAYER_START_POS.x,
                USER_PLAYER_START_POS.y, s_oStage);
            this.createLevel();
            z = k;
            C = this._createRandomOpponentTeamOrder();
            q = this._createOpponentCollision();
            this.createOpponent(C[E], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);
            r.createGoalFront();
            O = e = y = 0;
            Q = playSound("crowd", 1, -1);
            w = new CInterface(k, C[E]);
            w.refreshResult(e, y);
            R = REGULAR_MATCH_TIME;
            w.refreshTime(TEXT_TIME + ": " + Math.ceil(R));
            !1 === s_bMobile && (document.onkeydown = h, document.onkeyup = d)
        };
    this._createRandomOpponentTeamOrder = function() {
        for (var f = [], a = 0, O = 0; O <
            TOT_TEAM; O++) z !== O && (f[a] = O, a++);
        return f = shuffle(f)
    };
    this.createLevel = function() {
        for (var a = FIELD_DIAGRAM, O = 0; O < a.length; O++) G[O] = F.addLine(0, 0, a[O][0], a[O][1], 0, WALL_DENSITY, WALL_FRICTION, WALL_RESTITUTION);
        a = OBJECT;
        for (O = 0; O < a.length; O++)
            for (var l = 0; l < a[O].length; l++) a[O][l].info.type !== POLE ? f[O] = {
                object: F.addPolygon(a[O][l]),
                type: "polygon"
            } : a[O][l].info.type === POLE && (f[O] = {
                object: F.addRectangle(a[O][l], void 0),
                type: "polygon"
            }), this.createSpriteObject(a[O][l])
    };
    this.onCommandLeftUp = function() {
        p = !1;
        J.setDirection(0);
        _bPressedKeyLeft = !1;
        J.changeState("idle")
    };
    this.onCommandRightUp = function() {
        p = !1;
        J.setDirection(0);
        _bPressedKeyRight = !1;
        J.changeState("idle")
    };
    this.onCommandActionUp = function() {
        a = !1
    };
    this.shot = function() {
        !1 === J.getHeadShoot() && !1 === J.getHeelShoot() && !1 === J.getLegShoot() && (t ? (J.createPlayerLeg(F), J.changeState("shot")) : (J.createHeel(F), J.changeState("heel_shot")))
    };
    this.headShot = function() {
        !1 === J.getHeadShoot() && !1 === J.getHeelShoot() && !1 === J.getLegShoot() && (J.createPlayerHead(F),
            0 === J.getDirection() ? J.changeState("head_shot_idle") : -1 !== J.getDirection() && 1 !== J.getDirection() || J.changeState("head_shot_run"))
    };
    this.moveLeft = function() {
        p = !0;
        J.setDirection(-1);
        J.changeState("reverse")
    };
    this.moveRight = function() {
        p = !0;
        J.setDirection(1);
        J.changeState("run");
        J.rotate(1)
    };
    this.createSpriteObject = function(f) {
        f.info.type !== GOAL_AREA && f.info.type !== GOAL_AREA_ENEMY && f.info.type === WALL && this.createGraphicsWallObject(f)
    };
    this.setBallLinearDamping = function(f) {
        s_oPhysicsController.setElementLinearDamping(P,
            f)
    };
    this.unload = function() {
        g = !1;
        N && (N.unload(), N = null);
        D && (D.unload(), D = null);
        w.unload();
        K.unload();
        this.destroyEnginePhysics();
        J.unload();
        L.unload();
        Q.destroy();
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        !1 === s_bMobile && (document.onkeydown = null, document.onkeyup = null)
    };
    this.destroyEnginePhysics = function() {
        s_oPhysicsController.destroyAllJoint();
        s_oPhysicsController.destroyAllBody();
        s_oPhysicsController.destroyWorld();
        s_oPhysicsController = null
    };
    this._createPlayer = function(f, a, O, l) {
        J =
            new CCharacter(a, O, f, CHARACTER_SPEED, l);
        n = F.addCollisionShape(PLAYERS_COLLISION);
        J.update(n)
    };
    this.createOpponent = function(f, a, O, l) {
        f = s_oSpriteLibrary.getSprite("team_" + f);
        L = new COpponent(a, O, f, OPPONENT_SPEEDS[E], F, q, l);
        L.setDistanceProtection(OPPONENT_DISTANCE_PROTECTION[E])
    };
    this._createOpponentCollision = function() {
        return F.addCollisionShape(OPPONENT_COLLISION)
    };
    this.resetPlayersPos = function() {
        J.setPosition(USER_PLAYER_START_POS.x, USER_PLAYER_START_POS.y);
        var f = {
                x: J.getX() + PLAYERS_COLLISION.rec_offset.x,
                y: J.getY() + PLAYERS_COLLISION.rec_offset.y
            },
            a = {
                x: J.getX() + PLAYERS_COLLISION.sph_offset.x,
                y: J.getY() + PLAYERS_COLLISION.sph_offset.y
            };
        s_oPhysicsController.setElementPosition(n.fixture1, f);
        s_oPhysicsController.setElementPosition(n.fixture2, a);
        c = !0
    };
    this.resetOpponentPos = function() {
        L.setPosition(OPPONENT_START_POS.x, OPPONENT_START_POS.y);
        var f = {
                x: L.getX() + OPPONENT_COLLISION.rec_offset.x,
                y: L.getY() + OPPONENT_COLLISION.rec_offset.y
            },
            a = {
                x: L.getX() + OPPONENT_COLLISION.sph_offset.x,
                y: L.getY() + OPPONENT_COLLISION.sph_offset.y
            };
        s_oPhysicsController.setElementPosition(q.fixture1, f);
        s_oPhysicsController.setElementPosition(q.fixture2, a)
    };
    this.removeLeg = function(f) {
        s_oPhysicsController.destroyJoint(f.jointLeg);
        s_oPhysicsController.destroyJoint(f.jointFoot);
        s_oPhysicsController.destroyBody(f.fixture1);
        s_oPhysicsController.destroyBody(f.fixture2);
        s_oPhysicsController.destroyBody(f.fixture3)
    };
    this.removeHead = function(f) {
        s_oPhysicsController.destroyJoint(f.joint);
        s_oPhysicsController.destroyBody(f.fixture1);
        s_oPhysicsController.destroyBody(f.fixture2)
    };
    this._createBall = function(f, a, O, l, n, e) {
        P = F.addBall(f.width / 2, a, O, l, n, e);
        K = new CBall(a, O, f)
    };
    this.getBallSpritePos = function() {
        return {
            x: K.getX(),
            y: K.getY()
        }
    };
    this.getCharacterPos = function() {
        return {
            x: J.getX(),
            y: J.getY()
        }
    };
    this.getPlayerTeam = function() {
        return z
    };
    this.getOpponentTeam = function() {
        return C[E]
    };
    this.addImpulseToBall = function(f) {
        s_oPhysicsController.applyImpulse(P, f)
    };
    this.setBallLinearDamping = function(f) {
        s_oPhysicsController.setElementLinearDamping(P, f)
    };
    this.playerGoal = function() {
        A || m || (e++,
            w.crowdEffectOn(), I.startAnimation(1), this.afterGoal(), playSound("goal", 1, 0), B = FORCE_AFTER_GOAL_PLAYER)
    };
    this.createSupporters = function() {
        I = new CSpriteAnimator;
        for (var f = 0; f < SUPPORTERS_FRAMES; f++) I.loadSprites(s_oSpriteLibrary.getSprite("supporters_" + f), SUPPORTERS_POS.x, SUPPORTERS_POS.y, 0, 0)
    };
    this.opponentGoal = function() {
        A || m || (y++, this.afterGoal(), playSound("game_over", 1, 0), B = FORCE_AFTER_GOAL_OPPONENT)
    };
    this.playKickSound = function() {
        m || playSound("kick", 1, 0)
    };
    this.afterGoal = function() {
        w.refreshResult(e,
            y);
        A = !0;
        O = TIME_RESET_BALL;
        w.createGoalText(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT - 150);
        this.blockMatch();
        this.setBallLinearDamping(BALL_LINEAR_DAMPING_GOAL)
    };
    this.blockMatch = function() {
        c = !1;
        J.setDirection(0);
        J.changeState("idle");
        L.move(0);
        _bPressedKeyRight = _bPressedKeyLeft = !1;
        v = !0;
        p = !1;
        s_bMobile && w.blockCommand(!0)
    };
    this.restartBallPos = function() {
        var f = {
            x: BALL_POSITION.x,
            y: BALL_POSITION.y
        };
        s_oPhysicsController.setElementPosition(P, f);
        s_oPhysicsController.setElementLinearVelocity(P, {
            x: 0,
            y: 0
        });
        s_oPhysicsController.setElementAngularVelocity(P,
            0);
        0 >= s_oPhysicsController.getElementPosition(P).x && s_oPhysicsController.setElementPosition(P, f);
        this.moveBall();
        this.setBallLinearDamping(BALL_LINEAR_DAMPING)
    };
    this.resetState = function() {
        v = A = !1
    };
    this.addObjectToStage = function(f, a, O) {
        f.x = a.x;
        f.y = a.y;
        f.regX = O.width / 2;
        f.regY = O.height / 2;
        s_oStage.addChild(f)
    };
    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoMenu()
    };
    this._onExitHelp = function() {
        w.onExitFromHelp()
    };
    this._onExitVsPanel = function() {
        w._onExitVsPanel();
        w.createStartMatchText();
        $(s_oMain).trigger("start_level", E)
    };
    this.startMatch = function() {
        c = g = !0;
        this.resetState();
        x = m = !1;
        w.blockAllButton(!1);
        s_bMobile && w.blockCommand(!1);
        setVolume(s_oSoundTrack, .3);
        playSound("kick_off", 1, 0)
    };
    this.moveBall = function() {
        var f = s_oPhysicsController.getElementPosition(P);
        K.setPosition(f.x, f.y);
        K.setAngle(f.angle)
    };
    this.addHitEffect = function(f) {
        if (!m) {
            var a, O = s_oSpriteLibrary.getSprite("contact_ball");
            a = createBitmap(O);
            a.x = f.x;
            a.y = f.y;
            a.regX = .5 * O.width;
            a.regY = .5 * O.height;
            s_oStage.addChild(a);
            createjs.Tween.get(a).wait(100).call(function() {
                s_oStage.removeChild(a)
            })
        }
    };
    this.unloadLevel = function() {
        for (var a = 0; a < G.length; a++) s_oPhysicsController.destroyBody(G[a]);
        for (a = 0; a < f.length; a++)
            if ("polygon" === f[a].type) s_oPhysicsController.destroyBody(f[a].object);
            else if ("line" === f[a].type)
            for (var O = f[a].object, l = 0; l < O.length; l++) s_oPhysicsController.destroyBody(O[l]);
        G = [];
        f = []
    };
    this.onContinue = function(f) {
        E++;
        this.nextLevel();
        this.restartBallPos();
        this.resetOpponentPos();
        this.resetPlayersPos();
        this.resetResult();
        c = g = !1;
        s_bMobile && w.blockCommand(!0);
        J.update(n, L.getX());
        s_oPhysicsController.update();
        var a = s_oSpriteLibrary.getSprite("msg_box");
        w.createVsPanel(a, z, C[E], f, E, 750)
    };
    this.unpause = function(f) {
        g = f;
        !0 === f ? (J.playAnimation(), L.playAnimation()) : (J.stopAnimation(), L.stopAnimation())
    };
    this.nextLevel = function() {
        var f = L.getChildIndex();
        L.unload();
        this.createOpponent(C[E], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);
        L.setChildIndex(f);
        w.setTeams(z, C[E]);
        w.setTeamsFlagScoreBoard(z, C[E])
    };
    this.restartLevel = function() {
        this.resetResult();
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetOpponentPos();
        this.resetState();
        w.blockAllButton(!1);
        m = x = !1;
        playSound("kick_off", 1, 0)
    };
    this.resetResult = function() {
        R = REGULAR_MATCH_TIME;
        w.refreshTime(TEXT_TIME + ": " + Math.ceil(R));
        e = y = 0;
        w.refreshResult(e, y)
    };
    this.ballForwoardPlayer = function() {
        t = J.getX() > K.getX() ? !1 : !0
    };
    this.matchTime = function(f) {
        0 < R ? (R -= f, w.refreshTime(!1 === x ?
            TEXT_TIME + ": " + Math.ceil(R) : TEXT_TIME_EXT + ": " + Math.ceil(R)), this.changeOpponentStrategy()) : this.finishTime()
    };
    this.changeOpponentStrategy = function() {
        y < e && R < TIME_OPP_BECOME_AGGRESSIVE ? L.getAggressive() || L.setAggressive(!0, E) : L.getAggressive() && L.setAggressive(!1, E)
    };
    this.extendTime = function() {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        R = EXTENDED_MATCH_TIME;
        w.refreshTime(TEXT_TIME_EXT + ": " + Math.ceil(R));
        m = !1;
        playSound("kick_off", 1, 0)
    };
    this.finishTime = function() {
        this.blockMatch();
        J.changeState("idle");
        L.changeState("idle");
        m = !0;
        if (e === y && !1 === x) w.createExtendedTimeText(), x = !0;
        else {
            w.blockAllButton(!0);
            var f = !1,
                a = !1;
            L.removeAllComponent();
            var O = this.calculateNewScore();
            e > y ? (f = !0, playSound("goal", 1, 0), u = O.new_score, this.storesResult(), E === TOT_TEAM - 2 && (a = !0)) : (f = !1, playSound("game_over", 1, 0));
            $(s_oMain).trigger("end_level", E);
            w.createEndMatchText(e, y, f, O, a);
            w.blockAllButton(!0)
        }
    };
    this.storesResult = function() {
        l[E] = {
            player_team: z,
            opponent_team: C[E],
            result: w.getScoreBoardResult()
        }
    };
    this._onEnd = function() {
        this.unload();
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoCongratulations(l, u)
    };
    this.calculateNewScore = function() {
        var f = {
            score: u,
            player_goal_score: 0,
            opponent_goal_score: 0,
            score_match: 0,
            new_score: 0
        };
        f.player_goal_score = e * SCORE_PLAYER_GOAL;
        f.opponent_goal_score = y * SCORE_OPPONENT_GOAL;
        f.score_match = x ? SCORE_TIE : SCORE_WIN;
        f.new_score = f.score + f.player_goal_score + f.opponent_goal_score + f.score_match;
        return f
    };
    this.startGameAfterGoal = function() {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        playSound("kick_off", 1, 0);
        s_bMobile && w.blockCommand(!1);
        this.addImpulseToBall(B)
    };
    this.update = function() {
        if (g) {
            var f = 1 / createjs.Ticker.framerate;
            this.moveBall();
            M = s_oPhysicsController.getElementVelocity(P);
            if (A) I.getStateAnimation() && I.update(), O -= f, 0 >= O && this.startGameAfterGoal();
            else {
                if (!v) {
                    var a = {
                        x: J.getX(),
                        y: J.getY()
                    };
                    L.update(q, M, a, E)
                }
                m || this.matchTime(f)
            }
            this.ballForwoardPlayer();
            J.update(n, L.getX());
            s_oPhysicsController.update()
        }
    };
    s_oGame = this;
    TIME_RESET_BALL = b.time_reset_ball;
    REGULAR_MATCH_TIME = b.regular_match_time;
    EXTENDED_MATCH_TIME = b.extend_match_time;
    SCORE_PLAYER_GOAL = b.add_score_player_goal;
    SCORE_OPPONENT_GOAL = b.remove_score_opponent_goal;
    SCORE_WIN = b.score_win;
    SCORE_TIE = b.score_tie;
    OPPONENT_SPEEDS = b.opponent_speeds;
    CHARACTER_SPEED = b.character_speed;
    OPPONENT_DISTANCE_PROTECTION = b.opponent_distance_protection;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT = b.opponent_distance_protection_after_shoot;
    OPPONENT_DISTANCE_PROTECTION_AGG =
        b.opponent_distance_protection_aggressive;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG = b.opponent_distance_protection_after_shoot_aggressive;
    REACT_OPP_FOR_HEEL_SHOOT = b.reactivity_opponent_for_hell_shoot;
    BALL_AND_CHARACTER_DISTANCE_PROTECTION = b.ball_and_character_distance_protection;
    BALL_VELOCITY_X_REACTION = b.ball_velocity_x_reaction;
    BALL_VELOCITY_X_REACTION_ATTACK = b.ball_velocity_x_reaction_attack;
    TIME_REACTION_FROM_SAVE_TO_GO = b.time_reaction_from_save_to_go;
    TIME_OPP_BECOME_AGGRESSIVE = b.time_opp_become_aggressive;
    TIME_AFTER_REACTION = b.time_after_reaction;
    TIME_INTERVAL_SHOOT = b.time_interval_shoot;
    TIME_IN_PROTECT_STATE = b.time_in_protection_state;
    TIME_REFRESH_AI = b.time_refresh_AI;
    NUM_LEVEL_FOR_ADS = b.num_levels_for_ads;
    this._init()
}
var s_oGame;

function CCrowd(b, k, h) {
    var d, g;
    this._init = function(c, b, a) {
        d = createBitmap(c);
        d.x = b;
        d.y = a;
        d.regX = 0;
        d.regY = .5 * c.height;
        g = new createjs.Container;
        g.addChild(d);
        s_oStage.addChild(g)
    };
    this.getPosition = function() {
        return {
            x: d.x,
            y: d.y
        }
    };
    this.crowOn = function(c, b, a, d) {
        var h;
        h = createBitmap(c);
        h.x = b;
        h.y = a;
        h.regX = 0;
        h.regY = .5 * c.height;
        g.addChild(h);
        c = a + TWEEN_CROWD_ON_Y;
        createjs.Tween.get(h).to({
            y: c
        }, d, createjs.Ease.quartOut).call(function() {
            createjs.Tween.get(h).to({
                y: a
            }, d - 100, createjs.Ease.quartIn).call(function() {
                s_oStage.removeChild(h)
            })
        })
    };
    this.unload = function() {
        s_oStage.removeChild(g)
    };
    this._init(b, k, h);
    return this
}

function CCreditsPanel() {
    var b, k, h, d, g, c, p, a, m, A;
    this._init = function() {
        A = new createjs.Container;
        s_oStage.addChild(A);
        k = createBitmap(s_oSpriteLibrary.getSprite("bg_select_team"));
        A.addChild(k);
        p = new createjs.Shape;
        p.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.alpha = .01;
        p.on("click", this._onLogoButRelease);
        p.cursor = "pointer";
        A.addChild(p);
        var v = s_oSpriteLibrary.getSprite("but_exit");
        b = .5 * CANVAS_WIDTH + 370;
        d = new CGfxButton(b, 190, v, A);
        d.addEventListener(ON_MOUSE_UP, this.unload,
            this);
        c = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#000");
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.x = CANVAS_WIDTH / 2;
        c.y = 320;
        c.outline = 5;
        A.addChild(c);
        g = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, TEXT_COLOR);
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = c.x;
        g.y = c.y;
        A.addChild(g);
        v = s_oSpriteLibrary.getSprite("logo_ctl");
        h = createBitmap(v);
        h.regX = v.width / 2;
        h.regY = v.height / 2;
        h.x = CANVAS_WIDTH / 2;
        h.y = 420;
        A.addChild(h);
        m = new createjs.Text(TEXT_LINK1, "50px " +
            FONT_GAME, "#000");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 560;
        m.outline = 5;
        A.addChild(m);
        a = new createjs.Text(TEXT_LINK1, "50px " + FONT_GAME, TEXT_COLOR);
        a.textAlign = "center";
        a.textBaseline = "alphabetic";
        a.x = m.x;
        a.y = m.y;
        A.addChild(a)
    };
    this.unload = function() {
        p.off("click", this._onLogoButRelease);
        d.unload();
        d = null;
        s_oStage.removeChild(A)
    };
    this._onLogoButRelease = function() {
        // window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
    };
    this._init()
}

function CController() {
    var b, k, h, d, g, c, p, a;
    this._init = function() {
        b = {
            x: .5 * CANVAS_WIDTH - 450,
            y: .5 * CANVAS_HEIGHT + 320
        };
        k = {
            x: .5 * CANVAS_WIDTH + 450,
            y: .5 * CANVAS_HEIGHT + 320
        };
        h = new createjs.Container;
        h.x = b.x;
        h.y = b.y;
        d = new createjs.Container;
        d.x = k.x;
        d.y = k.y;
        var m = s_oSpriteLibrary.getSprite("arrow");
        g = new CGfxButton(-90, 0, m, h);
        g.addEventListener(ON_MOUSE_DOWN, s_oGame.moveLeft, this);
        g.addEventListener(ON_MOUSE_UP, s_oGame.onCommandLeftUp, this);
        g.setScaleX(-1);
        c = new CGfxButton(90, 0, m, h);
        c.addEventListener(ON_MOUSE_DOWN,
            s_oGame.moveRight, this);
        c.addEventListener(ON_MOUSE_UP, s_oGame.onCommandRightUp, this);
        m = s_oSpriteLibrary.getSprite("but_head");
        p = new CGfxButton(-90, 0, m, d);
        p.addEventListener(ON_MOUSE_DOWN, s_oGame.headShot, this);
        p.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);
        m = s_oSpriteLibrary.getSprite("but_kick");
        a = new CGfxButton(90, 0, m, d);
        a.addEventListener(ON_MOUSE_DOWN, s_oGame.shot, this);
        a.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);
        s_oStage.addChild(h, d)
    };
    this.block = function(b) {
        g.block(b);
        c.block(b);
        p.block(b);
        a.block(b)
    };
    this.getStartPositionRightSide = function() {
        return b
    };
    this.getStartPositionLeftSide = function() {
        return k
    };
    this.setPositionRightSide = function(a, c) {
        h.x = a;
        h.y = c
    };
    this.setPositionLeftSide = function(a, c) {
        d.x = a;
        d.y = c
    };
    this.unload = function() {
        p.unload();
        p = null;
        g.unload();
        g = null;
        c.unload();
        c = null;
        a.unload();
        a = null;
        s_oStage.removeChild(h, d)
    };
    this._init();
    return this
}

function CCongratulations(b, k) {
    var h, d, g, c, p, a, m, A, v, t, x, u;
    this._init = function(b, k) {
        c = createBitmap(s_oSpriteLibrary.getSprite("bg_congratulations"));
        s_oStage.addChild(c);
        var e = s_oSpriteLibrary.getSprite("but_home");
        h = CANVAS_WIDTH / 2;
        p = new CGfxButton(h, 595, e, s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onButMenuRelease, this);
        p.pulseAnimation();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) e = s_oSpriteLibrary.getSprite("audio_icon"), d = CANVAS_WIDTH - e.height / 2 - 10, g = e.height / 2 + 10, u = new CToggle(d, g, e, s_bAudioActive,
            s_oStage), u.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        a = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, "#000000");
        a.x = .5 * CANVAS_WIDTH;
        a.y = .5 * CANVAS_HEIGHT - 270;
        a.textAlign = "center";
        a.outline = 5;
        s_oStage.addChild(a);
        m = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, TEXT_COLOR);
        m.x = .5 * CANVAS_WIDTH;
        m.y = .5 * CANVAS_HEIGHT - 270;
        m.textAlign = "center";
        s_oStage.addChild(m);
        e = this.createResultText(b);
        A = new createjs.Text(TEXT_TOTAL_SCORE + ": " + k, "50px " + FONT_GAME, "#000000");
        A.x = .5 *
            CANVAS_WIDTH;
        A.y = .5 * CANVAS_HEIGHT + e;
        A.textAlign = "center";
        A.outline = 5;
        s_oStage.addChild(A);
        v = new createjs.Text(TEXT_TOTAL_SCORE + ": " + k, "50px " + FONT_GAME, TEXT_COLOR);
        v.x = .5 * CANVAS_WIDTH;
        v.y = .5 * CANVAS_HEIGHT + e;
        v.textAlign = "center";
        s_oStage.addChild(v);
        var e = s_oSpriteLibrary.getSprite("character_pose_" + b[0].player_team),
            y = new createjs.SpriteSheet({
                images: [e],
                frames: {
                    width: e.width / 3,
                    height: e.height,
                    regX: e.width / 2 / 3,
                    regY: e.height / 2
                },
                animations: {
                    angry: [0],
                    win: [1],
                    champion: [2]
                }
            }),
            e = createSprite(y, "champion",
                e.width / 2 / 3, e.height / 2, e.width / 3, e.height);
        e.scaleX = .8;
        e.scaleY = .8;
        e.x = .5 * CANVAS_WIDTH - 440;
        e.y = .5 * CANVAS_HEIGHT + 125;
        s_oStage.addChild(e);
        t = new createjs.Shape;
        t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(t);
        createjs.Tween.get(t).to({
            alpha: 0
        }, 1E3).call(function() {
            t.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.createResultText = function(a) {
        x = new createjs.Container;
        var c = -200,
            e = 200,
            b = !1,
            d = 0;
        1 === (TOT_TEAM - 1) % 2 && (b = !0, d = TOT_TEAM - 2);
        for (var g =
            0; g < a.length; g++, e += 150) {
            var m = new createjs.Container;
            m.alpha = 0;
            var h = a[g].result,
                k = g + 1,
                p;
            p = new createjs.Text(h, "28px " + FONT_GAME, "#000000");
            p.x = 0;
            p.y = 3;
            p.textAlign = "center";
            p.outline = 5;
            m.addChild(p);
            h = new createjs.Text(h, "28px " + FONT_GAME, TEXT_COLOR);
            h.x = 0;
            h.y = 3;
            h.textAlign = "center";
            m.addChild(h);
            h = new createjs.Text(k + ".", "28px " + FONT_GAME, "#000000");
            h.x = -200;
            h.y = 3;
            h.textAlign = "center";
            h.outline = 5;
            m.addChild(h);
            k = new createjs.Text(k + ".", "28px " + FONT_GAME, TEXT_COLOR);
            k.x = -200;
            k.y = 3;
            k.textAlign = "center";
            m.addChild(k);
            k = s_oSpriteLibrary.getSprite("flag_" + a[g].player_team);
            h = createBitmap(k);
            h.x = -150;
            h.y = 5;
            h.regX = .5 * k.width;
            h.regY = 0;
            h.scaleX = .3;
            h.scaleY = .3;
            m.addChild(h);
            h = s_oSpriteLibrary.getSprite("flag_" + a[g].opponent_team);
            h = createBitmap(h);
            h.x = 150;
            h.y = 5;
            h.regX = .5 * k.width;
            h.regY = 0;
            h.scaleX = .3;
            h.scaleY = .3;
            m.addChild(h);
            m.y = .5 * CANVAS_HEIGHT + c;
            0 === g % 2 ? (k = d === g && b ? .5 * CANVAS_WIDTH : .5 * CANVAS_WIDTH - 250, m.x = -100) : (m.x = CANVAS_WIDTH + 100, k = .5 * CANVAS_WIDTH + 250, c += 40);
            createjs.Tween.get(m).wait(e).to({
                    x: k,
                    alpha: 1
                },
                500, createjs.Ease.cubicIn);
            x.addChild(m)
        }
        s_oStage.addChild(x);
        return c + 60
    };
    this.refreshButtonPos = function(a, c) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || u.setPosition(d - a, c + g)
    };
    this.unload = function() {
        p.unload();
        p = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) u.unload(), u = null;
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oCongratulations = null
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButMenuRelease = function() {
        this.unload();
        s_oMain.gotoMenu()
    };
    s_oCongratulations = this;
    this._init(b, k)
}
var s_oCongratulations = null;

function CCharacter(b, k, h, d, g) {
    var c, p = {},
        a, m, A, v, t, x = 0,
        u, E, z, e, y = !1,
        w = !1,
        H = !1;
    this._init = function(b, d, g, h, w) {
        e = w;
        w = new createjs.SpriteSheet({
            images: [g],
            frames: {
                width: g.width / 8,
                height: g.height / 7,
                regX: g.width / 2 / 8,
                regY: g.height / 2 / 7
            },
            animations: {
                idle: [0, 11, "idle", .5],
                run: [12, 22],
                shot: [23, 28],
                head_shot_run: [29, 37],
                head_shot_idle: [38, 48],
                heel_shot: [49, 55],
                head_help: [38, 48, "head_help"],
                shot_help: [23, 28, "shot_help"],
                reverse: {
                    frames: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12]
                }
            }
        });
        c = createSprite(w, "idle", g.width / 2 /
            8, g.height / 2 / 7, g.width / 8, g.height / 7);
        c.x = b;
        c.y = d;
        b = A = g.width / 8;
        a = CANVAS_WIDTH + -A;
        m = b;
        t = h;
        v = CHARACTER_SPEED * t;
        e.addChild(c)
    };
    this.getX = function() {
        return c.x
    };
    this.getY = function() {
        return c.y
    };
    this.setPosition = function(a, e) {
        null !== a && (c.x = a);
        null !== e && (c.y = e)
    };
    this.setDirection = function(a) {
        x = a
    };
    this.getDirection = function() {
        return x
    };
    this.rotate = function(a) {
        c.scaleX = a
    };
    this.setVisible = function(a) {
        c.visible = a
    };
    this.changeState = function(a) {
        c.gotoAndPlay(a);
        "shot" !== a && "head_shot_run" !== a && "head_shot_idle" !==
            a && "heel_shot" !== a || this._onFinishAnimation()
    };
    this.stopAnimation = function() {
        c.stop()
    };
    this.playAnimation = function() {
        c.play()
    };
    this._onFinishAnimation = function() {
        c.on("animationend", function() {
            0 === x ? c.gotoAndPlay("idle") : -1 === x ? c.gotoAndPlay("reverse") : c.gotoAndPlay("run");
            c.removeAllEventListeners()
        })
    };
    this.setInfoData = function(a, e) {
        p[a] = e
    };
    this.getInfoData = function(a) {
        return p[a]
    };
    this.unload = function() {
        e.removeChild(c);
        s_oCharacter = null
    };
    this.createPlayerHead = function(a) {
        E = a.addHead({
            x: c.x + OFFSET_HEAD_POS.x,
            y: c.y + OFFSET_HEAD_POS.y
        }, PLAYER_HEAD);
        w = !0
    };
    this.createHeel = function(a) {
        z = a.addLeg({
            x: c.x + OFFSET_HEEL_POS.x,
            y: c.y + OFFSET_HEEL_POS.y
        }, PLAYER_HEEL);
        H = !0
    };
    this.createPlayerLeg = function(a) {
        u = a.addLeg({
            x: c.x + OFFSET_LEG_POS.x,
            y: c.y + OFFSET_LEG_POS.y
        }, PLAYER_LEG);
        y = !0
    };
    this.getLegShoot = function() {
        return y
    };
    this.getHeadShoot = function() {
        return w
    };
    this.getHeelShoot = function() {
        return H
    };
    this.movement = function(e, b) {
        var d = s_oPhysicsController.getElementPosition(e.fixture1),
            g = s_oPhysicsController.getElementPosition(e.fixture2),
            h = s_oPhysicsController.getElementPosition(e.fixture3);
        if (b - c.x > STOP_WALK_DISTANCE_PLAYER || 0 > x) d.x += v * x;
        d.x >= a ? d.x = a : d.x <= m && (d.x = m);
        g.x = d.x + PLAYERS_COLLISION.sph_offset.x - PLAYERS_COLLISION.rec_offset.x;
        h.x = d.x + PLAYERS_COLLISION.rec_neck.x - PLAYERS_COLLISION.rec_offset.x;
        s_oPhysicsController.setElementPosition(e.fixture1, d);
        s_oPhysicsController.setElementPosition(e.fixture2, g);
        s_oPhysicsController.setElementPosition(e.fixture3, h);
        c.x = d.x + PLAYERS_COLLISION.rec_center_width;
        c.y = d.y - PLAYERS_COLLISION.rec_offset.y
    };
    this.update = function(a, e) {
        this.movement(a, e);
        if (!0 === y) {
            var b = s_oPhysicsController.getJointAngle(u.jointLeg),
                d = {
                    x: c.x + OFFSET_LEG_POS.x,
                    y: c.y + OFFSET_LEG_POS.y
                };
            s_oPhysicsController.setElementPosition(u.fixture2, d);
            b >= DELETE_LEG_ANGLE_PLAYER && (s_oGame.removeLeg(u), y = !1)
        } else !0 === w ? (b = s_oPhysicsController.getJointTranslation(E.joint), d = {
                x: c.x + OFFSET_HEAD_POS.x,
                y: c.y + OFFSET_HEAD_POS.y
            }, s_oPhysicsController.setElementPosition(E.fixture2, d), b >= PLAYER_HEAD.distance - .1 && (s_oGame.removeHead(E), w = !1)) : !0 ===
            H && (b = s_oPhysicsController.getJointAngle(z.jointLeg), d = {
                x: c.x + OFFSET_HEEL_POS.x,
                y: c.y + OFFSET_HEEL_POS.y
            }, s_oPhysicsController.setElementPosition(z.fixture2, d), b <= DELETE_HEEL_ANGLE_PLAYER && (s_oGame.removeLeg(z), H = !1))
    };
    s_oCharacter = this;
    this._init(b, k, h, d, g)
}
var s_oCharacter;

function CBall(b, k, h) {
    var d;
    this._init = function(b, c, h) {
        d = createBitmap(h);
        d.x = b;
        d.y = c;
        d.regX = .5 * h.width;
        d.regY = .5 * h.height;
        s_oStage.addChild(d)
    };
    this.unload = function() {
        s_oStage.removeChild(d)
    };
    this.setVisible = function(b) {
        d.visible = b
    };
    this.setPosition = function(b, c) {
        d.x = b;
        d.y = c
    };
    this.setAngle = function(b) {
        d.rotation = b
    };
    this.getX = function() {
        return d.x
    };
    this.getY = function() {
        return d.y
    };
    this.scale = function(b) {
        d.scaleX = b;
        d.scaleY = b
    };
    this.getScale = function() {
        return d.scaleX
    };
    this.childIndex = function(b) {
        s_oStage.setChildIndex(d,
            b)
    };
    this._init(b, k, h);
    return this
}

function CAreYouSurePanel(b) {
    var k, h, d, g, c, p;
    this._init = function() {
        c = new createjs.Container;
        c.visible = !1;
        p.addChild(c);
        var a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        c.addChild(a);
        k = new createjs.Text(TEXT_ARE_SURE, "50px " + FONT_GAME, "#000");
        k.x = CANVAS_WIDTH / 2;
        k.y = 300;
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.outline = 5;
        c.addChild(k);
        h = new createjs.Text(k.text, "50px " + FONT_GAME, TEXT_COLOR);
        h.x = k.x;
        h.y = k.y;
        h.textAlign = "center";
        h.textBaseline = "middle";
        c.addChild(h);
        d = new CGfxButton(CANVAS_WIDTH /
            2 + 170, 500, s_oSpriteLibrary.getSprite("but_yes"), c);
        d.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        g = new CGfxButton(CANVAS_WIDTH / 2 - 170, 500, s_oSpriteLibrary.getSprite("but_exit"), c);
        g.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this.show = function() {
        s_oGame.unpause(!1);
        c.visible = !0
    };
    this._onButYes = function() {
        s_oGame.unpause(!0);
        s_oGame.onExit()
    };
    this._onButNo = function() {
        s_oGame.unpause(!0);
        c.visible = !1
    };
    p = b;
    this._init()
}
var Box2D = {};
(function(b, k) {
    function h() {}!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function && (Object.defineProperty = function(b, g, c) {
        c.get instanceof Function && b.__defineGetter__(g, c.get);
        c.set instanceof Function && b.__defineSetter__(g, c.set)
    });
    b.inherit = function(b, g) {
        h.prototype = g.prototype;
        b.prototype = new h;
        b.prototype.constructor = b
    };
    b.generateCallback = function(b, g) {
        return function() {
            g.apply(b, arguments)
        }
    };
    b.NVector = function(b) {
        b === k && (b = 0);
        for (var g = Array(b || 0), c = 0; c < b; ++c) g[c] = 0;
        return g
    };
    b.is = function(b, g) {
        return null === b ? !1 : g instanceof Function && b instanceof g || b.constructor.__implements != k && b.constructor.__implements[g] ? !0 : !1
    };
    b.parseUInt = function(b) {
        return Math.abs(parseInt(b))
    }
})(Box2D);
var Vector = Array,
    Vector_a2j_Number = Box2D.NVector;
"undefined" === typeof Box2D && (Box2D = {});
"undefined" === typeof Box2D.Collision && (Box2D.Collision = {});
"undefined" === typeof Box2D.Collision.Shapes && (Box2D.Collision.Shapes = {});
"undefined" === typeof Box2D.Common && (Box2D.Common = {});
"undefined" === typeof Box2D.Common.Math && (Box2D.Common.Math = {});
"undefined" === typeof Box2D.Dynamics && (Box2D.Dynamics = {});
"undefined" === typeof Box2D.Dynamics.Contacts && (Box2D.Dynamics.Contacts = {});
"undefined" === typeof Box2D.Dynamics.Controllers && (Box2D.Dynamics.Controllers = {});
"undefined" === typeof Box2D.Dynamics.Joints && (Box2D.Dynamics.Joints = {});
(function() {
    function b() {
        b.b2AABB.apply(this, arguments)
    }

    function k() {
        k.b2Bound.apply(this, arguments)
    }

    function h() {
        h.b2BoundValues.apply(this, arguments);
        this.constructor === h && this.b2BoundValues.apply(this, arguments)
    }

    function d() {
        d.b2Collision.apply(this, arguments)
    }

    function g() {
        g.b2ContactID.apply(this, arguments);
        this.constructor === g && this.b2ContactID.apply(this, arguments)
    }

    function c() {
        c.b2ContactPoint.apply(this, arguments)
    }

    function p() {
        p.b2Distance.apply(this, arguments)
    }

    function a() {
        a.b2DistanceInput.apply(this,
            arguments)
    }

    function m() {
        m.b2DistanceOutput.apply(this, arguments)
    }

    function A() {
        A.b2DistanceProxy.apply(this, arguments)
    }

    function v() {
        v.b2DynamicTree.apply(this, arguments);
        this.constructor === v && this.b2DynamicTree.apply(this, arguments)
    }

    function t() {
        t.b2DynamicTreeBroadPhase.apply(this, arguments)
    }

    function x() {
        x.b2DynamicTreeNode.apply(this, arguments)
    }

    function u() {
        u.b2DynamicTreePair.apply(this, arguments)
    }

    function E() {
        E.b2Manifold.apply(this, arguments);
        this.constructor === E && this.b2Manifold.apply(this, arguments)
    }

    function z() {
        z.b2ManifoldPoint.apply(this, arguments);
        this.constructor === z && this.b2ManifoldPoint.apply(this, arguments)
    }

    function e() {
        e.b2Point.apply(this, arguments)
    }

    function y() {
        y.b2RayCastInput.apply(this, arguments);
        this.constructor === y && this.b2RayCastInput.apply(this, arguments)
    }

    function w() {
        w.b2RayCastOutput.apply(this, arguments)
    }

    function H() {
        H.b2Segment.apply(this, arguments)
    }

    function D() {
        D.b2SeparationFunction.apply(this, arguments)
    }

    function N() {
        N.b2Simplex.apply(this, arguments);
        this.constructor ===
            N && this.b2Simplex.apply(this, arguments)
    }

    function F() {
        F.b2SimplexCache.apply(this, arguments)
    }

    function P() {
        P.b2SimplexVertex.apply(this, arguments)
    }

    function K() {
        K.b2TimeOfImpact.apply(this, arguments)
    }

    function M() {
        M.b2TOIInput.apply(this, arguments)
    }

    function J() {
        J.b2WorldManifold.apply(this, arguments);
        this.constructor === J && this.b2WorldManifold.apply(this, arguments)
    }

    function L() {
        L.ClipVertex.apply(this, arguments)
    }

    function n() {
        n.Features.apply(this, arguments)
    }

    function q() {
        q.b2CircleShape.apply(this, arguments);
        this.constructor === q && this.b2CircleShape.apply(this, arguments)
    }

    function B() {
        B.b2EdgeChainDef.apply(this, arguments);
        this.constructor === B && this.b2EdgeChainDef.apply(this, arguments)
    }

    function r() {
        r.b2EdgeShape.apply(this, arguments);
        this.constructor === r && this.b2EdgeShape.apply(this, arguments)
    }

    function I() {
        I.b2MassData.apply(this, arguments)
    }

    function Q() {
        Q.b2PolygonShape.apply(this, arguments);
        this.constructor === Q && this.b2PolygonShape.apply(this, arguments)
    }

    function G() {
        G.b2Shape.apply(this, arguments);
        this.constructor ===
            G && this.b2Shape.apply(this, arguments)
    }

    function f() {
        f.b2Color.apply(this, arguments);
        this.constructor === f && this.b2Color.apply(this, arguments)
    }

    function l() {
        l.b2Settings.apply(this, arguments)
    }

    function C() {
        C.b2Mat22.apply(this, arguments);
        this.constructor === C && this.b2Mat22.apply(this, arguments)
    }

    function O() {
        O.b2Mat33.apply(this, arguments);
        this.constructor === O && this.b2Mat33.apply(this, arguments)
    }

    function R() {
        R.b2Math.apply(this, arguments)
    }

    function S() {
        S.b2Sweep.apply(this, arguments)
    }

    function T() {
        T.b2Transform.apply(this,
            arguments);
        this.constructor === T && this.b2Transform.apply(this, arguments)
    }

    function U() {
        U.b2Vec2.apply(this, arguments);
        this.constructor === U && this.b2Vec2.apply(this, arguments)
    }

    function V() {
        V.b2Vec3.apply(this, arguments);
        this.constructor === V && this.b2Vec3.apply(this, arguments)
    }

    function W() {
        W.b2Body.apply(this, arguments);
        this.constructor === W && this.b2Body.apply(this, arguments)
    }

    function X() {
        X.b2BodyDef.apply(this, arguments);
        this.constructor === X && this.b2BodyDef.apply(this, arguments)
    }

    function Ea() {
        Ea.b2ContactFilter.apply(this,
            arguments)
    }

    function Fa() {
        Fa.b2ContactImpulse.apply(this, arguments)
    }

    function Ga() {
        Ga.b2ContactListener.apply(this, arguments)
    }

    function Y() {
        Y.b2ContactManager.apply(this, arguments);
        this.constructor === Y && this.b2ContactManager.apply(this, arguments)
    }

    function Z() {
        Z.b2DebugDraw.apply(this, arguments);
        this.constructor === Z && this.b2DebugDraw.apply(this, arguments)
    }

    function Ha() {
        Ha.b2DestructionListener.apply(this, arguments)
    }

    function Ia() {
        Ia.b2FilterData.apply(this, arguments)
    }

    function aa() {
        aa.b2Fixture.apply(this,
            arguments);
        this.constructor === aa && this.b2Fixture.apply(this, arguments)
    }

    function ba() {
        ba.b2FixtureDef.apply(this, arguments);
        this.constructor === ba && this.b2FixtureDef.apply(this, arguments)
    }

    function ca() {
        ca.b2Island.apply(this, arguments);
        this.constructor === ca && this.b2Island.apply(this, arguments)
    }

    function Ja() {
        Ja.b2TimeStep.apply(this, arguments)
    }

    function da() {
        da.b2World.apply(this, arguments);
        this.constructor === da && this.b2World.apply(this, arguments)
    }

    function Ka() {
        Ka.b2CircleContact.apply(this, arguments)
    }

    function ea() {
        ea.b2Contact.apply(this, arguments);
        this.constructor === ea && this.b2Contact.apply(this, arguments)
    }

    function fa() {
        fa.b2ContactConstraint.apply(this, arguments);
        this.constructor === fa && this.b2ContactConstraint.apply(this, arguments)
    }

    function La() {
        La.b2ContactConstraintPoint.apply(this, arguments)
    }

    function Ma() {
        Ma.b2ContactEdge.apply(this, arguments)
    }

    function ga() {
        ga.b2ContactFactory.apply(this, arguments);
        this.constructor === ga && this.b2ContactFactory.apply(this, arguments)
    }

    function Na() {
        Na.b2ContactRegister.apply(this,
            arguments)
    }

    function Oa() {
        Oa.b2ContactResult.apply(this, arguments)
    }

    function ha() {
        ha.b2ContactSolver.apply(this, arguments);
        this.constructor === ha && this.b2ContactSolver.apply(this, arguments)
    }

    function Pa() {
        Pa.b2EdgeAndCircleContact.apply(this, arguments)
    }

    function ia() {
        ia.b2NullContact.apply(this, arguments);
        this.constructor === ia && this.b2NullContact.apply(this, arguments)
    }

    function Qa() {
        Qa.b2PolyAndCircleContact.apply(this, arguments)
    }

    function Ra() {
        Ra.b2PolyAndEdgeContact.apply(this, arguments)
    }

    function Sa() {
        Sa.b2PolygonContact.apply(this,
            arguments)
    }

    function ja() {
        ja.b2PositionSolverManifold.apply(this, arguments);
        this.constructor === ja && this.b2PositionSolverManifold.apply(this, arguments)
    }

    function Ta() {
        Ta.b2BuoyancyController.apply(this, arguments)
    }

    function Ua() {
        Ua.b2ConstantAccelController.apply(this, arguments)
    }

    function Va() {
        Va.b2ConstantForceController.apply(this, arguments)
    }

    function Wa() {
        Wa.b2Controller.apply(this, arguments)
    }

    function Xa() {
        Xa.b2ControllerEdge.apply(this, arguments)
    }

    function Ya() {
        Ya.b2GravityController.apply(this, arguments)
    }

    function Za() {
        Za.b2TensorDampingController.apply(this, arguments)
    }

    function ka() {
        ka.b2DistanceJoint.apply(this, arguments);
        this.constructor === ka && this.b2DistanceJoint.apply(this, arguments)
    }

    function la() {
        la.b2DistanceJointDef.apply(this, arguments);
        this.constructor === la && this.b2DistanceJointDef.apply(this, arguments)
    }

    function ma() {
        ma.b2FrictionJoint.apply(this, arguments);
        this.constructor === ma && this.b2FrictionJoint.apply(this, arguments)
    }

    function na() {
        na.b2FrictionJointDef.apply(this, arguments);
        this.constructor ===
            na && this.b2FrictionJointDef.apply(this, arguments)
    }

    function oa() {
        oa.b2GearJoint.apply(this, arguments);
        this.constructor === oa && this.b2GearJoint.apply(this, arguments)
    }

    function pa() {
        pa.b2GearJointDef.apply(this, arguments);
        this.constructor === pa && this.b2GearJointDef.apply(this, arguments)
    }

    function $a() {
        $a.b2Jacobian.apply(this, arguments)
    }

    function qa() {
        qa.b2Joint.apply(this, arguments);
        this.constructor === qa && this.b2Joint.apply(this, arguments)
    }

    function ra() {
        ra.b2JointDef.apply(this, arguments);
        this.constructor ===
            ra && this.b2JointDef.apply(this, arguments)
    }

    function ab() {
        ab.b2JointEdge.apply(this, arguments)
    }

    function sa() {
        sa.b2LineJoint.apply(this, arguments);
        this.constructor === sa && this.b2LineJoint.apply(this, arguments)
    }

    function ta() {
        ta.b2LineJointDef.apply(this, arguments);
        this.constructor === ta && this.b2LineJointDef.apply(this, arguments)
    }

    function ua() {
        ua.b2MouseJoint.apply(this, arguments);
        this.constructor === ua && this.b2MouseJoint.apply(this, arguments)
    }

    function va() {
        va.b2MouseJointDef.apply(this, arguments);
        this.constructor ===
            va && this.b2MouseJointDef.apply(this, arguments)
    }

    function wa() {
        wa.b2PrismaticJoint.apply(this, arguments);
        this.constructor === wa && this.b2PrismaticJoint.apply(this, arguments)
    }

    function xa() {
        xa.b2PrismaticJointDef.apply(this, arguments);
        this.constructor === xa && this.b2PrismaticJointDef.apply(this, arguments)
    }

    function ya() {
        ya.b2PulleyJoint.apply(this, arguments);
        this.constructor === ya && this.b2PulleyJoint.apply(this, arguments)
    }

    function za() {
        za.b2PulleyJointDef.apply(this, arguments);
        this.constructor === za && this.b2PulleyJointDef.apply(this,
            arguments)
    }

    function Aa() {
        Aa.b2RevoluteJoint.apply(this, arguments);
        this.constructor === Aa && this.b2RevoluteJoint.apply(this, arguments)
    }

    function Ba() {
        Ba.b2RevoluteJointDef.apply(this, arguments);
        this.constructor === Ba && this.b2RevoluteJointDef.apply(this, arguments)
    }

    function Ca() {
        Ca.b2WeldJoint.apply(this, arguments);
        this.constructor === Ca && this.b2WeldJoint.apply(this, arguments)
    }

    function Da() {
        Da.b2WeldJointDef.apply(this, arguments);
        this.constructor === Da && this.b2WeldJointDef.apply(this, arguments)
    }
    Box2D.Collision.IBroadPhase =
        "Box2D.Collision.IBroadPhase";
    Box2D.Collision.b2AABB = b;
    Box2D.Collision.b2Bound = k;
    Box2D.Collision.b2BoundValues = h;
    Box2D.Collision.b2Collision = d;
    Box2D.Collision.b2ContactID = g;
    Box2D.Collision.b2ContactPoint = c;
    Box2D.Collision.b2Distance = p;
    Box2D.Collision.b2DistanceInput = a;
    Box2D.Collision.b2DistanceOutput = m;
    Box2D.Collision.b2DistanceProxy = A;
    Box2D.Collision.b2DynamicTree = v;
    Box2D.Collision.b2DynamicTreeBroadPhase = t;
    Box2D.Collision.b2DynamicTreeNode = x;
    Box2D.Collision.b2DynamicTreePair = u;
    Box2D.Collision.b2Manifold =
        E;
    Box2D.Collision.b2ManifoldPoint = z;
    Box2D.Collision.b2Point = e;
    Box2D.Collision.b2RayCastInput = y;
    Box2D.Collision.b2RayCastOutput = w;
    Box2D.Collision.b2Segment = H;
    Box2D.Collision.b2SeparationFunction = D;
    Box2D.Collision.b2Simplex = N;
    Box2D.Collision.b2SimplexCache = F;
    Box2D.Collision.b2SimplexVertex = P;
    Box2D.Collision.b2TimeOfImpact = K;
    Box2D.Collision.b2TOIInput = M;
    Box2D.Collision.b2WorldManifold = J;
    Box2D.Collision.ClipVertex = L;
    Box2D.Collision.Features = n;
    Box2D.Collision.Shapes.b2CircleShape = q;
    Box2D.Collision.Shapes.b2EdgeChainDef =
        B;
    Box2D.Collision.Shapes.b2EdgeShape = r;
    Box2D.Collision.Shapes.b2MassData = I;
    Box2D.Collision.Shapes.b2PolygonShape = Q;
    Box2D.Collision.Shapes.b2Shape = G;
    Box2D.Common.b2internal = "Box2D.Common.b2internal";
    Box2D.Common.b2Color = f;
    Box2D.Common.b2Settings = l;
    Box2D.Common.Math.b2Mat22 = C;
    Box2D.Common.Math.b2Mat33 = O;
    Box2D.Common.Math.b2Math = R;
    Box2D.Common.Math.b2Sweep = S;
    Box2D.Common.Math.b2Transform = T;
    Box2D.Common.Math.b2Vec2 = U;
    Box2D.Common.Math.b2Vec3 = V;
    Box2D.Dynamics.b2Body = W;
    Box2D.Dynamics.b2BodyDef = X;
    Box2D.Dynamics.b2ContactFilter =
        Ea;
    Box2D.Dynamics.b2ContactImpulse = Fa;
    Box2D.Dynamics.b2ContactListener = Ga;
    Box2D.Dynamics.b2ContactManager = Y;
    Box2D.Dynamics.b2DebugDraw = Z;
    Box2D.Dynamics.b2DestructionListener = Ha;
    Box2D.Dynamics.b2FilterData = Ia;
    Box2D.Dynamics.b2Fixture = aa;
    Box2D.Dynamics.b2FixtureDef = ba;
    Box2D.Dynamics.b2Island = ca;
    Box2D.Dynamics.b2TimeStep = Ja;
    Box2D.Dynamics.b2World = da;
    Box2D.Dynamics.Contacts.b2CircleContact = Ka;
    Box2D.Dynamics.Contacts.b2Contact = ea;
    Box2D.Dynamics.Contacts.b2ContactConstraint = fa;
    Box2D.Dynamics.Contacts.b2ContactConstraintPoint =
        La;
    Box2D.Dynamics.Contacts.b2ContactEdge = Ma;
    Box2D.Dynamics.Contacts.b2ContactFactory = ga;
    Box2D.Dynamics.Contacts.b2ContactRegister = Na;
    Box2D.Dynamics.Contacts.b2ContactResult = Oa;
    Box2D.Dynamics.Contacts.b2ContactSolver = ha;
    Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = Pa;
    Box2D.Dynamics.Contacts.b2NullContact = ia;
    Box2D.Dynamics.Contacts.b2PolyAndCircleContact = Qa;
    Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = Ra;
    Box2D.Dynamics.Contacts.b2PolygonContact = Sa;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold =
        ja;
    Box2D.Dynamics.Controllers.b2BuoyancyController = Ta;
    Box2D.Dynamics.Controllers.b2ConstantAccelController = Ua;
    Box2D.Dynamics.Controllers.b2ConstantForceController = Va;
    Box2D.Dynamics.Controllers.b2Controller = Wa;
    Box2D.Dynamics.Controllers.b2ControllerEdge = Xa;
    Box2D.Dynamics.Controllers.b2GravityController = Ya;
    Box2D.Dynamics.Controllers.b2TensorDampingController = Za;
    Box2D.Dynamics.Joints.b2DistanceJoint = ka;
    Box2D.Dynamics.Joints.b2DistanceJointDef = la;
    Box2D.Dynamics.Joints.b2FrictionJoint = ma;
    Box2D.Dynamics.Joints.b2FrictionJointDef =
        na;
    Box2D.Dynamics.Joints.b2GearJoint = oa;
    Box2D.Dynamics.Joints.b2GearJointDef = pa;
    Box2D.Dynamics.Joints.b2Jacobian = $a;
    Box2D.Dynamics.Joints.b2Joint = qa;
    Box2D.Dynamics.Joints.b2JointDef = ra;
    Box2D.Dynamics.Joints.b2JointEdge = ab;
    Box2D.Dynamics.Joints.b2LineJoint = sa;
    Box2D.Dynamics.Joints.b2LineJointDef = ta;
    Box2D.Dynamics.Joints.b2MouseJoint = ua;
    Box2D.Dynamics.Joints.b2MouseJointDef = va;
    Box2D.Dynamics.Joints.b2PrismaticJoint = wa;
    Box2D.Dynamics.Joints.b2PrismaticJointDef = xa;
    Box2D.Dynamics.Joints.b2PulleyJoint =
        ya;
    Box2D.Dynamics.Joints.b2PulleyJointDef = za;
    Box2D.Dynamics.Joints.b2RevoluteJoint = Aa;
    Box2D.Dynamics.Joints.b2RevoluteJointDef = Ba;
    Box2D.Dynamics.Joints.b2WeldJoint = Ca;
    Box2D.Dynamics.Joints.b2WeldJointDef = Da
})();
Box2D.postDefs = [];
(function() {
    var b = Box2D.Collision.Shapes.b2CircleShape,
        k = Box2D.Collision.Shapes.b2PolygonShape,
        h = Box2D.Collision.Shapes.b2Shape,
        d = Box2D.Common.b2Settings,
        g = Box2D.Common.Math.b2Math,
        c = Box2D.Common.Math.b2Sweep,
        p = Box2D.Common.Math.b2Transform,
        a = Box2D.Common.Math.b2Vec2,
        m = Box2D.Collision.b2AABB,
        A = Box2D.Collision.b2Bound,
        v = Box2D.Collision.b2BoundValues,
        t = Box2D.Collision.b2Collision,
        x = Box2D.Collision.b2ContactID,
        u = Box2D.Collision.b2ContactPoint,
        E = Box2D.Collision.b2Distance,
        z = Box2D.Collision.b2DistanceInput,
        e = Box2D.Collision.b2DistanceOutput,
        y = Box2D.Collision.b2DistanceProxy,
        w = Box2D.Collision.b2DynamicTree,
        H = Box2D.Collision.b2DynamicTreeBroadPhase,
        D = Box2D.Collision.b2DynamicTreeNode,
        N = Box2D.Collision.b2DynamicTreePair,
        F = Box2D.Collision.b2Manifold,
        P = Box2D.Collision.b2ManifoldPoint,
        K = Box2D.Collision.b2Point,
        M = Box2D.Collision.b2RayCastInput,
        J = Box2D.Collision.b2RayCastOutput,
        L = Box2D.Collision.b2Segment,
        n = Box2D.Collision.b2SeparationFunction,
        q = Box2D.Collision.b2Simplex,
        B = Box2D.Collision.b2SimplexCache,
        r =
        Box2D.Collision.b2SimplexVertex,
        I = Box2D.Collision.b2TimeOfImpact,
        Q = Box2D.Collision.b2TOIInput,
        G = Box2D.Collision.b2WorldManifold,
        f = Box2D.Collision.ClipVertex,
        l = Box2D.Collision.Features,
        C = Box2D.Collision.IBroadPhase;
    m.b2AABB = function() {
        this.lowerBound = new a;
        this.upperBound = new a
    };
    m.prototype.IsValid = function() {
        var f = this.upperBound.y - this.lowerBound.y;
        return 0 <= this.upperBound.x - this.lowerBound.x && 0 <= f && this.lowerBound.IsValid() && this.upperBound.IsValid()
    };
    m.prototype.GetCenter = function() {
        return new a((this.lowerBound.x +
            this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
    };
    m.prototype.GetExtents = function() {
        return new a((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
    };
    m.prototype.Contains = function(f) {
        var a;
        return a = (a = (a = (a = this.lowerBound.x <= f.lowerBound.x) && this.lowerBound.y <= f.lowerBound.y) && f.upperBound.x <= this.upperBound.x) && f.upperBound.y <= this.upperBound.y
    };
    m.prototype.RayCast = function(f, a) {
        var l = -Number.MAX_VALUE,
            n = Number.MAX_VALUE,
            e = a.p1.x,
            b = a.p1.y,
            q = a.p2.x - a.p1.x,
            c = a.p2.y - a.p1.y,
            r = Math.abs(c),
            C = f.normal,
            d = 0,
            g = 0,
            B = d = 0,
            B = 0;
        if (Math.abs(q) < Number.MIN_VALUE) {
            if (e < this.lowerBound.x || this.upperBound.x < e) return !1
        } else if (d = 1 / q, g = (this.lowerBound.x - e) * d, d *= this.upperBound.x - e, B = -1, g > d && (B = g, g = d, d = B, B = 1), g > l && (C.x = B, C.y = 0, l = g), n = Math.min(n, d), l > n) return !1;
        if (r < Number.MIN_VALUE) {
            if (b < this.lowerBound.y || this.upperBound.y < b) return !1
        } else if (d = 1 / c, g = (this.lowerBound.y - b) * d, d *= this.upperBound.y - b, B = -1, g > d && (B = g, g = d, d = B, B = 1), g > l && (C.y = B, C.x = 0, l = g), n = Math.min(n, d), l > n) return !1;
        f.fraction = l;
        return !0
    };
    m.prototype.TestOverlap = function(f) {
        var a = f.lowerBound.y - this.upperBound.y,
            l = this.lowerBound.y - f.upperBound.y;
        return 0 < f.lowerBound.x - this.upperBound.x || 0 < a || 0 < this.lowerBound.x - f.upperBound.x || 0 < l ? !1 : !0
    };
    m.Combine = function(f, a) {
        var l = new m;
        l.Combine(f, a);
        return l
    };
    m.prototype.Combine = function(f, a) {
        this.lowerBound.x = Math.min(f.lowerBound.x, a.lowerBound.x);
        this.lowerBound.y = Math.min(f.lowerBound.y, a.lowerBound.y);
        this.upperBound.x = Math.max(f.upperBound.x, a.upperBound.x);
        this.upperBound.y =
            Math.max(f.upperBound.y, a.upperBound.y)
    };
    A.b2Bound = function() {};
    A.prototype.IsLower = function() {
        return 0 == (this.value & 1)
    };
    A.prototype.IsUpper = function() {
        return 1 == (this.value & 1)
    };
    A.prototype.Swap = function(f) {
        var a = this.value,
            l = this.proxy,
            n = this.stabbingCount;
        this.value = f.value;
        this.proxy = f.proxy;
        this.stabbingCount = f.stabbingCount;
        f.value = a;
        f.proxy = l;
        f.stabbingCount = n
    };
    v.b2BoundValues = function() {};
    v.prototype.b2BoundValues = function() {
        this.lowerValues = new Vector_a2j_Number;
        this.lowerValues[0] = 0;
        this.lowerValues[1] =
            0;
        this.upperValues = new Vector_a2j_Number;
        this.upperValues[0] = 0;
        this.upperValues[1] = 0
    };
    t.b2Collision = function() {};
    t.ClipSegmentToLine = function(f, a, l, n) {
        void 0 === n && (n = 0);
        var e, b = 0;
        e = a[0];
        var q = e.v;
        e = a[1];
        var c = e.v,
            r = l.x * q.x + l.y * q.y - n;
        e = l.x * c.x + l.y * c.y - n;
        0 >= r && f[b++].Set(a[0]);
        0 >= e && f[b++].Set(a[1]);
        0 > r * e && (l = r / (r - e), e = f[b], e = e.v, e.x = q.x + l * (c.x - q.x), e.y = q.y + l * (c.y - q.y), e = f[b], e.id = (0 < r ? a[0] : a[1]).id, ++b);
        return b
    };
    t.EdgeSeparation = function(f, a, l, n, e) {
        void 0 === l && (l = 0);
        parseInt(f.m_vertexCount);
        var b =
            f.m_vertices;
        f = f.m_normals;
        var q = parseInt(n.m_vertexCount),
            c = n.m_vertices,
            r, d;
        r = a.R;
        d = f[l];
        f = r.col1.x * d.x + r.col2.x * d.y;
        n = r.col1.y * d.x + r.col2.y * d.y;
        r = e.R;
        var C = r.col1.x * f + r.col1.y * n;
        r = r.col2.x * f + r.col2.y * n;
        for (var g = 0, B = Number.MAX_VALUE, m = 0; m < q; ++m) d = c[m], d = d.x * C + d.y * r, d < B && (B = d, g = m);
        d = b[l];
        r = a.R;
        l = a.position.x + (r.col1.x * d.x + r.col2.x * d.y);
        a = a.position.y + (r.col1.y * d.x + r.col2.y * d.y);
        d = c[g];
        r = e.R;
        b = e.position.x + (r.col1.x * d.x + r.col2.x * d.y);
        e = e.position.y + (r.col1.y * d.x + r.col2.y * d.y);
        return (b - l) * f + (e - a) *
            n
    };
    t.FindMaxSeparation = function(f, a, l, n, e) {
        var b = parseInt(a.m_vertexCount),
            q = a.m_normals,
            c, r;
        r = e.R;
        c = n.m_centroid;
        var d = e.position.x + (r.col1.x * c.x + r.col2.x * c.y),
            C = e.position.y + (r.col1.y * c.x + r.col2.y * c.y);
        r = l.R;
        c = a.m_centroid;
        d -= l.position.x + (r.col1.x * c.x + r.col2.x * c.y);
        C -= l.position.y + (r.col1.y * c.x + r.col2.y * c.y);
        r = d * l.R.col1.x + C * l.R.col1.y;
        for (var C = d * l.R.col2.x + C * l.R.col2.y, d = 0, g = -Number.MAX_VALUE, B = 0; B < b; ++B) c = q[B], c = c.x * r + c.y * C, c > g && (g = c, d = B);
        q = t.EdgeSeparation(a, l, d, n, e);
        c = parseInt(0 <= d - 1 ? d - 1 :
            b - 1);
        r = t.EdgeSeparation(a, l, c, n, e);
        var C = parseInt(d + 1 < b ? d + 1 : 0),
            g = t.EdgeSeparation(a, l, C, n, e),
            m = B = 0,
            I = 0;
        if (r > q && r > g) I = -1, B = c, m = r;
        else if (g > q) I = 1, B = C, m = g;
        else return f[0] = d, q;
        for (;;)
            if (d = -1 == I ? 0 <= B - 1 ? B - 1 : b - 1 : B + 1 < b ? B + 1 : 0, q = t.EdgeSeparation(a, l, d, n, e), q > m) B = d, m = q;
            else break;
        f[0] = B;
        return m
    };
    t.FindIncidentEdge = function(f, a, l, e, n, b) {
        void 0 === e && (e = 0);
        parseInt(a.m_vertexCount);
        var c = a.m_normals,
            q = parseInt(n.m_vertexCount);
        a = n.m_vertices;
        n = n.m_normals;
        var r;
        r = l.R;
        l = c[e];
        var c = r.col1.x * l.x + r.col2.x * l.y,
            d =
            r.col1.y * l.x + r.col2.y * l.y;
        r = b.R;
        l = r.col1.x * c + r.col1.y * d;
        d = r.col2.x * c + r.col2.y * d;
        c = l;
        r = 0;
        for (var C = Number.MAX_VALUE, g = 0; g < q; ++g) l = n[g], l = c * l.x + d * l.y, l < C && (C = l, r = g);
        n = parseInt(r);
        c = parseInt(n + 1 < q ? n + 1 : 0);
        q = f[0];
        l = a[n];
        r = b.R;
        q.v.x = b.position.x + (r.col1.x * l.x + r.col2.x * l.y);
        q.v.y = b.position.y + (r.col1.y * l.x + r.col2.y * l.y);
        q.id.features.referenceEdge = e;
        q.id.features.incidentEdge = n;
        q.id.features.incidentVertex = 0;
        q = f[1];
        l = a[c];
        r = b.R;
        q.v.x = b.position.x + (r.col1.x * l.x + r.col2.x * l.y);
        q.v.y = b.position.y + (r.col1.y *
            l.x + r.col2.y * l.y);
        q.id.features.referenceEdge = e;
        q.id.features.incidentEdge = c;
        q.id.features.incidentVertex = 1
    };
    t.MakeClipPointVector = function() {
        var a = new Vector(2);
        a[0] = new f;
        a[1] = new f;
        return a
    };
    t.CollidePolygons = function(f, a, l, n, e) {
        var b;
        f.m_pointCount = 0;
        var c = a.m_radius + n.m_radius;
        t.s_edgeAO[0] = 0;
        var q = t.FindMaxSeparation(t.s_edgeAO, a, l, n, e);
        b = t.s_edgeAO[0];
        if (!(q > c)) {
            var r;
            t.s_edgeBO[0] = 0;
            var C = t.FindMaxSeparation(t.s_edgeBO, n, e, a, l);
            r = t.s_edgeBO[0];
            if (!(C > c)) {
                var g = 0,
                    B = 0;
                C > .98 * q + .001 ? (q = n, n = a,
                    a = e, g = r, f.m_type = F.e_faceB, B = 1) : (q = a, a = l, l = e, g = b, f.m_type = F.e_faceA, B = 0);
                b = t.s_incidentEdge;
                t.FindIncidentEdge(b, q, a, g, n, l);
                r = parseInt(q.m_vertexCount);
                e = q.m_vertices;
                var q = e[g],
                    m;
                m = g + 1 < r ? e[parseInt(g + 1)] : e[0];
                g = t.s_localTangent;
                g.Set(m.x - q.x, m.y - q.y);
                g.Normalize();
                e = t.s_localNormal;
                e.x = g.y;
                e.y = -g.x;
                n = t.s_planePoint;
                n.Set(.5 * (q.x + m.x), .5 * (q.y + m.y));
                C = t.s_tangent;
                r = a.R;
                C.x = r.col1.x * g.x + r.col2.x * g.y;
                C.y = r.col1.y * g.x + r.col2.y * g.y;
                var I = t.s_tangent2;
                I.x = -C.x;
                I.y = -C.y;
                g = t.s_normal;
                g.x = C.y;
                g.y = -C.x;
                var G =
                    t.s_v11,
                    h = t.s_v12;
                G.x = a.position.x + (r.col1.x * q.x + r.col2.x * q.y);
                G.y = a.position.y + (r.col1.y * q.x + r.col2.y * q.y);
                h.x = a.position.x + (r.col1.x * m.x + r.col2.x * m.y);
                h.y = a.position.y + (r.col1.y * m.x + r.col2.y * m.y);
                a = g.x * G.x + g.y * G.y;
                r = C.x * h.x + C.y * h.y + c;
                m = t.s_clipPoints1;
                q = t.s_clipPoints2;
                h = 0;
                h = t.ClipSegmentToLine(m, b, I, -C.x * G.x - C.y * G.y + c);
                if (!(2 > h || (h = t.ClipSegmentToLine(q, m, C, r), 2 > h))) {
                    f.m_localPlaneNormal.SetV(e);
                    f.m_localPoint.SetV(n);
                    for (n = e = 0; n < d.b2_maxManifoldPoints; ++n) b = q[n], g.x * b.v.x + g.y * b.v.y - a <= c && (C = f.m_points[e],
                        r = l.R, I = b.v.x - l.position.x, G = b.v.y - l.position.y, C.m_localPoint.x = I * r.col1.x + G * r.col1.y, C.m_localPoint.y = I * r.col2.x + G * r.col2.y, C.m_id.Set(b.id), C.m_id.features.flip = B, ++e);
                    f.m_pointCount = e
                }
            }
        }
    };
    t.CollideCircles = function(f, a, l, n, e) {
        f.m_pointCount = 0;
        var b, q;
        b = l.R;
        q = a.m_p;
        var r = l.position.x + (b.col1.x * q.x + b.col2.x * q.y);
        l = l.position.y + (b.col1.y * q.x + b.col2.y * q.y);
        b = e.R;
        q = n.m_p;
        r = e.position.x + (b.col1.x * q.x + b.col2.x * q.y) - r;
        e = e.position.y + (b.col1.y * q.x + b.col2.y * q.y) - l;
        b = a.m_radius + n.m_radius;
        r * r + e * e > b * b || (f.m_type =
            F.e_circles, f.m_localPoint.SetV(a.m_p), f.m_localPlaneNormal.SetZero(), f.m_pointCount = 1, f.m_points[0].m_localPoint.SetV(n.m_p), f.m_points[0].m_id.key = 0)
    };
    t.CollidePolygonAndCircle = function(f, a, l, e, n) {
        var b = f.m_pointCount = 0,
            q = 0,
            r, c;
        c = n.R;
        r = e.m_p;
        var d = n.position.y + (c.col1.y * r.x + c.col2.y * r.y),
            b = n.position.x + (c.col1.x * r.x + c.col2.x * r.y) - l.position.x,
            q = d - l.position.y;
        c = l.R;
        l = b * c.col1.x + q * c.col1.y;
        c = b * c.col2.x + q * c.col2.y;
        var C = 0,
            d = -Number.MAX_VALUE;
        n = a.m_radius + e.m_radius;
        var g = parseInt(a.m_vertexCount),
            B = a.m_vertices;
        a = a.m_normals;
        for (var m = 0; m < g; ++m) {
            r = B[m];
            b = l - r.x;
            q = c - r.y;
            r = a[m];
            b = r.x * b + r.y * q;
            if (b > n) return;
            b > d && (d = b, C = m)
        }
        b = parseInt(C);
        q = parseInt(b + 1 < g ? b + 1 : 0);
        r = B[b];
        B = B[q];
        d < Number.MIN_VALUE ? (f.m_pointCount = 1, f.m_type = F.e_faceA, f.m_localPlaneNormal.SetV(a[C]), f.m_localPoint.x = .5 * (r.x + B.x), f.m_localPoint.y = .5 * (r.y + B.y), f.m_points[0].m_localPoint.SetV(e.m_p), f.m_points[0].m_id.key = 0) : (d = (l - B.x) * (r.x - B.x) + (c - B.y) * (r.y - B.y), 0 >= (l - r.x) * (B.x - r.x) + (c - r.y) * (B.y - r.y) ? (l - r.x) * (l - r.x) + (c - r.y) * (c - r.y) > n * n ||
            (f.m_pointCount = 1, f.m_type = F.e_faceA, f.m_localPlaneNormal.x = l - r.x, f.m_localPlaneNormal.y = c - r.y, f.m_localPlaneNormal.Normalize(), f.m_localPoint.SetV(r), f.m_points[0].m_localPoint.SetV(e.m_p), f.m_points[0].m_id.key = 0) : 0 >= d ? (l - B.x) * (l - B.x) + (c - B.y) * (c - B.y) > n * n || (f.m_pointCount = 1, f.m_type = F.e_faceA, f.m_localPlaneNormal.x = l - B.x, f.m_localPlaneNormal.y = c - B.y, f.m_localPlaneNormal.Normalize(), f.m_localPoint.SetV(B), f.m_points[0].m_localPoint.SetV(e.m_p), f.m_points[0].m_id.key = 0) : (C = .5 * (r.x + B.x), r = .5 * (r.y + B.y),
                d = (l - C) * a[b].x + (c - r) * a[b].y, d > n || (f.m_pointCount = 1, f.m_type = F.e_faceA, f.m_localPlaneNormal.x = a[b].x, f.m_localPlaneNormal.y = a[b].y, f.m_localPlaneNormal.Normalize(), f.m_localPoint.Set(C, r), f.m_points[0].m_localPoint.SetV(e.m_p), f.m_points[0].m_id.key = 0)))
    };
    t.TestOverlap = function(f, a) {
        var l = a.lowerBound,
            n = f.upperBound,
            e = l.x - n.x,
            b = l.y - n.y,
            l = f.lowerBound,
            n = a.upperBound,
            r = l.y - n.y;
        return 0 < e || 0 < b || 0 < l.x - n.x || 0 < r ? !1 : !0
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Collision.s_incidentEdge = t.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints1 = t.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints2 = t.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_localTangent = new a;
        Box2D.Collision.b2Collision.s_localNormal = new a;
        Box2D.Collision.b2Collision.s_planePoint = new a;
        Box2D.Collision.b2Collision.s_normal = new a;
        Box2D.Collision.b2Collision.s_tangent = new a;
        Box2D.Collision.b2Collision.s_tangent2 =
            new a;
        Box2D.Collision.b2Collision.s_v11 = new a;
        Box2D.Collision.b2Collision.s_v12 = new a;
        Box2D.Collision.b2Collision.b2CollidePolyTempVec = new a;
        Box2D.Collision.b2Collision.b2_nullFeature = 255
    });
    x.b2ContactID = function() {
        this.features = new l
    };
    x.prototype.b2ContactID = function() {
        this.features._m_id = this
    };
    x.prototype.Set = function(f) {
        this.key = f._key
    };
    x.prototype.Copy = function() {
        var f = new x;
        f.key = this.key;
        return f
    };
    Object.defineProperty(x.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._key
        }
    });
    Object.defineProperty(x.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        set: function(f) {
            void 0 === f && (f = 0);
            this._key = f;
            this.features._referenceEdge = this._key & 255;
            this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
            this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
            this.features._flip = (this._key & 4278190080) >> 24 & 255
        }
    });
    u.b2ContactPoint = function() {
        this.position = new a;
        this.velocity = new a;
        this.normal = new a;
        this.id = new x
    };
    E.b2Distance = function() {};
    E.Distance = function(f, l, n) {
        ++E.b2_gjkCalls;
        var e =
            n.proxyA,
            b = n.proxyB,
            r = n.transformA,
            q = n.transformB,
            c = E.s_simplex;
        c.ReadCache(l, e, r, b, q);
        var C = c.m_vertices,
            B = E.s_saveA,
            m = E.s_saveB,
            I = 0;
        c.GetClosestPoint().LengthSquared();
        for (var G = 0, h, w = 0; 20 > w;) {
            I = c.m_count;
            for (G = 0; G < I; G++) B[G] = C[G].indexA, m[G] = C[G].indexB;
            switch (c.m_count) {
                case 1:
                    break;
                case 2:
                    c.Solve2();
                    break;
                case 3:
                    c.Solve3();
                    break;
                default:
                    d.b2Assert(!1)
            }
            if (3 == c.m_count) break;
            h = c.GetClosestPoint();
            h.LengthSquared();
            G = c.GetSearchDirection();
            if (G.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
            h = C[c.m_count];
            h.indexA = e.GetSupport(g.MulTMV(r.R, G.GetNegative()));
            h.wA = g.MulX(r, e.GetVertex(h.indexA));
            h.indexB = b.GetSupport(g.MulTMV(q.R, G));
            h.wB = g.MulX(q, b.GetVertex(h.indexB));
            h.w = g.SubtractVV(h.wB, h.wA);
            ++w;
            ++E.b2_gjkIters;
            for (var Q = !1, G = 0; G < I; G++)
                if (h.indexA == B[G] && h.indexB == m[G]) {
                    Q = !0;
                    break
                }
            if (Q) break;
            ++c.m_count
        }
        E.b2_gjkMaxIters = g.Max(E.b2_gjkMaxIters, w);
        c.GetWitnessPoints(f.pointA, f.pointB);
        f.distance = g.SubtractVV(f.pointA, f.pointB).Length();
        f.iterations = w;
        c.WriteCache(l);
        n.useRadii && (l =
            e.m_radius, b = b.m_radius, f.distance > l + b && f.distance > Number.MIN_VALUE ? (f.distance -= l + b, n = g.SubtractVV(f.pointB, f.pointA), n.Normalize(), f.pointA.x += l * n.x, f.pointA.y += l * n.y, f.pointB.x -= b * n.x, f.pointB.y -= b * n.y) : (h = new a, h.x = .5 * (f.pointA.x + f.pointB.x), h.y = .5 * (f.pointA.y + f.pointB.y), f.pointA.x = f.pointB.x = h.x, f.pointA.y = f.pointB.y = h.y, f.distance = 0))
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Distance.s_simplex = new q;
        Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
        Box2D.Collision.b2Distance.s_saveB =
            new Vector_a2j_Number(3)
    });
    z.b2DistanceInput = function() {};
    e.b2DistanceOutput = function() {
        this.pointA = new a;
        this.pointB = new a
    };
    y.b2DistanceProxy = function() {};
    y.prototype.Set = function(f) {
        switch (f.GetType()) {
            case h.e_circleShape:
                f = f instanceof b ? f : null;
                this.m_vertices = new Vector(1, !0);
                this.m_vertices[0] = f.m_p;
                this.m_count = 1;
                this.m_radius = f.m_radius;
                break;
            case h.e_polygonShape:
                f = f instanceof k ? f : null;
                this.m_vertices = f.m_vertices;
                this.m_count = f.m_vertexCount;
                this.m_radius = f.m_radius;
                break;
            default:
                d.b2Assert(!1)
        }
    };
    y.prototype.GetSupport = function(f) {
        for (var a = 0, l = this.m_vertices[0].x * f.x + this.m_vertices[0].y * f.y, n = 1; n < this.m_count; ++n) {
            var e = this.m_vertices[n].x * f.x + this.m_vertices[n].y * f.y;
            e > l && (a = n, l = e)
        }
        return a
    };
    y.prototype.GetSupportVertex = function(f) {
        for (var a = 0, l = this.m_vertices[0].x * f.x + this.m_vertices[0].y * f.y, n = 1; n < this.m_count; ++n) {
            var e = this.m_vertices[n].x * f.x + this.m_vertices[n].y * f.y;
            e > l && (a = n, l = e)
        }
        return this.m_vertices[a]
    };
    y.prototype.GetVertexCount = function() {
        return this.m_count
    };
    y.prototype.GetVertex =
        function(f) {
            void 0 === f && (f = 0);
            d.b2Assert(0 <= f && f < this.m_count);
            return this.m_vertices[f]
        };
    w.b2DynamicTree = function() {};
    w.prototype.b2DynamicTree = function() {
        this.m_freeList = this.m_root = null;
        this.m_insertionCount = this.m_path = 0
    };
    w.prototype.CreateProxy = function(f, a) {
        var l = this.AllocateNode(),
            n = d.b2_aabbExtension,
            e = d.b2_aabbExtension;
        l.aabb.lowerBound.x = f.lowerBound.x - n;
        l.aabb.lowerBound.y = f.lowerBound.y - e;
        l.aabb.upperBound.x = f.upperBound.x + n;
        l.aabb.upperBound.y = f.upperBound.y + e;
        l.userData = a;
        this.InsertLeaf(l);
        return l
    };
    w.prototype.DestroyProxy = function(f) {
        this.RemoveLeaf(f);
        this.FreeNode(f)
    };
    w.prototype.MoveProxy = function(f, a, l) {
        d.b2Assert(f.IsLeaf());
        if (f.aabb.Contains(a)) return !1;
        this.RemoveLeaf(f);
        var n = d.b2_aabbExtension + d.b2_aabbMultiplier * (0 < l.x ? l.x : -l.x);
        l = d.b2_aabbExtension + d.b2_aabbMultiplier * (0 < l.y ? l.y : -l.y);
        f.aabb.lowerBound.x = a.lowerBound.x - n;
        f.aabb.lowerBound.y = a.lowerBound.y - l;
        f.aabb.upperBound.x = a.upperBound.x + n;
        f.aabb.upperBound.y = a.upperBound.y + l;
        this.InsertLeaf(f);
        return !0
    };
    w.prototype.Rebalance =
        function(f) {
            void 0 === f && (f = 0);
            if (null != this.m_root)
                for (var a = 0; a < f; a++) {
                    for (var l = this.m_root, n = 0; 0 == l.IsLeaf();) l = this.m_path >> n & 1 ? l.child2 : l.child1, n = n + 1 & 31;
                    ++this.m_path;
                    this.RemoveLeaf(l);
                    this.InsertLeaf(l)
                }
        };
    w.prototype.GetFatAABB = function(f) {
        return f.aabb
    };
    w.prototype.GetUserData = function(f) {
        return f.userData
    };
    w.prototype.Query = function(f, a) {
        if (null != this.m_root) {
            var l = new Vector,
                n = 0;
            for (l[n++] = this.m_root; 0 < n;) {
                var e = l[--n];
                if (e.aabb.TestOverlap(a))
                    if (e.IsLeaf()) {
                        if (!f(e)) break
                    } else l[n++] =
                        e.child1, l[n++] = e.child2
            }
        }
    };
    w.prototype.RayCast = function(f, a) {
        if (null != this.m_root) {
            var l = a.p1,
                n = a.p2,
                e = g.SubtractVV(l, n);
            e.Normalize();
            var e = g.CrossFV(1, e),
                b = g.AbsV(e),
                r = a.maxFraction,
                c = new m,
                q = 0,
                d = 0,
                q = l.x + r * (n.x - l.x),
                d = l.y + r * (n.y - l.y);
            c.lowerBound.x = Math.min(l.x, q);
            c.lowerBound.y = Math.min(l.y, d);
            c.upperBound.x = Math.max(l.x, q);
            c.upperBound.y = Math.max(l.y, d);
            var C = new Vector,
                B = 0;
            for (C[B++] = this.m_root; 0 < B;)
                if (r = C[--B], 0 != r.aabb.TestOverlap(c) && (q = r.aabb.GetCenter(), d = r.aabb.GetExtents(), !(0 < Math.abs(e.x *
                    (l.x - q.x) + e.y * (l.y - q.y)) - b.x * d.x - b.y * d.y)))
                    if (r.IsLeaf()) {
                        q = new M;
                        q.p1 = a.p1;
                        q.p2 = a.p2;
                        q.maxFraction = a.maxFraction;
                        r = f(q, r);
                        if (0 == r) break;
                        0 < r && (q = l.x + r * (n.x - l.x), d = l.y + r * (n.y - l.y), c.lowerBound.x = Math.min(l.x, q), c.lowerBound.y = Math.min(l.y, d), c.upperBound.x = Math.max(l.x, q), c.upperBound.y = Math.max(l.y, d))
                    } else C[B++] = r.child1, C[B++] = r.child2
        }
    };
    w.prototype.AllocateNode = function() {
        if (this.m_freeList) {
            var f = this.m_freeList;
            this.m_freeList = f.parent;
            f.parent = null;
            f.child1 = null;
            f.child2 = null;
            return f
        }
        return new D
    };
    w.prototype.FreeNode = function(f) {
        f.parent = this.m_freeList;
        this.m_freeList = f
    };
    w.prototype.InsertLeaf = function(f) {
        ++this.m_insertionCount;
        if (null == this.m_root) this.m_root = f, this.m_root.parent = null;
        else {
            var a = f.aabb.GetCenter(),
                l = this.m_root;
            if (0 == l.IsLeaf()) {
                do var n = l.child1,
                    l = l.child2,
                    l = Math.abs((n.aabb.lowerBound.x + n.aabb.upperBound.x) / 2 - a.x) + Math.abs((n.aabb.lowerBound.y + n.aabb.upperBound.y) / 2 - a.y) < Math.abs((l.aabb.lowerBound.x + l.aabb.upperBound.x) / 2 - a.x) + Math.abs((l.aabb.lowerBound.y + l.aabb.upperBound.y) /
                        2 - a.y) ? n : l; while (0 == l.IsLeaf())
            }
            a = l.parent;
            n = this.AllocateNode();
            n.parent = a;
            n.userData = null;
            n.aabb.Combine(f.aabb, l.aabb);
            if (a) {
                l.parent.child1 == l ? a.child1 = n : a.child2 = n;
                n.child1 = l;
                n.child2 = f;
                l.parent = n;
                f.parent = n;
                do {
                    if (a.aabb.Contains(n.aabb)) break;
                    a.aabb.Combine(a.child1.aabb, a.child2.aabb);
                    n = a;
                    a = a.parent
                } while (a)
            } else n.child1 = l, n.child2 = f, l.parent = n, this.m_root = f.parent = n
        }
    };
    w.prototype.RemoveLeaf = function(f) {
        if (f == this.m_root) this.m_root = null;
        else {
            var a = f.parent,
                l = a.parent;
            f = a.child1 == f ? a.child2 :
                a.child1;
            if (l)
                for (l.child1 == a ? l.child1 = f : l.child2 = f, f.parent = l, this.FreeNode(a); l;) {
                    a = l.aabb;
                    l.aabb = m.Combine(l.child1.aabb, l.child2.aabb);
                    if (a.Contains(l.aabb)) break;
                    l = l.parent
                } else this.m_root = f, f.parent = null, this.FreeNode(a)
        }
    };
    H.b2DynamicTreeBroadPhase = function() {
        this.m_tree = new w;
        this.m_moveBuffer = new Vector;
        this.m_pairBuffer = new Vector;
        this.m_pairCount = 0
    };
    H.prototype.CreateProxy = function(f, a) {
        var l = this.m_tree.CreateProxy(f, a);
        ++this.m_proxyCount;
        this.BufferMove(l);
        return l
    };
    H.prototype.DestroyProxy =
        function(f) {
            this.UnBufferMove(f);
            --this.m_proxyCount;
            this.m_tree.DestroyProxy(f)
        };
    H.prototype.MoveProxy = function(f, a, l) {
        this.m_tree.MoveProxy(f, a, l) && this.BufferMove(f)
    };
    H.prototype.TestOverlap = function(f, a) {
        var l = this.m_tree.GetFatAABB(f),
            n = this.m_tree.GetFatAABB(a);
        return l.TestOverlap(n)
    };
    H.prototype.GetUserData = function(f) {
        return this.m_tree.GetUserData(f)
    };
    H.prototype.GetFatAABB = function(f) {
        return this.m_tree.GetFatAABB(f)
    };
    H.prototype.GetProxyCount = function() {
        return this.m_proxyCount
    };
    H.prototype.UpdatePairs =
        function(f) {
            for (var a = this, l = a.m_pairCount = 0, n, l = 0; l < a.m_moveBuffer.length; ++l) {
                n = a.m_moveBuffer[l];
                var e = a.m_tree.GetFatAABB(n);
                a.m_tree.Query(function(f) {
                    if (f == n) return !0;
                    a.m_pairCount == a.m_pairBuffer.length && (a.m_pairBuffer[a.m_pairCount] = new N);
                    var l = a.m_pairBuffer[a.m_pairCount];
                    l.proxyA = f < n ? f : n;
                    l.proxyB = f >= n ? f : n;
                    ++a.m_pairCount;
                    return !0
                }, e)
            }
            for (l = a.m_moveBuffer.length = 0; l < a.m_pairCount;) {
                var e = a.m_pairBuffer[l],
                    r = a.m_tree.GetUserData(e.proxyA),
                    b = a.m_tree.GetUserData(e.proxyB);
                f(r, b);
                for (++l; l <
                    a.m_pairCount;) {
                    r = a.m_pairBuffer[l];
                    if (r.proxyA != e.proxyA || r.proxyB != e.proxyB) break;
                    ++l
                }
            }
        };
    H.prototype.Query = function(f, a) {
        this.m_tree.Query(f, a)
    };
    H.prototype.RayCast = function(f, a) {
        this.m_tree.RayCast(f, a)
    };
    H.prototype.Validate = function() {};
    H.prototype.Rebalance = function(f) {
        void 0 === f && (f = 0);
        this.m_tree.Rebalance(f)
    };
    H.prototype.BufferMove = function(f) {
        this.m_moveBuffer[this.m_moveBuffer.length] = f
    };
    H.prototype.UnBufferMove = function(f) {
        f = parseInt(this.m_moveBuffer.indexOf(f));
        this.m_moveBuffer.splice(f,
            1)
    };
    H.prototype.ComparePairs = function(f, a) {
        return 0
    };
    H.__implements = {};
    H.__implements[C] = !0;
    D.b2DynamicTreeNode = function() {
        this.aabb = new m
    };
    D.prototype.IsLeaf = function() {
        return null == this.child1
    };
    N.b2DynamicTreePair = function() {};
    F.b2Manifold = function() {
        this.m_pointCount = 0
    };
    F.prototype.b2Manifold = function() {
        this.m_points = new Vector(d.b2_maxManifoldPoints);
        for (var f = 0; f < d.b2_maxManifoldPoints; f++) this.m_points[f] = new P;
        this.m_localPlaneNormal = new a;
        this.m_localPoint = new a
    };
    F.prototype.Reset = function() {
        for (var f =
            0; f < d.b2_maxManifoldPoints; f++)(this.m_points[f] instanceof P ? this.m_points[f] : null).Reset();
        this.m_localPlaneNormal.SetZero();
        this.m_localPoint.SetZero();
        this.m_pointCount = this.m_type = 0
    };
    F.prototype.Set = function(f) {
        this.m_pointCount = f.m_pointCount;
        for (var a = 0; a < d.b2_maxManifoldPoints; a++)(this.m_points[a] instanceof P ? this.m_points[a] : null).Set(f.m_points[a]);
        this.m_localPlaneNormal.SetV(f.m_localPlaneNormal);
        this.m_localPoint.SetV(f.m_localPoint);
        this.m_type = f.m_type
    };
    F.prototype.Copy = function() {
        var f =
            new F;
        f.Set(this);
        return f
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Manifold.e_circles = 1;
        Box2D.Collision.b2Manifold.e_faceA = 2;
        Box2D.Collision.b2Manifold.e_faceB = 4
    });
    P.b2ManifoldPoint = function() {
        this.m_localPoint = new a;
        this.m_id = new x
    };
    P.prototype.b2ManifoldPoint = function() {
        this.Reset()
    };
    P.prototype.Reset = function() {
        this.m_localPoint.SetZero();
        this.m_tangentImpulse = this.m_normalImpulse = 0;
        this.m_id.key = 0
    };
    P.prototype.Set = function(f) {
        this.m_localPoint.SetV(f.m_localPoint);
        this.m_normalImpulse =
            f.m_normalImpulse;
        this.m_tangentImpulse = f.m_tangentImpulse;
        this.m_id.Set(f.m_id)
    };
    K.b2Point = function() {
        this.p = new a
    };
    K.prototype.Support = function(f, a, l) {
        return this.p
    };
    K.prototype.GetFirstVertex = function(f) {
        return this.p
    };
    M.b2RayCastInput = function() {
        this.p1 = new a;
        this.p2 = new a
    };
    M.prototype.b2RayCastInput = function(f, a, l) {
        void 0 === f && (f = null);
        void 0 === a && (a = null);
        void 0 === l && (l = 1);
        f && this.p1.SetV(f);
        a && this.p2.SetV(a);
        this.maxFraction = l
    };
    J.b2RayCastOutput = function() {
        this.normal = new a
    };
    L.b2Segment = function() {
        this.p1 =
            new a;
        this.p2 = new a
    };
    L.prototype.TestSegment = function(f, a, l, n) {
        void 0 === n && (n = 0);
        var e = l.p1,
            r = l.p2.x - e.x,
            b = l.p2.y - e.y;
        l = this.p2.y - this.p1.y;
        var q = -(this.p2.x - this.p1.x),
            c = 100 * Number.MIN_VALUE,
            d = -(r * l + b * q);
        if (d > c) {
            var C = e.x - this.p1.x,
                g = e.y - this.p1.y,
                e = C * l + g * q;
            if (0 <= e && e <= n * d && (n = -r * g + b * C, -c * d <= n && n <= d * (1 + c))) return n = Math.sqrt(l * l + q * q), f[0] = e / d, a.Set(l / n, q / n), !0
        }
        return !1
    };
    L.prototype.Extend = function(f) {
        this.ExtendForward(f);
        this.ExtendBackward(f)
    };
    L.prototype.ExtendForward = function(f) {
        var a = this.p2.x -
            this.p1.x,
            l = this.p2.y - this.p1.y;
        f = Math.min(0 < a ? (f.upperBound.x - this.p1.x) / a : 0 > a ? (f.lowerBound.x - this.p1.x) / a : Number.POSITIVE_INFINITY, 0 < l ? (f.upperBound.y - this.p1.y) / l : 0 > l ? (f.lowerBound.y - this.p1.y) / l : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + a * f;
        this.p2.y = this.p1.y + l * f
    };
    L.prototype.ExtendBackward = function(f) {
        var a = -this.p2.x + this.p1.x,
            l = -this.p2.y + this.p1.y;
        f = Math.min(0 < a ? (f.upperBound.x - this.p2.x) / a : 0 > a ? (f.lowerBound.x - this.p2.x) / a : Number.POSITIVE_INFINITY, 0 < l ? (f.upperBound.y - this.p2.y) / l : 0 >
            l ? (f.lowerBound.y - this.p2.y) / l : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + a * f;
        this.p1.y = this.p2.y + l * f
    };
    n.b2SeparationFunction = function() {
        this.m_localPoint = new a;
        this.m_axis = new a
    };
    n.prototype.Initialize = function(f, l, e, r, b) {
        this.m_proxyA = l;
        this.m_proxyB = r;
        var q = parseInt(f.count);
        d.b2Assert(0 < q && 3 > q);
        var c, C, B, m, G = m = B = r = l = 0,
            h = 0,
            G = 0;
        1 == q ? (this.m_type = n.e_points, c = this.m_proxyA.GetVertex(f.indexA[0]), C = this.m_proxyB.GetVertex(f.indexB[0]), q = c, f = e.R, l = e.position.x + (f.col1.x * q.x + f.col2.x * q.y), r = e.position.y +
            (f.col1.y * q.x + f.col2.y * q.y), q = C, f = b.R, B = b.position.x + (f.col1.x * q.x + f.col2.x * q.y), m = b.position.y + (f.col1.y * q.x + f.col2.y * q.y), this.m_axis.x = B - l, this.m_axis.y = m - r, this.m_axis.Normalize()) : f.indexB[0] == f.indexB[1] ? (this.m_type = n.e_faceA, l = this.m_proxyA.GetVertex(f.indexA[0]), r = this.m_proxyA.GetVertex(f.indexA[1]), C = this.m_proxyB.GetVertex(f.indexB[0]), this.m_localPoint.x = .5 * (l.x + r.x), this.m_localPoint.y = .5 * (l.y + r.y), this.m_axis = g.CrossVF(g.SubtractVV(r, l), 1), this.m_axis.Normalize(), q = this.m_axis, f = e.R,
            G = f.col1.x * q.x + f.col2.x * q.y, h = f.col1.y * q.x + f.col2.y * q.y, q = this.m_localPoint, f = e.R, l = e.position.x + (f.col1.x * q.x + f.col2.x * q.y), r = e.position.y + (f.col1.y * q.x + f.col2.y * q.y), q = C, f = b.R, B = b.position.x + (f.col1.x * q.x + f.col2.x * q.y), m = b.position.y + (f.col1.y * q.x + f.col2.y * q.y), 0 > (B - l) * G + (m - r) * h && this.m_axis.NegativeSelf()) : f.indexA[0] == f.indexA[0] ? (this.m_type = n.e_faceB, B = this.m_proxyB.GetVertex(f.indexB[0]), m = this.m_proxyB.GetVertex(f.indexB[1]), c = this.m_proxyA.GetVertex(f.indexA[0]), this.m_localPoint.x = .5 * (B.x +
            m.x), this.m_localPoint.y = .5 * (B.y + m.y), this.m_axis = g.CrossVF(g.SubtractVV(m, B), 1), this.m_axis.Normalize(), q = this.m_axis, f = b.R, G = f.col1.x * q.x + f.col2.x * q.y, h = f.col1.y * q.x + f.col2.y * q.y, q = this.m_localPoint, f = b.R, B = b.position.x + (f.col1.x * q.x + f.col2.x * q.y), m = b.position.y + (f.col1.y * q.x + f.col2.y * q.y), q = c, f = e.R, l = e.position.x + (f.col1.x * q.x + f.col2.x * q.y), r = e.position.y + (f.col1.y * q.x + f.col2.y * q.y), 0 > (l - B) * G + (r - m) * h && this.m_axis.NegativeSelf()) : (l = this.m_proxyA.GetVertex(f.indexA[0]), r = this.m_proxyA.GetVertex(f.indexA[1]),
            B = this.m_proxyB.GetVertex(f.indexB[0]), m = this.m_proxyB.GetVertex(f.indexB[1]), g.MulX(e, c), c = g.MulMV(e.R, g.SubtractVV(r, l)), g.MulX(b, C), G = g.MulMV(b.R, g.SubtractVV(m, B)), b = c.x * c.x + c.y * c.y, C = G.x * G.x + G.y * G.y, f = g.SubtractVV(G, c), e = c.x * f.x + c.y * f.y, f = G.x * f.x + G.y * f.y, c = c.x * G.x + c.y * G.y, h = b * C - c * c, G = 0, 0 != h && (G = g.Clamp((c * f - e * C) / h, 0, 1)), 0 > (c * G + f) / C && (G = g.Clamp((c - e) / b, 0, 1)), c = new a, c.x = l.x + G * (r.x - l.x), c.y = l.y + G * (r.y - l.y), C = new a, C.x = B.x + G * (m.x - B.x), C.y = B.y + G * (m.y - B.y), 0 == G || 1 == G ? (this.m_type = n.e_faceB, this.m_axis =
                g.CrossVF(g.SubtractVV(m, B), 1), this.m_axis.Normalize(), this.m_localPoint = C) : (this.m_type = n.e_faceA, this.m_axis = g.CrossVF(g.SubtractVV(r, l), 1), this.m_localPoint = c), 0 > G && this.m_axis.NegativeSelf())
    };
    n.prototype.Evaluate = function(f, a) {
        var l, e, q = 0;
        switch (this.m_type) {
            case n.e_points:
                return l = g.MulTMV(f.R, this.m_axis), e = g.MulTMV(a.R, this.m_axis.GetNegative()), l = this.m_proxyA.GetSupportVertex(l), e = this.m_proxyB.GetSupportVertex(e), l = g.MulX(f, l), e = g.MulX(a, e), q = (e.x - l.x) * this.m_axis.x + (e.y - l.y) * this.m_axis.y;
            case n.e_faceA:
                return q = g.MulMV(f.R, this.m_axis), l = g.MulX(f, this.m_localPoint), e = g.MulTMV(a.R, q.GetNegative()), e = this.m_proxyB.GetSupportVertex(e), e = g.MulX(a, e), q = (e.x - l.x) * q.x + (e.y - l.y) * q.y;
            case n.e_faceB:
                return q = g.MulMV(a.R, this.m_axis), e = g.MulX(a, this.m_localPoint), l = g.MulTMV(f.R, q.GetNegative()), l = this.m_proxyA.GetSupportVertex(l), l = g.MulX(f, l), q = (l.x - e.x) * q.x + (l.y - e.y) * q.y;
            default:
                return d.b2Assert(!1), 0
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2SeparationFunction.e_points = 1;
        Box2D.Collision.b2SeparationFunction.e_faceA =
            2;
        Box2D.Collision.b2SeparationFunction.e_faceB = 4
    });
    q.b2Simplex = function() {
        this.m_v1 = new r;
        this.m_v2 = new r;
        this.m_v3 = new r;
        this.m_vertices = new Vector(3)
    };
    q.prototype.b2Simplex = function() {
        this.m_vertices[0] = this.m_v1;
        this.m_vertices[1] = this.m_v2;
        this.m_vertices[2] = this.m_v3
    };
    q.prototype.ReadCache = function(f, a, l, n, e) {
        d.b2Assert(0 <= f.count && 3 >= f.count);
        var q, r;
        this.m_count = f.count;
        for (var b = this.m_vertices, c = 0; c < this.m_count; c++) {
            var C = b[c];
            C.indexA = f.indexA[c];
            C.indexB = f.indexB[c];
            q = a.GetVertex(C.indexA);
            r = n.GetVertex(C.indexB);
            C.wA = g.MulX(l, q);
            C.wB = g.MulX(e, r);
            C.w = g.SubtractVV(C.wB, C.wA);
            C.a = 0
        }
        1 < this.m_count && (f = f.metric, q = this.GetMetric(), q < .5 * f || 2 * f < q || q < Number.MIN_VALUE) && (this.m_count = 0);
        0 == this.m_count && (C = b[0], C.indexA = 0, C.indexB = 0, q = a.GetVertex(0), r = n.GetVertex(0), C.wA = g.MulX(l, q), C.wB = g.MulX(e, r), C.w = g.SubtractVV(C.wB, C.wA), this.m_count = 1)
    };
    q.prototype.WriteCache = function(f) {
        f.metric = this.GetMetric();
        f.count = Box2D.parseUInt(this.m_count);
        for (var a = this.m_vertices, l = 0; l < this.m_count; l++) f.indexA[l] =
            Box2D.parseUInt(a[l].indexA), f.indexB[l] = Box2D.parseUInt(a[l].indexB)
    };
    q.prototype.GetSearchDirection = function() {
        switch (this.m_count) {
            case 1:
                return this.m_v1.w.GetNegative();
            case 2:
                var f = g.SubtractVV(this.m_v2.w, this.m_v1.w);
                return 0 < g.CrossVV(f, this.m_v1.w.GetNegative()) ? g.CrossFV(1, f) : g.CrossVF(f, 1);
            default:
                return d.b2Assert(!1), new a
        }
    };
    q.prototype.GetClosestPoint = function() {
        switch (this.m_count) {
            case 0:
                return d.b2Assert(!1), new a;
            case 1:
                return this.m_v1.w;
            case 2:
                return new a(this.m_v1.a * this.m_v1.w.x +
                    this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            default:
                return d.b2Assert(!1), new a
        }
    };
    q.prototype.GetWitnessPoints = function(f, a) {
        switch (this.m_count) {
            case 0:
                d.b2Assert(!1);
                break;
            case 1:
                f.SetV(this.m_v1.wA);
                a.SetV(this.m_v1.wB);
                break;
            case 2:
                f.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                f.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                a.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                a.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                a.x = f.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                a.y = f.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                d.b2Assert(!1)
        }
    };
    q.prototype.GetMetric = function() {
        switch (this.m_count) {
            case 0:
                return d.b2Assert(!1), 0;
            case 1:
                return 0;
            case 2:
                return g.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
            case 3:
                return g.CrossVV(g.SubtractVV(this.m_v2.w, this.m_v1.w), g.SubtractVV(this.m_v3.w, this.m_v1.w));
            default:
                return d.b2Assert(!1),
                    0
        }
    };
    q.prototype.Solve2 = function() {
        var f = this.m_v1.w,
            a = this.m_v2.w,
            l = g.SubtractVV(a, f),
            f = -(f.x * l.x + f.y * l.y);
        0 >= f ? this.m_count = this.m_v1.a = 1 : (a = a.x * l.x + a.y * l.y, 0 >= a ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (l = 1 / (a + f), this.m_v1.a = a * l, this.m_v2.a = f * l, this.m_count = 2))
    };
    q.prototype.Solve3 = function() {
        var f = this.m_v1.w,
            a = this.m_v2.w,
            l = this.m_v3.w,
            n = g.SubtractVV(a, f),
            e = g.Dot(f, n),
            q = g.Dot(a, n),
            e = -e,
            r = g.SubtractVV(l, f),
            b = g.Dot(f, r),
            c = g.Dot(l, r),
            b = -b,
            C = g.SubtractVV(l, a),
            d = g.Dot(a, C),
            C = g.Dot(l, C),
            d = -d,
            r = g.CrossVV(n, r),
            n = r * g.CrossVV(a, l),
            l = r * g.CrossVV(l, f),
            f = r * g.CrossVV(f, a);
        0 >= e && 0 >= b ? this.m_count = this.m_v1.a = 1 : 0 < q && 0 < e && 0 >= f ? (c = 1 / (q + e), this.m_v1.a = q * c, this.m_v2.a = e * c, this.m_count = 2) : 0 < c && 0 < b && 0 >= l ? (q = 1 / (c + b), this.m_v1.a = c * q, this.m_v3.a = b * q, this.m_count = 2, this.m_v2.Set(this.m_v3)) : 0 >= q && 0 >= d ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : 0 >= c && 0 >= C ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : 0 < C && 0 < d && 0 >= n ? (q = 1 / (C + d), this.m_v2.a = C * q, this.m_v3.a = d * q, this.m_count = 2, this.m_v1.Set(this.m_v3)) :
            (q = 1 / (n + l + f), this.m_v1.a = n * q, this.m_v2.a = l * q, this.m_v3.a = f * q, this.m_count = 3)
    };
    B.b2SimplexCache = function() {
        this.indexA = new Vector_a2j_Number(3);
        this.indexB = new Vector_a2j_Number(3)
    };
    r.b2SimplexVertex = function() {};
    r.prototype.Set = function(f) {
        this.wA.SetV(f.wA);
        this.wB.SetV(f.wB);
        this.w.SetV(f.w);
        this.a = f.a;
        this.indexA = f.indexA;
        this.indexB = f.indexB
    };
    I.b2TimeOfImpact = function() {};
    I.TimeOfImpact = function(f) {
        ++I.b2_toiCalls;
        var a = f.proxyA,
            l = f.proxyB,
            n = f.sweepA,
            e = f.sweepB;
        d.b2Assert(n.t0 == e.t0);
        d.b2Assert(1 -
            n.t0 > Number.MIN_VALUE);
        var q = a.m_radius + l.m_radius;
        f = f.tolerance;
        var r = 0,
            b = 0,
            c = 0;
        I.s_cache.count = 0;
        for (I.s_distanceInput.useRadii = !1;;) {
            n.GetTransform(I.s_xfA, r);
            e.GetTransform(I.s_xfB, r);
            I.s_distanceInput.proxyA = a;
            I.s_distanceInput.proxyB = l;
            I.s_distanceInput.transformA = I.s_xfA;
            I.s_distanceInput.transformB = I.s_xfB;
            E.Distance(I.s_distanceOutput, I.s_cache, I.s_distanceInput);
            if (0 >= I.s_distanceOutput.distance) {
                r = 1;
                break
            }
            I.s_fcn.Initialize(I.s_cache, a, I.s_xfA, l, I.s_xfB);
            var C = I.s_fcn.Evaluate(I.s_xfA,
                I.s_xfB);
            if (0 >= C) {
                r = 1;
                break
            }
            0 == b && (c = C > q ? g.Max(q - f, .75 * q) : g.Max(C - f, .02 * q));
            if (C - c < .5 * f) {
                if (0 == b) {
                    r = 1;
                    break
                }
                break
            }
            var B = r,
                m = r,
                G = 1;
            n.GetTransform(I.s_xfA, G);
            e.GetTransform(I.s_xfB, G);
            var h = I.s_fcn.Evaluate(I.s_xfA, I.s_xfB);
            if (h >= c) {
                r = 1;
                break
            }
            for (var w = 0;;) {
                var Q = 0,
                    Q = w & 1 ? m + (c - C) * (G - m) / (h - C) : .5 * (m + G);
                n.GetTransform(I.s_xfA, Q);
                e.GetTransform(I.s_xfB, Q);
                var k = I.s_fcn.Evaluate(I.s_xfA, I.s_xfB);
                if (g.Abs(k - c) < .025 * f) {
                    B = Q;
                    break
                }
                k > c ? (m = Q, C = k) : (G = Q, h = k);
                ++w;
                ++I.b2_toiRootIters;
                if (50 == w) break
            }
            I.b2_toiMaxRootIters =
                g.Max(I.b2_toiMaxRootIters, w);
            if (B < (1 + 100 * Number.MIN_VALUE) * r) break;
            r = B;
            b++;
            ++I.b2_toiIters;
            if (1E3 == b) break
        }
        I.b2_toiMaxIters = g.Max(I.b2_toiMaxIters, b);
        return r
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.s_cache = new B;
        Box2D.Collision.b2TimeOfImpact.s_distanceInput =
            new z;
        Box2D.Collision.b2TimeOfImpact.s_xfA = new p;
        Box2D.Collision.b2TimeOfImpact.s_xfB = new p;
        Box2D.Collision.b2TimeOfImpact.s_fcn = new n;
        Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new e
    });
    Q.b2TOIInput = function() {
        this.proxyA = new y;
        this.proxyB = new y;
        this.sweepA = new c;
        this.sweepB = new c
    };
    G.b2WorldManifold = function() {
        this.m_normal = new a
    };
    G.prototype.b2WorldManifold = function() {
        this.m_points = new Vector(d.b2_maxManifoldPoints);
        for (var f = 0; f < d.b2_maxManifoldPoints; f++) this.m_points[f] = new a
    };
    G.prototype.Initialize =
        function(f, a, l, n, e) {
            void 0 === l && (l = 0);
            void 0 === e && (e = 0);
            if (0 != f.m_pointCount) {
                var q = 0,
                    r, b, c = 0,
                    C = 0,
                    d = 0,
                    B = 0,
                    g = 0;
                r = 0;
                switch (f.m_type) {
                    case F.e_circles:
                        b = a.R;
                        r = f.m_localPoint;
                        q = a.position.x + b.col1.x * r.x + b.col2.x * r.y;
                        a = a.position.y + b.col1.y * r.x + b.col2.y * r.y;
                        b = n.R;
                        r = f.m_points[0].m_localPoint;
                        f = n.position.x + b.col1.x * r.x + b.col2.x * r.y;
                        n = n.position.y + b.col1.y * r.x + b.col2.y * r.y;
                        r = f - q;
                        b = n - a;
                        c = r * r + b * b;
                        c > Number.MIN_VALUE * Number.MIN_VALUE ? (c = Math.sqrt(c), this.m_normal.x = r / c, this.m_normal.y = b / c) : (this.m_normal.x =
                            1, this.m_normal.y = 0);
                        r = a + l * this.m_normal.y;
                        n -= e * this.m_normal.y;
                        this.m_points[0].x = .5 * (q + l * this.m_normal.x + (f - e * this.m_normal.x));
                        this.m_points[0].y = .5 * (r + n);
                        break;
                    case F.e_faceA:
                        b = a.R;
                        r = f.m_localPlaneNormal;
                        c = b.col1.x * r.x + b.col2.x * r.y;
                        C = b.col1.y * r.x + b.col2.y * r.y;
                        b = a.R;
                        r = f.m_localPoint;
                        d = a.position.x + b.col1.x * r.x + b.col2.x * r.y;
                        B = a.position.y + b.col1.y * r.x + b.col2.y * r.y;
                        this.m_normal.x = c;
                        this.m_normal.y = C;
                        for (q = 0; q < f.m_pointCount; q++) b = n.R, r = f.m_points[q].m_localPoint, g = n.position.x + b.col1.x * r.x + b.col2.x *
                            r.y, r = n.position.y + b.col1.y * r.x + b.col2.y * r.y, this.m_points[q].x = g + .5 * (l - (g - d) * c - (r - B) * C - e) * c, this.m_points[q].y = r + .5 * (l - (g - d) * c - (r - B) * C - e) * C;
                        break;
                    case F.e_faceB:
                        for (b = n.R, r = f.m_localPlaneNormal, c = b.col1.x * r.x + b.col2.x * r.y, C = b.col1.y * r.x + b.col2.y * r.y, b = n.R, r = f.m_localPoint, d = n.position.x + b.col1.x * r.x + b.col2.x * r.y, B = n.position.y + b.col1.y * r.x + b.col2.y * r.y, this.m_normal.x = -c, this.m_normal.y = -C, q = 0; q < f.m_pointCount; q++) b = a.R, r = f.m_points[q].m_localPoint, g = a.position.x + b.col1.x * r.x + b.col2.x * r.y, r = a.position.y +
                            b.col1.y * r.x + b.col2.y * r.y, this.m_points[q].x = g + .5 * (e - (g - d) * c - (r - B) * C - l) * c, this.m_points[q].y = r + .5 * (e - (g - d) * c - (r - B) * C - l) * C
                }
            }
        };
    f.ClipVertex = function() {
        this.v = new a;
        this.id = new x
    };
    f.prototype.Set = function(f) {
        this.v.SetV(f.v);
        this.id.Set(f.id)
    };
    l.Features = function() {};
    Object.defineProperty(l.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._referenceEdge
        }
    });
    Object.defineProperty(l.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        set: function(f) {
            void 0 === f && (f =
                0);
            this._referenceEdge = f;
            this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
        }
    });
    Object.defineProperty(l.prototype, "incidentEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentEdge
        }
    });
    Object.defineProperty(l.prototype, "incidentEdge", {
        enumerable: !1,
        configurable: !0,
        set: function(f) {
            void 0 === f && (f = 0);
            this._incidentEdge = f;
            this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
        }
    });
    Object.defineProperty(l.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentVertex
        }
    });
    Object.defineProperty(l.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        set: function(f) {
            void 0 === f && (f = 0);
            this._incidentVertex = f;
            this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
        }
    });
    Object.defineProperty(l.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._flip
        }
    });
    Object.defineProperty(l.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        set: function(f) {
            void 0 === f && (f = 0);
            this._flip = f;
            this._m_id._key =
                this._m_id._key & 16777215 | this._flip << 24 & 4278190080
        }
    })
})();
(function() {
    var b = Box2D.Common.b2Settings,
        k = Box2D.Collision.Shapes.b2CircleShape,
        h = Box2D.Collision.Shapes.b2EdgeChainDef,
        d = Box2D.Collision.Shapes.b2EdgeShape,
        g = Box2D.Collision.Shapes.b2MassData,
        c = Box2D.Collision.Shapes.b2PolygonShape,
        p = Box2D.Collision.Shapes.b2Shape,
        a = Box2D.Common.Math.b2Mat22,
        m = Box2D.Common.Math.b2Math,
        A = Box2D.Common.Math.b2Transform,
        v = Box2D.Common.Math.b2Vec2,
        t = Box2D.Collision.b2Distance,
        x = Box2D.Collision.b2DistanceInput,
        u = Box2D.Collision.b2DistanceOutput,
        E = Box2D.Collision.b2DistanceProxy,
        z = Box2D.Collision.b2SimplexCache;
    Box2D.inherit(k, Box2D.Collision.Shapes.b2Shape);
    k.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    k.b2CircleShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.m_p = new v
    };
    k.prototype.Copy = function() {
        var a = new k;
        a.Set(this);
        return a
    };
    k.prototype.Set = function(a) {
        this.__super.Set.call(this, a);
        Box2D.is(a, k) && this.m_p.SetV((a instanceof k ? a : null).m_p)
    };
    k.prototype.TestPoint = function(a, b) {
        var c = a.R,
            d = a.position.x + (c.col1.x * this.m_p.x +
                c.col2.x * this.m_p.y),
            c = a.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y),
            d = b.x - d,
            c = b.y - c;
        return d * d + c * c <= this.m_radius * this.m_radius
    };
    k.prototype.RayCast = function(a, b, c) {
        var d = c.R,
            g = b.p1.x - (c.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y));
        c = b.p1.y - (c.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y));
        var d = b.p2.x - b.p1.x,
            m = b.p2.y - b.p1.y,
            h = g * d + c * m,
            k = d * d + m * m,
            p = h * h - k * (g * g + c * c - this.m_radius * this.m_radius);
        if (0 > p || k < Number.MIN_VALUE) return !1;
        h = -(h + Math.sqrt(p));
        return 0 <= h && h <= b.maxFraction *
            k ? (h /= k, a.fraction = h, a.normal.x = g + h * d, a.normal.y = c + h * m, a.normal.Normalize(), !0) : !1
    };
    k.prototype.ComputeAABB = function(a, b) {
        var c = b.R,
            d = b.position.x + (c.col1.x * this.m_p.x + c.col2.x * this.m_p.y),
            c = b.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y);
        a.lowerBound.Set(d - this.m_radius, c - this.m_radius);
        a.upperBound.Set(d + this.m_radius, c + this.m_radius)
    };
    k.prototype.ComputeMass = function(a, c) {
        void 0 === c && (c = 0);
        a.mass = c * b.b2_pi * this.m_radius * this.m_radius;
        a.center.SetV(this.m_p);
        a.I = a.mass * (.5 * this.m_radius *
            this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
    };
    k.prototype.ComputeSubmergedArea = function(a, b, c, d) {
        void 0 === b && (b = 0);
        c = m.MulX(c, this.m_p);
        var g = -(m.Dot(a, c) - b);
        if (g < -this.m_radius + Number.MIN_VALUE) return 0;
        if (g > this.m_radius) return d.SetV(c), Math.PI * this.m_radius * this.m_radius;
        b = this.m_radius * this.m_radius;
        var h = g * g,
            g = b * (Math.asin(g / this.m_radius) + Math.PI / 2) + g * Math.sqrt(b - h);
        b = -2 / 3 * Math.pow(b - h, 1.5) / g;
        d.x = c.x + a.x * b;
        d.y = c.y + a.y * b;
        return g
    };
    k.prototype.GetLocalPosition = function() {
        return this.m_p
    };
    k.prototype.SetLocalPosition = function(a) {
        this.m_p.SetV(a)
    };
    k.prototype.GetRadius = function() {
        return this.m_radius
    };
    k.prototype.SetRadius = function(a) {
        void 0 === a && (a = 0);
        this.m_radius = a
    };
    k.prototype.b2CircleShape = function(a) {
        void 0 === a && (a = 0);
        this.__super.b2Shape.call(this);
        this.m_type = p.e_circleShape;
        this.m_radius = a
    };
    h.b2EdgeChainDef = function() {};
    h.prototype.b2EdgeChainDef = function() {
        this.vertexCount = 0;
        this.isALoop = !0;
        this.vertices = []
    };
    Box2D.inherit(d, Box2D.Collision.Shapes.b2Shape);
    d.prototype.__super =
        Box2D.Collision.Shapes.b2Shape.prototype;
    d.b2EdgeShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.s_supportVec = new v;
        this.m_v1 = new v;
        this.m_v2 = new v;
        this.m_coreV1 = new v;
        this.m_coreV2 = new v;
        this.m_normal = new v;
        this.m_direction = new v;
        this.m_cornerDir1 = new v;
        this.m_cornerDir2 = new v
    };
    d.prototype.TestPoint = function(a, b) {
        return !1
    };
    d.prototype.RayCast = function(a, b, c) {
        var d, g = b.p2.x - b.p1.x,
            m = b.p2.y - b.p1.y;
        d = c.R;
        var h = c.position.x + (d.col1.x * this.m_v1.x + d.col2.x * this.m_v1.y),
            k = c.position.y + (d.col1.y * this.m_v1.x + d.col2.y * this.m_v1.y),
            p = c.position.y + (d.col1.y * this.m_v2.x + d.col2.y * this.m_v2.y) - k;
        c = -(c.position.x + (d.col1.x * this.m_v2.x + d.col2.x * this.m_v2.y) - h);
        d = 100 * Number.MIN_VALUE;
        var u = -(g * p + m * c);
        if (u > d) {
            var h = b.p1.x - h,
                t = b.p1.y - k,
                k = h * p + t * c;
            if (0 <= k && k <= b.maxFraction * u && (b = -g * t + m * h, -d * u <= b && b <= u * (1 + d))) return a.fraction = k / u, b = Math.sqrt(p * p + c * c), a.normal.x = p / b, a.normal.y = c / b, !0
        }
        return !1
    };
    d.prototype.ComputeAABB = function(a, b) {
        var c = b.R,
            d = b.position.x + (c.col1.x * this.m_v1.x +
                c.col2.x * this.m_v1.y),
            g = b.position.y + (c.col1.y * this.m_v1.x + c.col2.y * this.m_v1.y),
            m = b.position.x + (c.col1.x * this.m_v2.x + c.col2.x * this.m_v2.y),
            c = b.position.y + (c.col1.y * this.m_v2.x + c.col2.y * this.m_v2.y);
        d < m ? (a.lowerBound.x = d, a.upperBound.x = m) : (a.lowerBound.x = m, a.upperBound.x = d);
        g < c ? (a.lowerBound.y = g, a.upperBound.y = c) : (a.lowerBound.y = c, a.upperBound.y = g)
    };
    d.prototype.ComputeMass = function(a, b) {
        a.mass = 0;
        a.center.SetV(this.m_v1);
        a.I = 0
    };
    d.prototype.ComputeSubmergedArea = function(a, b, c, d) {
        void 0 === b && (b = 0);
        var g =
            new v(a.x * b, a.y * b),
            h = m.MulX(c, this.m_v1);
        c = m.MulX(c, this.m_v2);
        var k = m.Dot(a, h) - b;
        a = m.Dot(a, c) - b;
        if (0 < k) {
            if (0 < a) return 0;
            h.x = -a / (k - a) * h.x + k / (k - a) * c.x;
            h.y = -a / (k - a) * h.y + k / (k - a) * c.y
        } else 0 < a && (c.x = -a / (k - a) * h.x + k / (k - a) * c.x, c.y = -a / (k - a) * h.y + k / (k - a) * c.y);
        d.x = (g.x + h.x + c.x) / 3;
        d.y = (g.y + h.y + c.y) / 3;
        return .5 * ((h.x - g.x) * (c.y - g.y) - (h.y - g.y) * (c.x - g.x))
    };
    d.prototype.GetLength = function() {
        return this.m_length
    };
    d.prototype.GetVertex1 = function() {
        return this.m_v1
    };
    d.prototype.GetVertex2 = function() {
        return this.m_v2
    };
    d.prototype.GetCoreVertex1 =
        function() {
            return this.m_coreV1
        };
    d.prototype.GetCoreVertex2 = function() {
        return this.m_coreV2
    };
    d.prototype.GetNormalVector = function() {
        return this.m_normal
    };
    d.prototype.GetDirectionVector = function() {
        return this.m_direction
    };
    d.prototype.GetCorner1Vector = function() {
        return this.m_cornerDir1
    };
    d.prototype.GetCorner2Vector = function() {
        return this.m_cornerDir2
    };
    d.prototype.Corner1IsConvex = function() {
        return this.m_cornerConvex1
    };
    d.prototype.Corner2IsConvex = function() {
        return this.m_cornerConvex2
    };
    d.prototype.GetFirstVertex =
        function(a) {
            var b = a.R;
            return new v(a.position.x + (b.col1.x * this.m_coreV1.x + b.col2.x * this.m_coreV1.y), a.position.y + (b.col1.y * this.m_coreV1.x + b.col2.y * this.m_coreV1.y))
        };
    d.prototype.GetNextEdge = function() {
        return this.m_nextEdge
    };
    d.prototype.GetPrevEdge = function() {
        return this.m_prevEdge
    };
    d.prototype.Support = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var d = a.R,
            g = a.position.x + (d.col1.x * this.m_coreV1.x + d.col2.x * this.m_coreV1.y),
            m = a.position.y + (d.col1.y * this.m_coreV1.x + d.col2.y * this.m_coreV1.y),
            h = a.position.x + (d.col1.x * this.m_coreV2.x + d.col2.x * this.m_coreV2.y);
        a = a.position.y + (d.col1.y * this.m_coreV2.x + d.col2.y * this.m_coreV2.y);
        g * b + m * c > h * b + a * c ? (this.s_supportVec.x = g, this.s_supportVec.y = m) : (this.s_supportVec.x = h, this.s_supportVec.y = a);
        return this.s_supportVec
    };
    d.prototype.b2EdgeShape = function(a, c) {
        this.__super.b2Shape.call(this);
        this.m_type = p.e_edgeShape;
        this.m_nextEdge = this.m_prevEdge = null;
        this.m_v1 = a;
        this.m_v2 = c;
        this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
        this.m_length =
            this.m_direction.Normalize();
        this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
        this.m_coreV1.Set(-b.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
        this.m_coreV2.Set(-b.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
        this.m_cornerDir1 = this.m_normal;
        this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
    };
    d.prototype.SetPrevEdge = function(a,
        b, c, d) {
        this.m_prevEdge = a;
        this.m_coreV1 = b;
        this.m_cornerDir1 = c;
        this.m_cornerConvex1 = d
    };
    d.prototype.SetNextEdge = function(a, b, c, d) {
        this.m_nextEdge = a;
        this.m_coreV2 = b;
        this.m_cornerDir2 = c;
        this.m_cornerConvex2 = d
    };
    g.b2MassData = function() {
        this.mass = 0;
        this.center = new v(0, 0);
        this.I = 0
    };
    Box2D.inherit(c, Box2D.Collision.Shapes.b2Shape);
    c.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    c.b2PolygonShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
    };
    c.prototype.Copy = function() {
        var a =
            new c;
        a.Set(this);
        return a
    };
    c.prototype.Set = function(a) {
        this.__super.Set.call(this, a);
        if (Box2D.is(a, c)) {
            a = a instanceof c ? a : null;
            this.m_centroid.SetV(a.m_centroid);
            this.m_vertexCount = a.m_vertexCount;
            this.Reserve(this.m_vertexCount);
            for (var b = 0; b < this.m_vertexCount; b++) this.m_vertices[b].SetV(a.m_vertices[b]), this.m_normals[b].SetV(a.m_normals[b])
        }
    };
    c.prototype.SetAsArray = function(a, b) {
        void 0 === b && (b = 0);
        for (var c = new Vector, d = 0, g, d = 0; d < a.length; ++d) g = a[d], c.push(g);
        this.SetAsVector(c, b)
    };
    c.AsArray =
        function(a, b) {
            void 0 === b && (b = 0);
            var d = new c;
            d.SetAsArray(a, b);
            return d
        };
    c.prototype.SetAsVector = function(a, d) {
        void 0 === d && (d = 0);
        0 == d && (d = a.length);
        b.b2Assert(2 <= d);
        this.m_vertexCount = d;
        this.Reserve(d);
        for (var g = 0, g = 0; g < this.m_vertexCount; g++) this.m_vertices[g].SetV(a[g]);
        for (g = 0; g < this.m_vertexCount; ++g) {
            var h = parseInt(g),
                k = parseInt(g + 1 < this.m_vertexCount ? g + 1 : 0),
                h = m.SubtractVV(this.m_vertices[k], this.m_vertices[h]);
            b.b2Assert(h.LengthSquared() > Number.MIN_VALUE);
            this.m_normals[g].SetV(m.CrossVF(h,
                1));
            this.m_normals[g].Normalize()
        }
        this.m_centroid = c.ComputeCentroid(this.m_vertices, this.m_vertexCount)
    };
    c.AsVector = function(a, b) {
        void 0 === b && (b = 0);
        var d = new c;
        d.SetAsVector(a, b);
        return d
    };
    c.prototype.SetAsBox = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -b);
        this.m_vertices[1].Set(a, -b);
        this.m_vertices[2].Set(a, b);
        this.m_vertices[3].Set(-a, b);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1,
            0);
        this.m_centroid.SetZero()
    };
    c.AsBox = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        var d = new c;
        d.SetAsBox(a, b);
        return d
    };
    c.prototype.SetAsOrientedBox = function(a, b, c, d) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = null);
        void 0 === d && (d = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -b);
        this.m_vertices[1].Set(a, -b);
        this.m_vertices[2].Set(a, b);
        this.m_vertices[3].Set(-a, b);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1,
            0);
        this.m_centroid = c;
        a = new A;
        a.position = c;
        a.R.Set(d);
        for (c = 0; c < this.m_vertexCount; ++c) this.m_vertices[c] = m.MulX(a, this.m_vertices[c]), this.m_normals[c] = m.MulMV(a.R, this.m_normals[c])
    };
    c.AsOrientedBox = function(a, b, d, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === d && (d = null);
        void 0 === g && (g = 0);
        var m = new c;
        m.SetAsOrientedBox(a, b, d, g);
        return m
    };
    c.prototype.SetAsEdge = function(a, b) {
        this.m_vertexCount = 2;
        this.Reserve(2);
        this.m_vertices[0].SetV(a);
        this.m_vertices[1].SetV(b);
        this.m_centroid.x = .5 * (a.x + b.x);
        this.m_centroid.y = .5 * (a.y + b.y);
        this.m_normals[0] = m.CrossVF(m.SubtractVV(b, a), 1);
        this.m_normals[0].Normalize();
        this.m_normals[1].x = -this.m_normals[0].x;
        this.m_normals[1].y = -this.m_normals[0].y
    };
    c.AsEdge = function(a, b) {
        var d = new c;
        d.SetAsEdge(a, b);
        return d
    };
    c.prototype.TestPoint = function(a, b) {
        var c;
        c = a.R;
        for (var d = b.x - a.position.x, g = b.y - a.position.y, m = d * c.col1.x + g * c.col1.y, h = d * c.col2.x + g * c.col2.y, k = 0; k < this.m_vertexCount; ++k)
            if (c = this.m_vertices[k], d = m - c.x, g = h - c.y, c = this.m_normals[k], 0 < c.x * d + c.y * g) return !1;
        return !0
    };
    c.prototype.RayCast = function(a, b, c) {
        var d = 0,
            g = b.maxFraction,
            m = 0,
            h = 0,
            k, p, m = b.p1.x - c.position.x,
            h = b.p1.y - c.position.y;
        k = c.R;
        var u = m * k.col1.x + h * k.col1.y,
            t = m * k.col2.x + h * k.col2.y,
            m = b.p2.x - c.position.x,
            h = b.p2.y - c.position.y;
        k = c.R;
        b = m * k.col1.x + h * k.col1.y - u;
        k = m * k.col2.x + h * k.col2.y - t;
        for (var x = -1, n = 0; n < this.m_vertexCount; ++n) {
            p = this.m_vertices[n];
            m = p.x - u;
            h = p.y - t;
            p = this.m_normals[n];
            m = p.x * m + p.y * h;
            h = p.x * b + p.y * k;
            if (0 == h) {
                if (0 > m) return !1
            } else 0 > h && m < d * h ? (d = m / h, x = n) : 0 < h && m < g * h && (g = m / h); if (g < d - Number.MIN_VALUE) return !1
        }
        return 0 <=
            x ? (a.fraction = d, k = c.R, p = this.m_normals[x], a.normal.x = k.col1.x * p.x + k.col2.x * p.y, a.normal.y = k.col1.y * p.x + k.col2.y * p.y, !0) : !1
    };
    c.prototype.ComputeAABB = function(a, b) {
        for (var c = b.R, d = this.m_vertices[0], g = b.position.x + (c.col1.x * d.x + c.col2.x * d.y), m = b.position.y + (c.col1.y * d.x + c.col2.y * d.y), h = g, k = m, p = 1; p < this.m_vertexCount; ++p) var d = this.m_vertices[p],
            u = b.position.x + (c.col1.x * d.x + c.col2.x * d.y),
            d = b.position.y + (c.col1.y * d.x + c.col2.y * d.y),
            g = g < u ? g : u,
            m = m < d ? m : d,
            h = h > u ? h : u,
            k = k > d ? k : d;
        a.lowerBound.x = g - this.m_radius;
        a.lowerBound.y = m - this.m_radius;
        a.upperBound.x = h + this.m_radius;
        a.upperBound.y = k + this.m_radius
    };
    c.prototype.ComputeMass = function(a, b) {
        void 0 === b && (b = 0);
        if (2 == this.m_vertexCount) a.center.x = .5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = .5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0;
        else {
            for (var c = 0, d = 0, g = 0, m = 0, h = 1 / 3, k = 0; k < this.m_vertexCount; ++k) var p = this.m_vertices[k],
                u = k + 1 < this.m_vertexCount ? this.m_vertices[parseInt(k + 1)] : this.m_vertices[0],
                t = p.x - 0,
                x = p.y - 0,
                n = u.x - 0,
                q = u.y - 0,
                B = t * q - x * n,
                r = .5 * B,
                g = g + r,
                c = c + r * h * (0 + p.x + u.x),
                d = d + r * h * (0 + p.y + u.y),
                p = t,
                m = m + B * (h * (.25 * (p * p + n * p + n * n) + (0 * p + 0 * n)) + 0 + (h * (.25 * (x * x + q * x + q * q) + (0 * x + 0 * q)) + 0));
            a.mass = b * g;
            a.center.Set(1 / g * c, 1 / g * d);
            a.I = b * m
        }
    };
    c.prototype.ComputeSubmergedArea = function(a, b, c, d) {
        void 0 === b && (b = 0);
        var h = m.MulTMV(c.R, a),
            k = b - m.Dot(a, c.position),
            p = new Vector_a2j_Number,
            u = 0,
            t = -1;
        b = -1;
        var x = !1;
        for (a = a = 0; a < this.m_vertexCount; ++a) {
            p[a] = m.Dot(h, this.m_vertices[a]) - k;
            var A = p[a] < -Number.MIN_VALUE;
            0 < a && (A ? x || (t = a - 1, u++) : x && (b = a - 1, u++));
            x = A
        }
        switch (u) {
            case 0:
                return x ?
                    (a = new g, this.ComputeMass(a, 1), d.SetV(m.MulX(c, a.center)), a.mass) : 0;
            case 1:
                -1 == t ? t = this.m_vertexCount - 1 : b = this.m_vertexCount - 1
        }
        a = parseInt((t + 1) % this.m_vertexCount);
        h = parseInt((b + 1) % this.m_vertexCount);
        k = (0 - p[t]) / (p[a] - p[t]);
        p = (0 - p[b]) / (p[h] - p[b]);
        t = new v(this.m_vertices[t].x * (1 - k) + this.m_vertices[a].x * k, this.m_vertices[t].y * (1 - k) + this.m_vertices[a].y * k);
        b = new v(this.m_vertices[b].x * (1 - p) + this.m_vertices[h].x * p, this.m_vertices[b].y * (1 - p) + this.m_vertices[h].y * p);
        p = 0;
        k = new v;
        for (u = this.m_vertices[a]; a !=
            h;) a = (a + 1) % this.m_vertexCount, x = a == h ? b : this.m_vertices[a], A = .5 * ((u.x - t.x) * (x.y - t.y) - (u.y - t.y) * (x.x - t.x)), p += A, k.x += A * (t.x + u.x + x.x) / 3, k.y += A * (t.y + u.y + x.y) / 3, u = x;
        k.Multiply(1 / p);
        d.SetV(m.MulX(c, k));
        return p
    };
    c.prototype.GetVertexCount = function() {
        return this.m_vertexCount
    };
    c.prototype.GetVertices = function() {
        return this.m_vertices
    };
    c.prototype.GetNormals = function() {
        return this.m_normals
    };
    c.prototype.GetSupport = function(a) {
        for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, d = 1; d < this.m_vertexCount; ++d) {
            var g =
                this.m_vertices[d].x * a.x + this.m_vertices[d].y * a.y;
            g > c && (b = d, c = g)
        }
        return b
    };
    c.prototype.GetSupportVertex = function(a) {
        for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, d = 1; d < this.m_vertexCount; ++d) {
            var g = this.m_vertices[d].x * a.x + this.m_vertices[d].y * a.y;
            g > c && (b = d, c = g)
        }
        return this.m_vertices[b]
    };
    c.prototype.Validate = function() {
        return !1
    };
    c.prototype.b2PolygonShape = function() {
        this.__super.b2Shape.call(this);
        this.m_type = p.e_polygonShape;
        this.m_centroid = new v;
        this.m_vertices = new Vector;
        this.m_normals =
            new Vector
    };
    c.prototype.Reserve = function(a) {
        void 0 === a && (a = 0);
        for (var b = parseInt(this.m_vertices.length); b < a; b++) this.m_vertices[b] = new v, this.m_normals[b] = new v
    };
    c.ComputeCentroid = function(a, b) {
        void 0 === b && (b = 0);
        for (var c = new v, d = 0, g = 1 / 3, m = 0; m < b; ++m) {
            var h = a[m],
                k = m + 1 < b ? a[parseInt(m + 1)] : a[0],
                p = .5 * ((h.x - 0) * (k.y - 0) - (h.y - 0) * (k.x - 0)),
                d = d + p;
            c.x += p * g * (0 + h.x + k.x);
            c.y += p * g * (0 + h.y + k.y)
        }
        c.x *= 1 / d;
        c.y *= 1 / d;
        return c
    };
    c.ComputeOBB = function(a, b, c) {
        void 0 === c && (c = 0);
        for (var d = 0, g = new Vector(c + 1), d = 0; d < c; ++d) g[d] =
            b[d];
        g[c] = g[0];
        b = Number.MAX_VALUE;
        for (d = 1; d <= c; ++d) {
            for (var m = g[parseInt(d - 1)], h = g[d].x - m.x, k = g[d].y - m.y, p = Math.sqrt(h * h + k * k), h = h / p, k = k / p, u = -k, t = h, x = p = Number.MAX_VALUE, n = -Number.MAX_VALUE, q = -Number.MAX_VALUE, B = 0; B < c; ++B) {
                var r = g[B].x - m.x,
                    I = g[B].y - m.y,
                    Q = h * r + k * I,
                    r = u * r + t * I;
                Q < p && (p = Q);
                r < x && (x = r);
                Q > n && (n = Q);
                r > q && (q = r)
            }
            B = (n - p) * (q - x);
            B < .95 * b && (b = B, a.R.col1.x = h, a.R.col1.y = k, a.R.col2.x = u, a.R.col2.y = t, h = .5 * (p + n), k = .5 * (x + q), u = a.R, a.center.x = m.x + (u.col1.x * h + u.col2.x * k), a.center.y = m.y + (u.col1.y * h + u.col2.y * k),
                a.extents.x = .5 * (n - p), a.extents.y = .5 * (q - x))
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2PolygonShape.s_mat = new a
    });
    p.b2Shape = function() {};
    p.prototype.Copy = function() {
        return null
    };
    p.prototype.Set = function(a) {
        this.m_radius = a.m_radius
    };
    p.prototype.GetType = function() {
        return this.m_type
    };
    p.prototype.TestPoint = function(a, b) {
        return !1
    };
    p.prototype.RayCast = function(a, b, c) {
        return !1
    };
    p.prototype.ComputeAABB = function(a, b) {};
    p.prototype.ComputeMass = function(a, b) {};
    p.prototype.ComputeSubmergedArea =
        function(a, b, c, d) {
            return 0
        };
    p.TestOverlap = function(a, b, c, d) {
        var g = new x;
        g.proxyA = new E;
        g.proxyA.Set(a);
        g.proxyB = new E;
        g.proxyB.Set(c);
        g.transformA = b;
        g.transformB = d;
        g.useRadii = !0;
        a = new z;
        a.count = 0;
        b = new u;
        t.Distance(b, a, g);
        return b.distance < 10 * Number.MIN_VALUE
    };
    p.prototype.b2Shape = function() {
        this.m_type = p.e_unknownShape;
        this.m_radius = b.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
        Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
        Box2D.Collision.Shapes.b2Shape.e_polygonShape =
            1;
        Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
        Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
        Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
        Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
        Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1
    })
})();
(function() {
    var b = Box2D.Common.b2Color,
        k = Box2D.Common.b2Settings,
        h = Box2D.Common.Math.b2Math;
    b.b2Color = function() {
        this._b = this._g = this._r = 0
    };
    b.prototype.b2Color = function(b, g, c) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        void 0 === c && (c = 0);
        this._r = Box2D.parseUInt(255 * h.Clamp(b, 0, 1));
        this._g = Box2D.parseUInt(255 * h.Clamp(g, 0, 1));
        this._b = Box2D.parseUInt(255 * h.Clamp(c, 0, 1))
    };
    b.prototype.Set = function(b, g, c) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        void 0 === c && (c = 0);
        this._r = Box2D.parseUInt(255 * h.Clamp(b, 0, 1));
        this._g =
            Box2D.parseUInt(255 * h.Clamp(g, 0, 1));
        this._b = Box2D.parseUInt(255 * h.Clamp(c, 0, 1))
    };
    Object.defineProperty(b.prototype, "r", {
        enumerable: !1,
        configurable: !0,
        set: function(b) {
            void 0 === b && (b = 0);
            this._r = Box2D.parseUInt(255 * h.Clamp(b, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "g", {
        enumerable: !1,
        configurable: !0,
        set: function(b) {
            void 0 === b && (b = 0);
            this._g = Box2D.parseUInt(255 * h.Clamp(b, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "b", {
        enumerable: !1,
        configurable: !0,
        set: function(b) {
            void 0 === b && (b = 0);
            this._b = Box2D.parseUInt(255 *
                h.Clamp(b, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "color", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._r << 16 | this._g << 8 | this._b
        }
    });
    k.b2Settings = function() {};
    k.b2MixFriction = function(b, g) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        return Math.sqrt(b * g)
    };
    k.b2MixRestitution = function(b, g) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        return b > g ? b : g
    };
    k.b2Assert = function(b) {
        if (!b) throw "Assertion Failed";
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.b2Settings.VERSION = "2.1alpha";
        Box2D.Common.b2Settings.USHRT_MAX =
            65535;
        Box2D.Common.b2Settings.b2_pi = Math.PI;
        Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
        Box2D.Common.b2Settings.b2_aabbExtension = .1;
        Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
        Box2D.Common.b2Settings.b2_polygonRadius = 2 * k.b2_linearSlop;
        Box2D.Common.b2Settings.b2_linearSlop = .005;
        Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * k.b2_pi;
        Box2D.Common.b2Settings.b2_toiSlop = 8 * k.b2_linearSlop;
        Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
        Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
        Box2D.Common.b2Settings.b2_velocityThreshold =
            1;
        Box2D.Common.b2Settings.b2_maxLinearCorrection = .2;
        Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * k.b2_pi;
        Box2D.Common.b2Settings.b2_maxTranslation = 2;
        Box2D.Common.b2Settings.b2_maxTranslationSquared = k.b2_maxTranslation * k.b2_maxTranslation;
        Box2D.Common.b2Settings.b2_maxRotation = .5 * k.b2_pi;
        Box2D.Common.b2Settings.b2_maxRotationSquared = k.b2_maxRotation * k.b2_maxRotation;
        Box2D.Common.b2Settings.b2_contactBaumgarte = .2;
        Box2D.Common.b2Settings.b2_timeToSleep = .5;
        Box2D.Common.b2Settings.b2_linearSleepTolerance =
            .01;
        Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * k.b2_pi
    })
})();
(function() {
    var b = Box2D.Common.Math.b2Mat22,
        k = Box2D.Common.Math.b2Mat33,
        h = Box2D.Common.Math.b2Math,
        d = Box2D.Common.Math.b2Sweep,
        g = Box2D.Common.Math.b2Transform,
        c = Box2D.Common.Math.b2Vec2,
        p = Box2D.Common.Math.b2Vec3;
    b.b2Mat22 = function() {
        this.col1 = new c;
        this.col2 = new c
    };
    b.prototype.b2Mat22 = function() {
        this.SetIdentity()
    };
    b.FromAngle = function(a) {
        void 0 === a && (a = 0);
        var c = new b;
        c.Set(a);
        return c
    };
    b.FromVV = function(a, c) {
        var d = new b;
        d.SetVV(a, c);
        return d
    };
    b.prototype.Set = function(a) {
        void 0 === a && (a = 0);
        var b =
            Math.cos(a);
        a = Math.sin(a);
        this.col1.x = b;
        this.col2.x = -a;
        this.col1.y = a;
        this.col2.y = b
    };
    b.prototype.SetVV = function(a, b) {
        this.col1.SetV(a);
        this.col2.SetV(b)
    };
    b.prototype.Copy = function() {
        var a = new b;
        a.SetM(this);
        return a
    };
    b.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2)
    };
    b.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y
    };
    b.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 1
    };
    b.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 0
    };
    b.prototype.GetAngle = function() {
        return Math.atan2(this.col1.y, this.col1.x)
    };
    b.prototype.GetInverse = function(a) {
        var b = this.col1.x,
            c = this.col2.x,
            d = this.col1.y,
            g = this.col2.y,
            h = b * g - c * d;
        0 != h && (h = 1 / h);
        a.col1.x = h * g;
        a.col2.x = -h * c;
        a.col1.y = -h * d;
        a.col2.y = h * b;
        return a
    };
    b.prototype.Solve = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var d = this.col1.x,
            g = this.col2.x,
            h = this.col1.y,
            k = this.col2.y,
            p = d * k - g * h;
        0 != p && (p = 1 / p);
        a.x = p * (k * b - g * c);
        a.y = p * (d * c - h * b);
        return a
    };
    b.prototype.Abs = function() {
        this.col1.Abs();
        this.col2.Abs()
    };
    k.b2Mat33 = function() {
        this.col1 = new p;
        this.col2 = new p;
        this.col3 = new p
    };
    k.prototype.b2Mat33 = function(a, b, c) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        void 0 === c && (c = null);
        a || b || c ? (this.col1.SetV(a), this.col2.SetV(b), this.col3.SetV(c)) : (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero())
    };
    k.prototype.SetVVV = function(a, b, c) {
        this.col1.SetV(a);
        this.col2.SetV(b);
        this.col3.SetV(c)
    };
    k.prototype.Copy =
        function() {
            return new k(this.col1, this.col2, this.col3)
        };
    k.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2);
        this.col3.SetV(a.col3)
    };
    k.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col1.z += a.col1.z;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y;
        this.col2.z += a.col2.z;
        this.col3.x += a.col3.x;
        this.col3.y += a.col3.y;
        this.col3.z += a.col3.z
    };
    k.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 1;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 1
    };
    k.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 0;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 0
    };
    k.prototype.Solve22 = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var d = this.col1.x,
            g = this.col2.x,
            h = this.col1.y,
            k = this.col2.y,
            p = d * k - g * h;
        0 != p && (p = 1 / p);
        a.x = p * (k * b - g * c);
        a.y = p * (d * c - h * b);
        return a
    };
    k.prototype.Solve33 = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        void 0 === d && (d = 0);
        var g = this.col1.x,
            h = this.col1.y,
            k = this.col1.z,
            p = this.col2.x,
            z = this.col2.y,
            e = this.col2.z,
            y = this.col3.x,
            w = this.col3.y,
            H = this.col3.z,
            D = g * (z * H - e * w) + h * (e * y - p * H) + k * (p * w - z * y);
        0 != D && (D = 1 / D);
        a.x = D * (b * (z * H - e * w) + c * (e * y - p * H) + d * (p * w - z * y));
        a.y = D * (g * (c * H - d * w) + h * (d * y - b * H) + k * (b * w - c * y));
        a.z = D * (g * (z * d - e * c) + h * (e * b - p * d) + k * (p * c - z * b));
        return a
    };
    h.b2Math = function() {};
    h.IsValid = function(a) {
        void 0 === a && (a = 0);
        return isFinite(a)
    };
    h.Dot = function(a, b) {
        return a.x * b.x + a.y * b.y
    };
    h.CrossVV = function(a, b) {
        return a.x * b.y - a.y * b.x
    };
    h.CrossVF = function(a,
        b) {
        void 0 === b && (b = 0);
        return new c(b * a.y, -b * a.x)
    };
    h.CrossFV = function(a, b) {
        void 0 === a && (a = 0);
        return new c(-a * b.y, a * b.x)
    };
    h.MulMV = function(a, b) {
        return new c(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
    };
    h.MulTMV = function(a, b) {
        return new c(h.Dot(b, a.col1), h.Dot(b, a.col2))
    };
    h.MulX = function(a, b) {
        var c = h.MulMV(a.R, b);
        c.x += a.position.x;
        c.y += a.position.y;
        return c
    };
    h.MulXT = function(a, b) {
        var c = h.SubtractVV(b, a.position),
            d = c.x * a.R.col1.x + c.y * a.R.col1.y;
        c.y = c.x * a.R.col2.x + c.y * a.R.col2.y;
        c.x = d;
        return c
    };
    h.AddVV = function(a, b) {
        return new c(a.x + b.x, a.y + b.y)
    };
    h.SubtractVV = function(a, b) {
        return new c(a.x - b.x, a.y - b.y)
    };
    h.Distance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return Math.sqrt(c * c + d * d)
    };
    h.DistanceSquared = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return c * c + d * d
    };
    h.MulFV = function(a, b) {
        void 0 === a && (a = 0);
        return new c(a * b.x, a * b.y)
    };
    h.AddMM = function(a, c) {
        return b.FromVV(h.AddVV(a.col1, c.col1), h.AddVV(a.col2, c.col2))
    };
    h.MulMM = function(a, c) {
        return b.FromVV(h.MulMV(a, c.col1), h.MulMV(a, c.col2))
    };
    h.MulTMM = function(a,
        d) {
        var g = new c(h.Dot(a.col1, d.col1), h.Dot(a.col2, d.col1)),
            k = new c(h.Dot(a.col1, d.col2), h.Dot(a.col2, d.col2));
        return b.FromVV(g, k)
    };
    h.Abs = function(a) {
        void 0 === a && (a = 0);
        return 0 < a ? a : -a
    };
    h.AbsV = function(a) {
        return new c(h.Abs(a.x), h.Abs(a.y))
    };
    h.AbsM = function(a) {
        return b.FromVV(h.AbsV(a.col1), h.AbsV(a.col2))
    };
    h.Min = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a < b ? a : b
    };
    h.MinV = function(a, b) {
        return new c(h.Min(a.x, b.x), h.Min(a.y, b.y))
    };
    h.Max = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a > b ? a : b
    };
    h.MaxV = function(a, b) {
        return new c(h.Max(a.x, b.x), h.Max(a.y, b.y))
    };
    h.Clamp = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        return a < b ? b : a > c ? c : a
    };
    h.ClampV = function(a, b, c) {
        return h.MaxV(b, h.MinV(a, c))
    };
    h.Swap = function(a, b) {
        var c = a[0];
        a[0] = b[0];
        b[0] = c
    };
    h.Random = function() {
        return 2 * Math.random() - 1
    };
    h.RandomRange = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return (b - a) * Math.random() + a
    };
    h.NextPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        a |= a >> 1 & 2147483647;
        a |= a >> 2 & 1073741823;
        a |= a >> 4 & 268435455;
        a |= a >> 8 & 16777215;
        return (a | a >> 16 & 65535) + 1
    };
    h.IsPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        return 0 < a && 0 == (a & a - 1)
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.Math.b2Math.b2Vec2_zero = new c(0, 0);
        Box2D.Common.Math.b2Math.b2Mat22_identity = b.FromVV(new c(1, 0), new c(0, 1));
        Box2D.Common.Math.b2Math.b2Transform_identity = new g(h.b2Vec2_zero, h.b2Mat22_identity)
    });
    d.b2Sweep = function() {
        this.localCenter = new c;
        this.c0 = new c;
        this.c = new c
    };
    d.prototype.Set = function(a) {
        this.localCenter.SetV(a.localCenter);
        this.c0.SetV(a.c0);
        this.c.SetV(a.c);
        this.a0 = a.a0;
        this.a = a.a;
        this.t0 = a.t0
    };
    d.prototype.Copy = function() {
        var a = new d;
        a.localCenter.SetV(this.localCenter);
        a.c0.SetV(this.c0);
        a.c.SetV(this.c);
        a.a0 = this.a0;
        a.a = this.a;
        a.t0 = this.t0;
        return a
    };
    d.prototype.GetTransform = function(a, b) {
        void 0 === b && (b = 0);
        a.position.x = (1 - b) * this.c0.x + b * this.c.x;
        a.position.y = (1 - b) * this.c0.y + b * this.c.y;
        a.R.Set((1 - b) * this.a0 + b * this.a);
        var c = a.R;
        a.position.x -= c.col1.x * this.localCenter.x + c.col2.x * this.localCenter.y;
        a.position.y -= c.col1.y *
            this.localCenter.x + c.col2.y * this.localCenter.y
    };
    d.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        if (this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
            var b = (a - this.t0) / (1 - this.t0);
            this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
            this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
            this.a0 = (1 - b) * this.a0 + b * this.a;
            this.t0 = a
        }
    };
    g.b2Transform = function() {
        this.position = new c;
        this.R = new b
    };
    g.prototype.b2Transform = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        a && (this.position.SetV(a), this.R.SetM(b))
    };
    g.prototype.Initialize = function(a,
        b) {
        this.position.SetV(a);
        this.R.SetM(b)
    };
    g.prototype.SetIdentity = function() {
        this.position.SetZero();
        this.R.SetIdentity()
    };
    g.prototype.Set = function(a) {
        this.position.SetV(a.position);
        this.R.SetM(a.R)
    };
    g.prototype.GetAngle = function() {
        return Math.atan2(this.R.col1.y, this.R.col1.x)
    };
    c.b2Vec2 = function() {};
    c.prototype.b2Vec2 = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    c.prototype.SetZero = function() {
        this.y = this.x = 0
    };
    c.prototype.Set = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    c.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y
    };
    c.prototype.GetNegative = function() {
        return new c(-this.x, -this.y)
    };
    c.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y
    };
    c.Make = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return new c(a, b)
    };
    c.prototype.Copy = function() {
        return new c(this.x, this.y)
    };
    c.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y
    };
    c.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y
    };
    c.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *=
            a;
        this.y *= a
    };
    c.prototype.MulM = function(a) {
        var b = this.x;
        this.x = a.col1.x * b + a.col2.x * this.y;
        this.y = a.col1.y * b + a.col2.y * this.y
    };
    c.prototype.MulTM = function(a) {
        var b = h.Dot(this, a.col1);
        this.y = h.Dot(this, a.col2);
        this.x = b
    };
    c.prototype.CrossVF = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = a * this.y;
        this.y = -a * b
    };
    c.prototype.CrossFV = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = -a * this.y;
        this.y = a * b
    };
    c.prototype.MinV = function(a) {
        this.x = this.x < a.x ? this.x : a.x;
        this.y = this.y < a.y ? this.y : a.y
    };
    c.prototype.MaxV =
        function(a) {
            this.x = this.x > a.x ? this.x : a.x;
            this.y = this.y > a.y ? this.y : a.y
        };
    c.prototype.Abs = function() {
        0 > this.x && (this.x = -this.x);
        0 > this.y && (this.y = -this.y)
    };
    c.prototype.Length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    c.prototype.LengthSquared = function() {
        return this.x * this.x + this.y * this.y
    };
    c.prototype.Normalize = function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y);
        if (a < Number.MIN_VALUE) return 0;
        var b = 1 / a;
        this.x *= b;
        this.y *= b;
        return a
    };
    c.prototype.IsValid = function() {
        return h.IsValid(this.x) &&
            h.IsValid(this.y)
    };
    p.b2Vec3 = function() {};
    p.prototype.b2Vec3 = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    p.prototype.SetZero = function() {
        this.x = this.y = this.z = 0
    };
    p.prototype.Set = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    p.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z
    };
    p.prototype.GetNegative = function() {
        return new p(-this.x, -this.y, -this.z)
    };
    p.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z
    };
    p.prototype.Copy = function() {
        return new p(this.x, this.y, this.z)
    };
    p.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z
    };
    p.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z
    };
    p.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *= a;
        this.y *= a;
        this.z *= a
    }
})();
(function() {
    var b = Box2D.Common.Math.b2Math,
        k = Box2D.Common.Math.b2Sweep,
        h = Box2D.Common.Math.b2Transform,
        d = Box2D.Common.Math.b2Vec2,
        g = Box2D.Common.b2Color,
        c = Box2D.Common.b2Settings,
        p = Box2D.Collision.b2AABB,
        a = Box2D.Collision.b2ContactPoint,
        m = Box2D.Collision.b2DynamicTreeBroadPhase,
        A = Box2D.Collision.b2RayCastInput,
        v = Box2D.Collision.b2RayCastOutput,
        t = Box2D.Collision.Shapes.b2CircleShape,
        x = Box2D.Collision.Shapes.b2EdgeShape,
        u = Box2D.Collision.Shapes.b2MassData,
        E = Box2D.Collision.Shapes.b2PolygonShape,
        z = Box2D.Collision.Shapes.b2Shape,
        e = Box2D.Dynamics.b2Body,
        y = Box2D.Dynamics.b2BodyDef,
        w = Box2D.Dynamics.b2ContactFilter,
        H = Box2D.Dynamics.b2ContactImpulse,
        D = Box2D.Dynamics.b2ContactListener,
        N = Box2D.Dynamics.b2ContactManager,
        F = Box2D.Dynamics.b2DebugDraw,
        P = Box2D.Dynamics.b2DestructionListener,
        K = Box2D.Dynamics.b2FilterData,
        M = Box2D.Dynamics.b2Fixture,
        J = Box2D.Dynamics.b2FixtureDef,
        L = Box2D.Dynamics.b2Island,
        n = Box2D.Dynamics.b2TimeStep,
        q = Box2D.Dynamics.b2World,
        B = Box2D.Dynamics.Contacts.b2Contact,
        r = Box2D.Dynamics.Contacts.b2ContactFactory,
        I =
        Box2D.Dynamics.Contacts.b2ContactSolver,
        Q = Box2D.Dynamics.Joints.b2Joint,
        G = Box2D.Dynamics.Joints.b2PulleyJoint;
    e.b2Body = function() {
        this.m_xf = new h;
        this.m_sweep = new k;
        this.m_linearVelocity = new d;
        this.m_force = new d
    };
    e.prototype.connectEdges = function(f, a, n) {
        void 0 === n && (n = 0);
        var r = Math.atan2(a.GetDirectionVector().y, a.GetDirectionVector().x);
        n = b.MulFV(Math.tan(.5 * (r - n)), a.GetDirectionVector());
        n = b.SubtractVV(n, a.GetNormalVector());
        n = b.MulFV(c.b2_toiSlop, n);
        n = b.AddVV(n, a.GetVertex1());
        var q = b.AddVV(f.GetDirectionVector(),
            a.GetDirectionVector());
        q.Normalize();
        var d = 0 < b.Dot(f.GetDirectionVector(), a.GetNormalVector());
        f.SetNextEdge(a, n, q, d);
        a.SetPrevEdge(f, n, q, d);
        return r
    };
    e.prototype.CreateFixture = function(f) {
        if (1 == this.m_world.IsLocked()) return null;
        var a = new M;
        a.Create(this, this.m_xf, f);
        this.m_flags & e.e_activeFlag && a.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
        a.m_next = this.m_fixtureList;
        this.m_fixtureList = a;
        ++this.m_fixtureCount;
        a.m_body = this;
        0 < a.m_density && this.ResetMassData();
        this.m_world.m_flags |=
            q.e_newFixture;
        return a
    };
    e.prototype.CreateFixture2 = function(f, a) {
        void 0 === a && (a = 0);
        var b = new J;
        b.shape = f;
        b.density = a;
        return this.CreateFixture(b)
    };
    e.prototype.DestroyFixture = function(f) {
        if (1 != this.m_world.IsLocked()) {
            for (var a = this.m_fixtureList, b = null; null != a;) {
                if (a == f) {
                    b ? b.m_next = f.m_next : this.m_fixtureList = f.m_next;
                    break
                }
                b = a;
                a = a.m_next
            }
            for (a = this.m_contactList; a;) {
                var b = a.contact,
                    a = a.next,
                    c = b.GetFixtureA(),
                    n = b.GetFixtureB();
                f != c && f != n || this.m_world.m_contactManager.Destroy(b)
            }
            this.m_flags & e.e_activeFlag &&
                f.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
            f.Destroy();
            f.m_body = null;
            f.m_next = null;
            --this.m_fixtureCount;
            this.ResetMassData()
        }
    };
    e.prototype.SetPositionAndAngle = function(f, a) {
        void 0 === a && (a = 0);
        var b;
        if (1 != this.m_world.IsLocked()) {
            this.m_xf.R.Set(a);
            this.m_xf.position.SetV(f);
            b = this.m_xf.R;
            var c = this.m_sweep.localCenter;
            this.m_sweep.c.x = b.col1.x * c.x + b.col2.x * c.y;
            this.m_sweep.c.y = b.col1.y * c.x + b.col2.y * c.y;
            this.m_sweep.c.x += this.m_xf.position.x;
            this.m_sweep.c.y += this.m_xf.position.y;
            this.m_sweep.c0.SetV(this.m_sweep.c);
            this.m_sweep.a0 = this.m_sweep.a = a;
            c = this.m_world.m_contactManager.m_broadPhase;
            for (b = this.m_fixtureList; b; b = b.m_next) b.Synchronize(c, this.m_xf, this.m_xf);
            this.m_world.m_contactManager.FindNewContacts()
        }
    };
    e.prototype.SetTransform = function(f) {
        this.SetPositionAndAngle(f.position, f.GetAngle())
    };
    e.prototype.GetTransform = function() {
        return this.m_xf
    };
    e.prototype.GetPosition = function() {
        return this.m_xf.position
    };
    e.prototype.SetPosition = function(f) {
        this.SetPositionAndAngle(f, this.GetAngle())
    };
    e.prototype.GetAngle =
        function() {
            return this.m_sweep.a
        };
    e.prototype.SetAngle = function(f) {
        void 0 === f && (f = 0);
        this.SetPositionAndAngle(this.GetPosition(), f)
    };
    e.prototype.GetWorldCenter = function() {
        return this.m_sweep.c
    };
    e.prototype.GetLocalCenter = function() {
        return this.m_sweep.localCenter
    };
    e.prototype.SetLinearVelocity = function(f) {
        this.m_type != e.b2_staticBody && this.m_linearVelocity.SetV(f)
    };
    e.prototype.GetLinearVelocity = function() {
        return this.m_linearVelocity
    };
    e.prototype.SetAngularVelocity = function(f) {
        void 0 === f && (f = 0);
        this.m_type !=
            e.b2_staticBody && (this.m_angularVelocity = f)
    };
    e.prototype.GetAngularVelocity = function() {
        return this.m_angularVelocity
    };
    e.prototype.GetDefinition = function() {
        var f = new y;
        f.type = this.GetType();
        f.allowSleep = (this.m_flags & e.e_allowSleepFlag) == e.e_allowSleepFlag;
        f.angle = this.GetAngle();
        f.angularDamping = this.m_angularDamping;
        f.angularVelocity = this.m_angularVelocity;
        f.fixedRotation = (this.m_flags & e.e_fixedRotationFlag) == e.e_fixedRotationFlag;
        f.bullet = (this.m_flags & e.e_bulletFlag) == e.e_bulletFlag;
        f.awake = (this.m_flags &
            e.e_awakeFlag) == e.e_awakeFlag;
        f.linearDamping = this.m_linearDamping;
        f.linearVelocity.SetV(this.GetLinearVelocity());
        f.position = this.GetPosition();
        f.userData = this.GetUserData();
        return f
    };
    e.prototype.ApplyForce = function(f, a) {
        this.m_type == e.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_force.x += f.x, this.m_force.y += f.y, this.m_torque += (a.x - this.m_sweep.c.x) * f.y - (a.y - this.m_sweep.c.y) * f.x)
    };
    e.prototype.ApplyTorque = function(f) {
        void 0 === f && (f = 0);
        this.m_type == e.b2_dynamicBody && (0 == this.IsAwake() &&
            this.SetAwake(!0), this.m_torque += f)
    };
    e.prototype.ApplyImpulse = function(f, a) {
        this.m_type == e.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * f.x, this.m_linearVelocity.y += this.m_invMass * f.y, this.m_angularVelocity += this.m_invI * ((a.x - this.m_sweep.c.x) * f.y - (a.y - this.m_sweep.c.y) * f.x))
    };
    e.prototype.Split = function(f) {
        for (var a = this.GetLinearVelocity().Copy(), c = this.GetAngularVelocity(), n = this.GetWorldCenter(), r = this.m_world.CreateBody(this.GetDefinition()), q,
            d = this.m_fixtureList; d;)
            if (f(d)) {
                var e = d.m_next;
                q ? q.m_next = e : this.m_fixtureList = e;
                this.m_fixtureCount--;
                d.m_next = r.m_fixtureList;
                r.m_fixtureList = d;
                r.m_fixtureCount++;
                d.m_body = r;
                d = e
            } else q = d, d = d.m_next;
        this.ResetMassData();
        r.ResetMassData();
        q = this.GetWorldCenter();
        f = r.GetWorldCenter();
        q = b.AddVV(a, b.CrossFV(c, b.SubtractVV(q, n)));
        a = b.AddVV(a, b.CrossFV(c, b.SubtractVV(f, n)));
        this.SetLinearVelocity(q);
        r.SetLinearVelocity(a);
        this.SetAngularVelocity(c);
        r.SetAngularVelocity(c);
        this.SynchronizeFixtures();
        r.SynchronizeFixtures();
        return r
    };
    e.prototype.Merge = function(f) {
        var a;
        for (a = f.m_fixtureList; a;) {
            var b = a.m_next;
            f.m_fixtureCount--;
            a.m_next = this.m_fixtureList;
            this.m_fixtureList = a;
            this.m_fixtureCount++;
            a.m_body = n;
            a = b
        }
        c.m_fixtureCount = 0;
        var c = this,
            n = f;
        c.GetWorldCenter();
        n.GetWorldCenter();
        c.GetLinearVelocity().Copy();
        n.GetLinearVelocity().Copy();
        c.GetAngularVelocity();
        n.GetAngularVelocity();
        c.ResetMassData();
        this.SynchronizeFixtures()
    };
    e.prototype.GetMass = function() {
        return this.m_mass
    };
    e.prototype.GetInertia = function() {
        return this.m_I
    };
    e.prototype.GetMassData = function(a) {
        a.mass = this.m_mass;
        a.I = this.m_I;
        a.center.SetV(this.m_sweep.localCenter)
    };
    e.prototype.SetMassData = function(a) {
        c.b2Assert(0 == this.m_world.IsLocked());
        if (1 != this.m_world.IsLocked() && this.m_type == e.b2_dynamicBody) {
            this.m_invI = this.m_I = this.m_invMass = 0;
            this.m_mass = a.mass;
            0 >= this.m_mass && (this.m_mass = 1);
            this.m_invMass = 1 / this.m_mass;
            0 < a.I && 0 == (this.m_flags & e.e_fixedRotationFlag) && (this.m_I = a.I - this.m_mass * (a.center.x * a.center.x + a.center.y * a.center.y), this.m_invI = 1 / this.m_I);
            var l = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a.center);
            this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - l.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - l.x)
        }
    };
    e.prototype.ResetMassData = function() {
        this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
        this.m_sweep.localCenter.SetZero();
        if (this.m_type != e.b2_staticBody && this.m_type != e.b2_kinematicBody) {
            for (var a =
                d.Make(0, 0), l = this.m_fixtureList; l; l = l.m_next)
                if (0 != l.m_density) {
                    var n = l.GetMassData();
                    this.m_mass += n.mass;
                    a.x += n.center.x * n.mass;
                    a.y += n.center.y * n.mass;
                    this.m_I += n.I
                }
            0 < this.m_mass ? (this.m_invMass = 1 / this.m_mass, a.x *= this.m_invMass, a.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
            0 < this.m_I && 0 == (this.m_flags & e.e_fixedRotationFlag) ? (this.m_I -= this.m_mass * (a.x * a.x + a.y * a.y), this.m_I *= this.m_inertiaScale, c.b2Assert(0 < this.m_I), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
            l = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a);
            this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - l.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - l.x)
        }
    };
    e.prototype.GetWorldPoint = function(a) {
        var b = this.m_xf.R;
        a = new d(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return a
    };
    e.prototype.GetWorldVector = function(a) {
        return b.MulMV(this.m_xf.R, a)
    };
    e.prototype.GetLocalPoint =
        function(a) {
            return b.MulXT(this.m_xf, a)
        };
    e.prototype.GetLocalVector = function(a) {
        return b.MulTMV(this.m_xf.R, a)
    };
    e.prototype.GetLinearVelocityFromWorldPoint = function(a) {
        return new d(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    e.prototype.GetLinearVelocityFromLocalPoint = function(a) {
        var b = this.m_xf.R;
        a = new d(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return new d(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    e.prototype.GetLinearDamping = function() {
        return this.m_linearDamping
    };
    e.prototype.SetLinearDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_linearDamping = a
    };
    e.prototype.GetAngularDamping = function() {
        return this.m_angularDamping
    };
    e.prototype.SetAngularDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_angularDamping = a
    };
    e.prototype.SetType = function(a) {
        void 0 ===
            a && (a = 0);
        if (this.m_type != a)
            for (this.m_type = a, this.ResetMassData(), this.m_type == e.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0, a = this.m_contactList; a; a = a.next) a.contact.FlagForFiltering()
    };
    e.prototype.GetType = function() {
        return this.m_type
    };
    e.prototype.SetBullet = function(a) {
        this.m_flags = a ? this.m_flags | e.e_bulletFlag : this.m_flags & ~e.e_bulletFlag
    };
    e.prototype.IsBullet = function() {
        return (this.m_flags & e.e_bulletFlag) ==
            e.e_bulletFlag
    };
    e.prototype.SetSleepingAllowed = function(a) {
        a ? this.m_flags |= e.e_allowSleepFlag : (this.m_flags &= ~e.e_allowSleepFlag, this.SetAwake(!0))
    };
    e.prototype.SetAwake = function(a) {
        a ? (this.m_flags |= e.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~e.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
    };
    e.prototype.IsAwake = function() {
        return (this.m_flags & e.e_awakeFlag) == e.e_awakeFlag
    };
    e.prototype.SetFixedRotation = function(a) {
        this.m_flags =
            a ? this.m_flags | e.e_fixedRotationFlag : this.m_flags & ~e.e_fixedRotationFlag;
        this.ResetMassData()
    };
    e.prototype.IsFixedRotation = function() {
        return (this.m_flags & e.e_fixedRotationFlag) == e.e_fixedRotationFlag
    };
    e.prototype.SetActive = function(a) {
        if (a != this.IsActive()) {
            var b;
            if (a)
                for (this.m_flags |= e.e_activeFlag, a = this.m_world.m_contactManager.m_broadPhase, b = this.m_fixtureList; b; b = b.m_next) b.CreateProxy(a, this.m_xf);
            else {
                this.m_flags &= ~e.e_activeFlag;
                a = this.m_world.m_contactManager.m_broadPhase;
                for (b = this.m_fixtureList; b; b =
                    b.m_next) b.DestroyProxy(a);
                for (a = this.m_contactList; a;) b = a, a = a.next, this.m_world.m_contactManager.Destroy(b.contact);
                this.m_contactList = null
            }
        }
    };
    e.prototype.IsActive = function() {
        return (this.m_flags & e.e_activeFlag) == e.e_activeFlag
    };
    e.prototype.IsSleepingAllowed = function() {
        return (this.m_flags & e.e_allowSleepFlag) == e.e_allowSleepFlag
    };
    e.prototype.GetFixtureList = function() {
        return this.m_fixtureList
    };
    e.prototype.GetJointList = function() {
        return this.m_jointList
    };
    e.prototype.GetControllerList = function() {
        return this.m_controllerList
    };
    e.prototype.GetContactList = function() {
        return this.m_contactList
    };
    e.prototype.GetNext = function() {
        return this.m_next
    };
    e.prototype.GetUserData = function() {
        return this.m_userData
    };
    e.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    e.prototype.GetWorld = function() {
        return this.m_world
    };
    e.prototype.b2Body = function(a, b) {
        this.m_flags = 0;
        a.bullet && (this.m_flags |= e.e_bulletFlag);
        a.fixedRotation && (this.m_flags |= e.e_fixedRotationFlag);
        a.allowSleep && (this.m_flags |= e.e_allowSleepFlag);
        a.awake && (this.m_flags |= e.e_awakeFlag);
        a.active && (this.m_flags |= e.e_activeFlag);
        this.m_world = b;
        this.m_xf.position.SetV(a.position);
        this.m_xf.R.Set(a.angle);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.t0 = 1;
        this.m_sweep.a0 = this.m_sweep.a = a.angle;
        var c = this.m_xf.R,
            n = this.m_sweep.localCenter;
        this.m_sweep.c.x = c.col1.x * n.x + c.col2.x * n.y;
        this.m_sweep.c.y = c.col1.y * n.x + c.col2.y * n.y;
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_contactList = this.m_controllerList = this.m_jointList =
            null;
        this.m_controllerCount = 0;
        this.m_next = this.m_prev = null;
        this.m_linearVelocity.SetV(a.linearVelocity);
        this.m_angularVelocity = a.angularVelocity;
        this.m_linearDamping = a.linearDamping;
        this.m_angularDamping = a.angularDamping;
        this.m_force.Set(0, 0);
        this.m_sleepTime = this.m_torque = 0;
        this.m_type = a.type;
        this.m_invMass = this.m_type == e.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
        this.m_invI = this.m_I = 0;
        this.m_inertiaScale = a.inertiaScale;
        this.m_userData = a.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0
    };
    e.prototype.SynchronizeFixtures =
        function() {
            var a = e.s_xf1;
            a.R.Set(this.m_sweep.a0);
            var b = a.R,
                c = this.m_sweep.localCenter;
            a.position.x = this.m_sweep.c0.x - (b.col1.x * c.x + b.col2.x * c.y);
            a.position.y = this.m_sweep.c0.y - (b.col1.y * c.x + b.col2.y * c.y);
            c = this.m_world.m_contactManager.m_broadPhase;
            for (b = this.m_fixtureList; b; b = b.m_next) b.Synchronize(c, a, this.m_xf)
        };
    e.prototype.SynchronizeTransform = function() {
        this.m_xf.R.Set(this.m_sweep.a);
        var a = this.m_xf.R,
            b = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (a.col1.x * b.x + a.col2.x * b.y);
        this.m_xf.position.y = this.m_sweep.c.y - (a.col1.y * b.x + a.col2.y * b.y)
    };
    e.prototype.ShouldCollide = function(a) {
        if (this.m_type != e.b2_dynamicBody && a.m_type != e.b2_dynamicBody) return !1;
        for (var b = this.m_jointList; b; b = b.next)
            if (b.other == a && 0 == b.joint.m_collideConnected) return !1;
        return !0
    };
    e.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        this.m_sweep.Advance(a);
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.SynchronizeTransform()
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Body.s_xf1 =
            new h;
        Box2D.Dynamics.b2Body.e_islandFlag = 1;
        Box2D.Dynamics.b2Body.e_awakeFlag = 2;
        Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
        Box2D.Dynamics.b2Body.e_bulletFlag = 8;
        Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
        Box2D.Dynamics.b2Body.e_activeFlag = 32;
        Box2D.Dynamics.b2Body.b2_staticBody = 0;
        Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
        Box2D.Dynamics.b2Body.b2_dynamicBody = 2
    });
    y.b2BodyDef = function() {
        this.position = new d;
        this.linearVelocity = new d
    };
    y.prototype.b2BodyDef = function() {
        this.userData = null;
        this.position.Set(0,
            0);
        this.angle = 0;
        this.linearVelocity.Set(0, 0);
        this.angularDamping = this.linearDamping = this.angularVelocity = 0;
        this.awake = this.allowSleep = !0;
        this.bullet = this.fixedRotation = !1;
        this.type = e.b2_staticBody;
        this.active = !0;
        this.inertiaScale = 1
    };
    w.b2ContactFilter = function() {};
    w.prototype.ShouldCollide = function(a, b) {
        var c = a.GetFilterData(),
            n = b.GetFilterData();
        return c.groupIndex == n.groupIndex && 0 != c.groupIndex ? 0 < c.groupIndex : 0 != (c.maskBits & n.categoryBits) && 0 != (c.categoryBits & n.maskBits)
    };
    w.prototype.RayCollide =
        function(a, b) {
            return a ? this.ShouldCollide(a instanceof M ? a : null, b) : !0
        };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new w
    });
    H.b2ContactImpulse = function() {
        this.normalImpulses = new Vector_a2j_Number(c.b2_maxManifoldPoints);
        this.tangentImpulses = new Vector_a2j_Number(c.b2_maxManifoldPoints)
    };
    D.b2ContactListener = function() {};
    D.prototype.BeginContact = function(a) {};
    D.prototype.EndContact = function(a) {};
    D.prototype.PreSolve = function(a, b) {};
    D.prototype.PostSolve = function(a,
        b) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactListener.b2_defaultListener = new D
    });
    N.b2ContactManager = function() {};
    N.prototype.b2ContactManager = function() {
        this.m_world = null;
        this.m_contactCount = 0;
        this.m_contactFilter = w.b2_defaultFilter;
        this.m_contactListener = D.b2_defaultListener;
        this.m_contactFactory = new r(this.m_allocator);
        this.m_broadPhase = new m
    };
    N.prototype.AddPair = function(a, b) {
        var c = a instanceof M ? a : null,
            n = b instanceof M ? b : null,
            r = c.GetBody(),
            q = n.GetBody();
        if (r != q) {
            for (var d = q.GetContactList(); d;) {
                if (d.other ==
                    r) {
                    var e = d.contact.GetFixtureA(),
                        g = d.contact.GetFixtureB();
                    if (e == c && g == n || e == n && g == c) return
                }
                d = d.next
            }
            0 != q.ShouldCollide(r) && 0 != this.m_contactFilter.ShouldCollide(c, n) && (d = this.m_contactFactory.Create(c, n), c = d.GetFixtureA(), n = d.GetFixtureB(), r = c.m_body, q = n.m_body, d.m_prev = null, d.m_next = this.m_world.m_contactList, null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = d), this.m_world.m_contactList = d, d.m_nodeA.contact = d, d.m_nodeA.other = q, d.m_nodeA.prev = null, d.m_nodeA.next = r.m_contactList,
                null != r.m_contactList && (r.m_contactList.prev = d.m_nodeA), r.m_contactList = d.m_nodeA, d.m_nodeB.contact = d, d.m_nodeB.other = r, d.m_nodeB.prev = null, d.m_nodeB.next = q.m_contactList, null != q.m_contactList && (q.m_contactList.prev = d.m_nodeB), q.m_contactList = d.m_nodeB, ++this.m_world.m_contactCount)
        }
    };
    N.prototype.FindNewContacts = function() {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
    };
    N.prototype.Destroy = function(a) {
        var b = a.GetFixtureA(),
            c = a.GetFixtureB(),
            b = b.GetBody(),
            c = c.GetBody();
        a.IsTouching() &&
            this.m_contactListener.EndContact(a);
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_world.m_contactList && (this.m_world.m_contactList = a.m_next);
        a.m_nodeA.prev && (a.m_nodeA.prev.next = a.m_nodeA.next);
        a.m_nodeA.next && (a.m_nodeA.next.prev = a.m_nodeA.prev);
        a.m_nodeA == b.m_contactList && (b.m_contactList = a.m_nodeA.next);
        a.m_nodeB.prev && (a.m_nodeB.prev.next = a.m_nodeB.next);
        a.m_nodeB.next && (a.m_nodeB.next.prev = a.m_nodeB.prev);
        a.m_nodeB == c.m_contactList && (c.m_contactList = a.m_nodeB.next);
        this.m_contactFactory.Destroy(a);
        --this.m_contactCount
    };
    N.prototype.Collide = function() {
        for (var a = this.m_world.m_contactList; a;) {
            var b = a.GetFixtureA(),
                c = a.GetFixtureB(),
                n = b.GetBody(),
                r = c.GetBody();
            if (0 == n.IsAwake() && 0 == r.IsAwake()) a = a.GetNext();
            else {
                if (a.m_flags & B.e_filterFlag) {
                    if (0 == r.ShouldCollide(n)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    if (0 == this.m_contactFilter.ShouldCollide(b, c)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    a.m_flags &= ~B.e_filterFlag
                }
                0 == this.m_broadPhase.TestOverlap(b.m_proxy,
                    c.m_proxy) ? (b = a, a = b.GetNext(), this.Destroy(b)) : (a.Update(this.m_contactListener), a = a.GetNext())
            }
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactManager.s_evalCP = new a
    });
    F.b2DebugDraw = function() {};
    F.prototype.b2DebugDraw = function() {};
    F.prototype.SetFlags = function(a) {};
    F.prototype.GetFlags = function() {};
    F.prototype.AppendFlags = function(a) {};
    F.prototype.ClearFlags = function(a) {};
    F.prototype.SetSprite = function(a) {};
    F.prototype.GetSprite = function() {};
    F.prototype.SetDrawScale = function(a) {};
    F.prototype.GetDrawScale =
        function() {};
    F.prototype.SetLineThickness = function(a) {};
    F.prototype.GetLineThickness = function() {};
    F.prototype.SetAlpha = function(a) {};
    F.prototype.GetAlpha = function() {};
    F.prototype.SetFillAlpha = function(a) {};
    F.prototype.GetFillAlpha = function() {};
    F.prototype.SetXFormScale = function(a) {};
    F.prototype.GetXFormScale = function() {};
    F.prototype.DrawPolygon = function(a, b, c) {};
    F.prototype.DrawSolidPolygon = function(a, b, c) {};
    F.prototype.DrawCircle = function(a, b, c) {};
    F.prototype.DrawSolidCircle = function(a, b, c, n) {};
    F.prototype.DrawSegment = function(a, b, c) {};
    F.prototype.DrawTransform = function(a) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
        Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
        Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
        Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
        Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
        Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
    });
    P.b2DestructionListener = function() {};
    P.prototype.SayGoodbyeJoint = function(a) {};
    P.prototype.SayGoodbyeFixture = function(a) {};
    K.b2FilterData =
        function() {
            this.categoryBits = 1;
            this.maskBits = 65535;
            this.groupIndex = 0
        };
    K.prototype.Copy = function() {
        var a = new K;
        a.categoryBits = this.categoryBits;
        a.maskBits = this.maskBits;
        a.groupIndex = this.groupIndex;
        return a
    };
    M.b2Fixture = function() {
        this.m_filter = new K
    };
    M.prototype.GetType = function() {
        return this.m_shape.GetType()
    };
    M.prototype.GetShape = function() {
        return this.m_shape
    };
    M.prototype.SetSensor = function(a) {
        if (this.m_isSensor != a && (this.m_isSensor = a, null != this.m_body))
            for (a = this.m_body.GetContactList(); a;) {
                var b =
                    a.contact,
                    c = b.GetFixtureA(),
                    n = b.GetFixtureB();
                c != this && n != this || b.SetSensor(c.IsSensor() || n.IsSensor());
                a = a.next
            }
    };
    M.prototype.IsSensor = function() {
        return this.m_isSensor
    };
    M.prototype.SetFilterData = function(a) {
        this.m_filter = a.Copy();
        if (!this.m_body)
            for (a = this.m_body.GetContactList(); a;) {
                var b = a.contact,
                    c = b.GetFixtureA(),
                    n = b.GetFixtureB();
                c != this && n != this || b.FlagForFiltering();
                a = a.next
            }
    };
    M.prototype.GetFilterData = function() {
        return this.m_filter.Copy()
    };
    M.prototype.GetBody = function() {
        return this.m_body
    };
    M.prototype.GetNext = function() {
        return this.m_next
    };
    M.prototype.GetUserData = function() {
        return this.m_userData
    };
    M.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    M.prototype.TestPoint = function(a) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), a)
    };
    M.prototype.RayCast = function(a, b) {
        return this.m_shape.RayCast(a, b, this.m_body.GetTransform())
    };
    M.prototype.GetMassData = function(a) {
        void 0 === a && (a = null);
        null == a && (a = new u);
        this.m_shape.ComputeMass(a, this.m_density);
        return a
    };
    M.prototype.SetDensity =
        function(a) {
            void 0 === a && (a = 0);
            this.m_density = a
        };
    M.prototype.GetDensity = function() {
        return this.m_density
    };
    M.prototype.GetFriction = function() {
        return this.m_friction
    };
    M.prototype.SetFriction = function(a) {
        void 0 === a && (a = 0);
        this.m_friction = a
    };
    M.prototype.GetRestitution = function() {
        return this.m_restitution
    };
    M.prototype.SetRestitution = function(a) {
        void 0 === a && (a = 0);
        this.m_restitution = a
    };
    M.prototype.GetAABB = function() {
        return this.m_aabb
    };
    M.prototype.b2Fixture = function() {
        this.m_aabb = new p;
        this.m_shape = this.m_next =
            this.m_body = this.m_userData = null;
        this.m_restitution = this.m_friction = this.m_density = 0
    };
    M.prototype.Create = function(a, b, c) {
        this.m_userData = c.userData;
        this.m_friction = c.friction;
        this.m_restitution = c.restitution;
        this.m_body = a;
        this.m_next = null;
        this.m_filter = c.filter.Copy();
        this.m_isSensor = c.isSensor;
        this.m_shape = c.shape.Copy();
        this.m_density = c.density
    };
    M.prototype.Destroy = function() {
        this.m_shape = null
    };
    M.prototype.CreateProxy = function(a, b) {
        this.m_shape.ComputeAABB(this.m_aabb, b);
        this.m_proxy = a.CreateProxy(this.m_aabb,
            this)
    };
    M.prototype.DestroyProxy = function(a) {
        null != this.m_proxy && (a.DestroyProxy(this.m_proxy), this.m_proxy = null)
    };
    M.prototype.Synchronize = function(a, c, n) {
        if (this.m_proxy) {
            var r = new p,
                d = new p;
            this.m_shape.ComputeAABB(r, c);
            this.m_shape.ComputeAABB(d, n);
            this.m_aabb.Combine(r, d);
            c = b.SubtractVV(n.position, c.position);
            a.MoveProxy(this.m_proxy, this.m_aabb, c)
        }
    };
    J.b2FixtureDef = function() {
        this.filter = new K
    };
    J.prototype.b2FixtureDef = function() {
        this.userData = this.shape = null;
        this.friction = .2;
        this.density = this.restitution =
            0;
        this.filter.categoryBits = 1;
        this.filter.maskBits = 65535;
        this.filter.groupIndex = 0;
        this.isSensor = !1
    };
    L.b2Island = function() {};
    L.prototype.b2Island = function() {
        this.m_bodies = new Vector;
        this.m_contacts = new Vector;
        this.m_joints = new Vector
    };
    L.prototype.Initialize = function(a, b, c, n, r, d) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var q = 0;
        this.m_bodyCapacity = a;
        this.m_contactCapacity = b;
        this.m_jointCapacity = c;
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        this.m_allocator = n;
        this.m_listener =
            r;
        this.m_contactSolver = d;
        for (q = this.m_bodies.length; q < a; q++) this.m_bodies[q] = null;
        for (q = this.m_contacts.length; q < b; q++) this.m_contacts[q] = null;
        for (q = this.m_joints.length; q < c; q++) this.m_joints[q] = null
    };
    L.prototype.Clear = function() {
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
    };
    L.prototype.Solve = function(a, n, r) {
        for (var q = 0, d = 0, g, q = 0; q < this.m_bodyCount; ++q) d = this.m_bodies[q], d.GetType() == e.b2_dynamicBody && (d.m_linearVelocity.x += a.dt * (n.x + d.m_invMass * d.m_force.x), d.m_linearVelocity.y += a.dt *
            (n.y + d.m_invMass * d.m_force.y), d.m_angularVelocity += a.dt * d.m_invI * d.m_torque, d.m_linearVelocity.Multiply(b.Clamp(1 - a.dt * d.m_linearDamping, 0, 1)), d.m_angularVelocity *= b.Clamp(1 - a.dt * d.m_angularDamping, 0, 1));
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        n = this.m_contactSolver;
        n.InitVelocityConstraints(a);
        for (q = 0; q < this.m_jointCount; ++q) g = this.m_joints[q], g.InitVelocityConstraints(a);
        for (q = 0; q < a.velocityIterations; ++q) {
            for (d = 0; d < this.m_jointCount; ++d) g = this.m_joints[d],
                g.SolveVelocityConstraints(a);
            n.SolveVelocityConstraints()
        }
        for (q = 0; q < this.m_jointCount; ++q) g = this.m_joints[q], g.FinalizeVelocityConstraints();
        n.FinalizeVelocityConstraints();
        for (q = 0; q < this.m_bodyCount; ++q)
            if (d = this.m_bodies[q], d.GetType() != e.b2_staticBody) {
                var h = a.dt * d.m_linearVelocity.x,
                    B = a.dt * d.m_linearVelocity.y;
                h * h + B * B > c.b2_maxTranslationSquared && (d.m_linearVelocity.Normalize(), d.m_linearVelocity.x = d.m_linearVelocity.x * c.b2_maxTranslation * a.inv_dt, d.m_linearVelocity.y = d.m_linearVelocity.y * c.b2_maxTranslation *
                    a.inv_dt);
                h = a.dt * d.m_angularVelocity;
                h * h > c.b2_maxRotationSquared && (d.m_angularVelocity = 0 > d.m_angularVelocity ? -c.b2_maxRotation * a.inv_dt : c.b2_maxRotation * a.inv_dt);
                d.m_sweep.c0.SetV(d.m_sweep.c);
                d.m_sweep.a0 = d.m_sweep.a;
                d.m_sweep.c.x += a.dt * d.m_linearVelocity.x;
                d.m_sweep.c.y += a.dt * d.m_linearVelocity.y;
                d.m_sweep.a += a.dt * d.m_angularVelocity;
                d.SynchronizeTransform()
            }
        for (q = 0; q < a.positionIterations; ++q) {
            h = n.SolvePositionConstraints(c.b2_contactBaumgarte);
            B = !0;
            for (d = 0; d < this.m_jointCount; ++d) g = this.m_joints[d],
                g = g.SolvePositionConstraints(c.b2_contactBaumgarte), B = B && g;
            if (h && B) break
        }
        this.Report(n.m_constraints);
        if (r) {
            r = Number.MAX_VALUE;
            n = c.b2_linearSleepTolerance * c.b2_linearSleepTolerance;
            h = c.b2_angularSleepTolerance * c.b2_angularSleepTolerance;
            for (q = 0; q < this.m_bodyCount; ++q) d = this.m_bodies[q], d.GetType() != e.b2_staticBody && (0 == (d.m_flags & e.e_allowSleepFlag) && (r = d.m_sleepTime = 0), 0 == (d.m_flags & e.e_allowSleepFlag) || d.m_angularVelocity * d.m_angularVelocity > h || b.Dot(d.m_linearVelocity, d.m_linearVelocity) > n ? r = d.m_sleepTime =
                0 : (d.m_sleepTime += a.dt, r = b.Min(r, d.m_sleepTime)));
            if (r >= c.b2_timeToSleep)
                for (q = 0; q < this.m_bodyCount; ++q) d = this.m_bodies[q], d.SetAwake(!1)
        }
    };
    L.prototype.SolveTOI = function(a) {
        var b = 0,
            n = 0;
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        for (var d = this.m_contactSolver, b = 0; b < this.m_jointCount; ++b) this.m_joints[b].InitVelocityConstraints(a);
        for (b = 0; b < a.velocityIterations; ++b)
            for (d.SolveVelocityConstraints(), n = 0; n < this.m_jointCount; ++n) this.m_joints[n].SolveVelocityConstraints(a);
        for (b = 0; b < this.m_bodyCount; ++b)
            if (n = this.m_bodies[b], n.GetType() != e.b2_staticBody) {
                var q = a.dt * n.m_linearVelocity.x,
                    r = a.dt * n.m_linearVelocity.y;
                q * q + r * r > c.b2_maxTranslationSquared && (n.m_linearVelocity.Normalize(), n.m_linearVelocity.x = n.m_linearVelocity.x * c.b2_maxTranslation * a.inv_dt, n.m_linearVelocity.y = n.m_linearVelocity.y * c.b2_maxTranslation * a.inv_dt);
                q = a.dt * n.m_angularVelocity;
                q * q > c.b2_maxRotationSquared && (n.m_angularVelocity = 0 > n.m_angularVelocity ? -c.b2_maxRotation * a.inv_dt : c.b2_maxRotation * a.inv_dt);
                n.m_sweep.c0.SetV(n.m_sweep.c);
                n.m_sweep.a0 = n.m_sweep.a;
                n.m_sweep.c.x += a.dt * n.m_linearVelocity.x;
                n.m_sweep.c.y += a.dt * n.m_linearVelocity.y;
                n.m_sweep.a += a.dt * n.m_angularVelocity;
                n.SynchronizeTransform()
            }
        for (b = 0; b < a.positionIterations; ++b) {
            q = d.SolvePositionConstraints(.75);
            r = !0;
            for (n = 0; n < this.m_jointCount; ++n) var g = this.m_joints[n].SolvePositionConstraints(c.b2_contactBaumgarte),
                r = r && g;
            if (q && r) break
        }
        this.Report(d.m_constraints)
    };
    L.prototype.Report = function(a) {
        if (null != this.m_listener)
            for (var b = 0; b < this.m_contactCount; ++b) {
                for (var c =
                    this.m_contacts[b], n = a[b], d = 0; d < n.pointCount; ++d) L.s_impulse.normalImpulses[d] = n.points[d].normalImpulse, L.s_impulse.tangentImpulses[d] = n.points[d].tangentImpulse;
                this.m_listener.PostSolve(c, L.s_impulse)
            }
    };
    L.prototype.AddBody = function(a) {
        a.m_islandIndex = this.m_bodyCount;
        this.m_bodies[this.m_bodyCount++] = a
    };
    L.prototype.AddContact = function(a) {
        this.m_contacts[this.m_contactCount++] = a
    };
    L.prototype.AddJoint = function(a) {
        this.m_joints[this.m_jointCount++] = a
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Island.s_impulse =
            new H
    });
    n.b2TimeStep = function() {};
    n.prototype.Set = function(a) {
        this.dt = a.dt;
        this.inv_dt = a.inv_dt;
        this.positionIterations = a.positionIterations;
        this.velocityIterations = a.velocityIterations;
        this.warmStarting = a.warmStarting
    };
    q.b2World = function() {
        this.s_stack = new Vector;
        this.m_contactManager = new N;
        this.m_contactSolver = new I;
        this.m_island = new L
    };
    q.prototype.b2World = function(a, b) {
        this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null;
        this.m_controllerCount =
            this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        q.m_warmStarting = !0;
        q.m_continuousPhysics = !0;
        this.m_allowSleep = b;
        this.m_gravity = a;
        this.m_inv_dt0 = 0;
        this.m_contactManager.m_world = this;
        var c = new y;
        this.m_groundBody = this.CreateBody(c)
    };
    q.prototype.SetDestructionListener = function(a) {
        this.m_destructionListener = a
    };
    q.prototype.SetContactFilter = function(a) {
        this.m_contactManager.m_contactFilter = a
    };
    q.prototype.SetContactListener = function(a) {
        this.m_contactManager.m_contactListener = a
    };
    q.prototype.SetDebugDraw =
        function(a) {
            this.m_debugDraw = a
        };
    q.prototype.SetBroadPhase = function(a) {
        var b = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = a;
        for (var c = this.m_bodyList; c; c = c.m_next)
            for (var n = c.m_fixtureList; n; n = n.m_next) n.m_proxy = a.CreateProxy(b.GetFatAABB(n.m_proxy), n)
    };
    q.prototype.Validate = function() {
        this.m_contactManager.m_broadPhase.Validate()
    };
    q.prototype.GetProxyCount = function() {
        return this.m_contactManager.m_broadPhase.GetProxyCount()
    };
    q.prototype.CreateBody = function(a) {
        if (1 == this.IsLocked()) return null;
        a = new e(a, this);
        a.m_prev = null;
        if (a.m_next = this.m_bodyList) this.m_bodyList.m_prev = a;
        this.m_bodyList = a;
        ++this.m_bodyCount;
        return a
    };
    q.prototype.DestroyBody = function(a) {
        if (1 != this.IsLocked()) {
            for (var b = a.m_jointList; b;) {
                var c = b,
                    b = b.next;
                this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(c.joint);
                this.DestroyJoint(c.joint)
            }
            for (b = a.m_controllerList; b;) c = b, b = b.nextController, c.controller.RemoveBody(a);
            for (b = a.m_contactList; b;) c = b, b = b.next, this.m_contactManager.Destroy(c.contact);
            a.m_contactList =
                null;
            for (b = a.m_fixtureList; b;) c = b, b = b.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(c), c.DestroyProxy(this.m_contactManager.m_broadPhase), c.Destroy();
            a.m_fixtureList = null;
            a.m_fixtureCount = 0;
            a.m_prev && (a.m_prev.m_next = a.m_next);
            a.m_next && (a.m_next.m_prev = a.m_prev);
            a == this.m_bodyList && (this.m_bodyList = a.m_next);
            --this.m_bodyCount
        }
    };
    q.prototype.CreateJoint = function(a) {
        var b = Q.Create(a, null);
        b.m_prev = null;
        if (b.m_next = this.m_jointList) this.m_jointList.m_prev = b;
        this.m_jointList =
            b;
        ++this.m_jointCount;
        b.m_edgeA.joint = b;
        b.m_edgeA.other = b.m_bodyB;
        b.m_edgeA.prev = null;
        if (b.m_edgeA.next = b.m_bodyA.m_jointList) b.m_bodyA.m_jointList.prev = b.m_edgeA;
        b.m_bodyA.m_jointList = b.m_edgeA;
        b.m_edgeB.joint = b;
        b.m_edgeB.other = b.m_bodyA;
        b.m_edgeB.prev = null;
        if (b.m_edgeB.next = b.m_bodyB.m_jointList) b.m_bodyB.m_jointList.prev = b.m_edgeB;
        b.m_bodyB.m_jointList = b.m_edgeB;
        var c = a.bodyA,
            n = a.bodyB;
        if (0 == a.collideConnected)
            for (a = n.GetContactList(); a;) a.other == c && a.contact.FlagForFiltering(), a = a.next;
        return b
    };
    q.prototype.DestroyJoint = function(a) {
        var b = a.m_collideConnected;
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_jointList && (this.m_jointList = a.m_next);
        var c = a.m_bodyA,
            n = a.m_bodyB;
        c.SetAwake(!0);
        n.SetAwake(!0);
        a.m_edgeA.prev && (a.m_edgeA.prev.next = a.m_edgeA.next);
        a.m_edgeA.next && (a.m_edgeA.next.prev = a.m_edgeA.prev);
        a.m_edgeA == c.m_jointList && (c.m_jointList = a.m_edgeA.next);
        a.m_edgeA.prev = null;
        a.m_edgeA.next = null;
        a.m_edgeB.prev && (a.m_edgeB.prev.next = a.m_edgeB.next);
        a.m_edgeB.next && (a.m_edgeB.next.prev = a.m_edgeB.prev);
        a.m_edgeB == n.m_jointList && (n.m_jointList = a.m_edgeB.next);
        a.m_edgeB.prev = null;
        a.m_edgeB.next = null;
        Q.Destroy(a, null);
        --this.m_jointCount;
        if (0 == b)
            for (a = n.GetContactList(); a;) a.other == c && a.contact.FlagForFiltering(), a = a.next
    };
    q.prototype.AddController = function(a) {
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList = a;
        a.m_world = this;
        this.m_controllerCount++;
        return a
    };
    q.prototype.RemoveController = function(a) {
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        this.m_controllerList == a && (this.m_controllerList = a.m_next);
        this.m_controllerCount--
    };
    q.prototype.CreateController = function(a) {
        if (a.m_world != this) throw Error("Controller can only be a member of one world");
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList && (this.m_controllerList.m_prev = a);
        this.m_controllerList = a;
        ++this.m_controllerCount;
        a.m_world = this;
        return a
    };
    q.prototype.DestroyController = function(a) {
        a.Clear();
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a == this.m_controllerList && (this.m_controllerList = a.m_next);
        --this.m_controllerCount
    };
    q.prototype.SetWarmStarting = function(a) {
        q.m_warmStarting = a
    };
    q.prototype.SetContinuousPhysics = function(a) {
        q.m_continuousPhysics = a
    };
    q.prototype.GetBodyCount = function() {
        return this.m_bodyCount
    };
    q.prototype.GetJointCount = function() {
        return this.m_jointCount
    };
    q.prototype.GetContactCount = function() {
        return this.m_contactCount
    };
    q.prototype.SetGravity = function(a) {
        this.m_gravity = a
    };
    q.prototype.GetGravity =
        function() {
            return this.m_gravity
        };
    q.prototype.GetGroundBody = function() {
        return this.m_groundBody
    };
    q.prototype.Step = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.m_flags & q.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &= ~q.e_newFixture);
        this.m_flags |= q.e_locked;
        var n = q.s_timestep2;
        n.dt = a;
        n.velocityIterations = b;
        n.positionIterations = c;
        n.inv_dt = 0 < a ? 1 / a : 0;
        n.dtRatio = this.m_inv_dt0 * a;
        n.warmStarting = q.m_warmStarting;
        this.m_contactManager.Collide();
        0 < n.dt &&
            this.Solve(n);
        q.m_continuousPhysics && 0 < n.dt && this.SolveTOI(n);
        0 < n.dt && (this.m_inv_dt0 = n.inv_dt);
        this.m_flags &= ~q.e_locked
    };
    q.prototype.ClearForces = function() {
        for (var a = this.m_bodyList; a; a = a.m_next) a.m_force.SetZero(), a.m_torque = 0
    };
    q.prototype.DrawDebugData = function() {
        if (null != this.m_debugDraw) {
            this.m_debugDraw.m_sprite.graphics.clear();
            var a = this.m_debugDraw.GetFlags(),
                b, c, n;
            new d;
            new d;
            new d;
            var r;
            new p;
            new p;
            r = [new d, new d, new d, new d];
            var h = new g(0, 0, 0);
            if (a & F.e_shapeBit)
                for (b = this.m_bodyList; b; b =
                    b.m_next)
                    for (r = b.m_xf, c = b.GetFixtureList(); c; c = c.m_next) n = c.GetShape(), 0 == b.IsActive() ? h.Set(.5, .5, .3) : b.GetType() == e.b2_staticBody ? h.Set(.5, .9, .5) : b.GetType() == e.b2_kinematicBody ? h.Set(.5, .5, .9) : 0 == b.IsAwake() ? h.Set(.6, .6, .6) : h.Set(.9, .7, .7), this.DrawShape(n, r, h);
            if (a & F.e_jointBit)
                for (b = this.m_jointList; b; b = b.m_next) this.DrawJoint(b);
            if (a & F.e_controllerBit)
                for (b = this.m_controllerList; b; b = b.m_next) b.Draw(this.m_debugDraw);
            if (a & F.e_pairBit)
                for (h.Set(.3, .9, .9), b = this.m_contactManager.m_contactList; b; b =
                    b.GetNext()) n = b.GetFixtureA(), c = b.GetFixtureB(), n = n.GetAABB().GetCenter(), c = c.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(n, c, h);
            if (a & F.e_aabbBit)
                for (n = this.m_contactManager.m_broadPhase, r = [new d, new d, new d, new d], b = this.m_bodyList; b; b = b.GetNext())
                    if (0 != b.IsActive())
                        for (c = b.GetFixtureList(); c; c = c.GetNext()) {
                            var B = n.GetFatAABB(c.m_proxy);
                            r[0].Set(B.lowerBound.x, B.lowerBound.y);
                            r[1].Set(B.upperBound.x, B.lowerBound.y);
                            r[2].Set(B.upperBound.x, B.upperBound.y);
                            r[3].Set(B.lowerBound.x, B.upperBound.y);
                            this.m_debugDraw.DrawPolygon(r, 4, h)
                        }
                    if (a & F.e_centerOfMassBit)
                        for (b = this.m_bodyList; b; b = b.m_next) r = q.s_xf, r.R = b.m_xf.R, r.position = b.GetWorldCenter(), this.m_debugDraw.DrawTransform(r)
        }
    };
    q.prototype.QueryAABB = function(a, b) {
        var c = this.m_contactManager.m_broadPhase;
        c.Query(function(b) {
            return a(c.GetUserData(b))
        }, b)
    };
    q.prototype.QueryShape = function(a, b, c) {
        void 0 === c && (c = null);
        null == c && (c = new h, c.SetIdentity());
        var n = this.m_contactManager.m_broadPhase,
            d = new p;
        b.ComputeAABB(d, c);
        n.Query(function(d) {
            d = n.GetUserData(d) instanceof
            M ? n.GetUserData(d) : null;
            return z.TestOverlap(b, c, d.GetShape(), d.GetBody().GetTransform()) ? a(d) : !0
        }, d)
    };
    q.prototype.QueryPoint = function(a, b) {
        var n = this.m_contactManager.m_broadPhase,
            d = new p;
        d.lowerBound.Set(b.x - c.b2_linearSlop, b.y - c.b2_linearSlop);
        d.upperBound.Set(b.x + c.b2_linearSlop, b.y + c.b2_linearSlop);
        n.Query(function(c) {
            c = n.GetUserData(c) instanceof M ? n.GetUserData(c) : null;
            return c.TestPoint(b) ? a(c) : !0
        }, d)
    };
    q.prototype.RayCast = function(a, b, c) {
        var n = this.m_contactManager.m_broadPhase,
            r = new v,
            q = new A(b,
                c);
        n.RayCast(function(q, e) {
            var g = n.GetUserData(e),
                g = g instanceof M ? g : null;
            if (g.RayCast(r, q)) {
                var h = r.fraction,
                    B = new d((1 - h) * b.x + h * c.x, (1 - h) * b.y + h * c.y);
                return a(g, B, r.normal, h)
            }
            return q.maxFraction
        }, q)
    };
    q.prototype.RayCastOne = function(a, b) {
        var c;
        this.RayCast(function(a, b, n, f) {
            void 0 === f && (f = 0);
            c = a;
            return f
        }, a, b);
        return c
    };
    q.prototype.RayCastAll = function(a, b) {
        var c = new Vector;
        this.RayCast(function(a, b, n, f) {
            c[c.length] = a;
            return 1
        }, a, b);
        return c
    };
    q.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    q.prototype.GetJointList = function() {
        return this.m_jointList
    };
    q.prototype.GetContactList = function() {
        return this.m_contactList
    };
    q.prototype.IsLocked = function() {
        return 0 < (this.m_flags & q.e_locked)
    };
    q.prototype.Solve = function(a) {
        for (var b, c = this.m_controllerList; c; c = c.m_next) c.Step(a);
        c = this.m_island;
        c.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~e.e_islandFlag;
        for (var n =
            this.m_contactList; n; n = n.m_next) n.m_flags &= ~B.e_islandFlag;
        for (n = this.m_jointList; n; n = n.m_next) n.m_islandFlag = !1;
        parseInt(this.m_bodyCount);
        for (var n = this.s_stack, d = this.m_bodyList; d; d = d.m_next)
            if (!(d.m_flags & e.e_islandFlag) && 0 != d.IsAwake() && 0 != d.IsActive() && d.GetType() != e.b2_staticBody) {
                c.Clear();
                var r = 0;
                n[r++] = d;
                for (d.m_flags |= e.e_islandFlag; 0 < r;)
                    if (b = n[--r], c.AddBody(b), 0 == b.IsAwake() && b.SetAwake(!0), b.GetType() != e.b2_staticBody) {
                        for (var q, g = b.m_contactList; g; g = g.next) g.contact.m_flags & B.e_islandFlag ||
                            1 == g.contact.IsSensor() || 0 == g.contact.IsEnabled() || 0 == g.contact.IsTouching() || (c.AddContact(g.contact), g.contact.m_flags |= B.e_islandFlag, q = g.other, q.m_flags & e.e_islandFlag || (n[r++] = q, q.m_flags |= e.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) 1 != b.joint.m_islandFlag && (q = b.other, 0 != q.IsActive() && (c.AddJoint(b.joint), b.joint.m_islandFlag = !0, q.m_flags & e.e_islandFlag || (n[r++] = q, q.m_flags |= e.e_islandFlag)))
                    }
                c.Solve(a, this.m_gravity, this.m_allowSleep);
                for (r = 0; r < c.m_bodyCount; ++r) b = c.m_bodies[r], b.GetType() ==
                    e.b2_staticBody && (b.m_flags &= ~e.e_islandFlag)
            }
        for (r = 0; r < n.length && n[r]; ++r) n[r] = null;
        for (b = this.m_bodyList; b; b = b.m_next) 0 != b.IsAwake() && 0 != b.IsActive() && b.GetType() != e.b2_staticBody && b.SynchronizeFixtures();
        this.m_contactManager.FindNewContacts()
    };
    q.prototype.SolveTOI = function(a) {
        var b, n, d, r = this.m_island;
        r.Initialize(this.m_bodyCount, c.b2_maxTOIContactsPerIsland, c.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var g = q.s_queue;
        for (b = this.m_bodyList; b; b =
            b.m_next) b.m_flags &= ~e.e_islandFlag, b.m_sweep.t0 = 0;
        for (d = this.m_contactList; d; d = d.m_next) d.m_flags &= ~(B.e_toiFlag | B.e_islandFlag);
        for (d = this.m_jointList; d; d = d.m_next) d.m_islandFlag = !1;
        for (;;) {
            var h = null,
                G = 1;
            for (d = this.m_contactList; d; d = d.m_next)
                if (1 != d.IsSensor() && 0 != d.IsEnabled() && 0 != d.IsContinuous()) {
                    b = 1;
                    if (d.m_flags & B.e_toiFlag) b = d.m_toi;
                    else {
                        b = d.m_fixtureA;
                        n = d.m_fixtureB;
                        b = b.m_body;
                        n = n.m_body;
                        if (!(b.GetType() == e.b2_dynamicBody && 0 != b.IsAwake() || n.GetType() == e.b2_dynamicBody && 0 != n.IsAwake())) continue;
                        var k = b.m_sweep.t0;
                        b.m_sweep.t0 < n.m_sweep.t0 ? (k = n.m_sweep.t0, b.m_sweep.Advance(k)) : n.m_sweep.t0 < b.m_sweep.t0 && (k = b.m_sweep.t0, n.m_sweep.Advance(k));
                        b = d.ComputeTOI(b.m_sweep, n.m_sweep);
                        c.b2Assert(0 <= b && 1 >= b);
                        0 < b && 1 > b && (b = (1 - b) * k + b, 1 < b && (b = 1));
                        d.m_toi = b;
                        d.m_flags |= B.e_toiFlag
                    }
                    Number.MIN_VALUE < b && b < G && (h = d, G = b)
                }
            if (null == h || 1 - 100 * Number.MIN_VALUE < G) break;
            b = h.m_fixtureA;
            n = h.m_fixtureB;
            b = b.m_body;
            n = n.m_body;
            q.s_backupA.Set(b.m_sweep);
            q.s_backupB.Set(n.m_sweep);
            b.Advance(G);
            n.Advance(G);
            h.Update(this.m_contactManager.m_contactListener);
            h.m_flags &= ~B.e_toiFlag;
            if (1 == h.IsSensor() || 0 == h.IsEnabled()) b.m_sweep.Set(q.s_backupA), n.m_sweep.Set(q.s_backupB), b.SynchronizeTransform(), n.SynchronizeTransform();
            else if (0 != h.IsTouching()) {
                b.GetType() != e.b2_dynamicBody && (b = n);
                r.Clear();
                h = d = 0;
                g[d + h++] = b;
                for (b.m_flags |= e.e_islandFlag; 0 < h;)
                    if (b = g[d++], --h, r.AddBody(b), 0 == b.IsAwake() && b.SetAwake(!0), b.GetType() == e.b2_dynamicBody) {
                        for (n = b.m_contactList; n && r.m_contactCount != r.m_contactCapacity; n = n.next) n.contact.m_flags & B.e_islandFlag || 1 == n.contact.IsSensor() ||
                            0 == n.contact.IsEnabled() || 0 == n.contact.IsTouching() || (r.AddContact(n.contact), n.contact.m_flags |= B.e_islandFlag, k = n.other, k.m_flags & e.e_islandFlag || (k.GetType() != e.b2_staticBody && (k.Advance(G), k.SetAwake(!0)), g[d + h] = k, ++h, k.m_flags |= e.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) r.m_jointCount != r.m_jointCapacity && 1 != b.joint.m_islandFlag && (k = b.other, 0 != k.IsActive() && (r.AddJoint(b.joint), b.joint.m_islandFlag = !0, k.m_flags & e.e_islandFlag || (k.GetType() != e.b2_staticBody && (k.Advance(G), k.SetAwake(!0)),
                            g[d + h] = k, ++h, k.m_flags |= e.e_islandFlag)))
                    }
                d = q.s_timestep;
                d.warmStarting = !1;
                d.dt = (1 - G) * a.dt;
                d.inv_dt = 1 / d.dt;
                d.dtRatio = 0;
                d.velocityIterations = a.velocityIterations;
                d.positionIterations = a.positionIterations;
                r.SolveTOI(d);
                for (G = G = 0; G < r.m_bodyCount; ++G)
                    if (b = r.m_bodies[G], b.m_flags &= ~e.e_islandFlag, 0 != b.IsAwake() && b.GetType() == e.b2_dynamicBody)
                        for (b.SynchronizeFixtures(), n = b.m_contactList; n; n = n.next) n.contact.m_flags &= ~B.e_toiFlag;
                for (G = 0; G < r.m_contactCount; ++G) d = r.m_contacts[G], d.m_flags &= ~(B.e_toiFlag |
                    B.e_islandFlag);
                for (G = 0; G < r.m_jointCount; ++G) d = r.m_joints[G], d.m_islandFlag = !1;
                this.m_contactManager.FindNewContacts()
            }
        }
    };
    q.prototype.DrawJoint = function(a) {
        var b = a.GetBodyA(),
            n = a.GetBodyB(),
            c = b.m_xf.position,
            d = n.m_xf.position,
            r = a.GetAnchorA(),
            e = a.GetAnchorB(),
            g = q.s_jointColor;
        switch (a.m_type) {
            case Q.e_distanceJoint:
                this.m_debugDraw.DrawSegment(r, e, g);
                break;
            case Q.e_pulleyJoint:
                b = a instanceof G ? a : null;
                a = b.GetGroundAnchorA();
                b = b.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(a, r, g);
                this.m_debugDraw.DrawSegment(b,
                    e, g);
                this.m_debugDraw.DrawSegment(a, b, g);
                break;
            case Q.e_mouseJoint:
                this.m_debugDraw.DrawSegment(r, e, g);
                break;
            default:
                b != this.m_groundBody && this.m_debugDraw.DrawSegment(c, r, g), this.m_debugDraw.DrawSegment(r, e, g), n != this.m_groundBody && this.m_debugDraw.DrawSegment(d, e, g)
        }
    };
    q.prototype.DrawShape = function(a, n, c) {
        switch (a.m_type) {
            case z.e_circleShape:
                var d = a instanceof t ? a : null;
                a = b.MulX(n, d.m_p);
                this.m_debugDraw.DrawSolidCircle(a, d.m_radius, n.R.col1, c);
                break;
            case z.e_polygonShape:
                d = 0;
                d = a instanceof E ? a :
                    null;
                a = parseInt(d.GetVertexCount());
                for (var r = d.GetVertices(), q = new Vector(a), d = 0; d < a; ++d) q[d] = b.MulX(n, r[d]);
                this.m_debugDraw.DrawSolidPolygon(q, a, c);
                break;
            case z.e_edgeShape:
                d = a instanceof x ? a : null, this.m_debugDraw.DrawSegment(b.MulX(n, d.GetVertex1()), b.MulX(n, d.GetVertex2()), c)
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2World.s_timestep2 = new n;
        Box2D.Dynamics.b2World.s_xf = new h;
        Box2D.Dynamics.b2World.s_backupA = new k;
        Box2D.Dynamics.b2World.s_backupB = new k;
        Box2D.Dynamics.b2World.s_timestep =
            new n;
        Box2D.Dynamics.b2World.s_queue = new Vector;
        Box2D.Dynamics.b2World.s_jointColor = new g(.5, .8, .8);
        Box2D.Dynamics.b2World.e_newFixture = 1;
        Box2D.Dynamics.b2World.e_locked = 2
    })
})();
(function() {
    var b = Box2D.Collision.Shapes.b2CircleShape,
        k = Box2D.Collision.Shapes.b2EdgeShape,
        h = Box2D.Collision.Shapes.b2PolygonShape,
        d = Box2D.Collision.Shapes.b2Shape,
        g = Box2D.Dynamics.Contacts.b2CircleContact,
        c = Box2D.Dynamics.Contacts.b2Contact,
        p = Box2D.Dynamics.Contacts.b2ContactConstraint,
        a = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        m = Box2D.Dynamics.Contacts.b2ContactEdge,
        A = Box2D.Dynamics.Contacts.b2ContactFactory,
        v = Box2D.Dynamics.Contacts.b2ContactRegister,
        t = Box2D.Dynamics.Contacts.b2ContactResult,
        x = Box2D.Dynamics.Contacts.b2ContactSolver,
        u = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        E = Box2D.Dynamics.Contacts.b2NullContact,
        z = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        e = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        y = Box2D.Dynamics.Contacts.b2PolygonContact,
        w = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        H = Box2D.Dynamics.b2Body,
        D = Box2D.Dynamics.b2TimeStep,
        N = Box2D.Common.b2Settings,
        F = Box2D.Common.Math.b2Mat22,
        P = Box2D.Common.Math.b2Math,
        K = Box2D.Common.Math.b2Vec2,
        M = Box2D.Collision.b2Collision,
        J = Box2D.Collision.b2ContactID,
        L = Box2D.Collision.b2Manifold,
        n = Box2D.Collision.b2TimeOfImpact,
        q = Box2D.Collision.b2TOIInput,
        B = Box2D.Collision.b2WorldManifold;
    Box2D.inherit(g, Box2D.Dynamics.Contacts.b2Contact);
    g.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    g.b2CircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    g.Create = function(a) {
        return new g
    };
    g.Destroy = function(a, b) {};
    g.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    g.prototype.Evaluate =
        function() {
            var a = this.m_fixtureA.GetBody(),
                n = this.m_fixtureB.GetBody();
            M.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, n.m_xf)
        };
    c.b2Contact = function() {
        this.m_nodeA = new m;
        this.m_nodeB = new m;
        this.m_manifold = new L;
        this.m_oldManifold = new L
    };
    c.prototype.GetManifold = function() {
        return this.m_manifold
    };
    c.prototype.GetWorldManifold = function(a) {
        var b = this.m_fixtureA.GetBody(),
            n = this.m_fixtureB.GetBody(),
            c = this.m_fixtureA.GetShape(),
            f = this.m_fixtureB.GetShape();
        a.Initialize(this.m_manifold, b.GetTransform(), c.m_radius, n.GetTransform(), f.m_radius)
    };
    c.prototype.IsTouching = function() {
        return (this.m_flags & c.e_touchingFlag) == c.e_touchingFlag
    };
    c.prototype.IsContinuous = function() {
        return (this.m_flags & c.e_continuousFlag) == c.e_continuousFlag
    };
    c.prototype.SetSensor = function(a) {
        this.m_flags = a ? this.m_flags | c.e_sensorFlag : this.m_flags & ~c.e_sensorFlag
    };
    c.prototype.IsSensor = function() {
        return (this.m_flags &
            c.e_sensorFlag) == c.e_sensorFlag
    };
    c.prototype.SetEnabled = function(a) {
        this.m_flags = a ? this.m_flags | c.e_enabledFlag : this.m_flags & ~c.e_enabledFlag
    };
    c.prototype.IsEnabled = function() {
        return (this.m_flags & c.e_enabledFlag) == c.e_enabledFlag
    };
    c.prototype.GetNext = function() {
        return this.m_next
    };
    c.prototype.GetFixtureA = function() {
        return this.m_fixtureA
    };
    c.prototype.GetFixtureB = function() {
        return this.m_fixtureB
    };
    c.prototype.FlagForFiltering = function() {
        this.m_flags |= c.e_filterFlag
    };
    c.prototype.b2Contact = function() {};
    c.prototype.Reset = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        this.m_flags = c.e_enabledFlag;
        if (a && b) {
            if (a.IsSensor() || b.IsSensor()) this.m_flags |= c.e_sensorFlag;
            var n = a.GetBody(),
                d = b.GetBody();
            if (n.GetType() != H.b2_dynamicBody || n.IsBullet() || d.GetType() != H.b2_dynamicBody || d.IsBullet()) this.m_flags |= c.e_continuousFlag;
            this.m_fixtureA = a;
            this.m_fixtureB = b;
            this.m_manifold.m_pointCount = 0;
            this.m_next = this.m_prev = null;
            this.m_nodeA.contact = null;
            this.m_nodeA.prev = null;
            this.m_nodeA.next = null;
            this.m_nodeA.other =
                null;
            this.m_nodeB.contact = null;
            this.m_nodeB.prev = null;
            this.m_nodeB.next = null;
            this.m_nodeB.other = null
        } else this.m_fixtureB = this.m_fixtureA = null
    };
    c.prototype.Update = function(a) {
        var b = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = b;
        this.m_flags |= c.e_enabledFlag;
        var n = !1,
            b = (this.m_flags & c.e_touchingFlag) == c.e_touchingFlag,
            q = this.m_fixtureA.m_body,
            f = this.m_fixtureB.m_body,
            e = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & c.e_sensorFlag) e && (n = this.m_fixtureA.GetShape(),
            e = this.m_fixtureB.GetShape(), q = q.GetTransform(), f = f.GetTransform(), n = d.TestOverlap(n, q, e, f)), this.m_manifold.m_pointCount = 0;
        else {
            q.GetType() != H.b2_dynamicBody || q.IsBullet() || f.GetType() != H.b2_dynamicBody || f.IsBullet() ? this.m_flags |= c.e_continuousFlag : this.m_flags &= ~c.e_continuousFlag;
            if (e)
                for (this.Evaluate(), n = 0 < this.m_manifold.m_pointCount, e = 0; e < this.m_manifold.m_pointCount; ++e) {
                    var g = this.m_manifold.m_points[e];
                    g.m_normalImpulse = 0;
                    g.m_tangentImpulse = 0;
                    for (var h = g.m_id, B = 0; B < this.m_oldManifold.m_pointCount; ++B) {
                        var k =
                            this.m_oldManifold.m_points[B];
                        if (k.m_id.key == h.key) {
                            g.m_normalImpulse = k.m_normalImpulse;
                            g.m_tangentImpulse = k.m_tangentImpulse;
                            break
                        }
                    }
                } else this.m_manifold.m_pointCount = 0;
            n != b && (q.SetAwake(!0), f.SetAwake(!0))
        }
        this.m_flags = n ? this.m_flags | c.e_touchingFlag : this.m_flags & ~c.e_touchingFlag;
        0 == b && 1 == n && a.BeginContact(this);
        1 == b && 0 == n && a.EndContact(this);
        0 == (this.m_flags & c.e_sensorFlag) && a.PreSolve(this, this.m_oldManifold)
    };
    c.prototype.Evaluate = function() {};
    c.prototype.ComputeTOI = function(a, b) {
        c.s_input.proxyA.Set(this.m_fixtureA.GetShape());
        c.s_input.proxyB.Set(this.m_fixtureB.GetShape());
        c.s_input.sweepA = a;
        c.s_input.sweepB = b;
        c.s_input.tolerance = N.b2_linearSlop;
        return n.TimeOfImpact(c.s_input)
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
        Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
        Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
        Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
        Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
        Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
        Box2D.Dynamics.Contacts.b2Contact.e_filterFlag =
            64;
        Box2D.Dynamics.Contacts.b2Contact.s_input = new q
    });
    p.b2ContactConstraint = function() {
        this.localPlaneNormal = new K;
        this.localPoint = new K;
        this.normal = new K;
        this.normalMass = new F;
        this.K = new F
    };
    p.prototype.b2ContactConstraint = function() {
        this.points = new Vector(N.b2_maxManifoldPoints);
        for (var b = 0; b < N.b2_maxManifoldPoints; b++) this.points[b] = new a
    };
    a.b2ContactConstraintPoint = function() {
        this.localPoint = new K;
        this.rA = new K;
        this.rB = new K
    };
    m.b2ContactEdge = function() {};
    A.b2ContactFactory = function() {};
    A.prototype.b2ContactFactory =
        function(a) {
            this.m_allocator = a;
            this.InitializeRegisters()
        };
    A.prototype.AddType = function(a, b, n, c) {
        void 0 === n && (n = 0);
        void 0 === c && (c = 0);
        this.m_registers[n][c].createFcn = a;
        this.m_registers[n][c].destroyFcn = b;
        this.m_registers[n][c].primary = !0;
        n != c && (this.m_registers[c][n].createFcn = a, this.m_registers[c][n].destroyFcn = b, this.m_registers[c][n].primary = !1)
    };
    A.prototype.InitializeRegisters = function() {
        this.m_registers = new Vector(d.e_shapeTypeCount);
        for (var a = 0; a < d.e_shapeTypeCount; a++) {
            this.m_registers[a] =
                new Vector(d.e_shapeTypeCount);
            for (var b = 0; b < d.e_shapeTypeCount; b++) this.m_registers[a][b] = new v
        }
        this.AddType(g.Create, g.Destroy, d.e_circleShape, d.e_circleShape);
        this.AddType(z.Create, z.Destroy, d.e_polygonShape, d.e_circleShape);
        this.AddType(y.Create, y.Destroy, d.e_polygonShape, d.e_polygonShape);
        this.AddType(u.Create, u.Destroy, d.e_edgeShape, d.e_circleShape);
        this.AddType(e.Create, e.Destroy, d.e_polygonShape, d.e_edgeShape)
    };
    A.prototype.Create = function(a, b) {
        var n = parseInt(a.GetType()),
            c = parseInt(b.GetType()),
            n = this.m_registers[n][c];
        if (n.pool) return c = n.pool, n.pool = c.m_next, n.poolCount--, c.Reset(a, b), c;
        c = n.createFcn;
        return null != c ? (n.primary ? (c = c(this.m_allocator), c.Reset(a, b)) : (c = c(this.m_allocator), c.Reset(b, a)), c) : null
    };
    A.prototype.Destroy = function(a) {
        0 < a.m_manifold.m_pointCount && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
        var b = parseInt(a.m_fixtureA.GetType()),
            n = parseInt(a.m_fixtureB.GetType()),
            b = this.m_registers[b][n];
        b.poolCount++;
        a.m_next = b.pool;
        b.pool = a;
        b = b.destroyFcn;
        b(a, this.m_allocator)
    };
    v.b2ContactRegister = function() {};
    t.b2ContactResult = function() {
        this.position = new K;
        this.normal = new K;
        this.id = new J
    };
    x.b2ContactSolver = function() {
        this.m_step = new D;
        this.m_constraints = new Vector
    };
    x.prototype.b2ContactSolver = function() {};
    x.prototype.Initialize = function(a, b, n, c) {
        void 0 === n && (n = 0);
        var f;
        this.m_step.Set(a);
        this.m_allocator = c;
        a = 0;
        for (this.m_constraintCount = n; this.m_constraints.length < this.m_constraintCount;) this.m_constraints[this.m_constraints.length] = new p;
        for (a =
            0; a < n; ++a) {
            f = b[a];
            c = f.m_fixtureA;
            var d = f.m_fixtureB,
                q = c.m_shape.m_radius,
                e = d.m_shape.m_radius,
                g = c.m_body,
                h = d.m_body,
                B = f.GetManifold(),
                k = N.b2MixFriction(c.GetFriction(), d.GetFriction()),
                m = N.b2MixRestitution(c.GetRestitution(), d.GetRestitution()),
                u = g.m_linearVelocity.x,
                t = g.m_linearVelocity.y,
                w = h.m_linearVelocity.x,
                v = h.m_linearVelocity.y,
                y = g.m_angularVelocity,
                z = h.m_angularVelocity;
            N.b2Assert(0 < B.m_pointCount);
            x.s_worldManifold.Initialize(B, g.m_xf, q, h.m_xf, e);
            d = x.s_worldManifold.m_normal.x;
            f = x.s_worldManifold.m_normal.y;
            c = this.m_constraints[a];
            c.bodyA = g;
            c.bodyB = h;
            c.manifold = B;
            c.normal.x = d;
            c.normal.y = f;
            c.pointCount = B.m_pointCount;
            c.friction = k;
            c.restitution = m;
            c.localPlaneNormal.x = B.m_localPlaneNormal.x;
            c.localPlaneNormal.y = B.m_localPlaneNormal.y;
            c.localPoint.x = B.m_localPoint.x;
            c.localPoint.y = B.m_localPoint.y;
            c.radius = q + e;
            c.type = B.m_type;
            for (q = 0; q < c.pointCount; ++q) {
                k = B.m_points[q];
                e = c.points[q];
                e.normalImpulse = k.m_normalImpulse;
                e.tangentImpulse = k.m_tangentImpulse;
                e.localPoint.SetV(k.m_localPoint);
                var k = e.rA.x = x.s_worldManifold.m_points[q].x -
                    g.m_sweep.c.x,
                    m = e.rA.y = x.s_worldManifold.m_points[q].y - g.m_sweep.c.y,
                    A = e.rB.x = x.s_worldManifold.m_points[q].x - h.m_sweep.c.x,
                    D = e.rB.y = x.s_worldManifold.m_points[q].y - h.m_sweep.c.y,
                    E = k * f - m * d,
                    H = A * f - D * d,
                    E = E * E,
                    H = H * H;
                e.normalMass = 1 / (g.m_invMass + h.m_invMass + g.m_invI * E + h.m_invI * H);
                var F = g.m_mass * g.m_invMass + h.m_mass * h.m_invMass,
                    F = F + (g.m_mass * g.m_invI * E + h.m_mass * h.m_invI * H);
                e.equalizedMass = 1 / F;
                H = f;
                F = -d;
                E = k * F - m * H;
                H = A * F - D * H;
                E *= E;
                H *= H;
                e.tangentMass = 1 / (g.m_invMass + h.m_invMass + g.m_invI * E + h.m_invI * H);
                e.velocityBias =
                    0;
                k = c.normal.x * (w + -z * D - u - -y * m) + c.normal.y * (v + z * A - t - y * k);
                k < -N.b2_velocityThreshold && (e.velocityBias += -c.restitution * k)
            }
            2 == c.pointCount && (v = c.points[0], w = c.points[1], B = g.m_invMass, g = g.m_invI, u = h.m_invMass, h = h.m_invI, t = v.rA.x * f - v.rA.y * d, v = v.rB.x * f - v.rB.y * d, y = w.rA.x * f - w.rA.y * d, w = w.rB.x * f - w.rB.y * d, d = B + u + g * t * t + h * v * v, f = B + u + g * y * y + h * w * w, h = B + u + g * t * y + h * v * w, d * d < 100 * (d * f - h * h) ? (c.K.col1.Set(d, h), c.K.col2.Set(h, f), c.K.GetInverse(c.normalMass)) : c.pointCount = 1)
        }
    };
    x.prototype.InitVelocityConstraints = function(a) {
        for (var b =
            0; b < this.m_constraintCount; ++b) {
            var n = this.m_constraints[b],
                c = n.bodyA,
                f = n.bodyB,
                d = c.m_invMass,
                q = c.m_invI,
                e = f.m_invMass,
                g = f.m_invI,
                h = n.normal.x,
                B = n.normal.y,
                k = B,
                m = -h,
                p = 0,
                u = 0;
            if (a.warmStarting)
                for (u = n.pointCount, p = 0; p < u; ++p) {
                    var t = n.points[p];
                    t.normalImpulse *= a.dtRatio;
                    t.tangentImpulse *= a.dtRatio;
                    var x = t.normalImpulse * h + t.tangentImpulse * k,
                        w = t.normalImpulse * B + t.tangentImpulse * m;
                    c.m_angularVelocity -= q * (t.rA.x * w - t.rA.y * x);
                    c.m_linearVelocity.x -= d * x;
                    c.m_linearVelocity.y -= d * w;
                    f.m_angularVelocity += g * (t.rB.x *
                        w - t.rB.y * x);
                    f.m_linearVelocity.x += e * x;
                    f.m_linearVelocity.y += e * w
                } else
                    for (u = n.pointCount, p = 0; p < u; ++p) c = n.points[p], c.normalImpulse = 0, c.tangentImpulse = 0
        }
    };
    x.prototype.SolveVelocityConstraints = function() {
        for (var a = 0, b, c = 0, n = 0, f = 0, d = n = n = c = c = 0, q = c = c = 0, e = c = f = 0, g = 0, h, B = 0; B < this.m_constraintCount; ++B) {
            var f = this.m_constraints[B],
                k = f.bodyA,
                m = f.bodyB,
                p = k.m_angularVelocity,
                u = m.m_angularVelocity,
                t = k.m_linearVelocity,
                x = m.m_linearVelocity,
                w = k.m_invMass,
                v = k.m_invI,
                y = m.m_invMass,
                z = m.m_invI,
                e = f.normal.x,
                A = g = f.normal.y;
            h = -e;
            q = f.friction;
            for (a = 0; a < f.pointCount; a++) b = f.points[a], c = x.x - u * b.rB.y - t.x + p * b.rA.y, n = x.y + u * b.rB.x - t.y - p * b.rA.x, c = c * A + n * h, c = b.tangentMass * -c, n = q * b.normalImpulse, n = P.Clamp(b.tangentImpulse + c, -n, n), c = n - b.tangentImpulse, d = c * A, c *= h, t.x -= w * d, t.y -= w * c, p -= v * (b.rA.x * c - b.rA.y * d), x.x += y * d, x.y += y * c, u += z * (b.rB.x * c - b.rB.y * d), b.tangentImpulse = n;
            parseInt(f.pointCount);
            if (1 == f.pointCount) b = f.points[0], c = x.x + -u * b.rB.y - t.x - -p * b.rA.y, n = x.y + u * b.rB.x - t.y - p * b.rA.x, f = c * e + n * g, c = -b.normalMass * (f - b.velocityBias), n = b.normalImpulse +
                c, n = 0 < n ? n : 0, c = n - b.normalImpulse, d = c * e, c *= g, t.x -= w * d, t.y -= w * c, p -= v * (b.rA.x * c - b.rA.y * d), x.x += y * d, x.y += y * c, u += z * (b.rB.x * c - b.rB.y * d), b.normalImpulse = n;
            else {
                b = f.points[0];
                var a = f.points[1],
                    c = b.normalImpulse,
                    q = a.normalImpulse,
                    E = (x.x - u * b.rB.y - t.x + p * b.rA.y) * e + (x.y + u * b.rB.x - t.y - p * b.rA.x) * g,
                    D = (x.x - u * a.rB.y - t.x + p * a.rA.y) * e + (x.y + u * a.rB.x - t.y - p * a.rA.x) * g,
                    n = E - b.velocityBias,
                    d = D - a.velocityBias;
                h = f.K;
                n -= h.col1.x * c + h.col2.x * q;
                for (d -= h.col1.y * c + h.col2.y * q;;) {
                    h = f.normalMass;
                    A = -(h.col1.x * n + h.col2.x * d);
                    h = -(h.col1.y * n +
                        h.col2.y * d);
                    if (0 <= A && 0 <= h) {
                        c = A - c;
                        q = h - q;
                        f = c * e;
                        c *= g;
                        e *= q;
                        g *= q;
                        t.x -= w * (f + e);
                        t.y -= w * (c + g);
                        p -= v * (b.rA.x * c - b.rA.y * f + a.rA.x * g - a.rA.y * e);
                        x.x += y * (f + e);
                        x.y += y * (c + g);
                        u += z * (b.rB.x * c - b.rB.y * f + a.rB.x * g - a.rB.y * e);
                        b.normalImpulse = A;
                        a.normalImpulse = h;
                        break
                    }
                    A = -b.normalMass * n;
                    h = 0;
                    D = f.K.col1.y * A + d;
                    if (0 <= A && 0 <= D) {
                        c = A - c;
                        q = h - q;
                        f = c * e;
                        c *= g;
                        e *= q;
                        g *= q;
                        t.x -= w * (f + e);
                        t.y -= w * (c + g);
                        p -= v * (b.rA.x * c - b.rA.y * f + a.rA.x * g - a.rA.y * e);
                        x.x += y * (f + e);
                        x.y += y * (c + g);
                        u += z * (b.rB.x * c - b.rB.y * f + a.rB.x * g - a.rB.y * e);
                        b.normalImpulse = A;
                        a.normalImpulse = h;
                        break
                    }
                    A = 0;
                    h = -a.normalMass * d;
                    E = f.K.col2.x * h + n;
                    if (0 <= h && 0 <= E) {
                        c = A - c;
                        q = h - q;
                        f = c * e;
                        c *= g;
                        e *= q;
                        g *= q;
                        t.x -= w * (f + e);
                        t.y -= w * (c + g);
                        p -= v * (b.rA.x * c - b.rA.y * f + a.rA.x * g - a.rA.y * e);
                        x.x += y * (f + e);
                        x.y += y * (c + g);
                        u += z * (b.rB.x * c - b.rB.y * f + a.rB.x * g - a.rB.y * e);
                        b.normalImpulse = A;
                        a.normalImpulse = h;
                        break
                    }
                    h = A = 0;
                    E = n;
                    D = d;
                    if (0 <= E && 0 <= D) {
                        c = A - c;
                        q = h - q;
                        f = c * e;
                        c *= g;
                        e *= q;
                        g *= q;
                        t.x -= w * (f + e);
                        t.y -= w * (c + g);
                        p -= v * (b.rA.x * c - b.rA.y * f + a.rA.x * g - a.rA.y * e);
                        x.x += y * (f + e);
                        x.y += y * (c + g);
                        u += z * (b.rB.x * c - b.rB.y * f + a.rB.x * g - a.rB.y * e);
                        b.normalImpulse = A;
                        a.normalImpulse =
                            h;
                        break
                    }
                    break
                }
            }
            k.m_angularVelocity = p;
            m.m_angularVelocity = u
        }
    };
    x.prototype.FinalizeVelocityConstraints = function() {
        for (var a = 0; a < this.m_constraintCount; ++a)
            for (var b = this.m_constraints[a], c = b.manifold, n = 0; n < b.pointCount; ++n) {
                var f = c.m_points[n],
                    d = b.points[n];
                f.m_normalImpulse = d.normalImpulse;
                f.m_tangentImpulse = d.tangentImpulse
            }
    };
    x.prototype.SolvePositionConstraints = function(a) {
        void 0 === a && (a = 0);
        for (var b = 0, c = 0; c < this.m_constraintCount; c++) {
            var n = this.m_constraints[c],
                f = n.bodyA,
                d = n.bodyB,
                q = f.m_mass * f.m_invMass,
                e = f.m_mass * f.m_invI,
                g = d.m_mass * d.m_invMass,
                h = d.m_mass * d.m_invI;
            x.s_psm.Initialize(n);
            for (var B = x.s_psm.m_normal, k = 0; k < n.pointCount; k++) {
                var m = n.points[k],
                    p = x.s_psm.m_points[k],
                    u = x.s_psm.m_separations[k],
                    t = p.x - f.m_sweep.c.x,
                    w = p.y - f.m_sweep.c.y,
                    v = p.x - d.m_sweep.c.x,
                    p = p.y - d.m_sweep.c.y,
                    b = b < u ? b : u,
                    u = P.Clamp(a * (u + N.b2_linearSlop), -N.b2_maxLinearCorrection, 0),
                    u = -m.equalizedMass * u,
                    m = u * B.x,
                    u = u * B.y;
                f.m_sweep.c.x -= q * m;
                f.m_sweep.c.y -= q * u;
                f.m_sweep.a -= e * (t * u - w * m);
                f.SynchronizeTransform();
                d.m_sweep.c.x += g * m;
                d.m_sweep.c.y +=
                    g * u;
                d.m_sweep.a += h * (v * u - p * m);
                d.SynchronizeTransform()
            }
        }
        return b > -1.5 * N.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new B;
        Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new w
    });
    Box2D.inherit(u, Box2D.Dynamics.Contacts.b2Contact);
    u.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    u.b2EdgeAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    u.Create = function(a) {
        return new u
    };
    u.Destroy = function(a,
        b) {};
    u.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    u.prototype.Evaluate = function() {
        var a = this.m_fixtureA.GetBody(),
            c = this.m_fixtureB.GetBody();
        this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof k ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, c.m_xf)
    };
    u.prototype.b2CollideEdgeAndCircle = function(a, b, c, n, f) {};
    Box2D.inherit(E, Box2D.Dynamics.Contacts.b2Contact);
    E.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    E.b2NullContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    E.prototype.b2NullContact = function() {
        this.__super.b2Contact.call(this)
    };
    E.prototype.Evaluate = function() {};
    Box2D.inherit(z, Box2D.Dynamics.Contacts.b2Contact);
    z.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    z.b2PolyAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    z.Create = function(a) {
        return new z
    };
    z.Destroy = function(a, b) {};
    z.prototype.Reset = function(a,
        b) {
        this.__super.Reset.call(this, a, b);
        N.b2Assert(a.GetType() == d.e_polygonShape);
        N.b2Assert(b.GetType() == d.e_circleShape)
    };
    z.prototype.Evaluate = function() {
        var a = this.m_fixtureA.m_body,
            c = this.m_fixtureB.m_body;
        M.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof h ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, c.m_xf)
    };
    Box2D.inherit(e, Box2D.Dynamics.Contacts.b2Contact);
    e.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    e.b2PolyAndEdgeContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    e.Create = function(a) {
        return new e
    };
    e.Destroy = function(a, b) {};
    e.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b);
        N.b2Assert(a.GetType() == d.e_polygonShape);
        N.b2Assert(b.GetType() == d.e_edgeShape)
    };
    e.prototype.Evaluate = function() {
        var a = this.m_fixtureA.GetBody(),
            b = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof h ? this.m_fixtureA.GetShape() :
            null, a.m_xf, this.m_fixtureB.GetShape() instanceof k ? this.m_fixtureB.GetShape() : null, b.m_xf)
    };
    e.prototype.b2CollidePolyAndEdge = function(a, b, c, n, f) {};
    Box2D.inherit(y, Box2D.Dynamics.Contacts.b2Contact);
    y.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    y.b2PolygonContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    y.Create = function(a) {
        return new y
    };
    y.Destroy = function(a, b) {};
    y.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    y.prototype.Evaluate =
        function() {
            var a = this.m_fixtureA.GetBody(),
                b = this.m_fixtureB.GetBody();
            M.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof h ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof h ? this.m_fixtureB.GetShape() : null, b.m_xf)
        };
    w.b2PositionSolverManifold = function() {};
    w.prototype.b2PositionSolverManifold = function() {
        this.m_normal = new K;
        this.m_separations = new Vector_a2j_Number(N.b2_maxManifoldPoints);
        this.m_points = new Vector(N.b2_maxManifoldPoints);
        for (var a = 0; a < N.b2_maxManifoldPoints; a++) this.m_points[a] =
            new K
    };
    w.prototype.Initialize = function(a) {
        N.b2Assert(0 < a.pointCount);
        var b = 0,
            c = 0,
            n = 0,
            f, d = 0,
            q = 0;
        switch (a.type) {
            case L.e_circles:
                f = a.bodyA.m_xf.R;
                n = a.localPoint;
                b = a.bodyA.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y);
                c = a.bodyA.m_xf.position.y + (f.col1.y * n.x + f.col2.y * n.y);
                f = a.bodyB.m_xf.R;
                n = a.points[0].localPoint;
                d = a.bodyB.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y);
                f = a.bodyB.m_xf.position.y + (f.col1.y * n.x + f.col2.y * n.y);
                var n = d - b,
                    q = f - c,
                    e = n * n + q * q;
                e > Number.MIN_VALUE * Number.MIN_VALUE ? (e = Math.sqrt(e), this.m_normal.x =
                    n / e, this.m_normal.y = q / e) : (this.m_normal.x = 1, this.m_normal.y = 0);
                this.m_points[0].x = .5 * (b + d);
                this.m_points[0].y = .5 * (c + f);
                this.m_separations[0] = n * this.m_normal.x + q * this.m_normal.y - a.radius;
                break;
            case L.e_faceA:
                f = a.bodyA.m_xf.R;
                n = a.localPlaneNormal;
                this.m_normal.x = f.col1.x * n.x + f.col2.x * n.y;
                this.m_normal.y = f.col1.y * n.x + f.col2.y * n.y;
                f = a.bodyA.m_xf.R;
                n = a.localPoint;
                d = a.bodyA.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y);
                q = a.bodyA.m_xf.position.y + (f.col1.y * n.x + f.col2.y * n.y);
                f = a.bodyB.m_xf.R;
                for (b = 0; b < a.pointCount; ++b) n =
                    a.points[b].localPoint, c = a.bodyB.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y), n = a.bodyB.m_xf.position.y + (f.col1.y * n.x + f.col2.y * n.y), this.m_separations[b] = (c - d) * this.m_normal.x + (n - q) * this.m_normal.y - a.radius, this.m_points[b].x = c, this.m_points[b].y = n;
                break;
            case L.e_faceB:
                f = a.bodyB.m_xf.R;
                n = a.localPlaneNormal;
                this.m_normal.x = f.col1.x * n.x + f.col2.x * n.y;
                this.m_normal.y = f.col1.y * n.x + f.col2.y * n.y;
                f = a.bodyB.m_xf.R;
                n = a.localPoint;
                d = a.bodyB.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y);
                q = a.bodyB.m_xf.position.y +
                    (f.col1.y * n.x + f.col2.y * n.y);
                f = a.bodyA.m_xf.R;
                for (b = 0; b < a.pointCount; ++b) n = a.points[b].localPoint, c = a.bodyA.m_xf.position.x + (f.col1.x * n.x + f.col2.x * n.y), n = a.bodyA.m_xf.position.y + (f.col1.y * n.x + f.col2.y * n.y), this.m_separations[b] = (c - d) * this.m_normal.x + (n - q) * this.m_normal.y - a.radius, this.m_points[b].Set(c, n);
                this.m_normal.x *= -1;
                this.m_normal.y *= -1
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new K;
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB =
            new K
    })
})();
(function() {
    var b = Box2D.Common.Math.b2Mat22,
        k = Box2D.Common.Math.b2Math,
        h = Box2D.Common.Math.b2Vec2,
        d = Box2D.Common.b2Color,
        g = Box2D.Dynamics.Controllers.b2BuoyancyController,
        c = Box2D.Dynamics.Controllers.b2ConstantAccelController,
        p = Box2D.Dynamics.Controllers.b2ConstantForceController,
        a = Box2D.Dynamics.Controllers.b2Controller,
        m = Box2D.Dynamics.Controllers.b2ControllerEdge,
        A = Box2D.Dynamics.Controllers.b2GravityController,
        v = Box2D.Dynamics.Controllers.b2TensorDampingController;
    Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
    g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    g.b2BuoyancyController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.normal = new h(0, -1);
        this.density = this.offset = 0;
        this.velocity = new h(0, 0);
        this.linearDrag = 2;
        this.angularDrag = 1;
        this.useDensity = !1;
        this.useWorldGravity = !0;
        this.gravity = null
    };
    g.prototype.Step = function(a) {
        if (this.m_bodyList)
            for (this.useWorldGravity && (this.gravity = this.GetWorld().GetGravity().Copy()), a = this.m_bodyList; a; a =
                a.nextBody) {
                var b = a.body;
                if (0 != b.IsAwake()) {
                    for (var c = new h, d = new h, g = 0, e = 0, k = b.GetFixtureList(); k; k = k.GetNext()) {
                        var m = new h,
                            p = k.GetShape().ComputeSubmergedArea(this.normal, this.offset, b.GetTransform(), m),
                            g = g + p;
                        c.x += p * m.x;
                        c.y += p * m.y;
                        var v = 0,
                            v = 1,
                            e = e + p * v;
                        d.x += p * m.x * v;
                        d.y += p * m.y * v
                    }
                    c.x /= g;
                    c.y /= g;
                    d.x /= e;
                    d.y /= e;
                    g < Number.MIN_VALUE || (e = this.gravity.GetNegative(), e.Multiply(this.density * g), b.ApplyForce(e, d), d = b.GetLinearVelocityFromWorldPoint(c), d.Subtract(this.velocity), d.Multiply(-this.linearDrag * g), b.ApplyForce(d,
                        c), b.ApplyTorque(-b.GetInertia() / b.GetMass() * g * b.GetAngularVelocity() * this.angularDrag))
                }
            }
    };
    g.prototype.Draw = function(a) {
        var b = new h,
            c = new h;
        b.x = this.normal.x * this.offset + 1E3 * this.normal.y;
        b.y = this.normal.y * this.offset - 1E3 * this.normal.x;
        c.x = this.normal.x * this.offset - 1E3 * this.normal.y;
        c.y = this.normal.y * this.offset + 1E3 * this.normal.x;
        var g = new d(0, 0, 1);
        a.DrawSegment(b, c, g)
    };
    Box2D.inherit(c, Box2D.Dynamics.Controllers.b2Controller);
    c.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    c.b2ConstantAccelController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.A = new h(0, 0)
    };
    c.prototype.Step = function(a) {
        a = new h(this.A.x * a.dt, this.A.y * a.dt);
        for (var b = this.m_bodyList; b; b = b.nextBody) {
            var c = b.body;
            c.IsAwake() && c.SetLinearVelocity(new h(c.GetLinearVelocity().x + a.x, c.GetLinearVelocity().y + a.y))
        }
    };
    Box2D.inherit(p, Box2D.Dynamics.Controllers.b2Controller);
    p.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    p.b2ConstantForceController =
        function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.F = new h(0, 0)
        };
    p.prototype.Step = function(a) {
        for (a = this.m_bodyList; a; a = a.nextBody) {
            var b = a.body;
            b.IsAwake() && b.ApplyForce(this.F, b.GetWorldCenter())
        }
    };
    a.b2Controller = function() {};
    a.prototype.Step = function(a) {};
    a.prototype.Draw = function(a) {};
    a.prototype.AddBody = function(a) {
        var b = new m;
        b.controller = this;
        b.body = a;
        b.nextBody = this.m_bodyList;
        b.prevBody = null;
        this.m_bodyList = b;
        b.nextBody && (b.nextBody.prevBody = b);
        this.m_bodyCount++;
        b.nextController = a.m_controllerList;
        b.prevController = null;
        a.m_controllerList = b;
        b.nextController && (b.nextController.prevController = b);
        a.m_controllerCount++
    };
    a.prototype.RemoveBody = function(a) {
        for (var b = a.m_controllerList; b && b.controller != this;) b = b.nextController;
        b.prevBody && (b.prevBody.nextBody = b.nextBody);
        b.nextBody && (b.nextBody.prevBody = b.prevBody);
        b.nextController && (b.nextController.prevController = b.prevController);
        b.prevController && (b.prevController.nextController = b.nextController);
        this.m_bodyList ==
            b && (this.m_bodyList = b.nextBody);
        a.m_controllerList == b && (a.m_controllerList = b.nextController);
        a.m_controllerCount--;
        this.m_bodyCount--
    };
    a.prototype.Clear = function() {
        for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body)
    };
    a.prototype.GetNext = function() {
        return this.m_next
    };
    a.prototype.GetWorld = function() {
        return this.m_world
    };
    a.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    m.b2ControllerEdge = function() {};
    Box2D.inherit(A, Box2D.Dynamics.Controllers.b2Controller);
    A.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    A.b2GravityController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.G = 1;
        this.invSqr = !0
    };
    A.prototype.Step = function(a) {
        var b = a = null,
            c = null,
            d = 0,
            g = null,
            e = null,
            k = null,
            m = 0,
            p = 0,
            v = 0,
            m = null;
        if (this.invSqr)
            for (a = this.m_bodyList; a; a = a.nextBody)
                for (b = a.body, c = b.GetWorldCenter(), d = b.GetMass(), g = this.m_bodyList; g != a; g = g.nextBody) e = g.body, k = e.GetWorldCenter(), m = k.x - c.x, p = k.y - c.y, v = m * m + p * p, v < Number.MIN_VALUE || (m = new h(m, p), m.Multiply(this.G / v / Math.sqrt(v) * d * e.GetMass()),
                    b.IsAwake() && b.ApplyForce(m, c), m.Multiply(-1), e.IsAwake() && e.ApplyForce(m, k));
        else
            for (a = this.m_bodyList; a; a = a.nextBody)
                for (b = a.body, c = b.GetWorldCenter(), d = b.GetMass(), g = this.m_bodyList; g != a; g = g.nextBody) e = g.body, k = e.GetWorldCenter(), m = k.x - c.x, p = k.y - c.y, v = m * m + p * p, v < Number.MIN_VALUE || (m = new h(m, p), m.Multiply(this.G / v * d * e.GetMass()), b.IsAwake() && b.ApplyForce(m, c), m.Multiply(-1), e.IsAwake() && e.ApplyForce(m, k))
    };
    Box2D.inherit(v, Box2D.Dynamics.Controllers.b2Controller);
    v.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    v.b2TensorDampingController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.T = new b;
        this.maxTimestep = 0
    };
    v.prototype.SetAxisAligned = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.T.col1.x = -a;
        this.T.col1.y = 0;
        this.T.col2.x = 0;
        this.T.col2.y = -b;
        this.maxTimestep = 0 < a || 0 < b ? 1 / Math.max(a, b) : 0
    };
    v.prototype.Step = function(a) {
        a = a.dt;
        if (!(a <= Number.MIN_VALUE)) {
            a > this.maxTimestep && 0 < this.maxTimestep && (a = this.maxTimestep);
            for (var b = this.m_bodyList; b; b = b.nextBody) {
                var c =
                    b.body;
                if (c.IsAwake()) {
                    var d = c.GetWorldVector(k.MulMV(this.T, c.GetLocalVector(c.GetLinearVelocity())));
                    c.SetLinearVelocity(new h(c.GetLinearVelocity().x + d.x * a, c.GetLinearVelocity().y + d.y * a))
                }
            }
        }
    }
})();
(function() {
    var b = Box2D.Common.b2Settings,
        k = Box2D.Common.Math.b2Mat22,
        h = Box2D.Common.Math.b2Mat33,
        d = Box2D.Common.Math.b2Math,
        g = Box2D.Common.Math.b2Vec2,
        c = Box2D.Common.Math.b2Vec3,
        p = Box2D.Dynamics.Joints.b2DistanceJoint,
        a = Box2D.Dynamics.Joints.b2DistanceJointDef,
        m = Box2D.Dynamics.Joints.b2FrictionJoint,
        A = Box2D.Dynamics.Joints.b2FrictionJointDef,
        v = Box2D.Dynamics.Joints.b2GearJoint,
        t = Box2D.Dynamics.Joints.b2GearJointDef,
        x = Box2D.Dynamics.Joints.b2Jacobian,
        u = Box2D.Dynamics.Joints.b2Joint,
        E = Box2D.Dynamics.Joints.b2JointDef,
        z = Box2D.Dynamics.Joints.b2JointEdge,
        e = Box2D.Dynamics.Joints.b2LineJoint,
        y = Box2D.Dynamics.Joints.b2LineJointDef,
        w = Box2D.Dynamics.Joints.b2MouseJoint,
        H = Box2D.Dynamics.Joints.b2MouseJointDef,
        D = Box2D.Dynamics.Joints.b2PrismaticJoint,
        N = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        F = Box2D.Dynamics.Joints.b2PulleyJoint,
        P = Box2D.Dynamics.Joints.b2PulleyJointDef,
        K = Box2D.Dynamics.Joints.b2RevoluteJoint,
        M = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        J = Box2D.Dynamics.Joints.b2WeldJoint,
        L = Box2D.Dynamics.Joints.b2WeldJointDef;
    Box2D.inherit(p, Box2D.Dynamics.Joints.b2Joint);
    p.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    p.b2DistanceJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 = new g;
        this.m_u = new g
    };
    p.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    p.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    p.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
    };
    p.prototype.GetReactionTorque = function(a) {
        return 0
    };
    p.prototype.GetLength = function() {
        return this.m_length
    };
    p.prototype.SetLength = function(a) {
        void 0 === a && (a = 0);
        this.m_length = a
    };
    p.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    p.prototype.SetFrequency = function(a) {
        void 0 === a && (a = 0);
        this.m_frequencyHz = a
    };
    p.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    p.prototype.SetDampingRatio = function(a) {
        void 0 ===
            a && (a = 0);
        this.m_dampingRatio = a
    };
    p.prototype.b2DistanceJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_length = a.length;
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_bias = this.m_gamma = this.m_impulse = 0
    };
    p.prototype.InitVelocityConstraints = function(a) {
        var c, d = 0,
            g = this.m_bodyA,
            e = this.m_bodyB;
        c = g.m_xf.R;
        var h = this.m_localAnchor1.x - g.m_sweep.localCenter.x,
            k = this.m_localAnchor1.y - g.m_sweep.localCenter.y,
            d = c.col1.x * h + c.col2.x * k,
            k = c.col1.y * h + c.col2.y * k,
            h = d;
        c = e.m_xf.R;
        var f = this.m_localAnchor2.x - e.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - e.m_sweep.localCenter.y,
            d = c.col1.x * f + c.col2.x * l,
            l = c.col1.y * f + c.col2.y * l,
            f = d;
        this.m_u.x = e.m_sweep.c.x + f - g.m_sweep.c.x - h;
        this.m_u.y = e.m_sweep.c.y + l - g.m_sweep.c.y - k;
        d = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        d > b.b2_linearSlop ? this.m_u.Multiply(1 / d) : this.m_u.SetZero();
        c = h * this.m_u.y - k * this.m_u.x;
        var m = f * this.m_u.y - l * this.m_u.x;
        c = g.m_invMass + g.m_invI *
            c * c + e.m_invMass + e.m_invI * m * m;
        this.m_mass = 0 != c ? 1 / c : 0;
        if (0 < this.m_frequencyHz) {
            var d = d - this.m_length,
                m = 2 * Math.PI * this.m_frequencyHz,
                p = this.m_mass * m * m;
            this.m_gamma = a.dt * (2 * this.m_mass * this.m_dampingRatio * m + a.dt * p);
            this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
            this.m_bias = d * a.dt * p * this.m_gamma;
            this.m_mass = c + this.m_gamma;
            this.m_mass = 0 != this.m_mass ? 1 / this.m_mass : 0
        }
        a.warmStarting ? (this.m_impulse *= a.dtRatio, a = this.m_impulse * this.m_u.x, c = this.m_impulse * this.m_u.y, g.m_linearVelocity.x -= g.m_invMass * a, g.m_linearVelocity.y -=
            g.m_invMass * c, g.m_angularVelocity -= g.m_invI * (h * c - k * a), e.m_linearVelocity.x += e.m_invMass * a, e.m_linearVelocity.y += e.m_invMass * c, e.m_angularVelocity += e.m_invI * (f * c - l * a)) : this.m_impulse = 0
    };
    p.prototype.SolveVelocityConstraints = function(a) {
        var b;
        a = this.m_bodyA;
        var c = this.m_bodyB;
        b = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            e = b.col1.x * d + b.col2.x * g,
            g = b.col1.y * d + b.col2.y * g,
            d = e;
        b = c.m_xf.R;
        var h = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
            f =
            this.m_localAnchor2.y - c.m_sweep.localCenter.y,
            e = b.col1.x * h + b.col2.x * f,
            f = b.col1.y * h + b.col2.y * f,
            h = e,
            e = -this.m_mass * (this.m_u.x * (c.m_linearVelocity.x + -c.m_angularVelocity * f - (a.m_linearVelocity.x + -a.m_angularVelocity * g)) + this.m_u.y * (c.m_linearVelocity.y + c.m_angularVelocity * h - (a.m_linearVelocity.y + a.m_angularVelocity * d)) + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += e;
        b = e * this.m_u.x;
        e *= this.m_u.y;
        a.m_linearVelocity.x -= a.m_invMass * b;
        a.m_linearVelocity.y -= a.m_invMass * e;
        a.m_angularVelocity -= a.m_invI *
            (d * e - g * b);
        c.m_linearVelocity.x += c.m_invMass * b;
        c.m_linearVelocity.y += c.m_invMass * e;
        c.m_angularVelocity += c.m_invI * (h * e - f * b)
    };
    p.prototype.SolvePositionConstraints = function(a) {
        var c;
        if (0 < this.m_frequencyHz) return !0;
        a = this.m_bodyA;
        var e = this.m_bodyB;
        c = a.m_xf.R;
        var g = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            h = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            k = c.col1.x * g + c.col2.x * h,
            h = c.col1.y * g + c.col2.y * h,
            g = k;
        c = e.m_xf.R;
        var m = this.m_localAnchor2.x - e.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - e.m_sweep.localCenter.y,
            k = c.col1.x * m + c.col2.x * f,
            f = c.col1.y * m + c.col2.y * f,
            m = k,
            k = e.m_sweep.c.x + m - a.m_sweep.c.x - g,
            l = e.m_sweep.c.y + f - a.m_sweep.c.y - h;
        c = Math.sqrt(k * k + l * l);
        k /= c;
        l /= c;
        c -= this.m_length;
        c = d.Clamp(c, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection);
        var p = -this.m_mass * c;
        this.m_u.Set(k, l);
        k = p * this.m_u.x;
        l = p * this.m_u.y;
        a.m_sweep.c.x -= a.m_invMass * k;
        a.m_sweep.c.y -= a.m_invMass * l;
        a.m_sweep.a -= a.m_invI * (g * l - h * k);
        e.m_sweep.c.x += e.m_invMass * k;
        e.m_sweep.c.y += e.m_invMass * l;
        e.m_sweep.a += e.m_invI * (m * l - f * k);
        a.SynchronizeTransform();
        e.SynchronizeTransform();
        return d.Abs(c) < b.b2_linearSlop
    };
    Box2D.inherit(a, Box2D.Dynamics.Joints.b2JointDef);
    a.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    a.b2DistanceJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new g;
        this.localAnchorB = new g
    };
    a.prototype.b2DistanceJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_distanceJoint;
        this.length = 1;
        this.dampingRatio = this.frequencyHz = 0
    };
    a.prototype.Initialize = function(a,
        b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
        a = d.x - c.x;
        c = d.y - c.y;
        this.length = Math.sqrt(a * a + c * c);
        this.dampingRatio = this.frequencyHz = 0
    };
    Box2D.inherit(m, Box2D.Dynamics.Joints.b2Joint);
    m.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    m.b2FrictionJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new g;
        this.m_localAnchorB = new g;
        this.m_linearMass = new k;
        this.m_linearImpulse =
            new g
    };
    m.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    m.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    m.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
    };
    m.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_angularImpulse
    };
    m.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    m.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    m.prototype.SetMaxTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxTorque = a
    };
    m.prototype.GetMaxTorque = function() {
        return this.m_maxTorque
    };
    m.prototype.b2FrictionJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchorA.SetV(a.localAnchorA);
        this.m_localAnchorB.SetV(a.localAnchorB);
        this.m_linearMass.SetZero();
        this.m_angularMass = 0;
        this.m_linearImpulse.SetZero();
        this.m_angularImpulse = 0;
        this.m_maxForce = a.maxForce;
        this.m_maxTorque = a.maxTorque
    };
    m.prototype.InitVelocityConstraints = function(a) {
        var b,
            c = 0,
            d = this.m_bodyA,
            e = this.m_bodyB;
        b = d.m_xf.R;
        var g = this.m_localAnchorA.x - d.m_sweep.localCenter.x,
            h = this.m_localAnchorA.y - d.m_sweep.localCenter.y,
            c = b.col1.x * g + b.col2.x * h,
            h = b.col1.y * g + b.col2.y * h,
            g = c;
        b = e.m_xf.R;
        var f = this.m_localAnchorB.x - e.m_sweep.localCenter.x,
            l = this.m_localAnchorB.y - e.m_sweep.localCenter.y,
            c = b.col1.x * f + b.col2.x * l,
            l = b.col1.y * f + b.col2.y * l,
            f = c;
        b = d.m_invMass;
        var c = e.m_invMass,
            m = d.m_invI,
            p = e.m_invI,
            u = new k;
        u.col1.x = b + c;
        u.col2.x = 0;
        u.col1.y = 0;
        u.col2.y = b + c;
        u.col1.x += m * h * h;
        u.col2.x += -m * g *
            h;
        u.col1.y += -m * g * h;
        u.col2.y += m * g * g;
        u.col1.x += p * l * l;
        u.col2.x += -p * f * l;
        u.col1.y += -p * f * l;
        u.col2.y += p * f * f;
        u.GetInverse(this.m_linearMass);
        this.m_angularMass = m + p;
        0 < this.m_angularMass && (this.m_angularMass = 1 / this.m_angularMass);
        a.warmStarting ? (this.m_linearImpulse.x *= a.dtRatio, this.m_linearImpulse.y *= a.dtRatio, this.m_angularImpulse *= a.dtRatio, a = this.m_linearImpulse, d.m_linearVelocity.x -= b * a.x, d.m_linearVelocity.y -= b * a.y, d.m_angularVelocity -= m * (g * a.y - h * a.x + this.m_angularImpulse), e.m_linearVelocity.x += c * a.x,
            e.m_linearVelocity.y += c * a.y, e.m_angularVelocity += p * (f * a.y - l * a.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
    };
    m.prototype.SolveVelocityConstraints = function(a) {
        var b, c = 0,
            e = this.m_bodyA,
            h = this.m_bodyB,
            k = e.m_linearVelocity,
            m = e.m_angularVelocity,
            f = h.m_linearVelocity,
            l = h.m_angularVelocity,
            p = e.m_invMass,
            u = h.m_invMass,
            t = e.m_invI,
            v = h.m_invI;
        b = e.m_xf.R;
        var w = this.m_localAnchorA.x - e.m_sweep.localCenter.x,
            x = this.m_localAnchorA.y - e.m_sweep.localCenter.y,
            c = b.col1.x * w + b.col2.x *
            x,
            x = b.col1.y * w + b.col2.y * x,
            w = c;
        b = h.m_xf.R;
        var y = this.m_localAnchorB.x - h.m_sweep.localCenter.x,
            z = this.m_localAnchorB.y - h.m_sweep.localCenter.y,
            c = b.col1.x * y + b.col2.x * z,
            z = b.col1.y * y + b.col2.y * z,
            y = c;
        b = 0;
        var c = -this.m_angularMass * (l - m),
            A = this.m_angularImpulse;
        b = a.dt * this.m_maxTorque;
        this.m_angularImpulse = d.Clamp(this.m_angularImpulse + c, -b, b);
        c = this.m_angularImpulse - A;
        m -= t * c;
        l += v * c;
        b = d.MulMV(this.m_linearMass, new g(-(f.x - l * z - k.x + m * x), -(f.y + l * y - k.y - m * w)));
        c = this.m_linearImpulse.Copy();
        this.m_linearImpulse.Add(b);
        b = a.dt * this.m_maxForce;
        this.m_linearImpulse.LengthSquared() > b * b && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(b));
        b = d.SubtractVV(this.m_linearImpulse, c);
        k.x -= p * b.x;
        k.y -= p * b.y;
        m -= t * (w * b.y - x * b.x);
        f.x += u * b.x;
        f.y += u * b.y;
        l += v * (y * b.y - z * b.x);
        e.m_angularVelocity = m;
        h.m_angularVelocity = l
    };
    m.prototype.SolvePositionConstraints = function(a) {
        return !0
    };
    Box2D.inherit(A, Box2D.Dynamics.Joints.b2JointDef);
    A.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    A.b2FrictionJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new g;
        this.localAnchorB = new g
    };
    A.prototype.b2FrictionJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_frictionJoint;
        this.maxTorque = this.maxForce = 0
    };
    A.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };
    Box2D.inherit(v, Box2D.Dynamics.Joints.b2Joint);
    v.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    v.b2GearJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this,
            arguments);
        this.m_groundAnchor1 = new g;
        this.m_groundAnchor2 = new g;
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 = new g;
        this.m_J = new x
    };
    v.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    v.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    v.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
    };
    v.prototype.GetReactionTorque = function(a) {
        void 0 ===
            a && (a = 0);
        var b = this.m_bodyB.m_xf.R,
            c = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
            d = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
            e = b.col1.x * c + b.col2.x * d,
            d = b.col1.y * c + b.col2.y * d;
        return a * (this.m_impulse * this.m_J.angularB - e * this.m_impulse * this.m_J.linearB.y + d * this.m_impulse * this.m_J.linearB.x)
    };
    v.prototype.GetRatio = function() {
        return this.m_ratio
    };
    v.prototype.SetRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_ratio = a
    };
    v.prototype.b2GearJoint = function(a) {
        this.__super.b2Joint.call(this,
            a);
        var b = parseInt(a.joint1.m_type),
            c = parseInt(a.joint2.m_type);
        this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
        var d = 0,
            e = 0;
        this.m_ground1 = a.joint1.GetBodyA();
        this.m_bodyA = a.joint1.GetBodyB();
        b == u.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof K ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), d = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof D ? a.joint1 : null,
            this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), d = this.m_prismatic1.GetJointTranslation());
        this.m_ground2 = a.joint2.GetBodyA();
        this.m_bodyB = a.joint2.GetBodyB();
        c == u.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof K ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), e = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof D ? a.joint2 :
            null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), e = this.m_prismatic2.GetJointTranslation());
        this.m_ratio = a.ratio;
        this.m_constant = d + this.m_ratio * e;
        this.m_impulse = 0
    };
    v.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_ground1,
            c = this.m_ground2,
            d = this.m_bodyA,
            e = this.m_bodyB,
            g = 0,
            h = 0,
            f = 0,
            l = 0,
            k = f = 0,
            m = 0;
        this.m_J.SetZero();
        this.m_revolute1 ? (this.m_J.angularA = -1, m += d.m_invI) : (b = b.m_xf.R, h = this.m_prismatic1.m_localXAxis1, g = b.col1.x *
            h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = d.m_xf.R, f = this.m_localAnchor1.x - d.m_sweep.localCenter.x, l = this.m_localAnchor1.y - d.m_sweep.localCenter.y, k = b.col1.x * f + b.col2.x * l, l = b.col1.y * f + b.col2.y * l, f = k * h - l * g, this.m_J.linearA.Set(-g, -h), this.m_J.angularA = -f, m += d.m_invMass + d.m_invI * f * f);
        this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, m += this.m_ratio * this.m_ratio * e.m_invI) : (b = c.m_xf.R, h = this.m_prismatic2.m_localXAxis1, g = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = e.m_xf.R, f = this.m_localAnchor2.x -
            e.m_sweep.localCenter.x, l = this.m_localAnchor2.y - e.m_sweep.localCenter.y, k = b.col1.x * f + b.col2.x * l, l = b.col1.y * f + b.col2.y * l, f = k * h - l * g, this.m_J.linearB.Set(-this.m_ratio * g, -this.m_ratio * h), this.m_J.angularB = -this.m_ratio * f, m += this.m_ratio * this.m_ratio * (e.m_invMass + e.m_invI * f * f));
        this.m_mass = 0 < m ? 1 / m : 0;
        a.warmStarting ? (d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linearA.x, d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linearA.y, d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angularA,
            e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linearB.x, e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linearB.y, e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
    };
    v.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB,
            c = this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity),
            c = -this.m_mass * c;
        this.m_impulse += c;
        a.m_linearVelocity.x += a.m_invMass * c * this.m_J.linearA.x;
        a.m_linearVelocity.y +=
            a.m_invMass * c * this.m_J.linearA.y;
        a.m_angularVelocity += a.m_invI * c * this.m_J.angularA;
        b.m_linearVelocity.x += b.m_invMass * c * this.m_J.linearB.x;
        b.m_linearVelocity.y += b.m_invMass * c * this.m_J.linearB.y;
        b.m_angularVelocity += b.m_invI * c * this.m_J.angularB
    };
    v.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB,
            d = 0,
            e = 0,
            d = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(),
            e = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(),
            d = -this.m_mass * (this.m_constant - (d + this.m_ratio * e));
        a.m_sweep.c.x += a.m_invMass * d * this.m_J.linearA.x;
        a.m_sweep.c.y += a.m_invMass * d * this.m_J.linearA.y;
        a.m_sweep.a += a.m_invI * d * this.m_J.angularA;
        c.m_sweep.c.x += c.m_invMass * d * this.m_J.linearB.x;
        c.m_sweep.c.y += c.m_invMass * d * this.m_J.linearB.y;
        c.m_sweep.a += c.m_invI * d * this.m_J.angularB;
        a.SynchronizeTransform();
        c.SynchronizeTransform();
        return 0 < b.b2_linearSlop
    };
    Box2D.inherit(t, Box2D.Dynamics.Joints.b2JointDef);
    t.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    t.b2GearJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
    };
    t.prototype.b2GearJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_gearJoint;
        this.joint2 = this.joint1 = null;
        this.ratio = 1
    };
    x.b2Jacobian = function() {
        this.linearA = new g;
        this.linearB = new g
    };
    x.prototype.SetZero = function() {
        this.linearA.SetZero();
        this.angularA = 0;
        this.linearB.SetZero();
        this.angularB = 0
    };
    x.prototype.Set = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        this.linearA.SetV(a);
        this.angularA =
            b;
        this.linearB.SetV(c);
        this.angularB = d
    };
    x.prototype.Compute = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        return this.linearA.x * a.x + this.linearA.y * a.y + this.angularA * b + (this.linearB.x * c.x + this.linearB.y * c.y) + this.angularB * d
    };
    u.b2Joint = function() {
        this.m_edgeA = new z;
        this.m_edgeB = new z;
        this.m_localCenterA = new g;
        this.m_localCenterB = new g
    };
    u.prototype.GetType = function() {
        return this.m_type
    };
    u.prototype.GetAnchorA = function() {
        return null
    };
    u.prototype.GetAnchorB = function() {
        return null
    };
    u.prototype.GetReactionForce =
        function(a) {
            return null
        };
    u.prototype.GetReactionTorque = function(a) {
        return 0
    };
    u.prototype.GetBodyA = function() {
        return this.m_bodyA
    };
    u.prototype.GetBodyB = function() {
        return this.m_bodyB
    };
    u.prototype.GetNext = function() {
        return this.m_next
    };
    u.prototype.GetUserData = function() {
        return this.m_userData
    };
    u.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    u.prototype.IsActive = function() {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
    };
    u.Create = function(b, c) {
        var d = null;
        switch (b.type) {
            case u.e_distanceJoint:
                d =
                    new p(b instanceof a ? b : null);
                break;
            case u.e_mouseJoint:
                d = new w(b instanceof H ? b : null);
                break;
            case u.e_prismaticJoint:
                d = new D(b instanceof N ? b : null);
                break;
            case u.e_revoluteJoint:
                d = new K(b instanceof M ? b : null);
                break;
            case u.e_pulleyJoint:
                d = new F(b instanceof P ? b : null);
                break;
            case u.e_gearJoint:
                d = new v(b instanceof t ? b : null);
                break;
            case u.e_lineJoint:
                d = new e(b instanceof y ? b : null);
                break;
            case u.e_weldJoint:
                d = new J(b instanceof L ? b : null);
                break;
            case u.e_frictionJoint:
                d = new m(b instanceof A ? b : null)
        }
        return d
    };
    u.Destroy = function(a, b) {};
    u.prototype.b2Joint = function(a) {
        b.b2Assert(a.bodyA != a.bodyB);
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_bodyA = a.bodyA;
        this.m_bodyB = a.bodyB;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData
    };
    u.prototype.InitVelocityConstraints = function(a) {};
    u.prototype.SolveVelocityConstraints = function(a) {};
    u.prototype.FinalizeVelocityConstraints = function() {};
    u.prototype.SolvePositionConstraints = function(a) {
        return !1
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2Joint.e_unknownJoint =
            0;
        Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
        Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
        Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
        Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
        Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
        Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
        Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
        Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
        Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
        Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
        Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit =
            1;
        Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
        Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
    });
    E.b2JointDef = function() {};
    E.prototype.b2JointDef = function() {
        this.type = u.e_unknownJoint;
        this.bodyB = this.bodyA = this.userData = null;
        this.collideConnected = !1
    };
    z.b2JointEdge = function() {};
    Box2D.inherit(e, Box2D.Dynamics.Joints.b2Joint);
    e.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    e.b2LineJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 =
            new g;
        this.m_localXAxis1 = new g;
        this.m_localYAxis1 = new g;
        this.m_axis = new g;
        this.m_perp = new g;
        this.m_K = new k;
        this.m_impulse = new g
    };
    e.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    e.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    e.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y +
            (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
    };
    e.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    e.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2),
            b = d.x - c.x,
            c = d.y - c.y,
            a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    e.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            g = c.col1.x * d + c.col2.x * e,
            e = c.col1.y * d + c.col2.y * e,
            d = g;
        c = b.m_xf.R;
        var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - b.m_sweep.localCenter.y,
            g = c.col1.x * h + c.col2.x * f,
            f = c.col1.y * h + c.col2.y * f,
            h = g;
        c = b.m_sweep.c.x + h - (a.m_sweep.c.x + d);
        var g = b.m_sweep.c.y + f - (a.m_sweep.c.y + e),
            l = a.GetWorldVector(this.m_localXAxis1),
            k = a.m_linearVelocity,
            m = b.m_linearVelocity,
            a = a.m_angularVelocity,
            b = b.m_angularVelocity;
        return c * -a * l.y + g * a * l.x + (l.x * (m.x + -b *
            f - k.x - -a * e) + l.y * (m.y + b * h - k.y - a * d))
    };
    e.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    e.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    e.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    e.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    e.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation =
            b
    };
    e.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    e.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    e.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    e.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    e.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce =
            a
    };
    e.prototype.GetMaxMotorForce = function() {
        return this.m_maxMotorForce
    };
    e.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    e.prototype.b2LineJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce = a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = u.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    e.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            e = this.m_bodyB,
            g, h = 0;
        this.m_localCenterA.SetV(c.GetLocalCenter());
        this.m_localCenterB.SetV(e.GetLocalCenter());
        var k = c.GetTransform();
        e.GetTransform();
        g = c.m_xf.R;
        var m = this.m_localAnchor1.x -
            this.m_localCenterA.x,
            f = this.m_localAnchor1.y - this.m_localCenterA.y,
            h = g.col1.x * m + g.col2.x * f,
            f = g.col1.y * m + g.col2.y * f,
            m = h;
        g = e.m_xf.R;
        var l = this.m_localAnchor2.x - this.m_localCenterB.x,
            p = this.m_localAnchor2.y - this.m_localCenterB.y,
            h = g.col1.x * l + g.col2.x * p,
            p = g.col1.y * l + g.col2.y * p,
            l = h;
        g = e.m_sweep.c.x + l - c.m_sweep.c.x - m;
        h = e.m_sweep.c.y + p - c.m_sweep.c.y - f;
        this.m_invMassA = c.m_invMass;
        this.m_invMassB = e.m_invMass;
        this.m_invIA = c.m_invI;
        this.m_invIB = e.m_invI;
        this.m_axis.SetV(d.MulMV(k.R, this.m_localXAxis1));
        this.m_a1 =
            (g + m) * this.m_axis.y - (h + f) * this.m_axis.x;
        this.m_a2 = l * this.m_axis.y - p * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
        this.m_perp.SetV(d.MulMV(k.R, this.m_localYAxis1));
        this.m_s1 = (g + m) * this.m_perp.y - (h + f) * this.m_perp.x;
        this.m_s2 = l * this.m_perp.y - p * this.m_perp.x;
        k = this.m_invMassA;
        m = this.m_invMassB;
        f = this.m_invIA;
        l = this.m_invIB;
        this.m_K.col1.x = k + m + f * this.m_s1 *
            this.m_s1 + l * this.m_s2 * this.m_s2;
        this.m_K.col1.y = f * this.m_s1 * this.m_a1 + l * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = k + m + f * this.m_a1 * this.m_a1 + l * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * h, d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = u.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != u.e_atLowerLimit && (this.m_limitState = u.e_atLowerLimit, this.m_impulse.y = 0) : g >= this.m_upperTranslation ? this.m_limitState !=
            u.e_atUpperLimit && (this.m_limitState = u.e_atUpperLimit, this.m_impulse.y = 0) : (this.m_limitState = u.e_inactiveLimit, this.m_impulse.y = 0)) : this.m_limitState = u.e_inactiveLimit;
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, h = this.m_impulse.x *
            this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, k = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, c.m_linearVelocity.x -= this.m_invMassA * a, c.m_linearVelocity.y -= this.m_invMassA * g, c.m_angularVelocity -= this.m_invIA * h, e.m_linearVelocity.x += this.m_invMassB * a, e.m_linearVelocity.y += this.m_invMassB * g, e.m_angularVelocity += this.m_invIB * k) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    e.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            e = b.m_linearVelocity,
            h = b.m_angularVelocity,
            k = c.m_linearVelocity,
            m = c.m_angularVelocity,
            f = 0,
            l = 0,
            p = 0,
            t = 0;
        this.m_enableMotor && this.m_limitState != u.e_equalLimits && (t = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (k.x - e.x) + this.m_axis.y * (k.y - e.y) + this.m_a2 * m - this.m_a1 * h)), f = this.m_motorImpulse, l = a.dt * this.m_maxMotorForce, this.m_motorImpulse = d.Clamp(this.m_motorImpulse + t, -l, l), t = this.m_motorImpulse - f, f = t * this.m_axis.x, l = t * this.m_axis.y, p = t * this.m_a1, t *= this.m_a2, e.x -= this.m_invMassA * f, e.y -= this.m_invMassA *
            l, h -= this.m_invIA * p, k.x += this.m_invMassB * f, k.y += this.m_invMassB * l, m += this.m_invIB * t);
        l = this.m_perp.x * (k.x - e.x) + this.m_perp.y * (k.y - e.y) + this.m_s2 * m - this.m_s1 * h;
        this.m_enableLimit && this.m_limitState != u.e_inactiveLimit ? (p = this.m_axis.x * (k.x - e.x) + this.m_axis.y * (k.y - e.y) + this.m_a2 * m - this.m_a1 * h, f = this.m_impulse.Copy(), a = this.m_K.Solve(new g, -l, -p), this.m_impulse.Add(a), this.m_limitState == u.e_atLowerLimit ? this.m_impulse.y = d.Max(this.m_impulse.y, 0) : this.m_limitState == u.e_atUpperLimit && (this.m_impulse.y =
            d.Min(this.m_impulse.y, 0)), l = -l - (this.m_impulse.y - f.y) * this.m_K.col2.x, p = 0, p = 0 != this.m_K.col1.x ? l / this.m_K.col1.x + f.x : f.x, this.m_impulse.x = p, a.x = this.m_impulse.x - f.x, a.y = this.m_impulse.y - f.y, f = a.x * this.m_perp.x + a.y * this.m_axis.x, l = a.x * this.m_perp.y + a.y * this.m_axis.y, p = a.x * this.m_s1 + a.y * this.m_a1, t = a.x * this.m_s2 + a.y * this.m_a2) : (a = 0, a = 0 != this.m_K.col1.x ? -l / this.m_K.col1.x : 0, this.m_impulse.x += a, f = a * this.m_perp.x, l = a * this.m_perp.y, p = a * this.m_s1, t = a * this.m_s2);
        e.x -= this.m_invMassA * f;
        e.y -= this.m_invMassA *
            l;
        h -= this.m_invIA * p;
        k.x += this.m_invMassB * f;
        k.y += this.m_invMassB * l;
        m += this.m_invIB * t;
        b.m_linearVelocity.SetV(e);
        b.m_angularVelocity = h;
        c.m_linearVelocity.SetV(k);
        c.m_angularVelocity = m
    };
    e.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB,
            e = a.m_sweep.c,
            h = a.m_sweep.a,
            m = c.m_sweep.c,
            p = c.m_sweep.a,
            u, f = 0,
            l = 0,
            t = 0,
            v = 0,
            w = u = 0,
            x = 0,
            l = !1,
            y = 0,
            z = k.FromAngle(h),
            t = k.FromAngle(p);
        u = z;
        var x = this.m_localAnchor1.x - this.m_localCenterA.x,
            A = this.m_localAnchor1.y - this.m_localCenterA.y,
            f = u.col1.x *
            x + u.col2.x * A,
            A = u.col1.y * x + u.col2.y * A,
            x = f;
        u = t;
        t = this.m_localAnchor2.x - this.m_localCenterB.x;
        v = this.m_localAnchor2.y - this.m_localCenterB.y;
        f = u.col1.x * t + u.col2.x * v;
        v = u.col1.y * t + u.col2.y * v;
        t = f;
        u = m.x + t - e.x - x;
        f = m.y + v - e.y - A;
        if (this.m_enableLimit) {
            this.m_axis = d.MulMV(z, this.m_localXAxis1);
            this.m_a1 = (u + x) * this.m_axis.y - (f + A) * this.m_axis.x;
            this.m_a2 = t * this.m_axis.y - v * this.m_axis.x;
            var D = this.m_axis.x * u + this.m_axis.y * f;
            d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? (y = d.Clamp(D, -b.b2_maxLinearCorrection,
                b.b2_maxLinearCorrection), w = d.Abs(D), l = !0) : D <= this.m_lowerTranslation ? (y = d.Clamp(D - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), w = this.m_lowerTranslation - D, l = !0) : D >= this.m_upperTranslation && (y = d.Clamp(D - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), w = D - this.m_upperTranslation, l = !0)
        }
        this.m_perp = d.MulMV(z, this.m_localYAxis1);
        this.m_s1 = (u + x) * this.m_perp.y - (f + A) * this.m_perp.x;
        this.m_s2 = t * this.m_perp.y - v * this.m_perp.x;
        z = new g;
        A = this.m_perp.x * u + this.m_perp.y *
            f;
        w = d.Max(w, d.Abs(A));
        x = 0;
        l ? (l = this.m_invMassA, t = this.m_invMassB, v = this.m_invIA, u = this.m_invIB, this.m_K.col1.x = l + t + v * this.m_s1 * this.m_s1 + u * this.m_s2 * this.m_s2, this.m_K.col1.y = v * this.m_s1 * this.m_a1 + u * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = l + t + v * this.m_a1 * this.m_a1 + u * this.m_a2 * this.m_a2, this.m_K.Solve(z, -A, -y)) : (l = this.m_invMassA, t = this.m_invMassB, v = this.m_invIA, u = this.m_invIB, y = l + t + v * this.m_s1 * this.m_s1 + u * this.m_s2 * this.m_s2, z.x = 0 != y ? -A / y : 0, z.y = 0);
        y = z.x * this.m_perp.x + z.y *
            this.m_axis.x;
        l = z.x * this.m_perp.y + z.y * this.m_axis.y;
        A = z.x * this.m_s1 + z.y * this.m_a1;
        z = z.x * this.m_s2 + z.y * this.m_a2;
        e.x -= this.m_invMassA * y;
        e.y -= this.m_invMassA * l;
        h -= this.m_invIA * A;
        m.x += this.m_invMassB * y;
        m.y += this.m_invMassB * l;
        p += this.m_invIB * z;
        a.m_sweep.a = h;
        c.m_sweep.a = p;
        a.SynchronizeTransform();
        c.SynchronizeTransform();
        return w <= b.b2_linearSlop && x <= b.b2_angularSlop
    };
    Box2D.inherit(y, Box2D.Dynamics.Joints.b2JointDef);
    y.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    y.b2LineJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new g;
        this.localAnchorB = new g;
        this.localAxisA = new g
    };
    y.prototype.b2LineJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_lineJoint;
        this.localAxisA.Set(1, 0);
        this.enableLimit = !1;
        this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = !1;
        this.motorSpeed = this.maxMotorForce = 0
    };
    y.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA =
            this.bodyA.GetLocalVector(d)
    };
    Box2D.inherit(w, Box2D.Dynamics.Joints.b2Joint);
    w.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    w.b2MouseJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new k;
        this.K1 = new k;
        this.K2 = new k;
        this.m_localAnchor = new g;
        this.m_target = new g;
        this.m_impulse = new g;
        this.m_mass = new k;
        this.m_C = new g
    };
    w.prototype.GetAnchorA = function() {
        return this.m_target
    };
    w.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    w.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    w.prototype.GetReactionTorque = function(a) {
        return 0
    };
    w.prototype.GetTarget = function() {
        return this.m_target
    };
    w.prototype.SetTarget = function(a) {
        0 == this.m_bodyB.IsAwake() && this.m_bodyB.SetAwake(!0);
        this.m_target = a
    };
    w.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    w.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    w.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    w.prototype.SetFrequency = function(a) {
        void 0 === a && (a = 0);
        this.m_frequencyHz = a
    };
    w.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    w.prototype.SetDampingRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_dampingRatio = a
    };
    w.prototype.b2MouseJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_target.SetV(a.target);
        var b = this.m_target.x - this.m_bodyB.m_xf.position.x,
            c = this.m_target.y - this.m_bodyB.m_xf.position.y,
            d = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = b * d.col1.x + c * d.col1.y;
        this.m_localAnchor.y =
            b * d.col2.x + c * d.col2.y;
        this.m_maxForce = a.maxForce;
        this.m_impulse.SetZero();
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_gamma = this.m_beta = 0
    };
    w.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyB,
            c = b.GetMass(),
            d = 2 * Math.PI * this.m_frequencyHz,
            e = c * d * d;
        this.m_gamma = a.dt * (2 * c * this.m_dampingRatio * d + a.dt * e);
        this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
        this.m_beta = a.dt * e * this.m_gamma;
        var e = b.m_xf.R,
            c = this.m_localAnchor.x - b.m_sweep.localCenter.x,
            d = this.m_localAnchor.y -
            b.m_sweep.localCenter.y,
            g = e.col1.x * c + e.col2.x * d,
            d = e.col1.y * c + e.col2.y * d,
            c = g,
            e = b.m_invMass,
            g = b.m_invI;
        this.K1.col1.x = e;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = e;
        this.K2.col1.x = g * d * d;
        this.K2.col2.x = -g * c * d;
        this.K2.col1.y = -g * c * d;
        this.K2.col2.y = g * c * c;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.GetInverse(this.m_mass);
        this.m_C.x = b.m_sweep.c.x + c - this.m_target.x;
        this.m_C.y = b.m_sweep.c.y + d - this.m_target.y;
        b.m_angularVelocity *= .98;
        this.m_impulse.x *=
            a.dtRatio;
        this.m_impulse.y *= a.dtRatio;
        b.m_linearVelocity.x += e * this.m_impulse.x;
        b.m_linearVelocity.y += e * this.m_impulse.y;
        b.m_angularVelocity += g * (c * this.m_impulse.y - d * this.m_impulse.x)
    };
    w.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyB,
            c, d = 0,
            e = 0;
        c = b.m_xf.R;
        var g = this.m_localAnchor.x - b.m_sweep.localCenter.x,
            h = this.m_localAnchor.y - b.m_sweep.localCenter.y,
            d = c.col1.x * g + c.col2.x * h,
            h = c.col1.y * g + c.col2.y * h,
            g = d,
            d = b.m_linearVelocity.x + -b.m_angularVelocity * h,
            f = b.m_linearVelocity.y + b.m_angularVelocity *
            g;
        c = this.m_mass;
        d = d + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
        e = f + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        f = -(c.col1.x * d + c.col2.x * e);
        e = -(c.col1.y * d + c.col2.y * e);
        c = this.m_impulse.x;
        d = this.m_impulse.y;
        this.m_impulse.x += f;
        this.m_impulse.y += e;
        a = a.dt * this.m_maxForce;
        this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
        f = this.m_impulse.x - c;
        e = this.m_impulse.y - d;
        b.m_linearVelocity.x += b.m_invMass * f;
        b.m_linearVelocity.y += b.m_invMass * e;
        b.m_angularVelocity +=
            b.m_invI * (g * e - h * f)
    };
    w.prototype.SolvePositionConstraints = function(a) {
        return !0
    };
    Box2D.inherit(H, Box2D.Dynamics.Joints.b2JointDef);
    H.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    H.b2MouseJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.target = new g
    };
    H.prototype.b2MouseJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_mouseJoint;
        this.maxForce = 0;
        this.frequencyHz = 5;
        this.dampingRatio = .7
    };
    Box2D.inherit(D, Box2D.Dynamics.Joints.b2Joint);
    D.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    D.b2PrismaticJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 = new g;
        this.m_localXAxis1 = new g;
        this.m_localYAxis1 = new g;
        this.m_axis = new g;
        this.m_perp = new g;
        this.m_K = new h;
        this.m_impulse = new c
    };
    D.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    D.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    D.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
    };
    D.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    D.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2),
            b = d.x - c.x,
            c = d.y - c.y,
            a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    D.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            g = c.col1.x * d + c.col2.x * e,
            e = c.col1.y * d + c.col2.y * e,
            d = g;
        c = b.m_xf.R;
        var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - b.m_sweep.localCenter.y,
            g = c.col1.x * h + c.col2.x * f,
            f = c.col1.y * h + c.col2.y * f,
            h = g;
        c = b.m_sweep.c.x + h - (a.m_sweep.c.x +
            d);
        var g = b.m_sweep.c.y + f - (a.m_sweep.c.y + e),
            l = a.GetWorldVector(this.m_localXAxis1),
            k = a.m_linearVelocity,
            m = b.m_linearVelocity,
            a = a.m_angularVelocity,
            b = b.m_angularVelocity;
        return c * -a * l.y + g * a * l.x + (l.x * (m.x + -b * f - k.x - -a * e) + l.y * (m.y + b * h - k.y - a * d))
    };
    D.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    D.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    D.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    D.prototype.GetUpperLimit =
        function() {
            return this.m_upperTranslation
        };
    D.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation = b
    };
    D.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    D.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    D.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    D.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    D.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce = a
    };
    D.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    D.prototype.b2PrismaticJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_refAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce = a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = u.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    D.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            e = this.m_bodyB,
            g, h = 0;
        this.m_localCenterA.SetV(c.GetLocalCenter());
        this.m_localCenterB.SetV(e.GetLocalCenter());
        var k = c.GetTransform();
        e.GetTransform();
        g = c.m_xf.R;
        var m = this.m_localAnchor1.x - this.m_localCenterA.x,
            f = this.m_localAnchor1.y - this.m_localCenterA.y,
            h = g.col1.x * m + g.col2.x * f,
            f = g.col1.y * m + g.col2.y * f,
            m = h;
        g = e.m_xf.R;
        var l = this.m_localAnchor2.x - this.m_localCenterB.x,
            p = this.m_localAnchor2.y - this.m_localCenterB.y,
            h = g.col1.x * l + g.col2.x * p,
            p = g.col1.y * l + g.col2.y * p,
            l = h;
        g = e.m_sweep.c.x + l - c.m_sweep.c.x -
            m;
        h = e.m_sweep.c.y + p - c.m_sweep.c.y - f;
        this.m_invMassA = c.m_invMass;
        this.m_invMassB = e.m_invMass;
        this.m_invIA = c.m_invI;
        this.m_invIB = e.m_invI;
        this.m_axis.SetV(d.MulMV(k.R, this.m_localXAxis1));
        this.m_a1 = (g + m) * this.m_axis.y - (h + f) * this.m_axis.x;
        this.m_a2 = l * this.m_axis.y - p * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass);
        this.m_perp.SetV(d.MulMV(k.R, this.m_localYAxis1));
        this.m_s1 = (g + m) * this.m_perp.y - (h + f) * this.m_perp.x;
        this.m_s2 = l * this.m_perp.y - p * this.m_perp.x;
        k = this.m_invMassA;
        m = this.m_invMassB;
        f = this.m_invIA;
        l = this.m_invIB;
        this.m_K.col1.x = k + m + f * this.m_s1 * this.m_s1 + l * this.m_s2 * this.m_s2;
        this.m_K.col1.y = f * this.m_s1 + l * this.m_s2;
        this.m_K.col1.z = f * this.m_s1 * this.m_a1 + l * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = f + l;
        this.m_K.col2.z = f * this.m_a1 + l * this.m_a2;
        this.m_K.col3.x = this.m_K.col1.z;
        this.m_K.col3.y = this.m_K.col2.z;
        this.m_K.col3.z = k + m + f * this.m_a1 *
            this.m_a1 + l * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * h, d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = u.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != u.e_atLowerLimit && (this.m_limitState = u.e_atLowerLimit, this.m_impulse.z = 0) : g >= this.m_upperTranslation ? this.m_limitState != u.e_atUpperLimit && (this.m_limitState = u.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = u.e_inactiveLimit, this.m_impulse.z = 0)) : this.m_limitState =
            u.e_inactiveLimit;
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, k = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse +
            this.m_impulse.z) * this.m_a2, c.m_linearVelocity.x -= this.m_invMassA * a, c.m_linearVelocity.y -= this.m_invMassA * g, c.m_angularVelocity -= this.m_invIA * h, e.m_linearVelocity.x += this.m_invMassB * a, e.m_linearVelocity.y += this.m_invMassB * g, e.m_angularVelocity += this.m_invIB * k) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    D.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            e = this.m_bodyB,
            h = b.m_linearVelocity,
            k = b.m_angularVelocity,
            m = e.m_linearVelocity,
            p = e.m_angularVelocity,
            f = 0,
            l = 0,
            t = 0,
            v = 0;
        this.m_enableMotor &&
            this.m_limitState != u.e_equalLimits && (v = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (m.x - h.x) + this.m_axis.y * (m.y - h.y) + this.m_a2 * p - this.m_a1 * k)), f = this.m_motorImpulse, a = a.dt * this.m_maxMotorForce, this.m_motorImpulse = d.Clamp(this.m_motorImpulse + v, -a, a), v = this.m_motorImpulse - f, f = v * this.m_axis.x, l = v * this.m_axis.y, t = v * this.m_a1, v *= this.m_a2, h.x -= this.m_invMassA * f, h.y -= this.m_invMassA * l, k -= this.m_invIA * t, m.x += this.m_invMassB * f, m.y += this.m_invMassB * l, p += this.m_invIB * v);
        t = this.m_perp.x * (m.x - h.x) + this.m_perp.y *
            (m.y - h.y) + this.m_s2 * p - this.m_s1 * k;
        l = p - k;
        this.m_enableLimit && this.m_limitState != u.e_inactiveLimit ? (a = this.m_axis.x * (m.x - h.x) + this.m_axis.y * (m.y - h.y) + this.m_a2 * p - this.m_a1 * k, f = this.m_impulse.Copy(), a = this.m_K.Solve33(new c, -t, -l, -a), this.m_impulse.Add(a), this.m_limitState == u.e_atLowerLimit ? this.m_impulse.z = d.Max(this.m_impulse.z, 0) : this.m_limitState == u.e_atUpperLimit && (this.m_impulse.z = d.Min(this.m_impulse.z, 0)), t = -t - (this.m_impulse.z - f.z) * this.m_K.col3.x, l = -l - (this.m_impulse.z - f.z) * this.m_K.col3.y,
            l = this.m_K.Solve22(new g, t, l), l.x += f.x, l.y += f.y, this.m_impulse.x = l.x, this.m_impulse.y = l.y, a.x = this.m_impulse.x - f.x, a.y = this.m_impulse.y - f.y, a.z = this.m_impulse.z - f.z, f = a.x * this.m_perp.x + a.z * this.m_axis.x, l = a.x * this.m_perp.y + a.z * this.m_axis.y, t = a.x * this.m_s1 + a.y + a.z * this.m_a1, v = a.x * this.m_s2 + a.y + a.z * this.m_a2) : (a = this.m_K.Solve22(new g, -t, -l), this.m_impulse.x += a.x, this.m_impulse.y += a.y, f = a.x * this.m_perp.x, l = a.x * this.m_perp.y, t = a.x * this.m_s1 + a.y, v = a.x * this.m_s2 + a.y);
        h.x -= this.m_invMassA * f;
        h.y -= this.m_invMassA *
            l;
        k -= this.m_invIA * t;
        m.x += this.m_invMassB * f;
        m.y += this.m_invMassB * l;
        p += this.m_invIB * v;
        b.m_linearVelocity.SetV(h);
        b.m_angularVelocity = k;
        e.m_linearVelocity.SetV(m);
        e.m_angularVelocity = p
    };
    D.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var e = this.m_bodyB,
            h = a.m_sweep.c,
            m = a.m_sweep.a,
            p = e.m_sweep.c,
            u = e.m_sweep.a,
            t, f = 0,
            l = 0,
            v = 0,
            w = f = t = 0,
            x = 0,
            l = !1,
            y = 0,
            z = k.FromAngle(m),
            A = k.FromAngle(u);
        t = z;
        var x = this.m_localAnchor1.x - this.m_localCenterA.x,
            D = this.m_localAnchor1.y - this.m_localCenterA.y,
            f = t.col1.x *
            x + t.col2.x * D,
            D = t.col1.y * x + t.col2.y * D,
            x = f;
        t = A;
        A = this.m_localAnchor2.x - this.m_localCenterB.x;
        v = this.m_localAnchor2.y - this.m_localCenterB.y;
        f = t.col1.x * A + t.col2.x * v;
        v = t.col1.y * A + t.col2.y * v;
        A = f;
        t = p.x + A - h.x - x;
        f = p.y + v - h.y - D;
        if (this.m_enableLimit) {
            this.m_axis = d.MulMV(z, this.m_localXAxis1);
            this.m_a1 = (t + x) * this.m_axis.y - (f + D) * this.m_axis.x;
            this.m_a2 = A * this.m_axis.y - v * this.m_axis.x;
            var E = this.m_axis.x * t + this.m_axis.y * f;
            d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? (y = d.Clamp(E, -b.b2_maxLinearCorrection,
                b.b2_maxLinearCorrection), w = d.Abs(E), l = !0) : E <= this.m_lowerTranslation ? (y = d.Clamp(E - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), w = this.m_lowerTranslation - E, l = !0) : E >= this.m_upperTranslation && (y = d.Clamp(E - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), w = E - this.m_upperTranslation, l = !0)
        }
        this.m_perp = d.MulMV(z, this.m_localYAxis1);
        this.m_s1 = (t + x) * this.m_perp.y - (f + D) * this.m_perp.x;
        this.m_s2 = A * this.m_perp.y - v * this.m_perp.x;
        z = new c;
        D = this.m_perp.x * t + this.m_perp.y *
            f;
        A = u - m - this.m_refAngle;
        w = d.Max(w, d.Abs(D));
        x = d.Abs(A);
        l ? (l = this.m_invMassA, v = this.m_invMassB, t = this.m_invIA, f = this.m_invIB, this.m_K.col1.x = l + v + t * this.m_s1 * this.m_s1 + f * this.m_s2 * this.m_s2, this.m_K.col1.y = t * this.m_s1 + f * this.m_s2, this.m_K.col1.z = t * this.m_s1 * this.m_a1 + f * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = t + f, this.m_K.col2.z = t * this.m_a1 + f * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = l + v + t * this.m_a1 * this.m_a1 + f * this.m_a2 * this.m_a2,
            this.m_K.Solve33(z, -D, -A, -y)) : (l = this.m_invMassA, v = this.m_invMassB, t = this.m_invIA, f = this.m_invIB, y = t * this.m_s1 + f * this.m_s2, E = t + f, this.m_K.col1.Set(l + v + t * this.m_s1 * this.m_s1 + f * this.m_s2 * this.m_s2, y, 0), this.m_K.col2.Set(y, E, 0), y = this.m_K.Solve22(new g, -D, -A), z.x = y.x, z.y = y.y, z.z = 0);
        y = z.x * this.m_perp.x + z.z * this.m_axis.x;
        l = z.x * this.m_perp.y + z.z * this.m_axis.y;
        D = z.x * this.m_s1 + z.y + z.z * this.m_a1;
        z = z.x * this.m_s2 + z.y + z.z * this.m_a2;
        h.x -= this.m_invMassA * y;
        h.y -= this.m_invMassA * l;
        m -= this.m_invIA * D;
        p.x += this.m_invMassB *
            y;
        p.y += this.m_invMassB * l;
        u += this.m_invIB * z;
        a.m_sweep.a = m;
        e.m_sweep.a = u;
        a.SynchronizeTransform();
        e.SynchronizeTransform();
        return w <= b.b2_linearSlop && x <= b.b2_angularSlop
    };
    Box2D.inherit(N, Box2D.Dynamics.Joints.b2JointDef);
    N.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    N.b2PrismaticJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new g;
        this.localAnchorB = new g;
        this.localAxisA = new g
    };
    N.prototype.b2PrismaticJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_prismaticJoint;
        this.localAxisA.Set(1, 0);
        this.referenceAngle = 0;
        this.enableLimit = !1;
        this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = !1;
        this.motorSpeed = this.maxMotorForce = 0
    };
    N.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA = this.bodyA.GetLocalVector(d);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(F, Box2D.Dynamics.Joints.b2Joint);
    F.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    F.b2PulleyJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new g;
        this.m_groundAnchor2 = new g;
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 = new g;
        this.m_u1 = new g;
        this.m_u2 = new g
    };
    F.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    F.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    F.prototype.GetReactionForce = function(a) {
        void 0 ===
            a && (a = 0);
        return new g(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
    };
    F.prototype.GetReactionTorque = function(a) {
        return 0
    };
    F.prototype.GetGroundAnchorA = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor1);
        return a
    };
    F.prototype.GetGroundAnchorB = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor2);
        return a
    };
    F.prototype.GetLength1 = function() {
        var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x),
            a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
        return Math.sqrt(b * b + a * a)
    };
    F.prototype.GetLength2 = function() {
        var a = this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x),
            a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
        return Math.sqrt(b * b + a * a)
    };
    F.prototype.GetRatio = function() {
        return this.m_ratio
    };
    F.prototype.b2PulleyJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_ground = this.m_bodyA.m_world.m_groundBody;
        this.m_groundAnchor1.x =
            a.groundAnchorA.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor1.y = a.groundAnchorA.y - this.m_ground.m_xf.position.y;
        this.m_groundAnchor2.x = a.groundAnchorB.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor2.y = a.groundAnchorB.y - this.m_ground.m_xf.position.y;
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_ratio = a.ratio;
        this.m_constant = a.lengthA + this.m_ratio * a.lengthB;
        this.m_maxLength1 = d.Min(a.maxLengthA, this.m_constant - this.m_ratio * F.b2_minPulleyLength);
        this.m_maxLength2 = d.Min(a.maxLengthB, (this.m_constant - F.b2_minPulleyLength) / this.m_ratio);
        this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
    };
    F.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            d = this.m_bodyB,
            e;
        e = c.m_xf.R;
        var g = this.m_localAnchor1.x - c.m_sweep.localCenter.x,
            h = this.m_localAnchor1.y - c.m_sweep.localCenter.y,
            k = e.col1.x * g + e.col2.x * h,
            h = e.col1.y * g + e.col2.y * h,
            g = k;
        e = d.m_xf.R;
        var f = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - d.m_sweep.localCenter.y,
            k = e.col1.x * f + e.col2.x * l,
            l = e.col1.y * f + e.col2.y * l,
            f = k;
        e = d.m_sweep.c.x + f;
        var k = d.m_sweep.c.y + l,
            m = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            p = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(c.m_sweep.c.x + g - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), c.m_sweep.c.y + h - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
        this.m_u2.Set(e - m, k - p);
        e = this.m_u1.Length();
        k = this.m_u2.Length();
        e > b.b2_linearSlop ? this.m_u1.Multiply(1 / e) : this.m_u1.SetZero();
        k > b.b2_linearSlop ?
            this.m_u2.Multiply(1 / k) : this.m_u2.SetZero();
        0 < this.m_constant - e - this.m_ratio * k ? (this.m_state = u.e_inactiveLimit, this.m_impulse = 0) : this.m_state = u.e_atUpperLimit;
        e < this.m_maxLength1 ? (this.m_limitState1 = u.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = u.e_atUpperLimit;
        k < this.m_maxLength2 ? (this.m_limitState2 = u.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = u.e_atUpperLimit;
        e = g * this.m_u1.y - h * this.m_u1.x;
        k = f * this.m_u2.y - l * this.m_u2.x;
        this.m_limitMass1 = c.m_invMass + c.m_invI * e * e;
        this.m_limitMass2 =
            d.m_invMass + d.m_invI * k * k;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1 / this.m_limitMass1;
        this.m_limitMass2 = 1 / this.m_limitMass2;
        this.m_pulleyMass = 1 / this.m_pulleyMass;
        a.warmStarting ? (this.m_impulse *= a.dtRatio, this.m_limitImpulse1 *= a.dtRatio, this.m_limitImpulse2 *= a.dtRatio, a = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, e = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, k = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, m = (-this.m_ratio *
            this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, c.m_linearVelocity.x += c.m_invMass * a, c.m_linearVelocity.y += c.m_invMass * e, c.m_angularVelocity += c.m_invI * (g * e - h * a), d.m_linearVelocity.x += d.m_invMass * k, d.m_linearVelocity.y += d.m_invMass * m, d.m_angularVelocity += d.m_invI * (f * m - l * k)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
    };
    F.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var e = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y -
            a.m_sweep.localCenter.y,
            h = c.col1.x * e + c.col2.x * g,
            g = c.col1.y * e + c.col2.y * g,
            e = h;
        c = b.m_xf.R;
        var k = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - b.m_sweep.localCenter.y,
            h = c.col1.x * k + c.col2.x * f,
            f = c.col1.y * k + c.col2.y * f,
            k = h,
            l = h = c = 0,
            m = 0;
        c = m = c = m = l = h = c = 0;
        this.m_state == u.e_atUpperLimit && (c = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * e, l = b.m_linearVelocity.x + -b.m_angularVelocity * f, m = b.m_linearVelocity.y + b.m_angularVelocity * k, c = -(this.m_u1.x * c + this.m_u1.y *
            h) - this.m_ratio * (this.m_u2.x * l + this.m_u2.y * m), m = this.m_pulleyMass * -c, c = this.m_impulse, this.m_impulse = d.Max(0, this.m_impulse + m), m = this.m_impulse - c, c = -m * this.m_u1.x, h = -m * this.m_u1.y, l = -this.m_ratio * m * this.m_u2.x, m = -this.m_ratio * m * this.m_u2.y, a.m_linearVelocity.x += a.m_invMass * c, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (e * h - g * c), b.m_linearVelocity.x += b.m_invMass * l, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (k * m - f * l));
        this.m_limitState1 == u.e_atUpperLimit &&
            (c = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * e, c = -(this.m_u1.x * c + this.m_u1.y * h), m = -this.m_limitMass1 * c, c = this.m_limitImpulse1, this.m_limitImpulse1 = d.Max(0, this.m_limitImpulse1 + m), m = this.m_limitImpulse1 - c, c = -m * this.m_u1.x, h = -m * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * c, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (e * h - g * c));
        this.m_limitState2 == u.e_atUpperLimit && (l = b.m_linearVelocity.x + -b.m_angularVelocity * f, m = b.m_linearVelocity.y +
            b.m_angularVelocity * k, c = -(this.m_u2.x * l + this.m_u2.y * m), m = -this.m_limitMass2 * c, c = this.m_limitImpulse2, this.m_limitImpulse2 = d.Max(0, this.m_limitImpulse2 + m), m = this.m_limitImpulse2 - c, l = -m * this.m_u2.x, m = -m * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * l, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (k * m - f * l))
    };
    F.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB,
            e, g = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            h = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            k = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            m = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
            f = 0,
            l = 0,
            p = 0,
            t = 0,
            v = e = 0,
            w = 0,
            x = 0,
            y = v = x = e = v = e = 0;
        this.m_state == u.e_atUpperLimit && (e = a.m_xf.R, f = this.m_localAnchor1.x - a.m_sweep.localCenter.x, l = this.m_localAnchor1.y - a.m_sweep.localCenter.y, v = e.col1.x * f + e.col2.x * l, l = e.col1.y * f + e.col2.y * l, f = v, e = c.m_xf.R, p = this.m_localAnchor2.x - c.m_sweep.localCenter.x, t = this.m_localAnchor2.y - c.m_sweep.localCenter.y, v = e.col1.x * p + e.col2.x * t, t = e.col1.y * p + e.col2.y * t,
            p = v, e = a.m_sweep.c.x + f, v = a.m_sweep.c.y + l, w = c.m_sweep.c.x + p, x = c.m_sweep.c.y + t, this.m_u1.Set(e - g, v - h), this.m_u2.Set(w - k, x - m), e = this.m_u1.Length(), v = this.m_u2.Length(), e > b.b2_linearSlop ? this.m_u1.Multiply(1 / e) : this.m_u1.SetZero(), v > b.b2_linearSlop ? this.m_u2.Multiply(1 / v) : this.m_u2.SetZero(), e = this.m_constant - e - this.m_ratio * v, y = d.Max(y, -e), e = d.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), x = -this.m_pulleyMass * e, e = -x * this.m_u1.x, v = -x * this.m_u1.y, w = -this.m_ratio * x * this.m_u2.x, x = -this.m_ratio * x * this.m_u2.y,
            a.m_sweep.c.x += a.m_invMass * e, a.m_sweep.c.y += a.m_invMass * v, a.m_sweep.a += a.m_invI * (f * v - l * e), c.m_sweep.c.x += c.m_invMass * w, c.m_sweep.c.y += c.m_invMass * x, c.m_sweep.a += c.m_invI * (p * x - t * w), a.SynchronizeTransform(), c.SynchronizeTransform());
        this.m_limitState1 == u.e_atUpperLimit && (e = a.m_xf.R, f = this.m_localAnchor1.x - a.m_sweep.localCenter.x, l = this.m_localAnchor1.y - a.m_sweep.localCenter.y, v = e.col1.x * f + e.col2.x * l, l = e.col1.y * f + e.col2.y * l, f = v, e = a.m_sweep.c.x + f, v = a.m_sweep.c.y + l, this.m_u1.Set(e - g, v - h), e = this.m_u1.Length(),
            e > b.b2_linearSlop ? (this.m_u1.x *= 1 / e, this.m_u1.y *= 1 / e) : this.m_u1.SetZero(), e = this.m_maxLength1 - e, y = d.Max(y, -e), e = d.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), x = -this.m_limitMass1 * e, e = -x * this.m_u1.x, v = -x * this.m_u1.y, a.m_sweep.c.x += a.m_invMass * e, a.m_sweep.c.y += a.m_invMass * v, a.m_sweep.a += a.m_invI * (f * v - l * e), a.SynchronizeTransform());
        this.m_limitState2 == u.e_atUpperLimit && (e = c.m_xf.R, p = this.m_localAnchor2.x - c.m_sweep.localCenter.x, t = this.m_localAnchor2.y - c.m_sweep.localCenter.y, v = e.col1.x * p + e.col2.x *
            t, t = e.col1.y * p + e.col2.y * t, p = v, w = c.m_sweep.c.x + p, x = c.m_sweep.c.y + t, this.m_u2.Set(w - k, x - m), v = this.m_u2.Length(), v > b.b2_linearSlop ? (this.m_u2.x *= 1 / v, this.m_u2.y *= 1 / v) : this.m_u2.SetZero(), e = this.m_maxLength2 - v, y = d.Max(y, -e), e = d.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), x = -this.m_limitMass2 * e, w = -x * this.m_u2.x, x = -x * this.m_u2.y, c.m_sweep.c.x += c.m_invMass * w, c.m_sweep.c.y += c.m_invMass * x, c.m_sweep.a += c.m_invI * (p * x - t * w), c.SynchronizeTransform());
        return y < b.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength =
            2
    });
    Box2D.inherit(P, Box2D.Dynamics.Joints.b2JointDef);
    P.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    P.b2PulleyJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.groundAnchorA = new g;
        this.groundAnchorB = new g;
        this.localAnchorA = new g;
        this.localAnchorB = new g
    };
    P.prototype.b2PulleyJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_pulleyJoint;
        this.groundAnchorA.Set(-1, 1);
        this.groundAnchorB.Set(1, 1);
        this.localAnchorA.Set(-1, 0);
        this.localAnchorB.Set(1,
            0);
        this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
        this.ratio = 1;
        this.collideConnected = !0
    };
    P.prototype.Initialize = function(a, b, c, d, e, g, h) {
        void 0 === h && (h = 0);
        this.bodyA = a;
        this.bodyB = b;
        this.groundAnchorA.SetV(c);
        this.groundAnchorB.SetV(d);
        this.localAnchorA = this.bodyA.GetLocalPoint(e);
        this.localAnchorB = this.bodyB.GetLocalPoint(g);
        a = e.x - c.x;
        c = e.y - c.y;
        this.lengthA = Math.sqrt(a * a + c * c);
        c = g.x - d.x;
        d = g.y - d.y;
        this.lengthB = Math.sqrt(c * c + d * d);
        this.ratio = h;
        h = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA =
            h - this.ratio * F.b2_minPulleyLength;
        this.maxLengthB = (h - F.b2_minPulleyLength) / this.ratio
    };
    Box2D.inherit(K, Box2D.Dynamics.Joints.b2Joint);
    K.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    K.b2RevoluteJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new k;
        this.K1 = new k;
        this.K2 = new k;
        this.K3 = new k;
        this.impulse3 = new c;
        this.impulse2 = new g;
        this.reduced = new g;
        this.m_localAnchor1 = new g;
        this.m_localAnchor2 = new g;
        this.m_impulse = new c;
        this.m_mass = new h
    };
    K.prototype.GetAnchorA =
        function() {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
        };
    K.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    K.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new g(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    K.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    K.prototype.GetJointAngle = function() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
    };
    K.prototype.GetJointSpeed = function() {
        return this.m_bodyB.m_angularVelocity -
            this.m_bodyA.m_angularVelocity
    };
    K.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    K.prototype.EnableLimit = function(a) {
        this.m_enableLimit = a
    };
    K.prototype.GetLowerLimit = function() {
        return this.m_lowerAngle
    };
    K.prototype.GetUpperLimit = function() {
        return this.m_upperAngle
    };
    K.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_lowerAngle = a;
        this.m_upperAngle = b
    };
    K.prototype.IsMotorEnabled = function() {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        return this.m_enableMotor
    };
    K.prototype.EnableMotor = function(a) {
        this.m_enableMotor = a
    };
    K.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    K.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    K.prototype.SetMaxMotorTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxMotorTorque = a
    };
    K.prototype.GetMotorTorque = function() {
        return this.m_maxMotorTorque
    };
    K.prototype.b2RevoluteJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_referenceAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = 0;
        this.m_lowerAngle = a.lowerAngle;
        this.m_upperAngle = a.upperAngle;
        this.m_maxMotorTorque = a.maxMotorTorque;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = u.e_inactiveLimit
    };
    K.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            e = this.m_bodyB,
            g, h = 0;
        g = c.m_xf.R;
        var k = this.m_localAnchor1.x - c.m_sweep.localCenter.x,
            m = this.m_localAnchor1.y - c.m_sweep.localCenter.y,
            h = g.col1.x * k + g.col2.x * m,
            m = g.col1.y * k + g.col2.y * m,
            k = h;
        g = e.m_xf.R;
        var f = this.m_localAnchor2.x - e.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - e.m_sweep.localCenter.y,
            h = g.col1.x * f + g.col2.x * l,
            l = g.col1.y * f + g.col2.y * l,
            f = h;
        g = c.m_invMass;
        var h = e.m_invMass,
            p = c.m_invI,
            t = e.m_invI;
        this.m_mass.col1.x = g + h + m * m * p + l * l * t;
        this.m_mass.col2.x = -m * k * p - l * f * t;
        this.m_mass.col3.x = -m * p - l * t;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = g + h + k * k * p + f * f * t;
        this.m_mass.col3.y =
            k * p + f * t;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = p + t;
        this.m_motorMass = 1 / (p + t);
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        if (this.m_enableLimit) {
            var v = e.m_sweep.a - c.m_sweep.a - this.m_referenceAngle;
            d.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b.b2_angularSlop ? this.m_limitState = u.e_equalLimits : v <= this.m_lowerAngle ? (this.m_limitState != u.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = u.e_atLowerLimit) : v >= this.m_upperAngle ? (this.m_limitState !=
                u.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = u.e_atUpperLimit) : (this.m_limitState = u.e_inactiveLimit, this.m_impulse.z = 0)
        } else this.m_limitState = u.e_inactiveLimit;
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x, v = this.m_impulse.y, c.m_linearVelocity.x -= g * a, c.m_linearVelocity.y -= g * v, c.m_angularVelocity -= p * (k * v - m * a + this.m_motorImpulse + this.m_impulse.z), e.m_linearVelocity.x += h * a, e.m_linearVelocity.y += h * v, e.m_angularVelocity +=
            t * (f * v - l * a + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    K.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            e = 0,
            g = e = 0,
            h = 0,
            k = 0,
            f = 0,
            l = b.m_linearVelocity,
            m = b.m_angularVelocity,
            p = c.m_linearVelocity,
            t = c.m_angularVelocity,
            v = b.m_invMass,
            x = c.m_invMass,
            w = b.m_invI,
            y = c.m_invI;
        this.m_enableMotor && this.m_limitState != u.e_equalLimits && (g = this.m_motorMass * -(t - m - this.m_motorSpeed), h = this.m_motorImpulse, k = a.dt * this.m_maxMotorTorque, this.m_motorImpulse =
            d.Clamp(this.m_motorImpulse + g, -k, k), g = this.m_motorImpulse - h, m -= w * g, t += y * g);
        if (this.m_enableLimit && this.m_limitState != u.e_inactiveLimit) {
            a = b.m_xf.R;
            g = this.m_localAnchor1.x - b.m_sweep.localCenter.x;
            h = this.m_localAnchor1.y - b.m_sweep.localCenter.y;
            e = a.col1.x * g + a.col2.x * h;
            h = a.col1.y * g + a.col2.y * h;
            g = e;
            a = c.m_xf.R;
            k = this.m_localAnchor2.x - c.m_sweep.localCenter.x;
            f = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
            e = a.col1.x * k + a.col2.x * f;
            f = a.col1.y * k + a.col2.y * f;
            k = e;
            a = p.x + -t * f - l.x - -m * h;
            var z = p.y + t * k - l.y - m * g;
            this.m_mass.Solve33(this.impulse3, -a, -z, -(t - m));
            this.m_limitState == u.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == u.e_atLowerLimit ? (e = this.m_impulse.z + this.impulse3.z, 0 > e && (this.m_mass.Solve22(this.reduced, -a, -z), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)) : this.m_limitState == u.e_atUpperLimit && (e = this.m_impulse.z + this.impulse3.z, 0 < e && (this.m_mass.Solve22(this.reduced, -a, -z),
                this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0));
            l.x -= v * this.impulse3.x;
            l.y -= v * this.impulse3.y;
            m -= w * (g * this.impulse3.y - h * this.impulse3.x + this.impulse3.z);
            p.x += x * this.impulse3.x;
            p.y += x * this.impulse3.y;
            t += y * (k * this.impulse3.y - f * this.impulse3.x + this.impulse3.z)
        } else a = b.m_xf.R, g = this.m_localAnchor1.x - b.m_sweep.localCenter.x, h = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
            e = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = e, a = c.m_xf.R, k = this.m_localAnchor2.x - c.m_sweep.localCenter.x, f = this.m_localAnchor2.y - c.m_sweep.localCenter.y, e = a.col1.x * k + a.col2.x * f, f = a.col1.y * k + a.col2.y * f, k = e, this.m_mass.Solve22(this.impulse2, -(p.x + -t * f - l.x - -m * h), -(p.y + t * k - l.y - m * g)), this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, l.x -= v * this.impulse2.x, l.y -= v * this.impulse2.y, m -= w * (g * this.impulse2.y - h * this.impulse2.x), p.x += x * this.impulse2.x, p.y += x * this.impulse2.y, t += y * (k * this.impulse2.y -
                f * this.impulse2.x);
        b.m_linearVelocity.SetV(l);
        b.m_angularVelocity = m;
        c.m_linearVelocity.SetV(p);
        c.m_angularVelocity = t
    };
    K.prototype.SolvePositionConstraints = function(a) {
        var c = 0,
            e;
        a = this.m_bodyA;
        var g = this.m_bodyB,
            h = 0,
            k = e = 0,
            m = 0,
            f = 0;
        if (this.m_enableLimit && this.m_limitState != u.e_inactiveLimit) {
            var c = g.m_sweep.a - a.m_sweep.a - this.m_referenceAngle,
                l = 0;
            this.m_limitState == u.e_equalLimits ? (c = d.Clamp(c - this.m_lowerAngle, -b.b2_maxAngularCorrection, b.b2_maxAngularCorrection), l = -this.m_motorMass * c, h = d.Abs(c)) : this.m_limitState ==
                u.e_atLowerLimit ? (c -= this.m_lowerAngle, h = -c, c = d.Clamp(c + b.b2_angularSlop, -b.b2_maxAngularCorrection, 0), l = -this.m_motorMass * c) : this.m_limitState == u.e_atUpperLimit && (h = c -= this.m_upperAngle, c = d.Clamp(c - b.b2_angularSlop, 0, b.b2_maxAngularCorrection), l = -this.m_motorMass * c);
            a.m_sweep.a -= a.m_invI * l;
            g.m_sweep.a += g.m_invI * l;
            a.SynchronizeTransform();
            g.SynchronizeTransform()
        }
        e = a.m_xf.R;
        l = this.m_localAnchor1.x - a.m_sweep.localCenter.x;
        c = this.m_localAnchor1.y - a.m_sweep.localCenter.y;
        k = e.col1.x * l + e.col2.x * c;
        c = e.col1.y *
            l + e.col2.y * c;
        l = k;
        e = g.m_xf.R;
        var p = this.m_localAnchor2.x - g.m_sweep.localCenter.x,
            t = this.m_localAnchor2.y - g.m_sweep.localCenter.y,
            k = e.col1.x * p + e.col2.x * t,
            t = e.col1.y * p + e.col2.y * t,
            p = k,
            m = g.m_sweep.c.x + p - a.m_sweep.c.x - l,
            f = g.m_sweep.c.y + t - a.m_sweep.c.y - c,
            v = m * m + f * f;
        e = Math.sqrt(v);
        var k = a.m_invMass,
            x = g.m_invMass,
            w = a.m_invI,
            y = g.m_invI,
            z = 10 * b.b2_linearSlop;
        v > z * z && (v = 1 / (k + x), m = v * -m, f = v * -f, a.m_sweep.c.x -= .5 * k * m, a.m_sweep.c.y -= .5 * k * f, g.m_sweep.c.x += .5 * x * m, g.m_sweep.c.y += .5 * x * f, m = g.m_sweep.c.x + p - a.m_sweep.c.x - l,
            f = g.m_sweep.c.y + t - a.m_sweep.c.y - c);
        this.K1.col1.x = k + x;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = k + x;
        this.K2.col1.x = w * c * c;
        this.K2.col2.x = -w * l * c;
        this.K2.col1.y = -w * l * c;
        this.K2.col2.y = w * l * l;
        this.K3.col1.x = y * t * t;
        this.K3.col2.x = -y * p * t;
        this.K3.col1.y = -y * p * t;
        this.K3.col2.y = y * p * p;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.AddM(this.K3);
        this.K.Solve(K.tImpulse, -m, -f);
        m = K.tImpulse.x;
        f = K.tImpulse.y;
        a.m_sweep.c.x -= a.m_invMass * m;
        a.m_sweep.c.y -= a.m_invMass * f;
        a.m_sweep.a -= a.m_invI * (l * f - c * m);
        g.m_sweep.c.x +=
            g.m_invMass * m;
        g.m_sweep.c.y += g.m_invMass * f;
        g.m_sweep.a += g.m_invI * (p * f - t * m);
        a.SynchronizeTransform();
        g.SynchronizeTransform();
        return e <= b.b2_linearSlop && h <= b.b2_angularSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new g
    });
    Box2D.inherit(M, Box2D.Dynamics.Joints.b2JointDef);
    M.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    M.b2RevoluteJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new g;
        this.localAnchorB =
            new g
    };
    M.prototype.b2RevoluteJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_revoluteJoint;
        this.localAnchorA.Set(0, 0);
        this.localAnchorB.Set(0, 0);
        this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
        this.enableMotor = this.enableLimit = !1
    };
    M.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(J, Box2D.Dynamics.Joints.b2Joint);
    J.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    J.b2WeldJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new g;
        this.m_localAnchorB = new g;
        this.m_impulse = new c;
        this.m_mass = new h
    };
    J.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    J.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    J.prototype.GetReactionForce = function(a) {
        void 0 ===
            a && (a = 0);
        return new g(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    J.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    J.prototype.b2WeldJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchorA.SetV(a.localAnchorA);
        this.m_localAnchorB.SetV(a.localAnchorB);
        this.m_referenceAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_mass = new h
    };
    J.prototype.InitVelocityConstraints = function(a) {
        var b, c = 0,
            d = this.m_bodyA,
            e = this.m_bodyB;
        b = d.m_xf.R;
        var g = this.m_localAnchorA.x -
            d.m_sweep.localCenter.x,
            h = this.m_localAnchorA.y - d.m_sweep.localCenter.y,
            c = b.col1.x * g + b.col2.x * h,
            h = b.col1.y * g + b.col2.y * h,
            g = c;
        b = e.m_xf.R;
        var f = this.m_localAnchorB.x - e.m_sweep.localCenter.x,
            k = this.m_localAnchorB.y - e.m_sweep.localCenter.y,
            c = b.col1.x * f + b.col2.x * k,
            k = b.col1.y * f + b.col2.y * k,
            f = c;
        b = d.m_invMass;
        var c = e.m_invMass,
            m = d.m_invI,
            p = e.m_invI;
        this.m_mass.col1.x = b + c + h * h * m + k * k * p;
        this.m_mass.col2.x = -h * g * m - k * f * p;
        this.m_mass.col3.x = -h * m - k * p;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = b + c + g * g *
            m + f * f * p;
        this.m_mass.col3.y = g * m + f * p;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = m + p;
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, d.m_linearVelocity.x -= b * this.m_impulse.x, d.m_linearVelocity.y -= b * this.m_impulse.y, d.m_angularVelocity -= m * (g * this.m_impulse.y - h * this.m_impulse.x + this.m_impulse.z), e.m_linearVelocity.x += c * this.m_impulse.x, e.m_linearVelocity.y += c * this.m_impulse.y, e.m_angularVelocity += p *
            (f * this.m_impulse.y - k * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
    };
    J.prototype.SolveVelocityConstraints = function(a) {
        var b, d = 0;
        a = this.m_bodyA;
        var e = this.m_bodyB,
            g = a.m_linearVelocity,
            h = a.m_angularVelocity,
            k = e.m_linearVelocity,
            f = e.m_angularVelocity,
            l = a.m_invMass,
            m = e.m_invMass,
            p = a.m_invI,
            t = e.m_invI;
        b = a.m_xf.R;
        var u = this.m_localAnchorA.x - a.m_sweep.localCenter.x,
            v = this.m_localAnchorA.y - a.m_sweep.localCenter.y,
            d = b.col1.x * u + b.col2.x * v,
            v = b.col1.y * u + b.col2.y * v,
            u = d;
        b = e.m_xf.R;
        var x = this.m_localAnchorB.x -
            e.m_sweep.localCenter.x,
            w = this.m_localAnchorB.y - e.m_sweep.localCenter.y,
            d = b.col1.x * x + b.col2.x * w,
            w = b.col1.y * x + b.col2.y * w,
            x = d;
        b = k.x - f * w - g.x + h * v;
        var d = k.y + f * x - g.y - h * u,
            y = f - h,
            z = new c;
        this.m_mass.Solve33(z, -b, -d, -y);
        this.m_impulse.Add(z);
        g.x -= l * z.x;
        g.y -= l * z.y;
        h -= p * (u * z.y - v * z.x + z.z);
        k.x += m * z.x;
        k.y += m * z.y;
        f += t * (x * z.y - w * z.x + z.z);
        a.m_angularVelocity = h;
        e.m_angularVelocity = f
    };
    J.prototype.SolvePositionConstraints = function(a) {
        var e, g = 0;
        a = this.m_bodyA;
        var h = this.m_bodyB;
        e = a.m_xf.R;
        var k = this.m_localAnchorA.x - a.m_sweep.localCenter.x,
            m = this.m_localAnchorA.y - a.m_sweep.localCenter.y,
            g = e.col1.x * k + e.col2.x * m,
            m = e.col1.y * k + e.col2.y * m,
            k = g;
        e = h.m_xf.R;
        var p = this.m_localAnchorB.x - h.m_sweep.localCenter.x,
            f = this.m_localAnchorB.y - h.m_sweep.localCenter.y,
            g = e.col1.x * p + e.col2.x * f,
            f = e.col1.y * p + e.col2.y * f,
            p = g;
        e = a.m_invMass;
        var g = h.m_invMass,
            l = a.m_invI,
            t = h.m_invI,
            u = h.m_sweep.c.x + p - a.m_sweep.c.x - k,
            v = h.m_sweep.c.y + f - a.m_sweep.c.y - m,
            x = h.m_sweep.a - a.m_sweep.a - this.m_referenceAngle,
            w = 10 * b.b2_linearSlop,
            y = Math.sqrt(u * u + v * v),
            z = d.Abs(x);
        y > w && (l *= 1, t *= 1);
        this.m_mass.col1.x = e + g + m * m * l + f * f * t;
        this.m_mass.col2.x = -m * k * l - f * p * t;
        this.m_mass.col3.x = -m * l - f * t;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = e + g + k * k * l + p * p * t;
        this.m_mass.col3.y = k * l + p * t;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = l + t;
        w = new c;
        this.m_mass.Solve33(w, -u, -v, -x);
        a.m_sweep.c.x -= e * w.x;
        a.m_sweep.c.y -= e * w.y;
        a.m_sweep.a -= l * (k * w.y - m * w.x + w.z);
        h.m_sweep.c.x += g * w.x;
        h.m_sweep.c.y += g * w.y;
        h.m_sweep.a += t * (p * w.y - f * w.x + w.z);
        a.SynchronizeTransform();
        h.SynchronizeTransform();
        return y <= b.b2_linearSlop && z <= b.b2_angularSlop
    };
    Box2D.inherit(L, Box2D.Dynamics.Joints.b2JointDef);
    L.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    L.b2WeldJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new g;
        this.localAnchorB = new g
    };
    L.prototype.b2WeldJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = u.e_weldJoint;
        this.referenceAngle = 0
    };
    L.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }
})();
(function() {
    var b = Box2D.Dynamics.b2DebugDraw;
    b.b2DebugDraw = function() {
        this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
        var b = this;
        this.m_sprite = {
            graphics: {
                clear: function() {
                    b.m_ctx.clearRect(0, 0, b.m_ctx.canvas.width, b.m_ctx.canvas.height)
                }
            }
        }
    };
    b.prototype._color = function(b, h) {
        return "rgba(" + ((b & 16711680) >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + h + ")"
    };
    b.prototype.b2DebugDraw = function() {
        this.m_drawFlags = 0
    };
    b.prototype.SetFlags = function(b) {
        void 0 === b && (b = 0);
        this.m_drawFlags =
            b
    };
    b.prototype.GetFlags = function() {
        return this.m_drawFlags
    };
    b.prototype.AppendFlags = function(b) {
        void 0 === b && (b = 0);
        this.m_drawFlags |= b
    };
    b.prototype.ClearFlags = function(b) {
        void 0 === b && (b = 0);
        this.m_drawFlags &= ~b
    };
    b.prototype.SetSprite = function(b) {
        this.m_ctx = b
    };
    b.prototype.GetSprite = function() {
        return this.m_ctx
    };
    b.prototype.SetDrawScale = function(b) {
        void 0 === b && (b = 0);
        this.m_drawScale = b
    };
    b.prototype.GetDrawScale = function() {
        return this.m_drawScale
    };
    b.prototype.SetLineThickness = function(b) {
        void 0 === b && (b =
            0);
        this.m_lineThickness = b;
        this.m_ctx.strokeWidth = b
    };
    b.prototype.GetLineThickness = function() {
        return this.m_lineThickness
    };
    b.prototype.SetAlpha = function(b) {
        void 0 === b && (b = 0);
        this.m_alpha = b
    };
    b.prototype.GetAlpha = function() {
        return this.m_alpha
    };
    b.prototype.SetFillAlpha = function(b) {
        void 0 === b && (b = 0);
        this.m_fillAlpha = b
    };
    b.prototype.GetFillAlpha = function() {
        return this.m_fillAlpha
    };
    b.prototype.SetXFormScale = function(b) {
        void 0 === b && (b = 0);
        this.m_xformScale = b
    };
    b.prototype.GetXFormScale = function() {
        return this.m_xformScale
    };
    b.prototype.DrawPolygon = function(b, h, d) {
        if (h) {
            var g = this.m_ctx,
                c = this.m_drawScale;
            g.beginPath();
            g.strokeStyle = this._color(d.color, this.m_alpha);
            g.moveTo(b[0].x * c, b[0].y * c);
            for (d = 1; d < h; d++) g.lineTo(b[d].x * c, b[d].y * c);
            g.lineTo(b[0].x * c, b[0].y * c);
            g.closePath();
            g.stroke()
        }
    };
    b.prototype.DrawSolidPolygon = function(b, h, d) {
        if (h) {
            var g = this.m_ctx,
                c = this.m_drawScale;
            g.beginPath();
            g.strokeStyle = this._color(d.color, this.m_alpha);
            g.fillStyle = this._color(d.color, this.m_fillAlpha);
            g.moveTo(b[0].x * c, b[0].y * c);
            for (d =
                1; d < h; d++) g.lineTo(b[d].x * c, b[d].y * c);
            g.lineTo(b[0].x * c, b[0].y * c);
            g.closePath();
            g.fill();
            g.stroke()
        }
    };
    b.prototype.DrawCircle = function(b, h, d) {
        if (h) {
            var g = this.m_ctx,
                c = this.m_drawScale;
            g.beginPath();
            g.strokeStyle = this._color(d.color, this.m_alpha);
            g.arc(b.x * c, b.y * c, h * c, 0, 2 * Math.PI, !0);
            g.closePath();
            g.stroke()
        }
    };
    b.prototype.DrawSolidCircle = function(b, h, d, g) {
        if (h) {
            var c = this.m_ctx,
                p = this.m_drawScale,
                a = b.x * p,
                m = b.y * p;
            c.moveTo(0, 0);
            c.beginPath();
            c.strokeStyle = this._color(g.color, this.m_alpha);
            c.fillStyle =
                this._color(g.color, this.m_fillAlpha);
            c.arc(a, m, h * p, 0, 2 * Math.PI, !0);
            c.moveTo(a, m);
            c.lineTo((b.x + d.x * h) * p, (b.y + d.y * h) * p);
            c.closePath();
            c.fill();
            c.stroke()
        }
    };
    b.prototype.DrawSegment = function(b, h, d) {
        var g = this.m_ctx,
            c = this.m_drawScale;
        g.strokeStyle = this._color(d.color, this.m_alpha);
        g.beginPath();
        g.moveTo(b.x * c, b.y * c);
        g.lineTo(h.x * c, h.y * c);
        g.closePath();
        g.stroke()
    };
    b.prototype.DrawTransform = function(b) {
        var h = this.m_ctx,
            d = this.m_drawScale;
        h.beginPath();
        h.strokeStyle = this._color(16711680, this.m_alpha);
        h.moveTo(b.position.x * d, b.position.y * d);
        h.lineTo((b.position.x + this.m_xformScale * b.R.col1.x) * d, (b.position.y + this.m_xformScale * b.R.col1.y) * d);
        h.strokeStyle = this._color(65280, this.m_alpha);
        h.moveTo(b.position.x * d, b.position.y * d);
        h.lineTo((b.position.x + this.m_xformScale * b.R.col2.x) * d, (b.position.y + this.m_xformScale * b.R.col2.y) * d);
        h.closePath();
        h.stroke()
    }
})();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;

function CSpriteLibrary() {
    var b, k, h, d, g, c;
    this.init = function(p, a, m) {
        h = k = 0;
        d = p;
        g = a;
        c = m;
        b = {}
    };
    this.addSprite = function(c, a) {
        b.hasOwnProperty(c) || (b[c] = {
            szPath: a,
            oSprite: new Image
        }, k++)
    };
    this.getSprite = function(c) {
        return b.hasOwnProperty(c) ? b[c].oSprite : null
    };
    this._onSpritesLoaded = function() {
        g.call(c)
    };
    this._onSpriteLoaded = function() {
        d.call(c);
        ++h == k && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var c in b) b[c].oSprite.oSpriteLibrary = this, b[c].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            b[c].oSprite.src = b[c].szPath
    };
    this.getNumSprites = function() {
        return k
    }
}
var CANVAS_WIDTH = 1360,
    CANVAS_HEIGHT = 840,
    EDGEBOARD_X = 120,
    EDGEBOARD_Y = 122,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "bd_cartoon_shoutregular",
    TEXT_COLOR = "#ffd800",
    FPS_TIME = 1E3 / 24,
    TIME_STEP_BOX2D = 1 / 60,
    ITINERATION_BOX2D = 10,
    POSITION_ITINERATION_BOX2D = 10,
    TOT_TEAM = 8,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    TWEEN_END_MACTH_Y = .5 * CANVAS_HEIGHT,
    MAX_ASSIGNED_STAR = 3,
    LEVEL_DIAGRAM, GOAL_AREA = 0,
    GOAL_AREA_ENEMY = 1,
    WALL =
    2,
    POLE = 3,
    PLAYER = 4,
    LEG = 5,
    BALL = 6,
    HEAD_SHOOT = 7,
    HEEL = 8,
    OPPONENT = 9,
    TIME_TRY_TO_SHOT_BALL_OPPONENT = .7,
    BALL_CATEGORY_COLLISION = 1,
    FIELD_CATEGORY_COLLISION = 2,
    JOINT_CATEGORY_COLLISION = 3,
    OPPONENT_CATEGORY_COLLISION = 4,
    PLAYER_CATEGORY_COLLISION = 5,
    TIME_DESPAWN_HEAD = .2,
    STOP_WALK_DISTANCE_PLAYER = 80,
    CLIMB_PART, BALL_DENSITY = 1,
    BALL_FRICTION = .4,
    BALL_RESTITUTION = .8,
    BALL_LINEAR_DAMPING = .5,
    BALL_LINEAR_DAMPING_GOAL = 2,
    OBJECT, SUPPORTERS_FRAMES = 31,
    SUPPORTERS_POS = {
        x: 0,
        y: 120
    },
    START_TIME_FLAG_TIME = 200,
    STOP_BACK_WALK_POSITION =
    .5 * CANVAS_WIDTH + CANVAS_WIDTH / 5,
    OFFSET_LEG_POS = {
        x: 10,
        y: 30
    },
    OFFSET_HEAD_POS = {
        x: 15,
        y: -40
    },
    OFFSET_HEEL_POS = {
        x: -5,
        y: 40
    },
    OFFSET_LEG_POS_OPPONENT = {
        x: -10,
        y: 30
    },
    OFFSET_HEAD_POS_OPPONENT = {
        x: -15,
        y: -40
    },
    OFFSET_HEEL_POS_OPPONENT = {
        x: 5,
        y: 40
    },
    MIN_DISTANCE_BETWEEN_PLAYER = 150,
    GO_TO_DISTANCE = 230,
    DISTANCE_START_SHOOT_OPPONENT = 95,
    HEEL_SHOOT_DISTANCE_OPPONENT = 100,
    OFFSET_OPPONENT_FORWOARD_BALL = 40,
    WALL_DENSITY = 1,
    WALL_FRICTION = 1,
    WALL_RESTITUTION = .7,
    WORLD_SCALE = 30,
    TWEEN_CROWD_ON_Y = -170,
    DELETE_LEG_ANGLE_PLAYER = 70,
    DELETE_HEEL_ANGLE_PLAYER = -70,
    DELETE_LEG_ANGLE_OPPONENT = -70,
    DELETE_HEEL_ANGLE_OPPONENT = 70,
    FORCE_AFTER_GOAL_PLAYER = {
        x: .02,
        y: 0
    },
    FORCE_AFTER_GOAL_OPPONENT = {
        x: -.02,
        y: 0
    },
    BALL_POSITION = {
        x: .5 * CANVAS_WIDTH,
        y: 180
    },
    USER_PLAYER_START_POS = {
        x: .5 * CANVAS_WIDTH - 250,
        y: .5 * CANVAS_HEIGHT + 59
    },
    OPPONENT_START_POS = {
        x: .5 * CANVAS_WIDTH + 250,
        y: .5 * CANVAS_HEIGHT + 59
    },
    GOAL_AREA_VERTEX = [{
        x: 0,
        y: 7
    }, {
        x: 0,
        y: 231
    }, {
        x: 89,
        y: 231
    }, {
        x: 89,
        y: 7
    }],
    PLAYER_POLYGON = [
        [{
            x: 22.5,
            y: 16
        }, {
            x: -16.5,
            y: 53
        }, {
            x: -35,
            y: 23
        }, {
            x: 36.5,
            y: -26
        }, {
            x: 44.5,
            y: -10
        }],
        [{
            x: -2.5,
            y: -68
        }, {
            x: 30.5,
            y: -68
        }, {
            x: 36.5,
            y: -64
        }, {
            x: -13.5,
            y: -11
        }, {
            x: -20.5,
            y: -24
        }, {
            x: -20.5,
            y: -50
        }],
        [{
            x: -25.5,
            y: 79
        }, {
            x: -26.5,
            y: 68
        }, {
            x: -16.5,
            y: 53
        }, {
            x: 10.5,
            y: 70
        }, {
            x: 14.5,
            y: 80
        }],
        [{
            x: -16.5,
            y: 53
        }, {
            x: 22.5,
            y: 16
        }, {
            x: 17.5,
            y: 62
        }, {
            x: 10.5,
            y: 70
        }],
        [{
            x: -35.5,
            y: 23
        }, {
            x: -35,
            y: 15
        }, {
            x: -13.5,
            y: -11
        }, {
            x: 36.5,
            y: -64
        }, {
            x: 36.5,
            y: -26
        }]
    ],
    OPPONENT_POLYGON = [
        [{
            x: 36,
            y: 8
        }, {
            x: 18,
            y: 42
        }, {
            x: 14,
            y: -20
        }],
        [{
            x: -13.5,
            y: 69.5
        }, {
            x: -21.5,
            y: 5.5
        }, {
            x: 18,
            y: 42
        }, {
            x: 27,
            y: 60
        }, {
            x: 26.167,
            y: 68.833
        }],
        [{
            x: 21,
            y: -61
        }, {
            x: 22,
            y: -37
        }, {
            x: 14,
            y: -20
        }, {
            x: -28.5,
            y: -79.5
        }, {
            x: -.5,
            y: -79.5
        }],
        [{
            x: -44.5,
            y: -24.5
        }, {
            x: -37,
            y: -37
        }, {
            x: -21.5,
            y: 5.5
        }],
        [{
            x: 14,
            y: -20
        }, {
            x: 18,
            y: 42
        }, {
            x: -21.5,
            y: 5.5
        }, {
            x: -37,
            y: -37
        }, {
            x: -28.5,
            y: -79.5
        }],
        [{
            x: -37,
            y: -73
        }, {
            x: -28.5,
            y: -79.5
        }, {
            x: -37,
            y: -37
        }]
    ],
    OFFSET_FIELD_Y = 35,
    OFFSET_FIELD_X = 35,
    FIELD_DIAGRAM = [
        [{
            x: 120,
            y: -200
        }, {
            x: 120,
            y: 560
        }],
        [{
            x: 120,
            y: 560
        }, {
            x: 1240,
            y: 560
        }],
        [{
            x: 1240,
            y: 560
        }, {
            x: 1240,
            y: -200
        }],
        [{
            x: 1240,
            y: -200
        }, {
            x: 120,
            y: -200
        }]
    ];
OBJECT = [
    [{
        x: 142,
        y: 324,
        angle: 0,
        density: 0,
        friction: 0,
        restitution: 0,
        offset_front: {
            x: 0,
            y: 0
        },
        sensor: !0,
        offset_back: {
            x: 30,
            y: 0
        },
        info: {
            type: GOAL_AREA_ENEMY
        },
        vertex: GOAL_AREA_VERTEX
    }],
    [{
        x: 1128,
        y: 324,
        angle: 0,
        density: 0,
        friction: 0,
        restitution: 0,
        offset_front: {
            x: 90,
            y: 0
        },
        sensor: !0,
        offset_back: {
            x: 60,
            y: 0
        },
        info: {
            type: GOAL_AREA
        },
        vertex: GOAL_AREA_VERTEX
    }],
    [{
        x: 142,
        y: 300,
        width: 120,
        height: 3,
        angle: 15,
        density: 0,
        friction: .5,
        restitution: 1,
        sensor: !1,
        info: {
            type: POLE
        }
    }],
    [{
        x: 1218,
        y: 300,
        width: 120,
        height: 3,
        angle: -15,
        density: 0,
        friction: .5,
        restitution: 1,
        sensor: !1,
        info: {
            type: POLE
        }
    }]
];
var PLAYERS_COLLISION = {
        x: USER_PLAYER_START_POS.x,
        y: USER_PLAYER_START_POS.y,
        angle: 0,
        density: 70,
        friction: .1,
        restitution: .1,
        rec_offset: {
            x: -30,
            y: 40
        },
        sensor: !1,
        info: {
            type: PLAYER
        },
        recWidth: 24,
        recHeight: 40,
        rec_center_width: 12,
        radius: 32,
        sph_offset: {
            x: -12,
            y: -35
        },
        rec_neck: {
            x: -50,
            y: -13,
            width: 4,
            height: 7,
            angle: 45
        }
    },
    PLAYER_LEG = {
        width: 2,
        height: 20,
        density: 50,
        pivotX: 0,
        pivotY: -24,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: LEG
        },
        lowerAngle: 0,
        upperAngle: DELETE_LEG_ANGLE_PLAYER,
        power: 2E3,
        speed: 8
    },
    PLAYER_HEEL = {
        width: 2,
        height: 25,
        density: 50,
        pivotX: -4,
        pivotY: -26,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: HEEL
        },
        lowerAngle: DELETE_HEEL_ANGLE_PLAYER,
        upperAngle: 0,
        power: 2E3,
        speed: -8
    },
    PLAYER_HEAD = {
        radius: 30,
        density: 50,
        friction: .5,
        restitution: 4,
        info: {
            type: HEAD_SHOOT
        },
        distance: 20 / WORLD_SCALE,
        power: 4E3,
        speed: 5,
        mov_allowed: {
            x: 1,
            y: .1
        }
    },
    OPPONENT_COLLISION = {
        x: OPPONENT_START_POS.x,
        y: OPPONENT_START_POS.y,
        angle: 0,
        density: 100,
        friction: .1,
        restitution: .1,
        rec_offset: {
            x: 30,
            y: 40
        },
        sensor: !1,
        info: {
            type: OPPONENT
        },
        recWidth: 24,
        recHeight: 40,
        rec_center_width: -12,
        radius: 32,
        sph_offset: {
            x: 12,
            y: -35
        },
        rec_neck: {
            x: 50,
            y: -13,
            width: 4,
            height: 7,
            angle: -45
        }
    },
    OPPONENT_LEG = {
        width: 2,
        height: 20,
        density: 50,
        pivotX: -4,
        pivotY: -24,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: LEG
        },
        lowerAngle: DELETE_LEG_ANGLE_OPPONENT,
        upperAngle: 0,
        power: 2E3,
        speed: -8
    },
    OPPONENT_HEEL = {
        width: 2,
        height: 25,
        density: 50,
        pivotX: 4,
        pivotY: -26,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: HEEL
        },
        lowerAngle: 0,
        upperAngle: DELETE_HEEL_ANGLE_OPPONENT,
        power: 2E3,
        speed: 8
    },
    OPPONENT_HEAD = {
        radius: 30,
        density: 50,
        friction: .5,
        restitution: 2,
        info: {
            type: HEAD_SHOOT
        },
        distance: 50 / WORLD_SCALE,
        power: 4E3,
        speed: 5,
        mov_allowed: {
            x: -1,
            y: .1
        }
    },
    FLAG_POSITION = [{
        x: 691,
        y: 285
    }, {
        x: 896,
        y: 330
    }, {
        x: 978,
        y: 458
    }, {
        x: 890,
        y: 574
    }, {
        x: 691,
        y: 619
    }, {
        x: 492,
        y: 567
    }, {
        x: 390,
        y: 448
    }, {
        x: 495,
        y: 321
    }],
    TIME_RESET_BALL, REGULAR_MATCH_TIME, EXTENDED_MATCH_TIME, OPPONENT_SPEEDS, CHARACTER_SPEED, OPPONENT_DISTANCE_PROTECTION, OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT, OPPONENT_DISTANCE_PROTECTION_AGG, OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG, REACT_OPP_FOR_HEEL_SHOOT,
    BALL_VELOCITY_X_REACTION, BALL_VELOCITY_X_REACTION_ATTACK, BALL_AND_CHARACTER_DISTANCE_PROTECTION, TIME_REACTION_FROM_SAVE_TO_GO, TIME_OPP_BECOME_AGGRESSIVE, TIME_AFTER_REACTION, TIME_INTERVAL_SHOOT, TIME_IN_PROTECT_STATE, SCORE_PLAYER_GOAL, SCORE_OPPONENT_GOAL, SCORE_WIN, SCORE_TIE, NUM_LEVEL_FOR_ADS;

function CWinPanel(b, k) {
    var h, d, g, c, p, a, m, A, v, t, x, u, E, z, e, y, w;
    this._init = function(b, k) {
        z = new createjs.Container;
        z.alpha = 1;
        z.visible = !1;
        z.y = -CANVAS_HEIGHT;
        h = createBitmap(b);
        z.addChild(h);
        c = new createjs.Text("", "50px " + FONT_GAME, "#000000");
        c.x = CANVAS_WIDTH / 2;
        c.y = 174;
        c.textAlign = "center";
        c.outline = 5;
        z.addChild(c);
        p = new createjs.Text("", "50px " + FONT_GAME, TEXT_COLOR);
        p.x = CANVAS_WIDTH / 2;
        p.y = 174;
        p.textAlign = "center";
        z.addChild(p);
        d = new createjs.Text("", "32px " + FONT_GAME, "#000000");
        d.x = CANVAS_WIDTH / 2;
        d.y =
            CANVAS_HEIGHT / 2 - 150;
        d.textAlign = "center";
        d.outline = 5;
        z.addChild(d);
        g = new createjs.Text("", "32px " + FONT_GAME, TEXT_COLOR);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 150;
        g.textAlign = "center";
        z.addChild(g);
        a = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2 - 70;
        a.textAlign = "center";
        a.outline = 5;
        z.addChild(a);
        m = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2 - 70;
        m.textAlign = "center";
        z.addChild(m);
        A = new createjs.Text("", "24px " + FONT_GAME,
            "#000000");
        A.x = CANVAS_WIDTH / 2;
        A.y = CANVAS_HEIGHT / 2 - 10;
        A.textAlign = "center";
        A.outline = 5;
        z.addChild(A);
        v = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        v.x = CANVAS_WIDTH / 2;
        v.y = CANVAS_HEIGHT / 2 - 10;
        v.textAlign = "center";
        z.addChild(v);
        t = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        t.x = CANVAS_WIDTH / 2;
        t.y = CANVAS_HEIGHT / 2 + 50;
        t.textAlign = "center";
        t.outline = 5;
        z.addChild(t);
        x = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        x.x = CANVAS_WIDTH / 2;
        x.y = CANVAS_HEIGHT / 2 + 50;
        x.textAlign = "center";
        z.addChild(x);
        u = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        u.x = CANVAS_WIDTH / 2;
        u.y = CANVAS_HEIGHT / 2 + 110;
        u.textAlign = "center";
        u.outline = 5;
        z.addChild(u);
        E = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        E.x = CANVAS_WIDTH / 2;
        E.y = CANVAS_HEIGHT / 2 + 110;
        E.textAlign = "center";
        z.addChild(E);
        var N = s_oSpriteLibrary.getSprite("but_continue_big");
        y = new CGfxButton(.5 * CANVAS_WIDTH + 250, .5 * CANVAS_HEIGHT + 175, N, z);
        y.pulseAnimation();
        !1 === k ? (N = s_oSpriteLibrary.getSprite("but_home"), e = new CGfxButton(.5 * CANVAS_WIDTH - 250, .5 * CANVAS_HEIGHT +
            175, N, z), e.addEventListener(ON_MOUSE_DOWN, this._onExit, this), y.addEventListener(ON_MOUSE_DOWN, this._onContinue, this)) : y.addEventListener(ON_MOUSE_DOWN, this._onEnd, this);
        w = new createjs.Container;
        z.addChild(w);
        s_oStage.addChild(z)
    };
    this.unload = function() {
        s_oStage.removeChild(z);
        e && (e.unload(), e = null);
        y && (y.unload(), y = null)
    };
    this.show = function(b, e, h, k, y) {
        var K = eval("TEXT_TEAM_CODE_" + h),
            M = eval("TEXT_TEAM_CODE_" + k);
        g.text = K + " " + b + " - " + e + " " + M;
        d.text = K + " " + b + " - " + e + " " + M;
        c.text = TEXT_WIN;
        p.text = TEXT_WIN;
        a.text = TEXT_SCORE_GOAL_PLAYER + " " + y.player_goal_score;
        m.text = TEXT_SCORE_GOAL_PLAYER + " " + y.player_goal_score;
        A.text = TEXT_SCORE_GOAL_OPPONENT + " " + y.opponent_goal_score;
        v.text = TEXT_SCORE_GOAL_OPPONENT + " " + y.opponent_goal_score;
        t.text = TEXT_MACTH_SCORE + ": " + y.score_match;
        x.text = TEXT_MACTH_SCORE + ": " + y.score_match;
        u.text = TEXT_TOTAL_SCORE + ": " + y.new_score;
        E.text = TEXT_TOTAL_SCORE + ": " + y.new_score;
        b = s_oSpriteLibrary.getSprite("flag_" + h);
        e = createBitmap(b);
        e.x = g.x - 180;
        e.y = g.y + 15;
        e.regX = .5 * b.width;
        e.regY = .5 *
            b.height;
        e.scaleX = .4;
        e.scaleY = .4;
        w.addChild(e);
        b = s_oSpriteLibrary.getSprite("flag_" + k);
        e = createBitmap(b);
        e.x = g.x + 180;
        e.y = g.y + 15;
        e.regX = .5 * b.width;
        e.regY = .5 * b.height;
        e.scaleX = .4;
        e.scaleY = .4;
        w.addChild(e);
        h = s_oSpriteLibrary.getSprite("character_pose_" + h);
        b = {
            images: [h],
            frames: {
                width: h.width / 3,
                height: h.height,
                regX: h.width / 2 / 3,
                regY: h.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        b = new createjs.SpriteSheet(b);
        h = createSprite(b, "win", h.width / 2 / 3, h.height / 2, h.width / 3, h.height);
        h.x = .5 * CANVAS_WIDTH -
            440;
        h.y = .5 * CANVAS_HEIGHT + 91;
        z.addChild(h);
        h = s_oSpriteLibrary.getSprite("character_pose_" + k);
        b = {
            images: [h],
            frames: {
                width: h.width / 3,
                height: h.height,
                regX: h.width / 2 / 3,
                regY: h.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        b = new createjs.SpriteSheet(b);
        k = createSprite(b, "angry", h.width / 2 / 3, h.height / 2, h.width / 3, h.height);
        k.x = .5 * CANVAS_WIDTH + 440;
        k.y = .5 * CANVAS_HEIGHT + 91;
        k.scaleX = -1;
        z.addChild(k);
        z.visible = !0;
        createjs.Tween.get(z).to({
            y: 0
        }, 1250, createjs.Ease.elasticOut).call(function() {
            s_oAdsLevel ===
                NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"), s_oAdsLevel = 1) : s_oAdsLevel++
        });
        $(s_oMain).trigger("save_score", y.new_score);
        $(s_oMain).trigger("share_event", y.new_score)
    };
    this._onContinue = function() {
        var a = this;
        createjs.Tween.get(z).to({
            y: CANVAS_HEIGHT
        }, 750, createjs.Ease.quartIn).call(function() {
            a.unload()
        });
        y.block(!0);
        e.block(!0);
        s_oGame.onContinue(s_oStage.getChildIndex(z))
    };
    this._onEnd = function() {
        y.block(!0);
        this.unload();
        s_oGame._onEnd()
    };
    this._onExit = function() {
        this.unload();
        s_oGame.onExit()
    };
    this._init(b, k);
    return this
}

function CVsPanel(b, k, h, d, g) {
    var c, p, a, m, A, v, t, x, u, E, z;
    this._init = function(b, c, d, g, h) {
        p = new createjs.Container;
        null !== b && (a = createBitmap(b), p.addChild(a));
        x = new createjs.Container;
        u = new createjs.Container;
        E = new createjs.Container;
        b = g + 1;
        g = new createjs.Text(TEXT_MATCH + " " + b, "32px " + FONT_GAME, "#000000");
        g.x = .5 * CANVAS_WIDTH;
        g.y = .5 * CANVAS_HEIGHT - 150;
        g.textAlign = "center";
        g.outline = 5;
        p.addChild(g);
        b = new createjs.Text(TEXT_MATCH + " " + b, "32px " + FONT_GAME, TEXT_COLOR);
        b.x = .5 * CANVAS_WIDTH;
        b.y = .5 * CANVAS_HEIGHT -
            150;
        b.textAlign = "center";
        p.addChild(b);
        b = s_oSpriteLibrary.getSprite("flag_" + c);
        m = createBitmap(b);
        m.regX = .5 * b.width;
        m.regY = .5 * b.height;
        m.x = .5 * CANVAS_WIDTH - 200;
        m.y = .5 * CANVAS_HEIGHT + 30;
        x.addChild(m);
        b = s_oSpriteLibrary.getSprite("flag_" + d);
        A = createBitmap(b);
        A.regX = .5 * b.width;
        A.regY = .5 * b.height;
        A.x = .5 * CANVAS_WIDTH + 200;
        A.y = .5 * CANVAS_HEIGHT + 30;
        u.addChild(A);
        c = s_oSpriteLibrary.getSprite("team_" + c);
        new CCharacter(.5 * CANVAS_WIDTH - 250, .5 * CANVAS_HEIGHT + 10, c, 0, x);
        d = s_oSpriteLibrary.getSprite("team_" + d);
        new COpponent(.5 *
            CANVAS_WIDTH + 250, .5 * CANVAS_HEIGHT + 10, d, CHARACTER_SPEED, null, null, u);
        u.x = .5 * CANVAS_WIDTH;
        x.x = .5 * -CANVAS_WIDTH;
        E.x = .5 * CANVAS_WIDTH;
        E.y = .5 * CANVAS_HEIGHT + 30;
        p.addChild(x, u, E);
        null === h && (h = 0);
        createjs.Tween.get(u).wait(h).to({
            x: 0
        }, 1E3, createjs.Ease.elasticOut);
        var k = this;
        createjs.Tween.get(x).wait(h).to({
            x: 0
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            k._createVsText(E);
            E.scaleX = 10;
            E.scaleY = 10;
            createjs.Tween.get(E).to({
                scaleX: 1,
                scaleY: 1
            }, 1E3, createjs.Ease.bounceOut).call(function() {
                k._createButContinue(p,
                    .5 * CANVAS_WIDTH + 600, .5 * CANVAS_HEIGHT + 340)
            })
        });
        s_oStage.addChild(p);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, b) {
        z && z.setPosition(c.x - a, c.y - b)
    };
    this._createButContinue = function(a, b, d) {
        c = {
            x: b,
            y: d
        };
        b = s_oSpriteLibrary.getSprite("but_continue");
        z = new CGfxButton(c.x, c.y, b, a);
        z.addEventListener(ON_MOUSE_UP, this._onExitVsPanel, this);
        z.pulseAnimation();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._createVsText = function(a) {
        v = new createjs.Text(TEXT_VS, "100px " + FONT_GAME,
            "#000000");
        v.x = 0;
        v.y = 0;
        v.textAlign = "center";
        v.textBaseline = "middle";
        v.outline = 5;
        a.addChild(v);
        t = new createjs.Text(TEXT_VS, "100px " + FONT_GAME, TEXT_COLOR);
        t.x = 0;
        t.y = 0;
        t.textAlign = "center";
        t.textBaseline = "middle";
        a.addChild(t)
    };
    this.setChildIndex = function(a) {
        s_oStage.setChildIndex(p, a)
    };
    this.unload = function() {
        s_oStage.removeChild(p)
    };
    this._onExitVsPanel = function() {
        this.unload();
        s_oGame._onExitVsPanel();
        s_oInterface.unloadHelpPanel()
    };
    this._init(b, k, h, d, g);
    s_oVsPanel = this;
    return this
}
var s_oVsPanel = null;

function CToggle(b, k, h, d, g) {
    var c, p, a, m, A;
    this._init = function(b, d, g, h) {
        p = [];
        a = [];
        var k = new createjs.SpriteSheet({
            images: [g],
            frames: {
                width: g.width / 2,
                height: g.height,
                regX: g.width / 2 / 2,
                regY: g.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        c = h;
        m = createSprite(k, "state_" + c, g.width / 2 / 2, g.height / 2, g.width / 2, g.height);
        m.x = b;
        m.y = d;
        m.stop();
        s_bMobile || (m.cursor = "pointer");
        A.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", this.buttonDown);
        m.off("pressup", this.buttonRelease);
        A.removeChild(m)
    };
    this._initListener = function() {
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(b, c, d) {
        p[b] = c;
        a[b] = d
    };
    this.setCursorType = function(a) {
        m.cursor = a
    };
    this.setActive = function(a) {
        c = a;
        m.gotoAndStop("state_" + c)
    };
    this.buttonRelease = function() {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("click", 1, 0);
        c = !c;
        m.gotoAndStop("state_" + c);
        p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(a[ON_MOUSE_UP], c)
    };
    this.buttonDown = function() {
        m.scaleX = .9;
        m.scaleY = .9;
        p[ON_MOUSE_DOWN] &&
            p[ON_MOUSE_DOWN].call(a[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        m.x = a;
        m.y = b
    };
    A = g;
    this._init(b, k, h, d)
}
var s_iOffsetX = 0,
    s_iOffsetY = 0;
(function(b) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(b) {
    console.log(b)
}

function isIOS() {
    for (var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); b.length;)
        if (navigator.platform === b.pop()) return s_bIsIphone = !0;
    return s_bIsIphone = !1
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getSize(b) {
    var k = b.toLowerCase(),
        h = window.document,
        d = h.documentElement;
    if (void 0 === window["inner" + b]) b = d["client" + b];
    else if (window["inner" + b] != d["client" + b]) {
        var g = h.createElement("body");
        g.id = "vpw-test-b";
        g.style.cssText = "overflow:scroll";
        var c = h.createElement("div");
        c.id = "vpw-test-d";
        c.style.cssText = "position:absolute;top:-1000px";
        c.innerHTML = "<style>@media(" + k + ":" + d["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + k + ":7px!important}}</style>";
        g.appendChild(c);
        d.insertBefore(g, h.head);
        b = 7 == c["offset" + b] ? d["client" + b] : window["inner" + b];
        d.removeChild(g)
    } else b = window["inner" + b];
    return b
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var b = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < b ? b : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var b;
        b = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var k = getSize("Width");
        s_iScaleFactor = Math.min(b / CANVAS_HEIGHT, k / CANVAS_WIDTH);
        var h = CANVAS_WIDTH * s_iScaleFactor,
            d = CANVAS_HEIGHT * s_iScaleFactor,
            g = 0;
        d < b ? (g = b - d, d += g, h += CANVAS_WIDTH / CANVAS_HEIGHT * g) : h < k && (g = k - h, h += g, d += CANVAS_HEIGHT / CANVAS_WIDTH * g);
        var g = b / 2 - d / 2,
            c = k / 2 - h / 2,
            p = CANVAS_WIDTH / h;
        if (c * p < -EDGEBOARD_X || g * p < -EDGEBOARD_Y) s_iScaleFactor = Math.min(b /
            (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), k / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), h = CANVAS_WIDTH * s_iScaleFactor, d = CANVAS_HEIGHT * s_iScaleFactor, g = (b - d) / 2, c = (k - h) / 2, p = CANVAS_WIDTH / h;
        s_iOffsetX = -1 * c * p;
        s_iOffsetY = -1 * g * p;
        0 <= g && (s_iOffsetY = 0);
        0 <= c && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oTeamChoose && s_oTeamChoose.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oHelpPanel && s_oHelpPanel.refreshButtonPos(s_iOffsetX,
            s_iOffsetY);
        null !== s_oCongratulations && s_oCongratulations.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oVsPanel && s_oVsPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", h + "px");
        $("#canvas").css("height", d + "px");
        0 > g ? $("#canvas").css("top", g + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", c + "px")
    }
}

function createBitmap(b, k, h) {
    var d = new createjs.Bitmap(b),
        g = new createjs.Shape;
    k && h ? g.graphics.beginFill("#fff").drawRect(-k / 2, -h / 2, k, h) : g.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    d.hitArea = g;
    return d
}

function createSprite(b, k, h, d, g, c) {
    b = null !== k ? new createjs.Sprite(b, k) : new createjs.Sprite(b);
    k = new createjs.Shape;
    k.graphics.beginFill("#000000").drawRect(-h, -d, g, c);
    b.hitArea = k;
    return b
}

function randomFloatBetween(b, k, h) {
    "undefined" === typeof h && (h = 2);
    return parseFloat(Math.min(b + Math.random() * (k - b), k).toFixed(h))
}

function shuffle(b) {
    for (var k = b.length, h, d; 0 !== k;) d = Math.floor(Math.random() * k), --k, h = b[k], b[k] = b[d], b[d] = h;
    return b
}

function formatTime(b) {
    b /= 1E3;
    var k = Math.floor(b / 60);
    b = parseFloat(b - 60 * k).toFixed(1);
    var h = "",
        h = 10 > k ? h + ("0" + k + ":") : h + (k + ":");
    return 10 > b ? h + ("0" + b) : h + b
}

function degreesToRadians(b) {
    return b * Math.PI / 180
}

function checkRectCollision(b, k) {
    var h, d;
    h = getBounds(b, .9);
    d = getBounds(k, .98);
    return calculateIntersection(h, d)
}

function calculateIntersection(b, k) {
    var h, d, g, c, p, a, m, A;
    h = b.x + (g = b.width / 2);
    d = b.y + (c = b.height / 2);
    p = k.x + (a = k.width / 2);
    m = k.y + (A = k.height / 2);
    h = Math.abs(h - p) - (g + a);
    d = Math.abs(d - m) - (c + A);
    return 0 > h && 0 > d ? (h = Math.min(Math.min(b.width, k.width), -h), d = Math.min(Math.min(b.height, k.height), -d), {
        x: Math.max(b.x, k.x),
        y: Math.max(b.y, k.y),
        width: h,
        height: d,
        rect1: b,
        rect2: k
    }) : null
}

function getBounds(b, k) {
    var h = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (b instanceof createjs.Container) {
        h.x2 = -Infinity;
        h.y2 = -Infinity;
        var d = b.children,
            g = d.length,
            c, p;
        for (p = 0; p < g; p++) c = getBounds(d[p], 1), c.x < h.x && (h.x = c.x), c.y < h.y && (h.y = c.y), c.x + c.width > h.x2 && (h.x2 = c.x + c.width), c.y + c.height > h.y2 && (h.y2 = c.y + c.height);
        Infinity == h.x && (h.x = 0);
        Infinity == h.y && (h.y = 0);
        Infinity == h.x2 && (h.x2 = 0);
        Infinity == h.y2 && (h.y2 = 0);
        h.width = h.x2 - h.x;
        h.height = h.y2 - h.y;
        delete h.x2;
        delete h.y2
    } else {
        var a, m;
        b instanceof createjs.Bitmap ?
            (g = b.sourceRect || b.image, p = g.width * k, a = g.height * k) : b instanceof createjs.Sprite ? b.spriteSheet._frames && b.spriteSheet._frames[b.currentFrame] && b.spriteSheet._frames[b.currentFrame].image ? (g = b.spriteSheet.getFrame(b.currentFrame), p = g.rect.width, a = g.rect.height, d = g.regX, m = g.regY) : (h.x = b.x || 0, h.y = b.y || 0) : (h.x = b.x || 0, h.y = b.y || 0);
        d = d || 0;
        p = p || 0;
        m = m || 0;
        a = a || 0;
        h.regX = d;
        h.regY = m;
        g = b.localToGlobal(0 - d, 0 - m);
        c = b.localToGlobal(p - d, a - m);
        p = b.localToGlobal(p - d, 0 - m);
        d = b.localToGlobal(0 - d, a - m);
        h.x = Math.min(Math.min(Math.min(g.x,
            c.x), p.x), d.x);
        h.y = Math.min(Math.min(Math.min(g.y, c.y), p.y), d.y);
        h.width = Math.max(Math.max(Math.max(g.x, c.x), p.x), d.x) - h.x;
        h.height = Math.max(Math.max(Math.max(g.y, c.y), p.y), d.y) - h.y
    }
    return h
}

function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b)
        }
    },
    onTouchStart: function(b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(b) {
        this.moved = !0
    },
    onTouchEnd: function(b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 == b.nodeType && (b = b.parentNode);
            var k = document.createEvent("MouseEvents");
            k.initEvent("click", !0, !0);
            b.dispatchEvent(k)
        }
    }
};
(function() {
    function b(b) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in d ? document.body.className = d[b.type] : (document.body.className = this[k] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var k = "hidden";
    k in document ? document.addEventListener("visibilitychange", b) : (k = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", b) : (k = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", b) : (k = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b
})();

function playSound(b, k, h) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? createjs.Sound.play(b, {
        loop: h,
        volume: k
    }) : null
}

function stopSound(b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || b.stop()
}

function setVolume(b, k) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) b.volume = k
}

function setMute(b, k) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || b.setMute(k)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(b) {
    for (var k = window.location.search.substring(1).split("&"), h = 0; h < k.length; h++) {
        var d = k[h].split("=");
        if (d[0] == b) return d[1]
    }
}

function distanceV2(b, k) {
    var h = b.x - k.x,
        d = b.y - k.y;
    return Math.sqrt(h * h + d * d)
}

function randomRange(b, k) {
    return Math.floor(Math.random() * (k - b)) + b
}

function CTimeBoard(b, k, h) {
    var d, g, c, p, a;
    this._init = function(b, h, k) {
        d = {
            x: h,
            y: k
        };
        g = new createjs.Container;
        g.x = d.x;
        g.y = d.y;
        c = createBitmap(b);
        c.x = 0;
        c.y = 0;
        c.regX = 0;
        c.regY = 0;
        g.addChild(c);
        a = new createjs.Text(TEXT_TIME + ": 0", "28px " + FONT_GAME, "#000000");
        a.x = .5 * b.width;
        a.y = .5 * b.height;
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.outline = 5;
        g.addChild(a);
        p = new createjs.Text(TEXT_TIME + ": 0", "28px " + FONT_GAME, TEXT_COLOR);
        p.x = .5 * b.width;
        p.y = .5 * b.height;
        p.textAlign = "center";
        p.textBaseline = "middle";
        g.addChild(p);
        s_oStage.addChild(g)
    };
    this.getStartPosition = function() {
        return d
    };
    this.setPosition = function(a, b) {
        g.x = a;
        g.y = b
    };
    this.unload = function() {
        s_oStage.removeChild(g)
    };
    this.refresh = function(b) {
        p.text = b;
        a.text = b
    };
    this._init(b, k, h);
    return this
}

function CTextButton(b, k, h, d, g, c, p, a) {
    var m, A, v, t;
    this._init = function(a, b, c, d, e, g, h) {
        m = [];
        A = [];
        var k = createBitmap(c),
            p = Math.ceil(h / 20),
            N = new createjs.Text(d, "bold " + h + "px " + e, "#000000");
        N.textAlign = "center";
        N.textBaseline = "alphabetic";
        var F = N.getBounds();
        N.x = c.width / 2 + p;
        N.y = Math.floor(c.height / 2) + F.height / 3 + p;
        d = new createjs.Text(d, "bold " + h + "px " + e, g);
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        F = d.getBounds();
        d.x = c.width / 2;
        d.y = Math.floor(c.height / 2) + F.height / 3;
        v = new createjs.Container;
        v.x = a;
        v.y = b;
        v.regX = c.width / 2;
        v.regY = c.height / 2;
        v.addChild(k, N, d);
        s_bMobile || (v.cursor = "pointer");
        t.addChild(v);
        this._initListener()
    };
    this.unload = function() {
        v.off("mousedown");
        v.off("pressup");
        t.removeChild(v)
    };
    this.setVisible = function(a) {
        v.visible = a
    };
    this._initListener = function() {
        oParent = this;
        v.on("mousedown", this.buttonDown);
        v.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        m[a] = b;
        A[a] = c
    };
    this.buttonRelease = function() {
        v.scaleX = 1;
        v.scaleY = 1;
        playSound("click", 1, 0);
        m[ON_MOUSE_UP] &&
            m[ON_MOUSE_UP].call(A[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        v.scaleX = .9;
        v.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(A[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        v.x = a;
        v.y = b
    };
    this.setX = function(a) {
        v.x = a
    };
    this.setY = function(a) {
        v.y = a
    };
    this.getButtonImage = function() {
        return v
    };
    this.getX = function() {
        return v.x
    };
    this.getY = function() {
        return v.y
    };
    t = a;
    this._init(b, k, h, d, g, c, p);
    return this
};