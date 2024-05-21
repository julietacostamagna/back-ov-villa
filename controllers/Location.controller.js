const { listState, listCity, listStreetsByCity, addStreet } = require('../services/locationServices')

async function getListState(req, res) {
    try {
        const result = await listState()
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function getListCity(req, res) {
    try {
        const { id } = req.query
        const result = await listCity(id)
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function getListStreet(req, res) {
    try {
        const { id } = req.query
        const result = await listStreetsByCity(id)
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function newStreet(req, res) {
    try {
        const result = await addStreet(req.body)
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = { getListState, getListCity, getListStreet, newStreet }
