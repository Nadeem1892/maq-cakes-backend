const router = require("express").Router()
const flavourController = require("./controller.flavour")
const validate = require("../../middelWere/validationMiddleware")
const {flavourValidationSchema} = require("../validators/flavourValidation")

router.post("/add-flavour",validate(flavourValidationSchema), flavourController.addFlavour)
router.get("/get-flavours", flavourController.getFlavours)
router.patch("/update-flavour/:id",validate(flavourValidationSchema), flavourController.updateFlavour)
router.delete("/delete-flavour/:id", flavourController.deleteFlavour)


module.exports = router


