const express = require('express');
const cors = require('cors');
const http = require('http');
const { db } = require('./db/db_connection');
const routes = require('./routes/apiroute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const server = http.createServer(app);

server.listen(5000, () => {
  console.log('listening to PORT 5000');
});
