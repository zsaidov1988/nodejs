const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/user/:id', authMiddleware, userController.getUser);
router.get('/user', authMiddleware, userController.getUsers);


module.exports = router;