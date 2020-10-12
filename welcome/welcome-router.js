const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.json({
		message: `Welcome To My First ${process.env.COHORT} Spring Challenge API`,
	})
})

module.exports = router