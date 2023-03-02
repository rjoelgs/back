const express = require("express");

const router = express.Router();

const User = require("../models/User.model");

const {generateToken} = require("../middlewares/authorization");

router.post('/login', async(req, res)=>{
    try {
        // verficar que el usuario exista
        // si existe
            // desencriptar contraseña *
            // comparar contraseñas *
                // si son iguales, generar el token
                    // crear el payload
                    // generar la firma
                // si no son aviso de credenciales incorrectas
        // si no existe, mandar mensaje de usuario inexistente

        const {email, password} = req.body;
        const user = await User.findOne({"email": email});
        if(user) {
            if( user.validatePassword(password) ) {
                const token = generateToken({
                    id: user.id,
                    name: user.firstName
                });
                res.json({
                    result: token
                });
            } else {
                res.status(401)
                res.json({
                    result: "Password does not match"
                });
            }
        } else{
            res.status(401);
            res.json({
                result: `User ${email} not found`
            });
        }

    } catch (error) {
        console.error(error.message);
    }
});

router.post('/logout', async(req, res)=>{
    try {
       // marcar el token como expirado


    } catch (error) {
        console.error(error.message);
    }
});




module.exports = router