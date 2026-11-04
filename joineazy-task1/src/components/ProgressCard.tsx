
interface ProgressCardProps {
    completed: number;
    total: number;
}

function ProgressCard({ completed, total }: ProgressCardProps) {
    const percentage =
        total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Overall Progress
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Your assignment completion status
                    </p>
                </div>

                <span className="text-2xl font-bold text-indigo-600">
                    {percentage}%
                </span>
            </div>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="mt-3 text-sm text-gray-500">
                {completed} of {total} assignments completed
            </p>
        </div>
    );
}

export default ProgressCard;
