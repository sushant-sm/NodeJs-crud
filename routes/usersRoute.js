const express = require('express');
const { route } = require('express/lib/application');
const Users = require('../models/userModel');
const router = express.Router();

router.get('/', async(req,res) => {
    try{
        const users = await Users.find();
        res.json(users);
    }
    catch(err){
        res.send('Error', + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const user = await Users.findById(req.params.id);
        res.json(user);
    }
    catch(err)
    {
        res.send('Error'+err);
    }
})
router.delete('/:id', (req,res) => {
    const userId = await Users.findById(req.params.id);
    res.json(userId);
})

router.post('/', async(req,res) => {

    const userData = new Users({ 
        name: req.body.name,
        roll: req.body.roll
    })

    try{
        const r = await userData.save();
        res.json(r);
    }
    catch(err){
        res.send('Error', + err);
    }
})

router.patch('/:id', async(req,res) => {
    try{
        const curUser = await Users.findById(req.params.id);
        curUser.name = req.body.name;
        curUser.roll = req.body.roll;
        const r = await curUser.save();
        res.json(r);
    }
    catch(err){
        res.send('Error'+err);
    }
})

router.get('/delete/:id', (req,res) => {
        Users.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.send("User Deleted");
            }
            else{
                res.send("Something went wrong");
            }
        });
    
})

module.exports = router;