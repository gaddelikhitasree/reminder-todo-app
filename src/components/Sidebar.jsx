import {
  FiGrid,
  FiCheckSquare,
  FiBell,
  FiBarChart2,
} from 'react-icons/fi';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { id: 'todos', label: 'To-Do List', icon: FiCheckSquare },
  { id: 'reminders', label: 'Reminders', icon: FiBell },
  { id: 'stats', label: 'Statistics', icon: FiBarChart2 },
];

export default function Sidebar({ activeView, setActiveView, todoCount, reminderCount }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-btn ${activeView === id ? 'active' : ''}`}
            onClick={() => setActiveView(id)}
          >
            <Icon size={20} />
            <span className="sidebar-label">{label}</span>
            {id === 'todos' && todoCount > 0 && (
              <span className="sidebar-badge">{todoCount}</span>
            )}
            {id === 'reminders' && reminderCount > 0 && (
              <span className="sidebar-badge reminder-badge">{reminderCount}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
