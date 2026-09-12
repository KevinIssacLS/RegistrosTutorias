import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Administrador_DatosMateria, Administrador_ListaSolicitudesMaterias } from "../../API/Consulta";
import SectionTitle from "../../Components/UI/SectionTitle";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";

export default function Administrador_ListaAlumnosMateria(){
    const [datosMateria, setDatosMateria]=useState([]);
    const [listaAlumnos, setListaAlumnos]=useState([]);
    const params=useParams();

    useEffect(()=>{
        async function ObtenerDatos() {
            const Solicitudes=await Administrador_ListaSolicitudesMaterias(params.IDMateria);
            const Datos=await Administrador_DatosMateria(params.IDMateria);
            setListaAlumnos(Solicitudes);
            setDatosMateria(Datos);
        }

        ObtenerDatos();
    },[])
    return(
        <>
        <div>
                <SectionTitle
                  Titulo={`Registros a tutorías de regularización y recuperación`}
                  Subtitulo={`Semestre ${SemestreTutorias}`}
                ></SectionTitle>

                <div className="mt-10">
                    <h3 className="font-medium text-xl uppercase">{datosMateria.Materia}</h3>
                    <h3 className="font-medium uppercase">{datosMateria.Apellidos} {datosMateria.Nombre}</h3>

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
              {listaAlumnos.length > 0 ? (
                listaAlumnos.map((Alumno, index) => (
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
        </div>
        </>
    )
}