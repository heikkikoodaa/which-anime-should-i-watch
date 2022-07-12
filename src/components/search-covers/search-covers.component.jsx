import { useEffect, useState } from 'react';

import CoverCard from '../covercard/covercard.component';

import './search-covers.styles.scss';

const SearchCovers = ({ searchQuery, genre }) => {
  const [animeData, setAnimeData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [page, setPage] = useState(1);
  const [fetchUrl, setFetchUrl] = useState(
    `https://api.jikan.moe/v4/anime?page=1&sfw=1&genres=${genre}`
  );
  const [filteredAnimeData, setFilteredAnimeData] = useState(animeData);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 429) {
          alert(
            'You are making too many requests. Please wait before attempting to fetch again!'
          );
          throw new Error('You are making too many requests');
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

  useEffect(() => {
    setFetchUrl(
      `https://api.jikan.moe/v4/anime?page=${page}&sfw=1&genres=${genre}`
    );
  }, [page]);

  const seriesCovers = filteredAnimeData.map((series) => {
    return <CoverCard key={series.mal_id} data={series} />;
  });

  const handlePageIncrement = () => {
    if (page <= last_visible_page) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageDecrement = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const hasNextPage = paginationData.has_next_page;
  const { current_page, last_visible_page } = paginationData;

  const navigationDisplayStyle = page === 1 ? 'hidden' : 'visible';

  return (
    <div className="search--cover-container">
      <div className="covers">{seriesCovers}</div>
      {!searchQuery ? (
        <span>{`Page ${current_page} out of ${last_visible_page}`}</span>
      ) : null}
      <div className="navigation-container">
        <div
          style={{ visibility: navigationDisplayStyle }}
          className="navigation-button"
          onClick={handlePageDecrement}
        >
          &lt;
        </div>
        {hasNextPage ? (
          <div className="navigation-button" onClick={handlePageIncrement}>
            &gt;
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchCovers;
