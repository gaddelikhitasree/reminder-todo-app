import { useState } from 'react';
import { FiTrash2, FiEdit3, FiCheck, FiX } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './TodoItem.css';

const priorityEmoji = { low: '🟢', medium: '🟡', high: '🔴' };

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim());
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <FiCheck size={14} />}
      </button>

      <div className="todo-content">
        {editing ? (
          <input
            className="todo-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <>
            <span className="todo-title">{todo.title}</span>
            <div className="todo-meta">
              <span className="todo-priority">{priorityEmoji[todo.priority]} {todo.priority}</span>
              <span className="todo-category">{todo.category}</span>
              <span className="todo-time">
                {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="todo-actions">
        {editing ? (
          <>
            <button className="action-btn save" onClick={handleSave} aria-label="Save">
              <FiCheck size={16} />
            </button>
            <button className="action-btn cancel" onClick={() => { setEditTitle(todo.title); setEditing(false); }} aria-label="Cancel">
              <FiX size={16} />
            </button>
          </>
        ) : (
          <>
            <button className="action-btn edit" onClick={() => setEditing(true)} aria-label="Edit">
              <FiEdit3 size={16} />
            </button>
            <button className="action-btn delete" onClick={() => onDelete(todo.id)} aria-label="Delete">
              <FiTrash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
