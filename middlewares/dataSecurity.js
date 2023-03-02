const crypto = require("crypto");

const salt = crypto.randomBytes(10).toString("hex"); 

const encrypt = (data) => {
    
    var sha512Encrypted = crypto.pbkdf2Sync(data, salt, 10000, 512, 'sha512'); // arreglo de bytes
    var encryptedHex = sha512Encrypted.toString("hex");  // cadena de texto
    return encryptedHex;
}

const decrypt = (encryted) => {
    crypto.decrypt("sha512", salt, encryted);
}

module.exports = {encrypt};