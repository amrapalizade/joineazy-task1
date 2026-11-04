
import { AppProvider, useAppContext } from "./context/AppContext";
import LoginPage from "./pages/LoginPage";

function AppContent() {
    const { currentUser, logout } = useAppContext();

    if (!currentUser) {
        return <LoginPage />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome, {currentUser.name}!
                </h1>

                <p className="mt-2 text-gray-500">
                    Logged in as: {currentUser.role}
                </p>

                <button
                    onClick={logout}
                    className="mt-6 rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;
