
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { AttendanceRecord, AttendanceStatus } from '../types';
import { DUMMY_ATTENDANCE } from '../constants';

const Toast: React.FC<{ message: string; show: boolean }> = ({ message, show }) => (
    <div className={`fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
        {message}
    </div>
);

const StudentDashboard: React.FC = () => {
    const studentId = 'STU001'; // Logged in as Alice Johnson
    const studentName = 'Alice Johnson';

    const [attendanceLog, setAttendanceLog] = useState<AttendanceRecord[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Filter initial records for the logged-in student
        const studentRecords = DUMMY_ATTENDANCE.filter(rec => rec.studentId === studentId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time));
        setAttendanceLog(studentRecords);
        
        // Simulate a new RFID scan after a delay
        const timer = setTimeout(() => {
            const newRecord: AttendanceRecord = {
                id: `ATT${Date.now()}`,
                studentId,
                studentName,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                subject: 'Decentralized Applications',
                status: AttendanceStatus.PRESENT,
            };
            setAttendanceLog(prevLog => [newRecord, ...prevLog]);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 5000);

        return () => clearTimeout(timer);
    }, [studentId, studentName]);

    const displayedLogs = showHistory ? attendanceLog : attendanceLog.slice(0, 5);
    const getStatusColor = (status: AttendanceStatus) => {
        return status === AttendanceStatus.PRESENT ? 'text-green-400' : 'text-red-400';
    };

    return (
        <div className="space-y-8">
            <Toast message="RFID Scan Detected: Marked Present!" show={showToast} />
            
            <h1 className="text-3xl md:text-4xl font-bold">Student Dashboard</h1>

            {/* Profile Section */}
            <Card>
                <div className="flex items-center space-x-4">
                    <img src={`https://picsum.photos/seed/${studentId}/80`} alt="Profile" className="w-20 h-20 rounded-full border-4 border-brand-secondary" />
                    <div>
                        <h2 className="text-2xl font-bold">{studentName}</h2>
                        <p className="text-gray-400">Student ID: {studentId}</p>
                    </div>
                </div>
            </Card>

            {/* Attendance Log Section */}
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Attendance Log</h2>
                    <Button variant="secondary" onClick={() => setShowHistory(!showHistory)}>
                        {showHistory ? 'Show Recent' : 'View Full History'}
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/20">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">Subject</th>
                                <th className="p-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedLogs.map(record => (
                                <tr key={record.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                    <td className="p-3">{record.date}</td>
                                    <td className="p-3">{record.time}</td>
                                    <td className="p-3">{record.subject}</td>
                                    <td className={`p-3 text-right font-semibold ${getStatusColor(record.status)}`}>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {displayedLogs.length === 0 && <p className="text-center py-8 text-gray-400">No attendance records found.</p>}
                </div>
            </Card>
        </div>
    );
};

export default StudentDashboard;
