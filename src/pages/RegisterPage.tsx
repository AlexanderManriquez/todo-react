import Register from "../components/Register"

const RegisterPage = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;