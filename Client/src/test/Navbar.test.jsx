import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModernNavbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// Mock Clerk components with state control
let isSignedIn = false;

jest.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }) => (isSignedIn ? <div data-testid="signed-in">{children}</div> : null),
  SignedOut: ({ children }) => (!isSignedIn ? <div data-testid="signed-out">{children}</div> : null),
  SignInButton: ({ children }) => <button data-testid="sign-in-button">{children}</button>,
  UserButton: () => <div data-testid="user-button" />,
  useUser: () => ({
    user: isSignedIn ? { fullName: 'Test User' } : null,
    isLoaded: true,
  }),
}));

// Mock useNavigate and useLocation from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({ pathname: '/' })),
}));

describe('ModernNavbar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    isSignedIn = false; // Reset auth state before each test
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(<ModernNavbar />);
    expect(screen.getByText(/GeoGlobe/i)).toBeInTheDocument();
  });

  it('renders all navigation links on desktop', () => {
    render(<ModernNavbar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /countries/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /regions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /favourite/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('opens and closes mobile drawer when menu icon is clicked', async () => {
    render(<ModernNavbar />);
    
    // Open drawer
    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);
    
    // Verify drawer opens
    expect(await screen.findByRole('heading', { name: /GeoGlobe/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    
    // Close drawer
    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);
    
    // Verify drawer closes
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /GeoGlobe/i })).not.toBeInTheDocument();
    });
  });

  it('shows sign in button when signed out', () => {
    render(<ModernNavbar />);
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.queryByTestId('user-button')).not.toBeInTheDocument();
  });

  it('shows user button when signed in', () => {
    isSignedIn = true;
    render(<ModernNavbar />);
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
  });

  it('navigates to correct routes when links are clicked', () => {
    render(<ModernNavbar />);
    const links = [
      { name: /home/i, path: '/' },
      { name: /countries/i, path: '/countries' },
      { name: /regions/i, path: '/regions' },
      { name: /favourite/i, path: '/favorites' },
      { name: /about/i, path: '/about' },
    ];

    links.forEach(({ name, path }) => {
      const link = screen.getByRole('link', { name });
      fireEvent.click(link);
      expect(mockNavigate).toHaveBeenCalledWith(path);
      mockNavigate.mockClear();
    });
  });

  it('highlights active navigation item', () => {
    // Mock different active route
    jest.spyOn(require('react-router-dom'), 'useLocation').mockImplementation(() => ({
      pathname: '/countries',
    }));

    render(<ModernNavbar />);
    const activeLink = screen.getByRole('link', { name: /countries/i });
    expect(activeLink).toHaveClass('Mui-selected'); // Or whatever your active class is
  });

  it('renders mobile navigation links when drawer is open', async () => {
    render(<ModernNavbar />);
    fireEvent.click(screen.getByLabelText(/open menu/i));
    
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /countries/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /regions/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /favourite/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
  });
});