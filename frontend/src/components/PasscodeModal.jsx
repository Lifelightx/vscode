import { useState } from 'react';
import { FiX } from 'react-icons/fi';

function PasscodeModal({ onSetPasscode, onCancel }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (passcode.length < 4) {
      setError('Passcode must be at least 4 characters long.');
      return;
    }
    // Simple validation for letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(passcode)) {
        setError('Passcode can only contain letters and numbers.');
        return;
    }
    onSetPasscode(passcode);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Set Private Passcode</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
        <p className="text-gray-400 mb-4">
          Enter a passcode (4+ letters/numbers) to make this codespace private.
        </p>
        <input
          type="text"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            setError('');
          }}
          placeholder="e.g., A1B2"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={20}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Save Passcode
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasscodeModal;