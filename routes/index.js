const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const {register, login} = require('../controller/auth');

const {create_wall} = require('../controller/wall');

const {create_comment, show_comment, delete_comment} = require('../controller/comment');

const {create_subcomment} = require('../controller/subcomment');


var token_verification = async function (req, res, next1) {
    try{
      const decoded = jwt.verify(req.header('Authorization'), 'secret');
      const user = await User.findByPk(decoded.data.id)
     
      req.user = user
    }
    catch(err){
      res.status(400).json({message:"Token Expaire", err})
    } 
    next1()
  }


router.post('/register',  register);

router.post('/login', login);

router.post('/create-wall',token_verification, create_wall);

router.post('/create-comment',token_verification, create_comment);

router.get('/show-comments',token_verification, show_comment);

router.delete('/delete-comment',token_verification, delete_comment);

router.post('/create-subcomment',token_verification, create_subcomment);



router.post('/create-reaction', (req, res, next) => {
  console.log('im here')
    const action = req.body.action;
    console.log('accccc', action)
    const counter = action === 'Like' ? 1 : -1;
    Comment.update({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
        pusher.trigger('post-events', 'postAction', { action: action, postId: req.params.id }, req.body.socketId);
        res.send('');
    });
});



module.exports = router;
