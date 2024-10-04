const router = require("express").Router()
const { rateLimit } = require("express-rate-limit")
const publicController = require("../controller/public.controller")

router
    .get("/fetch-project", publicController.fetchProjects)
    .get("/fetch-caro", publicController.getAllCarousel)
    .get("/project-details/:id", publicController.getProjectDetail)
    .post("/add-enquery", rateLimit({ windowMs: 15 * 60 * 1000, limit: 1 }), publicController.AddEnqueryMessage)

module.exports = router

