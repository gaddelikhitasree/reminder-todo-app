import { useMemo } from 'react';
import './Statistics.css';

export default function Statistics({ todos, reminders }) {
  const stats = useMemo(() => {
    const categories = {};
    const priorities = { high: 0, medium: 0, low: 0 };

    todos.forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + 1;
      if (!t.completed) priorities[t.priority]++;
    });

    const completedTodos = todos.filter((t) => t.completed).length;
    const completedReminders = reminders.filter((r) => r.completed).length;

    return {
      totalTasks: todos.length,
      completedTasks: completedTodos,
      activeTasks: todos.length - completedTodos,
      totalReminders: reminders.length,
      completedReminders,
      activeReminders: reminders.length - completedReminders,
      categories: Object.entries(categories).sort((a, b) => b[1] - a[1]),
      priorities,
    };
  }, [todos, reminders]);

  const maxCategory = Math.max(...stats.categories.map(([, v]) => v), 1);

  return (
    <div className="statistics">
      <div className="section-header">
        <h2>Statistics</h2>
      </div>

      <div className="stats-overview-grid">
        <div className="overview-card">
          <h4>Tasks</h4>
          <div className="overview-row">
            <span>Total</span>
            <strong>{stats.totalTasks}</strong>
          </div>
          <div className="overview-row">
            <span>Active</span>
            <strong className="text-blue">{stats.activeTasks}</strong>
          </div>
          <div className="overview-row">
            <span>Completed</span>
            <strong className="text-green">{stats.completedTasks}</strong>
          </div>
        </div>

        <div className="overview-card">
          <h4>Reminders</h4>
          <div className="overview-row">
            <span>Total</span>
            <strong>{stats.totalReminders}</strong>
          </div>
          <div className="overview-row">
            <span>Active</span>
            <strong className="text-blue">{stats.activeReminders}</strong>
          </div>
          <div className="overview-row">
            <span>Completed</span>
            <strong className="text-green">{stats.completedReminders}</strong>
          </div>
        </div>

        <div className="overview-card">
          <h4>Priority Breakdown</h4>
          <div className="priority-bars">
            {Object.entries(stats.priorities).map(([p, count]) => (
              <div key={p} className="priority-bar-row">
                <span className={`priority-label ${p}`}>{p}</span>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${p}`}
                    style={{
                      width: `${stats.activeTasks > 0 ? (count / stats.activeTasks) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.categories.length > 0 && (
        <div className="category-chart">
          <h3>Tasks by Category</h3>
          <div className="chart-bars">
            {stats.categories.map(([cat, count]) => (
              <div key={cat} className="chart-bar-row">
                <span className="chart-label">{cat}</span>
                <div className="chart-track">
                  <div
                    className="chart-fill"
                    style={{ width: `${(count / maxCategory) * 100}%` }}
                  />
                </div>
                <span className="chart-value">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
