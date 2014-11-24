goog.provide('qu.vm');

goog.require('qu.util');


/** Top level sketch view-model. */
qu.vm.Sketch = goog.defineClass(null, {
  /** @param {!qu.model.Sketch} sketch */
  constructor: function(sketch) {
    /** @expose @type {!Array<!qu.vm.Shape>} */
    this.shapes = [];
    qu.util.linkArr(sketch.shapes, this.shapes, function(obj) {
      var shape = null;

      if (obj instanceof qu.model.Point) {
        shape = new qu.vm.Point(obj);
      } else if (obj instanceof qu.model.Line) {
        shape = new qu.vm.Line(obj);
        this.shapesByRef_[obj.start.ref] = shape.start;
        this.shapesByRef_[obj.end.ref] = shape.end;
      }

      goog.asserts.assert(shape);

      this.shapesByRef_[obj.ref] = shape;

      return shape;
    }.bind(this));

    /** @private {!Object<!qu.vm.Shape>} */
    this.shapesByRef_ = {};

    /** @expose @type {!Array<!qu.vm.Shape>} */
    this.selected = [];

    /** @expose @type {qu.vm.Shape} */
    this.hover = null;
  },

  /**
   * Retrieves a shape by reference.
   * @param {string} ref
   * @return {qu.vm.Shape}
   */
  getShapeByRef: function(ref) {
    return this.shapesByRef_[ref] || null;
  }
});


/**
 * Abstract class for different shapes which can be drawn.
 *
 * Shapes can have three states:
 *  - constrained: the shape is fully constrained (fixed).
 *  - hover: the shape is being hovered over by a pointer.
 *  - selected: the shape has been selected.
 *  - construction: the shape is a contruction shape.
 */
qu.vm.Shape = goog.defineClass(null, {
  constructor: function(model) {
    /** @expose @type {string} */
    this.ref = model.ref;

    /** @expose @type {boolean} */
    this.constrained = false;

    /** @expose @type {boolean} */
    this.hover = false;

    /** @expose @type {boolean} */
    this.selected = false;

    /** @expose @type {boolean} */
    this.construction = false;
  }
});


/** A user defined point in the sketch. */
qu.vm.Point = goog.defineClass(qu.vm.Shape, {
  /** @param {!qu.model.Point} model */
  constructor: function(model) {
    qu.vm.Point.base(this, 'constructor', model);

    /** @expose @type {number} */
    this.x = 0;
    qu.util.linkProp(model, this, 'x');

    /** @expose @type {number} */
    this.y = 0;
    qu.util.linkProp(model, this, 'y');
  }
});


/** A line in the sketch. */
qu.vm.Line = goog.defineClass(qu.vm.Shape, {
  /** @param {!qu.model.Line} model */
  constructor: function(model) {
    qu.vm.Line.base(this, 'constructor', model);

    /** @expose @type {!qu.vm.Point} */
    this.start = new qu.vm.Point(model.start);

    /** @expose @type {!qu.vm.Point} */
    this.end = new qu.vm.Point(model.end);
  }
});
