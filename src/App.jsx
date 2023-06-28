import './App.css'
import { Movies } from './components/Movies'
import {useSearch} from './Hooks/useSearch'
import useMovies from './Hooks/useMovies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const {query, inputError, setQuery} = useSearch()
  const {movies, getMovies, error, loading} = useMovies({query, sort})

  const debauncedGetMuvies = useCallback(

  debounce(query =>{
      console.log('search', query)
      getMovies({ query })
    }, 350)
  , []
  )

  const handleSubmit = (e)=>{
    e.preventDefault()
    getMovies({query})

  }
  const handleChange = (e)=>{
    const newQuery = e.target.value
    setQuery(newQuery) 
    debauncedGetMuvies(newQuery)
  }

  const handleSort = ()=>{
    setSort(!sort)
  }

 

  return (
    <section className='page'>
      <header className="App">
        <h1>Mobie Search Engine</h1>
        <form onSubmit={handleSubmit}>
          <input style={{border:'1px solid transparent', borderColor: inputError ? 'red' : 'transparent'}} value={query} onChange={handleChange} name='query' type="text" placeholder='Avengers, Star Wars, The Matrix...'/>
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Search</button>
        </form>
        {inputError && <p style={{color:'red'}}>{inputError}</p>}
        {error && <p style={{color:'red'}}>{error}</p>}

      </header>
      <main>
        {loading? <p>loading movies...</p> : <Movies movies={movies}/>}
      </main>
    </section>

  )
}

export default App
 