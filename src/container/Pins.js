import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = ({ user, setIsShowSidebar, isSHowSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="px-2 md:px-5"
    >
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
          setIsShowSidebar={setIsShowSidebar}
          isSHowSidebar={isSHowSidebar}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </motion.div>
  );
};

export default Pins;
