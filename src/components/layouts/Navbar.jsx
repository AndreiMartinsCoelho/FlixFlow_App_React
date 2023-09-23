import "../assets/CSS/filmes.css";
import React, { useState } from "react";
import { BsBellFill, BsMask, BsDownload } from "react-icons/bs";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="ver">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <g filter="url(#filter0_d_2_7)">
              <rect x="4" y="2" width="16" height="16" rx="3" fill="#0F0F0F" />
              <rect
                x="5"
                y="3"
                width="14"
                height="14"
                rx="2"
                stroke="white"
                stroke-width="2"
              />
            </g>
            <g filter="url(#filter1_d_2_7)">
              <circle cx="19" cy="3" r="3" fill="#FF0000" />
            </g>
            <defs>
              <filter
                id="filter0_d_2_7"
                x="0"
                y="2"
                width="24"
                height="24"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_7"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_7"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_d_2_7"
                x="12"
                y="0"
                width="14"
                height="14"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_7"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_7"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <a href="/" className="navbar-logo">
          <img
            src={require("../assets/img/FlixFlow.png")}
            alt="Logo do site..."
          />
        </a>
        <div className={`navbar-link ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li className="navbar-items" onClick={() => setIsOpen(false)}>
              <img
                src={require("../assets/img/iconPerfil.png")}
                alt="Foto de perfil..."
              />
              <p className="active" href="/">
                Andrei.E Martins
              </p>
            </li>
            <li className="navbar-items">
              <BsBellFill className="iconNoti"/>
              <a href="/">Notificação ativa</a>
            </li>
            <li className="navbar-items">
              <BsMask className="iconNoti"/>
              <a href="/">Tema Todo Claro</a>
            </li>
            <li className="navbar-items">
              <BsDownload className="iconNoti"/>
              <a href="/"> Seus Downloads</a>
            </li>
          </ul>
        </div>
        <div className="Mobile" onClick={toggleMenu}>
          <div className="Btn-1">
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
