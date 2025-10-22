import { useState } from 'react';
import { FiKey, FiX } from 'react-icons/fi';

function JoinPrivateModal({ spaceName, onVerify, onCancel, error, isLoading }) {
  const [passcode, setPasscode] = useState('');

  const handleVerifyClick = () => {
    if (passcode) {
      onVerify(passcode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl w-full max-w-sm border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Private Space</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
        <p className="text-gray-400 mb-4">
          The space <span className="font-bold text-blue-400">{spaceName}</span> is private. Please enter the passcode to join.
        </p>
        <div className="relative">
          <FiKey className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerifyClick()}
            placeholder="Enter passcode"
            autoFocus
            className="w-full bg-gray-700 border border-gray-600 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleVerifyClick}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Join Space'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinPrivateModal;