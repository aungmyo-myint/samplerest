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
  // conn.query("SELECT * FROM login_user", function (err, data, fields) {
  //   if(err) return next(new AppError(err))

  //   res.status(200).json({
  //     status: "success",
  //     length: data?.length,
  //     data: data,
  //   }).end();

  // });

  res.status(200).json({
    status: "success",
    length: data?.length,
    data: data,
  }).end();
  
};

exports.uploadData = (req, res, next) => { 
  if (!req.body) return next(new AppError("No form data found", 404)); 
  //const values = req.body.data;  
  console.log("request body of push is :", req.body); 
  console.log("request body data of push is :", req.body.data);
  res.status(201).json({
          status: "success",
          message: "PUSH success!",
          data: {insertId: "LATER"}
        }).end();

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

const maxInfo = [
  {
      "organizationCode": "1000",
      "serialNo": 1,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "10",
      "loanCycle": 1,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 1500000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 2,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "10",
      "loanCycle": 2,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 1500000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 3,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "10",
      "loanCycle": 3,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 2000000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 4,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "20",
      "loanCycle": 1,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 3000000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 5,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "20",
      "loanCycle": 2,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 4000000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 6,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "20",
      "loanCycle": 3,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 5000000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 7,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "20",
      "loanType": "",
      "loanCycle": 0,
      "calculateType": "IR",
      "startMonthNum": 0,
      "endMonthNum": 5,
      "loanLimitAmount": 0,
      "loanLimitRate": 0E-8
  },
  {
      "organizationCode": "1000",
      "serialNo": 8,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "20",
      "loanType": "",
      "loanCycle": 0,
      "calculateType": "IR",
      "startMonthNum": 6,
      "endMonthNum": 12,
      "loanLimitAmount": 0,
      "loanLimitRate": 1.50000000
  },
  {
      "organizationCode": "1000",
      "serialNo": 9,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "20",
      "loanType": "",
      "loanCycle": 0,
      "calculateType": "IR",
      "startMonthNum": 13,
      "endMonthNum": 35,
      "loanLimitAmount": 0,
      "loanLimitRate": 2.00000000
  },
  {
      "organizationCode": "1000",
      "serialNo": 10,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "20",
      "loanType": "",
      "loanCycle": 0,
      "calculateType": "IR",
      "startMonthNum": 36,
      "endMonthNum": 10000,
      "loanLimitAmount": 0,
      "loanLimitRate": 3.50000000
  },
  {
      "organizationCode": "1000",
      "serialNo": 13,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "30",
      "loanType": "",
      "loanCycle": 3,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 1500000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 11,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "30",
      "loanType": "",
      "loanCycle": 1,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 800000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 12,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "30",
      "loanType": "",
      "loanCycle": 2,
      "calculateType": "FR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 1000000.000,
      "loanLimitRate": 0
  },
  {
      "organizationCode": "1000",
      "serialNo": 14,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "statusCode": "01",
      "productType": "10",
      "loanType": "30",
      "loanCycle": 0,
      "calculateType": "IR",
      "startMonthNum": 0,
      "endMonthNum": 0,
      "loanLimitAmount": 0,
      "loanLimitRate": 2.00000000
  }
];

exports.getMaxInfo = (req, res, next) => {
  console.log("Getting info for loan max info")
  res.json(maxInfo).end();
}

exports.getVersion = (req, res, next) => {

}


exports.getCodes = (req, res, next) => {

}


exports.getNRC = (req, res, next) => {

}


exports.getEmployee = (req, res, next) => {

}


exports.getSurvey = (req, res, next) => {

}


exports.getCustomer = (req, res, next) => {

}


exports.getIndi = (req, res, next) => {

}