const express = require('express')


const app = express()


app.listen(8080, () => {
    console.log('Feed Listening on 8080')
})

app.get('/health', (req, res) => {
    res.send('Users be healthy !')
})