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



router.route("/test").get(controllers.getStart).post(controllers.getStart);
router
 .route("/test:id")
 .get(controllers.getStart)
 .put(controllers.getStart)
 .delete(controllers.getStart);
 
module.exports = router;