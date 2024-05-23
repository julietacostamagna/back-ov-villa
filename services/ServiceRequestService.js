const { db } = require('../models')

const createRequestService = async (userID, services) => {
	const t = await db.sequelize.transaction()
	try {
		const serviceRequest = {
			user_id: userID,
			status: 1,
		}
		const requestService = await db.Service_Request.create(serviceRequest, { transaction: t })

		const servicesToSave = services
			.filter((service) => service.tipo !== 0)
			.map((service) => ({
				service_request_id: requestService.id,
				service_form_id: 1,
				service_type: service.tipo,
				status: 1,
				service_name: service.nombre,
			}))

		await db.Service_Items.bulkCreate(servicesToSave, { transaction: t })

		await t.commit()

		return requestService
	} catch (error) {
		await t.rollback()
		throw error
	}
}

const getRequestServiceByUser = async (userID) => {
	const requests = await db.Service_Request.findAll({
		where: { user_id: userID },
		include: [
			{
				model: db.Service_Items,
				as: 'items',
			},
		],
	})

	return requests
}

module.exports = { createRequestService, getRequestServiceByUser }
