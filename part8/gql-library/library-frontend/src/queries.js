import { gql } from '@apollo/client'

/* Fragments */
export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    id
  }
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      title
      published
      genres
      author {
        name
        id
      }
      id
  }
`

/* Queries */
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const RECOMMEND_BOOKS = gql`
  query allBooks($genre: String!){
    allBooks (genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const GET_CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`


/* Mutations */
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $name: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      name: $name,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHORS_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo,
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      value
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
