import React from 'react';
import ListItem from '../ListItem';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<ListItem />).toJSON();
  expect(rendered).toBeTruthy();
});