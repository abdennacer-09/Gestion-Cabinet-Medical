const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = mongoose.Schema({
    nom :{
        type : String
    },
    cin:{
        type: String,
        unique: true
    },
    prenom:{
        type:String
    },
    adresse:{
        type:String
    },
    profession:{
        type: String
    },
    tel: {
        type: String
    },
    age: {
        type: Number
    },
    sitFam:{
        type:String
    },
    dateNaissance:{
        type: Date
    },
    secretaires:[{
        type: Schema.Types.ObjectId,
        ref: 'secretaire',
    }]
    
});

module.exports = mongoose.model('Patient', patientSchema);