import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutComponent from '../Layout/LayoutComponent';

// Mock data based on the screenshot
const mockModifiers = [
  {
    id: 1,
    name: 'Toppings',
    category: 'Snacks',
    modifierCount: 3,
    minSelection: 1,
    maxSelection: 3,
  },
  {
    id: 2,
    name: 'Extra Cheese',
    category: 'Snacks',
    modifierCount: 4,
    minSelection: 2,
    maxSelection: 4,
  },
  {
    id: 3,
    name: 'Modifier_group_one',
    category: 'Snacks',
    modifierCount: 2,
    minSelection: 1,
    maxSelection: 3,
  },
];

const MenuModifiers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModifiers = mockModifiers.filter((modifier) =>
    modifier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LayoutComponent
      title="Menu modifiers"
      description="Organize your menu with modifier groups and modifiers"
      HeaderAction={
        <Link
          to="/menu-modifiers/add"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">New Modifier Group</span>
        </Link>
      }
    >
      <div className="min-h-screen">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-sm">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              placeholder="Search by category name"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                  Modifier groups
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                  Modifiers
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                  Min selection
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                  Max selection
                </th>
                <th scope="col" className="px-6 py-4 w-24"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredModifiers.map((modifier) => (
                <tr key={modifier.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{modifier.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{modifier.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{modifier.modifierCount} modifiers</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{modifier.minSelection}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{modifier.maxSelection}</span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex gap-2 justify-end items-center">
                      <button className="p-2 text-gray-400 rounded-lg border border-gray-200 transition-colors hover:text-gray-600 hover:bg-gray-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-500 rounded-lg border border-red-100 transition-colors hover:bg-red-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredModifiers.length === 0 && (
            <div className="py-12 text-center">
              <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No modifiers found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default MenuModifiers;
