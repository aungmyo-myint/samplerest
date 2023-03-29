const conn = require("../services/dbConnection");
const AppError = require("../utils/AppError");


exports.getStart = (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  res.status(200).json({
    status: "success",
    message: "hello world"
  }).end() 
};

exports.updateTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

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
    res.end();
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
    res.end();
};

exports.getUsers = (req, res, next) => {
  conn.query("SELECT * FROM login_user", function (err, data, fields) {
    if(err) return next(new AppError(err))

    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    }).end();

  });
  
};

exports.uploadData = (req, res, next) => { 
  if (!req.body) return next(new AppError("No form data found", 404)); 
  const values = req.body.data;  
  console.log("request values to push is :", values);
  console.log("request body ofo push is :", req.body);
  //console.log("all req data is", req)
  // conn.query( 
  //   "INSERT INTO txn (cus_name, dob, amount, note, txn_date, login_id) VALUES(?)",
  //   [values], 
  //   function (err, data, fields) {
  //     if (err) return next(new AppError(err, 500));
  //     res.status(201).json({
  //       status: "success",
  //       message: "upload success!",
  //       data: {insertId: data.insertId}
  //     }).end();
  //   }
  // );
};

exports.downloadData = (req, res, next) => {
  console.log("params", req.query);
  if(!req.query.loginId)  return next(new AppError("Missing loginId", 404));
  conn.query("SELECT * FROM txn where login_id =?", [req.query.loginId], function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });

};

exports.deleteData = (req, res, next) => {
  if (!req.query.txnId || !req.query.loginId) return next(new AppError("No txn id is found", 404));
  conn.query(
    "DELETE FROM txn WHERE id=? and login_id=?", [req.query.txnId, req.query.loginId],  
    function (err, fields) {
    //   "fields": {
    //     "fieldCount": 0,
    //     "affectedRows": 1,
    //     "insertId": 0,
    //     "info": "",
    //     "serverStatus": 2,
    //     "warningStatus": 0
    // }
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Delete successfully",
        affectedRows: fields.affectedRows
      });
    }
  );
  
};
