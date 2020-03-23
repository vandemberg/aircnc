const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const port = 3333;
const app = express();

mongoose.connect('mongodb+srv://omnistack:patofeio@omnistack-89nwr.mongodb.net/week09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(port);
