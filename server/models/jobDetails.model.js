const sql = require("../config/db");

const JobDetails = function (jobDetails) {
  this.title = jobDetails.title;
  this.companyName = jobDetails.companyName;
  this.dateApplied = jobDetails.dateApplied;
  this.status = jobDetails.status;
  this.additionalDetails = jobDetails.additionalDetails;
};

JobDetails.create = (newJobDetails, result) => {
  sql.query(
    "INSERT INTO jobdetails SET ?",
    newJobDetails,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created jobDetails: ", {
        id: res.insertId,
        ...newJobDetails,
      });
    }
  );
};

JobDetails.findById = (jobDetailsId, result) => {
  sql.query(
    `SELECT * FROM jobdetails WHERE id = ${jobDetailsId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found jobDetails: ", res[0]);
        result(null, res[0]);
        return;
      }
      // did not find details with the provided id.
      result({ kind: "not_found" }, null);
    }
  );
};
