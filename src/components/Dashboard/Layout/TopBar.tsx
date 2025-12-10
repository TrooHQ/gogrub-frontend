// import { GrLocation } from 'react-icons/gr'
import { GoQuestion } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../slices/branchSlice';
import { fetchUserDetails } from '../../../slices/UserSlice';
import { AppDispatch, RootState } from '../../../store/store';
// import BranchDropDown from '../../Dashboard/AutoCompleteDropdown/AutoCompleteDropdown';

export default function TopBar() {

  const { userData } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className='grid items-center w-full grid-cols-6 shadow-sm'>
      <div className='w-full col-span-1 px-4'>
        <img src='/troo_logo_black.png' alt='' />
      </div>

      <div className='flex items-center justify-between w-full col-span-5 px-4 py-5 border-l border-l-gray-100'>

        <div className='flex items-center gap-6'>
          <div className='flex items-center px-4 border-r border-r-gray-100'>
            <div
              style={{ backgroundImage: `url(${userData?.business_logo})` }} className="w-10 h-10 mr-2 bg-center bg-cover shadow-sm" />
            <h3>{userData?.business_name}</h3>
          </div>

          {/* <div className='flex items-center gap-2'>
            <GrLocation className="text-[#DC6803]" />
            <BranchDropDown />
          </div> */}
        </div>

        <div className='flex items-center gap-4'>
          <GoQuestion className="w-8 h-8 p-2 text-gray-600 bg-gray-100 rounded-md" />
          <IoNotificationsOutline className="w-8 h-8 p-2 text-gray-600 bg-gray-100 rounded-md" />
        </div>
      </div>
    </div>
  )
}
