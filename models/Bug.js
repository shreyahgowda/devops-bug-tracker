const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
    title: String,
    description: String,
    module: String,
    severity: String,
    status: {
        type: String,
        default: "Open"
    },
    assignedTo: {
        type: String,
        default: ""
    },
    reportedBy: String,
    category: String,
    analysis: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bug", BugSchema);