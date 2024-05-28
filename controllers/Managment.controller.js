const { getCommentaries, saveCommentary } = require('../services/ManagmentService')

async function Commentaries(req, res) {
	try {
		const commentaries = await getCommentaries()
		res.status(200).json(commentaries)
	} catch (error) {
		res.status(400).json(error.message)
	}
}

async function addCommentary(req, res) {
	try {
		const commentary = req.body
		const newCommentary = await saveCommentary(commentary)
		res.status(200).json(newCommentary)
	} catch (error) {
		res.status(400).json(error.message)
	}
}

module.exports = {
	Commentaries,
	addCommentary,
}
