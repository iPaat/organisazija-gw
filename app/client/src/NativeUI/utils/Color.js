"use strict";
exports.__esModule = true;
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = 255; }
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }
    Color.Empty = new Color(0, 0, 0, 0);
    Color.Transparent = new Color(0, 0, 0, 0);
    Color.Black = new Color(0, 0, 0, 255);
    Color.White = new Color(255, 255, 255, 255);
    Color.WhiteSmoke = new Color(245, 245, 245, 255);
    return Color;
}());
exports["default"] = Color;
