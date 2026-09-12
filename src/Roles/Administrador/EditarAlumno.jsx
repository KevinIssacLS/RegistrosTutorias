import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import SectionTitle from "../../Components/UI/SectionTitle";

export default function Administrador_EditarAlumno(){
    return(
        <>
        <div>
            <SectionTitle Titulo={`Tutorías de Regularización y Recuperación Semestre ${SemestreTutorias}`}></SectionTitle>
        </div>
        </>
    )
}