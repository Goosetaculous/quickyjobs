var express = require("express");
var router = express.Router();
var path = require("path");
var UserModelController = require("../controllers/UserModelController.js");


//User Routes

// collect and display all user data
router.get("/all", UserModelController.all);

// // collect user info per user account name (unique acount id found in id_token)
// router.get("/user/:account_id?", User.test);

// Add new User
router.post("/add", UserModelController.add);

// Update an existing user with added post with a speicified id param, using data in req.body 
router.patch("/user/:accout_id/addpost", UserModelController.addpost);

// // Delete a specific user using the id in req.params.id
// router.delete("/user/:account_id", User.<>);

// // collect user info per ID
// router.get("/user/:account_id?/job_posted", User.);
// router.get("/user/:account_id?/job_applied", User.);


module.exports = router;
