
import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { AttendanceRecord, AttendanceStatus, Student } from '../types';
import { DUMMY_ATTENDANCE, DUMMY_STUDENTS, SUBJECTS } from '../constants';

const AdminDashboard: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(DUMMY_STUDENTS);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(DUMMY_ATTENDANCE);
    const [searchTerm, setSearchTerm] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', email: '' });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredRecords = useMemo(() => {
        return attendanceRecords
            .filter(record =>
                record.studentName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(record =>
                subjectFilter === 'All' || record.subject === subjectFilter
            ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time));
    }, [attendanceRecords, searchTerm, subjectFilter]);

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        const newStudentData: Student = {
            id: `STU${Date.now()}`,
            name: newStudent.name,
            email: newStudent.email,
        };
        setStudents(prev => [...prev, newStudentData]);
        setNewStudent({ name: '', email: '' });
        setIsModalOpen(false);
        showToast(`Student "${newStudent.name}" added successfully!`);
    };

    const handleRemoveStudent = (studentId: string) => {
        const studentName = students.find(s => s.id === studentId)?.name;
        setStudents(prev => prev.filter(s => s.id !== studentId));
        setAttendanceRecords(prev => prev.filter(r => r.studentId !== studentId));
        showToast(`Student "${studentName}" removed successfully!`);
    };
    
    const getStatusColor = (status: AttendanceStatus) => {
        return status === AttendanceStatus.PRESENT ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300';
    };

    return (
        <div className="space-y-8">
            {toastMessage && (
                <div className="fixed top-20 right-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
                    {toastMessage}
                </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
            </div>
            
            {/* Attendance Records Table */}
            <Card>
                <h2 className="text-2xl font-bold mb-6">All Attendance Records</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by student name..."
                        className="w-full md:w-1/2 p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="w-full md:w-1/2 p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                    >
                        <option value="All">All Subjects</option>
                        {SUBJECTS.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/20">
                            <tr>
                                <th className="p-3">Student Name</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Subject</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(record => (
                                <tr key={record.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="p-3">{record.studentName}</td>
                                    <td className="p-3">{record.date} at {record.time}</td>
                                    <td className="p-3">{record.subject}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        {/* FIX: Removed unsupported 'size' prop from Button component as it's not defined in ButtonProps. */}
                                        <Button variant="secondary" className="px-3 py-1 text-sm" onClick={() => showToast(`Verification for ${record.id} initiated.`)}>
                                            Verify on Blockchain
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredRecords.length === 0 && <p className="text-center py-8 text-gray-400">No matching records found.</p>}
                </div>
            </Card>

            {/* Manage Students */}
            <Card>
                <h2 className="text-2xl font-bold mb-6">Manage Students</h2>
                <div className="space-y-3">
                    {students.map(student => (
                        <div key={student.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <div>
                                <p className="font-semibold">{student.name}</p>
                                <p className="text-sm text-gray-400">{student.email}</p>
                            </div>
                            <Button variant="danger" className="px-3 py-1 text-sm" onClick={() => handleRemoveStudent(student.id)}>Remove</Button>
                        </div>
                    ))}
                </div>
            </Card>
            
            {/* Add Student Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Student">
                <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <Button type="submit">Add Student</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminDashboard;