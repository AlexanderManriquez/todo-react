import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4'>Iniciar Sesión</h2>
        <Login onSuccess={() => navigate("/tareas")} />
      </div>
    </div>
  )
}

export default LoginPage;