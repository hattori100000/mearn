const express = require("express")
const getAllusers = require("../controllers/admin-controller")
const router = express.Router()

router.route("/users").get(getAllusers)

module.exports = router 