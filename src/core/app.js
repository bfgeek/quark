goog.provide('qu');

goog.require('qu.model');
goog.require('qu.render');
goog.require('qu.vm');


/** The quark sketching app! */
qu.App = goog.defineClass(null, {
  constructor: function() {
    var model = new qu.model.Sketch();
    var viewmodel = new qu.vm.Sketch(model);
    var view = new qu.render.Sketch(viewmodel);
    //var controller = new qu.controller.Controller(view, viewmodel, model);
    goog.global['model'] = model;
    goog.global['viewmodel'] = viewmodel;

    // HACK HACK HACK
    var p1 = new qu.model.Point();
    p1.x = 50;
    p1.y = 50;
    var p2 = new qu.model.Point();
    p2.x = 50;
    p2.y = 250;
    model.shapes.push(p1);
    model.shapes.push(p2);

    goog.global['view'] = view;

    document.body.appendChild(view.getElement());
  }
});


/**
 * Creates the application.
 * @export
 */
qu.createApp = function() {
  goog.global['app'] = new qu.App();
};
