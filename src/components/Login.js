import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { client } from "../client";
import { auth } from "../firebase";
import backgroundVideo from "../assets/background.mp4";

const Login = () => {
  const navigate = useNavigate();

  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user) => {
    try {
      const doc = {
        _id: user?.uid,
        _type: "user",
        userName: user?.displayName,
        image: user?.photoURL,
      };
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex justify-start items-center flex-col h-screen"
    >
      <div className="relative w-full h-full">
        <video
          src={backgroundVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img
              src="https://i.pinimg.com/originals/fb/9a/2e/fb9a2e03d453c372b03e15f6eea031ad.png"
              alt=""
              width="130px"
            />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="mr-4" /> Sign in with google
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
