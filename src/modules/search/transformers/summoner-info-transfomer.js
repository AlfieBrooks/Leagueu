export default function summonerInfoTransformer({
  name, id, profileIconId, summonerLevel
}) {
  const ddragonVersion = '9.11.1';
  return {
    summonerName: name,
    summonerId: id,
    profileIconURL: `http://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${profileIconId}.png`,
    summonerLevel,
  };
}
