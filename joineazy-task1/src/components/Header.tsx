
import { Menu, Bell } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
}

function Header({ title, onMenuClick }: HeaderProps) {
    const { currentUser } = useAppContext();

    return (
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <Menu size={24} />
                </button>

                <div>
                    <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
                        {title}
                    </h1>

                    <p className="hidden text-sm text-gray-500 sm:block">
                        Welcome back, {currentUser?.name}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100"
                    aria-label="Notifications"
                >
                    <Bell size={21} />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                    {currentUser?.name.charAt(0)}
                </div>
            </div>
        </header>
    );
}

export default Header;
