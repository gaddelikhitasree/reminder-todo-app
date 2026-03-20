import { useState, useMemo } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import './TodoList.css';

export default function TodoList({ todos, setTodos }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleAdd = (todo) => setTodos([todo, ...todos]);

  const handleToggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const handleDelete = (id) => setTodos(todos.filter((t) => t.id !== id));

  const handleEdit = (id, newTitle) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));

  const handleClearCompleted = () => setTodos(todos.filter((t) => !t.completed));

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (search) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === 'active') result = result.filter((t) => !t.completed);
    else if (filter === 'completed') result = result.filter((t) => t.completed);
    else if (filter !== 'all') result = result.filter((t) => t.priority === filter);

    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return result;
  }, [todos, filter, search, sortBy]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="todo-list-container">
      <div className="section-header">
        <h2>To-Do List</h2>
        <div className="section-counts">
          <span className="count-badge active-badge">{activeCount} active</span>
          <span className="count-badge done-badge">{completedCount} done</span>
        </div>
      </div>

      <AddTodo onAdd={handleAdd} />

      <div className="todo-controls">
        <div className="search-box">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter size={16} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <p>No tasks found</p>
            <span className="empty-hint">
              {search ? 'Try a different search' : 'Add your first task above!'}
            </span>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {completedCount > 0 && (
        <button className="clear-completed-btn" onClick={handleClearCompleted}>
          Clear {completedCount} completed task{completedCount > 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}
