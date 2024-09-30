import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function AddContacts() {
  const { actions, store } = useContext(Context);
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const contactToEdit = store.contactos.find(
        (contact) => contact.id === parseInt(id)
      );
      if (contactToEdit) {
        setName(contactToEdit.full_name);
        setEmail(contactToEdit.email);
        setPhone(contactToEdit.phone);
        setAddress(contactToEdit.address);
      }
    }
  }, [id, store.contactos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = {
      name: fullName,
      email,
      phone,
      address,
      agenda_slug: "jenm23",
    };

    if (isEdit) {
      actions.updateContact({ ...contact, id: parseInt(id) });
    } else {
      actions.addContact(contact);
    }

    navigate("/");
  };

  return (
    <>
      <h1 className="text-center">
        {isEdit ? "Edit Contact" : "Add a new contact"}
      </h1>
      <div>
        <form className="m-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isEdit ? "Update" : "Save"}
          </button>

          <Link to="/">
            <span>or get back to contacts</span>
          </Link>
        </form>
      </div>
    </>
  );
}

export default AddContacts;
