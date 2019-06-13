import rankTypes from '../../../utils/constants/rank-types';

export default function rankedTransformer({
  queueType, wins, losses, rank, tier, leaguePoints
}) {
  const rankId = rankTypes[tier + rank] || 'default';
  return {
    queueType,
    wins,
    losses,
    winRatio: Math.round(wins / (wins + losses) * 100),
    rank,
    tier,
    leaguePoints,
    rankIcon: `https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/${rankId}.png`
  };
}
