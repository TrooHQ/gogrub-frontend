import { LuBadge } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";


export default function MobileNoticeLayout() {
  return (
    <div>

      <div className="w-full max-w-[768px] h-[50vh] bg-[radial-gradient(circle_at_center,_#FF4F0005,_#FFE5D9,_#FFF2eb)] relative ">
        <LuBadge className='size-48 fill-[#FF4F00] stroke-[#FF4F00] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2' />
        <FaCheck className='text-white size-24 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' />
      </div>

      <div className="  w-screen min-h-[50vh] bg-white flex flex-col items-center justify-center gap-4 my-16">
        <div className="relative flex flex-col items-center justify-center w-full gap-4 text-center">
          <div className="relative w-36">
            <img src="/assets/mon.png" alt="monitor" className='w-full' />
            <img src="/assets/vector 2.png" alt="thread" className="absolute -left-[65%] top-1/2 " />
            <img src="/assets/vector 3.png" alt="thread" className="absolute -right-[65%] top-1/2" />
          </div>
        </div>
        <p className='text-lg font-[600] text-[#121212] mt-5'>At the moment, the dashboard is <br /> best on <span className="text-[#FF4F00]">a desktop browser.</span></p>

        <img src="/src/assets/gogrub-logo.png" alt="monitor" className='mt-5' />
      </div>

      <div className='min-h-[25vh] w-full bg-black flex flex-col items-center justify-center gap-4 text-center px-20 py-10'>
        <p className='text-gray-400 font-[400] text-sm'> To set up your store and start receiving orders, please log in from your computer. We’re working hard to bring mobile support soon — stay tuned!</p>
        <p className='text-gray-400 font-[600] text-base'>Need help? Contact Support</p>
      </div>
    </div>
  )
}
