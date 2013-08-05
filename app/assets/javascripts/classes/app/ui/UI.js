UI = (function() {
  var PADDING = 0.016;
  var MAX_RATIO = 15 / 9;

  var dims;

  var stage;
  var canvas;
  var panZoomBackground;
  var scale = 1;
  var loading;

  var screenWidth, screenHeight;

  var layer = {};
  var publicAPI = {};

  var container;
  var toolbar_height;

  function showLoading() {
    params = {
      container: Config.settings.canvas_element,
      toolbar: Config.settings.toolbar_element
    }

    container = params.container;
    toolbar_height = $('#'+params.toolbar).innerHeight();

    if (stage)
      return;

    initStage(params);

    canvas.add(loading = new Kinetic.Loading($$$.clone(dims))).draw();
  }

  function trackLoading(p) {
    if (!loading)
      return;

    loading.setPercent(p);
  }

  function build() {
    params = {
      container: Config.settings.canvas_element,
      toolbar: Config.settings.toolbar_element
    }

    container = params.container;
    toolbar_height = $('#'+params.toolbar).innerHeight();

    if (stage) {
      canvas.getChildren().forEach(function(c) {
        c.destroy();
      });
      stage.getChildren().forEach(function(c) {
        c.destroy();
      });
      stage.destroy();
      loading = null;
    }

    initStage(params);

    buildGroupLayers();
    buildLayoutManager();
  }

  function initStage() {
    setScreenDimensions();
    buildStage();
    calcGameDimensions();
  }

  function setScreenDimensions() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
  }

  function buildStage() {
    stage = new Kinetic.Stage({
      container: container,
      width: screenWidth,
      height: screenHeight - toolbar_height
    });

    canvas = new Kinetic.Layer();
    canvas.setDraggable("draggable");
    //a large transparent background to make everything draggable
    panZoomBackground = new Kinetic.Rect({
      x: -10000,
      y: -10000,
      width: 20000,
      height: 20000,
      fill: "#000000",
      opacity: 0
    });

    canvas.add(panZoomBackground);


    var zoom = function(e) {
      var zoomAmount = e.wheelDeltaY*0.001;
      scale = canvas.getScale().x+zoomAmount;
      canvas.setScale(scale)
      canvas.draw();
    }

    document.addEventListener("mousewheel", zoom, false)

    stage.add(canvas);
  }

  function calcGameDimensions() {
    dims = {
      width: stage.getWidth(),
      height: stage.getHeight(),
      padding: Math.ceil(stage.getWidth() * PADDING)
    };

    dims.unit = dims.padding * MAX_RATIO / Math.max(dims.width / dims.height, MAX_RATIO);
  }

  function buildGroupLayers() {
    canvas.add(layer.bg = new Kinetic.Background($$$.copy($$$.clone(dims), { name: 'Background'} )));
    canvas.add(layer.cmat_app = new Kinetic.CmatApp($$$.copy($$$.clone(dims), { name: 'CmatApp'} )));
    // canvas.add(layer.inactiveDisp = new Kinetic.InactiveDisplay($$$.clone(dims)));
    // canvas.add(layer.menu = new Kinetic.Menu($$$.clone(dims)));
    // canvas.add(layer.gameOver = new Kinetic.GameOver($$$.clone(dims)));
    
    // if (DAO.isIntroNeeded()) {
    //   canvas.add(layer.intro = new Kinetic.Intro($$$.clone(dims)));
    // }
    
    // canvas.add(layer.message = new Kinetic.Message($$$.clone(dims)));
    // canvas.add(layer.quit = new Kinetic.Quit($$$.clone(dims)));
    canvas.add(layer.fading = new Kinetic.Fading($$$.copy($$$.clone(dims), { name: 'Fading' } )));

    $$$.copy(publicAPI, layer);
  }

  function buildLayoutManager() {
    // var turns = layer.game.hud.turns;
    // var pause = layer.game.hud.pause;

    publicAPI.layoutManager = new Kinetic.LayoutManager({
      wholeNodes: layer.cmat_app.wholeNodes.getChildren(),
      connections: layer.cmat_app.connections.getChildren(),
      // clearCorners: {
      //   tl: {
      //     width: turns.getSizeWidth(),
      //     height: turns.getHeight()
      //   },
      //   tr: {
      //     width: pause.getWidth(),
      //     height: pause.getHeight()
      //   }
      // },
      redrawNode: canvas,
      bounds: $$$.clone(dims)
    });
  }

  function getPos(e) {
    var xy = {};
    xy = stage.getTouchPosition() || stage.getMousePosition();
    return xy;
  }

  function getStage() {
    return stage;
  }

  function layerWidth() {
    return panZoomBackground.getWidth();
  }

  function layerHeight() {
    return panZoomBackground.getHeight();
  }

  function layerX() {
    return panZoomBackground.getX();
  }

  function layerY() {
    return panZoomBackground.getY();
  }

  function canvasScale() {
    return scale;
  }

  function offsetX() {
    return canvas.getX() * -1;
  }

  function offsetY() {
    return canvas.getY() * -1;
  }

  publicAPI.build = build;
  publicAPI.showLoading = showLoading;
  publicAPI.trackLoading = trackLoading;
  publicAPI.getPos = getPos;
  publicAPI.getStage = getStage;
  publicAPI.layerWidth = layerWidth;
  publicAPI.layerHeight = layerHeight;
  publicAPI.layerX = layerX;
  publicAPI.layerY = layerY;
  publicAPI.canvasScale = canvasScale;
  publicAPI.offsetX = offsetX;
  publicAPI.offsetY = offsetY;

  return publicAPI;
})();