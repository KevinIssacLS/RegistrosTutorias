import { useState } from "react";
import Portada from "../public/Portadas/Banner Formulario Humanísticas 2026-2 V1@2x.png";
import FormFormat from "./Components/UI/Formularios/FormFormat";
import FormInput from "./Components/UI/Formularios/FormInput";
import FormSelect from "./Components/UI/Formularios/FormSelect";
import FormCheck from "./Components/UI/Formularios/FormCheck";
import FormLabel from "./Components/UI/Formularios/FormLabel";
import { useEffect } from "react";
import { ListaMaterias } from "./API/api";
import { API_URL } from "./Components/Config/GlobalConfig";
import axios from "axios";

export default function RegistroTutorias() {
  const [Materias, EstablecerMaterias] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    Nombre: "",
    Apellidos: "",
    Boleta: "",
    Dictamen: "",
    Correo: "",
    Celular: "",
    EOyE1: false,
    EOyE2: false,
    CC: false,
    CyL: false,
    ESM: false,
    Ingles1: false,
    Ingles2: false,
    Ingles3: false,
    Ingles4: false,
    Ingles5: false,
    Ingles6: false,
    Filosofia1: false,
    Filosofia2: false,
    DP: false,
    DHP: false,
    HMC1: false,
    HMC2: false,
    OJyP1: false,
    OJyP2: false,
    OJyP3: false,
    OJyP4: false,
  });

//   useEffect(() => {
//     async function ObtenerMaterias() {
//       const response = await ListaMaterias();
//       //   console.log(response);
//       EstablecerMaterias(response);
//     }
//     ObtenerMaterias();
//   }, []);

//   useEffect(() => {
//     if (!Materias || Materias.length === 0) return;

//     const materiasForm = {};

//     Materias.forEach((m) => {
//       materiasForm[m.Abreviatura] = Boolean(m.Valor);
//     });

