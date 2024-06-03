const { getCommentaries, saveCommentary, getPopups, savePopup } = require('../services/ManagmentService')

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

async function Popups(req, res) {
	try {
		const id = req.query.id || false
		const popups = await getPopups(id)
		res.status(200).json(popups)
	} catch (error) {
		res.status(400).json(error.message)
	}
}

async function addPopup(req, res) {
	try {
		const popup = req.body
		const newPopup = await savePopup(popup)
		res.status(200).json(newPopup)
	} catch (error) {
		res.status(400).json(error.message)
	}
}

module.exports = {
	Commentaries,
	addCommentary,
	Popups,
	addPopup,
}
