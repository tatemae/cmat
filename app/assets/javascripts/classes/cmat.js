var Cmat = {

  boot: function(map, toolbar){

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
  }

};

module.exports = Cmat;