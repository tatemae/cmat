var ApplicationRoute = Ember.Route.extend({
  events: {
    addToMap: function(){
      this.transitionTo('map.add');
    }
  }

});

module.exports = ApplicationRoute;

