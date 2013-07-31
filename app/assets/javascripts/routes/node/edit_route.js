var NodeEditRoute = Ember.Route.extend({

  controllerName: 'node',

  events: {
    modal_close: function(){
      this.controller.set('state', 'cancel');
      this.unrender();
    },

    modal_save: function(){
      this.controller.set('state', 'save');
      this.unrender();
    }
  },

  renderTemplate: function(controller, model){
    this.render({ controller: controller, into: 'application', outlet: 'modal' });
  },

  unrender: function(){
    this.transitionTo('map', this.controllerFor('map').get('content'));
  }

});

module.exports = NodeEditRoute;