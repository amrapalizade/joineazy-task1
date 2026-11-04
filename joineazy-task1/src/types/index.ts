
export type UserRole = "admin" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type SubmissionStatus = "pending" | "submitted";

export interface Submission {
    studentId: string;
    status: SubmissionStatus;
    submittedAt?: string;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    driveLink: string;
    createdBy: string;
    assignedStudentIds: string[];
    submissions: Submission[];
}
