const Student = require("../model/Student.model");
const Students = require("../model/Student.model");
const router = require("express").Router();

/**
 * Retrieves all of the students in the database collection
 */
router.get("/", async (req, res, next) => {
    try {
        const students = await Students.find({}).populate("cohort");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Creates a new student
 */
router.post("/", async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort } = req.body;

        const newStudent = {
            firstName,
            lastName,
            email,
            phone,
            linkedinUrl,
            languages,
            program,
            background,
            image,
            cohort,
        };
        const createdStudent = await Student.create(newStudent);
        res.status(201).json(createdStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Retrieves all of the students for a given cohort
 */
router.get("/cohort/:cohortId", async (req, res, next) => {
    try {
        const { cohortId } = req.params;
        const studentsCohort = await Student.find({ cohort: cohortId }).populate("cohort");
        res.status(200).json(studentsCohort);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Retrieves a specific student by id
 */
router.get("/:studentId", async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate("cohort");
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * ? Updates a specific student by id
 */
router.put("/:studentId", async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const updatedStudent = req.body;
        const student = await Student.findByIdAndUpdate(studentId, updatedStudent);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Deletes a specific student by id
 */
router.delete("/:studentId", async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByIdAndDelete(studentId);
        res.status(202).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
