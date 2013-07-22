
Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  <div id=\"message\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.message", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n");
  return buffer;
  }

  hashContexts = {'id': depth0};
  hashTypes = {'id': "STRING"};
  options = {hash:{
    'id': ("flash-view")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.flash),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "flash", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n<div class=\"navbar navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\">\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".navbar-inverse-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </a>\n      <form class=\"navbar-form form-inline pull-left\">\n        <label class=\"control-label\" for=\"title\">Title:</label>\n        <div class=\"input-append\">\n          <input class=\"span2\" id=\"title\" type=\"text\">\n          <div class=\"btn-group\">\n            <button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n              <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n              <li>Hydrodynamics</li>\n              <li>Micro-nano things</li>\n              <li class=\"divider\"></li>\n              <li><i class=\"icon-file\"></i> New</li>\n              <li><i class=\"icon-copy\"></i> Duplicate</li>\n              <li><i class=\"icon-trash\"></i> Delete</li>\n            </ul>\n          </div>\n        </div>\n      </form>\n      <div class=\"nav-collapse collapse navbar-inverse-collapse\">\n\n        <div class=\"btn-group\">\n          <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n            <i class=\"icon-download-alt\"></i>\n            <span class=\"caret\"></span>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li class=\"nav-header\">Import MC3 Collection</li>\n            <li class=\"divider\"></li>\n            <li>\n              <form class=\"form-search form-inline\">\n                <div class=\"input-append search-container\">\n                  <input id=\"map_search\" type=\"text\" class=\"search-query\" placeholder=\"Search Maps\">\n                  <button id=\"map_search_btn\" type=\"submit\" class=\"btn\"><i class=\"icon-search\"></i></button>\n                </div>\n              </form>\n            </li>\n            <li class=\"divider\"></li>\n            <li></li>\n          </ul>\n        </div>\n\n        <div class=\"btn-group\">\n          <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n            <i class=\"icon-th\"></i>\n            <span class=\"caret\"></span>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li class=\"nav-header\">Map Library</li>\n            <li class=\"divider\"></li>\n            <li></li>\n          </ul>\n        </div>\n\n        <div class=\"btn-group\">\n          <a class=\"btn\" href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addToMap", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" title=\"Enter a map as a hierarchy\">\n            <i class=\"icon-list\"></i>\n          </a>\n        </div>\n\n        <div class=\"nav pull-right form-inline\">\n          <div class=\"btn-group\">\n            <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n              <i class=\"icon-eye-open\"></i>\n              <span class=\"caret\"></span>\n            </a>\n            <ul class=\"dropdown-menu\">\n              <li><label><input type=\"checkbox\">Show Relationships</label></li>\n              <li><label><input type=\"checkbox\">Show Relationship Labels</label></li>\n              <li><label><input type=\"checkbox\">Show Node Labels</label></li>\n              <li><label><input type=\"checkbox\">Show Node Descriptions</label></li>\n            </ul>\n          </div>\n          <div class=\"switch btn-group\">\n            <input type=\"checkbox\" />\n          </div>\n          <a href=\"#\" class=\"btn\">Kate</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n<div class=\"container\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  return buffer;
  
});

Ember.TEMPLATES['map'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<canvas>Map goes here</canvas>\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES['maps'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  
});

Ember.TEMPLATES['modal_layout'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal-backdrop fade\">&nbsp;</div>\n<div class=\"modal fade\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  <div class=\"modal-footer\">\n    <a href=\"#\" class=\"btn\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Close</a>\n    <a href=\"#\" class=\"btn btn-primary\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</a>\n  </div>\n<div>");
  return buffer;
  
});

Ember.TEMPLATES['nothing'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES['map/add'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">&times;</button>\n    <h3>Paste or Type a List of Concepts</h3>\n    <p>(Enter + tab to create heirarchy and enter for a flat design)</p>\n  </div>\n  <div class=\"modal-body\">\n    <textarea class=\"map_adder\"></textarea>\n  </div>\n");
  return buffer;
  }

  hashContexts = {'id': depth0};
  hashTypes = {'id': "STRING"};
  options = {hash:{
    'id': ("add_map")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.modal),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "modal", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES['map/index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});


