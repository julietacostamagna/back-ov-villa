const { sequelizeCoopm_v2 } = require('../database/MySQL.database.js')
const State = require('../models/state.js')
const { ListCity, ListState } = require('../services/ProcoopService.js')

async function migrationCity(req, res) {
    try {
        const Cities = await ListCity()
        const citiesOfi = []
        Cities.forEach((city) => {
            citiesOfi.push(
                {
                    COD_LOC: city.COD_LOC
                },
                {
                    DES_LOC: city.DES_LOC
                },
                {
                    COD_POS: city.COD_POS
                }
            )
        })

        return res.status(200).json(citiesOfi)
    } catch (error) {
        res.json(error)
    }
}
async function migrationState(req, res) {
    try {
        await sequelizeCoopm_v2.authenticate()
        const ListStates = await ListState()
        const listStateOfi = ListStates.map((item) => {
            return { COD_PRO: item.COD_PRO, DES_PRO: item.DES_PRO, COD_AFIP: item.COD_AFIP }
        })
        const resultadd = await State.bulkCreate(listStateOfi)
        return res.status(200).json(resultadd)
    } catch (error) {
        console.log(error)
        return res.json({ error, msj: 'error' })
    }
}

module.exports = {
    migrationCity,
    migrationState
}
