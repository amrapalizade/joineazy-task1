
import { useState } from "react";
import { ClipboardList, Users, CheckCircle2, Clock } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import { useAppContext } from "../context/AppContext";

function AdminDashboard() {
    const { currentUser, users, assignments } = useAppContext();

    const [search, setSearch] = useState("");
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

    const filteredAssignments = adminAssignments.filter(
        (assignment) =>
            assignment.title.toLowerCase().includes(search.toLowerCase())
    );

    if (!currentUser) return null;

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
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome, {currentUser.name}!
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage assignments and track student submissions.
                        </p>
                    </div>

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
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                My Assignments
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                View your assignments and student progress.
                            </p>
                        </div>

                        <div className="mb-5">
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                                placeholder="Search assignments..."
                            />
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

                                                <a
                                                    href={assignment.driveLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-medium text-indigo-600 hover:underline"
                                                >
                                                    Open Drive Link
                                                </a>
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
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
