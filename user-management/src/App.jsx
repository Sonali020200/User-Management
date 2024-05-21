import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import UserManagement from "./components/UserManagement/UserManagement";
import EditUserModal from "./components/EditUserModal/EditUserModal";
import "./App.css";
import Modal from 'react-modal';
import Pagination from "./components/Pagination";
import UserPagination from "./components/Pagination";

Modal.setAppElement('#root');

const App = () => {
    const [editUser, setEditUser] = useState(null);

    return (
        <div className="bg-white h-100 d-flex flex-column">
            <Navbar />

            <Toaster position="top-left" />

            {/* Main content */}
            <main className="mt-5 flex-grow-1">
                <UserManagement setEditUser={setEditUser} />
                <EditUserModal user={editUser} updateUser={setEditUser} />
            </main>
           

            <Footer />
           
        </div>
    );
};

export default App;