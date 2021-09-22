import React from 'react';

import { render, screen } from '@testing-library/react'

import Favorite from './Favorite'

test('shows as favorite if prop is true', async () => {
  render(<Favorite favorite={true} />)

  expect(screen.getByTestId('favorite-on')).toBeInTheDocument();
})

test('shows as favorite if prop is false', async () => {
  render(<Favorite favorite={false} />)

  expect(screen.getByTestId('favorite-off')).toBeInTheDocument();
})
