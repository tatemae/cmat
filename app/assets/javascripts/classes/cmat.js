var Cmat = {

  boot: function(map){

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
      events: [ Event.pageLoaded, loaders.splash.loaded ],
      callback: UI.showLoading({
        container: Config.settings.canvas_element,
        toolbar: Config.settings.toolbar_element
      })
    });

    Event.allFired({
      events: [ Event.pageLoaded ],
      callback: Controller.initAll
    });
  }

};

module.exports = Cmat;