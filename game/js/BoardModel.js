define(
    [],
    function () {
        'use strict';

        var BoardModel = function () {
            this.STATE_DEAD  = 0;
            this.STATE_ALIVE = 1;
        }

        BoardModel.prototype = {};

        return new BoardModel();
    }
);