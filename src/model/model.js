goog.provide('qu.model');

goog.require('qu.constraints');


/** @private {number} */
qu.model.refGen_ = 0;


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
  constructor: function() {
    /** @expose @type {string} */
    this.ref = 'ref_' + qu.model.refGen_++;
  }
});


/** A user defined point in the sketch. */
qu.model.Point = goog.defineClass(qu.model.Shape, {
  constructor: function() {
    qu.model.Point.base(this, 'constructor');

    /** @expose @type {number} */
    this.x = 0;

    /** @expose @type {number} */
    this.y = 0;
  }
});


/** A line in the sketch. */
qu.model.Line = goog.defineClass(qu.model.Shape, {
  constructor: function() {
    qu.model.Line.base(this, 'constructor');

    /** @expose @type {!qu.model.Point} */
    this.start = new qu.model.Point();

    /** @expose @type {!qu.model.Point} */
    this.end = new qu.model.Point();
  }
});
