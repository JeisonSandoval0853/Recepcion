const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const router = require('./routers/routers');

const { MongoClient, ObjectId } = require('mongodb');
const { nextTick } = require('process');

const app = express();

// Configuración de recursos publicos
app.use(express.static('Public'));

//configuración de Handlebars
const hbs = exphbs.create({ extname: 'hbs', helpers: {} });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../server/views'));
//configuración de Handlebars

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
  const mongoDbPath = 'mongodb+srv://jfsandoval:Recepcion2021*@recepcion.vcmd0.mongodb.net/Recepcion?retryWrites=true&w=majority';
  const mongoConf = { useNewUrlParser: true, useUnifiedTopology: true };
  MongoClient.connect(mongoDbPath, mongoConf, (err, client) => {
    if (err) {

      console.log('Error connecting to Database ', err);
      return;
    }

    console.log('Conection State ', client.isConnected());
    recepcionDB = client.db('Recepcion');
  });
});
