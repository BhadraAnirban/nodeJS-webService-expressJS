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


