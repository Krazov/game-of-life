define(
    [],
    function MessageUtilDefinitionFn(model) {
        'use strict';

        var display = function (message) {
            console.log('Message:', message);
        };

        // constructor
        var MessageUtil = function() {};

        MessageUtil.prototype = {
            display: display
        };

        return new MessageUtil();
    }
);