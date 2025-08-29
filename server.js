// index.js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const postsRouter = require('./routes/posts')

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/models', express.static(path.join(__dirname, 'models')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/posts', postsRouter)

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${process.env.PORT || PORT}`)
})