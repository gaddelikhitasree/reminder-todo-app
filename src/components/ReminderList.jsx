import { useState, useMemo, useEffect } from 'react';
import ReminderItem from './ReminderItem';
import AddReminder from './AddReminder';
import emailjs from '@emailjs/browser';
import './ReminderList.css';

export default function ReminderList({ reminders, setReminders }) {
  const [filter, setFilter] = useState('upcoming');

  // 🔔 ASK NOTIFICATION PERMISSION
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // 📩 EMAIL FUNCTION
  const sendEmail = (reminder) => {
    emailjs.send(
      "service_oaljzfn",
      "template_pjp0vda",
      {
        message: reminder.title,
        time: reminder.datetime,
        to_email: reminder.email
      },
      "IM2QcpLwYPnKL9j1c"
    )
    .then(() => {
      console.log("✅ Email sent");
      alert("📩 Reminder email sent!");
    })
    .catch(err => {
      console.error("❌ Email error:", err);
      alert("❌ Email failed");
    });
  };

  // 🔔 NOTIFICATION FUNCTION
  const scheduleNotification = (reminder) => {
    const delay = new Date(reminder.datetime) - new Date();

    if (delay > 0) {
      setTimeout(() => {
        new Notification("Reminder 🔔", {
          body: reminder.title,
        });
      }, delay);
    }
  };

  // 🔥 ADD FUNCTION
  const handleAdd = (reminder) => {
    setReminders([reminder, ...reminders]);

    sendEmail(reminder);          // 📩 email
    scheduleNotification(reminder); // 🔔 notification
  };

  const handleToggle = (id) =>
    setReminders(reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));

  const handleDelete = (id) => setReminders(reminders.filter((r) => r.id !== id));

  const filteredReminders = useMemo(() => {
    const now = new Date();
    let result = [...reminders];

    if (filter === 'upcoming') {
      result = result.filter((r) => !r.completed && new Date(r.datetime) >= now);
    } else if (filter === 'overdue') {
      result = result.filter((r) => !r.completed && new Date(r.datetime) < now);
    } else if (filter === 'completed') {
      result = result.filter((r) => r.completed);
    }

    result.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return result;
  }, [reminders, filter]);

  const upcomingCount = reminders.filter(
    (r) => !r.completed && new Date(r.datetime) >= new Date()
  ).length;

  const overdueCount = reminders.filter(
    (r) => !r.completed && new Date(r.datetime) < new Date()
  ).length;

  return (
    <div className="reminder-list-container">
      <div className="section-header">
        <h2>Reminders</h2>
        <div className="section-counts">
          <span className="count-badge active-badge">{upcomingCount} upcoming</span>
          {overdueCount > 0 && (
            <span className="count-badge overdue-badge">{overdueCount} overdue</span>
          )}
        </div>
      </div>

      <AddReminder onAdd={handleAdd} />

      <div className="reminder-filters">
        {['all', 'upcoming', 'overdue', 'completed'].map((f) => (
          <button
            key={f}
            className={`reminder-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="reminder-list">
        {filteredReminders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔔</span>
            <p>No reminders found</p>
            <span className="empty-hint">Create a new reminder above!</span>
          </div>
        ) : (
          filteredReminders.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              reminder={reminder}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}