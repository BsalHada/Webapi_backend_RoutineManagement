const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Register = require('../models/register');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/',(req,res,next) => {
    Register.find()
            .exec()
            .then(docs =>{
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err 
                });
            });
});

router.post('/',(req,res,next) => {
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
    const register = new Register({
        id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password:hash,
        fullname:req.body.fullname,
        image:req.body.image,
        type:req.body.type
    });
     register.save().then(result => {
            res.status(201).json({
                status:'success',
                createdUser: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
        });
    });
});

router.post('/:email/:pass', (req,res,next) => {
       Register.findOne({email: req.params.email}).exec()
       .then(doc => {
           if(doc) {
            bcrypt.compare(req.params.pass, doc.password, function(err, ress) {
                if(ress){
                    var result = doc.toJSON();
                    delete result.password;
                    var token = jwt.sign({ user: result}, 'skey');
                    result.status="success";
                    result.token=token;
                    Register.updateOne({email:req.params.email},{$set:{token:token}})
                   .exec()
                    return res.send(result);
                }
                else {
                    res.send({
                        message: 'error'
                    });
                }
             });
           }else{
            res.send({
                message: 'nouser'
            });
           }
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

router.post('/:email', (req,res,next) => {
       Register.find({email: req.params.email})
       .select("email")
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No register found'
               });
           }
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});


router.patch('/:user', (req,res,next) => {
    console.log(req.params.user);
    Register.updateOne({email:req.params.user},{$set:{token:""}})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


router.delete('/:staffId', (req,res,next) => {
    const id = req.params.staffId;
    Register.deleteOne({_id: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;