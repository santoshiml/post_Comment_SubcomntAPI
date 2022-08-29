var express = require('express');
const User = require('../models').User;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


async function register(req, res){
    let saveUser = req.body
      let errors = []
      if(!req.body.Email){
        errors.push('Email is required')
      }
      if(!req.body.Password){
        errors.push('Password is required')
      }
      else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Password, salt);
        saveUser.Password = hash
      }
      if(req.body.Email){
        const userCheck = await User.findAll({where:{Email: req.body.Email}});
        if(userCheck && userCheck.length > 0){
          errors.push('Enter Unique Email')
        }
        saveUser.Email = req.body.Email
      }
      if(errors.length > 0){
        res.status(400).json({errors})
      }
      else {
        var user = new User(saveUser);
        await user.save()
        res.status(201).json({message:"User Successfully Registered", user})
        // console.log('1111', user)
      }
  }

  
  function login(req, res){
    var Email = req.body.Email;
    var Password = req.body.Password;
    // console.log(req.body)
  
    User.findOne({where: {Email: Email}, attributes: ['id','Email','Name','Password']})
      .then(function (data){
        if (!data) {
          res.status(400).json({message:'invalid email'})
        }else{
          const valid_password = bcrypt.compareSync(Password, data.Password);
          if (valid_password){
            const token = jwt.sign({
              data
            }, 'secret', { expiresIn: '1h' });
            
            res.status(200).json({user:data,token})
          }
          else{
            res.status(400).json({message:"Invalide Password"})
          }
        } 
      }) 
      .catch((error) => {
        console.log(error)
      })
  }

  module.exports = {register, login} 
