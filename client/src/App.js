import "./App.css";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Inventory from "./views/Inventory";
import ManageStores from "./views/ManageStores";
import DashHome from "./views/DashHome";
import Sales from "./views/Sales";
import PurchaseDetails from "./views/PurchaseDetails";
import NotFound from "./views/NotFound";
import { AuthProvider, useAuth } from "./context/AuthProvider";
// import {useAuth} from './context/AuthProvider'
import { RequireAuth } from "./context/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          {/* <Route index element={<DashHome />} /> */}
          <Route index element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchase" element={<PurchaseDetails />} />
          <Route path="/managestores" element={<ManageStores />} />
          <Route path="/sales" element={<Sales />} />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
