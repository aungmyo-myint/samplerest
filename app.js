const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/AppError");
const errorHandler = require("./utils/errorHandler.js");

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.all("*", (req, res, next) => {
 next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});


const PORT = 5000;
app.listen(PORT, () => {
 console.log(`server running on port ${PORT}`);
});

module.exports = app;