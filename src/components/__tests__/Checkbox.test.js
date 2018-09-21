import React from 'react';
import Checkbox from '../Checkbox';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Checkbox />).toJSON();
  expect(rendered).toBeTruthy();
});
