const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const middlewares = require('./middleware');
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.reason));

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
  });
});

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
