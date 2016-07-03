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

            for (var index = 0; index < board.length; ++index) {
                var [width] = controller.getSize();
                if (index % width === 0) {
                    var virtualRow = document.createElement('tr');
                }
                var virtualCell = document.createElement('td');

                virtualCell.classList.add('empty');
                virtualCell.dataset.index = index;

                virtualRow.appendChild(virtualCell);

                if (index % width === width - 1) {
                    virtualBoard.appendChild(virtualRow)
                }
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
            var currentIndex;

            var clickCell = function (clickEvent) {
                if (gameStatus.isRunning()) {
                    return false;
                }

                var cell = clickEvent.target;

                controller.changeState(cell.dataset.index);
                renderer.describeCell(cell);
            };
            var attachListeners = function (item, index) {
                currentIndex = index;
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
            var index = this.getCellIndex(cell);

            switch (controller.getCellValue(index)) {
                case model.STATE_ALIVE:
                    cell.classList.add('active');
                    break;
                case model.STATE_DEAD:
                default:
                    if (controller.getPreviousValue(index) === model.STATE_ALIVE) {
                        cell.classList.remove('empty');
                    }
                    cell.classList.remove('active');
            }

            return this;
        };

        var getCellIndex = function (cell) {
            return Number(cell.dataset.index);
        }

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
            getCellIndex:        getCellIndex,
            getCellCoordinates:  getCellCoordinates
        };

        return new BoardRenderer();
    }
);