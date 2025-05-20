import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} GeoGlobe. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('has the correct styling attributes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle('text-align: center');
    expect(footer).toHaveStyle('background-color: #f5f5f5');
  });

 it('contains a Typography component with the correct text and style', () => {
  render(<Footer />);
  const typography = screen.getByText(/GeoGlobe/i);
  expect(typography).toBeInTheDocument();

  // Check for MUI Typography variant class
  expect(typography).toHaveClass('MuiTypography-body2');

  // Accept rem-based style returned in test env
  const styles = window.getComputedStyle(typography);
  expect(styles.fontSize).toBe('0.875rem');
});

});
