
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { User, Assignment } from "../types";
import { mockUsers, mockAssignments } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

interface AppContextType {
    currentUser: User | null;
    users: User[];
    assignments: Assignment[];
    login: (userId: string) => void;
    logout: () => void;
    addAssignment: (assignment: Assignment) => void;
    updateAssignment: (assignment: Assignment) => void;
    deleteAssignment: (assignmentId: string) => void;
    submitAssignment: (assignmentId: string, studentId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [users] = useLocalStorage<User[]>("joineazy_users", mockUsers);

    const [assignments, setAssignments] = useLocalStorage<Assignment[]>(
        "joineazy_assignments",
        mockAssignments
    );

    const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>(
        "joineazy_current_user",
        null
    );

    const currentUser =
        users.find((user) => user.id === currentUserId) ?? null;

    const login = (userId: string) => {
        setCurrentUserId(userId);
    };

    const logout = () => {
        setCurrentUserId(null);
    };

    const addAssignment = (assignment: Assignment) => {
        setAssignments((previous) => [...previous, assignment]);
    };

    const updateAssignment = (updatedAssignment: Assignment) => {
        setAssignments((previous) =>
            previous.map((assignment) =>
                assignment.id === updatedAssignment.id
                    ? updatedAssignment
                    : assignment
            )
        );
    };

    const deleteAssignment = (assignmentId: string) => {
        setAssignments((previous) =>
            previous.filter((assignment) => assignment.id !== assignmentId)
        );
    };

    const submitAssignment = (assignmentId: string, studentId: string) => {
        setAssignments((previous) =>
            previous.map((assignment) => {
                if (assignment.id !== assignmentId) {
                    return assignment;
                }

                const alreadySubmitted = assignment.submissions.some(
                    (submission) =>
                        submission.studentId === studentId &&
                        submission.status === "submitted"
                );

                if (alreadySubmitted) {
                    return assignment;
                }

                return {
                    ...assignment,
                    submissions: assignment.submissions.map((submission) =>
                        submission.studentId === studentId
                            ? {
                                ...submission,
                                status: "submitted" as const,
                                submittedAt: new Date().toISOString(),
                            }
                            : submission
                    ),
                };
            })
        );
    };

    return (
        <AppContext.Provider
            value={{
                currentUser,
                users,
                assignments,
                login,
                logout,
                addAssignment,
                updateAssignment,
                deleteAssignment,
                submitAssignment,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used inside AppProvider");
    }

    return context;
}
