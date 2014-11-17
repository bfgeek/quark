goog.provide('qu.util');


/**
 * Links two arrays uni-directionally.
 * @param {!Array<F>} from
 * @param {!Array<T>} to
 * @param {function(F): T} func
 * @template F,T
 */
qu.util.linkArr = function(from, to, func) {
  Array['observe'](from, function(records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var idx = record['index'];
      var removedCount = record['removed'].length;
      var addedCount = record['addedCount'];

      var args = from.slice(idx, idx + addedCount).map(func);
      args.unshift(removedCount);
      args.unshift(idx);
      Array.prototype.splice.apply(to, args);
    }
  });

  // Initial data, (don't overwrite 'to' array).
  for (var i = 0; i < from.length; i++) {
    to[i] = func(from[i]);
  }
};


/**
 * Links a property uni-directionally.
 * @param {!Object} from
 * @param {!Object} to
 * @param {string} prop
 */
qu.util.linkProp = function(from, to, prop) {
  // Links can exist between objects, make uid from both.
  var uid = goog.getUid(from) + '-' + goog.getUid(to);

  // Check if we've registered an observer yet.
  if (!qu.util.linkedObjs_[uid]) {
    var props = [];
    qu.util.observeLinkedObj_(from, to, props);
    qu.util.linkedObjs_[uid] = props;
  }

  // Add prop to list that need to be linked.
  qu.util.linkedObjs_[uid].push(prop);

  // Initial data.
  to[prop] = from[prop];
};


/**
 * @param {!Object} from
 * @param {!Object} to
 * @param {!Array<string>} props
 * @private
 */
qu.util.observeLinkedObj_ = function(from, to, props) {
  Object['observe'](from, function(records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var prop = record['name'];

      // Only care about updates.
      if (record['type'] != 'update') continue;

      // Only care about props which have been registered.
      if (props.indexOf(prop) < 0) continue;

      // Perform update.
      to[prop] = from[prop];
    }
  });
};


/**
 * Map of linked properties between objects.
 * @private {!Object<!Array<string>>}
 */
qu.util.linkedObjs_ = {};


/**
 * @param {!Object} obj
 * @param {string} key
 * @param {function(?)} func
 */
qu.util.observe = function(obj, key, func) {
  var uid = goog.getUid(obj) + '';

  // Check if we've registered an observer yet.
  if (!qu.util.observedObjs_[uid]) {
    var props = {};
    qu.util.observeObj_(obj, props);
    qu.util.observedObjs_[uid] = props;
  }

  // Check if we already have callbacks for this key.
  if (!qu.util.observedObjs_[uid][key]) {
    qu.util.observedObjs_[uid][key] = [];
  }

  // Add function to callbacks.
  qu.util.observedObjs_[uid][key].push(func);

  // Initial data.
  func(obj[key]);
};


/**
 * @param {!Object} obj
 * @param {!Object<!Array<function(?)>>} props
 * @private
 */
qu.util.observeObj_ = function(obj, props) {
  Object['observe'](obj, function(records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var prop = record['name'];

      // Only care about updates.
      if (record['type'] != 'update') continue;

      // Only care about props which have been registered.
      if (!props[prop]) continue;

      var fns = props[prop];
      for (var j = 0; j < fns.length; j++) {
        fns[i](obj[prop]);
      }
    }
  });
};


/**
 * Map of observed objects to property function callbacks.
 * @private {!Object<!Object<!Array<function(?)>>>}
 */
qu.util.observedObjs_ = {};
