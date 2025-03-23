"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MoreHorizontal, Play } from "lucide-react"
import {
  commonMoments,
  videoMoments,
  photoMoments,
  popularMoments,
  popularVideoMoments,
  popularPhotoMoments,
} from "./MomentConstants"
import "../../css/Moment/Moment.css"
import momentBanner from "../images/moment1.jpg";

const Moment = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [visibleItemsCount, setVisibleItemsCount] = useState(6) // Changed to 6 for the "all" tab
  const [visiblePopularCount, setVisiblePopularCount] = useState(5)
  const [displayedPopularItems, setDisplayedPopularItems] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Featured video for the "all" tab
  const featuredVideo = {
    id: 1,
    title: "Greatest Last-Over Finish",
    summary: "Relive the incredible final over that decided the championship.",
    content:
      "This video captures the heart-stopping final over of the championship match where the batting team needed 18 runs to win with just one wicket remaining. Each ball brings a new twist in this dramatic conclusion that had fans on the edge of their seats. The video includes multiple camera angles and reactions from players and spectators.",
    uploadDate: "2023-07-14",
    creator: "Michael Johnson",
    videoUrl: "https://placehold.co/600x400/png?text=Last+Over+Finish",
    duration: "5:42",
    views: 1250000,
  }

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Adjust visible items count based on screen width and active tab
  useEffect(() => {
    if (activeTab === "all") {
      setVisibleItemsCount(6) // Always show 6 items for "all" tab (2 rows of 3)
    } else {
      setVisibleItemsCount(screenWidth < 768 ? 3 : 5)
    }
    setVisiblePopularCount(screenWidth < 768 ? 3 : 5)
  }, [screenWidth, activeTab])

  // Initialize displayed popular items on component mount or tab change
  useEffect(() => {
    let popularItems = []

    switch (activeTab) {
      case "video":
        popularItems = popularVideoMoments
        break
      case "photo":
        popularItems = popularPhotoMoments
        break
      default:
        popularItems = popularMoments
    }

    setDisplayedPopularItems(
      popularItems.slice(0, visiblePopularCount).map((item) => ({ ...item, key: `popular-${item.id}` })),
    )
  }, [activeTab, visiblePopularCount])

  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
    if (tabName === "all") {
      setVisibleItemsCount(6) // 6 items for "all" tab (2 rows of 3)
    } else {
      setVisibleItemsCount(screenWidth < 768 ? 3 : 5)
    }
    setVisiblePopularCount(screenWidth < 768 ? 3 : 5)
  }

  // Function to handle adding new moment
  const handleAddMoment = () => {
    console.log("Add moment button clicked")
    alert("Add moment functionality will be implemented here")
  }

  // Function to get items based on active tab
  const getItemsForActiveTab = () => {
    switch (activeTab) {
      case "common":
        return commonMoments.map((item) => ({ ...item, key: `common-${item.id}`, category: "common" }))
      case "video":
        return videoMoments.map((item) => ({ ...item, key: `video-${item.id}`, category: "video" }))
      case "photo":
        return photoMoments.map((item) => ({ ...item, key: `photo-${item.id}`, category: "photo" }))
      case "all":
      default:
        // For "all" tab, combine all moments and sort by date
        // Exclude the featured video from the regular list
        const allItems = [
          ...commonMoments.map((item) => ({ ...item, key: `common-${item.id}`, category: "common" })),
          ...videoMoments
            .filter((item) => item.id !== featuredVideo.id) // Exclude featured video
            .map((item) => ({ ...item, key: `video-${item.id}`, category: "video" })),
          ...photoMoments.map((item) => ({ ...item, key: `photo-${item.id}`, category: "photo" })),
        ].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))

        return allItems
    }
  }

  const allItemsForTab = getItemsForActiveTab()
  const visibleItems = allItemsForTab.slice(0, visibleItemsCount)
  const hasMoreItems = visibleItemsCount < allItemsForTab.length
  const hasMorePopular =
    visiblePopularCount <
    (activeTab === "video"
      ? popularVideoMoments.length
      : activeTab === "photo"
        ? popularPhotoMoments.length
        : popularMoments.length)

  const loadMoreItems = () => {
    setVisibleItemsCount((prevCount) => prevCount + (screenWidth < 768 ? 3 : 6))
  }

  const loadMorePopular = () => {
    setVisiblePopularCount((prevCount) => prevCount + (screenWidth < 768 ? 2 : 5))
  }

  // Render item based on its category
  const renderItem = (item) => {
    // For the "all" tab, make the entire item clickable without buttons
    if (activeTab === "all") {
      const linkTo = `/moment-details/${item.id}?type=${item.category}`

      return (
        <Link to={linkTo} className="moment-item clickable">
          <div className="moment-item-content">
            <div className={`moment-image ${item.category === "video" ? "video-thumbnail" : ""}`}>
              <img src={item.videoUrl || item.imageUrl || "/placeholder.svg"} alt={item.title} />
              {item.category === "video" && (
                <>
                  <div className="play-icon">
                    <Play size={24} strokeWidth={2} />
                  </div>
                  {item.duration && <div className="video-duration">{item.duration}</div>}
                </>
              )}
            </div>
            <div className="moment-text">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="meta-info">
                <span>Uploaded: {item.uploadDate}</span> | <span>Creator: {item.creator}</span>
                {item.views && <span> | Views: {item.views.toLocaleString()}</span>}
                {item.likes && <span> | Likes: {item.likes.toLocaleString()}</span>}
              </div>
            </div>
          </div>
        </Link>
      )
    }

    // For other tabs, make the item clickable but keep the buttons
    const linkTo = `/moment-details/${item.id}?type=${item.category || activeTab}`

    if (item.category === "video" || activeTab === "video") {
      return (
        // moment-item
        <div >  
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image video-thumbnail">
                <img src={item.videoUrl || "/placeholder.svg"} alt={item.title} />
                <div className="play-icon">
                  <Play size={24} strokeWidth={2} />
                </div>
                <div className="video-duration">{item.duration}</div>
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Uploaded: {item.uploadDate}</span> | <span>Creator: {item.creator}</span>
                  {item.views && <span> | Views: {item.views.toLocaleString()}</span>}
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              Watch Video
            </Link>
          </div>
          </Link>

        </div>
      )
    } else if (item.category === "photo" || activeTab === "photo") {
      return (
        <div>
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Uploaded: {item.uploadDate}</span> | <span>Creator: {item.creator}</span>
                  {item.likes && <span> | Likes: {item.likes.toLocaleString()}</span>}
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              View Photo
            </Link>
          </div>
          </Link>

        </div>
      )
    } else {
      return (
        <div >
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Uploaded: {item.uploadDate}</span> | <span>Creator: {item.creator}</span>
                  {item.views && <span> | Views: {item.views.toLocaleString()}</span>}
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              Read More
            </Link>
          </div>
          </Link>

        </div>
      )
    }
  }

  // Modify the renderPopularItem function to make items clickable while keeping the buttons:

  const renderPopularItem = (item) => {
    const linkTo = `/moment-details/${item.id}?type=${activeTab === "video" ? "video" : activeTab === "photo" ? "photo" : "moment"}&popular=true`

    if (activeTab === "video") {
      return (
        <div >
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image video-thumbnail">
                <img src={item.videoUrl || "/placeholder.svg"} alt={item.title} />
                <div className="play-icon">
                  <Play size={24} strokeWidth={2} />
                </div>
                <div className="video-duration">{item.duration}</div>
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Views: {item.views ? item.views.toLocaleString() : "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              Watch Video
            </Link>
          </div>
          </Link>

        </div>
      )
    } else if (activeTab === "photo") {
      return (
        <div >
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Likes: {item.likes ? item.likes.toLocaleString() : "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              View Photo
            </Link>
          </div>
          </Link>

        </div>
      )
    } else {
      return (
        <div>
          <Link to={linkTo} className="moment-item clickable">
            <div className="moment-item-content">
              <div className="moment-image">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="meta-info">
                  <span>Views: {item.views ? item.views.toLocaleString() : "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="button-container">
            <Link to={linkTo} className="read-more">
              Read More
            </Link>
          </div>
          </Link>

        </div>
      )
    }
  }

  return (
    <div className="moment-page-container">
      {/* Banner Image at the top of the page */}
      <div className="moment-banner">
        <img src={momentBanner} alt="Cricket Moments Banner" />
        <div className="banner-overlay">
          <h1>Unforgettable Cricket Moments</h1>
          <p>Relive the magic, drama, and excitement of cricket's greatest moments</p>
        </div>
      </div>

      {/* Add Moment button at the top right */}
      <div className="moment-header">
        <button className="add-button" onClick={handleAddMoment}>
           Add Moment
        </button>
      </div>

      <div className="moment-container">
        <div className={`moment-categories ${activeTab === "all" ? "full-width" : ""}`}>
          <div className="category-buttons">
            <button
              className={`category-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => handleTabChange("all")}
            >
              All Moments
            </button>
            <button
              className={`category-button ${activeTab === "common" ? "active" : ""}`}
              onClick={() => handleTabChange("common")}
            >
              Common
            </button>
            <button
              className={`category-button ${activeTab === "video" ? "active" : ""}`}
              onClick={() => handleTabChange("video")}
            >
              Videos
            </button>
            <button
              className={`category-button ${activeTab === "photo" ? "active" : ""}`}
              onClick={() => handleTabChange("photo")}
            >
              Photos
            </button>
          </div>

          {activeTab === "all" ? (
            <div className="moment-list">
              {/* Featured video section for "all" tab */}
              <Link
                to={`/moment-details/${featuredVideo.id}?type=video`}
                className="featured-video-container clickable"
              >
                <div className="featured-video">
                  <div className="video-player">
                    <img src={featuredVideo.videoUrl || "/placeholder.svg"} alt={featuredVideo.title} />
                    <div className="play-button">
                      <Play size={48} strokeWidth={2} />
                    </div>
                    <div className="video-duration">{featuredVideo.duration}</div>
                  </div>
                </div>
                <div className="featured-content">
                  <h2>{featuredVideo.title}</h2>
                  <p>{featuredVideo.content}</p>
                  <div className="meta-info">
                    <span>Uploaded: {featuredVideo.uploadDate}</span> |<span>Creator: {featuredVideo.creator}</span> |
                    <span>Views: {featuredVideo.views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>

              <h2 className="sub-title">More Moments</h2>

              {/* Grid layout for moments (3 columns) */}
              <div className="moments-grid">
                {visibleItems.map((item) => (
                  <div key={item.key} className="grid-item">
                    {renderItem(item)}
                  </div>
                ))}
              </div>

              {hasMoreItems && (
                <div className="see-more-container">
                  <button onClick={loadMoreItems} className="see-more-button">
                    <MoreHorizontal size={24} strokeWidth={2} />
                    <span>See More</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="moment-list">
              <h2 className="sub-title">
                {activeTab === "common" ? "Common Moments" : activeTab === "video" ? "Videos" : "Photos"}
              </h2>

              {visibleItems.map((item) => (
                <div key={item.key}>{renderItem(item)}</div>
              ))}

              {hasMoreItems && (
                <div className="see-more-container">
                  <button onClick={loadMoreItems} className="see-more-button">
                    <MoreHorizontal size={24} strokeWidth={2} />
                    <span>See More</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Only show popular moments for tabs other than "all" */}
        {activeTab !== "all" && (
          <div className="popular-moments">
            <h2 className="sub-title">
              {activeTab === "video" ? "Popular Videos" : activeTab === "photo" ? "Popular Photos" : "Popular Moments"}
              {activeTab === "video"
                ? ""
                : activeTab === "photo"
                  ? ""
                  : ""}
              
            </h2>

            {displayedPopularItems.map((item) => (
              <div key={item.key}>{renderPopularItem(item)}</div>
            ))}

            {hasMorePopular && (
              <div className="see-more-container">
                <button onClick={loadMorePopular} className="see-more-button">
                  <MoreHorizontal size={24} strokeWidth={2} />
                  <span>See More</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Moment

