import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let updateLikes
  let handleDelete

  beforeEach(() => {
    updateLikes = jest.fn()
    handleDelete = jest.fn()
    const blog = {
      title: 'React test',
      author: '@react-testing-library',
      url: 'https://reactpatterns.com/',
      likes: 10,
    }
    component = render(
      <Blog
        blog={blog}
        updateLikes={updateLikes}
        handleDelete={handleDelete}
      />
    )
  })

  test('コンテンツがレンダリングされる', () => {
    expect(component.container).toHaveTextContent('React test')
  })

  test('レンダリング時タイトル以外のコンテンツは非表示', () => {
    const hideButton = component.getByText('HIDE')
    const contentDetail = component.container.querySelector('.blog-details')

    expect(contentDetail).toHaveStyle('display: none')
    expect(hideButton).toHaveStyle('display: none')
  })

  test('showボタンを押すとディテールを表示', () => {
    const hideButton = component.getByText('HIDE')
    const contentDetail = component.container.querySelector('.blog-details')

    fireEvent.click(hideButton)

    expect(hideButton).not.toHaveStyle('display: none')
    expect(contentDetail).not.toHaveStyle('display: none')
  })

  test('SHOWボタンがクリックされるとURLとLIKESの数が表示される', () => {
    const hideButton = component.getByText('HIDE')
    const contentDetail = component.container.querySelector('.blog-details')

    fireEvent.click(hideButton)

    expect(contentDetail).toHaveTextContent('https://reactpatterns.com/')
    expect(contentDetail).toHaveTextContent('10')
  })

  test('LIKEボタンが2回クリックされると、イベントハンドラが2回呼び出される', () => {
    const hideButton = component.getByText('HIDE')
    fireEvent.click(hideButton)

    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })

  test('BlogFormが正しいフォームを使用していることを確認する', () => {
    
  })
})