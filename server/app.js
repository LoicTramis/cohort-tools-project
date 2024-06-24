const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
app.use(
    cors({
        origin: ["http://localhost:5173"], // add more if necessary
    })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.use("/api/cohorts", require("./routes/api.cohorts.routes.js"));
app.use("/api/students", require("./routes/students.routes"));

app.get("/docs", (req, res) => {
    res.sendFile(__dirname + "/views/docs.html");
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
