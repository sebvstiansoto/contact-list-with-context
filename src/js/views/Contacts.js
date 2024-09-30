import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css";
import userImg from "../../img/UserImg.webp";

export const Contacts = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState(store.contactos);

  const handleDeleteContact = async (id) => {
    await actions.deleteContact(id);
    setContacts(store.contactos);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/jenm23/contacts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContacts(data.contacts);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="col-md-8 mb-4">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      className="card-img"
                      src={userImg}
                      alt={contact.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{contact.name}</h5>
                      <p className="card-text">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {contact.address}
                      </p>
                      <p className="card-text">
                        <i className="fa-solid fa-phone"></i> {contact.phone}
                      </p>
                      <p className="card-text">
                        <i className="fa-regular fa-envelope"></i>{" "}
                        {contact.email}
                      </p>
                      <div className="">
                        <Link
                          to={`/EditContact/${contact.id}`}
                          className="btn"
                          style={{ marginRight: "0.5rem" }}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <button
                          className="btn"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </div>
  );
};
