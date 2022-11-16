import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { client, urlFor } from "../client";
import { auth } from "../firebase";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [user] = useAuthState(auth);
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.uid
  )?.length;

  const savePin = (id) => {
    try {
      if (!alreadySaved) {
        client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert("after", "save[-1]", [
            {
              _key: uuidv4(),
              userId: user?.uid,
              postedBy: {
                _type: "postedBy",
                _ref: user?.uid,
              },
            },
          ])
          .commit()
          .then(() => {
            window.location.reload();
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePin = (id) => {
    try {
      client.delete(id).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    if (user) {
      navigate(`/pin-detail/${_id}`);
    } else {
      toast.error("You Need to sign in", {
        duration: 8000,
        style: {
          background: "#fff",
          color: "#015871",
          fontWeight: "bolder",
          fontSize: "17px",
          padding: "20px",
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Toaster />
      <div className="m-2">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={handleNavigate}
          className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
          <img
            className="rounded-lg w-full"
            alt=""
            src={urlFor(image).width(250).url()}
          />
          {postHovered && (
            <div
              className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
              style={{ height: "100%" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <a
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                {user && (
                  <>
                    {alreadySaved ? (
                      <button
                        type="button"
                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                      >
                        {save?.length} Saved
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          savePin(_id);
                        }}
                        type="button"
                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                      >
                        save
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                {destination && (
                  <a
                    href={destination}
                    target="_blank"
                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                    rel="noreferrer"
                  >
                    <BsFillArrowUpRightCircleFill />
                    {destination?.slice(8, 17)}...
                  </a>
                )}
                {postedBy?._id === user?.uid && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
        <Link
          to={`/user-profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize">{postedBy?.userName}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Pin;
