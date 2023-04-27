import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import axios from "./axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= window.innerWidth - 200;
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += window.innerWidth - 200;
    }
  };

  const rowRef = useRef(null);

  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      console.log(`request`, request);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" ref={rowRef}>
      <button className="row__scrollLeft" onClick={scrollLeft}>
        &lt;
      </button>
        {movies.map((movie) => {
          const shouldRenderImage =
            (isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path);

          return shouldRenderImage ? (
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              key={movie.id}
              src={`${base_url}${
                isLargeRow ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            />
          ) : null;
        })}
      <button className="row__scrollRight" onClick={scrollRight}>
        &gt;
      </button>
      </div>
    </div>
  );
};

export default Row;
