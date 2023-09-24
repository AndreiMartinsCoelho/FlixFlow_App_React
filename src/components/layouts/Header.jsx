import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setShowResults(true); // show the search results
        });
    } else {
      setShowResults(false); // hide the search results
    }
  }, [searchTerm, KEY]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSearchTerm("");
    setMovies([]);
    setShowResults(false); // hide the search results
  };

  useEffect(() => {
    const handleEasterEgg = (event) => {
      console.log(event.code);
      const sequence = ["KeyO", "KeyX", "KeyO", "KeyO"];
      let index = 0;

      if (event.code === sequence[index]) {
        index++;

        if (index === sequence.length) {
          setSearchTerm("460465");
          setShowResults(true);
        }
      } else {
        index = 0;
      }
    };

    document.addEventListener("keydown", handleEasterEgg);

    return () => {
      document.removeEventListener("keydown", handleEasterEgg);
    };
  }, []);

  return (
    <>
      <header className="Header">
        <form onSubmit={handleSearch} className="Pesquisar">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar..."
            className="InputPes"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <input type="submit" value="Pesquisar" className="BtnPes" />
          {showResults && (
            <button onClick={handleClear} className="BtnLimpar">
              X
            </button>
          )}
        </form>
      </header>
      {showResults && (
        <div className="ResultadoFilmes">
          <h2 className="ResultadoH1">Resultados da sua Pesquisa:</h2>
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

export default Header;
