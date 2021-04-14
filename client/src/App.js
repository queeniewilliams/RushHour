import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import Comments from './components/Comments'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL } from './globals'
import axios from 'axios'

const App = (props) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [status, setStatus] = useState(null)
  const [currentLng, setCurrentLng] = useState(null)
  const [currentLat, setCurrentLat] = useState(null)
  const [distance, setDistance] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  // const coordinateId = props.match.params.id
  // const [newParking, setNewParking] = useState({
  //   longitude: ''
  // })
  const [allParkings, setAllParkings] = useState([])

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus('Geolocation is not supported by your browser')
  //   } else {
  //     setStatus('Locating...')
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setStatus(null)
  //         setCurrentLat(position.coords.latitude)
  //         setCurrentLng(position.coords.longitude)
  //         // setCoordinates([position.coords.longitude, position.coords.latitude])
  //       },
  //       () => {
  //         setStatus('Unable to retrieve your location')
  //       }
  //     )
  //   }
  // }

  const submitParking = async (e) => {
    e.preventDefault()
    const userId = 1
    try {
      // console.log(lng, lat)
      const res = await axios.post(`${BASE_URL}/add`, {
        userId,
        longitude: lng,
        latitude: lat
      })
      // console.log(res)
      setAllParkings([...allParkings])
    } catch (error) {
      throw error
    }
  }
  // console.log(typeof lng)
  // const handleChange = ({ target }) => {
  //   setNewParking({ ...newParking, [target.name]: target.value })
  // }
  useEffect(() => {
    getAllParkings()
    // calcDistance()
    getAllComments()
  }, [])
  const getAllParkings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/add`)
      console.log(res)
      setAllParkings(res.data)
    } catch (error) {
      throw error
    }
  }

  const calcDistance = () => {
    const R = 6371
    let dLat = ((currentLat - lat) * Math.PI) / 180
    let dLng = ((currentLng - lng) * Math.PI) / 180
    let lat = (lat * Math.PI) / 180
    let currentLat = (currentLat * Math.PI) / 180
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) *
        Math.sin(dLng / 2) *
        Math.cos(lat) *
        Math.cos(currentLat)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    setDistance(d)
  }
  console.log(distance)

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const submitComment = async (coordinateId) => {
    try {
      const res = await axios.post(`${BASE_URL}/comment/add/${coordinateId}`, {
        comment: comment
      })
      setComments([...comments])
    } catch (error) {
      throw error
    }
  }
  const getAllComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all/1 `)
      console.log(res)
      setComments(res.data)
    } catch (error) {
      throw error
    }
  }
  return (
    <SanityMobilePreview>
      <div>
        {/* <button onClick={getLocation}>Get Location</button>
        <p>{status}</p> */}
        {/* <input type="time" name="time" value="time" /> */}
        {/* {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>} */}
        {/* {coordinates} */}
      </div>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Map allParkings={allParkings} calcDistance={calcDistance} />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <AddParking
              // parking={newParking}
              // setParking={setNewParking}
              // handleChange={handleChange}
              lng={lng}
              lat={lat}
              setStatus={setStatus}
              setLat={setLat}
              setLng={setLng}
              submitParking={submitParking}
              status={status}
              // getLocation={getLocation}
              coordinates={coordinates}
            />
          )}
        />
        <Route
          path="/reviews"
          render={(props) => (
            <Comments
              comment={comment}
              handleChange={handleChange}
              submitComment={submitComment}
            />
          )}
        />
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
