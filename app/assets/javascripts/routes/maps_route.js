var Map = require('../models/map');
AssessmentsRoute = Ember.Route.extend({
  model: function() {
    return Map.find();
  }
});

module.exports = AssessmentsRoute;
