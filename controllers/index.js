const router = require("express").Router();
//packaged api end point
const apiRoutes = require("./api");

//homepage routes
const homeRoutes = require("./home-routes");

router.use("/", homeRoutes);

router.use("/api", apiRoutes);
router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
