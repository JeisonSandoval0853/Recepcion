const express = require('express');
const { Redirect } = require('react-router');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const ReportController = require('../../controllers/ReportControlllers')


//Llama Middlewares
const auth = require('../../midlewares/auth');

async function getReport(req, res) {
 
  const
    {
      receptorID = '',
      documentID = ''
    } = req.body;


  const response = await ReportController.getReport({ receptorID, documentID }); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

router.get('/api/reports', auth, getReport);

module.exports = router;
