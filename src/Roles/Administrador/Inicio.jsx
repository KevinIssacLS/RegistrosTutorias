import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/UI/SectionTitle";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import { ObtenerListaGeneral } from "../../API/Consulta";
import { nanoid } from "nanoid";
// import Comp_Table from "../../Components/UI/Table";

export default function Administrador_Inicio() {
  const [Alumnos, setAlumnos] = useState([]);

  useEffect(()=>{
    async function ObtenerAlumnos(){
      const response=await ObtenerListaGeneral();
      setAlumnos(response);
    }
    ObtenerAlumnos();
  }, []);
  return (
    <div>
      <SectionTitle Titulo={`Registros a tutorías de regularización y recuperación`} Subtitulo={`Semestre ${SemestreTutorias}`}></SectionTitle>

      {/* <Comp_Table
      Encabezados={["N°","Boleta","Nombre","Correo","Celular","Acciones",]}
      Datos={Alumnos}
      ></Comp_Table> */}

      <div className="py-5">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-11 bg-theme-secondary text-white z-10">
            <tr>
              {[
                "N°",
                "Boleta",
                "Nombre",
                "Correo",
                "Celular",
                "Acciones",
              ].map((titulo, i) => (
                <th
                  key={i}
                  className="p-2 border border-gray-400 font-semibold text-center"
                >
                  {titulo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Alumnos.length>0 ? (Alumnos.map((Alumno, index) => (
              <tr
                key={index}
                className="odd:bg-theme-primary/5 even:bg-theme-primary/10 hover:bg-gray-300 transition-colors"
              >
                <td className="border border-gray-400 p-1 text-center">
                  {index+1}
                </td>

                <td className="border border-gray-400 p-1">{Alumno.Boleta}</td>

                <td className="border border-gray-400 p-1 uppercase">{Alumno.Apellidos} {Alumno.Nombre}</td>

                <td className="border border-gray-400 p-1 text-center">
                  {Alumno.Correo}
                </td>

                <td className="border border-gray-400 p-1 text-center">
                  {Alumno.Celular}
                </td>

                <td className="border border-gray-400 p-1 text-center space-x-2 space-y-2">

                  {/* <Link
                    to={`/Administrador/Alumnos/${Alumno.Boleta}`}
                    className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                  >
                    <i className="bi bi-eye"></i>
                  </Link> */}
                </td>
              </tr>
            ))):
            (<tr>
              <td colSpan={6} className="text-center text-gray-500 italic py-10">No hay registros para mostrar</td>
            </tr>)

          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
