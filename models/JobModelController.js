var JobModel = require("./JobModel.js");
var UserModel = require("./UserModel.js");

// ORM API
var JobModelController = {
    JobModel: function(callback) {
    	JobModel.find({}, function(err, data) {
    		if (err) {
    			console.log(err);
    		}
    		else {
    			callback(data);
    		}
    	});
    },
    add: function(name, callback) {
        var newJob = new JobModel({name: name});
        newJob.save(function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    removedByName: function(name, callback) {
        JobModel.findOneAndRemove({name: name}, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    },
    removeAll: function(callback) {
        JobModel.remove(function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback(data);
            }
        });
    }
}

module.exports = JobModelController;