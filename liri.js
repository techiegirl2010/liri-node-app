var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require('moment');
moment().format();

//node liri.js movie-this "wonder woman"
var command = process.argv[2];
var arg2 = process.argv[3];


//   * Name of the venue
//   * Venue location
//   * Date of the Event (use moment to format this as "MM/DD/YYYY")



// node liri.js spotify-this "Babe"
//   * Artist(s)
//   * The song's name
//   * A preview link of the song from Spotify
//   * The album that the song is from
// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

// * The Spotify API requires you sign up as a developer to generate the necessary credentials. Generate a **client id** and **client secret**:




//--------------------------------------------------------


//3. node liri.js movie-this "<movie name here>""



// * This will output the following information to your terminal/bash window:


//   ```
//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Rotten Tomatoes Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//   ```

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//   * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//   * It's on Netflix!

// * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
//http://www.omdbapi.com/?apikey=[trilogy]&



//-----------------------------------------


// `do-what-it-says`
// 4. `node liri.js do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//   * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//   * Edit the text in random.txt to test out the feature for movie-this and concert-this.


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

function concertThis(artist){
  

    var queryURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function(res){
        var result  =  res.data;
        console.log(result);
        for(var i=0; i<result.length; i++){
            var show = result[i];
            console.log(show.venue.country);
        }
    })
}