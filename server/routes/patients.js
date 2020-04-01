const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Sec = require('../models/secretaire');
const Pat = require('../models/patient');
//const Sec_Pat = require('../models/sec-pat'); 

router.get('/addPatient', (req, res) => {
    res.send('Add patients');
});

router.get('/:secId', async (req, res)=> {
    const patients =  await Pat.find();
    //const patients =  await Pat.find().populate('secretaires')
    console.log(patients);
});

//findOne({events: {$elemMatch: {title: 'test'}}})


router.post('/:secId/addPatient', async (req, res, next) => {
    
    const { secId } = req.params;

    const Newpatient = new Pat(req.body);
    
    const sec = await Sec.findById(secId);
    Newpatient.secretaires = sec;
    await Newpatient.save();
    sec.patients.push(Newpatient);
    await sec.save();
    res.status(201).json(Newpatient);
    
});

/*router.post('/addPatient', (req, res) => {
    const patient = new Pat({
        nom : req.body.nom,
        cin : req.body.cin,
        adresse : req.body.adresse,
        profession : req.body.profession,
        tel : req.body.tel,
        age : req.body.age,
        sitFam :  req.body.sitFam,
    });

    patient.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });

    
});*/

module.exports = router;