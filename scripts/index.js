/**
 * This static module drives the PhotoViewer app.
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
    var body;

    animate = app.animate;
    SpringGrid = app.SpringGrid;
    SpringGridCell = app.SpringGridCell;

    animate.init();
    SpringGrid.initStaticFields();
    SpringGridCell.initStaticFields();

    log.i('reset', 'All modules initialized');

    body = document.getElementsByTagName('body')[0];
    springGrid = new SpringGrid(body);
  }

  /**
   * This is the event handler for the completion of the DOM loading.
   * @function index~onDocumentLoad
   */
  function onDocumentLoad() {
    log.i('onDocumentLoad');

    reset();
  }

  // ------------------------------------------------------------------------------------------- //

  if (!window.app) window.app = {};

  console.log('index module loaded');

  init();
})();
