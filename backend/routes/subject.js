const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/subject');

router.get('/',(req,res,next) => {
    Subject.find()
            .exec()
            .then(docs =>{
                const response={
                     count:docs.length,
                     subject:docs
                };
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
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        subject: req.body.subject
    });
    subject.save().then(result => {
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

router.get('/:userId', (req,res,next) => {
         req.params.userId;
       const id = req.params.userId;
       Subject.find({_id:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No users found'
               });
           }
           
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

router.patch('/:staffId', (req,res,next) => {
    const id = req.params.staffId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    Subject.update({_id: id}, {$set: updateOps})
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
    Subject.deleteOne({_id: id})
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