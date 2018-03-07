let express = require('express'),
	warmingController = require('../controllers/warmingController'),
	router = express.Router()

/* GET home page. */
router.get('/warming_by/:user', warmingController.warming )

module.exports = router
