const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];


// schema maps to a collection
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    _id: {
        type: 'Number',
        required: true,
        unique: true
    },
    userId: {
        type: 'Number',
        required: true
    },
    year: {
        type: 'Number',
        required: true,
        trim: true
    },
    desc: {
        type: 'String',
        required: true,
        trim: true
    },
    complete: {
        type: 'Boolean',
        required: true,
        trim: true
    }
});


// encrypt password before save
reviewSchema.pre('save', function(next) {
    const review = this;
    if (!review.isModified || !review.isNew) {
        next();
    } else {
        review.constructor.countDocuments(function(err, data) {
            if (!err) {
                if (data > 0) {
                    review._id = data + 1;
                }
                next();
            }

            else {
                next(err);
            }
        });
    }
});

module.exports = mongoose.model('Review', reviewSchema); // instance of schema
