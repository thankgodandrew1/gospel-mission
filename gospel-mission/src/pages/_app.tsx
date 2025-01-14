import ' @/styles/globals.css';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { fetchAndStoreToken, getToken } from ' @/utils/tokenManager';
import LoadingSpinner from ' @/components/LoadingSpinner';

function MyApp({ Component, pageProps }: AppProps) {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const initializeToken = async () => {
      const token = getToken();
      if (!token) {
        await fetchAndStoreToken();
      }
      setIsTokenReady(true);
    };

    initializeToken();
  }, []);

  if (!isTokenReady) {
    // Show a loading state until the token is ready
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <LoadingSpinner />
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
