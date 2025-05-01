import { ToDo } from "../types";
import { db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

/**
 * Agrega una nueva tarea para el usuario en Firestore.
 * @param userId ID único del usuario autenticado.
 * @param todo Tarea que se quiere agregar.
 */
async function addUserTodo(userId: string, todo: ToDo): Promise<void> {
  try {
    if (!userId || !todo) {
      throw new Error("El userId o la tarea no pueden estar vacíos.");
    }
    const userTodosRef = collection(db, "users", userId, "todos");
    const todoDoc = doc(userTodosRef, todo.id.toString());
    await setDoc(todoDoc, todo);
  } catch (error) {
    console.error("Error al agregar la tarea del usuario:", error);
    throw error;
  }
}

/**
 * Obtiene las tareas del usuario desde Firestore.
 * @param userId ID único del usuario autenticado.
 * @returns Un array de tareas si existen, o un array vacío.
 */
async function getUserTodos(userId: string): Promise<ToDo[]> {
  try {
    if (!userId) {
      throw new Error("El userId no puede estar vacío.");
    }
    const userTodosRef = collection(db, "users", userId, "todos");
    const snapshot = await getDocs(userTodosRef);
    return snapshot.docs.map((doc) => doc.data() as ToDo);
  } catch (error) {
    console.error("Error al obtener las tareas del usuario:", error);
    return [];
  }
}

/**
 * Elimina una tarea del usuario en Firestore.
 * @param userId ID único del usuario autenticado.
 * @param todoId ID de la tarea que se quiere eliminar.
 */
async function deleteUserTodo(userId: string, todoId: number): Promise<void> {
  try {
    if (!userId || !todoId) {
      throw new Error("El userId o el todoId no pueden estar vacíos.");
    }
    const todoRef = doc(db, "users", userId, "todos", todoId.toString());
    await deleteDoc(todoRef);
  } catch (error) {
    console.error("Error al eliminar la tarea del usuario:", error);
    throw error;
  }
}

/**
 * Actualiza el estado de una tarea del usuario en Firestore.
 * @param userId ID único del usuario autenticado.
 * @param todoId ID de la tarea que se quiere actualizar.
 * @param updatedFields Campos a actualizar.
 */
async function updateUserTodo(userId: string, todoId: number, updatedFields: Partial<ToDo>): Promise<void> {
  try {
    if (!userId || !todoId || !updatedFields) {
      throw new Error("El userId, el todoId o los campos a actualizar no pueden estar vacíos.");
    }
    const todoRef = doc(db, "users", userId, "todos", todoId.toString());
    await updateDoc(todoRef, updatedFields);
  } catch (error) {
    console.error("Error al actualizar la tarea del usuario:", error);
    throw error;
  }
}

export { addUserTodo, getUserTodos, deleteUserTodo, updateUserTodo };