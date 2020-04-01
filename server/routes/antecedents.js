const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');
const Antc = require('../models/antecedent');


router.get('/', async (req, res)=> {
    const antecedents =  await Antc.find();
    console.log(antecedents);
});

router.post('/addAntec', async (req,res) => {

    const NewAntecedent = new Antc({
        midicaux: req.body.midicaux,
        rmqMdc: req.body.rmqMdc,
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
        chirurgicaux : req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
        Obstétricaux : req.body.Obstétricaux,
        rmqObst : req.body.rmqObst,
        consultation : req.body.consultation
    });

    await NewAntecedent.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewAntecedent);

});

module.exports = router;