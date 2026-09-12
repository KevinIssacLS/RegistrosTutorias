import { Check, CircleX, TriangleAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Comp_Mensaje({ Mensaje, Tipo, ID }) {
    const [activo, setActivo] = useState(false);

    // Mostrar nuevamente el mensaje cuando cambie
    useEffect(() => {
        if (!ID) return;

        setActivo(true);
    }, [ID]);

    // Ocultarlo después de 10 segundos
    useEffect(() => {
        if (!activo) return;

        const timer = setTimeout(() => {
            setActivo(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [activo]);

    return (
        <AnimatePresence>
            {activo && (
                <motion.div
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0)" }}
                    exit={{ clipPath: "inset(0 0 0 100%)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`
                        fixed
                        top-16
                        right-0
                        z-50
                        flex
                        items-center
                        gap-3
                        pl-5
                        pr-8
                        py-3
                        text-white
                        rounded-bl-lg
                        shadow-xl
                        ${
                            Tipo === "Correcto"
                                ? "bg-green-700"
                                : Tipo === "Error"
                                ? "bg-red-700"
                                : "bg-orange-500"
                        }
                    `}
                >
                    {Tipo === "Correcto" && <Check size={22} />}
                    {Tipo === "Error" && <CircleX size={22} />}
                    {Tipo === "Advertencia" && <TriangleAlert size={22} />}

                    <span>{Mensaje}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}