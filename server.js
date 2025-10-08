const express = require('express')
const path = require('path')

const app = express()
app.set('view engine', 'hbs')

// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'src')))

app.use('/', function (_, response) {
    response.sendFile(path.join(__dirname, 'src/app/index.html'))
})

console.log(module)
app.listen(3001)
