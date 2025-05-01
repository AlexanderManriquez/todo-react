import { ToDo } from '../types/index';
import ToDoItem from './ToDoItem';

interface Props {
    todos: ToDo[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

export default function ToDoList({ todos, onDelete, onToggle }: Props) {
    if (todos.length === 0) {
        return <p className='text-center text-gray-500'>No hay Tareas pendientes.</p>
    }

    return (
        //Estilizar como se muestra la lista de tareas
        <div className='flex flex-wrap gap-4'>
            
            {todos.map((todo) => {
                console.log(todo)
                return (
                <ToDoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
            );
            })}
        </div>
    )
}