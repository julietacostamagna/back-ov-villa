const { sequelize } = require('../database/MSSQL.database')
const conexionProcoop = async () => {
    try {
        await sequelize.authenticate()
        console.log('CONEXIÓN EXITOSA')
    } catch (error) {
        console.error('ERROR DE MIERDACOOP:', error)
    }
}

module.exports = {
    conexionProcoop
}
