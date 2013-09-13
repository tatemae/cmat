Cmat.IndexRoute = Ember.Route.extend({
  beforeModel: function(){
    this.transitionTo('maps');
  }
});
