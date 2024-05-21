const { db } = require('../models')
const { Op } = require('sequelize')
const listState = async () => {
	try {
		const data = await db.State.findAll()
		return data
	} catch (error) {
		return { error: error.message }
	}
}
const listCity = async (id) => {
	try {
		const data = await db.City.findAll({ where: { COD_PCI: id } })
		return data
	} catch (error) {
		return { error: error.message }
	}
}
const addStreet = async (data) => {
	return db.sequelize.transaction(async (t) => {
		try {
			const { id_api, idCity, name } = data
			const existingStreet = await db.Street.findOne(
				{
					where: {
						id_api: id_api,
						name: {
							[Op.like]: `%${name}%`,
						},
					},
				},
				{ transaction: t }
			)
			if (existingStreet) {
				const existingRelation = await db.Street_City.findOne({ where: { CityId: parseInt(idCity), StreetId: parseInt(existingStreet.id) } }, { transaction: t })
				if (existingRelation) {
					throw new Error('Esta Calle ya existe en nuestra base de datos')
				} else {
					console.log({ status: true, StreetId: parseInt(existingStreet.id), CityId: parseInt(idCity) })

					return await db.Street_City.create({ status: true, StreetId: parseInt(existingStreet.id), CityId: parseInt(idCity) }, { transaction: t })
				}
			} else {
				const newStreet = await db.Street.create({ name: name, id_api: parseInt(id_api), id_procoop: null }, { transaction: t })
				console.log(newStreet, parseInt(newStreet.id), 'id de calle nueva')
				return await db.Street_City.create({ status: true, StreetId: parseInt(newStreet.id), CityId: parseInt(idCity) }, { transaction: t })
			}
		} catch (error) {
			return { error: error.message }
		}
	})
}
const listStreetsByCity = async (cityId) => {
	try {
		const streets = await db.Street.findAll({
			include: [
				{
					model: db.City,
					as: 'Cities',
					where: { id: cityId },
					through: {
						model: db.Street_City,
						as: 'StreetCities',
					},
					attributes: ['id', 'DES_LOC'],
				},
			],
			raw: true,
			nest: true,
		})
		return streets
	} catch (error) {
		return { error: error.message }
	}
}
const searchAddress = async (data) => {
	try {
		const Addresses = await db.Address.findOne({ where: { number_address: data.number_address, StreetId: data.StreetId, CityId: data.CityId, StateID: data.StateID } })
		return Addresses
	} catch (error) {
		return { error: error.message }
	}
}
const searchAddressxUser = async (id_user) => {
	try {
		const Person_Address = await db.Person_Address.findOne({ where: { UserId: id_user } })
		if (!Person_Address) {
			return null
		}
		const Addresses = await db.Address.findOne({
			include: [
				{
					model: db.City,
					as: 'City', // Asegúrate de que este alias coincida con el definido en tu modelo
					where: { id: db.Sequelize.col('Address.CityId') },
				},
				{
					model: db.Street,
					as: 'Street', // Asegúrate de que este alias coincida con el definido en tu modelo
					where: { id: db.Sequelize.col('Address.StreetId') },
				},
				{
					model: db.State,
					as: 'State', // Asegúrate de que este alias coincida con el definido en tu modelo
					where: { id: db.Sequelize.col('Address.StateId') },
				},
			],
			raw: true,
			nest: true,
		})

		return Addresses
	} catch (error) {
		return { error: error.message }
	}
}

module.exports = { listState, listCity, listStreetsByCity, addStreet, searchAddress, searchAddressxUser }
