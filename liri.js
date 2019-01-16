// read and set any environment variables with the dotenv package
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
// const fs = require("fs");

// variables
var nodeArgs = process.argv;
var artist;
var movieName;
var track;

switch (nodeArgs[2]) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;
}

//////// STEP ONE -- currently broken
function concertThis() {
    if (nodeArgs[3]) {
        artist = nodeArgs.slice(3).join(" ");
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        // Request with axios to queryURL
        axios.get(queryURL)
            .then(
                function (response) {
                    // If the request with axios is successful
                    console.log("\r\n\r\n");
                    console.log("--------------------");
                    console.log("Here are upcoming events for " + artist + ":");
                    console.log("--------------------");
                    console.log("Date & Time:" + moment(response.data[0].datetime).format("MM/DD/YYYY, h:mm a"));
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
                    console.log("--------------------");
                    console.log("Date & Time: " + moment(response.data[1].datetime).format("MM/DD/YYYY, h:mm a"));
                    console.log("Venue: " + response.data[1].venue.name);
                    console.log("Location: " + response.data[1].venue.city + ", " + response.data[1].venue.region + ", " + response.data[1].venue.country);
                    console.log("--------------------");
                    console.log("Date & Time: " + moment(response.data[2].datetime).format("MM/DD/YYYY, h:mm a"));
                    console.log("Venue: " + response.data[2].venue.name);
                    console.log("Location: " + response.data[2].venue.city + ", " + response.data[2].venue.region + ", " + response.data[2].venue.country);
                    console.log("--------------------");
                    console.log("\r\n\r\n");
                }
            );
    } else {
        console.log("You forgot to input an artist. Try again.");
    }
};

function spotifyThisSong() {
    if (nodeArgs[3]) {
        track = nodeArgs.slice(3).join(" ");
        spotify.search({
            type: "track",
            query: track,
            limit: 1
        })
            .then(function (response) {
                console.log("\r\n\r\n");
                console.log("Information for the song '" + track + "':");
                console.log("--------------------");
                console.log("Song Title:" + response.tracks.items[0].name);
                console.log("Artist: " + response.tracks.items[0].artists.name);
                console.log("Album: " + response.tracks.items[0].album.name);
                console.log("Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("--------------------");
                console.log("\r\n\r\n");
            });
    } else {
        track = "The Sign";
        spotify.search({
            type: "track",
            query: track,
            limit: 10
        })
            .then(function (response) {
                console.log("\r\n\r\n");
                console.log("You didn't input a song, so here's a song suggestion for you!");
                console.log("--------------------");
                console.log("Information for the song '" + track + "':");
                console.log("--------------------");
                console.log("Song Title:" + response.tracks.items[9].name);
                console.log("Artist: " + response.tracks.items[9].artists.name);
                console.log("Album: " + response.tracks.items[9].album.name);
                console.log("Link: " + response.tracks.items[9].external_urls.spotify);
                console.log("--------------------");
                console.log("\r\n\r\n");
            });
    }
};

function movieThis() {
    if (nodeArgs[3]) {
        movieName = nodeArgs.slice(3).join("+");
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // Request with axios to queryURL
        axios.get(queryURL)
            .then(
                function (response) {
                    // If the request with axios is successful
                    console.log("\r\n\r\n");
                    console.log("--------------------");
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.Ratings[1].Value);
                    console.log("Rotton Tomatoes Rating: " + response.data.Ratings[2].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("--------------------");
                    console.log("\r\n\r\n");
                }
            );
    } else {
        movieName = "Mr.+Nobody";
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // Request with axios to queryURL
        axios.get(queryURL)
            .then(
                function (response) {
                    // If the request with axios is successful
                    console.log("\r\n\r\n");
                    console.log("--------------------");
                    console.log("You didn't input a movie, so here's a suggestion for you.");
                    console.log("--------------------");
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.Ratings[1].Value);
                    console.log("Rotton Tomatoes Rating: " + response.data.Ratings[2].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("--------------------");
                    console.log("\r\n\r\n");
                }
            );
    }
};

/////// STEP FOUR -- INCOMPLETE
//////// give the user random information from random.txt file
// if (process.argv[2] === "do-what-it-says") {
//     fs.readFile("random.txt", "utf8", function (error, data) {
//         if (error) {
//             return console.log("Error: " + error)
//         }

//         dataArr = data.split(",");
//         // make this work
//     })
// }

// I have lots of debugging to do.
// During testing, application worked for certain steps the first few tries, but broke on later attempts
// Pseodocode for Step Four would be to use 'switch.' Potentially to change the majority of the 'if' statements throuhgout into separate cases and then 'switch' from case to case when the user types in an argument
