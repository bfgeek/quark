goog.provide('qu.render.util');


/** @private {string} */
qu.render.util.SVG_NS_ = 'http://www.w3.org/2000/svg';


/**
 * Creates an SVG element.
 * @param {string} name The type of SVG element (tag name).
 * @param {!Object<(string|number|boolean)>} attrs The set of attributes to set
 *     of the element.
 * @return {!Element}
 */
qu.render.util.createSvgEl = function(name, attrs) {
  var el = document.createElementNS(qu.render.util.SVG_NS_, name);

  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }

  return el;
};
