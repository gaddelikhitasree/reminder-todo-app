import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import './AddTodo.css';

const PRIORITIES = ['low', 'medium', 'high'];
const CATEGORIES = ['Personal', 'Work', 'Health', 'Shopping', 'Study', 'Other'];

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Personal');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle('');
    setPriority('medium');
    setCategory('Personal');
    setExpanded(false);
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <div className="add-todo-main">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          className="add-todo-input"
        />
        <button type="submit" className="add-todo-btn" disabled={!title.trim()}>
          <FiPlus size={20} />
          Add
        </button>
      </div>

      {expanded && (
        <div className="add-todo-options">
          <div className="option-group">
            <label>Priority</label>
            <div className="priority-pills">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-pill ${p} ${priority === p ? 'selected' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </form>
  );
}
