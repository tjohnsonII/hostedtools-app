const express = require('express');
const multer = require('multer');
const router = express.Router();
const strettoController = require('../controllers/strettoController');

const upload = multer();

// Change route to /stretto so full path is /upload/stretto
router.post('/stretto', upload.single('file'), strettoController.handleUpload);
router.get('/data/stretto', strettoController.getData);

module.exports = router;
