import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserSession/UserContext";
import { API_URL } from "./Config/GlobalConfig";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }

    setUser(null);
    navigate("/");
  };
  return (
    <nav className="bg-theme-white shadow-lg fixed w-full z-50 border-b-1 border-b-theme-accent">
      {/* <nav className="bg-linear-to-b from-theme-primary to-theme-secondary text-white"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* <!-- Logo --> */}
          <div className="flex-shrink-0 text-xl font-bold text-theme-primary font-theme-logo uppercase">
            <div className="flex w-lg gap-5">
              {/* Kevin Issac LS */}
              {/* <img src="https://cdn.kevin-issac-ls.com/images/favicon.png" alt="KILS" className="max-h-8"/> */}
              <img
                src="https://www.saes.cet1.ipn.mx/Images/logos/Poli_XCH.png"
                alt="IPN"
                className="max-h-8"
              />
              <img
                src="https://www.saes.cet1.ipn.mx/Images/logos/17.png"
                alt="CET 1"
                className="max-h-8"
              />
            </div>
          </div>

          {/* <!-- Links de escritorio --> */}
          <div className="hidden md:flex space-x-4">
            {user && user ? (
              <>
                <Link
                  to="/Administrador"
                  className="text-theme-primary/80 hover:text-theme-primary duration-250"
                >
                  Inicio
                </Link>
                {/* <Link to='/Administrador/General' className="text-gray-700 hover:text-theme-black duration-250">General</Link> */}
                <Link
                  to="/Administrador/Materias"
                  className="text-theme-primary/80 hover:text-theme-primary duration-250"
                >
                  Materias
                </Link>
                <Link
                  to="/Administrador/Buscar"
                  className="text-theme-primary/80 hover:text-theme-primary duration-250"
                >
                  Buscar Alumno
                </Link>
                <Link
                  to="/Administrador/Profesores"
                  className="text-theme-primary/80 hover:text-theme-primary duration-250"
                >
                  Profesores
                </Link>
                <button onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right text-theme-primary/80 hover:text-theme-primary"></i>
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-theme-primary/80 hover:text-theme-primary duration-250"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
