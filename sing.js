var songs = {
  "GlendyBurk": { // source: http://www.pitt.edu/~amerimus/lyrics.htm#The%20Glendy%20Burk
    name: "The Glendy Burk",
    lyrics: ["De Glendy Burk is a mighty fast boat, ", "Wid a mighty fast captain too; ", "He sits up dah on de hurricane roof ", "And he keeps his eye on de crew. ", "I cant stay here, for dey work too hard; ", "I'm bound to leave dis town; ", "I'll take my duds and tote 'em on my back ", "When de Glendy Burk comes down.", null,
    "De Glendy Burk has a funny old crew ", "And dey sing de boatman's song, ", "Dey burn de pitch and de pine knot too, ", "For to shove de boat along.", null,
    "De smoke goes up and de ingine roars ", "And de wheel goes round and round, ", "So fair you well!  for I'll take a little ride ", "When de Glendy Burk comes down.", null,
    "I'll work all night in de wind and storm, ", "I'll work all day in de rain, ", "Till I find myself on de levy dock ", "In New Orleans again.", null,
    "Dey make me mow in de hay field here ", "And knock my head wid de flail, ", "I'll go wha dey work wid de sugar and de cane ", "And roll on de cotton bale.", null,
    "My lady love is as pretty as a pink, ", "I'll meet her on de way ", "I'll take her back to de sunny old south ", "And dah I'll make her stay", null,
    "So dont you fret my honey dear, ", "Oh! dont you fret Miss Brown ", "I'll take you back 'fore de middle of de week ", "When de Glendy Burk comes down."],
    chorus: ["Ho! for Lou'siana! ", "I'm bound to leave dis town; ", "I'll take my duds and tote 'em on my back ", "When de Glendy Burk comes down."],
    lineDuration: 3500
  },
  "Shenandoah": {
    name: "Shenandoah",
    lyrics: ["Oh Shenandoah, ", "I long to see you, ", "Away you rolling river.", "Oh Shenandoah, ", "I long to see you, ", "Away, I'm bound away ", "'Cross the wide Missouri."],
    chorus: null,
    lineDuration: 4000
  }
};

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

function say(line, wait) {
  document.querySelector("textarea").value = line; 
  document.querySelector(".sendbtn").click(); 
  return new Promise(function(completed) {
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
  }, Promise.resolve(null));
  return repeat ? list.then(function() { return playlist(songs, true); }) : list;
}

playlist(["GlendyBurk", "Shenandoah"].map(function(title) { return songs[title]; }), false);