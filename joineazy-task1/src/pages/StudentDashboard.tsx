
import { useMemo, useState } from "react";
import {
    ClipboardList,
    CheckCircle2,
    Clock,
    BookOpen,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import AssignmentCard from "../components/AssignmentCard";
import SearchBar from "../components/SearchBar";

import { useAppContext } from "../context/AppContext";

function StudentDashboard() {
    const {
        currentUser,
        assignments,
        submitAssignment,
    } = useAppContext();

    const [search, setSearch] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");
    const [selectedAssignmentId, setSelectedAssignmentId] =
        useState<string | null>(null);
    const [showFinalConfirmation, setShowFinalConfirmation] =
        useState(false);

    if (!currentUser) return null;

    const studentAssignments = assignments.filter((assignment) =>
        assignment.assignedStudentIds.includes(currentUser.id)
    );

    const completedCount = studentAssignments.filter((assignment) =>
        assignment.submissions.some(
            (submission) =>
                submission.studentId === currentUser.id &&
                submission.status === "submitted"
        )
    ).length;

    const pendingCount = studentAssignments.length - completedCount;

    const filteredAssignments = useMemo(
        () =>
            studentAssignments.filter((assignment) =>
                assignment.title.toLowerCase().includes(search.toLowerCase())
            ),
        [studentAssignments, search]
    );

    const handleFinalSubmit = () => {
        if (!selectedAssignmentId) return;

        submitAssignment(selectedAssignmentId, currentUser.id);
        setSelectedAssignmentId(null);
        setShowFinalConfirmation(false);
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
                    title={activePage === "dashboard" ? "Dashboard" : "My Assignments"}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="space-y-6 p-4 sm:p-6 lg:p-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Hello, {currentUser.name.split(" ")[0]}!
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Here is an overview of your assignments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <StatCard
                            title="Total Assignments"
                            value={studentAssignments.length}
                            description="Assignments assigned to you"
                            icon={ClipboardList}
                            iconColor="text-indigo-600"
                            iconBackground="bg-indigo-100"
                        />

                        <StatCard
                            title="Submitted"
                            value={completedCount}
                            description="Assignments completed"
                            icon={CheckCircle2}
                            iconColor="text-green-600"
                            iconBackground="bg-green-100"
                        />

                        <StatCard
                            title="Pending"
                            value={pendingCount}
                            description="Assignments waiting for submission"
                            icon={Clock}
                            iconColor="text-yellow-600"
                            iconBackground="bg-yellow-100"
                        />
                    </div>

                    <ProgressCard
                        completed={completedCount}
                        total={studentAssignments.length}
                    />

                    <section>
                        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    My Assignments
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    View and manage your assigned tasks.
                                </p>
                            </div>

                            <SearchBar
                                value={search}
                                onChange={setSearch}
                            />
                        </div>

                        {filteredAssignments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                {filteredAssignments.map((assignment) => {
                                    const submission = assignment.submissions.find(
                                        (item) => item.studentId === currentUser.id
                                    );

                                    const isSubmitted =
                                        submission?.status === "submitted";

                                    return (
                                        <div key={assignment.id} className="space-y-3">
                                            <AssignmentCard
                                                assignment={assignment}
                                                status={isSubmitted ? "submitted" : "pending"}
                                            />

                                            {!isSubmitted && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedAssignmentId(assignment.id)
                                                    }
                                                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                                >
                                                    Yes, I have submitted
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                                <BookOpen
                                    size={36}
                                    className="mx-auto mb-3 text-gray-400"
                                />
                                <h3 className="font-semibold text-gray-800">
                                    No assignments found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try another search or check back later.
                                </p>
                            </div>
                        )}
                    </section>
                </main>
            </div>

            {selectedAssignmentId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900">
                            Confirm your submission
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Are you sure you have submitted this assignment?
                            Please confirm only after completing your work.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedAssignmentId(null)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowFinalConfirmation(true)}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFinalConfirmation && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900">
                            Final confirmation
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Confirm that you have completed and submitted this assignment.
                            Your status will be changed to Submitted.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowFinalConfirmation(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Go Back
                            </button>

                            <button
                                type="button"
                                onClick={handleFinalSubmit}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                Confirm Submission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
