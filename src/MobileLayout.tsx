import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Mobile/NotFound";
import Login from "./Mobile/authPages/Login";
import RegistrationStepForm from "./Mobile/Components/RegistrationStepForm";
import MenuSetupForm from "./Mobile/Components/MenuSetupForm";
import ScrollToTop from "./components/ScrollToTop";
import TableSetupForm from "./Mobile/Components/TableSetupForm";
import Dashboard from "./Mobile/authPages/Dashboard";
import Tickets from "./Mobile/Components/Tickets";
import Menu from "./Mobile/Components/Menu";
import Order from "./Mobile/Components/Order";
import Reporting from "./Mobile/Components/Reporting";
import SettingsPage from "./Mobile/SettingsPage";
import ManageQrCode from "./Mobile/Components/Settings/QrCodeSettings/ManageQrCode";
import EmployeeDashboard from "./Mobile/Employee/EmployeeDashboard";
import EmployeeSettingsPage from "./Mobile/Employee/EmployeeSettingsPage";
import EnterPassword from "./Mobile/authPages/EnterPassword";
import CreatePassword from "./Mobile/authPages/CreatePassword";
import ListofRestaurants from "./Mobile/Customers/ListofRestaurants";
import StartOrder from "./Mobile/Customers/StartOrder";
import MenuDetails from "./Mobile/Customers/MenuDetails";
import { MenuPage } from "./Mobile/Customers/MenuPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Basket } from "./Mobile/Customers/Basket";
import { Tip } from "./Mobile/Customers/Tip";
import { SelectPayment } from "./Mobile/Customers/SelectPayment";
import { Receipt } from "./Mobile/Customers/Receipt";
import { GetReceipt } from "./Mobile/Customers/GetReceipt";
import VerifyAccount from "./Mobile/Components/VerifyAccount";
import ForgotPassword from "./Mobile/authPages/ForgotPassword";
import VerifyAccount2 from "./Mobile/Components/VerifyAccount2";
import { CategoryDetails } from "./Mobile/Customers/CategoryDetails";
import { AdminMenuPage } from "./Mobile/Components/AdminMenuPage";
import RoomSetupForm from "./Mobile/Components/RoomSetupForm";
import InRoomStartOrder from "./Mobile/InRoomDining/InRoomStartOrder";
import { InRoomMenuPage } from "./Mobile/InRoomDining/InRoomMenuPage";
import { InRoomCategoryDetails } from "./Mobile/InRoomDining/InRoomCategoryDetails";
import InRoomMenuDetails from "./Mobile/InRoomDining/InRoomMenuDetails";
import { InRoomBasket } from "./Mobile/InRoomDining/InRoomBasket";
import { InRoomTip } from "./Mobile/InRoomDining/InRoomTip";
import { InRoomSelectPayment } from "./Mobile/InRoomDining/InRoomSelectPayment";
import { InRoomGetReceipt } from "./Mobile/InRoomDining/InRoomGetReceipt";
import { InRoomReceipt } from "./Mobile/InRoomDining/InRoomReceipt";
import OnlineOrderingStartOrder from "./Mobile/OnlineOrdering/OnlineOrderingStartOrder";
import { OnlineOrderingMenuPage } from "./Mobile/OnlineOrdering/OnlineOrderingMenuPage";
import { OnlineOrderingCategoryDetails } from "./Mobile/OnlineOrdering/OnlineOrderingCategoryDetails";
import OnlineOrderingMenuDetails from "./Mobile/OnlineOrdering/OnlineOrderingMenuDetails";
import { OnlineOrderingBasket } from "./Mobile/OnlineOrdering/OnlineOrderingBasket";
import { OnlineOrderingTip } from "./Mobile/OnlineOrdering/OnlineOrderingTip";
import { OnlineOrderingSelectPayment } from "./Mobile/OnlineOrdering/OnlineOrderingSelectPayment";
import { OnlineOrderingReceipt } from "./Mobile/OnlineOrdering/OnlineOrderingReceipt";
import { OnlineOrderingGetReceipt } from "./Mobile/OnlineOrdering/OnlineOrderingGetReceipt";
import ChooseColor from "./Mobile/Components/Settings/ChooseColor";
import OrderHistory from "./Mobile/Components/OrderHistory";
import AccountVerified from "./Mobile/Components/AccountVerified";

