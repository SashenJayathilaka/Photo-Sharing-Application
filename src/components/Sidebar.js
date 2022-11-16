import React from "react";
import { RiHomeFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSideBar}
        >
          <img
            src="https://lh5.ggpht.com/2l5qy4S93Ywq1CZbEubVofMbS1vvFyAMMGoGGb6awOQXsb1rd9VpwqEEoO6KYlYlAMw=w300"
            alt=""
            className="w-full"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={index}
            >
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSideBar}
              >
                <img
                  src={category.image}
                  className="w-8 h-8 rounded-full shadow-sm"
                />
                {category.name}
              </NavLink>
            </motion.button>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSideBar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
