const router = require("express").Router();
const Cohort = require("../model/Cohort.model");

// GET ALL COHORTS ROUTE
router.get("/", async (req, res, next) => {
  const query = {};
  const { campus, program } = req.query;
  if (campus) {
    query.campus = campus;
  }
  if (program) {
    query.program = program;
  }
  try {
    const cohorts = await Cohort.find(query, {
      cohortName: 1,
      campus: 1,
      program: 1,
      inProgress: 1,
      cohortSlug: 1,
    });
    console.log("Retrieved cohorts ->", cohorts);
    res.json(cohorts);
  } catch (error) {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  }
});

// GET ONE COHORT ROUTE
router.get("/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;
  const oneCohort = await Cohort.findOne({ _id: cohortId });
  console.log("Retrieved cohorts ->", oneCohort);
  res.json(oneCohort);
  try {
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cohort" });
    console.error(`Error while retrieving cohort id: ${cohortId} ->`, error);
  }
});

// UPDATE ONE COHORT ROUTE
router.put("/:cohortId", async (req, res, next) => {
  try {
    const {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;

    const { cohortId } = req.params;

    const cohortToUpdate = {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    };
    const updatedCohort = await Cohort.findByIdAndUpdate(
      { _id: cohortId },
      cohortToUpdate,
      { new: true }
    );

    res.status(200).json(updatedCohort);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cohort" });
  }
});

// POST COHORT ROUTE
router.post("/", async (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  const cohortToCreate = {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  };

  const newCohort = await Cohort.create(cohortToCreate);

  res.status(201).json(newCohort);
  try {
  } catch (error) {
    res.status(500).json({ error: "Failed to add cohort" });
    console.log(error);
  }
});

// DELETE COHORT ROUTE

router.delete("/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    await Cohort.findOneAndDelete({ _id: cohortId });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cohort" });
    console.log(error);
  }
});

module.exports = router;
