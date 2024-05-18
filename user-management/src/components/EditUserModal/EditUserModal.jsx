import { useState, useEffect } from 'react';
import Modal from 'react-modal';



const EditUserModal = ({ user, updateUser }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
    });

    useEffect(() => {
        if (user) {
            setFormValues({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                website: user.website || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formValues);
    };

    return (
        <Modal
            isOpen={!!user}
            onRequestClose={() => updateUser(null)}
            contentLabel="Edit User"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="text-xl mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <input
                        type="text"
                        name="website"
                        value={formValues.website}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => updateUser(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditUserModal;
