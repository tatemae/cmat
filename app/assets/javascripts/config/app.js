// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');
require('../vendor/localstorage_adapter');
require('../vendor/bootstrap');
require('../vendor/bootstrap-switch');

window.Kinetic = require('../vendor/kinetic-v4.5.4');
require('../vendor/d3/d3');
require('../vendor/d3/d3.layout');
require('../vendor/addon/kineticjs_addon');
require('../classes/conf/conf');
require('../classes/common/jslang/Array');
require('../classes/common/jslang/Object');
require('../classes/common/util/Utils');
require('../classes/common/evt/Event');
require('../classes/common/resource/loader/AbstractLoader');
require('../classes/common/resource/loader/ImageLoader');
require('../classes/common/resource/loader/AudioLoader');
require('../classes/common/util/DPI');
require('../classes/common/math/Random');
require('../classes/common/math/geom/Line');
require('../classes/common/math/geom/Point');
require('../classes/common/math/graph/ForceDirected');
require('../classes/app/ui/object/util/ProportionalImage');
require('../classes/app/ui/object/util/PressCatcher');
require('../classes/app/ui/object/util/MouseOverCatcher');
require('../classes/app/ui/object/widget/ProgressBar');
require('../classes/app/ui/object/node/Connection');
require('../classes/app/ui/object/node/WholeNode');
require('../classes/app/ui/object/node/AppNode');
require('../classes/app/ui/object/node/NodeAdder');
require('../classes/app/ui/object/node/NodeConnector');
require('../classes/app/ui/object/node/Label');
require('../classes/app/ui/anim/ExtraEasings');
require('../classes/app/ui/anim/StepAnimation');
require('../classes/app/ui/anim/LayoutManager');
require('../classes/app/ui/layer/Loading');
require('../classes/app/ui/layer/Fading');
require('../classes/app/ui/layer/Background');
require('../classes/app/ui/layer/CmatApp');
require('../classes/app/ui/UI');
require('../classes/app/logic/Controller');
require('../classes/app/logic/CmatAppController');
require('../classes/app/logic/InitController');
require('../classes/cmat');

var App = Ember.Application.create({
  // LOG_STACKTRACE_ON_DEPRECATION : true,
  // LOG_BINDINGS                  : true,
  // LOG_TRANSITIONS               : true,
  // LOG_TRANSITIONS_INTERNAL      : true,
  // LOG_VIEW_LOOKUPS              : true,
  // LOG_ACTIVE_GENERATION         : true
});

Ember.RSVP.configure('onerror', function(e) {
  console.log(e.message);
  console.log(e.stack);
});

DS.rejectionHandler = function(reason) {
  Ember.Logger.assert([reason, reason.message, reason.stack]);

  throw reason;
};

App.Store = require('./store');

// Intializers
require('./initializers/twitter_bootstrap');
require('./initializers/current_user');

module.exports = App;
