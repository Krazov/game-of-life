require(
    ['js/BoardController.js', 'js/BoardRenderer.js', 'js/GameStatus.js', 'js/MessageUtil.js'],
    function (controller, renderer, gameStatus, message) {
        'use strict';

        var runningId = 0;
        var tickCount = 0;

        console.log('Game of life: Krazov implementation');

        // prepare table
        controller
            .setSize(17, 17)
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

                if (controller.isLifeStill()) {
                    message.display(`After ${tickCount} ticks life has become still. Game over.`);

                    runningId = 0;
                    tickCount = 0;

                    setTimeout(function () {
                        gameStatus.setStatus(gameStatus.STOPPED);
                    }, 1250);

                    return false;
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