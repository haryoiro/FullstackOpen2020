import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import BookList from './BookList'

import {
  GET_CURRENT_USER,
  RECOMMEND_BOOKS,
} from '../queries'

const Recommend = ({ setError, show }) => {
  const [loadRecommend, recommend]  = useLazyQuery(RECOMMEND_BOOKS)
  const [loadUser, user] = useLazyQuery(GET_CURRENT_USER)
  const [recommendedList, setRecommendedList] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')
  
  useEffect(() => {
    console.log(show)
    if (show) {
      if (!user.data)
        loadUser()
      if (recommendedList.length > 0) {
        recommend.refetch()
      }
    }

    if (!user.loading && user.data && user.data.me) {
      setFavoriteGenre(user.data.me.favoriteGenre)
      loadRecommend({ variables: { genre: user.data.me.favoriteGenre } })
    }

    if (recommend.data) setRecommendedList(recommend.data.allBooks)

  }, [show, user.loading, recommend.data])


  if (!show) return null
  if (user.loading || recommend.loading || !recommendedList) return "user loading"

  return (
    <>
      <h2>RECOMMENDATIONS</h2>
      <div>
        <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
        <BookList bookList={recommendedList} />
      </div>
    </>
  )
}

export default Recommend