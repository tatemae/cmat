Cmat.ApplicationRoute = Ember.Route.extend({

  actions: {
    error: function(error, transition) {
      console.log('**** Error:' + error.message);
    }
  },

  renderTemplate: function() {
    this.render();
    this.render("toolbar", { outlet: "toolbar", into: "application" });
  },

  setupController: function(controller, model){
    this.controllerFor('node').set('content', Cmat.Node.createRecord()); //find('current'));
    this.controllerFor('toolbar').set('content', Cmat.Toolbar.find('current'));
  }

});
