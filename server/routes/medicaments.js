const express = require('express');
const mongoose = require('mongoose');
const Cons = require('../models/consultation');
const router = express.Router();
const Medic = require('../models/Medicament');

router.get('/', async (req, res)=> {
    const medicaments =  await Medic.find();
    console.log(medicaments);
});

router.post('/addMedic', async (req,res) => {

    const NewMedicament = new Medic({
        nom: req.body.nom,
        posologie: req.body.posologie
    });


    await NewMedicament.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewMedicament);

});

module.exports = router;