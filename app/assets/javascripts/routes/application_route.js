var ApplicationRoute = Ember.Route.extend({
  events: {
    addToMap: function(){
      this.transitionTo('map.add');
    }
  },

  renderTemplate: function(){
    this._super();
    $('.switch')['bootstrapSwitch'](); // attach bootstrapswitch
  }

});

module.exports = ApplicationRoute;

