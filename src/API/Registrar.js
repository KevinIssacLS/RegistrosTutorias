import axios from "axios";
import { API_URL } from "../Components/Config/GlobalConfig";

export const RegistrarMaterias = async (Materia) => {
  try {
    const response = await axios.post(
      `${API_URL}/Materias/Registrar`,
      { Materia },
      { withCredentials: true },
    );
    return { ok: true, Materia: response };
  } catch (error) {
    console.error("Error en el servidor", error);
    return { ok: false, Mensaje: "Error en el servidor" };
  }
};

export const ActualizarMateria = async (Materia) => {
  try {
    const response = await axios.post(
      `${API_URL}/Materias/Actualizar`,
      { Materia },
      { withCredentials: true },
    );
    return { ok: true, Materia: response };
  } catch (error) {
    console.error("Error en el servidor", error);
    return { ok: false, Mensaje: "Error en el servidor" };
  }
};

export const RegistrarProfesor = async (Profesor) => {
  try {
    const response = await axios.post(
      `${API_URL}/Profesores/Registrar`,
      { Profesor },
      { withCredentials: true },
    );
    return { ok: true, Profesor: response };
  } catch (error) {
    console.error("Error en el servidor", error);
    return { ok: false, Mensaje: "Error en el servidor" };
  }
};
