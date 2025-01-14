export const fetchAndStoreToken = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/get-token'); // Replace with your token endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
      const data = await response.json();
      localStorage.setItem('jwt', data.token); // Store token in localStorage
      return data.token; // Return the token
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('jwt'); // Retrieve the token from localStorage
  };
  