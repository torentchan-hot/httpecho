// HTTPエコーサーバー HTTPリクエストボディデータを返す
var http = require('http');
var server = http.createServer();
var port = process.env.PORT || 5000;

// クライアントからリクエストボディデータをレスポンスとして返す
server.on('request', function (req, res) {
    var data = "query:"+req.url+"\n";
    data += "localAddress:"+req.socket.localAddress+"\n";
    data += "localPort:"+req.socket.localPort+"\n";
    data += "remoteAddress:"+req.socket.remoteAddress+"\n";
    data += "remotePort:"+req.socket.remotePort+"\n";
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function () {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end(data + '\n');
    });
});


// HTTPの生データを出力する
server.on('connection', function (socket) {
    console.log('=== Raw Socket Data Start ===');
    socket.on('data', function (chunk) {
        console.log(chunk.toString());
    });

    socket.on('end', function () {
        console.log('=== Raw Socket Data End ===');
    });
});

// ソケット関連のエラー出力
server.on('clientError', function(e) {
    console.log('Client Error: ', e.message);
});

// サーバ関連のエラー出力
server.on('error', function(e) {
    console.log('Server Error: ', e.message);
});

server.listen(port, function () {
    console.log('listening on ' + port);
})