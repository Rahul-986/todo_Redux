import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeTodo, updateTodo } from "../feature/todos/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, name: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  if (!todos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-2xl text-lime-300">TODO</div>
      <ul>
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-gray-900 px-2 py-1 rounded"
              />
            ) : (
              <div className="text-white">{todo.name}</div>
            )}
            <div className="flex space-x-2">
              {editId === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
