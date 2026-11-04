
import { useState } from "react";
import { GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function LoginPage() {
    const { users, login } = useAppContext();

    const [selectedUser, setSelectedUser] = useState("");

    const handleLogin = () => {
        if (!selectedUser) {
            return;
        }

        login(selectedUser);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <GraduationCap size={30} />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome to Joineazy
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Assignment & Review Dashboard
                    </p>
                </div>

                <h2 className="mb-3 text-sm font-semibold text-gray-700">
                    Select your account
                </h2>

                <div className="space-y-3">
                    {users.map((user) => (
                        <button
                            key={user.id}
                            type="button"
                            onClick={() => setSelectedUser(user.id)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${selectedUser === user.id
                                    ? "border-indigo-600 bg-indigo-50"
                                    : "border-gray-200 hover:border-indigo-300"
                                }`}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-indigo-600">
                                {user.role === "admin" ? (
                                    <ShieldCheck size={21} />
                                ) : (
                                    <GraduationCap size={21} />
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>

                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600">
                                {user.role}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleLogin}
                    disabled={!selectedUser}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Continue
                    <ArrowRight size={18} />
                </button>

                <p className="mt-5 text-center text-xs text-gray-400">
                    Demo login · No password required
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
