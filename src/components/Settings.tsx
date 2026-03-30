import { useState } from 'react';
import { Save, Bell, Shield, Building, User } from 'lucide-react';

export default function Settings() {
  const [labName, setLabName] = useState('Dental Architect Lab');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [urgentAlerts, setUrgentAlerts] = useState(true);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-400 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lab Profile */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Building className="text-emerald-500" />
            <h2 className="text-lg font-bold">Lab Profile</h2>
          </div>
          <div className="space-y-4">
            <input type="text" value={labName} onChange={e => setLabName(e.target.value)} className="w-full bg-gray-700 rounded p-2" />
            <button className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-emerald-500" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="accent-emerald-500" />
              Email Notifications
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={urgentAlerts} onChange={() => setUrgentAlerts(!urgentAlerts)} className="accent-emerald-500" />
              Urgent Case Alerts
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-emerald-500" />
            <h2 className="text-lg font-bold">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="text-red-400 hover:text-red-300">Change Password</button>
            <button className="text-red-400 hover:text-red-300">Two-Factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  );
}
