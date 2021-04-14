// Establecer la conexion a la BD
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jfsandoval:Recepcion2021*@recepcion.vcmd0.mongodb.net/Recepcion?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
