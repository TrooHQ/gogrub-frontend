import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { mockCategories } from './components/mockData';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import LayoutComponent from '../Layout/LayoutComponent';

const Categories: React.FC = () => {
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');

  // Local state for categories to allow reordering
  const [categories, setCategories] = useState(mockCategories);

  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isDragDisabled = searchQuery !== '' || statusFilter !== 'all';

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newCategories = Array.from(categories);
    const [reorderedItem] = newCategories.splice(sourceIndex, 1);
    newCategories.splice(destinationIndex, 0, reorderedItem);

    setCategories(newCategories);
  };

  return (
    <LayoutComponent title="Menu Categories" description="Organize your menu with categories and subcategories" HeaderAction={
      <Link to="/menu-categories/add" className="flex gap-2 items-center px-4 py-2 text-white bg-black rounded-lg min-w-fit no-wrap">
        <span className="text-lg">+</span>
        <span>Add New Category</span>
      </Link>
    }>
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-8">

          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="Search by category name"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Active' | 'Inactive')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
          <DragDropContext onDragEnd={onDragEnd}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 w-12"></th>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    Category name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3 w-24"></th>
                </tr>
              </thead>
              <Droppable droppableId="categories" isDropDisabled={isDragDisabled}>
                {(provided) => (
                  <tbody
                    className="bg-white divide-y divide-gray-200"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {filteredCategories.map((category, index) => (
                      <Draggable
                        key={category.id}
                        draggableId={String(category.id)}
                        index={index}
                        isDragDisabled={isDragDisabled}
                      >
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              display: snapshot.isDragging ? "table" : undefined,
                              tableLayout: "fixed",
                              width: snapshot.isDragging ? "100%" : undefined,
                            }}
                            className={`transition-all duration-200 ${isDragDisabled ? '' : 'hover:bg-gray-50'} ${snapshot.isDragging
                              ? 'bg-white shadow-xl scale-[1.01] border-2 border-indigo-500/20 z-50 rounded-lg relative'
                              : 'bg-white'
                              }`}
                          >
                            <td className="px-6 py-4">
                              <button
                                className={`text-gray-400 ${isDragDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-move hover:text-gray-600'}`}
                                {...provided.dragHandleProps}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm ${snapshot.isDragging ? 'font-bold text-indigo-900' : 'font-medium text-gray-900'}`}>{category.name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${category.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                                  }`}
                              >
                                {category.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${category.branch === 'Local'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-pink-50 text-pink-700'
                                  }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${category.branch === 'Local' ? 'bg-blue-600' : 'bg-pink-600'
                                    }`}
                                ></span>
                                {category.branch}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <div className="flex gap-2 justify-end items-center">
                                <button className="p-1 text-gray-400 rounded transition-colors hover:text-gray-600 hover:bg-gray-100">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-red-400 rounded transition-colors hover:text-red-600 hover:bg-red-50">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>

          {filteredCategories.length === 0 && (
            <div className="py-12 text-center">
              <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Categories;
