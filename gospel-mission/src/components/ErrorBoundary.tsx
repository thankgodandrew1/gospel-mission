import { ReactNode, useState, useEffect } from 'react';
import useOnlineStatus from '../hooks/useOnlineStatus';

interface OfflinePopupProps {
  message: string;
}

const OfflinePopup: React.FC<OfflinePopupProps> = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-red-600 text-white rounded-md shadow-md z-50">
      <p>{message}</p>
    </div>
  );
}; 

interface ErrorBoundaryProps {
  children: ReactNode;
  error: string;
}

const ErrorBoundary = ({ children, error }: ErrorBoundaryProps) => {
  const isOnline = useOnlineStatus();
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setShowOnlineMessage(true);
      const timer = setTimeout(() => {
        setShowOnlineMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  return (
    <>
      {children}
      {!isOnline && <OfflinePopup message={error} />}
      {isOnline && showOnlineMessage && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-md shadow-md z-50">
          <p>Back Online: Connection is good</p>
        </div>
      )}
    </>
  );
};

export default ErrorBoundary;
