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
    appliedBy: {
        type: String
    },
    status: {
        type: String
    },
    jobType: {
        type: String
    },
    reviewFromJobPoster: {
        type: String
    },
    date:{
        type:String
    },
    location: {
        type: String
    }
});

// Create the model with the Schema
var JobModel = mongoose.model("JobModel", JobSchema);
module.exports = JobModel;

// Status will: intiated , applied , confirmed , completed 


