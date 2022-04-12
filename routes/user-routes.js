const router = require("express").Router();
const userCtrl = require("../controllers/user-controller");

router.post("/register", userCtrl.registerUser);

router.post("/login", userCtrl.loginUser);

router.get("/auth", userCtrl.checkAuth);

router.post("/logout", userCtrl.logoutUser);

module.exports = router;