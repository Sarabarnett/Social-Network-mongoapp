const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: 'Username is required'
  },
  createdAt: {
    type: Date, 
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
},
 {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
 });


const ThoughtSchema = new Schema ({
  thoughtText: {
    type: String, 
    required: 'Thought is required',
    validate: [({ length }) => length < 280, 'Thought must be less than 280 characters.']
  },
  username: {
    type: String,
    required: 'Username required.'
  },
  createAt: {
    type: Date, 
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  reactions: [ReactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
},
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;