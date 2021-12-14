const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.delete('/:id', checkRole('ADMIN'), brandController.delete);
router.put('/:id', checkRole('ADMIN'), brandController.update);
router.get('/', brandController.getAll);


module.exports = router;