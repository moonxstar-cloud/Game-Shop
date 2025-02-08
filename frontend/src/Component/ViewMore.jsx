import React from "react";
import { useNavigate } from "react-router-dom";

function ViewMore({ released, genres }) {
  const genreList = Array.isArray(genres) ? genres : [];
  const navigate = useNavigate();

  const handleGenreClick = (genreId,genreName) => {
    navigate(`/genre/${genreId}`, { state: { genreName } });
  };
  return (
    <ul className=" z-10 inset-y-2 overflow-x-auto  box-border ">
      <li className=" m-2 text-white cursor-default flex justify-between border-b border-[#6E6E6E] pb-2">
        <div className="text-[#6E6E6E] text-sm">Released date:</div>
        <div className="text-white text-sm">{released || "N/A"}</div>
      </li>
      <li className="text-white m-2 flex justify-between border-b pb-2 border-[#6E6E6E]">
        <div className="cursor-default text-sm text-[#6E6E6E]">Genres:</div>
        
        <div className="text-sm text-white flex flex-wrap gap-2">
          {genreList.length > 0
            ? genreList.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id,genre.name)}
                  className="underline hover:text-yellow-400"
                >
                  {genre.name}
                </button>
              ))
            : "No genres available"}
        </div>
      </li>
    </ul>
  );
}

export default ViewMore;
