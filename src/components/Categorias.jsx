import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./assets/CSS/filmes.css";

function Categorias() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((err) => console.error(err));
  }, [KEY]);

  useEffect(() => {
    if (selectedGenre) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre.id}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setShowResults(true); // show the search results
        })
        .catch((err) => console.error(err));
    } else {
      setShowResults(false);
    }
  }, [KEY, selectedGenre]);

  const handleClear = () => {
    setSelectedGenre(null);
    setMovies([]);
    setShowResults(false); // hide the search results
  };

  return (
    <>
      <div className="generos">
        <h1>Categorias de filmes:</h1>
        {showResults && (
          <button onClick={handleClear} className="BtnLi">
            Limpar categoria
          </button>
        )}
        <select
          value={selectedGenre ? selectedGenre.id : ""}
          onChange={(event) =>
            setSelectedGenre(
              genres.find((genre) => genre.id === parseInt(event.target.value))
            )
          }
        >
          <option value="">Categorias</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {selectedGenre && (
        <div className="ResultadoFilmes2">
          <h1>Filmes da categoria de {selectedGenre.name}:</h1>
          {movies.map((movie) => (
            <div key={movie.id} className="Filme">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span className="Titulo">{movie.title}</span>
              <div className="info">
                <span className="Data">
                  Data de lançamento: {movie.release_date}
                </span>
                <span className="Nota">Nota: {movie.vote_average}</span>
                <span className="Idioma">
                  Idioma: {movie.original_language}
                </span>
                <span className="Popularidade">
                  Popularidade: {movie.popularity}
                </span>
              </div>
              <Link to={`/${movie.id}`} className="">
                <button className="btnVer">Saiba mais...</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Categorias;