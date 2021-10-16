import React, { useEffect, useState } from 'react';
import Style from './search.module.css';
import { useLocation } from 'react-router';
import axios from 'axios';
import qs from 'query-string';
import Card from '../../components/base/card';
import Swal from 'sweetalert2';

const Search = () => {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const { keyword } = qs.parse(location.search);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}products?search=nama&keyword=${keyword}`)
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || err.response.data.error.message,
        });
      });
  }, [keyword]);
  console.log(result)
  return (
    <div className={Style.container}>
      <h1 className='fc-4'>Did you search for '{keyword}'?</h1>
      <div className={Style.cardContainer}>
        {result.map((item) => (
          <Card id={item.id} nama={item.nama} gambar={item.gambar} harga_jual={item.harga_jual} />
        ))}
      </div>
    </div>
  );
};

export default Search;
