import { useEffect, useState, useCallback } from "react";
import { addUserTodo, deleteUserTodo, getUserTodos, updateUserTodo } from "../services/toDoService";
import { ToDo } from "../types";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToDoPage = ({ user }: any) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const loadTodos = useCallback(async () => {
    if (user) {
      localStorage.removeItem("todos");

      const firebaseTodos = await getUserTodos(user.uid);

      if (firebaseTodos && firebaseTodos.length > 0) {
        setTodos(firebaseTodos);
      } else {
        setTodos([]);
      }
    } else {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        setTodos([]);
      }
    }
  }, [user]);

  useEffect(() => {
    loadTodos();
  }, [user, loadTodos]);

  const addToDo = async (todo: { title: string; description: string; date: string; hour: string }) => {
    const newToDoItem: ToDo = {
      id: Date.now(),
      title: todo.title,
      completed: false,
      description: todo.description,
      date: todo.date,
      hour: todo.hour,
    };
    const updatedTodos = [...todos, newToDoItem];
    setTodos(updatedTodos);

    if (user) {
      // Corregido: Pasar solo el nuevo ToDo a addUserTodo
      await addUserTodo(user.uid, newToDoItem);
    } else {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const deleteToDo = async (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    if (user) {
      await deleteUserTodo(user.uid, id);
    } else {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const toggleToDo = async (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    if (user) {
      const toggledTodo = updatedTodos.find((todo) => todo.id === id);
      if (toggledTodo) {
        await updateUserTodo(user.uid, id, { completed: toggledTodo.completed });
      }
    } else {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Mis Tareas</h2>

      <ToDoForm onAdd={addToDo} />

      <div className="mt-4">
        <ToDoList todos={todos} onDelete={deleteToDo} onToggle={toggleToDo} />
      </div>
    </div>
  );
};

export default ToDoPage;
