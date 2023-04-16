const express = require("express");
const router = express.Router();
//const { signup, readUsers, updateUser, deleteUser} = require("../controllers/userController");
const { signup, readUsers } = require("../controllers/userController");

router.post("/signup", signup);
router.get("/read", readUsers);
//router.put("/update", updateUser);
//router.delete("/delete", deleteUser);

module.exports = router;
