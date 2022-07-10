import { useEffect, useState } from 'react';

import CoverCard from '../covercard/covercard.component';

import './search-covers.styles.scss';

const SearchCovers = ({ searchQuery }) => {
  const [animeData, setAnimeData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [page, setPage] = useState(1);
  const [fetchUrl, setFetchUrl] = useState(
    'https://api.jikan.moe/v4/anime?page=1&sfw=1'
  );
  const [filteredAnimeData, setFilteredAnimeData] = useState(animeData);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong!');
      })
      .then((responseJson) => {
        setAnimeData(responseJson.data);
        setPaginationData(responseJson.pagination);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchUrl]);

  useEffect(() => {
    const newFilteredAnimeData = animeData.filter((data) => {
      return data.title.toLocaleLowerCase().includes(searchQuery);
    });

    setFilteredAnimeData(newFilteredAnimeData);
  }, [animeData, searchQuery]);

  const seriesCovers = filteredAnimeData.map((series) => {
    return <CoverCard key={series.mal_id} data={series} />;
  });

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1);
    setFetchUrl(`https://api.jikan.moe/v4/anime?page=${page}&sfw=1`);
  };

  const hasNextPage = paginationData.has_next_page;
  const { current_page, last_visible_page } = paginationData;

  return (
    <div className="search--cover-container">
      <div className="covers">{seriesCovers}</div>
      {!searchQuery ? (
        <span>{`Page ${current_page} out of ${last_visible_page}`}</span>
      ) : null}
      {hasNextPage && !searchQuery ? (
        <div onClick={handleClick} className="search--loadmore-button">
          &or;
        </div>
      ) : null}
    </div>
  );
};

export default SearchCovers;
