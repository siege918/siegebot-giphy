const giphyPlugin = require('./index.js');

const apikey = process.argv[2];
var mockMessage = {
    author: "@TESTUSER",
    content: ":gif superman",
    channel: {
        send: function (message) { return true; }
    }
};

const callback = (response) => {
    console.log("Response body:");
    console.log(response);
};

console.log("Sending message");

giphyPlugin.giphy(
    mockMessage, {apikey} 
).then(callback);