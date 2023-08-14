import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/api/videos`
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="pl-4 my-2">
        <button
          onClick={() => handleCategoryClick("Promo")}
          className="mx-1 btn btn-sm btn-outline"
        >
          Promo
        </button>
        <button
          onClick={() => handleCategoryClick("Diskon")}
          className="mx-1 btn btn-sm btn-outline"
        >
          Diskon
        </button>
        <button
          onClick={() => handleCategoryClick("Emas")}
          className="mx-1 btn btn-sm btn-outline"
        >
          Emas
        </button>
        <button
          onClick={() => handleCategoryClick("HP")}
          className="mx-1 btn btn-sm btn-outline"
        >
          HP
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center p-1">
        {data &&
          data
            .filter(
              (res) =>
                !selectedCategory ||
                res.titleImageThumbnail.includes(selectedCategory)
            )
            .map((res) => (
              <Link
                to={`/${res.videoID}`}
                key={res._id}
                className="relative flex-shrink-0 max-w-xs m-6 overflow-hidden rounded-lg shadow-lg"
              >
                <div className="relative">
                  <img className="w-full" src={res.urlImageThumbnail} alt="" />
                  <span className="absolute bottom-0 left-0 p-4 text-xl font-semibold text-white">
                    {res.titleImageThumbnail}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
};

export default Home;
