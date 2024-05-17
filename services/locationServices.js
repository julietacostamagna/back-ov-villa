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
    return sequelize.transaction(async (t) => {
        try {
            let newRelation
            const { id_api, idCity, name } = data
            const dataCity = await db.Street.findOne({
                where: {
                    id_api: id_api,
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
            if (dataCity) {
                const dataRelation = await db.Street_City.findOne({ where: { CityId: parseInt(idCity), StreetId: parseInt(dataCity.id) } })
                if (dataRelation) {
                    throw new Error('Esta Calle ya existe en nuestra base de datos')
                } else {
                    newRelation = await db.Street_City.create({ status: true, StreetId: parseInt(dataCity.id), CityId: parseInt(idCity) }, { transaction: t })
                }
            } else {
                console.log({ name: name, id_api: parseInt(id_api) })
                const newStreet = await db.Street.create({ name: name, id_api: parseInt(id_api), id_procoop: null }, { transaction: t })
                newRelation = await db.Street_City.create({ status: true, StreetId: parseInt(newStreet.id), CityId: parseInt(idCity) }, { transaction: t })
            }
            return newRelation
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
                        attributes: []
                    }
                }
            ],
            raw: true
        })
        return streets.map((street) => street['Cities.StreetCities'])
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = { listState, listCity, listStreetsByCity, addStreet }
