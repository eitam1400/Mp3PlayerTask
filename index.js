console.log(`                                                                 USABLE FUNCTIONS: 

                                                                       Mine:

 function getSongIdIndex(id){  //find the song index from the list (and returns it if exist!- wehn running i assigned before running it)

 function getPlaylistIdIndex(id){  //find the playlist index from the list (and returns it if exist!- wehn running i assigned before running it)

 function mmtoss(minutes) // translate mm:ss to ss

 function freeSongID(){ // func return the free id which not yet registered to any song in the list.

 function freeListID(){ // func return the free id which not yet registered to any playlist in the playlists.

 function sstomm(seconds){ //converts seconds durationg to mm:ss format!

 function songDuration(id){ // gets song id and return its duration in mm:ss

 function findSongByDuration(songDur){ //get song duration (IN SECONDS!) and return the song which its duration is equal to the inserted one! if there are more than 1 song same duration then it outputs all songs with this duration!

 function findPlaylistByDuration(playlistDur){ //get playlist duration (IN SECONDS!) and return the playlist which its duration is equal to the inserted one! if there are more than 1 playlist same duration then it outputs all playlists with this duration!

 function hasQuery(word, query){ //function gets word and a query and return true if the query included in the word... even partially.(but in a row)



                                                                      Default:

playSong() - Gets a song ID. Uses player.playSong to play the song with the given ID.

removeSong() - Gets a song ID. Removes the song with the given ID from the player (from songs and playlists).

addSong() - Gets a title, album, artist, duration & ID. Adds a new song with given properties to the player. The ID is optional, and if omitted should be automatically generated. The song duration should be in mm:ss format (for example 06:27). Returns the ID of the new song.

removePlaylist() - Gets a playlist ID. Remove the playlist with the given ID from the player (does not delete the songs inside it).

createPlaylist() - Gets a name & ID. Creates a new, empty playlist with the given details. The ID is optional, and if omitted should be automatically generated. Returns the ID of the new playlist.

playPlaylist() - Gets a playlist ID. Plays all songs in the specified playlist, in the order the appear in the playlist.

editPlaylist() - Gets a playlist ID & a song ID. If the song ID exists in the playlist, removes it. If it was the only song in the playlist, also deletes the playlist. If the song ID does not exist in the playlist, adds it to the end of the playlist.

playlistDuration() - Gets a playlist ID. Returns the total duration of the entire playlist with the given ID.

searchByQuery() - Gets a query string. Returns a results object, which has:

    -songs: an array of songs in which either title or album or artist contain the query string. The songs should be sorted by their titles.

    -playlists: an array of playlists in which the name contains the query string. The playlists should be sorted by their names.

searchByDuration() - Gets a duration in mm:ss format (for example 11:03). Returns the song, or playlist, with the closest duration to what was given.


<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>
`)

