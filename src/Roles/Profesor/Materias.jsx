import { Link } from "react-router-dom";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import SectionTitle from "../../Components/UI/SectionTitle";
import { useState } from "react";
import Card from "../../Components/UI/Card";
import { Profesor_Informacion, Profesor_ListaMaterias } from "../../API/Consulta";
import { useEffect } from "react";
import {useParams} from "react-router-dom"

export default function Profesor_Materias() {
  const [Materias, setMaterias] = useState([]);
  const [profesor, setProfesor]=useState([]);
  const params=useParams();

  useEffect(()=>{
    async function ObtenerDatos() {
        const Materias=await Profesor_ListaMaterias(params.IDProfesor);
        setMaterias(Materias);

        const Profesor=await Profesor_Informacion(params.IDProfesor);
        setProfesor(Profesor);
    }
    ObtenerDatos();
  },[]);
  return (
    <>
      <div>
        <SectionTitle
          Titulo={`Grupos aignados`}
          Subtitulo={`${profesor.Apellidos} ${profesor.Nombre}`}
        ></SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {Materias &&
            Materias.map((Materia) => (
              <Card
                Titulo={`${Materia.Abreviatura} - ${Materia.Materia}`}
                Botones={[
                  {
                    label: '<i class="bi bi-eye"></i>',
                    url: `${Materia.IDSistema}`,
                    Titulo: `Ver materia`,
                  }
                ]}
              ></Card>
            ))}
        </div>
      </div>
    </>
  );
}
