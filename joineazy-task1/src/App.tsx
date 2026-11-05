
import { AppProvider, useAppContext } from "./context/AppContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
function AppContent() {
    const { currentUser } = useAppContext();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentUser]);
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

