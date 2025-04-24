import { ToDo } from '../types/index';

interface Props {
    todo: ToDo;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

export default function ToDoItem({ todo, onDelete, onToggle}: Props) {
    return (
        <div className={`p-4 rounded-md shadow flex flex-col gap-2 bg-gray-50 dark:bg-gray-700 dark:text-white border-1 ${
            todo.completed ? 'border-green-500' : 'border-red-500'
        }`}>
          <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </h3>
          <p className={`text-base font-light ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.description}
          </p>

          <div className="text-sm text-gray-500">Fecha: {todo.date}</div>

          <div className="text-sm text-gray-500">Hora: {todo.hour}</div>

          <div className="flex gap-2 mt-2">
            <button
              className={`px-3 py-1 text-sm rounded ${
                todo.completed ? 'bg-yellow-500' : 'bg-green-600'
              } text-white hover:opacity-90`}
                onClick={() => onToggle(todo.id)}
            >
                {todo.completed ? 'Marcar como pendiente' : 'Completar'}
            </button>
            <button
              className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:opacity-90'
              onClick={() => onDelete(todo.id)}>
                Eliminar
            </button>
          </div>
        </div>        
    );
}