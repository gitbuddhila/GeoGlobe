// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from "./components/Navbar";
import AppRoutes from "./Route";

// Create query client instance outside component to prevent recreations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry for 404 errors
        if (error.response?.status === 404) return false;
        return failureCount < 2; // Retry twice for other errors
      },
    },
  },
});

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Memoize handlers since they're passed down
  const regionHandlers = {
    onRegionPick: (region) => setSelectedRegion(region),
    clearRegion: () => setSelectedRegion(null),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navbar />
          <AppRoutes 
            selectedRegion={selectedRegion}
            {...regionHandlers}
          />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          )}
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;