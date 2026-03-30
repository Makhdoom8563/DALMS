import { useState } from 'react';
import { Doctor } from '../types';

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState<Doctor>({
    id: '1',
    name: 'Dr. John Smith',
    specialization: 'Orthodontics',
    licenseNumber: 'DENT-12345',
    email: 'john.smith@clinic.com',
    phone: '+1 555-0101',
    clinicName: 'Smile Dental Clinic',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, save to Firebase here
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Doctor Profile</h1>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl max-w-2xl">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Name</label>
              <input type="text" value={doctor.name} onChange={e => setDoctor({...doctor, name: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Specialization</label>
              <input type="text" value={doctor.specialization} onChange={e => setDoctor({...doctor, specialization: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">License Number</label>
              <input type="text" value={doctor.licenseNumber} onChange={e => setDoctor({...doctor, licenseNumber: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input type="email" value={doctor.email} onChange={e => setDoctor({...doctor, email: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Phone</label>
              <input type="tel" value={doctor.phone} onChange={e => setDoctor({...doctor, phone: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Clinic Name</label>
              <input type="text" value={doctor.clinicName} onChange={e => setDoctor({...doctor, clinicName: e.target.value})} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <button type="submit" className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600">Save Profile</button>
          </form>
        ) : (
          <div className="space-y-4">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>License Number:</strong> {doctor.licenseNumber}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>
            <p><strong>Clinic Name:</strong> {doctor.clinicName}</p>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}
