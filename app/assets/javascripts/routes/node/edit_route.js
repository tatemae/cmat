var NodeEditRoute = Ember.Route.extend({

  events: {
    modal_close: function(){
      this.controllerFor('node').get('content').set('state', 'cancel');
      this.unrender();
    },

    modal_save: function(){
      this.controllerFor('node').get('content').set('state', 'save');
      this.unrender();
    }
  },

  setupController: function(controller, model) {
    this.set('controller', this.controllerFor('node'));
  },

  renderTemplate: function(){
    this.render('node.edit', { into: 'application', outlet: 'modal' });
  },

  unrender: function(){
    this.transitionTo('map', this.controllerFor('map').get('content'));
  }

});

module.exports = NodeEditRoute;