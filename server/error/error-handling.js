const errorHandler = (err, req, res, next) => {
    if (!res.headersSent) {
        res.status(500).json({ error: "Internal servr error" });
    }
};
const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "No page found" });
};

module.exports = { errorHandler, notFoundHandler };
