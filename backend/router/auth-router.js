const express= require('express')

const router = express.Router()
const authcontroller = require("../controllers/auth-controller")
const {signupSchema, loginSchema} = require('../validators/auth-validators')
const validate = require('../middlewares/validate-middleware')

// router.get('/', (req, res ) => {
//   res.status(200).send("This is from the router ")
// })

router.route('/').get(authcontroller.home)


router.route('/register')
.post(validate(signupSchema), authcontroller.register)

router.route('/login').post(validate(loginSchema),authcontroller.login)



module.exports= router