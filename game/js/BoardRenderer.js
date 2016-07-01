define(
    ['js/BoardModel.js', 'js/BoardController.js', 'js/MessageUtil.js'],
    function BoardRendererDefinitionFn(model, controller, message) {
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

                    virtualCell.dataset.x = column;
                    virtualCell.dataset.y = row;

                    this.describeCell(virtualCell);

                    virtualRow.appendChild(virtualCell);
                }

                virtualBoard.appendChild(virtualRow)
            }

            this.container.appendChild(virtualBoard);

            return this;
        };

        var refreshTable = function () {
            var renderer = this;

            var cells = this.container.querySelectorAll('td');
            [].forEach.call(cells, function (cell) {
                renderer.describeCell(cell);
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

        var attachActions = function () {
            this
                .listenToCells();

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
                    cell.classList.remove('active');
            }

            return this;
        };

        var setRunning = function (value) {
            var running = !!value;

            this.running = running;

            if (running) {
                this.container.classList.add('is-running');
            } else {
                this.container.classList.remove('is-running');
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
            attachActions:       attachActions,
            describeCell:        describeCell,
            setRunning:          setRunning,
            getCellCoordinates:  getCellCoordinates
        };

        return new BoardRenderer();
    }
);