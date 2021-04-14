import React, { useState } from 'react'
import Map from './components/Map'
import AddParking from './components/AddParking'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL } from './globals'
import axios from 'axios'

const App = () => {
  // const [lat, setLat] = useState(null)
  // const [lng, setLng] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [status, setStatus] = useState(null)
  const [parking, setParking] = useState({
    price: null,
    coordinates: [],
    time: null,
    distance: null
  })
  const [allParkings, setAllParkings] = useState([])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          // setLat(position.coords.latitude)
          // setLng(position.coords.longitude)
          setCoordinates([position.coords.longitude, position.coords.latitude])
        },
        () => {
          setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  console.log(coordinates)
  const submitParking = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}`, parking)
      setAllParkings([...allParkings])
    } catch (error) {
      throw error
    }
  }
  const handleChange = ({ target }) => {
    setParking({ ...parking, [target.name]: target.value })
  }
  return (
    <SanityMobilePreview>
      <div>
        <button onClick={getLocation}>Get Location</button>
        <p>{status}</p>
        {/* <input type="time" name="time" value="time" /> */}
        {/* {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>} */}
        {coordinates}
      </div>
      <Switch>
        <Route exact path="/" render={(props) => <Map />} />
        <Route
          path="/add"
          render={(props) => (
            <AddParking
              parking={parking}
              setParking={setParking}
              handleChange={handleChange}
              status={status}
              getLocation={getLocation}
              coordinates={coordinates}
            />
          )}
        />
      </Switch>
    </SanityMobilePreview>
  )
}

export default App
