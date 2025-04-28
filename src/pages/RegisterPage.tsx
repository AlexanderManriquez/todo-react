import { useNavigate } from "react-router-dom";
import Register from "../components/Register"

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
        <Register onSuccess={() => navigate("/tareas")} />
      </div>
    </div>
  );
};

export default RegisterPage;