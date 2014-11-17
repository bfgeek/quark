goog.provide('qu.render');

goog.require('qu.render.util');


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
        var p = new qu.render.Point(vm.shapes[i]);
        this.appendChild(p);
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
      'r': 2,
      'fill': '#2196F3'
    });
  }
});
