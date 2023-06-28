import { useEffect, useState, useRef } from 'react'


export const useSearch =  () => {
    const [query, setQuery] = useState('')
    const [inputError, setInputError] = useState(null)
    const isFirstInput = useRef(true)
    
  
    useEffect(()=>{
      if(isFirstInput.current){
        isFirstInput.current = query === ""
        return
      }
      if(query === ""){
        setInputError('No se puede buscar una pelicula vacía')
        return
      }
  
      if(query.match(/^\d+$/)){
        setInputError('No se puede buscar una película con un número')
        return
      }
  
      if(query.length < 5){
        setInputError('La busqueda debe tener mas de 5 caracteres')
        return
      }
  
      setInputError(null)
    },[query])
  
  
    return{query, inputError, setQuery}
  }