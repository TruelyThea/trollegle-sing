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

var stop = function() {}; // call this to stop the music

function say(line, wait) {
  document.querySelector("textarea").value = line; 
  document.querySelector(".sendbtn").click(); 
  return new Promise(function(completed, doStop) {
    stop = doStop;
    setTimeout(completed, wait);
  });
}

function playlist(songs, repeat) {
  var list = songs.reduce(function(acc, song) {
    return acc.then(function() {
      return say("! Now playing: " + song.name + " !", 3000).then(function() {
        return sing(song.lyrics, song.chorus, song.lineDuration || 5000);
      });
    });
  }, Promise.resolve(null)).catch(function() {
    console.log("stopped");
  });
  return repeat ? list.then(function() { return playlist(songs, true); }) : list;
}

/* 
  // To Run, append this:
  var songs = {}; // copy-paste'd from songs.js
  (function(list) {
    playlist(list.map(function(title) { return songs[title]; }), false);
  })(["GlendyBurk", "Shenandoah"]); // place a list of song names here
*/