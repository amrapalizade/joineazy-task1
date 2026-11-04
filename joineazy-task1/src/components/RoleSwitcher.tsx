
import { useAppContext } from "../context/AppContext";

function RoleSwitcher() {
    const { users, currentUser, login } = useAppContext();

    return (
        <div className="flex items-center gap-3">
            <label
                htmlFor="role-switcher"
                className="text-sm font-medium text-gray-600"
            >
                Switch Account:
            </label>

            <select
                id="role-switcher"
                value={currentUser?.id ?? ""}
                onChange={(event) => login(event.target.value)}
                className="max-w-[180px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name} ({user.role})
                    </option>
                ))}
            </select>
        </div>
    );
}

export default RoleSwitcher;
