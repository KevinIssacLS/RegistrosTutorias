import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/UI/SectionTitle";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import FormInput from "../../Components/UI/Formularios/FormInput";
import { Administrador_BuscarAlumno } from "../../API/Consulta";

export default function Administrador_Buscar() {
  const [Boleta, EstablecerBoleta] = useState("");
  const [Alumno, EstablecerAlumno] = useState([]);

  useEffect(() => {
    async function BuscarAlumno() {
      const response = await Administrador_BuscarAlumno(Boleta);
      EstablecerAlumno(response);
      // console.log(response);
    }

    BuscarAlumno();
  }, [Boleta]);

  return (
    <div>
      <SectionTitle Titulo={`Registros a tutorías de regularización y recuperación`} Subtitulo={`Semestre ${SemestreTutorias}`}></SectionTitle>

      {/* Barra de búsqueda */}
      <div className="my-5">
          {/* <input
            type="text"
            className="border-1 border-gray-400 w-full p-1 rounded-md"
            placeholder="NÚMERO DE Boleta"
            value={Boleta}
            onChange={(e) => EstablecerBoleta(e.target.value)}
          /> */}
          <FormInput label={`Número de Boleta`} name={`Boleta`} onChange={(e) => EstablecerBoleta(e.target.value)} value={Boleta} type="text"></FormInput>
      </div>

      {/* Resultado */}
      {
        <div className="space-y-10">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Boleta:
            </div>
            <div className="col-span-2 uppercase">{Alumno.Boleta}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Apellidos:
            </div>
            <div className="col-span-2 uppercase">{Alumno.Apellidos}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Nombre:
            </div>
            <div className="col-span-2 uppercase">{Alumno.Nombre}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Correo:
            </div>
            <div className="col-span-2">{Alumno.Correo}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Celular:
            </div>
            <div className="col-span-2 uppercase">{Alumno.Celular}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Dictamen:
            </div>
            <div className="col-span-2 uppercase">{Alumno.Dictamen}</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Materias:
            </div>
            <div className="col-span-2 uppercase">
              {Alumno?.Materias?.map((Materia) => (
                <p className="pb-2">{Materia.Materia}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 font-medium uppercase text-right">
              Acciones:
            </div>
            <div className="col-span-2 uppercase">
              {/* {Alumno&&(<Link to={`/Administrador/Editar/Alumno/${Alumno.Boleta}`} className="border border-theme-primary p-2 rounded-md hover:bg-theme-primary hover:text-white duration-250"> Editar</Link>)} */}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
