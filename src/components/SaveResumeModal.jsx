import React, { useState } from 'react';
import { X } from 'lucide-react';

const SaveResume = ({ isOpen, onClose, onSave }) => {
  const [resumeName, setResumeName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(resumeName);
    setResumeName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Save Resume</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <input
          type="text"
          value={resumeName}
          onChange={(e) => setResumeName(e.target.value)}
          placeholder="Enter resume name"
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SaveResume;

