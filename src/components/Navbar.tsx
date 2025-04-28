import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-4 gap-2">
      {!user ? (
        <>
          <button 
            onClick={() => navigate("/login")} 
            className="bg-blue-600 text-white text-xs p-2 rounded hover:bg-blue-700 shadow-md transition duration-300">
            Iniciar Sesión
          </button>
          <button 
            onClick={() => navigate("/register")} 
            className="bg-green-600 text-white text-xs p-2 rounded hover:bg-green-700 shadow-md transition duration-300">
            Registrarse
          </button>
        </>
      ) : (
        //Debe dirigir a la página de inicio o a una página de cierre de sesión con redirección a la página de inicio
        <button 
          onClick={() => auth.signOut()} 
          className="bg-red-600 text-white text-xs p-2 rounded hover:bg-red-700 shadow-md transition duration-300">
          Cerrar Sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;