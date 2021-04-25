const Receptors = require('../db/model/Receptor')

/*
const ReceptorController = {// consulta todos los receptores
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
*/
const ReceptorController = {
  async getReceptors({filters = {} }) {//recibe el obehecto filters para una consulta mas segmentada a la BD - {} por defecto un objecto vacio
     try {
       const receptors = await Receptors.find({filters});
       return receptors;
     } catch (error) {
       console.log('Error en ReceptorController :: getReceptors :: ',err)
       return { error: "Error al consultar los receptores" }
     }
   }
 }; 


module.exports = ReceptorController;
