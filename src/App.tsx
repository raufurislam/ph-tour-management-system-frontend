import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
// import { generateRoutes } from "./utils/generateRoutes";
// import { adminSidebarItems } from "./routes/AdminSidebarItems";

function App() {
  // console.log(generateRoutes(adminSidebarItems));

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;
