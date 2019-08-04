# NodeJS CRUD Operations with ExpressJS

## Start with basic node http module:

In a file named nodehttp.js (any name) -
```
const http = require('http');

const server = http.createServer((req, res) => {
    
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
    console.log(`Server Started at ${port}...`);
});
```
In the command line –
```
In case of window PowerShell: $env:PORT=2600
In case of windows: set PORT=2600
In case of mac: export PORT=2600

node <node file name>: node expresshttp.js
```

## Route Params, Query and optional params
```
app.get('/api/schools/:id', (req, res) => {
    res.send(req.query);
    // http://localhost:2600/api/schools/26?subject=nodeJS => {"subject":"nodeJS"}
});

app.get('/api/schools/:id/:department', (req, res) => {
    res.send(req.params);
    // http://localhost:2600/api/schools/26/22 => {"id":"26","department":"22"}
});

app.get('/api/schools/:id/department/:deptId', (req, res) => {
    res.send(req.params); 
    // http://localhost:2600/api/schools/26/department/22 => {"id":"26","deptId":"22"}
});

// below with ? mark, we have made departmant as Optional Parameter
app.get('/api/library/:id/:department?', (req, res) => {
    res.send(req.params);
    // http://localhost:2600/api/library/26 => {"id":"26"}
    // http://localhost:2600/api/library/26/22 => {"id":"26","department":"22"}
});

```
## CRUD Operations
```
const express = require('express');
const app = express();
```
// in order to use body of the request, as a json, we need to enable it in the express.
```
app.use(express.json());
```
// to validate JSON object use a module called joi: npm install --save @hapi/joi.
```
const Joi = require('@hapi/joi'); 
```
```
let courses = [
    {id: 1, name: 'NodeJS'},
    {id: 2, name: 'Angular'},
    {id: 3, name: 'javascript'},
    {id: 4, name: 'c#'},
];

app.get('/api/courses', (req, res)=> {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res)=> {
    let course = courses.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        // send is optional
    }
    else
    {
        res.send(course);
    }    
});

app.post('/api/courses', (req, res) => {
    
    const courseSchema = {
        name: Joi.string().min(3).max(30).required(),
    };
    let result = Joi.validate(req.body, courseSchema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message); // 400: Bad request
    }
    else
    {        
        let course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }    
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        return;
    }
    const courseSchema = {
        name: Joi.string().min(3).max(30).required(),
    };
    let { error } = Joi.validate(req.body, courseSchema); // object destructuring
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(p => p.id === parseInt(req.params.id) );
    if(!course)
    {
        res.status(404).send({error: 'notfound', message: 'Invalid course id'}); // 404: Object not found
        return;
    }

    //courses = courses.filter(p => {return p.id != req.params.id});

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.status(200).send(course);
});

```

## JSON Object validation using joi
 npm install --save @hapi/joi
```
const Joi = require('@hapi/joi');

app.post('/api/courses', (req, res) => {
    console.log(req.body);
    const courseSchema = {
        name: Joi.string().min(3).max(30).required(),
    };
    let result = Joi.validate(req.body, courseSchema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message); // 400: Bad request
    }
    else
    {        
        let course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }    
});
```

## Handle CROSS Origin

```
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

```
