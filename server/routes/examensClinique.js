const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const ExmCln = require('../models/examen_clinique');


router.get('/', async (req, res)=> {
    const examensCliniques =  await ExmCln.find();
    console.log(examensCliniques);
});

router.post('/addExamCln', async (req,res) => {

    const NewExamClinique = new ExmCln({
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
        appareil: req.body.appareil,
        rmqAppr : req.body.rmqAppr,
        consultation : req.body.consultation

    });

    await NewExamClinique.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamClinique);

});



module.exports = router;