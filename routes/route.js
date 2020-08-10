const express = require ('express');
const router = express.Router();

const imageController = require('../controllers/controller');
const upload = require ('../middleware/multer');


router.post('/addImage', upload.any(), imageController.createImage);


module.exports = router;