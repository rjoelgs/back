const mongoose = require("mongoose");
const crypto = require("crypto");
const UniqueValidator = require("mongoose-unique-validator");


const encryptConfig = {
    "algorythm" : "sha512",
    "iterarions": 1000,
    "length": 512
}

var salt = 10;


const UserSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    age: {type: Number,  min: [18, 'La edad mínima es 18'] },
    dateOfBirth: Date,
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {
        type: String, 
        required: true
    },
    salt: String, // este campo es necesario, es la llave para leer la contraseña encryptada
    createdAt: {type: String, default: Date.now}
});
//El contexto de funcion this
UserSchema.methods.hashPassword = function(password) { // No funcionaba porque estabamos usando funcion flecha y la instrucción
    this.salt = crypto.randomBytes(10).toString("hex");
    var encrypted = crypto
        .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
        .toString("hex");
    this.password = encrypted;
}

UserSchema.methods.validatePassword = function(password) { 
    // hashed -> desencriptar -> comparar (password)
    // 123joel  -> hashear -> compararlo (hashed en modelo)

    var hashedPwd = crypto
        .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
        .toString("hex");
    return this.password === hashedPwd;
}

UserSchema.plugin(UniqueValidator, {"message": "El correo ya existe"} )

const User = mongoose.model("User", UserSchema);

module.exports = User;
