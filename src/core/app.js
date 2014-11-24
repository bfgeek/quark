goog.provide('qu');

goog.require('qu.control');
goog.require('qu.model');
goog.require('qu.render');
goog.require('qu.vm');


/** The quark sketching app! */
qu.App = goog.defineClass(null, {
  constructor: function() {
    var model = new qu.model.Sketch();
    var viewmodel = new qu.vm.Sketch(model);
    var view = new qu.render.Sketch(viewmodel);
    goog.global['model'] = model;
    goog.global['viewmodel'] = viewmodel;

    var line = new qu.model.Line();
    line.start.x = 100;
    line.start.y = 50;
    line.end.x = 100;
    line.end.y = 250;
    //line.construction = true;

    // HACK HACK HACK
    var p1 = new qu.model.Point();
    p1.x = 50;
    p1.y = 50;
    var p2 = new qu.model.Point();
    p2.x = 50;
    p2.y = 250;
    model.shapes.push(p1);
    model.shapes.push(p2);
    model.shapes.push(line);

    goog.global['view'] = view;

    var controller = new qu.control.MouseController(model, viewmodel, view);

    goog.global['controller'] = controller;

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
