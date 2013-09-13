Cmat.NodeNewRoute = Ember.Route.extend({

  controllerName: 'node',

  events: {
    modal_close: function(){
      this.controller.set('state', 'cancel');
      this.unroute();
    },

    modal_save: function(){
      this.controller.set('state', 'add');
      this.unroute();
    }
  },

  renderTemplate: function(controller, model){
    this.render({ controller: controller, into: 'application', outlet: 'modal' }); // You have to pass the controller to render or it will generate a new controller
  },

  unroute: function(){
    this.transitionTo('map', this.controllerFor('map').get('content'));
  }

});
