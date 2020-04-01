const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ordns = require('../models/ordonnance');

router.get('/', async (req, res)=> {
    const ordonnances =  await Ordns.find();
    console.log(ordonnances);
});

router.post('/addOrdns', async (req,res) => {

    const NewOrdonnace = new Ordns({
        quantite: req.body.quantite,
        prise: req.body.prise,
        periode: req.body.periode,
        nbrParJour: req.body.nbrParJour,
        quand: req.body.quand,
        remarque: req.body.remarque,
        medicament: req.body.medicament,
        consultation: req.body.consultation
    });

    await NewOrdonnace.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewOrdonnace);

});

module.exports = router;