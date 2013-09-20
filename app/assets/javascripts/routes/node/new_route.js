Cmat.NodeNewRoute = Ember.Route.extend(Cmat.NodeRouteHelper, {

  actions: {

    modal_save: function(){
      this.controller.set('state', 'add');
      this.unroute();
    }
  }

});
