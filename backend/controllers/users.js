const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const connUri = `${process.env.MONGO_DEV_CONN_URL}/${process.env.MONGO_DB_NAME}`;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
        const { name, password } = req.body;
        const user = new User({ _id: 1, name, password}); // document = instance of a model
        user.save((err, user) => {
          if (!err) {
            result.status = status;
            result.result = user;
          } else {
            status = 500;
            result.status = status;
            result.error = err;
          }
          res.status(status).send(result);
          mongoose.connection.close(); // close the connection after saving
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
        mongoose.connection.close();
      }
    });
  },

  login: (req, res) => {
    const { name, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 200;

      if(!err) {

        User.findOne({name}, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
              if (match) {
                // Create a token
                const payload = { user: user.name };
                const options = { expiresIn: '2d', issuer: 'https://hamzeen.github.io' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = 200;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
              }
              res.status(status).send(result);
            }).catch(err => {
              status = 500;
              result.status = status;
              result.error = err;

              res.status(status).send(result);
              mongoose.connection.close();
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        }).then(() => mongoose.connection.close());
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
        mongoose.connection.close();
      }
    });
  },

  getAll: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 200;
      if (!err) {
        const payload = req.decoded; // console.log("LC JWT PAYLOAD:: ", payload);
        if (payload && payload.user === 'admin') {
          User.find({}, (err, users) => {
            if (!err) {
              result.status = status;
              result.error = err;
              result.result = users;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          }).then(() => mongoose.connection.close());
        } else {
          status = 401;
          result.status = status;
          result.error = `Authentication error`;
          res.status(status).send(result);
          mongoose.connection.close();
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
        mongoose.connection.close();
      }
    });
  }
};
