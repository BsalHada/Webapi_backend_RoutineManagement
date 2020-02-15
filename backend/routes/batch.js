const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Batch = require('../models/batch');
const auth= require('../models/auth');


router.get('/',auth,(req,res,next) => {
    Batch.find()
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
    const batch = new Batch({
         id: new mongoose.Types.ObjectId(),
         batch: req.body.batch
    });
    batch.save().then(result => {
            console.log(result);
            res.status(201).json({
                status:'success'
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.patch('/:roomId',auth, (req,res,next) => {
    const id = req.params.roomId;
    Batch.updateOne({_id: id}, {$set: { batch: req.body.batch }})
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

router.get('/:roomId', auth,(req,res,next) => {
       req.params.roomId;
       const id = req.params.roomId;
       Batch.find({_id:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No vehicle found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});


router.delete('/:batchid', auth,(req,res,next) => {
    const id = req.params.batchid;
    Batch.deleteOne({_id: id})
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