var Toolbar = require('../models/toolbar');
var Node = require('../models/node');
var ApplicationRoute = Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render("toolbar", { outlet: "toolbar", into: "application" });
  },

  setupController: function(controller, model){
    this.controllerFor('node').set('content', Node.createRecord()); //find('current'));
    this.controllerFor('toolbar').set('content', Toolbar.find('current'));
  }

});

module.exports = ApplicationRoute;

