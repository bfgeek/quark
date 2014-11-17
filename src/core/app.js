goog.provide('qu');

goog.require('qu.model');

qu.App = goog.defineClass(null, {
  var model = new qu.model.Sketch();
  var viewmodel = new qu.vm.Sketch(model);
  var view = new qu.render.View(viewmodel);
  var controller = new qu.controller.Controller(view, viewmodel, model);
});
