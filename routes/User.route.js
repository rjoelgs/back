const express = require("express");

const router = express.Router();

const User = require("../models/User.model");

const {validateAccess} = require("../middlewares/authorization");
const { json } = require("express");

router.get('/', validateAccess, async(req, res)=>{
    try {
        const users = await User.find();
        res.send({
            result: users
        });
    } catch (error) {
        console.error(error.message);
    }
});

router.get("/account", validateAccess, async(req, res) => {
    const user = await User.findById(req.user.id);
    res.send({
        "name": user.firstName,
        "lastname": user.lastName,
        "dateofbird" : user.dateOfBirth
    });
})


router.post("/", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            res.status(400);
            res.send({
                error: `El usuario ${req.body.email} ya existe`
            });
        } else {
            var newUser = new User({
                email : req.body.email,
                firstName: req.body.name,
                lastName: req.body.lastname,
                age: req.body.age,
                dateOfBirth: req.body.dob,
                password: req.body.password
            });
            newUser.hashPassword(req.body.password);
            await newUser.save();
            res.json({
                result: newUser
            });
        }
        
    } catch (error) {
        console.error(error.message);
        res.json({
            error: error.message
        })
    }
    
});




module.exports = router