import React from 'react';

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

export default OfflinePopup;
