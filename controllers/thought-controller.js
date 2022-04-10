const Thought = require('../models/Thought');
const User = require('../models/User');


//follow pizza hunt
const thoughtController = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'user',
      select: ('-__v')
    })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path: 'user',
      select: ('-__v')
    })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        //if none foudn, send 404
        if(!dbThoughtData) {
          res.status(404).json({ message: 'no thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //create a pizza
  createThought({ body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: _id}},
        { new: true }
      );
    })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },
  //update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  //delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  //create reaction on thoguht
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      { $push: { reactions: body }},
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'no thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  },

  removeReaction({ params}, res) {
    Thoughts.findOne(
      {_id: params.thoughtId},
      )
      .then(dbThoughtData => {
        dbThoughtData.reactions.pull(params.reactionId)
        return dbThoughtData.save();
      })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
    
  }
};

module.exports = thoughtController;