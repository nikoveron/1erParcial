const User = require("../models/usersModels");
const generarJWT = require("../helpers/generateJWT");
const bcrypt = require('bcrypt');


const ctrlAuth = {};

ctrlAuth.iniciarSesion = async (req, res) => {

    const { username, password } = req.body;

    try {
        // Buscar si el usuario pertenece a nuestro sistema
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if (!user.isActive) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario inactivo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el token
        const token = await generarJWT({ uid: user._id })

        return res.json(token);
    } catch (error) {
        return res.json({ msg: 'Error al iniciar sesión' });
    }
};

module.exports = ctrlAuth;