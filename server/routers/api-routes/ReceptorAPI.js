const express = require('express');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const ReceptorController = require('../../controllers/ReceptorController')


//Llama Middlewares
const auth = require('../../midlewares/auth');



async function addReceptor(req, res) {
  try {
    
    const body= req.body;
   

    const response = await ReceptorController.addReceptor(body);
    if (response.err) {
      return res.status(500).send(response);
    }
    return res.status(200).send(response);
  } catch (err) {
    console.log('Error en ReceptorAPI :: addReceptor ::', err)
    return res.status(500).send({ err: 'Error inesperado' })
  }

}

async function getReceptors(req, res) {
  const
    {
      ID = '',
      company = ''
    } = req.body;


  const response = await ReceptorController.getReceptors({ ID, company }); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

router.post('/api/receptors', auth, getReceptors);
router.post('/api/receptors/add', auth, addReceptor)
//router.get('/api/receptors', auth , getReceptors); // auth => Si el usuario no llega autorizado no ejecuta el metodo getUsers - .get consulta todos los receptores
//router.get('/api/receptors', auth, getReceptors);


module.exports = router;
