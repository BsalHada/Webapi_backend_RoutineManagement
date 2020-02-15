const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Routine = require('../models/routine');
const auth= require('../models/auth');

router.get('/',auth,(req,res,next) => {
    Routine.find()
    .populate('subject')
    .populate('room')
    .populate('batch')
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
    const routine = new Routine({
         _id: new mongoose.Types.ObjectId(),
         subject: req.body.subject,
         room:req.body.room,
         batch:req.body.batch,
         date:req.body.date
    });
    routine.save().then(result => {
            console.log(result);
            res.status(201).json({
                status:'success',
                created: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:pid',auth, (req,res,next) => {
         req.params.pid;
       const id = req.params.pid;
       Routine.find({forum:id})
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No routine found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});

router.patch('/:pid',auth, (req,res,next) => {
    const id = req.params.pid;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Routine.update({_id: id}, {$set: updateOps})
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
    Routine.deleteOne({_id: id})
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