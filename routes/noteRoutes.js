const express = require('express');
const noteControllers = require('../controllers/noteControllers');
const router = express.Router();

router
    .route("/")
    .get(noteControllers.getAllNotes)
    .post(noteControllers.createNewNotes);

router.route("/:id")
    .get(noteControllers.getNotesById)
    .put(noteControllers.updateNotes)
    .delete(noteControllers.deleteNotes);

module.exports = router;