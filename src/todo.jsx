import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (value.trim()) {
      // Check if the input is not just whitespace
      if (editingIndex !== null) {
        // If editing, update the existing todo
        const updatedTodos = todo.map((task, index) =>
          index === editingIndex ? value : task
        );
        setTodo(updatedTodos);
        setEditingIndex(null); // Reset editing index
      } else {
        // Otherwise, add a new todo item
        setTodo([...todo, value]);
      }
      setValue(""); // Clear the input after adding or editing
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todo.filter((_, i) => i !== index); // Remove todo at index
    setTodo(updatedTodos);
  };

  const handleEdit = (index) => {
    setValue(todo[index]); // Set input value to the todo to edit
    setEditingIndex(index); // Set the editing index
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-blue-700 text-5xl m-10">Planeit</h1>
      </div>
      <div className="space-y-4">
        <div className="space-x-2 ">
          <input
            type="text"
            value={value} // Use value directly
            onChange={(e) => setValue(e.target.value)} // Update state on input change
            placeholder="Enter your todo"
            className="p-2 rounded-lg border border-gray-300"
            onKeyDown={() => {
              if (event.key === 'Enter') {
                handleAddTodo()
              }
            }}
          />
          <button
            className="bg-blue-600 p-2 rounded-lg px-4 text-white"
            onClick={handleAddTodo} // Call the function on button click
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <ol className="text-white space-y-3 pt-5">
        {todo.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-3 rounded-md">
            <div className="flex items-center space-x-3">
              <MdDeleteForever
                className="text-red-600 hover:cursor-pointer"
                onClick={() => handleDelete(index)} // Call delete on icon click
              />
              <span className="text-white">{task}</span>
            </div>
            <button
              className=" text-white p-2 "
              onClick={() => handleEdit(index)} // Call edit on button click
            >
              Edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
