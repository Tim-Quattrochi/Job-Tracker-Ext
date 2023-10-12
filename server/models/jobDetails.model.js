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

JobDetails.updateById = (id, jobDetails, result) => {
  sql.query(
    "UPDATE jobdetails SET title = ?, companyName = ?, dateApplied = ?, status = ?, additionalDetails = ? WHERE id = ?",
    [
      jobDetails.title,
      jobDetails.companyName,
      jobDetails.dateApplied,
      jobDetails.status,
      jobDetails.additionalDetails,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows === 0) {
        // did not find details with the provided id.
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated jobDetails: ", { id: id, ...jobDetails });
      result(null, { id: id, ...jobDetails });
    }
  );
};

JobDetails.remove = (id, result) => {
  sql.query("DELETE FROM jobdetails WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      // did not find details with the provided id.
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted jobDetails with id: ", id);
    result(null, res);
  });
};

module.exports = JobDetails;
