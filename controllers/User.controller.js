const { ListCity } = require('../services/ProcoopService.js')
const { Persona_x_COD_SOC } = require('../services/ProcoopService.js')
const ScriptService = require('../services/ScriptService.js')

async function migrationUser(req, res) {
    try {
        const users = await ScriptService.listUser()
        const userMigrate = []
        const personal_data = []
        const person_physical = []
        // const usersProcoop = await Persona_x_COD_SOC(users[6].number_customer)
        for (const user in users) {
            const usersProcoop = await Persona_x_COD_SOC(users[user].number_customer || 0)
            userMigrate.push({
                mail_procoop: usersProcoop[0]?.EMAIL || '',
                cell_phone: usersProcoop[0]?.CELL || '',
                fixed_phone: usersProcoop[0]?.TELEFONO || '',
                id_type_perso_procop: usersProcoop[0]?.TIP_PERSO || '',
                id_situation_procop: usersProcoop[0]?.COD_PRO || '',
                blood_type: usersProcoop[0]?.GRU_SGR || '',
                factor: usersProcoop[0]?.FAC_SGR || '',
                donor: usersProcoop[0]?.DAD_SGR || ''
            })
            person_physical.push({
                name: usersProcoop[0]?.APELLIDOS || '',
                last_name: usersProcoop[0]?.APELLIDOS || '',
                type_dni: usersProcoop[0]?.TIP_DNI || '',
                num_dni: usersProcoop[0]?.NUM_DNI || '',
                burn_date: usersProcoop[0]?.FEC_NAC || '',
                validation_renaper: 0
            })
            personal_data.push({
                name: users[user].first_name,
                last_name: users[user].last_name,
                email: users[user].email,
                number_customer: users[user].number_customer,
                email_verified: users[user].date_update_pass ? new Date(users[user].date_update_pass) : new Date(),
                password: users[user].password
            })
        }
        const data = { users: userMigrate, person_physical: person_physical, personal_data: personal_data }
        return res.status(200).json(data)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    migrationUser
}
