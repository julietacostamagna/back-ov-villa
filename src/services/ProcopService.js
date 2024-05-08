const { sequelize } = require('../database/MSSQL.database')

// const testConection = async () => {
//     try {
//         await sequelize.authenticate()
//         console.log('CONEXIÓN EXITOSA')
//     } catch (error) {
//         console.error('ERROR DE PROCOOP:', error)
//     }
// }

const personaPorDni = async (dni) => {
    try {
        const query = `SELECT * FROM personas WHERE NUM_DNI = :dni AND TIP_PERSO = 1`
        const result = await sequelize.query(query, {
            replacements: { dni: dni },
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length === 0) {
            // Retorno un objeto con un mensaje de error
            return { error: 'No se encontró la persona' }
        }
        return result
    }
    catch (error) {
        console.error('ERROR DE PROCOOP:', error)
    }
}

const empresaPorCuit = async (cuit) => {
    try {
        const query = `SELECT * FROM personas WHERE NUM_DNI = :cuit AND TIP_PERSO = 2`
        const result = await sequelize.query(query, {
            replacements: { cuit: cuit },
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length === 0) {
            return { error: 'No se encontró la empresa' }
        }
        return result
    }
    catch (error) {
        console.error('ERROR DE PROCOOP:', error)
    }
}

module.exports = {
    personaPorDni,
    empresaPorCuit
}