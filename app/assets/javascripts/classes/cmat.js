(function() {
  Event.allFired({
    events: [ Event.pageLoaded ],
    callback: Controller.initAll
  });
})();