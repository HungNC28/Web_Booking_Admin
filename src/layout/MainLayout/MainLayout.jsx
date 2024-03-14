import "./MainLayout.css";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="MainLayoutContainer">
      <div className="MainLayoutRow">
        <div className="MainLayoutNav">
          <h3 className="MainLayoutPage_title">Admin page</h3>
          <Navigation />
        </div>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
