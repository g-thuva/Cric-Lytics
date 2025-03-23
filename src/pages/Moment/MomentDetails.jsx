"use client"
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import {
  commonMoments,
  videoMoments,
  photoMoments,
  popularMoments,
  popularVideoMoments,
  popularPhotoMoments,
} from "./MomentConstants"
import { Play } from "lucide-react"
import "../../css/Moment/Moment.css"

const MomentDetails = () => {
  const { id } = useParams()
  const location = useLocation()
  const [moment, setMoment] = useState(null)
  const [relatedItems, setRelatedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setLoading(true)
      const searchParams = new URLSearchParams(location.search)
      const type = searchParams.get("type")
      const isPopular = searchParams.get("popular") === "true"

      console.log("Loading moment details for:", id, "type:", type, "popular:", isPopular)

      let selectedMoment
      let relatedCollection = []

      // Find the selected moment
      switch (type) {
        case "common":
          selectedMoment = commonMoments.find((item) => item.id === Number.parseInt(id))
          relatedCollection = [...commonMoments]
          break
        case "video":
          selectedMoment = isPopular
            ? popularVideoMoments.find((item) => item.id === Number.parseInt(id))
            : videoMoments.find((item) => item.id === Number.parseInt(id))
          relatedCollection = [...videoMoments]
          break
        case "photo":
          selectedMoment = isPopular
            ? popularPhotoMoments.find((item) => item.id === Number.parseInt(id))
            : photoMoments.find((item) => item.id === Number.parseInt(id))
          relatedCollection = [...photoMoments]
          break
        case "moment":
          selectedMoment = popularMoments.find((item) => item.id === Number.parseInt(id))
          relatedCollection = [...popularMoments]
          break
        default:
          // If type is not specified or invalid, search in all collections
          selectedMoment =
            commonMoments.find((item) => item.id === Number.parseInt(id)) ||
            videoMoments.find((item) => item.id === Number.parseInt(id)) ||
            photoMoments.find((item) => item.id === Number.parseInt(id)) ||
            popularMoments.find((item) => item.id === Number.parseInt(id)) ||
            popularVideoMoments.find((item) => item.id === Number.parseInt(id)) ||
            popularPhotoMoments.find((item) => item.id === Number.parseInt(id))

          // Determine which collection to use for related items
          if (selectedMoment) {
            if (selectedMoment.videoUrl) {
              relatedCollection = [...videoMoments]
            } else if (selectedMoment.likes) {
              relatedCollection = [...photoMoments]
            } else {
              relatedCollection = [...commonMoments]
            }
          }
      }

      if (selectedMoment) {
        console.log("Found moment:", selectedMoment.title)
        setMoment(selectedMoment)

        // Get related items (excluding the current one)
        const related = relatedCollection
          .filter((item) => item.id !== selectedMoment.id)
          .sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 3) // Take 3 random items

        setRelatedItems(related)
      } else {
        console.error("Moment not found for id:", id, "type:", type)
        setError("Moment not found")
      }
    } catch (err) {
      console.error("Error loading moment:", err)
      setError("Error loading moment")
    } finally {
      setLoading(false)
    }
  }, [id, location])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error || !moment) {
    return <div className="error">Error: {error || "Moment not found"}</div>
  }

  // Determine if this is a video
  const isVideo = moment.videoUrl || moment.duration

  // Determine if this is a photo
  const isPhoto = moment.likes && !isVideo

  return (
    <div className="moment-details-container">
      <div className="moment-details">
        <div className="back-links">
          <Link to="/moments" className="back-link">
            <FaArrowLeft style={{marginRight:'10px'}}/>Back to Moments
          </Link>
        </div>
        <h1>{moment.title}</h1>
        <div className="meta-info">
          <span>Uploaded: {moment.uploadDate}</span> | <span>Creator: {moment.creator}</span>
          {moment.views && <span> | Views: {moment.views.toLocaleString()}</span>}
          {moment.likes && <span> | Likes: {moment.likes.toLocaleString()}</span>}
        </div>

        {isVideo ? (
          <div className="moment-detail-video">
            <div className="video-player">
              <img src={moment.videoUrl || "/placeholder.svg"} alt={moment.title} />
              <div className="play-button">
                <Play size={48} strokeWidth={2} />
              </div>
              {moment.duration && <div className="video-duration">{moment.duration}</div>}
            </div>
          </div>
        ) : (
          <div className="moment-detail-image">
            <img src={moment.imageUrl || "/placeholder.svg"} alt={moment.title} />
          </div>
        )}

        <div className="moment-content">
          <p>{moment.content}</p>
        </div>
      </div>
      <div className="related-moments">
        <h2 className="sub-title">Related {isVideo ? "Videos" : isPhoto ? "Photos" : "Moments"}</h2>
        {relatedItems.map((item) => (
          <div key={`related-${item.id}`} className="moment-item">
            <div className="moment-item-content">
              <div className={`moment-image ${item.videoUrl ? "video-thumbnail" : ""}`}>
                <img src={item.videoUrl || item.imageUrl || "/placeholder.svg"} alt={item.title} />
                {item.videoUrl && (
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
                <Link
                  to={`/moment-details/${item.id}?type=${item.videoUrl ? "video" : item.likes ? "photo" : "common"}`}
                  className="read-more"
                >
                  {item.videoUrl ? "Watch Video" : item.likes ? "View Photo" : "Read More"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MomentDetails

