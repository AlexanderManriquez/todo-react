import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "error",
        title: "¡Éxito!",
        text: "Usuario registrado correctamente",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl my-4">Registro</h2>
      <input 
        className="block w-full mb-2 p-2 border"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        className="block w-full mb-2 p-2 border"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md transition duration-300 w-1/2 mx-auto" >
            Registrarse 
      </button>

    </form>
  )
}
