const express = require('express');

const router = express.Router();
const validate = require('../../middlewares/validate');
const sampleValidation = require('../../validations/sample.validation');
const sampleController = require('../../controllers/sample.controller');

router.get('/hello', sampleController.helloGet);
router.post('/hello', validate(sampleValidation.hello), sampleController.hello);

router.get('/testapi', function (req, res) {
  res.json('Testing Successfull');
});

module.exports = router;
