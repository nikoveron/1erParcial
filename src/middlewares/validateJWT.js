const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usersModels');

const validarJWT = async (req = request, res = response, next) => {

    let token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            msg: 'Error - No hay token en la petición'
        })
    }; 
    

    try {

        const { uid } = await jwt.verify(token, process.env.SECRET)
        
        // leer el usuario que corresponde al id
        const usuario = await Usuario.findById(uid)
        

        if (!usuario) {
            return res.status(401).json({
                error: 'Error - usuario no existe en BD'
            });
        }

        // Verificar si el id tiene estado en true
        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'Error - usuario con estado false'
            });
        }


        req.user = usuario;
        
        next();
    } catch (error) {
        console.log(`Error, token no valido: ${error}`)
    }
}

module.exports = validarJWT