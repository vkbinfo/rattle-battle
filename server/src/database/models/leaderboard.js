import { Schema, model } from 'mongoose';
import User from './user';

const leaderboardSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

leaderboardSchema.methods.getUser = async function getUser() {
  const leaderboard = this;
  const { userId: leaderId } = leaderboard;
  const leader = await User.findById(leaderId);

  return leader;
};

leaderboardSchema.methods.getUserWithScore = async function getUserWithScore() {
  const leaderboard = this;
  const leader = await this.getUser();
  const { username } = leader;
  const { score } = leaderboard;

  return {
    username,
    score,
  };
};

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
