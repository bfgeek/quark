goog.provide('qu.constraints');

goog.require('goog.asserts');


/** Abstract class for different possible constraints. */
qu.constraints.Constraint = goog.defineClass(null, {
  constructor: function() {}
});


/** Constrain a line to be horizontal. */
qu.constraints.Horzizontal = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be vertical. */
qu.constraints.Vertical = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be co-linear with another line. */
qu.constraints.CoLinear = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be perpendicular with another line. */
qu.constraints.Perpendicular = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be parallel with another line. */
qu.constraints.Parrallel = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be equal in size with another line. */
qu.constraints.Equal = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a point to be fixed in space. */
qu.constraints.Fix = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});


/** Constrain a line to be a specified size. */
qu.constraints.Dim = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});

//qu.constraints.Length = goog.defineClass(qu.constraints.Constraint, {
//constructor: function() {}
//});


/** Constrain two lines to be a specified angle apart. */
qu.constraints.Angle = goog.defineClass(qu.constraints.Constraint, {
  constructor: function() {}
});
