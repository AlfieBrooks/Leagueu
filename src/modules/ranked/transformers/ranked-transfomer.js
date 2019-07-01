import rankedUrlTypes from '../../../utils/constants/ranked-url-types';

const isInSeries = (leaguePoints, miniSeries) => {
  if (leaguePoints === 100 && miniSeries) {
    return miniSeries.progress.split('');
  }
  return null;
};

export default function rankedTransformer({
  queueType, wins, losses, rank, tier, leaguePoints, miniSeries
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
    miniSeries: isInSeries(leaguePoints, miniSeries),
    rankIcon: `https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/${rankId}.png`
  };
}
