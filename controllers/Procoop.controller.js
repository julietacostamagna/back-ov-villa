const City = require('../models/city.js')
const State = require('../models/state.js')
const { ListCity, ListState, empresaPorCuit, personaPorDni } = require('../services/ProcoopService.js')

async function searchByDNI(req, res) {
    const { dni } = req.body
    try {
        const result = await personaPorDni(dni)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error, msj: error.messagge })
    }
}

async function searchByCuit(req, res) {
    const { cuit } = req.body
    try {
        const result = await empresaPorCuit(cuit)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.json({ error, msj: 'error' })
    }
}

async function migrationCity(req, res) {
    try {
        const listCities = await ListCity()
        let citiesOfi = []
        if (listCities) {
            citiesOfi = await listCities.map((item) => {
                return { COD_LOC: item.COD_LOC, DES_LOC: item.DES_LOC, COD_POS: item.COD_POS, COD_PCI: item.COD_PCI }
            })
        }
        const resultadd = await City.bulkCreate(citiesOfi)
        return res.status(200).json(resultadd)
    } catch (error) {
        console.log(error)
        return res.json({ error, msj: 'error' })
    }
}
async function migrationState(req, res) {
    try {
        const ListStates = await ListState()
        let listStateOfi = []
        if (ListStates) {
            listStateOfi = await ListStates.map((item) => {
                return { COD_PRO: item.COD_PRO, DES_PRO: item.DES_PRO, COD_AFIP: item.COD_AFIP }
            })
        }
        const resultadd = await State.bulkCreate(listStateOfi)
        return res.status(200).json(resultadd)
    } catch (error) {
        console.log(error)
        return res.json({ error, msj: 'error' })
    }
}

module.exports = {
    searchByCuit,
    searchByDNI,
    migrationCity,
    migrationState
}
