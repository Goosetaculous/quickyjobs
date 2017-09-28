var JobModel = require("../models/JobModel.js");


// ORM API
var JobModelController = {
    findAll: function(callback) {
    	JobModel.find({}, function(err, data) {
    		if (err) {
    			console.log(err);
    		}
    		else {
                console.log("DB returned");
                console.log(data);
    			callback(data);
    		}
    	});
    },

    findJobsPostedbyOthers: (req,res)=>{
        console.log("->",req.params.id)
        JobModel.find({
            _id : {$ne: req.params.id}
        },(err,data)=>{
            res.json(data)
        }).catch(()=>{
            res.json(err)
        })



    },



    findJobsByPosterId: function(postedId, callback) {
        console.log("Controller: get jobs with poster " + postedId);
        JobModel.find({postedBy: postedId}, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("A2A2");
                console.log(data);
                callback(data);
            }
        });
    },
    add: function(jobName, postedBy, jobType, jobLocation, jobDate, jobPrice, callback) {

        console.log("DB controller add() called.");

        var newJob = new JobModel({
            jobName: jobName,
            postedBy: postedBy,
            appliedBy: "",
            status: "initiated",
            jobType: jobType,
            location: jobLocation,
            date: jobDate,
            price: jobPrice,
            reviewFromJobPoster: ""
        });

        console.log("Adding below job to DB.");
        console.log(newJob);
        
        newJob.save(function(err, data) {
            
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
        //
    },
    applyForAJob: function( jobId,applicantId, callback) {
        console.log("apply for job controller triggered")
        console.log(jobId);
        console.log(applicantId);

        JobModel.update({_id: jobId}, 
            { $set: 
                { 
                    appliedBy: applicantId, 
                    status: "applied"
                }
            }, 
            function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    confirmAJob: function(jobId, callback) {

        JobModel.update({_id: "59c863ff590bfd1f634bafc8"}, 
            {$set: 
                {
                    status: "confirmed"
                }
            }, 
            function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },

    reviewAJob: function(jobId, reviewFromJobPoster, callback) {
        JobModel.findOneAndUpdate({_id: jobId}, {$set: {reviewFromJobPoster: reviewFromJobPoster}}, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    cancelAJob: function(jobId, callback) {
        User.findOneAndRemove({_id: jobId}, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    reviewAJob: function(jobId, reviewFromJobPoster, callback) {
        JobModel.findOneAndUpdate({_id: jobId}, {$set: {status: "reviewed"}}, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    recommended: (req,res) => {
        console.log("=======Get Recommended Jobs Triggered======");
        console.log(req.body.skills);
        console.log(req.body)

        JobModel.find({ 
            jobType: {$in: req.body.skills},
            status: "initiated",
            postedBy:  {$ne: req.body.user_id}
        }).then(function( data){
            console.log(data)
            res.json(data);
        })

    }
}

module.exports = JobModelController;

//  display all jobs, add 1 job,  display 1 unique job, 