import { useEffect, useState } from 'react'
import SearchIcon from './assets/Search.svg'
import MovieCard from './MovieCard'

//bc148648 Api-key

const USER_API = 'http://www.omdbapi.com/?i=tt3896198&apikey=bc148648'


const movie1 = {

  "Title": "Batman: The Animated Series",
  "Year": "1992–1995",
  "imdbID": "tt0103359",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZmVkNDc3YjQtZDMzOS00MTNjLTljNzUtZDhjYWQxMmVlNjE5XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg"
}

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (tittle) => {
    const response = await fetch(`${USER_API}&s=${tittle}`)
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman');
  }, []);

  return (
    <>
      <div className='app'>
        <h1>MovieLand</h1>
        <div className="search">

          <input type="text" placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)}} />

          <img src={SearchIcon} alt="Search"
            onClick={() => {searchMovies(searchTerm)}} />

        </div>

        {
          movies.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
        }

      </div>
    </>
  )
}

export default App
