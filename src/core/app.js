goog.provide('qu');

goog.require('qu.model');


/** The quark sketching app! */
qu.App = goog.defineClass(null, {
  constructor: function() {
    var model = new qu.model.Sketch();
    //var viewmodel = new qu.vm.Sketch(model);
    //var view = new qu.render.View(viewmodel);
    //var controller = new qu.controller.Controller(view, viewmodel, model);
    goog.global['model'] = model;
  }
});


/**
 * Creates the application.
 * @export
 */
qu.createApp = function() {
  goog.global['app'] = new qu.App();
};
