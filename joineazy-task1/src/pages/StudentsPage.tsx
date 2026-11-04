
import { useAppContext } from "../context/AppContext";
import { Users, CheckCircle2, Clock } from "lucide-react";

function StudentsPage() {
    const { currentUser, users, assignments } = useAppContext();

    if (!currentUser) return null;

    const students = users.filter((user) => user.role === "student");

    const adminAssignments = assignments.filter(
        (assignment) => assignment.createdBy === currentUser.id
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Students
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    View student details and their assignment progress.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-white p-5">
                    <div className="flex items-center gap-3">
                        <Users className="text-indigo-600" size={22} />
                        <p className="text-sm text-gray-500">Total Students</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold">{students.length}</p>
                </div>

                <div className="rounded-xl border bg-white p-5">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" size={22} />
                        <p className="text-sm text-gray-500">Total Submissions</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold">
                        {adminAssignments.reduce(
                            (total, assignment) =>
                                total +
                                assignment.submissions.filter(
                                    (submission) => submission.status === "submitted"
                                ).length,
                            0
                        )}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5">
                    <div className="flex items-center gap-3">
                        <Clock className="text-orange-500" size={22} />
                        <p className="text-sm text-gray-500">Pending Submissions</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold">
                        {adminAssignments.reduce(
                            (total, assignment) =>
                                total +
                                assignment.submissions.filter(
                                    (submission) => submission.status === "pending"
                                ).length,
                            0
                        )}
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        All Students
                    </h3>
                </div>

                {students.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        No students found.
                    </p>
                ) : (
                    <div className="divide-y">
                        {students.map((student) => {
                            const studentAssignments = adminAssignments.filter(
                                (assignment) =>
                                    assignment.assignedStudentIds.includes(student.id)
                            );

                            const submittedCount = studentAssignments.filter(
                                (assignment) =>
                                    assignment.submissions.some(
                                        (submission) =>
                                            submission.studentId === student.id &&
                                            submission.status === "submitted"
                                    )
                            ).length;

                            const pendingCount =
                                studentAssignments.length - submittedCount;

                            return (
                                <div
                                    key={student.id}
                                    className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                                >
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {student.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {student.email}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <span className="text-gray-600">
                                            Assigned: {studentAssignments.length}
                                        </span>
                                        <span className="font-medium text-green-600">
                                            Submitted: {submittedCount}
                                        </span>
                                        <span className="font-medium text-orange-600">
                                            Pending: {pendingCount}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentsPage;
