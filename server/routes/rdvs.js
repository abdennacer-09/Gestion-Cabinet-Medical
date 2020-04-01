const express = require('express');
const mongoose = require('mongoose');
const Sec = require('../models/secretaire');
const router = express.Router();
const Pat = require('../models/patient');
const Rdv = require('../models/rendezVous');


router.get('/', (req,res) => {
    const rdvs =   Rdv.find();
    console.log(rdvs);
});

router.post('/:secId/addRdv', async (req,res) => {
    const { secId } = req.params;

    const NewRdvs = new Rdv({
        date: req.body.date,
        type: req.body.type,
        patient: req.body.patient
    });

    const sec = await Sec.findById(secId);
    NewRdvs.secretaire = sec;

    await NewRdvs.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewRdvs);

});

module.exports = router;