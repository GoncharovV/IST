const express = require('express')
const path = require('path');
const app = express()

const MOCK_DATA = require('./data.js')

const PORT = 5000

const cards = MOCK_DATA

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', { cards })
})

app.get('/cards/:id', (req, res) => {
    const card = cards.find(card => card.id === Number(req.params.id))

    res.render('photo-page', { card })
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
