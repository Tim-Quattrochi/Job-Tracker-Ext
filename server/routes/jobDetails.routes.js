const jobDetailsRouter = require("express").Router();
const jobDetails = require("../controllers/jobDetails.controller.js");

router.post("/", jobDetails.create);

router.get("/:id", jobDetails.findOne);

router.put("/:id", jobDetails.update);

router.delete("/:id", jobDetails.delete);

module.exports = jobDetailsRouter;
