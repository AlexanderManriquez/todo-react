import { useEffect, useState } from "react";
import ToDoForm from "./components/ToDoForm"
import ToDoList from "./components/ToDoList";
import { ToDo } from "./types";


function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos: ToDo[] = JSON.parse(storedTodos);
        console.log("Cargando tareas desde localStorage:", parsedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error("Error al obtener los datos desde localStorage:", error);
        localStorage.removeItem("todos");
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log("Guardando todos en localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }   
  }, [todos, initialized]);

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-4xl font-bold text-gray-800">Lista de Tareas</h1>
      <ToDoForm onAdd={addToDo}/>
      <div className="max-w-3/4 mx-auto mt-6">-
        <ToDoList todos={todos} onDelete={deleteToDo} onToggle={toggleToDo} />
      </div> 
    </div>
      
    </>
  )
}

export default App
