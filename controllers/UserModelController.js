var UserModel = require("../models/UserModel.js");
var JobModel = require("../models/JobModel.js");
var mongoose = require("mongoose");

// ORM API
var UserModelController = {
    /**
     * Grab ALL users
     */
    all: (req, res)=> {
        UserModel.find({}, (err, data)=> {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    },
    /**
     * @param req.body.user.sub
     * Check if the user exist in the database.
     * Create user entry on the db if does not exist
     */
    add: (req, res)=> {
        UserModel.findOne({sub: req.body.user.sub}, (err, data)=> {
            if (!data) {
                console.log("ADDING user:",req.body.user)
                UserModel.create(req.body.user).then((doc)=> {
                    res.json(doc);
                }).catch(function(err) {
                    res.json(err);
                });
            } else {
                res.json(data)
                //console.log("User has already been created before.")
            }
        }).catch(function(err) {
            res.json(err)
        });
    },
    /**
     * @param req.params.id
     * Return a user based on sub from the db
     */
    getuser: (req, res)=> {
        UserModel.find({
          _id: req.params.id
        }).then(function(doc) {
          res.json(doc);
        }).catch(function(err) {
          res.json(err);
        });
      },
    /**
     * Adding post to user Post Array
     */
    addpost: (req,res)=>{
        var newPost = req.body.post; 
        var user = req.body.user_id;

        UserModel.update(
            {user_id: user},
            {$push: {jobsPostedByThisUser: newPost}},
            req.body
        ).then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.json(err);
        });
    },
    /**
     * Updates the user's jobs applied
     * @param req
     * @param res
     */
    // appliedpost: (req,res)=>{
    //     var newPost = req.body.post;
    //     var user = req.body.user_id;
    //
    //     UserModel.update(
    //         {user_id: user},
    //         {$push: {jobsThisUserApplied: newPost}},
    //         req.body
    //     ).then(function(doc) {
    //         res.json(doc);
    //     }).catch(function(err) {
    //         res.json(err);
    //     });
    // },

    /**
     *
     * Update the Skill array from the db
     */
    addskillarray: (req,res)=>{
        console.log(req.body)
        UserModel.update(
            {_id: req.body.skillarray.user_id},
            {$set: {skills: req.body.skillarray.skillarray }},
            req.body
        ).then(function(doc) {
            console.log("SUCCESS BITCHES")
            res.json(doc);
        }).catch(function(err) {
            res.json(err);
        });
    },

    //function to search all post applied by user
    applied: (req, res) => {

        console.log("=====================================")
        console.log("Get all applied by user function")
        console.log("=====================================")
        console.log(req.params.id)

        UserModel.find({
          _id: req.params.id
        }).populate("jobsThisUserApplied")
        .then(function(doc){
            res.json(doc[0].jobsThisUserApplied)  
            console.log(doc[0].jobsThisUserApplied)
        })
      },

    removeApplicant: (req, res) => {

        console.log("=====================================")
        console.log("Remove Appicant Function triggered")
        console.log("=====================================")
        console.log("user id: " + req.body.user_id)
        console.log("job id: " + req.body.job_id)
        let job_id = mongoose.Types.ObjectId(req.body.job_id)

        JobModel.update(
            {_id: req.body.job_id},
            {$set: {appliedBy: "", status: "initiated"}},
            req.body)
        .then(function(doc){
            res.json(doc)  
            console.log(doc)
        })

        UserModel.update(
            {_id: req.body.user_id},
            {$pull: { jobsThisUserApplied: job_id} })
        .then(function(doc){
            res.json(doc)  
            console.log(doc)
        });
        
    },


    getKickedOffFromAJob: (job_id) => {
        UserModel.update(
            {_id: req.body.user_id},
            {$pull: { jobsThisUserApplied: job_id} })
        .then(function(doc) {
            res.json(doc);
        });
    },

    apply: (req, res) => {

        console.log("=====================================")
        console.log("Apply function controller triggered")
        console.log("=====================================")
        console.log("user id: " + req.body.user_id)
        console.log("job id: " + req.body.job_id)
        let job_id = mongoose.Types.ObjectId(req.body.job_id)

        JobModel.update(
            {_id: req.body.job_id},
            {$set: {appliedBy: req.body.user_id, status: "applied" }},
            req.body)
        .then(function(doc){
            res.json(doc)  
            console.log(doc)
        })

        UserModel.update(
            {_id: req.body.user_id},
            {$push: { jobsThisUserApplied: job_id} })

        .then(function(doc){
            res.json(doc)  
            console.log(doc)
        });

    }
}

module.exports = UserModelController;


