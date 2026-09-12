import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import RegistroTutorias from "./Registro.jsx";
import PrivateRoute from "./Components/UserSession/PrivateRoute.jsx";
import Inicio from "./Inicio.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Administrador_Inicio from "./Roles/Administrador/Inicio.jsx";
import Administrador_Materias from "./Roles/Administrador/Materias.jsx";
import Administrador_Buscar from "./Roles/Administrador/Buscar.jsx";
import Administrador_ListaProfesores from "./Roles/Administrador/Profesores.jsx";
import Administrador_ListaAlumnosMateria from "./Roles/Administrador/ListaMateria.jsx";
import Administrador_EditarMateria from "./Roles/Administrador/EditarMateria.jsx";
import Profesor_Materias from "./Roles/Profesor/Materias.jsx";
import Profesor_ListaAlumnosMateria from "./Roles/Profesor/ListaMateria.jsx";
import { nanoid } from "nanoid";
import Plantilla_General from "./Components/Plantillas/General.jsx";
import Plantilla_Profesores from "./Components/Plantillas/Profesores.jsx";

export default function App() {
  console.log(nanoid(20));
  return (
    <div>

      {/* CONTENIDO DE LA PÁGINA */}
        <Routes>
          <Route element={<Plantilla_General></Plantilla_General>}>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          {/* <Route path="/" element={<RegistroTutorias></RegistroTutorias>}></Route> */}
          <Route path="/Administrador" element={<PrivateRoute></PrivateRoute>}>
            <Route
              index
              element={<Administrador_Inicio></Administrador_Inicio>}
            ></Route>

            <Route path="Materias">
              <Route
                index
                element={<Administrador_Materias></Administrador_Materias>}
              ></Route>
              <Route path=":IDMateria">
                <Route
                  index
                  element={
                    <Administrador_ListaAlumnosMateria></Administrador_ListaAlumnosMateria>
                  }
                ></Route>
                <Route
                  path="Editar"
                  element={
                    <Administrador_EditarMateria></Administrador_EditarMateria>
                  }
                ></Route>
              </Route>
            </Route>
            <Route
              path="Buscar"
              element={<Administrador_Buscar></Administrador_Buscar>}
            ></Route>
            <Route
            path="Alumno"
            >
              <Route path=":IDAlumno">
                <Route path="Editar"></Route>
              </Route>
            </Route>
            <Route
              path="Profesores"
              element={
                <Administrador_ListaProfesores></Administrador_ListaProfesores>
              }
            ></Route>
          </Route>
          </Route>

          <Route path="/Profesor/:IDProfesor" element={<Plantilla_General></Plantilla_General>}>
            <Route
              index
              element={<Profesor_Materias></Profesor_Materias>}
            ></Route>
            <Route path=":IDMateria" element={<Profesor_ListaAlumnosMateria></Profesor_ListaAlumnosMateria>}></Route>
          </Route>
        </Routes>
      </div>
  );
}
