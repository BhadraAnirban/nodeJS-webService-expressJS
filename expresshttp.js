const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('PMKJ ki Jay');
});

app.get('/api/pmkj', (req, res) => {
    res.send('Pranabananda Maharaj');
});

const port = process.env.PORT || 4100; // env is the environment object and PORT is the variable name.
app.listen(port, () => {
    console.log(`server Started at ${port}...`);
});


