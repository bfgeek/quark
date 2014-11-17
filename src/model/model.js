goog.provide('qu.model');

goog.require('qu.constraints');


/** Top level model of a sketch. */
qu.model.Sketch = goog.defineClass(null, {
  /** @constructor */
  constructor: function() {
    /** @type {!Array.<!qu.model.Shape>} */
    this.shapes = [];

    /** @type {!Array.<!qu.constraints.Constraint>} */
    this.constraints = [];
  }
});


/** Abstract class for different shapes which can be drawn. */
qu.model.Shape = goog.defineClass(null, {
  constructor: function() {}
});


/** A line in the sketch. */
qu.model.Line = goog.defineClass(qu.model.Shape, {
  constructor: function() {
    /** @type {!qu.model.Point} */
    this.start = new qu.model.Point();

    /** @type {!qu.model.Point} */
    this.end = new qu.model.Point();
  }
});


/** A user defined point in the sketch. */
qu.model.Point = goog.defineClass(null, {
  constructor: function() {
    /** @type {number} */
    this.x = 0;

    /** @type {number} */
    this.y = 0;
  }
});
