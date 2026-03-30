export type Role = 'doctor' | 'lab_technician' | 'lab_admin';

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface Case {
  id: string;
  patientName: string;
  patientId: string;
  doctorClinic: string;
  caseType: string;
  materials: string[];
  preparationType: string;
  shade: string;
  receivingDate: string;
  dueDate: string;
  deliveryDate: string;
  status: 'Received' | 'Pending' | 'In-Progress' | 'Completed';
  caseCost: number;
  assignedTechnician?: string;
  dateAdded: string;
  priority: 'Normal' | 'High' | 'Urgent';
  notes?: string;
  selectedTeeth: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  clinicName: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'urgent' | 'status_change';
  read: boolean;
  timestamp: string;
}
