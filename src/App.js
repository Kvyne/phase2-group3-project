import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MovieHeader from './components/MovieHeader';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import NavBar from './components/NavBar';




const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const URL = `http://www.omdbapi.com/?s=${searchValue}&apikey=114372bb`;
    const response = await fetch(URL);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);
  
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
  
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  
  return (
    
    
    <div className='container-fluid'>
      <NavBar /> {/* Include the NavBar component */}
      <div>
        <MovieHeader heading="Movies" />
      </div>
      <div>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
     

     <div className='container-fluid movie-app' >
     <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
     </div>
      
      
      <div>
        <MovieHeader heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;


