import { Link, Outlet } from "react-router-dom";
import { SemestreTutorias } from "../Config/GlobalConfig";
import packageJSON from "../../../package.json";
import { useContext } from "react";
import { UserContext } from "../UserSession/UserContext";

export default function Plantilla_Profesores() {
  const user = useContext(UserContext);
  return (
    <>
      <div className="bg-linear-to-br from-theme-primary/90 pt-30 to-theme-primary md:pt-15 md:pl-15 min-h-screen">
        {/* <div className="absolute inset-0" style="background:#020617;background-image:radial-gradient(circle 500px at 50% 100px, rgba(236,72,153,0.4), transparent)"> */}
        <div className="fixed top-0 left-0 w-full h-15">
          <div className="text-white absolute top-5 flex items-center uppercase font-medium text-2xl md:left-15 px-5 text-center w-full md:text-left">
            <div className="flex gap-5 mr-5">
              <img
                src="https://www.saes.cet1.ipn.mx/Images/logos/Poli_XCH.png"
                alt="IPN"
                className="size-5"
              />
              <img
                src="https://www.saes.cet1.ipn.mx/Images/logos/17.png"
                alt="IPN"
                className="size-5"
              />
            </div>
            Tutorías de Regularización y recuperación{" "}
            <span className="font-light text-xl ml-5">
              semestre {SemestreTutorias}
            </span>
          </div>
          <nav className="text-white absolute flex md:flex-col gap-2 md:top-15 top-20 md:left-5 items-center content-center justify-center w-full md:w-5">
            {!user.user ? (
              <Link
                to="/Profesor/"
                title="Inicio"
                className="text-white/80 hover:text-white hover:scale-110 duration-250"
              >
                <i className="bi bi-house"></i>
              </Link>
            ) : (
              <>
                <Link
                  to="/Administrador"
                  className="text-white/80 hover:text-white hover:scale-110 duration-250"
                >
                  <i className="bi bi-house"></i>
                </Link>
                <Link
                  to="/Administrador/Materias"
                  className="text-white/80 hover:text-white hover:scale-110 duration-250"
                >
                  <i className="bi bi-book"></i>
                </Link>

                <Link
                  to="/Administrador/Calendario"
                  className="text-white/80 hover:text-white hover:scale-110 duration-250"
                >
                  <i className="bi bi-calendar"></i>
                </Link>
                <Link>
                  <i className="bi bi-box-arrow-right"></i>
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="bg-white md:rounded-tl-xl md:rounded-bl-xl absolute pt-5 min-w-full md:min-w-[calc(100%-3.75rem)] overflow-scroll md:h-[calc(100%-7rem)] h-[calc(100%-11rem)]">
          <div className="px-5 py-5">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="fixed bottom-2 text-white/50 font-extralight text-sm text-center w-full left-0">
          &copy; {new Date().getFullYear()} Kevin Issac LS. Todos los derechos
          reservados. <br /> Versión de la aplicación: {packageJSON.version}
        </div>
      </div>
    </>
  );
}
