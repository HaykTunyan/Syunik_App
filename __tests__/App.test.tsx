/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

test('renders the about and history entry points', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  expect(renderer!.root.findAllByProps({children: 'About Us'}).length).toBe(1);
  expect(renderer!.root.findAllByProps({children: 'History'}).length).toBe(1);
});
