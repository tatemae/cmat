var Cmat = require('../classes/cmat');
var MapView = Ember.View.extend({
  tagName: 'div',
  templateName: 'map_view',
  map: null,
  toolbar: null,

  didInsertElement: function(){
    Cmat.boot(this.get('controller').get('model'), this.get('controller').toolbar());
  }

});

Ember.Handlebars.helper('map', MapView);

module.exports = MapView;
