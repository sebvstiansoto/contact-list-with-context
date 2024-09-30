import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Contacts } from "./views/Contacts";
import AddContacts from "./views/AddContacts";
import { Context } from "./store/appContext";

const Layout = () => {
  const { actions } = useContext(Context);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/AddContacts" element={<AddContacts />} />
            <Route path="/EditContact/:id" element={<AddContacts />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
