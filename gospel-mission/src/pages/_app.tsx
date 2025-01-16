import ' @/styles/globals.css';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { getToken } from ' @/utils/tokenManager';
import LoadingSpinner from ' @/components/LoadingSpinner';
import ErrorBoundary from ' @/components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const initializeToken = async () => {
      const token = await getToken(); // Get a valid token (handles refresh if expired)
      if (!token) {
        console.error('Unable to fetch a valid token');
      }
      setIsTokenReady(true); // Proceed after token is ready
    };

    initializeToken();
  }, []);

  if (!isTokenReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ErrorBoundary error="You are offline. Please check your internet connection.">
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
