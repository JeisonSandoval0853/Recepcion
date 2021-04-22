const Receptors = require('../db/model/Receptor')


const ReceptorController = {
 async getReceptors() {
    try {
      const receptors = await Receptors.find({});
      return receptors;
    } catch (error) {
      console.log('Error en ReceptorController :: getReceptors :: ',err)
      return { error: "Error al consultar los receptores" }
    }
  }
};

module.exports = ReceptorController;
