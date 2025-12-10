import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'

export default function LayoutComponent({ children, title, description, showTopBar = true, HeaderAction }: { children: React.ReactNode, title?: string, description?: string, showTopBar?: boolean, HeaderAction?: React.ReactNode }) {


  return (
    <div className='w-full'>
      {showTopBar && <TopBar />}
      <div className='grid w-full grid-cols-6'>
        <div className='w-full min-h-screen col-span-1 '>
          <SideBar />
        </div>
        <div className='w-full min-h-screen col-span-5 border-l border-l-gray-100'>
          <div className='w-full h-screen overflow-y-scroll'>
            <div className="flex items-center justify-between border-b border-b-gray-100">
              <div className='min-w-fit p-4 '>
                <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
                <p className='text-sm '>{description}</p>
              </div>
              {HeaderAction && <div className="mx-4">{HeaderAction}</div>}
            </div>
            <div className='p-4'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
