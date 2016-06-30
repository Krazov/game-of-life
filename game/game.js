require(
    ['js/BoardController.js', 'js/BoardRenderer.js'],
    function (controller, renderer) {
        'use strict';

        console.log('Game of life: Krazov edition');

        // prepare table
        controller
            .setSize(15, 15)
            .createBoard();

        // display table
        renderer
            .setContainer(document.getElementById('board'))
            .drawBoard()
            .attachActions();
    }
);