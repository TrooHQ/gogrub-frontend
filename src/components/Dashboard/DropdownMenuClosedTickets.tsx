export const DropdownMenuClosedTickets = ({
  handleVoidOrderMenu,
  handleVacateTableMenu,
  handleRefundMenu,
}: {
  handleVoidOrderMenu: () => void;
  handleVacateTableMenu: () => void;
  handleRefundMenu: () => void;
}) => {
  const handleItemClick = (action: string) => {
    if (action === "Void Order") {
      handleVoidOrderMenu();
    } else if (action === "Vacate Table") {
      handleVacateTableMenu();
    } else if (action === "Request Refund") {
      handleRefundMenu();
    }
    else {
      console.log("click")
    }
  };

  return (
    <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-[40px] z-10">
      <li
        onClick={() => handleItemClick("")}
        className="font-[400] cursor-pointer text-left"
      >
        Order Complete
      </li>
      <li
        onClick={() => handleItemClick("")}
        className="font-[400] cursor-pointer text-left"
      >
        Cancel Order
      </li>
    </ul>
  );
};
