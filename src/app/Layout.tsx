// src/app/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout() {
  return (
    <div className="legacy">
      <div id="site">
        <div id="wrapper">
          <Header />
          <div id="main">
            <div id="content-wrapper">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
