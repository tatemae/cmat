var CmatLoader = {

  boot: function(map, toolbar, node, relationship){

    // A bit of a hack but we create a global cmat settings object so that we can get to these values down inside the cmat app.
    CmatSettings.map = map;
    CmatSettings.toolbar = toolbar;
    CmatSettings.node = node;
    CmatSettings.relationship = relationship;

    toolbar.addObserver('showRelationships', this, 'toggleShowRelationships');
    toolbar.addObserver('showRelationshipLabels', this, 'toggleShowRelationshipLabels');
    toolbar.addObserver('showNodeLabels', this, 'toggleShowNodeLabels');
    toolbar.addObserver('hideNodeLabelsWhileDragging', this, 'toggleHideNodeLabelsWhileDragging');
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
      callback: UI.initUI
    });

    Event.allFired({
      events: [ loaders.image.loaded ],
      callback: Controller.initAll
    });
  },

  toggleShowRelationships: function(toolbar) {
    UI.cmat_app.toggleRelationships(toolbar.get('showRelationships'));
  },

  toggleShowNodeDescriptions: function(toolbar) {
    console.log('relationship labels toggled to '+ toolbar.get('showRelationshipLabels'));
  },

  toggleShowNodeLabels: function(toolbar) {
    UI.cmat_app.toggleNodeLabels(toolbar.get('showNodeLabels'));
  },

  toggleHideNodeLabelsWhileDragging: function(toolbar) {
    UI.cmat_app.toggleNodeLabelsWhileDragging(toolbar.get('hideNodeLabelsWhileDragging'));
  },

  toggleShowRelationshipLabels: function(toolbar) {
    console.log('node descriptions toggled to '+ toolbar.get('showNodeDescriptions'));
  },

  modeChange: function(toolbar){
    UI.cmat_app.toggleEditing(toolbar.get('isEditing'));
  }

};
