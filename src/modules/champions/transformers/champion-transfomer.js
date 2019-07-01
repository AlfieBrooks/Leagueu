import champions from '../../../utils/constants/champions';

export default function championTransformer({
  championLevel, championPoints, championId
}) {
  const ddragonVersion = '9.11.1';
  const championObj = champions.find(champion => parseInt(champion.championId, 10) === championId);
  const championName = championObj.name;
  const championNameStripped = championName.replace(/[\s'.]/g, '');
  return {
    championLevel,
    championPoints,
    championId,
    championName,
    championImg: `http://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${championNameStripped}.png`
  };
}
