import React from 'react';
import LayoutComponent from '../Layout/LayoutComponent';
import ReusableDropdown from './components/ReusableDropdown';
import MultiSelectDropdown from './components/MultiSelectDropdown';

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-gray-200 last:border-0">
    <div className="md:col-span-3">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
    </div>
    <div className="md:col-span-9 space-y-6">
      {children}
    </div>
  </div>
);

export default function AddMenuItem() {
  return (
    <LayoutComponent title="Menu Item" description="Create a new item for your menu." HeaderAction={
      <div className="flex gap-3">
        <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-fit">
          Cancel
        </button>
        <button className="min-w-fit px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-lg hover:bg-[#1e293b]">
          Save changes
        </button>
      </div>
    }>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <FormSection title="Basics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Item name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g Cheese"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
              />
            </div>
            <div className='overflow-x-hidden'>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Menu category <span className="text-red-500">*</span>
              </label>
              <ReusableDropdown
                options={[
                  { label: 'Category 1', id: '1' },
                  { label: 'Category 2', id: '2' },
                  { label: 'Category 3', id: '3' },
                ]}
                onChange={() => { }}
                placeholder="Search category"
                buttonLabel="Select category"
                width={220}
              />

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Base price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Prep Time (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Item image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-lg hover:bg-[#1e293b] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload image
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
            ></textarea>
          </div>
        </FormSection>


        <FormSection title="Variants">
          <ReusableDropdown
            options={[
              { label: 'Variant 1', id: '1' },
              { label: 'Variant 2', id: '2' },
              { label: 'Variant 3', id: '3' },
            ]}
            onChange={() => { }}
            placeholder="Search variant"
            buttonLabel="Select variant"
            width={220}
          />
        </FormSection>

        <FormSection title="Modifiers">
          <MultiSelectDropdown
            options={[
              { label: 'Modifier 1', value: '1' },
              { label: 'Modifier 2', value: '2' },
              { label: 'Modifier 3', value: '3' },
            ]}
            onChange={() => { }}
            placeholder="Search modifier"
            width={220}
            selectedValues={[]}
          />

        </FormSection>


        <FormSection title="Additionals">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tags</label>
            <p className="text-sm text-gray-500 mb-2">Add searchable tags like "spicy", "bestseller", "new"</p>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:ring-0 focus:border-gray-300"
            />
          </div>
        </FormSection>
      </div>
    </LayoutComponent>
  );
}


