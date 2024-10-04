const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    company: { type: String },
    message: { type: String },

}, { timestamps: true })

module.exports = mongoose.model("enquiry", enquirySchema)