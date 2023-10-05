import React, { useState, useEffect } from "react";
import "../assets/CSS/filmes.css";
import { Link } from "react-router-dom";
import {BsMic} from "react-icons/bs";
import ReactPlayer from "react-player";


function Header() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [music2Url, setMusic2Url] = useState("");
  const [music3Url, setMusic3Url] = useState("");
  const [music4Url, setMusic4Url] = useState("");
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

  useEffect(() => {
    if (searchTerm.toLowerCase() === "mortal kombat") {
      setMusicUrl("https://www.youtube.com/watch?v=YBBbjKVbeIw&ab_channel=MrAndersonZG");
    } else {
      setMusicUrl("");
    }
  }, [searchTerm]);

  useEffect(()=>{
    if (searchTerm.toLowerCase() === "imortal tricolor") {
      setMusic2Url("https://www.youtube.com/watch?v=63alIv2II1M&ab_channel=golaudio");
    } else {
      setMusic2Url("");
    }
  },[searchTerm]);

  useEffect(()=>{
    if (searchTerm.toLowerCase() === "jacaré") {
      setMusic3Url("https://youtu.be/XwfW8ZHLzGM?si=BMMdU6NY3aCb1ISI");
    } else {
      setMusic3Url("");
    }
  },[searchTerm]);

  useEffect(()=>{
    if (searchTerm.toLowerCase() === "homem") {
      setMusic4Url("https://youtu.be/Bn_JFlWi_LI?si=6JivlB6sI7_tjXNx");
    }else{
      setMusic4Url("");
    }
  },[searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSearchTerm("");
    setMovies([]);
    setShowResults(false); // hide the search results
  };

  //Função para pesquisar por voz
  const handleVoiceSearch = () => {
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('overlay');
    document.body.appendChild(overlayDiv);

    const message = document.createElement('p');
    message.classList.add('message');
    message.innerText = 'Por favor! Fale algo para pesquisar...';
    overlayDiv.appendChild(message);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'Fechar';
    closeButton.addEventListener('click', () => {
        overlayDiv.classList.remove('active'); // Remove a classe 'active'
    });

    overlayDiv.appendChild(closeButton);
    setTimeout(() => {
        overlayDiv.classList.add('active');
    }, 50);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setSearchTerm(result);

        // Remover a div overlay após obter o resultado
        overlayDiv.classList.remove('active');
        setTimeout(() => {
            overlayDiv.remove();
        }, 300);
    };
    recognition.onerror = (event) => {
        console.error(event.error);
        overlayDiv.classList.remove('active');
        setTimeout(() => {
            overlayDiv.remove();
        }, 300);
    };
    recognition.start();
}; 
  
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
          <button onClick={handleVoiceSearch} className="BtnMic">
            <span className="fa fa-microphone">
              <BsMic/>
            </span>
          </button>
        </form>
      </header>
      {showResults && (
        <>
          <div className="ResultadoFilmes">
          {showResults && (
            <button onClick={handleClear} className="BtnLimpar">
              Limpar pesquisa
            </button>
            )}
            <h2 className="ResultadoH1">Resultados da sua Pesquisa:</h2>
            {musicUrl && (
              <div className="meme">
                <ReactPlayer url={musicUrl} playing loop className="memes" />
              </div>
            )}
            {music2Url && (
              <div className="meme">
                <ReactPlayer url={music2Url} playing loop className="memes" />
              </div>
            )}
            {music3Url && (
              <div className="meme">
                <ReactPlayer url={music3Url} playing loop className="memes" />
              </div>
            )}
            {music4Url && (
              <div className="meme">
                <ReactPlayer url={music4Url} playing loop className="memes" />
              </div>
            )}
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
        </>
      )}
    </>
  );
}

export default Header;
