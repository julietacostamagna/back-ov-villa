const UserDesarrollo = require('../models/UserDesarrollo.model')

exports.listUser = async () => {
    const users = await UserDesarrollo.findAll()
    if (!users) {
        throw new Error('El usuario no existe')
    }
    const data = users.map((user) => user.get())
    return data
}
