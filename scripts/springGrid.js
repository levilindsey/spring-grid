/**
 * This module defines a constructor for SpringGrid objects.
 * @module springGrid
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var params, util, log, SpringGridCell;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Creates the DOM element for this grid.
   * @function SpringGrid~createElement
   * @param {HTMLElement} parent The parent element that contains this grid.
   */
  function createElement(parent) {
    var grid, bezierPts;
    grid = this;
    grid.element = util.createElement('div', parent, null, ['grid']);
    util.listenForTransitionEnd(grid.element, function() {
      onOpenCloseEnd.call(grid);
    });

    switch (params.GRID.BOUNCE_TYPE) {
      case 'none':
        bezierPts = { p1x: 0, p1y: 0, p2x: 1, p2y: 1 };
        break;
      case 'uniform_all':
        bezierPts = params.GRID.MAX_BOUNCE_BEZIER_PTS;
        break;
      case 'uniform_rows':
      case 'random_offsets':
        bezierPts = params.GRID.MIN_BOUNCE_BEZIER_PTS;
        break;
      default:
        log.e('createElement', 'Invalid bounce type: ' + params.GRID.BOUNCE_TYPE);
        return;
    }
    util.setTransitionCubicBezierTimingFunction(grid.element, bezierPts);
  }

  /**
   * Creates all of the cell objects contained in this grid.
   * @function SpringGrid~createCells
   * @param {Array.<HTMLElement>} cellContents The child elements for each of the cells.
   */
  function createCells(cellContents) {
    var grid, cell;
    grid = this;
    grid.cells = [];
    cellContents.forEach(function (childElement) {
      cell = new SpringGridCell(grid.element, childElement);
      grid.cells.push(cell);
    });
  }

  /**
   * Calculates the dimensions to use for this grid according to the parent width, the width of a
   * cell, the height of a cell, the margin between cells, and the number of cells.
   * @function SpringGrid~resize
   */
  function resize() {
    var grid, columnCapacity, width;
    grid = this;

    // Determine how many columns could fit in the parent container
    columnCapacity =
        parseInt((grid.parent.clientWidth - grid.cellMargin) / (grid.cellWidth + grid.cellMargin));

    // Determine how many columns and rows of cells to use
    grid.columnCount =
        columnCapacity >= params.GRID.MAX_COLUMN_COUNT ? params.GRID.MAX_COLUMN_COUNT :
            columnCapacity;
    grid.rowCount = parseInt(0.99999 + grid.cells.length / grid.columnCount);

    // Set the grid's width and height
    grid.openHeight = grid.rowCount * grid.cellHeight + (grid.rowCount + 1) * grid.cellMargin;
    width = grid.columnCount * grid.cellWidth + (grid.columnCount + 1) * grid.cellMargin;
    grid.element.style.width = width + 'px';

    updateCellRowsAndColumns.call(grid);
  }

  /**
   * Calculates which row and column each cell belongs to and updates the cells' position and
   * transition parameters accordingly.
   * @function SpringGrid~updateCellRowsAndColumns
   */
  function updateCellRowsAndColumns() {
    var grid, i, count, column, row;
    grid = this;
    for (i = 0, count = grid.cells.length; i < count; i++) {
      column = i % grid.columnCount;
      row = parseInt(i / grid.columnCount);

      updateCellPositions(grid.cells[i], grid, row, column);
      updateCellTransitionParameters(grid.cells[i], grid, row, column);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the given cell's position values according to the given row and column.
   * @function springGrid~updateCellPositions
   */
  function updateCellPositions(cell, grid, row, column) {
    var x, closedY, openY;

    x = column * (grid.cellWidth + grid.cellMargin) + grid.cellMargin;
    openY = row * (grid.cellHeight + grid.cellMargin) + grid.cellMargin;
    closedY = openY - grid.openHeight;

    cell.setPositions(x, closedY, openY);
  }

  /**
   * Updates the given cell's transition parameters according to the given row and column.
   * @function springGrid~updateCellTransitionParameters
   */
  function updateCellTransitionParameters(cell, grid, row, column) {
    var rowBaseDurationRatio, cellDurationRatioOffset, durationRatio, rowBaseDelayRatio, cellDelayRatioOffset, delayRatio, rowBaseP1x, rowBaseP1y, rowBaseP2x, rowBaseP2y, bezierPts, minWeight, maxWeight;

    minWeight = row / (grid.rowCount - 1);
    maxWeight = 1 - minWeight;

    switch (params.GRID.BOUNCE_TYPE) {
      case 'none':
        rowBaseDurationRatio = 1;
        cellDurationRatioOffset = 0;

        rowBaseDelayRatio = 0;
        cellDelayRatioOffset = 0;

        rowBaseP1x = 0;
        rowBaseP1y = 0;
        rowBaseP2x = 1;
        rowBaseP2y = 1;
        break;
      case 'uniform_all':
        rowBaseDurationRatio = 1;
        cellDurationRatioOffset = 0;

        rowBaseDelayRatio = 0;
        cellDelayRatioOffset = 0;

        rowBaseP1x = params.GRID.MAX_BOUNCE_BEZIER_PTS.p1x;
        rowBaseP1y = params.GRID.MAX_BOUNCE_BEZIER_PTS.p1y;
        rowBaseP2x = params.GRID.MAX_BOUNCE_BEZIER_PTS.p2x;
        rowBaseP2y = params.GRID.MAX_BOUNCE_BEZIER_PTS.p2y;
        break;
      case 'uniform_rows':
        rowBaseDurationRatio = util.interpolate(params.GRID.MIN_BOUNCE_DURATION_RATIO, params.GRID.MAX_BOUNCE_DURATION_RATIO, minWeight, maxWeight);
        cellDurationRatioOffset = 0;

        rowBaseDelayRatio = util.interpolate(params.GRID.MIN_BOUNCE_DELAY_RATIO, params.GRID.MAX_BOUNCE_DELAY_RATIO, minWeight, maxWeight);
        cellDelayRatioOffset = 0;

        rowBaseP1x = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p1x, params.GRID.MAX_BOUNCE_BEZIER_PTS.p1x, minWeight, maxWeight);
        rowBaseP1y = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p1y, params.GRID.MAX_BOUNCE_BEZIER_PTS.p1y, minWeight, maxWeight);
        rowBaseP2x = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p2x, params.GRID.MAX_BOUNCE_BEZIER_PTS.p2x, minWeight, maxWeight);
        rowBaseP2y = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p2y, params.GRID.MAX_BOUNCE_BEZIER_PTS.p2y, minWeight, maxWeight);
        break;
      case 'random_offsets':
        rowBaseDurationRatio = util.interpolate(params.GRID.MIN_BOUNCE_DURATION_RATIO, params.GRID.MAX_BOUNCE_DURATION_RATIO, minWeight, maxWeight);
        cellDurationRatioOffset = util.getRandom(params.GRID.MIN_BOUNCE_DURATION_RATIO_OFFSET, params.GRID.MAX_BOUNCE_DURATION_RATIO_OFFSET);

        rowBaseDelayRatio = util.interpolate(params.GRID.MIN_BOUNCE_DELAY_RATIO, params.GRID.MAX_BOUNCE_DELAY_RATIO, minWeight, maxWeight);
        cellDelayRatioOffset = util.getRandom(params.GRID.MIN_BOUNCE_DELAY_RATIO_OFFSET, params.GRID.MAX_BOUNCE_DELAY_RATIO_OFFSET);

        rowBaseP1x = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p1x, params.GRID.MAX_BOUNCE_BEZIER_PTS.p1x, minWeight, maxWeight);
        rowBaseP1y = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p1y, params.GRID.MAX_BOUNCE_BEZIER_PTS.p1y, minWeight, maxWeight);
        rowBaseP2x = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p2x, params.GRID.MAX_BOUNCE_BEZIER_PTS.p2x, minWeight, maxWeight);
        rowBaseP2y = util.interpolate(params.GRID.MIN_BOUNCE_BEZIER_PTS.p2y, params.GRID.MAX_BOUNCE_BEZIER_PTS.p2y, minWeight, maxWeight);
        break;
      default:
        log.e('updateCellTransitionParameters', 'Invalid bounce type: ' + params.GRID.BOUNCE_TYPE);
        return;
    }

    durationRatio = rowBaseDurationRatio + cellDurationRatioOffset;
    delayRatio = rowBaseDelayRatio + cellDelayRatioOffset;
    bezierPts = { p1x: rowBaseP1x, p1y: rowBaseP1y, p2x: rowBaseP2x, p2y: rowBaseP2y };

    cell.setTransitionParameters(durationRatio, delayRatio, bezierPts);
  }

  /**
   * @function SpringGrid~onOpenCloseEnd
   */
  function onOpenCloseEnd() {
    var grid = this;

    grid.isOpening = false;
    grid.isClosing = false;

    if (grid.isOpen) {

    } else {

    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Starts the animation to open this grid.
   * @function SpringGrid#animateToOpen
   */
  function open() {
    var grid = this;
    grid.isOpen = true;
    grid.isOpening = true;
    grid.isClosing = false;
    util.setTransitionDurationSeconds(grid.element, params.GRID.OPEN_CLOSE_DURATION);
    grid.element.style.height = grid.openHeight + 'px';
    grid.cells.forEach(function(cell) {
      cell.animateToOpen(params.GRID.OPEN_CLOSE_DURATION);
    });
  }

  /**
   * Starts the animation to close this grid.
   * @function SpringGrid#animateToClosed
   */
  function close() {
    var grid = this;
    grid.isOpen = false;
    grid.isOpening = false;
    grid.isClosing = true;
    util.setTransitionDurationSeconds(grid.element, params.GRID.OPEN_CLOSE_DURATION);
    grid.element.style.height = '0';
    grid.cells.forEach(function(cell) {
      cell.animateToClosed(params.GRID.OPEN_CLOSE_DURATION);
    });
  }

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * Initializes some static state for this module.
   * @function SpringGrid.initStaticFields
   */
  function initStaticFields() {
    params = app.params;
    util = app.util;
    log = new app.Log('springGrid');
    SpringGridCell = app.SpringGridCell;
    log.d('initStaticFields', 'Module initialized');
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {HTMLElement} parent The parent element that contains this grid.
   * @param {Array.<HTMLElement>} cellContents The child elements for each of the cells.
   * @param {Number} cellWidth The width of the cells.
   * @param {Number} cellHeight The height of the cells.
   * @param {Number} cellMargin The margin between the cells.
   */
  function SpringGrid(parent, cellContents, cellWidth, cellHeight, cellMargin) {
    var grid = this;

    grid.element = null;
    grid.cells = null;
    grid.parent = parent;
    grid.cellWidth = cellWidth;
    grid.cellHeight = cellHeight;
    grid.cellMargin = cellMargin;
    grid.columnCount = Number.NaN;
    grid.rowCount = Number.NaN;
    grid.openHeight = Number.NaN;
    grid.isOpen = false;
    grid.isOpening = false;
    grid.isClosing = false;
    grid.open = open;
    grid.close = close;

    createElement.call(grid, parent);
    createCells.call(grid, cellContents);
    resize.call(grid);
  }

  // Expose this module
  if (!window.app) window.app = {};
  window.app.SpringGrid = SpringGrid;
  SpringGrid.initStaticFields = initStaticFields;

  console.log('springGrid module loaded');
})();
