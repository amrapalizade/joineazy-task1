
import { useState, type FormEvent } from "react";
import type { User } from "../types";

interface AssignmentFormProps {
    students: User[];
    onSubmit: (data: {
        title: string;
        description: string;
        dueDate: string;
        driveLink: string;
        assignedStudentIds: string[];
    }) => void;
    onCancel: () => void;
}

function AssignmentForm({
    students,
    onSubmit,
    onCancel,
}: AssignmentFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [driveLink, setDriveLink] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<string[]>(
        () => students.map((student) => student.id)
    );

    const handleStudentChange = (studentId: string) => {
        setSelectedStudents((previous) =>
            previous.includes(studentId)
                ? previous.filter((id) => id !== studentId)
                : [...previous, studentId]
        );
    };

    const handleSelectAll = () => {
        setSelectedStudents((previous) =>
            previous.length === students.length
                ? []
                : students.map((student) => student.id)
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedStudents.length === 0) {
            alert("Please select at least one student.");
            return;
        }

        onSubmit({
            title,
            description,
            dueDate,
            driveLink,
            assignedStudentIds: selectedStudents,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-gray-200 bg-white p-6"
        >
            <div>
                <h2 className="text-xl font-bold text-gray-900">
                    Create New Assignment
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Enter assignment details and select students.
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Assignment Title
                </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter assignment title"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Enter assignment description"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date
                </label>
                <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Google Drive Link
                </label>
                <input
                    type="url"
                    required
                    value={driveLink}
                    onChange={(event) => setDriveLink(event.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">
                        Assign to Students
                    </label>

                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                        {selectedStudents.length === students.length
                            ? "Deselect All"
                            : "Select All"}
                    </button>
                </div>

                <div className="grid gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-2">
                    {students.map((student) => (
                        <label
                            key={student.id}
                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                        >
                            <input
                                type="checkbox"
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => handleStudentChange(student.id)}
                                className="h-4 w-4 accent-indigo-600"
                            />
                            {student.name}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                    Create Assignment
                </button>
            </div>
        </form>
    );
}

export default AssignmentForm;
