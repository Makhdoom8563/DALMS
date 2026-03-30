import { useState } from 'react';
import { Plus, Edit, Trash2, ArrowUpDown, X } from 'lucide-react';
import { Case } from '../types';

const initialCases: Case[] = [
  { 
    id: '1', 
    patientName: 'John Doe', 
    patientId: 'P001', 
    doctorClinic: 'Smile Clinic', 
    caseType: 'Crown', 
    materials: ['Zirconia'], 
    preparationType: 'Shoulder', 
    shade: 'A1', 
    receivingDate: '2026-03-28', 
    dueDate: '2026-04-05', 
    deliveryDate: '2026-04-06', 
    status: 'Received', 
    caseCost: 12000, 
    dateAdded: '2026-03-28', 
    priority: 'High', 
    notes: 'Urgent case', 
    selectedTeeth: ['14'] 
  },
];

export default function CaseManagement({ userRole, addNotification }: { userRole: string, addNotification: (message: string, type: 'urgent' | 'status_change') => void }) {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [sortConfig, setSortConfig] = useState<{key: keyof Case, direction: 'asc' | 'desc'}>({key: 'dateAdded', direction: 'desc'});
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCase, setNewCase] = useState<Partial<Case>>({
    patientName: '',
    patientId: '',
    doctorClinic: '',
    caseType: 'Crown',
    materials: [],
    preparationType: 'Shoulder',
    shade: 'A1',
    receivingDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    deliveryDate: '',
    status: 'Received',
    caseCost: 0,
    priority: 'Normal',
    notes: '',
    selectedTeeth: []
  });
  const technicians = ['Tech A', 'Tech B', 'Tech C'];

  const addCase = () => {
    if (!newCase.patientName || !newCase.patientId) return;
    const caseToAdd: Case = {
      id: Date.now().toString(),
      patientName: newCase.patientName,
      patientId: newCase.patientId,
      doctorClinic: newCase.doctorClinic || '',
      caseType: newCase.caseType || 'Crown',
      materials: newCase.materials || [],
      preparationType: newCase.preparationType || 'Shoulder',
      shade: newCase.shade || 'A1',
      receivingDate: newCase.receivingDate || '',
      dueDate: newCase.dueDate || '',
      deliveryDate: newCase.deliveryDate || '',
      status: newCase.status || 'Received',
      caseCost: newCase.caseCost || 0,
      assignedTechnician: undefined,
      dateAdded: new Date().toISOString().split('T')[0],
      priority: newCase.priority || 'Normal',
      notes: newCase.notes,
      selectedTeeth: newCase.selectedTeeth || []
    };
    setCases([...cases, caseToAdd]);
    addNotification(`New case added for patient ${caseToAdd.patientName}`, 'status_change');
    if (caseToAdd.priority === 'Urgent') {
      addNotification(`Urgent case added for patient ${caseToAdd.patientName}`, 'urgent');
    }
    setIsAddModalOpen(false);
    setNewCase({
      patientName: '',
      patientId: '',
      doctorClinic: '',
      caseType: 'Crown',
      materials: [],
      preparationType: 'Shoulder',
      shade: 'A1',
      receivingDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      deliveryDate: '',
      status: 'Received',
      caseCost: 0,
      priority: 'Normal',
      notes: '',
      selectedTeeth: []
    });
  };

  const priorityOrder = { low: 1, medium: 2, high: 3 };

  const sortedCases = [...cases].sort((a, b) => {
    let valA = a[sortConfig.key]!;
    let valB = b[sortConfig.key]!;

    if (sortConfig.key === 'priority') {
      valA = priorityOrder[a.priority];
      valB = priorityOrder[b.priority];
    }

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Case) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const deleteCase = (id: string) => setCases(cases.filter(c => c.id !== id));
  
  const updateStatus = (id: string, status: 'Received' | 'Pending' | 'In-Progress' | 'Completed') => {
    setCases(cases.map(c => {
      if (c.id === id && c.status !== status) {
        addNotification(`Case for ${c.patientName} changed status to ${status}`, 'status_change');
        return {...c, status};
      }
      return c;
    }));
  };

  const updatePriority = (id: string, priority: 'Normal' | 'High' | 'Urgent') => {
    setCases(cases.map(c => {
      if (c.id === id && c.priority !== priority) {
        if (priority === 'Urgent') {
          addNotification(`Case for ${c.patientName} marked as Urgent`, 'urgent');
        }
        return {...c, priority};
      }
      return c;
    }));
  };

  const assignTechnician = (id: string, technician: string) => {
    setCases(cases.map(c => c.id === id ? {...c, assignedTechnician: technician} : c));
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400">Dental Cases</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600">
          <Plus size={20} /> Add Case
        </button>
      </div>
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="p-3 cursor-pointer flex items-center gap-1" onClick={() => handleSort('patientName')}>Patient <ArrowUpDown size={14} /></th>
              <th className="p-3">Case Type</th>
              <th className="p-3 cursor-pointer flex items-center gap-1" onClick={() => handleSort('status')}>Status <ArrowUpDown size={14} /></th>
              <th className="p-3 cursor-pointer flex items-center gap-1" onClick={() => handleSort('priority')}>Priority <ArrowUpDown size={14} /></th>
              <th className="p-3">Technician</th>
              <th className="p-3 cursor-pointer flex items-center gap-1" onClick={() => handleSort('dateAdded')}>Date Added <ArrowUpDown size={14} /></th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCases.map(c => (
              <tr key={c.id} className="border-b border-gray-700 cursor-pointer hover:bg-gray-700" onClick={() => setSelectedCase(c)}>
                <td className="p-3">{c.patientName}</td>
                <td className="p-3">{c.caseType}</td>
                <td className="p-3">
                  <select value={c.status} onChange={(e) => { e.stopPropagation(); updateStatus(c.id, e.target.value as any); }} className="bg-gray-700 rounded p-1 capitalize">
                    <option value="Received">Received</option>
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-3">
                  <select value={c.priority} onChange={(e) => { e.stopPropagation(); updatePriority(c.id, e.target.value as any); }} className="bg-gray-700 rounded p-1 capitalize">
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </td>
                <td className="p-3">
                  {userRole === 'lab_admin' ? (
                    <select value={c.assignedTechnician || ''} onChange={(e) => { e.stopPropagation(); assignTechnician(c.id, e.target.value); }} className="bg-gray-700 rounded p-1">
                      <option value="">Unassigned</option>
                      {technicians.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  ) : (
                    <span>{c.assignedTechnician || 'Unassigned'}</span>
                  )}
                </td>
                <td className="p-3">{c.dateAdded}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-400"><Edit size={18} /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteCase(c.id); }} className="text-red-400"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-emerald-400">Add New Case</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Patient Name" value={newCase.patientName} onChange={e => setNewCase({...newCase, patientName: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
                  <input type="text" placeholder="Patient ID" value={newCase.patientId} onChange={e => setNewCase({...newCase, patientId: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
                </div>
                <input type="text" placeholder="Doctor / Clinic" value={newCase.doctorClinic} onChange={e => setNewCase({...newCase, doctorClinic: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
                
                <div className="grid grid-cols-3 gap-4">
                  <select value={newCase.priority} onChange={e => setNewCase({...newCase, priority: e.target.value as any})} className="w-full bg-gray-700 rounded p-2">
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  <select value={newCase.caseType} onChange={e => setNewCase({...newCase, caseType: e.target.value})} className="w-full bg-gray-700 rounded p-2">
                    <option value="Crown">Crown</option>
                    <option value="Bridge">Bridge</option>
                    <option value="Denture">Denture</option>
                    <option value="Veneer">Veneer</option>
                  </select>
                  <input type="number" placeholder="Cost" value={newCase.caseCost} onChange={e => setNewCase({...newCase, caseCost: Number(e.target.value)})} className="w-full bg-gray-700 rounded p-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Material</label>
                  <div className="flex gap-2">
                    {['Zirconia', 'PFM'].map(m => (
                      <button key={m} onClick={() => setNewCase({...newCase, materials: [m]})} className={`px-4 py-2 rounded ${newCase.materials?.includes(m) ? 'bg-emerald-600' : 'bg-gray-700'}`}>{m}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Preparation Type</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Shoulder', 'Chamfer', 'Knife Edge', 'Feather Edge'].map(p => (
                      <button key={p} onClick={() => setNewCase({...newCase, preparationType: p})} className={`px-3 py-1 rounded text-sm ${newCase.preparationType === p ? 'bg-emerald-600' : 'bg-gray-700'}`}>{p}</button>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-400">
                  <input type="file" className="hidden" id="case-image" />
                  <label htmlFor="case-image" className="cursor-pointer">Upload impression photo or X-ray</label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="date" value={newCase.dueDate} onChange={e => setNewCase({...newCase, dueDate: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
                  <input type="date" value={newCase.deliveryDate} onChange={e => setNewCase({...newCase, deliveryDate: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
                </div>
                <textarea placeholder="Notes" value={newCase.notes} onChange={e => setNewCase({...newCase, notes: e.target.value})} className="w-full bg-gray-700 rounded p-2" rows={3}></textarea>
                <button onClick={addCase} className="bg-emerald-500 w-full py-2 rounded-lg hover:bg-emerald-600">Create Case</button>
              </div>
          </div>
        </div>
      )}

      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-emerald-400">Case Details</h2>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <div className="space-y-3 text-gray-300">
              <p><strong>Patient:</strong> {selectedCase.patientName} (ID: {selectedCase.patientId})</p>
              <p><strong>Doctor/Clinic:</strong> {selectedCase.doctorClinic}</p>
              <p><strong>Case Type:</strong> {selectedCase.caseType}</p>
              <p><strong>Status:</strong> <span className="capitalize">{selectedCase.status}</span></p>
              <p><strong>Priority:</strong> <span className="capitalize">{selectedCase.priority}</span></p>
              <p><strong>Materials:</strong> {selectedCase.materials.join(', ')}</p>
              <p><strong>Preparation:</strong> {selectedCase.preparationType}</p>
              <p><strong>Shade:</strong> {selectedCase.shade}</p>
              <p><strong>Dates:</strong> Receiving: {selectedCase.receivingDate}, Due: {selectedCase.dueDate}, Delivery: {selectedCase.deliveryDate}</p>
              <p><strong>Cost:</strong> Rs {selectedCase.caseCost}</p>
              {selectedCase.assignedTechnician && <p><strong>Technician:</strong> {selectedCase.assignedTechnician}</p>}
              <p><strong>Notes:</strong> {selectedCase.notes || 'No notes available.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
