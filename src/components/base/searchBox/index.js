import React, { useState } from 'react';
import Style from './searchBox.module.css';
import SearchLogo from '../../../assets/search.png';
import { useHistory } from 'react-router';

const SearchBox = ({ searchDisplay }) => {
  const [search, setSearch] = useState(null);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?keyword=${search}`);
  };
  return (
    <form className={searchDisplay ? Style.container : Style.none} onSubmit={handleSubmit}>
      <input type="text" className={Style.searchBox} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <button className={Style.buttonSearch} disabled={search ? false : true}>
        <img src={SearchLogo} alt="search" />
      </button>
    </form>
  );
};

export default SearchBox;
