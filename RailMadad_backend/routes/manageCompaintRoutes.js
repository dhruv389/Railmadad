const express = require("express");
const {
  getAdminCompaints,
  DeleteComplaint,
  SendComplaintToStaff,
  AfterResolvedSendToAdmin,
} = require("../controllers/MangeComplaint");

const router = express.Router();
const { ComplaintsauthMiddleware } = require("../middlewares/AuthMiddleware");

router.get("/getadmincomplaints", getAdminCompaints);
router.post("/sendcomplainttostaffbyadmin", SendComplaintToStaff);
router.post("/send_complaint_to_admin_bystaff", AfterResolvedSendToAdmin);

router.delete("/deletecomplaintbyadmin", DeleteComplaint);
module.exports = router;
