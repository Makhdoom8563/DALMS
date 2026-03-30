import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../types';

export default function NotificationBell({ notifications }: { notifications: Notification[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-400 hover:text-white">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl p-4 z-50">
          <h3 className="text-emerald-400 font-bold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-sm">No notifications</p>
          ) : (
            <div className="space-y-2">
              {notifications.map(n => (
                <div key={n.id} className={`p-2 rounded ${n.read ? 'bg-gray-700' : 'bg-gray-600'}`}>
                  <p className="text-sm text-white">{n.message}</p>
                  <p className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
