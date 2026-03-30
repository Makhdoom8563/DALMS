/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DoctorDashboard from './components/DoctorDashboard';
import CaseManagement from './components/CaseManagement';
import LabDashboard from './components/LabDashboard';
import DoctorProfile from './components/DoctorProfile';
import Auth from './components/Auth';
import Settings from './components/Settings';
import { Role, Notification } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [userRole, setUserRole] = useState<Role>('lab_admin');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: 'urgent' | 'status_change') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  if (!isLoggedIn) {
    return <Auth onLogin={(role) => { setUserRole(role); setIsLoggedIn(true); }} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} notifications={notifications} />
      <main className="flex-1">
        {activeTab === 'Dashboard' && userRole === 'doctor' && <DoctorDashboard />}
        {activeTab === 'Dashboard' && userRole === 'lab_admin' && <LabDashboard userRole={userRole} />}
        {activeTab === 'Cases' && <CaseManagement userRole={userRole} addNotification={addNotification} />}
        {activeTab === 'Profile' && userRole === 'doctor' && <DoctorProfile />}
        {activeTab === 'Settings' && <Settings />}
        {activeTab !== 'Dashboard' && activeTab !== 'Cases' && activeTab !== 'Profile' && activeTab !== 'Settings' && (
          <div className="p-8 text-white">Content for {activeTab}</div>
        )}
      </main>
    </div>
  );
}
