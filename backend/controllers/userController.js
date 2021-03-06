const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log(req.file);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
      password: hash,
      avatar: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = (req, res, next) => {
  let getUser;
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      bcrypt
        .compare(req.body.password, user.password)
        .then((response) => {
          if (!response) {
            return res.status(401).json({
              message: "Authentication failed",
            });
          }
          let jwtToken = jwt.sign(
            {
              email: getUser.email,
              userId: getUser._id,
            },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          );
          res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
// Get Users
exports.users = (req, res) => {
  User.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
};

// Get Single User
exports.user_detail = (req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

// Update User
exports.user_update = (req, res, next) => {
  const user = req.file ? {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};

  User.findByIdAndUpdate(
    req.params.id,
    user,
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User successfully updated!");
      }
    }
  );
};

// Delete User
exports.user_delete = (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
    const filename = user.avatar.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ msg: 'Deleted User !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};
