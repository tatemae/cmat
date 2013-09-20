Cmat.NodeEditRoute = Ember.Route.extend(Cmat.NodeRouteHelper, {

  actions: {

    modal_save: function(){
      this.controller.set('state', 'save');
      this.unroute();
    },

    destroy_node: function(){
      this.controller.set('state', 'destroy');
      this.unroute();
    }
  }

});
