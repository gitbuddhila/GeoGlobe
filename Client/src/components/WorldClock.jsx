import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { AccessTime, WbSunny, NightsStay } from "@mui/icons-material";

function WorldClock({ timezone, countryName }) {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initial calculation
    calculateTime();
    setLoading(false);
    
    // Update clock every second
    const interval = setInterval(() => {
      calculateTime();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);
  
  const calculateTime = () => {
    try {
      // Create a date object for the specific timezone
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', options);
      setTime(new Date());
    } catch (error) {
      console.error("Error calculating time for timezone:", error);
    }
  };
  
  // Check if it's day or night (6 AM to 6 PM is considered day)
  const getFormattedTime = () => {
    try {
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return new Intl.DateTimeFormat('en-US', options).format(time);
    } catch (e) {
      return "Invalid timezone";
    }
  };
  
  const getHour = () => {
    try {
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit'
      };
      return parseInt(new Intl.DateTimeFormat('en-US', options).format(time));
    } catch (e) {
      return 12; // Default
    }
  };
  
  const isDaytime = () => {
    const hour = getHour();
    return hour >= 6 && hour < 18;
  };
  
  const formattedDate = () => {
    try {
      const options = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Intl.DateTimeFormat('en-US', options).format(time);
    } catch (e) {
      return "Invalid timezone";
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <CircularProgress size={30} />
      </Box>
    );
  }
  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        {isDaytime() ? (
          <WbSunny sx={{ color: 'orange' }} />
        ) : (
          <NightsStay sx={{ color: '#5f6caf' }} />
        )}
        <Typography variant="h6" color="text.secondary">
          {timezone.replace('_', ' ')}
        </Typography>
      </Box>
      
      <Typography 
        variant="h3" 
        fontWeight="bold"
        sx={{ 
          fontFamily: 'monospace',
          letterSpacing: 1
        }}
      >
        {getFormattedTime()}
      </Typography>
      
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        {formattedDate()}
      </Typography>
    </Box>
  );
}

export default WorldClock;