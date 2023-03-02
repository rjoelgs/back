const express = require("express");

const router = express.Router();

router.get('/guitarras', (req, res)=>{
    res.send('si entro a la ruta');
})

router.get('/guitarranueva', (req, res)=>{
    res.send('si entro a la guitarra nueva');
})


module.exports = router