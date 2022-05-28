const express = require('express');
const { getUrl, postURL } = require('../controllers/shorturlController');
const router = express.Router();

// route post shorturl
router.route('/').post(postURL);

// route get shortUrl for redirect
router.route('/:id?').get(getUrl);

module.exports = router;
