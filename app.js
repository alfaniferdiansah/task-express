const express = require('express');
const router = require('./routes');
const path = require('path');
const log = require('./middlewares/logger')
const app = express();

app.use(log)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/image', express.static(path.join(__dirname, 'uploads')))
app.use(router)
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed to load',
        message: 'Resource of ' + req.originalUrl + ' Not Found'
    })
})

app.listen(3001, () => console.log('Server : http://localhost:3001'))