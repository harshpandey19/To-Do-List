const router = require("express").Router();
const todoCtrl = require("../controllers/todo-controller");
const middle = require("../middleware/isAuth");

router.post("/add", middle.isAuth, todoCtrl.addItem);

router.post("/delete", middle.isAuth, todoCtrl.deleteItem);

router.post("/update", middle.isAuth, todoCtrl.updateItem);

module.exports = router;