!function() {
    "use strict";
    class t {
        static normalize(t) {
            var e = t.x * t.x + t.y * t.y;
            if (1 == e) return new Laya.Point(t.x, t.y);
            if (0 == e) return new Laya.Point(t.x, t.y);
            let a = new Laya.Point();
            var i = 1 / Math.sqrt(e);
            return a.x = t.x * i, a.y = t.y * i, a;
        }
        static normalizeSelf(t) {
            var e = t.x * t.x + t.z * t.z;
            if (1 == e) return t;
            if (0 == e) return t;
            var a = 1 / Math.sqrt(e);
            return t.x = t.x * a, t.z = t.z * a, t;
        }
        static mul(t, e) {
            let a = new Laya.Point();
            return a.x = t.x * e, a.y = t.y * e, a;
        }
        static magSqr(t) {
            return t.x * t.x + t.y * t.y;
        }
        static add(t, e) {
            let a = new Laya.Point();
            return a.x = t.x + e.x, a.y = t.y + e.y, new Laya.Point(a.x, a.y);
        }
        static dot(t, e) {
            return t.x * e.x + t.y * e.y;
        }
        static distanceVector2(t, e) {
            let a = t.x - e.x, i = t.y - e.y;
            return a * a + i * i;
        }
        static distanceSquared(t, e) {
            let a = t.x - e.x, i = t.y - e.y;
            return a * a + i * i;
        }
        static rotateY(t, e) {
            var a = Math.sin(e), i = Math.cos(e), s = t.x;
            return t.x = i * s - a * t.z, t.z = a * s + i * t.z, t;
        }
        static angleY(t, e) {
            let a = t.x - e.x, i = t.z - e.z;
            return 180 * Math.atan2(a, i) / Math.PI;
        }
        static getTargetAngle(t, e) {
            var a = new Laya.Vector3();
            return Laya.Vector3.subtract(e, t, a), 180 * Math.atan2(a.x, a.z) / Math.PI;
        }
        static angleY2(t) {
            return 180 * Math.atan2(t.x, t.z) / Math.PI;
        }
        static angleX(t, e) {
            let a = t.y - e.y, i = t.z - e.z;
            return 180 * Math.atan2(-a, i) / Math.PI;
        }
        static angleDirection(t, e) {
            Laya.Vector3.normalize(t, t);
            var a = Laya.Vector3.dot(t, e), i = Math.acos(a);
            return i = Math.PI / 2 - i, t.z < 0 && (i = Math.PI - i), i *= this.RADIUS_TO_ANGLE;
        }
        static cross(t, e) {
            return t.x * e.y - t.y * e.x;
        }
        static angle(t, e) {
            var a = this.magSqr(t), i = this.magSqr(e);
            if (0 === a || 0 === i) return 0;
            var s = this.dot(t, e) / Math.sqrt(a * i);
            return s = this.clampf(s, -1, 1), Math.acos(s);
        }
        static clampf(t, e, a) {
            if (e > a) {
                var i = e;
                e = a, a = i;
            }
            return t < e ? e : t < a ? t : a;
        }
        static random(t, e) {
            return Math.random() * (e - t) + t << 0;
        }
        static probabilityCanHappen(t) {
            return this.random(0, 100) <= t;
        }
        static scaleTo(t, e, a, i, s, o) {
            Laya.Tween.to(t, {
                scaleX: e,
                scaleY: e
            }, .5 * i, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(t, {
                    scaleX: a,
                    scaleY: a
                }, .5 * i, null, Laya.Handler.create(s, o));
            }));
        }
        static scaleToDefault(t, e, a) {
            this.scaleTo(t, .8, 1, 200, e, a);
        }
        static delayMouseEnabled(t) {
            Laya.stage.timerOnce(500, this, () => {
                t && (t.mouseEnabled = !0);
            });
        }
        static ComputeCollision(t, e, a, i, s) {
            var o = Math.min(i, .5 * t), r = Math.max(o, .5 * -t), n = Math.min(s, .5 * e), l = Math.max(n, .5 * -e);
            return (r - i) * (r - i) + (l - s) * (l - s) <= a * a;
        }
        static segmentsIntr(t, e, a, i) {
            var s = (t.x - a.x) * (e.y - a.y) - (t.y - a.y) * (e.x - a.x), o = (t.x - i.x) * (e.y - i.y) - (t.y - i.y) * (e.x - i.x);
            if (s * o >= 0) return !1;
            var r = (a.x - t.x) * (i.y - t.y) - (a.y - t.y) * (i.x - t.x);
            if (r * (r + s - o) >= 0) return !1;
            var n = r / (o - s), l = n * (e.x - t.x), h = n * (e.y - t.y);
            return {
                x: t.x + l,
                y: t.y + h
            };
        }
        static judgeIntersect(t, e, a, i, s, o, r, n) {
            return Math.min(t, a) <= Math.max(s, r) && Math.min(o, n) <= Math.max(e, i) && Math.min(s, r) <= Math.max(t, a) && Math.min(e, i) <= Math.max(o, n) && (((s - t) * (i - e) - (a - t) * (o - e)) * ((r - t) * (i - e) - (a - t) * (n - e)) <= 1e-8 && ((t - s) * (n - o) - (r - s) * (e - o)) * ((a - s) * (n - o) - (r - s) * (i - o)) <= 1e-8);
        }
        static vectorDirection(t, e) {
            var a = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.subtract(e, t, a);
            var i = new Laya.Vector3(0, 0, 0);
            return Laya.Vector3.normalize(a, i), i;
        }
        static lerp(t, e, a) {
            return t + (e - t) * Math.min(1, a);
        }
        static IsNumber(t) {
            return !(!/^\d+(\.\d+)?$/.test(t) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(t));
        }
        static padding(t, e) {
            for (var a = (t + "").length; a < e; a = t.length) t = "0" + t;
            return t;
        }
        static Reflect(t, e) {
            let a = new Laya.Vector3();
            return Laya.Vector3.normalize(t, t), Laya.Vector3.normalize(e, e), Laya.Vector3.scale(e, 2 * Laya.Vector3.dot(t, e), a), 
            Laya.Vector3.subtract(t, a, a), a;
        }
        static WorldToScreen2(t, e) {
            var a = this.InverseTransformPoint(t.transform, e).z, i = new Laya.Vector3();
            return t.viewport.project(e, t.projectionViewMatrix, i), new Laya.Vector3(i.x / Laya.stage.clientScaleX, i.y / Laya.stage.clientScaleY, a);
        }
        static ScreenToWorld(t, e) {
            var a = .5 * t.fieldOfView * Math.PI / 180;
            let i = e.z * Math.tan(a), s = i * t.aspectRatio, o = this.GetLowerLeft(t.transform, e.z, s, i), r = this.GetScreenScale(s, i);
            var n = new Laya.Vector3(), l = this.InverseTransformPoint(t.transform, o);
            return n = new Laya.Vector3(-e.x / r.x, e.y / r.y, 0), Laya.Vector3.add(l, n, n), 
            n = this.TransformPoint(t.transform, n);
        }
        static GetScreenScale(t, e) {
            var a = new Laya.Vector3();
            return a.x = Laya.stage.width / t / 2, a.y = Laya.stage.height / e / 2, a;
        }
        static GetLowerLeft(t, e, a, i) {
            var s = new Laya.Vector3(), o = new Laya.Vector3();
            t.getRight(o), Laya.Vector3.normalize(o, o);
            var r = new Laya.Vector3(o.x * a, o.y * a, o.z * a);
            Laya.Vector3.add(t.position, r, s);
            var n = new Laya.Vector3();
            t.getUp(n), Laya.Vector3.normalize(n, n);
            var l = new Laya.Vector3(n.x * i, n.y * i, n.z * i);
            Laya.Vector3.subtract(s, l, s);
            var h = new Laya.Vector3();
            t.getForward(h), Laya.Vector3.normalize(h, h);
            var d = new Laya.Vector3(h.x * e, h.y * e, h.z * e);
            return Laya.Vector3.subtract(s, d, s), s;
        }
        static InverseTransformPoint(t, e) {
            var a = new Laya.Vector3();
            t.getRight(a);
            var i = new Laya.Vector3();
            t.getUp(i);
            var s = new Laya.Vector3();
            t.getForward(s);
            var o = new Laya.Vector3(-s.x, -s.y, -s.z), r = this.ProjectDistance(e, t.position, a), n = this.ProjectDistance(e, t.position, i), l = this.ProjectDistance(e, t.position, o);
            return new Laya.Vector3(r, n, l);
        }
        static TransformPoint(t, e) {
            var a = new Laya.Vector3();
            return Laya.Vector3.transformQuat(e, t.rotation, a), Laya.Vector3.add(a, t.position, a), 
            a;
        }
        static ProjectDistance(t, e, a) {
            var i = new Laya.Vector3();
            Laya.Vector3.subtract(t, e, i);
            var s = this.Angle2(i, a) * Math.PI / 180, o = Laya.Vector3.distance(t, e);
            return o *= Math.cos(s);
        }
        static Angle2(t, e) {
            var a = (t.x * e.x + t.y * e.y + t.z * e.z) / (Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z) * Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z));
            return a < -1 && (a = -1), a > 1 && (a = 1), 180 * Math.acos(a) / Math.PI;
        }
        static IsEqual(t, e) {
            return Math.abs(t - e) < 1e-5;
        }
        static screen2worldPos(t, e, a, i, s = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, o = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            let r = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), n = new Laya.HitResult();
            a.setValue(a.x / Laya.stage.width, a.y / Laya.stage.height), e.normalizedViewportPointToRay(a, r), 
            t.physicsSimulation.rayCast(r, n), n.succeeded && (console.log("碰撞的：", n.collider.owner.name), 
            i.setValue(n.point.x, n.point.y, n.point.z), console.log("worldPos", i));
        }
        static mutation(t, e) {
            if (t.length != e.length) return !1;
            for (var a = t.toLowerCase(), i = e.toLowerCase(), s = 0; s < i.length; s++) if (-1 === a.indexOf(i[s])) return !1;
            return !0;
        }
        static isCollision(t, e, a, i, s, o) {
            return t >= a && t <= a + s && e >= i && e <= i + o;
        }
        static isCollisionWithRect(t, e, a, i, s, o, r, n) {
            return !(t >= s && t >= s + r) && (!(t <= s && t + a <= s) && (!(e >= o && e >= o + n) && !(e <= o && e + i <= o)));
        }
        static activeAllChild(t, e) {
            if (t) for (let a = 0; a < t.numChildren; a++) {
                t.getChildAt(a).active = e;
            }
        }
        static unique(t) {
            for (var e = [], a = [], i = t.length, s = 0; s < i; s++) {
                for (var o = s + 1; o < i; o++) t[s] === t[o] && (o = ++s);
                e.push(t[s]), a.push(s);
            }
            return e;
        }
        CreatorTwoBezierPoint(t, e, a, i) {
            for (var s = [], o = 0, r = 0; r < i; r++) {
                let r = Math.pow(1 - o, 2) * t.x + 2 * o * (1 - o) * e.x + Math.pow(o, 2) * a.x, n = Math.pow(1 - o, 2) * t.y + 2 * o * (1 - o) * e.y + Math.pow(o, 2) * a.y, l = Math.pow(1 - o, 2) * t.z + 2 * o * (1 - o) * e.z + Math.pow(o, 2) * a.z;
                s.push(new Laya.Vector3(r, n, l)), o += 1 / i;
            }
            return s;
        }
    }
    t.UP = new Laya.Vector3(0, 1, 0), t.LEFT = new Laya.Vector3(1, 0, 0), t.RIGHT = new Laya.Vector3(-1, 0, 0), 
    t.FORWARD = new Laya.Vector3(0, 0, 1), t.ONE = new Laya.Vector3(1, 1, 1), t.ZERO = new Laya.Vector3(0, 0, 0), 
    t.RADIUS_TO_ANGLE = 180 / Math.PI, t.ANGLE_TO_RADIUS = Math.PI / 180, t.signAngle = function(t, e) {
        let a = this.angle(t, e);
        return this.cross(t, e) < 0 ? -a : a;
    };
    class e {
        constructor() {
            this.curStageId = 1, this.gold = 0, this.gameFinish = !1, this.stageCount = 1, this.stageCfg = [];
        }
        set gameGold(t) {
            this.gold += t, zs.laya.game.AppMain.playerInfo.gold = this.gold;
        }
        get curStage() {
            return this.curStageId;
        }
        set curStage(e) {
            let a = Math.max(1, e);
            var i = Laya.LocalStorage.getItem("zsjnmgamestage");
            t.IsNumber(i) && (a = Math.max(a, Number(i))), Laya.LocalStorage.setItem("zsjnmgamestage", a.toString()), 
            zs.laya.game.AppMain.playerInfo.level_id = a, this.curStageId = a;
        }
        static initStageData(t) {
            t && (this.data.stageCfg = t.leveldata, this.data.stageCount = this.data.stageCfg.length);
        }
        static initGameData() {
            this.updatePlayerInfo(zs.laya.game.AppMain.playerInfo);
        }
        static updatePlayerInfo(t) {
            t && (this.data.gameGold = zs.laya.game.AppMain.playerInfo.gold, this.data.curStage = zs.laya.game.AppMain.playerInfo.level_id, 
            console.log("==========更新用户信息==========="));
        }
        getStageLockGrids(t) {
            let e = [], a = this.getStageData(t).key;
            for (let t = 0; t < a.length; t++) {
                let i = a[t].lockGrids;
                e = e.concat(i);
            }
            return console.log("lockgrids", e), e;
        }
        getStageRoomState(t) {
            let e = [], a = this.getStageData(t).grids;
            for (let t = 0; t < a.length; t++) {
                let i = a[t].grid;
                e.push(i);
            }
            return console.log("roomstateArr", e), e;
        }
        getStageStartRoom(t) {
            let e = new Laya.Vector2(), a = this.getStageData(t).startRoomId;
            return e.x = Number(a.substr(0, 2)), e.y = Number(a.substr(2, 2)), console.log("startpos", e), 
            e;
        }
        getStageEndRoom(t) {
            let e = new Laya.Vector2(), a = this.getStageData(t).endRoomId;
            return e.x = Number(a.substr(0, 2)), e.y = Number(a.substr(2, 2)), console.log("endpos", e), 
            e;
        }
        getStageData(t) {
            return t = Math.min(t, this.stageCfg.length), this.stageCfg[t - 1];
        }
    }
    e.data = new e();
    class a extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.stageLabel.text = e.data.curStage.toString();
        }
        onDisable() {}
    }
    class i {}
    i.Game_Check_Astar = "Game_Check_Astar", i.Game_Enter_NextDoor = "Game_Enter_NextDoor", 
    i.Stage_Finish = "Stage_Finish", i.Stage_Fail = "Stage_Fail", i.Game_Pour_Water = "Game_Pour_Water", 
    i.Game_ResetGame = "Game_ResetGame", i.Game_Hide_Guide = "Game_Hide_Guide";
    class s {}
    var o;
    s.Sound_Click = "sound/buttonClick.wav", s.Sprite3d_player = "man", s.Sprite3d_woman = "woman", 
    s.Sprite3d_grid = "grid", s.Sprite3d_wall = "wall", s.Sprite3d_knife = "move_tarp_blade", 
    s.Sprite3d_Spike = "move_tarp_wall", s.Sprite3d_bomb = "fixed_tarp_bomb", s.Sprite3d_arrow = "fixed_tarp_arrow", 
    s.Sprite3d_frame = "fixed_tarp_frame", s.Sprite3d_beast = "fixed_tarp_tarps", s.Sprite3d_arrowbullet = "arrow", 
    s.Sprite3d_dog = "dog", s.Sprite3d_robber = "robber", s.Sprite3d_door = "door", 
    s.Sprite3d_keydoor = "keydoor", s.Sprite3d_keyboard = "keyboard", s.Sprite3d_keybaffle = "keybaffle", 
    s.Sprite3d_stage = "stage", s.Sprite3d_stageroot = "stages", function(t) {
        t[t.unknow = 0] = "unknow", t[t.player = 1] = "player", t[t.woman = 2] = "woman", 
        t[t.robber = 3] = "robber", t[t.dog = 4] = "dog";
    }(o || (o = {}));
    var r = zs.laya.AnimStateListener;
    class n extends Laya.Script {
        onAwake() {
            this.mod = this.owner.getChildByName("mod"), this.animator = this.mod.getComponent(Laya.Animator), 
            this.animator.speed = 0;
        }
        onStart() {
            this.character = this.owner.getComponent(h);
        }
        onEnable() {
            super.onEnable(), r.setListener(this.animator, n.man_win_star, this, null, this.onwinkeepCallback), 
            r.setListener(this.animator, n.man_scare_star, this, null, this.onmanScareKeepCallback), 
            r.setListener(this.animator, n.man_scare_end, this, null, this.onmanScareEndCallback), 
            r.setListener(this.animator, n.woman_scare_star, this, null, this.onwomanScareKeepCallback), 
            r.setListener(this.animator, n.woman_scare_end, this, null, this.onwomanScareEndCallback), 
            r.setListener(this.animator, n.man_fear_star, this, null, this.onmanFearKeepCallback), 
            r.setListener(this.animator, n.man_fear_end, this, null, this.onmanFearEndCallback), 
            r.setListener(this.animator, n.robber_scare_star, this, null, this.onrobberScareKeepCallback), 
            r.setListener(this.animator, n.robber_scare_end, this, null, this.onrobberScareEndCallback), 
            r.setListener(this.animator, n.woman_win_star, this, null, this.onwomanwinkeepCallback), 
            r.setListener(this.animator, n.man_puzzle, this, null, this.onpuzzleCallback);
        }
        onDisable() {
            super.onDestroy();
        }
        onwinkeepCallback() {
            this.play(n.man_win_keep);
        }
        onpuzzleCallback() {
            this.play(n.man_wait);
        }
        onwomanScareKeepCallback() {
            this.play(n.woman_scare_keep);
        }
        onmanFearKeepCallback() {
            this.play(n.man_fear_keep);
        }
        onmanFearEndCallback() {
            this.character && this.character.playStopAni();
        }
        onrobberScareKeepCallback() {
            this.play(n.robber_scare_keep);
        }
        onrobberScareEndCallback() {
            this.character && this.character.playStopAni();
        }
        onwomanwinkeepCallback() {
            this.play(n.woman_win_keep);
        }
        onmanScareKeepCallback() {
            this.play(n.man_scare_keep);
        }
        onmanScareEndCallback() {
            this.character && this.character.playStopAni();
        }
        onwomanScareEndCallback() {
            this.character && this.character.playStopAni();
        }
        ontaijiaoCallback() {}
        onDestroy() {
            this.animator = null, this.character = null, this.curClipName = null;
        }
        play(t) {
            this.animator && t && this.curClipName != t && this.character && (this.animator.play(t, 0, 0), 
            this.character.roleType == o.player && console.debug(t), this.curClipName = t, this.animator.speed = 1);
        }
    }
    n.dog_wait = "dog_wait", n.dog_move = "dog_move", n.dog_atk = "dog_atk", n.dog_death = "dog_death", 
    n.man_wait = "man_wait", n.man_win_star = "man_win_star", n.man_scare_star = "man_scare_star", 
    n.man_flower = "man_flower", n.man_move = "man_move", n.man_fear_star = "man_fear_star", 
    n.man_puzzle = "man_puzzle", n.man_win_keep = "man_win_keep", n.man_win_end = "man_win_end", 
    n.man_scare_keep = "man_scare_keep", n.man_scare_end = "man_scare_end", n.man_fear_keep = "man_fear_keep", 
    n.man_fear_end = "man_fear_end", n.man_death = "man_death", n.robber_move = "robber_move", 
    n.robber_run = "robber_run", n.robber_death = "robber_death", n.robber_scare_star = "robber_scare_star", 
    n.robber_scare_keep = "robber_scare_keep", n.robber_scare_end = "robber_scare_end", 
    n.robber_atk = "robber_atk", n.robber_wait = "robber_wait", n.woman_wait = "woman_wait", 
    n.woman_win_star = "woman_win_star", n.woman_win_keep = "woman_win_keep", n.woman_win_end = "woman_win_end", 
    n.woman_scare_star = "woman_scare_star", n.woman_scare_keep = "woman_scare_keep", 
    n.woman_scare_end = "woman_scare_end", n.woman_kiss = "woman_kiss", n.woman_death = "woman_death";
    var l = zs.laya.TriggerScript3d;
    class h extends Laya.Script3D {
        constructor() {
            super(...arguments), this.roleType = o.unknow, this.isPause = !0, this.isAI = !0, 
            this.curRoomId = null, this.endRoomId = null, this.targetRoomId = null, this.doorIndex = 1, 
            this.targetList = [], this.targetObj = null;
        }
        setScene3d(t) {
            this.scene3d = t;
        }
        onEnable() {
            this.initEvent();
        }
        onDisable() {
            this.removeEvent();
        }
        onStart() {
            this.sprite3d = this.owner, this.mtransform = this.sprite3d.transform, l.Init(this.sprite3d, this), 
            this.animatorController = this.owner.getComponent(n);
        }
        setNextTargetDoor() {}
        getNextRoomId() {
            return null;
        }
        initEvent() {
            Laya.stage.on(h.EVENT_PAUSE, this, this.onPause), Laya.stage.on(h.EVENT_RESUME, this, this.onResume);
        }
        removeEvent() {
            Laya.stage.off(h.EVENT_PAUSE, this, this.onPause), Laya.stage.off(h.EVENT_RESUME, this, this.onResume);
        }
        onResume() {
            this.isPause = !1;
        }
        onPause() {
            this.isPause = !0;
        }
        onDie() {
            this.onPause(), this.setColliderEnable(!1);
        }
        onWin() {
            this.onPause(), this.setColliderEnable(!1);
        }
        setColliderEnable(t) {
            this.owner.frameOnce(1, this, () => {
                this.rigidbody3d && (this.rigidbody3d.enabled = t), this.collider3d && (this.collider3d.enabled = t);
            });
        }
        zsTriggerEnter(t, e) {
            console.log(e.owner.name);
        }
        zsTriggerStay(t, e) {}
        zsTriggerExit(t, e) {}
        zsCollisionEnter(t, e) {}
        zsCollisionStay(t, e) {}
        zsCollisionExit(t, e) {}
        playWaitAni() {}
        playStopAni() {}
        playAtkAni() {}
        playDieAni() {}
        playScareAni() {}
        playScareEndAni() {}
        playMoveAni() {}
        playRunAni() {}
    }
    h.EVENT_PAUSE = "pause", h.EVENT_RESUME = "resume";
    class d extends Laya.Script3D {
        constructor() {
            super(), this.camera = null, this.cameraApe = null, this.cameraTransform = null, 
            this.defaultCamPosition = new Laya.Vector3(), this.defaultCamRotation = new Laya.Vector3(), 
            this.curCamPosition = new Laya.Vector3(), this.curCamRotation = new Laya.Vector3(), 
            this.offsetRotation = new Laya.Vector3(), this.offsetPosition = new Laya.Vector3(), 
            this.animator = null, this.pongEffect = null, this.speedEffect = null;
        }
        initCameraByPlayer(t) {
            this.target = t, t && (this.cameraApe.transform.position = this.defaultCamPosition.clone(), 
            this.defaultCamPosition.cloneTo(this.curCamPosition), Laya.Vector3.subtract(this.curCamPosition, t.transform.position, this.offsetPosition), 
            this.cameraApe.transform.rotationEuler = this.defaultCamRotation.clone(), this.defaultCamRotation.cloneTo(this.curCamRotation), 
            Laya.Vector3.subtract(this.curCamRotation, t.transform.rotationEuler, this.offsetRotation));
        }
        updateCameraByPlayer(t) {
            this.target = t;
        }
        updateRotation(t) {
            let e = -t;
            Laya.Tween.to(this.cameraApe.transform, {
                localRotationEulerY: e
            }, 500, null, null);
        }
        world2ScreenPos(t, e) {
            let a = new Laya.Vector4();
            this.camera.viewport.project(t, this.camera.projectionViewMatrix, a), e.x = a.x / Laya.stage.clientScaleX, 
            e.y = a.y / Laya.stage.clientScaleY;
        }
        camera2PlayerDir() {
            return this.target ? t.vectorDirection(this.camera.transform.position, this.target.transform.position) : t.FORWARD;
        }
        onAwake() {
            this.cameraApe = this.owner, 
            this.camera = this.cameraApe.getChildByName("Main Camera"), 
            this.cameraTransform = this.owner.transform, this.cameraApe.transform.position.cloneTo(this.defaultCamPosition), 
            this.defaultCamPosition.cloneTo(this.curCamPosition), this.cameraApe.transform.rotationEuler.cloneTo(this.defaultCamRotation), 
            this.defaultCamRotation.cloneTo(this.curCamRotation), Laya.stage.on("CameraTarget", this, this.initCameraByPlayer);
        }
        onEnable() {}
        onDisable() {}
        onDestroy() {
            this.camera = null, this.cameraApe = null;
        }
        onLateUpdate() {
            if (!this.target) return;
            new Laya.Vector3();
            this.cameraTransform.position = this.target.transform.position.clone();
        }
    }
    class c {}
    c.GROUP_PLAYER = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CHARACTERFILTER, c.GROUP_DOG = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, 
    c.GROUP_ROBBER = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5, c.GROUP_TRAP = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, 
    c.GROUP_GRID = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER10, c.GROUP_DOOR = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER6, 
    c.GROUP_KEY = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER7, c.GROUP_TRAP_RAY = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER8, 
    c.GROUP_BOWL = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER9, c.GROUP_TAP_RAY = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3, 
    c.GROUP_KEY_RAY = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4, c.CAN_PLAYER = c.GROUP_PLAYER | c.GROUP_DOG | c.GROUP_ROBBER | c.GROUP_TRAP | c.GROUP_DOOR | c.GROUP_TRAP_RAY | c.GROUP_GRID, 
    c.CAN_DOG = c.GROUP_PLAYER | c.GROUP_ROBBER | c.GROUP_TRAP | c.GROUP_GRID | c.GROUP_TRAP_RAY, 
    c.CAN_ROBBER = c.GROUP_PLAYER | c.GROUP_DOG | c.GROUP_TRAP | c.GROUP_GRID | c.GROUP_TRAP_RAY, 
    c.CAN_TRAP = c.GROUP_PLAYER | c.GROUP_DOG | c.GROUP_ROBBER, c.CAN_GRID = c.GROUP_KEY | c.GROUP_DOG | c.GROUP_ROBBER | c.GROUP_PLAYER, 
    c.CAN_KEY = c.GROUP_GRID | c.GROUP_KEY | c.GROUP_TAP_RAY | c.GROUP_BOWL | c.GROUP_KEY_RAY | c.GROUP_TRAP_RAY, 
    c.CAN_DOOR = c.GROUP_PLAYER, c.CAN_TRAP_RAY = c.GROUP_PLAYER | c.GROUP_DOG | c.GROUP_ROBBER | c.GROUP_KEY, 
    c.CAN_BOWL = c.GROUP_KEY, c.CAN_TAP_RAY = c.GROUP_KEY, c.CAN_KEY_RAY = c.GROUP_KEY;
    var m = zs.laya.ObjectPool;
    class y extends Laya.Script3D {
        constructor() {
            super(), this.doorIndex = 0, this.isPause = !0;
        }
        setScene3d(t) {
            this.scene3d = t;
        }
        onAwake() {
            this.sprite3d = this.owner, this.mtransform = this.sprite3d.transform, this.isPause = !0;
        }
        setColliderEnable(t) {
            this.rigidbody3d && (this.rigidbody3d.enabled = t), this.collider3d && (this.collider3d.enabled = t);
        }
        onEnable() {
            this.initEvent();
        }
        onDisable() {
            this.removeEvent();
        }
        initEvent() {}
        removeEvent() {}
        zsTriggerEnter(t, e) {
            console.log(e.owner.name);
        }
        zsTriggerStay(t, e) {}
        zsTriggerExit(t, e) {}
        removeElement(t = 0) {
            this.removeEffect(), this.setColliderEnable(!1), this.owner.timerOnce(t, this, () => {
                this.sprite3d.active = !1, m.RecoverSprite3d(this.sprite3d), this.sprite3d.removeSelf();
            });
        }
        removeEffect() {}
    }
    class p extends y {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake();
        }
        onStart() {
            super.onStart(), this.isPause = !1;
        }
    }
    class u extends h {
        constructor() {
            super(...arguments), this.rose3d = null, this.isMove = !1;
        }
        onAwake() {
            super.onAwake();
        }
        onStart() {
            if (super.onStart(), this.rigidbody3d = this.sprite3d.getComponent(Laya.Rigidbody3D), 
            this.rigidbody3d.angularFactor = new Laya.Vector3(0, 0, 0), this.rigidbody3d.angularVelocity = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.linearVelocity = new Laya.Vector3(0, 0, 0), this.rigidbody3d.collisionGroup = c.GROUP_PLAYER, 
            this.rigidbody3d.canCollideWith = c.CAN_PLAYER, this.rigidbody3d.sleepLinearVelocity = 0, 
            this.rigidbody3d.sleepAngularVelocity = 0, this.rigidbody3d.wakeUp(), this.rigidbody3d.enabled = !0, 
            this.curRoomId) {
                let t = q.Instance().grid.getNode(this.curRoomId.x, this.curRoomId.y), e = new Laya.Vector3(t.posX, 0, t.posY);
                this.mtransform.position = e, this.mtransform.localRotationEulerY = -90;
            }
            this.doorIndex = 0, this.targetRoomId = this.getNextRoomId(), this.rose3d = this.owner.getChildByName("mod").getChildByName("Bip001").getChildByName("Bip001 Pelvis").getChildByName("Bip001 Spine").getChildByName("Bip001 Spine1").getChildByName("Bip001 Neck").getChildByName("Bip001 R Clavicle").getChildByName("Bip001 R UpperArm").getChildByName("Bip001 R Forearm").getChildByName("Bip001 R Hand").getChildByName("rose"), 
            this.rose3d.active = !1, Laya.stage.event("CameraTarget", this.sprite3d), this.owner.frameOnce(1, this, () => {
                this.animatorController && this.animatorController.play(n.man_wait);
            });
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Pour_Water, this, this.playFearEnd);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Pour_Water, this, this.playFearEnd);
        }
        setNextTargetDoor() {
            this.doorIndex++, this.targetRoomId = this.getNextRoomId();
        }
        getNextRoomId() {
            let t = new Laya.Vector2(), e = q.Instance().curStageData.door;
            if (this.doorIndex < e.length) {
                let i = null;
                var a = this.doorIndex + 1;
                e.forEach(function(t) {
                    a != t.doorIndex || (i = t);
                }), i && t.setValue(i.girdX, i.girdY);
            } else t = this.endRoomId.clone();
            return t;
        }
        zsTriggerEnter(t, e) {
            if (super.zsTriggerEnter(t, e), e.owner.name == s.Sprite3d_grid) {
                let t = e.owner.getComponent(p);
                t && (console.log(t.gridX, t.gridY), this.curRoomId = new Laya.Vector2(t.gridX, t.gridY));
            }
            -1 == e.owner.name.indexOf("_tarp_") && "polySurface90" != e.owner.name && "tarp_collider" != e.owner.name || (console.log("碰到机关失败。"), 
            this.onDie()), e.owner.name != s.Sprite3d_dog && e.owner.name != s.Sprite3d_robber || (console.log("碰到敌人失败。"), 
            this.onDie()), e.owner.name == s.Sprite3d_arrowbullet && (console.log("碰到箭失败。"), 
            this.onDie()), e.owner.name == s.Sprite3d_woman && (console.log("游戏成功"), this.onWin());
        }
        zsTriggerExit(t, e) {
            super.zsTriggerExit(t, e);
        }
        onDie() {
            super.onDie(), this.playDieAni(),  YYGGames.audio.play("sound/man_death.mp3"), 
            !e.data.gameFinish && Laya.stage.event(i.Stage_Fail), e.data.gameFinish = !0;
        }
        onWin() {
            super.onWin(),  YYGGames.audio.play("sound/man_laugh.mp3"), this.stopWaitAni(), 
            this.rose3d.active = !0, this.animatorController && this.animatorController.play(n.man_flower);
        }
        playDieAni() {
            console.log("playDieAni"), this.stopWaitAni(), this.animatorController && this.animatorController.play(n.man_death);
        }
        playScareAni() {
            this.stopWaitAni(),  YYGGames.audio.play("sound/man_surprised.mp3"), this.animatorController && this.animatorController.play(n.man_scare_star);
        }
        playScareEndAni() {
            this.isMove || this.animatorController && this.animatorController.play(n.man_scare_end);
        }
        playMoveAni() {
            this.stopWaitAni(),  YYGGames.audio.play("sound/move.mp3", 1), this.isMove = !0, 
            this.animatorController && this.animatorController.play(n.man_move);
        }
        stopWaitAni() {
             YYGGames.audio.stop("sound/move.mp3"), this.isMove = !1, this.owner.clearTimer(this, this.playPuzzle);
        }
        playWaitAni() {
             YYGGames.audio.stop("sound/move.mp3"), this.isPause || (this.playPuzzle(), 
            this.owner.clearTimer(this, this.playPuzzle), this.owner.timerLoop(3e3, this, this.playPuzzle));
        }
        playPuzzle() {
            this.isPause || (this.isMove = !1, this.animatorController && this.animatorController.play(n.man_puzzle));
        }
        playStopAni() {
            this.playWaitAni();
        }
        playFearEnd() {
            this.animatorController && this.animatorController.play(n.man_fear_end);
        }
        checkFlameTrap() {
            var t = this.mtransform.position.clone();
            t.y = .5;
            var e = new Laya.Vector3(0, 0, 0), a = new Laya.Vector3(0, 0, 0);
            let i = new Laya.Vector3();
            this.mtransform.getForward(i), Laya.Vector3.scale(i, -8, a), Laya.Vector3.add(t, a, e);
            var s = new Laya.HitResult();
            if (this.scene3d.physicsSimulation.raycastFromTo(t, e, s, c.GROUP_PLAYER, c.GROUP_TRAP), 
            s.collider) {
                var o = s.collider.owner;
                console.log("前方是", o.name), "fixed_tarp_frame" === o.name && (console.log("前面有火"), 
                this.stopWaitAni(), this.animatorController && this.animatorController.play(n.man_fear_star), 
                this.owner.timerOnce(500, this, () => {
                     YYGGames.audio.play("sound/man_surprised.mp3");
                }));
            }
        }
    }
    class g extends Laya.Script {
        constructor() {
            super(...arguments), this.trackPoints = [], this.curIndex = 0, this.passDistance = 0, 
            this.nodeDistance = 0, this.moveDir = new Laya.Vector3(), this.isAutoMove = !1;
        }
        onStart() {
            this.character = this.owner.getComponent(u);
        }
        onEnable() {
            Laya.stage.on(i.Game_Check_Astar, this, this.checkAstar);
        }
        onDisable() {
            Laya.stage.off(i.Game_Check_Astar, this, this.checkAstar);
        }
        checkAstar() {
            if (this.isAutoMove = !1, this.character && !this.character.isPause) {
                let a = this.trackPoints.length;
                if (this.trackPoints = [], this.character.curRoomId.x == this.character.targetRoomId.x && this.character.curRoomId.y == this.character.targetRoomId.y) {
                    this.trackPoints.push(this.character.mtransform.position.clone());
                    let t = q.Instance().grid.getNode(this.character.targetRoomId.x, this.character.targetRoomId.y), e = new Laya.Vector3(t.posX, this.character.mtransform.position.y, t.posY);
                    this.trackPoints.push(e.clone());
                } else {
                    var t = q.Instance().grid;
                    t.setStartNode(this.character.curRoomId.x, this.character.curRoomId.y), t.setEndNode(this.character.targetRoomId.x, this.character.targetRoomId.y);
                    var e = q.Instance().astar.searchRoad(t);
                    this.trackPoints.push(this.character.mtransform.position.clone());
                    for (let t = 0; t < e.length; t++) {
                        let a = e[t], i = q.Instance().grid.getNode(a.x, a.y), s = new Laya.Vector3(i.posX, this.character.mtransform.position.y, i.posY);
                        this.trackPoints.push(s.clone());
                    }
                }
                this.trackPoints.length > 1 ? (this.curIndex = 0, this.passDistance = 0, this.setCurMoveData(), 
                this.isAutoMove = !0, this.setPos(this.trackPoints[0]), this.character.playMoveAni()) : a > 1 && this.character.playStopAni();
            }
        }
        nextPoint() {
            this.isAutoMove && (this.curIndex++, console.log("curIndex", this.curIndex), this.curIndex < this.trackPoints.length - 1 ? this.setCurMoveData() : (console.log("自动移动完成"), 
            this.trackPoints = [], this.isAutoMove = !1, this.character.curRoomId = this.character.targetRoomId.clone(), 
            this.character.setNextTargetDoor(), Laya.stage.event(i.Game_Enter_NextDoor, this.character.doorIndex), 
             YYGGames.audio.play("sound/tips_board.mp3"), this.character.playWaitAni(), 
            this.character.checkFlameTrap()));
        }
        setCurMoveData() {
            let e = this.trackPoints[this.curIndex], a = this.trackPoints[this.curIndex + 1];
            this.passDistance = 0, this.nodeDistance = Laya.Vector3.distance(e, a), this.moveDir = t.vectorDirection(e, a);
            let i = t.angleY2(this.moveDir);
            this.character.mtransform.localRotationEulerY = i;
        }
        onUpdate() {
            if (this.isAutoMove && !this.character.isPause) {
                let t = new Laya.Vector3();
                Laya.Vector3.scale(this.moveDir, 4 * Laya.timer.delta * .001, t), this.passDistance += Laya.Vector3.scalarLength(t);
                let e = new Laya.Vector3();
                this.passDistance >= this.nodeDistance ? (this.nextPoint(), e = this.trackPoints[this.curIndex]) : Laya.Vector3.add(this.character.mtransform.position.clone(), t, e), 
                this.setPos(e);
            }
        }
        setPos(t) {
            t && (this.character.mtransform.position = t);
        }
    }
    class L extends Laya.Script {
        constructor() {
            super(...arguments), this.trackPoints = [], this.curIndex = 0, this.passDistance = 0, 
            this.nodeDistance = 0, this.moveDir = new Laya.Vector3(), this.isAutoMove = !1;
        }
        onStart() {
            this.character = this.owner.getComponent(h);
        }
        onEnable() {
            Laya.stage.on(i.Game_Check_Astar, this, this.checkAstar);
        }
        onDisable() {
            Laya.stage.off(i.Game_Check_Astar, this, this.checkAstar);
        }
        checkAstar() {
            if (this.character && !this.character.isPause) if (this.trackPoints = [], this.isAutoMove && this.character.targetRoomId && this.character.curRoomId.x == this.character.targetRoomId.x && this.character.curRoomId.y == this.character.targetRoomId.y) {
                this.trackPoints.push(this.character.mtransform.position.clone());
                let t = q.Instance().grid.getNode(this.character.targetRoomId.x, this.character.targetRoomId.y), e = new Laya.Vector3(t.posX, this.character.mtransform.position.y, t.posY);
                this.trackPoints.push(e.clone()), this.startMove(), this.character.playMoveAni();
            } else {
                var t = [];
                for (let e = 0; e < this.character.targetList.length; e++) {
                    let a = this.character.targetList[e];
                    if (!a.isPause && (t = this.searchRoad(this.character.curRoomId, a.curRoomId.clone())).length > 0) {
                        this.character.targetObj = a, this.character.targetObj.playScareAni(), this.character.playRunAni();
                        break;
                    }
                }
                if (0 == t.length) {
                    let e = Math.abs(this.character.curRoomId.x - q.Instance().getPlayer().curRoomId.x), a = Math.abs(this.character.curRoomId.y - q.Instance().getPlayer().curRoomId.y);
                    if (0 == a && 0 != e) {
                        let e = Math.max(0, this.character.curRoomId.x - 1), a = new Laya.Vector2(e, this.character.curRoomId.y);
                        (t = this.searchRoad(this.character.curRoomId, a)).length;
                    } else if (0 == e && 0 != a) {
                        let e = Math.max(0, this.character.curRoomId.y - 1), a = new Laya.Vector2(this.character.curRoomId.x, e);
                        0 == (t = this.searchRoad(this.character.curRoomId, a)).length && (e = Math.min(q.Instance().grid.numRows, this.character.curRoomId.y + 1), 
                        a = new Laya.Vector2(this.character.curRoomId.x, e), t = this.searchRoad(this.character.curRoomId, a));
                    } else {
                        let e = 0, a = this.character.curRoomId.x;
                        e = this.character.curRoomId.y < q.Instance().getPlayer().curRoomId.y ? Math.min(q.Instance().grid.numRows, this.character.curRoomId.y + 1) : Math.max(0, this.character.curRoomId.y - 1);
                        let i = new Laya.Vector2(a, e);
                        if (0 == (t = this.searchRoad(this.character.curRoomId, i)).length) {
                            let e = this.character.curRoomId.y, a = 0;
                            this.character.curRoomId.x < q.Instance().getPlayer().curRoomId.x ? a = this.character.curRoomId.x : (a = Math.max(0, this.character.curRoomId.x - 1), 
                            i = new Laya.Vector2(a, e), t = this.searchRoad(this.character.curRoomId, i));
                        }
                    }
                    t.length > 0 && this.character.playMoveAni();
                }
                this.setTrackPoints(t), this.startMove();
            } else this.isAutoMove = !1;
        }
        setTrackPoints(t) {
            this.trackPoints = [], this.trackPoints.push(this.character.mtransform.position.clone());
            for (let e = 0; e < t.length; e++) {
                let a = t[e], i = q.Instance().grid.getNode(a.x, a.y), s = new Laya.Vector3(i.posX, this.character.mtransform.position.y, i.posY);
                this.trackPoints.push(s.clone());
            }
        }
        startMove() {
            this.trackPoints.length > 1 ? (this.curIndex = 0, this.passDistance = 0, this.setCurMoveData(), 
            this.isAutoMove = !0, this.setPos(this.trackPoints[0])) : (this.character.targetObj && this.character.targetObj.playScareEndAni(), 
            this.character.playWaitAni());
        }
        searchRoad(t, e) {
            var a = q.Instance().grid;
            return a.setStartNode(t.x, t.y), a.setEndNode(e.x, e.y), this.character.targetRoomId = e.clone(), 
            q.Instance().astar.searchRoad(a);
        }
        nextPoint() {
            this.isAutoMove && (this.curIndex++, console.log("aicurIndex", this.curIndex), this.curIndex < this.trackPoints.length - 1 ? this.setCurMoveData() : (this.character.curRoomId = this.character.targetRoomId.clone(), 
            console.log("ai自动移动完成"), this.isAutoMove = !1, this.character.playWaitAni(), this.character.targetObj = null));
        }
        setCurMoveData() {
            let e = this.trackPoints[this.curIndex], a = this.trackPoints[this.curIndex + 1];
            this.passDistance = 0, this.nodeDistance = Laya.Vector3.distance(e, a), this.moveDir = t.vectorDirection(e, a);
            let i = t.angleY2(this.moveDir);
            this.character.mtransform.localRotationEulerY = i;
        }
        onUpdate() {
            if (this.isAutoMove && !this.character.isPause) {
                let t = new Laya.Vector3();
                Laya.Vector3.scale(this.moveDir, 6 * Laya.timer.delta * .001, t), this.passDistance += Laya.Vector3.scalarLength(t);
                let e = new Laya.Vector3();
                this.passDistance >= this.nodeDistance ? (this.nextPoint(), e = this.trackPoints[this.curIndex]) : Laya.Vector3.add(this.character.mtransform.position.clone(), t, e), 
                this.setPos(e);
            }
        }
        setPos(t) {
            t && (this.character.mtransform.position = t);
        }
    }
    class _ extends h {
        onAwake() {
            super.onAwake();
        }
        onStart() {
            if (super.onStart(), this.rigidbody3d = this.sprite3d.getComponent(Laya.Rigidbody3D), 
            this.rigidbody3d.angularFactor = new Laya.Vector3(0, 0, 0), this.rigidbody3d.angularVelocity = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.linearVelocity = new Laya.Vector3(0, 0, 0), this.rigidbody3d.collisionGroup = c.GROUP_DOG, 
            this.rigidbody3d.canCollideWith = c.CAN_DOG, this.rigidbody3d.sleepLinearVelocity = 0, 
            this.rigidbody3d.sleepAngularVelocity = 0, this.rigidbody3d.wakeUp(), this.rigidbody3d.enabled = !1, 
            this.curRoomId) {
                let t = q.Instance().grid.getNode(this.curRoomId.x, this.curRoomId.y), e = new Laya.Vector3(t.posX, this.mtransform.position.y, t.posY);
                this.mtransform.position = e;
            }
            this.owner.frameOnce(1, this, () => {
                this.animatorController && this.animatorController.play(n.dog_wait);
            });
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.rigidbody3d.enabled = !0, this.rigidbody3d.wakeUp(), 
            this.targetList = q.Instance().getTargetRoleList(this.doorIndex)) : (this.isPause = !0, 
            this.rigidbody3d.enabled = !1);
        }
        zsTriggerEnter(t, e) {
            if (super.zsTriggerEnter(t, e), !this.isPause) {
                if (e.owner.name == s.Sprite3d_grid) {
                    let t = e.owner.getComponent(p);
                    t && (console.log(t.gridX, t.gridY), this.curRoomId = new Laya.Vector2(t.gridX, t.gridY));
                }
                -1 == e.owner.name.indexOf("_tarp_") && "polySurface90" != e.owner.name && "tarp_collider" != e.owner.name || (console.log("碰到机关,狗死了"), 
                this.onDie()), e.owner.name == s.Sprite3d_arrowbullet && (console.log("碰到箭狗死了"), 
                this.onDie()), e.owner.name == s.Sprite3d_robber && console.log("狗杀死强盗"), e.owner.name == s.Sprite3d_woman && (console.log("游戏狗杀死女人"), 
                this.onWin()), e.owner.name == s.Sprite3d_player && (console.log("游戏狗杀死男人"), this.onWin());
            }
        }
        zsTriggerExit(t, e) {
            super.zsTriggerExit(t, e);
        }
        onDie() {
             YYGGames.audio.play("sound/dog_whimper.mp3"), super.onDie(), this.playDieAni(), 
            this.targetObj && this.targetObj.playScareEndAni(), this.owner.frameOnce(100, this, () => {
                q.Instance().remove(this);
            });
        }
        onWin() {
             YYGGames.audio.play("sound/dog_bark.mp3"), this.playAtkAni(), super.onWin();
        }
        playDieAni() {
            this.animatorController && this.animatorController.play(n.dog_death);
        }
        playAtkAni() {
            this.animatorController && this.animatorController.play(n.dog_atk);
        }
        playScareAni() {}
        playMoveAni() {
            this.animatorController && this.animatorController.play(n.dog_move);
        }
        playRunAni() {
             YYGGames.audio.play("sound/dog_bark.mp3"), this.animatorController && this.animatorController.play(n.dog_move);
        }
        playWaitAni() {
            this.isPause || this.animatorController && this.animatorController.play(n.dog_wait);
        }
    }
    class f extends h {
        onAwake() {
            super.onAwake();
        }
        onStart() {
            if (super.onStart(), this.rigidbody3d = this.sprite3d.getComponent(Laya.Rigidbody3D), 
            this.rigidbody3d.angularFactor = new Laya.Vector3(0, 0, 0), this.rigidbody3d.angularVelocity = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.linearVelocity = new Laya.Vector3(0, 0, 0), this.rigidbody3d.collisionGroup = c.GROUP_ROBBER, 
            this.rigidbody3d.canCollideWith = c.CAN_ROBBER, this.rigidbody3d.sleepLinearVelocity = 0, 
            this.rigidbody3d.sleepAngularVelocity = 0, this.rigidbody3d.wakeUp(), this.rigidbody3d.enabled = !1, 
            this.curRoomId) {
                let t = q.Instance().grid.getNode(this.curRoomId.x, this.curRoomId.y), e = new Laya.Vector3(t.posX, this.mtransform.position.y, t.posY);
                this.mtransform.position = e;
            }
            this.owner.frameOnce(1, this, () => {
                this.animatorController && this.animatorController.play(n.robber_wait);
            });
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.rigidbody3d.enabled = !0, this.rigidbody3d.wakeUp(), 
            this.targetList = q.Instance().getTargetPlayerList(this.doorIndex)) : (this.isPause = !0, 
            this.rigidbody3d.enabled = !1);
        }
        zsTriggerEnter(t, e) {
            if (super.zsTriggerEnter(t, e), !this.isPause) {
                if (e.owner.name == s.Sprite3d_grid) {
                    let t = e.owner.getComponent(p);
                    t && (console.log(t.gridX, t.gridY), this.curRoomId = new Laya.Vector2(t.gridX, t.gridY));
                }
                -1 == e.owner.name.indexOf("_tarp_") && "polySurface90" != e.owner.name && "tarp_collider" != e.owner.name || (console.log("碰到机关,强盗死了"), 
                this.onDie()), e.owner.name == s.Sprite3d_arrowbullet && (console.log("碰到箭,强盗死了"), 
                this.onDie()), e.owner.name == s.Sprite3d_dog && (console.log("强盗被狗杀死"), this.onDie()), 
                e.owner.name == s.Sprite3d_woman && (console.log("强盗杀死女人"), this.onWin()), e.owner.name == s.Sprite3d_player && (console.log("强盗杀死男人"), 
                this.onWin());
            }
        }
        zsTriggerExit(t, e) {
            super.zsTriggerExit(t, e);
        }
        onDie() {
             YYGGames.audio.play("sound/robber_death.mp3"), this.targetObj && this.targetObj.playScareEndAni(), 
            super.onDie(), this.playDieAni(), Laya.stage.frameOnce(100, this, () => {
                q.Instance().remove(this);
            });
        }
        onWin() {
            this.playAtkAni(), super.onWin(),  YYGGames.audio.stop("sound/move.mp3");
        }
        playDieAni() {
             YYGGames.audio.stop("sound/move.mp3"), this.animatorController && this.animatorController.play(n.robber_death);
        }
        playAtkAni() {
             YYGGames.audio.play("sound/robber_attack.mp3"), this.animatorController && this.animatorController.play(n.robber_atk);
        }
        playScareAni() {
             YYGGames.audio.play("sound/robber_surprised.mp3"), this.animatorController && this.animatorController.play(n.robber_scare_star);
        }
        playMoveAni() {
             YYGGames.audio.play("sound/move.mp3", 1), this.animatorController && this.animatorController.play(n.robber_move);
        }
        playRunAni() {
             YYGGames.audio.play("sound/robber_laugh.mp3"),  YYGGames.audio.play("sound/move.mp3", 1), 
            this.animatorController && this.animatorController.play(n.robber_run);
        }
        playScareEndAni() {
            this.animatorController && this.animatorController.play(n.robber_scare_end);
        }
        playWaitAni() {
             YYGGames.audio.stop("sound/move.mp3"), this.isPause || this.animatorController && this.animatorController.play(n.robber_wait);
        }
        playStopAni() {
            this.playWaitAni();
        }
    }
    class S {
        constructor(t, e, a, i) {
            this.costMultiplier = 1, this.x = t, this.y = e, this.posX = a, this.posY = i;
        }
    }
    class w {
        constructor(t, e, a, i) {
            this._numCols = t[0].length, this._numRows = t.length, this._embolusData = e, this._nodes = [];
            for (let e = 0; e < this._numRows; e++) {
                this._nodes[e] = new Array();
                for (let s = 0; s < this._numCols; s++) this._nodes[e][s] = new S(s, e, -s * a, -e * i), 
                this._nodes[e][s].walkable = t[e][s];
            }
        }
        addEmbolusData(e) {
            this._embolusData && (this._embolusData = this._embolusData.concat(e), this._embolusData = t.unique(this._embolusData));
        }
        removeEmbolusData(e) {
            if (this._embolusData) {
                for (let t = 0; t < e.length; t++) {
                    const i = e[t];
                    var a = this._embolusData.indexOf(i);
                    -1 != a && this._embolusData.splice(a, 1);
                }
                this._embolusData = t.unique(this._embolusData);
            }
        }
        canJoint(e, a) {
            if (a.x < e.x || a.y < e.y) {
                var i = e;
                e = a, a = i;
            }
            var s = t.padding(e.x, 2) + t.padding(e.y, 2) + t.padding(a.x, 2) + t.padding(a.y, 2), o = this._embolusData.indexOf(s), r = t.padding(a.x, 2) + t.padding(a.y, 2) + t.padding(e.x, 2) + t.padding(e.y, 2), n = this._embolusData.indexOf(r);
            return -1 == o && -1 == n;
        }
        getNode(t, e) {
            return this._nodes[e] ? this._nodes[e][t] : null;
        }
        getNodes() {
            return this._nodes;
        }
        setEndNode(t, e) {
            this._endNode = this._nodes[e][t];
        }
        setStartNode(t, e) {
            this._startNode = this._nodes[e][t];
        }
        setWalkable(t, e, a) {
            this._nodes[e][t].walkable = a;
        }
        get endNode() {
            return this._endNode;
        }
        get numCols() {
            return this._numCols;
        }
        get numRows() {
            return this._numRows;
        }
        get startNode() {
            return this._startNode;
        }
        get embolusData() {
            return this._embolusData;
        }
    }
    class C {
        searchRoad(t) {
            this._grid = t;
            let e, a = t.startNode.x, i = t.startNode.y, s = t.endNode.x, o = t.endNode.y, r = [], n = [], l = [];
            t.startNode.g = 0, r.push(t.startNode);
            do {
                let e = r.pop();
                n.push(e);
                let a = this.SurroundPoint(e);
                for (let i in a) {
                    let l = a[i];
                    if (l.x >= 0 && l.y >= 0 && l.y < t.numRows && l.x < t.numCols && t.getNode(l.x, l.y).walkable && !this.existList(l, n) && t.getNode(l.x, e.y).walkable && t.getNode(e.x, l.y).walkable) {
                        let t = e.g + ((e.x - l.x) * (e.y - l.y) == 0 ? 10 : 14);
                        if (this.existList(l, r)) {
                            let a = Number(this.existList(l, r));
                            t < r[a].g && (r[a].parent = e, r[a].g = t, r[a].f = t + r[a].h);
                        } else l.h = 10 * Math.abs(s - l.x) + 10 * Math.abs(o - l.y), l.g = t, l.h = l.h + l.g, 
                        l.parent = e, r.push(l);
                    }
                }
                if (0 == r.length) break;
                r.sort(this.sortF);
            } while (!(e = this.existList({
                x: s,
                y: o
            }, r)));
            if (e) {
                let t = r[e];
                do {
                    l.unshift({
                        x: t.x,
                        y: t.y
                    }), t = t.parent;
                } while (t.x != a || t.y != i);
            } else l = [];
            return l;
        }
        searchHorizontal(t) {
            this._grid = t;
            let e, a = t.startNode.x, i = t.startNode.y, s = t.endNode.x, o = t.endNode.y, r = [], n = [], l = [];
            t.startNode.g = 0, r.push(t.startNode);
            do {
                let e = r.pop();
                n.push(e);
                let a = this.horizontalPoint(e);
                for (let i in a) {
                    let l = a[i];
                    if (l.x >= 0 && l.y >= 0 && l.y < t.numRows && l.x < t.numCols && t.getNode(l.x, l.y).walkable && !this.existList(l, n) && t.getNode(l.x, e.y).walkable && t.getNode(e.x, l.y).walkable) {
                        let t = e.g + ((e.x - l.x) * (e.y - l.y) == 0 ? 10 : 14);
                        if (this.existList(l, r)) {
                            let a = Number(this.existList(l, r));
                            t < r[a].g && (r[a].parent = e, r[a].g = t, r[a].f = t + r[a].h);
                        } else l.h = 10 * Math.abs(s - l.x) + 10 * Math.abs(o - l.y), l.g = t, l.h = l.h + l.g, 
                        l.parent = e, r.push(l);
                    }
                }
                if (0 == r.length) break;
                r.sort(this.sortF);
            } while (!(e = this.existList({
                x: s,
                y: o
            }, r)));
            if (e) {
                let t = r[e];
                do {
                    l.unshift({
                        x: t.x,
                        y: t.y
                    }), t = t.parent;
                } while (t.x != a || t.y != i);
            } else l = [];
            return l;
        }
        sortF(t, e) {
            return e.f - t.f;
        }
        horizontalPoint(t) {
            let e = t.x, a = t.y;
            var i = [], s = this._grid.getNode(e, a - 1);
            s && this._grid.canJoint(t, s) && i.push(s);
            var o = this._grid.getNode(e, a + 1);
            return o && this._grid.canJoint(t, o) && i.push(o), i;
        }
        SurroundPoint(t) {
            let e = t.x, a = t.y;
            var i = [], s = this._grid.getNode(e + 1, a);
            s && this._grid.canJoint(t, s) && i.push(s);
            var o, r = this._grid.getNode(e, a + 1);
            return r && this._grid.canJoint(t, r) && i.push(r), (o = this._grid.getNode(e - 1, a)) && this._grid.canJoint(t, o) && i.push(o), 
            (o = this._grid.getNode(e, a - 1)) && this._grid.canJoint(t, o) && i.push(o), i;
        }
        existList(t, e) {
            for (let a in e) if (t.x == e[a].x && t.y == e[a].y) return a;
            return !1;
        }
    }
    var R = zs.laya.TriggerScript3d;
    class v extends y {
        constructor() {
            super(), this.curRoomId = null, this.turn = 0;
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator), R.Init(this.sprite3d, this);
        }
        onStart() {
            super.onStart(), this.collider3d = this.sprite3d.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_DOOR, this.collider3d.canCollideWith = c.CAN_DOOR, 
            this.collider3d.enabled = !0), this.animator && this.animator.play("open_door", 0, 0);
        }
        initEvent() {
            super.initEvent();
        }
        removeEvent() {
            super.removeEvent();
        }
        zsTriggerEnter(t, e) {
            e.owner.name === s.Sprite3d_player && (console.log("碰到主角。关门"), this.animator && this.animator.play("close_door", 0, 0), 
            this.collider3d.enabled = !1, this.doorIndex > 1 &&  YYGGames.audio.play("sound/man_relaxed.mp3"), 
            et.cameraCtr.updateRotation(this.turn));
        }
    }
    var b = zs.laya.TriggerScript3d;
    class E extends y {
        constructor() {
            super(), this.knifeList = [], this.pole3d = null, this.flash3d = null;
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator), this.animator.speed = 0;
        }
        onStart() {
            super.onStart(), this.pole3d = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface88"), 
            this.pole3d.transform.localScaleX = 1;
            let t = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface90");
            t.transform.localPositionX = 1.3, this.knifeList.push(t), this.flash3d = t.getChildByName("ef_MG_flash"), 
            this.flash3d.active = !1;
            let e = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface92");
            e.transform.localPositionX = 1.3, this.knifeList.push(e);
            let a = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface93");
            a.transform.localPositionX = 1.3, this.knifeList.push(a);
            let i = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface94");
            i.transform.localPositionX = 1.3, this.knifeList.push(i);
            let s = this.sprite3d.getChildByName("tarp_blade").getChildByName("polySurface95");
            s.transform.localPositionX = 1.3, this.knifeList.push(s), this.collider3d = t.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, this.collider3d.canCollideWith = c.CAN_TRAP), 
            this.setColliderEnable(!1), b.Init(t, this);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), this.clearTween(), this.owner.clearTimer(this, this.checkCollisonPlayer), 
            Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap),  YYGGames.audio.stop("sound/office.mp3");
        }
        resumeTrap(t) {
            this.doorIndex == t ? (this.isPause = !1, this.setColliderEnable(!0), this.flash3d.active = !0, 
             YYGGames.audio.play("sound/tips_office.mp3"), this.owner.frameLoop(2, this, this.checkCollisonPlayer)) : (this.isPause = !0, 
            this.setColliderEnable(!1), this.owner.clearTimer(this, this.checkCollisonPlayer), 
             YYGGames.audio.stop("sound/office.mp3"));
        }
        checkCollisonPlayer() {
            var t = this.mtransform.position.clone();
            t.y = .5;
            var e = new Laya.Vector3(0, 0, 0), a = new Laya.Vector3(0, 0, 0);
            let i = new Laya.Vector3();
            this.mtransform.getForward(i), Laya.Vector3.scale(i, 8, a), Laya.Vector3.add(t, a, e);
            var o = new Laya.HitResult();
            let r = new Laya.BoxColliderShape(3, 1, 1);
            if (this.scene3d.physicsSimulation.shapeCast(r, t, e, o, null, null, c.GROUP_TRAP_RAY, c.CAN_TRAP_RAY), 
            o.collider) {
                var n = o.collider.owner;
                console.log("检测到前方障碍", n.name), n.name !== s.Sprite3d_player && n.name !== s.Sprite3d_dog && n.name !== s.Sprite3d_robber || (console.log("碰到角色，开始滚动刀片"), 
                this.owner.clearTimer(this, this.checkCollisonPlayer), this.rollKnife());
            }
        }
        rollKnife() {
             YYGGames.audio.play("sound/office.mp3", 1), this.owner.timerOnce(500, this, () => {
                 YYGGames.audio.play("sound/man_surprised.mp3");
            }), this.animator.speed = 1, Laya.Tween.to(this.pole3d.transform, {
                localScaleX: 4.2
            }, 5e3, null, null, 1e3);
            for (let t = 0; t < this.knifeList.length; t++) {
                let e = this.knifeList[t];
                Laya.Tween.to(e.transform, {
                    localPositionX: 5.6
                }, 5e3, null, null, 1e3);
            }
        }
        zsTriggerEnter(t, e) {
            e.owner.name !== s.Sprite3d_player && e.owner.name !== s.Sprite3d_dog && e.owner.name !== s.Sprite3d_robber || (console.log("碰到主角。游戏失败"), 
            this.clearTween());
        }
        clearTween() {
            Laya.Tween.clearAll(this.pole3d.transform);
            for (let t = 0; t < this.knifeList.length; t++) {
                let e = this.knifeList[t];
                Laya.Tween.clearAll(e.transform);
            }
        }
    }
    var P = zs.laya.Resource, I = zs.laya.ObjectPool;
    class A {
        constructor() {
            this.bulletList = [];
        }
        static Instance() {
            return null == this.instance && (this.instance = new A()), this.instance;
        }
        init(t) {
            this.parent = t;
        }
        createBullet(t) {
            var e = P.LoadSprite3d(t);
            let a = I.GetSprite3d(e);
            return a.name = t, a.active = !0, this.parent.addChild(a), a;
        }
        addBullet(t) {
            if (!t) return;
            -1 == this.bulletList.indexOf(t) && (this.bulletList[this.bulletList.length] = t);
        }
        removeBullet(t, e = !0) {
            let a = this.bulletList.indexOf(t);
            -1 != a && this.bulletList.splice(a, 1);
            let i = t.bullet3d;
            e ? (i.active = !1, I.RecoverSprite3d(i)) : (i.removeSelf(), i.destroy(!0)), t.destroy();
        }
        onDestroy() {
            if (this.bulletList.length > 0) {
                for (let t = this.bulletList.length - 1; t >= 0; t--) {
                    const t = this.bulletList.pop();
                    let e = t.bullet3d;
                    e.active = !1, e.removeSelf(), e.destroy(!0), t.destroy();
                }
                this.bulletList = [];
            }
        }
    }
    A.instance = null;
    class x extends Laya.Script3D {
        constructor() {
            super(...arguments), this.dir = new Laya.Vector3(0, 0, 1), this.lifeDis = 0, this.speed = 0;
        }
        onAwake() {
            this.bullet3d = this.owner;
        }
        onStart() {
            let e = this.bullet3d.getComponent(Laya.PhysicsCollider);
            e && (e.collisionGroup = c.GROUP_TRAP, e.canCollideWith = c.CAN_TRAP, e.enabled = !0), 
            this.mTransform = this.bullet3d.transform, this.mTransform.position = this.firer.mtransform.position.clone(), 
            this.mTransform.localRotationEulerY = 180 - t.angleY2(this.dir);
        }
        init(t, e) {
            this.firer = t, this.dir = e.clone(), this.lifeDis = 2;
        }
        onTriggerEnter(t) {
            var e = t.owner;
            console.log(e.name, "otherSprite3d.name"), e.name !== s.Sprite3d_player && e.name !== s.Sprite3d_dog && e.name !== s.Sprite3d_robber || (console.log("碰到东西箭消失"), 
            this.removeBullet());
        }
        addHitEffect() {}
        removeBullet() {}
    }
    class k extends x {
        onStart() {
            super.onStart();
        }
        init(t, e) {
            super.init(t, e), this.lifeDis = 12, this.speed = 24;
        }
        onUpdate() {
            let t = Laya.timer.delta / Laya.timer.scale;
            if (!this.dir) return;
            new Laya.Vector3();
            if (Math.abs(this.mTransform.position.x) < .01 || Math.abs(this.mTransform.position.z) < .01) {
                let t = new Laya.Vector3();
                Laya.Vector3.add(this.firer.mtransform.position.clone(), new Laya.Vector3(0, 0, 0), t), 
                this.mTransform.position = t;
            }
            let e = new Laya.Vector3(0, 0, 0);
            var a = this.speed * t * .001;
            Laya.Vector3.scale(this.dir, a, e), this.lifeDis -= Math.abs(Laya.Vector3.scalarLength(e)), 
            this.mTransform.translate(e, !1);
        }
        onLateUpdate() {
            this.lifeDis < 0 && this.removeBullet();
        }
        removeBullet() {
             YYGGames.audio.play("sound/arch_hit.mp3"), A.Instance().removeBullet(this), 
            this.firer && this.firer.removeElement(200);
        }
    }
    class G extends y {
        constructor() {
            super(), this.arrow3d = null;
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator);
        }
        onStart() {
            super.onStart(), this.arrow3d = this.sprite3d.getChildByName("arrow"), this.arrow3d.active = !0, 
            this.collider3d = this.sprite3d.getComponent(Laya.PhysicsCollider), this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, 
            this.collider3d.canCollideWith = c.CAN_TRAP), this.setColliderEnable(!1);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), this.owner.clearTimer(this, this.checkCollisonPlayer), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.setColliderEnable(!0), this.owner.frameLoop(2, this, this.checkCollisonPlayer)) : (this.isPause = !0, 
            this.setColliderEnable(!1), this.owner.clearTimer(this, this.checkCollisonPlayer));
        }
        checkCollisonPlayer() {
            var t = this.mtransform.position.clone();
            t.y = .5;
            var e = new Laya.Vector3(0, 0, 0), a = new Laya.Vector3(0, 0, 0);
            let i = new Laya.Vector3();
            this.mtransform.getForward(i), Laya.Vector3.scale(i, 8, a), Laya.Vector3.add(t, a, e);
            var o = new Laya.HitResult();
            let r = new Laya.BoxColliderShape(1, 1, 1);
            if (this.scene3d.physicsSimulation.shapeCast(r, t, e, o, null, null, c.GROUP_TRAP_RAY, c.CAN_TRAP_RAY), 
            o.collider) {
                var n = o.collider.owner;
                console.log("检测到前方障碍", n.name), n.name !== s.Sprite3d_player && n.name !== s.Sprite3d_dog && n.name !== s.Sprite3d_robber || (console.log("碰到角色，开始射箭"), 
                this.owner.clearTimer(this, this.checkCollisonPlayer), this.shotArrow());
            }
        }
        shotArrow() {
             YYGGames.audio.play("sound/arch_attack.mp3");
            let t = A.Instance().createBullet(s.Sprite3d_arrowbullet);
            if (!t) return;
            let e = t.getComponent(x);
            e && e.destroy(), null == e && (e = t.addComponent(k)), A.Instance().addBullet(e);
            let a = new Laya.Vector3();
            this.mtransform.getForward(a), t.transform.position = this.mtransform.position.clone(), 
            t.active = !0, e.init(this, a), this.arrow3d.active = !1;
        }
    }
    var T = zs.laya.Resource, D = zs.laya.ObjectPool;
    class O {
        constructor() {
            this.effectList = [], this.spriteEffectList = [];
        }
        static Instance() {
            return null == this.instance && (this.instance = new O()), this.instance;
        }
        init(t) {
            this.parent = t;
        }
        createSpriteEffect(t, e = !0) {
            let a = T.LoadSprite3d(t), i = D.GetSprite3d(a);
            return i.name = t, e && this.parent && this.parent.addChild(i), i.active = !0, -1 == this.spriteEffectList.indexOf(i) && (this.spriteEffectList[this.spriteEffectList.length] = i), 
            i;
        }
        removeSpriteEffect(t, e = !0) {
            let a = this.spriteEffectList.indexOf(t);
            -1 != a && this.spriteEffectList.splice(a, 1), e ? (t.active = !1, D.RecoverSprite3d(t)) : (t.removeSelf(), 
            t.destroy(!0));
        }
        addEffect(t) {
            if (!t) return;
            -1 == this.effectList.indexOf(t) && (this.effectList[this.effectList.length] = t);
        }
        removeEffect(t) {
            let e = this.effectList.indexOf(t);
            -1 != e && this.effectList.splice(e, 1);
            let a = t.sprite3d;
            a.removeSelf(), a.destroy(!0), t.destroy();
        }
        onDestroy() {
            if (this.effectList.length > 0) {
                for (let t = this.effectList.length - 1; t >= 0; t--) {
                    const t = this.effectList.pop();
                    let e = t.sprite3d;
                    e.active = !1, e.removeSelf(), e.destroy(!0), t.destroy();
                }
                this.effectList = [];
            }
            if (this.spriteEffectList.length > 0) {
                for (let t = this.spriteEffectList.length - 1; t >= 0; t--) {
                    const t = this.spriteEffectList.pop();
                    D.RecoverSprite3d(t);
                }
                this.spriteEffectList = [];
            }
        }
    }
    O.instance = null;
    var V = zs.laya.TriggerScript3d;
    class M extends y {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator);
        }
        onStart() {
            super.onStart(), this.collider3d = this.sprite3d.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, this.collider3d.canCollideWith = c.CAN_TRAP), 
            this.setColliderEnable(!1), V.Init(this.sprite3d, this);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.setColliderEnable(!0)) : (this.isPause = !0, 
            this.setColliderEnable(!1));
        }
        removeEffect() {
             YYGGames.audio.play("sound/bome_blast.mp3"), this.sprite3d.active = !1;
            let t = O.Instance().createSpriteEffect("ef_MG_bomb", !0);
            t.transform.position = this.mtransform.position.clone(), this.owner.timerOnce(2e3, this, this.removeEffectCallBack, [ t ]);
        }
        removeEffectCallBack(t) {
            O.Instance().removeSpriteEffect(t);
        }
        zsTriggerEnter(t, e) {
            e.owner.name !== s.Sprite3d_player && e.owner.name !== s.Sprite3d_dog && e.owner.name !== s.Sprite3d_robber || (console.log("碰到主角。游戏失败"), 
            this.removeElement(2e3));
        }
    }
    var N = zs.laya.TriggerScript3d;
    class U extends y {
        constructor() {
            super(), this.startPos3d = null, this.endPos3d = null, this.enterRoomCount = 0, 
            this.outRoomCount = 0, this.dir = t.ZERO, this.isTouchMove = !1, this.faguang3d = null, 
            this.isPull = !0, this.isCollisoning = !1;
        }
        onAwake() {
            super.onAwake(), this.startPos3d = this.sprite3d.getChildByName("doudong").getChildByName("startpos"), 
            this.endPos3d = this.sprite3d.getChildByName("doudong").getChildByName("endpos"), 
            this.animator = this.owner.getChildByName("doudong").getComponent(Laya.Animator);
        }
        onStart() {
            super.onStart(), this.dir = t.vectorDirection(this.endPos3d.transform.position.clone(), this.startPos3d.transform.position.clone()), 
            this.rigidbody3d = this.sprite3d.getComponent(Laya.Rigidbody3D), this.rigidbody3d && (this.rigidbody3d.collisionGroup = c.GROUP_KEY, 
            this.rigidbody3d.canCollideWith = c.CAN_KEY, this.rigidbody3d.angularFactor = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.angularVelocity = new Laya.Vector3(0, 0, 0), this.rigidbody3d.linearVelocity = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.sleepLinearVelocity = 0, this.rigidbody3d.sleepAngularVelocity = 0, 
            this.rigidbody3d.wakeUp()), this.moveDist = 0, this.enterRoomId = "", this.outRoomId = "", 
            this.enterRoomCount = 0, this.outRoomCount = 0, this.isTouchMove = !1, N.Init(this.sprite3d, this), 
            this.faguang3d = this.owner.getChildByName("ef_MG_faguang"), this.faguang3d.active = !1, 
            this.animator && (this.animator.speed = 0), this.collider3d = this.sprite3d.getChildByName("doudong").getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_KEY, this.collider3d.canCollideWith = c.CAN_KEY), 
            this.setColliderEnable(!1);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.isPull = !0, this.setColliderEnable(!0), 
            this.rigidbody3d.wakeUp(), this.faguang3d.active = !0, this.owner.timerOnce(1e3, this, () => {
                this.faguang3d.active = !1;
            })) : (this.isPause = !0, this.setColliderEnable(!1));
        }
        set isMove(t) {
            this.isTouchMove = t, this.resetColliderRoom();
        }
        resetColliderRoom() {
            this.enterRoomCount = 0, this.enterRoomId = "", this.outRoomCount = 0, this.outRoomId = "";
        }
        tapKeyDoor() {
            if (this.isTouchMove) return;
            if ( YYGGames.audio.play("sound/drawing.mp3"), zs.laya.sdk.DeviceService.VibrateShort(), 
            this.checkCollisonOtherKey(this.startPos3d.transform.position.clone(), this.dir, 10, 1)) return;
            this.isTouchMove = !0;
            let t = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.scale(this.dir, this.maxDist, t), Laya.Vector3.add(this.mtransform.position.clone(), t.clone(), t), 
            Laya.Tween.to(this.mtransform, {
                localPositionX: t.x,
                localPositionY: t.y,
                localPositionZ: t.z
            }, 500, null, Laya.Handler.create(this, () => {})), Laya.stage.event(i.Game_Hide_Guide);
        }
        move(t, e) {
            this.isTouchMove || ( YYGGames.audio.play("sound/drawing.mp3"), zs.laya.sdk.DeviceService.VibrateShort()), 
            this.isTouchMove = !0;
            let a = e > 0 ? this.startPos3d.transform.position.clone() : this.endPos3d.transform.position.clone(), i = this.dir.clone(), s = !0;
            if (e < 0 && (Laya.Vector3.scale(this.dir, -1, i), s = !1), this.isPull != s && (this.resetColliderRoom(), 
            this.isPull = s,  YYGGames.audio.play("sound/drawing.mp3"), zs.laya.sdk.DeviceService.VibrateShort()), 
            this.checkCollisonOtherKey(a, i, t, e)) return;
            let o = new Laya.Vector3(0, 0, 0), r = this.moveDist;
            e > 0 && this.moveDist < this.maxDist ? (this.moveDist += Math.abs(t), this.moveDist > this.maxDist && (t = this.maxDist - r, 
            this.moveDist = this.maxDist), Laya.Vector3.scale(this.dir, t, o), this.mtransform.translate(o, !1)) : e < 0 && this.moveDist > 0 && (this.moveDist -= Math.abs(t), 
            this.moveDist < 0 && (t = r, this.moveDist = 0), Laya.Vector3.scale(this.dir, -1 * t, o), 
            this.mtransform.translate(o, !1));
        }
        zsTriggerEnter(e, a) {
            if (this.isTouchMove && a.owner.name === s.Sprite3d_grid) {
                this.outRoomId = "", this.outRoomCount = 0;
                let e = a.owner.getComponent(p);
                if (e) {
                    console.log("进入房间", e.gridX, e.gridY);
                    let a = t.padding(e.gridX, 2) + t.padding(e.gridY, 2), s = this.enterRoomId;
                    if (a == s) return this.enterRoomCount = 0, void (this.enterRoomId = "");
                    if (this.enterRoomId = this.enterRoomId + a, s = a + s, this.enterRoomCount++, 2 == this.enterRoomCount) {
                        if (console.log("进入房间", this.enterRoomId, s), -1 != this.lockGrids.indexOf(this.enterRoomId) || -1 != this.lockGrids.indexOf(s) || -1 != q.Instance().lockgrid.indexOf(this.enterRoomId) || -1 != q.Instance().lockgrid.indexOf(s)) {
                            let t = [ this.enterRoomId, s ];
                            q.Instance().grid.addEmbolusData(t), Laya.stage.event(i.Game_Check_Astar);
                        }
                        this.enterRoomCount = 0, this.enterRoomId = "";
                    }
                }
            }
        }
        zsTriggerExit(e, a) {
            if (this.isTouchMove && a.owner.name === s.Sprite3d_grid) {
                this.enterRoomId = "", this.enterRoomCount = 0;
                let e = a.owner.getComponent(p);
                if (e) {
                    console.log("离开房间", e.gridX, e.gridY);
                    let a = t.padding(e.gridX, 2) + t.padding(e.gridY, 2), s = this.outRoomId;
                    if (a == s) return this.outRoomId = "", void (this.outRoomCount = 0);
                    if (this.outRoomId = this.outRoomId + a, s = a + s, this.outRoomCount++, 2 == this.outRoomCount) {
                        if (console.log("离开房间", this.outRoomId, s), -1 != this.lockGrids.indexOf(this.outRoomId) || -1 != this.lockGrids.indexOf(s) || -1 != q.Instance().lockgrid.indexOf(this.outRoomId) || -1 != q.Instance().lockgrid.indexOf(s)) {
                            let t = [ this.outRoomId, s ];
                            q.Instance().grid.removeEmbolusData(t), Laya.stage.event(i.Game_Check_Astar);
                        }
                        this.outRoomCount = 0, this.outRoomId = "";
                    }
                }
            }
        }
        checkCollisonOtherKey(t, e, a, i) {
            let s = !1;
            var o = t;
            o.y = .5;
            var r = new Laya.Vector3(0, 0, 0), n = new Laya.Vector3(0, 0, 0);
            a = Math.max(i > 0 ? .2 : .05, a), Laya.Vector3.scale(e, a, n), Laya.Vector3.add(o, n, r);
            var l = new Laya.HitResult();
            if (this.scene3d.physicsSimulation.raycastFromTo(o, r, l, c.GROUP_KEY_RAY, c.CAN_KEY_RAY), 
            l.collider) {
                var h = l.collider.owner;
                -1 == h.name.indexOf("key") && -1 == h.name.indexOf("doudong") || (this.addCollsionEffect(l.point), 
                s = !0);
            }
            return s;
        }
        addCollsionEffect(t) {
            if (this.isCollisoning) return;
            this.isCollisoning = !0, console.log("================");
            let e = O.Instance().createSpriteEffect("ef_MG_pengzhuang", !0);
            t.y = 1.2, e.transform.position = t.clone(), this.owner.timerOnce(1e3, this, this.removeEffectCallBack, [ e ]), 
            this.animator && (this.animator.speed = 1), this.animator && this.animator.play("banzi_doudong", 0, 0), 
             YYGGames.audio.play("sound/collision.mp3"), zs.laya.sdk.DeviceService.VibrateLong();
        }
        removeEffectCallBack(t) {
            this.isCollisoning = !1, this.animator && (this.animator.speed = 0), O.Instance().removeSpriteEffect(t);
        }
    }
    class z extends Laya.Script {
        constructor() {
            super(...arguments), this.moveDir = null, this.touchId = -1, this.isMouseDown = !1, 
            this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), this.point = new Laya.Vector2(), 
            this.lastPoint = new Laya.Vector2(), this.startVector = new Laya.Vector3(), this.endVector = new Laya.Vector3(), 
            this._outHitResult = new Laya.HitResult(), this.screenDir = t.ZERO;
        }
        onStart() {
           
            this.character = this.owner.getComponent(U), this.width = Laya.stage.width *  Laya.stage.clientScaleX, 
            this.height = Laya.stage.height * Laya.stage.clientScaleY, this.scene = this.character.scene3d, 
            this.camera = et.camera;
        }
        onEnable() {
            Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeMouse);
        }
        onDisable() {
            Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeMouse), Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.removeEvent();
        }
        resumeMouse(t) {
            this.character.doorIndex === t ? (Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchStart), 
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd), Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onTouchEnd)) : (Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.removeEvent());
        }
        removeEvent() {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchEnd), 
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onTouchEnd);
        }
        setKeyScreenDir() {
            let e = new Laya.Vector2(), a = new Laya.Vector2();
            et.cameraCtr.world2ScreenPos(this.character.startPos3d.transform.position.clone(), e), 
            et.cameraCtr.world2ScreenPos(this.character.endPos3d.transform.position.clone(), a);
            let i = new Laya.Vector3(e.x, 0, e.y), s = new Laya.Vector3(a.x, 0, a.y);
            this.screenDir = t.vectorDirection(s, i);
        }
        onTouchStart(t) {
            console.log("onTouchStart"); 
            if (!this.isMouseDown && !e.data.gameFinish && (this.isMouseDown = !0, 
            this.touchId = t.touchId, this.hasSelectedSprite = !1, this.character)) {
                this.posX = this.lastPoint.x = this.point.x = Laya.MouseManager.instance.mouseX, 
                this.posY = this.lastPoint.y = this.point.y = Laya.MouseManager.instance.mouseY, 
                this.point.setValue(this.point.x / (Laya.stage.width * Laya.stage.clientScaleX), this.point.y / (Laya.stage.height * Laya.stage.clientScaleY)), 
                this.camera.normalizedViewportPointToRay(this.point, this.ray);
                let t = new Laya.Vector3();
                Laya.Vector3.scale(this.ray.direction, 1e3, t);
                Laya.Vector3.add(this.ray.origin, t, t);
                this.scene.physicsSimulation.rayCast(this.ray, this._outHitResult, 1e4, c.GROUP_TAP_RAY, c.CAN_TAP_RAY);
                if (this._outHitResult.succeeded) {
                    var a = this._outHitResult.collider.owner;
                    console.log("点击到", a.name), (a == this.owner || a.parent && a.parent == this.owner) && (console.log("点击到钥匙", a.name), 
                    this.hasSelectedSprite = !0, this.character && this.character.tapKeyDoor());
                }
            }
        }
        onTouchMove(t) {}
        onTouchEnd(t) {
            this.isMouseDown && (console.log("onTouchEnd"), this.isMouseDown = !1, this.character && (this.touchId = -1));
        }
    }
    class B extends h {
        onAwake() {
            super.onAwake();
        }
        onStart() {
            if (super.onStart(), this.rigidbody3d = this.sprite3d.getComponent(Laya.Rigidbody3D), 
            this.rigidbody3d.angularFactor = new Laya.Vector3(0, 0, 0), this.rigidbody3d.angularVelocity = new Laya.Vector3(0, 0, 0), 
            this.rigidbody3d.linearVelocity = new Laya.Vector3(0, 0, 0), this.rigidbody3d.collisionGroup = c.GROUP_PLAYER, 
            this.rigidbody3d.canCollideWith = c.CAN_PLAYER, this.rigidbody3d.sleepLinearVelocity = 0, 
            this.rigidbody3d.sleepAngularVelocity = 0, this.rigidbody3d.enabled = !0, this.rigidbody3d.wakeUp(), 
            this.curRoomId) {
                let t = q.Instance().grid.getNode(this.curRoomId.x, this.curRoomId.y), e = new Laya.Vector3(t.posX, 0, t.posY);
                this.mtransform.position = e, this.mtransform.localRotationEulerY = 90;
            }
            this.owner.frameOnce(1, this, () => {
                this.animatorController && this.animatorController.play(n.woman_wait);
            }), this.isPause = !1;
        }
        zsTriggerEnter(t, e) {
            super.zsTriggerEnter(t, e), e.owner.name == s.Sprite3d_player && (console.log("拯救成功"), 
            this.onWin()), e.owner.name != s.Sprite3d_dog && e.owner.name != s.Sprite3d_robber || (console.log("女人碰到敌人失败。"), 
            this.onDie());
        }
        onDie() {
            super.onDie(),  YYGGames.audio.play("sound/woman_death.mp3"), this.playDieAni(), 
            !e.data.gameFinish && Laya.stage.event(i.Stage_Fail), e.data.gameFinish = !0;
        }
        onWin() {
            super.onWin(),  YYGGames.audio.play("sound/woman_laugh.mp3"), this.animatorController && this.animatorController.play(n.woman_kiss), 
            !e.data.gameFinish && Laya.stage.event(i.Stage_Finish), e.data.gameFinish = !0;
        }
        playDieAni() {
            this.animatorController && this.animatorController.play(n.woman_death);
        }
        playScareAni() {
             YYGGames.audio.play("sound/woman_surprised.mp3"), this.animatorController && this.animatorController.play(n.woman_scare_star);
        }
        playScareEndAni() {
            this.animatorController && this.animatorController.play(n.woman_scare_end);
        }
        playStopAni() {
            this.isPause || this.animatorController && this.animatorController.play(n.woman_wait);
        }
    }
    var Y = zs.laya.TriggerScript3d, F = zs.laya.AnimStateListener;
    class W extends y {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake(), this.bowl3d = this.owner.getChildByName("shuipen"), this.fire3d = this.owner.getChildByName("fire"), 
            this.smok3d = this.owner.getChildByName("ef_watersmog"), this.animator = this.owner.getComponent(Laya.Animator), 
            Y.Init(this.bowl3d, this);
        }
        onStart() {
            super.onStart(), this.collider3d = this.sprite3d.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, this.collider3d.canCollideWith = c.CAN_TRAP), 
            this.rigidbody3d = this.bowl3d.getComponent(Laya.Rigidbody3D), this.rigidbody3d && (this.rigidbody3d.collisionGroup = c.GROUP_BOWL, 
            this.rigidbody3d.canCollideWith = c.CAN_BOWL, this.rigidbody3d.enabled = !1), this.setColliderEnable(!1), 
            this.fire3d.active = !1, this.smok3d.active = !1, this.animator && this.animator.play("flameinit", 0, 0);
        }
        initEvent() {
            super.initEvent(), this.setColliderEnable(!1), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap), 
            F.setListener(this.animator, "pourwater", this, null, this.pourWaterCallBack);
        }
        removeEvent() {
            super.removeEvent(),  YYGGames.audio.stop("sound/burning.mp3"), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex == t ? (this.isPause = !1, this.setColliderEnable(!0), this.fire3d.active = !0, 
             YYGGames.audio.play("sound/burning.mp3", 1)) : (this.isPause = !0, 
            this.setColliderEnable(!1),  YYGGames.audio.stop("sound/burning.mp3"));
        }
        zsTriggerExit(t, e) {
            -1 == e.owner.name.indexOf(s.Sprite3d_keyboard) || this.isPause || (console.log("倒水"), 
            this.fire3d.active = !1, this.smok3d.active = !0,  YYGGames.audio.stop("sound/burning.mp3"), 
             YYGGames.audio.play("sound/extinguish.mp3"), this.animator && this.animator.play("pourwater", 0, 0), 
            Laya.stage.event(i.Game_Pour_Water));
        }
        pourWaterCallBack() {
            this.fire3d.active = !1, this.smok3d.active = !1, this.setColliderEnable(!1);
        }
    }
    var X = zs.laya.TriggerScript3d;
    class H extends y {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator);
        }
        onStart() {
            super.onStart(), this.collider3d = this.sprite3d.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, this.collider3d.canCollideWith = c.CAN_TRAP), 
            this.setColliderEnable(!1), X.Init(this.sprite3d, this), this.animator && this.animator.play("song", 0, 0);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        resumeTrap(t) {
            this.doorIndex === t ? (this.isPause = !1, this.setColliderEnable(!0)) : (this.isPause = !0, 
            this.setColliderEnable(!1));
        }
        removeEffect() {
             YYGGames.audio.play("sound/clip.mp3"), this.animator && this.animator.play("jia", 0, 0);
        }
        zsTriggerEnter(t, e) {
            e.owner.name !== s.Sprite3d_player && e.owner.name !== s.Sprite3d_dog && e.owner.name !== s.Sprite3d_robber || (console.log("碰到主角。游戏失败"), 
            this.removeElement(1e3));
        }
    }
    class K extends y {
        constructor() {
            super(), this.spikeLeft = null, this.spikeRight = null, this.tarpCollider = null;
        }
        onAwake() {
            super.onAwake(), this.animator = this.owner.getComponent(Laya.Animator);
        }
        onStart() {
            super.onStart(), this.spikeLeft = this.sprite3d.getChildByName("tarp_wallleft"), 
            this.spikeLeft.transform.localScaleX = .5, this.spikeRight = this.sprite3d.getChildByName("tarp_wallright"), 
            this.spikeRight.transform.localScaleX = .5, this.tarpCollider = this.sprite3d.getChildByName("tarp_collider"), 
            this.tarpCollider.transform.localPositionZ = 3.5, this.collider3d = this.tarpCollider.getComponent(Laya.PhysicsCollider), 
            this.collider3d && (this.collider3d.collisionGroup = c.GROUP_TRAP, this.collider3d.canCollideWith = c.CAN_TRAP), 
            this.setColliderEnable(!1);
        }
        initEvent() {
            super.initEvent(), Laya.stage.on(i.Game_Enter_NextDoor, this, this.resumeTrap);
        }
        removeEvent() {
            super.removeEvent(), Laya.Tween.clearAll(this.spikeLeft.transform), Laya.Tween.clearAll(this.spikeRight.transform), 
            Laya.Tween.clearAll(this.tarpCollider.transform), this.owner.clearTimer(this, this.checkCollisonPlayer), 
            Laya.stage.off(i.Game_Enter_NextDoor, this, this.resumeTrap),  YYGGames.audio.stop("sound/office.mp3");
        }
        resumeTrap(t) {
            this.doorIndex == t ? (this.isPause = !1, this.setColliderEnable(!0), this.owner.frameLoop(2, this, this.checkCollisonPlayer)) : (this.isPause = !0, 
            this.setColliderEnable(!1), this.owner.clearTimer(this, this.checkCollisonPlayer), 
             YYGGames.audio.stop("sound/office.mp3"));
        }
        checkCollisonPlayer() {
            var t = this.spikeLeft.transform.position.clone();
            t.y = .5;
            var e = new Laya.Vector3(0, 0, 0), a = new Laya.Vector3(0, 0, 0);
            let i = new Laya.Vector3();
            this.mtransform.getForward(i), Laya.Vector3.scale(i, 8, a), Laya.Vector3.add(t, a, e);
            var o = new Laya.HitResult();
            let r = new Laya.BoxColliderShape(3, 1, 1);
            if (this.scene3d.physicsSimulation.shapeCast(r, t, e, o, null, null, c.GROUP_TRAP_RAY, c.CAN_TRAP_RAY), 
            o.collider) {
                var n = o.collider.owner;
                console.log("检测到前方障碍", n.name), n.name !== s.Sprite3d_player && n.name !== s.Sprite3d_dog && n.name !== s.Sprite3d_robber || (console.log("碰到角色，开始加紧尖刺"), 
                this.owner.clearTimer(this, this.checkCollisonPlayer), this.moveSpike());
            }
        }
        moveSpike() {
            this.owner.timerOnce(500, this, () => {
                 YYGGames.audio.play("sound/man_surprised.mp3");
            }),  YYGGames.audio.play("sound/office.mp3", 1), Laya.Tween.to(this.spikeLeft.transform, {
                localScaleX: 2.2
            }, 5e3, null, null, 500), Laya.Tween.to(this.spikeRight.transform, {
                localScaleX: 2.2
            }, 5e3, null, null, 500), Laya.Tween.to(this.tarpCollider.transform, {
                localPositionZ: 0
            }, 5e3, null, null, 500);
        }
    }
    var j = zs.laya.Resource, Z = zs.laya.ObjectPool;
    class q {
        constructor() {
            this.characterList = [], this.removeList = [], this.keyList = [], this.curStageId = 0, 
            this.curStageData = null, this.gameGrid = null, this.gameLockGrid = [], this._astar = null;
        }
        static Instance() {
            return null == this.instance && (this.instance = new q()), this.instance;
        }
        getPlayer() {
            return this.player;
        }
        init(t) {
            this.parent = t, this._astar = new C();
        }
        get astar() {
            return this._astar;
        }
        get grid() {
            return this.gameGrid;
        }
        get lockgrid() {
            return this.gameLockGrid;
        }
        clearRootSprite(t) {
            for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0);
                this.clearSubSprite(e), Z.RecoverSprite3d(e, !0), e.removeSelf();
            }
        }
        clearSubSprite(t) {
            let e = t.getChildByName("wall");
            e && this.clearSprite(e);
            let a = t.getChildByName("trap");
            a && this.clearTrap(a);
            let i = t.getChildByName("enemy");
            i && this.clearEnmey(i);
            let s = t.getChildByName("door");
            s && this.clearDoor(s);
            let o = t.getChildByName("key");
            o && this.clearKey(o);
            let r = t.getChildByName("maps");
            r && this.clearSprite(r);
        }
        clearSprite(t) {
            if (t) for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0), a = e.getComponent(p);
                e.active = !1, Z.RecoverSprite3d(e, !0), t.removeChild(e), a && a.destroy();
            }
        }
        clearEnmey(t) {
            if (t) for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0), a = e.getComponent(h);
                e && this.remove(a);
            }
        }
        clearDoor(t) {
            if (t) for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0), a = e.getComponent(v);
                e.active = !1, Z.RecoverSprite3d(e, !0), t.removeChild(e), e && a.destroy();
            }
        }
        clearKey(t) {
            if (t) for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0), a = e.getComponent(U), i = e.getComponent(z);
                e.active = !1, Z.RecoverSprite3d(e, !0), t.removeChild(e), a && a.destroy(), i && i.destroy();
            }
        }
        clearTrap(t) {
            if (t) for (;t.numChildren > 0; ) {
                let e = t.getChildAt(0), a = e.getComponent(y);
                e.active = !1, Z.RecoverSprite3d(e, !0), t.removeChild(e), a && a.destroy();
            }
        }
        initStageById(a) {
            this.characterList = [], this.keyList = [];
            let i = this.parent.getChildByName(s.Sprite3d_stageroot);
            this.clearRootSprite(i), this.stage3d = this.createElement(s.Sprite3d_stage, s.Sprite3d_stage, i), 
            this.stage3d.transform.localPosition = t.ZERO, this.curStageId = a, this.curStageId > e.data.stageCount && (this.curStageId = 1 + t.random(0, e.data.stageCount)), 
            this.curStageData = e.data.getStageData(this.curStageId), this.gameLockGrid = e.data.getStageLockGrids(this.curStageId), 
            this.gameGrid = new w(e.data.getStageRoomState(this.curStageId), this.gameLockGrid, 2, 3);
            let o = this.curStageData.wall, r = this.stage3d.getChildByName("wall");
            for (let t = 0; t < o.length; t++) {
                let e = this.createSprite3d(o[t], s.Sprite3d_wall);
                r.addChild(e);
            }
            let n = this.curStageData.trap, l = this.stage3d.getChildByName("trap");
            for (let t = 0; t < n.length; t++) {
                let e = n[t], a = this.createTrap3d(e);
                l.addChild(a);
                let i = null;
                (i = a.getComponent(y)) && i.destroy(), a.name === s.Sprite3d_knife && (i = a.addComponent(E)), 
                a.name === s.Sprite3d_arrow && (i = a.addComponent(G)), a.name === s.Sprite3d_bomb && (i = a.addComponent(M)), 
                a.name === s.Sprite3d_frame && (i = a.addComponent(W)), a.name === s.Sprite3d_beast && (i = a.addComponent(H)), 
                a.name === s.Sprite3d_Spike && (i = a.addComponent(K)), i && (i.setScene3d(this.parent), 
                i.doorIndex = e.doorIndex);
            }
            let h = this.curStageData.enemy;
            this.stage3d.getChildByName("enemy");
            for (let t = 0; t < h.length; t++) this.initEnemy(h[t]);
            let d = this.curStageData.door, c = this.stage3d.getChildByName("door");
            for (let t = 0; t < d.length; t++) {
                let e = this.initDoor(d[t]);
                c.addChild(e);
            }
            let m = this.curStageData.key, p = this.stage3d.getChildByName("key");
            for (let t = 0; t < m.length; t++) {
                let e = this.initKey(m[t]);
                p.addChild(e);
            }
            let u = this.gameGrid.getNodes(), g = this.stage3d.getChildByName("maps"), L = u[0].length;
            for (let t = 0; t < u.length; t++) for (let e = 0; e < L; e++) {
                let a = u[t][e];
                if (a.walkable) {
                    let t = this.createGrid3d(a);
                    g.addChild(t);
                }
            }
        }
        createGrid3d(t) {
            var e = j.LoadSprite3d(s.Sprite3d_grid);
            let a = Z.GetSprite3d(e);
            a.name = s.Sprite3d_grid, a.active = !0, a.transform.localPosition = new Laya.Vector3(t.posX, 0, t.posY);
            let i = a.getComponent(Laya.PhysicsCollider);
            i && (i.collisionGroup = c.GROUP_GRID, i.canCollideWith = c.CAN_GRID, t.walkable ? i.enabled = !0 : i.enabled = !1);
            let o = null;
            return (o = a.getComponent(p)) && o.destroy(), (o = a.addComponent(p)).gridX = t.x, 
            o.gridY = t.y, a;
        }
        createSprite3d(t, e = "") {
            let a = e.length > 0 ? e : t.name;
            console.log("resourceName", a);
            var i = j.LoadSprite3d(a);
            let s = Z.GetSprite3d(i);
            return s.name = a, s.active = !0, s.transform.localPosition = new Laya.Vector3(t.posX / 100, t.posY / 100, t.posZ / 100), 
            s.transform.localRotationEuler = new Laya.Vector3(t.rotationX / 100, t.rotationY / 100, t.rotationZ / 100), 
            s.transform.setWorldLossyScale(new Laya.Vector3(t.scaleX / 100, t.scaleY / 100, t.scaleZ / 100)), 
            s;
        }
        createTrap3d(t) {
            console.log("resourceName", t.name);
            var e = j.LoadSprite3d(t.name);
            let a = Z.GetSprite3d(e);
            return a.name = t.name, a.active = !0, a.transform.localPosition = new Laya.Vector3(t.posX / 100, t.posY / 100, t.posZ / 100), 
            a.transform.localRotationEuler = new Laya.Vector3(t.rotationX / 100, t.rotationY / 100, t.rotationZ / 100), 
            a.transform.setWorldLossyScale(new Laya.Vector3(t.scaleX / 100, t.scaleY / 100, t.scaleZ / 100)), 
            a;
        }
        createElement(t, e, a) {
            var i = j.LoadSprite3d(t);
            let s = Z.GetSprite3d(i);
            return s.name = e, s.active = !0, a.addChild(s), s;
        }
        initPlayer() {
            let a = this.parent.getChildByName(s.Sprite3d_player);
            a && (Z.RecoverSprite3d(a), this.parent.removeChild(a)), (a = this.createElement(s.Sprite3d_player, s.Sprite3d_player, this.parent)).transform.position = t.ZERO;
            let i = null;
            (i = a.getComponent(u)) && i.destroy(), (i = a.addComponent(u)).setScene3d(this.parent), 
            i.roleType = o.player, i.isAI = !1, i.isPause = !0;
            var r = a.getComponent(g);
            r && r.destroy(), r = a.addComponent(g);
            var l = a.getComponent(n);
            return l && l.destroy(), l = a.addComponent(n), this.characterList.push(i), this.player = i, 
            i.curRoomId = e.data.getStageStartRoom(this.curStageId), i.endRoomId = e.data.getStageEndRoom(this.curStageId), 
            i;
        }
        initWoman() {
            let a = this.parent.getChildByName(s.Sprite3d_woman);
            a && (Z.RecoverSprite3d(a), this.parent.removeChild(a)), (a = this.createElement(s.Sprite3d_woman, s.Sprite3d_woman, this.parent)).transform.position = t.ZERO;
            let i = null;
            (i = a.getComponent(B)) && i.destroy(), (i = a.addComponent(B)).setScene3d(this.parent), 
            i.roleType = o.woman, i.isAI = !1, i.isPause = !0;
            var r = a.getComponent(n);
            return r && r.destroy(), r = a.addComponent(n), this.characterList.push(i), i.curRoomId = e.data.getStageEndRoom(this.curStageId), 
            i;
        }
        initEnemy(t) {
            let e = this.stage3d.getChildByName("enemy"), a = e.getChildByName(t.name), i = null;
            (i = (a = this.createElement(t.name, t.name, e)).getComponent(h)) && i.destroy(), 
            -1 != t.name.indexOf(s.Sprite3d_dog) && ((i = a.addComponent(_)).roleType = o.dog), 
            -1 != t.name.indexOf(s.Sprite3d_robber) && ((i = a.addComponent(f)).roleType = o.robber), 
            i.setScene3d(this.parent), i.doorIndex = t.doorIndex, i.curRoomId = new Laya.Vector2(t.girdX, t.girdY), 
            i.isAI = !0, i.isPause = !0;
            var r = a.getComponent(L);
            r && r.destroy(), r = a.addComponent(L);
            var l = a.getComponent(n);
            l && l.destroy(), l = a.addComponent(n), this.characterList.push(i);
            let d = a.getComponent(Laya.PhysicsCollider);
            d && (d.enabled = !0);
            let c = a.getComponent(Laya.Rigidbody3D);
            return c && (c.enabled = !0), a.transform.localPosition = new Laya.Vector3(t.posX / 100, t.posY / 100, t.posZ / 100), 
            a.transform.localRotationEuler = new Laya.Vector3(t.rotationX / 100, t.rotationY / 100, t.rotationZ / 100), 
            a.transform.setWorldLossyScale(new Laya.Vector3(t.scaleX / 100, t.scaleY / 100, t.scaleZ / 100)), 
            i;
        }
        initDoor(t) {
            var e = j.LoadSprite3d(t.name);
            let a = Z.GetSprite3d(e);
            a.name = t.name, a.active = !0;
            let i = null;
            return (i = a.getComponent(v)) && i.destroy(), i = a.addComponent(v), a.transform.localPosition = new Laya.Vector3(t.posX / 100, t.posY / 100, t.posZ / 100), 
            a.transform.localRotationEuler = new Laya.Vector3(t.rotationX / 100, t.rotationY / 100, t.rotationZ / 100), 
            a.transform.setWorldLossyScale(new Laya.Vector3(t.scaleX / 100, t.scaleY / 100, t.scaleZ / 100)), 
            i.curRoomId = new Laya.Vector2(t.girdX, t.girdY), i.doorIndex = t.doorIndex, i.turn = t.turn, 
            a;
        }
        initKey(t) {
            console.log("keyData.name", t.name);
            var e = j.LoadSprite3d(t.name);
            let a = Z.GetSprite3d(e);
            a.name = t.name, a.active = !0;
            let i = null;
            (i = a.getComponent(U)) && i.destroy(), i = a.addComponent(U);
            let s = a.getComponent(z);
            return s && s.destroy(), s = a.addComponent(z), i.setScene3d(this.parent), i.maxDist = t.maxDist, 
            i.doorIndex = t.doorIndex, i.lockGrids = t.lockGrids, a.transform.localPosition = new Laya.Vector3(t.posX / 100, t.posY / 100, t.posZ / 100), 
            a.transform.localRotationEuler = new Laya.Vector3(t.rotationX / 100, t.rotationY / 100, t.rotationZ / 100), 
            a.transform.setWorldLossyScale(new Laya.Vector3(t.scaleX / 100, t.scaleY / 100, t.scaleZ / 100)), 
            this.keyList.push(i), a;
        }
        getCharacterList() {
            return this.characterList;
        }
        getKeyList() {
            return this.keyList;
        }
        getTargetRoleList(t) {
            let e = [];
            for (let a = 0; a < this.characterList.length; a++) {
                let i = this.characterList[a];
                i.doorIndex != t || i.roleType != o.player && i.roleType != o.robber || e.push(i), 
                i.roleType == o.woman && e.push(i);
            }
            return e;
        }
        getTargetPlayerList(t) {
            let e = [];
            for (let a = 0; a < this.characterList.length; a++) {
                let i = this.characterList[a];
                i.doorIndex == t && i.roleType == o.player && e.push(i), i.roleType == o.woman && e.push(i);
            }
            return e;
        }
        remove(t) {
            let e = this.characterList.indexOf(t);
            -1 != e && this.characterList.splice(e, 1);
            let a = t.sprite3d;
            a.active = !1, Z.RecoverSprite3d(a), t.destroy();
        }
        onDestroy() {
            for (let t = this.characterList.length - 1; t >= 0; t--) {
                const e = this.characterList[t];
                let a = e.sprite3d;
                this.characterList[t] = null, a.active = !1, Z.RecoverSprite3d(a, !0), e.destroy();
            }
            this.characterList = [];
            let t = this.parent.getChildByName(s.Sprite3d_stageroot);
            this.clearRootSprite(t), this.keyList = [];
        }
    }
    q.instance = null;
    var J = zs.laya.Resource, Q = zs.laya.ObjectPool;
    class $ {
        constructor() {
            this.goldList = [];
        }
        static Instance() {
            return null == this.instance && (this.instance = new $()), this.instance;
        }
        init(t) {
            this.parent = t;
        }
        createGold(t) {
            let e = J.LoadSprite3d(t), a = Q.GetSprite3d(e);
            return a.name = t, this.parent.addChild(a), a.active = !0, -1 == this.goldList.indexOf(a) && (this.goldList[this.goldList.length] = a), 
            a;
        }
        removeGold(t) {
            let e = this.goldList.indexOf(t);
            -1 != e && this.goldList.splice(e, 1), t.active = !1, Q.RecoverSprite3d(t);
        }
        onDestroy() {
            if (this.goldList.length > 0) {
                for (let t = this.goldList.length - 1; t >= 0; t--) {
                    const t = this.goldList.pop();
                    Q.RecoverSprite3d(t);
                }
                this.goldList = [];
            }
        }
        getGoldList() {
            return this.goldList;
        }
        addGolds(t, e, a, i) {
            var s = Math.floor(360 / t);
            s = s * Math.PI / 180;
            for (let o = 0; o < t; o++) {
                const t = this.createGold(e);
                t.transform.setWorldLossyScale(new Laya.Vector3(.5, .5, .5)), t.transform.position = i.clone();
                let r = Math.sin(s * o) * a, n = Math.cos(s * o) * a, l = t.transform.position.x + r, h = t.transform.position.y + 2, d = t.transform.position.y + .5, c = t.transform.position.z + n;
                Laya.Tween.to(t.transform, {
                    localPositionX: l - .5 * r,
                    localPositionY: h,
                    localPositionZ: c - .5 * n
                }, 150, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(t.transform, {
                        localPositionX: l,
                        localPositionY: d,
                        localPositionZ: c
                    }, 150, null, null);
                }));
            }
        }
    }
    $.instance = null;
    var tt = zs.laya.game.EventId;
    class et extends Laya.Script3D {
        constructor() {
            super(), this.inSleep = !0;
        }
        onAwake() {
            et.scenee3d = this.owner, Laya.MouseManager.multiTouchEnabled = !1, et.scenee3d.input.multiTouchEnabled = !1;
        }
        onEnable() {
            q.Instance().init(et.scenee3d), O.Instance().init(et.scenee3d), A.Instance().init(et.scenee3d), 
            $.Instance().init(et.scenee3d), et.cameraCtr = et.scenee3d.getChildByName("GameAmbient").addComponent(d), 
            et.camera = et.cameraCtr.camera, Laya.stage.on(tt.GAME_SLEEP, this, this.sleep), 
            Laya.stage.on(tt.GAME_WAKEUP, this, this.wakeup), Laya.stage.on(tt.GAME_PREPARE, this, this.onGamePrepare), 
            Laya.stage.on(tt.GAME_HOME, this, this.onGameHome), Laya.stage.on(tt.GAME_START, this, this.onGameStart), 
            Laya.stage.on(tt.GAME_OVER, this, this.onGameOver), Laya.stage.on(tt.GAME_RELIVE, this, this.onGameRelive), 
            Laya.stage.on(i.Stage_Finish, this, this.onStageFinish), Laya.stage.on(i.Stage_Fail, this, this.onStageFail), 
            Laya.stage.on(i.Game_ResetGame, this, this.onResetGame), Laya.stage.on(tt.APP_HIDE, this, this.onGameHide);
        }
        onDisable() {
            Laya.stage.off(tt.GAME_SLEEP, this, this.sleep), Laya.stage.off(tt.GAME_WAKEUP, this, this.wakeup), 
            Laya.stage.off(tt.GAME_PREPARE, this, this.onGamePrepare), Laya.stage.off(tt.GAME_HOME, this, this.onGameHome), 
            Laya.stage.off(tt.GAME_START, this, this.onGameStart), Laya.stage.off(tt.GAME_OVER, this, this.onGameOver), 
            Laya.stage.off(tt.GAME_RELIVE, this, this.onGameRelive), Laya.stage.off(i.Stage_Finish, this, this.onStageFinish), 
            Laya.stage.off(i.Stage_Fail, this, this.onStageFail), Laya.stage.off(i.Game_ResetGame, this, this.onResetGame), 
            Laya.stage.off(tt.APP_HIDE, this, this.onGameHide);
        }
        onStart() {}
        wakeup() {
            this.inSleep = !1;
        }
        sleep() {
            this.inSleep = !0;
        }
        onGameHome() {
            this.initGame();
        }
        onGamePrepare() {}
        onResetGame() {
            this.initGame(), Laya.stage.frameOnce(20, this, () => {
                this.onGameHide(), this.inSleep = !1, this.player && (this.player.isPause = !1), 
                Laya.stage.event(i.Game_Check_Astar);
            });
        }
        onGameStart() {
            this.inSleep = !1, this.player && (this.player.isPause = !1), Laya.stage.event(i.Game_Check_Astar);
        }
        onGameOver() {
            this.inSleep = !0;
        }
        onGameRelive() {
            this.inSleep = !1;
        }
        initGame() {
            et.camera.orthographicVerticalSize = 11, this.destroyGame(), this.inSleep = !0, 
            e.data.gameFinish = !1, q.Instance().initStageById(e.data.curStage), this.player = q.Instance().initPlayer(), 
            q.Instance().initWoman();
        }
        destroyGame() {
            q.Instance().onDestroy(), O.Instance().onDestroy(), A.Instance().onDestroy(), $.Instance().onDestroy();
        }
        onStageFinish() {
            this.onGameHide(), Laya.stage.mouseEnabled = !1,  YYGGames.audio.play("sound/victory.mp3"), 
            Laya.Tween.to(et.camera, {
                orthographicVerticalSize: 7
            }, 1e3, null, null, 500), this.owner.timerOnce(3e3, this, () => {
                e.data.curStage = e.data.curStage + 1, Laya.stage.mouseEnabled = !0, Laya.stage.event(h.EVENT_PAUSE), 
                Laya.stage.event(tt.GAME_WIN);
            });
        }
        onStageFail() {
            
            Laya.stage.mouseEnabled = !1, Laya.stage.event(tt.GAME_SLEEP), zs.laya.sdk.DeviceService.VibrateLong(), 
            this.onGameHide(),  YYGGames.audio.play("sound/fail.mp3"), this.owner.timerOnce(1500, this, () => {
                Laya.stage.mouseEnabled = !0, Laya.stage.event(h.EVENT_PAUSE), Laya.stage.event(tt.GAME_FAILED);
            });
           
        }
        onGameHide() {
           
             YYGGames.audio.stop("sound/office.mp3"),  YYGGames.audio.stop("sound/burning.mp3"), 
             YYGGames.audio.stop("sound/move.mp3"), console.log("关闭循环音效");
        }
    }
    var at = zs.laya.game.EventId;
    class it extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
        }
        onEnable() {
            super.onEnable(), this.stageLabel.text = e.data.curStage.toString(), this.maskImage.visible = !1, 
            this.hideGuid(), Laya.stage.on(i.Stage_Finish, this, this.onStageFinish), this.resetGameBtn.on(Laya.Event.CLICK, this, this.resetGame), 
            Laya.stage.on(i.Game_Enter_NextDoor, this, this.showHandTip), Laya.stage.on(i.Game_Hide_Guide, this, this.hideGuid);
            this.voice.on(Laya.Event.CLICK, this, this.onVoice);
            this.refreshv();
            

        }

        onVoice(){
            let v = platform.getInstance().getStorageSync("soundActive") || 1000;
            if(v===1000){
                platform.getInstance().setStorageSync("soundActive",10001) 
            }else{
                platform.getInstance().setStorageSync("soundActive",1000)  
            }
            this.refreshv();

        }

        refreshv(){
            let v = platform.getInstance().getStorageSync("soundActive") || 1000;
            if(v===1000){
                this.voice.skin = "gameUI/btn_sound_on.png";
                // YYGGames.audio.stopAll();
                YYGGames.audio.pause = false;

            }else{
                this.voice.skin = "gameUI/btn_sound_off.png";
                YYGGames.audio.pause = true;
            }
        }
        onStart() {
            Laya.stage.event(at.GAME_START);
        }
        onDisable() { 
            super.onDisable();
            this.voice.off(Laya.Event.CLICK, this, this.onVoice);
            Laya.stage.off(i.Stage_Finish, this, this.onStageFinish), this.resetGameBtn.off(Laya.Event.CLICK, this, this.resetGame), 
            Laya.stage.off(i.Game_Enter_NextDoor, this, this.showHandTip), Laya.stage.off(i.Game_Hide_Guide, this, this.hideGuid);
        }
        resetGame() {
            // platform.getInstance().showInterstitial(()=>{
                t.scaleToDefault(this.resetGameBtn),  YYGGames.audio.play(zs.laya.game.AppMain.appConfig.soundClick), 
                console.log("重设游戏"), this.resetGameBtn.visible = !1, Laya.stage.event(i.Game_ResetGame), 
                this.owner.timerOnce(1e3, this, () => {
                    this.resetGameBtn.visible = !0;
                });
            // })
        }
        onStageFinish() {
            this.maskImage.visible = !0;
            let t = new Laya.Vector2();
            et.cameraCtr.world2ScreenPos(q.Instance().getPlayer().mtransform.position.clone(), t), 
            this.maskImage.x = t.x + 80, this.maskImage.y = t.y - 60, this.maskImage.scale(4, 4), 
            Laya.Tween.to(this.maskImage, {
                scaleX: 1.2,
                scaleY: 1.2
            }, 1500);
        }
        showHandTip(t) {
            if (e.data.curStage <= 2) {
                let t = q.Instance().getKeyList()[0], e = new Laya.Vector2();
                et.cameraCtr.world2ScreenPos(t.startPos3d.transform.position.clone(), e), this.showGuid(e);
            }
        }
        showGuid(t) {
            console.log("==============显示新手引导动画================"), Laya.Tween.clearTween(this.fingerNode), 
            this.fingerNode.visible = !0, this.fingerNode.pos(t.x + 50, t.y + 45);
        }
        hideGuid() {
            console.log("==============隐藏新手引导动画================"), Laya.Tween.clearTween(this.fingerNode), 
            this.fingerNode && (this.fingerNode.visible = !1);
        }
    }
    class st {
        constructor() {}
        static init() {
            var t = Laya.ClassUtils.regClass;
            t("compUI/GameHomeUI.ts", a), t("compUI/GamePlayUI.ts", it);
        }
    }
    st.width = 750, st.height = 1334, st.scaleMode = "fixedauto", st.screenMode = "none", 
    st.alignV = "top", st.alignH = "left", st.startScene = "view/ad/FloatAd.scene", 
    st.sceneRoot = "", st.debug = !1, st.stat = !1, st.physicsDebug = !1, st.exportSceneToJson = !0, 
    st.init();
    var ot = zs.laya.ObjectPool, rt = zs.laya.game.EventId;
    class nt extends zs.laya.game.AppMain {
        constructor() {
            super(), this.sceneLogic = null;
        }
        onAwake() {
            super.onAwake(), 
            Laya.stage.on(rt.DATA_SETTING_UPDATE, this, this.updateSetting), 
            Laya.stage.on("DATA_LOGIN_INFO_UPDATE", this, this.updatePlayerInfo), Laya.stage.on(rt.UI_VIEW_CLOSED, this, this.onViewClosed), 
            Laya.stage.on(rt.UI_VIEW_OPENED, this, this.onViewOpened), Laya.stage.once(rt.LAUNCH_COMPLETED, this, this.onGameLaunchReady);
        }
        onDestroy() {
            this.sceneLogic = null, Laya.stage.off(rt.UI_VIEW_CLOSED, this, this.onViewClosed), 
            Laya.stage.off(rt.UI_VIEW_OPENED, this, this.onViewOpened), Laya.stage.off(rt.DATA_SETTING_UPDATE, this, this.updateSetting), 
            Laya.stage.off("DATA_LOGIN_INFO_UPDATE", this, this.updatePlayerInfo);
        }
        onGameLaunchReady(t) {
            ot.ClearCache();
            var a = Laya.loader.getRes("config/leveldata.json");
            e.initStageData(a), this.updateSetting(), t && (this.sceneLogic = Laya.stage.addChildAt(t, 0).addComponent(et)), 
            Laya.stage.event(rt.GAME_HOME);
        }
        onViewClosed(t, e) {
            super.onViewClosed(t, e), console.log(`${t} closed`);
        }
        onViewOpened(t, e) {
            super.onViewOpened(t, e), console.log(`${t} opened`);
        }
        updateSetting() {
            e.initGameData();
        }
        updatePlayerInfo(t) {
            e.updatePlayerInfo(t);
        }
    }
    new class {
        constructor() {
            window.Laya3D ? Laya3D.init(st.width, st.height) : Laya.init(st.width, st.height, Laya.WebGL), 
            Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), 
            Laya.stage.bgColor = "#ffffff", 
            Laya.stage.scaleMode = "showall", 
            Laya.stage.screenMode = st.screenMode, 
            Laya.stage.alignH = "center";
            Laya.URL.exportSceneToJson = st.exportSceneToJson, 
            Laya.alertGlobalError = !1,
             Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.stage.addComponent(nt);
        }
    }();
}();