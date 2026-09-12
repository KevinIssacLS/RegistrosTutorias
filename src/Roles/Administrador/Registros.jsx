import { useEffect, useState } from "react";
import {
  ObtenerMateriaAdministrador,
  ObtenerRegistrosAdministrador,
} from "../../API/api";
import SectionTitle from "../../Components/UI/SectionTitle";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";

export default function Administrador_Registros() {
  const [Registros, EstablecerRegistros] = useState([]);
  useEffect(() => {
    async function ObtenerRegistros() {
      const response = await ObtenerRegistrosAdministrador();
      EstablecerRegistros(response);
    }

    ObtenerRegistros();
  }, []);
//   console.log(Registros);
  return (
    <div>
      <SectionTitle Titulo={`Registros a tutorías de regularización y recuperación`} Subtitulo={`Semestre ${SemestreTutorias}`}></SectionTitle>

      {Registros?.map((Registro, index) => (
        <div key={index} className="py-5">
          <h2 className="text-center font-medium text-theme-primary uppercase text-xl">
            {Registro.Materia}
          </h2>
          <div className="py-1">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-11 bg-theme-accent text-white z-10">
                <tr>
                  {[
                    "N°",
                    "Boleta",
                    "Nombre",
                    "Correo",
                    "Celular",
                    "Dictamen",
                    // "Acciones",
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
                {Registro?.Alumnos?.map((Alumno, index) => (
                  <tr
                    key={index}
                    className="odd:bg-theme-primary/5 even:bg-theme-primary/10 hover:bg-gray-300 transition-colors"
                  >
                    <td className="border border-gray-400 p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Alumno.Boleta}
                    </td>

                    <td className="border border-gray-400 p-1 uppercase">
                      {Alumno.Apellidos} {Alumno.Nombre}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Correo}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Celular}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Dictamen}
                    </td>

                    {/* <td className="border border-gray-400 p-1 text-center space-x-2 space-y-2"> */}
                      {/* <Link
                    to={`/Administrador/Alumnos/Ver/${Alumno.Boleta}`}
                    className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                  >
                    <i className="bi bi-eye"></i>
                  </Link> */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
