// read and set any environment variables with the dotenv package
require("dotenv").config();
// const keys = require("./keys.js");
// const Spotify = require("node-spotify-api");
// const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
// const inquirer = require("inquirer");
const fs = require("fs");

// variables
var nodeArgs = process.argv;
var artist = "";
var movieName = "";

//////// STEP ONE -- currently broken

if (process.argv[2] === "concert-this") {
    artist = nodeArgs.slice(3).join(" ");

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Request with axios to queryURL
    axios.get(queryURL).then(
        function (response) {
            console.log(response);
            // If the request with axios is successful
            console.log("Here are upcoming events for " + artist + ":");
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY, h:mm a"));
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
            console.log("--------------------");
            console.log(moment("Date & Time: " + response.data[1].datetime).format("MM/DD/YYYY, h:mm a"));
            console.log("Venue: " + response.data[1].venue.name);
            console.log("Location: " + response.data[1].venue.city + ", " + response.data[1].venue.region + ", " + response.data[1].venue.country);
            console.log("--------------------");
        }
    );
}

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

/////// STEP THREE: COMPLETE

if (process.argv[2] === "movie-this") {
    movieName = nodeArgs.slice(3).join("+");

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