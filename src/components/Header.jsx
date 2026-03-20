import { format } from 'date-fns';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Header.css';

export default function Header({ darkMode, setDarkMode }) {
  const today = new Date();

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-icon">&#10003;</span> TaskFlow
        </h1>
        <p className="header-date">{format(today, 'EEEE, MMMM do yyyy')}</p>
      </div>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
    </header>
  );
}
