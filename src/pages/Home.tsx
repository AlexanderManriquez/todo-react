import { User } from "firebase/auth";
import { Link } from "react-router-dom"

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  console.log("Usuario recibido en Home:", user);
  return (
    <div className="text-center mt-20">
      {user ? (
        <div>
          <h1 className="text-4xl font-bold">Bienvenido, {user.displayName || 'Usuario'}</h1>
          <p className="text-lg mt-4">¡Comienza a gestionar tus tareas!</p>
          <Link to="/tareas" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-700 transition duration-300">
            Ir a mis tareas
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">¡Bienvenido a la App de Tareas!</h1>
          <p className="text-md mt-4">Inicia sesión o regístrate y accede desde cualquier dispositivo</p>
          <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-700 transition duration-300">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-green-700 transition duration-300 ml-2">
            Registrarse
          </Link>
          <p className="mt-4 text-sm">
            O <Link to="/tareas" className="text-blue-500">prueba la aplicación sin iniciar sesión</Link>.
          </p>
        </div>
      )}
    </div> 
  );
};

export default Home;