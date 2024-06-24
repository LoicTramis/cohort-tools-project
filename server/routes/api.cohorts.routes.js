const router = require("express").Router();
const path = require("path");
const cohorts = require("../cohorts.json");

router.get("/", (req, res, next) => {
    res.json(cohorts);
});

module.exports = router;
