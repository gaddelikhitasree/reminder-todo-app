import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import ReminderList from './components/ReminderList';
import Statistics from './components/Statistics';
import Toast from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotification } from './hooks/useNotification';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useLocalStorage('taskflow-dark', false);
  const [todos, setTodos] = useLocalStorage('taskflow-todos', []);
  const [reminders, setReminders] = useLocalStorage('taskflow-reminders', []);

  const { toasts, dismissToast, dismissAllToasts } = useNotification(reminders);

  const activeTodoCount = todos.filter((t) => !t.completed).length;
  const activeReminderCount = reminders.filter(
    (r) => !r.completed && new Date(r.datetime) >= new Date()
  ).length;

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            todos={todos}
            reminders={reminders}
            setActiveView={setActiveView}
          />
        );
      case 'todos':
        return <TodoList todos={todos} setTodos={setTodos} />;
      case 'reminders':
        return <ReminderList reminders={reminders} setReminders={setReminders} />;
      case 'stats':
        return <Statistics todos={todos} reminders={reminders} />;
      default:
        return null;
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="app-body">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          todoCount={activeTodoCount}
          reminderCount={activeReminderCount}
        />
        <main className="main-content">{renderView()}</main>
      </div>
      <Toast
        toasts={toasts}
        onDismiss={dismissToast}
        onDismissAll={dismissAllToasts}
      />
    </div>
  );
}
