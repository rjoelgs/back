const mongoose = require("mongoose");

const GuitarraSchema = new mongoose.Schema({
    nombre : String,
    descripcion : {type: String},
    precio: Number,
    createdAt: {type: String, default: Date.now}
});

const Guitarra = mongoose.model("Guitarra", GuitarraSchema);

module.exports = Guitarra;