import { SearchIcon } from 'lucide-react';


export default function FilterBar({
  categoryFilter,
  branchFilter,
  itemFilter,
  search,
  setSearch,
  setCategoryFilter,
  setBranchFilter,
  setItemFilter,
}: {
  categoryFilter: string,
  branchFilter: string,
  itemFilter: string,
  search: string,
  setSearch: (search: string) => void,
  setCategoryFilter: (categoryFilter: string) => void,
  setBranchFilter: (branchFilter: string) => void,
  setItemFilter: (itemFilter: string) => void,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="relative w-full md:w-96">
        <SearchIcon className="absolute top-1/2 left-2 flex items-center pointer-events-none h-5 w-5 text-gray-400 transform -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          placeholder="Search by name, SKU"
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
        <button onClick={() => setCategoryFilter("All categories")} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">+ {categoryFilter}</button>
        <button onClick={() => setBranchFilter("All branches")} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">+ {branchFilter}</button>
        <button onClick={() => setItemFilter("All items")} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">+ {itemFilter}</button>
      </div>
    </div>
  );
}
