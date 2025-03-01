const mongoose = require('mongoose');

const stationComplaintSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    stationName: {
        type: String,
        required: true
    },
    dateOfComplaint: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    media: [
        {
            fileType: { type: String, enum: ['Image', 'Video', 'Audio'], required: true },
            url: { type: String, required: true }
        }
    ]
    , department: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('StationComplaint', stationComplaintSchema);
