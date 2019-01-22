const express = require('express');
const app = express();

app.get('/', (req, res, nex) => {
    res.send({hello: "Hello world!"});
});

const server = app.listen(8000, () => {
    console.log('Lintening on http://localhost:8000');
});