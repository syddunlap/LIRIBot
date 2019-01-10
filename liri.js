// // read and set any environment variables with the dotenv package
// require("dotenv").config();

// // import the keys.js file and store it in a variable
// var keys = require("./keys.js");

// // access your keys information
// var spotify = new spotify(keys.spotify);

//////// STEP ONE
// node liri.js concert.this <artist/band name here>
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

//////// STEP TWO

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
// Step One: Visit https://developer.spotify.com/my-applications/#!/
// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

/////// STEP THREE

// node liri.js movie-this '<movie name here>'

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

if (process.argv[2] === "movie-this") {
    var axios = require("axios");
    var nodeArgs = process.argv;
    var movieName = "";

    // loop through words in node arguments and add +'s needed between words for queryurl
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    // if the user doesn't type a movie in:
    if (process.argv[3] === undefined) {
        movieName = "Mr.+Nobody";
    }
    // then run a request with the axios package
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Request with axios to queryURL
    axios.get(queryURL).then(
        function (response) {
            // If the request with axios is successful
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[1].Value);
            console.log("Rotton Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}
/////// STEP FOUR 

// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.