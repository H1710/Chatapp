const { MessageController } = require('../controllers/message');

const router = require('express').Router();

router.post('/send', MessageController.sendMessage);

module.exports = router;
