import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ObtenerMateriasAdministrador } from "../../API/api";
import SectionTitle from "../../Components/UI/SectionTitle";
import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import {
  ObtenerListaMateriasGeneral,
  ObtenerListaProfesores,
} from "../../API/Consulta";
import { RegistrarMaterias } from "../../API/Registrar";
import Comp_Mensaje from "../../Components/UI/Mensaje";
import Modal from "../../Components/UI/Modal";
import FormInput from "../../Components/UI/Formularios/FormInput";
import FormSelect from "../../Components/UI/Formularios/FormSelect";
import { nanoid } from "nanoid";
import { Download, Eye, List, SquarePen } from "lucide-react";

export default function Administrador_Materias() {
  const [Materias, EstablecerMaterias] = useState([]);
  const [reload, setReload] = useState(nanoid());
  const [modalAgregar, setModalAgregar] = useState(false);
  const [formAgregar, setFormAgregar] = useState({
    Materia: "",
    Abreviatura: "",
  });
  const [mensaje, setMensaje] = useState({
    ID: "",
    Mensaje: "",
    Tipo: "",
  });
  useEffect(() => {
    async function ObtenerMaterias() {
      const response = await ObtenerListaMateriasGeneral();
      EstablecerMaterias(response);
    }

    ObtenerMaterias();
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAgregar({
      ...formAgregar,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await RegistrarMaterias(formAgregar);
      if (response.ok) {
        setMensaje({
          ID: nanoid(),
          Mensaje: "Materia agregada correctamente",
          Tipo: "Correcto",
        });
        setFormAgregar({
          Materia: "",
          Abreviatura: "",
        });
        setReload(nanoid());
        setModalAgregar(false);
      } else {
        setMensaje({
          ID: nanoid(),
          Mensaje: "Error al agregar materia",
          Tipo: "Error",
        });
        setModalAgregar(false);
      }
    } catch (error) {}
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
          Titulo={`Registros a tutorías de regularización y recuperación`}
          Subtitulo={`Semestre ${SemestreTutorias}`}
        ></SectionTitle>

        {/* <div className="mt-5 flex items-center content-center justify-center">
          <button
            onClick={() => setModalAgregar(true)}
            className="border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white rounded px-2 py-1 duration-250"
          >
            Agregar Materia
          </button>
        </div> */}

        <div className="py-5">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-11 bg-theme-secondary text-white z-10">
              <tr>
                {["#", "Materia", "Inscritos" , "Profesor", "Estado", "Acciones"].map(
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
              {Materias.length > 0 ? (
                Materias.map((Materia, index) => (
                  <tr
                    key={index}
                    className="odd:bg-theme-primary/5 even:bg-theme-primary/10 hover:bg-gray-300 transition-colors"
                  >
                    <td className="border border-gray-400 p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Materia.Materia}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Materia.TotalInscritos}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Materia.Apellidos} {Materia.Nombre}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Materia.Estado}
                    </td>

                    <td className="border border-gray-400 text-sm p-1 space-x-1 text-center gap-2">
                      <Link
                        to={`/Administrador/Materias/${Materia.IDSistema}`}
                        className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                      >
                        <Eye></Eye>
                      </Link>
                      <Link
                        to={`/Administrador/Materias/${Materia.IDSistema}/Editar`}
                        className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                      >
                        <SquarePen></SquarePen>
                      </Link>
                      {Materia.Excel && (
                        <a
                          href={Materia.Excel}
                          target="_blank"
                          className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                        >
                          <Download></Download>
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-500 italic py-10"
                  >
                    No hay materias para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalAgregar}
        onClose={() => setModalAgregar(false)}
        title={`Agregar Materia`}
      >
        <div className="space-y-5">
          <FormInput
            label={`Materia`}
            name={`Materia`}
            onChange={handleChange}
            value={formAgregar.Materia}
            type="text"
            placeholder="Título de la materia"
          ></FormInput>
          <FormInput
            label={`Abreviatura`}
            name={`Abreviatura`}
            onChange={handleChange}
            value={formAgregar.Abreviatura}
            type="text"
            placeholder="Abreviatura de la materia"
          ></FormInput>
          <div className="flex w-full items-center content-center justify-center">
            <button
              onClick={handleSubmit}
              className="border border-theme-primary text-theme-primary px-2 py-1 rounded hover:bg-theme-primary hover:text-white cursor-pointer duration-250"
            >
              Agregar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
