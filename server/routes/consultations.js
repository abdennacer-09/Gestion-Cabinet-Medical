const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Sec = require('../models/secretaire');
const Pat = require('../models/patient');
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');


router.get('/', async (req, res)=> {
    const consultations =  await Cons.find();
    console.log(consultations);
});

router.post('/:secId/addCons', async (req,res) => {
    const { secId } = req.params;

    const NewConsultation = new Cons({
        date: req.body.date,
        type: req.body.type,
        patient: req.body.patient,
        categorie : req.body.categorie,
        status : req.body.status
    });

    const sec = await Sec.findById(secId);
    NewConsultation.secretaire = sec;

    await NewConsultation.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewConsultation);

});


module.exports = router;