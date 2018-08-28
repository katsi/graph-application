const fetch = require('node-fetch');//to be able to create a client

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hello', (req, res) => res.send('Hello Big World!'))

app.get('/graph', (req, res) => {
    fetch('https://github.com/')
.then(res2 => res2.text())
.then(body => res.send(body));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))