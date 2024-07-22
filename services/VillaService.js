const { QueryTypes } = require('sequelize')
const { SequelizeVilla } = require('../database/MSSQL.database')
const { db } = require('../models')

const Cliente_x_code = async (numberCustomer) => {
	try {
		if (!numberCustomer) throw new Error('falta pasar el numero de socio')
		const user = await db.Person.findOne({ where: { number_customer: numberCustomer }, include: [{ association: 'Person_physical' }, { association: 'Person_legal' }] })
		if (user) return user.get()
		const query = `SELECT * FROM clientes WHERE codigo = :numberCustomer`
		const result = await SequelizeVilla.query(query, {
			replacements: { numberCustomer: numberCustomer },
			type: QueryTypes.SELECT,
		})
		if (result.length === 0) {
			throw new Error('No se encontro socio')
		}
		// const query2 = `SELECT * FROM personas WHERE COD_PER = ${result[0].cod_per}`
		// const result2 = await SequelizeMorteros.query(query2, {
		// 	type: QueryTypes.SELECT,
		// })
		// if (result2.length === 0) {
		// 	throw new Error('No se encontro Persona con ese numero de socio')
		// }
		return result
	} catch (error) {
		throw error
	}
}

const debtsCustomerVilla = async (number, all = false) => {
	try {
		const query = `SELECT * FROM vencimientoscobrar 
                       WHERE cliente = :number ${all ? '' : 'AND importe > 0'} 
                       ORDER BY fechaComprobante DESC`;
					   		//   const query = `SELECT  * FROM  vencimientoscobrar 
                //   WHERE cliente = :number AND fechaComprobante  >= Dateadd(mm,-13,Getdate()) ${all ? '' : 'AND importe > 0'} 
                //   ORDER BY fechaComprobante DESC`

		const result = await SequelizeVilla.query(query, {
			// replacements: { number: number },
			replacements: { number: number },
			type: SequelizeVilla.QueryTypes.SELECT,
		});

		return result;
	} catch (error) {
		throw error;
	}
}


module.exports = {
	Cliente_x_code,
	debtsCustomerVilla
}