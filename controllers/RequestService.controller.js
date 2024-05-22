const { createRequestService } = require('../services/ServiceRequestService')

const newRequestService = async (req, res) => {
	try {
		const { services } = req.body
		const { id } = req.user
		const result = await createRequestService(id, services)
		res.status(200).json(result)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = { newRequestService }
