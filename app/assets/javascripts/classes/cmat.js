var CmatSettings = require('./cmat_settings');

var Cmat = {

  boot: function(map, toolbar, node, relationship){

    // A bit of a hack but we create a global cmat settings object so that we can get to these values down inside the cmat app.
    CmatSettings.map = map;
    CmatSettings.toolbar = toolbar;
    CmatSettings.node = node;
    CmatSettings.relationship = relationship;

    toolbar.addObserver('showRelationships', this, 'propChange');
    toolbar.addObserver('showRelationshipLabels', this, 'propChange');
    toolbar.addObserver('showNodeLabels', this, 'propChange');
    toolbar.addObserver('showNodeDescriptions', this, 'propChange');
    toolbar.addObserver('isEditing', this, 'modeChange');

    ImageLoader.isXDPI(function() {
      var w = window.innerWidth;
      var h = window.innerHeight;

      return w > DPI.H.width && h > DPI.H.height;
    });

    var loaders = {
      splash: new ImageLoader(Config.resources.images.path, Config.resources.images.files.splash),
      image: new ImageLoader(Config.resources.images.path, Config.resources.images.files.common)
    };

    loaders.image.progress(UI.trackLoading);

    Event.allFired({
      events: [ loaders.splash.loaded ],
      callback: UI.showLoading
    });

    Event.allFired({
      events: [ loaders.image.loaded ],
      callback: Controller.initAll
    });
  },

  propChange: function(){
    alert('something changed');
  },

  modeChange: function(toolbar){
    alert('editing:' + toolbar.get('isEditing'));
  }

};

module.exports = Cmat;