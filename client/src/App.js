import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import Comments from './components/Comments'
import Navigate from './components/Navigate'

import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL, REST_API_KEY, ROUTE_URL, GEOCODIO_KEY } from './globals'
import axios from 'axios'
import Geocodio from 'geocodio-library-node'

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
  const [myParkings, setMyParkings] = useState([])
  const [route, setRoute] = useState(null)
  const [currentAddress, setCurrentAddress] = useState('92584')
  const [address, setAddress] = useState('90017')

  const [allParkings, setAllParkings] = useState([])

  const geocoder = new Geocodio(`${GEOCODIO_KEY}`)
  geocoder
    .geocode(currentAddress)
    .then((response) => {
      console.log(response.results[0].location)
      setCurrentLat(response.results[0].location.lat)
      setCurrentLng(response.results[0].location.lng)
    })
    .catch((err) => {
      console.error(err)
    })

  // const handleAddressChange = (e) => {
  //   setAddress(e.target.value)
  // }
  const handleCurrentAddressChange = (e) => {
    setCurrentAddress(e.target.value)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          setCurrentLat(position.coords.latitude)
          setCurrentLng(position.coords.longitude)
          // setCoordinates([position.coords.longitude, position.coords.latitude])
        },
        () => {
          setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  const submitParking = async (e) => {
    e.preventDefault()
    const userId = 1
    try {
      // console.log(lng, lat)
      const res = await axios.post(`${BASE_URL}/parking/add`, {
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
  const deleteParking = async (parkingId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/parking/delete/${parkingId}`)
      let filteredParkings = [...myParkings].filter(
        (my) => my.id !== parseInt(res.data.payload)
      )
      setMyParkings(filteredParkings)
    } catch (error) {
      console.log(error)
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
    getMyParkings()
    getRoute()
  }, [])
  const getRoute = async () => {
    try {
      const res = await axios.get(
        `${ROUTE_URL}transportMode=car&origin=52.5308,13.3847&destination=52.5323,13.3789&return=polyline,summary&apiKey=${REST_API_KEY}`
      )
      console.log(res)
      // setRoute(res.data.routes)
    } catch (error) {
      throw error
    }
  }
  const getAllParkings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/parking`)
      console.log(res)
      setAllParkings(res.data)
    } catch (error) {
      throw error
    }
  }

  const calcDistance = () => {
    const R = 6371
    let dLat = ((33 - lat) * Math.PI) / 180
    let dLng = ((-118 - lng) * Math.PI) / 180
    let lat = (lat * Math.PI) / 180
    let currentLat = (33 * Math.PI) / 180
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
  // console.log(distance)

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const submitComment = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/comment/add/${id}`, {
        comment: comment
      })
      console.log(res)
      setComments([...comments])
    } catch (error) {
      throw error
    }
  }
  const getAllComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comment/all/65 `)
      console.log(res.data)
      setComments(res.data)
    } catch (error) {
      throw error
    }
  }
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/comment/${commentId}`)
      let filteredComments = [...comments].filter(
        (comment) => comment.id !== parseInt(res.data.payload)
      )
      setComments(filteredComments)
    } catch (error) {
      console.log(error)
    }
  }
  const getMyParkings = async (e) => {
    const userId = 1
    try {
      const res = await axios.get(`${BASE_URL}/parking/${userId}`)
      setMyParkings(res.data)
    } catch (err) {
      throw err
    }
  }
  return (
    <SanityMobilePreview>
      <div>
        <Navigate />
        <button onClick={getLocation}>Get Location</button>
        <p>{status}</p>
        {currentLat && <p>Latitude: {currentLat}</p>}
      </div>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Map
              allParkings={allParkings}
              calcDistance={calcDistance}
              currentLat={currentLat}
              currentLng={currentLng}
              setLat={setLat}
              setLng={setLng}
              getLocation={getLocation}
              currentAddress={currentAddress}
              handleCurrentAddressChange={handleCurrentAddressChange}
              // address={address}
              // handleAddressChange={handleAddressChange}
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
              // address={address}
              // handleAddressChange={handleAddressChange}
            />
          )}
        />
        <Route
          path="/reviews/:id"
          render={(props) => (
            <Comments
              props={props}
              comment={comment}
              handleChange={handleChange}
              submitComment={submitComment}
              comments={comments}
              deleteComment={deleteComment}
            />
          )}
        />
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
