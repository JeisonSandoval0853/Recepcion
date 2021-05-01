const Report = require('../db/model/Report')

const ReportController = {
  async getReport(filters = {} ) {//recibe el obehecto filters para una consulta mas segmentada a la BD - {} por defecto un objecto vacio
    try {
      let query = {};
      for (const key in filters) {
        if (filters[key].length > 0) {
          query[key] = new RegExp(filters[key], 'i')
        }
      }
      const report = await Report.find(query);
      return report;
    } catch (err) {
      console.log('Error en ReceptorController :: getReceptors :: ',err)
      return { err: "Error al consultar los receptores" }
    }
  }
};

module.exports = ReportController;
