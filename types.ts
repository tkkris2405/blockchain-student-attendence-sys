
export enum Page {
  LANDING = 'landing',
  STUDENT_DASHBOARD = 'student_dashboard',
  ADMIN_DASHBOARD = 'admin_dashboard',
}

export enum AttendanceStatus {
    PRESENT = 'Present',
    ABSENT = 'Absent',
}

export interface Student {
    id: string;
    name: string;
    email: string;
}

export interface AttendanceRecord {
    id: string;
    studentId: string;
    studentName: string;
    date: string;
    time: string;
    subject: string;
    status: AttendanceStatus;
}
