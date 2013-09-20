Cmat.NodeRouteHelper = Ember.Mixin.create({

  controllerName: 'node',

  actions: {
    modal_close: function(){
      this.controller.set('state', 'cancel');
      this.unroute();
    }
  },

  renderTemplate: function(controller, model){
    if(this.controller.get('state') === ''){
      // If we are in an unknown state (ususally because the node isn't really loaded) then we transition
      // to the current map route. This happens when the user attempts to directly access
      // 'maps/<id>/node/edit' or 'maps/<id>/node/new'
      this.unroute();
    } else {
      this.render({ controller: controller, into: 'application', outlet: 'modal' }); // You have to pass the controller to render or it will generate a new controller
    }
  },

  unroute: function(){
    this.transitionTo('map', this.controllerFor('map').get('content'));
  }

});
