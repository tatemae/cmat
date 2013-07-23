var MapView = Ember.View.extend({
  tagName: 'div',
  templateName: 'map_view',

  didInsertElement: function(){
  }

});

Ember.Handlebars.helper('map', MapView);

module.exports = MapView;
