const express = require('express');
const Wall = require('../models').Wall;
const User = require('../models').User;

async function create_wall(req, res){
    if(req.body.user_id){
    //    console.log('11111', req.body.user_id)   
         let user1 = await User.findOne({where:{id:req.body.user_id}})
         if(!user1){
            //  console.log('user not id found')
             res.send({message:'Not found user id! Please Enter valid user id'})     
         }else{
            const wall1 = await Wall.create({
                user_id:req.body.user_id,
                title:req.body.title,
                description:req.body.description
            })
            res.status(200).json({message:' Wall have been Successfully Created', wall1})
         } 
    }else{
        res.status(400).json({message: "Please Enter valid id"})
    }      
}

module.exports = {create_wall}
