import React, { useState } from 'react';
import Style from './login.module.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
  const history = useHistory()
  const [changeReg, setChangeReg] = useState(0);
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const handleSwitch = () => {
    if (changeReg === 0) {
      setChangeReg(1);
    } else {
      setChangeReg(0);
    }
  };
  const handleChange = (e) => {
    if (changeReg === 0) {
      setLogin({ ...login, [e.target.name]: e.target.value });
    } else {
      setRegister({ ...register, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = () => {
    if (changeReg === 0) {
      axios.post(`${process.env.REACT_APP_API_URL}users/login`, login)
      .then((result) => {
        localStorage.setItem('token', result.data.data.token)
        Swal.fire('Welcome', 'Successfuly login!', 'success');
        history.push('/')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || err.response.data.error.message,
        });
      })
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}users/register`, register)
      .then(() => {
        Swal.fire('Successfuly Register!', 'Please login with email that you use to register', 'success');
        setChangeReg(0)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || err.response.data.error.message,
        });
      })
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.box}>
        <h1 className={`${Style.title} fc-4`}>Toko Kita</h1>
        <p className={`fs-25 fc-4`}>{changeReg === 0 ? 'Login' : 'Register'}</p>
        <div>
          <p className="fs-25 fc-4">Email</p>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={Style.inputBox}
            onChange={handleChange}
            value={changeReg === 0 ? login.email : register.email}
          />
        </div>
        <div className={changeReg === 0 ? Style.none : null}>
          <p className="fs-25 fc-4">Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={Style.inputBox}
            onChange={handleChange}
            value={register.name}
          />
        </div>
        <div>
          <p className="fs-25 fc-4">Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={Style.inputBox}
            onChange={handleChange}
            value={changeReg === 0 ? login.password : register.password}
          />
        </div>
        <button className={Style.button} onClick={handleSubmit}>
          {changeReg === 0 ? 'Sign in' : 'Sign Up'}
        </button>
        <button className={`${Style.button} ${Style.colorReg}`} onClick={handleSwitch}>
          {changeReg === 0 ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
