var MapModel = require('../../models/map');
var MapsAddRoute = Ember.Route.extend({

  events: {
    modal_closed: function(){
      this.unrender();
    },

    save: function(){
      alert('actions work like normal!');
      this.unrender();
    }
  },

  renderTemplate: function(){
    this.render('map.add', { into: 'application', outlet: 'modal' });
  },

  unrender: function(){
    this.render('nothing', { into: 'application', outlet: 'modal' });
    this.transitionTo('map', this.modelFor('map'));
  }

});

module.exports = MapsAddRoute;