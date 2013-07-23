var MapModel = require('../../models/map');
var MapsAddRoute = Ember.Route.extend({

  events: {
    modal_close: function(){
      this.unrender();
    },

    modal_save: function(){
      var content = this.get('controller').get('content');
      // TODO do stuff with content
      this.unrender();
    }
  },

  renderTemplate: function(){
    this.render('map.add', { into: 'application', outlet: 'modal' });
  },

  unrender: function(){
    this.transitionTo('map', this.modelFor('map'));
  }

});

module.exports = MapsAddRoute;