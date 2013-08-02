var MapModel = require('../../models/map');

var MapDestroyRoute = Ember.Route.extend({
  enter: function() {
    var map = this.controllerFor('map').get('content');
    map.deleteRecord();
    map.get("transaction").commit();
    MapModel.find({}).then(function(maps){
      var map = maps.objectAt(0);
      if(map){
        this.transitionTo('map', map);
      } else {
        map = MapModel.createRecord({
          title: 'New Map'
        });
        map.save().then(function(){
          this.transitionTo('map', map);
        }.bind(this));
      }
    });
  }
});

module.exports = MapDestroyRoute;