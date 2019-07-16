var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require('moment');
moment().format();

//node liri.js movie-this "movie name"
var command = process.argv[2];
var arg2 = process.argv[3];


// node liri.js spotify-this "song name"
//   * Artist(s)
//   * The song's name
//   * A preview link of the song from Spotify
//   * The album that the song is from
// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

// * The Spotify API requires you sign up as a developer to generate the necessary credentials. Generate a **client id** and **client secret**:



//-----------------------------------------



startProg(command, arg2);

function startProg(command,arg2){
    switch(command){
        case "concert-this": concertThis(arg2);
                                break;
        case "movie-this" : movieThis(arg2);
                                break;
        case "spotify-this": spotify(arg2);
                                break;
        case "do-what-it-says": doWhatItSays();
                                break;
        default:  console.log("Liri doesn't know what your saying");
        
    }
}


//3. node liri.js movie-this "movie name"
// * This will output the following information to your terminal/bash window:
//     * Title of the movie./ *Year the movie came out./* IMDB Rating/*Rotten Tomatoes Rating/* Country produced./*Language/* Plot/*Actors.
// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

var movieThis = function(movie){
    if(movie === undefined){
        movie = "Mr Nobody";
    }
    var queryURL= "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(queryURL).then(function(res){
        var result  =  res.data;
      console.log("Title :" + result.Title);
      console.log("Year Released :" + result.Released);
      console.log("IMDB Rating :" + result.imdbRating );
      console.log("Rotten Tomatoes Rating :" + result.Ratings[0].Value);
      console.log("Country :" +  result.Country);
      console.log("Language :" + result.Language);
      console.log("Plot :" + result.Plot);
      console.log("Actors :" +  result.Actors);

    })
}

//node liri.js concert-this "rtist/band name"
//render *name of venue/*venue location/*date of event - moment "MM/DD/YYYY"

function concertThis(artist){
  
    var queryURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function(res){
        var result  =  res.data;
        console.log(result);
        for(var i=0; i<result.length; i++){
            var show = result[i];
            console.log(show.venue.country);
            console.log(show.venue.city);
            console.log(show.venue.name);
            console.log(show.datetime);
        }
    })
}




//------------------------------------------
// 4. `node liri.js do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//   * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//   * Edit the text in random.txt to test out the feature for movie-this and concert-this.
