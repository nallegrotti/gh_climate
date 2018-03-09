const warmingService = require('../services/warmingService'),
	  Q = require('q')

const self = {}

self.warming = (req, res, next) => {
	let user = req.params.user

	warmingService.getUserWarming(user)
		.then(userInfo => {
			res.json(userInfo)
		})
		.catch(err => {
			err.status = 500
			next(err)
		})
}

module.exports = self