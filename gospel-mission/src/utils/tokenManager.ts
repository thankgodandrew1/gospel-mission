export const fetchAndStoreToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/get-token');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();
    localStorage.setItem('jwt', data.token);
    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwt');
};
