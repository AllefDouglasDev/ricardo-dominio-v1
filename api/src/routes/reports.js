const router = require('express').Router();

const reportController = require('../controllers/reportController');

router.post('/', reportController.createReport);
router.get('/company/:id', reportController.getCompany);
router.get('/companies', reportController.getCompanies);

module.exports = router;
