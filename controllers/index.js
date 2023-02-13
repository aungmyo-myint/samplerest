const conn = require("../services/dbConnection");
const AppError = require("../utils/AppError");


exports.getStart = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "hello world"
  })
};


exports.updateTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "UPDATE todolist SET status='completed' WHERE id=?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo updated!",
        });
      }
    );
};

exports.deleteTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "DELETE FROM todolist WHERE id=?",
      [req.params.id],
      function (err, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo deleted!",
        });
      }
    );
   };



exports.getUsers = (req, res, next) => {
  conn.query("SELECT * FROM login_user", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });

};



exports.uploadData = (req, res, next) => { 
  if (!req.body) return next(new AppError("No form data found", 404)); 
  const values = [req.body.name, "pending"]; 
  console.log("request body is :", JSON.stringify(req.body));
  conn.query( 
    "INSERT INTO txn (cus_name, dob, amount, note, txn_date, login_id) VALUES(?)",
    [values], 
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo created!",
      });
    }
  );
 };



exports.downloadData = (req, res, next) => {
  conn.query("SELECT * FROM txn", function (err, data, fields) {
    if(err) return next(new AppError(err))
  //  console.log("data:", data); 
  //  console.log("fields:", fields);
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });

};

