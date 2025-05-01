import { useEffect, useState } from "react";
import { ToDo } from "../types";
import { getUserTodos, addUserTodo, updateUserTodo } from "../services/toDoService";
import { User } from "firebase/auth";

export const useTodos = (user: User | null) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Cargar las tareas al inicio
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (user) {
          const firebaseTodos = await getUserTodos(user.uid);
          setTodos(firebaseTodos);
        } else {
          const storedTodos = localStorage.getItem("todos");
          if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
          }
        }
        setInitialized(true);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    fetchTodos();
  }, [user]);

  // Sincronizar las tareas con Firebase o localStorage
  useEffect(() => {
    if (!initialized) return;

    const syncTodos = async () => {
      try {
        if (user) {
          // Sincronizar tareas con Firebase
          for (const todo of todos) {
            if (!todo.synced) {
              // Si la tarea no está sincronizada, agregarla o actualizarla
              if (!todo.idInFirebase) {
                await addUserTodo(user.uid, todo);
                todo.synced = true; // Marcar como sincronizada
              } else {
                await updateUserTodo(user.uid, Number(todo.idInFirebase), todo);
              }
            }
          }
        } else {
          // Guardar tareas en localStorage
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      } catch (error) {
        console.error("Error al sincronizar las tareas:", error);
      }
    };

    syncTodos();
  }, [todos, initialized, user]);

  return { todos, setTodos, initialized };
};