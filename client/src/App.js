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
  const [address, setAddress] = useState('90017')
  const [polyline, setPolyline] = useState('')
  const [polylineCoords, setPolylineCoords] = useState([])
  const [allParkings, setAllParkings] = useState([])

  let array = decodePolyline(polyline)
  // const geocoder = new Geocodio(`${GEOCODIO_KEY}`)
  // geocoder
  //   .geocode(currentAddress)
  //   .then((response) => {
  //     console.log(response.results[0].location)
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
    const userId = 1
    try {
      const res = await axios.post(`${BASE_URL}/parking/add`, {
        userId,
        longitude: lng,
        latitude: lat
      })
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
  useEffect(() => {
    getAllParkings()
    // calcDistance()
    // getAllComments()
    // getMyParkings()
    // getRoute()
  }, [])
  const getRoute = async () => {
    try {
      const res = await axios.get(
        `${ROUTE_URL}transportMode=car&origin=52.5308,13.3847&destination=${lng},${lat}&return=polyline,summary&apiKey=${REST_API_KEY}`
      )
      console.log(res)

      // console.log(decodePolyline(res.data.routes[0].sections[0].polyline))
      // let array = decodePolyline(res.data.routes[0].sections[0].polyline)
      // let myCoords = array.map((point) => ({
      //   latitude: point.lat,
      //   longitude: point.lng
      // }))
      // setPolylineCoords(myCoords)
      // setRoute(res.data.routes[0])
      // setPolyline(res.data.routes[0].sections[0].polyline)
      // setPolylineCoords(decodePolyline(res.data.routes[0].sections[0].polyline))
    } catch (error) {
      throw error
    }
  }
  const getAllParkings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/parking/all`)
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
  const getAllComments = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/comment/all/${id} `)
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
              address={address}
              handleAddressChange={handleAddressChange}
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
              getAllComments={getAllComments}
            />
          )}
        />
        <Route path="/signup" render={(props) => <SignUp />} />
        <Route path="/signin" render={(props) => <SignIn />} />
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
