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
// import Register from "./components/authPages/Register.tsx";
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
import ProtectedRoutes, { UnProtectedRoutes } from "./components/authPages/ProtectedRoutes.tsx";

export default function App() {



  return (
    <div className=" font-GeneralSans">
      <Router>
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<UnProtectedRoutes>
            <LoginPage />
          </UnProtectedRoutes>
          } />
          <Route path="/login" element={<UnProtectedRoutes>
            <LoginPage />
          </UnProtectedRoutes>
          } />
          <Route path="/register" element={<UnProtectedRoutes>
            <BusinessProfiles />
          </UnProtectedRoutes>
          } />
          <Route path="/verify-account" element={<UnProtectedRoutes>
            <VerifyAccount />
          </UnProtectedRoutes>
          } />
          <Route path="/checkmail" element={<UnProtectedRoutes>
            <CheckMail />
          </UnProtectedRoutes>
          } />
          <Route path="/password-changed" element={<UnProtectedRoutes>
            <PasswordChanged />
          </UnProtectedRoutes>
          } />
          <Route path="/reset-password" element={<UnProtectedRoutes>
            <ResetPassword />
          </UnProtectedRoutes>
          } />
          <Route path="/forgot-password" element={<UnProtectedRoutes>
            <ForgotPassword />
          </UnProtectedRoutes>
          } />

          <Route path="/pos" element={
            <ProtectedRoutes>
              <PosPage />
            </ProtectedRoutes>
          } />
          <Route path="/kds" element={
            <ProtectedRoutes>
              <KDSPage />
            </ProtectedRoutes>
          } />
          <Route path="/table-ordering" element={
            <ProtectedRoutes>
              <TableOrderingPage />
            </ProtectedRoutes>
          } />
          <Route path="/digital-ordering" element={
            <ProtectedRoutes>
              <DigitalOrderingPage />
            </ProtectedRoutes>
          } />
          <Route path="/payment" element={
            <ProtectedRoutes>
              <PaymentPage />
            </ProtectedRoutes>
          } />
          <Route path="/restaurant" element={
            <ProtectedRoutes>
              <RestaurantsPage />
            </ProtectedRoutes>
          } />
          <Route path="/hotel" element={
            <ProtectedRoutes>
              <HotelPage />
            </ProtectedRoutes>
          } />
          <Route path="/lounges" element={
            <ProtectedRoutes>
              <LoungesPage />
            </ProtectedRoutes>
          } />
          <Route path="/cafe" element={
            <ProtectedRoutes>
              <CafePage />
            </ProtectedRoutes>
          } />
          <Route path="/fast-food" element={
            <ProtectedRoutes>
              <FastFoodPage />
            </ProtectedRoutes>
          } />
          <Route path="/food-truck" element={
            <ProtectedRoutes>
              <FoodTruckPage />
            </ProtectedRoutes>
          } />
          <Route path="/request-demo" element={
            <ProtectedRoutes>
              <DemoPage />
            </ProtectedRoutes>
          } />
          <Route path="/tabs" element={
            <ProtectedRoutes>
              <BusinessTabs />
            </ProtectedRoutes>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          } />
          <Route path="/manage-users" element={
            <ProtectedRoutes>
              <ManageUsers />
            </ProtectedRoutes>
          } />
          <Route path="/tenant-settings" element={
            <ProtectedRoutes>
              <TenantSettings />
            </ProtectedRoutes>
          } />
          <Route path="/manage-assets" element={
            <ProtectedRoutes>
              <ManageTables />
            </ProtectedRoutes>
          } />
          <Route path="/table-list" element={
            <ProtectedRoutes>
              <TableList />
            </ProtectedRoutes>
          } />
          <Route path="/menu-builder" element={
            <ProtectedRoutes>
              <MenuBuilder />
            </ProtectedRoutes>
          } />
          <Route path="/menu-list" element={
            <ProtectedRoutes>
              <MenuList />
            </ProtectedRoutes>
          } />
          <Route path="/online-ordering" element={
            <ProtectedRoutes>
              <OnlineOrdering />
            </ProtectedRoutes>
          } />
          <Route path="/qr-ordering" element={
            <ProtectedRoutes>
              <QROrdering />
            </ProtectedRoutes>
          } />
          <Route path="/price-list" element={
            <ProtectedRoutes>
              <PriceList />
            </ProtectedRoutes>
          } />
          <Route path="/tickets" element={
            <ProtectedRoutes>
              <Tickets />
            </ProtectedRoutes>
          } />
          <Route path="/order-history" element={
            <ProtectedRoutes>
              <OrderHistory />
            </ProtectedRoutes>
          } />
          <Route path="/customer-data" element={
            <ProtectedRoutes>
              <CustomerData />
            </ProtectedRoutes>
          } />
          <Route path="/subscription-plan" element={
            <ProtectedRoutes>
              <PricingPage />
            </ProtectedRoutes>
          } />
          <Route
            path="/upgrade-subscription"
            element={
              <ProtectedRoutes>
                <UpgradeSubscription />
              </ProtectedRoutes>
            }
          />
          <Route path="/verified-payment" element={
            <ProtectedRoutes>
              <VerifiedPayment />
            </ProtectedRoutes>
          } />
          <Route path="/payout-details" element={
            <ProtectedRoutes>
              <PayoutDetails />
            </ProtectedRoutes>
          } />
          <Route path="/overview" element={
            <ProtectedRoutes>
              <Overview />
            </ProtectedRoutes>
          } />
          <Route path="/overview-admin" element={
            <ProtectedRoutes>
              <OverviewAdmin />
            </ProtectedRoutes>
          } />
          <Route path="/roles" element={
            <ProtectedRoutes>
              <Roles />
            </ProtectedRoutes>
          } />
          <Route path="/new-roles" element={
            <ProtectedRoutes>
              <NewRoles />
            </ProtectedRoutes>
          } />
          <Route path="/pin-created" element={
            <ProtectedRoutes>
              <PinCreated />
            </ProtectedRoutes>
          } />
          <Route path="/create-pin" element={
            <ProtectedRoutes>
              <CreatePin />
            </ProtectedRoutes>
          } />
          <Route path="/create-pin" element={
            <ProtectedRoutes>
              <CreatePin />
            </ProtectedRoutes>
          } />
          <Route path="/update-credentials" element={
            <ProtectedRoutes>
              <UpdateCredentials />
            </ProtectedRoutes>
          } />



          <Route path="/profile-page" element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          } />

          <Route path="/till" element={
            <ProtectedRoutes>
              <Till />
            </ProtectedRoutes>
          } />
          <Route path="*" element={
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          } />

          <Route
            path="/business-information"
            element={
              <ProtectedRoutes>
                <BusinessInformation />
              </ProtectedRoutes>
            }
          />
          <Route path="/manage-branches" element={
            <ProtectedRoutes>
              <ManageBranches />
            </ProtectedRoutes>
          } />
        </Routes>
      </Router>
    </div>
  );
}
