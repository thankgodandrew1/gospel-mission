import { jwtDecode } from 'jwt-decode';

// Check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token); // Decode token to get expiration
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < now; // Compare expiration time with the current time
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat token as expired if there's an error
  }
};

// Fetch and store a new token
export const fetchAndStoreToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/get-token');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();
    localStorage.setItem('jwt', data.token); // Save token in localStorage
    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

// Retrieve a valid token, refreshing it if expired
export const getToken = async (): Promise<string | null> => {
  const token = localStorage.getItem('jwt');

  if (token && !isTokenExpired(token)) {
    return token; // Token is valid, return it
  }

  // Token is expired or missing, fetch a new one
  return await fetchAndStoreToken();
};
