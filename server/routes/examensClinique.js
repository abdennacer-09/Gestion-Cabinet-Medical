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

    await NewExamClinique.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamClinique);

});

// Modifier Examen Clinique
router.put('/updateExamenCln/:exmCId' , (req,res) => {

    const ID = req.params.exmCId;
    const UpdatedExamenCln = {
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
        appareil: req.body.appareil,
        rmqAppr : req.body.rmqAppr,
        consultation : req.body.consultation
    }
    ExmCln.updateOne( {_id : ID} , {$set : UpdatedExamenCln} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(result);
    });

});

// Supprimer Examen Clinique

router.delete('/deleteExamenCln/:exmCId', (req,res) => {
    const ID = req.params.exmCId;
    ExmCln.deleteOne({ _id : ID },(err, result) => {
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