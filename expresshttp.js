const express = require('express');
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


const port = process.env.PORT || 4100; // env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`server Started at ${port}...`);
});


