import { useEffect, useState } from "react";
import Modal from "../../Components/UI/Modal";
import SectionTitle from "../../Components/UI/SectionTitle";
import {
  Administrador_DatosMateria,
  ObtenerListaProfesores,
} from "../../API/Consulta";
import { useNavigate, useParams } from "react-router-dom";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import FormInput from "../../Components/UI/Formularios/FormInput";
import FormSelect from "../../Components/UI/Formularios/FormSelect";
import { ActualizarMateria } from "../../API/Registrar";
import Comp_Mensaje from "../../Components/UI/Mensaje";
import { nanoid } from "nanoid";

export default function Administrador_EditarMateria() {
  const [profesores, setProfesores] = useState([]);
  const NavTo = useNavigate();
  const [materia, setMateria] = useState({
    Materia: "",
    Abreviatura: "",
    IDProfesor: "",
    Estado: "",
    Excel: "",
  });
  const [mensaje, setMensaje] = useState({
    ID: "",
    Mensaje: "",
    Tipo: "",
  });
  const params = useParams();
  useEffect(() => {
    async function BuscarDatosMateria() {
      const Materia = await Administrador_DatosMateria(params.IDMateria);
      const Profesores = await ObtenerListaProfesores();
      setMateria(Materia);
      setProfesores(Profesores);
    }

    BuscarDatosMateria();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await ActualizarMateria(materia);
      if (response.ok) {
        NavTo(`/Administrador/Materias`);
      } else {
        setMensaje({
          ID: nanoid(),
          Mensaje: "Error al actualizar materia",
          Tipo: "Error",
        });
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateria({
      ...materia,
      [name]: value,
    });
  };

  return (
    <>
      <Comp_Mensaje
        ID={mensaje.ID}
        Mensaje={mensaje.Mensaje}
        Tipo={mensaje.Tipo}
      ></Comp_Mensaje>
      <div>
        <SectionTitle
          Titulo={`Tutorías de Regularización y Recuperación Semestre ${SemestreTutorias}`}
          Subtitulo={`Editar Materia`}
        ></SectionTitle>
        <div className="space-y-5">
          {materia && profesores && (
            <>
              <FormInput
                label={`Materia`}
                name={`Materia`}
                onChange={handleChange}
                value={materia.Materia}
              ></FormInput>
              <FormInput
                label={`Abreviatura`}
                name={`Abreviatura`}
                onChange={handleChange}
                value={materia.Abreviatura}
              ></FormInput>
              <FormSelect
                name={`IDProfesor`}
                label="Profesor asignado"
                onChange={handleChange}
                value={materia.IDProfesor}
              >
                <option>-- SELECCIONE UNA OPCIÓN --</option>
                {profesores.map((Profesor) => (
                  <option value={Profesor.IDSistema}>
                    {Profesor.Apellidos} {Profesor.Nombre}
                  </option>
                ))}
              </FormSelect>
              <FormSelect
                name={`Estado`}
                label="Estado"
                onChange={handleChange}
                value={materia.Estado}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Habilitada">Habilitada</option>
                <option value="No Habilitada">No Habilitada</option>
              </FormSelect>
              <FormInput
                label={`Excel`}
                name={`Excel`}
                onChange={handleChange}
                value={materia.Excel}
              ></FormInput>

              <div className="flex items-center content-center justify-center">
                <button onClick={handleSubmit} className="border rounded-md border-theme-primary hover:bg-theme-primary hover:text-white duration-250 cursor-pointer text-theme-primary px-2 py-1">
                  Guardar Cambios
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
