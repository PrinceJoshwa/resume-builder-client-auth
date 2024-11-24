//client/src/SaveResumeModal.jsx
import { useState } from 'react';

function SaveResumeModal({ isOpen, onClose, onSave }) {
  const [resumeName, setResumeName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(resumeName);
    setResumeName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Save Resume</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Resume Name"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaveResumeModal;