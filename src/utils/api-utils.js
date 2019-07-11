import getApiKey from '../../api-key';

const baseUrl = 'https://{region}.api.riotgames.com';

export default function constructApiUrl(region, url) {
  return `${baseUrl}${url}?api_key=${getApiKey()}`.replace(/\{region\}/g, region);
}
