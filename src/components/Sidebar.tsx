import { LayoutDashboard, Briefcase, User, Users, Wallet, FileText, Package, BarChart3, Settings } from 'lucide-react';
import { Role, Notification } from '../types';
import NotificationBell from './NotificationBell';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, roles: ['doctor', 'lab_technician', 'lab_admin'] },
  { name: 'Cases', icon: Briefcase, roles: ['doctor', 'lab_technician', 'lab_admin'] },
  { name: 'Profile', icon: User, roles: ['doctor'] },
  { name: 'Doctor Profiles', icon: User, roles: ['lab_admin'] },
  { name: 'Technicians', icon: Users, roles: ['lab_admin'] },
  { name: 'Financials', icon: Wallet, roles: ['lab_admin'] },
  { name: 'Invoices', icon: FileText, roles: ['lab_admin'] },
  { name: 'Inventory', icon: Package, roles: ['lab_admin', 'lab_technician'] },
  { name: 'Reports', icon: BarChart3, roles: ['lab_admin'] },
  { name: 'Settings', icon: Settings, roles: ['doctor', 'lab_technician', 'lab_admin'] },
];

export default function Sidebar({ activeTab, setActiveTab, userRole, notifications }: { activeTab: string, setActiveTab: (tab: string) => void, userRole: Role, notifications: Notification[] }) {
  return (
    <aside className="w-64 bg-black text-gray-400 p-6 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-10">
        <div className="text-emerald-500 font-bold text-xl flex items-center gap-2">
          <div className="bg-emerald-500 text-black rounded p-1">+</div> DENTALARC...
        </div>
        <NotificationBell notifications={notifications} />
      </div>
      <nav className="space-y-4">
        {menuItems.filter(item => item.roles.includes(userRole)).map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center gap-3 w-full p-2 rounded-lg ${activeTab === item.name ? 'text-emerald-500 bg-gray-900' : 'hover:text-white'}`}
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
