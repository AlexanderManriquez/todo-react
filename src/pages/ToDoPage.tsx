import { useEffect, useState } from "react";
import { getUserTodos } from "../services/toDoService";
import { ToDo } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToDoPage = ({ user }: any) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState("");


  const loadTodos = async () => {
    if (user) {
      const firebaseTodos = await getUserTodos(user.uid);
      setTodos(firebaseTodos);
    } else {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  const addToDo = () => {
    const newToDoItem: ToDo = { 
      id: Date.now(), 
      title: newToDo, 
      completed: false, 
      description: "", 
      date: new Date().toISOString().split("T")[0], 
      hour: new Date().toLocaleTimeString() 
    };
    const updatedTodos = [...todos, newToDoItem];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewToDo("");
  };

  const deleteToDo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleToDo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Mis Tareas</h2>
      <div className="mt-6">
        <input
          type="text"
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
          placeholder="Nueva Tarea"
          className="p-2 rounded border border-gray-300"
        />
        <button
          onClick={addToDo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md transition duration-300 ml-2"
        >
          Agregar Tarea
        </button>
      </div>
      <div className="mt-4">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border-b border-gray-300"
            >
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleToDo(todo.id)}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteToDo(todo.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 shadow-md transition duration-300"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoPage;
