var BUFFER_DELAY = 1000;

Cmat.AutoSave = Ember.Mixin.create({
  _buffers: Ember.Map.create(),
  bufferedFields: [],
  instaSaveFields: [],

  _allFields: (function() {
    return this.get('bufferedFields').concat(this.get('instaSaveFields'));
  }).property(),

  setUnknownProperty: function(key, value) {
    if (this.get('bufferedFields').contains(key)) {
      this.get('_buffers').set(key, value);
      return this._debouncedSave();
    } else if (this.get('instaSaveFields').contains(key)) {
      this._super(key, value);
      return this._debouncedSave({
        now: true
      });
    } else {
      return this._super(key, value);
    }
  },

  unknownProperty: function(key) {
    if (this.get('_allFields').contains(key) && this._buffers.get(key)) {
      return this._buffers.get(key);
    } else {
      return this._super(key);
    }
  },

  _autoSave: function() {
    var _this = this;
    if (!this.get('content.isSaving')) {
      this.get('_buffers').forEach(function(key, value) {
        return _this.get('content').set(key, value);
      });
      return this.get('content').save();
    } else {
      return this._debouncedSave();
    }
  },

  _debouncedSave: Cmat.Debounce((function() {
    return this._autoSave();
  }), BUFFER_DELAY),

  _saveNowAndClear: (function() {
    if (!this.get('content')) {
      return;
    }
    this._debouncedSave({
      now: true
    });
    return this.set('_buffers', Ember.Map.create());
  }).observesBefore('content')
});
