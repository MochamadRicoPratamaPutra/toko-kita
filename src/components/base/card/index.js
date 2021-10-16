import React from 'react';
import Style from './card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ gambar, nama, harga_jual, id }) => {
  let trimString = function (string, length) {
    return string.length > length ? string.substring(0, length) + '...' : string;
  };
  return (
    <Link to={`/product/${id}`} className={Style.container}>
      <img
        src={gambar}
        alt="gambar"
        className={Style.posterCard}
      />
      <div className={Style.info}>
        <p className={Style.title}>{trimString(nama, 15)}</p>
        <p className={Style.type}>harga jual: {harga_jual}</p>
      </div>
    </Link>
  );
};

export default Card;
