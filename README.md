# 📍 [GeoGlobe 🌍 – Explore Countries of the World](https://geoglobe.vercel.app/)

> GitHub Repository: [https://github.com/gitbuddhila/GeoGlobe](https://github.com/gitbuddhila/GeoGlobe)  
> Hosted on Vercel: [https://geoglobe.vercel.app/](https://geoglobe.vercel.app/)

---

# 🌍 REST Countries Explorer

A fully-featured, responsive React application that allows users to explore detailed information about countries using the REST Countries API. This project integrates multiple external APIs (Weather, News, Maps) and supports user authentication via Clerk for personalized experiences such as favorites.

## 🚀 Project Overview

This application was developed as part of the SE3040 – Application Frameworks course assignment. It demonstrates advanced usage of React functional components, RESTful API integration, responsive UI design using MUI, and session management.

> 📅 **Start Date**: April 4, 2025  

---

## 🔥 Features

- 🌐 **List and explore all countries** with pagination, search, and filtering
- 🔍 **Search** countries by name
- 🌎 **Filter** countries by region, language, or currency
- 📈 **Popular countries** view sorted by population
- 📄 **Detailed country view**:
  - Flag, name, capital, region, subregion, population
  - Currencies, languages, bordering countries
  - Embedded Google Map
  - Real-time weather via OpenWeatherMap
  - Country-specific news via NewsAPI
- 🧡 **Favorites system** (requires Clerk login)
- 🔐 **User Authentication** via Clerk
- 📱 **Fully responsive** design using Material UI
- 🧪 **Unit and integration testing** with Jest + React Testing Library + Cypress

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), JavaScript
- **Styling**: Material UI (MUI)
- **Authentication**: Clerk.dev
- **APIs Used**:
  - 🌍 [REST Countries API](https://restcountries.com)
  - 🌦️ [OpenWeatherMap API](https://openweathermap.org/)
  - 📰 [NewsAPI.org](https://newsapi.org/)
  - 🗺️ [Google Maps Embed API](https://developers.google.com/maps/documentation/embed)

---

## 🌐 API Endpoints Used

From the REST Countries API:
- `GET https://restcountries.com/v3.1/all` – List all countries
- `GET https://restcountries.com/v3.1/name/{name}` – Search by country name
- `GET https://restcountries.com/v3.1/region/{region}` – Filter by region
- `GET https://restcountries.com/v3.1/alpha/{code}` – Detailed country info by code
- ✅ Advanced filtering by:
  - Language
  - Currency
  - Region
  - Capital

External API data is fetched and displayed dynamically using user interactions.

---

## 🧑‍💻 User Features

- 🔍 Search for any country using the input field
- 🗺️ Filter countries by region, language, or currency
- 👀 View complete details of any country
- 🌦️ Check real-time weather of the capital city
- 📰 Read recent news headlines related to the country
- 🧡 Mark countries as favorites (requires login)
- 🔐 Login/logout using Clerk for persistent sessions

---

## 🧪 Testing

- ✅ Unit testing using **Jest**
- ✅ Integration testing with **React Testing Library**
- ✅ End-to-end testing using **Cypress**
- ✅ Mobile-friendly and cross-browser responsive design testing

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/gitbuddhila/GeoGlobe.git
cd GeoGlobe
npm install
```

### 🔑 Environment Variables

Create a `.env` file at the root of your project and add the following:

```env
VITE_API_BASE_URL=https://restcountries.com
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

---

## 🚀 Running the App

```bash
npm run dev
```

The app will be accessible at: [http://localhost:5173](http://localhost:5173)

---

## ⚡ Performance Improvements

This project includes several optimizations to improve performance, responsiveness, and user experience:

- ✅ **React Query (`useQuery`)**  
  - Caches API responses to avoid redundant network requests  
  - Deduplicates fetches across components  
  - Automatically refetches stale data in the background  
  - Manages loading and error states efficiently  

- ✅ **Axios with Efficient API Design**  
  - Centralized API functions for better control and error handling  
  - Limited API calls by reusing cached data wherever possible  

- ✅ **Debounced Search Input**  
  - Reduces API requests by waiting for user to stop typing before searching  

- ✅ **Popular Countries Optimization**  
  - Sorted and sliced most-populated countries from cached `/all` endpoint, avoiding extra API calls  

- ✅ **Component Memoization**  
  - Used `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders  

- ✅ **Image Lazy Loading**  
  - Country flag images are lazy-loaded with `loading="lazy"` to speed up initial page load  

- ✅ **Responsive & Optimized UI**  
  - Built with Material UI components that use CSS-in-JS for fast rendering and reduced styling overhead  
  - Layout adapts to all screen sizes to minimize unnecessary rendering on different devices  

- ✅ **Vite Dev Server & Production Build**  
  - Instant hot-reloading during development  
  - Production build includes tree-shaking, code splitting, and asset optimization  

- ✅ **Error Boundaries & Graceful Fallbacks**  
  - Ensures UI doesn't break on API failure and provides meaningful error feedback  

---

## ⚠️ Challenges Faced & Solutions

### 🔐 Authentication Integration
- **Challenge**: Clerk's authentication flow needed careful integration with routing and protected components.
- **Solution**: Implemented React Context and hooks to handle session state and used Clerk-provided components to streamline user login/logout.

### 🌐 API CORS Restrictions
- **Challenge**: Encountered Cross-Origin Resource Sharing (CORS) errors when making requests to some APIs during local development.
- **Solution**: Configured Vite's development server to proxy requests, effectively bypassing CORS restrictions in dev mode.

### 📊 Data Overload & Performance
- **Challenge**: Rendering all country data (especially flags, maps, and additional API responses) in bulk led to performance issues.
- **Solution**: Implemented lazy loading for heavy components and optimized API requests to reduce redundant fetch calls.

### 📱 Responsive UI on All Devices
- **Challenge**: Ensuring a pixel-perfect layout across various screen sizes and browsers.
- **Solution**: Used MUI's responsive Grid system, breakpoints, and flexible design principles to provide a seamless experience across devices.

### 🔄 State Management
- **Challenge**: Managing multiple asynchronous API responses (weather, news, and country details) without blocking the UI.
- **Solution**: Used `useEffect` combined with conditional rendering, loading states, and error boundaries to maintain smooth interactions.

### 🔑 Secure API Key Handling
- **Challenge**: Needed to keep third-party API keys safe while developing and deploying.
- **Solution**: Used environment variables and `.env` files, ensuring keys never appeared in source control. On Vercel, used its Secrets management for deployment.

---

## 📂 Git & Version Control

- ✅ Tracked using **Git** with frequent and meaningful commits  
- ✅ Repository maintained on **GitHub** under Classroom submission  
- ✅ Followed best practices for branch management and feature isolation  

---

## 👨‍🏫 Course Info

- **Module**: SE3040 – Application Frameworks  
- **University**: SLIIT – Faculty of Computing  
- **Specialization**: Software Engineering  
- **Year**: 3rd Year – BSc (Hons) in Software Engineering  

---

## 📧 Contact

- 🧑‍💻 Developer Blog: [https://dev.to/gitbuddhi](https://dev.to/gitbuddhi)  
- 📬 Email: gitbuddhi@dev.to  

---

🎓 *This project is a practical demonstration of building production-ready frontend applications with modern frameworks, APIs, and deployment pipelines.*
