goog.provide('qu.model');

qu.model.Sketch = goog.defineClass(null, {
  /** @constructor */
  constructor: function() {
    /** @type {!Array.<!qu.model.Shape>} */
    this.shapes = [];

    /** @type {!Array.<!qu.constraints.Constraint>} */
    this.constraints = [];
  }
});

qu.model.Shape = goog.defineClass(null, {});

qu.model.Line = goog.defineClass(qu.model.Shape, {
  constructor: function() {
    /** @type {!qu.model.Point} */
    this.start = new qu.model.Point();

    /** @type {!qu.model.Point} */
    this.end = new qu.model.Point();
  }
});

qu.model.Point = goog.defineClass(null, {
  constructor: function() {
    /** @type {number} */
    this.x = 0;

    /** @type {number} */
    this.y = 0;
  }
});
