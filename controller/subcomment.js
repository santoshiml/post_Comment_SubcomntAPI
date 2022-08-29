const express = require("express");
const Wall = require("../models").Wall;
const User = require("../models").User;
const Comment = require('../models').Comment;
const Subcomment = require('../models').Subcomment;


async function create_subcomment(req, res) {
    
    if(req.body.user_id && req.body.comment_id){
        const checkUser = await User.findOne({ where:{id:req.body.user_id}});

        const checkComment = await Comment.findOne({ where:{id:req.body.comment_id}});

        if(checkUser && checkComment){
            const subcomment = await Subcomment.create({
                user_id:req.body.user_id,
                comment_id:req.body.comment_id,
                subcomment:req.body.subcomment
            });
            res.status(200).json({message:"Subcomment has been created successfully!", subcomment})

        }else{
            res.send({message:'User id & Comment id not matched!'})
        }    
    }else{
        res.status(400).json({message: "Please Enter user id & Comment id"})
    }
}





module.exports = {create_subcomment}