import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddUserModal from "../AddUserModal/AddUserModal";
import DeleteUserModal from "./../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";

const API_BASE = "https://jsonplaceholder.typicode.com";

const cleanPhone = (phone) => phone.replace(/[^0-9]/g, "").substring(0, 10);

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const selectedUser = users.find((user) => user.id === selectedUserId);

    const fetchUsers = async () => {
        try {
            const response = await fetch(API_BASE + "/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("An error occurred while fetching users");
        } finally {
            setLoading(false);
        }
    };

    const addUser = (values) => {
        const promise = fetch(API_BASE + "/users", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        toast.promise(promise, {
            loading: "Adding user...",
            success: (data) => {
                (async () => {
                    data = await data.json();
                    setUsers((prev) => [...prev, data]);
                })();
                return "User added successfully";
            },
            error: "An error occurred while adding user",
        });
    };


    const updateUser = (updatedUser) => {
        const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
        setUsers(updatedUsers);
        setSelectedUser(null);
    };
    


    const deleteUser = () => {
        const deletedUserId = selectedUserId;
        const promise = fetch(`${API_BASE}/users/${deletedUserId}`, {
            method: "DELETE",
        });

        toast.promise(promise, {
            loading: "Deleting user...",
            success: (data) => {
                setUsers(users.filter((user) => user.id !== deletedUserId));
                return "User deleted successfully";
            },
            error: "An error occurred while deleting user",
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container">

            {loading && <p>Loading users...</p>}
            {!loading && (
                <div className="row g-4">
                    {/* Left column */}
                    <div className="col col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary ms-auto d-md-block"
                            data-bs-toggle="modal"
                            data-bs-target="#addUserModal"
                        >
                            Add User
                        </button>
                    </div>
                    {/* Right Column */}
                    <div className="col col-md-10">
                        <h2>Users List</h2>
                        {users.length == 0 && <p>No users available</p>}
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr
                                            key={
                                                "email=" +
                                                user.email +
                                                "_id=" +
                                                user.id
                                            }
                                        >
                                            <td scope="row">{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={`mailto:${user.email}`}
                                                    target="_blank"
                                                >
                                                    {user.email}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={`tel:${cleanPhone(
                                                        user.phone
                                                    )}`}
                                                    target="_blank"
                                                >
                                                    {cleanPhone(user.phone)}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    className="text-reset"
                                                    href={
                                                        user.website.startsWith(
                                                            "http"
                                                        )
                                                            ? user.website
                                                            : `http://${user.website}`
                                                    }
                                                    target="_blank"
                                                >
                                                    {user.website}
                                                </a>
                                            </td>

                                            <td>
                       {/* Edit button */}
                       <button
                                  type="button"
                                  className="btn btn-link"
                                  onClick={() => setSelectedUserId(user.id)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#editUsermodal"
                          >
                                    📝
                    </button>
                 </td>
                                            <td>                                                                           
                                                <a
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirmDeleteModal"
                                                    onClick={() =>
                                                        setSelectedUserId(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                        }}
                                                        className="text-danger"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <AddUserModal addUser={addUser} />

            
            
            <DeleteUserModal
                deleteUser={deleteUser}
                selectedUser={selectedUser}
            />
        </div>
    );
};

export default UserManagement;