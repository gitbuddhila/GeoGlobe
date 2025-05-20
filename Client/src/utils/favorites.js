// utils/favorites.js
/**
 * Get favorite country codes from localStorage
 * @param {string} userId - User ID to get favorites for
 * @returns {Array} Array of country codes
 */
export const getFavorites = (userId) => {
  if (!userId) return [];
  
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    return favorites[userId] || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
  
/**
 * Toggle a country as favorite/unfavorite
 * @param {string} userId - User ID to toggle favorite for
 * @param {string} countryCode - Country code to toggle
 * @returns {Object} Object containing updated array and whether country is now a favorite
 */
export const toggleFavorite = (userId, countryCode) => {
  if (!userId || !countryCode) {
    console.error('Missing userId or countryCode in toggleFavorite');
    return { favorites: [], isNowFavorite: false };
  }
  
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const userFavorites = favorites[userId] || [];
    
    const isCurrentlyFavorite = userFavorites.includes(countryCode);
    let updatedFavorites;
    
    if (isCurrentlyFavorite) {
      // Remove from favorites
      updatedFavorites = userFavorites.filter(code => code !== countryCode);
    } else {
      // Add to favorites
      updatedFavorites = [...userFavorites, countryCode];
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify({
      ...favorites,
      [userId]: updatedFavorites
    }));
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('favoritesUpdated'));
    
    return { 
      favorites: updatedFavorites, 
      isNowFavorite: !isCurrentlyFavorite 
    };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { favorites: [], isNowFavorite: false };
  }
};
  
/**
 * Check if a country is marked as favorite
 * @param {string} userId - User ID to check favorites for
 * @param {string} countryCode - Country code to check
 * @returns {boolean} True if country is a favorite
 */
export const isFavorite = (userId, countryCode) => {
  if (!userId || !countryCode) return false;
  return getFavorites(userId).includes(countryCode);
};