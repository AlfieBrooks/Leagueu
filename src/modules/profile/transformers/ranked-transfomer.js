import rankedUrlTypes from '../../../utils/constants/ranked-url-types';

export default function rankedTransformer({
  queueType, wins, losses, rank, tier, leaguePoints
}) {
  const rankId = rankedUrlTypes[tier + rank] || 'default';
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
