import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddModifierModal from './components/AddModifierModal';
import LayoutComponent from '../Layout/LayoutComponent';

interface Modifier {
  id: number;
  name: string;
  price: string;
}

const AddMenuModifier: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [minSelections, setMinSelections] = useState('0');
  const [maxSelections, setMaxSelections] = useState('1');
  const [isRequired, setIsRequired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  const handleAddModifier = (newModifier: { name: string; price: string }) => {
    setModifiers([
      ...modifiers,
      { id: Date.now(), ...newModifier },
    ]);
  };

  const handleRemoveModifier = (id: number) => {
    setModifiers(modifiers.filter((m) => m.id !== id));
  };

  return (
    <LayoutComponent
      title="Menu modifiers"
      description="Organize your menu with modifier groups and modifiers"
      HeaderAction={
        <div className="flex gap-3">
          <Link
            to="/menu-modifiers"
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800">
            Save changes
          </button>
        </div>
      }
    >
      <div className="min-h-screen">
        <div className="h-px w-full bg-gray-100 mb-8" />

        {/* Modifier Groups Form */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-3">
            <h3 className="text-base font-semibold text-gray-900">Modifier groups</h3>
          </div>
          <div className="col-span-9 space-y-6">
            {/* Group Name */}
            <div className="max-w-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Group name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g Toppings"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Selections */}
            <div className="flex gap-4 max-w-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min selections
                </label>
                <div className="relative">
                  <select
                    value={minSelections}
                    onChange={(e) => setMinSelections(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max selections
                </label>
                <div className="relative">
                  <select
                    value={maxSelections}
                    onChange={(e) => setMaxSelections(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 10, 'Unlimited'].map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Toggle */}
            <div className="max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Required selection</p>
                  <p className="text-xs text-gray-500 mt-0.5">This is required to complete the menu.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRequired(!isRequired)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isRequired ? 'bg-black' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isRequired ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 mb-8" />

        {/* Modifiers Section */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h3 className="text-base font-semibold text-gray-900">Modifiers</h3>
          </div>
          <div className="col-span-9 space-y-4">
            {/* Added Modifiers List */}
            {modifiers.length > 0 && (
              <div className="max-w-lg space-y-3">
                {modifiers.map((modifier) => (
                  <div key={modifier.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{modifier.name}</p>
                      <p className="text-xs text-gray-500">N {modifier.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveModifier(modifier.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="max-w-lg">
              <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add modifiers
              </button>
            </div>
          </div>
        </div>

        <AddModifierModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddModifier}
          groupName={groupName}
        />
      </div>
    </LayoutComponent>
  );
};

export default AddMenuModifier;
