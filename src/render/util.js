goog.provide('qu.render.util');


/** @private {string} */
qu.render.util.SVG_NS_ = 'http://www.w3.org/2000/svg';


/**
 * Creates an SVG element.
 * @param {string} name The type of SVG element (tag name).
 * @param {!Object<(string|number|boolean)>=} opt_attrs The set of attributes to
 *     set of the element.
 * @return {!Element}
 */
qu.render.util.createSvgEl = function(name, opt_attrs) {
  var el = document.createElementNS(qu.render.util.SVG_NS_, name);

  if (opt_attrs) {
    for (var key in opt_attrs) {
      el.setAttribute(key, opt_attrs[key]);
    }
  }

  return el;
};
