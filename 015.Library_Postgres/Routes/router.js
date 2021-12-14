const router = require('express').Router();
const controller = require('../Controller/controller');
const auth = require('../middleware/auth');

router.get("/", controller.main);
router.get("/admin", auth, controller.adminPage);
router.get("/me", auth, controller.userMe);
router.get("/login", controller.loginPage);
router.post("/login", controller.loginAuth);
router.get("/newuser", controller.newUser);
router.post("/adduser", controller.signIn);
router.post("/addauthor", controller.addAuthor);
router.post("/addbook", controller.addBook);

module.exports = router;