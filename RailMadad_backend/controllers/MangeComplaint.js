const Complaint = require("../models/Complaint");

const getAdminCompaints = async (req, res) => {
  const { a, b, s, c } = req.query;
  try {
    // Define the filter parameters dynamically
    const filter = {};

    if (c) filter.category = c;
    if (a) filter.ReceiverType = a;
    if (b) filter.stationName = b;
    if (s) filter.status = s;

    // Query the database to find complaints with the specified filters
    const complaints = await Complaint.find(filter);

    console.log(complaints);
    // If no complaints are found, return a 404 response
    if (!complaints.length) {
      console.log("------------");
      return res.status(200).json({
        message: "No complaints found with the given criteria.",
      });
    }
    // Return the matching complaints
    res.status(200).json({
      message: "Complaints fetched successfully.",
      complaints,
    });
    console.log(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err.message);
    res.status(500).json({
      message: "Error fetching complaints.",
      error: err.message,
    });
  }
};

const DeleteComplaint = async (req, res) => {
  const { complaintId } = req.body;
  console.log(complaintId);
  // Validate the required fields
  if (!complaintId) {
    return res.status(400).json({ message: "complaintId is required" });
  }

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findByIdAndDelete(complaintId);

    // Return the successful response
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res
      .status(500)
      .json({ message: "Error deleting complaint", error: err.message });
  }
};

const SendComplaintToStaff = async (req, res) => {
  const { complaintId } = req.body;
  console.log(complaintId);
  // Validate the required fields
  if (!complaintId) {
    return res.status(400).json({ message: "complaintId  are required" });
  }

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    // If no complaint found
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Send the complaint to the staff
    complaint.ReceiverType = "Staff";
    complaint.status = "In Progress";
    await complaint.save();

    // Return the successful response
    res.status(200).json({ message: "Complaint sent to staff successfully" });
  } catch (err) {
    console.error("Error sending complaint to staff:", err);
    res
      .status(500)
      .json({
        message: "Error sending complaint to staff",
        error: err.message,
      });
  }
};

const AfterResolvedSendToAdmin = async (req, res) => {
  const { complaintId, AfterImage } = req.body;

  // Validate the required fields
  if (!complaintId) {
    return res.status(400).json({ message: "complaintId  are required" });
  }

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    // If no complaint found
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Send the complaint to the staff
    complaint.ReceiverType = "Admin";
    complaint.status = "Resolved";
    if (AfterImage) {
      complaint.AfterImage = AfterImage;
    }
    await complaint.save();

    // Return the successful response
    res.status(200).json({ message: "Complaint sent to Admin successfully" });
  } catch (err) {
    console.error("Error sending complaint to Admin:", err);
    res
      .status(500)
      .json({
        message: "Error sending complaint to Admin",
        error: err.message,
      });
  }
};

module.exports = {
  getAdminCompaints,
  DeleteComplaint,
  SendComplaintToStaff,
  AfterResolvedSendToAdmin,
};
