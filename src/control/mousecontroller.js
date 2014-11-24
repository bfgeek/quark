goog.provide('qu.control');


/** ... */
qu.control.MouseController = goog.defineClass(null, {
  constructor: function(model, vm, view) {
    /** @private {!qu.model.Sketch} */
    this.model_ = model;

    /** @private {!qu.vm.Sketch} */
    this.vm_ = vm;

    /** @private {!qu.render.Sketch} */
    this.view_ = view;

    // Hook up ...
    var el = this.view_.getElement();
    el.addEventListener('mousedown', this.onMousedown_.bind(this));
    el.addEventListener('mousemove', this.onMousemove_.bind(this));
    el.addEventListener('mouseup', this.onMouseup_.bind(this));
    el.addEventListener('click', this.onClick_.bind(this));
  },

  /**
   * @param {!Event} evt
   * @private
   */
  onMousedown_: function(evt) {
    window.console.log(evt);
  },

  /**
   * @param {!Event} evt
   * @private
   */
  onMousemove_: function(evt) {
    var element = evt.target;

    var vm = this.vm_.getShapeByRef(element.getAttribute('ref'));
    if (vm) {
      vm.hover = true;
      this.vm_.hover = vm;
    } else {
      this.vm_.hover.hover = false;
      this.vm_.hover = null;

    }


  },

  /**
   * @param {!Event} evt
   * @private
   */
  onMouseup_: function(evt) {
    window.console.log(evt);
  },

  /**
   * @param {!Event} evt
   * @private
   */
  onClick_: function(evt) {

  }
});
