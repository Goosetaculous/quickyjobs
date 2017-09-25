var express = require("express");
var router = express.Router();
var path = require("path");
var Job = require("../controllers/JobModelController.js");


// collect all job data
router.get("/all", (req, res)=> {

	console.log("api route job/all called.");

	Job.findAll((data)=> {
		console.log("ORM returned");
		console.log(data);
		res.json(data);
	});
});

// add new job
router.post("/add", (req, res)=> {

	console.log("api route job/add called.");


	var jobName = req.body.jobName;
	var postedBy = req.body.postedBy;
	var jobType = req.body.jobType;
	var jobLocation = req.body.jobLocation;
	var jobDate = req.body.jobDate;
	var jobPrice = req.body.jobPrice;


	Job.add(jobName, postedBy, jobType, jobLocation, jobDate, jobPrice, (data)=>{
		res.json(data); // actually frontend does not nned this returned obj
	});
});

// apply for a job
router.patch("/apply", (req, res)=> {
	// var job_id = req.body.job_id;
	// var applicant_id = req.body.user_id
	var job_id = req.body.job_id;
	var applicant_id = req.body.user_id;
	console.log("===========================")
	console.log("apply route triggered")
	console.log("===========================")
	console.log("job ID collected: " + job_id);
	console.log("applicant ID collected: " + applicant_id);
	
	Job.applyForAJob(job_id, applicant_id, (data) =>{
		res.json(data); // actually frontend does not nned this returned obj
	});
});

// confirm a job
router.post("/confirm", (req, res)=> {
	var jobId = req.body.jobId;
	Job.confirmAJob(jobId, (data)=> {
		res.json(data); // actually frontend does not nned this returned obj
	});
});

// review a job
router.post("/review", (req, res)=> {
	var jobId = req.body.jobId;
	var reviewFromJobPoster = req.body.reviewFromJobPoster;
	Job.confirmAJob(jobId, reviewFromJobPoster, (data)=> {
		res.json(data); // actually frontend does not nned this returned obj
	});
});


// (job poster) cancel a job
router.post("/cancel_job", (req, res)=> {
	var jobId = req.body.jobId;
	Job.cancelAJob(req.body.jobId, (data)=>{
		res.json(data)
	});
});

// (applicant) withdraw an offer
router.post("/withdraw_offer", (req, res)=> {
	var jobId = req.body.jobId;
	Job.withdrawOffer(req.body.jobId, (data)=>{
		res.json(data)
	});
});




module.exports = router;
