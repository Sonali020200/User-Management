import { useState } from "react";

const defaultValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
};
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const AddUserModal = ({ addUser }) => {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultValues);

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let error = "";
        switch (name) {
            case "name":
                if (value.length < 1) {
                    error = "Name is required";
                }
                break;
            case "username":
                if (value.length < 1) {
                    error = "Username is required";
                }
                break;
            case "email":
                if (!value.match(emailRegex)) {
                    error = "Email is not valid email address";
                }
                break;
            case "phone":
                if (!value.match(/^[0-9]{10}$/)) {
                    error = "Phone must be 10-digit number (eg. 9812345678)";
                }
                break;
            case "website":
                if (!value.match(urlRegex)) {
                    error =
                        "Website is not valid url (eg. https://website.com)";
                }
                break;
        }
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div id="addUserModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add a new User</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <form
                        className={
                            Object.keys(errors).some((key) => errors[key])
                                ? "was-validated"
                                : ""
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                            addUser(values);
                            setValues(defaultValues);
                        }}
                    >
                        <div className="modal-body">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="col-form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    required
                                    placeholder="Enter a name"
                                    value={values.name}
                                    onChange={onInputChange}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="col-form-label"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    required
                                    placeholder="Enter a username"
                                    value={values.username}
                                    onChange={onInputChange}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="col-form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    placeholder="Enter an email"
                                    value={values.email}
                                    onChange={onInputChange}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="col-form-label"
                                >
                                    Phone (10 digits)
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    required
                                    placeholder="Enter a 10-digit phone"
                                    pattern="[0-9]{10}"
                                    value={values.phone}
                                    onChange={onInputChange}
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="website"
                                    className="col-form-label"
                                >
                                    Website
                                </label>
                                <input
                                    type="url"
                                    className="form-control"
                                    name="website"
                                    required
                                    placeholder="Enter a website"
                                    value={values.website}
                                    onChange={onInputChange}
                                />
                                {errors.website && (
                                    <div className="invalid-feedback">
                                        {errors.website}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                disabled={
                                    Object.keys(errors).some(
                                        (key) => errors[key]
                                    ) ||
                                    Object.values(values).some(
                                        (value) => value.length < 1
                                    )
                                }
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
