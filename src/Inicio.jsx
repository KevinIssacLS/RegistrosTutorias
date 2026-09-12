import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Components/UserSession/UserContext";
import FormFormat from "./Components/UI/Formularios/FormFormat";
import FormInput from "./Components/UI/Formularios/FormInput";
import { API_URL } from "./Components/Config/GlobalConfig";

export default function Inicio() {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    Usuario: "",
    Contrasena: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 🔑 para manejar sesiones
            body: JSON.stringify(form),
          });
          
          const data = await res.json();
          // console.log(res);
          
          if (data.ok) {
            // console.log("submit")
            // alert("Inicio de sesión exitoso");
            // console.log("Usuario logueado:", data);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            // aquí puedes redirigir al dashboard según su rol
    
            // switch (data.) {
            //   case value:
                
            //     break;
            
            //   default:
            //     break;
            // }
            navigate(data.redirectTo);
          } else {
            alert("Error: " + data.msg);
          }
        } catch (error) {
          console.error("Error en login:", error);
          alert("Hubo un problema al iniciar sesión");
        }
      };


  return (
    <div>

      <form onSubmit={handleSubmit}>

        <FormFormat Title="Iniciar Sesión">


          <FormInput
            label="Correo"
            name="Usuario"
            onChange={handleChange}
            value={form.Usuario}
          />


          <FormInput
            label="Contraseña"
            name="Contrasena"
            type="password"
            onChange={handleChange}
            value={form.Contrasena}
          />


          {
            error && (
              <p className="text-red-500 text-sm mt-2">
                {error}
              </p>
            )
          }


          <button
            type="submit"
            disabled={loading}
            className="
              w-full 
              border-1 
              border-theme-primary 
              hover:text-theme-white 
              hover:bg-theme-primary 
              duration-250 
              p-2 
              rounded-md
              disabled:opacity-50
            "
          >
            {
              loading
              ? "Ingresando..."
              : "Iniciar Sesión"
            }

          </button>


        </FormFormat>

      </form>

    </div>
  );
}