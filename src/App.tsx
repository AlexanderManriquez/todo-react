import { useState } from "react";
import ToDoForm from "./components/ToDoForm"
import ToDoList from "./components/ToDoList";
import { ToDo } from "./types";


function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);

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
      <div className="max-w-md mx-auto mt-6">-
        <ToDoList todos={todos} onDelete={deleteToDo} onToggle={toggleToDo} />
      </div> 
    </div>
      
    </>
  )
}

export default App
