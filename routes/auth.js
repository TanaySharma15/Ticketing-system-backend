const express = require('express')
const {registerController,loginController} = require('../controller/userController')
const authenticateToken = require('../middleware/authenticateToken')
const router = express.Router()
// router.use(express.json())

router.post('/register',registerController)
router.post('/login',loginController)
// router.get('/protected',authenticateToken,tickets)
module.exports = router