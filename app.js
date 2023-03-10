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


app.listen(5000 || process.env.PORT , () => {  console.log(`server running on port 5000/ ${process.env.PORT}`); });

module.exports = app;