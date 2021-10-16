import React, { useEffect, useState } from 'react';
import Style from './home.module.css';
import { Link } from 'react-router-dom';
import Card from '../../components/base/card';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
  const [result, setResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [next, setNext] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}products?page=${pageNumber}&limit=4`)
      .then((res) => {
        setResult(res.data.data.result);
        setNext(res.data.data.next);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || err.response.data.error.message,
        });
      });
  }, [pageNumber]);
  const handlePagination = (type) => {
    if (type === 'minus') {
      setPageNumber((now) => now - 1);
    } else {
      setPageNumber((now) => now + 1);
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.row}>
        <h1 className="fc-4">Product</h1>
        <Link to="/add-product" className={`fs-25 fc-4 ${Style.add}`}>
          Add Product
        </Link>
      </div>
      <div className={Style.cardContainer}>
        {result.map((item) => (
          <Card id={item.id} nama={item.nama} gambar={item.gambar} harga_jual={item.harga_jual} />
        ))}
      </div>
      <div className={Style.pagination}>
        <button
          className={`${pageNumber - 1 === 0 ? Style.none : Style.paginationButton}`}
          onClick={() => handlePagination('minus')}
        >
          {pageNumber - 1}
        </button>
        <p className={Style.paginationButton}>{pageNumber}</p>
        <button className={`${next ? Style.paginationButton : Style.none}`} onClick={() => handlePagination('plus')}>
          {pageNumber + 1}
        </button>
      </div>
    </div>
  );
};

export default Home;
