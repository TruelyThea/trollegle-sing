function sing(song, chorus, lineDuration) {
  if (song == null)
    return null;
  return song.reduce(function(acc, line) {
    if (line == null)
      return acc.then(function() {
        return sing(chorus, null, lineDuration);
      });
    return acc.then(function() {
      return say(line, lineDuration);
    });
  }, Promise.resolve(null));
}

var stopped = false, doStop = function() {};
var stop = function() { // call this to stop the music
  stopped = true;
  doStop();
};
var next = function() {
  doStop();
};

function say(line, wait) {
  document.querySelector("textarea").value = line; 
  document.querySelector(".sendbtn").click(); 
  return new Promise(function(completed, fail) {
    doStop = fail;
    setTimeout(completed, wait);
  });
}

function playlist(songs, repeat) {
  stopped = false;
  var list = songs.reduce(function(acc, song) {
    return acc.then(function() {
      return say("! Now playing: " + song.name + " !", 3000).then(function() {
        return sing(song.lyrics, song.chorus, song.lineDuration || 5000);
      });
    }).catch(function() {
      if (stopped)
        throw new Error();
    });
  }, Promise.resolve(null)).catch(function(){});
  return repeat ? list.then(function() {
    if (!stopped)
      return playlist(songs, true); 
  }) : list;
}

/* 
  // To Run, append this:
  var songs = {}; // copy-paste'd from songs.js
  (function(list) {
    playlist(list.map(function(title) { return songs[title]; }), false);
  })(["GlendyBurk", "Shenandoah"]); // place a list of song names here
*/