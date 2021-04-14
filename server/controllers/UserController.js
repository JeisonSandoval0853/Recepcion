const User = require('../db/model/User')

//Logica de negocio
const UserController = {
  async addUser(user, email, firstName, lastName, phone, company, ID, password) {
    //Le pasa al usuario los campos del esquema
    const newUser = new User({user, email, firstName, lastName, phone, company, ID, password })
    try {
      return await newUser.save();
    } catch (error) {
      console.log('Error en UserController :: addUser :: ',err)
      return { error: "Error al guardar el usuario" }
    }
  },
  async getUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.log('Error en UserController :: getUser :: ',err)
      return { error: "Error al consultar los usuarios" }
    }
  },
  validateUser() {
    return null;
  }
};

module.exports = UserController;
