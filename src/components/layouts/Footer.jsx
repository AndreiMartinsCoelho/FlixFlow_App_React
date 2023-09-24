import "../assets/CSS/filmes.css";
import {BsDiscord, BsTwitter, BsInstagram, BsGithub, BsYoutube} from "react-icons/bs";

function Footer (){
    return (
        <>
            <footer>
                <div className="footer-p1">
                    <h1>Pegue e ou conecte com as redes sociais:</h1>
                    <div className="redes">
                        <a href="https://youtu.be/XwfW8ZHLzGM?si=3MfR8KIbFXN2hH9R"><BsDiscord/></a>
                        <a href="https://twitter.com/comunidademc/status/1702057101525234088"><BsTwitter/></a>
                        <a href="https://pt.wikipedia.org/wiki/Capivara"><BsInstagram/></a>
                        <a href="https://youtu.be/69RdQFDuYPI?si=QIlt3RLy3q0bf-ye"><BsGithub/></a>
                        <a href="https://youtu.be/7XlJrtYuHuM?si=cXgVZrZ3n29UoDFl"><BsYoutube/></a>
                    </div>
                </div>
                <div className="footer-p2">
                    <div className="footer-info">
                        <h1 className="Footer-Text">Sobre o site:</h1>
                        <p className="text-ney">
                            Este site foi desenvolvido com o intuito de ser um projeto de estudo, para aprimorar o conhecimento de React.JS
                        </p>
                    </div>
                    <div className="footer-info">
                        <h1 className="Footer-Text">Contatos:</h1>
                        <p>Email: adahahd@gmail.com</p>
                        <p>Telefone: (11) 99999-9999</p>
                        <p>Endereço: Rua Guerra nas estrelas - 1111</p>
                    </div>
                </div>
                <div className="footer-p3">
                    <h1>@ 2023 Copyright: Casimiro Flamenquista</h1>
                </div>
            </footer>
        </>
    )
}

export default Footer;