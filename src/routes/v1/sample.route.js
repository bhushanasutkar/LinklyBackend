const express = require('express');
const validate = require('../../middlewares/validate');
const sampleValidation = require('../../validations/sample.validation');
const sampleController = require('../../controllers/sample.controller');

const router = express.Router();

router.post('/hello', validate(sampleValidation.hello), sampleController.hello);

module.exports = router;
