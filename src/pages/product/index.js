import React, { useEffect, useState } from 'react';
import Style from './product.module.css';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const Product = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}products/${id}`).then((res) => {
      setProduct(res.data.data[0]);
    });
  }, [id]);
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
          axios.delete(`${process.env.REACT_APP_API_URL}products/${id}`, config).then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            history.push('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You dont have permission to do this',
          });
        }
      }
    });
  };
  return (
    <div className={Style.container}>
      <h1 className="fc-4">Product</h1>
      <div className={Style.row}>
        <img className={Style.gambar} src={product.gambar} alt="product" />
        <div className={Style.info}>
          <p className="fs-30 fc-4">{product.nama}</p>
          <p className="fs-25 fc-4">Harga Jual: {product.harga_jual}</p>
          <p className="fs-25 fc-4">Harga Beli: {product.harga_beli}</p>
          <p className="fs-25 fc-4">Stok: {product.stok}</p>
        </div>
      </div>
      <div className={Style.row}>
        <button className={`${Style.button} fs-25`} onClick={() => history.push(`/edit/${id}`)}>
          Edit
        </button>
        <button className={`${Style.button} fs-25 ${Style.delete}`} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
