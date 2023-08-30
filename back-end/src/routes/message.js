const { MessageController } = require('../controllers/message');

const router = require('express').Router();

router.post('/send', MessageController.sendMessage);
router.post('/edit/:msgId', MessageController.editMessage);
router.post('/delete/:msgId', MessageController.deleteMessage);

module.exports = router;
