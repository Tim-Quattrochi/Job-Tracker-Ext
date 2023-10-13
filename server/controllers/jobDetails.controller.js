const JobDetails = require("../models/jobDetails.model");

const createJobDetails = (req, res) => {
  const {
    id = 5, //hardcoding user id for now.
    title,
    companyName,
    dateApplied,
    status,
    additionalDetails,
  } = req.body;
  if (!title || !companyName || !dateApplied || !status) {
    return res
      .status(400)
      .json({ message: "please fill out all required fields" });
  }

  const jobDetails = new JobDetails({
    user_id: id, //id will come from user auth later.
    title,
    companyName,
    dateApplied,
    status,
    additionalDetails,
  });

  //saving to db.
  JobDetails.create(jobDetails, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          err.message ||
          "An error occurred while creating the job details",
      });
    } else {
      res.status(201).json(data);
    }
  });
};

const getOneJob = (req, res) => {};

const updateJob = (req, res) => {};

const deleteJob = (req, res) => {};

module.exports = {
  createJobDetails,
  getOneJob,
  updateJob,
  deleteJob,
};
