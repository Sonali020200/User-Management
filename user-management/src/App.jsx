import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import UserManagement from "./components/UserManagement/UserManagement";

const App = () => {
    return (
        <div className="bg-white h-100 d-flex flex-column">
            <Navbar />

            <Toaster position="top-left" />

            {/* Main content */}
            <main className="mt-5 flex-grow-1">
                <UserManagement />
            </main>

            <Footer />
        </div>
    );
};

export default App;
