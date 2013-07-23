var Cmat = require('../classes/cmat');
var MapView = Ember.View.extend({
  tagName: 'div',
  templateName: 'map_view',

  didInsertElement: function(){
    Cmat.boot(this.get('controller').get('model'));
  }

});

Ember.Handlebars.helper('map', MapView);

module.exports = MapView;
