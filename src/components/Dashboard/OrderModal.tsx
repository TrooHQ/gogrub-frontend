import { CloseRounded } from "@mui/icons-material"
import dayjs from "dayjs"

export default function ViewOrderModal({ setOrderId, SingleOrderItem }: { setOrderId: (id: string | null) => void, SingleOrderItem: any }) {
  return (
    <div className='w-full lg:w-[55vw] max-w-[860px] bg-white rounded-md h-[65vh]  max-h-[540px] overflow-hidden'>
      <div className='grid w-full h-full overflow-y-hidden grid-col-1 lg:grid-cols-5'>

        <div className='flex items-center justify-center w-full h-full col-span-2 p-8 bg-gray-100'>
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
                <p className='text-gray-900'>{SingleOrderItem?.customerData?.customer_name}</p>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500'>Order Type</p>
                <p className='text-gray-900'>{SingleOrderItem.order_type}</p>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                <p className='text-gray-500'>Date / Time</p>
                <p className='text-gray-900'>{dayjs(SingleOrderItem?.createdAt).format("YYYY-MM-DD HH:mm")}</p>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-gray-500 '>Total Price:</p>
              <h3 className='text-xl text-gray-900 font-800'>₦ {SingleOrderItem?.total_price?.toLocaleString()}</h3>
            </div>
          </div>
        </div>


        <div className='col-span-3 px-5 py-8 '>

          <div className='relative flex flex-col items-center justify-center my-4 gap-y-3'>
            <img
              src='/assets/order_det.png'
              alt="illustration_png"
            />
            <p className='text-xl font-medium text-gray-500'>Order Items</p>
            <CloseRounded onClick={() => setOrderId(null)} className='absolute top-0 right-0 text-black cursor-pointer fill-black ' />

          </div>

          <div className='overflow-y-scroll pr-1  h-3/5 max-h-[360px] '>

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

  //   name
  // : 
  // "Semo"
  // quantity
  // : 
  // 1
  // selectedOptions
  // : 
  // []
  // specialInstructions
  // : 
  // "another special"
  // tableNumber
  // : 
  // ""
  // totalPrice
  // : 
  // 800
  const { name, quantity, selectedOptions, specialInstructions } = item;

  console.log("selectedOptions", selectedOptions)

  return (
    <div className="w-full p-3 my-3 bg-gray-100 rounded-md">
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium text-gray-900'>{name}</p>
        <p className='text-xs font-medium text-gray-900'>{quantity}x</p>
      </div>
      <p className='mt-1 mb-2.5 text-xs text-gray-500'>{selectedOptions.map((opt: any) => opt.name).join(", ")}</p>
      <p className='text-xs font-semibold text-gray-800'>Special Instructions: <span className='font-medium text-gray-500'>{specialInstructions ?? "not specified"}</span></p>
    </div>
  )
}