const { ListCity } = require('../services/ProcoopService.js')
const { Persona_x_COD_SOC } = require('../services/ProcoopService.js')
const ScriptService = require('../services/ScriptService.js')
const { verifyEmailToken } = require('../services/UserService.js')


const user = (req, res) => {
}

async function migrationUser(req, res) {
    try {
        const users = await ScriptService.listUser()
        const userMigrate = []
        const User_procoopmembers = []
        const person_physical = []
        const procoopmembers = []
        // const usersProcoop = await Persona_x_COD_SOC(users[6].number_customer)
        for (const user in users) {
            const usersProcoop = await Persona_x_COD_SOC(users[user].number_customer || 0)
            userMigrate.push({
                name_register: users[user].first_name,
                lastName_register: users[user].last_name,
                email: users[user].email,
                email_verified: users[user].date_input ? new Date(users[user].date_input) : '',
                password: users[user].password,
                img_profile: users[user].img,
                dark: users[user].dark
            })
            if (usersProcoop.length > 0) {
                procoopmembers.push({
                    mail_procoop: usersProcoop[0]?.EMAIL || '',
                    cell_phone: usersProcoop[0]?.CELL || '',
                    fixed_phone: usersProcoop[0]?.TELEFONO || '',
                    id_type_perso_procop: usersProcoop[0]?.TIP_PERSO || '',
                    id_situation_procop: usersProcoop[0]?.COD_PRO || '',
                    blood_type: usersProcoop[0]?.GRU_SGR || '',
                    factor: usersProcoop[0]?.FAC_SGR || '',
                    donor: usersProcoop[0]?.DAD_SGR || '',
                    name: usersProcoop[0]?.NOMBRES || '',
                    last_name: usersProcoop[0]?.APELLIDOS || '',
                    type_dni: usersProcoop[0]?.TIP_DNI || '',
                    num_dni: usersProcoop[0]?.NUM_DNI || '',
                    burn_date: new Date(usersProcoop[0]?.FEC_NAC) || ''
                })
                User_procoopmembers.push({ id_user: userMigrate.length, id_procoopmembers: procoopmembers.length, level: users[user].level, primary_account: true, status: true })
            }
            person_physical.push({
                name: users[user].first_name,
                last_name: users[user].last_name,
                type_dni: users[user].document_type,
                num_dni: users[user].document_number,
                burn_date: users[user].birthday ? new Date(users[user].birthday) : '',
                validation_renaper: users[user].check_lvl_3 || '',
                fixed_phone: '',
                cell_phone: users[user].phone,
                sex: users[user].sex
            })
        }
        const data = { users: userMigrate, person_physical: person_physical, procoopmembers: procoopmembers, User_procoopmembers: User_procoopmembers }
        return res.status(200).json(data)
    } catch (error) {
        res.json(error)
    }
}

async function tokenVerify(req, res) {
    try {
        const { token, id } = req.query
        if (!token) throw new Error('Se debe pasar el token.')
        const user = await verifyEmailToken(token, id)
        if (!user) throw new Error('El usuario no existe o ya ha sido validado.')
        res.status(200).json(true)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    migrationUser,
    tokenVerify
}
