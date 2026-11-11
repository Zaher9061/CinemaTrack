export const BASE_URL = 'https://www.omdbapi.com/';
export const API_KEY = 'd1b154c3';
export const ENDPOINTS = {
  search: (query) => `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
  details: (imdbId) => `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`,
};