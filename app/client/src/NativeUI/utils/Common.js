"use strict";
exports.__esModule = true;
var Common = /** @class */ (function () {
    function Common() {
    }
    Common.PlaySound = function (audioName, audioRef) {
        mp.game.audio.playSound(-1, audioName, audioRef, false, 0, true);
    };
    return Common;
}());
exports["default"] = Common;
