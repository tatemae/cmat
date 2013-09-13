Cmat.MapView = Ember.View.extend({
  tagName: 'div',
  templateName: 'map_view',
  map: null,
  toolbar: null,

  didInsertElement: function(){
    var map = this.get('controller');
    if (UI.cmat_app){
      UI.cmat_app.cleanUp();
    }
    Cmat.boot(map, map.toolbar, map.node);
  }

});

Ember.Handlebars.helper('map', Cmat.MapView);
