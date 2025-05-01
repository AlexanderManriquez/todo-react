import useDarkMode from "./hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { auth } from "./firebase/firebase";
import LoginPage from "./pages/LoginPage";
import ToDoPage from "./pages/ToDoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [user] = useAuthState(auth);
  const { todos, setTodos, initialized } = useTodos(user ?? null);
  const [darkMode, setDarkMode] = useDarkMode();

  if (!initialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen transition-colors duration-500 ease-in-out bg-gray-300 dark:bg-gray-900 dark:text-gray-300 p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full cursor-pointer shadow-md transition duration-300"
          aria-label="Cambiar tema"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-blue-600" />
          )}
        </button>

        <BrowserRouter>
          <Navbar user={user ?? null} />
          <Routes>
            <Route path="/" element={<Home user={user ?? null}/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/tareas" element={<ToDoPage todos={todos} setTodos={setTodos}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
