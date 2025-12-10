import React, { useState } from 'react';

interface AddModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (modifier: { name: string; price: string }) => void;
  groupName: string;
}

const AddModifierModal: React.FC<AddModifierModalProps> = ({
  isOpen,
  onClose,
  onSave,
  groupName,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name && price) {
      onSave({ name, price });
      setName('');
      setPrice('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Modifier for "{groupName || 'Group'}"
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Add a new modifiers for the {groupName || 'current'} group
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g Extra Cheese"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price(N)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2,000"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <button className="flex-shrink-0 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0A0A0A] rounded-lg hover:bg-black/90 transition-colors"
          >
            Save modifiers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModifierModal;
