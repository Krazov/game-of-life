define(
    ['js/BoardModel.js'],
    function BoardControllerDefinitionFn(model) {
        'use strict';

        var setSize = function (width, height) {
            this.width = width;
            this.height = height;

            return this;
        };

        var createBoard = function () {
            this.board = [];

            for (var row = 0; row < this.height; ++row) {
                var innerRow = new Array(this.width);
                innerRow.fill(model.STATE_DEAD);
                this.board.push(innerRow);
            }

            this.previous = JSON.parse(JSON.stringify(this.board));

            return this;
        };

        var updateTable = function () {
            var innerTable = [];

            for (var row = 0; row < this.height; ++row) {
                var innerRow = [];
                for (var cell = 0; cell < this.width; ++cell) {
                    var neighbours = this.checkNeighbours(cell, row);

                    if (neighbours < 2 || neighbours > 3) {
                        innerRow.push(model.STATE_DEAD);
                    } else if (neighbours === 3) {
                        innerRow.push(model.STATE_ALIVE);
                    } else {
                        innerRow.push(this.getCellValue(cell, row));
                    }
                }

                innerTable.push(innerRow);
            }

            this.previous = this.board;
            this.board = innerTable;

            return this;
        };

        var clearTable = function () {
            this.board.forEach(function (row) {
                row.fill(model.STATE_DEAD);
            });

            return this;
        };

        var checkNeighbours = function (x, y) {
            var checkpoints = [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0],  /* xx */ [1, 0],
                [-1, 1],  [0, 1],  [1, 1]
            ];

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

                neighbours += this.getCellValue(delta_x, delta_y);

                if (neighbours > 3) {
                    break;
                }
            }

            return neighbours;
        };

        var changeState = function (x, y) {
            switch (this.board[y][x]) {
                case model.STATE_ALIVE:
                    this.board[y][x] = model.STATE_DEAD;
                    break;
                case model.STATE_DEAD:
                    this.board[y][x] = model.STATE_ALIVE;
                    break;
            }

            return this;
        };

        var getBoard = function () {
            return this.board;
        };

        var getPreviousValue = function (x, y) {
            return this.previous[y][x];
        }

        var getCellValue = function (x, y, previous) {
            return this.board[y][x];
        };

        // constructor
        var BoardController = function() {};

        BoardController.prototype = {
            setSize:          setSize,           // chainable
            createBoard:      createBoard,       // chainable
            getBoard:         getBoard,          // returns (Array) current board
            getPreviousValue: getPreviousValue,      // returns (Number) cell value
            getCellValue:     getCellValue,      // returns (Number) cell value
            updateTable:      updateTable,       // chainable
            clearTable:       clearTable,        // chainable
            checkNeighbours:  checkNeighbours,   // returns (Number) of neighbours
            changeState:      changeState,       // chainable
        };

        return new BoardController();
    }
);