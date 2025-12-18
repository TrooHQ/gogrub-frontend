import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "./components/DataTable";
import PaginationComponent from "../PaginationComponent";
import { mockMenuItems, statsData, type MenuItem } from "./components/mockData";
import FilterBar from "./components/FilterBar";
import LayoutComponent from "../Layout/LayoutComponent";

type Row = MenuItem;

export default function MenuItems() {

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [branchFilter, setBranchFilter] = useState("All branches");
  const [itemFilter, setItemFilter] = useState("All items");

  const stats = statsData;

  const rows: Row[] = mockMenuItems;

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.sku.toLowerCase().includes(search.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ totalOrders: number; totalPages: number; currentPage: number; pageSize: number }>({
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });

  // Update pagination when filters/page change
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setPagination({
      totalOrders: filtered.length,
      totalPages: Math.ceil(filtered.length / pagination.pageSize) || 1,
      currentPage: page,
      pageSize: pagination.pageSize,
    });
  }, [filtered.length, page, pagination.pageSize]);


  return (
    <LayoutComponent title="Menu Item" description="Create a new item for your menu." HeaderAction={
      <Link to="/menu-list/add" className="flex gap-2 items-center px-4 py-2 text-white bg-black rounded-lg min-w-fit no-wrap">
        <span className="text-lg">+</span>
        <span>New item</span>
      </Link>
    }>
      {/* {loading && <div className='flex fixed top-0 left-0 justify-center items-center w-full min-h-screen bg-gray-100/75'>
        <Loader2 className='w-20 h-20 text-[#DC6803] animate-spin' />
      </div>} */}

      <FilterBar
        categoryFilter={categoryFilter}
        branchFilter={branchFilter}
        itemFilter={itemFilter}
        search={search}
        setCategoryFilter={setCategoryFilter}
        setBranchFilter={setBranchFilter}
        setItemFilter={setItemFilter}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-4 gap-4 mt-6">
        {stats.map(s => (
          <div key={s.label} className="p-4 bg-white rounded-lg border">
            <p className="text-xs text-gray-600">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden mt-6 bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <DataTable items={filtered} />
        </div>
        <PaginationComponent
          setPage={setPage} pagination={pagination}
        />
      </div>

    </LayoutComponent >
  );
}
