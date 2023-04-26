const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getStart);

 
router.route("/api/getUsers").get(controllers.getUsers);


router.route("/api/txn").get(controllers.downloadData).post(controllers.uploadData);
router
 .route("/api/txn:id")
 .get(controllers.downloadData)
 .put(controllers.uploadData);

 

router.route("/skylark-m3s/api/maxInfo.m3s").get(controllers.getMaxInfo);
router.route("/skylark-m3s/api/jsonUrl.m3s").get(controllers.getVersion)
router.route("/skylark-m3s/api/codes.m3s").get(controllers.getCodes)
router.route("/skylark-m3s/api/nrcCodeInfo.m3s").get(controllers.getNRC)
router.route("/skylark-m3s/api/employees.m3s").get(controllers.getEmployee) 
router.route("/skylark-m3s/api/surveyItems.m3s").get(controllers.getSurvey) 
router.route("/skylark-m3s/api/customers.m3s").get(controllers.getCustomer) 
router.route("/skylark-m3s/api/individualLoans.m3s").get(controllers.getIndi) 


router.route("/skylark-m3s/file/upload.m3s").post(controllers.uploadData);


router.route("/skylark-m3s/api/individualLoan.m3s").post(controllers.uploadData);
router.route("/skylark-m3s/api/groupLoan.m3s").post(controllers.uploadData);

router.route("/skylark-m3s/api/customers.m3s").get(controllers.downloadData).post(controllers.uploadData);
router.route("/skylark-m3s/api/surveyResult.m3s").get(controllers.downloadData).post(controllers.uploadData);


 router.route("/api/txn/drop").post(controllers.deleteData);
 router
  .route("/api/txn/drop")
  .post(controllers.deleteData);

router.route("/test").get(controllers.getStart).post(controllers.getStart);
router
 .route("/test:id")
 .get(controllers.getStart)
 .put(controllers.getStart)
 .delete(controllers.getStart);
 
module.exports = router;