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

const appVersion = {"releaseNotes":["-Fix bug"],"latestVersion":"0.2.5","latestVersionCode":21,"url":"http:\/\/192.168.177.107:8080\/skylark-m3s\/api\/downloadFile.m3s"}   
exports.getVersion = (req, res, next) => {
  console.log("Getting app version")
  res.json(appVersion).end();
}

const codeValues = [
  {
      "serialNo": 2,
      "categoryId": "BANK_STATUS_CODE",
      "categoryDesc": "Bank Status Code",
      "languageCode": "EN",
      "codeValue": "O",
      "codeShortDesc": "Open",
      "codeDesc": "Open",
      "sortSeq": 1
  },
  {
      "serialNo": 1,
      "categoryId": "BANK_STATUS_CODE",
      "categoryDesc": "Bank Status Code",
      "languageCode": "EN",
      "codeValue": "C",
      "codeShortDesc": "Close",
      "codeDesc": "Close",
      "sortSeq": 2
  } ]

exports.getCodes = (req, res, next) => {
  console.log("Getting code values")
  res.json(codeValues).end();
}


const nrcInfo = [
  {
      "serialNo": 1,
      "createUserId": "ryg",
      "updateUserId": "ryg",
      "statusCode": "01",
      "stateCode": "1/",
      "stateName": "Kachin",
      "townshipName": "Bhamo",
      "nrcPrefixCode": "BhMaNa(N)"
  },
  {
      "serialNo": 2,
      "createUserId": "ryg",
      "updateUserId": "ryg",
      "statusCode": "01",
      "stateCode": "1/",
      "stateName": "Kachin",
      "townshipName": "Chipwi",
      "nrcPrefixCode": "KhFaNa(N)"
  } ]
exports.getNRC = (req, res, next) => {
  console.log("Getting NRC Info values")
  res.json(nrcInfo).end();
}

const employeeInfo = [
{
  "serialNo": 80,
  "employeeNo": "M00172",
  "employeeName": "Naw Phaw Wah Htoo",
  "employeeLocalName": "ေနာ္ေဖာ္၀ါးထူး",
  "userId": "M00172",
  "password": "6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B",
  "userKind": "400",
  "employeeTypeCode": "00001",
  "branchCode": "1001",
  "departmentCode": "11400",
  "departmentName": "Sales Operation Division",
  "departmentLocalName": "Sales Operation Division",
  "teamCode": "114TA",
  "teamName": "HTY Team A",
  "teamLocalName": "HTY Team A",
  "positionTitleCode": "LOO",
  "positionTitleNm": "Loan Officer",
  "positionTitleLclNm": "ချေးငွေအရာရှိ",
  "entryDate": "2018-05-21"
},
{
  "serialNo": 49,
  "employeeNo": "M00099",
  "employeeName": "Zin Mar Myint",
  "employeeLocalName": "ဇင္မာျမင့္",
  "userId": "M00099",
  "password": "a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=",
  "userKind": "200",
  "employeeTypeCode": "00001",
  "branchCode": "1000",
  "departmentCode": "10100",
  "departmentName": "Operation Division",
  "departmentLocalName": "Operation Division",
  "teamCode": "101FA",
  "teamName": "Finance & Accounting A",
  "teamLocalName": "Finance & Accounting A",
  "positionTitleCode": "CAS",
  "positionTitleNm": "Cashier",
  "positionTitleLclNm": "ငွေကိုင်",
  "entryDate": "2017-10-16"
},
{
  "serialNo": 457,
  "employeeNo": "A007",
  "employeeName": "Aung Myo Myint Employee",
  "employeeLocalName": "Aung Myo Myint Employee",
  "userId": "A007",
  "password": "pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=",
  "userKind": "100",
  "employeeTypeCode": "00006",
  "branchCode": "1000",
  "departmentCode": "1000",
  "departmentName": "ရန္ကုန္ရံုးခ်ဳပ္",
  "departmentLocalName": "Head Office (Yangon Branch) ",
  "teamCode": "10400",
  "teamName": "Sales Operation Division",
  "teamLocalName": "Sales Operation Division",
  "positionTitleCode": "CRO",
  "positionTitleNm": "Credit Screening Officer",
  "positionTitleLclNm": "အကြွေးစိစစ်အရာရှိ",
  "entryDate": ""
},
{
  "serialNo": 455,
  "employeeNo": "MM9998",
  "employeeName": "ေအာင္ကိုကိုမင္း",
  "employeeLocalName": "Aung Ko Ko Min",
  "userId": null,
  "password": null,
  "userKind": null,
  "employeeTypeCode": "00006",
  "branchCode": "",
  "departmentCode": null,
  "departmentName": null,
  "departmentLocalName": null,
  "teamCode": null,
  "teamName": null,
  "teamLocalName": null,
  "positionTitleCode": null,
  "positionTitleNm": null,
  "positionTitleLclNm": null,
  "entryDate": "2020-11-30"
}]

