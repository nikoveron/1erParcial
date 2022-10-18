const { response } = require('express');
const jwt = require('jsonwebtoken');

const generar_jwt = (uid) => {
    return new Promise((resolve, reject) => { 

        jwt.sign(uid,process.env.SECRET,{ 
            expiresIn: '24h'},
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('Error al generar token')
                }
                resolve(token)
            }
        )
    });
}; 

module.exports = generar_jwt;