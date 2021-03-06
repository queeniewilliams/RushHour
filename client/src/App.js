import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import Comments from './components/Comments'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { GEOCODIO_KEY } from './globals'
import { useHistory } from 'react-router-dom'
import {
  GetAllParkings,
  UpdateParking,
  DeleteParking,
  GetMyParkings,
  CreateParking
} from './services/CoordinateServices'
import {
  GetAllComments,
  CreateComment,
  DeleteComment
} from './services/CommentServices'
import { CheckSession, GetProfile } from './services/AuthServices'
import axios from 'axios'

const App = () => {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [status, setStatus] = useState(null)
  const [currentLng, setCurrentLng] = useState(-118)
  const [currentLat, setCurrentLat] = useState(34)
  const [distance, setDistance] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [myParkings, setMyParkings] = useState([])
  const [currentAddress, setCurrentAddress] = useState('90017')
  const [address, setAddress] = useState('')
  const [allParkings, setAllParkings] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [submitAddress, setSubmitAddress] = useState('')
  const [image, setImage] = useState('')
  const [parkingId, setParkingId] = useState('')
  const [selectedParking, setSelectedParking] = useState(null)
  const [myProfile, setMyProflie] = useState(null)
  const history = useHistory()

  // Auth
  const logOut = () => {
    setAuthenticated(false)
    localStorage.clear()
    return history.push('/')
  }
  const checkSession = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      try {
        const res = await CheckSession()
        setCurrentUser(res)
        setAuthenticated(true)
        getProfile(res.id)
        getMyParkings(res.id)
      } catch (error) {
        throw error
      }
    }
  }
  const getProfile = async (id) => {
    try {
      const res = await GetProfile(id)
      setMyProflie(res)
    } catch (err) {
      throw err
    }
  }

  //Geocodio
  const convertToCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://api.geocod.io/v1.6/geocode?q=${currentAddress}&api_key=${GEOCODIO_KEY}`
      )
      setCurrentLat(response.data.results[0].location.lat)
      setCurrentLng(response.data.results[0].location.lng)
      return response
    } catch (error) {
      throw error
    }
  }

  const convertCoordinatesAddParking = async () => {
    try {
      const response = await axios.get(
        `https://api.geocod.io/v1.6/geocode?q=${address}&api_key=${GEOCODIO_KEY}`
      )
      setLat(response.data.results[0].location.lat)
      setLng(response.data.results[0].location.lng)
      setSubmitAddress(response.data.results[0].formatted_address)
      return response
    } catch (error) {
      throw error
    }
  }

  //CRUD Parking
  const getAllParkings = async () => {
    try {
      const res = await GetAllParkings()
      setAllParkings(res)
    } catch (error) {
      throw error
    }
  }

  const getMyParkings = async (userId) => {
    try {
      const res = await GetMyParkings(userId)
      setMyParkings(res)
    } catch (err) {
      throw err
    }
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }
  const handleCurrentAddressChange = (e) => {
    setCurrentAddress(e.target.value)
  }
  const submitParking = async () => {
    const userId = currentUser.id
    try {
      const res = await CreateParking({
        userId,
        longitude: lng,
        latitude: lat,
        address: submitAddress
      })
      setParkingId(res.id)
      setAllParkings([...allParkings])
    } catch (error) {
      throw error
    }
    getAllParkings()
  }
  const handleImageChange = ({ target }) => {
    setImage({ ...image, [target.name]: target.value })
  }
  const addImage = async (parkingId, image) => {
    let test = {
      image: image.image
    }
    try {
      const res = await UpdateParking(parkingId, test)
      return res
    } catch (error) {
      throw error
    }
  }
  const submitImage = async (e) => {
    try {
      addImage(e.target.id, image)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteParking = async (parkingId) => {
    try {
      const res = await DeleteParking(parkingId)
      console.log(res)
      let filteredParkings = [...myParkings].filter(
        (my) => my.id !== parseInt(parkingId)
      )
      setMyParkings(filteredParkings)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllParkings()
    checkSession()
  }, [])

  //Calculate Distance
  const handleDistance = async (parking) => {
    setSelectedParking(parking)
    try {
      await setLng(parking.longitude)
      await setLat(parking.latitude)
      await calcDistance()
    } catch (error) {
      console.log(error)
    }
  }

  const calcDistance = () => {
    let calcLat = lat
    let calcLng = lng
    let lat2 = currentLat
    let lng2 = currentLng
    const R = 6371
    let dLat = ((lat2 - calcLat) * Math.PI) / 180
    let dLng = ((lng2 - calcLng) * Math.PI) / 180
    let lat1 = (calcLat * Math.PI) / 180
    let currentLat1 = (lat2 * Math.PI) / 180
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) *
        Math.sin(dLng / 2) *
        Math.cos(lat1) *
        Math.cos(currentLat1)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    setDistance(d.toFixed(0))
  }

  //CRUD Comment
  const getAllComments = async (id) => {
    try {
      const res = await GetAllComments(id)
      setComments(res)
    } catch (error) {
      throw error
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = async (id) => {
    try {
      await CreateComment(id, {
        comment: comment,
        userId: currentUser.id
      })
      setComments([...comments])
    } catch (error) {
      throw error
    }
  }
  const deleteComment = async (commentId) => {
    try {
      await DeleteComment(commentId)
      let filteredComments = [...comments].filter(
        (comment) => comment.id !== parseInt(commentId)
      )
      setComments(filteredComments)
    } catch (error) {
      console.log(error)
    }
  }

  const mapProps = {
    authenticated,
    logOut,
    allParkings,
    calcDistance,
    currentLat,
    currentLng,
    setCurrentLat,
    setCurrentLng,
    setLat,
    setLng,
    currentAddress,
    handleCurrentAddressChange,
    handleDistance,
    selectedParking,
    setSelectedParking,
    distance,
    setStatus,
    myProfile,
    currentUser,
    convertToCoordinates,
    checkSession
  }

  const addParkingProps = {
    authenticated,
    logOut,
    checkSession,
    lng,
    lat,
    setLat,
    setLng,
    submitParking,
    myParkings,
    deleteParking,
    getMyParkings,
    address,
    setAddress,
    setSubmitAddress,
    handleAddressChange,
    submitImage,
    handleImageChange,
    image,
    currentUser,
    setStatus,
    myProfile,
    convertCoordinatesAddParking,
    checkSession
  }

  return (
    <SanityMobilePreview>
      <Switch>
        <Route exact path="/" render={(props) => <Map {...mapProps} />} />
        <Route
          path="/add"
          render={(props) => <AddParking {...addParkingProps} />}
        />
        <Route
          path="/reviews/:id"
          render={(props) => (
            <Comments
              props={props}
              authenticated={authenticated}
              logOut={logOut}
              comment={comment}
              handleChange={handleChange}
              submitComment={submitComment}
              comments={comments}
              deleteComment={deleteComment}
              getAllComments={getAllComments}
              myProfile={myProfile}
              currentUser={currentUser}
              checkSession={checkSession}
            />
          )}
        />
        <Route path="/signup" render={(props) => <SignUp />} />
        <Route
          path="/signin"
          render={(props) => (
            <SignIn
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
