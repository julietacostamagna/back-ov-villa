const { conexionProcoop } = require('../services/ProcoopService.js')
const ScriptService = require('../services/ScriptService.js')

async function migrationUser(req, res) {
    try {
        const users = await ScriptService.listUser()
        const usersProcoop = await conexionProcoop()
        const userMigrate = []
        const personal_data = []
        for (const user in users) {
            userMigrate.push({
                mail_procoop: '',
                cell_phone: users[user].name,
                fixed_phone: users[user].name,
                id_type_perso_procop: users[user].name,
                id_situation_procop: users[user].name,
                blood_type: users[user].name,
                factor: users[user].name,
                donor: users[user].name
            })
            personal_data.push({
                name: users[user].first_name,
                last_name: users[user].last_name,
                email: users[user].email,
                email_verified: users[user].date_update_pass ? new Date(users[user].date_update_pass) : new Date(),
                password: users[user].password
            })
        }
        const data = { users: userMigrate, personal_data: personal_data }
        return res.status(200).json(usersProcoop)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    migrationUser
}
