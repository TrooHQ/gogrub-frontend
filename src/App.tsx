import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
import LoginPage from "./pages/LoginPage.js";
import NotFound from "./components/NotFound.tsx";
import CheckMail from "./components/authPages/CheckMail.tsx";
import ForgotPassword from "./components/authPages/ForgotPassword.tsx";
import ResetPassword from "./components/authPages/ResetPassword.tsx";
import PasswordChanged from "./components/authPages/PasswordChanged.tsx";
import BusinessProfiles from "./components/authPages/BusinessProfiles.tsx";
import Register from "./components/authPages/Register.tsx";
import VerifyAccount from "./components/authPages/VerifyAccount.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ManageUsers from "./components/Dashboard/ManageUsers.tsx";
import Overview from "./components/Dashboard/Overview.tsx";
import Roles from "./components/Dashboard/Roles.tsx";
import NewRoles from "./components/Dashboard/NewRoles.tsx";
import MenuBuilder from "./components/Dashboard/MenuBuilder.tsx";
import PriceList from "./components/Dashboard/PriceList.tsx";
import ManageTables from "./components/Dashboard/ManageTables.tsx";
import TableList from "./components/Dashboard/TableList.tsx";
import BusinessTabs from "./LandingPage/BusinessTabs.tsx";
import PosPage from "./LandingPage/Products/PosPage.tsx";
import KDSPage from "./LandingPage/Products/KDSPage.tsx";
import TableOrderingPage from "./LandingPage/Products/TableOrderingPage.tsx";
import DigitalOrderingPage from "./LandingPage/Products/DigitalOrderingPage.tsx";
import PaymentPage from "./LandingPage/Products/PaymentPage.tsx";
import RestaurantsPage from "./LandingPage/Businesses/RestaurantsPage.tsx";
import HotelPage from "./LandingPage/Businesses/HotelPage.tsx";
import LoungesPage from "./LandingPage/Businesses/LoungesPage.tsx";
import CafePage from "./LandingPage/Businesses/CafePage.tsx";
import FastFoodPage from "./LandingPage/Businesses/FastFoodPage.tsx";
import FoodTruckPage from "./LandingPage/Businesses/FoodTruckPage.tsx";
import DemoPage from "./LandingPage/Businesses/DemoPage.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Tickets from "./components/Dashboard/Tickets.tsx";
import Till from "./components/Dashboard/EmployeeDashboard/Till.tsx";
import OverviewAdmin from "./components/Dashboard/OverviewAdmin.tsx";
import BusinessInformation from "./components/Dashboard/BusinessInformation.tsx";
import ManageBranches from "./components/Dashboard/ManageBranches.tsx";
import TenantSettings from "./components/Dashboard/TenantSettings.tsx";
import MenuList from "./components/Dashboard/MenuList.tsx";
import OrderHistory from "./components/Dashboard/OrderHistory.tsx";
import CreatePin from "./components/authPages/CreatePin.tsx";
import PinCreated from "./components/authPages/PinCreated.tsx";
import UpdateCredentials from "./components/authPages/UpdateCredentials.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import OnlineOrdering from "./components/Dashboard/OnlineOrdering.tsx";
import QROrdering from "./components/Dashboard/QROrdering.tsx";
import CustomerData from "./components/Dashboard/CustomerData.tsx";
import PricingPage from "./pages/pricing/PricingPage.tsx";
import UpgradeSubscription from "./pages/pricing/UpgradeSubscription.tsx";
import VerifiedPayment from "./pages/pricing/VerifiedPayment.tsx";
import PayoutDetails from "./pages/pricing/PayoutDetails.tsx";

export default function App() {
  return (
    <div className=" font-GeneralSans">
      <Router>
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/kds" element={<KDSPage />} />
          <Route path="/table-ordering" element={<TableOrderingPage />} />
          <Route path="/digital-ordering" element={<DigitalOrderingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/restaurant" element={<RestaurantsPage />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/lounges" element={<LoungesPage />} />
          <Route path="/cafe" element={<CafePage />} />
          <Route path="/fast-food" element={<FastFoodPage />} />
          <Route path="/food-truck" element={<FoodTruckPage />} />
          <Route path="/request-demo" element={<DemoPage />} />
          <Route path="/tabs" element={<BusinessTabs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/tenant-settings" element={<TenantSettings />} />
          <Route path="/manage-assets" element={<ManageTables />} />
          <Route path="/table-list" element={<TableList />} />
          <Route path="/menu-builder" element={<MenuBuilder />} />
          <Route path="/menu-list" element={<MenuList />} />
          <Route path="/online-ordering" element={<OnlineOrdering />} />
          <Route path="/qr-ordering" element={<QROrdering />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/customer-data" element={<CustomerData />} />
          <Route path="/subscription-plan" element={<PricingPage />} />
          <Route
            path="/upgrade-subscription"
            element={<UpgradeSubscription />}
          />
          <Route path="/verified-payment" element={<VerifiedPayment />} />
          <Route path="/payout-details" element={<PayoutDetails />} />
          <Route path="/overview" element={<Overview />} />
          {/* <Route path="/overview/:param?" element={<Overview />} /> */}
          <Route path="/overview-admin" element={<OverviewAdmin />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/new-roles" element={<NewRoles />} />
          <Route path="/register" element={<Register />} />
          <Route path="/business-profile" element={<BusinessProfiles />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/checkmail" element={<CheckMail />} />
          <Route path="/password-changed" element={<PasswordChanged />} />
          <Route path="/pin-created" element={<PinCreated />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/update-credentials" element={<UpdateCredentials />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile-page" element={<ProfilePage />} />

          <Route path="/till" element={<Till />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/business-information"
            element={<BusinessInformation />}
          />
          <Route path="/manage-branches" element={<ManageBranches />} />
        </Routes>
      </Router>
    </div>
  );
}