//     setForm((prev) => ({
//       ...prev,
//       ...materiasForm,
//     }));
//   }, [Materias]);

  function validate(form) {
    const errors = {};

    // Nombre
    if (!form.Nombre?.trim()) {
      errors.Nombre = "El nombre es obligatorio";
    }

    // Apellidos
    if (!form.Apellidos?.trim()) {
      errors.Apellidos = "Los apellidos son obligatorios";
    }

    // Boleta
    if (!form.Boleta) {
      errors.Boleta = "La boleta es obligatoria";
    } else if (!/^\d{10}$/.test(form.Boleta)) {
      errors.Boleta = "La boleta debe tener 10 dígitos";
    }

    // Correo
    if (!form.Correo) {
      errors.Correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Correo)) {
      errors.Correo = "Correo no válido";
    }

    // Celular
    if (!form.Celular) {
      errors.Celular = "El celular es obligatorio";
    } else if (!/^\d{10}$/.test(form.Celular)) {
      errors.Celular = "Debe tener 10 dígitos";
    }

    // Dictamen (checkbox)
    // if (!form.Dictamen) {
    //   errors.Dictamen = "Debes aceptar el dictamen";
    // }

    return errors;
  }

  //   console.log(Materias);
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const res = await axios.post(
        `${API_URL}/agregar/registro`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(form);
      console.log(formData);
      if (res.data.ok) {
        setMensaje("Registro agregado");
        setForm({
          Nombre: "",
    Apellidos: "",
    Boleta: "",
    Dictamen: "",
    Correo: "",
    Celular: "",
    EOyE1: false,
    EOyE2: false,
    CC: false,
    CyL: false,
    ESM: false,
    Ingles1: false,
    Ingles2: false,
    Ingles3: false,
    Ingles4: false,
    Ingles5: false,
    Ingles6: false,
    Filosofia1: false,
    Filosofia2: false,
    DP: false,
    DHP: false,
    HMC1: false,
    HMC2: false,
    OJyP1: false,
    OJyP2: false,
    OJyP3: false,
    OJyP4: false,
        });
      } else {
        setMensaje("❌ " + res.data.msg);
      }
    } catch (err) {
      console.error("Error al registrar materia:", err);
      setMensaje("⚠️ Error en el servidor");
    }
  };

  return (
    <div>
      {/* <div className="m-auto max-h-[10rem] rounded-md">
        <img src={Portada} alt="" className="max-h-[10rem] rounded-xl m-auto" />
      </div> */}
      <form onSubmit={handleSubmit}>
        <FormFormat
          Width="max-w-2xl m-auto"
          image={Portada}
          Title="Registro a Tutorías de regularización y recuperación Semestre 26-2"
        >
          <p className="py-5">
            Lee detenidamente cada pregunta y contesta usando mayúsculas y
            minúsculas. <br /> <br /> Recuerda que las tutorías de esta área son
            en modalidad virtual.
          </p>
          <FormInput
            label={`Nombre`}
            name={`Nombre`}
            onChange={handleChange}
            value={form.Nombre}
            autocomplete="off"
            required
            type="text"
            placeholder="Ingresa SOLO TU(S) NOMBRE(S). Utiliza mayúsculas y minúsculas"
            error={errors.Nombre}
          ></FormInput>
          <FormInput
            label={`Apellidos`}
            name={`Apellidos`}
            onChange={handleChange}
            value={form.Apellidos}
            autocomplete="off"
            required
            type="text"
            placeholder="Ingresa SOLO TUS APELLIDOS. Utiliza mayúsculas y minúsculas"
            error={errors.Apellidos}
          ></FormInput>
          <FormInput
            label={`Número de Boleta`}
            name={`Boleta`}
            onChange={handleChange}
            value={form.Boleta}
            autocomplete="off"
            required
            type="number"
            placeholder="Ingresa tu número de boleta"
            ejemplo={`202X17XXXX`}
            error={errors.Boleta}
          ></FormInput>
          <FormInput
            label={`Correo Institucional`}
            name={`Correo`}
            onChange={handleChange}
            value={form.Correo}
            autocomplete="off"
            required
            type="email"
            placeholder="Ingresa tu correo institucional"
            error={errors.Correo}
          ></FormInput>
          <FormInput
            label={`Número de celular`}
            name={`Celular`}
            onChange={handleChange}
            value={form.Celular}
            autocomplete="off"
            required
            type="tel"
            placeholder="Ingresa tu número de celular a 10 dígitos"
            error={errors.Celular}
          ></FormInput>
          <FormSelect
            label="¿Cuentas con dictamen?"
            name={`Dictamen`}
            onChange={handleChange}
          >
            <option>Seleccione una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </FormSelect>

          <FormLabel
            label={`Selecciona las materias en las que requieres la asesoría`}
          >
            <FormCheck checked={form.EOyE1} label={`Expresión Oral y Escrita I`} onChange={handleChange} name={`EOyE1`}></FormCheck>
            <FormCheck checked={form.EOyE2} label={`Expresión Oral y Escrita II`} onChange={handleChange} name={`EOyE2`}></FormCheck>
            <FormCheck checked={form.CC} label={`Comunicación Científica`} onChange={handleChange} name={`CC`}></FormCheck>
            <FormCheck checked={form.CyL} label={`Comunicación y Liderazgo`} onChange={handleChange} name={`CyL`}></FormCheck>
            <FormCheck checked={form.ESM} label={`Entorno Socioeconómico de México`} onChange={handleChange} name={`ESM`}></FormCheck>
            <FormCheck checked={form.Ingles1} label={`Inglés I`} onChange={handleChange} name={`Ingles1`}></FormCheck>
            <FormCheck checked={form.Ingles2} label={`Inglés II`} onChange={handleChange} name={`Ingles2`}></FormCheck>
            <FormCheck checked={form.Ingles3} label={`Inglés III`} onChange={handleChange} name={`Ingles3`}></FormCheck>
            <FormCheck checked={form.Ingles4} label={`Inglés IV`} onChange={handleChange} name={`Ingles4`}></FormCheck>
            <FormCheck checked={form.Ingles5} label={`Inglés V`} onChange={handleChange} name={`Ingles5`}></FormCheck>
            <FormCheck checked={form.Ingles6} label={`Inglés VI`} onChange={handleChange} name={`Ingles6`}></FormCheck>
            <FormCheck checked={form.Filosofia1} label={`Filosofía I`} onChange={handleChange} name={`Filosofia1`}></FormCheck>
            <FormCheck checked={form.Filosofia2} label={`Filosofía II`} onChange={handleChange} name={`Filosofia2`}></FormCheck>
            <FormCheck checked={form.DP} label={`Desarrollo Personal`} onChange={handleChange} name={`DP`}></FormCheck>
            <FormCheck checked={form.DHP} label={`Desarrollo de Habilidades del Pensamiento`} onChange={handleChange} name={`DHP`}></FormCheck>
            <FormCheck checked={form.HMC1} label={`Historia de México Contemporáneo I`} onChange={handleChange} name={`HMC1`}></FormCheck>
            <FormCheck checked={form.HMC2} label={`Historia de México Contemporáneo II`} onChange={handleChange} name={`HMC2`}></FormCheck>
            <FormCheck checked={form.OJyP1} label={`Orientación Juvenil y Profesional I`} onChange={handleChange} name={`OJyP1`}></FormCheck>
            <FormCheck checked={form.OJyP2} label={`Orientación Juvenil y Profesional II`} onChange={handleChange} name={`OJyP2`}></FormCheck>
            <FormCheck checked={form.OJyP3} label={`Orientación Juvenil y Profesional III`} onChange={handleChange} name={`OJyP3`}></FormCheck>
            <FormCheck checked={form.OJyP4} label={`Orientación Juvenil y Profesional IV`} onChange={handleChange} name={`OJyP4`}></FormCheck>
            {/* {Materias.map((Materia, index) => (
              <FormCheck
                key={Materia.IDSistema}
                label={Materia.Materia}
                checked={form[Materia.Abreviatura]}
                onChange={handleChange}
                name={Materia.Abreviatura}
              ></FormCheck>
            ))} */}
          </FormLabel>

          <div>
            <button
              type="submit"
              className="text-gray-800 border-theme-secondary border p-1 w-full cursor-pointer rounded-md uppercase hover:bg-theme-secondary duration-250 hover:text-white"
            >
              Enviar registro
            </button>
          </div>
        </FormFormat>
      </form>
    </div>
  );
}
