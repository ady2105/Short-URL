const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetURL, handleGetQR } = require('../controllers/url');

const router = express.Router();

router
.post('/', handleGenerateNewShortURL)

.get("/analytics/:shortId", handleGetAnalytics)

.get('/qr/:shortId', handleGetQR)

.get('/:shortId', handleGetURL)


module.exports = router