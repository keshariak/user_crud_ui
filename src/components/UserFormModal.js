import React from "react";
import "../UserFormModal.css";

function UserFormModal({ formData, setFormData, onClose, onSubmit, isEditing }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{isEditing ? "Edit User" : "Add User"}</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
          <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" required />
          <div className="modal-buttons">
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;
