
import type { User, Assignment } from "../types";

export const mockUsers: User[] = [
    {
        id: "admin1",
        name: "Rahul Sharma",
        email: "rahul@joineazy.com",
        role: "admin",
    },
    {
        id: "admin2",
        name: "Priya Verma",
        email: "priya@joineazy.com",
        role: "admin",
    },
    {
        id: "student1",
        name: "Aarav Patel",
        email: "aarav@student.com",
        role: "student",
    },
    {
        id: "student2",
        name: "Ananya Singh",
        email: "ananya@student.com",
        role: "student",
    },
    {
        id: "student3",
        name: "Rohan Gupta",
        email: "rohan@student.com",
        role: "student",
    },
    {
        id: "student4",
        name: "Sneha Joshi",
        email: "sneha@student.com",
        role: "student",
    },
    {
        id: "student5",
        name: "Arjun Mehta",
        email: "arjun@student.com",
        role: "student",
    },
];

export const mockAssignments: Assignment[] = [
    {
        id: "assignment1",
        title: "React Fundamentals",
        description: "Complete the React basics and component practice.",
        dueDate: "2026-11-06",
        driveLink: "https://drive.google.com/",
        createdBy: "admin1",
        assignedStudentIds: [
            "student1",
            "student2",
            "student3",
            "student4",
            "student5",
        ],
        submissions: [
            { studentId: "student1", status: "submitted" },
            { studentId: "student2", status: "submitted" },
            { studentId: "student3", status: "pending" },
            { studentId: "student4", status: "pending" },
            { studentId: "student5", status: "pending" },
        ],
    },
    {
        id: "assignment2",
        title: "JavaScript ES6",
        description: "Practice modern JavaScript features and concepts.",
        dueDate: "2026-11-08",
        driveLink: "https://drive.google.com/",
        createdBy: "admin1",
        assignedStudentIds: [
            "student1",
            "student2",
            "student3",
            "student4",
            "student5",
        ],
        submissions: [
            { studentId: "student1", status: "submitted" },
            { studentId: "student2", status: "pending" },
            { studentId: "student3", status: "pending" },
            { studentId: "student4", status: "pending" },
            { studentId: "student5", status: "pending" },
        ],
    },
    {
        id: "assignment3",
        title: "Tailwind CSS UI Design",
        description: "Create a responsive webpage using Tailwind CSS.",
        dueDate: "2026-11-10",
        driveLink: "https://drive.google.com/",
        createdBy: "admin2",
        assignedStudentIds: ["student1", "student2", "student3"],
        submissions: [
            { studentId: "student1", status: "pending" },
            { studentId: "student2", status: "submitted" },
            { studentId: "student3", status: "pending" },
        ],
    },
];
