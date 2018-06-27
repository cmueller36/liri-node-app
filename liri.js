require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js');
var tweetCount = {
    count:20
}

//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);

//function for getting all my tweets
var myTweets = function(){
    client.get("statuses/user_timeline",tweetCount,function(error, tweets, response){
        if(!error && response.statusCode === 200){
            console.log("Got your tweets");
            console.log(tweets);
        }
    })
}

myTweets();