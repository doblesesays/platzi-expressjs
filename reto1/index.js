express = require('express');

app = express();

app.use('/', (req, res, next) => {
    res.send({
        name: "Genessis",
        lastname: "Jimenez",
    })
})

const server = app.listen(3000, () => {
    console.log("Listening, port: ", server.address().port)
})