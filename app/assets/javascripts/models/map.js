var ModelBase = require('./model_base');

var Map = ModelBase.extend({

});


Map.reopenClass({

  find: function(map_id){
    if(map_id){
      // Find map
    } else {
      // Find all
    }
  }

});

module.exports = Map;