exports.getEmployee = (req, res, next) => {
  console.log("Getting Employee Info values")
  res.json(employeeInfo).end();
}

const surveyItem = [
  {
      "serialNo": 1,
      "surveyGroupNo": "2020000001",
      "surveyItemNo": 1,
      "surveyItemContent": "အရမ်းဂရုတစိုက်စဉ်းစားပြီးနောက် ပိုက်ဆံကိုသုံးတယ်။ ",
      "surveyItemContentEng": "I use money after thinking it over very carefully. "
  },
  {
      "serialNo": 2,
      "surveyGroupNo": "2020000001",
      "surveyItemNo": 2,
      "surveyItemContent": "ဘဝရဲ့ ပြဿနာအများစုကို ငွေနဲ့ဖြေရှင်းနိုင်တယ်လို့ ထင်တယ်။ ",
      "surveyItemContentEng": "I think money can resolve most of the problems in life. "
  },
  {
      "serialNo": 3,
      "surveyGroupNo": "2020000001",
      "surveyItemNo": 3,
      "surveyItemContent": "ကိုယ်က သင့်တော်ပြည့်စုံတဲ့သူတစ်ယောက်ပါ။ ",
      "surveyItemContentEng": "I am a completely reasonable person. "
  }]

exports.getSurvey = (req, res, next) => {
  console.log("Getting Survey Items values")
  res.json(surveyItem).end();
}


