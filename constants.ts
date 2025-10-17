
import { Student, AttendanceRecord, AttendanceStatus } from './types';

export const DUMMY_STUDENTS: Student[] = [
    { id: 'STU001', name: 'Alice Johnson', email: 'alice.j@university.edu' },
    { id: 'STU002', name: 'Bob Williams', email: 'bob.w@university.edu' },
    { id: 'STU003', name: 'Charlie Brown', email: 'charlie.b@university.edu' },
    { id: 'STU004', name: 'Diana Miller', email: 'diana.m@university.edu' },
    { id: 'STU005', name: 'Ethan Davis', email: 'ethan.d@university.edu' },
];

export const DUMMY_ATTENDANCE: AttendanceRecord[] = [
    { id: 'ATT001', studentId: 'STU001', studentName: 'Alice Johnson', date: '2023-10-27', time: '09:05 AM', subject: 'Blockchain Fundamentals', status: AttendanceStatus.PRESENT },
    { id: 'ATT002', studentId: 'STU002', studentName: 'Bob Williams', date: '2023-10-27', time: '09:02 AM', subject: 'Blockchain Fundamentals', status: AttendanceStatus.PRESENT },
    { id: 'ATT003', studentId: 'STU003', studentName: 'Charlie Brown', date: '2023-10-27', time: '11:15 AM', subject: 'Cryptography', status: AttendanceStatus.PRESENT },
    { id: 'ATT004', studentId: 'STU004', studentName: 'Diana Miller', date: '2023-10-27', time: '09:00 AM', subject: 'Blockchain Fundamentals', status: AttendanceStatus.ABSENT },
    { id: 'ATT005', studentId: 'STU001', studentName: 'Alice Johnson', date: '2023-10-27', time: '11:10 AM', subject: 'Cryptography', status: AttendanceStatus.PRESENT },
    { id: 'ATT006', studentId: 'STU005', studentName: 'Ethan Davis', date: '2023-10-26', time: '02:05 PM', subject: 'Smart Contracts', status: AttendanceStatus.PRESENT },
    { id: 'ATT007', studentId: 'STU002', studentName: 'Bob Williams', date: '2023-10-26', time: '02:00 PM', subject: 'Smart Contracts', status: AttendanceStatus.PRESENT },
    { id: 'ATT008', studentId: 'STU001', studentName: 'Alice Johnson', date: '2023-10-25', time: '09:01 AM', subject: 'Blockchain Fundamentals', status: AttendanceStatus.PRESENT },
];

export const SUBJECTS: string[] = ['Blockchain Fundamentals', 'Cryptography', 'Smart Contracts', 'Decentralized Applications'];
