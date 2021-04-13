// gestiona y centraliza los routers de la aplicación
const express = require('express');

//Objecto encargado de gestionar todas las rutas
const router = express.Router();

router.get('/', renderHome);
router.get('/about', renderHome);
router.get('/users', renderHome);

function renderHome(req, res){
  res.render('home');
}

module.exports = router;
