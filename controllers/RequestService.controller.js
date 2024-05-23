const { createRequestService, getRequestServiceByUser } = require('../services/ServiceRequestService')

const newRequestService = async (req, res) => {
	try {
		const { services } = req.body
		const { id } = req.user
		const result = await createRequestService(id, services)
		res.status(200).json(result)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getRequestsByUser = async (req, res) => {
	try {
		const { id } = req.user
		const requests = await getRequestServiceByUser(id)
		res.status(200).json(requests)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = { newRequestService, getRequestsByUser }
