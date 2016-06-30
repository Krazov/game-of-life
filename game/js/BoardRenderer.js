define(
    ['js/BoardModel.js', 'js/BoardController.js'],
    function BoardRendererDefinitionFn(model, controller) {
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

        var listenToStartButton = function () {
            var renderer = this;

            var runCycle = function () {
                controller.updateTable();
                renderer.refreshTable();

                if (renderer.running) {
                    setTimeout(runCycle, 1000);
                }
            };

            var start = function () {
                renderer.running = true;

                setTimeout(runCycle, 1000);
            };

            document.getElementById('start').addEventListener('click', start);

            return this;
        };

        var listenToClearButton = function () {
            // TODO: redo, like, completely
            var refreshFn = this.refreshTable.bind(this);
            controller.clearTable();
            document.getElementById('clear').addEventListener('click', refreshFn);

            return this;
        };

        var attachActions = function () {
            this
                .listenToCells()
                .listenToClearButton()
                .listenToStartButton();

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
            listenToStartButton: listenToStartButton,
            listenToClearButton: listenToClearButton,
            attachActions:       attachActions,
            describeCell:        describeCell,
            getCellCoordinates:  getCellCoordinates
        };

        return new BoardRenderer();
    }
);