import { useState, useRef, useCallback, useMemo } from 'react'
import {serchMovies} from '../services/Movies'


export default function useMovies({query, sort}) {
    const[movies, setMovies] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const previousSearch = useRef(query)

    const getMovies = useCallback( async ({query})=>{
        if(query === previousSearch.current) return
  
        // comienza / intenta
        try{
          setLoading(true)
          setError(null)
          previousSearch.current = query
          const newMovies = await serchMovies({query})
          setMovies(newMovies)
        } 
        // por si hay error
        catch(e){
          setError(e.message)
        }
        // finalmente
        finally{
          setLoading(false)
        }
  
      }
    ,[query]) 

    const sortedMovies = useMemo(()=>{
      return sort 
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
    },[sort, movies])
    
    return {movies: sortedMovies, getMovies, loading, error}
}
