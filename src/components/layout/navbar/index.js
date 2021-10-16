import React from 'react';
import Style from './header.module.css';
import SearchBox from '../../base/searchBox';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const Navbar = ({search}) => {
  const token = localStorage.getItem('token')
  const history = useHistory()
  const handleLogout = () => {
    localStorage.removeItem('token')
    Swal.fire('Succeessfuly logout', 'we will miss you!', 'success')
    history.push('/')
  }
  return (
    <div className={Style.container}>
      <Link to='/' className={Style.text}>Toko Kita</Link>
      <SearchBox searchDisplay={search}/>
      <Link to='/auth' className={`${token ? Style.none : Style.text}`}>
        Login
      </Link>
      <p className={`${token ? Style.text : Style.none}`} onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
};

export default Navbar;
