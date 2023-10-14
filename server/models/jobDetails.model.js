const sql = require("../config/db");

/**
 * @class JobDetails
 * @classdesc represents the job details model.
 * @param {object} jobDetails - contains the details of the job.
 */
class JobDetails {
  constructor(jobDetails) {
    this.user_id = jobDetails.user_id;
    this.title = jobDetails.title;
    this.companyName = jobDetails.companyName;
    this.dateApplied = jobDetails.dateApplied;
    this.status = jobDetails.status;
    this.additionalDetails = jobDetails.additionalDetails;
  }

  /**
   * @method create - creates a new job details entry in the database.
   * @param {object} newJobDetails - contains the details of the job.
   * @param {function} result - callback function.
   * @returns {function} result - callback function.
   */
  static create(newJobDetails, result) {
    sql.query(
      "INSERT INTO jobdetails SET ?",
      newJobDetails,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, {
          id: res.insertId,
          ...newJobDetails,
        });
      }
    );
  }

  /**
   * @param {number} jobDetailsId  - id of the job details to be retrieved.
   * @param {function} result - callback function.
   * @returns {function} result  - callback function that retuns the job details from the database.
   */
  static findById(jobDetailsId, result) {
    sql.query(
      `SELECT * FROM jobdetails WHERE id = ?`,
      [jobDetailsId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res[0]);
          return;
        }
        // did not find details with the provided id.
        result({ kind: "not_found" }, null);
      }
    );
  }

  static updateById(id, jobDetails, result) {
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

        result(null, { id: id, ...jobDetails });
      }
    );
  }
  static remove(id, result) {
    sql.query(
      "DELETE FROM jobdetails WHERE id = ?",
      id,
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
        console.log("deleted jobDetails with id: ", id);
        result(null, res);
      }
    );
  }

  static getAllByStatus(status, result) {
    sql.query(
      `SELECT * FROM jobdetails WHERE status = ?`,
      [status],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        result(null, res);
      }
    );
  }

  static getAllByUserId(id, result) {
    sql.query(
      `SELECT * FROM jobdetails WHERE user_id = ?`,
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return result(null, err);
        }

        result(null, res);
      }
    );
  }
}

module.exports = JobDetails;
