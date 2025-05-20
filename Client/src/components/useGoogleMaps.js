import { useEffect, useState } from 'react';

export default function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      // Script already exists, just wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          setLoaded(true);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.maps) {
        setLoaded(true);
      } else {
        setError(new Error('Google Maps API not available'));
      }
    };
    script.onerror = () => {
      setError(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script to prevent multiple reloads
      // Just clean up our state
      setLoaded(false);
    };
  }, []);

  return { loaded, error };
}