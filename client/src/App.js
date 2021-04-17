import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import Comments from './components/Comments'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL, REST_API_KEY, ROUTE_URL, GEOCODIO_KEY } from './globals'
import axios from 'axios'
import Geocodio from 'geocodio-library-node'
import polyline from '@mapbox/polyline'
import decodePolyline from 'decode-google-map-polyline'
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
import { CheckSession } from './services/AuthServices'

const App = (props) => {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [coordinates, setCoordinates] = useState([])
  const [status, setStatus] = useState(null)
  const [currentLng, setCurrentLng] = useState(null)
  const [currentLat, setCurrentLat] = useState(null)
  const [distance, setDistance] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [myParkings, setMyParkings] = useState([])
  // const [route, setRoute] = useState(null)
  const [currentAddress, setCurrentAddress] = useState('92584')
  const [address, setAddress] = useState('')
  const [polyline, setPolyline] = useState('')
  const [polylineCoords, setPolylineCoords] = useState([])
  const [allParkings, setAllParkings] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [submitAddress, setSubmitAddress] = useState('')
  const [image, setImage] = useState('')
  const [parkingId, setParkingId] = useState('')
  const [selectedParking, setSelectedParking] = useState(null)
  const history = useHistory()

  console.log(currentUser)
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
      } catch (error) {
        throw error
      }
    }
  }

  let array = decodePolyline(polyline)
  // const geocoder = new Geocodio(`${GEOCODIO_KEY}`)
  // geocoder
  //   .geocode(currentAddress)
  //   .then((response) => {
  //     setCurrentLat(response.results[0].location.lat)
  //     setCurrentLng(response.results[0].location.lng)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }
  const handleCurrentAddressChange = (e) => {
    setCurrentAddress(e.target.value)
  }

  const submitParking = async (e) => {
    e.preventDefault()
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
    e.preventDefault()
    console.log(e.target.id)
    try {
      addImage(e.target.id, image)
    } catch (error) {
      console.log(error)
    }
  }
  const handleImageChange = ({ target }) => {
    setImage({ ...image, [target.name]: target.value })
  }
  const deleteParking = async (parkingId) => {
    try {
      const res = await DeleteParking(parkingId)
      console.log(res)
      let filteredParkings = [...myParkings].filter(
        (my) => my.id !== parseInt(res.payload)
      )
      setMyParkings(filteredParkings)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllParkings()
    checkSession()
    // calcDistance()
    // getAllComments()
    // getMyParkings()
  }, [])

  const getAllParkings = async () => {
    try {
      const res = await GetAllParkings()
      console.log(res)
      setAllParkings(res)
    } catch (error) {
      throw error
    }
  }
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
    setDistance(d)
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const submitComment = async (id) => {
    try {
      const res = await CreateComment(id, {
        comment: comment
      })
      setComments([...comments])
    } catch (error) {
      throw error
    }
  }
  const getAllComments = async (id) => {
    try {
      const res = await GetAllComments(id)
      console.log(res)
      setComments(res)
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
  const getMyParkings = async (e) => {
    const userId = 1
    try {
      const res = await GetMyParkings(userId)
      setMyParkings(res)
    } catch (err) {
      throw err
    }
  }
  return (
    <SanityMobilePreview>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Map
              authenticated={authenticated}
              logOut={logOut}
              allParkings={allParkings}
              calcDistance={calcDistance}
              currentLat={currentLat}
              currentLng={currentLng}
              setCurrentLat={setCurrentLat}
              setCurrentLng={setCurrentLng}
              setLat={setLat}
              setLng={setLng}
              status={status}
              setStatus={setStatus}
              currentAddress={currentAddress}
              handleCurrentAddressChange={handleCurrentAddressChange}
              // address={address}
              // handleAddressChange={handleAddressChange}
              handleDistance={handleDistance}
              selectedParking={selectedParking}
              setSelectedParking={setSelectedParking}
              distance={distance}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <AddParking
              // parking={newParking}
              // setParking={setNewParking}
              // handleChange={handleChange}
              authenticated={authenticated}
              logOut={logOut}
              checkSession={checkSession}
              lng={lng}
              lat={lat}
              setStatus={setStatus}
              setLat={setLat}
              setLng={setLng}
              submitParking={submitParking}
              status={status}
              // getLocation={getLocation}
              coordinates={coordinates}
              myParkings={myParkings}
              deleteParking={deleteParking}
              getMyParkings={getMyParkings}
              address={address}
              setAddress={setAddress}
              setSubmitAddress={setSubmitAddress}
              handleAddressChange={handleAddressChange}
              submitImage={submitImage}
              handleImageChange={handleImageChange}
              image={image}
              currentUser={currentUser}
            />
          )}
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
