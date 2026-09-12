import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";

export default function Plantilla_General() {
  return (
    // <>
      <div className="">
        <NavBar></NavBar>
        <div className="py-15 px-5 min-h-screen">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    // </>
  );
}
