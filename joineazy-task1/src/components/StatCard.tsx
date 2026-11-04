
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBackground: string;
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconColor,
    iconBackground,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBackground} ${iconColor}`}
                >
                    <Icon size={24} />
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">{description}</p>
        </div>
    );
}

export default StatCard;
