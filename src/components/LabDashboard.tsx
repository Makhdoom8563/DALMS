import { Case } from '../types';

const mockCases: Case[] = [
  { id: '1', patientName: 'John Doe', details: 'Crown', materials: ['Zirconia'], status: 'pending', dateAdded: '2026-03-28', priority: 'high' },
  { id: '2', patientName: 'Jane Smith', details: 'Filling', materials: ['Composite'], status: 'completed', dateAdded: '2026-03-29', priority: 'medium' },
];

export default function LabDashboard({ userRole }: { userRole: string }) {
  const pending = mockCases.filter(c => c.status === 'pending');
  const completed = mockCases.filter(c => c.status === 'completed');

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Lab Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Pending Cases ({pending.length})</h2>
          {pending.map(c => (
            <div key={c.id} className="bg-gray-700 p-3 rounded-lg mb-2 flex justify-between items-center">
              <div>
                <p>{c.patientName} - {c.details}</p>
                <p className="text-xs text-gray-400">Assigned: {c.assignedTechnician || 'Unassigned'}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs capitalize ${c.priority === 'high' ? 'bg-red-900 text-red-200' : 'bg-yellow-900 text-yellow-200'}`}>{c.priority}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Completed Cases ({completed.length})</h2>
          {completed.map(c => (
            <div key={c.id} className="bg-gray-700 p-3 rounded-lg mb-2 flex justify-between items-center">
              <span>{c.patientName} - {c.details}</span>
              <span className={`px-2 py-1 rounded text-xs capitalize ${c.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' : 'bg-green-900 text-green-200'}`}>{c.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
