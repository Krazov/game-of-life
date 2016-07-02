require(
    ['js/BoardController.js', 'js/BoardRenderer.js', 'js/GameStatus.js', 'js/MessageUtil.js'],
    function (controller, renderer, gameStatus, message) {
        'use strict';

        var runningId = 0;
        var tickCount = 0;

        console.log('Game of life: Krazov implementation');

        // prepare table
        controller
            .setSize(15, 15)
            .createBoard();

        // display table
        renderer
            .setContainer(document.getElementById('board'))
            .drawBoard()
            .attachActions();

        // start button
        document.getElementById('start').addEventListener('click', function startGameFn() {
            var tick = function () {
                message.display('Tick #' + (++tickCount));

                controller.updateTable();
                renderer.refreshTable();

                if (controller.isLifeStil()) {
                    message.display(`After ${tickCount} life has become still. Game over.`);

                    gameStatus.setStatus(gameStatus.STOPPED);

                    runningId = 0;
                    tickCount = 0;
                }

                if (gameStatus.isRunning()) {
                    runningId = setTimeout(tick, 1000);
                }
            };

            gameStatus.setStatus(gameStatus.RUNNING);
            runningId = setTimeout(tick, 1000);

            message.display('Game started.');
        });

        // stop button
        document.getElementById('stop').addEventListener('click', function stopGameFn() {
            if (gameStatus.isNotRunning()) {
                return false;
            }

            gameStatus.setStatus(gameStatus.STOPPED);
            clearTimeout(runningId);
            runningId = 0;
            tickCount = 0;

            message.display('Game stopped.');
        });

        // clear button
        document.getElementById('clear').addEventListener('click', function clearBoard() {
            if (gameStatus.isRunning()) {
                return false;
            }

            // else...
            controller.clearTable();
            renderer.refreshTable(true);
        });

        // invert button
        document.getElementById('invert').addEventListener('click', function () {
            message.display('Table has just been inverted.');
        });
    }
);