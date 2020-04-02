const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');
const Antc = require('../models/antecedent');


router.get('/', async (req, res)=> {
    const antecedents =  await Antc.find();
    console.log(antecedents);
});


// Ajouter antecedent
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

    await NewAntecedent.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewAntecedent);

});

// Modifier Antecedent
router.put('/updateAntec/:antecId' , (req,res) => {

    const ID = req.params.antecId;
    const UpdatedAntecedent = {
        midicaux: req.body.midicaux,
        rmqMdc: req.body.rmqMdc,
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
        chirurgicaux : req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
        Obstétricaux : req.body.Obstétricaux,
        rmqObst : req.body.rmqObst,
        consultation : req.body.consultation
    }
    Antc.updateOne( {_id : ID} , {$set : UpdatedAntecedent} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(resualt);
    });

});

// Supprimer antecedent

router.delete('/deleteAntec/:antecId', (req,res) => {
    const ID = req.params.antecId;
    Antc.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(result);
    })
});

module.exports = router;