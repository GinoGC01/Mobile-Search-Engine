import React from 'react'

function MoviesList ({movies}) {
  return (
          (
            <ul>
              {
                movies.map(movie => {
                  return(
                  <li key={movie.id}>
                    <div className="title">
                      <h3>{movie.title}</h3>
                      <p>{movie.year}</p>
                    </div>
                      <img src={movie.poster} alt={movie.title} />
                  </li>
                  )

                })
              }
            </ul>
          )
  )
}

function NoMoviesResult(){
    return(<p>No se encontró una pelicula para esta busqueda</p>)
}

export function Movies({movies}){
    const hasMovies = movies?.length > 0

    return(
        hasMovies
        ? <MoviesList movies={movies}/>
        : <NoMoviesResult/>
    )
}