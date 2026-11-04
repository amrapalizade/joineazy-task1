
import { useState } from "react";
import {
    ClipboardList,
    Users,
    CheckCircle2,
    Clock,
    Pencil,
    Trash2, Plus, X } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import { useAppContext } from "../context/AppContext";


import AssignmentForm from "../components/AssignmentForm";
import type { Assignment } from "../types";
import StudentsPage from "./StudentsPage";


function AdminDashboard() {
    const { currentUser, users, assignments, addAssignment, deleteAssignment, updateAssignment, } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");

    const adminAssignments = assignments.filter(
        (assignment) => assignment.createdBy === currentUser?.id
    );

    const totalStudents = users.filter(
        (user) => user.role === "student"
    ).length;

    const totalSubmissions = adminAssignments.reduce(
        (total, assignment) =>
            total + assignment.submissions.filter(
                (submission) => submission.status === "submitted"
            ).length,
        0
    );

    const totalPending = adminAssignments.reduce(
        (total, assignment) =>
            total + assignment.submissions.filter(
                (submission) => submission.status === "pending"
            ).length,
        0
    );

    const filteredAssignments = adminAssignments
        .filter((assignment) =>
            assignment.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((assignment) => {
            const submitted = assignment.submissions.filter(
                (submission) => submission.status === "submitted"
            ).length;

            const total = assignment.assignedStudentIds.length;

            if (statusFilter === "pending") {
                return submitted < total;
            }

            if (statusFilter === "completed") {
                return submitted === total;
            }

            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();

            return sortOrder === "oldest"
                ? dateA - dateB
                : dateB - dateA;
        });

    if (!currentUser) return null;

    const handleCreateAssignment = (data: {
        title: string;
        description: string;
        dueDate: string;
        driveLink: string;
        assignedStudentIds: string[];
    }) => {
        const newAssignment: Assignment = {
            id: crypto.randomUUID(),
            ...data,
            createdBy: currentUser.id,
            submissions: data.assignedStudentIds.map((studentId) => ({
                studentId,
                status: "pending",
            })),
        };

        addAssignment(newAssignment);
        setShowForm(false);
    };


    const handleDeleteAssignment = (assignmentId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this assignment?"
        );

        if (confirmDelete) {
            deleteAssignment(assignmentId);
        }
    };

    const handleUpdateAssignment = (data: {
        title: string;
        description: string;
        dueDate: string;
        driveLink: string;
        assignedStudentIds: string[];
    }) => {
        if (!editingAssignment) return;

        const updatedAssignment: Assignment = {
            ...editingAssignment,
            ...data,
            submissions: data.assignedStudentIds.map((studentId) => {
                const existingSubmission = editingAssignment.submissions.find(
                    (submission) => submission.studentId === studentId
                );

                return existingSubmission ?? {
                    studentId,
                    status: "pending" as const,
                };
            }),
        };

        updateAssignment(updatedAssignment);
        setEditingAssignment(null);
        setShowForm(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="min-w-0 flex-1">
                <Header
                    title="Admin Dashboard"
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="space-y-6 p-4 sm:p-6 lg:p-8">
                    {activePage === "students" ? (
                        <StudentsPage />
                    ) : (
                        <>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome, {currentUser.name}!
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage assignments and track student submissions.
                        </p>
                    </div>

                    {showForm && (
                        <AssignmentForm
                            students={users.filter((user) => user.role === "student")}
                            initialData={editingAssignment}
                            onSubmit={
                                editingAssignment
                                    ? handleUpdateAssignment
                                    : handleCreateAssignment
                            }
                            onCancel={() => {
                                setShowForm(false);
                                setEditingAssignment(null);
                            }}
                        />
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Total Assignments"
                            value={adminAssignments.length}
                            description="Created by you"
                            icon={ClipboardList}
                            iconColor="text-indigo-600"
                            iconBackground="bg-indigo-100"
                        />

                        <StatCard
                            title="Total Students"
                            value={totalStudents}
                            description="Registered students"
                            icon={Users}
                            iconColor="text-blue-600"
                            iconBackground="bg-blue-100"
                        />

                        <StatCard
                            title="Submitted"
                            value={totalSubmissions}
                            description="Student submissions"
                            icon={CheckCircle2}
                            iconColor="text-green-600"
                            iconBackground="bg-green-100"
                        />

                        <StatCard
                            title="Pending"
                            value={totalPending}
                            description="Awaiting submissions"
                            icon={Clock}
                            iconColor="text-orange-600"
                            iconBackground="bg-orange-100"
                        />
                    </div>

                    <section className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    My Assignments
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    View your assignments and student progress.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowForm(true)}
                                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                <Plus size={18} />
                                Create Assignment
                            </button>
                        </div>


                                    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                                        <div className="flex-1">
                                            <SearchBar
                                                value={search}
                                                onChange={setSearch}
                                                placeholder="Search assignments..."
                                            />
                                        </div>

                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500"
                                        >
                                            <option value="all">All Assignments</option>
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                        </select>

                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500"
                                        >
                                            <option value="newest">Newest Due Date</option>
                                            <option value="oldest">Oldest Due Date</option>
                                        </select>
                                    </div>


                        <div className="space-y-4">
                            {filteredAssignments.length === 0 ? (
                                <p className="py-8 text-center text-sm text-gray-500">
                                    No assignments found.
                                </p>
                            ) : (
                                filteredAssignments.map((assignment) => {
                                    const submitted = assignment.submissions.filter(
                                        (item) => item.status === "submitted"
                                    ).length;

                                    const total = assignment.assignedStudentIds.length;
                                    const progress = total > 0
                                        ? Math.round((submitted / total) * 100)
                                        : 0;

                                    return (
                                        <div
                                            key={assignment.id}
                                            className="rounded-lg border border-gray-200 p-4"
                                        >
                                            <div className="flex flex-col justify-between gap-3 sm:flex-row">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {assignment.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {assignment.description}
                                                    </p>
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Due date: {assignment.dueDate}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <a
                                                        href={assignment.driveLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm font-medium text-indigo-600 hover:underline"
                                                    >
                                                        Open Drive Link
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingAssignment(assignment);
                                                            setShowForm(true);
                                                        }}
                                                        className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                                                        title="Edit Assignment"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteAssignment(assignment.id)}
                                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                        title="Delete Assignment"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <div className="mb-2 flex justify-between text-sm">
                                                    <span className="font-medium text-gray-700">
                                                        Class Progress
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {submitted}/{total} Submitted ({progress}%)
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                    <div
                                                        className="h-full rounded-full bg-indigo-600"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4 border-t pt-3">
                                                <p className="mb-3 text-sm font-semibold text-gray-700">
                                                    Student Status
                                                </p>

                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    {assignment.assignedStudentIds.map((studentId) => {
                                                        const student = users.find(
                                                            (user) => user.id === studentId
                                                        );

                                                        const submission = assignment.submissions.find(
                                                            (item) => item.studentId === studentId
                                                        );

                                                        return (
                                                            <div
                                                                key={studentId}
                                                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                                            >
                                                                <span className="text-sm text-gray-700">
                                                                    {student?.name ?? "Unknown Student"}
                                                                </span>

                                                                <span
                                                                    className={`text-xs font-semibold ${submission?.status === "submitted"
                                                                            ? "text-green-600"
                                                                            : "text-orange-600"
                                                                        }`}
                                                                >
                                                                    {submission?.status === "submitted"
                                                                        ? "Submitted"
                                                                        : "Pending"}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                                </section>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}


export default AdminDashboard;
