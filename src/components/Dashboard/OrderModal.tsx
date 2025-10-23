import { CloseRounded } from "@mui/icons-material"
import dayjs from "dayjs"

export default function ViewOrderModal({ setOrderId, SingleOrderItem }: { setOrderId: (id: string | null) => void, SingleOrderItem: any }) {

  return (
    <div className='w-[90vw] lg:w-[55vw] max-w-[860px] bg-white rounded-md h-[65vh]  max-h-[540px] overflow-hidden z-50'>
      <div className="flex flex-col-reverse w-full h-full overflow-y-scroll lg:overflow-y-hidden lg:grid lg:grid-cols-5">

        <div className='flex items-center justify-center w-full h-full col-span-1 p-8 bg-gray-100 lg:col-span-2'>
          <div className='w-full h-full '>
            <div className="flex items-center gap-[10px] text-orange-100 px-[10px] w-fit py-[5px] rounded-full text-sm"
              style={{
                background:
                  SingleOrderItem?.status?.toLowerCase() === "completed"
                    ? "#22C55E"
                    : SingleOrderItem?.status?.toLowerCase() === "pending"
                      ? "#F97316"
                      : "#EF4444",
              }}
            >
              {SingleOrderItem?.status?.toLowerCase() === "completed" ? <p>{SingleOrderItem.status}</p> : SingleOrderItem?.status?.toLowerCase() === "pending" ? <p>{SingleOrderItem.status}</p> : <p>{SingleOrderItem.status}</p>}
            </div>

            <h3 className='my-5 text-xl font-semibold'>Order Details</h3>

            <div className='flex flex-col my-5 text-sm gap-y-3'>
              <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500'>Order Number</p>
                <p className='text-gray-900'>{SingleOrderItem.order_number}</p>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500'>Customer Name</p>
                <p className='text-gray-900'>{SingleOrderItem?.customerData?.customerName}</p>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500'>Order Type</p>
                {SingleOrderItem?.order_type &&
                  SingleOrderItem.order_type.charAt(0).toUpperCase() + SingleOrderItem.order_type.slice(1)}
              </div>
              {SingleOrderItem?.order_type === "delivery" && <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-sm text-gray-500'>Delivery Address</p>
                <p className="text-xs">{SingleOrderItem?.customerData?.address}</p>
              </div>}
              {SingleOrderItem?.scheduledDate && <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500 '>Date/Time {SingleOrderItem?.scheduledDate && <span className="text-xs">(Scheduled)</span>}</p>
                <p className='text-gray-900'>{dayjs(SingleOrderItem?.scheduledDate).format("YYYY-MM-DD HH:mm")}</p>
              </div>}
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-gray-500 '>Total Price:</p>
              <h3 className='text-xl text-gray-900 font-800'>₦ {SingleOrderItem?.total_price?.toLocaleString()}</h3>
            </div>
          </div>
        </div>


        <div className='col-span-1 px-5 py-8 lg:overflow-y-scroll lg:col-span-3'>

          <div className='relative flex flex-col items-center justify-center my-4 gap-y-3'>
            <img
              src='/assets/order_det.png'
              alt="illustration_png"
            />
            <p className='mb-10 text-xl font-medium text-gray-500'>Items Ordered</p>
            <CloseRounded onClick={() => setOrderId(null)} className='absolute top-0 right-0 text-black cursor-pointer fill-black ' />

          </div>

          <div className='pr-1'>

            {SingleOrderItem?.menu_items?.map((item: any, index: number) => {
              return (
                <OrderItemComp key={index} item={item} />
              )
            })
            }


          </div>
        </div>
      </div>

    </div >
  )
}


const OrderItemComp = ({ item }: any) => {

  const { name, quantity, selectedOptions, specialInstructions, complimentary } = item;

  return (
    <div className="w-full p-3 my-3 bg-gray-100 rounded-md">
      <div className='flex items-center justify-between pb-2 mb-2 border-b border-gray-200'>
        <p className='text-sm font-medium text-gray-900'>{name}</p>
        <p className='text-xs font-medium text-gray-900'>{quantity}x</p>
      </div>
      {complimentary?.length > 0 && <p className='mt-1 mb-2.5 text-xs text-gray-500 pb-2 border-b border-gray-200'><span className="mr-2 font-semibold">Complimentary:</span>{complimentary?.map((opt: any) => opt).join(", ")}</p>}
      {selectedOptions?.length > 0 && <p className='mt-1 mb-2.5 text-xs text-gray-500 pb-2 border-b border-gray-200'><span className="mr-2 font-semibold">Extras:</span>{selectedOptions.map((opt: any) => opt.name).join(", ")}</p>}
      <p className='text-xs font-semibold text-gray-800'>Special Instructions: <span className='font-medium text-gray-500'>{specialInstructions ?? "not specified"}</span></p>
    </div>
  )
}