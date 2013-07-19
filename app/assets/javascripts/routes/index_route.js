var IndexRoute = Ember.Route.extend({
  beforeModel: function(){
    this.transitionTo('maps');
  }
});

module.exports = IndexRoute;