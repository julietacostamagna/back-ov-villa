const { db } = require('../models')
const { Persona_x_COD_SOC } = require('./ProcoopService')

const getUserxEmail = async (email) => {
    try {
        const user = await db.User.findOne({ where: { email: email } })
        if (!user) throw new Error('El email no existe')
        return user
    } catch (error) {
        return { error: error.message }
    }
}
const setTokenTemporal = async (id, tokenTemp) => {
    try {
        const user = await db.User.findOne({ where: { id: id } })
        if (!user) throw new Error('El usuario no existe')
        user.update({ token_temp: tokenTemp })
        return user
    } catch (error) {
        return { error: error.message }
    }
}
const verifyEmailToken = async (tokenTemp, id) => {
    try {
        const user = await db.User.findOne({ where: { id: id, token_temp: tokenTemp } })
        if (!user) throw new Error('El token expiro o no existe')
        return user
    } catch (error) {
        return { error: error.message }
    }
}
const RegisterAcept = async (user) => {
    try {
        await user.update({ email_verified: new Date(Date.now()), token_temp: null })
        return true
    } catch (error) {
        return { error: error.message }
    }
}
const getUser = async (id) => {
    try {
        const data = await db.User.findOne({ where: { id, status: 1 } })
        if (data) {
            // Clonamos dataValues para no modificar el objeto original
            const result = { ...data.dataValues }
            // Eliminamos los campos que no queremos en el resultado
            delete result.password
            delete result.token_temp
            delete result.createdAt
            delete result.updatedAt
            // Agrega aquí cualquier otro campo que desees eliminar
            return result
        }
        return null // o manejar como prefieras si el usuario no se encuentra
    } catch (error) {
        return { error: error.message }
    }
}
const updateLvl2 = async (user, dataUpdate) => {
    return sequelize.transaction(async (t) => {
        try {
            let dataUser
            if (user.typePerson === 1) {
                dataUser = {
                    name: user.name_register,
                    last_name: user.lastName_register,
                    type_dni: dataUpdate.document_type,
                    num_dni: dataUpdate.document_number,
                    born_date: new Date(`${dataUpdate.birthdate} `), // Se agrega espacio para que guarde el dia con el -3 horas sino le resta las 3 horas y pone un dia antes
                    validation_renaper: dataUpdate.validation_renaper || null,
                    fixed_phone: dataUpdate.fixed_phone || null,
                    cell_phone: `+549${dataUpdate.phoneCaract}${dataUpdate.numberPhone}`,
                    SexId: dataUpdate.sex,
                }
                // const person = await db.Person_physical.create( dataUser, { transaction: t })
                // const userDetail = await db.User_Detail.create({ id_user: user.id, id_person_physical: person.id }, { transaction: t })
            } else {
            }
            const dataProcoop = await Persona_x_COD_SOC(dataUpdate.number_customer)
            const dataProcoopMember = {
                mail_procoop: dataProcoop[0].EMAIL,
                cell_phone: dataProcoop[0].TELEFONO,
                fixed_phone: dataProcoop[0].TELEFONO,
                id_type_procoop: dataProcoop[0].TIP_PERSO,
                id_situation_procoop: dataProcoop[0].COD_SIT,
                blood_type: dataProcoop[0].GRU_SGR,
                factor: dataProcoop[0].FAC_SGR,
                donor: dataProcoop[0].DAD_SGR,
                name: dataProcoop[0].NOMBRES,
                last_name: dataProcoop[0].APELLIDOS,
                type_dni: dataProcoop[0].TIP_DNI,
                num_dni: dataProcoop[0].NUM_DNI,
                born_date: new Date(`${dataProcoop[0].FEC_NAC} `),
            }

            const ProcoopMember = { id: 1 }
            // const ProcoopMember = await db.Procoop_Member.create(dataProcoopMember, { transaction: t })
            const dataUserProcoop = {
                id_user: user.id,
                id_procoop_member: ProcoopMember.id,
                level: 2,
                primary_account: true,
                status: true,
            }
            // const userProcoopMember = await db.User_Detail.create(dataUserProcoop, { transaction: t })
            const address = {
                number_address: dataUpdate.nroAddress,
                floor: dataUpdate.nroAddress || null,
                dpto: dataUpdate.nroAddress || null,
                postal_code: dataUpdate.nroAddress || null,
                google_address: dataUpdate.nroAddress || null,
                owner_name: dataUser.name || null,
                owner_last_name: dataUser.last_name || null,
                owner_num_dni: dataUser.num_dni || null,
                StreetId: dataUpdate.address,
                CityId: dataUpdate.id_cities,
                StateId: dataUpdate.id_state,
            }
            return { address, dataUpdate, dataUser, dataUserProcoop, dataProcoop, dataProcoopMember }
        } catch (error) {
            return { error: error.message }
        }
    })
}
const getLevel = async (id) => {
    try {
        const data = await db.User_procoopMember.findOne({ where: { id_user: id } })
        return data
    } catch (error) {
        return { error: error.message }
    }
}
module.exports = { getUserxEmail, setTokenTemporal, RegisterAcept, verifyEmailToken, getUser, getLevel, updateLvl2 }
