const http = require('http');

const server = http.createServer((req, res) => {
    console.log('req url: ' + req.url);
    if(req.url === '/'){
        res.write('PMKJ ki Jay');
        res.end();
    }
    else if(req.url === '/api/pmkj'){
        res.write('Pranabananda Maharaj');
        res.end();
    }
    else if(req.url == '/favicon.ico')
    {
        // short-circuit those annoying favicon requests in node.js
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
    }
})

server.listen(4000);
console.log('Server 4000 started.');