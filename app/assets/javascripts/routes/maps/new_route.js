Cmat.MapsNewRoute = Ember.Route.extend({

  model: function(){
    return Cmat.MapModel.createRecord({
      title: 'New Map'
    });
  },

  afterModel: function(model, transition){
    model.save().then(function(){
      this.transitionTo('map', model);
    }.bind(this));
  }

});
