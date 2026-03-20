import { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import './AddReminder.css';

const REPEAT_OPTIONS = ['none', 'daily', 'weekly', 'monthly'];

export default function AddReminder({ onAdd }) {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [repeat, setRepeat] = useState('none');
  const [color, setColor] = useState('#6366f1');

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !datetime) return;

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      datetime,
      repeat,
      color,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle('');
    setDatetime('');
    setRepeat('none');
    setColor('#6366f1');
  };

  return (
    <form className="add-reminder" onSubmit={handleSubmit}>
      <h3 className="add-reminder-title">
        <FiBell size={18} /> New Reminder
      </h3>

      <div className="reminder-form-grid">
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Remind me to..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="reminder-input"
          />
        </div>

        <div className="form-field">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="reminder-input"
          />
        </div>

        <div className="form-field">
          <label>Repeat</label>
          <select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            className="reminder-input"
          >
            {REPEAT_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r === 'none' ? 'No repeat' : `Repeat ${r}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Color</label>
          <div className="color-picks">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-dot ${color === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="add-reminder-btn"
        disabled={!title.trim() || !datetime}
      >
        <FiBell size={16} />
        Set Reminder
      </button>
    </form>
  );
}
