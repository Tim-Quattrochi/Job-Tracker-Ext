const jobDetailsRouter = require("express").Router();
const jobDetails = require("../controllers/jobDetails.controller.js");

jobDetailsRouter.post("/", jobDetails.createJobDetails);

jobDetailsRouter.get("/:id", jobDetails.getOneJob);

jobDetailsRouter.get("/job/:status", jobDetails.findAllByStatus);

jobDetailsRouter.put("/:id", jobDetails.updateJob);

jobDetailsRouter.delete("/:id", jobDetails.deleteJob);

module.exports = jobDetailsRouter;
