const express = require('express');
const uploadAPI = require('./upload');

const router = express.Router();
router.get('/health',(req,res) => {
  res.status(200).send('health');
})
router.use('/',uploadAPI);

module.exports = router;