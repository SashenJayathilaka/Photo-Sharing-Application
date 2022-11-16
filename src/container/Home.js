import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";

import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import Pins from "./Pins";
import { auth } from "../firebase";
import { userQuery } from "../utils/data";

const Home = () => {
  const [user] = useAuthState(auth);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [dbuser, setUser] = useState(null);
  const scrollRef = useRef(null);
  const [isSHowSidebar, setIsShowSidebar] = useState(true);

  useEffect(() => {
    const query = userQuery(user?.uid);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [user]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out"
    >
      {isSHowSidebar && (
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar
            user={dbuser && dbuser}
            setIsShowSidebar={setIsShowSidebar}
          />
        </div>
      )}

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img
              src="https://lh5.ggpht.com/2l5qy4S93Ywq1CZbEubVofMbS1vvFyAMMGoGGb6awOQXsb1rd9VpwqEEoO6KYlYlAMw=w300"
              alt="logo"
              className="w-28"
            />
          </Link>
          <Link to={`user-profile/${dbuser?._id}`}>
            <img src={dbuser?.image} alt="logo" className="w-28" />
          </Link>
        </div>
      </div>

      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
            <Sidebar user={dbuser && dbuser} closeToggle={setToggleSidebar} />
          </div>
        </div>
      )}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/*"
            element={
              <Pins
                user={dbuser && dbuser}
                setIsShowSidebar={setIsShowSidebar}
                isSHowSidebar={isSHowSidebar}
              />
            }
          />
        </Routes>
      </div>
    </motion.div>
  );
};

export default Home;
