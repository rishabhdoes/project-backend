const { Router } = require("express");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middleware/validation-middleware");
const { register, login, verify } = require("../controllers/authController");
const {
  listPropertiesOnSearch,
} = require("../controllers/propertiesController");
const { suggestionAutocomplete, nearbyLocalities } = require("../controllers/Googleapiscontrolller");

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hi");
});

router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/verify-token", verify);

router.post("/listProperties", listPropertiesOnSearch);
router.get("/autocomplete", suggestionAutocomplete);
router.get("/nearbyLocalities", nearbyLocalities);

module.exports = router;
