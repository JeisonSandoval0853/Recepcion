// gestiona y centraliza los routers de la aplicación
// importa en orden la lista de las vistas y las APIS
const express = require('express');


//const router = express.Router();

//Imports de API
const UserAPI = require('./api-routes/UserAPI')


//Imports de Vistas
const LoginRouter = require('./views-routes/LoginRouter');
const DashboardRouter = require('./views-routes/DashboardRouter');



//Objecto encargado de gestionar todas las rutas
const router = express.Router();


// API
router.use(UserAPI);

//Views
router.use(LoginRouter);
router.use(DashboardRouter);


module.exports = router;
