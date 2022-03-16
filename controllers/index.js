const router = require("express").Router();
//packaged api end point
const apiRoutes = require("./api");

//homepage routes
const homeRoutes = require("./home-routes");
const dashboardRoutes = require('./dashboard-routes.js');

router.use("/", homeRoutes);
router.use('/dashboard', dashboardRoutes);

//api routes 
router.use("/api", apiRoutes);
router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
