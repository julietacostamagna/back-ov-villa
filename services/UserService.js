const { db } = require('../models')

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
        const data = await db.User.findByPk(id)
        return data.get()
    } catch (error) {
        return { error: error.message }
    }
}
const getLevel = async (id) => {
    try {
        const data = await db.User_procoopMember.findOne({ where: { id_user: id } })
        return data
    } catch (error) {
        return { error: error.message }
    }
}
module.exports = { getUserxEmail, setTokenTemporal, RegisterAcept, verifyEmailToken, getUser, getLevel }
