import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Orders from "pages/orders";
import Requests from "pages/requests";
import Houses from "pages/houses";
import Monthly from "pages/monthly";
import Breakdown from "pages/breakdown";
// import Geography from "pages/geography";
// import Overview from "pages/overview";
// import Daily from "pages/daily";
// import Monthly from "pages/monthly";
// import Admin from "pages/admin";
// import Performance from "pages/performance";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/breakdown" element={<Breakdown />} />
          {/* <Route path="/geography" element={<Geography />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/performance" element={<Performance />} /> */}
        </Route>
      </ReactRoutes>
    </>
  );
};

export default Routes;
