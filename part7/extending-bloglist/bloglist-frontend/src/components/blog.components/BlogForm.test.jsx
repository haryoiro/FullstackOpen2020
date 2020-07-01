import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import BlogForm from 'BlogForm'

describe('<BlogForm />', () => {
  test('意図したフォームの正しいイベントハンドラを呼び出せる', () => {
    const handleSubmit = jest.fn()
    const author = render(<BlogFrom handleSubmit={handleSubmit} />)
  })
})

