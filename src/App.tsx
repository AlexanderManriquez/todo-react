import { useEffect, useState } from "react";
import ToDoForm from "./components/ToDoForm"
import ToDoList from "./components/ToDoList";
import { ToDo } from "./types";
import useDarkMode from "./hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getUserTodos, saveUserTodos } from "./services/toDoService";


function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const firebaseTodos = await getUserTodos(user.uid);
        setTodos(firebaseTodos);
      } else {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
          try {
            const parsedTodos: ToDo[] = JSON.parse(storedTodos);
            setTodos(parsedTodos);
          } catch (error) {
            console.error("Error al obtener los datos desde localStorage:", error);
            localStorage.removeItem("todos");
          }
        }
      }
      setInitialized(true);
    };
    fetchTodos();
  }, [user])

  useEffect(() => {
    if (!initialized) return;

    const saveTodos = async () => {
      if (user) {
        await saveUserTodos(user.uid, todos);
      } else {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    saveTodos();
  }, [todos, initialized, user]);

  const addToDo = (todo: { title: string; description: string; date: string; hour: string }) => {
    const newTodo = {
      id: Date.now(),
      title: todo.title,
      description: todo.description,
      date: todo.date,
      hour: todo.hour,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteToDo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const toggleToDo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
      
  return (
    <>
    <div className="min-h-screen transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 p-4">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md transition duration-300"
        aria-label="Cambiar tema"
      >
        {darkMode ? <Sun className='text-yellow-400' /> : <Moon className='text-blue-600' />}
      </button>

      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-200">Lista de Tareas</h1>

      {!user && (
        <p className="text-center mt-4 text-yellow-700 dark:text-yellow-100 font-thin transition-color duration-300 ease-in">
          ⚠️ Tus tareas se guardan localmente. Inicia sesión para conservarlas en la nube.
        </p>
      )}
      <ToDoForm onAdd={addToDo}/>
      <div className="max-w-3/4 mx-auto mt-6">-
        <ToDoList todos={todos} onDelete={deleteToDo} onToggle={toggleToDo} />
      </div> 
    </div>
      
    </>
  )
}

export default App
