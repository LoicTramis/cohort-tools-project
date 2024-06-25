const Students = require("../model/Student.model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
    try {
        const students = await Students.find();
        res.json(students);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
