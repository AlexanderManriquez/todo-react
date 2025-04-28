import { useEffect, useState } from "react";
import { ToDo } from "../types";
import { getUserTodos, saveUserTodos } from "../services/toDoService";
import { User } from "firebase/auth";

export const useTodos = (user: User | null) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
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
    };
    fetchTodos();
  }, [user]);

  useEffect(() => {
    if(!initialized) return;
    const saveTodos = async () => {
      if (user) {
        await saveUserTodos(user.uid, todos);
      } else {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };
    saveTodos();
  }, [todos, initialized, user]);
  
  return { todos, setTodos, initialized };
}