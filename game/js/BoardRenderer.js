define(
    ['js/BoardModel.js', 'js/BoardController.js', 'js/GameStatus', 'js/MessageUtil.js'],
    function BoardRendererDefinitionFn(model, controller, gameStatus, message) {
        'use strict';

        var setContainer = function (container) {
            this.container = container;

            return this;
        };

        var drawBoard = function () {
            var virtualBoard = document.createDocumentFragment();
            var board = controller.getBoard();

            for (var row = 0; row < board.length; ++row) {
                var virtualRow = document.createElement('tr');

                for (var column = 0; column < board[row].length; ++column) {
                    var virtualCell = document.createElement('td');

                    virtualCell.classList.add('empty');
                    virtualCell.dataset.x = column;
                    virtualCell.dataset.y = row;

                    virtualRow.appendChild(virtualCell);
                }

                virtualBoard.appendChild(virtualRow)
            }

            this.container.appendChild(virtualBoard);

            return this;
        };

        var refreshTable = function (clear) {
            var renderer = this;

            var cells = this.container.querySelectorAll('td');
            [].forEach.call(cells, function (cell) {
                if (clear && !renderer.running) {
                    cell.classList.remove('active');
                    cell.classList.add('empty');
                } else {
                    renderer.describeCell(cell);
                }
            });
        };

        var listenToCells = function () {
            var renderer = this;

            var clickCell = function (clickEvent) {
                if (renderer.running) {
                    return false;
                }

                var cell = clickEvent.target;
                var [x, y] = renderer.getCellCoordinates(cell);

                controller.changeState(x, y);
                renderer.describeCell(cell);
            };
            var attachListeners = function (item) {
                item.addEventListener('click', clickCell);
            };
            var cells = this.container.querySelectorAll('td');

            [].forEach.call(cells, attachListeners);

            return this;
        };

        var listenToStatus = function () {
            var container = this.container;
            var reactToStatus = function (eventData) {
                if (eventData.detail === gameStatus.RUNNING) {
                    container.classList.add('is-running');
                } else {
                    container.classList.remove('is-running');
                }
            };
            window.addEventListener(gameStatus.EVENT_CHANGE, reactToStatus);

            return this;
        };

        var attachActions = function () {
            this
                .listenToCells()
                .listenToStatus();

            return this;
        };

        var describeCell = function (cell) {
            var board = controller.getBoard();

            var [x, y] = this.getCellCoordinates(cell);

            switch (controller.getCellValue(x, y)) {
                case model.STATE_ALIVE:
                    cell.classList.add('active');
                    break;
                case model.STATE_DEAD:
                default:
                    if (controller.getPreviousValue(x, y) === model.STATE_ALIVE) {
                        cell.classList.remove('empty');
                    }
                    cell.classList.remove('active');
            }

            return this;
        };

        var getCellCoordinates = function (cell) {
            return [Number(cell.dataset.x), Number(cell.dataset.y)];
        }

        // constructor
        var BoardRenderer = function () {
            this.running = false;
        };

        BoardRenderer.prototype = {
            setContainer:        setContainer,
            drawBoard:           drawBoard,
            refreshTable:        refreshTable,
            listenToCells:       listenToCells,
            listenToStatus:      listenToStatus,
            attachActions:       attachActions,
            describeCell:        describeCell,
            getCellCoordinates:  getCellCoordinates
        };

        return new BoardRenderer();
    }
);