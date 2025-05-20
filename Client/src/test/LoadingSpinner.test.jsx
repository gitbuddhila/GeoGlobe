import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('contains a MUI CircularProgress component', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeVisible();
    expect(spinner).toHaveClass('MuiCircularProgress-root');
  });

  it('is centered on the screen', () => {
    const { container } = render(<LoadingSpinner />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    });
  });
});
