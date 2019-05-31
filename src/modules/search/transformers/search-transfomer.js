export default function searchTransformer({
  name, id, profileIconId, summonerLevel
}) {
  return {
    summonerName: name,
    summonerId: id,
    profileIconURL: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png`,
    summonerLevel,
  };
}
