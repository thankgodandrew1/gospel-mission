import React, { useState } from 'react';
import axios from 'axios';
import { AxiosProgressEvent } from 'axios';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [progress, setProgress] = useState(0);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default');

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              setProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        });
        onUpload(response.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="upload-container my-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload your file:
      </label>
      <input
        type="file"
        onChange={handleChange}
        className="mb-2 w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      {progress > 0 && (
        <progress value={progress} max="100" className="w-full progress-bar" />
      )}
      {progress > 0 && (
        <span className="block text-sm text-gray-500 mt-1">
          {progress}% uploaded
        </span>
      )}
    </div>
  );
};

export default ImageUpload;
