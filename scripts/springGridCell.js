/**
 * This module defines a constructor for SpringGridCell objects.
 * @module springGridCell
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
   * @function SpringGridCell.initStaticFields
   */
  function initStaticFields() {
    params = app.params;
    util = app.util;
    log = new app.Log('springGridCell');
    log.d('initStaticFields', 'Module initialized');
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   */
  function SpringGridCell() {
    var cell = this;
  }

  // Expose this module
  if (!window.app) window.app = {};
  window.app.SpringGridCell = SpringGridCell;
  SpringGridCell.initStaticFields = initStaticFields;

  console.log('springGridCell module loaded');
})();
