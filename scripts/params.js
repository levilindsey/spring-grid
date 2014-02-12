/**
 * This module defines a collection of parameters used throughout this app.
 * @module params
 */
(function () {
  var params, moduleParams;

  params = {};

  // --- General app parameters --- //

  moduleParams = {};
  params.APP = moduleParams;

  moduleParams.TITLE = 'Spring Grid';
  moduleParams.VERSION = '??.??.??';
  moduleParams.LICENSE =
      'The MIT License (MIT). Copyright (c) 2014 Levi Lindsey <levi@jackieandlevi.com>.';

  // --- Log parameters --- //

  moduleParams = {};
  params.LOG = moduleParams;

  moduleParams.RECENT_ENTRIES_LIMIT = 80;
  moduleParams.DEBUG = true;
  moduleParams.VERBOSE = true;

  // --- Expose this module --- //

  if (!window.app) window.app = {};
  window.app.params = params;

  console.log('params module loaded');
})();
