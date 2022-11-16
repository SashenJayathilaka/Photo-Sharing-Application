import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setloading] = useState(false);
  const [fields, setfields] = useState(null);
  const [categroy, setcategroy] = useState(null);
  const [imageAssets, setimageAssets] = useState(null);
  const [wrongimageType, setwrongimageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    try {
      if (
        type === "image/png" ||
        type === "image/svg" ||
        type === "image/jpeg" ||
        type === "image/gif" ||
        type === "image/tiff"
      ) {
        setwrongimageType(false);
        setloading(true);

        client.assets
          .upload("image", e.target.files[0], {
            contentType: type,
            filename: name,
          })
          .then((document) => {
            setimageAssets(document);
            setloading(false);
          })
          .catch((error) => {
            console.log("Upload failed:", error.message);
          });
      } else {
        setwrongimageType(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const savePin = () => {
    try {
      if (title && about && destination && imageAssets?._id && categroy) {
        const doc = {
          _type: "pin",
          title,
          about,
          destination,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAssets?._id,
            },
          },
          userId: user._id,
          postedBy: {
            _type: "postedBy",
            _ref: user._id,
          },
          category: categroy,
        };
        toast.success("successfully added your pin", {
          duration: 5000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
        client.create(doc).then(() => {
          navigate("/");
        });
      } else {
        setfields(true);

        setTimeout(() => {
          setfields(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Toaster />
      <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
        {fields && (
          <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
            Please add all fields.
          </p>
        )}
        <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && <Spinner />}
              {wrongimageType && <p>It&apos;s wrong file type.</p>}
              {!imageAssets ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>

                    <p className="mt-32 text-gray-400">
                      Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less
                      than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAssets?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setimageAssets(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            />
            {user && (
              <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt="user-profile"
                />
                <p className="font-bold">{user.userName}</p>
              </div>
            )}
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell everyone what your Pin is about"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            <input
              type="url"
              vlaue={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Add a destination link"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            <div className="flex flex-col">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">
                  Choose Pin Category
                </p>
                <select
                  onChange={(e) => {
                    setcategroy(e.target.value);
                  }}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">
                    Select Category
                  </option>
                  {categories.map((item) => (
                    <option
                      className="text-base border-0 outline-none capitalize bg-white text-black "
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end items-end mt-5">
                {loading ? (
                  <button
                    type="button"
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-700 text-center"
                  >
                    <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={savePin}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-700"
                  >
                    Save Pin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePin;
