const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Welcome to Book Store');
})

server.listen(3400, () => {
    console.log('Server is up and running on Port: 3400');
})