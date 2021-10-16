import React from 'react';
import Style from './footer.module.css';
const Footer = () => {
  return (
    <footer className={Style.container}>
      <p className={`f-20 ${Style.footer}`}>Toko Kita</p>
    </footer>
  );
};

export default Footer;