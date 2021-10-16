import React, { useState, useEffect } from 'react';
import Style from '../addProduct/addProduct.module.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [prev, setPrev] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}products/${id}`).then((res) => {
      setProduct(res.data.data[0]);
    });
  }, [id]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const gambar = e.target.files[0];
    if (
      gambar.size > 1024 * 100 ||
      (gambar.type !== 'image/png' && gambar.type !== 'image/jpg' && gambar.type !== 'image/jpeg')
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong format image, make sure that your image size not more than 100kb and only .jpg or .png accepted!',
      });
    } else {
      setProduct({ ...product, gambar: e.target.files[0] });
      setPrev(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmit = () => {
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
      .put(`${process.env.REACT_APP_API_URL}products/${id}`, formData, config)
      .then(() => {
        Swal.fire('Saved!', 'Successfuly edit product', 'success');
        history.push(`/product/${id}`);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || err.response.data.error.message,
        });
      });
  };
  return (
    <div className={Style.container}>
      <h1 className="fc-4">Edit Product</h1>
      <div className={Style.inputList}>
        <div>
          <div>
            <p className="fs-25 fc-4">Nama</p>
            <input
              className={Style.inputBox}
              type="text"
              name="nama"
              placeholder="Nama"
              onChange={handleChange}
              value={product.nama}
            />
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
              value={product.stok}
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
              value={product.harga_jual}
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
              value={product.harga_beli}
            />
          </div>
        </div>
        <div className={Style.gambarInput}>
          <p className="fs-25 fc-4">Gambar</p>
          <div className={Style.gambarBox}>
            <img className={Style.gambar} src={prev ? prev : product.gambar} alt="product" />
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
        Edit Produk
      </button>
    </div>
  );
};

export default EditProduct;
