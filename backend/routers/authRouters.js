const {Router} = require('express');
const Controller = require('./../controllers/authControllers');
const router = Router();
// const userController = require('../controllers/user-controller');

router.post('/signup',Controller.signUp_Post);

router.post('/login',Controller.login_Post);

router.get('/logout',Controller.logout_GET);
module.exports = router;