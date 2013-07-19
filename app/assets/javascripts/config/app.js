// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data'); // delete if you don't want ember-data

var App = Ember.Application.create();
App.Store = require('./store'); // delete if you don't want ember-data

App.Flash = require('../components/flash/flash');
App.FlashView = require('../views/flash_view');

module.exports = App;
