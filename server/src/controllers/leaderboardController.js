import Leaderboard from '../database/models/leaderboard';

const getTopLeaders = async (req, res) => {
  const topFive = await Leaderboard.find().sort({ score: -1 });
  const topFiveWithUsers = await Promise.all(topFive.map(async (leaderboard) => {
    const userWithScore = await leaderboard.getUserWithScore();
    return userWithScore;
  }));

  res.json(topFiveWithUsers);
};

export default {
  getTopLeaders,
};
