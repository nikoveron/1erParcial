// importamos el modelo de User
const User = require("../models/usersModels");
//importamos el paquete bcrypt
const bcrypt = require('bcrypt');
// iniciamos el controlador user como object
const CtrlUser = {};

CtrlUser.getUser = async (req, res) => {
    try {
    const users = await User.find();

    return res.json({
        message: "Usuarios encontrados.",
        usuarios: users
    })
}catch (error) {
    console.log(`Error, no se pudo encontrar el usuario: ${error}`);
  }
}

CtrlUser.postUser = async (req, res) => {
    try {
    const { username, password:passwordRecibida, email } = req.body;
    
    // Encriptar la contraseña del usuario
    const newPassword = bcrypt.hashSync(passwordRecibida, 10);

    // Se instancia un nuevo documento de MongoDB para luego ser guardado
    const newUser = new User({
        username,
        password: newPassword
    });
    const user = await newUser.save();
    return res.json({
        message: "Usuario creado correctamente.",
        user
    })
}catch (error) {
    console.log(`Error, no se pudo crear el usuario: ${error}`);
  }
}

CtrlUser.putUser = async (req, res)=>{
    try {
    const {username,password} = req.body;

    const id_User = req.params['idUser'];

    const updateUser = await User.updateOne({id_User},
        {$set: {
            username,
            password
            
         }
        })
    
        return res.json(
            {
                message: "Usuario modificado correctamente",
                id_User,
                updateUser
            }
        )
    }catch (error) {
        console.log(`Error, no se pudo modificar el usuario: ${error}`);
      }
}

CtrlUser.deleteUser = async (req, res) => {
    try {
        const id_User = req.params['idUser'];
        User.findByIdAndDelete(id_User).exec()
        return res.json(
            {
                message: "Usuario Eliminado correctamente",
                id_User
            }
        )
    } catch (error) {
        console.log(`Error, no se pudo eliminar el usuario ${error}`)
    }
};

module.exports = CtrlUser;  