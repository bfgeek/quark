goog.provide('qu.constraints');

goog.require('goog.asserts');


/** Constrain a line to be horizontal. */
qu.constraints.Horzizontal = goog.defineClass();


/** Constrain a line to be vertical. */
qu.constraints.Vertical = goog.defineClass();


/** Constrain a line to be co-linear with another line. */
qu.constraints.CoLinear = goog.defineClass();


/** Constrain a line to be perpendicular with another line. */
qu.constraints.Perpendicular = goog.defineClass();


/** Constrain a line to be parallel with another line. */
qu.constraints.Parrallel = goog.defineClass();


/** Constrain a line to be equal in size with another line. */
qu.constraints.Equal = goog.defineClass();


/** Constrain a point to be fixed in space. */
qu.constraints.Fix = goog.defineClass();


/** Constrain a line to be a specified size. */
qu.constraints.Dim = goog.defineClass();

//qu.constraints.Length = goog.defineClass();


/** Constrain two lines to be a specified angle apart. */
qu.constraints.Angle = goog.defineClass();
