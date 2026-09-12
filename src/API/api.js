import axios from "axios";
import { API_URL } from "../Components/Config/GlobalConfig";
const URL = `${API_URL}`;
// console.log(URL)

export const ListaMaterias = async () => {
    try {
      const response = await axios.get(
        `${URL}/lista/materias`,
        // {
        //   withCredentials: true,
        // }
      );

      // console.log("respuesta backend: ", response.data);
      return response.data.Materias || [];
    } catch (err) {
      console.error(
        "Error al obtener actividades:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
};



export const ListaAlumnos = async () => {
    try {
      const response = await axios.get(
        `${URL}/lista/alumnos`,
        {
          withCredentials: true,
        }
      );

      // console.log("respuesta backend: ", response.data);
      return response.data.Alumnos || [];
    } catch (err) {
      console.error(
        "Error al obtener actividades:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
};


export const BuscarAlumnoAdministrador = async (Boleta) => {
  
      try {
        // console.log(Boleta);
      const response = await axios.get(
        `${URL}/administrador/buscar/alumno`,
        {
           params: {Boleta},
          withCredentials: true,
        }
      );

    //   console.log("respuesta backend: ", response.data);
      return response.data.Alumno || [];
    } catch (err) {
      console.error(
        "Error al obtener actividades:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
  
};


export const ObtenerMateriasAdministrador = async () => {
    try {
      const response = await axios.get(
        `${URL}/administrador/materias`,
        {
          withCredentials: true,
        }
      );

      // console.log("respuesta backend: ", response.data);
      return response.data.Materias || [];
    } catch (err) {
      console.error(
        "Error al obtener materias:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
};


export const ObtenerRegistrosAdministrador = async () => {
    try {
      const response = await axios.get(
        `${URL}/administrador/lista/registros`,
        {
          withCredentials: true,
        }
      );

      // console.log("respuesta backend: ", response.data);
      return response.data.Registros || [];
    } catch (err) {
      console.error(
        "Error al obtener registros:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
};




export const ObtenerMateriaAdministrador = async (IDMateria) => {
    try {
      const response = await axios.get(
        `${URL}/administrador/materia`,
        {
          params:{IDMateria},
          withCredentials: true,
        }
      );

      // console.log("respuesta backend: ", response.data);
      return response.data.Solicitud || [];
    } catch (err) {
      console.error(
        "Error al obtener actividades:",
        err.response?.status,
        err.response?.data
      );
      return []; // fallback a array vacío
    }
};