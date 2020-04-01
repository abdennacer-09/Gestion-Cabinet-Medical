
const express = require('express');
const mongoose = require('mongoose');
const Sec = require('../models/secretaire');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/keys').secret;
const router = express.Router();
const Pat = require('../models/patient');
//const Sec_Pat = require('../models/sec-pat'); 

//const { check , validationResult } = require('express-validator');

router.get('/signup', (req, res) => {
    res.send('signup');
});

/*router.post('/signup', async (req, res, next) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sec = await Sec.findOne({ email: req.body.email });
    if(sec) return res.status(400).send('Secretaire already registred.');

    sec = new Sec({
        nom : req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });

    await sec.save();

    res.send(sec);

});*/

router.post('/signup', (req, res) => {
    let {nom, prenom, email, password, confirm_password} = req.body
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "Password do not mutch."
        })
    }

    Sec.findOne({
        email: email
    }).exec().then(sec => {
        if(sec){
            return res.status(400).json({
                msg: "Email is already registred."
            });
        }
    });

    // The data is valid new we can register the user
    let newSec = new Sec({
        nom,
        prenom, 
        email, 
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSec.password, salt, (err, hash) => {
            if(err) res.send(err);
            newSec.password = hash;
            newSec.save().then(sec => {
                return res.status(201).json({
                    success: true,
                    msg: "Secretaire now is registered"
                });
            });
        } );
    });
});

router.post('/login', (req,res) => {
    Sec.findOne({ email: req.body.email }).then(sec => {
        if(!sec){
            return res.status(404).json({
                msg: "Email is not found",
                success: false
            });
        }
        // if there is secretaire we are now going to compare the password
        bcrypt.compare(req.body.password, sec.password).then(isMatch => {
            if(isMatch){
                //password correct 
                const payload = {
                    _id: sec._id,
                    nom: sec.nom,
                    prenom: sec.prenom,
                    email: sec.email
                }
                jwt.sign(payload, key,{
                    expiresIn: 604800
                },(err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: "youare now logged "
                    });
                });
            }else{
                return res.status(404).json({
                    msg: "Password is not correct",
                    success: false
                });
            }
        })
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json(req.sec);
});

/*router.post('/addPatients', async (req, res, next) => {
    //const { secId } = req.params;
    const newPatient = new Pat({
        nom : req.body.nom,
        cin : req.body.cin,
        adresse : req.body.adresse
    });

    const sec = '5e7ea5dc77d5da3de8d5a9f5';

    await newPatient.save();

    Sec_Pat.patient.push(newPatient);
    Sec_Pat.secretaire.push(sec);

    await Sec_Pat.save();
    res.status(201).json();
});*/


module.exports = router;