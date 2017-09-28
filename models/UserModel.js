var mongoose = require("mongoose");
var JobModel = require("../models/JobModel.js");

// Create Schema class
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    given_name: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    sub: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    jobsPostedByThisUser: {
        type: [String]
    },
    jobsThisUserApplied: [{
        type: Schema.ObjectId, ref: "JobModel"
    }],
    price:{
        type: [Number]
    }
});

// Create the model with the Schema
var UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;