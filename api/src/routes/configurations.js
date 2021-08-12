const router = require('express').Router();

const configurationController = require('../controllers/configurationController');

router.get('/ipDominioServer', configurationController.getIpDominio);
router.post('/ipDominioServer', configurationController.updateIpDominio);

module.exports = router;
