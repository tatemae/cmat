// Copyright (c) 2013, Mihhail Lapuškin
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met: 

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer. 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution. 

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies, 
// either expressed or implied, of the FreeBSD Project.
//
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/evt/Event.js
Event = (function() {
  var ESC = 27;
  var SPACE = 32;

  function evtBase(funcName, evts, handler, el) {
    if (el) {
      var tmp = evts;
      evts = handler;
      handler = el;
      el = tmp;
    }

    evts.split(' ').forEach(function(evt) {
      ((el ? el : document)[funcName])(evt, handler, false);
    });
  }

  function bind(evts, handler, el) {
    evtBase('addEventListener', evts, handler, el);
  }

  function bindToKey(fn, key) {
    bind(document, 'keyup', function(e) { if (e.keyCode === key) fn(); });
  }

  return {
    bind: bind,

    unbind: function(evts, handler, el) {
      evtBase('removeEventListener', evts, handler, el);
    },

    backPressed: function(fn) {
      switch (Env) {
        case Env.DEV:
          bindToKey(fn, ESC);
          break;
        case Env.COCOON_JS:
          window.onidtkappfinish = fn;
          break;
        case Env.PHONEGAP:
          bind(document, 'backbutton', fn);
          break;
        case Env.DIRECT_CANVAS:
          bind(document, 'appMobi.device.hardware.back', fn);
          break;
      }
    },

    menuPressed: function(fn) {
      switch (Env) {
        case Env.DEV:
          bindToKey(fn, SPACE);
          break;
        case Env.PHONEGAP:
          bind(document, 'menubutton', fn);
          break;
      }
    },

    devicePaused: function(fn) {
      switch (Env) {
        case Env.COCOON_JS:
          Env.callAPI('App', 'onsuspended');
          break;
        case Env.PHONEGAP:
          bind(document, 'pause', fn);
          break;
        case Env.DIRECT_CANVAS:
          bind(document, 'appMobi.device.pause', fn);
          break;
      }
    },

    deviceResumed: function(fn) {
      switch (Env) {
        case Env.COCOON_JS:
          Env.callAPI('App', 'onactivated');
          break;
        case Env.PHONEGAP:
          bind(document, 'resume', fn);
          break;
        case Env.DIRECT_CANVAS:
          bind(document, 'appMobi.device.resume', fn);
          break;
      }
    },

    deviceReady: function(fn) {
      switch (Env) {
        case Env.PHONEGAP:
          bind(document, 'deviceready', fn);
          break;
        case Env.DIRECT_CANVAS:
          bind(document, 'appMobi.device.ready', fn);
          break;
      }
    },

    pageLoaded: function(fn) {
      bind(document, 'DOMContentLoaded', fn);
    },

    kineticJsDefined: function(fn) {
      bind(document, 'Kinetic', fn);
    },

    allFired: function(config) {
      var left = config.events.length;

      var checkDone = function() {
        if (--left === 0) {
          config.callback();
        }
      };

      config.events.forEach(function(evt) {
        evt(checkDone);
      });
    }
  };
})();