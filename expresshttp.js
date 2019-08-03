const express = require('express');
const Joi = require('@hapi/joi');
const app = express();


app.get('/', (req, res) => {
    res.send('PMKJ ki Jay');
});

app.get('/api/pmkj', (req, res) => {
    res.send('Pranabananda Maharaj');
});

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

///////////////////////////////// CRUD Operation //////////////////////////////////////////////////////////

// in order to use body in request, as a json we need to enable it in the express/
app.use(express.json());

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
    courses = courses.filter(p => {return p.id != req.params.id});
    res.status(200).send();
});



const port = process.env.PORT || 4100; // env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`server Started at ${port}...`);
});


