const router = require("express").Router();
const Cohorts = require("../model/Cohort.model");

router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohorts.find({});
    console.log("Retrieved cohorts ->", cohorts);
    res.json(cohorts);
  } catch (error) {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  }
});

module.exports = router;
