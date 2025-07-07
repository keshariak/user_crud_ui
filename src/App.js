import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFormModal from "./components/UserFormModal";
import "./App.css";

// const API_URL = "http://localhost:5000/api/users";
const API_URL = "https://user-crud-api-u3ht.onrender.com"

function App() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", age: "" });
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/api/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setEditUser(user);
    setFormData(user || { name: "", email: "", mobile: "", age: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  const handleSubmit = async () => {
    if (editUser) {
      await axios.put(`${API_URL}/${editUser._id}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    fetchUsers();
    closeModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <button className="add-btn" onClick={() => openModal()}>+ Add User</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Mobile</th><th>Age</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.age}</td>
              <td>
                <button onClick={() => openModal(u)}>Edit</button>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <UserFormModal
          formData={formData}
          setFormData={setFormData}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isEditing={!!editUser}
        />
      )}
    </div>
  );
}

export default App;
