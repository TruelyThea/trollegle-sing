var files = ["sing", "songs"].map(function(file) { 
  return new Promise(function(success) {
    var script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/TruelyThea/trollegle-sing@0.3.1/" + file + ".js";
    document.body.appendChild(script);
    script.addEventListener("load", success);
  });
});

Promise.all(files).then(function() {
  (function(list) {
    playlist(list.map(function(title) { return songs[title]; }), false);
  })(["Shenandoah"]); // place a list of song names here
});