const customer = [
  {
      "organizationCode": "1000",
      "serialNo": 56,
      "statusCode": "01",
      "createDatetime": 2020-11-16,
      "deleteDatetime": null,
      "updateDatetime": 2020-11-16,
      "studentsCnt": 3,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "customerNo": "20201116056",
      "customerNm": "ခရီးသွားကောက်ကြောင်း     ",
      "residentRgstId": "823456789",
      "employeeNo": null,
      "branchCode": "2001",
      "entryDate": null,
      "positionTitleNm": null,
      "salaryRatingCode": null,
      "gender": "M",
      "birthDate": "1990-05-10",
      "maritalStatus": "20",
      "savingAcctNum": null,
      "telNo": null,
      "mobileTelNo": null,
      "addr": "대구시 중구 봉덕동",
      "currResidentPerd": 0,
      "occupation": "회사원",
      "familyNum": 3,
      "hghschlNum": 2,
      "universityNum": 1,
      "houseOcpnType": "10",
      "remark": "잘살아보세",
      "businessOwnType": "03",
      "propApartmentYn": "N",
      "propHouseYn": "Y",
      "propCarYn": "N",
      "propMotorcycleYn": "N",
      "propMachinesYn": "N",
      "propFarmlandYn": "Y",
      "propOtherYn": null,
      "totPropEstmtdVal": 0,
      "ohtrOwnProperty": null,
      "otrPropEstmtdVal": 0,
      "workplaceName": null,
      "workplaceType": null,
      "workplacePeriod": 0,
      "employeeNum": 0,
      "workplaceAddr": null,
      "currWorkplacePerd": 0,
      "businessSttnFlg": null,
      "landScale": 0,
      "landOwnType": null,
      "otrIncome": 0,
      "totSaleIncome": 0,
      "totSaleExpense": 0,
      "rawmaterialExpans": 0,
      "wrkpRentExpns": 0,
      "employeeExpns": 0,
      "prmnEmplExpns": 0,
      "tmpyEmplExpns": 0,
      "trnsrtExpns": 0,
      "busUtlbilExpns": 0,
      "telExpns": 0,
      "taxExpns": 0,
      "goodsLossExpns": 0,
      "othrExpns1": 0,
      "othrExpns2": 0,
      "totBusNetIncome": 0,
      "fmlyTotIncome": 0,
      "fmlyTotExpense": 0,
      "foodExpns": 0,
      "houseMngtExpns": 0,
      "utlbilExpns": 0,
      "edctExpns": 0,
      "healthyExpns": 0,
      "fmlyTaxExpns": 0,
      "fmlyTrnsrtExpns": 0,
      "financeExpns": 0,
      "fmlyOtrExpns": 0,
      "fmlyTotNetIncome": 0,
      "tabletSyncSts": "01",
      "syncSts": "00",
      "maxValue": "1000000000000000000000000000000056",
      "seqnum": 1,
      "workplaceDate": null,
      "nrcStateCode": null,
      "nrcPrefixCode": null,
      "nrcNo": null
  },
  {
      "organizationCode": "1000",
      "serialNo": 57,
      "statusCode": "01",
      "createDatetime": 2020-11-16,
      "deleteDatetime": null,
      "updateDatetime": 2020-11-16,
      "studentsCnt": 3,
      "createUserId": "ryg",
      "deleteUserId": null,
      "updateUserId": "ryg",
      "customerNo": "20201116057",
      "customerNm": "သစ္စာချည်တိုင်           ",
      "residentRgstId": "125456789",
      "employeeNo": null,
      "branchCode": "2001",
      "entryDate": null,
      "positionTitleNm": null,
      "salaryRatingCode": null,
      "gender": "M",
      "birthDate": "1990-05-10",
      "maritalStatus": "20",
      "savingAcctNum": null,
      "telNo": null,
      "mobileTelNo": null,
      "addr": "대구시 중구 봉덕동",
      "currResidentPerd": 0,
      "occupation": "회사원",
      "familyNum": 3,
      "hghschlNum": 2,
      "universityNum": 1,
      "houseOcpnType": "10",
      "remark": "잘살아보세",
      "businessOwnType": "03",
      "propApartmentYn": "N",
      "propHouseYn": "Y",
      "propCarYn": "N",
      "propMotorcycleYn": "N",
      "propMachinesYn": "N",
      "propFarmlandYn": "Y",
      "propOtherYn": null,
      "totPropEstmtdVal": 0,
      "ohtrOwnProperty": null,
      "otrPropEstmtdVal": 0,
      "workplaceName": null,
      "workplaceType": null,
      "workplacePeriod": 0,
      "employeeNum": 0,
      "workplaceAddr": null,
      "currWorkplacePerd": 0,
      "businessSttnFlg": null,
      "landScale": 0,
      "landOwnType": null,
      "otrIncome": 0,
      "totSaleIncome": 0,
      "totSaleExpense": 0,
      "rawmaterialExpans": 0,
      "wrkpRentExpns": 0,
      "employeeExpns": 0,
      "prmnEmplExpns": 0,
      "tmpyEmplExpns": 0,
      "trnsrtExpns": 0,
      "busUtlbilExpns": 0,
      "telExpns": 0,
      "taxExpns": 0,
      "goodsLossExpns": 0,
      "othrExpns1": 0,
      "othrExpns2": 0,
      "totBusNetIncome": 0,
      "fmlyTotIncome": 0,
      "fmlyTotExpense": 0,
      "foodExpns": 0,
      "houseMngtExpns": 0,
      "utlbilExpns": 0,
      "edctExpns": 0,
      "healthyExpns": 0,
      "fmlyTaxExpns": 0,
      "fmlyTrnsrtExpns": 0,
      "financeExpns": 0,
      "fmlyOtrExpns": 0,
      "fmlyTotNetIncome": 0,
      "tabletSyncSts": "01",
      "syncSts": "00",
      "maxValue": "1000000000000000000000000000000057",
      "seqnum": 2,
      "workplaceDate": null,
      "nrcStateCode": null,
      "nrcPrefixCode": null,
      "nrcNo": null
  }]

