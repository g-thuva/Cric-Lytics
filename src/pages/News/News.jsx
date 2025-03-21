"use client"

import { useState ,useEffect} from "react"
import { commonNews, socialNews, playNews, popularNews } from "./constants"
import { Link } from "react-router-dom"
import '../../css/News/News.css';
import { MoreHorizontal } from "lucide-react" 

const News = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [visibleNewsCount, setVisibleNewsCount] = useState(5) // Initially show 5 news items
  const [visiblePopularNewsCount, setVisiblePopularNewsCount] = useState(5) // Initially show 5 popular news items
  const [displayedPopularNews, setDisplayedPopularNews] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth) // Track screen width


    // Update screen width on resize
    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth)
      }
  
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])
  
    // Adjust visible news count based on screen width
    useEffect(() => {
      if (screenWidth < 768) {
        setVisibleNewsCount(3) // Show fewer items on smaller screens
        setVisiblePopularNewsCount(3)
      } else {
        setVisibleNewsCount(5) // Show more items on larger screens
        setVisiblePopularNewsCount(5)
      }
    }, [screenWidth])

    // Initialize displayed popular news on component mount
    useEffect(() => {
      setDisplayedPopularNews(popularNews.slice(0, visiblePopularNewsCount))
      console.log("Initial popular news count:", visiblePopularNewsCount)
      console.log("Initial displayed popular news:", popularNews.slice(0, visiblePopularNewsCount))
    }, [])
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
    setVisibleNewsCount(screenWidth < 768 ? 3 : 5) // Reset visible count when changing tabs
    }

  // Function to get news based on active tab
  const getNewsForActiveTab = () => {
    console.log("Getting news for tab:", activeTab)

    switch (activeTab) {
      case "common":
        return commonNews.map((news) => ({ ...news, key: `common-${news.id}`, category: "common" }))
      case "social":
        return socialNews.map((news) => ({ ...news, key: `social-${news.id}`, category:"social" }))
      case "play":
        return playNews.map((news) => ({ ...news, key: `play-${news.id}`, category : "play" }))
      case "all":
      default:
        // For "all" tab, combine all news and sort by date
        const allNews = [
          
          ...socialNews.map((news) => ({ ...news, key: `social-${news.id}`, category: "social" })),
          ...commonNews.map((news) => ({ ...news, key: `common-${news.id}`, category: "common" })),
          ...playNews.map((news) => ({ ...news, key: `play-${news.id}`, category: "play" })),
        ].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))

        console.log("All news count:", allNews.length)
        return allNews}
  }

 // Update displayed popular news when visiblePopularNewsCount changes
 useEffect(() => {
  const newDisplayedNews = popularNews
    .slice(0, visiblePopularNewsCount)
    .map((news) => ({ ...news, key: `popular-${news.id}` }))

  console.log("Updating displayed popular news:", newDisplayedNews.length)
  setDisplayedPopularNews(newDisplayedNews)
}, [visiblePopularNewsCount])

  const allNewsForTab = getNewsForActiveTab()
  const visibleNews = allNewsForTab.slice(0, visibleNewsCount)
  const hasMoreNews = visibleNewsCount < allNewsForTab.length
  const hasMorePopularNews = visiblePopularNewsCount < popularNews.length


  const loadMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + (screenWidth < 768 ? 2 : 5))
  }
  
  const loadMorePopularNews = () => {
    console.log("Loading more popular news")
    console.log("Current count:", visiblePopularNewsCount)
    console.log("Total popular news:", popularNews.length)
    setVisiblePopularNewsCount((prevCount) => prevCount + (screenWidth < 768 ? 2 : 5))
  }

  return (
    <div className="news-container">
      <div className="news-categories">
        
        <div className="category-buttons">
          <button
            className={`category-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All News
          </button>
          <button
            className={`category-button ${activeTab === "common" ? "active" : ""}`}
            onClick={() => handleTabChange("common")}
          >
            Common News
          </button>
          <button
            className={`category-button ${activeTab === "social" ? "active" : ""}`}
            onClick={() => handleTabChange("social")}
          >
            Social News
          </button>
          <button
            className={`category-button ${activeTab === "play" ? "active" : ""}`}
            onClick={() => handleTabChange("play")}
          >
            Play News
          </button>
        </div>
        <div className="news-list">
          <h2 className="sub-title" >
          {activeTab === "all"
              ? "All News"
              : activeTab === "common"
                ? "Common News"
                : activeTab === "social"
                  ? "Social News"
                  : "Play News"}{" "}
            
          </h2>
          {visibleNews.map((news) => (
            <div key={news.key} className="news-item">
            <div className="news-item-content">
              <div className="news-image">
                <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} />
              </div>
              <div className="news-text">
                <h3>{news.title}</h3>
                <p>{news.summary}</p>
                <div className="meta-info">
                  <span>Uploaded: {news.uploadDate}</span> | <span>Writer: {news.writer}</span>
                  {news.category && <span> | Category: {news.category}</span>}
                </div>
                <Link
                  to={`/news_details/${news.id}?type=${news.category}`}className="read-more"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
          ))}

          {hasMoreNews && (
            <div className="see-more-container">
              <button onClick={loadMoreNews} className="see-more-button">
                <MoreHorizontal size={24} strokeWidth={2} />
                <span>See More</span>
              </button>
            </div>
          )}    
        </div>
      </div>
      <div className="popular-news">
        <h2 className="sub-title">
          Popular News 
        </h2>
        {displayedPopularNews.map((news) => (
          <div key={news.key} className="news-item">
            <div className="news-item-content">
              <div className="news-image">
                <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} />
              </div>
              <div className="news-text">
                <h3>{news.title}</h3>
                <p>{news.summary}</p>
                <div className="meta-info">
                  <span>Uploaded: {news.uploadDate}</span> | <span>Writer: {news.writer}</span>
                </div>
                <Link to={`/news_details/${news.id}?type=popular`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
        {hasMorePopularNews && (
          <div className="see-more-container">
            <button onClick={loadMorePopularNews} className="see-more-button">
              <MoreHorizontal size={24} strokeWidth={2}/>
              <span>See More</span>
            </button>
          </div>
        )}
      </div>
    </div>
    
  )
}

export default News

