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
// https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ac9454cdc9a582ccaeb52d4133dc6d6e35590183/src/classes/common/resource/loader/AudioLoader.js
AudioLoader = (function() {
  var TYPE_TO_EXT = {
    'audio/ogg': 'ogg',
    'audio/mpeg': 'mp3'
  };

  var audioExt;
  var dummyAudio = new Audio();

  for (var type in TYPE_TO_EXT) {
    if (dummyAudio.canPlayType(type)) {
      audioExt = TYPE_TO_EXT[type];
      break;
    }
  }

  return $$$.Class({
    extend: AbstractLoader,

    _init: function() {
      AbstractLoader.apply(this, arguments);
    },

    load: function(basePath, snds) {
      if (!audioExt) throw ('No supported audio types!');

      var formats = {};
      formats[audioExt] = snds;

      this._loadResources(formats, basePath + '/' + audioExt + '/', Audio);
    },

    _loadResource: function(files, basePath, file, ext, onload) {
      var path = basePath + file + '.' + ext;
      var res = new Audio();
      
      res.addEventListener('canplay', onload);
      res.src = path;

      files[file] = res;
    }
  });
})();