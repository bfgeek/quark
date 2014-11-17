goog.provide('qu.vm');

goog.require('qu.util');


/** Top level sketch view-model. */
qu.vm.Sketch = goog.defineClass(null, {
  /** @param {!qu.model.Sketch} sketch */
  constructor: function(sketch) {
    /** @expose @type {!Array<!qu.vm.Shape>} */
    this.shapes = [];
    qu.util.linkArr(sketch.shapes, this.shapes, function(obj) {
      if (obj instanceof qu.model.Point) {
        return new qu.vm.Point(obj);
      }
      // TODO
    });
  }
});


/**
 * Abstract class for different shapes which can be drawn.
 *
 * Shapes can have three states:
 *  - constrained: the shape is fully constrained (fixed).
 *  - hover: the shape is being hovered over by a pointer.
 *  - selected: the shape has been selected.
 */
qu.vm.Shape = goog.defineClass(null, {
  constructor: function() {
    /** @expose @type {boolean} */
    this.constrained = false;

    /** @expose @type {boolean} */
    this.hover = false;

    /** @expose @type {boolean} */
    this.selected = false;
  }
});


/** A user defined point in the sketch. */
qu.vm.Point = goog.defineClass(qu.vm.Shape, {
  /** @param {!qu.model.Point} model */
  constructor: function(model) {
    /** @expose @type {number} */
    this.x = 0;
    qu.util.linkProp(model, this, 'x');

    /** @expose @type {number} */
    this.y = 0;
    qu.util.linkProp(model, this, 'y');
  }
});
