const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Review = require('../models/review');

const connUri = `${process.env.MONGO_DEV_CONN_URL}/${process.env.MONGO_DB_NAME}`;

module.exports = {

    add: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser : true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const { userId, year, desc, complete } = req.body;
                const review = new Review({_id: 1, userId, year, desc, complete}); // document = instance of a model
                review.save((err, review) => {
                    if (!err) {
                        result.status = status;
                        result.result = review;
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

    getReviewsByEmployee: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                const id = req.query.id;
                Review.find({userId: id}, (err, events) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = events;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                    mongoose.connection.close()
                });
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
