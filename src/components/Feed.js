import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";

import NoPins from "./NoPins";

const Feed = () => {
  const [loading, setloading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setloading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
      });
    } else {
      setloading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message={`We are adding  ideas to your feed!`} />;

  if (!pins?.length) return <NoPins />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
