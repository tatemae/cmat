var Debounce = function(func, wait) {
  var timeout;
  timeout = null;
  return function() {
    var args, context, immediate, lastArg, later;
    context = this;
    args = arguments;
    lastArg = args[args.length - 1];
    if (lastArg && lastArg.now) {
      immediate = true;
    }
    later = function() {
      timeout = null;
      return func.apply(context, args);
    };
    clearTimeout(timeout);
    if (immediate) {
      return func.apply(context, args);
    } else {
      return timeout = setTimeout(later, wait);
    }
  };
};