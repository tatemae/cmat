UI = (function() {
  var PADDING = 0.016;
  var MAX_RATIO = 15 / 9;
  var MIN_ZOOM_OUT = 0.1;
  var MAX_ZOOM_IN = 2.0;

  var dims;

  var stage;
  var canvas;
  var panZoomBackground;
  var scale = 1;
  var zoomFactor = 1.1;
  var origin = { x: 0, y: 0 };
  var loading;
  var fading;

  var screenWidth, screenHeight;

  var layer = {};
  var publicAPI = {};

  var container;
  var toolbar_height;

  function initUI() {

    params = {
      container: Config.settings.canvas_element,
      toolbar: Config.settings.toolbar_element
    }

    container = params.container;
    toolbar_height = $('#'+params.toolbar).innerHeight();

    if (stage)
      return;

    initStage(params);

    showLoading();
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

      e.preventDefault();
      var evt = e.originalEvent;
      var mx = evt.clientX /* - canvas.offsetLeft */;
      var my = evt.clientY /* - canvas.offsetTop */;
      var wheel = evt.wheelDelta / 120;
      var zoom = (zoomFactor - (evt.wheelDelta < 0 ? 0.2 : 0));
      var newscale = scale * zoom;
      if (newscale > MIN_ZOOM_OUT && newscale < MAX_ZOOM_IN) {
        origin.x = mx / scale + origin.x - mx / newscale;
        origin.y = my / scale + origin.y - my / newscale;

        canvas.getStage().setOffset(origin.x, origin.y);
        canvas.getStage().setScale(newscale);
        canvas.getStage().draw();

        scale *= zoom;
      }

    }

    $(UI.getStage().content).on('mousewheel', zoom);

    stage.add(canvas);
  }

  function resetStage() {
    var stage = canvas.getStage();
    stage.setOffset(-1000,-10000);
    stage.setScale(1);
    stage.draw();
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

    $$$.copy(publicAPI, layer);
  }

  function buildLayoutManager() {

    publicAPI.layoutManager = new Kinetic.LayoutManager({
      wholeNodes: layer.cmat_app.wholeNodes.getChildren(),
      connections: layer.cmat_app.connections.getChildren(),
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

  function findIntersection(xy) {
    var node_over;
    this.cmat_app.wholeNodes.children.forEach(function(wholeNode){
      var x = wholeNode.getX();
      var y = wholeNode.getY();
      var width = wholeNode.node.getWidth();
      var height = wholeNode.node.getHeight();
      if (xy.x > x - width / 2 && xy.x < x + width / 2 && xy.y > y - height / 2 && xy.y < y + height / 2) {
        node_over = wholeNode;
      }
    });
    return node_over;
  }

  function showLoading() {
    fade();
    canvas.add(loading = new Kinetic.Loading($$$.clone(dims))).draw();
  }

  function fade() {
    canvas.add(fading = new Kinetic.Fading($$$.copy($$$.clone(dims), { name: 'Fading' } )));
    fading.fastFadeOut();
  }

  function hideLoading() {
    fade();
    if (loading) {
      loading.destroy();
      loading = null;
    }
  }

  publicAPI.build = build;
  publicAPI.initUI = initUI;
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
  publicAPI.findIntersection = findIntersection;
  publicAPI.showLoading = showLoading;
  publicAPI.hideLoading = hideLoading;
  publicAPI.resetStage = resetStage;

  return publicAPI;
})();
