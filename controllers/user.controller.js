const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const user = req.body
 // Generate a salt
 const salt = await bcrypt.genSalt(10);
 // Hash the password with the salt
 const hashedPassword = await bcrypt.hash(user?.password, salt);

 // In a real application, you would save the hashed password to your database here
//  console.log('Hashed Password:', hashedPassword);


const hashData = {
  fullName: user?.fullName,
  email: user?.email,
  username: user?.username,
  password: hashedPassword
}

  User.create(hashData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
      
    else {
      const token =  jwt.sign({ email: user?.email }, 'your_jwt_secret', { expiresIn: '1y' });

          return res.status(200).send({data,token})
    }
  });
};


exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
exports.login = async(req, res) => {
  const user = req.body


  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.body.email
        });
      }
    } else {
      const dbUser = data
      const userResult = {
        fullName:data?.fullName,
        email:data?.email,
        gender:data?.gender,
        about:data?.about,
        phone:data?.phone,
        createdAt:data?.date,
        photo:data?.photo,
        type:data?.type,
        education:data?.education,
        work:data?.work,
        username:data?.username,
      }
      bcrypt.compare(user?.password, dbUser?.password, function(err, result) {
        if(result===true){
          const token =  jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1y' });
          return res.status(200).send({userResult,token})
        }else{
          return res.status(500).send({
            message: "Password does not match"
          })
        }
    });
    }
  });


};
exports.token = async(req,res)=>{
  const headers = req.headers
  const user = req.user
  console.log(user,'user');
  User.findByEmail(user.email,(err,data)=>{
  
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with email ${req.body.email}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with email " + req.body.email
      });
    }
  } else {
    
    const userResult = {
      fullName:data?.fullName,
      email:data?.email,
      gender:data?.gender,
      about:data?.about,
      phone:data?.phone,
      createdAt:data?.date,
      photo:data?.photo,
      type:data?.type,
      education:data?.education,
      work:data?.work,
      username:data?.username,
    }
    res.send(userResult)
  }
})
}