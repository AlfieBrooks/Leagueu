import React from 'react';
import renderer from 'react-test-renderer';

import { ChampionInfo } from './champion-info';

test('renders correctly', () => {
  const props = {
    championLevel: 5,
    championPoints: 500,
    championName: 'Test',
    championImg: 'img',
  };
  const wrapper = renderer.create(<ChampionInfo {...props} />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
