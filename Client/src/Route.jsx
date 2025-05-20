import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Favorites from './pages/Favorites';

// Lazy load components for better performance
const RegionPicker = lazy(() => import("./views/RegionPicker"));
const Countries = lazy(() => import("./views/Countries"));
const AllCountries = lazy(() => import("./views/AllCountries"));
const HomePage = lazy(() => import("./dashboard/HomePage"));
const CountryDetails = lazy(() => import("./views/CountryDetails"));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const RegionCountries = lazy(() => import("./views/RegionCountries"));
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
const AppRoutes = ({
  selectedRegion,
  onRegionPick,
  clearRegion,
}) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route
          path="/region"
          element={<RegionPicker onRegionPickHandler={onRegionPick} />}
        />

        <Route
          path="/countries"
          element={
            <Countries
              selectedRegion={selectedRegion}
              clearSelectedRegionHandler={clearRegion}
            />
          }
        />

        <Route 
          path="/all" 
          element={<AllCountries clearSelectedRegionHandler={clearRegion} />} 
        />
        
        <Route path="/about" element={<AboutUs />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/region/:regionName" element={<RegionCountries />} />
       // Modify the Favorites route:
<Route 
  path="/favorites" 
  element={
    <>
      <SignedIn>
        <Favorites />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  } 
/>
        {/* Add 404 fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />

        {/* <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;