const express = require('express');

// const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/UserController')//Llama al controlador

async function addUser(req, res) {
  try {
    const { user, email, firstName, lastName, phone, company, ID, password } = req.body;
    const response = await UserController.addUser(user, email, firstName, lastName, phone, company, ID, password);
    if (response.err) {
      return res.status(500).send(response);
    }
    return res.status(200).send(response);
  } catch (err) {
    console.log('Error en UserAPI :: addUser ::', err)
    return res.status(500).send({ err: 'Error inesperado' })
  }

}

async function getUsers(req, res) {
  const response = await UserController.getUsers();
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

router.post('/api/users/add', addUser);
router.get('/api/users', getUsers);

module.exports = router;
