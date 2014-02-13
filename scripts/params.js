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

  // --- Grid parameters --- //

  moduleParams = {};
  params.GRID = moduleParams;

  moduleParams.BOUNCE_TYPE = 'random_offsets'; // ('none'|'uniform_all'|'uniform_rows'|'random_offsets')

  moduleParams.OPEN_CLOSE_DURATION = 2; // seconds

  moduleParams.CELL_COUNT = 104;

  moduleParams.CELL_WIDTH = 80; // pixels
  moduleParams.CELL_HEIGHT = 60; // pixels
  moduleParams.CELL_MARGIN = 10; // pixels

  moduleParams.CELL_HUE_MIN = 0; // from 0 to 360
  moduleParams.CELL_HUE_MAX = 360; // from 0 to 360
  moduleParams.CELL_SATURATION_MIN = 65; // percentage
  moduleParams.CELL_SATURATION_MAX = 95; // percentage
  moduleParams.CELL_LIGHTNESS_MIN = 42; // percentage
  moduleParams.CELL_LIGHTNESS_MAX = 58; // percentage
  moduleParams.CELL_OPACITY = 1; // from 0 to 1

  moduleParams.MAX_COLUMN_COUNT = 8;

  moduleParams.MIN_BOUNCE_BEZIER_PTS = {
    p1x: .5,
    p1y: 0,
    p2x: .75,
    p2y: 1.15
  };
  moduleParams.MAX_BOUNCE_BEZIER_PTS = {
    p1x: 1,
    p1y: 0,
    p2x: .75,
    p2y: 1.85
  };

  moduleParams.MIN_BOUNCE_DURATION_RATIO = 1;
  moduleParams.MAX_BOUNCE_DURATION_RATIO = 0.5;

  moduleParams.MIN_BOUNCE_DELAY_RATIO = 0;
  moduleParams.MAX_BOUNCE_DELAY_RATIO = 0.25;

  moduleParams.MIN_BOUNCE_DURATION_RATIO_OFFSET = -0.02;
  moduleParams.MAX_BOUNCE_DURATION_RATIO_OFFSET = 0.02;

  moduleParams.MIN_BOUNCE_DELAY_RATIO_OFFSET = 0;
  moduleParams.MAX_BOUNCE_DELAY_RATIO_OFFSET = 0.02;

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
