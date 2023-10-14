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

const getOneJob = (req, res) => {
  const { id } = req.params;

  JobDetails.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .json({ message: `Job details with id ${id} not found` });
      } else {
        res.status(500).json({
          message: `Error retrieving job details with id ${id}`,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

const updateJob = (req, res) => {
  //todo: add validation for required fields.
  //todo: add authorization check for user.
  const { id } = req.params;
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });
  }

  JobDetails.updateById(id, new JobDetails(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .json({ message: `Job details with id ${id} not found` });
      } else {
        res.status(500).json({
          message: `Error updating job details with id ${id}`,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

const deleteJob = (req, res) => {
  const { id } = req.params;

  JobDetails.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .json({ message: `Job details with id ${id} not found` });
      } else {
        res.status(500).json({
          message: `Error deleting job details with id ${id}`,
        });
      }
    } else {
      res.status(200).json({ message: `Job deleted successfully` });
    }
  });
};

const findAllByStatus = (req, res) => {
  const { status } = req.params;

  JobDetails.getAllByStatus(status, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          err.message ||
          "An error occurred while retrieving job details",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

const getAllJobsByUserId = (req, res) => {
  const { id } = req.params;

  JobDetails.getAllByUserId(id, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          err.message ||
          "An error occurred while retrieving job details",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  createJobDetails,
  getOneJob,
  updateJob,
  deleteJob,
  findAllByStatus,
  getAllJobsByUserId,
};
