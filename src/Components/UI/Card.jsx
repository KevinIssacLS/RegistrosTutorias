import { Link } from "react-router-dom";

export default function Card({ Titulo, Botones=[], children }) {
  return (
    <div className="rounded-md shadow-md border border-theme-secondary shadow-black/30 overflow-hidden">
      <div className={`p-2 ${children?"bg-theme-secondary":"bg-white"} ${children?"text-white":"text-theme-secondary"} uppercase font-medium text-center py-2 h-30 flex items-center content-center justify-center`}>
        {Titulo}
      </div>
      {
        children&&(
            <div className="px-2 py-5">
             {children}
           </div>
        )
      }
      <div className={`grid grid-cols-1 md:grid-cols-${Botones.length}`}>
        {
            Botones.map((Boton, index)=>(
                <Link to={Boton.url} title={Boton.Titulo} className="odd:bg-theme-primary even:bg-theme-primary/90 text-white p-1 text-center"><div dangerouslySetInnerHTML={{ __html: Boton.label }}></div></Link>
            ))
        }
      </div>
    </div>
  );
}
