//method call from the console
var method = process.argv[2];

//parameter to pass for the method
var parameter = process.argv[3];

require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js');
var tweetCount = {
    count:parameter
}

//var spotify = new Spotify(keys.spotify);
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

//call for tweets and how many to return
if (method === "my-tweets"){
    myTweets();
};