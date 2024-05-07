const User = require('../models/User.model.js')
const ScriptService = require('../services/ScriptService.js')

async function migrationUser(req, res) {
    try {
        const users = await ScriptService.listUser()
        for (const user in users) {
            await User.create({
                email: users[user].email,
                email_verified: users[user].date_update_pass ? new Date(users[user].date_update_pass) : new Date(),
                password: users[user].password
            })
        }
        return res.status(200).json(users)
    } catch (error) {
        res.json(error)
    }
}

// Más funciones según sea necesario...

module.exports = {
    migrationUser
}
