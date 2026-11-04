
import { AppProvider, useAppContext } from "./context/AppContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
    const { currentUser } = useAppContext();

    if (!currentUser) {
        return <LoginPage />;
    }

    if (currentUser.role === "student") {
        return <StudentDashboard />;
    }

    return <AdminDashboard />;
}

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;

