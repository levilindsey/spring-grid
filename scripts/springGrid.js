/**
 * This module defines a constructor for SpringGrid objects.
 * @module springGrid
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var params, util, log;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

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
    log.d('initStaticFields', 'Module initialized');
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   */
  function SpringGrid() {
    var cell = this;
  }

  // Expose this module
  if (!window.app) window.app = {};
  window.app.SpringGrid = SpringGrid;
  SpringGrid.initStaticFields = initStaticFields;

  console.log('springGrid module loaded');
})();
