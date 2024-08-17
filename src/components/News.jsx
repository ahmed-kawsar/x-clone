'use client'

import { useEffect, useState } from 'react'

function News() {
  const [news, setNews] = useState([])
  const [articleNum, setArticleNum] = useState(3)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(
      'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        setNews(data.articles)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className='text-gray-700 space-y-2 bg-gray-100 pt-2 rounded-xl'>
      <h4 className='font-bold text-xl p-3'>Whats happening?</h4>
      {news.slice(0, articleNum).map((article) => (
        <div
          key={article.url}
          className='flex items-center justify-between px-3 py-2 hover:bg-gray-200'
        >
          <a href={article.url} target='_blank'>
            <h6 className='font-semibold text-sm'>{article.title}</h6>
            <p className='text-xs'>{article.source.name}</p>
          </a>
          <img
            src={article.urlToImage}
            alt={article.title}
            width={70}
            className='rounded'
          />
        </div>
      ))}
      <div className='flex justify-center py-3'>
        <button
          className='text-blue-400'
          onClick={() => setArticleNum(articleNum + 3)}
        >
          Load more
        </button>
      </div>
    </div>
  )
}

export default News
