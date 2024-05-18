import { useState } from 'react';
import Modal from 'react-modal';

const EditUserModal = ({ user, updateUser }) => {
    const [formValues, setFormValues] = useState({ ...user });

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
            isOpen={true} 
            contentLabel="Edit User"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={formValues.website}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Modal>
    );
};

export default EditUserModal;
