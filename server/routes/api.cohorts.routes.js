const router = require("express").Router();
const path = require("path");
const Cohorts = require("../model/Cohort.model");

router.get("/", (req, res) => {
  Cohorts.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

module.exports = router;
