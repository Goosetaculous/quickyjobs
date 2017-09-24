var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;
var JobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    appliedBy: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    },
    reviewFromJobPoster: {
        type: String
    }
});

// Create the model with the Schema
var JobModel = mongoose.model("JobModel", JobSchema);
module.exports = JobModel;

// Status will: intiated , applied , confirmed , completed 