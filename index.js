const express = require("express");
const http = require('http');
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/AppError");
const errorHandler = require("./utils/errorHandler.js");

const app = express();
// const server = http.createServer(app);

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.all("*", (req, res, next) => {   next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));  });


// app.listen(5000 || process.env.PORT , () => {  console.log(`server running on port 5000/ ${process.env.PORT}`); });

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), () => {   console.log('Express server listening on port ' + server.address().port);  });


// server.listen(3000);
// console.log('Express server started on port %s', server.address().port);

module.exports = app;