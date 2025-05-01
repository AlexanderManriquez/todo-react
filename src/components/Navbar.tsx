import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await Swal.fire({
        icon: "success",
        title: "¡Sesión cerrada!",
        text: "Has cerrado sesión exitosamente",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="fixed top-4 left-4 z-50">
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white text-xs p-2 rounded hover:scale-105 hover:bg-blue-800 shadow-md transition duration-300"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 text-white text-xs p-2 rounded hover:scale-105 hover:bg-green-700 shadow-md transition duration-300"
            >
              Registrarse
            </button>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white text-xs p-2 rounded hover:bg-red-700 shadow-md transition duration-300"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
