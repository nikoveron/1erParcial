const router = require("express").Router();

const {getUser, postUser, putUser, deleteUser} = require("../controllers/taskUser");
const validarJWT = require("../middlewares/validateJWT")


router.get("/user", getUser)
router.post("/user", postUser)
router.put("/user/:idUser", validarJWT, putUser)
router.delete("/user/:idUser", validarJWT, deleteUser)


module.exports = router;