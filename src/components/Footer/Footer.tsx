import React from "react";
import './Footer.css';
import logoduck from '../../assets/image/duck_logo.png'

const Footer = () => {
    return (
      <footer className="Footer">
        <div><img src={logoduck} alt="Logo" className="footer-logo" />
        <span className="footer-text">Quack & Coffee</span></div>
      </footer>
    );
  };
  
  export default Footer;











