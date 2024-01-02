const router = require("express").Router();
const controller = require("./notes.controller");
const ratingsController = require("../ratings/ratings.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
    .all(methodNotAllowed)

router
    .route("/:noteId/ratings")
    .get(ratingsController.allNoteRatings)
    .all(methodNotAllowed)

router
    .route("/:noteId/ratings/:ratingId")
    .get(ratingsController.noteRating)
    .all(methodNotAllowed)

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)

module.exports = router;
