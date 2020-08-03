import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
fragment PersonDetails on Person {
  id
  name
  phone
  address {
    street
    city
  }
}
`

