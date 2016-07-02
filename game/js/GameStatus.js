define(
    [],
    function (controller, renderer, message) {
        'use strict';

        var checkStatusValidity = function (status) {
            return [this.STOPPED, this.RUNNING, this.PAUSED, this.FINISHED].includes(status);
        }

        var setStatus = function (value) {
            if (this.checkStatusValidity(value) && (this.status !== value)) {
                this.status = value;

                var statusEvent = new CustomEvent(this.EVENT_CHANGE, { detail: value });
                window.dispatchEvent(statusEvent);
            }

            return this;
        };

        var getStatus = function () {
            return this.status;
        };

        var isRunning = function () {
            return this.status === this.RUNNING;
        }

        var isNotRunning = function () {
            return this.status !== this.RUNNING;
        }

        // constructor
        var GameStatus = function () {
            this.STOPPED  = 1;
            this.RUNNING  = 2;
            // this.PAUSED   = 3;
            // this.FINISHED = 4;

            this.EVENT_CHANGE = 'statusChanged';

            this.status = this.STOPPED;
        };

        GameStatus.prototype = {
            checkStatusValidity: checkStatusValidity,
            setStatus:           setStatus,
            getStatus:           getStatus,
            isRunning:           isRunning,
            isNotRunning:        isNotRunning
        };

        return new GameStatus();
    }
);