const player = { //object of the 1875 mp3 player clone
    songs: [
      {
        id: 1,
        title: 'Boys and Girls',
        album: 'CTV3',
        artist: 'Jaden',
        duration: 223
      },
      {
        id: 2,
        title: 'Dejanbem',
        album: 'Haitian Boy Kodak',
        artist: 'Kodak Black',
        duration: 214
      },
      {
        id: 7,
        title: 'Versatile 3',
        album: 'Before The Album',
        artist: 'Kodak Black',
        duration: 334
      },
      {
        id: 3,
        title: 'Gnarly',
        album: 'Dying To Live',
        artist: 'Kodak Black feat. Lil Pump',
        duration: 214
      },
      {
        id: 4,
        title: 'Freaky Girl',
        album: 'I AM YOU',
        artist: 'YNW Melly',
        duration: 215
      },
      {
        id: 5,
        title: 'Betrayal',
        album: 'Trip At Knight',
        artist: 'Trippie Redd feat. Drake',
        duration: 151
      }
    ],
    playlists: [
      { id: 1, name: 'Hip-Hop', songs: [1, 3, 4] },
      { id: 5, name: 'Rap', songs: [2, 7, 5] },
    ],
    playSong(song) {
      console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${sstomm(song.duration)}.`)
    }
  }
  
  function playSong(id) { //play a given song by its id
    if(getSongIdIndex(id) === undefined) throw("song id not found in list");
    player.playSong(player["songs"][getSongIdIndex(id)]); //uses the playSong method to play a specific song on the mp3!
  }

  function getSongIdIndex(id){  //find the song index from the list (and returns it if exist!- wehn running i assigned before running it)

      for(let i=0; i<player["songs"].length; i++)
      {
       if(player["songs"][i]["id"] === id) return i;
      }
      
  } // if i use throw in this function when i use it in other places it stops the running of both used and using functions cuz throw just stop the wholeee operation of the code cuz it realises an error... so better assign it with an if statement before each run of this function in other functions

  function getPlaylistIdIndex(id){  //find the playlist index from the list (and returns it if exist!- wehn running i assigned before running it)
    for(let i=0; i<player["playlists"].length; i++)
    {
     if(player["playlists"][i]["id"] === id) return i;
    }
  }

  
  function removeSong(id) { //delete a song from the mp3!
    if(getSongIdIndex(id) === undefined) throw("song id not found in list");
    player.songs.splice(getSongIdIndex(id),1); //removed song from songs list. if id exists.
    for(let i=0; i<player.playlists.length;i++) //go over the playlists.
    {
      if(player.playlists[i].songs.includes(id))  player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id), 1); // removes the id from the playlist, if exists.
    }
  }
  
  function addSong(title, album, artist, duration, id) {
    let elementID= freeSongID(); //assign it a unused id identifier!
    if((id !== undefined)&&(typeOf(getSongIdIndex(id)) !== 'number')) player["songs"].push({id: id, title: title, album: album, artist: artist, duration: mmtoss(duration)});
    else player["songs"].push({id: elementID , title: title, album: album, artist: artist, duration: mmtoss(duration)});
    return elementID;
  }

  //console.log(addSong("love","kaki","kiki","3:15"))
  //console.log(player.songs)

  function mmtoss(minutes) // translate mm:ss to ss 
  {
   const mmtoss = minutes.split(':'); //seperates between minutes and seconds and puts it inside a new array.
   return parseInt(mmtoss[0]) * 60 + parseInt(mmtoss[1]); //converts to seconds. and adds up.
  }

  function freeSongID(){ // func return the free id which not yet registered to any song in the list.
    let free=1;
    
    while(typeof(getSongIdIndex(free)) === 'number'){
      free++;
    } return free;
  }

  
  function removePlaylist(id) {
    
    if(getPlaylistIdIndex(id) === undefined) throw("mannn, there is no playlist like this exist!!! Dont you see?!?"); // checks if the functions returns something it means the id exists in playlist. else, it's an error.

    let i=0;
    while(i < player.playlists.length)
    {
      if(player.playlists[i].id === id) {player.playlists.splice(i,1); break;}
      i++;
    }
  
  }

function freeListID(){ // func return the free id which not yet registered to any playlist in the playlists.
    let free=1;
    for(let i in player["playlists"])
    {
      if(player["playlists"][i].id !== free) return free; 
      ++free;
    }
    return free;
  }
  
  function createPlaylist(name, id) {
    let elementID = freeListID();
    player.playlists.push({id: id || elementID, name: name, songs: []}) //if id inserted then it gettin assigned. else, a free one gettin assigned.
    return elementID;
  }
  
  function playPlaylist(id) {
   if(getPlaylistIdIndex(id) === undefined) throw("playlist like this, leads to, error like this, leads to, try again...!");
   let playlistIndex = getPlaylistIdIndex(id); //index of the playlist with the specific ID in the playlits array
   player.playlists[playlistIndex].songs.forEach(element => playSong(element));
  }
  
  
  function editPlaylist(playlistId, songId) {
    let playlistIndex = getPlaylistIdIndex(playlistId); //index of the playlist with the specific ID in the playlits array
    let songIndex = player["playlists"][playlistIndex].songs.indexOf(songId); // index of the song with the specific ID in the songs array
    if((player.playlists[playlistIndex].songs.length > 1) && (player.playlists[playlistIndex].songs.indexOf(songId) !== -1)) /*player.playlists[playlistIndex].songs.splice(songIndex,1);  or*/ removeSong(songId);
    else if((player.playlists[playlistIndex].songs.length === 1) && (player.playlists[playlistIndex].songs.indexOf(songId)) !== -1) removePlaylist(playlistId);
    else player.playlists[playlistIndex].songs.push(songId);
  }

  function sstomm(seconds){ //converts seconds durationg to mm:ss format!
    console.log(seconds)
    return (Math.floor(seconds/60) + ":"  + (seconds%60)); //check how many minutes "enter" in it and rounding it to the max tries which it has no remainder. then adds up the remainder of the seconds left.
  }


  function playlistDuration(id) {
    let playlistIndex = getPlaylistIdIndex(id), songIndex; //index of the playlist with the specific ID in the playlits array
    let durationSum = 0; //sums up the total duration of all songs in the playlist
    player.playlists[playlistIndex].songs.forEach(element => durationSum += player['songs'][getSongIdIndex(element)].duration);
    return (sstomm(durationSum));
  }


  function searchByQuery(query) {
    if(query.length === 1) throw("a word is more than 1 letter!");
    let songsQuery = [], playlistQuery = [];

    songsQuery = player.songs.filter(song => hasQuery(song.title, query)  || hasQuery(song.album, query) || hasQuery(song.artist, query) );
    songsQuery.sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);

    playlistQuery = player.playlists.filter(playlist => hasQuery(playlist.name,query));
    playlistQuery.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
 
    return {songs: songsQuery, playlists: playlistQuery};
  }



  function hasQuery(word, query){ //function gets word and a query and return true if the query included in the word... even partially.(but in a row)
    let wordSplitter = word.toLowerCase().split(' ');
    let querySplitter = query.toLowerCase().split(' ');
    let flagTrue;

    for(let i in wordSplitter) //runs each word at a time
    {
      for(let t in querySplitter){ //runs all query/ies tests on each word at a time. to che all options.
        if(wordSplitter[i].includes(querySplitter[t])) flagTrue = true; //if query included in word then flagtrue is true which means its included...
      } 
   } 
   if(flagTrue !== undefined && flagTrue === true) return flagTrue; //if the flagtrue got assigned a value(in this case always true). return true(means included)
   return false; // else return false.(no matter the case)
 }



  function searchByDuration(duration) {

    let seconds = mmtoss(duration);                                                                  
    let songsDurationsArr =[], playlistDurationsArr = [], minPlaylistArr = [], minSongArr = [];

      playlistDurationArr = player.playlists.map(playlist => mmtoss(playlistDuration(playlist.id))); //inserts & converts song duration mm:ss form to ss form to an array representing each playlit duration!
      
      songsDurationsArr = player.songs.map(song => mmtoss(songDuration(song.id))); //inserts & converts song duration mm:ss form to ss form to ss form to an array representing each song duration!
      
    //playlistDuration.forEach(element => mmtoss(element)); //converts playlist duration mm:ss form to ss form!
    //songDuration.forEach(element => mmtoss(element)); //converts song duration mm:ss form to ss form!

    minPlaylistArr = playlistDurationArr.map(length => Math.abs(seconds - length));
     //minPlaylistArr = Math.min(...minPlaylistArr);
    minSongArr = songsDurationsArr.map(length => Math.abs(seconds - length));
    //minSongArr = Math.min(...minSongArr);
    

    if(Math.min(...minPlaylistArr) > Math.min(...minSongArr)) return findSongByDuration(Math.min(...minSongArr)+seconds); //output the original song by his original duration by adding the missing "seconds" which we substract earlier!
    return findPlaylistByDuration(Math.min(...minPlaylistArr)+seconds); //output the original playlist by his original duration by adding the missing "seconds" which we substract earlier!
  } 


  function songDuration(id){ // gets song id and return its duration in mm:ss
    if(getSongIdIndex(id) === undefined) throw("song id not found in list");
    //let durArr= player.songs.filter(element => (element.id === id));
    //let songDur = durArr[0].duration;
    let songDur = player.songs[getSongIdIndex(id)].duration 
    return sstomm(songDur);
  }

  function findSongByDuration(songDur){ //get song duration (IN SECONDS!) and return the song which its duration is equal to the inserted one! if there are more than 1 song same duration then it outputs all songs with this duration!
    let songArr = []; //array of all songs with the given duration!
   /* for(let i=0; i<player["songs"].length; i++)
    {
     if(player["songs"][i]["duration"] === songDur) songArr.push(player["songs"][i])
    } */
    songArr = player["songs"].filter(song => (song.duration === songDur));
    return songArr;
  }


  function findPlaylistByDuration(playlistDur){ //get playlist duration (IN SECONDS!) and return the playlist which its duration is equal to the inserted one! if there are more than 1 playlist same duration then it outputs all playlists with this duration!
    let playlistArr = []; 
    playlistArr = player.playlists.filter(playlist => (mmtoss(playlistDuration(playlist.id)) === playlistDur));
    return playlistArr;
  }

  module.exports = {
    player,
    playSong,
    removeSong,
    addSong,
    removePlaylist,
    createPlaylist,
    playPlaylist,
    editPlaylist,
    playlistDuration,
    searchByQuery,
    searchByDuration,
  }
  