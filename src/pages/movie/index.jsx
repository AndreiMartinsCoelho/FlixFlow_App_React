import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import Navbar from "../../components/layouts/Navbar";
import Header from "../../components/layouts/Header";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState([]);
  const KEY = process.env.REACT_APP_KEY;
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        const res = data.results;
        let filme = res.find((key) => {
          // eslint-disable-next-line
          return key.id == id;
        });
        setMovie(filme);
      }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <div className="Filmes">
        <div className="Destaque2">
            <h1>Sobre o Filme:</h1>
        </div>
        <div className="Filme2">
          <img className="img_movie" src={`${imagePath}${movie.poster_path}`} alt="{movie.title}"/>
          <div className="info">
            <span className="T">{movie.title}</span>
            <span className="D">Data de lançamento: {movie.release_date}</span>
            <span className="D">Nota: {movie.vote_average}</span>
            <span className="D">Idioma: {movie.original_language}</span>
            <span className="D">Duração: {movie.runtime} minutos</span>
            <span className="D">Lucro: {movie.revenue - movie.budget} dólares</span>
            <span className="D">Popularidade: {movie.popularity}</span>
            <span className="D">Descrição: {movie.overview}</span>
            <Link to="/">
                <button className="link_button">Voltar</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
