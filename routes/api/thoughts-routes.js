const router = require('express').Router();

const {
  getThoughts, 
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

  // api/thougts/:id
  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // api/thoughts/:id/reactions
  router
  .route('/:thoughtId/reactions')
  .post(createReaction);

  router
  .route('/:thoughtId/:reactionId')
  .delete(removeReaction);

  module.exports = router;
