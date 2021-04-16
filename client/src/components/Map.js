import React, { useState, Fragment, useEffect } from 'react'
import ReactMap, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
import Navigate from './Navigate'
import '../css/mapbox.css'
import { useHistory } from 'react-router-dom'

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34,
    longitude: -118,
    // latitude: props.currentLat ? props.currentLat : 34,
    // longitude: props.currentLng ? props.currentLng : -118,
    zoom: 8
  })
  const changeViewport = () => {
    setViewport({
      ...viewport,
      width: '100%',
      height: '100%',
      latitude: props.currentLat,
      longitude: props.currentLng,
      zoom: 8,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }
  // useEffect(() => {
  //   changeViewport()
  // }, [])
  const [selectedParking, setSelectedParking] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedParking(null)
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
      <Navigate />
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
      {props
        ? props.allParkings.map((parking, index) => (
            <div key={index}>
              <Marker longitude={parking.longitude} latitude={parking.latitude}>
                <img
                  src="https://i.ibb.co/HGny0DC/parking-sign-2526.png"
                  width="50px"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedParking(parking)
                    props.setLng(parking.longitude)
                    props.setLat(parking.latitude)
                    props.getRoute()
                  }}
                />
              </Marker>
              {selectedParking ? (
                <Popup
                  longitude={selectedParking.longitude}
                  latitude={selectedParking.latitude}
                  closeOnClick={false}
                  onClose={() => {
                    setSelectedParking(null)
                  }}
                >
                  <p>Parking {selectedParking.id}</p>
                  <p>Distance:</p>
                  <button>open in google map</button>
                  <button
                    onClick={() =>
                      history.push(`/reviews/${selectedParking.id}`)
                    }
                  >
                    reviews
                  </button>
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

      {/* <button onClick={props.calcDistance}>Get Distance</button> */}
    </ReactMap>
  )
}

export default Map
