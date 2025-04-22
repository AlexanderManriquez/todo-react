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
        <div className='flex flex-col gap-4'>
            {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </div>
    )
}