const MobileLayout = () => {
  return (
    <div className=" font-GeneralSans overflow-hidden">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/digi-input" element={<VerifyAccount2 />} />

          <Route path="/restaurants" element={<ListofRestaurants />} />

          <Route path="/:id?" element={<StartOrder />} />
          <Route path="demo/in_room_dining/" element={<InRoomStartOrder />} />
          <Route
            path="/demo/:id/explore-menu/orderandpay"
            element={<MenuPage />}
          />
          <Route
            path="demo/:id?/category-details/:id?/orderandpay"
            element={<CategoryDetails />}
          />
          <Route
            path="/demo/menu-details/:id/orderandpay"
            element={<MenuDetails />}
          />
          <Route path="/demo/basket/orderandpay" element={<Basket />} />
          <Route path="/demo/tip/orderandpay" element={<Tip />} />
          <Route
            path="/demo/payment-type/orderandpay"
            element={<SelectPayment />}
          />
          <Route path="/demo/receipt/orderandpay" element={<Receipt />} />
          <Route
            path="/demo/get-receipt/orderandpay"
            element={<GetReceipt />}
          />

          <Route path="demo/in_room_dining" element={<InRoomStartOrder />} />
          <Route
            path="/demo/:id/explore-menu/in_room_dining"
            element={<InRoomMenuPage />}
          />
          <Route
            path="demo/category-details/in_room_dining"
            element={<InRoomCategoryDetails />}
          />
          <Route
            path="/demo/menu-details/:id/in_room_dining"
            element={<InRoomMenuDetails />}
          />
          <Route
            path="/demo/basket/in_room_dining"
            element={<InRoomBasket />}
          />
          <Route path="/demo/tip/in_room_dining" element={<InRoomTip />} />
          <Route
            path="/demo/payment-type/in_room_dining"
            element={<InRoomSelectPayment />}
          />
          <Route
            path="/demo/receipt/in_room_dining"
            element={<InRoomReceipt />}
          />
          <Route
            path="/demo/get-receipt/in_room_dining"
            element={<InRoomGetReceipt />}
          />

          <Route
            path="demo/online_ordering/:id/:branchId"
            element={<OnlineOrderingStartOrder />}
          />

          <Route
            path="/demo/:id/explore-menu/online_ordering"
            element={<OnlineOrderingMenuPage />}
          />
          <Route
            path="demo/:id/items/online_ordering"
            element={<OnlineOrderingCategoryDetails />}
          />
          <Route
            path="/demo/menu-details/:id/online_ordering"
            element={<OnlineOrderingMenuDetails />}
          />
          <Route
            path="/demo/basket/online_ordering"
            element={<OnlineOrderingBasket />}
          />
          <Route
            path="/demo/tip/online_ordering"
            element={<OnlineOrderingTip />}
          />
          <Route
            path="/demo/payment-type/online_ordering"
            element={<OnlineOrderingSelectPayment />}
          />
          <Route
            path="/demo/receipt/online_ordering/:id?"
            element={<OnlineOrderingReceipt />}
          />
          <Route
            path="/demo/get-receipt/online_ordering"
            element={<OnlineOrderingGetReceipt />}
          />

          <Route
            path="/demo/forgot-password/gogrub-portal"
            element={<ForgotPassword />}
          />
          <Route path="/demo/dashboard/gogrub-portal" element={<Dashboard />} />
          <Route path={`/demo/login/gogrub-portal`} element={<Login />} />
          <Route
            path="/demo/employee-dashboard/gogrub-portal"
            element={<EmployeeDashboard />}
          />
          <Route
            path="demo/admin-menu/gogrub-portal"
            element={<AdminMenuPage />}
          />

          <Route
            path="/demo/:id/menu-page/:id/gogrub-portal"
            element={<Menu />}
          />

          <Route path="/demo/ticket/gogrub-portal" element={<Tickets />} />
          <Route
            path="/demo/order-history/gogrub-portal"
            element={<OrderHistory />}
          />

          <Route path="/demo/order/gogrub-portal" element={<Order />} />

          <Route path="/demo/report/gogrub-portal" element={<Reporting />} />
          <Route
            path="/demo/register/gogrub-portal?/:id"
            element={<RegistrationStepForm />}
          />
          <Route
            path="/demo/verify/gogrub-portal"
            element={<VerifyAccount />}
          />
          <Route
            path="/demo/verified/gogrub-portal"
            element={<AccountVerified />}
          />
          <Route path="/demo/menu/gogrub-portal" element={<MenuSetupForm />} />
          <Route
            path="/demo/settings/gogrub-portal"
            element={<SettingsPage />}
          />
          <Route
            path="/demo/employee-settings/gogrub-portal"
            element={<EmployeeSettingsPage />}
          />
          <Route
            path="/demo/password/gogrub-portal"
            element={<EnterPassword />}
          />
          <Route
            path="/demo/create-password/gogrub-portal"
            element={<CreatePassword />}
          />
          <Route
            path="/demo/manage-qr/gogrub-portal"
            element={<ManageQrCode />}
          />

          <Route
            path="/demo/choose-color/gogrub-portal"
            element={<ChooseColor />}
          />
          <Route
            path="/demo/table/gogrub-portal"
            element={<TableSetupForm />}
          />
          <Route path="/demo/room/gogrub-portal" element={<RoomSetupForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MobileLayout;
