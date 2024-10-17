const router = require("express").Router()
const adminController = require("../Admin/controller.admin")
const validate = require("../../middelWere/validationMiddleware")
const {adminLoginSchema} = require("../validators/adminValidation")
// router.post("/add",validate(adminRegistrationSchema), adminController.createAdmin)
router.post("/login",validate(adminLoginSchema), adminController.adminLogin)

module.exports = router