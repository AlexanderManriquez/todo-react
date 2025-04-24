import { ToDo } from "../types";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Obtiene las tareas del usuario desde Firestore.
 * @param userId ID único del usuario autenticado.
 * @returns Un array de tareas si existen, o un array vacío.
 */

export async function getUserTodos(userId: string): Promise<ToDo[]> {
    try {
      const docRef = doc(db, "todos", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.items || []; // Devuelve las tareas si existen, o un array vacío
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las tareas del usuario:", error);
      return [];
    }
}

/**
 * Guarda las tareas del usuario en Firestore.
 * @param userId ID único del usuario autenticado.
 * @param todos Array de tareas que se quiere guardar.
 */
export async function saveUserTodos(userId: string, todos: ToDo[]): Promise<void> {
  try {
    const docRef = doc(db, "todos", userId);
    await setDoc(docRef, 
      { items: todos,
    
      });
  } catch (error) {
    console.error("Error al guardar las tareas del usuario:", error);
  }
}