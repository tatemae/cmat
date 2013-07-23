// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data
require('../vendor/bootstrap');
require('../vendor/bootstrap-switch');

window.Kinetic = require('../vendor/kinetic-v4.5.4');
require('../classes/conf/conf');
require('../classes/common/jslang/Array');
require('../classes/common/util/Utils');
require('../classes/common/evt/Event');
require('../classes/common/resource/loader/AbstractLoader');
require('../classes/common/resource/loader/ImageLoader');
require('../classes/common/resource/loader/AudioLoader');
require('../classes/common/util/DPI');
require('../classes/common/math/Random');
require('../classes/common/math/geom/Line');
require('../classes/common/math/geom/Point');
require('../classes/app/ui/object/util/ProportionalImage');
require('../classes/app/ui/object/widget/ProgressBar');
require('../classes/app/ui/anim/ExtraEasings');
require('../classes/app/ui/anim/StepAnimation');
require('../classes/app/ui/anim/LayoutManager');
require('../classes/app/ui/layer/Loading');
require('../classes/app/ui/UI');
require('../classes/app/logic/Controller');
require('../classes/app/logic/InitController');
require('../classes/cmat');

var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_VIEW_LOOKUPS: true
});

App.Store = require('./store'); // delete if you don't want ember-data
App.Flash = require('../components/flash-messages');

module.exports = App;
