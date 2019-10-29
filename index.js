const giphyConnect = require('giphy-api');

module.exports = {
    giphy: giphy
};

function giphy(message, config) {
    return new Promise((resolve) => {
        giphyPromise(message, config, resolve);
    });
}

function giphyPromise(message, config, callback) {
    let apiKey = null;
    if (config.apikeyEnv) {
        apiKey = process.env[config.apikeyEnv];
    } else if (config.apikey) {
        apiKey = config.apiKey;
    } else {
        message.channel.send("Giphy was not configured correctly.");
        callback(null);
        return;
    }

    const giphy = giphyConnect(config.apikey);
    const q = message.content.substring(message.content.indexOf(' ')).trim();
    giphy.search(
        {
            q,
            rating: 'g',
            limit: 10
        }
    ).then((res) => {
        let index = Math.floor(Math.random() * res.data.length)
        message.channel.send({
            files: [res.data[index].images.original.url]
        });
        callback(res.data[index]);
    })
}