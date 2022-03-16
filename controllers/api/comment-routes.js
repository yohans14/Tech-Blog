const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Comment } = require("../../models");

router.get("/", (req, res) => {
	Comment.findall()
		.then((dbCommentData) => res.json(dbCommentData))
		.then((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", withAuth, (req, res) => {
	// check the session
	if (req.session) {
		Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			// use the id from the session
			user_id: req.session.user_id,
		})
			.then((dbCommentData) => res.json(dbCommentData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

router.delete("/:id", withAuth, (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.post,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "no comment found to delete!" });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
