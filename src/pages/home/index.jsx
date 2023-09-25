import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Carousel from "../../components/Carousel";
import Categorias from "../../components/Categorias";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);

    return (
        <>
            <Navbar/>
            <Header/>
            <Carousel/>
            <Categorias/>
            <div className="Filmes">
                <div className="Destaque">
                    <h1>Filmes e séries Populares da plataforma:</h1>
                </div>
                {movies.map((movie) => {
                    return (
                        <div className="Filme" key={movie.id}>
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt="{movie.title}"
                            />
                            <span className="Titulo">{movie.title}</span>
                            <div className="info"> 
                                <span className="Data">Data de lançamento: {movie.release_date}</span>
                                <span className="Nota">Nota: {movie.vote_average}</span>
                                <span className="Idioma">Idioma: {movie.original_language}</span>
                                <span className="Popularidade">Popularidade: {movie.popularity}</span>
                            </div>
                            <Link to={`/${movie.id}`} className="">
                                <button className="btnVer">Saiba mais...</button>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <Footer/>
        </>
    );
}

export default Home;
