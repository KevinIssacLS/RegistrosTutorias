import { useEffect, useState } from "react";
import { APP_URL, SemestreTutorias } from "../../Components/Config/GlobalConfig";
import SectionTitle from "../../Components/UI/SectionTitle";
import { ObtenerListaProfesores } from "../../API/Consulta";
import Modal from "../../Components/UI/Modal";
import FormInput from "../../Components/UI/Formularios/FormInput";
import { nanoid } from "nanoid";
import { RegistrarProfesor } from "../../API/Registrar";
import Comp_Mensaje from "../../Components/UI/Mensaje";
import { Forward } from "lucide-react";

export default function Administrador_ListaProfesores() {
  const [profesores, setProfesores] = useState([]);
  const [modalProfesor, setModalProfesor] = useState(false);
  const [reload, setReload] = useState(nanoid());
  const [formAgregar, setFormAgregar] = useState({
    Nombre: "",
    Apellidos: "",
  });
  const [mensaje, setMensaje] = useState({
    ID: "",
    Mensaje: "",
    Tipo: "",
  });

  const copiarEnlaceProfesor = async (ID) => {
    try {
      await navigator.clipboard.writeText(`${APP_URL}/Profesor/${ID}`);
      // console.log("URL copiada al portapapeles");
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  useEffect(() => {
    async function ObtenerProfesores() {
      const response = await ObtenerListaProfesores();
      setProfesores(response);
    }

    ObtenerProfesores();
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
      const response = await RegistrarProfesor(formAgregar);
      if (response.ok) {
        setMensaje({
          ID: nanoid(),
          Mensaje: "Materia agregada correctamente",
          Tipo: "Correcto",
        });
        setFormAgregar({
          Nombre: "",
          Apellidos: "",
        });
        setReload(nanoid());
        setModalProfesor(false);
      } else {
        setMensaje({
          ID: nanoid(),
          Mensaje: "Error al agregar profesor",
          Tipo: "Error",
        });
        setModalProfesor(false);
      }
    } catch (error) {
      setMensaje({
        ID: nanoid(),
        Mensaje: "Error al agregar profesor",
        Tipo: "Error",
      });
      setModalProfesor(false);
      setFormAgregar({
        Nombre: "",
        Apellidos: "",
      });
    }
  };
  return (
    <>
      <Comp_Mensaje ID={mensaje.ID} Tipo={mensaje.Tipo} Mensaje={mensaje.Mensaje}></Comp_Mensaje>
      <div>
        <SectionTitle
          Titulo={`Registros a tutorías de regularización y recuperación`}
          Subtitulo={`Semestre ${SemestreTutorias}`}
        ></SectionTitle>

        <div className="mt-5 flex items-center content-center justify-center">
          <button
            onClick={() => setModalProfesor(true)}
            className="border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white rounded px-2 py-1 duration-250"
          >
            Agregar profesor
          </button>
        </div>

        <div className="py-5">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-11 bg-theme-secondary text-white z-10">
              <tr>
                {[
                  "N°",
                  "Apellidos",
                  "Nombre",
                  "Usuario",
                  "Contraseña",
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
              {profesores.length > 0 ? (
                profesores.map((Profesor, index) => (
                  <tr
                    key={index}
                    className="odd:bg-theme-primary/5 even:bg-theme-primary/10 hover:bg-gray-300 transition-colors"
                  >
                    <td className="border border-gray-400 p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Profesor.Apellidos}
                    </td>

                    <td className="border border-gray-400 p-1">
                      {Profesor.Nombre}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Profesor.Usuario}
                    </td>

                    <td className="border border-gray-400 p-1 text-center">
                      {Profesor.Contrasena}
                    </td>

                    <td className="border border-gray-400 p-1 text-center space-x-2 space-y-2">
                      <button
                      title="Copiar enlace de profesor"
                      onClick={()=>copiarEnlaceProfesor(Profesor.IDSistema)}
                    className="bg-theme-primary hover:bg-theme-secondary p-2 duration-250 text-white rounded-md inline-block"
                  >
                    <Forward></Forward>
                  </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-500 italic py-10"
                  >
                    No hay registros para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalProfesor}
        onClose={() => setModalProfesor(false)}
        title={`Agregar Profesor`}
      >
        <div className="space-y-5">
          <FormInput
            label={`Apellidos`}
            name={`Apellidos`}
            value={formAgregar.Apellidos}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            label={`Nombre(s)`}
            name={`Nombre`}
            value={formAgregar.Nombre}
            onChange={handleChange}
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
