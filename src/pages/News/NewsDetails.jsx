"use client"
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { commonNews, socialNews, playNews, popularNews } from "./constants"

const NewsDetails = () => {
  const { id } = useParams()
  const location = useLocation()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setLoading(true)
      const searchParams = new URLSearchParams(location.search)
      const type = searchParams.get("type")

      console.log("Loading news details for:", id, "type:", type)

      let selectedNews
      switch (type) {
        case "common":
          selectedNews = commonNews.find((item) => item.id === Number.parseInt(id))
          break
        case "social":
          selectedNews = socialNews.find((item) => item.id === Number.parseInt(id))
          break
        case "play":
          selectedNews = playNews.find((item) => item.id === Number.parseInt(id))
          break
        case "popular":
          selectedNews = popularNews.find((item) => item.id === Number.parseInt(id))
          break
        default:
          // If type is not specified or invalid, search in all news arrays
          selectedNews =
            commonNews.find((item) => item.id === Number.parseInt(id)) ||
            socialNews.find((item) => item.id === Number.parseInt(id)) ||
            playNews.find((item) => item.id === Number.parseInt(id)) ||
            popularNews.find((item) => item.id === Number.parseInt(id))
      }

      if (selectedNews) {
        console.log("Found news:", selectedNews.title)
        setNews(selectedNews)
      } else {
        console.error("News not found for id:", id, "type:", type)
        setError("News not found")
      }
    } catch (err) {
      console.error("Error loading news:", err)
      setError("Error loading news")
    } finally {
      setLoading(false)
    }
  }, [id, location])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error || !news) {
    return <div className="error">Error: {error || "News not found"}</div>
  }

  return (
    <div className="news-details-container">
      <div className="news-details">
        <div className="back-links">
          <Link to="/news" className="back-link">
            <FaArrowLeft style={{marginRight:'10px'}}/>Back to News
          </Link>
        </div>
        <h1>{news.title}</h1>
        <div className="meta-info-details">
          <span>Uploaded: {news.uploadDate}</span> | <span>Writer: {news.writer}</span>
        </div>
        <div className="news-detail-image">
          <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} />
        </div>
        <div className="news-content">
          <p>{news.content}</p>
        </div>
      </div>
      <div className="related-news">
        <h2 className="sub-title">Related News</h2>
        {popularNews.slice(0, 3).map((item) => (
          <div key={`related-${item.id}`} className="news-item">
            <div className="news-item-content">
              <div className="news-image">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              </div>
              <div className="news-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link to={`/news_details/${item.id}?type=popular`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsDetails

