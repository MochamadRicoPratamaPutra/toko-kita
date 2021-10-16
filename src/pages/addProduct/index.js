import React, { useState } from 'react';
import Style from './addProduct.module.css';
import axios from 'axios';
import DefaultProduct from '../../assets/product.png';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const AddProduct = () => {
  const history = useHistory()
  const [product, setProduct] = useState({
    nama: '',
    stok: 0,
    harga_jual: 0,
    harga_beli: 0,
    gambar: null,
  });
  const [prev, setPrev] = useState(null);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setProduct({ ...product, gambar: e.target.files[0] });
    setPrev(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = () => {
    console.log(product)
    const gambar = product.gambar
    if (
      product.name === '' ||
      product.stok === 0 ||
      product.harga_jual === 0 ||
      product.harga_beli === 0 ||
      product.gambar === null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to fill all the form to add the product!',
      })      
    } else if(gambar.size > 1024*100 || (gambar.type !== 'image/png' && gambar.type !== 'image/jpg' && gambar.type !== 'image/jpeg')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong format image, make sure that your image size not more than 100kb and only .jpg or .png accepted!',
      }) 
    }else {
      const formData = new FormData();
      formData.append('nama', product.nama);
      formData.append('gambar', product.gambar);
      formData.append('harga_jual', product.harga_jual);
      formData.append('harga_beli', product.harga_beli);
      formData.append('stok', product.stok);
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}products`, formData, config)
        .then(() => {
          history.push('/')
          Swal.fire('Saved!', 'Successfuly adding product', 'success')

        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message ||  err.response.data.error.message,
          }) 
        });
    }
  };
  return (
    <div className={Style.container}>
      <h1 className="fc-4">Add Product</h1>
      <div className={Style.inputList}>
        <div>
          <div>
            <p className="fs-25 fc-4">Nama</p>
            <input className={Style.inputBox} type="text" name="nama" placeholder="Nama" onChange={handleChange} />
          </div>
          <div>
            <p className="fs-25 fc-4">Stok</p>
            <input
              className={Style.inputBox}
              type="number"
              min={0}
              name="stok"
              placeholder="Stok"
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="fs-25 fc-4">Harga Jual</p>
            <input
              className={Style.inputBox}
              type="number"
              min={0}
              name="harga_jual"
              placeholder="Harga Jual"
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="fs-25 fc-4">Harga Beli</p>
            <input
              className={Style.inputBox}
              type="number"
              min={0}
              name="harga_beli"
              placeholder="Harga Beli"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Style.gambarInput}>
          <p className="fs-25 fc-4">Gambar</p>
          <div className={Style.gambarBox}>
            <img className={Style.gambar} src={prev ? prev : DefaultProduct} alt="product" />
          </div>
          <label className={`${Style.button} fs-25 fc-4`} htmlFor="gambar">
            Upload Gambar
          </label>
          <input
            className={Style.none}
            type="file"
            name="gambar"
            id="gambar"
            placeholder="Gambar"
            onChange={handleImage}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className={`${Style.button} fs-25 fc-4 ${Style.confirmation}`}>
        Tambah Produk
      </button>
    </div>
  );
};

export default AddProduct;
