const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');

router.get('/', (req,res) => {
    const categories =   Cat.find();
    console.log(categories);
});

router.post('/addCategorie', async (req,res) => {

    const NewCategorie = new Cat({
        nom: req.body.nom,
    });

    await NewCategorie.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewCategorie);

});





module.exports = router;