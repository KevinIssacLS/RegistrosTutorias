import { useEffect } from "react";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import SectionTitle from "../../Components/UI/SectionTitle";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Profesor_InformacionMateria } from "../../API/Consulta";

export default function Profesor_ListaAlumnosMateria() {
  const params = useParams();
  const [materia, setMateria] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
    async function ObtenerInformacion() {
      const response = await Profesor_InformacionMateria(
        params.IDProfesor,
        params.IDMateria,
      );
      setMateria(response.Materia);
      setAlumnos(response.Alumnos);
    }
    ObtenerInformacion();
  }, []);
  return (
    <>
      <div>
        <SectionTitle
          Titulo={`Listado de solicitudes`}
          Subtitulo={`${materia.Abreviatura} - ${materia.Materia}`}
        ></SectionTitle>
        {materia.Excel && (
          <div>
            <a
              href={materia.Excel}
              target="_blank"
              className="mt-5 cursor-pointer bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
            >
              Descargar Lista
            </a>
          </div>
        )}

        <div className="py-5">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-11 bg-theme-secondary text-white z-10">
              <tr>
                {["#", "Boleta", "Nombre", "Correo", "Celular", "Dictamen"].map(
                  (titulo, i) => (
                    <th
                      key={i}
                      className="p-2 border border-gray-400 font-semibold text-center"
                    >
                      {titulo}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {alumnos.length > 0 ? (
                alumnos.map((Alumno, index) => (
                  <tr
                    key={index}
                    className="odd:bg-theme-primary/5 even:bg-theme-primary/10 hover:bg-gray-300 transition-colors"
                  >
                    <td className="border border-gray-400 p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Boleta}
                    </td>

                    <td className="border border-gray-400 p-1 uppercase">
                      {Alumno.Apellidos} {Alumno.Nombre}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Alumno.Correo}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Celular}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Alumno.Dictamen}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500 italic py-10"
                  >
                    No hay alumnos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
