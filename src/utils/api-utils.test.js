import constructApiUrl from './api-utils';
import getApiKey from '../../api-key';

jest.mock('../../api-key');

test('constructs a valid url', () => {
  getApiKey.mockReturnValue('APIKey');
  const expected = 'https://euw1.api.riotgames.com/url/?api_key=APIKey';
  expect(constructApiUrl('euw1', '/url/')).toBe(expected);
});
