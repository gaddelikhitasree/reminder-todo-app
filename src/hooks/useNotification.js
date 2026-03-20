import { useEffect, useRef, useState, useCallback } from 'react';

export function useNotification(reminders) {
  const notifiedRef = useRef(new Set());
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const now = new Date();

      reminders.forEach((reminder) => {
        if (reminder.completed || notifiedRef.current.has(reminder.id)) return;

        const reminderTime = new Date(reminder.datetime);
        const diff = reminderTime - now;

        // Trigger when reminder time has passed (within last 5 minutes)
        if (diff <= 0 && diff > -300000) {
          notifiedRef.current.add(reminder.id);

          // In-app toast notification
          setToasts((prev) => [
            ...prev,
            {
              id: reminder.id,
              title: reminder.title,
              datetime: reminder.datetime,
              color: reminder.color,
            },
          ]);

          // Play notification sound
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGczHjqIqt/LdUEjOIS04eFwPBkvi6TesXA5JkF4r9rJfUspK3Wnzr6FWjgnaLHg0qxxRSk2gZjPsIRdOCVTo8fEooRdNiVdq9HDoIRfPzBxtd3WjYxgRzRsq87CmYVcPy1xtNvQiohlSDRrrM7CmIRdQDV0t+DXkY1qUjxxudvOh4BXOCdYnMG3jF06LF+z3+N4TC4ycb/e0H+BUTcnWZ3Au4xdOixfs9/jeEwuMnG/3tB/gVE3J1mdwLuMXTosX7Pf43hMLjJxv97Qf4FRNydZncC7jF06LF+z3+N4TC4ycb/e0H+BUQ=');
            audio.volume = 0.5;
            audio.play().catch(() => {});
          } catch {
            // audio not supported
          }

          // Browser notification (if allowed)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('⏰ Reminder Due!', {
              body: reminder.title,
              icon: '/vite.svg',
              tag: reminder.id,
            });
          }
        }
      });
    };

    // Check immediately on load, then every 5 seconds
    checkReminders();
    const interval = setInterval(checkReminders, 5000);

    return () => clearInterval(interval);
  }, [reminders]);

  return { toasts, dismissToast, dismissAllToasts };
}
