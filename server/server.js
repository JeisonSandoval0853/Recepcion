const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const router = require('./routers/routers');

require('./db/mongoose');

const app = express();

// Configuración de recursos publicos
app.use(express.static('Public'));

//configuración de Handlebars
const hbs = exphbs.create({ extname: 'hbs', helpers: {} });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../server/views'));
//configuración de Handlebars


//configurar body.parse para utilizar req.body
app.use(bodyParser.urlencoded({extended: true, encoded: true}));
app.use(bodyParser.json());

//configuración de Midlewares
app.use((req, res, next) => {
  console.info(`${req.method} :: ${req.originalUrl}`)
  next();
})
//configuración de Midlewares

//Routers
app.use('/', router);


app.listen(9090, () => {
 console.log('server is runnnin on port 9090');
 });


