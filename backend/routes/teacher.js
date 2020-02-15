const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Teacher = require('../models/teacher');
const auth= require('../models/auth');

router.get('/',(req,res,next) => {
    Teacher.find()
            .exec()
            .then(docs =>{
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error:err 
                });
            });
});

router.post('/',auth,(req,res,next) => {
    const teacher = new Teacher({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         phone:req.body.phone,
         email:req.body.email,
         address:req.body.address
    });
    teacher.save().then(result => {
            console.log(result);
            res.status(201).json({
                status:'success',
                createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:pid', (req,res,next) => {
         req.params.pid;
       const id = req.params.pid;
       Teacher.find({forum:id})
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No teacher found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});

router.patch('/:pid', (req,res,next) => {
    const id = req.params.pid;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Teacher.update({_id: id}, {$set: updateOps})
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

router.delete('/:pid', (req,res,next) => {
    const id = req.params.pid;
    Teacher.deleteOne({_id: id})
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
module.exports = router;