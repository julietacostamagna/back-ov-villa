const { sequelize } = require('../database/MSSQL.database')
const conexionProcoop = async () => {
    try {
        await sequelize.authenticate()
        console.log('CONEXIÓN EXITOSA')
    } catch (error) {
        console.error('ERROR DE MIERDACOOP:', error)
    }
}
const Persona_x_COD_SOC = async (numberCustomer) => {
    try {
        const query = `SELECT * FROM socios  WHERE cod_soc = :numberCustomer`
        const result = await sequelize.query(query, {
            replacements: { numberCustomer: numberCustomer },
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length === 0) {
            // Retorno un objeto con un mensaje de error
            return { error: 'No se encontró la persona' }
        }
        const query2 = `SELECT * FROM personas WHERE COD_PER = ${result[0].cod_per}`
        const result2 = await sequelize.query(query2, {
            type: sequelize.QueryTypes.SELECT
        })
        if (result2.length === 0) {
            // Retorno un objeto con un mensaje de error
            return { error: 'No se encontró la persona' }
        }
        return result2
    } catch (error) {
        console.error('ERROR DE PROCOOP:', error)
    }
}
const ListCity = async () => {
    try {
        const query = `SELECT * FROM localida`
        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length === 0) {
            // Retorno un objeto con un mensaje de error
            return { error: 'No se encontró la persona' }
        }
        return result
    } catch (error) {
        console.error('ERROR DE PROCOOP:', error)
    }
}
const ListState = async () => {
    try {
        const query = `SELECT * FROM PROVINC`
        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length === 0) {
            // Retorno un objeto con un mensaje de error
            return { error: 'No se encontró la persona' }
        }
        return result
    } catch (error) {
        console.error('ERROR DE PROCOOP:', error)
    }
}
module.exports = {
    conexionProcoop,
    Persona_x_COD_SOC,
    ListCity,
    ListState
}
