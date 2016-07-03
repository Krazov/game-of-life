define(
    ['js/BoardModel.js'],
    function BoardControllerDefinitionFn(model) {
        'use strict';

        var setSize = function (width, height) {
            this.width = width;
            this.height = height;

            return this;
        };

        var getSize = function () {
            return [this.width, this.height];
        };

        var createBoard = function () {
            this.previous = new Array(this.width * this.height);
            this.previous.fill(model.STATE_DEAD);

            this.board = new Array(this.width * this.height);
            this.board.fill(model.STATE_DEAD);

            return this;
        };

        var updateTable = function () {
            var controller = this;
            var runTable = function (item, index) {
                var neighbours = controller.checkNeighbours(index);

                if (neighbours < 2 || neighbours > 3) {
                    return model.STATE_DEAD;
                }

                if (neighbours === 3) {
                    return model.STATE_ALIVE;
                }

                return item;
            };

            this.previous = this.board;
            this.board = this.board.map(runTable);

            return this;
        };

        var clearTable = function () {
            this.board.fill(model.STATE_DEAD);

            return this;
        };

        var checkNeighbours = function (index) {
            var [x, y] = this.getCoordinates(index);
            var checkpoints = [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0],  /*  x  */ [1, 0],
                [-1, 1],  [0,  1],  [1, 1]
            ];

            // TODO: find simpler way of finding neighbours
            var neighbours = 0;
            var delta_x;
            var delta_y;

            for (var i = 0; i < checkpoints.length; ++i) {
                [delta_x, delta_y] = checkpoints[i];

                delta_x += x;
                delta_y += y;

                if (delta_x === this.width) {
                    delta_x = 0;
                } else if (delta_x === -1) {
                    delta_x = this.width - 1;
                }

                if (delta_y === this.height) {
                    delta_y = 0;
                } else if (delta_y === -1) {
                    delta_y = this.height - 1;
                }

                neighbours += this.getCellValue(this.getIndex(delta_x, delta_y));

                if (neighbours > 3) {
                    break;
                }
            }

            return neighbours;
        };

        var changeState = function (index) {
            switch (this.board[index]) {
                case model.STATE_ALIVE:
                    this.board[index] = model.STATE_DEAD;
                    break;
                case model.STATE_DEAD:
                    this.board[index] = model.STATE_ALIVE;
                    break;
            }

            return this;
        };

        var isLifeStill = function () {
            return this.board.join('') === this.previous.join('');
        };

        var isPopulationAlive = function () {
            var anyAlive = function (item) {
                return item === model.STATE_ALIVE;
            }

            return this.board.some(anyAlive);
        };

        var getBoard = function () {
            return this.board;
        };

        var getIndex = function (x, y) {
            return y * this.width + x;
        }

        var getCoordinates = function (index) {
            var x = 0;
            var y = 0;

            while (index >= this.width) {
                index -= this.width;
                ++y;
            }

            x = index;

            return [x, y];
        };

        var getPreviousValue = function (index) {
            return this.previous[index];
        }

        var getCellValue = function (index) {
            return this.board[index];
        };

        // constructor
        var BoardController = function() {};

        BoardController.prototype = {
            setSize:           setSize,           // chainable
            getSize:           getSize,           // returns (Array) with [width, height]
            createBoard:       createBoard,       // chainable
            updateTable:       updateTable,       // chainable
            clearTable:        clearTable,        // chainable
            checkNeighbours:   checkNeighbours,   // returns (Number) of neighbours
            changeState:       changeState,       // chainable
            isLifeStill:       isLifeStill,       // returns (Boolean) current board vs previous board
            isPopulationAlive: isPopulationAlive, // returns (Boolean) is any element on board alive
            getBoard:          getBoard,          // returns (Array) current board
            getIndex:          getIndex,          // returns (Number) cell index
            getCoordinates:    getCoordinates,    // returns (Array) [x, y] from given index
            getPreviousValue:  getPreviousValue,  // returns (Number) cell value
            getCellValue:      getCellValue,      // returns (Number) cell value
        };

        return new BoardController();
    }
);