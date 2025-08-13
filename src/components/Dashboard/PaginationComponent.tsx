import { Pagination } from '@mui/material'
import React from 'react'

export default function PaginationComponent({ setPage, pagination }: { setPage: React.Dispatch<React.SetStateAction<number>>, pagination: { totalOrders: number; totalPages: number; currentPage: number; pageSize: number } }) {
  return (
    <div className="flex items-center justify-center w-full my-4">
      <Pagination count={pagination.totalPages} shape="rounded" showFirstButton showLastButton size="large" onChange={(e, value) => { e.preventDefault(); setPage(value) }} />
    </div>
  )
}
