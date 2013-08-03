var CmatSettings = require('./cmat_settings');

var Cmat = {

  boot: function(map, toolbar, node, relationship){

    // A bit of a hack but we create a global cmat settings object so that we can get to these values down inside the cmat app.
    CmatSettings.map = map;
    CmatSettings.toolbar = toolbar;
    CmatSettings.node = node;
    CmatSettings.relationship = relationship;

    toolbar.addObserver('showRelationships', this, 'toggleShowRelationships');
    toolbar.addObserver('showRelationshipLabels', this, 'toggleShowRelationshipLabels');
    toolbar.addObserver('showNodeLabels', this, 'toggleShowNodeLabels');
    toolbar.addObserver('showNodeDescriptions', this, 'toggleShowNodeDescriptions');
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

  toggleShowRelationships: function() {
    UI.cmat_app.toggleRelationships(CmatSettings.toolbar.get('showRelationships'));
  },

  toggleShowNodeDescriptions: function() {
    console.log('relationship labels toggled to '+ CmatSettings.toolbar.get('showRelationshipLabels'));
  },

  toggleShowNodeLabels: function() {
    console.log('node labels toggled to '+ CmatSettings.toolbar.get('showNodeLabels'));
  },

  toggleShowRelationshipLabels: function() {
    console.log('node descriptions toggled to '+ CmatSettings.toolbar.get('showNodeDescriptions'));
  },

  modeChange: function(toolbar){
    console.log('editing:' + toolbar.get('isEditing'));
  }

};

module.exports = Cmat;