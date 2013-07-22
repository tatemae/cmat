// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data
require('../vendor/bootstrap');
require('../vendor/bootstrap-switch');

var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_VIEW_LOOKUPS: true
});

App.Store = require('./store'); // delete if you don't want ember-data

App.Flash = require('../components/flash/flash');
module.exports = App;
