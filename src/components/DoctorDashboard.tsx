import { useState } from 'react';
import { Calendar, Users, Plus, Search, Filter } from 'lucide-react';

// Mock data
const patients = [
  { id: 1, name: 'John Doe', lastVisit: '2026-03-15' },
  { id: 2, name: 'Jane Smith', lastVisit: '2026-03-20' },
  { id: 3, name: 'Mike Johnson', lastVisit: '2026-03-25' },
];

const appointments = [
  { id: 1, patient: 'John Doe', date: '2026-04-01', time: '10:00 AM', procedure: 'Crown' },
  { id: 2, patient: 'Jane Smith', date: '2026-04-02', time: '02:00 PM', procedure: 'Filling' },
  { id: 3, patient: 'Mike Johnson', date: '2026-04-03', time: '09:00 AM', procedure: 'Crown' },
];

export default function DoctorDashboard() {
  const [patientSearch, setPatientSearch] = useState('');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [procedureFilter, setProcedureFilter] = useState('');

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()));
  const filteredAppointments = appointments.filter(a => 
    (a.patient.toLowerCase().includes(appointmentSearch.toLowerCase()) || a.procedure.toLowerCase().includes(appointmentSearch.toLowerCase())) &&
    (procedureFilter === '' || a.procedure === procedureFilter)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-emerald-400">Doctor Dashboard</h1>
        <button className="flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 font-bold hover:bg-emerald-600">
          <Plus size={20} /> New Case
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Patients List */}
        <section className="rounded-2xl bg-gray-800 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Users className="text-emerald-400" /> Patients
            </h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
              <input type="text" placeholder="Search patients..." value={patientSearch} onChange={e => setPatientSearch(e.target.value)} className="rounded-md bg-gray-700 py-2 pl-8 pr-4 text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            {filteredPatients.map(p => (
              <div key={p.id} className="flex justify-between rounded-lg bg-gray-700 p-3">
                <span>{p.name}</span>
                <span className="text-sm text-gray-400">Last visit: {p.lastVisit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Appointments List */}
        <section className="rounded-2xl bg-gray-800 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Calendar className="text-emerald-400" /> Upcoming Appointments
            </h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Search..." value={appointmentSearch} onChange={e => setAppointmentSearch(e.target.value)} className="rounded-md bg-gray-700 py-2 px-3 text-sm" />
              <select value={procedureFilter} onChange={e => setProcedureFilter(e.target.value)} className="rounded-md bg-gray-700 py-2 px-3 text-sm">
                <option value="">All Procedures</option>
                <option value="Crown">Crown</option>
                <option value="Filling">Filling</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            {filteredAppointments.map(a => (
              <div key={a.id} className="flex justify-between rounded-lg bg-gray-700 p-3">
                <div>
                  <div className="font-semibold">{a.patient}</div>
                  <div className="text-sm text-gray-400">{a.procedure}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">{a.date}</div>
                  <div className="text-sm text-emerald-400">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
