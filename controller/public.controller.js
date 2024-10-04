const asyncHandler = require("express-async-handler")
const Projects = require("../models/Projects")
const Carousel = require("../models/Carousel")
const sendEmail = require("../utils/email")
const Enquiry = require("../models/Enquiry")

exports.fetchProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find()
    res.json({ message: "Project Fetch Success...!", result })
})
exports.getAllCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})
exports.getProjectDetail = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Projects.findById(id)
    res.status(200).json({ message: "Project Details Fetch success", result })
})



exports.AddEnqueryMessage = asyncHandler(async (req, res) => {
    const { name, email, mobile, message, company } = req.body
    const { isError, error } = checkEmpty({ name, email, mobile, message, company })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile" })
    }
    await sendEmail({
        to: "nehamuley955@gmail.com",
        message: `company ${company}, email ${email}, mobile ${mobile}, message ${message}`,
        subject: `new Enquery form ${company}`
    })
    await sendEmail({
        to: email,
        message: `Thank You For Enquery. I will get in touch with you soon`,
        subject: `Thank You For your Interest..`
    })
    await Enquiry.create({ name, email, mobile, message, company })
    res.json({ message: "Enquery Message Added Success...!", })
})