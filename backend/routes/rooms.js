const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rooms = require('../models/rooms');
const auth= require('../models/auth');


router.get('/',auth,(req,res,next) => {
    Rooms.find()
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
    var datetime = new Date();
    const rooms = new Rooms({
         id: new mongoose.Types.ObjectId(),
         room: req.body.room   
    });
    rooms.save().then(result => {
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

router.patch('/:roomId',auth, (req,res,next) => {
    const id = req.params.roomId;
    Rooms.updateOne({_id: id}, {$set: { room: req.body.room }})
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

router.get('/:roomId',auth, (req,res,next) => {
       req.params.roomId;
       const id = req.params.roomId;
       Rooms.find({_id:id}).exec()
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


router.delete('/:roomsid', auth,(req,res,next) => {
    const id = req.params.roomsid;
    Rooms.deleteOne({_id: id})
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