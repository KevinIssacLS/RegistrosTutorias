export default function SectionTitle({Titulo, Subtitulo}){
    return(
        <div>
            <h1 className="text-2xl uppercase font-bold text-theme-primary">{Titulo}</h1>
            {Subtitulo&&
            <h2 className="text-xl uppercase font-medium text-theme-primary/80">{Subtitulo}</h2>
}
        </div>
    )
}