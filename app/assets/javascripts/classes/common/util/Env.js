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
//
Env = (function() {
  var env = {
    PHONEGAP: {
      is: window.PhoneGap !== undefined,
      name: 'PhoneGap'
    },
    DIRECT_CANVAS: {
      is: window.AppMobi !== undefined,
      name: 'DirectCanvas'
    },
    COCOON_JS: {
      is: navigator.isCocoonJS !== undefined,
      name: 'CocoonJS',
      methods: {
        callAPI: function() {
          var api = window.ext.IDTK_APP;
          api.makeCall.apply(api, arguments);
        }
      }
    },
    DEV: {
      name: 'Dev'
    }
  };

  var envObjects = {};
  var currEnv;

  for (var key in env) {
    var val = env[key];

    var o = envObjects[key] = {};

    if (val.is) {
      currEnv = o;
    }
    if (val.methods) {
      for (var m in val.methods) {
        envObjects[key][m] = val.methods[m];
      }
    }
  }

  if (!currEnv) {
    env.DEV.is = true;
    currEnv = envObjects.DEV;
  }

  for ( var k1 in env) {
    var o = envObjects[k1];
    for ( var k2 in env) {
      o[k2] = envObjects[k2];
      o['is' + env[k2].name] = env[k2].is;
    }
  }

  return currEnv;
})();