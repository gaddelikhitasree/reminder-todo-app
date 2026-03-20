import { FiTrash2, FiCheck, FiRepeat, FiClock } from 'react-icons/fi';
import { format, isPast } from 'date-fns';
import './ReminderItem.css';

export default function ReminderItem({ reminder, onToggle, onDelete }) {
  const reminderDate = new Date(reminder.datetime);
  const isOverdue = isPast(reminderDate) && !reminder.completed;

  return (
    <div
      className={`reminder-item ${reminder.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      style={{ borderLeftColor: reminder.color }}
    >
      <div className="reminder-color-bar" style={{ background: reminder.color }} />

      <div className="reminder-body">
        <div className="reminder-top">
          <span className="reminder-title">{reminder.title}</span>
          <div className="reminder-actions">
            <button
              className={`reminder-check-btn ${reminder.completed ? 'checked' : ''}`}
              onClick={() => onToggle(reminder.id)}
              aria-label="Toggle"
            >
              <FiCheck size={14} />
            </button>
            <button
              className="reminder-delete-btn"
              onClick={() => onDelete(reminder.id)}
              aria-label="Delete"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>

        <div className="reminder-details">
          <span className="reminder-time">
            <FiClock size={13} />
            {format(reminderDate, 'MMM dd, yyyy h:mm a')}
          </span>
          {reminder.repeat !== 'none' && (
            <span className="reminder-repeat">
              <FiRepeat size={13} />
              {reminder.repeat}
            </span>
          )}
          {isOverdue && <span className="overdue-tag">Overdue</span>}
        </div>
      </div>
    </div>
  );
}
