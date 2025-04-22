import { useState } from "react";

interface Props {
  onAdd: (todo: { title: string; description: string; date: string }) => void;
}

export default function ToDoForm({ onAdd }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, date } = formData;

    if (!title.trim() || !description.trim() || !date) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    onAdd(formData);
    setFormData({ title: "", description: "", date: "" });
    setError("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 my-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Título"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Título de la tarea"
      />
      <textarea
        placeholder="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        aria-label="Descripción de la tarea"
      ></textarea>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Fecha de la tarea"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md transition duration-300 w-1/2 mx-auto">
        Agregar Tarea
      </button>

    </form>
  );
}


