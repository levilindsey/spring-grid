/**
 * This static module drives this app.
 * @module index
 */
(function () {

  var params, util, log, animate, SpringGrid, SpringGridCell, springGrid;

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Initializes this app.
   * @function index~init
   */
  function init() {
    params = app.params;
    util = app.util;
    app.Log.initStaticFields();
    log = new app.Log('index');

    log.d('init');

    util.init();

    util.listen(window, 'load', onDocumentLoad);
  }

  /**
   * Resets all of the state for this app.
   * @function index~reset
   */
  function reset() {
    var body, cellContents;

    animate = app.animate;
    SpringGridCell = app.SpringGridCell;
    SpringGrid = app.SpringGrid;

    animate.init();
    SpringGridCell.initStaticFields();
    SpringGrid.initStaticFields();

    log.i('reset', 'All modules initialized');

    setUpOpenCloseButton();
    setUpGrid();
  }

  /**
   * @function index~setUpOpenCloseButton
   */
  function setUpOpenCloseButton() {
    var body, button;
    body = document.getElementsByTagName('body')[0];
    button = util.createElement('button', body, null, ['openCloseButton']);
    button.innerHTML = "Click Me!";
    util.addTapEventListener(button, onButtonTap, true);
  }

  /**
   * @function index~setUpGrid
   */
  function setUpGrid() {
    var body, cellContents;
    body = document.getElementsByTagName('body')[0];
    cellContents =
        createCellContents(params.GRID.CELL_COUNT, params.GRID.CELL_WIDTH, params.GRID.CELL_HEIGHT);
    springGrid =
        new SpringGrid(body, cellContents, params.GRID.CELL_WIDTH, params.GRID.CELL_HEIGHT,
            params.GRID.CELL_MARGIN);
  }

  /**
   * This is the event handler for the completion of the DOM loading.
   * @function index~onDocumentLoad
   */
  function onDocumentLoad() {
    log.i('onDocumentLoad');

    reset();
  }

  /**
   * Toggles whether the grid is open.
   * @function index~onButtonTap
   */
  function onButtonTap() {
    log.i('onButtonTap', 'springGrid.isOpen=' + springGrid.isOpen);
    if (springGrid.isOpen) {
      springGrid.close();
    } else {
      springGrid.open();
    }
  }

  /**
   * Creates an array of empty divs with the given dimensions and randomly colored backgrounds.
   * @function index~createCellContents
   * @param {Number} cellCount How many divs to create.
   * @param {Number} cellWidth The width of a cell.
   * @param {Number} cellHeight The height of a cell.
   * @returns {Array.<HTMLElement>} The divs to use as the cells' contents.
   */
  function createCellContents(cellCount, cellWidth, cellHeight) {
    var elements, element, colorString, color, h, s, l, a, i;

    elements = [];
    a = params.GRID.CELL_OPACITY;

    for (i = 0; i < cellCount; i++) {
      // Create a random color
      h = util.getRandom(params.GRID.CELL_HUE_MIN, params.GRID.CELL_HUE_MAX);
      s = util.getRandom(params.GRID.CELL_SATURATION_MIN, params.GRID.CELL_SATURATION_MAX);
      l = util.getRandom(params.GRID.CELL_LIGHTNESS_MIN, params.GRID.CELL_LIGHTNESS_MAX);
      color = new animate.HSLAColor(h, s, l, a);
      colorString = animate.hslaColorToString(color);

      // Create and add the element
      element = util.createElement('div', null, null, null);
      element.style.width = cellWidth + 'px';
      element.style.height = cellHeight + 'px';
      element.style.background = colorString;
      elements.push(element);
    }

    return elements;
  }

  // ------------------------------------------------------------------------------------------- //

  if (!window.app) window.app = {};

  console.log('index module loaded');

  init();
})();
