import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (name.trim().length < 3) {
        Swal.fire({
          icon: "error",
          title: "Nombre inválido",
          text: "El nombre debe tener al menos 3 caracteres.",
        });
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, 
          { displayName: name    
        });
      }

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Has creado tu cuenta exitosamente",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 2100);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text: "Hubo un error en el registro, por favor intenta nuevamente.",
      })
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl my-4">Registro</h2>
      <input 
        className="block w-full mb-2 p-2 border"
        type="text"
        placeholder="Nombre de usuario"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input 
        className="block w-full mb-2 p-2 border"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input 
        className="block w-full mb-2 p-2 border"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md transition duration-300 w-1/2 mx-auto" >
            Registrarse 
      </button>

    </form>
  )
}
