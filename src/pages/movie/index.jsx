import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import Navbar from "../../components/layouts/Navbar";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${KEY}&language=pt-BR&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, [KEY, id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setGenres(data.genres);
      })
      .catch((err) => console.error(err));
  }, [KEY, id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        const trailer = data.results.find((video) => video.type === "Trailer");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error(err));
  }, [KEY, id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.error(err));
  }, [KEY, id]);

  return (
    <>
      <Navbar />
      <Header />
      <div className="Filmes">
        <div className="Destaque2">
          <h1>Sobre o Filme:</h1>
          <Link to="/">
              <button className="link_button">Voltar</button>
          </Link>
        </div>
        <div className="Filme2">
          <img
            className="img_movie"
            src={`${imagePath}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="info">
            {genres.length > 0 && (
              <span className="D">
                {genres.map((genre) => (
                  <span key={genre.id} className="genNome">
                    {genre.name}{" "}
                  </span>
                ))}
              </span>
            )}
            <span className="D">Data de lançamento: {movie.release_date}</span>
            <span className="D">Nota: {movie.vote_average}</span>
            <span className="D">Idioma: {movie.original_language}</span>
            <span className="D">Duração: {movie.runtime} minutos</span>
            <span className="D">
              Lucro: {movie.revenue - movie.budget} dólares
            </span>
            <span className="D">Popularidade: {movie.popularity}</span>
            <span className="D">Descrição: {movie.overview}</span>
            <span className="D">Status: {movie.status}</span>
            <span className="D">Orçamento: {movie.budget} dólares</span>
            <span className="D">Receita: {movie.revenue} dólares</span>
            {trailerKey && (
              <div className="trailer">
                <h2>Trailer:</h2>
                <iframe
                  className="trailer"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className="related-movies">
          <div className="movie-grid">
          <h2>Filmes Relacionados:</h2>
            {similarMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="Filme3">
                <img
                  src={`${imagePath}${movie.poster_path}`}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Movie;
