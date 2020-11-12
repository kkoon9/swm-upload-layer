const cors = require('cors');
const express = require('express');
const BaseRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',BaseRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});