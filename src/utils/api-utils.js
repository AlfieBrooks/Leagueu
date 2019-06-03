import hiddenApiKey from '../../api-key';

const baseUrl = 'https://{region}.api.riotgames.com';
const apiKey = hiddenApiKey;

export default function constructApiUrl(region, url) {
  return `${baseUrl}${url}?api_key=${apiKey}`.replace(/\{region\}/g, region);
}
