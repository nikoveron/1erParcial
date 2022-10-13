const { iniciarSesion } = require('../controllers/authentication');

const router = require('express').Router();

router.post('/login', iniciarSesion )


module.exports = router;