exports.getCustomer = (req, res, next) => {
  console.log("Getting Customer values")
  res.json(customer).end();
}


const indiValue = [
  {
      "organizationCode": "1000",
      "serialNo": 1,
      "statusCode": "01",
      "createDatetime": "2020-11-18 15:55:01",
      "createUserId": "M00021",
      "deleteDatetime": null,
      "deleteUserId": "",
      "updateDatetime": "2020-11-18 15:55:01",
      "updateUserId": "M00021",
      "channelDeviceType": "00010",
      "openBranchCode": "1000",
      "openUserId": "admin",
      "mngtBranchCode": "1000",
      "mngtUserId": "M00021",
      "applicationNo": "202001000000001",
      "tabletAplcNo": "",
      "referAplcNo": "",
      "loanType": "30",
      "cstNewExistFlg": "E",
      "loanCycle": 1,
      "applicationAmt": 1500000.000,
      "applicationDate": "2020-01-18",
      "loantermCnt": 12.00000000,
      "borrowerName": "မင္းေက်ာ္ျငိမ္းခ်မ္း",
      "customerNo": "20200000165",
      "loanCode": "",
      "savingAcctNum": "SAV123",
      "gender": "M",
      "birthDate": "1992-08-24",
      "maritalStatus": "20",
      "residentRgstId": "NRCEMP00022",
      "telNo": "123",
      "mobileTelNo": "456",
      "branchCode": "1001",
      "entryDate": "2017-01-16",
      "positionTitleNm": "Assistant Branch Manager",
      "positionTitleCode": null,
      "salaryRatingCode": "",
      "addr": "",
      "familyNum": null,
      "age": 30,
      "hghschlNum": null,
      "universityNum": null,
      "studentCnt": 0,
      "currResidentPerd": null,
      "houseOcpnType": null,
      "businessOwnType": null,
      "coCustomerNo": null,
      "coBrwerName": null,
      "coBrwerBirthDt": null,
      "coBrwerRgstId": null,
      "coBrwerTelNo": null,
      "coBrwerMbleTelNo": null,
      "borrowerRltn": null,
      "coOccupation": null,
      "workplaceName": null,
      "workplaceType": null,
      "workplacePeriod": 0,
      "employeeNum": null,
      "workplaceAddr": null,
      "currWorkplacePerd": 0,
      "landScale": null,
      "landOwnType": null,
      "totSaleIncome": 0,
      "totSaleExpense": 0,
      "rawmaterialExpans": 0,
      "wrkpRentExpns": 0,
      "employeeExpns": 0,
      "trnsrtExpns": 0,
      "goodsLossExpns": 0,
      "othrExpns1": 0,
      "othrExpns2": 0,
      "totBusNetIncome": 0,
      "fmlyTotIncome": 0,
      "fmlyTotExpense": 0,
      "foodExpns": 0,
      "houseMngtExpns": 0,
      "utlbilExpns": 0,
      "edctExpns": 0,
      "healthyExpns": 0,
      "financeExpns": 0,
      "fmlyOtrExpns": 0,
      "fmlyTotNetIncome": 0,
      "totNetIncome": 0,
      "remark": "",
      "tabletSyncSts": "01",
      "syncSts": "00",
      "productType": "20",
      "groupAplcNo": null,
      "pastLoanAmount": 0,
      "pastdueMonthCnt": 0,
      "pastLoanCycle": 0,
      "pastLoanRating": null,
      "pastCreditEmplNm": null,
      "loanLimitAmt": 0.000,
      "maxValue": "1000000000000000000000000000000001",
      "seqnum": 1
  },
  {
      "organizationCode": "1000",
      "serialNo": 2,
      "statusCode": "01",
      "createDatetime": "2020-11-19 20:05:13",
      "createUserId": "M00021",
      "deleteDatetime": null,
      "deleteUserId": "",
      "updateDatetime": "2020-11-19 20:05:13",
      "updateUserId": "M00021",
      "channelDeviceType": "00010",
      "openBranchCode": "1000",
      "openUserId": "M00243",
      "mngtBranchCode": "1000",
      "mngtUserId": "M00021",
      "applicationNo": "202001000000002",
      "tabletAplcNo": "",
      "referAplcNo": "",
      "loanType": "30",
      "cstNewExistFlg": "E",
      "loanCycle": 1,
      "applicationAmt": 1500000.000,
      "applicationDate": "2020-01-18",
      "loantermCnt": 12.00000000,
      "borrowerName": "ေကာင္းျမတ္ေဇာ္",
      "customerNo": "20201116149",
      "loanCode": "",
      "savingAcctNum": "SAVING1234",
      "gender": "M",
      "birthDate": "1995-05-13",
      "maritalStatus": "10",
      "residentRgstId": "NRC1202302",
      "telNo": "102-1235-3213",
      "mobileTelNo": "999-102-1023",
      "branchCode": "1005",
      "entryDate": "2017-01-16",
      "positionTitleNm": "Loan Officer",
      "positionTitleCode": null,
      "salaryRatingCode": "04",
      "addr": "미얀마 중구",
      "familyNum": null,
      "age": 27,
      "hghschlNum": null,
      "universityNum": null,
      "studentCnt": 0,
      "currResidentPerd": null,
      "houseOcpnType": null,
      "businessOwnType": null,
      "coCustomerNo": null,
      "coBrwerName": null,
      "coBrwerBirthDt": null,
      "coBrwerRgstId": null,
      "coBrwerTelNo": null,
      "coBrwerMbleTelNo": null,
      "borrowerRltn": null,
      "coOccupation": null,
      "workplaceName": null,
      "workplaceType": null,
      "workplacePeriod": 0,
      "employeeNum": null,
      "workplaceAddr": null,
      "currWorkplacePerd": 0,
      "landScale": null,
      "landOwnType": null,
      "totSaleIncome": 0,
      "totSaleExpense": 0,
      "rawmaterialExpans": 0,
      "wrkpRentExpns": 0,
      "employeeExpns": 0,
      "trnsrtExpns": 0,
      "goodsLossExpns": 0,
      "othrExpns1": 0,
      "othrExpns2": 0,
      "totBusNetIncome": 0,
      "fmlyTotIncome": 0,
      "fmlyTotExpense": 0,
      "foodExpns": 0,
      "houseMngtExpns": 0,
      "utlbilExpns": 0,
      "edctExpns": 0,
      "healthyExpns": 0,
      "financeExpns": 0,
      "fmlyOtrExpns": 0,
      "fmlyTotNetIncome": 0,
      "totNetIncome": 0,
      "remark": "",
      "tabletSyncSts": "01",
      "syncSts": "00",
      "productType": "20",
      "groupAplcNo": null,
      "pastLoanAmount": 0,
      "pastdueMonthCnt": 0,
      "pastLoanCycle": 0,
      "pastLoanRating": null,
      "pastCreditEmplNm": null,
      "loanLimitAmt": 0.000,
      "maxValue": "1000000000000000000000000000000002",
      "seqnum": 2
  }]

exports.getIndi = (req, res, next) => {
  console.log("Getting indiValue values")
  res.json(indiValue).end();
}