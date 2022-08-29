const express = require("express");
const Wall = require("../models").Wall;
const User = require("../models").User;
const Comment = require("../models").Comment;
const Subcomment = require("../models").Subcomment;

async function create_comment(req, res) {
  if (req.body.user_id && req.body.wall_id) {
    const checkUser = await User.findOne({ where: { id: req.body.user_id } });

    const wall = await Wall.findOne({
      where: { id: req.body.wall_id },
      include: {
        model: User,
        as: "users",
      },
    });
    if (checkUser && wall) {
      const comment = await Comment.create({
        user_id: req.body.user_id,
        wall_id: req.body.wall_id,
        comment: req.body.comment,
      });

      return res.send({ message: "Comment has been created!", comment });
    } else {
      return res.send({ message: "Please Enter valid user id & wall id" });
    }
  } else {
    res.status(400).json({ message: "Please Enter User id & Wall id" });
  }
}

async function show_comment(req, res) {
  const checkComment = await Comment.findAll({
    include: {
      model: Subcomment,
      as: "subcomments",
    },
  });

  if (checkComment) {
    res.status(200).json({ message: "Show Comments & Subcomments", checkComment });
  } else {
    res.status(400).json({ message: "Coments Not found!" });
  }
}





async function delete_comment(req, res) {
  if (req.body.user_id && req.body.id) {
    const checkComment = await Comment.findOne({where:{id: req.body.id, user_id:req.body.user_id}});

    if (checkComment) {
        console.log('aaaaaaaa', checkComment)
      const data = await Comment.destroy({
        where: { user_id: req.body.user_id, id: req.body.id},
        include: {
          model: Subcomment,
          as: "subcomments",
        },
      });

      return res.status(200).json({ message: "Comment has been deleted", data });
    } else {
      return res.status(400).json({message: "Comment id not found Please Enter a valid comment id"});
    }
  } else {
    res.send({ message: "Please Enter a valid user id & comment id" });
  }
}

module.exports = { create_comment, show_comment, delete_comment };
