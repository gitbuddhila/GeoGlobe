// components/LoadingSpinner.jsx
import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

export default LoadingSpinner;