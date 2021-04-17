import React, { useState, useEffect } from 'react'
import ReactMap, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
import Navigate from './Navigate'
import '../css/mapbox.css'
import { useHistory } from 'react-router-dom'

const Map = (props) => {
  console.log(props.allParkings)
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34,
    longitude: -118.3,

    zoom: 10
  })
  const changeViewport = () => {
    setViewport({
      ...viewport,
      width: '100%',
      height: '100%',
      latitude: props.currentLat,
      longitude: props.currentLng,
      zoom: 10,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }
  // useEffect(() => {
  //   changeViewport()
  // }, [])

  const history = useHistory()

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        props.setSelectedParking(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      props.setStatus('Geolocation is not supported by your browser')
    } else {
      props.setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          props.setStatus(null)
          props.setCurrentLat(position.coords.latitude)
          props.setCurrentLng(position.coords.longitude)
        },
        () => {
          props.setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  return (
    <ReactMap
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/queeniew329/cknayeur00b3d17mrmpewxjni"
      onViewportChange={(viewport) => setViewport(viewport)}
      maxZoom={100}
      minZoom={1.6}
    >
      <Navigate authenticated={props.authenticated} logOut={props.logOut} />
      <div className="submit">
        <button onClick={getLocation}>Get Location</button>
        <p>{props.status}</p>
        {props.currentLat && <p>Latitude: {props.currentLat}</p>}
        <input
          name="address"
          value={props.currentAddress}
          onChange={props.handleCurrentAddressChange}
        />
        <button onClick={changeViewport}>Go</button>
      </div>
      {props.allParkings
        ? props.allParkings.map((parking, index) => (
            <div key={index}>
              <Marker longitude={parking.longitude} latitude={parking.latitude}>
                <img
                  alt="parking-icon"
                  src="https://i.ibb.co/z5H0Qx3/free-parking.png"
                  width="50px"
                  onClick={() =>
                    // setSelectedParking(parking)
                    // props.setLng(parking.longitude)
                    // props.setLat(parking.latitude)
                    // props.calcDistance()
                    props.handleDistance(parking)
                  }
                />
              </Marker>
              {props.selectedParking ? (
                <Popup
                  longitude={props.selectedParking.longitude}
                  latitude={props.selectedParking.latitude}
                  closeOnClick={false}
                  onClose={() => {
                    props.setSelectedParking(null)
                  }}
                >
                  <p>Parking {props.selectedParking.id}</p>
                  <div className="location">
                    <img
                      id="location-icon"
                      alt="location"
                      src="https://i.ibb.co/mNGXhnb/pngjoy-com-location-pin-icon-location-icon-3d-png-hd-2645202.png"
                      width="20px"
                      height="25px"
                    />
                    <p>{props.selectedParking.address}</p>
                  </div>
                  <p>Distance:{props.distance}Km</p>
                  <button>open in google map</button>
                  <br></br>
                  <img
                    src="https://i.ibb.co/Hdbst8z/vippng-com-review-icon-png-3657900.png"
                    width="40px"
                    onClick={() =>
                      history.push(`/reviews/${props.selectedParking.id}`)
                    }
                  />
                </Popup>
              ) : null}
            </div>
          ))
        : null}
      {props.currentLat && props.currentLng ? (
        <Marker
          className="marker-current"
          longitude={props.currentLng}
          latitude={props.currentLat}
        ></Marker>
      ) : null}
    </ReactMap>
  )
}

export default Map
