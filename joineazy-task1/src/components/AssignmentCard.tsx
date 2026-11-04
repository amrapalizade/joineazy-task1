
import { CalendarDays, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import type { Assignment } from "../types";

interface AssignmentCardProps {
    assignment: Assignment;
    status: "pending" | "submitted";
}

function AssignmentCard({ assignment, status }: AssignmentCardProps) {
    const isSubmitted = status === "submitted";

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {assignment.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {assignment.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={17} />
                        <span>Due: {assignment.dueDate}</span>
                    </div>
                </div>

                <span
                    className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${isSubmitted
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {isSubmitted ? (
                        <CheckCircle2 size={14} />
                    ) : (
                        <Clock size={14} />
                    )}

                    {isSubmitted ? "Submitted" : "Pending"}
                </span>
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4">
                <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                    Open Drive Link
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
}

export default AssignmentCard;
