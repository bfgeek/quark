goog.provide('qu.render');

goog.require('qu.render.util');


/** @private {string} */
qu.render.SELECTED_COLOR_ = '#2196F3';


/** @private {string} */
qu.render.HOVER_COLOR_ = '#FFC107';


/** @private {string} */
qu.render.CONSTRAINED_COLOR_ = '#212121';


/** @private {string} */
qu.render.NORMAL_COLOR_ = '#1565C0';


/** @private {string} */
qu.render.BACKGROUND_COLOR_ = '#E3F2FD';


/** ... */
qu.render.View = goog.defineClass(null, {
  constructor: function() {
    /** @protected {!Element} */
    this.el = this.createDom();
  },

  /** @return {!Element} */
  getElement: function() {
    return this.el;
  },

  /** @protected @return {!Element} */
  createDom: goog.abstractMethod,

  /** @param {!qu.render.View} child */
  appendChild: function(child) {
    this.el.appendChild(child.getElement());
  },

  /**
   * @param {!qu.render.View} child
   * @param {!qu.render.View} other
   */
  insertChildBefore: function(child, other) {
    this.el.insertBefore(child.getElement(), other.getElement());
  },

  /** @param {!qu.render.View} child */
  removeChild: function(child) {
    this.el.removeChild(child.getElement());
  }
});


/** ... */
qu.render.Sketch = goog.defineClass(qu.render.View, {
  /** @param {!qu.vm.Sketch} vm */
  constructor: function(vm) {
    qu.render.Sketch.base(this, 'constructor');

    // HACK HACK HACK
    setTimeout(function() {
      for (var i = 0; i < vm.shapes.length; i++) {
        var shape = vm.shapes[i];
        var view = null;
        if (shape instanceof qu.vm.Point) {
          view = new qu.render.Point(shape);
        } else if (shape instanceof qu.vm.Line) {
          view = new qu.render.Line(shape);
        }

        if (view) {
          this.appendChild(view);
        }
      }
    }.bind(this), 50);

  },

  /** @override */
  createDom: function() {
    return qu.render.util.createSvgEl('svg', {
      'width': 500,
      'height': 500,
      'overflow': 'hidden'
    });
  }
});


/** ... */
qu.render.Point = goog.defineClass(qu.render.View, {
  /** @param {!qu.vm.Point} vm */
  constructor: function(vm) {
    qu.render.Point.base(this, 'constructor');

    this.el.setAttribute('ref', vm.ref);

    qu.util.observe(vm, 'x', function(x) {
      this.el.setAttribute('cx', x);
    }.bind(this));

    qu.util.observe(vm, 'y', function(y) {
      this.el.setAttribute('cy', y);
    }.bind(this));
  },

  /** @override */
  createDom: function() {
    return qu.render.util.createSvgEl('circle', {
      'r': 3,
      'fill': qu.render.NORMAL_COLOR_
    });
  }
});


/** ... */
qu.render.Line = goog.defineClass(qu.render.View, {
  /** @param {!qu.vm.Line} vm */
  constructor: function(vm) {
    qu.render.Line.base(this, 'constructor');

    /** @private {!qu.vm.Line} */
    this.vm_ = vm;

    /** @private {!Element} */
    this.line_;
    this.line_.setAttribute('ref', vm.ref);

    this.appendChild(new qu.render.Point(vm.start));
    this.appendChild(new qu.render.Point(vm.end));

    qu.util.observe(vm.start, 'x', function(x) {
      this.line_.setAttribute('x1', x);
    }.bind(this));

    qu.util.observe(vm.start, 'y', function(x) {
      this.line_.setAttribute('y1', x);
    }.bind(this));

    qu.util.observe(vm.end, 'x', function(x) {
      this.line_.setAttribute('x2', x);
    }.bind(this));

    qu.util.observe(vm.end, 'y', function(x) {
      this.line_.setAttribute('y2', x);
    }.bind(this));

    qu.util.observe(vm, 'construction', function(dashed) {
      // FIXME
      this.line_.setAttribute('stroke-dasharray', dashed ? '15,10,5,10' : '');
    }.bind(this));

    qu.util.observe(vm, 'constrained', function() {
      this.updateColor_();
    }.bind(this));

    qu.util.observe(vm, 'hover', function() {
      this.updateColor_();
    }.bind(this));

    qu.util.observe(vm, 'selected', function() {
      this.updateColor_();
    }.bind(this));
  },

  /** @override */
  createDom: function() {
    this.line_ = qu.render.util.createSvgEl('line', {
      'stroke-width': 2,
      'stroke': '#2196F3'
    });

    var group = qu.render.util.createSvgEl('g');
    group.appendChild(this.line_);
    return group;
  },

  /** @private */
  updateColor_: function() {
    var color;
    if (this.vm_.hover) {
      color = qu.render.HOVER_COLOR_;
    } else if (this.vm_.selected) {
      color = qu.render.SELECTED_COLOR_;
    } else if (this.vm_.constrained) {
      color = qu.render.CONSTRAINED_COLOR_;
    } else {
      color = qu.render.NORMAL_COLOR_;
    }

    this.line_.setAttribute('stroke', color);
  }
});
