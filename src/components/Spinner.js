import React from "react";
import {
  MagnifyingGlass,
  ColorRing,
  Circles,
  Bars,
  FallingLines,
} from "react-loader-spinner";
import { motion } from "framer-motion";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {message === "Loading more pins" ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <ColorRing
            visible={true}
            height="80"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </motion.div>
      ) : !message ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Circles
            height="80"
            width="200"
            color="#00BFFF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </motion.div>
      ) : message === "Loading profile" ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Bars
            height="80"
            width="200"
            color="#00BFFF"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </motion.div>
      ) : message === "Showing pin" ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <FallingLines
            color="#00BFFF"
            width="120"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <MagnifyingGlass
            visible={true}
            height="80"
            width="200"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </motion.div>
      )}

      <p className="text-lg text-center px-2 mt-5">{message}</p>
    </div>
  );
};

export default Spinner;
