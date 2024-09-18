const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');

const usuarioRouter = require ('./app/routers/router.js')
const librosRouter = require ('./app/routers/router.js')
const autorRouter = require ('./app/routers/router.js')


const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

db.sequelize.sync({ force: false }).then(() => {
  console.log('Resync with { force: false }');
});


app.use('/', usuarioRouter);
app.use('/', librosRouter);
app.use('/', autorRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos UMG" });
});

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});