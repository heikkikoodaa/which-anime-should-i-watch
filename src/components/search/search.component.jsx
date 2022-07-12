import { useState, useEffect } from 'react';

import { ReactComponent as Creature } from '../../assets/creature.svg';

import './search.styles.scss';
import FeaturedCarousel from '../featured-carousel/featured-carousel.component';
import SearchCovers from '../search-covers/search-covers.component';

const Search = () => {
  const [searchParams, setSearchParams] = useState('');
  const [genre, setGenre] = useState('');

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch('https://api.jikan.moe/v4/genres/anime');
  //       const data = await response.json();
  //       console.log(data);
  //       setGenre(data.data[Math.floor(Math.random() * data.data.length)].name);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getData();
  // }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);

    setSearchParams(value);
  };

  return (
    <div className="search">
      <Creature className="search--creature" />
      <div className="search--form-container">
        <input
          type="text"
          placeholder="Type something..."
          className="search--input"
          value={searchParams}
          onChange={handleChange}
        />
      </div>
      <span
        style={{
          margin: '40px',
          display: 'block',
          color: '#8CCEB8',
          fontWeight: '800',
          fontSize: '1.8rem',
        }}
      >
        OR
      </span>
      <p style={{ color: '#8CCEB8', fontSize: '1.7rem' }}>
        just try to click some tags!
      </p>
      {/* TAG COMPONENTS GO HERE */}
      <span>
        Random category: <strong>{genre}</strong>
      </span>
      <SearchCovers searchQuery={searchParams} genre={genre} />
      <p>Can't decide? Check out the random featured!</p>
      <FeaturedCarousel />
    </div>
  );
};

export default Search;
