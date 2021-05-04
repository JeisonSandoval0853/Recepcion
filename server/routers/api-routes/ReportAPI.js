const express = require('express');
const { Redirect } = require('react-router');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const ReportController = require('../../controllers/ReportControlllers')


//Llama Middlewares
const auth = require('../../midlewares/auth');

async function addReport(req, res) {
  try {

    const body = req.body;
    const report = {
      receptorID: body.receptorID,
      emailReceptor: body.emailReceptor,
      documentID: body.documentID,
      dateReception: body.dateReception,
      supplierID: body.supplierID,
      emailSupplier: body.emailSupplier,
      validateElementXML: [{
        name: body.name,
        value: body.value,
        codeError: body.codeError,
        descriptionError: body.descriptionError
      }],
      statusDocument: body.statusDocument,
      nameXML: body.nameXML
    }
    
    const response = await ReportController.addReport(report);
    if (response.err) {
      return res.status(500).send(response);
    }
    
    return res.status(200).send(response)
    
  } catch (err) {
    console.log('Error en ReportAPI :: addReport ::', err)
    return res.status(500).send({ err: 'Error inesperado' })
  }

}


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
router.post('/api/reports/add', auth, addReport)

module.exports = router;
