import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  /* console.log(user, ""); */

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  const addComment = () => {
    try {
      if (comment) {
        setAddingComment(true);

        client
          .patch(pinId)
          .setIfMissing({ comments: [] })
          .insert("after", "comments[-1]", [
            {
              comment,
              _key: uuidv4(),
              postedBy: { _type: "postedBy", _ref: user._id },
            },
          ])
          .commit()
          .then(() => {
            fetchPinDetails();
            setComment("");
            setAddingComment(false);

            toast.success("successfully added your Comment", {
              duration: 6000,
              style: {
                background: "#fff",
                color: "#015871",
                fontWeight: "bolder",
                fontSize: "17px",
                padding: "10px",
                textAlign: "center",
              },
            });
          });
      } else {
        toast.error("Your Comment Field is Empty", {
          duration: 6000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "10px",
            textAlign: "center",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Toaster />
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            className="rounded-t-3xl rounded-b-lg"
            src={pinDetail?.image && urlFor(pinDetail?.image).url()}
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                download
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination?.slice(8, 17)}
            </a>
          </div>
          <div className="">
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail?.postedBy._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg "
          >
            <img
              src={pinDetail?.postedBy.image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">{pinDetail?.postedBy.userName}</p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, index) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={index}
              >
                <img
                  src={comment.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy?.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user._id}`}>
              <img
                src={user.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {addingComment ? (
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                <AiOutlineLoading3Quarters className="animate-spin m-auto font-bold" />
              </button>
            ) : (
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                post
              </button>
            )}
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </motion.div>
  );
};

export default PinDetail;
