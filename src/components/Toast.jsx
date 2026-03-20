import { useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';
import { format } from 'date-fns';
import './Toast.css';

export default function Toast({ toasts, onDismiss, onDismissAll }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.length > 1 && (
        <button className="toast-dismiss-all" onClick={onDismissAll}>
          Dismiss all ({toasts.length})
        </button>
      )}
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 15000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="toast-item" style={{ borderLeftColor: toast.color || '#6366f1' }}>
      <div className="toast-icon-wrap" style={{ background: toast.color || '#6366f1' }}>
        <FiBell size={16} />
      </div>
      <div className="toast-body">
        <span className="toast-label">Reminder Due!</span>
        <span className="toast-title">{toast.title}</span>
        <span className="toast-time">
          {format(new Date(toast.datetime), 'h:mm a')}
        </span>
      </div>
      <button
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}
