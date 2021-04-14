import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL } from './globals'
import axios from 'axios'

const App = () => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [status, setStatus] = useState(null)
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
  //         // setLat(position.coords.latitude)
  //         // setLng(position.coords.longitude)
  //         setCoordinates([position.coords.longitude, position.coords.latitude])
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
      const res = await axios.post(`${BASE_URL}/add`, {
        userId,
        longitude: parseFloat(lng),
        latitude: parseFloat(lat)
      })
      console.log(res)
      // setAllParkings([...allParkings])
    } catch (error) {
      throw error
    }
  }
  console.log(typeof lng)
  // const handleChange = ({ target }) => {
  //   setNewParking({ ...newParking, [target.name]: target.value })
  // }
  useEffect(() => {
    getAllParkings()
  }, [])
  const getAllParkings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/add `)
      console.log(res)
      setAllParkings(res.data)
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
          render={(props) => <Map allParkings={allParkings} />}
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
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
