import ddragonVersion from '../../../utils/constants/ddragon-version';

export default function summonerInfoTransformer({
  name, id, profileIconId, summonerLevel
}) {
  return {
    summonerName: name,
    summonerId: id,
    profileIconURL: `http://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${profileIconId}.png`,
    summonerLevel,
  };
}
