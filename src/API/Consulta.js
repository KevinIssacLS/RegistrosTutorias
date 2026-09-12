import axios from "axios";
import { API_URL } from "../Components/Config/GlobalConfig";

export const ObtenerListaGeneral = async () => {
  try {
    const response = await axios.get(`${API_URL}/Registros`, {
      withCredentials: true,
    });
    return response.data.Registros || [];
  } catch (err) {
    console.error(
      "Error al obtener listado general:",
      err.response?.status,
      err.response?.data,
    );
    return [];
  }
};

export const ObtenerListaMateriasGeneral = async () => {
  try {
    const response = await axios.get(`${API_URL}/Materias`, {
      withCredentials: true,
    });
    return response.data.Materias || [];
  } catch (err) {
    console.error(
      "Error al obtener listado general:",
      err.response?.status,
      err.response?.data,
    );
    return [];
  }
};

export const ObtenerListaProfesores=async ()=>{
    try {
        const response=await axios.get(`${API_URL}/Profesores`,{
            withCredentials:true,
        });
        return response.data.Profesores||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de profesores",
            error.response?.status,
            error.response?.data,
        )
    }
}



export const Administrador_ListaSolicitudesMaterias=async (IDMateria)=>{
    try {
        const response=await axios.get(`${API_URL}/Administrador/Materia/Solicitudes`,{
          params:{IDMateria},
            withCredentials:true,
        });
        return response.data.Solicitudes||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de profesores",
            error.response?.status,
            error.response?.data,
        )
    }
}

export const Administrador_DatosMateria=async (IDMateria)=>{
    try {
        const response=await axios.get(`${API_URL}/Administrador/Materia/Datos`,{
          params:{IDMateria},
            withCredentials:true,
        });
        return response.data.Materia||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de profesores",
            error.response?.status,
            error.response?.data,
        )
    }
}

export const Administrador_BuscarAlumno=async (Boleta)=>{
    try {
        const response=await axios.get(`${API_URL}/Administrador/Alumno/Buscar`,{
          params:{Boleta},
            withCredentials:true,
        });
        return response.data.Alumno||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de profesores",
            error.response?.status,
            error.response?.data,
        )
    }
}

export const Profesor_ListaMaterias=async(Profesor)=>{
  try {
        const response=await axios.get(`${API_URL}/Profesor/Materias`,{
          params:{Profesor},
            withCredentials:true,
        });
        return response.data.Materias||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de materias",
            error.response?.status,
            error.response?.data,
        )
    }
}

export const Profesor_Informacion=async(Profesor)=>{
  try {
        const response=await axios.get(`${API_URL}/Profesor/Informacion`,{
          params:{Profesor},
            withCredentials:true,
        });
        return response.data.Profesor||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de materias",
            error.response?.status,
            error.response?.data,
        )
    }
  }

export const Profesor_InformacionMateria=async(Profesor, Materia)=>{
  try {
        const response=await axios.get(`${API_URL}/Profesor/Materia/Informacion`,{
          params:{Profesor, Materia},
            withCredentials:true,
        });
        return response.data||[];
    } catch (error) {
        console.error(
            "Error al obtener lista de materias",
            error.response?.status,
            error.response?.data,
        )
    }
  }