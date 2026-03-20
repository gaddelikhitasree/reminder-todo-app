import { useMemo } from 'react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
} from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard({ todos, reminders, setActiveView }) {
  const stats = useMemo(() => {
    const activeTodos = todos.filter((t) => !t.completed).length;
    const completedTodos = todos.filter((t) => t.completed).length;
    const totalTodos = todos.length;
    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    const now = new Date();
    const overdueReminders = reminders.filter(
      (r) => !r.completed && isPast(new Date(r.datetime))
    ).length;
    const upcomingReminders = reminders.filter(
      (r) => !r.completed && !isPast(new Date(r.datetime))
    ).length;

    const todayReminders = reminders.filter(
      (r) => !r.completed && isToday(new Date(r.datetime))
    );
    const tomorrowReminders = reminders.filter(
      (r) => !r.completed && isTomorrow(new Date(r.datetime))
    );

    const highPriorityTodos = todos.filter(
      (t) => !t.completed && t.priority === 'high'
    );

    return {
      activeTodos,
      completedTodos,
      totalTodos,
      completionRate,
      overdueReminders,
      upcomingReminders,
      todayReminders,
      tomorrowReminders,
      highPriorityTodos,
    };
  }, [todos, reminders]);

  return (
    <div className="dashboard">
      <div className="dashboard-greeting">
        <h2>Welcome back! 👋</h2>
        <p>Here&apos;s your productivity overview for {format(new Date(), 'EEEE, MMMM do')}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveView('todos')}>
          <div className="stat-icon blue">
            <FiClock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.activeTodos}</span>
            <span className="stat-label">Active Tasks</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveView('todos')}>
          <div className="stat-icon green">
            <FiCheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.completedTodos}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveView('reminders')}>
          <div className="stat-icon orange">
            <FiAlertTriangle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.overdueReminders}</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <FiTrendingUp size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.completionRate}%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </div>
      </div>

      <div className="dashboard-columns">
        <div className="dashboard-section">
          <h3>🔥 High Priority Tasks</h3>
          {stats.highPriorityTodos.length === 0 ? (
            <p className="dashboard-empty">No high priority tasks. Nice!</p>
          ) : (
            <ul className="dashboard-list">
              {stats.highPriorityTodos.slice(0, 5).map((todo) => (
                <li key={todo.id} className="dashboard-list-item priority-high">
                  <span className="dl-dot" />
                  <span>{todo.title}</span>
                  <span className="dl-category">{todo.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-section">
          <h3>🔔 Today&apos;s Reminders</h3>
          {stats.todayReminders.length === 0 ? (
            <p className="dashboard-empty">No reminders for today.</p>
          ) : (
            <ul className="dashboard-list">
              {stats.todayReminders.map((r) => (
                <li key={r.id} className="dashboard-list-item">
                  <span className="dl-color" style={{ background: r.color }} />
                  <span>{r.title}</span>
                  <span className="dl-time">
                    {format(new Date(r.datetime), 'h:mm a')}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {stats.tomorrowReminders.length > 0 && (
            <>
              <h4 className="subheading">📅 Tomorrow</h4>
              <ul className="dashboard-list">
                {stats.tomorrowReminders.slice(0, 3).map((r) => (
                  <li key={r.id} className="dashboard-list-item">
                    <span className="dl-color" style={{ background: r.color }} />
                    <span>{r.title}</span>
                    <span className="dl-time">
                      {format(new Date(r.datetime), 'h:mm a')}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {stats.totalTodos > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <h3>Overall Progress</h3>
            <span>{stats.completionRate}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <p className="progress-text">
            {stats.completedTodos} of {stats.totalTodos} tasks completed
          </p>
        </div>
      )}
    </div>
  );
}
