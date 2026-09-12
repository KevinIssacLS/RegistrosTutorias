export default function Comp_Table({Encabezados=[], Datos=[], Acciones, Mensaje="No hay registros para mostrar"}){
    return(
        <div className="">
        <table className="w-full border-collapse text-sm overflow-scroll">
          <thead className="sticky top-11 bg-theme-secondary text-white z-10">
            <tr>
              {Encabezados.map((titulo, i) => (
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
            {Datos.length>0 ?
            (
                
            )):
            (<tr>
              <td colSpan={Encabezados.length} className="text-center text-gray-500 italic py-5">{Mensaje}</td>
            </tr>)

          }
          </tbody>
        </table>
      </div>
    )
}