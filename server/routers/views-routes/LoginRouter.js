const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/UserController')

function renderLogin(req, res) {
  res.render('login', { layout: null })
}

async function validateUser(req, res) {
  try {
    const { email, password } = req.body;
    const response = await UserController.validateUser(email, password);
    if(response.error){
      throw new Error();
    }
    res.cookie('Authorization', 'Bearer '+ response.token);
    res.redirect(301, 'dashboard');
  } catch (err) {
res.status(400).render('login', { layout: null, error: 'Usuario no encontrado'})
  }
}

router.get('/login', renderLogin);
router.post('/login', validateUser);

module.exports = router;
