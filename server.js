'use strict'

const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
// const mongo = require('./database'); // test connection

app.use(express.json());
app.use(cors());

const auth = require('./middleware/auth.js');
const index = require('./routes/index.js');
const products = require('./routes/products.js');

app.use('/api', auth);
app.use('/api', products);
app.use('/', index);

const port = process.env.PORT || 3001;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
