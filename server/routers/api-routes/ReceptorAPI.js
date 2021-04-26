const express = require('express');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const ReceptorController = require('../../controllers/ReceptorController')


//Llama Middlewares
const auth = require('../../midlewares/auth');


async function getReceptors(req, res) {
  const
    {
      ID = '',
      company = ''
    } = req.body;


  const response = await ReceptorController.getReceptors({ID, company}); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

router.post('/api/receptors', auth, getReceptors);
//router.get('/api/receptors', auth , getReceptors); // auth => Si el usuario no llega autorizado no ejecuta el metodo getUsers - .get consulta todos los receptores
//router.get('/api/receptors', auth, getReceptors);


module.exports = router;
