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
    const giphy = giphyConnect(config.apikey);
    const q = message.content.substring(message.content.indexOf(' ')).trim();
    giphy.search(
        {
            q,
            rating: 'g',
            limit: 1
        }
    ).then((res) => {
        message.channel.send({
            files: [res.data[0].embed_url]
        });
        callback(res.data[0]);
    })
}