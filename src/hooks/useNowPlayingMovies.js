import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import { requestOptions } from '../constants'

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()

    const fetchData = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing', requestOptions)
        const jsonData = await data.json()
        dispatch(addNowPlayingMovies(jsonData.results))
    }

    useEffect(() => {
        fetchData()
    }, [])
}

export default useNowPlayingMovies