//method call from the console
var method = process.argv[2];

//parameter to pass for the method
var parameter = process.argv.slice(3).join(" ");

require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var keys = require('./keys.js');
var tweetCount = {
    count:parameter
}
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//function for getting all my tweets
var myTweets = function(){
    client.get("statuses/user_timeline",tweetCount,function(error, tweets, response){
        if(!error && response.statusCode === 200){
            console.log("Got your tweets...");
            var tweetNum = 1;
            //loops thorugh the tweets and prints the text from the tweet
            for (i = 0; i < tweets.length; i++){
                console.log(tweetNum+". "+JSON.stringify(tweets[i].text,null,2));
                tweetNum++;
            }    
        }
    })
}

//function for searching spotify data
var mySpotify = function(mysong){
    var mysong = process.argv.slice(3).join(" ");
    if(!mysong){
        mysong = "The Sign"
    }
    else{
        parameter = mysong
        spotify.search({ type: 'track', query: parameter }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("=== Here is your Spotify result ===");
            console.log("Artist :  "+data.tracks.items[0].album.artists[0].name);
            console.log("Song :  "+data.tracks.items[0].name);
            console.log("Preview Link :  "+data.tracks.items[0].preview_url);
            console.log("Album :  "+data.tracks.items[0].album.name);
        
        });
    }
}

//function for searching movie title
var myMovie = function(){
    request("http://www.omdbapi.com/?apikey=de7e3bd&t="+parameter,function(err,response,body){
        if(!err && response.statusCode == 200){
            var movie = JSON.parse(body);
            console.log("=== Here is your Movie ===");
            console.log("Title: "+movie.Title);
            console.log("Release Year: "+movie.Year);
            console.log("IMDB Rating: "+movie.Ratings[0].Value);
            if(!movie.Ratings[1]){
                console.log("No Rotten Tomatoes");
            }
            else{
                console.log("Rotten Tomatoes: "+movie.Ratings[1].Value);
            }
            console.log("Country: "+movie.Country);
            console.log("Language: "+movie.Language);
            console.log("Plot: "+movie.Plot);
            console.log("Actors: "+movie.Actors);
        }
    })
}

//function for random for Liri
var myLiri = function(){
    fs.readFile("random.txt", "utf8", function(err, data){
        myLiriResults = data.split(",");
        mysong = myLiriResults[1];
    if(!mysong){
        mysong = "The Sign"
    }
    else{
        parameter = mysong
        spotify.search({ type: 'track', query: parameter }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("=== Here is your Spotify result ===");
            console.log("Artist :  "+data.tracks.items[0].album.artists[0].name);
            console.log("Song :  "+data.tracks.items[0].name);
            console.log("Preview Link :  "+data.tracks.items[0].preview_url);
            console.log("Album :  "+data.tracks.items[0].album.name);
        
        });
    }
    })
}




//call for tweets and how many to return
if (method === "my-tweets"){
    myTweets();
};

if (method === "spotify-this-song"){
    mySpotify();
}

if (method === "movie-this"){
    myMovie();
}

if (method === "do-what-it-says"){
    myLiri();
}