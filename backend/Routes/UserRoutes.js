const express = require("express")
const router = express.Router();
const user = require("../Controllers/UserController");
const auth = require("../Middleware/auth");


router.post("/register", user.register );
router.post("/login", user.login);

module.exports = router;