import { LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const libraries = ['places'];

export default function MapWrapper({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      setLoaded(true);
    }
  }, []);

  // If Google Maps is already loaded, just render children
  if (loaded) {
    return <>{children}</>;
  }

  // Otherwise, load Google Maps API first
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      onLoad={() => setLoaded(true)}
    >
      {children}
    </LoadScript>
  );
}