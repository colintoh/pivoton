(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("app", function(exports, require, module) {
// Application bootstrapper

module.exports = Em.Application.create();
});

require.register("helper", function(exports, require, module) {
require('helpers/application');
require('helpers/home');
require('helpers/nextpage');
});

require.register("helpers/application", function(exports, require, module) {
var App = require('app');

App.ApplicationController = Em.Controller.extend({
	title: "Ember-Brunch"
});


App.ApplicationView = Em.View.extend({

});
});

require.register("helpers/home", function(exports, require, module) {
var App = require('app');

App.HomeController = Em.Controller.extend({

});


App.HomeView = Em.View.extend({
	didInsertElement:function(){
		console.log('123');
	}
});
});

require.register("helpers/nextpage", function(exports, require, module) {
var App = require('app');

App.NextpageController = Em.Controller.extend({

});


App.NextpageView = Em.View.extend({

});
});

require.register("initialize", function(exports, require, module) {
window.App = require('app');


require('template');
require('helper');
require('router');

App.initialize();
});

require.register("router", function(exports, require, module) {
var App = require('app');


App.IndexRoute = Em.Route.extend({
    redirect:function(){
        this.transitionTo('home');
    }
});

App.Router.map(function(){
    this.route('index',{path:'/'});
    this.route('home');
    this.route('nextpage');
});
});

require.register("template", function(exports, require, module) {
require('templates/application');
require('templates/home');
require('templates/nextpage');
require('templates/_nav');
});

require.register("templates/_nav", function(exports, require, module) {
module.exports = Ember.TEMPLATES['_nav'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n      		<a href=\"#\"> Home</a>\n      	");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n      		<a href=\"#\"> NextPage</a>\n      	");
  }

  data.buffer.push("<div class=\"navbar\">\n  <div class=\"navbar-inner\">\n    <a class=\"brand\" href=\"#\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n    <ul class=\"nav\">\n      	");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      	");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "nextpage", options) : helperMissing.call(depth0, "linkTo", "nextpage", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </ul>\n  </div>\n</div>");
  return buffer;
  
});
});

require.register("templates/application", function(exports, require, module) {
module.exports = Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"container\">\n	<!--<div class=\"stage\">\n      <div class=\"pivoton-overlay pivoton-top\"></div>\n      <div class=\"pivoton-overlay pivoton-right\"></div>\n      <div class=\"pivoton-overlay pivoton-bottom\"></div>\n      <div class=\"pivoton-overlay pivoton-left\"></div>\n      <div class=\"pivoton-overlay pivoton-top-right pivoton-corner\"></div>\n      <div class=\"pivoton-overlay pivoton-bottom-right pivoton-corner\"></div>\n      <div class=\"pivoton-overlay pivoton-bottom-left pivoton-corner\"></div>\n      <div class=\"pivoton-overlay pivoton-top-left pivoton-corner\"></div>\n\n	  <div class=\"pivoton-button\">\n	    <span>PRESS ME</span>\n	  </div>\n\n	</div>-->\n\n\n	<div data-id=\"fatBtn\" class=\"btn btn-success btn-large\">Fat button</div>\n	<div data-id=\"smallBtn\" class=\"btn btn-danger\">Fat button</div>\n</div>\n");
  
});
});

require.register("templates/home", function(exports, require, module) {
module.exports = Ember.TEMPLATES['home'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"stage\">\n  <div class=\"wrapper\">\n    <div class=\"inner-wrapper\">\n      <div class=\"overlay top\"></div>\n      <div class=\"overlay right\"></div>\n      <div class=\"overlay bottom\"></div>\n      <div class=\"overlay left\"></div>\n      <div class=\"overlay tr corner\"></div>\n      <div class=\"overlay br corner\"></div>\n      <div class=\"overlay bl corner\"></div>\n      <div class=\"overlay tl corner\"></div>\n    </div>\n  </div>\n\n  <div class=\"button\">\n    <span>PRESS ME</span>\n  </div>\n\n</div>\n\n\n<script>\n  $(function(){\n    alert('123');\n  });\n</script>");
  
});
});

require.register("templates/nextpage", function(exports, require, module) {
module.exports = Ember.TEMPLATES['nextpage'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Go back to home page");
  }

  data.buffer.push("<h2> This is the next page.</h2>\n");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-success")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  return buffer;
  
});
});


//@ sourceMappingURL=app.js.map