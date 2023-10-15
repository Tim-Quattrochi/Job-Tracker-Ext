const jobDetailsRouter = require("express").Router();
const jobDetails = require("../controllers/jobDetails.controller.js");
const verifyJWT = require("../middleware/verifyJWT.js");

jobDetailsRouter.post("/:id", jobDetails.createJobDetails);

jobDetailsRouter.get("/:id", jobDetails.getOneJob);

jobDetailsRouter.get("/job/:status", jobDetails.findAllByStatus);
jobDetailsRouter.get(
  "/jobs/:id",
  verifyJWT,
  jobDetails.getAllJobsByUserId
);

jobDetailsRouter.put("/:id", jobDetails.updateJob);

jobDetailsRouter.delete("/:id", jobDetails.deleteJob);

module.exports = jobDetailsRouter;
