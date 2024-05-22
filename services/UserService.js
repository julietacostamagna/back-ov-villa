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
	return db.sequelize.transaction(async (t) => {
		try {
			let dataUser
			let userDetail
			let person
			if (user.typePerson === 1) {
				dataUser = {
					name: user.name_register,
					last_name: user.lastName_register,
					type_dni: dataUpdate.document_type,
					num_dni: dataUpdate.document_number,
					born_date: new Date(`${dataUpdate.birthdate} `), // Se agrega espacio para que guarde el dia con el -3 horas sino le resta las 3 horas y pone un dia antes
					validation_renaper: dataUpdate.validation_renaper || null,
					fixed_phone: dataUpdate.fixed_phone || null,
					cell_phone: `${dataUpdate.phoneCaract} ${dataUpdate.numberPhone}`,
					SexId: dataUpdate.sex,
				}
				const existPerson = await db.Person_physical.findOne({ where: { num_dni: dataUser.num_dni } })
				if (!existPerson) {
					person = await db.Person_physical.create(dataUser, { transaction: t })
				} else {
					person = await existPerson.update(dataUser, { transaction: t })
				}
				const existUserDetail = await db.User_Detail.findOne({ where: { id_user: user.id, id_person_physical: person.id } })
				if (!existUserDetail) {
					userDetail = await db.User_Detail.create({ id_user: user.id, id_person_physical: person.id }, { transaction: t })
				}
			} else {
				dataUser = {
					social_raeson: dataUpdate.name_register,
					fantasy_name: dataUpdate.lastName_register,
					cuit: dataUpdate.document_number,
					date_registration: new Date(`${dataUpdate.birthdate} `),
					legal_address: dataUpdate.legal_address || null,
					num_address: dataUpdate.num_address || null,
				}
				const existPerson = await db.Person_legal.findOne({ where: { cuit: dataUser.cuit } })
				if (!existPerson) {
					person = await db.Person_legal.create(dataUser, { transaction: t })
				} else {
					person = await existPerson.update(dataUser, { transaction: t })
				}
				const existUserDetail = await db.User_Detail.findOne({ where: { id_user: user.id, id_person_legal: person.id } })
				if (!existUserDetail) {
					userDetail = await db.User_Detail.create({ id_user: user.id, id_person_legal: person.id }, { transaction: t })
				}
			}
			const existProcoopMember = await db.Procoop_Member.findOne({ where: { number_customer: dataUpdate.number_customer } })
			let ProcoopMember
			if (!existProcoopMember) {
				const dataProcoop = await Persona_x_COD_SOC(dataUpdate.number_customer)
				const dataProcoopMember = {
					number_customer: dataUpdate.number_customer,
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
				ProcoopMember = await db.Procoop_Member.create(dataProcoopMember, { transaction: t })
			} else {
				ProcoopMember = existProcoopMember
			}
			const dataUserProcoop = {
				id_user: user.id,
				id_procoop_member: ProcoopMember.id,
				level: 2,
				primary_account: true,
				status: true,
			}
			const existUserProcoop = await db.User_procoopMember.findOne({ where: { id_user: user.id, id_procoop_member: ProcoopMember.id } })
			if (!existUserProcoop) {
				await db.User_procoopMember.create(dataUserProcoop, { transaction: t })
			} else {
				await existUserProcoop.update(dataUserProcoop, { transaction: t })
			}
			const city = await db.City.findOne({ where: { COD_LOC: dataUpdate.CityId } }, { transaction: t })
			const state = await db.State.findOne({ where: { COD_PRO: dataUpdate.StateId } }, { transaction: t })
			const address = {
				number_address: dataUpdate.number_address,
				floor: dataUpdate.floor || null,
				dpto: dataUpdate.dpto || null,
				postal_code: dataUpdate.postal_code || null,
				google_address: dataUpdate.google_address || null,
				owner_name: dataUser.owner_name || null,
				owner_last_name: dataUser.owner_last_name || null,
				owner_num_dni: dataUser.owner_num_dni || null,
				StreetId: dataUpdate.StreetId,
				CityId: city.id,
				StateId: state.id,
			}
			const existAddress = await db.Address.findOne({ where: { number_address: address.number_address, CityId: address.CityId, StateId: address.StateId, StreetId: address.StreetId } }, { transaction: t })
			let addressCreate
			if (!existAddress) {
				addressCreate = await db.Address.create(address, { transaction: t })
			} else {
				addressCreate = await existAddress.update(address, { transaction: t })
			}
			const dataUserAddress = { status: true, UserId: user.id, AddressId: addressCreate.id, Procoop_MembersId: ProcoopMember.id }
			const existUserAddress = await db.Person_Address.findOne({ where: { UserId: dataUserAddress.UserId, AddressId: dataUserAddress.AddressId } })
			let userAddress
			if (!existUserAddress) {
				userAddress = await db.Person_Address.create(dataUserAddress, { transaction: t })
			} else {
				await existUserAddress.update(dataUserAddress, { transaction: t })
			}
			return { userAddress, addressCreate, userProcoopMember, ProcoopMember, userDetail, person }
		} catch (error) {
			throw error
		}
	})
}
const getLevel = async (id) => {
	try {
		const data = await db.User_procoopMember.findAll({ where: { id_user: id } })
		return data
	} catch (error) {
		return { error: error.message }
	}
}
const saveUser = async (userData) => {
	try {
		const { id, ...data } = userData
		let user
		if (id) {
			user = await db.User.findOne({ where: { id } })
			if (!user) throw new Error('El usuario no existe')
			await user.update(data)
		} else {
			user = await db.User.create(data)
		}
		return user
	} catch (error) {
		return { error: error.message }
	}
}
const getUserxDni = async (dni) => {
	try {
		user = await db.Person_physical.findOne({
			where: { num_dni: dni },
			include: [
				{
					model: db.TypeSex,
					as: 'TypeSex', // Asegúrate de que este alias coincida con el definido en tu modelo
				},
			],
		})
		return user.get()
	} catch (error) {
		return { error: error.message }
	}
}
module.exports = { getUserxEmail, setTokenTemporal, RegisterAcept, verifyEmailToken, getUser, getLevel, updateLvl2, saveUser, getUserxDni }
