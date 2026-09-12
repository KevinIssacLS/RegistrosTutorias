import { SemestreTutorias } from "../../Components/Config/GlobalConfig";
import SectionTitle from "../../Components/UI/SectionTitle";

export default function InicioSecretarias() {
  return (
    <div>
      <SectionTitle Titulo={`Registros a tutorías de regularización y recuperación semestre ${SemestreTutorias}`}></SectionTitle>

      <div className="w-full p-5">
        <table className="w-full border-collapse">
            <caption className="text-center uppercase font-bold text-xl">Registro General</caption>
            <thead>
                <tr className="text-center">
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">#</th>
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">Boleta</th>
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">Nombre</th>
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">Correo</th>
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">Celular</th>
                    <th className="p-1 border-1 border-theme-white bg-theme-accent text-theme-white">Materias solicitadas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
