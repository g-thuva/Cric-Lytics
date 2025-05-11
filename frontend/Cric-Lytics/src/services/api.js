import axios from "axios"

const API_URL = "http://localhost:5041/api"

const api = axios.create({
  baseURL: API_URL,
})

// Player services
export const playerService = {
  getAllPlayers: async () => {
    return await api.get("/Players")
  },
  getPlayerById: async (id) => {
    try {
      const response = await api.get(`/Players/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching player:", error);
      throw error;
    }
  },

  createPlayer: async (formData) => {
    try {
      console.log("Sending player data to API...");
      // send the FormData with proper headers
      const response = await api.post("/Players", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } 
    catch (error) {
      console.error("Error in createPlayer:", error);
      if (error.response) {
        console.log("Validation errors:", error.response.data.errors);
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
      throw error;
    }
  },

// CHANGED to only include editable fields and fetch non-editable fields from existing data
updatePlayer: async (id, playerData) => {
  try {
    // Get existing player data to non-editable fields
    const existingPlayer = await api.get(`/Players/${id}`)
    if (!existingPlayer.data) {
      throw new Error(`Player with ID ${id} not found`);
    }
    const formData = new FormData()
    // Include only the editable fields
  
    formData.append("Id", id.toString())
    formData.append("Name", playerData.name || existingPlayer.data.name);
  
    const dobDate = playerData.dob ? new Date(playerData.dob) : new Date()
    formData.append("DateOfBirth", dobDate.toISOString()) //.split("T")[0]
    
    formData.append("Role", playerData.role || "")    
    formData.append("MedicalStatus", playerData.medicalStatus || existingPlayer.data.medicalStatus || "Well");
    formData.append("BattingStyle", playerData.battingStyle || existingPlayer.data.battingStyle || "Right-handed");
    formData.append("BowlingStyle", playerData.bowlingStyle || existingPlayer.data.bowlingStyle || "Right-arm medium");
    // non-editable fields -> existing player data
    formData.append("FullName", existingPlayer.data.fullName || "")
    formData.append("Email", existingPlayer.data.email || "")
    formData.append("Record", existingPlayer.data.record || "")
    
    if (playerData.image instanceof File) {
      formData.append("Image", playerData.image)
    }
    else if (existingPlayer.imageUrl) {
      //Include existing image URL if no new image provided
      formData.append("ImageUrl", existingPlayer.data.imageUrl);
    }

    //debugging
    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    console.log("Sending update request to:", `/Players/${id}`);
      const response = await api.put(`/Players/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
   }  
  catch (error) {
    console.error("Error in updatePlayer:", error)
    if (error.response) {
      console.error("API response error:", error.response.data);
    }
    throw error;
  }
},

  deletePlayer: async (id) => {
    return await api.delete(`/Players/${id}`)
  },
}

// Match history services
export const matchHistoryService = {
  getPlayerMatchHistory: async (playerId) => {
    return await api.get(`/MatchHistory/player/${playerId}`)
  },
  addMatchHistory: async (matchData) => {
    return await api.post("/MatchHistory", matchData)
  },
}

// Statistics services
export const statisticsService = {
  getPlayerStatistics: async (playerId) => {
    return await api.get(`/Statistics/player/${playerId}`)
  },
  updatePlayerStatistics: async (statisticsData) => {
    return await api.put("/Statistics", statisticsData)
  },
}

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.data)

      if (error.response.status === 401) {
        // Handle unauthorized access
        // You might want to redirect to login page
      }

      if (error.response.status === 404) {
        // Handle not found
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request Error:", error.message)
    }

    return Promise.reject(error)
  },
)
