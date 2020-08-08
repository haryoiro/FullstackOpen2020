import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
// queries
import {
  ADD_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
} from '../queries'

const NewBook = ({ setError, show, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [changeBookForm, result] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0])
      }
    },
    update: (store, res) => {
      updateCacheWith(res.data.addedBook)
    }
  })

  if (!show) return null
  if (result.loading) return <div>Now Loading... </div>

  const submit = async (event) => {
    event.preventDefault()

    console.log('Create Book Successfuly')
    changeBookForm({ variables: { title, published: parseInt(published), name: author, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook