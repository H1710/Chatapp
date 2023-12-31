const { SearchController } = require('../controllers/search');

const router = require('express').Router();

router.get('/fullname/:userId/:fullname', SearchController.findByFullname);

export default router;
