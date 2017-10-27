var twitter = require('node-tweet-stream'),
    credentials = require('./credentials.js'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    zerorpc = require("zerorpc"),
    nltkClient = new zerorpc.Client();

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    token: credentials.access_token_key,
    token_secret: credentials.access_token_secret
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000);

var count = 0, positive = 0, negative = 0, neutral = 0;
nltkClient.connect("tcp://127.0.0.1:4242");

io.sockets.on('connection', function (socket) {
    console.log('USER CONNECTED\n');

    socket.on('disconnect', function(){
        console.log('USER DISCONNECTED\n');
    });
});

t.on('tweet', function (tweet) {
    count++;
    console.log('TWEET: =================================================');
    console.dir(tweet);
    console.log('/TWEET: ================================================');

    var line = tweet.retweeted_status ? tweet.retweeted_status.text : tweet.text;

    nltkClient.invoke("sentiment", line, function(error, res, more) {
        console.log('SENTIMENT : =================================================');
        console.dir(res);
        console.log('/SENTIMENT: ================================================');
        if(!res) return;

        negative+=res.neg;
        neutral+=res.neu;
        positive+=res.pos;

        io.emit('tweets', {
            "detail": line,
            "positive": positive / count,
            "negative": negative / count,
            "neutral": neutral / count,
            "count": count
        })
    });

});

t.on('error', function (err) {
    console.log('ERROR: ========================================');
    console.dir(err)
    console.log('======+========================================');
});


//TODO: externalise
t.track('BTC');
t.track('ETH');
t.track('XRP');
t.track('BCH');
t.track('LTC');
t.track('Bitcoin');
t.track('Bitcoin Cash');
t.track('BitConnect');
t.track('BlackCoin');
t.track('Burstcoin');
t.track('Coinye');
t.track('Dash');
t.track('Dogecoin');
t.track('DigitalNote');
t.track('Emercoin');
t.track('Ethereum');
t.track('ETC');
t.track('Gridcoin');
t.track('IOTA');
t.track('Litecoin');
t.track('MazaCoin');
t.track('Monero');
t.track('Namecoin');
t.track('NEM');
t.track('Nxt');
t.track('POS');
t.track('Omni');
t.track('Peercoin');
t.track('POW & POS');
t.track('PotCoin');
t.track('Primecoin');
t.track('Ripple');
t.track('SixEleven');
t.track('SwiftCoin');
t.track('Titcoin');
t.track('Ubiq');
t.track('Vertcoin');
t.track('Zcash');


