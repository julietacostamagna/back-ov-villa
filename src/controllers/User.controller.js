const userService = require('../services/UserService.js')

async function getUser(req, res) {
    const id = req.params.id
    const user = await userService.getUserById(id)
    res.json(user)
}

// Más funciones según sea necesario...

module.exports = {
    getUser,
    updateUser
    // Exporta las demás funciones aquí...
}
