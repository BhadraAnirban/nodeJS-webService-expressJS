# NodeJS CRUD Operations with ExpressJS

## Start with basic node http module:

In a file named nodehttp.js (any name) -
```
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
```
In the command line - 
### node nodehttp.js

Now you can access using url -
```
http://localhost:4000
http://localhost:4000/api/pmkj
```

## Use of Express.js:
### npm install express.js --save

```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('PMKJ ki Jay');
});

app.get('/api/pmkj', (req, res) => {
    res.send('Pranabananda Maharaj');
});

// The call back function is optional. 
// app.listen(4100); will work as well
app.listen(4100, () => {
    console.log('4100 server Started');
});

```

## Use of Environment variable –
As port will be different in test, production server. So better to use environment variable to mention port number.
process is a global object.
```
const port = process.env.PORT || 4100; 
// env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`4100 server Started at ${port}...`);
});
```
In the command line –
```
In case of window PowerShell: $env:PORT=2600
In case of windows: set PORT=2600
In case of mac: export PORT=2600

node <node file name>: node expresshttp.js
```

