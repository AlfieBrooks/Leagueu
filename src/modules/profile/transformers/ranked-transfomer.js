export default function rankedTransformer({
  queueType, wins, losses, rank, tier, leaguePoints
}) {
  return {
    queueType,
    wins,
    losses,
    winRatio: Math.round(wins / (wins + losses) * 100),
    rank,
    tier,
    leaguePoints,
  };
}
