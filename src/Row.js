import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          const shouldRenderImage =
            (isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path);

          return shouldRenderImage ? (
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              key={movie.id}
              src={`${base_url}${
                isLargeRow ?  
                movie.backdrop_path : movie.poster_path 
                //  movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Row;
